UE.registerUI("autosave", editor => {
  var timer = null;
  var uid = null;
  editor.on("afterautosave", () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      if (uid) {
        editor.trigger("hidemessage", uid);
      }
      uid = editor.trigger("showmessage", {
        content: editor.getLang("autosave.success"),
        timeout: 2000
      });
    }, 2000);
  });
});
