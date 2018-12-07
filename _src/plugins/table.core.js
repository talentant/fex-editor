/**
 * Created with JetBrains WebStorm.
 * User: taoqili
 * Date: 13-1-18
 * Time: 上午11:09
 * To change this template use File | Settings | File Templates.
 */
/**
 * UE表格操作类
 * @param table
 * @constructor
 */
(() => {
  var UETable = (UE.UETable = function(table) {
    this.table = table;
    this.indexTable = [];
    this.selectedTds = [];
    this.cellsRange = {};
    this.update(table);
  });

  //===以下为静态工具方法===
  UETable.removeSelectedClass = cells => {
    utils.each(cells, cell => {
      domUtils.removeClasses(cell, "selectTdClass");
    });
  };
  UETable.addSelectedClass = cells => {
    utils.each(cells, cell => {
      domUtils.addClass(cell, "selectTdClass");
    });
  };
  UETable.isEmptyBlock = node => {
    var reg = new RegExp(domUtils.fillChar, "g");
    if (node[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(reg, "").length > 0) {
      return 0;
    }
    for (var i in dtd.$isNotEmpty)
      if (dtd.$isNotEmpty.hasOwnProperty(i)) {
        if (node.getElementsByTagName(i).length) {
          return 0;
        }
      }
    return 1;
  };
  UETable.getWidth = cell => {
    if (!cell) return 0;
    return parseInt(domUtils.getComputedStyle(cell, "width"), 10);
  };

  /**
   * 获取单元格或者单元格组的“对齐”状态。 如果当前的检测对象是一个单元格组， 只有在满足所有单元格的 水平和竖直 对齐属性都相同的
   * 条件时才会返回其状态值，否则将返回null； 如果当前只检测了一个单元格， 则直接返回当前单元格的对齐状态；
   * @param table cell or table cells , 支持单个单元格dom对象 或者 单元格dom对象数组
   * @return { align: 'left' || 'right' || 'center', valign: 'top' || 'middle' || 'bottom' } 或者 null
   */
  UETable.getTableCellAlignState = cells => {
    !utils.isArray(cells) && (cells = [cells]);

    var result = {}; //状态是否相同
    var status = ["align", "valign"];
    var tempStatus = null;
    var isSame = true;

    utils.each(cells, cellNode => {
      utils.each(status, currentState => {
        tempStatus = cellNode.getAttribute(currentState);

        if (!result[currentState] && tempStatus) {
          result[currentState] = tempStatus;
        } else if (!result[currentState] || tempStatus !== result[currentState]) {
          isSame = false;
          return false;
        }
      });

      return isSame;
    });

    return isSame ? result : null;
  };

  /**
   * 根据当前选区获取相关的table信息
   * @return {Object}
   */
  UETable.getTableItemsByRange = editor => {
    var start = editor.selection.getStart();

    //ff下会选中bookmark
    if (start && start.id && start.id.indexOf("_baidu_bookmark_start_") === 0 && start.nextSibling) {
      start = start.nextSibling;
    }

    //在table或者td边缘有可能存在选中tr的情况
    var cell = start && domUtils.findParentByTagName(start, ["td", "th"], true);

    var tr = cell && cell.parentNode;
    var table = tr && domUtils.findParentByTagName(tr, ["table"]);
    var caption = table && table.getElementsByTagName("caption")[0];

    return {
      cell,
      tr,
      table,
      caption
    };
  };
  UETable.getUETableBySelected = editor => {
    var table = UETable.getTableItemsByRange(editor).table;
    if (table && table.ueTable && table.ueTable.selectedTds.length) {
      return table.ueTable;
    }
    return null;
  };

  UETable.getDefaultValue = (editor, table) => {
    var borderMap = {
      thin: "0px",
      medium: "1px",
      thick: "2px"
    };

    var tableBorder;
    var tdPadding;
    var tdBorder;
    var tmpValue;
    if (!table) {
      table = editor.document.createElement("table");
      table.insertRow(0).insertCell(0).innerHTML = "xxx";
      editor.body.appendChild(table);
      var td = table.getElementsByTagName("td")[0];
      tmpValue = domUtils.getComputedStyle(table, "border-left-width");
      tableBorder = parseInt(borderMap[tmpValue] || tmpValue, 10);
      tmpValue = domUtils.getComputedStyle(td, "padding-left");
      tdPadding = parseInt(borderMap[tmpValue] || tmpValue, 10);
      tmpValue = domUtils.getComputedStyle(td, "border-left-width");
      tdBorder = parseInt(borderMap[tmpValue] || tmpValue, 10);
      domUtils.remove(table);
      return {
        tableBorder,
        tdPadding,
        tdBorder
      };
    } else {
      td = table.getElementsByTagName("td")[0];
      tmpValue = domUtils.getComputedStyle(table, "border-left-width");
      tableBorder = parseInt(borderMap[tmpValue] || tmpValue, 10);
      tmpValue = domUtils.getComputedStyle(td, "padding-left");
      tdPadding = parseInt(borderMap[tmpValue] || tmpValue, 10);
      tmpValue = domUtils.getComputedStyle(td, "border-left-width");
      tdBorder = parseInt(borderMap[tmpValue] || tmpValue, 10);
      return {
        tableBorder,
        tdPadding,
        tdBorder
      };
    }
  };
  /**
   * 根据当前点击的td或者table获取索引对象
   * @param tdOrTable
   */
  UETable.getUETable = tdOrTable => {
    var tag = tdOrTable.tagName.toLowerCase();
    tdOrTable =
      tag == "td" || tag == "th" || tag == "caption"
        ? domUtils.findParentByTagName(tdOrTable, "table", true)
        : tdOrTable;
    if (!tdOrTable.ueTable) {
      tdOrTable.ueTable = new UETable(tdOrTable);
    }
    return tdOrTable.ueTable;
  };

  UETable.cloneCell = function(cell, ignoreMerge, keepPro) {
    if (!cell || utils.isString(cell)) {
      return this.table.ownerDocument.createElement(cell || "td");
    }
    var flag = domUtils.hasClass(cell, "selectTdClass");
    flag && domUtils.removeClasses(cell, "selectTdClass");
    var tmpCell = cell.cloneNode(true);
    if (ignoreMerge) {
      tmpCell.rowSpan = tmpCell.colSpan = 1;
    }
    //去掉宽高
    !keepPro && domUtils.removeAttributes(tmpCell, "width height");
    !keepPro && domUtils.removeAttributes(tmpCell, "style");

    tmpCell.style.borderLeftStyle = "";
    tmpCell.style.borderTopStyle = "";
    tmpCell.style.borderLeftColor = cell.style.borderRightColor;
    tmpCell.style.borderLeftWidth = cell.style.borderRightWidth;
    tmpCell.style.borderTopColor = cell.style.borderBottomColor;
    tmpCell.style.borderTopWidth = cell.style.borderBottomWidth;
    flag && domUtils.addClass(cell, "selectTdClass");
    return tmpCell;
  };

  UETable.prototype = {
    getMaxRows() {
      var rows = this.table.rows;
      var maxLen = 1;
      for (var i = 0, row; (row = rows[i]); i++) {
        var currentMax = 1;
        for (var j = 0, cj; (cj = row.cells[j++]); ) {
          currentMax = Math.max(cj.rowSpan || 1, currentMax);
        }
        maxLen = Math.max(currentMax + i, maxLen);
      }
      return maxLen;
    },
    /**
     * 获取当前表格的最大列数
     */
    getMaxCols() {
      var rows = this.table.rows;
      var maxLen = 0;
      var cellRows = {};
      for (var i = 0, row; (row = rows[i]); i++) {
        var cellsNum = 0;
        for (var j = 0, cj; (cj = row.cells[j++]); ) {
          cellsNum += cj.colSpan || 1;
          if (cj.rowSpan && cj.rowSpan > 1) {
            for (var k = 1; k < cj.rowSpan; k++) {
              if (!cellRows["row_" + (i + k)]) {
                cellRows["row_" + (i + k)] = cj.colSpan || 1;
              } else {
                cellRows["row_" + (i + k)]++;
              }
            }
          }
        }
        cellsNum += cellRows["row_" + i] || 0;
        maxLen = Math.max(cellsNum, maxLen);
      }
      return maxLen;
    },
    getCellColIndex(cell) {},
    /**
     * 获取当前cell旁边的单元格，
     * @param cell
     * @param right
     */
    getHSideCell(cell, right) {
      try {
        var cellInfo = this.getCellInfo(cell);
        var previewRowIndex;
        var previewColIndex;
        var len = this.selectedTds.length;
        var range = this.cellsRange;
        //首行或者首列没有前置单元格
        if (
          (!right && (!len ? !cellInfo.colIndex : !range.beginColIndex)) ||
          (right && (!len ? cellInfo.colIndex == this.colsNum - 1 : range.endColIndex == this.colsNum - 1))
        )
          return null;

        previewRowIndex = !len ? cellInfo.rowIndex : range.beginRowIndex;
        previewColIndex = !right
          ? !len
            ? cellInfo.colIndex < 1
              ? 0
              : cellInfo.colIndex - 1
            : range.beginColIndex - 1
          : !len
          ? cellInfo.colIndex + 1
          : range.endColIndex + 1;
        return this.getCell(
          this.indexTable[previewRowIndex][previewColIndex].rowIndex,
          this.indexTable[previewRowIndex][previewColIndex].cellIndex
        );
      } catch (e) {
        showError(e);
      }
    },
    getTabNextCell(cell, preRowIndex) {
      var cellInfo = this.getCellInfo(cell);
      var rowIndex = preRowIndex || cellInfo.rowIndex;
      var colIndex = cellInfo.colIndex + 1 + (cellInfo.colSpan - 1);
      var nextCell;
      try {
        nextCell = this.getCell(
          this.indexTable[rowIndex][colIndex].rowIndex,
          this.indexTable[rowIndex][colIndex].cellIndex
        );
      } catch (e) {
        try {
          rowIndex = rowIndex * 1 + 1;
          colIndex = 0;
          nextCell = this.getCell(
            this.indexTable[rowIndex][colIndex].rowIndex,
            this.indexTable[rowIndex][colIndex].cellIndex
          );
        } catch (e) {}
      }
      return nextCell;
    },
    /**
     * 获取视觉上的后置单元格
     * @param cell
     * @param bottom
     */
    getVSideCell(cell, bottom, ignoreRange) {
      try {
        var cellInfo = this.getCellInfo(cell);
        var nextRowIndex;
        var nextColIndex;
        var len = this.selectedTds.length && !ignoreRange;
        var range = this.cellsRange;
        //末行或者末列没有后置单元格
        if (
          (!bottom && cellInfo.rowIndex == 0) ||
          (bottom &&
            (!len ? cellInfo.rowIndex + cellInfo.rowSpan > this.rowsNum - 1 : range.endRowIndex == this.rowsNum - 1))
        )
          return null;

        nextRowIndex = !bottom
          ? !len
            ? cellInfo.rowIndex - 1
            : range.beginRowIndex - 1
          : !len
          ? cellInfo.rowIndex + cellInfo.rowSpan
          : range.endRowIndex + 1;
        nextColIndex = !len ? cellInfo.colIndex : range.beginColIndex;
        return this.getCell(
          this.indexTable[nextRowIndex][nextColIndex].rowIndex,
          this.indexTable[nextRowIndex][nextColIndex].cellIndex
        );
      } catch (e) {
        showError(e);
      }
    },
    /**
     * 获取相同结束位置的单元格，xOrY指代了是获取x轴相同还是y轴相同
     */
    getSameEndPosCells(cell, xOrY) {
      try {
        var flag = xOrY.toLowerCase() === "x";
        var end = domUtils.getXY(cell)[flag ? "x" : "y"] + cell["offset" + (flag ? "Width" : "Height")];
        var rows = this.table.rows;
        var cells = null;
        var returns = [];
        for (var i = 0; i < this.rowsNum; i++) {
          cells = rows[i].cells;
          for (var j = 0, tmpCell; (tmpCell = cells[j++]); ) {
            var tmpEnd = domUtils.getXY(tmpCell)[flag ? "x" : "y"] + tmpCell["offset" + (flag ? "Width" : "Height")];
            //对应行的td已经被上面行rowSpan了
            if (tmpEnd > end && flag) break;
            if (cell == tmpCell || end == tmpEnd) {
              //只获取单一的单元格
              //todo 仅获取单一单元格在特定情况下会造成returns为空，从而影响后续的拖拽实现，修正这个。需考虑性能
              if (tmpCell[flag ? "colSpan" : "rowSpan"] == 1) {
                returns.push(tmpCell);
              }
              if (flag) break;
            }
          }
        }
        return returns;
      } catch (e) {
        showError(e);
      }
    },
    setCellContent(cell, content) {
      cell.innerHTML = content || (browser.ie ? domUtils.fillChar : "<br />");
    },
    cloneCell: UETable.cloneCell,
    /**
     * 获取跟当前单元格的右边竖线为左边的所有未合并单元格
     */
    getSameStartPosXCells(cell) {
      try {
        var start = domUtils.getXY(cell).x + cell.offsetWidth;
        var rows = this.table.rows;
        var cells;
        var returns = [];
        for (var i = 0; i < this.rowsNum; i++) {
          cells = rows[i].cells;
          for (var j = 0, tmpCell; (tmpCell = cells[j++]); ) {
            var tmpStart = domUtils.getXY(tmpCell).x;
            if (tmpStart > start) break;
            if (tmpStart == start && tmpCell.colSpan == 1) {
              returns.push(tmpCell);
              break;
            }
          }
        }
        return returns;
      } catch (e) {
        showError(e);
      }
    },
    /**
     * 更新table对应的索引表
     */
    update(table) {
      this.table = table || this.table;
      this.selectedTds = [];
      this.cellsRange = {};
      this.indexTable = [];
      var rows = this.table.rows;
      var rowsNum = this.getMaxRows();
      var dNum = rowsNum - rows.length;
      var colsNum = this.getMaxCols();
      while (dNum--) {
        this.table.insertRow(rows.length);
      }
      this.rowsNum = rowsNum;
      this.colsNum = colsNum;
      for (var i = 0, len = rows.length; i < len; i++) {
        this.indexTable[i] = new Array(colsNum);
      }
      //填充索引表
      for (var rowIndex = 0, row; (row = rows[rowIndex]); rowIndex++) {
        for (var cellIndex = 0, cell, cells = row.cells; (cell = cells[cellIndex]); cellIndex++) {
          //修正整行被rowSpan时导致的行数计算错误
          if (cell.rowSpan > rowsNum) {
            cell.rowSpan = rowsNum;
          }
          var colIndex = cellIndex;
          var rowSpan = cell.rowSpan || 1;
          var colSpan = cell.colSpan || 1;
          //当已经被上一行rowSpan或者被前一列colSpan了，则跳到下一个单元格进行
          while (this.indexTable[rowIndex][colIndex]) colIndex++;
          for (var j = 0; j < rowSpan; j++) {
            for (var k = 0; k < colSpan; k++) {
              this.indexTable[rowIndex + j][colIndex + k] = {
                rowIndex,
                cellIndex,
                colIndex,
                rowSpan,
                colSpan
              };
            }
          }
        }
      }
      //修复残缺td
      for (j = 0; j < rowsNum; j++) {
        for (k = 0; k < colsNum; k++) {
          if (this.indexTable[j][k] === undefined) {
            row = rows[j];
            cell = row.cells[row.cells.length - 1];
            cell = cell ? cell.cloneNode(true) : this.table.ownerDocument.createElement("td");
            this.setCellContent(cell);
            if (cell.colSpan !== 1) cell.colSpan = 1;
            if (cell.rowSpan !== 1) cell.rowSpan = 1;
            row.appendChild(cell);
            this.indexTable[j][k] = {
              rowIndex: j,
              cellIndex: cell.cellIndex,
              colIndex: k,
              rowSpan: 1,
              colSpan: 1
            };
          }
        }
      }

      //当框选后删除行或者列后撤销，需要重建选区。
      var tds = domUtils.getElementsByTagName(this.table, "td");

      var selectTds = [];
      utils.each(tds, td => {
        if (domUtils.hasClass(td, "selectTdClass")) {
          selectTds.push(td);
        }
      });
      if (selectTds.length) {
        var start = selectTds[0];
        var end = selectTds[selectTds.length - 1];
        var startInfo = this.getCellInfo(start);
        var endInfo = this.getCellInfo(end);
        this.selectedTds = selectTds;
        this.cellsRange = {
          beginRowIndex: startInfo.rowIndex,
          beginColIndex: startInfo.colIndex,
          endRowIndex: endInfo.rowIndex + endInfo.rowSpan - 1,
          endColIndex: endInfo.colIndex + endInfo.colSpan - 1
        };
      }
      //给第一行设置firstRow的样式名称,在排序图标的样式上使用到
      if (!domUtils.hasClass(this.table.rows[0], "firstRow")) {
        domUtils.addClass(this.table.rows[0], "firstRow");
        for (var i = 1; i < this.table.rows.length; i++) {
          domUtils.removeClasses(this.table.rows[i], "firstRow");
        }
      }
    },
    /**
     * 获取单元格的索引信息
     */
    getCellInfo(cell) {
      if (!cell) return;
      var cellIndex = cell.cellIndex;
      var rowIndex = cell.parentNode.rowIndex;
      var rowInfo = this.indexTable[rowIndex];
      var numCols = this.colsNum;
      for (var colIndex = cellIndex; colIndex < numCols; colIndex++) {
        var cellInfo = rowInfo[colIndex];
        if (cellInfo.rowIndex === rowIndex && cellInfo.cellIndex === cellIndex) {
          return cellInfo;
        }
      }
    },
    /**
     * 根据行列号获取单元格
     */
    getCell(rowIndex, cellIndex) {
      return (rowIndex < this.rowsNum && this.table.rows[rowIndex].cells[cellIndex]) || null;
    },
    /**
     * 删除单元格
     */
    deleteCell(cell, rowIndex) {
      rowIndex = typeof rowIndex == "number" ? rowIndex : cell.parentNode.rowIndex;
      var row = this.table.rows[rowIndex];
      row.deleteCell(cell.cellIndex);
    },
    /**
     * 根据始末两个单元格获取被框选的所有单元格范围
     */
    getCellsRange(cellA, cellB) {
      function checkRange(beginRowIndex, beginColIndex, endRowIndex, endColIndex) {
        var tmpBeginRowIndex = beginRowIndex;
        var tmpBeginColIndex = beginColIndex;
        var tmpEndRowIndex = endRowIndex;
        var tmpEndColIndex = endColIndex;
        var cellInfo;
        var colIndex;
        var rowIndex;
        // 通过indexTable检查是否存在超出TableRange上边界的情况
        if (beginRowIndex > 0) {
          for (colIndex = beginColIndex; colIndex < endColIndex; colIndex++) {
            cellInfo = me.indexTable[beginRowIndex][colIndex];
            rowIndex = cellInfo.rowIndex;
            if (rowIndex < beginRowIndex) {
              tmpBeginRowIndex = Math.min(rowIndex, tmpBeginRowIndex);
            }
          }
        }
        // 通过indexTable检查是否存在超出TableRange右边界的情况
        if (endColIndex < me.colsNum) {
          for (rowIndex = beginRowIndex; rowIndex < endRowIndex; rowIndex++) {
            cellInfo = me.indexTable[rowIndex][endColIndex];
            colIndex = cellInfo.colIndex + cellInfo.colSpan - 1;
            if (colIndex > endColIndex) {
              tmpEndColIndex = Math.max(colIndex, tmpEndColIndex);
            }
          }
        }
        // 检查是否有超出TableRange下边界的情况
        if (endRowIndex < me.rowsNum) {
          for (colIndex = beginColIndex; colIndex < endColIndex; colIndex++) {
            cellInfo = me.indexTable[endRowIndex][colIndex];
            rowIndex = cellInfo.rowIndex + cellInfo.rowSpan - 1;
            if (rowIndex > endRowIndex) {
              tmpEndRowIndex = Math.max(rowIndex, tmpEndRowIndex);
            }
          }
        }
        // 检查是否有超出TableRange左边界的情况
        if (beginColIndex > 0) {
          for (rowIndex = beginRowIndex; rowIndex < endRowIndex; rowIndex++) {
            cellInfo = me.indexTable[rowIndex][beginColIndex];
            colIndex = cellInfo.colIndex;
            if (colIndex < beginColIndex) {
              tmpBeginColIndex = Math.min(cellInfo.colIndex, tmpBeginColIndex);
            }
          }
        }
        //递归调用直至所有完成所有框选单元格的扩展
        if (
          tmpBeginRowIndex != beginRowIndex ||
          tmpBeginColIndex != beginColIndex ||
          tmpEndRowIndex != endRowIndex ||
          tmpEndColIndex != endColIndex
        ) {
          return checkRange(tmpBeginRowIndex, tmpBeginColIndex, tmpEndRowIndex, tmpEndColIndex);
        } else {
          // 不需要扩展TableRange的情况
          return {
            beginRowIndex,
            beginColIndex,
            endRowIndex,
            endColIndex
          };
        }
      }

      try {
        var me = this;
        var cellAInfo = me.getCellInfo(cellA);
        if (cellA === cellB) {
          return {
            beginRowIndex: cellAInfo.rowIndex,
            beginColIndex: cellAInfo.colIndex,
            endRowIndex: cellAInfo.rowIndex + cellAInfo.rowSpan - 1,
            endColIndex: cellAInfo.colIndex + cellAInfo.colSpan - 1
          };
        }
        var cellBInfo = me.getCellInfo(cellB);

        // 计算TableRange的四个边
        var beginRowIndex = Math.min(cellAInfo.rowIndex, cellBInfo.rowIndex);

        var beginColIndex = Math.min(cellAInfo.colIndex, cellBInfo.colIndex);

        var endRowIndex = Math.max(
          cellAInfo.rowIndex + cellAInfo.rowSpan - 1,
          cellBInfo.rowIndex + cellBInfo.rowSpan - 1
        );

        var endColIndex = Math.max(
          cellAInfo.colIndex + cellAInfo.colSpan - 1,
          cellBInfo.colIndex + cellBInfo.colSpan - 1
        );

        return checkRange(beginRowIndex, beginColIndex, endRowIndex, endColIndex);
      } catch (e) {
        //throw e;
      }
    },
    /**
     * 依据cellsRange获取对应的单元格集合
     */
    getCells(range) {
      //每次获取cells之前必须先清除上次的选择，否则会对后续获取操作造成影响
      this.clearSelected();
      var beginRowIndex = range.beginRowIndex;
      var beginColIndex = range.beginColIndex;
      var endRowIndex = range.endRowIndex;
      var endColIndex = range.endColIndex;
      var cellInfo;
      var rowIndex;
      var colIndex;
      var tdHash = {};
      var returnTds = [];
      for (var i = beginRowIndex; i <= endRowIndex; i++) {
        for (var j = beginColIndex; j <= endColIndex; j++) {
          cellInfo = this.indexTable[i][j];
          rowIndex = cellInfo.rowIndex;
          colIndex = cellInfo.colIndex;
          // 如果Cells里已经包含了此Cell则跳过
          var key = rowIndex + "|" + colIndex;
          if (tdHash[key]) continue;
          tdHash[key] = 1;
          if (
            rowIndex < i ||
            colIndex < j ||
            rowIndex + cellInfo.rowSpan - 1 > endRowIndex ||
            colIndex + cellInfo.colSpan - 1 > endColIndex
          ) {
            return null;
          }
          returnTds.push(this.getCell(rowIndex, cellInfo.cellIndex));
        }
      }
      return returnTds;
    },
    /**
     * 清理已经选中的单元格
     */
    clearSelected() {
      UETable.removeSelectedClass(this.selectedTds);
      this.selectedTds = [];
      this.cellsRange = {};
    },
    /**
     * 根据range设置已经选中的单元格
     */
    setSelected(range) {
      var cells = this.getCells(range);
      UETable.addSelectedClass(cells);
      this.selectedTds = cells;
      this.cellsRange = range;
    },
    isFullRow() {
      var range = this.cellsRange;
      return range.endColIndex - range.beginColIndex + 1 == this.colsNum;
    },
    isFullCol() {
      var range = this.cellsRange;
      var table = this.table;
      var ths = table.getElementsByTagName("th");
      var rows = range.endRowIndex - range.beginRowIndex + 1;
      return !ths.length ? rows == this.rowsNum : rows == this.rowsNum || rows == this.rowsNum - 1;
    },
    /**
     * 获取视觉上的前置单元格，默认是左边，top传入时
     * @param cell
     * @param top
     */
    getNextCell(cell, bottom, ignoreRange) {
      try {
        var cellInfo = this.getCellInfo(cell);
        var nextRowIndex;
        var nextColIndex;
        var len = this.selectedTds.length && !ignoreRange;
        var range = this.cellsRange;
        //末行或者末列没有后置单元格
        if (
          (!bottom && cellInfo.rowIndex == 0) ||
          (bottom &&
            (!len ? cellInfo.rowIndex + cellInfo.rowSpan > this.rowsNum - 1 : range.endRowIndex == this.rowsNum - 1))
        )
          return null;

        nextRowIndex = !bottom
          ? !len
            ? cellInfo.rowIndex - 1
            : range.beginRowIndex - 1
          : !len
          ? cellInfo.rowIndex + cellInfo.rowSpan
          : range.endRowIndex + 1;
        nextColIndex = !len ? cellInfo.colIndex : range.beginColIndex;
        return this.getCell(
          this.indexTable[nextRowIndex][nextColIndex].rowIndex,
          this.indexTable[nextRowIndex][nextColIndex].cellIndex
        );
      } catch (e) {
        showError(e);
      }
    },
    getPreviewCell(cell, top) {
      try {
        var cellInfo = this.getCellInfo(cell);
        var previewRowIndex;
        var previewColIndex;
        var len = this.selectedTds.length;
        var range = this.cellsRange;
        //首行或者首列没有前置单元格
        if (
          (!top && (!len ? !cellInfo.colIndex : !range.beginColIndex)) ||
          (top && (!len ? cellInfo.rowIndex > this.colsNum - 1 : range.endColIndex == this.colsNum - 1))
        )
          return null;

        previewRowIndex = !top
          ? !len
            ? cellInfo.rowIndex
            : range.beginRowIndex
          : !len
          ? cellInfo.rowIndex < 1
            ? 0
            : cellInfo.rowIndex - 1
          : range.beginRowIndex;
        previewColIndex = !top
          ? !len
            ? cellInfo.colIndex < 1
              ? 0
              : cellInfo.colIndex - 1
            : range.beginColIndex - 1
          : !len
          ? cellInfo.colIndex
          : range.endColIndex + 1;
        return this.getCell(
          this.indexTable[previewRowIndex][previewColIndex].rowIndex,
          this.indexTable[previewRowIndex][previewColIndex].cellIndex
        );
      } catch (e) {
        showError(e);
      }
    },
    /**
     * 移动单元格中的内容
     */
    moveContent(cellTo, cellFrom) {
      if (UETable.isEmptyBlock(cellFrom)) return;
      if (UETable.isEmptyBlock(cellTo)) {
        cellTo.innerHTML = cellFrom.innerHTML;
        return;
      }
      var child = cellTo.lastChild;
      if (child.nodeType == 3 || !dtd.$block[child.tagName]) {
        cellTo.appendChild(cellTo.ownerDocument.createElement("br"));
      }
      while ((child = cellFrom.firstChild)) {
        cellTo.appendChild(child);
      }
    },
    /**
     * 向右合并单元格
     */
    mergeRight(cell) {
      var cellInfo = this.getCellInfo(cell);
      var rightColIndex = cellInfo.colIndex + cellInfo.colSpan;
      var rightCellInfo = this.indexTable[cellInfo.rowIndex][rightColIndex];
      var rightCell = this.getCell(rightCellInfo.rowIndex, rightCellInfo.cellIndex);
      //合并
      cell.colSpan = cellInfo.colSpan + rightCellInfo.colSpan;
      //被合并的单元格不应存在宽度属性
      cell.removeAttribute("width");
      //移动内容
      this.moveContent(cell, rightCell);
      //删掉被合并的Cell
      this.deleteCell(rightCell, rightCellInfo.rowIndex);
      this.update();
    },
    /**
     * 向下合并单元格
     */
    mergeDown(cell) {
      var cellInfo = this.getCellInfo(cell);
      var downRowIndex = cellInfo.rowIndex + cellInfo.rowSpan;
      var downCellInfo = this.indexTable[downRowIndex][cellInfo.colIndex];
      var downCell = this.getCell(downCellInfo.rowIndex, downCellInfo.cellIndex);
      cell.rowSpan = cellInfo.rowSpan + downCellInfo.rowSpan;
      cell.removeAttribute("height");
      this.moveContent(cell, downCell);
      this.deleteCell(downCell, downCellInfo.rowIndex);
      this.update();
    },
    /**
     * 合并整个range中的内容
     */
    mergeRange() {
      //由于合并操作可以在任意时刻进行，所以无法通过鼠标位置等信息实时生成range，只能通过缓存实例中的cellsRange对象来访问
      var range = this.cellsRange;

      var leftTopCell = this.getCell(
        range.beginRowIndex,
        this.indexTable[range.beginRowIndex][range.beginColIndex].cellIndex
      );

      // 这段关于行表头或者列表头的特殊处理会导致表头合并范围错误
      // 为什么有这段代码的原因未明，暂且注释掉，希望原作者看到后出面说明下
      // if (
      //   leftTopCell.tagName == "TH" &&
      //   range.endRowIndex !== range.beginRowIndex
      // ) {
      //   var index = this.indexTable,
      //     info = this.getCellInfo(leftTopCell);
      //   leftTopCell = this.getCell(1, index[1][info.colIndex].cellIndex);
      //   range = this.getCellsRange(
      //     leftTopCell,
      //     this.getCell(
      //       index[this.rowsNum - 1][info.colIndex].rowIndex,
      //       index[this.rowsNum - 1][info.colIndex].cellIndex
      //     )
      //   );
      // }

      // 删除剩余的Cells
      var cells = this.getCells(range);
      for (var i = 0, ci; (ci = cells[i++]); ) {
        if (ci !== leftTopCell) {
          this.moveContent(leftTopCell, ci);
          this.deleteCell(ci);
        }
      }
      // 修改左上角Cell的rowSpan和colSpan，并调整宽度属性设置
      leftTopCell.rowSpan = range.endRowIndex - range.beginRowIndex + 1;
      leftTopCell.rowSpan > 1 && leftTopCell.removeAttribute("height");
      leftTopCell.colSpan = range.endColIndex - range.beginColIndex + 1;
      leftTopCell.colSpan > 1 && leftTopCell.removeAttribute("width");
      if (leftTopCell.rowSpan == this.rowsNum && leftTopCell.colSpan != 1) {
        leftTopCell.colSpan = 1;
      }

      if (leftTopCell.colSpan == this.colsNum && leftTopCell.rowSpan != 1) {
        var rowIndex = leftTopCell.parentNode.rowIndex;
        //解决IE下的表格操作问题
        if (this.table.deleteRow) {
          for (var i = rowIndex + 1, curIndex = rowIndex + 1, len = leftTopCell.rowSpan; i < len; i++) {
            this.table.deleteRow(curIndex);
          }
        } else {
          for (var i = 0, len = leftTopCell.rowSpan - 1; i < len; i++) {
            var row = this.table.rows[rowIndex + 1];
            row.parentNode.removeChild(row);
          }
        }
        leftTopCell.rowSpan = 1;
      }
      this.update();
    },
    /**
     * 插入一行单元格
     */
    insertRow(rowIndex, sourceCell) {
      var numCols = this.colsNum;
      var table = this.table;
      var row = table.insertRow(rowIndex);
      var cell;
      var thead = null;
      var isInsertTitle = typeof sourceCell == "string" && sourceCell.toUpperCase() == "TH";

      function replaceTdToTh(colIndex, cell, tableRow) {
        if (colIndex == 0) {
          var tr = tableRow.nextSibling || tableRow.previousSibling;
          var th = tr.cells[colIndex];
          if (th.tagName == "TH") {
            th = cell.ownerDocument.createElement("th");
            th.appendChild(cell.firstChild);
            tableRow.insertBefore(th, cell);
            domUtils.remove(cell);
          }
        } else {
          if (cell.tagName == "TH") {
            var td = cell.ownerDocument.createElement("td");
            td.appendChild(cell.firstChild);
            tableRow.insertBefore(td, cell);
            domUtils.remove(cell);
          }
        }
      }

      //首行直接插入,无需考虑部分单元格被rowspan的情况
      if (rowIndex == 0 || rowIndex == this.rowsNum) {
        for (var colIndex = 0; colIndex < numCols; colIndex++) {
          cell = this.cloneCell(sourceCell, true);
          this.setCellContent(cell);
          cell.getAttribute("vAlign") && cell.setAttribute("vAlign", cell.getAttribute("vAlign"));
          row.appendChild(cell);
          if (!isInsertTitle) replaceTdToTh(colIndex, cell, row);
        }

        if (isInsertTitle) {
          thead = table.createTHead();
          thead.insertBefore(row, thead.firstChild);
        }
      } else {
        var infoRow = this.indexTable[rowIndex];
        var cellIndex = 0;
        for (colIndex = 0; colIndex < numCols; colIndex++) {
          var cellInfo = infoRow[colIndex];
          //如果存在某个单元格的rowspan穿过待插入行的位置，则修改该单元格的rowspan即可，无需插入单元格
          if (cellInfo.rowIndex < rowIndex) {
            cell = this.getCell(cellInfo.rowIndex, cellInfo.cellIndex);
            cell.rowSpan = cellInfo.rowSpan + 1;
          } else {
            cell = this.cloneCell(sourceCell, true);
            this.setCellContent(cell);
            row.appendChild(cell);
          }
          if (!isInsertTitle) replaceTdToTh(colIndex, cell, row);
        }
      }
      //框选时插入不触发contentchange，需要手动更新索引。
      this.update();
      return row;
    },
    /**
     * 删除一行单元格
     * @param rowIndex
     */
    deleteRow(rowIndex) {
      var row = this.table.rows[rowIndex]; //处理计数
      var infoRow = this.indexTable[rowIndex];
      var colsNum = this.colsNum;
      var count = 0;
      for (var colIndex = 0; colIndex < colsNum; ) {
        var cellInfo = infoRow[colIndex];
        var cell = this.getCell(cellInfo.rowIndex, cellInfo.cellIndex);
        if (cell.rowSpan > 1) {
          if (cellInfo.rowIndex == rowIndex) {
            var clone = cell.cloneNode(true);
            clone.rowSpan = cell.rowSpan - 1;
            clone.innerHTML = "";
            cell.rowSpan = 1;
            var nextRowIndex = rowIndex + 1;
            var nextRow = this.table.rows[nextRowIndex];
            var insertCellIndex;
            var preMerged = this.getPreviewMergedCellsNum(nextRowIndex, colIndex) - count;
            if (preMerged < colIndex) {
              insertCellIndex = colIndex - preMerged - 1;
              //nextRow.insertCell(insertCellIndex);
              domUtils.insertAfter(nextRow.cells[insertCellIndex], clone);
            } else {
              if (nextRow.cells.length) nextRow.insertBefore(clone, nextRow.cells[0]);
            }
            count += 1;
            //cell.parentNode.removeChild(cell);
          }
        }
        colIndex += cell.colSpan || 1;
      }
      var deleteTds = [];
      var cacheMap = {};
      for (colIndex = 0; colIndex < colsNum; colIndex++) {
        var tmpRowIndex = infoRow[colIndex].rowIndex;
        var tmpCellIndex = infoRow[colIndex].cellIndex;
        var key = tmpRowIndex + "_" + tmpCellIndex;
        if (cacheMap[key]) continue;
        cacheMap[key] = 1;
        cell = this.getCell(tmpRowIndex, tmpCellIndex);
        deleteTds.push(cell);
      }
      var mergeTds = [];
      utils.each(deleteTds, td => {
        if (td.rowSpan == 1) {
          td.parentNode.removeChild(td);
        } else {
          mergeTds.push(td);
        }
      });
      utils.each(mergeTds, td => {
        td.rowSpan--;
      });
      row.parentNode.removeChild(row);
      //浏览器方法本身存在bug,采用自定义方法删除
      //this.table.deleteRow(rowIndex);
      this.update();
    },
    insertCol(colIndex, sourceCell, defaultValue) {
      var rowsNum = this.rowsNum;
      var rowIndex = 0;
      var tableRow;
      var cell;

      var backWidth = parseInt(
        (this.table.offsetWidth - (this.colsNum + 1) * 20 - (this.colsNum + 1)) / (this.colsNum + 1),
        10
      );

      var isInsertTitleCol = typeof sourceCell == "string" && sourceCell.toUpperCase() == "TH";

      function replaceTdToTh(rowIndex, cell, tableRow) {
        if (rowIndex == 0) {
          var th = cell.nextSibling || cell.previousSibling;
          if (th.tagName == "TH") {
            th = cell.ownerDocument.createElement("th");
            th.appendChild(cell.firstChild);
            tableRow.insertBefore(th, cell);
            domUtils.remove(cell);
          }
        } else {
          if (cell.tagName == "TH") {
            var td = cell.ownerDocument.createElement("td");
            td.appendChild(cell.firstChild);
            tableRow.insertBefore(td, cell);
            domUtils.remove(cell);
          }
        }
      }

      var preCell;
      if (colIndex == 0 || colIndex == this.colsNum) {
        for (; rowIndex < rowsNum; rowIndex++) {
          tableRow = this.table.rows[rowIndex];
          preCell = tableRow.cells[colIndex == 0 ? colIndex : tableRow.cells.length];
          cell = this.cloneCell(sourceCell, true); //tableRow.insertCell(colIndex == 0 ? colIndex : tableRow.cells.length);
          this.setCellContent(cell);
          cell.setAttribute("vAlign", cell.getAttribute("vAlign"));
          preCell && cell.setAttribute("width", preCell.getAttribute("width"));
          if (!colIndex) {
            tableRow.insertBefore(cell, tableRow.cells[0]);
          } else {
            domUtils.insertAfter(tableRow.cells[tableRow.cells.length - 1], cell);
          }
          if (!isInsertTitleCol) replaceTdToTh(rowIndex, cell, tableRow);
        }
      } else {
        for (; rowIndex < rowsNum; rowIndex++) {
          var cellInfo = this.indexTable[rowIndex][colIndex];
          if (cellInfo.colIndex < colIndex) {
            cell = this.getCell(cellInfo.rowIndex, cellInfo.cellIndex);
            cell.colSpan = cellInfo.colSpan + 1;
          } else {
            tableRow = this.table.rows[rowIndex];
            preCell = tableRow.cells[cellInfo.cellIndex];

            cell = this.cloneCell(sourceCell, true); //tableRow.insertCell(cellInfo.cellIndex);
            this.setCellContent(cell);
            cell.setAttribute("vAlign", cell.getAttribute("vAlign"));
            preCell && cell.setAttribute("width", preCell.getAttribute("width"));
            //防止IE下报错
            preCell ? tableRow.insertBefore(cell, preCell) : tableRow.appendChild(cell);
          }
          if (!isInsertTitleCol) replaceTdToTh(rowIndex, cell, tableRow);
        }
      }
      //框选时插入不触发contentchange，需要手动更新索引
      this.update();
      this.updateWidth(backWidth, defaultValue || {tdPadding: 10, tdBorder: 1});
    },
    updateWidth(width, defaultValue) {
      var table = this.table;
      var tmpWidth = UETable.getWidth(table) - defaultValue.tdPadding * 2 - defaultValue.tdBorder + width;
      if (tmpWidth < table.ownerDocument.body.offsetWidth) {
        table.setAttribute("width", tmpWidth);
        return;
      }
      var tds = domUtils.getElementsByTagName(this.table, "td th");
      utils.each(tds, td => {
        td.setAttribute("width", width);
      });
    },
    deleteCol(colIndex) {
      var indexTable = this.indexTable;
      var tableRows = this.table.rows;
      var backTableWidth = this.table.getAttribute("width");
      var backTdWidth = 0;
      var rowsNum = this.rowsNum;
      var cacheMap = {};
      for (var rowIndex = 0; rowIndex < rowsNum; ) {
        var infoRow = indexTable[rowIndex];
        var cellInfo = infoRow[colIndex];
        var key = cellInfo.rowIndex + "_" + cellInfo.colIndex;
        // 跳过已经处理过的Cell
        if (cacheMap[key]) continue;
        cacheMap[key] = 1;
        var cell = this.getCell(cellInfo.rowIndex, cellInfo.cellIndex);
        if (!backTdWidth) backTdWidth = cell && parseInt(cell.offsetWidth / cell.colSpan, 10).toFixed(0);
        // 如果Cell的colSpan大于1, 就修改colSpan, 否则就删掉这个Cell
        if (cell.colSpan > 1) {
          cell.colSpan--;
        } else {
          tableRows[rowIndex].deleteCell(cellInfo.cellIndex);
        }
        rowIndex += cellInfo.rowSpan || 1;
      }
      this.table.setAttribute("width", backTableWidth - backTdWidth);
      this.update();
    },
    splitToCells(cell) {
      var me = this;
      var cells = this.splitToRows(cell);
      utils.each(cells, cell => {
        me.splitToCols(cell);
      });
    },
    splitToRows(cell) {
      var cellInfo = this.getCellInfo(cell);
      var rowIndex = cellInfo.rowIndex;
      var colIndex = cellInfo.colIndex;
      var results = [];
      // 修改Cell的rowSpan
      cell.rowSpan = 1;
      results.push(cell);
      // 补齐单元格
      for (var i = rowIndex, endRow = rowIndex + cellInfo.rowSpan; i < endRow; i++) {
        if (i == rowIndex) continue;
        var tableRow = this.table.rows[i];
        var tmpCell = tableRow.insertCell(colIndex - this.getPreviewMergedCellsNum(i, colIndex));
        tmpCell.colSpan = cellInfo.colSpan;
        this.setCellContent(tmpCell);
        tmpCell.setAttribute("vAlign", cell.getAttribute("vAlign"));
        tmpCell.setAttribute("align", cell.getAttribute("align"));
        if (cell.style.cssText) {
          tmpCell.style.cssText = cell.style.cssText;
        }
        results.push(tmpCell);
      }
      this.update();
      return results;
    },
    getPreviewMergedCellsNum(rowIndex, colIndex) {
      var indexRow = this.indexTable[rowIndex];
      var num = 0;
      for (var i = 0; i < colIndex; ) {
        var colSpan = indexRow[i].colSpan;
        var tmpRowIndex = indexRow[i].rowIndex;
        num += colSpan - (tmpRowIndex == rowIndex ? 1 : 0);
        i += colSpan;
      }
      return num;
    },
    splitToCols(cell) {
      var backWidth = (cell.offsetWidth / cell.colSpan - 22).toFixed(0);
      var cellInfo = this.getCellInfo(cell);
      var rowIndex = cellInfo.rowIndex;
      var colIndex = cellInfo.colIndex;
      var results = [];
      // 修改Cell的rowSpan
      cell.colSpan = 1;
      cell.setAttribute("width", backWidth);
      results.push(cell);
      // 补齐单元格
      for (var j = colIndex, endCol = colIndex + cellInfo.colSpan; j < endCol; j++) {
        if (j == colIndex) continue;
        var tableRow = this.table.rows[rowIndex];
        var tmpCell = tableRow.insertCell(this.indexTable[rowIndex][j].cellIndex + 1);
        tmpCell.rowSpan = cellInfo.rowSpan;
        this.setCellContent(tmpCell);
        tmpCell.setAttribute("vAlign", cell.getAttribute("vAlign"));
        tmpCell.setAttribute("align", cell.getAttribute("align"));
        tmpCell.setAttribute("width", backWidth);
        if (cell.style.cssText) {
          tmpCell.style.cssText = cell.style.cssText;
        }
        //处理th的情况
        if (cell.tagName == "TH") {
          var th = cell.ownerDocument.createElement("th");
          th.appendChild(tmpCell.firstChild);
          th.setAttribute("vAlign", cell.getAttribute("vAlign"));
          th.rowSpan = tmpCell.rowSpan;
          tableRow.insertBefore(th, tmpCell);
          domUtils.remove(tmpCell);
        }
        results.push(tmpCell);
      }
      this.update();
      return results;
    },
    isLastCell(cell, rowsNum, colsNum) {
      rowsNum = rowsNum || this.rowsNum;
      colsNum = colsNum || this.colsNum;
      var cellInfo = this.getCellInfo(cell);
      return cellInfo.rowIndex + cellInfo.rowSpan == rowsNum && cellInfo.colIndex + cellInfo.colSpan == colsNum;
    },
    getLastCell(cells) {
      cells = cells || this.table.getElementsByTagName("td");
      var firstInfo = this.getCellInfo(cells[0]);
      var me = this;
      var last = cells[0];
      var tr = last.parentNode;
      var cellsNum = 0;
      var cols = 0;
      var rows;
      utils.each(cells, cell => {
        if (cell.parentNode == tr) cols += cell.colSpan || 1;
        cellsNum += cell.rowSpan * cell.colSpan || 1;
      });
      rows = cellsNum / cols;
      utils.each(cells, cell => {
        if (me.isLastCell(cell, rows, cols)) {
          last = cell;
          return false;
        }
      });
      return last;
    },
    selectRow(rowIndex) {
      var indexRow = this.indexTable[rowIndex];
      var start = this.getCell(indexRow[0].rowIndex, indexRow[0].cellIndex);
      var end = this.getCell(indexRow[this.colsNum - 1].rowIndex, indexRow[this.colsNum - 1].cellIndex);
      var range = this.getCellsRange(start, end);
      this.setSelected(range);
    },
    selectTable() {
      var tds = this.table.getElementsByTagName("td");
      var range = this.getCellsRange(tds[0], tds[tds.length - 1]);
      this.setSelected(range);
    },
    setBackground(cells, value) {
      if (typeof value === "string") {
        utils.each(cells, cell => {
          cell.style.backgroundColor = value;
        });
      } else if (typeof value === "object") {
        value = utils.extend(
          {
            repeat: true,
            colorList: ["#ddd", "#fff"]
          },
          value
        );
        var rowIndex = this.getCellInfo(cells[0]).rowIndex;
        var count = 0;
        var colors = value.colorList;

        var getColor = (list, index, repeat) => (list[index] ? list[index] : repeat ? list[index % list.length] : "");

        for (var i = 0, cell; (cell = cells[i++]); ) {
          var cellInfo = this.getCellInfo(cell);
          cell.style.backgroundColor = getColor(
            colors,
            rowIndex + count == cellInfo.rowIndex ? count : ++count,
            value.repeat
          );
        }
      }
    },
    removeBackground(cells) {
      utils.each(cells, cell => {
        cell.style.backgroundColor = "";
      });
    }
  };
  function showError(e) {}
})();
