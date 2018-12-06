"use strict";

const fs2 = require("fs");
const distDir = "dist/";
const cssBasePath = "themes/default/_css/";
const jsBasePath = "_src/";
const parseBasePath = "_parse/";

function fetchScripts(readFile, basePath) {
  let sources = fs2.readFileSync(readFile);

  sources = /\[([^\]]+\.js'[^\]]+)]/.exec(sources);
  sources = sources[1].replace(/\/\/.*\n/g, "\n").replace(/'|"|\n|\t|\s/g, "");
  sources = sources.split(",");
  sources.forEach((filepath, index) => {
    sources[index] = basePath + filepath;
  });

  return sources;
}

function fetchStyles () {
  const sources = fs2.readFileSync(cssBasePath + "ueditor.css");
  let filepath;
  const pattern = /@import\s+([^;]+)*;/g;
  const src = [];

  while ((filepath = pattern.exec(sources))) {
    src.push(cssBasePath + filepath[1].replace(/['"]/g, ""));
  }

  return src;
}

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
        src: fetchScripts("_examples/editor_api.js", jsBasePath),
        dest: distDir + packageJson.name + ".all.js"
      },
      parse: {
        options: {
          banner: banner + "(function(){\n\n",
          footer: "\n\n})();\n"
        },
        src: fetchScripts("ueditor.parse.js", parseBasePath),
        dest: distDir + packageJson.name + ".parse.js"
      },
      css: {
        src: fetchStyles(),
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
    clean: {
      build: {
        src: [
          distDir + "jsp/src",
          distDir + "*/upload",
          distDir + ".DS_Store",
          distDir + "**/.DS_Store",
          distDir + ".git",
          distDir + "**/.git"
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");

  grunt.registerTask("default", "build all", function() {
    updateConfigFile(grunt);
    grunt.task.run([
      "concat",
      "cssmin",
      "uglify",
      "copy:base",
      "clean"
    ]);
  });
};
