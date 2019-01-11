(() => {
  var utils = baidu.editor.utils;
  var uiUtils = baidu.editor.ui.uiUtils;
  var UIBase = baidu.editor.ui.UIBase;

  var Toolbar = (baidu.editor.ui.Toolbar = function(options) {
    this.initOptions(options);
    this.initToolbar();
  });

  Toolbar.prototype = {
    items: null,
    initToolbar() {
      this.items = this.items || [];
      this.initUIBase();
    },
    add(item, index) {
      if (index === undefined) {
        this.items.push(item);
      } else {
        this.items.splice(index, 0, item);
      }
    },
    getHtmlTpl() {
      var buff = [];
      for (var i = 0; i < this.items.length; i++) {
        buff[i] = this.items[i].renderHtml();
      }
      return (
        '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' +
        buff.join("") +
        "</div>"
      );
    },
    postRender() {
      var box = this.getDom();
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].postRender();
      }
      uiUtils.makeUnselectable(box);
    },
    _onMouseDown(e) {
      var target = e.target || e.srcElement;
      var tagName = target && target.tagName && target.tagName.toLowerCase();
      if (tagName === "input" || tagName === "object" || tagName === "object") {
        return false;
      }
    }
  };
  utils.inherits(Toolbar, UIBase);
})();
