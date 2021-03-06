/**
 * User: Jinqn
 * Date: 14-04-08
 * Time: 下午16:34
 * 上传图片对话框逻辑代码,包括tab: 远程图片/上传图片/在线图片/搜索图片
 */

(() => {
  var remoteImage;
  var uploadImage;
  var onlineImage;
  var searchImage;

  window.onload = () => {
    initTabs();
    initAlign();
    initButtons();
  };

  /* 初始化tab标签 */
  function initTabs() {
    var tabs = $G("tabhead").children;
    for (var i = 0; i < tabs.length; i++) {
      domUtils.on(tabs[i], "click", e => {
        var target = e.target || e.srcElement;
        setTabFocus(target.getAttribute("data-content-id"));
      });
    }

    var img = editor.selection.getRange().getClosedNode();
    if (img && img.tagName && img.tagName.toLowerCase() === "img") {
      setTabFocus("remote");
    } else {
      setTabFocus("upload");
    }
  }

  /* 初始化tabbody */
  function setTabFocus(id) {
    if (!id) return;
    var i;
    var bodyId;
    var tabs = $G("tabhead").children;
    for (i = 0; i < tabs.length; i++) {
      bodyId = tabs[i].getAttribute("data-content-id");
      if (bodyId == id) {
        domUtils.addClass(tabs[i], "focus");
        domUtils.addClass($G(bodyId), "focus");
      } else {
        domUtils.removeClasses(tabs[i], "focus");
        domUtils.removeClasses($G(bodyId), "focus");
      }
    }
    switch (id) {
      case "remote":
        remoteImage = remoteImage || new RemoteImage();
        break;
      case "upload":
        setAlign(editor.getOpt("imageInsertAlign"));
        uploadImage = uploadImage || new UploadImage("queueList");
        break;
      case "online":
        setAlign(editor.getOpt("imageManagerInsertAlign"));
        onlineImage = onlineImage || new OnlineImage("imageList");
        onlineImage.reset();
        break;
      case "search":
        setAlign(editor.getOpt("imageManagerInsertAlign"));
        searchImage = searchImage || new SearchImage();
        break;
    }
  }

  /* 初始化onok事件 */
  function initButtons() {
    dialog.onok = () => {
      var remote = false;
      var list = [];
      var id;
      var tabs = $G("tabhead").children;
      for (var i = 0; i < tabs.length; i++) {
        if (domUtils.hasClass(tabs[i], "focus")) {
          id = tabs[i].getAttribute("data-content-id");
          break;
        }
      }

      switch (id) {
        case "remote":
          list = remoteImage.getInsertList();
          break;
        case "upload":
          list = uploadImage.getInsertList();
          var count = uploadImage.getQueueCount();
          if (count) {
            $(".info", "#queueList").html('<span style="color:red;">' + "还有2个未上传文件".replace(/[\d]/, count) + "</span>");
            return false;
          }
          break;
        case "online":
          list = onlineImage.getInsertList();
          break;
        case "search":
          list = searchImage.getInsertList();
          remote = true;
          break;
      }

      if (list) {
        editor.execCommand("insertimage", list);
        remote && editor.fireEvent("catchRemoteImage");
      }
    };
  }

  /* 初始化对其方式的点击事件 */
  function initAlign() {
    /* 点击align图标 */
    domUtils.on($G("alignIcon"), "click", e => {
      var target = e.target || e.srcElement;
      if (target.className && target.className.indexOf("-align") != -1) {
        setAlign(target.getAttribute("data-align"));
      }
    });
  }

  /* 设置对齐方式 */
  function setAlign(align) {
    align = align || "none";
    var aligns = $G("alignIcon").children;
    for (i = 0; i < aligns.length; i++) {
      if (aligns[i].getAttribute("data-align") == align) {
        domUtils.addClass(aligns[i], "focus");
        $G("align").value = aligns[i].getAttribute("data-align");
      } else {
        domUtils.removeClasses(aligns[i], "focus");
      }
    }
  }
  /* 获取对齐方式 */
  function getAlign() {
    var align = $G("align").value || "none";
    return align === "none" ? "" : align;
  }

  /* 在线图片 */
  function RemoteImage(target) {
    this.container = utils.isString(target) ? document.getElementById(target) : target;
    this.init();
  }
  RemoteImage.prototype = {
    init() {
      this.initContainer();
      this.initEvents();
    },
    initContainer() {
      this.dom = {
        url: $G("url"),
        width: $G("width"),
        height: $G("height"),
        border: $G("border"),
        vhSpace: $G("vhSpace"),
        title: $G("title"),
        align: $G("align")
      };
      var img = editor.selection.getRange().getClosedNode();
      if (img) {
        this.setImage(img);
      }
    },
    initEvents() {
      var _this = this;
      var locker = $G("lock");

      /* 改变url */
      domUtils.on($G("url"), "keyup", updatePreview);
      domUtils.on($G("border"), "keyup", updatePreview);
      domUtils.on($G("title"), "keyup", updatePreview);

      domUtils.on($G("width"), "keyup", function() {
        if (locker.checked) {
          var proportion = locker.getAttribute("data-proportion");
          $G("height").value = Math.round(this.value / proportion);
        } else {
          _this.updateLocker();
        }
        updatePreview();
      });
      domUtils.on($G("height"), "keyup", function() {
        if (locker.checked) {
          var proportion = locker.getAttribute("data-proportion");
          $G("width").value = Math.round(this.value * proportion);
        } else {
          _this.updateLocker();
        }
        updatePreview();
      });
      domUtils.on($G("lock"), "change", () => {
        var proportion = parseInt($G("width").value) / parseInt($G("height").value);
        locker.setAttribute("data-proportion", proportion);
      });

      function updatePreview() {
        _this.setPreview();
      }
    },
    updateLocker() {
      var width = $G("width").value;
      var height = $G("height").value;
      var locker = $G("lock");
      if (width && height && width == parseInt(width) && height == parseInt(height)) {
        locker.disabled = false;
        locker.title = "";
      } else {
        locker.checked = false;
        locker.disabled = "disabled";
        locker.title = lang.remoteLockError;
      }
    },
    setImage(img) {
      /* 不是正常的图片 */
      if (!img.tagName || (img.tagName.toLowerCase() !== "img" && !img.getAttribute("src")) || !img.src) return;

      var wordImgFlag = img.getAttribute("word_img");

      var src = wordImgFlag ? wordImgFlag.replace("&amp;", "&") : img.getAttribute("_src") || img.getAttribute("src", 2).replace("&amp;", "&");

      var align = editor.queryCommandValue("imageFloat");

      /* 防止onchange事件循环调用 */
      if (src !== $G("url").value) $G("url").value = src;
      if (src) {
        /* 设置表单内容 */
        $G("width").value = img.width || "";
        $G("height").value = img.height || "";
        $G("border").value = img.getAttribute("border") || "0";
        $G("vhSpace").value = img.getAttribute("vspace") || "0";
        $G("title").value = img.title || img.alt || "";
        setAlign(align);
        this.setPreview();
        this.updateLocker();
      }
    },
    getData() {
      var data = {};
      for (var k in this.dom) {
        data[k] = this.dom[k].value;
      }
      return data;
    },
    setPreview() {
      var url = $G("url").value;
      var ow = $G("width").value;
      var oh = $G("height").value;
      var border = $G("border").value;
      var title = $G("title").value;
      var preview = $G("preview");
      var width;
      var height;

      width = !ow || !oh ? preview.offsetWidth : Math.min(ow, preview.offsetWidth);
      width = width + border * 2 > preview.offsetWidth ? width : preview.offsetWidth - border * 2;
      height = !ow || !oh ? "" : (width * oh) / ow;

      if (url) {
        preview.innerHTML = '<img src="' + url + '" width="' + width + '" height="' + height + '" border="' + border + 'px solid #000" title="' + title + '" />';
      }
    },
    getInsertList() {
      var data = this.getData();
      if (data["url"]) {
        return [
          {
            src: data["url"],
            _src: data["url"],
            width: data["width"] || "",
            height: data["height"] || "",
            border: data["border"] || "",
            floatStyle: data["align"] || "",
            vspace: data["vhSpace"] || "",
            alt: data["title"] || "",
            style: "width:" + data["width"] + "px;height:" + data["height"] + "px;"
          }
        ];
      } else {
        return [];
      }
    }
  };

  /* 上传图片 */
  function UploadImage(target) {
    this.$wrap = target.constructor == String ? $("#" + target) : $(target);
    this.init();
  }
  UploadImage.prototype = {
    init() {
      this.imageList = [];
      this.initContainer();
      this.initUploader();
    },
    initContainer() {
      this.$queue = this.$wrap.find(".filelist");
    },
    /* 初始化容器 */
    initUploader() {
      var _this = this;

      var // just in case. Make sure it's not an other libaray.
        $ = jQuery;

      var $wrap = _this.$wrap;

      var // 图片容器
        $queue = $wrap.find(".filelist");

      var // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find(".statusBar");

      var // 文件总体选择信息。
        $info = $statusBar.find(".info");

      var // 上传按钮
        $upload = $wrap.find(".uploadBtn");

      var // 上传按钮
        $filePickerBtn = $wrap.find(".filePickerBtn");

      var // 上传按钮
        $filePickerBlock = $wrap.find(".filePickerBlock");

      var // 没选择文件之前的内容。
        $placeHolder = $wrap.find(".placeholder");

      var // 总体进度条
        $progress = $statusBar.find(".progress").hide();

      var // 添加的文件数量
        fileCount = 0;

      var // 添加的文件总大小
        fileSize = 0;

      var // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1;

      var // 缩略图大小
        thumbnailWidth = 113 * ratio;

      var thumbnailHeight = 113 * ratio;

      var // 可能有pedding, ready, uploading, confirm, done.
        state = "";

      var // 所有文件的进度信息，key为file id
        percentages = {};

      var supportTransition = (() => {
        var s = document.createElement("p").style;

        var r = "transition" in s || "WebkitTransition" in s || "MozTransition" in s || "msTransition" in s || "OTransition" in s;

        s = null;
        return r;
      })();

      var // WebUploader实例
        uploader;

      var actionUrl = editor.getActionUrl(editor.getOpt("imageActionName"));

      var acceptExtensions = (editor.getOpt("imageAllowFiles") || [])
        .join("")
        .replace(/\./g, ",")
        .replace(/^[,]/, "");

      var imageMaxSize = editor.getOpt("imageMaxSize");
      var imageCompressBorder = editor.getOpt("imageCompressBorder");

      if (!WebUploader.Uploader.support()) {
        $("#filePickerReady")
          .after($("<div>").html(lang.errorNotSupport))
          .hide();
        return;
      } else if (!editor.getOpt("imageActionName")) {
        $("#filePickerReady")
          .after($("<div>").html(lang.errorLoadConfig))
          .hide();
        return;
      }

      uploader = _this.uploader = WebUploader.create({
        pick: {
          id: "#filePickerReady",
          label: lang.uploadSelectFile
        },
        accept: {
          title: "Images",
          extensions: acceptExtensions,
          mimeTypes: "image/*"
        },
        swf: "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/webuploader/Uploader.swf",
        server: actionUrl,
        fileVal: editor.getOpt("imageFieldName"),
        duplicate: true,
        fileSingleSizeLimit: imageMaxSize, // 默认 2 M
        compress: editor.getOpt("imageCompressEnable")
          ? {
              width: imageCompressBorder,
              height: imageCompressBorder,
              // 图片质量，只有type为`image/jpeg`的时候才有效。
              quality: 90,
              // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
              allowMagnify: false,
              // 是否允许裁剪。
              crop: false,
              // 是否保留头部meta信息。
              preserveHeaders: true
            }
          : false
      });
      uploader.addButton({
        id: "#filePickerBlock"
      });
      uploader.addButton({
        id: "#filePickerBtn",
        label: lang.uploadAddFile
      });

      setState("pedding");

      // 当有文件添加进来时执行，负责view的创建
      function addFile(file) {
        var $li = $('<li id="' + file.id + '">' + '<p class="title">' + file.name + "</p>" + '<p class="imgWrap"></p>' + '<p class="progress"><span></span></p>' + "</li>");

        var $btns = $(
          '<div class="file-panel">' +
            '<span class="cancel">' +
            lang.uploadDelete +
            "</span>" +
            '<span class="rotateRight">' +
            lang.uploadTurnRight +
            "</span>" +
            '<span class="rotateLeft">' +
            lang.uploadTurnLeft +
            "</span></div>"
        ).appendTo($li);

        var $prgress = $li.find("p.progress span");
        var $wrap = $li.find("p.imgWrap");

        var $info = $('<p class="error"></p>')
          .hide()
          .appendTo($li);

        var showError = code => {
          switch (code) {
            case "exceed_size":
              text = lang.errorExceedSize;
              break;
            case "interrupt":
              text = lang.errorInterrupt;
              break;
            case "http":
              text = lang.errorHttp;
              break;
            case "not_allow_type":
              text = lang.errorFileType;
              break;
            default:
              text = lang.errorUploadRetry;
              break;
          }
          $info.text(text).show();
        };

        if (file.getStatus() === "invalid") {
          showError(file.statusText);
        } else {
          $wrap.text(lang.uploadPreview);
          if (browser.ie && browser.version <= 7) {
            $wrap.text(lang.uploadNoPreview);
          } else {
            uploader.makeThumb(
              file,
              (error, src) => {
                if (error || !src) {
                  $wrap.text(lang.uploadNoPreview);
                } else {
                  var $img = $('<img src="' + src + '">');
                  $wrap.empty().append($img);
                  $img.on("error", () => {
                    $wrap.text(lang.uploadNoPreview);
                  });
                }
              },
              thumbnailWidth,
              thumbnailHeight
            );
          }
          percentages[file.id] = [file.size, 0];
          file.rotation = 0;

          /* 检查文件格式 */
          if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
            showError("not_allow_type");
            uploader.removeFile(file);
          }
        }

        file.on("statuschange", (cur, prev) => {
          if (prev === "progress") {
            $prgress.hide().width(0);
          } else if (prev === "queued") {
            $li.off("mouseenter mouseleave");
            $btns.remove();
          }
          // 成功
          if (cur === "error" || cur === "invalid") {
            showError(file.statusText);
            percentages[file.id][1] = 1;
          } else if (cur === "interrupt") {
            showError("interrupt");
          } else if (cur === "queued") {
            percentages[file.id][1] = 0;
          } else if (cur === "progress") {
            $info.hide();
            $prgress.css("display", "block");
          } else if (cur === "complete") {
          }

          $li.removeClass("state-" + prev).addClass("state-" + cur);
        });

        $li.on("mouseenter", () => {
          $btns.stop().animate({height: 30});
        });
        $li.on("mouseleave", () => {
          $btns.stop().animate({height: 0});
        });

        $btns.on("click", "span", function() {
          var index = $(this).index();
          var deg;

          switch (index) {
            case 0:
              uploader.removeFile(file);
              return;
            case 1:
              file.rotation += 90;
              break;
            case 2:
              file.rotation -= 90;
              break;
          }

          if (supportTransition) {
            deg = "rotate(" + file.rotation + "deg)";
            $wrap.css({
              "-webkit-transform": deg,
              "-mos-transform": deg,
              "-o-transform": deg,
              transform: deg
            });
          } else {
            $wrap.css("filter", "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + (~~(((file.rotation / 90) % 4) + 4) % 4) + ")");
          }
        });

        $li.insertBefore($filePickerBlock);
      }

      // 负责view的销毁
      function removeFile(file) {
        var $li = $("#" + file.id);
        delete percentages[file.id];
        updateTotalProgress();
        $li
          .off()
          .find(".file-panel")
          .off()
          .end()
          .remove();
      }

      function updateTotalProgress() {
        var loaded = 0;
        var total = 0;
        var spans = $progress.children();
        var percent;

        $.each(percentages, (k, v) => {
          total += v[0];
          loaded += v[0] * v[1];
        });

        percent = total ? loaded / total : 0;

        spans.eq(0).text(Math.round(percent * 100) + "%");
        spans.eq(1).css("width", Math.round(percent * 100) + "%");
        updateStatus();
      }

      function setState(val, files) {
        if (val != state) {
          var stats = uploader.getStats();

          $upload.removeClass("state-" + state);
          $upload.addClass("state-" + val);

          switch (val) {
            /* 未选择文件 */
            case "pedding":
              $queue.addClass("element-invisible");
              $statusBar.addClass("element-invisible");
              $placeHolder.removeClass("element-invisible");
              $progress.hide();
              $info.hide();
              uploader.refresh();
              break;

            /* 可以开始上传 */
            case "ready":
              $placeHolder.addClass("element-invisible");
              $queue.removeClass("element-invisible");
              $statusBar.removeClass("element-invisible");
              $progress.hide();
              $info.show();
              $upload.text(lang.uploadStart);
              uploader.refresh();
              break;

            /* 上传中 */
            case "uploading":
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadPause);
              break;

            /* 暂停上传 */
            case "paused":
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadContinue);
              break;

            case "confirm":
              $progress.show();
              $info.hide();
              $upload.text(lang.uploadStart);

              stats = uploader.getStats();
              if (stats.successNum && !stats.uploadFailNum) {
                setState("finish");
                return;
              }
              break;

            case "finish":
              $progress.hide();
              $info.show();
              if (stats.uploadFailNum) {
                $upload.text(lang.uploadRetry);
              } else {
                $upload.text(lang.uploadStart);
              }
              break;
          }

          state = val;
          updateStatus();
        }

        if (!_this.getQueueCount()) {
          $upload.addClass("disabled");
        } else {
          $upload.removeClass("disabled");
        }
      }

      function updateStatus() {
        var text = "";
        var stats;

        if (state === "ready") {
          text = lang.updateStatusReady.replace("_", fileCount).replace("_KB", WebUploader.formatSize(fileSize));
        } else if (state === "confirm") {
          stats = uploader.getStats();
          if (stats.uploadFailNum) {
            text = lang.updateStatusConfirm.replace("_", stats.successNum).replace("_", stats.successNum);
          }
        } else {
          stats = uploader.getStats();
          text = lang.updateStatusFinish
            .replace("_", fileCount)
            .replace("_KB", WebUploader.formatSize(fileSize))
            .replace("_", stats.successNum);

          if (stats.uploadFailNum) {
            text += lang.updateStatusError.replace("_", stats.uploadFailNum);
          }
        }

        $info.html(text);
      }

      uploader.on("fileQueued", file => {
        fileCount++;
        fileSize += file.size;

        if (fileCount === 1) {
          $placeHolder.addClass("element-invisible");
          $statusBar.show();
        }

        addFile(file);
      });

      uploader.on("fileDequeued", file => {
        if (file.ext && acceptExtensions.indexOf(file.ext.toLowerCase()) != -1 && file.size <= imageMaxSize) {
          fileCount--;
          fileSize -= file.size;
        }

        removeFile(file);
        updateTotalProgress();
      });

      uploader.on("filesQueued", file => {
        if (!uploader.isInProgress() && (state === "pedding" || state === "finish" || state === "confirm" || state === "ready")) {
          setState("ready");
        }
        updateTotalProgress();
      });

      uploader.on("all", (type, files) => {
        switch (type) {
          case "uploadFinished":
            setState("confirm", files);
            break;
          case "startUpload":
            /* 添加额外的GET参数 */
            var params = utils.serializeParam(editor.queryCommandValue("serverparam")) || "";

            var url = utils.formatUrl(actionUrl + (actionUrl.indexOf("?") == -1 ? "?" : "&") + "encode=utf-8&" + params);
            uploader.option("server", url);
            setState("uploading", files);
            break;
          case "stopUpload":
            setState("paused", files);
            break;
        }
      });

      uploader.on("uploadBeforeSend", (file, data, header) => {
        //这里可以通过data对象添加POST参数
        if (actionUrl.toLowerCase().indexOf("jsp") != -1) {
          header["X-Requested-With"] = "XMLHttpRequest";
        }
      });

      uploader.on("uploadProgress", (file, percentage) => {
        var $li = $("#" + file.id);
        var $percent = $li.find(".progress span");

        $percent.css("width", percentage * 100 + "%");
        percentages[file.id][1] = percentage;
        updateTotalProgress();
      });

      uploader.on("uploadSuccess", (file, ret) => {
        var $file = $("#" + file.id);
        try {
          var responseText = ret._raw || ret;
          var json = utils.str2json(responseText);
          if (json.state === "SUCCESS") {
            _this.imageList.push(json);
            $file.append('<span class="success"></span>');
          } else {
            $file
              .find(".error")
              .text(json.state)
              .show();
          }
        } catch (e) {
          $file
            .find(".error")
            .text(lang.errorServerUpload)
            .show();
        }
      });

      uploader.on("uploadError", (file, code) => {});
      uploader.on("error", (code, file) => {
        if (code === "Q_TYPE_DENIED" || code === "F_EXCEED_SIZE") {
          addFile(file);
        }
      });
      uploader.on("uploadComplete", (file, ret) => {});

      $upload.on("click", function() {
        if ($(this).hasClass("disabled")) {
          return false;
        }

        if (state === "ready") {
          uploader.upload();
        } else if (state === "paused") {
          uploader.upload();
        } else if (state === "uploading") {
          uploader.stop();
        }
      });

      $upload.addClass("state-" + state);
      updateTotalProgress();
    },
    getQueueCount() {
      var file;
      var i;
      var status;
      var readyFile = 0;
      var files = this.uploader.getFiles();
      for (i = 0; (file = files[i++]); ) {
        status = file.getStatus();
        if (status === "queued" || status === "uploading" || status === "progress") readyFile++;
      }
      return readyFile;
    },
    destroy() {
      this.$wrap.remove();
    },
    getInsertList() {
      var i;
      var data;
      var list = [];
      var align = getAlign();
      var prefix = editor.getOpt("imageUrlPrefix");
      for (i = 0; i < this.imageList.length; i++) {
        data = this.imageList[i];
        list.push({
          src: prefix + data.url,
          _src: prefix + data.url,
          alt: data.original,
          floatStyle: align
        });
      }
      return list;
    }
  };

  /* 在线图片 */
  function OnlineImage(target) {
    this.container = utils.isString(target) ? document.getElementById(target) : target;
    this.init();
  }
  OnlineImage.prototype = {
    init() {
      this.reset();
      this.initEvents();
    },
    /* 初始化容器 */
    initContainer() {
      this.container.innerHTML = "";
      this.list = document.createElement("ul");
      this.clearFloat = document.createElement("li");

      domUtils.addClass(this.list, "list");
      domUtils.addClass(this.clearFloat, "clearFloat");

      this.list.appendChild(this.clearFloat);
      this.container.appendChild(this.list);
    },
    /* 初始化滚动事件,滚动到地步自动拉取数据 */
    initEvents() {
      var _this = this;

      /* 滚动拉取图片 */
      domUtils.on($G("imageList"), "scroll", function(e) {
        var panel = this;
        if (panel.scrollHeight - (panel.offsetHeight + panel.scrollTop) < 10) {
          _this.getImageData();
        }
      });
      /* 选中图片 */
      domUtils.on(this.container, "click", e => {
        var target = e.target || e.srcElement;
        var li = target.parentNode;

        if (li.tagName.toLowerCase() === "li") {
          if (domUtils.hasClass(li, "selected")) {
            domUtils.removeClasses(li, "selected");
          } else {
            domUtils.addClass(li, "selected");
          }
        }
      });
    },
    /* 初始化第一次的数据 */
    initData() {
      /* 拉取数据需要使用的值 */
      this.state = 0;
      this.listSize = editor.getOpt("imageManagerListSize");
      this.listIndex = 0;
      this.listEnd = false;

      /* 第一次拉取数据 */
      this.getImageData();
    },
    /* 重置界面 */
    reset() {
      this.initContainer();
      this.initData();
    },
    /* 向后台拉取图片列表数据 */
    getImageData() {
      var _this = this;

      if (!_this.listEnd && !this.isLoadingData) {
        this.isLoadingData = true;
        var url = editor.getActionUrl(editor.getOpt("imageManagerActionName"));
        var isJsonp = utils.isCrossDomainUrl(url);
        ajax.request(url, {
          timeout: 100000,
          dataType: isJsonp ? "jsonp" : "",
          data: utils.extend(
            {
              start: this.listIndex,
              size: this.listSize
            },
            editor.queryCommandValue("serverparam")
          ),
          method: "get",
          onsuccess(r) {
            try {
              var json = isJsonp ? r : eval("(" + r.responseText + ")");
              if (json.state === "SUCCESS") {
                _this.pushData(json.list);
                _this.listIndex = parseInt(json.start) + parseInt(json.list.length);
                if (_this.listIndex >= json.total) {
                  _this.listEnd = true;
                }
                _this.isLoadingData = false;
              }
            } catch (e) {
              if (r.responseText.indexOf("ue_separate_ue") != -1) {
                var list = r.responseText.split(r.responseText);
                _this.pushData(list);
                _this.listIndex = parseInt(list.length);
                _this.listEnd = true;
                _this.isLoadingData = false;
              }
            }
          },
          onerror() {
            _this.isLoadingData = false;
          }
        });
      }
    },
    /* 添加图片到列表界面上 */
    pushData(list) {
      var i;
      var item;
      var img;
      var icon;
      var _this = this;
      var urlPrefix = editor.getOpt("imageManagerUrlPrefix");
      for (i = 0; i < list.length; i++) {
        if (list[i] && list[i].url) {
          item = document.createElement("li");
          img = document.createElement("img");
          icon = document.createElement("span");

          domUtils.on(
            img,
            "load",
            (image => () => {
              _this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight);
            })(img)
          );
          img.width = 113;
          img.setAttribute("src", urlPrefix + list[i].url + (list[i].url.indexOf("?") == -1 ? "?noCache=" : "&noCache=") + (+new Date()).toString(36));
          img.setAttribute("_src", urlPrefix + list[i].url);
          domUtils.addClass(icon, "icon");

          item.appendChild(img);
          item.appendChild(icon);
          this.list.insertBefore(item, this.clearFloat);
        }
      }
    },
    /* 改变图片大小 */
    scale(img, w, h, type) {
      var ow = img.width;
      var oh = img.height;

      if (type === "justify") {
        if (ow >= oh) {
          img.width = w;
          img.height = (h * oh) / ow;
          img.style.marginLeft = "-" + parseInt((img.width - w) / 2) + "px";
        } else {
          img.width = (w * ow) / oh;
          img.height = h;
          img.style.marginTop = "-" + parseInt((img.height - h) / 2) + "px";
        }
      } else {
        if (ow >= oh) {
          img.width = (w * ow) / oh;
          img.height = h;
          img.style.marginLeft = "-" + parseInt((img.width - w) / 2) + "px";
        } else {
          img.width = w;
          img.height = (h * oh) / ow;
          img.style.marginTop = "-" + parseInt((img.height - h) / 2) + "px";
        }
      }
    },
    getInsertList() {
      var i;
      var lis = this.list.children;
      var list = [];
      var align = getAlign();
      for (i = 0; i < lis.length; i++) {
        if (domUtils.hasClass(lis[i], "selected")) {
          var img = lis[i].firstChild;
          var src = img.getAttribute("_src");
          list.push({
            src,
            _src: src,
            alt: src.substr(src.lastIndexOf("/") + 1),
            floatStyle: align
          });
        }
      }
      return list;
    }
  };

  /*搜索图片 */
  function SearchImage() {
    this.init();
  }
  SearchImage.prototype = {
    init() {
      this.initEvents();
    },
    initEvents() {
      var _this = this;

      /* 点击搜索按钮 */
      domUtils.on($G("searchBtn"), "click", () => {
        var key = $G("searchTxt").value;
        if (key && key != lang.searchRemind) {
          _this.getImageData();
        }
      });
      /* 点击清除妞 */
      domUtils.on($G("searchReset"), "click", () => {
        $G("searchTxt").value = lang.searchRemind;
        $G("searchListUl").innerHTML = "";
        $G("searchType").selectedIndex = 0;
      });
      /* 搜索框聚焦 */
      domUtils.on($G("searchTxt"), "focus", () => {
        var key = $G("searchTxt").value;
        if (key && key == lang.searchRemind) {
          $G("searchTxt").value = "";
        }
      });
      /* 搜索框回车键搜索 */
      domUtils.on($G("searchTxt"), "keydown", e => {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
          $G("searchBtn").click();
        }
      });

      /* 选中图片 */
      domUtils.on($G("searchList"), "click", e => {
        var target = e.target || e.srcElement;
        var li = target.parentNode.parentNode;

        if (li.tagName.toLowerCase() === "li") {
          if (domUtils.hasClass(li, "selected")) {
            domUtils.removeClasses(li, "selected");
          } else {
            domUtils.addClass(li, "selected");
          }
        }
      });
    },
    /* 改变图片大小 */
    scale(img, w, h) {
      var ow = img.width;
      var oh = img.height;

      if (ow >= oh) {
        img.width = (w * ow) / oh;
        img.height = h;
        img.style.marginLeft = "-" + parseInt((img.width - w) / 2) + "px";
      } else {
        img.width = w;
        img.height = (h * oh) / ow;
        img.style.marginTop = "-" + parseInt((img.height - h) / 2) + "px";
      }
    },
    getImageData() {
      var _this = this;
      var key = $G("searchTxt").value;
      var type = $G("searchType").value;
      var keepOriginName = editor.options.keepOriginName ? "1" : "0";

      var url =
        "http://image.baidu.com/i?ct=201326592&cl=2&lm=-1&st=-1&tn=baiduimagejson&istype=2&rn=32&fm=index&pv=&word=" +
        key +
        type +
        "&ie=utf-8&oe=utf-8&keeporiginname=" +
        keepOriginName +
        "&" +
        +new Date();

      $G("searchListUl").innerHTML = lang.searchLoading;
      ajax.request(url, {
        dataType: "jsonp",
        charset: "GB18030",
        onsuccess(json) {
          var list = [];
          if (json && json.data) {
            for (var i = 0; i < json.data.length; i++) {
              if (json.data[i].objURL) {
                list.push({
                  title: json.data[i].fromPageTitleEnc,
                  src: json.data[i].objURL,
                  url: json.data[i].fromURL
                });
              }
            }
          }
          _this.setList(list);
        },
        onerror() {
          $G("searchListUl").innerHTML = lang.searchRetry;
        }
      });
    },
    /* 添加图片到列表界面上 */
    setList(list) {
      var i;
      var item;
      var p;
      var img;
      var link;
      var _this = this;
      var listUl = $G("searchListUl");

      listUl.innerHTML = "";
      if (list.length) {
        for (i = 0; i < list.length; i++) {
          item = document.createElement("li");
          p = document.createElement("p");
          img = document.createElement("img");
          link = document.createElement("a");

          img.onload = function() {
            _this.scale(this, 113, 113);
          };
          img.width = 113;
          img.setAttribute("src", list[i].src);

          link.href = list[i].url;
          link.target = "_blank";
          link.title = list[i].title;
          link.innerHTML = list[i].title;

          p.appendChild(img);
          item.appendChild(p);
          item.appendChild(link);
          listUl.appendChild(item);
        }
      } else {
        listUl.innerHTML = lang.searchRetry;
      }
    },
    getInsertList() {
      var child;
      var src;
      var align = getAlign();
      var list = [];
      var items = $G("searchListUl").children;
      for (var i = 0; i < items.length; i++) {
        child = items[i].firstChild && items[i].firstChild.firstChild;
        if (child.tagName && child.tagName.toLowerCase() === "img" && domUtils.hasClass(items[i], "selected")) {
          src = child.src;
          list.push({
            src,
            _src: src,
            alt: src.substr(src.lastIndexOf("/") + 1),
            floatStyle: align
          });
        }
      }
      return list;
    }
  };
})();
