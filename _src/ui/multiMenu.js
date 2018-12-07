///import core
///import uicore
///commands 表情
(() => {
  var utils = baidu.editor.utils;
  var Popup = baidu.editor.ui.Popup;
  var SplitButton = baidu.editor.ui.SplitButton;

  var MultiMenuPop = (baidu.editor.ui.MultiMenuPop = function(options) {
    this.initOptions(options);
    this.initMultiMenu();
  });

  MultiMenuPop.prototype = {
    initMultiMenu() {
      var me = this;
      this.popup = new Popup({
        content: "",
        editor: me.editor,
        iframe_rendered: false,
        onshow() {
          if (!this.iframe_rendered) {
            this.iframe_rendered = true;
            this.getDom("content").innerHTML =
              '<iframe id="' + me.id + '_iframe" src="' + me.iframeUrl + '" frameborder="0"></iframe>';
            me.editor.container.style.zIndex && (this.getDom().style.zIndex = me.editor.container.style.zIndex * 1 + 1);
          }
        }
        // canSideUp:false,
        // canSideLeft:false
      });
      this.onbuttonclick = function() {
        this.showPopup();
      };
      this.initSplitButton();
    }
  };

  utils.inherits(MultiMenuPop, SplitButton);
})();
