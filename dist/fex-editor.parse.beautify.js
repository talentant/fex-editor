/*!
 * fex-editor
 * version: 2.2.0
 * build: 2019-01-12
 */

"use strict";

!function() {
    UE = window.UE || {};
    var e = !!window.ActiveXObject, l = {
        removeLastbs: function(e) {
            return e.replace(/\/$/, "");
        },
        extend: function(e, t) {
            for (var n = arguments, i = !!this.isBoolean(n[n.length - 1]) && n[n.length - 1], r = this.isBoolean(n[n.length - 1]) ? n.length - 1 : n.length, a = 1; a < r; a++) {
                var s = n[a];
                for (var l in s) i && e.hasOwnProperty(l) || (e[l] = s[l]);
            }
            return e;
        },
        isIE: e,
        cssRule: e ? function(e, t, n) {
            var i, r, a;
            if ((i = (n = n || document).indexList ? n.indexList : n.indexList = {})[e]) a = n.styleSheets[i[e]]; else {
                if (void 0 === t) return "";
                a = n.createStyleSheet("", r = n.styleSheets.length), i[e] = r;
            }
            if (void 0 === t) return a.cssText;
            a.cssText = a.cssText + "\n" + (t || "");
        } : function(e, t, n) {
            var i, r = (n = n || document).getElementsByTagName("head")[0];
            if (!(i = n.getElementById(e))) {
                if (void 0 === t) return "";
                (i = n.createElement("style")).id = e, r.appendChild(i);
            }
            if (void 0 === t) return i.innerHTML;
            "" !== t ? i.innerHTML = i.innerHTML + "\n" + t : r.removeChild(i);
        },
        domReady: function(r) {
            var a = window.document;
            "complete" === a.readyState ? r() : e ? (function() {
                if (!a.isReady) {
                    try {
                        a.documentElement.doScroll("left");
                    } catch (e) {
                        for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
                        return setTimeout(n.callee, 0);
                    }
                    r();
                }
            }(), window.attachEvent("onload", function() {
                r();
            })) : (a.addEventListener("DOMContentLoaded", function() {
                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                a.removeEventListener("DOMContentLoaded", t.callee, !1), r();
            }, !1), window.addEventListener("load", function() {
                r();
            }, !1));
        },
        each: function(e, t, n) {
            if (null != e) if (e.length === +e.length) {
                for (var i = 0, r = e.length; i < r; i++) if (!1 === t.call(n, e[i], i, e)) return !1;
            } else for (var a in e) if (e.hasOwnProperty(a) && !1 === t.call(n, e[a], a, e)) return !1;
        },
        inArray: function(e, n) {
            var i = -1;
            return this.each(e, function(e, t) {
                if (e === n) return i = t, !1;
            }), i;
        },
        pushItem: function(e, t) {
            -1 == this.inArray(e, t) && e.push(t);
        },
        trim: function(e) {
            return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
        },
        indexOf: function(e, n, i) {
            var r = -1;
            return i = this.isNumber(i) ? i : 0, this.each(e, function(e, t) {
                if (i <= t && e === n) return r = t, !1;
            }), r;
        },
        hasClass: function(e, t) {
            t = t.replace(/(^[ ]+)|([ ]+$)/g, "").replace(/[ ]{2,}/g, " ").split(" ");
            for (var n, i = 0, r = e.className; n = t[i++]; ) if (!new RegExp("\\b" + n + "\\b", "i").test(r)) return !1;
            return i - 1 == t.length;
        },
        addClass: function(e, t) {
            if (e) {
                t = this.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                for (var n, i = 0, r = e.className; n = t[i++]; ) new RegExp("\\b" + n + "\\b").test(r) || (r += " " + n);
                e.className = l.trim(r);
            }
        },
        removeClass: function(e, t) {
            t = this.isArray(t) ? t : this.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
            for (var n, i = 0, r = e.className; n = t[i++]; ) r = r.replace(new RegExp("\\b" + n + "\\b"), "");
            r = this.trim(r).replace(/[ ]{2,}/g, " "), !(e.className = r) && e.removeAttribute("className");
        },
        on: function(e, t, n) {
            var i = this.isArray(t) ? t : t.split(/\s+/), r = i.length;
            if (r) for (;r--; ) if (t = i[r], e.addEventListener) e.addEventListener(t, n, !1); else {
                n._d || (n._d = {
                    els: []
                });
                var a = t + n.toString(), s = l.indexOf(n._d.els, e);
                n._d[a] && -1 != s || (-1 == s && n._d.els.push(e), n._d[a] || (n._d[a] = function(e) {
                    return n.call(e.srcElement, e || window.event);
                }), e.attachEvent("on" + t, n._d[a]));
            }
            e = null;
        },
        off: function(e, t, n) {
            var i = this.isArray(t) ? t : t.split(/\s+/), r = i.length;
            if (r) for (;r--; ) if (t = i[r], e.removeEventListener) e.removeEventListener(t, n, !1); else {
                var a = t + n.toString();
                try {
                    e.detachEvent("on" + t, n._d ? n._d[a] : n);
                } catch (e) {}
                if (n._d && n._d[a]) {
                    var s = l.indexOf(n._d.els, e);
                    -1 != s && n._d.els.splice(s, 1), 0 == n._d.els.length && delete n._d[a];
                }
            }
        },
        loadFile: function() {
            var l = [];
            function o(e, t) {
                try {
                    for (var n, i = 0; n = l[i++]; ) if (n.doc === e && n.url == (t.src || t.href)) return n;
                } catch (e) {
                    return null;
                }
            }
            return function(t, n, e) {
                var i = o(t, n);
                if (i) i.ready ? e && e() : i.funs.push(e); else if (l.push({
                    doc: t,
                    url: n.src || n.href,
                    funs: [ e ]
                }), t.body) {
                    if (!n.id || !t.getElementById(n.id)) {
                        var r = t.createElement(n.tag);
                        for (var a in delete n.tag, n) r.setAttribute(a, n[a]);
                        r.onload = r.onreadystatechange = function() {
                            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                if (0 < (i = o(t, n)).funs.length) {
                                    i.ready = 1;
                                    for (var e; e = i.funs.pop(); ) e();
                                }
                                r.onload = r.onreadystatechange = null;
                            }
                        }, r.onerror = function() {
                            throw Error("The load " + (n.href || n.src) + " fails,check the url");
                        }, t.getElementsByTagName("head")[0].appendChild(r);
                    }
                } else {
                    var s = [];
                    for (var a in n) "tag" !== a && s.push(a + '="' + n[a] + '"');
                    t.write("<" + n.tag + " " + s.join(" ") + " ></" + n.tag + ">");
                }
            };
        }()
    };
    l.each([ "String", "Function", "Array", "Number", "RegExp", "Object", "Boolean" ], function(t) {
        l["is" + t] = function(e) {
            return Object.prototype.toString.apply(e) === "[object " + t + "]";
        };
    });
    var n = {};
    UE.parse = {
        register: function(e, t) {
            n[e] = t;
        },
        load: function(t) {
            l.each(n, function(e) {
                e.call(t, l);
            });
        }
    }, uParse = function(n, i) {
        l.domReady(function() {
            if (document.querySelectorAll) t = document.querySelectorAll(n); else if (/^#/.test(n)) t = [ document.getElementById(n.replace(/^#/, "")) ]; else if (/^\./.test(n)) {
                var t = [];
                l.each(document.getElementsByTagName("*"), function(e) {
                    e.className && new RegExp("\\b" + n.replace(/^\./, "") + "\\b", "i").test(e.className) && t.push(e);
                });
            } else t = document.getElementsByTagName(n);
            l.each(t, function(e) {
                UE.parse.load(l.extend({
                    root: e,
                    selector: n
                }, i));
            });
        });
    };
}(), UE.parse.register("insertcode", function(e) {
    var t, n, i = this.root.getElementsByTagName("pre");
    i.length && ("undefined" == typeof XRegExp ? (n = void 0 !== this.rootPath ? (t = "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/SyntaxHighlighter/shCore.js", 
    "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/SyntaxHighlighter/shCoreDefault.css") : (t = this.highlightJsUrl, 
    this.highlightCssUrl), e.loadFile(document, {
        id: "syntaxhighlighter_css",
        tag: "link",
        rel: "stylesheet",
        type: "text/css",
        href: n
    }), e.loadFile(document, {
        id: "syntaxhighlighter_js",
        src: t,
        tag: "script",
        type: "text/javascript",
        defer: "defer"
    }, function() {
        e.each(i, function(e) {
            e && /brush/i.test(e.className) && SyntaxHighlighter.highlight(e);
        });
    })) : e.each(i, function(e) {
        e && /brush/i.test(e.className) && SyntaxHighlighter.highlight(e);
    }));
}), UE.parse.register("table", function(h) {
    var s = this, n = this.root;
    if ((t = n.getElementsByTagName("table")).length) {
        var l = function(e, t) {
            var n, i = e;
            for (t = h.isArray(t) ? t : [ t ]; i; ) {
                for (n = 0; n < t.length; n++) if (i.tagName == t[n].toUpperCase()) return i;
                i = i.parentNode;
            }
            return null;
        }, f = function(e, t) {
            t = t || function(e, t) {
                return e.localeCompare(t);
            };
            for (var n = 0, i = e.length; n < i; n++) for (var r = n, a = e.length; r < a; r++) if (0 < t(e[n], e[r])) {
                var s = e[n];
                e[n] = e[r], e[r] = s;
            }
            return e;
        }, e = this.selector;
        h.cssRule("table", e + " table.noBorderTable td," + e + " table.noBorderTable th," + e + " table.noBorderTable caption{border:1px dashed #ddd !important}" + e + " table.sortEnabled tr.firstRow th," + e + " table.sortEnabled tr.firstRow td{padding-right:20px; background-repeat: no-repeat;background-position: center right; background-image:url(" + this.rootPath + "themes/default/images/sortable.png);}" + e + " table.sortEnabled tr.firstRow th:hover," + e + " table.sortEnabled tr.firstRow td:hover{background-color: #EEE;}" + e + " table{margin-bottom:10px;border-collapse:collapse;display:table;}" + e + " td," + e + " th{padding: 5px 10px;border: 1px solid #DDD;}" + e + " caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}" + e + " th{border-top:1px solid #BBB;background:#F7F7F7;}" + e + " table tr.firstRow th{border-top:2px solid #BBB;background:#F7F7F7;}" + e + " tr.ue-table-interlace-color-single td{ background: #fcfcfc; }" + e + " tr.ue-table-interlace-color-double td{ background: #f7faff; }" + e + " td p{margin:0;padding:0;width:auto;height:auto;}", document), 
        h.each("td th caption".split(" "), function(e) {
            var t = n.getElementsByTagName(e);
            t.length && h.each(t, function(e) {
                e.firstChild || (e.innerHTML = "&nbsp;");
            });
        });
        var t = n.getElementsByTagName("table");
        h.each(t, function(e) {
            /\bsortEnabled\b/.test(e.className) && h.on(e, "click", function(e) {
                var t = e.target || e.srcElement, n = l(t, [ "td", "th" ]), i = l(t, "table"), r = h.indexOf(i.rows[0].cells, n), a = i.getAttribute("data-sort-type");
                -1 != r && (function(e, n, i) {
                    for (var t = e.rows, r = [], a = "TH" === t[0].cells[0].tagName, s = 0, l = t.length; s < l; s++) r[s] = t[s];
                    var o = {
                        reversecurrent: function(e, t) {
                            return 1;
                        },
                        orderbyasc: function(e, t) {
                            var n = e.innerText || e.textContent, i = t.innerText || t.textContent;
                            return n.localeCompare(i);
                        },
                        reversebyasc: function(e, t) {
                            var n = e.innerHTML;
                            return t.innerHTML.localeCompare(n);
                        },
                        orderbynum: function(e, t) {
                            var n = e[h.isIE ? "innerText" : "textContent"].match(/\d+/), i = t[h.isIE ? "innerText" : "textContent"].match(/\d+/);
                            return n && (n = +n[0]), i && (i = +i[0]), (n || 0) - (i || 0);
                        },
                        reversebynum: function(e, t) {
                            var n = e[h.isIE ? "innerText" : "textContent"].match(/\d+/), i = t[h.isIE ? "innerText" : "textContent"].match(/\d+/);
                            return n && (n = +n[0]), i && (i = +i[0]), (i || 0) - (n || 0);
                        }
                    };
                    e.setAttribute("data-sort-type", i && "string" == typeof i && o[i] ? i : ""), a && r.splice(0, 1), 
                    r = f(r, function(e, t) {
                        return i && "function" == typeof i ? i.call(this, e.cells[n], t.cells[n]) : i && "number" == typeof i ? 1 : i && "string" == typeof i && o[i] ? o[i].call(this, e.cells[n], t.cells[n]) : o.orderbyasc.call(this, e.cells[n], t.cells[n]);
                    });
                    var d = e.ownerDocument.createDocumentFragment(), c = 0;
                    for (l = r.length; c < l; c++) d.appendChild(r[c]);
                    var u = e.getElementsByTagName("tbody")[0];
                    u.appendChild(d);
                }(i, r, s.tableSortCompareFn || a), function(e) {
                    if (!h.hasClass(e.rows[0], "firstRow")) {
                        for (var t = 1; t < e.rows.length; t++) h.removeClass(e.rows[t], "firstRow");
                        h.addClass(e.rows[0], "firstRow");
                    }
                }(i));
            });
        });
    }
}), UE.parse.register("charts", function(e) {
    e.cssRule("chartsContainerHeight", ".edui-chart-container { height:" + (this.chartContainerHeight || 300) + "px}");
    var t = this.rootPath, n = this.root, d = null;
    function a(e) {
        for (var t, n = e.getAttribute("data-chart"), i = {}, r = [], a = 0; t = e.rows[a]; a++) {
            for (var s, l = [], o = 0; s = t.cells[o]; o++) {
                var d = s.innerText || s.textContent || "";
                l.push("TH" === s.tagName ? d : 0 | d);
            }
            r.push(l);
        }
        var c;
        for (n = n.split(";"), a = 0; c = n[a]; a++) i[(c = c.split(":"))[0]] = c[1];
        return {
            table: e,
            meta: i,
            data: r
        };
    }
    function i() {
        window.Highcharts ? r() : e.loadFile(document, {
            src: "https://code.highcharts.com/3.0.6/highcharts.js",
            tag: "script",
            type: "text/javascript",
            defer: "defer"
        }, function() {
            r();
        });
    }
    function r() {
        e.loadFile(document, {
            src: t + "/dialogs/charts/chart.config.js",
            tag: "script",
            type: "text/javascript",
            defer: "defer"
        }, function() {
            !function() {
                for (var e = null, t = null, n = 0, i = d.length; n < i; n++) e = d[n], t = c(e), 
                r = e.table, a = void 0, (a = document.createElement("div")).className = "edui-chart-container", 
                r.parentNode.replaceChild(a, r), s = a, l = typeConfig[e.meta.chartType], o = t, 
                $(s).highcharts($.extend({}, l, {
                    credits: {
                        enabled: !1
                    },
                    exporting: {
                        enabled: !1
                    },
                    title: {
                        text: o.title,
                        x: -20
                    },
                    subtitle: {
                        text: o.subTitle,
                        x: -20
                    },
                    xAxis: {
                        title: {
                            text: o.xTitle
                        },
                        categories: o.categories
                    },
                    yAxis: {
                        title: {
                            text: o.yTitle
                        },
                        plotLines: [ {
                            value: 0,
                            width: 1,
                            color: "#808080"
                        } ]
                    },
                    tooltip: {
                        enabled: !0,
                        valueSuffix: o.suffix
                    },
                    legend: {
                        layout: "vertical",
                        align: "right",
                        verticalAlign: "middle",
                        borderWidth: 1
                    },
                    series: o.series
                }));
                var r, a, s, l, o;
            }();
        });
    }
    function c(e) {
        var t = [], n = [], i = [], r = e.data, a = e.meta;
        if ("1" !== a.dataFormat && 1 !== a.dataFormat) {
            for (var s = 0, l = r.length; s < l; s++) for (var o = 0, d = r[s].length; o < d; o++) i[o] || (i[o] = []), 
            i[o][s] = r[s][o];
            r = i;
        }
        if (i = {}, a.chartType != typeConfig.length - 1) {
            for (n = r[0].slice(1), s = 1; c = r[s]; s++) t.push({
                name: c[0],
                data: c.slice(1)
            });
            i.series = t, i.categories = n, i.title = a.title, i.subTitle = a.subTitle, i.xTitle = a.xTitle, 
            i.yTitle = a.yTitle, i.suffix = a.suffix;
        } else {
            var c = [];
            for (s = 1, l = r[0].length; s < l; s++) c.push([ r[0][s], 0 | r[1][s] ]);
            t[0] = {
                type: "pie",
                name: a.tip,
                data: c
            }, i.series = t, i.title = a.title, i.suffix = a.suffix;
        }
        return i;
    }
    t && (d = n ? function(e) {
        for (var t, n = [], i = e.getElementsByTagName("table"), r = 0; t = i[r]; r++) null !== t.getAttribute("data-chart") && n.push(a(t));
        return n.length ? n : null;
    }(n) : null) && (window.jQuery ? i() : e.loadFile(document, {
        src: "https://code.jquery.com/jquery-1.10.2.min.js",
        tag: "script",
        type: "text/javascript",
        defer: "defer"
    }, function() {
        i();
    }));
}), UE.parse.register("background", function(e) {
    for (var t, n, i = this.root.getElementsByTagName("p"), r = 0; n = i[r++]; ) (t = n.getAttribute("data-background")) && n.parentNode.removeChild(n);
    t && e.cssRule("ueditor_background", this.selector + "{" + t + "}", document);
}), UE.parse.register("list", function(r) {
    var a = [], s = {
        cn: "cn-1-",
        cn1: "cn-2-",
        cn2: "cn-3-",
        num: "num-1-",
        num1: "num-2-",
        num2: "num-3-",
        dash: "dash",
        dot: "dot"
    };
    r.extend(this, {
        liiconpath: "http://bs.baidu.com/listicon/",
        listDefaultPaddingLeft: "20"
    });
    var e = this.root, t = e.getElementsByTagName("ol"), n = e.getElementsByTagName("ul"), l = this.selector;
    function i(e) {
        var i = this;
        r.each(e, function(e) {
            if (e.className && /custom_/i.test(e.className)) {
                var t = e.className.match(/custom_(\w+)/)[1];
                if ("dash" === t || "dot" === t) r.pushItem(a, l + " li.list-" + s[t] + "{background-image:url(" + i.liiconpath + s[t] + ".gif)}"), 
                r.pushItem(a, l + " ul.custom_" + t + "{list-style:none;} " + l + " ul.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}"); else {
                    var n = 1;
                    r.each(e.childNodes, function(e) {
                        "LI" === e.tagName && (r.pushItem(a, l + " li.list-" + s[t] + n + "{background-image:url(" + i.liiconpath + "list-" + s[t] + n + ".gif)}"), 
                        n++);
                    }), r.pushItem(a, l + " ol.custom_" + t + "{list-style:none;}" + l + " ol.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}");
                }
                switch (t) {
                  case "cn":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-1{padding-left:25px}"), r.pushItem(a, l + " li.list-" + t + "-paddingleft-2{padding-left:40px}"), 
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-3{padding-left:55px}");
                    break;

                  case "cn1":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-1{padding-left:30px}"), r.pushItem(a, l + " li.list-" + t + "-paddingleft-2{padding-left:40px}"), 
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-3{padding-left:55px}");
                    break;

                  case "cn2":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-1{padding-left:40px}"), r.pushItem(a, l + " li.list-" + t + "-paddingleft-2{padding-left:55px}"), 
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-3{padding-left:68px}");
                    break;

                  case "num":
                  case "num1":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-1{padding-left:25px}");
                    break;

                  case "num2":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft-1{padding-left:35px}"), r.pushItem(a, l + " li.list-" + t + "-paddingleft-2{padding-left:40px}");
                    break;

                  case "dash":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft{padding-left:35px}");
                    break;

                  case "dot":
                    r.pushItem(a, l + " li.list-" + t + "-paddingleft{padding-left:20px}");
                }
            }
        });
    }
    t.length && i.call(this, t), n.length && i.call(this, n), (t.length || n.length) && (a.push(l + " .list-paddingleft-1{padding-left:0}"), 
    a.push(l + " .list-paddingleft-2{padding-left:" + this.listDefaultPaddingLeft + "px}"), 
    a.push(l + " .list-paddingleft-3{padding-left:" + 2 * this.listDefaultPaddingLeft + "px}"), 
    r.cssRule("list", l + " ol," + l + " ul{margin:0;padding:0;}\n" + l + " li{clear:both;}\n" + a.join("\n"), document));
}), UE.parse.register("vedio", function(e) {
    var t = this.root.getElementsByTagName("video"), n = this.root.getElementsByTagName("audio");
    document.createElement("video"), document.createElement("audio"), (t.length || n.length) && (window.videojs ? videojs.autoSetup() : (e.loadFile(document, {
        id: "video_css",
        tag: "link",
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdn.jsdelivr.net/npm/video.js@4.3.0/video-js.min.css"
    }), e.loadFile(document, {
        id: "video_js",
        src: "https://cdn.jsdelivr.net/npm/video.js@4.3.0/video.js",
        tag: "script",
        type: "text/javascript"
    }, function() {
        videojs.options.flash.swf = "https://cdn.jsdelivr.net/npm/video.js@4.3.0/video-js.swf", 
        videojs.autoSetup();
    })));
});