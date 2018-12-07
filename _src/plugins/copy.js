UE.plugin.register("copy", function() {
  var me = this;

  function initZeroClipboard() {
    ZeroClipboard.config({
      debug: false,
      swfPath: "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/zeroclipboard/ZeroClipboard.swf"
    });

    var client = (me.zeroclipboard = new ZeroClipboard());

    // 复制内容
    client.on("copy", e => {
      var client = e.client;
      var rng = me.selection.getRange();
      var div = document.createElement("div");

      div.appendChild(rng.cloneContents());
      client.setText(div.innerText || div.textContent);
      client.setHtml(div.innerHTML);
      rng.select();
    });
    // hover事件传递到target
    client.on("mouseover mouseout", e => {
      var target = e.target;
      if (target) {
        if (e.type == "mouseover") {
          domUtils.addClass(target, "edui-state-hover");
        } else if (e.type == "mouseout") {
          domUtils.removeClasses(target, "edui-state-hover");
        }
      }
    });
    // flash加载不成功
    client.on("wrongflash noflash", () => {
      ZeroClipboard.destroy();
    });

    // 触发事件
    me.fireEvent("zeroclipboardready", client);
  }

  return {
    bindEvents: {
      ready() {
        if (!browser.ie) {
          if (window.ZeroClipboard) {
            initZeroClipboard();
          } else {
            utils.loadFile(
              document,
              {
                src: "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/zeroclipboard/ZeroClipboard.js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
              },
              () => {
                initZeroClipboard();
              }
            );
          }
        }
      }
    },
    commands: {
      copy: {
        execCommand(cmd) {
          if (!me.document.execCommand("copy")) {
            alert(me.getLang("copymsg"));
          }
        }
      }
    }
  };
});
