///import core
///import uicore
(() => {
  var utils = baidu.editor.utils;
  var Stateful = baidu.editor.ui.Stateful;
  var uiUtils = baidu.editor.ui.uiUtils;
  var UIBase = baidu.editor.ui.UIBase;

  var PastePicker = (baidu.editor.ui.PastePicker = function(options) {
    this.initOptions(options);
    this.initPastePicker();
  });
  PastePicker.prototype = {
    initPastePicker() {
      this.initUIBase();
      this.Stateful_init();
    },
    getHtmlTpl() {
      return (
        '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div>' +
        '<div class="edui-pastecontainer">' +
        '<div class="edui-title">' +
        this.editor.getLang("pasteOpt") +
        "</div>" +
        '<div class="edui-button">' +
        '<div title="' +
        this.editor.getLang("pasteSourceFormat") +
        '" onclick="$$.format(false)" stateful>' +
        '<div class="edui-richtxticon"></div></div>' +
        '<div title="' +
        this.editor.getLang("tagFormat") +
        '" onclick="$$.format(2)" stateful>' +
        '<div class="edui-tagicon"></div></div>' +
        '<div title="' +
        this.editor.getLang("pasteTextFormat") +
        '" onclick="$$.format(true)" stateful>' +
        '<div class="edui-plaintxticon"></div></div>' +
        "</div>" +
        "</div>" +
        "</div>"
      );
    },
    getStateDom() {
      return this.target;
    },
    format(param) {
      this.editor.ui._isTransfer = true;
      this.editor.fireEvent("pasteTransfer", param);
    },
    _onClick(cur) {
      var node = domUtils.getNextDomNode(cur);
      var screenHt = uiUtils.getViewportRect().height;
      var subPop = uiUtils.getClientRect(node);

      if (subPop.top + subPop.height > screenHt) node.style.top = -subPop.height - cur.offsetHeight + "px";
      else node.style.top = "";

      if (/hidden/gi.test(domUtils.getComputedStyle(node, "visibility"))) {
        node.style.visibility = "visible";
        domUtils.addClass(cur, "edui-state-opened");
      } else {
        node.style.visibility = "hidden";
        domUtils.removeClasses(cur, "edui-state-opened");
      }
    },
    _UIBase_render: UIBase.prototype.render
  };
  utils.inherits(PastePicker, UIBase);
  utils.extend(PastePicker.prototype, Stateful, true);
})();
