///import core
///import uicore
///import ui/colorpicker.js
///import ui/popup.js
///import ui/splitbutton.js
(() => {
  var utils = baidu.editor.utils;
  var uiUtils = baidu.editor.ui.uiUtils;
  var ColorPicker = baidu.editor.ui.ColorPicker;
  var Popup = baidu.editor.ui.Popup;
  var SplitButton = baidu.editor.ui.SplitButton;

  var ColorButton = (baidu.editor.ui.ColorButton = function(options) {
    this.initOptions(options);
    this.initColorButton();
  });

  ColorButton.prototype = {
    initColorButton() {
      var me = this;
      this.popup = new Popup({
        content: new ColorPicker({
          noColorText: me.editor.getLang("clearColor"),
          editor: me.editor,
          onpickcolor(t, color) {
            me._onPickColor(color);
          },
          onpicknocolor(t, color) {
            me._onPickNoColor(color);
          }
        }),
        editor: me.editor
      });
      this.initSplitButton();
    },
    _SplitButton_postRender: SplitButton.prototype.postRender,
    postRender() {
      this._SplitButton_postRender();
      this.getDom("button_body").appendChild(
        uiUtils.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')
      );
      this.getDom().className += " edui-colorbutton";
    },
    setColor(color) {
      this.getDom("colorlump").style.backgroundColor = color;
      this.color = color;
    },
    _onPickColor(color) {
      if (this.fireEvent("pickcolor", color) !== false) {
        this.setColor(color);
        this.popup.hide();
      }
    },
    _onPickNoColor(color) {
      if (this.fireEvent("picknocolor") !== false) {
        this.popup.hide();
      }
    }
  };
  utils.inherits(ColorButton, SplitButton);
})();
