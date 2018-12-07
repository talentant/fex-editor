/**
 * 设置文字输入的方向的插件
 * @file
 * @since 1.2.6.1
 */
(() => {
  var block = domUtils.isBlockElm;

  var getObj = (
    editor //            var startNode = editor.selection.getStart(),
  ) =>
    //                parents;
    //            if ( startNode ) {
    //                //查找所有的是block的父亲节点
    //                parents = domUtils.findParents( startNode, true, block, true );
    //                for ( var i = 0,ci; ci = parents[i++]; ) {
    //                    if ( ci.getAttribute( 'dir' ) ) {
    //                        return ci;
    //                    }
    //                }
    //            }
    domUtils.filterNodeList(editor.selection.getStartElementPath(), n => n && n.nodeType == 1 && n.getAttribute("dir"));

  var doDirectionality = (range, editor, forward) => {
    var bookmark;

    var filterFn = node => (node.nodeType == 1 ? !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node));

    var obj = getObj(editor);

    if (obj && range.collapsed) {
      obj.setAttribute("dir", forward);
      return range;
    }
    bookmark = range.createBookmark();
    range.enlarge(true);
    var bookmark2 = range.createBookmark();
    var current = domUtils.getNextDomNode(bookmark2.start, false, filterFn);
    var tmpRange = range.cloneRange();
    var tmpNode;
    while (current && !(domUtils.getPosition(current, bookmark2.end) & domUtils.POSITION_FOLLOWING)) {
      if (current.nodeType == 3 || !block(current)) {
        tmpRange.setStartBefore(current);
        while (current && current !== bookmark2.end && !block(current)) {
          tmpNode = current;
          current = domUtils.getNextDomNode(current, false, null, node => !block(node));
        }
        tmpRange.setEndAfter(tmpNode);
        var common = tmpRange.getCommonAncestor();
        if (!domUtils.isBody(common) && block(common)) {
          //遍历到了block节点
          common.setAttribute("dir", forward);
          current = common;
        } else {
          //没有遍历到，添加一个block节点
          var p = range.document.createElement("p");
          p.setAttribute("dir", forward);
          var frag = tmpRange.extractContents();
          p.appendChild(frag);
          tmpRange.insertNode(p);
          current = p;
        }

        current = domUtils.getNextDomNode(current, false, filterFn);
      } else {
        current = domUtils.getNextDomNode(current, true, filterFn);
      }
    }
    return range.moveToBookmark(bookmark2).moveToBookmark(bookmark);
  };

  /**
   * 文字输入方向
   * @command directionality
   * @method execCommand
   * @param { String } cmdName 命令字符串
   * @param { String } forward 传入'ltr'表示从左向右输入，传入'rtl'表示从右向左输入
   * @example
   * ```javascript
   * editor.execCommand( 'directionality', 'ltr');
   * ```
   */

  /**
   * 查询当前选区的文字输入方向
   * @command directionality
   * @method queryCommandValue
   * @param { String } cmdName 命令字符串
   * @return { String } 返回'ltr'表示从左向右输入，返回'rtl'表示从右向左输入
   * @example
   * ```javascript
   * editor.queryCommandValue( 'directionality');
   * ```
   */
  UE.commands["directionality"] = {
    execCommand(cmdName, forward) {
      var range = this.selection.getRange();
      //闭合时单独处理
      if (range.collapsed) {
        var txt = this.document.createTextNode("d");
        range.insertNode(txt);
      }
      doDirectionality(range, this, forward);
      if (txt) {
        range.setStartBefore(txt).collapse(true);
        domUtils.remove(txt);
      }

      range.select();
      return true;
    },
    queryCommandValue() {
      var node = getObj(this);
      return node ? node.getAttribute("dir") : "ltr";
    }
  };
})();
