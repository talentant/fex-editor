///import core
///import uicore
///import ui/mask.js
///import ui/button.js
(() => {
  var utils = baidu.editor.utils;
  var domUtils = baidu.editor.dom.domUtils;
  var uiUtils = baidu.editor.ui.uiUtils;
  var Mask = baidu.editor.ui.Mask;
  var UIBase = baidu.editor.ui.UIBase;
  var Button = baidu.editor.ui.Button;

  var Dialog = (baidu.editor.ui.Dialog = function(options) {
    if (options.name) {
      var name = options.name;
      var cssRules = options.cssRules;
      if (!options.className) {
        options.className = "edui-for-" + name;
      }
      if (cssRules) {
        options.cssRules = ".edui-for-" + name + " .edui-dialog-content  {" + cssRules + "}";
      }
    }
    this.initOptions(
      utils.extend(
        {
          autoReset: true,
          draggable: true,
          onok() {},
          oncancel() {},
          onclose(t, ok) {
            return ok ? this.onok() : this.oncancel();
          },
          //是否控制dialog中的scroll事件， 默认为不阻止
          holdScroll: false
        },
        options
      )
    );
    this.initDialog();
  });

  var modalMask;
  var dragMask;
  var activeDialog;
  Dialog.prototype = {
    draggable: false,
    uiName: "dialog",
    initDialog() {
      var me = this;
      var theme = this.editor.options.theme;
      if (this.cssRules) {
        this.cssRules = ".edui-" + theme + " " + this.cssRules;
        utils.cssRule("edui-customize-" + this.name + "-style", this.cssRules);
      }
      this.initUIBase();
      this.modalMask =
        modalMask ||
        (modalMask = new Mask({
          className: "edui-dialog-modalmask",
          theme,
          onclick() {
            activeDialog && activeDialog.close(false);
          }
        }));
      this.dragMask =
        dragMask ||
        (dragMask = new Mask({
          className: "edui-dialog-dragmask",
          theme
        }));
      this.closeButton = new Button({
        className: "edui-dialog-closebutton",
        title: me.closeDialog,
        theme,
        onclick() {
          me.close(false);
        }
      });

      this.fullscreen && this.initResizeEvent();

      if (this.buttons) {
        for (var i = 0; i < this.buttons.length; i++) {
          if (!(this.buttons[i] instanceof Button)) {
            this.buttons[i] = new Button(
              utils.extend(
                this.buttons[i],
                {
                  editor: this.editor
                },
                true
              )
            );
          }
        }
      }
    },
    initResizeEvent() {
      var me = this;

      domUtils.on(window, "resize", () => {
        if (me._hidden || me._hidden === undefined) {
          return;
        }

        if (me.__resizeTimer) {
          window.clearTimeout(me.__resizeTimer);
        }

        me.__resizeTimer = window.setTimeout(() => {
          me.__resizeTimer = null;

          var dialogWrapNode = me.getDom();
          var contentNode = me.getDom("content");
          var wrapRect = UE.ui.uiUtils.getClientRect(dialogWrapNode);
          var contentRect = UE.ui.uiUtils.getClientRect(contentNode);
          var vpRect = uiUtils.getViewportRect();

          contentNode.style.width = vpRect.width - wrapRect.width + contentRect.width + "px";
          contentNode.style.height = vpRect.height - wrapRect.height + contentRect.height + "px";

          dialogWrapNode.style.width = vpRect.width + "px";
          dialogWrapNode.style.height = vpRect.height + "px";

          me.fireEvent("resize");
        }, 100);
      });
    },
    fitSize() {
      var popBodyEl = this.getDom("body");
      //            if (!(baidu.editor.browser.ie && baidu.editor.browser.version == 7)) {
      //                uiUtils.removeStyle(popBodyEl, 'width');
      //                uiUtils.removeStyle(popBodyEl, 'height');
      //            }
      var size = this.mesureSize();
      popBodyEl.style.width = size.width + "px";
      popBodyEl.style.height = size.height + "px";
      return size;
    },
    safeSetOffset(offset) {
      var me = this;
      var el = me.getDom();
      var vpRect = uiUtils.getViewportRect();
      var rect = uiUtils.getClientRect(el);
      var left = offset.left;
      if (left + rect.width > vpRect.right) {
        left = vpRect.right - rect.width;
      }
      var top = offset.top;
      if (top + rect.height > vpRect.bottom) {
        top = vpRect.bottom - rect.height;
      }
      el.style.left = Math.max(left, 0) + "px";
      el.style.top = Math.max(top, 0) + "px";
    },
    showAtCenter() {
      var vpRect = uiUtils.getViewportRect();

      if (!this.fullscreen) {
        this.getDom().style.display = "";
        var popSize = this.fitSize();
        var titleHeight = this.getDom("titlebar").offsetHeight | 0;
        var left = vpRect.width / 2 - popSize.width / 2;
        var top = vpRect.height / 2 - (popSize.height - titleHeight) / 2 - titleHeight;
        var popEl = this.getDom();
        this.safeSetOffset({
          left: Math.max(left | 0, 0),
          top: Math.max(top | 0, 0)
        });
        if (!domUtils.hasClass(popEl, "edui-state-centered")) {
          popEl.className += " edui-state-centered";
        }
      } else {
        var dialogWrapNode = this.getDom();
        var contentNode = this.getDom("content");

        dialogWrapNode.style.display = "block";

        var wrapRect = UE.ui.uiUtils.getClientRect(dialogWrapNode);
        var contentRect = UE.ui.uiUtils.getClientRect(contentNode);
        dialogWrapNode.style.left = "-100000px";

        contentNode.style.width = vpRect.width - wrapRect.width + contentRect.width + "px";
        contentNode.style.height = vpRect.height - wrapRect.height + contentRect.height + "px";

        dialogWrapNode.style.width = vpRect.width + "px";
        dialogWrapNode.style.height = vpRect.height + "px";
        dialogWrapNode.style.left = 0;

        //保存环境的overflow值
        this._originalContext = {
          html: {
            overflowX: document.documentElement.style.overflowX,
            overflowY: document.documentElement.style.overflowY
          },
          body: {
            overflowX: document.body.style.overflowX,
            overflowY: document.body.style.overflowY
          }
        };

        document.documentElement.style.overflowX = "hidden";
        document.documentElement.style.overflowY = "hidden";
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "hidden";
      }

      this._show();
    },
    getContentHtml() {
      var contentHtml = "";
      if (typeof this.content === "string") {
        contentHtml = this.content;
      } else if (this.iframeUrl) {
        contentHtml =
          '<span id="' +
          this.id +
          '_contmask" class="dialogcontmask"></span><iframe id="' +
          this.id +
          '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' +
          this.iframeUrl +
          '"></iframe>';
      }
      return contentHtml;
    },
    getHtmlTpl() {
      var footHtml = "";

      if (this.buttons) {
        var buff = [];
        for (var i = 0; i < this.buttons.length; i++) {
          buff[i] = this.buttons[i].renderHtml();
        }
        footHtml = '<div class="%%-foot">' + '<div id="##_buttons" class="%%-buttons">' + buff.join("") + "</div>" + "</div>";
      }

      return (
        '<div id="##" class="%%"><div ' +
        (!this.fullscreen ? 'class="%%"' : 'class="%%-wrap edui-dialog-fullscreen-flag"') +
        '><div id="##_body" class="%%-body">' +
        '<div class="%%-shadow"></div>' +
        '<div id="##_titlebar" class="%%-titlebar">' +
        '<div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);">' +
        '<span class="%%-caption">' +
        (this.title || "") +
        "</span>" +
        "</div>" +
        this.closeButton.renderHtml() +
        "</div>" +
        '<div id="##_content" class="%%-content">' +
        (this.autoReset ? "" : this.getContentHtml()) +
        "</div>" +
        footHtml +
        "</div></div></div>"
      );
    },
    postRender() {
      // todo: 保持居中/记住上次关闭位置选项
      if (!this.modalMask.getDom()) {
        this.modalMask.render();
        this.modalMask.hide();
      }
      if (!this.dragMask.getDom()) {
        this.dragMask.render();
        this.dragMask.hide();
      }
      var me = this;
      this.addListener("show", function() {
        me.modalMask.show(this.getDom().style.zIndex - 2);
      });
      this.addListener("hide", () => {
        me.modalMask.hide();
      });
      if (this.buttons) {
        for (var i = 0; i < this.buttons.length; i++) {
          this.buttons[i].postRender();
        }
      }
      domUtils.on(window, "resize", () => {
        setTimeout(() => {
          if (!me.isHidden()) {
            me.safeSetOffset(uiUtils.getClientRect(me.getDom()));
          }
        });
      });

      //hold住scroll事件，防止dialog的滚动影响页面
      //            if( this.holdScroll ) {
      //
      //                if( !me.iframeUrl ) {
      //                    domUtils.on( document.getElementById( me.id + "_iframe"), !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
      //                        domUtils.preventDefault(e);
      //                    } );
      //                } else {
      //                    me.addListener('dialogafterreset', function(){
      //                        window.setTimeout(function(){
      //                            var iframeWindow = document.getElementById( me.id + "_iframe").contentWindow;
      //
      //                            if( browser.ie ) {
      //
      //                                var timer = window.setInterval(function(){
      //
      //                                    if( iframeWindow.document && iframeWindow.document.body ) {
      //                                        window.clearInterval( timer );
      //                                        timer = null;
      //                                        domUtils.on( iframeWindow.document.body, !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
      //                                            domUtils.preventDefault(e);
      //                                        } );
      //                                    }
      //
      //                                }, 100);
      //
      //                            } else {
      //                                domUtils.on( iframeWindow, !browser.gecko ? "mousewheel" : "DOMMouseScroll", function(e){
      //                                    domUtils.preventDefault(e);
      //                                } );
      //                            }
      //
      //                        }, 1);
      //                    });
      //                }
      //
      //            }
      this._hide();
    },
    mesureSize() {
      var body = this.getDom("body");
      var width = uiUtils.getClientRect(this.getDom("content")).width;
      var dialogBodyStyle = body.style;
      dialogBodyStyle.width = width;
      return uiUtils.getClientRect(body);
    },
    _onTitlebarMouseDown(evt, el) {
      if (this.draggable) {
        var rect;
        var vpRect = uiUtils.getViewportRect();
        var me = this;
        uiUtils.startDrag(evt, {
          ondragstart() {
            rect = uiUtils.getClientRect(me.getDom());
            me.getDom("contmask").style.visibility = "visible";
            me.dragMask.show(me.getDom().style.zIndex - 1);
          },
          ondragmove(x, y) {
            var left = rect.left + x;
            var top = rect.top + y;
            me.safeSetOffset({
              left,
              top
            });
          },
          ondragstop() {
            me.getDom("contmask").style.visibility = "hidden";
            domUtils.removeClasses(me.getDom(), ["edui-state-centered"]);
            me.dragMask.hide();
          }
        });
      }
    },
    reset() {
      this.getDom("content").innerHTML = this.getContentHtml();
      this.fireEvent("dialogafterreset");
    },
    _show() {
      if (this._hidden) {
        this.getDom().style.display = "";

        //要高过编辑器的zindxe
        this.editor.container.style.zIndex && (this.getDom().style.zIndex = this.editor.container.style.zIndex * 1 + 10);
        this._hidden = false;
        this.fireEvent("show");
        baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4;
      }
    },
    isHidden() {
      return this._hidden;
    },
    _hide() {
      if (!this._hidden) {
        var wrapNode = this.getDom();
        wrapNode.style.display = "none";
        wrapNode.style.zIndex = "";
        wrapNode.style.width = "";
        wrapNode.style.height = "";
        this._hidden = true;
        this.fireEvent("hide");
      }
    },
    open() {
      if (this.autoReset) {
        //有可能还没有渲染
        try {
          this.reset();
        } catch (e) {
          this.render();
          this.open();
        }
      }
      this.showAtCenter();
      if (this.iframeUrl) {
        try {
          this.getDom("iframe").focus();
        } catch (ex) {}
      }
      activeDialog = this;
    },
    _onCloseButtonClick(evt, el) {
      this.close(false);
    },
    close(ok) {
      if (this.fireEvent("close", ok) !== false) {
        //还原环境
        if (this.fullscreen) {
          document.documentElement.style.overflowX = this._originalContext.html.overflowX;
          document.documentElement.style.overflowY = this._originalContext.html.overflowY;
          document.body.style.overflowX = this._originalContext.body.overflowX;
          document.body.style.overflowY = this._originalContext.body.overflowY;
          delete this._originalContext;
        }
        this._hide();

        //销毁content
        var content = this.getDom("content");
        var iframe = this.getDom("iframe");
        if (content && iframe) {
          var doc = iframe.contentDocument || iframe.contentWindow.document;
          doc && (doc.body.innerHTML = "");
          domUtils.remove(content);
        }
      }
    }
  };
  utils.inherits(Dialog, UIBase);
})();
