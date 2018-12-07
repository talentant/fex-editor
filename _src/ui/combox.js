///import core
///import uicore
///import ui/menu.js
///import ui/splitbutton.js
(() => {
  // todo: menu和item提成通用list
  var utils = baidu.editor.utils;

  var uiUtils = baidu.editor.ui.uiUtils;
  var Menu = baidu.editor.ui.Menu;
  var SplitButton = baidu.editor.ui.SplitButton;

  var Combox = (baidu.editor.ui.Combox = function(options) {
    this.initOptions(options);
    this.initCombox();
  });

  Combox.prototype = {
    uiName: "combox",
    onbuttonclick() {
      this.showPopup();
    },
    initCombox() {
      var me = this;
      this.items = this.items || [];
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        item.uiName = "listitem";
        item.index = i;
        item.onclick = function() {
          me.selectByIndex(this.index);
        };
      }
      this.popup = new Menu({
        items: this.items,
        uiName: "list",
        editor: this.editor,
        captureWheel: true,
        combox: this
      });

      this.initSplitButton();
    },
    _SplitButton_postRender: SplitButton.prototype.postRender,
    postRender() {
      this._SplitButton_postRender();
      this.setLabel(this.label || "");
      this.setValue(this.initValue || "");
    },
    showPopup() {
      var rect = uiUtils.getClientRect(this.getDom());
      rect.top += 1;
      rect.bottom -= 1;
      rect.height -= 2;
      this.popup.showAnchorRect(rect);
    },
    getValue() {
      return this.value;
    },
    setValue(value) {
      var index = this.indexByValue(value);
      if (index != -1) {
        this.selectedIndex = index;
        this.setLabel(this.items[index].label);
        this.value = this.items[index].value;
      } else {
        this.selectedIndex = -1;
        this.setLabel(this.getLabelForUnknowValue(value));
        this.value = value;
      }
    },
    setLabel(label) {
      this.getDom("button_body").innerHTML = label;
      this.label = label;
    },
    getLabelForUnknowValue(value) {
      return value;
    },
    indexByValue(value) {
      for (var i = 0; i < this.items.length; i++) {
        if (value == this.items[i].value) {
          return i;
        }
      }
      return -1;
    },
    getItem(index) {
      return this.items[index];
    },
    selectByIndex(index) {
      if (index < this.items.length && this.fireEvent("select", index) !== false) {
        this.selectedIndex = index;
        this.value = this.items[index].value;
        this.setLabel(this.items[index].label);
      }
    }
  };
  utils.inherits(Combox, SplitButton);
})();
