///import core
///import uicore
(() => {
  var utils = baidu.editor.utils;
  var domUtils = baidu.editor.dom.domUtils;
  var UIBase = baidu.editor.ui.UIBase;
  var uiUtils = baidu.editor.ui.uiUtils;

  var Mask = (baidu.editor.ui.Mask = function(options) {
    this.initOptions(options);
    this.initUIBase();
  });
  Mask.prototype = {
    getHtmlTpl() {
      return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>';
    },
    postRender() {
      var me = this;
      domUtils.on(window, "resize", () => {
        setTimeout(() => {
          if (!me.isHidden()) {
            me._fill();
          }
        });
      });
    },
    show(zIndex) {
      this._fill();
      this.getDom().style.display = "";
      this.getDom().style.zIndex = zIndex;
    },
    hide() {
      this.getDom().style.display = "none";
      this.getDom().style.zIndex = "";
    },
    isHidden() {
      return this.getDom().style.display === "none";
    },
    _onMouseDown() {
      return false;
    },
    _onClick(e, target) {
      this.fireEvent("click", e, target);
    },
    _fill() {
      var el = this.getDom();
      var vpRect = uiUtils.getViewportRect();
      el.style.width = vpRect.width + "px";
      el.style.height = vpRect.height + "px";
    }
  };
  utils.inherits(Mask, UIBase);
})();
