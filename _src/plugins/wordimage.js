///import core
///commands 本地图片引导上传
///commandsName  WordImage
///commandsTitle  本地图片引导上传
///commandsDialog  dialogs\wordimage

UE.plugin.register("wordimage", function() {
  var me = this;
  var images = [];
  return {
    commands: {
      wordimage: {
        execCommand() {
          var images = domUtils.getElementsByTagName(me.body, "img");
          var urlList = [];
          for (var i = 0, ci; (ci = images[i++]); ) {
            var url = ci.getAttribute("word_img");
            url && urlList.push(url);
          }
          return urlList;
        },
        queryCommandState() {
          images = domUtils.getElementsByTagName(me.body, "img");
          for (var i = 0, ci; (ci = images[i++]); ) {
            if (ci.getAttribute("word_img")) {
              return 1;
            }
          }
          return -1;
        },
        notNeedUndo: true
      }
    },
    inputRule(root) {
      utils.each(root.getNodesByTagName("img"), img => {
        var attrs = img.attrs;
        var flag = parseInt(attrs.width) < 128 || parseInt(attrs.height) < 43;
        var opt = me.options;
        var src = opt.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
        if (attrs["src"] && /^(?:(file:\/+))/.test(attrs["src"])) {
          img.setAttr({
            width: attrs.width,
            height: attrs.height,
            alt: attrs.alt,
            word_img: attrs.src,
            src,
            style:
              "background:url(" +
              (flag ? opt.themePath + opt.theme + "/images/word.gif" : opt.langPath + opt.lang + "/images/localimage.png") +
              ") no-repeat center center;border:1px solid #ddd"
          });
        }
      });
    }
  };
});
