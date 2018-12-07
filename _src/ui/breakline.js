(() => {
  var utils = baidu.editor.utils;
  var UIBase = baidu.editor.ui.UIBase;

  var Breakline = (baidu.editor.ui.Breakline = function(options) {
    this.initOptions(options);
    this.initSeparator();
  });

  Breakline.prototype = {
    uiName: "Breakline",
    initSeparator() {
      this.initUIBase();
    },
    getHtmlTpl() {
      return "<br/>";
    }
  };
  utils.inherits(Breakline, UIBase);
})();
