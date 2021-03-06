/**
 * 源码编辑插件
 * @file
 * @since 1.2.6.1
 */

(() => {
  var sourceEditors = {
    textarea(editor, holder) {
      var textarea = holder.ownerDocument.createElement("textarea");
      textarea.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;";
      // todo: IE下只有onresize属性可用... 很纠结
      if (browser.ie && browser.version < 8) {
        textarea.style.width = holder.offsetWidth + "px";
        textarea.style.height = holder.offsetHeight + "px";
        holder.onresize = () => {
          textarea.style.width = holder.offsetWidth + "px";
          textarea.style.height = holder.offsetHeight + "px";
        };
      }
      holder.appendChild(textarea);
      return {
        setContent(content) {
          textarea.value = content;
        },
        getContent() {
          return textarea.value;
        },
        select() {
          var range;
          if (browser.ie) {
            range = textarea.createTextRange();
            range.collapse(true);
            range.select();
          } else {
            //todo: chrome下无法设置焦点
            textarea.setSelectionRange(0, 0);
            textarea.focus();
          }
        },
        dispose() {
          holder.removeChild(textarea);
          // todo
          holder.onresize = null;
          textarea = null;
          holder = null;
        },
        focus() {
          textarea.focus();
        },
        blur() {
          textarea.blur();
        }
      };
    },
    codemirror(editor, holder) {
      var codeEditor = window.CodeMirror(holder, {
        mode: "text/html",
        tabMode: "indent",
        lineNumbers: true,
        lineWrapping: true
      });
      var dom = codeEditor.getWrapperElement();
      dom.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;';
      codeEditor.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;";
      codeEditor.refresh();
      return {
        getCodeMirror() {
          return codeEditor;
        },
        setContent(content) {
          codeEditor.setValue(content);
        },
        getContent() {
          return codeEditor.getValue();
        },
        select() {
          codeEditor.focus();
        },
        dispose() {
          holder.removeChild(dom);
          dom = null;
          codeEditor = null;
        },
        focus() {
          codeEditor.focus();
        },
        blur() {
          // codeEditor.blur();
          // since codemirror not support blur()
          codeEditor.setOption("readOnly", true);
          codeEditor.setOption("readOnly", false);
        }
      };
    }
  };

  UE.plugins["source"] = function() {
    var me = this;
    var opt = this.options;
    var sourceMode = false;
    var sourceEditor;
    var orgSetContent;
    var orgFocus;
    var orgBlur;
    opt.sourceEditor = browser.ie ? "textarea" : opt.sourceEditor || "codemirror";

    me.setOpt({
      sourceEditorFirst: false
    });
    function createSourceEditor(holder) {
      return sourceEditors[opt.sourceEditor === "codemirror" && window.CodeMirror ? "codemirror" : "textarea"](me, holder);
    }

    var bakCssText;

    //解决在源码模式下getContent不能得到最新的内容问题
    var oldGetContent;

    var bakAddress;

    /**
     * 切换源码模式和编辑模式
     * @command source
     * @method execCommand
     * @param { String } cmd 命令字符串
     * @example
     * ```javascript
     * editor.execCommand( 'source');
     * ```
     */

    /**
     * 查询当前编辑区域的状态是源码模式还是可视化模式
     * @command source
     * @method queryCommandState
     * @param { String } cmd 命令字符串
     * @return { int } 如果当前是源码编辑模式，返回1，否则返回0
     * @example
     * ```javascript
     * editor.queryCommandState( 'source' );
     * ```
     */

    me.commands["source"] = {
      execCommand() {
        sourceMode = !sourceMode;
        if (sourceMode) {
          bakAddress = me.selection.getRange().createAddress(false, true);
          me.undoManger && me.undoManger.save(true);
          if (browser.gecko) {
            me.body.contentEditable = false;
          }

          bakCssText = me.iframe.style.cssText;
          me.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;";

          me.fireEvent("beforegetcontent");
          var root = UE.htmlparser(me.body.innerHTML);
          me.filterOutputRule(root);
          root.traversal(node => {
            if (node.type === "element") {
              switch (node.tagName) {
                case "td":
                case "th":
                case "caption":
                  if (node.children && node.children.length == 1) {
                    if (node.firstChild().tagName === "br") {
                      node.removeChild(node.firstChild());
                    }
                  }
                  break;
                case "pre":
                  node.innerText(node.innerText().replace(/&nbsp;/g, " "));
              }
            }
          });

          me.fireEvent("aftergetcontent");

          var content = root.toHtml(true);

          sourceEditor = createSourceEditor(me.iframe.parentNode);

          sourceEditor.setContent(content);

          orgSetContent = me.setContent;

          me.setContent = html => {
            //这里暂时不触发事件，防止报错
            var root = UE.htmlparser(html);
            me.filterInputRule(root);
            html = root.toHtml();
            sourceEditor.setContent(html);
          };

          setTimeout(() => {
            sourceEditor.select();
            me.addListener("fullscreenchanged", () => {
              try {
                sourceEditor.getCodeMirror().refresh();
              } catch (e) {}
            });
          });

          //重置getContent，源码模式下取值也能是最新的数据
          oldGetContent = me.getContent;
          me.getContent = () => sourceEditor.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>";

          orgFocus = me.focus;
          orgBlur = me.blur;

          me.focus = () => {
            sourceEditor.focus();
          };

          me.blur = () => {
            orgBlur.call(me);
            sourceEditor.blur();
          };
        } else {
          me.iframe.style.cssText = bakCssText;
          var cont = sourceEditor.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>";
          //处理掉block节点前后的空格,有可能会误命中，暂时不考虑
          cont = cont.replace(new RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), (a, b) => {
            if (b && !dtd.$inlineWithA[b.toLowerCase()]) {
              return a.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "");
            }
            return a.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "");
          });

          me.setContent = orgSetContent;

          me.setContent(cont);
          sourceEditor.dispose();
          sourceEditor = null;
          //还原getContent方法
          me.getContent = oldGetContent;

          me.focus = orgFocus;
          me.blur = orgBlur;

          var first = me.body.firstChild;
          //trace:1106 都删除空了，下边会报错，所以补充一个p占位
          if (!first) {
            me.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>";
            first = me.body.firstChild;
          }

          //要在ifm为显示时ff才能取到selection,否则报错
          //这里不能比较位置了
          me.undoManger && me.undoManger.save(true);

          if (browser.gecko) {
            var input = document.createElement("input");
            input.style.cssText = "position:absolute;left:0;top:-32768px";

            document.body.appendChild(input);

            me.body.contentEditable = false;
            setTimeout(() => {
              domUtils.setViewportOffset(input, {left: -32768, top: 0});
              input.focus();
              setTimeout(() => {
                me.body.contentEditable = true;
                me.selection
                  .getRange()
                  .moveToAddress(bakAddress)
                  .select(true);
                domUtils.remove(input);
              });
            });
          } else {
            //ie下有可能报错，比如在代码顶头的情况
            try {
              me.selection
                .getRange()
                .moveToAddress(bakAddress)
                .select(true);
            } catch (e) {}
          }
        }
        this.fireEvent("sourcemodechanged", sourceMode);
      },
      queryCommandState() {
        return sourceMode | 0;
      },
      notNeedUndo: 1
    };
    var oldQueryCommandState = me.queryCommandState;

    me.queryCommandState = function(cmdName) {
      cmdName = cmdName.toLowerCase();
      if (sourceMode) {
        //源码模式下可以开启的命令
        return cmdName in
          {
            source: 1,
            fullscreen: 1
          }
          ? 1
          : -1;
      }
      return oldQueryCommandState.apply(this, arguments);
    };

    if (opt.sourceEditor === "codemirror") {
      me.addListener("ready", () => {
        utils.loadFile(
          document,
          {
            src: opt.codeMirrorJsUrl || "https://cdn.jsdelivr.net/npm/codemirror@2.33.0/lib/codemirror.js",
            tag: "script",
            type: "text/javascript",
            defer: "defer"
          },
          () => {
            if (opt.sourceEditorFirst) {
              setTimeout(() => {
                me.execCommand("source");
              }, 0);
            }
          }
        );
        utils.loadFile(document, {
          tag: "link",
          rel: "stylesheet",
          type: "text/css",
          href: opt.codeMirrorCssUrl || "https://cdn.jsdelivr.net/npm/codemirror@2.33.0/lib/codemirror.css"
        });
      });
    }
  };
})();
