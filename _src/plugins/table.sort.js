/**
 * Created with JetBrains PhpStorm.
 * User: Jinqn
 * Date: 13-10-12
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */

UE.UETable.prototype.sortTable = function(sortByCellIndex, compareFn) {
  var table = this.table;
  var rows = table.rows;
  var trArray = [];
  var flag = rows[0].cells[0].tagName === "TH";
  var lastRowIndex = 0;
  if (this.selectedTds.length) {
    var range = this.cellsRange;
    var len = range.endRowIndex + 1;
    for (var i = range.beginRowIndex; i < len; i++) {
      trArray[i] = rows[i];
    }
    trArray.splice(0, range.beginRowIndex);
    lastRowIndex = range.endRowIndex + 1 === this.rowsNum ? 0 : range.endRowIndex + 1;
  } else {
    for (var i = 0, len = rows.length; i < len; i++) {
      trArray[i] = rows[i];
    }
  }

  var Fn = {
    reversecurrent(td1, td2) {
      return 1;
    },
    orderbyasc(td1, td2) {
      var value1 = td1.innerText || td1.textContent;
      var value2 = td2.innerText || td2.textContent;
      return value1.localeCompare(value2);
    },
    reversebyasc(td1, td2) {
      var value1 = td1.innerHTML;
      var value2 = td2.innerHTML;
      return value2.localeCompare(value1);
    },
    orderbynum(td1, td2) {
      var value1 = td1[browser.ie ? "innerText" : "textContent"].match(/\d+/);
      var value2 = td2[browser.ie ? "innerText" : "textContent"].match(/\d+/);
      if (value1) value1 = +value1[0];
      if (value2) value2 = +value2[0];
      return (value1 || 0) - (value2 || 0);
    },
    reversebynum(td1, td2) {
      var value1 = td1[browser.ie ? "innerText" : "textContent"].match(/\d+/);
      var value2 = td2[browser.ie ? "innerText" : "textContent"].match(/\d+/);
      if (value1) value1 = +value1[0];
      if (value2) value2 = +value2[0];
      return (value2 || 0) - (value1 || 0);
    }
  };

  //对表格设置排序的标记data-sort-type
  table.setAttribute("data-sort-type", compareFn && typeof compareFn === "string" && Fn[compareFn] ? compareFn : "");

  //th不参与排序
  flag && trArray.splice(0, 1);
  trArray = utils.sort(trArray, function(tr1, tr2) {
    var result;
    if (compareFn && typeof compareFn === "function") {
      result = compareFn.call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
    } else if (compareFn && typeof compareFn === "number") {
      result = 1;
    } else if (compareFn && typeof compareFn === "string" && Fn[compareFn]) {
      result = Fn[compareFn].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
    } else {
      result = Fn["orderbyasc"].call(this, tr1.cells[sortByCellIndex], tr2.cells[sortByCellIndex]);
    }
    return result;
  });
  var fragment = table.ownerDocument.createDocumentFragment();
  for (var j = 0, len = trArray.length; j < len; j++) {
    fragment.appendChild(trArray[j]);
  }
  var tbody = table.getElementsByTagName("tbody")[0];
  if (!lastRowIndex) {
    tbody.appendChild(fragment);
  } else {
    tbody.insertBefore(fragment, rows[lastRowIndex - range.endRowIndex + range.beginRowIndex - 1]);
  }
};

UE.plugins["tablesort"] = function() {
  var me = this;
  var UT = UE.UETable;

  var getUETable = tdOrTable => UT.getUETable(tdOrTable);

  var getTableItemsByRange = editor => UT.getTableItemsByRange(editor);

  me.ready(() => {
    //添加表格可排序的样式
    utils.cssRule(
      "tablesort",
      "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;" +
        "   background-image:url(" +
        me.options.themePath +
        me.options.theme +
        "/images/sortable.png);}",
      me.document
    );

    //做单元格合并操作时,清除可排序标识
    me.addListener("afterexeccommand", function(type, cmd) {
      if (cmd == "mergeright" || cmd == "mergedown" || cmd == "mergecells") {
        this.execCommand("disablesort");
      }
    });
  });

  //表格排序
  UE.commands["sorttable"] = {
    queryCommandState() {
      var me = this;
      var tableItems = getTableItemsByRange(me);
      if (!tableItems.cell) return -1;
      var table = tableItems.table;
      var cells = table.getElementsByTagName("td");
      for (var i = 0, cell; (cell = cells[i++]); ) {
        if (cell.rowSpan != 1 || cell.colSpan != 1) return -1;
      }
      return 0;
    },
    execCommand(cmd, fn) {
      var me = this;
      var range = me.selection.getRange();
      var bk = range.createBookmark(true);
      var tableItems = getTableItemsByRange(me);
      var cell = tableItems.cell;
      var ut = getUETable(tableItems.table);
      var cellInfo = ut.getCellInfo(cell);
      ut.sortTable(cellInfo.cellIndex, fn);
      range.moveToBookmark(bk);
      try {
        range.select();
      } catch (e) {}
    }
  };

  //设置表格可排序,清除表格可排序
  UE.commands["enablesort"] = UE.commands["disablesort"] = {
    queryCommandState(cmd) {
      var table = getTableItemsByRange(this).table;
      if (table && cmd == "enablesort") {
        var cells = domUtils.getElementsByTagName(table, "th td");
        for (var i = 0; i < cells.length; i++) {
          if (cells[i].getAttribute("colspan") > 1 || cells[i].getAttribute("rowspan") > 1) return -1;
        }
      }

      return !table ? -1 : (cmd == "enablesort") ^ (table.getAttribute("data-sort") != "sortEnabled") ? -1 : 0;
    },
    execCommand(cmd) {
      var table = getTableItemsByRange(this).table;
      table.setAttribute("data-sort", cmd == "enablesort" ? "sortEnabled" : "sortDisabled");
      cmd == "enablesort" ? domUtils.addClass(table, "sortEnabled") : domUtils.removeClasses(table, "sortEnabled");
    }
  };
};
