//ui跟编辑器的适配層
//那个按钮弹出是dialog，是下拉筐等都是在这个js中配置
//自己写的ui也要在这里配置，放到baidu.editor.ui下边，当编辑器实例化的时候会根据ueditor.config中的toolbars找到相应的进行实例化
(() => {
  var utils = baidu.editor.utils;
  var editorui = baidu.editor.ui;
  var _Dialog = editorui.Dialog;
  editorui.buttons = {};

  editorui.Dialog = options => {
    var dialog = new _Dialog(options);
    dialog.addListener("hide", () => {
      if (dialog.editor) {
        var editor = dialog.editor;
        try {
          if (browser.gecko) {
            var y = editor.window.scrollY;
            var x = editor.window.scrollX;
            editor.body.focus();
            editor.window.scrollTo(x, y);
          } else {
            editor.focus();
          }
        } catch (ex) {}
      }
    });
    return dialog;
  };

  var iframeUrlMap = {
    anchor: "~/dialogs/anchor/anchor.html",
    insertimage: "~/dialogs/image/image.html",
    link: "~/dialogs/link/link.html",
    spechars: "~/dialogs/spechars/spechars.html",
    searchreplace: "~/dialogs/searchreplace/searchreplace.html",
    map: "~/dialogs/map/map.html",
    gmap: "~/dialogs/gmap/gmap.html",
    insertvideo: "~/dialogs/video/video.html",
    help: "~/dialogs/help/help.html",
    preview: "~/dialogs/preview/preview.html",
    emotion: "~/dialogs/emotion/emotion.html",
    wordimage: "~/dialogs/wordimage/wordimage.html",
    attachment: "~/dialogs/attachment/attachment.html",
    insertframe: "~/dialogs/insertframe/insertframe.html",
    edittip: "~/dialogs/table/edittip.html",
    edittable: "~/dialogs/table/edittable.html",
    edittd: "~/dialogs/table/edittd.html",
    scrawl: "~/dialogs/scrawl/scrawl.html",
    template: "~/dialogs/template/template.html",
    background: "~/dialogs/background/background.html",
    charts: "~/dialogs/charts/charts.html"
  };
  //为工具栏添加按钮，以下都是统一的按钮触发命令，所以写在一起
  var btnCmds = [
    "undo",
    "redo",
    "formatmatch",
    "bold",
    "italic",
    "underline",
    "fontborder",
    "touppercase",
    "tolowercase",
    "strikethrough",
    "subscript",
    "superscript",
    "source",
    "indent",
    "outdent",
    "blockquote",
    "pasteplain",
    "pagebreak",
    "selectall",
    "print",
    "horizontal",
    "removeformat",
    "time",
    "date",
    "unlink",
    "insertparagraphbeforetable",
    "insertrow",
    "insertcol",
    "mergeright",
    "mergedown",
    "deleterow",
    "deletecol",
    "splittorows",
    "splittocols",
    "splittocells",
    "mergecells",
    "deletetable",
    "drafts"
  ];

  for (var i = 0, ci; (ci = btnCmds[i++]); ) {
    ci = ci.toLowerCase();
    editorui[ci] = (cmd => editor => {
      var ui = new editorui.Button({
        className: "edui-for-" + cmd,
        title: editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || "",
        onclick() {
          editor.execCommand(cmd);
        },
        theme: editor.options.theme,
        showText: false
      });
      editorui.buttons[cmd] = ui;
      editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
        var state = editor.queryCommandState(cmd);
        if (state == -1) {
          ui.setDisabled(true);
          ui.setChecked(false);
        } else {
          if (!uiReady) {
            ui.setDisabled(false);
            ui.setChecked(state);
          }
        }
      });
      return ui;
    })(ci);
  }

  //清除文档
  editorui.cleardoc = editor => {
    var ui = new editorui.Button({
      className: "edui-for-cleardoc",
      title: editor.options.labelMap.cleardoc || editor.getLang("labelMap.cleardoc") || "",
      theme: editor.options.theme,
      onclick() {
        if (confirm(editor.getLang("confirmClear"))) {
          editor.execCommand("cleardoc");
        }
      }
    });
    editorui.buttons["cleardoc"] = ui;
    editor.addListener("selectionchange", () => {
      ui.setDisabled(editor.queryCommandState("cleardoc") == -1);
    });
    return ui;
  };

  //排版，图片排版，文字方向
  var typeset = {
    justify: ["left", "right", "center", "justify"],
    imagefloat: ["none", "left", "center", "right"],
    directionality: ["ltr", "rtl"]
  };

  for (var p in typeset) {
    ((cmd, val) => {
      for (var i = 0, ci; (ci = val[i++]); ) {
        (cmd2 => {
          editorui[cmd.replace("float", "") + cmd2] = editor => {
            var ui = new editorui.Button({
              className: "edui-for-" + cmd.replace("float", "") + cmd2,
              title:
                editor.options.labelMap[cmd.replace("float", "") + cmd2] ||
                editor.getLang("labelMap." + cmd.replace("float", "") + cmd2) ||
                "",
              theme: editor.options.theme,
              onclick() {
                editor.execCommand(cmd, cmd2);
              }
            });
            editorui.buttons[cmd] = ui;
            editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
              ui.setDisabled(editor.queryCommandState(cmd) == -1);
              ui.setChecked(editor.queryCommandValue(cmd) == cmd2 && !uiReady);
            });
            return ui;
          };
        })(ci);
      }
    })(p, typeset[p]);
  }

  //字体颜色和背景颜色
  for (var i = 0, ci; (ci = ["backcolor", "forecolor"][i++]); ) {
    editorui[ci] = (cmd => editor => {
      var ui = new editorui.ColorButton({
        className: "edui-for-" + cmd,
        color: "default",
        title: editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || "",
        editor,
        onpickcolor(t, color) {
          editor.execCommand(cmd, color);
        },
        onpicknocolor() {
          editor.execCommand(cmd, "default");
          this.setColor("transparent");
          this.color = "default";
        },
        onbuttonclick() {
          editor.execCommand(cmd, this.color);
        }
      });
      editorui.buttons[cmd] = ui;
      editor.addListener("selectionchange", () => {
        ui.setDisabled(editor.queryCommandState(cmd) == -1);
      });
      return ui;
    })(ci);
  }

  var dialogBtns = {
    noOk: ["searchreplace", "help", "spechars", "preview"],
    ok: [
      "attachment",
      "anchor",
      "link",
      "insertimage",
      "map",
      "gmap",
      "insertframe",
      "wordimage",
      "insertvideo",
      "insertframe",
      "edittip",
      "edittable",
      "edittd",
      "scrawl",
      "template",
      "background",
      "charts"
    ]
  };

  for (var p in dialogBtns) {
    ((type, vals) => {
      for (var i = 0, ci; (ci = vals[i++]); ) {
        //todo opera下存在问题
        if (browser.opera && ci === "searchreplace") {
          continue;
        }
        (cmd => {
          editorui[cmd] = (editor, iframeUrl, title) => {
            iframeUrl = iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd];
            title = editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd) || "";

            var dialog;
            //没有iframeUrl不创建dialog
            if (iframeUrl) {
              dialog = new editorui.Dialog(
                utils.extend(
                  {
                    iframeUrl: editor.ui.mapUrl(iframeUrl),
                    editor,
                    className: "edui-for-" + cmd,
                    title,
                    holdScroll: cmd === "insertimage",
                    fullscreen: /charts|preview/.test(cmd),
                    closeDialog: editor.getLang("closeDialog")
                  },
                  type === "ok"
                    ? {
                        buttons: [
                          {
                            className: "edui-okbutton",
                            label: editor.getLang("ok"),
                            editor,
                            onclick() {
                              dialog.close(true);
                            }
                          },
                          {
                            className: "edui-cancelbutton",
                            label: editor.getLang("cancel"),
                            editor,
                            onclick() {
                              dialog.close(false);
                            }
                          }
                        ]
                      }
                    : {}
                )
              );

              editor.ui._dialogs[cmd + "Dialog"] = dialog;
            }

            var ui = new editorui.Button({
              className: "edui-for-" + cmd,
              title,
              onclick() {
                if (dialog) {
                  switch (cmd) {
                    case "wordimage":
                      var images = editor.execCommand("wordimage");
                      if (images && images.length) {
                        dialog.render();
                        dialog.open();
                      }
                      break;
                    case "scrawl":
                      if (editor.queryCommandState("scrawl") != -1) {
                        dialog.render();
                        dialog.open();
                      }

                      break;
                    default:
                      dialog.render();
                      dialog.open();
                  }
                }
              },
              theme: editor.options.theme,
              disabled: (cmd === "scrawl" && editor.queryCommandState("scrawl") == -1) || cmd === "charts"
            });
            editorui.buttons[cmd] = ui;
            editor.addListener("selectionchange", () => {
              //只存在于右键菜单而无工具栏按钮的ui不需要检测状态
              var unNeedCheckState = {edittable: 1};
              if (cmd in unNeedCheckState) return;

              var state = editor.queryCommandState(cmd);
              if (ui.getDom()) {
                ui.setDisabled(state == -1);
                ui.setChecked(state);
              }
            });

            return ui;
          };
        })(ci.toLowerCase());
      }
    })(p, dialogBtns[p]);
  }

  editorui.insertcode = (editor, list, title) => {
    list = editor.options["insertcode"] || [];
    title = editor.options.labelMap["insertcode"] || editor.getLang("labelMap.insertcode") || "";
    // if (!list.length) return;
    var items = [];
    utils.each(list, (key, val) => {
      items.push({
        label: key,
        value: val,
        theme: editor.options.theme,
        renderLabelHtml() {
          return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>";
        }
      });
    });

    var ui = new editorui.Combox({
      editor,
      items,
      onselect(t, index) {
        editor.execCommand("insertcode", this.items[index].value);
      },
      onbuttonclick() {
        this.showPopup();
      },
      title,
      initValue: title,
      className: "edui-for-insertcode",
      indexByValue(value) {
        if (value) {
          for (var i = 0, ci; (ci = this.items[i]); i++) {
            if (ci.value.indexOf(value) != -1) return i;
          }
        }

        return -1;
      }
    });
    editorui.buttons["insertcode"] = ui;
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      if (!uiReady) {
        var state = editor.queryCommandState("insertcode");
        if (state == -1) {
          ui.setDisabled(true);
        } else {
          ui.setDisabled(false);
          var value = editor.queryCommandValue("insertcode");
          if (!value) {
            ui.setValue(title);
            return;
          }
          //trace:1871 ie下从源码模式切换回来时，字体会带单引号，而且会有逗号
          value && (value = value.replace(/['"]/g, "").split(",")[0]);
          ui.setValue(value);
        }
      }
    });
    return ui;
  };
  editorui.fontfamily = (editor, list, title) => {
    list = editor.options["fontfamily"] || [];
    title = editor.options.labelMap["fontfamily"] || editor.getLang("labelMap.fontfamily") || "";
    if (!list.length) return;
    for (var i = 0, ci, items = []; (ci = list[i]); i++) {
      var langLabel = editor.getLang("fontfamily")[ci.name] || "";
      ((key, val) => {
        items.push({
          label: key,
          value: val,
          theme: editor.options.theme,
          renderLabelHtml() {
            return (
              '<div class="edui-label %%-label" style="font-family:' +
              utils.unhtml(this.value) +
              '">' +
              (this.label || "") +
              "</div>"
            );
          }
        });
      })(ci.label || langLabel, ci.val);
    }
    var ui = new editorui.Combox({
      editor,
      items,
      onselect(t, index) {
        editor.execCommand("FontFamily", this.items[index].value);
      },
      onbuttonclick() {
        this.showPopup();
      },
      title,
      initValue: title,
      className: "edui-for-fontfamily",
      indexByValue(value) {
        if (value) {
          for (var i = 0, ci; (ci = this.items[i]); i++) {
            if (ci.value.indexOf(value) != -1) return i;
          }
        }

        return -1;
      }
    });
    editorui.buttons["fontfamily"] = ui;
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      if (!uiReady) {
        var state = editor.queryCommandState("FontFamily");
        if (state == -1) {
          ui.setDisabled(true);
        } else {
          ui.setDisabled(false);
          var value = editor.queryCommandValue("FontFamily");
          //trace:1871 ie下从源码模式切换回来时，字体会带单引号，而且会有逗号
          value && (value = value.replace(/['"]/g, "").split(",")[0]);
          ui.setValue(value);
        }
      }
    });
    return ui;
  };

  editorui.fontsize = (editor, list, title) => {
    title = editor.options.labelMap["fontsize"] || editor.getLang("labelMap.fontsize") || "";
    list = list || editor.options["fontsize"] || [];
    if (!list.length) return;
    var items = [];
    for (var i = 0; i < list.length; i++) {
      var size = list[i] + "px";
      items.push({
        label: size,
        value: size,
        theme: editor.options.theme,
        renderLabelHtml() {
          return (
            '<div class="edui-label %%-label" style="line-height:1;font-size:' +
            this.value +
            '">' +
            (this.label || "") +
            "</div>"
          );
        }
      });
    }
    var ui = new editorui.Combox({
      editor,
      items,
      title,
      initValue: title,
      onselect(t, index) {
        editor.execCommand("FontSize", this.items[index].value);
      },
      onbuttonclick() {
        this.showPopup();
      },
      className: "edui-for-fontsize"
    });
    editorui.buttons["fontsize"] = ui;
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      if (!uiReady) {
        var state = editor.queryCommandState("FontSize");
        if (state == -1) {
          ui.setDisabled(true);
        } else {
          ui.setDisabled(false);
          ui.setValue(editor.queryCommandValue("FontSize"));
        }
      }
    });
    return ui;
  };

  editorui.paragraph = (editor, list, title) => {
    title = editor.options.labelMap["paragraph"] || editor.getLang("labelMap.paragraph") || "";
    list = editor.options["paragraph"] || [];
    if (utils.isEmptyObject(list)) return;
    var items = [];
    for (var i in list) {
      items.push({
        value: i,
        label: list[i] || editor.getLang("paragraph")[i],
        theme: editor.options.theme,
        renderLabelHtml() {
          return (
            '<div class="edui-label %%-label"><span class="edui-for-' +
            this.value +
            '">' +
            (this.label || "") +
            "</span></div>"
          );
        }
      });
    }
    var ui = new editorui.Combox({
      editor,
      items,
      title,
      initValue: title,
      className: "edui-for-paragraph",
      onselect(t, index) {
        editor.execCommand("Paragraph", this.items[index].value);
      },
      onbuttonclick() {
        this.showPopup();
      }
    });
    editorui.buttons["paragraph"] = ui;
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      if (!uiReady) {
        var state = editor.queryCommandState("Paragraph");
        if (state == -1) {
          ui.setDisabled(true);
        } else {
          ui.setDisabled(false);
          var value = editor.queryCommandValue("Paragraph");
          var index = ui.indexByValue(value);
          if (index != -1) {
            ui.setValue(value);
          } else {
            ui.setValue(ui.initValue);
          }
        }
      }
    });
    return ui;
  };

  //自定义标题
  editorui.customstyle = editor => {
    var list = editor.options["customstyle"] || [];
    var title = editor.options.labelMap["customstyle"] || editor.getLang("labelMap.customstyle") || "";
    if (!list.length) return;
    var langCs = editor.getLang("customstyle");
    for (var i = 0, items = [], t; (t = list[i++]); ) {
      (t => {
        var ck = {};
        ck.label = t.label ? t.label : langCs[t.name];
        ck.style = t.style;
        ck.className = t.className;
        ck.tag = t.tag;
        items.push({
          label: ck.label,
          value: ck,
          theme: editor.options.theme,
          renderLabelHtml() {
            return (
              '<div class="edui-label %%-label">' +
              "<" +
              ck.tag +
              " " +
              (ck.className ? ' class="' + ck.className + '"' : "") +
              (ck.style ? ' style="' + ck.style + '"' : "") +
              ">" +
              ck.label +
              "</" +
              ck.tag +
              ">" +
              "</div>"
            );
          }
        });
      })(t);
    }

    var ui = new editorui.Combox({
      editor,
      items,
      title,
      initValue: title,
      className: "edui-for-customstyle",
      onselect(t, index) {
        editor.execCommand("customstyle", this.items[index].value);
      },
      onbuttonclick() {
        this.showPopup();
      },
      indexByValue(value) {
        for (var i = 0, ti; (ti = this.items[i++]); ) {
          if (ti.label == value) {
            return i - 1;
          }
        }
        return -1;
      }
    });
    editorui.buttons["customstyle"] = ui;
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      if (!uiReady) {
        var state = editor.queryCommandState("customstyle");
        if (state == -1) {
          ui.setDisabled(true);
        } else {
          ui.setDisabled(false);
          var value = editor.queryCommandValue("customstyle");
          var index = ui.indexByValue(value);
          if (index != -1) {
            ui.setValue(value);
          } else {
            ui.setValue(ui.initValue);
          }
        }
      }
    });
    return ui;
  };
  editorui.inserttable = (editor, iframeUrl, title) => {
    title = editor.options.labelMap["inserttable"] || editor.getLang("labelMap.inserttable") || "";
    var ui = new editorui.TableButton({
      editor,
      title,
      className: "edui-for-inserttable",
      onpicktable(t, numCols, numRows) {
        editor.execCommand("InsertTable", {
          numRows,
          numCols,
          border: 1
        });
      },
      onbuttonclick() {
        this.showPopup();
      }
    });
    editorui.buttons["inserttable"] = ui;
    editor.addListener("selectionchange", () => {
      ui.setDisabled(editor.queryCommandState("inserttable") == -1);
    });
    return ui;
  };

  editorui.lineheight = editor => {
    var val = editor.options.lineheight || [];
    if (!val.length) return;
    for (var i = 0, ci, items = []; (ci = val[i++]); ) {
      items.push({
        //todo:写死了
        label: ci,
        value: ci,
        theme: editor.options.theme,
        onclick() {
          editor.execCommand("lineheight", this.value);
        }
      });
    }
    var ui = new editorui.MenuButton({
      editor,
      className: "edui-for-lineheight",
      title: editor.options.labelMap["lineheight"] || editor.getLang("labelMap.lineheight") || "",
      items,
      onbuttonclick() {
        var value = editor.queryCommandValue("LineHeight") || this.value;
        editor.execCommand("LineHeight", value);
      }
    });
    editorui.buttons["lineheight"] = ui;
    editor.addListener("selectionchange", () => {
      var state = editor.queryCommandState("LineHeight");
      if (state == -1) {
        ui.setDisabled(true);
      } else {
        ui.setDisabled(false);
        var value = editor.queryCommandValue("LineHeight");
        value && ui.setValue((value + "").replace(/cm/, ""));
        ui.setChecked(state);
      }
    });
    return ui;
  };

  var rowspacings = ["top", "bottom"];
  for (var r = 0, ri; (ri = rowspacings[r++]); ) {
    (cmd => {
      editorui["rowspacing" + cmd] = editor => {
        var val = editor.options["rowspacing" + cmd] || [];
        if (!val.length) return null;
        for (var i = 0, ci, items = []; (ci = val[i++]); ) {
          items.push({
            label: ci,
            value: ci,
            theme: editor.options.theme,
            onclick() {
              editor.execCommand("rowspacing", this.value, cmd);
            }
          });
        }
        var ui = new editorui.MenuButton({
          editor,
          className: "edui-for-rowspacing" + cmd,
          title: editor.options.labelMap["rowspacing" + cmd] || editor.getLang("labelMap.rowspacing" + cmd) || "",
          items,
          onbuttonclick() {
            var value = editor.queryCommandValue("rowspacing", cmd) || this.value;
            editor.execCommand("rowspacing", value, cmd);
          }
        });
        editorui.buttons[cmd] = ui;
        editor.addListener("selectionchange", () => {
          var state = editor.queryCommandState("rowspacing", cmd);
          if (state == -1) {
            ui.setDisabled(true);
          } else {
            ui.setDisabled(false);
            var value = editor.queryCommandValue("rowspacing", cmd);
            value && ui.setValue((value + "").replace(/%/, ""));
            ui.setChecked(state);
          }
        });
        return ui;
      };
    })(ri);
  }
  //有序，无序列表
  var lists = ["insertorderedlist", "insertunorderedlist"];
  for (var l = 0, cl; (cl = lists[l++]); ) {
    (cmd => {
      editorui[cmd] = editor => {
        var vals = editor.options[cmd];

        var _onMenuClick = function() {
          editor.execCommand(cmd, this.value);
        };

        var items = [];
        for (var i in vals) {
          items.push({
            label: vals[i] || editor.getLang()[cmd][i] || "",
            value: i,
            theme: editor.options.theme,
            onclick: _onMenuClick
          });
        }
        var ui = new editorui.MenuButton({
          editor,
          className: "edui-for-" + cmd,
          title: editor.getLang("labelMap." + cmd) || "",
          items,
          onbuttonclick() {
            var value = editor.queryCommandValue(cmd) || this.value;
            editor.execCommand(cmd, value);
          }
        });
        editorui.buttons[cmd] = ui;
        editor.addListener("selectionchange", () => {
          var state = editor.queryCommandState(cmd);
          if (state == -1) {
            ui.setDisabled(true);
          } else {
            ui.setDisabled(false);
            var value = editor.queryCommandValue(cmd);
            ui.setValue(value);
            ui.setChecked(state);
          }
        });
        return ui;
      };
    })(cl);
  }

  editorui.fullscreen = (editor, title) => {
    title = editor.options.labelMap["fullscreen"] || editor.getLang("labelMap.fullscreen") || "";
    var ui = new editorui.Button({
      className: "edui-for-fullscreen",
      title,
      theme: editor.options.theme,
      onclick() {
        if (editor.ui) {
          editor.ui.setFullScreen(!editor.ui.isFullScreen());
        }
        this.setChecked(editor.ui.isFullScreen());
      }
    });
    editorui.buttons["fullscreen"] = ui;
    editor.addListener("selectionchange", () => {
      var state = editor.queryCommandState("fullscreen");
      ui.setDisabled(state == -1);
      ui.setChecked(editor.ui.isFullScreen());
    });
    return ui;
  };

  // 表情
  editorui["emotion"] = (editor, iframeUrl) => {
    var cmd = "emotion";
    var ui = new editorui.MultiMenuPop({
      title: editor.options.labelMap[cmd] || editor.getLang("labelMap." + cmd + "") || "",
      editor,
      className: "edui-for-" + cmd,
      iframeUrl: editor.ui.mapUrl(iframeUrl || (editor.options.iframeUrlMap || {})[cmd] || iframeUrlMap[cmd])
    });
    editorui.buttons[cmd] = ui;

    editor.addListener("selectionchange", () => {
      ui.setDisabled(editor.queryCommandState(cmd) == -1);
    });
    return ui;
  };

  editorui.autotypeset = editor => {
    var ui = new editorui.AutoTypeSetButton({
      editor,
      title: editor.options.labelMap["autotypeset"] || editor.getLang("labelMap.autotypeset") || "",
      className: "edui-for-autotypeset",
      onbuttonclick() {
        editor.execCommand("autotypeset");
      }
    });
    editorui.buttons["autotypeset"] = ui;
    editor.addListener("selectionchange", () => {
      ui.setDisabled(editor.queryCommandState("autotypeset") == -1);
    });
    return ui;
  };

  /* 简单上传插件 */
  editorui["simpleupload"] = editor => {
    var name = "simpleupload";

    var ui = new editorui.Button({
      className: "edui-for-" + name,
      title: editor.options.labelMap[name] || editor.getLang("labelMap." + name) || "",
      onclick() {},
      theme: editor.options.theme,
      showText: false
    });

    editorui.buttons[name] = ui;
    editor.addListener("ready", () => {
      var b = ui.getDom("body");
      var iconSpan = b.children[0];
      editor.fireEvent("simpleuploadbtnready", iconSpan);
    });
    editor.addListener("selectionchange", (type, causeByUi, uiReady) => {
      var state = editor.queryCommandState(name);
      if (state == -1) {
        ui.setDisabled(true);
        ui.setChecked(false);
      } else {
        if (!uiReady) {
          ui.setDisabled(false);
          ui.setChecked(state);
        }
      }
    });
    return ui;
  };
})();
