/**
 * 背景插件，为UEditor提供设置背景功能
 * @file
 * @since 1.2.6.1
 */
UE.plugin.register("background", function() {
  var me = this;
  var cssRuleId = "editor_background";
  var isSetColored;
  var reg = new RegExp("body[\\s]*\\{(.+)\\}", "i");

  function stringToObj(str) {
    var obj = {};
    var styles = str.split(";");
    utils.each(styles, v => {
      var index = v.indexOf(":");
      var key = utils.trim(v.substr(0, index)).toLowerCase();
      key && (obj[key] = utils.trim(v.substr(index + 1) || ""));
    });
    return obj;
  }

  function setBackground(obj) {
    if (obj) {
      var styles = [];
      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          styles.push(name + ":" + obj[name] + "; ");
        }
      }
      utils.cssRule(cssRuleId, styles.length ? "body{" + styles.join("") + "}" : "", me.document);
    } else {
      utils.cssRule(cssRuleId, "", me.document);
    }
  }
  //重写editor.hasContent方法

  var orgFn = me.hasContents;
  me.hasContents = (...args) => {
    if (me.queryCommandValue("background")) {
      return true;
    }
    return orgFn.apply(me, args);
  };
  return {
    bindEvents: {
      getAllHtml(type, headHtml) {
        var body = this.body;
        var su = domUtils.getComputedStyle(body, "background-image");
        var url = "";
        if (su.indexOf(me.options.imagePath) > 0) {
          url = su.substring(su.indexOf(me.options.imagePath), su.length - 1).replace(/"|\(|\)/gi, "");
        } else {
          url = su !== "none" ? su.replace(/url\("?|"?\)/gi, "") : "";
        }
        var html = '<style type="text/css">body{';
        var bgObj = {
          "background-color": domUtils.getComputedStyle(body, "background-color") || "#ffffff",
          "background-image": url ? "url(" + url + ")" : "",
          "background-repeat": domUtils.getComputedStyle(body, "background-repeat") || "",
          "background-position": browser.ie
            ? domUtils.getComputedStyle(body, "background-position-x") + " " + domUtils.getComputedStyle(body, "background-position-y")
            : domUtils.getComputedStyle(body, "background-position"),
          height: domUtils.getComputedStyle(body, "height")
        };
        for (var name in bgObj) {
          if (bgObj.hasOwnProperty(name)) {
            html += name + ":" + bgObj[name] + "; ";
          }
        }
        html += "}</style> ";
        headHtml.push(html);
      },
      aftersetcontent() {
        if (isSetColored == false) setBackground();
      }
    },
    inputRule(root) {
      isSetColored = false;
      utils.each(root.getNodesByTagName("p"), p => {
        var styles = p.getAttr("data-background");
        if (styles) {
          isSetColored = true;
          setBackground(stringToObj(styles));
          p.parentNode.removeChild(p);
        }
      });
    },
    outputRule(root) {
      var me = this;
      var styles = (utils.cssRule(cssRuleId, me.document) || "").replace(/[\n\r]+/g, "").match(reg);
      if (styles) {
        root.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + utils.trim(styles[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'));
      }
    },
    commands: {
      background: {
        execCommand(cmd, obj) {
          setBackground(obj);
        },
        queryCommandValue() {
          var me = this;
          var styles = (utils.cssRule(cssRuleId, me.document) || "").replace(/[\n\r]+/g, "").match(reg);
          return styles ? stringToObj(styles[1]) : null;
        },
        notNeedUndo: true
      }
    }
  };
});
