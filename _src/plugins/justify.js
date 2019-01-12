/**
 * 段落格式
 * @file
 * @since 1.2.6.1
 */

/**
 * 段落对齐方式
 * @command justify
 * @method execCommand
 * @param { String } cmd 命令字符串
 * @param { String } align 对齐方式：left => 居左，right => 居右，center => 居中，justify => 两端对齐
 * @example
 * ```javascript
 * editor.execCommand( 'justify', 'center' );
 * ```
 */
/**
 * 如果选区所在位置是段落区域，返回当前段落对齐方式
 * @command justify
 * @method queryCommandValue
 * @param { String } cmd 命令字符串
 * @return { String } 返回段落对齐方式
 * @example
 * ```javascript
 * editor.queryCommandValue( 'justify' );
 * ```
 */

UE.plugins["justify"] = function() {
  var me = this;
  var block = domUtils.isBlockElm;

  var defaultValue = {
    left: 1,
    right: 1,
    center: 1,
    justify: 1
  };

  var doJustify = (range, style) => {
    var bookmark = range.createBookmark();

    var filterFn = node => (node.nodeType === 1 ? node.tagName.toLowerCase() !== "br" && !domUtils.isBookmarkNode(node) : !domUtils.isWhitespace(node));

    range.enlarge(true);
    var bookmark2 = range.createBookmark();
    var current = domUtils.getNextDomNode(bookmark2.start, false, filterFn);
    var tmpRange = range.cloneRange();
    var tmpNode;
    while (current && !(domUtils.getPosition(current, bookmark2.end) & domUtils.POSITION_FOLLOWING)) {
      if (current.nodeType === 3 || !block(current)) {
        tmpRange.setStartBefore(current);
        while (current && current !== bookmark2.end && !block(current)) {
          tmpNode = current;
          current = domUtils.getNextDomNode(current, false, null, node => !block(node));
        }
        tmpRange.setEndAfter(tmpNode);
        var common = tmpRange.getCommonAncestor();
        if (!domUtils.isBody(common) && block(common)) {
          domUtils.setStyles(common, utils.isString(style) ? {"text-align": style} : style);
          current = common;
        } else {
          var p = range.document.createElement("p");
          domUtils.setStyles(p, utils.isString(style) ? {"text-align": style} : style);
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

  UE.commands["justify"] = {
    execCommand(cmdName, align) {
      var range = this.selection.getRange();
      var txt;

      //闭合时单独处理
      if (range.collapsed) {
        txt = this.document.createTextNode("p");
        range.insertNode(txt);
      }
      doJustify(range, align);
      if (txt) {
        range.setStartBefore(txt).collapse(true);
        domUtils.remove(txt);
      }

      range.select();

      return true;
    },
    queryCommandValue() {
      var startNode = this.selection.getStart();
      var value = domUtils.getComputedStyle(startNode, "text-align");
      return defaultValue[value] ? value : "left";
    },
    queryCommandState() {
      var start = this.selection.getStart();
      var cell = start && domUtils.findParentByTagName(start, ["td", "th", "caption"], true);

      return cell ? -1 : 0;
    }
  };
};
