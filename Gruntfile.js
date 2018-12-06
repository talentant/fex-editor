"use strict";

const distDir = "dist/";

function updateConfigFile (grunt) {
  const filename = "ueditor.config.js";
  if (grunt.file.write(distDir + filename, grunt.file.read(filename))) {
    grunt.log.writeln("config file update success");
  } else {
    grunt.log.warn("config file update error");
  }
}

module.exports = (grunt) => {
  const packageJson = grunt.file.readJSON("package.json");
  const banner =
`/*!
 * ${packageJson.name}
 * version: ${packageJson.version}
 * build: <%= new Date().toISOString().slice(0,10) %>
 */
`;

  grunt.initConfig({
    pkg: packageJson,
    concat: {
      js: {
        options: {
          banner: banner + "(function(){\n\n",
          footer: "\n\n})();\n",
          process: (src, s) => {
            const filename = s.substr(s.indexOf("/") + 1);
            return "// " + filename + "\n" + src.replace("/_css/", "/css/") + "\n";
          }
        },
        src: [
          '_src/editor.js',
          '_src/core/browser.js',
          '_src/core/utils.js',
          '_src/core/EventBase.js',
          '_src/core/dtd.js',
          '_src/core/domUtils.js',
          '_src/core/Range.js',
          '_src/core/Selection.js',
          '_src/core/Editor.js',
          '_src/core/Editor.defaultoptions.js',
          '_src/core/loadconfig.js',
          '_src/core/ajax.js',
          '_src/core/filterword.js',
          '_src/core/node.js',
          '_src/core/htmlparser.js',
          '_src/core/filternode.js',
          '_src/core/plugin.js',
          '_src/core/keymap.js',
          '_src/core/localstorage.js',
          '_src/plugins/defaultfilter.js',
          '_src/plugins/inserthtml.js',
          '_src/plugins/autotypeset.js',
          '_src/plugins/autosubmit.js',
          '_src/plugins/background.js',
          '_src/plugins/image.js',
          '_src/plugins/justify.js',
          '_src/plugins/font.js',
          '_src/plugins/link.js',
          '_src/plugins/iframe.js',
          '_src/plugins/scrawl.js',
          '_src/plugins/removeformat.js',
          '_src/plugins/blockquote.js',
          '_src/plugins/convertcase.js',
          '_src/plugins/indent.js',
          '_src/plugins/print.js',
          '_src/plugins/preview.js',
          '_src/plugins/selectall.js',
          '_src/plugins/paragraph.js',
          '_src/plugins/directionality.js',
          '_src/plugins/horizontal.js',
          '_src/plugins/time.js',
          '_src/plugins/rowspacing.js',
          '_src/plugins/lineheight.js',
          '_src/plugins/insertcode.js',
          '_src/plugins/cleardoc.js',
          '_src/plugins/anchor.js',
          '_src/plugins/wordcount.js',
          '_src/plugins/pagebreak.js',
          '_src/plugins/wordimage.js',
          '_src/plugins/dragdrop.js',
          '_src/plugins/undo.js',
          '_src/plugins/copy.js',
          '_src/plugins/paste.js',
          '_src/plugins/puretxtpaste.js',
          '_src/plugins/list.js',
          '_src/plugins/source.js',
          '_src/plugins/enterkey.js',
          '_src/plugins/keystrokes.js',
          '_src/plugins/fiximgclick.js',
          '_src/plugins/autolink.js',
          '_src/plugins/autoheight.js',
          '_src/plugins/autofloat.js',
          '_src/plugins/video.js',
          '_src/plugins/table.core.js',
          '_src/plugins/table.cmds.js',
          '_src/plugins/table.action.js',
          '_src/plugins/table.sort.js',
          '_src/plugins/contextmenu.js',
          '_src/plugins/shortcutmenu.js',
          '_src/plugins/basestyle.js',
          '_src/plugins/elementpath.js',
          '_src/plugins/formatmatch.js',
          '_src/plugins/searchreplace.js',
          '_src/plugins/customstyle.js',
          '_src/plugins/catchremoteimage.js',
          '_src/plugins/snapscreen.js',
          '_src/plugins/insertparagraph.js',
          '_src/plugins/webapp.js',
          '_src/plugins/template.js',
          '_src/plugins/music.js',
          '_src/plugins/autoupload.js',
          '_src/plugins/autosave.js',
          '_src/plugins/charts.js',
          '_src/plugins/section.js',
          '_src/plugins/simpleupload.js',
          '_src/plugins/serverparam.js',
          '_src/plugins/insertfile.js',
          '_src/ui/ui.js',
          '_src/ui/uiutils.js',
          '_src/ui/uibase.js',
          '_src/ui/separator.js',
          '_src/ui/mask.js',
          '_src/ui/popup.js',
          '_src/ui/colorpicker.js',
          '_src/ui/tablepicker.js',
          '_src/ui/stateful.js',
          '_src/ui/button.js',
          '_src/ui/splitbutton.js',
          '_src/ui/colorbutton.js',
          '_src/ui/tablebutton.js',
          '_src/ui/autotypesetpicker.js',
          '_src/ui/autotypesetbutton.js',
          '_src/ui/cellalignpicker.js',
          '_src/ui/pastepicker.js',
          '_src/ui/toolbar.js',
          '_src/ui/menu.js',
          '_src/ui/combox.js',
          '_src/ui/dialog.js',
          '_src/ui/menubutton.js',
          '_src/ui/multiMenu.js',
          '_src/ui/shortcutmenu.js',
          '_src/ui/breakline.js',
          '_src/ui/message.js',
          '_src/adapter/editorui.js',
          '_src/adapter/editor.js',
          '_src/adapter/message.js',
          '_src/adapter/autosave.js',
        ],
        dest: distDir + packageJson.name + ".all.js"
      },
      parse: {
        options: {
          banner: banner + "(function(){\n\n",
          footer: "\n\n})();\n"
        },
        src: [
          '_parse/parse.js',
          '_parse/insertcode.js',
          '_parse/table.js',
          '_parse/charts.js',
          '_parse/background.js',
          '_parse/list.js',
          '_parse/video.js',
        ],
        dest: distDir + packageJson.name + ".parse.js"
      },
      css: {
        src: [
          'themes/default/_css/uibase.css',
          'themes/default/_css/toolbar.css',
          'themes/default/_css/editor.css',
          'themes/default/_css/menubutton.css',
          'themes/default/_css/menu.css',
          'themes/default/_css/combox.css',
          'themes/default/_css/button.css',
          'themes/default/_css/buttonicon.css',
          'themes/default/_css/splitbutton.css',
          'themes/default/_css/popup.css',
          'themes/default/_css/message.css',
          'themes/default/_css/dialog.css',
          'themes/default/_css/paragraphpicker.css',
          'themes/default/_css/tablepicker.css',
          'themes/default/_css/colorpicker.css',
          'themes/default/_css/autotypesetpicker.css',
          'themes/default/_css/cellalignpicker.css',
          'themes/default/_css/separtor.css',
          'themes/default/_css/colorbutton.css',
          'themes/default/_css/multiMenu.css',
          'themes/default/_css/contextmenu.css',
          'themes/default/_css/shortcutmenu.css',
          'themes/default/_css/pastepicker.css',
        ],
        dest: distDir + "themes/default/css/ueditor.css"
      }
    },
    cssmin: {
      options: {
        banner
      },
      files: {
        expand: true,
        cwd: distDir + "themes/default/css/",
        src: ["*.css", "!*.min.css"],
        dest: distDir + "themes/default/css/",
        ext: ".min.css"
      }
    },
    uglify: {
      dist: {
        options: {
          banner
        },
        src: distDir + "<%= pkg.name %>.all.js",
        dest: distDir + "<%= pkg.name %>.all.min.js"
      },
      parse: {
        options: {
          banner
        },
        src: distDir + "<%= pkg.name %>.parse.js",
        dest: distDir + "<%= pkg.name %>.parse.min.js"
      }
    },
    copy: {
      base: {
        files: [
          {
            src: [
              "*.html",
              "themes/iframe.css",
              "themes/default/dialogbase.css",
              "themes/default/images/**",
              "dialogs/**",
              "lang/**",
              "third-party/**"
            ],
            dest: distDir
          }
        ]
      }
    },
  });

  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", "build all", function() {
    updateConfigFile(grunt);
    grunt.task.run([
      "concat",
      "cssmin",
      "uglify",
      "copy:base",
    ]);
  });
};
