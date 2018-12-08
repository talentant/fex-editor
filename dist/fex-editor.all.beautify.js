/*!
 * fex-editor
 * version: 2.1.1
 * build: 2018-12-08
 */

"use strict";

function _toConsumableArray(e) {
    return _arrayWithoutHoles(e) || _iterableToArray(e) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(e) {
    if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
}

function _arrayWithoutHoles(e) {
    if (Array.isArray(e)) {
        for (var t = 0, i = new Array(e.length); t < e.length; t++) i[t] = e[t];
        return i;
    }
}

function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    })(e);
}

!function() {
    UEDITOR_CONFIG = window.UEDITOR_CONFIG || {};
    var baidu = window.baidu || {};
    window.baidu = baidu, window.UE = baidu.editor = {
        plugins: {},
        commands: {},
        instants: {},
        I18N: {},
        _customizeUI: {},
        version: "1.5.0"
    };
    var dom = UE.dom = {}, browser = UE.browser = function() {
        var e = navigator.userAgent.toLowerCase(), t = window.opera, i = {
            ie: /(msie\s|trident.*rv:)([\w.]+)/i.test(e),
            opera: !!t && t.version,
            webkit: -1 < e.indexOf(" applewebkit/"),
            mac: -1 < e.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode
        };
        i.gecko = "Gecko" == navigator.product && !i.webkit && !i.opera && !i.ie;
        var n = 0;
        if (i.ie) {
            var o = e.match(/(?:msie\s([\w.]+))/), r = e.match(/(?:trident.*rv:([\w.]+))/);
            n = o && r && o[1] && r[1] ? Math.max(1 * o[1], 1 * r[1]) : o && o[1] ? 1 * o[1] : r && r[1] ? 1 * r[1] : 0, 
            i.ie11Compat = 11 == document.documentMode, i.ie9Compat = 9 == document.documentMode, 
            i.ie8 = !!document.documentMode, i.ie8Compat = 8 == document.documentMode, i.ie7Compat = 7 == n && !document.documentMode || 7 == document.documentMode, 
            i.ie6Compat = n < 7 || i.quirks, i.ie9above = 8 < n, i.ie9below = n < 9, i.ie11above = 10 < n, 
            i.ie11below = n < 11;
        }
        if (i.gecko) {
            var a = e.match(/rv:([\d\.]+)/);
            a && (n = 1e4 * (a = a[1].split("."))[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0));
        }
        return /chrome\/(\d+\.\d)/i.test(e) && (i.chrome = +RegExp.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (i.safari = +(RegExp.$1 || RegExp.$2)), 
        i.opera && (n = parseFloat(t.version())), i.webkit && (n = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), 
        i.version = n, i.isCompatible = !i.mobile && (i.ie && 6 <= n || i.gecko && 10801 <= n || i.opera && 9.5 <= n || i.air && 1 <= n || i.webkit && 522 <= n || !1), 
        i;
    }(), ie = browser.ie, webkit = browser.webkit, gecko = browser.gecko, opera = browser.opera, utils = UE.utils = {
        each: function(e, t, i) {
            if (null != e) if (e.length === +e.length) {
                for (var n = 0, o = e.length; n < o; n++) if (!1 === t.call(i, e[n], n, e)) return !1;
            } else for (var r in e) if (e.hasOwnProperty(r) && !1 === t.call(i, e[r], r, e)) return !1;
        },
        makeInstance: function(e) {
            var t = new Function();
            return t.prototype = e, e = new t(), t.prototype = null, e;
        },
        extend: function(e, t, i) {
            if (t) for (var n in t) i && e.hasOwnProperty(n) || (e[n] = t[n]);
            return e;
        },
        extend2: function(e) {
            for (var t = arguments, i = 1; i < t.length; i++) {
                var n = t[i];
                for (var o in n) e.hasOwnProperty(o) || (e[o] = n[o]);
            }
            return e;
        },
        inherits: function(e, t) {
            var i = e.prototype, n = utils.makeInstance(t.prototype);
            return utils.extend(n, i, !0), (e.prototype = n).constructor = e;
        },
        bind: function(n, o) {
            return function() {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return n.apply(o, t);
            };
        },
        defer: function(e, t, i) {
            var n;
            return function() {
                i && clearTimeout(n), n = setTimeout(e, t);
            };
        },
        indexOf: function(e, i, n) {
            var o = -1;
            return n = this.isNumber(n) ? n : 0, this.each(e, function(e, t) {
                if (n <= t && e === i) return o = t, !1;
            }), o;
        },
        removeItem: function(e, t) {
            for (var i = 0, n = e.length; i < n; i++) e[i] === t && (e.splice(i, 1), i--);
        },
        trim: function(e) {
            return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, "");
        },
        listToMap: function(e) {
            if (!e) return {};
            e = utils.isArray(e) ? e : e.split(",");
            for (var t, i = 0, n = {}; t = e[i++]; ) n[t.toUpperCase()] = n[t] = 1;
            return n;
        },
        unhtml: function(e, t) {
            return e ? e.replace(t || /[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g, function(e, t) {
                return t ? e : {
                    "<": "&lt;",
                    "&": "&amp;",
                    '"': "&quot;",
                    "“": "&ldquo;",
                    "”": "&rdquo;",
                    ">": "&gt;",
                    "'": "&#39;"
                }[e];
            }) : "";
        },
        html: function(e) {
            return e ? e.replace(/&((g|l|quo|ldquo|rdquo)t|amp|#39|nbsp);/g, function(e) {
                return {
                    "&lt;": "<",
                    "&amp;": "&",
                    "&quot;": '"',
                    "&ldquo;": "“",
                    "&rdquo;": "”",
                    "&gt;": ">",
                    "&#39;": "'",
                    "&nbsp;": " "
                }[e];
            }) : "";
        },
        cssStyleToDomStyle: (Ea = document.createElement("div").style, Fa = {
            float: null != Ea.cssFloat ? "cssFloat" : null != Ea.styleFloat ? "styleFloat" : "float"
        }, function(e) {
            return Fa[e] || (Fa[e] = e.toLowerCase().replace(/-./g, function(e) {
                return e.charAt(1).toUpperCase();
            }));
        }),
        loadFile: function() {
            var s = [];
            function l(e, t) {
                try {
                    for (var i, n = 0; i = s[n++]; ) if (i.doc === e && i.url == (t.src || t.href)) return i;
                } catch (e) {
                    return null;
                }
            }
            return function(t, i, e) {
                var n = l(t, i);
                if (n) n.ready ? e && e() : n.funs.push(e); else if (s.push({
                    doc: t,
                    url: i.src || i.href,
                    funs: [ e ]
                }), t.body) {
                    if (!i.id || !t.getElementById(i.id)) {
                        var o = t.createElement(i.tag);
                        for (var r in delete i.tag, i) o.setAttribute(r, i[r]);
                        o.onload = o.onreadystatechange = function() {
                            if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                                if (0 < (n = l(t, i)).funs.length) {
                                    n.ready = 1;
                                    for (var e; e = n.funs.pop(); ) e();
                                }
                                o.onload = o.onreadystatechange = null;
                            }
                        }, o.onerror = function() {
                            throw Error("The load " + (i.href || i.src) + " fails,check the url settings of file ueditor.config.js ");
                        }, t.getElementsByTagName("head")[0].appendChild(o);
                    }
                } else {
                    var a = [];
                    for (var r in i) "tag" != r && a.push(r + '="' + i[r] + '"');
                    t.write("<" + i.tag + " " + a.join(" ") + " ></" + i.tag + ">");
                }
            };
        }(),
        isEmptyObject: function(e) {
            if (null == e) return !0;
            if (this.isArray(e) || this.isString(e)) return 0 === e.length;
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0;
        },
        fixColor: function(e, t) {
            if (/color/i.test(e) && /rgba?/.test(t)) {
                var i = t.split(",");
                if (3 < i.length) return "";
                t = "#";
                for (var n, o = 0; n = i[o++]; ) t += 1 == (n = parseInt(n.replace(/[^\d]/gi, ""), 10).toString(16)).length ? "0" + n : n;
                t = t.toUpperCase();
            }
            return t;
        },
        optCss: function(e) {
            var o, r;
            function t(e, t) {
                if (!e) return "";
                var i = e.top, n = e.bottom, o = e.left, r = e.right, a = "";
                if (i && o && n && r) a += ";" + t + ":" + (i == n && n == o && o == r ? i : i == n && o == r ? i + " " + o : o == r ? i + " " + o + " " + n : i + " " + r + " " + n + " " + o) + ";"; else for (var s in e) a += ";" + t + "-" + s + ":" + e[s] + ";";
                return a;
            }
            return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function(e, t, i, n) {
                if (1 == n.split(" ").length) switch (t) {
                  case "padding":
                    return !o && (o = {}), o[i] = n, "";

                  case "margin":
                    return !r && (r = {}), r[i] = n, "";

                  case "border":
                    return "initial" == n ? "" : e;
                }
                return e;
            }), (e += t(o, "padding") + t(r, "margin")).replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, "").replace(/;([ \n\r\t]+)|\1;/g, ";").replace(/(&((l|g)t|quot|#39))?;{2,}/g, function(e, t) {
                return t ? t + ";;" : ";";
            });
        },
        clone: function(e, t) {
            var i;
            for (var n in t = t || {}, e) e.hasOwnProperty(n) && ("object" == _typeof(i = e[n]) ? (t[n] = utils.isArray(i) ? [] : {}, 
            utils.clone(e[n], t[n])) : t[n] = i);
            return t;
        },
        transUnitToPx: function(n) {
            if (!/(pt|cm)/.test(n)) return n;
            var o;
            switch (n.replace(/([\d.]+)(\w+)/, function(e, t, i) {
                n = t, o = i;
            }), o) {
              case "cm":
                n = 25 * parseFloat(n);
                break;

              case "pt":
                n = Math.round(96 * parseFloat(n) / 72);
            }
            return n + (n ? "px" : "");
        },
        domReady: function() {
            var i = [];
            function r(e) {
                e.isReady = !0;
                for (var t; t = i.pop(); t()) ;
            }
            return function(e, t) {
                var o = (t = t || window).document;
                e && i.push(e), "complete" === o.readyState ? r(o) : (o.isReady && r(o), browser.ie && 11 != browser.version ? (!function() {
                    if (!o.isReady) {
                        try {
                            o.documentElement.doScroll("left");
                        } catch (e) {
                            for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                            return setTimeout(i.callee, 0);
                        }
                        r(o);
                    }
                }(), t.attachEvent("onload", function() {
                    r(o);
                })) : (o.addEventListener("DOMContentLoaded", function() {
                    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    o.removeEventListener("DOMContentLoaded", t.callee, !1), r(o);
                }, !1), t.addEventListener("load", function() {
                    r(o);
                }, !1)));
            };
        }(),
        cssRule: browser.ie && 11 != browser.version ? function(e, t, i) {
            var n, o;
            return void 0 === t || t && t.nodeType && 9 == t.nodeType ? void 0 !== (o = (n = (i = t && t.nodeType && 9 == t.nodeType ? t : i || document).indexList || (i.indexList = {}))[e]) ? i.styleSheets[o].cssText : void 0 : (o = (n = (i = i || document).indexList || (i.indexList = {}))[e], 
            "" === t ? void 0 !== o && (i.styleSheets[o].cssText = "", delete n[e], !0) : (void 0 !== o ? sheetStyle = i.styleSheets[o] : (sheetStyle = i.createStyleSheet("", o = i.styleSheets.length), 
            n[e] = o), void (sheetStyle.cssText = t)));
        } : function(e, t, i) {
            var n;
            return void 0 === t || t && t.nodeType && 9 == t.nodeType ? (n = (i = t && t.nodeType && 9 == t.nodeType ? t : i || document).getElementById(e)) ? n.innerHTML : void 0 : (n = (i = i || document).getElementById(e), 
            "" === t ? !!n && (n.parentNode.removeChild(n), !0) : void (n ? n.innerHTML = t : ((n = i.createElement("style")).id = e, 
            n.innerHTML = t, i.getElementsByTagName("head")[0].appendChild(n))));
        },
        sort: function(e, t) {
            t = t || function(e, t) {
                return e.localeCompare(t);
            };
            for (var i = 0, n = e.length; i < n; i++) for (var o = i, r = e.length; o < r; o++) if (0 < t(e[i], e[o])) {
                var a = e[i];
                e[i] = e[o], e[o] = a;
            }
            return e;
        },
        serializeParam: function(e) {
            var t = [];
            for (var i in e) if ("method" != i && "timeout" != i && "async" != i) if ("function" != _typeof(e[i]).toLowerCase() && "object" != _typeof(e[i]).toLowerCase()) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i])); else if (utils.isArray(e[i])) for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(e[i][n]));
            return t.join("&");
        },
        formatUrl: function(e) {
            var t = e.replace(/&&/g, "&");
            return t = (t = (t = (t = t.replace(/\?&/g, "?")).replace(/&$/g, "")).replace(/&#/g, "#")).replace(/&+/g, "&");
        },
        isCrossDomainUrl: function(e) {
            var t = document.createElement("a");
            return t.href = e, browser.ie && (t.href = t.href), !(t.protocol == location.protocol && t.hostname == location.hostname && (t.port == location.port || "80" == t.port && "" == location.port || "" == t.port && "80" == location.port));
        },
        clearEmptyAttrs: function(e) {
            for (var t in e) "" === e[t] && delete e[t];
            return e;
        },
        str2json: function(e) {
            return utils.isString(e) ? window.JSON ? JSON.parse(e) : new Function("return " + utils.trim(e || ""))() : null;
        },
        json2str: function() {
            if (window.JSON) return JSON.stringify;
            var l = function(e) {
                return e < 10 ? "0" + e : e;
            }, d = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
            return function(e) {
                switch (_typeof(e)) {
                  case "undefined":
                    return "undefined";

                  case "number":
                    return isFinite(e) ? String(e) : "null";

                  case "string":
                    return /["\\\x00-\x1f]/.test(s = e) && (s = s.replace(/["\\\x00-\x1f]/g, function(e) {
                        var t = d[e];
                        return t || (t = e.charCodeAt(), "\\u00" + Math.floor(t / 16).toString(16) + (t % 16).toString(16));
                    })), '"' + s + '"';

                  case "boolean":
                    return String(e);

                  default:
                    if (null === e) return "null";
                    if (utils.isArray(e)) return function(e) {
                        var t, i, n, o = [ "[" ], r = e.length;
                        for (i = 0; i < r; i++) switch (_typeof(n = e[i])) {
                          case "undefined":
                          case "function":
                          case "unknown":
                            break;

                          default:
                            t && o.push(","), o.push(utils.json2str(n)), t = 1;
                        }
                        return o.push("]"), o.join("");
                    }(e);
                    if (utils.isDate(e)) return '"' + (a = e).getFullYear() + "-" + l(a.getMonth() + 1) + "-" + l(a.getDate()) + "T" + l(a.getHours()) + ":" + l(a.getMinutes()) + ":" + l(a.getSeconds()) + '"';
                    var t, i, n = [ "{" ], o = utils.json2str;
                    for (var r in e) if (Object.prototype.hasOwnProperty.call(e, r)) switch (_typeof(i = e[r])) {
                      case "undefined":
                      case "unknown":
                      case "function":
                        break;

                      default:
                        t && n.push(","), t = 1, n.push(o(r) + ":" + o(i));
                    }
                    return n.push("}"), n.join("");
                }
                var a, s;
            };
        }()
    }, Ea, Fa;
    utils.each([ "String", "Function", "Array", "Number", "RegExp", "Object", "Date" ], function(t) {
        UE.utils["is" + t] = function(e) {
            return Object.prototype.toString.apply(e) == "[object " + t + "]";
        };
    });
    var EventBase = UE.EventBase = function() {};
    function getListener(e, t, i) {
        var n;
        return t = t.toLowerCase(), (n = e.__allListeners || i && (e.__allListeners = {})) && (n[t] || i && (n[t] = []));
    }
    EventBase.prototype = {
        addListener: function(e, t) {
            e = utils.trim(e).split(/\s+/);
            for (var i, n = 0; i = e[n++]; ) getListener(this, i, !0).push(t);
        },
        on: function(e, t) {
            return this.addListener(e, t);
        },
        off: function(e, t) {
            return this.removeListener(e, t);
        },
        trigger: function() {
            return this.fireEvent.apply(this, arguments);
        },
        removeListener: function(e, t) {
            e = utils.trim(e).split(/\s+/);
            for (var i, n = 0; i = e[n++]; ) utils.removeItem(getListener(this, i) || [], t);
        },
        fireEvent: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            var n = t[0];
            n = utils.trim(n).split(" ");
            for (var o, r = 0; o = n[r++]; ) {
                var a, s, l, d = getListener(this, o);
                if (d) for (l = d.length; l--; ) if (d[l]) {
                    if (!0 === (s = d[l].apply(this, t))) return s;
                    void 0 !== s && (a = s);
                }
                (s = this["on" + o.toLowerCase()]) && (a = s.apply(this, t));
            }
            return a;
        }
    };
    var dtd = dom.dtd = function() {
        function e(e) {
            for (var t in e) e[t.toUpperCase()] = e[t];
            return e;
        }
        var t = utils.extend2, i = e({
            isindex: 1,
            fieldset: 1
        }), n = e({
            input: 1,
            button: 1,
            select: 1,
            textarea: 1,
            label: 1
        }), o = t(e({
            a: 1
        }), n), r = t({
            iframe: 1
        }, o), a = e({
            hr: 1,
            ul: 1,
            menu: 1,
            div: 1,
            blockquote: 1,
            noscript: 1,
            table: 1,
            center: 1,
            address: 1,
            dir: 1,
            pre: 1,
            h5: 1,
            dl: 1,
            h4: 1,
            noframes: 1,
            h6: 1,
            ol: 1,
            h1: 1,
            h3: 1,
            h2: 1
        }), s = e({
            ins: 1,
            del: 1,
            script: 1,
            style: 1
        }), l = t(e({
            mark: 1,
            b: 1,
            acronym: 1,
            bdo: 1,
            var: 1,
            "#": 1,
            abbr: 1,
            code: 1,
            br: 1,
            i: 1,
            cite: 1,
            kbd: 1,
            u: 1,
            strike: 1,
            s: 1,
            tt: 1,
            strong: 1,
            q: 1,
            samp: 1,
            em: 1,
            dfn: 1,
            span: 1
        }), s), d = t(e({
            sub: 1,
            img: 1,
            embed: 1,
            object: 1,
            sup: 1,
            basefont: 1,
            map: 1,
            applet: 1,
            font: 1,
            big: 1,
            small: 1
        }), l), c = t(e({
            p: 1
        }), d), u = t(e({
            iframe: 1
        }), d, n), m = e({
            img: 1,
            embed: 1,
            noscript: 1,
            br: 1,
            kbd: 1,
            center: 1,
            button: 1,
            basefont: 1,
            h5: 1,
            h4: 1,
            samp: 1,
            h6: 1,
            ol: 1,
            h1: 1,
            h3: 1,
            h2: 1,
            form: 1,
            font: 1,
            "#": 1,
            select: 1,
            menu: 1,
            ins: 1,
            abbr: 1,
            label: 1,
            code: 1,
            table: 1,
            script: 1,
            cite: 1,
            input: 1,
            iframe: 1,
            strong: 1,
            textarea: 1,
            noframes: 1,
            big: 1,
            small: 1,
            span: 1,
            hr: 1,
            sub: 1,
            bdo: 1,
            var: 1,
            div: 1,
            object: 1,
            sup: 1,
            strike: 1,
            dir: 1,
            map: 1,
            dl: 1,
            applet: 1,
            del: 1,
            isindex: 1,
            fieldset: 1,
            ul: 1,
            b: 1,
            acronym: 1,
            a: 1,
            blockquote: 1,
            i: 1,
            u: 1,
            s: 1,
            tt: 1,
            address: 1,
            q: 1,
            pre: 1,
            p: 1,
            em: 1,
            dfn: 1
        }), f = t(e({
            a: 0
        }), u), h = e({
            tr: 1
        }), p = e({
            "#": 1
        }), g = t(e({
            param: 1
        }), m), v = t(e({
            form: 1
        }), i, r, a, c), b = e({
            li: 1,
            ol: 1,
            ul: 1
        }), y = e({
            style: 1,
            script: 1
        }), C = e({
            base: 1,
            link: 1,
            meta: 1,
            title: 1
        }), N = t(C, y), x = e({
            head: 1,
            body: 1
        }), w = e({
            html: 1
        }), U = e({
            address: 1,
            blockquote: 1,
            center: 1,
            dir: 1,
            div: 1,
            dl: 1,
            fieldset: 1,
            form: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            hr: 1,
            isindex: 1,
            menu: 1,
            noframes: 1,
            ol: 1,
            p: 1,
            pre: 1,
            table: 1,
            ul: 1
        }), E = e({
            area: 1,
            base: 1,
            basefont: 1,
            br: 1,
            col: 1,
            command: 1,
            dialog: 1,
            embed: 1,
            hr: 1,
            img: 1,
            input: 1,
            isindex: 1,
            keygen: 1,
            link: 1,
            meta: 1,
            param: 1,
            source: 1,
            track: 1,
            wbr: 1
        });
        return e({
            $nonBodyContent: t(w, x, C),
            $block: U,
            $inline: f,
            $inlineWithA: t(e({
                a: 1
            }), f),
            $body: t(e({
                script: 1,
                style: 1
            }), U),
            $cdata: e({
                script: 1,
                style: 1
            }),
            $empty: E,
            $nonChild: e({
                iframe: 1,
                textarea: 1
            }),
            $listItem: e({
                dd: 1,
                dt: 1,
                li: 1
            }),
            $list: e({
                ul: 1,
                ol: 1,
                dl: 1
            }),
            $isNotEmpty: e({
                table: 1,
                ul: 1,
                ol: 1,
                dl: 1,
                iframe: 1,
                area: 1,
                base: 1,
                col: 1,
                hr: 1,
                img: 1,
                embed: 1,
                input: 1,
                textarea: 1,
                link: 1,
                meta: 1,
                param: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            }),
            $removeEmpty: e({
                a: 1,
                abbr: 1,
                acronym: 1,
                address: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                var: 1
            }),
            $removeEmptyBlock: e({
                p: 1,
                div: 1
            }),
            $tableContent: e({
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1,
                table: 1
            }),
            $notTransContent: e({
                pre: 1,
                script: 1,
                style: 1,
                textarea: 1
            }),
            html: x,
            head: N,
            style: p,
            script: p,
            body: v,
            base: {},
            link: {},
            meta: {},
            title: p,
            col: {},
            tr: e({
                td: 1,
                th: 1
            }),
            img: {},
            embed: {},
            colgroup: e({
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                tfoot: 1
            }),
            noscript: v,
            td: v,
            br: {},
            th: v,
            center: v,
            kbd: f,
            button: t(c, a),
            basefont: {},
            h5: f,
            h4: f,
            samp: f,
            h6: f,
            ol: b,
            h1: f,
            h3: f,
            option: p,
            h2: f,
            form: t(i, r, a, c),
            select: e({
                optgroup: 1,
                option: 1
            }),
            font: f,
            ins: f,
            menu: b,
            abbr: f,
            label: f,
            table: e({
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                colgroup: 1,
                caption: 1,
                tfoot: 1
            }),
            code: f,
            tfoot: h,
            cite: f,
            li: v,
            input: {},
            iframe: v,
            strong: f,
            textarea: p,
            noframes: v,
            big: f,
            small: f,
            span: e({
                "#": 1,
                br: 1,
                b: 1,
                strong: 1,
                u: 1,
                i: 1,
                em: 1,
                sub: 1,
                sup: 1,
                strike: 1,
                span: 1
            }),
            hr: f,
            dt: f,
            sub: f,
            optgroup: e({
                option: 1
            }),
            param: {},
            bdo: f,
            var: f,
            div: v,
            object: g,
            sup: f,
            dd: v,
            strike: f,
            area: {},
            dir: b,
            map: t(e({
                area: 1,
                form: 1,
                p: 1
            }), i, s, a),
            applet: g,
            dl: e({
                dt: 1,
                dd: 1
            }),
            del: f,
            isindex: {},
            fieldset: t(e({
                legend: 1
            }), m),
            thead: h,
            ul: b,
            acronym: f,
            b: f,
            a: t(e({
                a: 1
            }), u),
            blockquote: t(e({
                td: 1,
                tr: 1,
                tbody: 1,
                li: 1
            }), v),
            caption: f,
            i: f,
            u: f,
            tbody: h,
            s: f,
            address: t(r, c),
            tt: f,
            legend: f,
            q: f,
            pre: t(l, o),
            p: t(e({
                a: 1
            }), f),
            em: f,
            dfn: f,
            mark: f
        });
    }();
    function getDomNode(e, t, i, n, o, r) {
        var a, s = n && e[t];
        for (!s && (s = e[i]); !s && (a = (a || e).parentNode); ) {
            if ("BODY" == a.tagName || r && !r(a)) return null;
            s = a[i];
        }
        return s && o && !o(s) ? getDomNode(s, t, i, !1, o) : s;
    }
    var attrFix = ie && browser.version < 9 ? {
        tabindex: "tabIndex",
        readonly: "readOnly",
        for: "htmlFor",
        class: "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder"
    } : {
        tabindex: "tabIndex",
        readonly: "readOnly"
    }, styleBlock = utils.listToMap([ "-webkit-box", "-moz-box", "block", "list-item", "table", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-column-group", "table-column", "table-cell", "table-caption" ]), domUtils = dom.domUtils = {
        NODE_ELEMENT: 1,
        NODE_DOCUMENT: 9,
        NODE_TEXT: 3,
        NODE_COMMENT: 8,
        NODE_DOCUMENT_FRAGMENT: 11,
        POSITION_IDENTICAL: 0,
        POSITION_DISCONNECTED: 1,
        POSITION_FOLLOWING: 2,
        POSITION_PRECEDING: 4,
        POSITION_IS_CONTAINED: 8,
        POSITION_CONTAINS: 16,
        fillChar: ie && "6" == browser.version ? "\ufeff" : "​",
        keys: {
            8: 1,
            46: 1,
            16: 1,
            17: 1,
            18: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            13: 1
        },
        getPosition: function(e, t) {
            if (e === t) return 0;
            var i, n = [ e ], o = [ t ];
            for (i = e; i = i.parentNode; ) {
                if (i === t) return 10;
                n.push(i);
            }
            for (i = t; i = i.parentNode; ) {
                if (i === e) return 20;
                o.push(i);
            }
            if (n.reverse(), o.reverse(), n[0] !== o[0]) return 1;
            for (var r = -1; n[++r] === o[r]; ) ;
            for (e = n[r], t = o[r]; e = e.nextSibling; ) if (e === t) return 4;
            return 2;
        },
        getNodeIndex: function(e, t) {
            for (var i = e, n = 0; i = i.previousSibling; ) t && 3 == i.nodeType ? i.nodeType != i.nextSibling.nodeType && n++ : n++;
            return n;
        },
        inDoc: function(e, t) {
            return 10 == domUtils.getPosition(e, t);
        },
        findParent: function(e, t, i) {
            if (e && !domUtils.isBody(e)) for (e = i ? e : e.parentNode; e; ) {
                if (!t || t(e) || domUtils.isBody(e)) return t && !t(e) && domUtils.isBody(e) ? null : e;
                e = e.parentNode;
            }
            return null;
        },
        findParentByTagName: function(e, t, i, n) {
            return t = utils.listToMap(utils.isArray(t) ? t : [ t ]), domUtils.findParent(e, function(e) {
                return t[e.tagName] && !(n && n(e));
            }, i);
        },
        findParents: function(e, t, i, n) {
            for (var o = t && (i && i(e) || !i) ? [ e ] : []; e = domUtils.findParent(e, i); ) o.push(e);
            return n ? o : o.reverse();
        },
        insertAfter: function(e, t) {
            return e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t);
        },
        remove: function(e, t) {
            var i, n = e.parentNode;
            if (n) {
                if (t && e.hasChildNodes()) for (;i = e.firstChild; ) n.insertBefore(i, e);
                n.removeChild(e);
            }
            return e;
        },
        getNextDomNode: function(e, t, i, n) {
            return getDomNode(e, "firstChild", "nextSibling", t, i, n);
        },
        getPreDomNode: function(e, t, i, n) {
            return getDomNode(e, "lastChild", "previousSibling", t, i, n);
        },
        isBookmarkNode: function(e) {
            return 1 == e.nodeType && e.id && /^_baidu_bookmark_/i.test(e.id);
        },
        getWindow: function(e) {
            var t = e.ownerDocument || e;
            return t.defaultView || t.parentWindow;
        },
        getCommonAncestor: function(e, t) {
            if (e === t) return e;
            for (var i = [ e ], n = [ t ], o = e, r = -1; o = o.parentNode; ) {
                if (o === t) return o;
                i.push(o);
            }
            for (o = t; o = o.parentNode; ) {
                if (o === e) return o;
                n.push(o);
            }
            for (i.reverse(), n.reverse(); i[++r] === n[r]; ) ;
            return 0 == r ? null : i[r - 1];
        },
        clearEmptySibling: function(e, t, i) {
            function n(e, t) {
                for (var i; e && !domUtils.isBookmarkNode(e) && (domUtils.isEmptyInlineElement(e) || !new RegExp("[^\t\n\r" + domUtils.fillChar + "]").test(e.nodeValue)); ) i = e[t], 
                domUtils.remove(e), e = i;
            }
            !t && n(e.nextSibling, "nextSibling"), !i && n(e.previousSibling, "previousSibling");
        },
        split: function(e, t) {
            var i = e.ownerDocument;
            if (browser.ie && t == e.nodeValue.length) {
                var n = i.createTextNode("");
                return domUtils.insertAfter(e, n);
            }
            var o = e.splitText(t);
            if (browser.ie8) {
                var r = i.createTextNode("");
                domUtils.insertAfter(o, r), domUtils.remove(r);
            }
            return o;
        },
        isWhitespace: function(e) {
            return !new RegExp("[^ \t\n\r" + domUtils.fillChar + "]").test(e.nodeValue);
        },
        getXY: function(e) {
            for (var t = 0, i = 0; e.offsetParent; ) i += e.offsetTop, t += e.offsetLeft, e = e.offsetParent;
            return {
                x: t,
                y: i
            };
        },
        on: function(e, t, i) {
            var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/), o = n.length;
            if (o) for (;o--; ) if (t = n[o], e.addEventListener) e.addEventListener(t, i, !1); else {
                i._d || (i._d = {
                    els: []
                });
                var r = t + i.toString(), a = utils.indexOf(i._d.els, e);
                i._d[r] && -1 != a || (-1 == a && i._d.els.push(e), i._d[r] || (i._d[r] = function(e) {
                    return i.call(e.srcElement, e || window.event);
                }), e.attachEvent("on" + t, i._d[r]));
            }
            e = null;
        },
        un: function(e, t, i) {
            var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/), o = n.length;
            if (o) for (;o--; ) if (t = n[o], e.removeEventListener) e.removeEventListener(t, i, !1); else {
                var r = t + i.toString();
                try {
                    e.detachEvent("on" + t, i._d ? i._d[r] : i);
                } catch (e) {}
                if (i._d && i._d[r]) {
                    var a = utils.indexOf(i._d.els, e);
                    -1 != a && i._d.els.splice(a, 1), 0 == i._d.els.length && delete i._d[r];
                }
            }
        },
        isSameElement: function(e, t) {
            if (e.tagName != t.tagName) return !1;
            var i, n, o = e.attributes, r = t.attributes;
            if (!ie && o.length != r.length) return !1;
            for (var a = 0, s = 0, l = 0; i = o[l++]; ) {
                if ("style" == i.nodeName) {
                    if (i.specified && a++, domUtils.isSameStyle(e, t)) continue;
                    return !1;
                }
                if (ie) {
                    if (!i.specified) continue;
                    a++, n = r.getNamedItem(i.nodeName);
                } else n = t.attributes[i.nodeName];
                if (!n.specified || i.nodeValue != n.nodeValue) return !1;
            }
            if (ie) {
                for (l = 0; n = r[l++]; ) n.specified && s++;
                if (a != s) return !1;
            }
            return !0;
        },
        isSameStyle: function(e, t) {
            var i = e.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":"), n = t.style.cssText.replace(/( ?; ?)/g, ";").replace(/( ?: ?)/g, ":");
            if (browser.opera) {
                if (i = e.style, n = t.style, i.length != n.length) return !1;
                for (var o in i) if (!/^(\d+|csstext)$/i.test(o) && i[o] != n[o]) return !1;
                return !0;
            }
            if (!i || !n) return i == n;
            if (i = i.split(";"), n = n.split(";"), i.length != n.length) return !1;
            for (var r, a = 0; r = i[a++]; ) if (-1 == utils.indexOf(n, r)) return !1;
            return !0;
        },
        isBlockElm: function(e) {
            return 1 == e.nodeType && (dtd.$block[e.tagName] || styleBlock[domUtils.getComputedStyle(e, "display")]) && !dtd.$nonChild[e.tagName];
        },
        isBody: function(e) {
            return e && 1 == e.nodeType && "body" == e.tagName.toLowerCase();
        },
        breakParent: function(e, t) {
            var i, n, o, r = e, a = e;
            do {
                for (r = r.parentNode, o = n ? ((i = r.cloneNode(!1)).appendChild(n), n = i, (i = r.cloneNode(!1)).appendChild(o), 
                i) : (n = r.cloneNode(!1)).cloneNode(!1); i = a.previousSibling; ) n.insertBefore(i, n.firstChild);
                for (;i = a.nextSibling; ) o.appendChild(i);
                a = r;
            } while (t !== r);
            return (i = t.parentNode).insertBefore(n, t), i.insertBefore(o, t), i.insertBefore(e, o), 
            domUtils.remove(t), e;
        },
        isEmptyInlineElement: function(e) {
            if (1 != e.nodeType || !dtd.$removeEmpty[e.tagName]) return 0;
            for (e = e.firstChild; e; ) {
                if (domUtils.isBookmarkNode(e)) return 0;
                if (1 == e.nodeType && !domUtils.isEmptyInlineElement(e) || 3 == e.nodeType && !domUtils.isWhitespace(e)) return 0;
                e = e.nextSibling;
            }
            return 1;
        },
        trimWhiteTextNode: function(i) {
            function e(e) {
                for (var t; (t = i[e]) && 3 == t.nodeType && domUtils.isWhitespace(t); ) i.removeChild(t);
            }
            e("firstChild"), e("lastChild");
        },
        mergeChild: function(e, t, i) {
            for (var n, o = domUtils.getElementsByTagName(e, e.tagName.toLowerCase()), r = 0; n = o[r++]; ) if (n.parentNode && !domUtils.isBookmarkNode(n)) if ("span" != n.tagName.toLowerCase()) domUtils.isSameElement(e, n) && domUtils.remove(n, !0); else {
                if (e === n.parentNode && (domUtils.trimWhiteTextNode(e), 1 == e.childNodes.length)) {
                    e.style.cssText = n.style.cssText + ";" + e.style.cssText, domUtils.remove(n, !0);
                    continue;
                }
                if (n.style.cssText = e.style.cssText + ";" + n.style.cssText, i) {
                    var a = i.style;
                    if (a) {
                        a = a.split(";");
                        for (var s, l = 0; s = a[l++]; ) n.style[utils.cssStyleToDomStyle(s.split(":")[0])] = s.split(":")[1];
                    }
                }
                domUtils.isSameStyle(n, e) && domUtils.remove(n, !0);
            }
        },
        getElementsByTagName: function(e, t, i) {
            if (i && utils.isString(i)) {
                var n = i;
                i = function(e) {
                    return domUtils.hasClass(e, n);
                };
            }
            t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
            for (var o, r = [], a = 0; o = t[a++]; ) for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++]; ) i && !i(s) || r.push(s);
            return r;
        },
        mergeToParent: function(e) {
            for (var t = e.parentNode; t && dtd.$removeEmpty[t.tagName]; ) {
                if (t.tagName == e.tagName || "A" == t.tagName) {
                    if (domUtils.trimWhiteTextNode(t), "SPAN" == t.tagName && !domUtils.isSameStyle(t, e) || "A" == t.tagName && "SPAN" == e.tagName) {
                        if (1 < t.childNodes.length || t !== e.parentNode) {
                            e.style.cssText = t.style.cssText + ";" + e.style.cssText, t = t.parentNode;
                            continue;
                        }
                        t.style.cssText += ";" + e.style.cssText, "A" == t.tagName && (t.style.textDecoration = "underline");
                    }
                    if ("A" != t.tagName) {
                        t === e.parentNode && domUtils.remove(e, !0);
                        break;
                    }
                }
                t = t.parentNode;
            }
        },
        mergeSibling: function(e, t, i) {
            function n(e, t, i) {
                var n;
                if ((n = i[e]) && !domUtils.isBookmarkNode(n) && 1 == n.nodeType && domUtils.isSameElement(i, n)) {
                    for (;n.firstChild; ) "firstChild" == t ? i.insertBefore(n.lastChild, i.firstChild) : i.appendChild(n.firstChild);
                    domUtils.remove(n);
                }
            }
            !t && n("previousSibling", "firstChild", e), !i && n("nextSibling", "lastChild", e);
        },
        unSelectable: ie && browser.ie9below || browser.opera ? function(e) {
            e.onselectstart = function() {
                return !1;
            }, e.onclick = e.onkeyup = e.onkeydown = function() {
                return !1;
            }, e.unselectable = "on", e.setAttribute("unselectable", "on");
            for (var t, i = 0; t = e.all[i++]; ) switch (t.tagName.toLowerCase()) {
              case "iframe":
              case "textarea":
              case "input":
              case "select":
                break;

              default:
                t.unselectable = "on", e.setAttribute("unselectable", "on");
            }
        } : function(e) {
            e.style.MozUserSelect = e.style.webkitUserSelect = e.style.msUserSelect = e.style.KhtmlUserSelect = "none";
        },
        removeAttributes: function(e, t) {
            t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
            for (var i, n = 0; i = t[n++]; ) {
                switch (i = attrFix[i] || i) {
                  case "className":
                    e[i] = "";
                    break;

                  case "style":
                    e.style.cssText = "";
                    var o = e.getAttributeNode("style");
                    !browser.ie && o && e.removeAttributeNode(o);
                }
                e.removeAttribute(i);
            }
        },
        createElement: function(e, t, i) {
            return domUtils.setAttributes(e.createElement(t), i);
        },
        setAttributes: function(e, t) {
            for (var i in t) if (t.hasOwnProperty(i)) {
                var n = t[i];
                switch (i) {
                  case "class":
                    e.className = n;
                    break;

                  case "style":
                    e.style.cssText = e.style.cssText + ";" + n;
                    break;

                  case "innerHTML":
                    e[i] = n;
                    break;

                  case "value":
                    e.value = n;
                    break;

                  default:
                    e.setAttribute(attrFix[i] || i, n);
                }
            }
            return e;
        },
        getComputedStyle: function(e, t) {
            if (-1 < "width height top left".indexOf(t)) return e["offset" + t.replace(/^\w/, function(e) {
                return e.toUpperCase();
            })] + "px";
            if (3 == e.nodeType && (e = e.parentNode), browser.ie && browser.version < 9 && "font-size" == t && !e.style.fontSize && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName]) {
                var i = e.ownerDocument.createElement("span");
                i.style.cssText = "padding:0;border:0;font-family:simsun;", i.innerHTML = ".", e.appendChild(i);
                var n = i.offsetHeight;
                return e.removeChild(i), i = null, n + "px";
            }
            try {
                var o = domUtils.getStyle(e, t) || (window.getComputedStyle ? domUtils.getWindow(e).getComputedStyle(e, "").getPropertyValue(t) : (e.currentStyle || e.style)[utils.cssStyleToDomStyle(t)]);
            } catch (e) {
                return "";
            }
            return utils.transUnitToPx(utils.fixColor(t, o));
        },
        removeClasses: function(e, t) {
            t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
            for (var i, n = 0, o = e.className; i = t[n++]; ) o = o.replace(new RegExp("\\b" + i + "\\b"), "");
            (o = utils.trim(o).replace(/[ ]{2,}/g, " ")) ? e.className = o : domUtils.removeAttributes(e, [ "class" ]);
        },
        addClass: function(e, t) {
            if (e) {
                t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
                for (var i, n = 0, o = e.className; i = t[n++]; ) new RegExp("\\b" + i + "\\b").test(o) || (o += " " + i);
                e.className = utils.trim(o);
            }
        },
        hasClass: function(e, t) {
            if (utils.isRegExp(t)) return t.test(e.className);
            t = utils.trim(t).replace(/[ ]{2,}/g, " ").split(" ");
            for (var i, n = 0, o = e.className; i = t[n++]; ) if (!new RegExp("\\b" + i + "\\b", "i").test(o)) return !1;
            return n - 1 == t.length;
        },
        preventDefault: function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
        },
        removeStyle: function(e, t) {
            browser.ie ? ("color" == t && (t = "(^|;)" + t), e.style.cssText = e.style.cssText.replace(new RegExp(t + "[^:]*:[^;]+;?", "ig"), "")) : e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(utils.cssStyleToDomStyle(t)), 
            e.style.cssText || domUtils.removeAttributes(e, [ "style" ]);
        },
        getStyle: function(e, t) {
            var i = e.style[utils.cssStyleToDomStyle(t)];
            return utils.fixColor(t, i);
        },
        setStyle: function(e, t, i) {
            e.style[utils.cssStyleToDomStyle(t)] = i, utils.trim(e.style.cssText) || this.removeAttributes(e, "style");
        },
        setStyles: function(e, t) {
            for (var i in t) t.hasOwnProperty(i) && domUtils.setStyle(e, i, t[i]);
        },
        removeDirtyAttr: function(e) {
            for (var t, i = 0, n = e.getElementsByTagName("*"); t = n[i++]; ) t.removeAttribute("_moz_dirty");
            e.removeAttribute("_moz_dirty");
        },
        getChildCount: function(e, t) {
            var i = 0, n = e.firstChild;
            for (t = t || function() {
                return 1;
            }; n; ) t(n) && i++, n = n.nextSibling;
            return i;
        },
        isEmptyNode: function(e) {
            return !e.firstChild || 0 == domUtils.getChildCount(e, function(e) {
                return !domUtils.isBr(e) && !domUtils.isBookmarkNode(e) && !domUtils.isWhitespace(e);
            });
        },
        clearSelectedArr: function(e) {
            for (var t; t = e.pop(); ) domUtils.removeAttributes(t, [ "class" ]);
        },
        scrollToView: function(e, t, i) {
            var n, o, r = (n = t.document, o = "CSS1Compat" == n.compatMode, {
                width: (o ? n.documentElement.clientWidth : n.body.clientWidth) || 0,
                height: (o ? n.documentElement.clientHeight : n.body.clientHeight) || 0
            }).height, a = -1 * r + i;
            a += e.offsetHeight || 0, a += domUtils.getXY(e).y;
            var s = function(e) {
                if ("pageXOffset" in e) return {
                    x: e.pageXOffset || 0,
                    y: e.pageYOffset || 0
                };
                var t = e.document;
                return {
                    x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
                    y: t.documentElement.scrollTop || t.body.scrollTop || 0
                };
            }(t).y;
            (s < a || a < s - r) && t.scrollTo(0, a + (a < 0 ? -20 : 20));
        },
        isBr: function(e) {
            return 1 == e.nodeType && "BR" == e.tagName;
        },
        isFillChar: function(e, t) {
            if (3 != e.nodeType) return !1;
            var i = e.nodeValue;
            return t ? new RegExp("^" + domUtils.fillChar).test(i) : !i.replace(new RegExp(domUtils.fillChar, "g"), "").length;
        },
        isStartInblock: function(e) {
            var t, i = e.cloneRange(), n = 0, o = i.startContainer;
            if (1 == o.nodeType && o.childNodes[i.startOffset]) for (var r = (o = o.childNodes[i.startOffset]).previousSibling; r && domUtils.isFillChar(r); ) r = (o = r).previousSibling;
            for (this.isFillChar(o, !0) && 1 == i.startOffset && (i.setStartBefore(o), o = i.startContainer); o && domUtils.isFillChar(o); ) o = (t = o).previousSibling;
            for (t && (i.setStartBefore(t), o = i.startContainer), 1 == o.nodeType && domUtils.isEmptyNode(o) && 1 == i.startOffset && i.setStart(o, 0).collapse(!0); !i.startOffset; ) {
                if (o = i.startContainer, domUtils.isBlockElm(o) || domUtils.isBody(o)) {
                    n = 1;
                    break;
                }
                var a;
                if (r = i.startContainer.previousSibling) {
                    for (;r && domUtils.isFillChar(r); ) r = (a = r).previousSibling;
                    a ? i.setStartBefore(a) : i.setStartBefore(i.startContainer);
                } else i.setStartBefore(i.startContainer);
            }
            return n && !domUtils.isBody(i.startContainer) ? 1 : 0;
        },
        isEmptyBlock: function(e, t) {
            if (1 != e.nodeType) return 0;
            if (t = t || new RegExp("[  \t\r\n" + domUtils.fillChar + "]", "g"), 0 < e[browser.ie ? "innerText" : "textContent"].replace(t, "").length) return 0;
            for (var i in dtd.$isNotEmpty) if (e.getElementsByTagName(i).length) return 0;
            return 1;
        },
        setViewportOffset: function(e, t) {
            var i = 0 | parseInt(e.style.left), n = 0 | parseInt(e.style.top), o = e.getBoundingClientRect(), r = t.left - o.left, a = t.top - o.top;
            r && (e.style.left = i + r + "px"), a && (e.style.top = n + a + "px");
        },
        fillNode: function(e, t) {
            var i = browser.ie ? e.createTextNode(domUtils.fillChar) : e.createElement("br");
            t.innerHTML = "", t.appendChild(i);
        },
        moveChild: function(e, t, i) {
            for (;e.firstChild; ) i && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild);
        },
        hasNoAttributes: function(e) {
            return browser.ie ? /^<\w+\s*?>/.test(e.outerHTML) : 0 == e.attributes.length;
        },
        isCustomeNode: function(e) {
            return 1 == e.nodeType && e.getAttribute("_ue_custom_node_");
        },
        isTagNode: function(e, t) {
            return 1 == e.nodeType && new RegExp("\\b" + e.tagName + "\\b", "i").test(t);
        },
        filterNodeList: function(e, t, i) {
            var n = [];
            if (!utils.isFunction(t)) {
                var o = t;
                t = function(e) {
                    return -1 != utils.indexOf(utils.isArray(o) ? o : o.split(" "), e.tagName.toLowerCase());
                };
            }
            return utils.each(e, function(e) {
                t(e) && n.push(e);
            }), 0 == n.length ? null : 1 != n.length && i ? n : n[0];
        },
        isInNodeEndBoundary: function(e, t) {
            var i = e.startContainer;
            if (3 == i.nodeType && e.startOffset != i.nodeValue.length) return 0;
            if (1 == i.nodeType && e.startOffset != i.childNodes.length) return 0;
            for (;i !== t; ) {
                if (i.nextSibling) return 0;
                i = i.parentNode;
            }
            return 1;
        },
        isBoundaryNode: function(e, t) {
            for (;!domUtils.isBody(e); ) if (e !== (e = e.parentNode)[t]) return !1;
            return !0;
        },
        fillHtml: browser.ie11below ? "&nbsp;" : "<br/>"
    }, fillCharReg = new RegExp(domUtils.fillChar, "g");
    !function() {
        var c, o = 0, u = domUtils.fillChar;
        function r(e) {
            return !e.collapsed && 1 == e.startContainer.nodeType && e.startContainer === e.endContainer && e.endOffset - e.startOffset == 1;
        }
        function i(e, t, i, n) {
            var o;
            return 1 == t.nodeType && (dtd.$empty[t.tagName] || dtd.$nonChild[t.tagName]) && (i = domUtils.getNodeIndex(t) + (e ? 0 : 1), 
            t = t.parentNode), e ? (n.startContainer = t, n.startOffset = i, n.endContainer || n.collapse(!0)) : (n.endContainer = t, 
            n.endOffset = i, n.startContainer || n.collapse(!1)), (o = n).collapsed = o.startContainer && o.endContainer && o.startContainer === o.endContainer && o.startOffset == o.endOffset, 
            n;
        }
        function t(e, t) {
            var i, n, o, r, a = e.startContainer, s = e.endContainer, l = e.startOffset, d = e.endOffset, c = e.document, u = c.createDocumentFragment();
            if (1 == a.nodeType && (a = a.childNodes[l] || (i = a.appendChild(c.createTextNode("")))), 
            1 == s.nodeType && (s = s.childNodes[d] || (n = s.appendChild(c.createTextNode("")))), 
            a === s && 3 == a.nodeType) return u.appendChild(c.createTextNode(a.substringData(l, d - l))), 
            t && (a.deleteData(l, d - l), e.collapse(!0)), u;
            for (var m = u, f = domUtils.findParents(a, !0), h = domUtils.findParents(s, !0), p = 0; f[p] == h[p]; ) p++;
            for (var g, v = p; g = f[v]; v++) {
                for (o = g.nextSibling, g == a ? i || (3 == e.startContainer.nodeType ? (m.appendChild(c.createTextNode(a.nodeValue.slice(l))), 
                t && a.deleteData(l, a.nodeValue.length - l)) : m.appendChild(t ? a : a.cloneNode(!0))) : (r = g.cloneNode(!1), 
                m.appendChild(r)); o && o !== s && o !== h[v]; ) g = o.nextSibling, m.appendChild(t ? o : o.cloneNode(!0)), 
                o = g;
                m = r;
            }
            m = u, f[p] || (m.appendChild(f[p - 1].cloneNode(!1)), m = m.firstChild);
            var b;
            for (v = p; b = h[v]; v++) {
                if (o = b.previousSibling, b == s ? n || 3 != e.endContainer.nodeType || (m.appendChild(c.createTextNode(s.substringData(0, d))), 
                t && s.deleteData(0, d)) : (r = b.cloneNode(!1), m.appendChild(r)), v != p || !f[p]) for (;o && o !== a; ) b = o.previousSibling, 
                m.insertBefore(t ? o : o.cloneNode(!0), m.firstChild), o = b;
                m = r;
            }
            return t && e.setStartBefore(h[p] ? f[p] ? h[p] : f[p - 1] : h[p - 1]).collapse(!0), 
            i && domUtils.remove(i), n && domUtils.remove(n), u;
        }
        var n = dom.Range = function(e) {
            var t = this;
            t.startContainer = t.startOffset = t.endContainer = t.endOffset = null, t.document = e, 
            t.collapsed = !0;
        };
        function m(e, t) {
            try {
                if (c && domUtils.inDoc(c, e)) if (c.nodeValue.replace(fillCharReg, "").length) c.nodeValue = c.nodeValue.replace(fillCharReg, ""); else {
                    var i = c.parentNode;
                    for (domUtils.remove(c); i && domUtils.isEmptyInlineElement(i) && (browser.safari ? !(domUtils.getPosition(i, t) & domUtils.POSITION_CONTAINS) : !i.contains(t)); ) c = i.parentNode, 
                    domUtils.remove(i), i = c;
                }
            } catch (e) {}
        }
        function f(e, t) {
            var i;
            for (e = e[t]; e && domUtils.isFillChar(e); ) i = e[t], domUtils.remove(e), e = i;
        }
        n.prototype = {
            cloneContents: function() {
                return this.collapsed ? null : t(this, 0);
            },
            deleteContents: function() {
                var e;
                return this.collapsed || t(this, 1), browser.webkit && (3 != (e = this.startContainer).nodeType || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), 
                domUtils.remove(e))), this;
            },
            extractContents: function() {
                return this.collapsed ? null : t(this, 2);
            },
            setStart: function(e, t) {
                return i(!0, e, t, this);
            },
            setEnd: function(e, t) {
                return i(!1, e, t, this);
            },
            setStartAfter: function(e) {
                return this.setStart(e.parentNode, domUtils.getNodeIndex(e) + 1);
            },
            setStartBefore: function(e) {
                return this.setStart(e.parentNode, domUtils.getNodeIndex(e));
            },
            setEndAfter: function(e) {
                return this.setEnd(e.parentNode, domUtils.getNodeIndex(e) + 1);
            },
            setEndBefore: function(e) {
                return this.setEnd(e.parentNode, domUtils.getNodeIndex(e));
            },
            setStartAtFirst: function(e) {
                return this.setStart(e, 0);
            },
            setStartAtLast: function(e) {
                return this.setStart(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length);
            },
            setEndAtFirst: function(e) {
                return this.setEnd(e, 0);
            },
            setEndAtLast: function(e) {
                return this.setEnd(e, 3 == e.nodeType ? e.nodeValue.length : e.childNodes.length);
            },
            selectNode: function(e) {
                return this.setStartBefore(e).setEndAfter(e);
            },
            selectNodeContents: function(e) {
                return this.setStart(e, 0).setEndAtLast(e);
            },
            cloneRange: function() {
                var e = this;
                return new n(e.document).setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset);
            },
            collapse: function(e) {
                var t = this;
                return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, 
                t.startOffset = t.endOffset), t.collapsed = !0, t;
            },
            shrinkBoundary: function(e) {
                var t, i = this, n = i.collapsed;
                function o(e) {
                    return 1 == e.nodeType && !domUtils.isBookmarkNode(e) && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName];
                }
                for (;1 == i.startContainer.nodeType && (t = i.startContainer.childNodes[i.startOffset]) && o(t); ) i.setStart(t, 0);
                if (n) return i.collapse(!0);
                if (!e) for (;1 == i.endContainer.nodeType && 0 < i.endOffset && (t = i.endContainer.childNodes[i.endOffset - 1]) && o(t); ) i.setEnd(t, t.childNodes.length);
                return i;
            },
            getCommonAncestor: function(e, t) {
                var i = this.startContainer, n = this.endContainer;
                return i === n ? e && r(this) && 1 == (i = i.childNodes[this.startOffset]).nodeType ? i : t && 3 == i.nodeType ? i.parentNode : i : domUtils.getCommonAncestor(i, n);
            },
            trimBoundary: function(e) {
                this.txtToElmBoundary();
                var t = this.startContainer, i = this.startOffset, n = this.collapsed, o = this.endContainer;
                if (3 == t.nodeType) {
                    if (0 == i) this.setStartBefore(t); else if (i >= t.nodeValue.length) this.setStartAfter(t); else {
                        var r = domUtils.split(t, i);
                        t === o ? this.setEnd(r, this.endOffset - i) : t.parentNode === o && (this.endOffset += 1), 
                        this.setStartBefore(r);
                    }
                    if (n) return this.collapse(!0);
                }
                return e || (i = this.endOffset, 3 == (o = this.endContainer).nodeType && (0 == i ? this.setEndBefore(o) : (i < o.nodeValue.length && domUtils.split(o, i), 
                this.setEndAfter(o)))), this;
            },
            txtToElmBoundary: function(e) {
                function t(e, t) {
                    var i = e[t + "Container"], n = e[t + "Offset"];
                    3 == i.nodeType && (n ? n >= i.nodeValue.length && e["set" + t.replace(/(\w)/, function(e) {
                        return e.toUpperCase();
                    }) + "After"](i) : e["set" + t.replace(/(\w)/, function(e) {
                        return e.toUpperCase();
                    }) + "Before"](i));
                }
                return !e && this.collapsed || (t(this, "start"), t(this, "end")), this;
            },
            insertNode: function(e) {
                var t = e, i = 1;
                11 == e.nodeType && (t = e.firstChild, i = e.childNodes.length), this.trimBoundary(!0);
                var n = this.startContainer, o = this.startOffset, r = n.childNodes[o];
                return r ? n.insertBefore(e, r) : n.appendChild(e), t.parentNode === this.endContainer && (this.endOffset = this.endOffset + i), 
                this.setStartBefore(t);
            },
            setCursor: function(e, t) {
                return this.collapse(!e).select(t);
            },
            createBookmark: function(e, t) {
                var i, n = this.document.createElement("span");
                return n.style.cssText = "display:none;line-height:0px;", n.appendChild(this.document.createTextNode("‍")), 
                n.id = "_baidu_bookmark_start_" + (t ? "" : o++), this.collapsed || ((i = n.cloneNode(!0)).id = "_baidu_bookmark_end_" + (t ? "" : o++)), 
                this.insertNode(n), i && this.collapse().insertNode(i).setEndBefore(i), this.setStartAfter(n), 
                {
                    start: e ? n.id : n,
                    end: i ? e ? i.id : i : null,
                    id: e
                };
            },
            moveToBookmark: function(e) {
                var t = e.id ? this.document.getElementById(e.start) : e.start, i = e.end && e.id ? this.document.getElementById(e.end) : e.end;
                return this.setStartBefore(t), domUtils.remove(t), i ? (this.setEndBefore(i), domUtils.remove(i)) : this.collapse(!0), 
                this;
            },
            enlarge: function(e, t) {
                var i, n, o = domUtils.isBody, r = this.document.createTextNode("");
                if (e) {
                    for (i = 1 == (n = this.startContainer).nodeType ? n = n.childNodes[this.startOffset] ? n.childNodes[this.startOffset] : (n.appendChild(r), 
                    r) : n; ;) {
                        if (domUtils.isBlockElm(n)) {
                            for (n = i; (i = n.previousSibling) && !domUtils.isBlockElm(i); ) n = i;
                            this.setStartBefore(n);
                            break;
                        }
                        n = (i = n).parentNode;
                    }
                    for (i = 1 == (n = this.endContainer).nodeType ? ((i = n.childNodes[this.endOffset]) ? n.insertBefore(r, i) : n.appendChild(r), 
                    n = r) : n; ;) {
                        if (domUtils.isBlockElm(n)) {
                            for (n = i; (i = n.nextSibling) && !domUtils.isBlockElm(i); ) n = i;
                            this.setEndAfter(n);
                            break;
                        }
                        n = (i = n).parentNode;
                    }
                    r.parentNode === this.endContainer && this.endOffset--, domUtils.remove(r);
                }
                if (!this.collapsed) {
                    for (;!(0 != this.startOffset || t && t(this.startContainer) || o(this.startContainer)); ) this.setStartBefore(this.startContainer);
                    for (;!(this.endOffset != (1 == this.endContainer.nodeType ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || t && t(this.endContainer) || o(this.endContainer)); ) this.setEndAfter(this.endContainer);
                }
                return this;
            },
            enlargeToBlockElm: function(e) {
                for (;!domUtils.isBlockElm(this.startContainer); ) this.setStartBefore(this.startContainer);
                if (!e) for (;!domUtils.isBlockElm(this.endContainer); ) this.setEndAfter(this.endContainer);
                return this;
            },
            adjustmentBoundary: function() {
                if (!this.collapsed) {
                    for (;!domUtils.isBody(this.startContainer) && this.startOffset == this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length && this.startContainer[3 == this.startContainer.nodeType ? "nodeValue" : "childNodes"].length; ) this.setStartAfter(this.startContainer);
                    for (;!domUtils.isBody(this.endContainer) && !this.endOffset && this.endContainer[3 == this.endContainer.nodeType ? "nodeValue" : "childNodes"].length; ) this.setEndBefore(this.endContainer);
                }
                return this;
            },
            applyInlineStyle: function(t, i, e) {
                if (this.collapsed) return this;
                this.trimBoundary().enlarge(!1, function(e) {
                    return 1 == e.nodeType && domUtils.isBlockElm(e);
                }).adjustmentBoundary();
                for (var n, o, r = this.createBookmark(), a = r.end, s = function(e) {
                    return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !domUtils.isWhitespace(e);
                }, l = domUtils.getNextDomNode(r.start, !1, s), d = this.cloneRange(); l && domUtils.getPosition(l, a) & domUtils.POSITION_PRECEDING; ) if (3 == l.nodeType || dtd[t][l.tagName]) {
                    for (d.setStartBefore(l), n = l; n && (3 == n.nodeType || dtd[t][n.tagName]) && n !== a; ) o = n, 
                    n = domUtils.getNextDomNode(n, 1 == n.nodeType, null, function(e) {
                        return dtd[t][e.tagName];
                    });
                    var c, u, m = d.setEndAfter(o).extractContents();
                    if (e && 0 < e.length) {
                        var f, h;
                        h = f = e[0].cloneNode(!1);
                        for (var p, g = 1; p = e[g++]; ) f.appendChild(p.cloneNode(!1)), f = f.firstChild;
                        c = f;
                    } else c = d.document.createElement(t);
                    if (i && domUtils.setAttributes(c, i), c.appendChild(m), "SPAN" == c.tagName && i && i.style && utils.each(c.getElementsByTagName("span"), function(e) {
                        e.style.cssText = e.style.cssText + ";" + i.style;
                    }), d.insertNode(e ? h : c), "span" == t && i.style && /text\-decoration/.test(i.style) && (u = domUtils.findParentByTagName(c, "a", !0)) ? (domUtils.setAttributes(u, i), 
                    domUtils.remove(c, !0), c = u) : (domUtils.mergeSibling(c), domUtils.clearEmptySibling(c)), 
                    domUtils.mergeChild(c, i), l = domUtils.getNextDomNode(c, !1, s), domUtils.mergeToParent(c), 
                    n === a) break;
                } else l = domUtils.getNextDomNode(l, !0, s);
                return this.moveToBookmark(r);
            },
            removeInlineStyle: function(e) {
                if (this.collapsed) return this;
                e = utils.isArray(e) ? e : [ e ], this.shrinkBoundary().adjustmentBoundary();
                for (var t = this.startContainer, i = this.endContainer; ;) {
                    if (1 == t.nodeType) {
                        if (-1 < utils.indexOf(e, t.tagName.toLowerCase())) break;
                        if ("body" == t.tagName.toLowerCase()) {
                            t = null;
                            break;
                        }
                    }
                    t = t.parentNode;
                }
                for (;;) {
                    if (1 == i.nodeType) {
                        if (-1 < utils.indexOf(e, i.tagName.toLowerCase())) break;
                        if ("body" == i.tagName.toLowerCase()) {
                            i = null;
                            break;
                        }
                    }
                    i = i.parentNode;
                }
                var n, o, r = this.createBookmark();
                t && (n = (o = this.cloneRange().setEndBefore(r.start).setStartBefore(t)).extractContents(), 
                o.insertNode(n), domUtils.clearEmptySibling(t, !0), t.parentNode.insertBefore(r.start, t)), 
                i && (n = (o = this.cloneRange().setStartAfter(r.end).setEndAfter(i)).extractContents(), 
                o.insertNode(n), domUtils.clearEmptySibling(i, !1, !0), i.parentNode.insertBefore(r.end, i.nextSibling));
                for (var a, s = domUtils.getNextDomNode(r.start, !1, function(e) {
                    return 1 == e.nodeType;
                }); s && s !== r.end; ) a = domUtils.getNextDomNode(s, !0, function(e) {
                    return 1 == e.nodeType;
                }), -1 < utils.indexOf(e, s.tagName.toLowerCase()) && domUtils.remove(s, !0), s = a;
                return this.moveToBookmark(r);
            },
            getClosedNode: function() {
                var e;
                if (!this.collapsed) {
                    var t = this.cloneRange().adjustmentBoundary().shrinkBoundary();
                    if (r(t)) {
                        var i = t.startContainer.childNodes[t.startOffset];
                        i && 1 == i.nodeType && (dtd.$empty[i.tagName] || dtd.$nonChild[i.tagName]) && (e = i);
                    }
                }
                return e;
            },
            select: browser.ie ? function(e, t) {
                var i;
                this.collapsed || this.shrinkBoundary();
                var n = this.getClosedNode();
                if (n && !t) {
                    try {
                        (i = this.document.body.createControlRange()).addElement(n), i.select();
                    } catch (e) {}
                    return this;
                }
                var o, r = this.createBookmark(), a = r.start;
                if ((i = this.document.body.createTextRange()).moveToElementText(a), i.moveStart("character", 1), 
                this.collapsed) {
                    if (!e && 3 != this.startContainer.nodeType) {
                        var s = this.document.createTextNode(u), l = this.document.createElement("span");
                        l.appendChild(this.document.createTextNode(u)), a.parentNode.insertBefore(l, a), 
                        a.parentNode.insertBefore(s, a), m(this.document, s), c = s, f(l, "previousSibling"), 
                        f(a, "nextSibling"), i.moveStart("character", -1), i.collapse(!0);
                    }
                } else {
                    var d = this.document.body.createTextRange();
                    o = r.end, d.moveToElementText(o), i.setEndPoint("EndToEnd", d);
                }
                this.moveToBookmark(r), l && domUtils.remove(l);
                try {
                    i.select();
                } catch (e) {}
                return this;
            } : function(e) {
                var t, i = domUtils.getWindow(this.document), n = i.getSelection();
                if (browser.gecko ? this.document.body.focus() : i.focus(), n) {
                    if (n.removeAllRanges(), this.collapsed && !e) {
                        var o = this.startContainer, r = o;
                        1 == o.nodeType && (r = o.childNodes[this.startOffset]), 3 == o.nodeType && this.startOffset || (r ? r.previousSibling && 3 == r.previousSibling.nodeType : o.lastChild && 3 == o.lastChild.nodeType) || (t = this.document.createTextNode(u), 
                        this.insertNode(t), m(this.document, t), f(t, "previousSibling"), f(t, "nextSibling"), 
                        c = t, this.setStart(t, browser.webkit ? 1 : 0).collapse(!0));
                    }
                    var a = this.document.createRange();
                    if (this.collapsed && browser.opera && 1 == this.startContainer.nodeType) if (r = this.startContainer.childNodes[this.startOffset]) {
                        for (;r && domUtils.isBlockElm(r) && 1 == r.nodeType && r.childNodes[0]; ) r = r.childNodes[0];
                        r && this.setStartBefore(r).collapse(!0);
                    } else (r = this.startContainer.lastChild) && domUtils.isBr(r) && this.setStartBefore(r).collapse(!0);
                    !function(n) {
                        function e(e, t, i) {
                            3 == e.nodeType && e.nodeValue.length < t && (n[i + "Offset"] = e.nodeValue.length);
                        }
                        e(n.startContainer, n.startOffset, "start"), e(n.endContainer, n.endOffset, "end");
                    }(this), a.setStart(this.startContainer, this.startOffset), a.setEnd(this.endContainer, this.endOffset), 
                    n.addRange(a);
                }
                return this;
            },
            scrollToView: function(e, t) {
                e = e ? window : domUtils.getWindow(this.document);
                var i = this.document.createElement("span");
                return i.innerHTML = "&nbsp;", this.cloneRange().insertNode(i), domUtils.scrollToView(i, e, t), 
                domUtils.remove(i), this;
            },
            inFillChar: function() {
                var e = this.startContainer;
                return !(!this.collapsed || 3 != e.nodeType || e.nodeValue.replace(new RegExp("^" + domUtils.fillChar), "").length + 1 != e.nodeValue.length);
            },
            createAddress: function(e, d) {
                var t = {}, c = this;
                function i(e) {
                    for (var t, i = e ? c.startContainer : c.endContainer, n = domUtils.findParents(i, !0, function(e) {
                        return !domUtils.isBody(e);
                    }), o = [], r = 0; t = n[r++]; ) o.push(domUtils.getNodeIndex(t, d));
                    var a = 0;
                    if (d) if (3 == i.nodeType) {
                        for (var s = i.previousSibling; s && 3 == s.nodeType; ) a += s.nodeValue.replace(fillCharReg, "").length, 
                        s = s.previousSibling;
                        a += e ? c.startOffset : c.endOffset;
                    } else if (i = i.childNodes[e ? c.startOffset : c.endOffset]) a = domUtils.getNodeIndex(i, d); else for (var l = (i = e ? c.startContainer : c.endContainer).firstChild; l; ) if (domUtils.isFillChar(l)) l = l.nextSibling; else if (a++, 
                    3 == l.nodeType) for (;l && 3 == l.nodeType; ) l = l.nextSibling; else l = l.nextSibling; else a = e ? domUtils.isFillChar(i) ? 0 : c.startOffset : c.endOffset;
                    return a < 0 && (a = 0), o.push(a), o;
                }
                return t.startAddress = i(!0), e || (t.endAddress = c.collapsed ? [].concat(t.startAddress) : i()), 
                t;
            },
            moveToAddress: function(e, t) {
                var l = this;
                function i(e, t) {
                    for (var i, n, o, r = l.document.body, a = 0, s = e.length; a < s; a++) if (o = e[a], 
                    !(r = (i = r).childNodes[o])) {
                        n = o;
                        break;
                    }
                    t ? r ? l.setStartBefore(r) : l.setStart(i, n) : r ? l.setEndBefore(r) : l.setEnd(i, n);
                }
                return i(e.startAddress, !0), !t && e.endAddress && i(e.endAddress), l;
            },
            equals: function(e) {
                for (var t in this) if (this.hasOwnProperty(t) && this[t] !== e[t]) return !1;
                return !0;
            },
            traversal: function(e, t) {
                if (this.collapsed) return this;
                for (var i = this.createBookmark(), n = i.end, o = domUtils.getNextDomNode(i.start, !1, t); o && o !== n && domUtils.getPosition(o, n) & domUtils.POSITION_PRECEDING; ) {
                    var r = domUtils.getNextDomNode(o, !1, t);
                    e(o), o = r;
                }
                return this.moveToBookmark(i);
            }
        };
    }(), function() {
        function s(e, t) {
            var i = domUtils.getNodeIndex;
            (e = e.duplicate()).collapse(t);
            var n = e.parentElement();
            if (!n.hasChildNodes()) return {
                container: n,
                offset: 0
            };
            for (var o, r, a = n.children, s = e.duplicate(), l = 0, d = a.length - 1, c = -1; l <= d; ) {
                o = a[c = Math.floor((l + d) / 2)], s.moveToElementText(o);
                var u = s.compareEndPoints("StartToStart", e);
                if (0 < u) d = c - 1; else {
                    if (!(u < 0)) return {
                        container: n,
                        offset: i(o)
                    };
                    l = c + 1;
                }
            }
            if (-1 == c) {
                if (s.moveToElementText(n), s.setEndPoint("StartToStart", e), r = s.text.replace(/(\r\n|\r)/g, "\n").length, 
                a = n.childNodes, !r) return {
                    container: o = a[a.length - 1],
                    offset: o.nodeValue.length
                };
                for (var m = a.length; 0 < r; ) r -= a[--m].nodeValue.length;
                return {
                    container: a[m],
                    offset: -r
                };
            }
            if (s.collapse(0 < u), s.setEndPoint(0 < u ? "StartToStart" : "EndToStart", e), 
            !(r = s.text.replace(/(\r\n|\r)/g, "\n").length)) return dtd.$empty[o.tagName] || dtd.$nonChild[o.tagName] ? {
                container: n,
                offset: i(o) + (0 < u ? 0 : 1)
            } : {
                container: o,
                offset: 0 < u ? 0 : o.childNodes.length
            };
            for (;0 < r; ) try {
                var f = o;
                r -= (o = o[0 < u ? "previousSibling" : "nextSibling"]).nodeValue.length;
            } catch (e) {
                return {
                    container: n,
                    offset: i(f)
                };
            }
            return {
                container: o,
                offset: 0 < u ? -r : o.nodeValue.length + r
            };
        }
        function n(e) {
            var t;
            try {
                t = e.getNative().createRange();
            } catch (e) {
                return null;
            }
            var i = t.item ? t.item(0) : t.parentElement();
            return (i.ownerDocument || i) === e.document ? t : null;
        }
        (dom.Selection = function(e) {
            var t, i = this;
            i.document = e, browser.ie9below && (t = domUtils.getWindow(e).frameElement, domUtils.on(t, "beforedeactivate", function() {
                i._bakIERange = i.getIERange();
            }), domUtils.on(t, "activate", function() {
                try {
                    !n(i) && i._bakIERange && i._bakIERange.select();
                } catch (e) {}
                i._bakIERange = null;
            })), t = e = null;
        }).prototype = {
            rangeInBody: function(e, t) {
                var i = browser.ie9below || t ? e.item ? e.item() : e.parentElement() : e.startContainer;
                return i === this.document.body || domUtils.inDoc(i, this.document);
            },
            getNative: function() {
                var e = this.document;
                try {
                    return e ? browser.ie9below ? e.selection : domUtils.getWindow(e).getSelection() : null;
                } catch (e) {
                    return null;
                }
            },
            getIERange: function() {
                var e = n(this);
                return !e && this._bakIERange ? this._bakIERange : e;
            },
            cache: function() {
                this.clear(), this._cachedRange = this.getRange(), this._cachedStartElement = this.getStart(), 
                this._cachedStartElementPath = this.getStartElementPath();
            },
            getStartElementPath: function() {
                if (this._cachedStartElementPath) return this._cachedStartElementPath;
                var e = this.getStart();
                return e ? domUtils.findParents(e, !0, null, !0) : [];
            },
            clear: function() {
                this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null;
            },
            isFocus: function() {
                try {
                    if (browser.ie9below) {
                        var e = n(this);
                        return !(!e || !this.rangeInBody(e));
                    }
                    return !!this.getNative().rangeCount;
                } catch (e) {
                    return !1;
                }
            },
            getRange: function() {
                var n = this;
                function t(e) {
                    for (var t = n.document.body.firstChild, i = e.collapsed; t && t.firstChild; ) e.setStart(t, 0), 
                    t = t.firstChild;
                    e.startContainer || e.setStart(n.document.body, 0), i && e.collapse(!0);
                }
                if (null != n._cachedRange) return this._cachedRange;
                var i = new baidu.editor.dom.Range(n.document);
                if (browser.ie9below) {
                    var e = n.getIERange();
                    if (e) try {
                        !function(e, t) {
                            if (e.item) t.selectNode(e.item(0)); else {
                                var i = s(e, !0);
                                t.setStart(i.container, i.offset), 0 != e.compareEndPoints("StartToEnd", e) && (i = s(e, !1), 
                                t.setEnd(i.container, i.offset));
                            }
                        }(e, i);
                    } catch (e) {
                        t(i);
                    } else t(i);
                } else {
                    var o = n.getNative();
                    if (o && o.rangeCount) {
                        var r = o.getRangeAt(0), a = o.getRangeAt(o.rangeCount - 1);
                        i.setStart(r.startContainer, r.startOffset).setEnd(a.endContainer, a.endOffset), 
                        i.collapsed && domUtils.isBody(i.startContainer) && !i.startOffset && t(i);
                    } else {
                        if (this._bakRange && domUtils.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange;
                        t(i);
                    }
                }
                return this._bakRange = i;
            },
            getStart: function() {
                if (this._cachedStartElement) return this._cachedStartElement;
                var e, t, i, n, o = browser.ie9below ? this.getIERange() : this.getRange();
                if (browser.ie9below) {
                    if (!o) return this.document.body.firstChild;
                    if (o.item) return o.item(0);
                    for (0 < (e = o.duplicate()).text.length && e.moveStart("character", 1), e.collapse(1), 
                    t = e.parentElement(), n = i = o.parentElement(); i = i.parentNode; ) if (i == t) {
                        t = n;
                        break;
                    }
                } else if (o.shrinkBoundary(), 1 == (t = o.startContainer).nodeType && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, o.startOffset)]), 
                3 == t.nodeType) return t.parentNode;
                return t;
            },
            getText: function() {
                var e, t;
                return this.isFocus() && (e = this.getNative()) ? (t = browser.ie9below ? e.createRange() : e.getRangeAt(0), 
                browser.ie9below ? t.text : t.toString()) : "";
            },
            clearRange: function() {
                this.getNative()[browser.ie9below ? "empty" : "removeAllRanges"]();
            }
        };
    }(), function() {
        var t, i = 0;
        function c(e, t) {
            var i;
            if (t.options.textarea) if (utils.isString(t.options.textarea)) {
                for (var n, o = 0, r = domUtils.getElementsByTagName(e, "textarea"); n = r[o++]; ) if (n.id == "ueditor_textarea_" + t.options.textarea) {
                    i = n;
                    break;
                }
            } else i = t.textarea;
            i || (e.appendChild(i = domUtils.createElement(document, "textarea", {
                name: t.options.textarea,
                id: "ueditor_textarea_" + t.options.textarea,
                style: "display:none"
            })), t.textarea = i), !i.getAttribute("name") && i.setAttribute("name", t.options.textarea), 
            i.value = t.hasContents() ? t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, !0) : "";
        }
        function n(e) {
            e.langIsReady = !0, e.fireEvent("langReady");
        }
        var o = UE.Editor = function(e) {
            var t = this;
            t.uid = i++, EventBase.call(t), t.commands = {}, t.options = utils.extend(utils.clone(e || {}), UEDITOR_CONFIG, !0), 
            t.shortcutkeys = {}, t.inputRules = [], t.outputRules = [], t.setOpt(o.defaultOptions(t)), 
            t.loadServerConfig(), utils.isEmptyObject(UE.I18N) ? utils.loadFile(document, {
                src: t.options.langPath + t.options.lang + "/" + t.options.lang + ".js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function() {
                UE.plugin.load(t), n(t);
            }) : (t.options.lang = function(e) {
                for (var t in e) return t;
            }(UE.I18N), UE.plugin.load(t), n(t)), UE.instants["ueditorInstant" + t.uid] = t;
        };
        o.prototype = {
            registerCommand: function(e, t) {
                this.commands[e] = t;
            },
            ready: function(e) {
                e && (this.isReady ? e.apply(this) : this.addListener("ready", e));
            },
            setOpt: function(e, t) {
                var i = {};
                utils.isString(e) ? i[e] = t : i = e, utils.extend(this.options, i, !0);
            },
            getOpt: function(e) {
                return this.options[e];
            },
            destroy: function() {
                var e = this;
                e.fireEvent("destroy");
                var t = e.container.parentNode, i = e.textarea;
                i ? i.style.display = "" : (i = document.createElement("textarea"), t.parentNode.insertBefore(i, t)), 
                i.style.width = e.iframe.offsetWidth + "px", i.style.height = e.iframe.offsetHeight + "px", 
                i.value = e.getContent(), i.id = e.key, t.innerHTML = "", domUtils.remove(t);
                var n = e.key;
                for (var o in e) e.hasOwnProperty(o) && delete this[o];
                UE.delEditor(n);
            },
            render: function(t) {
                var e = this.options, i = function(e) {
                    return parseInt(domUtils.getComputedStyle(t, e));
                };
                if (utils.isString(t) && (t = document.getElementById(t)), t) {
                    e.initialFrameWidth ? e.minFrameWidth = e.initialFrameWidth : e.minFrameWidth = e.initialFrameWidth = t.offsetWidth, 
                    e.initialFrameHeight ? e.minFrameHeight = e.initialFrameHeight : e.initialFrameHeight = e.minFrameHeight = t.offsetHeight, 
                    t.style.width = /%$/.test(e.initialFrameWidth) ? "100%" : e.initialFrameWidth - i("padding-left") - i("padding-right") + "px", 
                    t.style.height = /%$/.test(e.initialFrameHeight) ? "100%" : e.initialFrameHeight - i("padding-top") - i("padding-bottom") + "px", 
                    t.style.zIndex = e.zIndex;
                    var n = (ie && browser.version < 9 ? "" : "<!DOCTYPE html>") + "<html lang='en' class='view'><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (e.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + utils.unhtml(e.iframeCssUrl) + "'/>" : "") + (e.initialStyle ? "<style>" + e.initialStyle + "</style>" : "") + "</head><body class='view' ></body><script type='text/javascript' " + (ie ? "defer='defer'" : "") + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + this.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);<\/script>" + (e.iframeJsUrl ? "<script type='text/javascript' src='" + utils.unhtml(e.iframeJsUrl) + "'><\/script>" : "") + "</html>";
                    t.appendChild(domUtils.createElement(document, "iframe", {
                        id: "ueditor_" + this.uid,
                        width: "100%",
                        height: "100%",
                        frameborder: "0",
                        src: "javascript:void(function(){document.open();" + (e.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : "") + 'document.write("' + n + '");document.close();}())'
                    })), t.style.overflow = "hidden", setTimeout(function() {
                        /%$/.test(e.initialFrameWidth) && (e.minFrameWidth = e.initialFrameWidth = t.offsetWidth), 
                        /%$/.test(e.initialFrameHeight) && (e.minFrameHeight = e.initialFrameHeight = t.offsetHeight, 
                        t.style.height = e.initialFrameHeight + "px");
                    });
                }
            },
            _setup: function(e) {
                var t, n = this, i = n.options;
                ie ? (e.body.disabled = !0, e.body.contentEditable = !0, e.body.disabled = !1) : e.body.contentEditable = !0, 
                e.body.spellcheck = !1, n.document = e, n.window = e.defaultView || e.parentWindow, 
                n.iframe = n.window.frameElement, n.body = e.body, n.selection = new dom.Selection(e), 
                browser.gecko && (t = this.selection.getNative()) && t.removeAllRanges(), this._initEvents();
                for (var o = this.iframe.parentNode; !domUtils.isBody(o); o = o.parentNode) if ("FORM" == o.tagName) {
                    n.form = o, n.options.autoSyncData ? domUtils.on(n.window, "blur", function() {
                        c(o, n);
                    }) : domUtils.on(o, "submit", function() {
                        c(this, n);
                    });
                    break;
                }
                if (i.initialContent) if (i.autoClearinitialContent) {
                    var r = n.execCommand;
                    n.execCommand = function() {
                        n.fireEvent("firstBeforeExecCommand");
                        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                        return r.apply(n, t);
                    }, this._setDefaultContent(i.initialContent);
                } else this.setContent(i.initialContent, !1, !0);
                domUtils.isEmptyNode(n.body) && (n.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>"), 
                i.focus && setTimeout(function() {
                    n.focus(n.options.focusInEnd), !n.options.autoClearinitialContent && n._selectionChange();
                }, 0), n.container || (n.container = this.iframe.parentNode), i.fullscreen && n.ui && n.ui.setFullScreen(!0);
                try {
                    n.document.execCommand("2D-position", !1, !1);
                } catch (e) {}
                try {
                    n.document.execCommand("enableInlineTableEditing", !1, !1);
                } catch (e) {}
                try {
                    n.document.execCommand("enableObjectResizing", !1, !1);
                } catch (e) {}
                n._bindshortcutKeys(), n.isReady = 1, n.fireEvent("ready"), i.onready && i.onready.call(n), 
                browser.ie9below || domUtils.on(n.window, [ "blur", "focus" ], function(e) {
                    if ("blur" == e.type) {
                        n._bakRange = n.selection.getRange();
                        try {
                            n._bakNativeRange = n.selection.getNative().getRangeAt(0), n.selection.getNative().removeAllRanges();
                        } catch (e) {
                            n._bakNativeRange = null;
                        }
                    } else try {
                        n._bakRange && n._bakRange.select();
                    } catch (e) {}
                }), browser.gecko && browser.version <= 10902 && (n.body.contentEditable = !1, setTimeout(function() {
                    n.body.contentEditable = !0;
                }, 100), setInterval(function() {
                    n.body.style.height = n.iframe.offsetHeight - 20 + "px";
                }, 100)), !i.isShow && n.setHide(), i.readonly && n.setDisabled();
            },
            sync: function(e) {
                var t = e ? document.getElementById(e) : domUtils.findParent(this.iframe.parentNode, function(e) {
                    return "FORM" == e.tagName;
                }, !0);
                t && c(t, this);
            },
            setHeight: function(e, t) {
                e !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = e + "px"), 
                !t && (this.options.minFrameHeight = this.options.initialFrameHeight = e), this.body.style.height = e + "px", 
                !t && this.trigger("setHeight");
            },
            addshortcutkey: function(e, t) {
                var i = {};
                t ? i[e] = t : i = e, utils.extend(this.shortcutkeys, i);
            },
            _bindshortcutKeys: function() {
                var d = this, c = this.shortcutkeys;
                d.addListener("keydown", function(e, t) {
                    var i = t.keyCode || t.which;
                    for (var n in c) for (var o, r = c[n].split(","), a = 0; o = r[a++]; ) {
                        var s = (o = o.split(":"))[0], l = o[1];
                        (/^(ctrl)(\+shift)?\+(\d+)$/.test(s.toLowerCase()) || /^(\d+)$/.test(s)) && ("ctrl" == RegExp.$1 && (t.ctrlKey || t.metaKey) && ("" == RegExp.$2 || t[RegExp.$2.slice(1) + "Key"]) && i == RegExp.$3 || i == RegExp.$1) && (-1 != d.queryCommandState(n, l) && d.execCommand(n, l), 
                        domUtils.preventDefault(t));
                    }
                });
            },
            getContent: function(e, t, i, n, o) {
                if (e && utils.isFunction(e) && (t = e, e = ""), t ? !t() : !this.hasContents()) return "";
                this.fireEvent("beforegetcontent");
                var r = UE.htmlparser(this.body.innerHTML, n);
                return this.filterOutputRule(r), this.fireEvent("aftergetcontent", e, r), r.toHtml(o);
            },
            getAllHtml: function() {
                var e = this, t = [];
                if (e.fireEvent("getAllHtml", t), browser.ie && 8 < browser.version) {
                    var i = "";
                    utils.each(e.document.styleSheets, function(e) {
                        i += e.href ? '<link rel="stylesheet" type="text/css" href="' + e.href + '" />' : "<style>" + e.cssText + "</style>";
                    }), utils.each(e.document.getElementsByTagName("script"), function(e) {
                        i += e.outerHTML;
                    });
                }
                return '<html lang="en"><head>' + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>' : "") + (i || e.document.getElementsByTagName("head")[0].innerHTML) + t.join("\n") + "</head><body " + (ie && browser.version < 9 ? 'class="view"' : "") + ">" + e.getContent(null, null, !0) + "</body></html>";
            },
            getPlainTxt: function() {
                var e = new RegExp(domUtils.fillChar, "g"), t = this.body.innerHTML.replace(/[\n\r]/g, "");
                return (t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<[^>/]+>/g, "").replace(/(\n)?<\/([^>]+)>/g, function(e, t, i) {
                    return dtd.$block[i] ? "\n" : t || "";
                })).replace(e, "").replace(/\u00a0/g, " ").replace(/&nbsp;/g, " ");
            },
            getContentTxt: function() {
                var e = new RegExp(domUtils.fillChar, "g");
                return this.body[browser.ie ? "innerText" : "textContent"].replace(e, "").replace(/\u00a0/g, " ");
            },
            setContent: function(e, t, i) {
                var n = this;
                n.fireEvent("beforesetcontent", e);
                var o, r, a = UE.htmlparser(e);
                if (n.filterInputRule(a), e = a.toHtml(), n.body.innerHTML = (t ? n.body.innerHTML : "") + e, 
                "p" == n.options.enterTag) {
                    var s, l = this.body.firstChild;
                    if (!l || 1 == l.nodeType && (dtd.$cdata[l.tagName] || "DIV" == (o = l).tagName && o.getAttribute("cdata_tag") || domUtils.isCustomeNode(l)) && l === this.body.lastChild) this.body.innerHTML = "<p>" + (browser.ie ? "&nbsp;" : "<br/>") + "</p>" + this.body.innerHTML; else for (var d = n.document.createElement("p"); l; ) {
                        for (;l && (3 == l.nodeType || 1 == l.nodeType && dtd.p[l.tagName] && !dtd.$cdata[l.tagName]); ) s = l.nextSibling, 
                        d.appendChild(l), l = s;
                        if (d.firstChild) {
                            if (!l) {
                                n.body.appendChild(d);
                                break;
                            }
                            l.parentNode.insertBefore(d, l), d = n.document.createElement("p");
                        }
                        l = l.nextSibling;
                    }
                }
                n.fireEvent("aftersetcontent"), n.fireEvent("contentchange"), !i && n._selectionChange(), 
                n._bakRange = n._bakIERange = n._bakNativeRange = null, browser.gecko && (r = this.selection.getNative()) && r.removeAllRanges(), 
                n.options.autoSyncData && n.form && c(n.form, n);
            },
            focus: function(e) {
                try {
                    var t = this.selection.getRange();
                    if (e) {
                        (i = this.body.lastChild) && 1 == i.nodeType && !dtd.$empty[i.tagName] && (domUtils.isEmptyBlock(i) ? t.setStartAtFirst(i) : t.setStartAtLast(i), 
                        t.collapse(!0)), t.setCursor(!0);
                    } else {
                        var i;
                        if (!t.collapsed && domUtils.isBody(t.startContainer) && 0 == t.startOffset) (i = this.body.firstChild) && 1 == i.nodeType && !dtd.$empty[i.tagName] && t.setStartAtFirst(i).collapse(!0);
                        t.select(!0);
                    }
                    this.fireEvent("focus selectionchange");
                } catch (e) {}
            },
            isFocus: function() {
                return this.selection.isFocus();
            },
            blur: function() {
                var e = this.selection.getNative();
                if (e.empty && browser.ie) {
                    var t = document.body.createTextRange();
                    t.moveToElementText(document.body), t.collapse(!0), t.select(), e.empty();
                } else e.removeAllRanges();
            },
            _initEvents: function() {
                var t = this, e = t.document, i = t.window;
                t._proxyDomEvent = utils.bind(t._proxyDomEvent, t), domUtils.on(e, [ "click", "contextmenu", "mousedown", "keydown", "keyup", "keypress", "mouseup", "mouseover", "mouseout", "selectstart" ], t._proxyDomEvent), 
                domUtils.on(i, [ "focus", "blur" ], t._proxyDomEvent), domUtils.on(t.body, "drop", function(e) {
                    browser.gecko && e.stopPropagation && e.stopPropagation(), t.fireEvent("contentchange");
                }), domUtils.on(e, [ "mouseup", "keydown" ], function(e) {
                    "keydown" == e.type && (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) || 2 != e.button && t._selectionChange(250, e);
                });
            },
            _proxyDomEvent: function(e) {
                return !1 !== this.fireEvent("before" + e.type.replace(/^on/, "").toLowerCase()) && (!1 !== this.fireEvent(e.type.replace(/^on/, ""), e) && this.fireEvent("after" + e.type.replace(/^on/, "").toLowerCase()));
            },
            _selectionChange: function(e, i) {
                var n, o, r = this, a = !1;
                browser.ie && browser.version < 9 && i && "mouseup" == i.type && (this.selection.getRange().collapsed || (a = !0, 
                n = i.clientX, o = i.clientY));
                clearTimeout(t), t = setTimeout(function() {
                    if (r.selection && r.selection.getNative()) {
                        var t, e;
                        if (a && "None" == r.selection.getNative().type) {
                            t = r.document.body.createTextRange();
                            try {
                                t.moveToPoint(n, o);
                            } catch (e) {
                                t = null;
                            }
                        }
                        t && (e = r.selection.getIERange, r.selection.getIERange = function() {
                            return t;
                        }), r.selection.cache(), e && (r.selection.getIERange = e), r.selection._cachedRange && r.selection._cachedStartElement && (r.fireEvent("beforeselectionchange"), 
                        r.fireEvent("selectionchange", !!i), r.fireEvent("afterselectionchange"), r.selection.clear());
                    }
                }, e || 50);
            },
            _callCmdFn: function(e, t) {
                var i, n, o = t[0].toLowerCase();
                return n = (i = this.commands[o] || UE.commands[o]) && i[e], i && n || "queryCommandState" != e ? n ? n.apply(this, t) : void 0 : 0;
            },
            execCommand: function(e) {
                e = e.toLowerCase();
                var t, i = this, n = i.commands[e] || UE.commands[e];
                return n && n.execCommand ? (n.notNeedUndo || i.__hasEnterExecCommand ? (t = this._callCmdFn("execCommand", arguments), 
                !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i.fireEvent("contentchange")) : (i.__hasEnterExecCommand = !0, 
                -1 != i.queryCommandState.apply(i, arguments) && (i.fireEvent("saveScene"), i.fireEvent.apply(i, _toConsumableArray([ "beforeexeccommand", e ].concat(arguments))), 
                t = this._callCmdFn("execCommand", arguments), i.fireEvent.apply(i, _toConsumableArray([ "afterexeccommand", e ].concat(arguments))), 
                i.fireEvent("saveScene")), i.__hasEnterExecCommand = !1), !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i._selectionChange(), 
                t) : null;
            },
            queryCommandState: function(e) {
                return this._callCmdFn("queryCommandState", arguments);
            },
            queryCommandValue: function(e) {
                return this._callCmdFn("queryCommandValue", arguments);
            },
            hasContents: function(e) {
                if (e) for (var t, i = 0; t = e[i++]; ) if (0 < this.document.getElementsByTagName(t).length) return !0;
                if (!domUtils.isEmptyBlock(this.body)) return !0;
                for (e = [ "div" ], i = 0; t = e[i++]; ) for (var n, o = domUtils.getElementsByTagName(this.document, t), r = 0; n = o[r++]; ) if (domUtils.isCustomeNode(n)) return !0;
                return !1;
            },
            reset: function() {
                this.fireEvent("reset");
            },
            setEnabled: function() {
                var t, i = this;
                if ("false" == i.body.contentEditable) {
                    i.body.contentEditable = !0, t = i.selection.getRange();
                    try {
                        t.moveToBookmark(i.lastBk), delete i.lastBk;
                    } catch (e) {
                        t.setStartAtFirst(i.body).collapse(!0);
                    }
                    t.select(!0), i.bkqueryCommandState && (i.queryCommandState = i.bkqueryCommandState, 
                    delete i.bkqueryCommandState), i.bkqueryCommandValue && (i.queryCommandValue = i.bkqueryCommandValue, 
                    delete i.bkqueryCommandValue), i.fireEvent("selectionchange");
                }
            },
            enable: function() {
                return this.setEnabled();
            },
            setDisabled: function(t) {
                var i = this;
                t = t ? utils.isArray(t) ? t : [ t ] : [], "true" == i.body.contentEditable && (i.lastBk || (i.lastBk = i.selection.getRange().createBookmark(!0)), 
                i.body.contentEditable = !1, i.bkqueryCommandState = i.queryCommandState, i.bkqueryCommandValue = i.queryCommandValue, 
                i.queryCommandState = function(e) {
                    return -1 != utils.indexOf(t, e) ? i.bkqueryCommandState.apply(i, arguments) : -1;
                }, i.queryCommandValue = function(e) {
                    return -1 != utils.indexOf(t, e) ? i.bkqueryCommandValue.apply(i, arguments) : null;
                }, i.fireEvent("selectionchange"));
            },
            disable: function(e) {
                return this.setDisabled(e);
            },
            _setDefaultContent: function() {
                function t() {
                    var e = this;
                    e.document.getElementById("initContent") && (e.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", 
                    e.removeListener("firstBeforeExecCommand focus", t), setTimeout(function() {
                        e.focus(), e._selectionChange();
                    }, 0));
                }
                return function(e) {
                    this.body.innerHTML = '<p id="initContent">' + e + "</p>", this.addListener("firstBeforeExecCommand focus", t);
                };
            }(),
            setShow: function() {
                var t = this, i = t.selection.getRange();
                if ("none" == t.container.style.display) {
                    try {
                        i.moveToBookmark(t.lastBk), delete t.lastBk;
                    } catch (e) {
                        i.setStartAtFirst(t.body).collapse(!0);
                    }
                    setTimeout(function() {
                        i.select(!0);
                    }, 100), t.container.style.display = "";
                }
            },
            show: function() {
                return this.setShow();
            },
            setHide: function() {
                this.lastBk || (this.lastBk = this.selection.getRange().createBookmark(!0)), this.container.style.display = "none";
            },
            hide: function() {
                return this.setHide();
            },
            getLang: function(e) {
                var t = UE.I18N[this.options.lang];
                if (!t) throw Error("not import language file");
                e = (e || "").split(".");
                for (var i, n = 0; (i = e[n++]) && (t = t[i]); ) ;
                return t;
            },
            getContentLength: function(e, t) {
                var i = this.getContent(!1, !1, !0).length;
                if (e) {
                    t = (t || []).concat([ "hr", "img", "iframe" ]), i = this.getContentTxt().replace(/[\t\r\n]+/g, "").length;
                    for (var n, o = 0; n = t[o++]; ) i += this.document.getElementsByTagName(n).length;
                }
                return i;
            },
            addInputRule: function(e) {
                this.inputRules.push(e);
            },
            filterInputRule: function(e) {
                for (var t, i = 0; t = this.inputRules[i++]; ) t.call(this, e);
            },
            addOutputRule: function(e) {
                this.outputRules.push(e);
            },
            filterOutputRule: function(e) {
                for (var t, i = 0; t = this.outputRules[i++]; ) t.call(this, e);
            },
            getActionUrl: function(e) {
                var t = this.getOpt(e) || e, i = this.getOpt("imageUrl"), n = this.getOpt("serverUrl");
                return !n && i && (n = i.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2")), n ? (n = n + (-1 == n.indexOf("?") ? "?" : "&") + "action=" + (t || ""), 
                utils.formatUrl(n)) : "";
            }
        }, utils.inherits(o, EventBase);
    }(), UE.Editor.defaultOptions = function(e) {
        var t = e.options.UEDITOR_HOME_URL;
        return {
            isShow: !0,
            initialContent: "",
            initialStyle: "",
            autoClearinitialContent: !1,
            iframeCssUrl: t + "themes/iframe.css",
            textarea: "editorValue",
            focus: !1,
            focusInEnd: !0,
            autoClearEmptyNode: !0,
            fullscreen: !1,
            readonly: !1,
            zIndex: 999,
            imagePopup: !0,
            enterTag: "p",
            customDomain: !1,
            lang: "zh-cn",
            langPath: t + "lang/",
            theme: "default",
            themePath: t + "themes/",
            allHtmlEnabled: !1,
            scaleEnabled: !1,
            tableNativeEditInFF: !1,
            autoSyncData: !0,
            fileNameFormat: "{time}{rand:6}"
        };
    }, function() {
        UE.Editor.prototype.loadServerConfig = function() {
            var me = this;
            function showErrorMsg(e) {
                console && console.error(e);
            }
            setTimeout(function() {
                try {
                    me.options.imageUrl && me.setOpt("serverUrl", me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, "$1controller$2"));
                    var configUrl = me.getActionUrl("config"), isJsonp = utils.isCrossDomainUrl(configUrl);
                    me._serverConfigLoaded = !1, configUrl && UE.ajax.request(configUrl, {
                        method: "GET",
                        dataType: isJsonp ? "jsonp" : "",
                        onsuccess: function onsuccess(r) {
                            try {
                                var config = isJsonp ? r : eval("(" + r.responseText + ")");
                                utils.extend(me.options, config), me.fireEvent("serverConfigLoaded"), me._serverConfigLoaded = !0;
                            } catch (e) {
                                showErrorMsg(me.getLang("loadconfigFormatError"));
                            }
                        },
                        onerror: function() {
                            showErrorMsg(me.getLang("loadconfigHttpError"));
                        }
                    });
                } catch (e) {
                    showErrorMsg(me.getLang("loadconfigError"));
                }
            });
        }, UE.Editor.prototype.isServerConfigLoaded = function() {
            return this._serverConfigLoaded || !1;
        }, UE.Editor.prototype.afterConfigReady = function(o) {
            if (o && utils.isFunction(o)) {
                var r = this;
                r.isServerConfigLoaded() ? o.call(r, "serverConfigLoaded") : r.addListener("serverConfigLoaded", function e() {
                    for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                    o.apply(r, i), r.removeListener("serverConfigLoaded", e);
                });
            }
        };
    }(), UE.ajax = function() {
        var t = "XMLHttpRequest()";
        try {
            new ActiveXObject("Msxml2.XMLHTTP"), t = "ActiveXObject('Msxml2.XMLHTTP')";
        } catch (e) {
            try {
                new ActiveXObject("Microsoft.XMLHTTP"), t = "ActiveXObject('Microsoft.XMLHTTP')";
            } catch (e) {}
        }
        var c = new Function("return new " + t);
        function v(e) {
            var t = [];
            for (var i in e) if ("method" != i && "timeout" != i && "async" != i && "dataType" != i && "callback" != i && null != e[i] && null != e[i]) if ("function" != _typeof(e[i]).toLowerCase() && "object" != _typeof(e[i]).toLowerCase()) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i])); else if (utils.isArray(e[i])) for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(e[i][n]));
            return t.join("&");
        }
        function n(e, t) {
            var o, r, i, a = t.onsuccess || function() {}, s = document.createElement("SCRIPT"), l = t || {}, n = l.charset, d = l.jsonp || "callback", c = l.timeOut || 0, u = new RegExp("(\\?|&)" + d + "=([^&]*)");
            utils.isFunction(a) ? (o = "bd__editor__" + Math.floor(2147483648 * Math.random()).toString(36), 
            window[o] = g(0)) : utils.isString(a) ? o = a : (i = u.exec(e)) && (o = i[2]), (e = e.replace(u, "$1" + d + "=" + o)).search(u) < 0 && (e += (e.indexOf("?") < 0 ? "?" : "&") + d + "=" + o);
            var m, f, h, p = v(t);
            function g(n) {
                return function() {
                    for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    try {
                        if (n) l.onerror && l.onerror(); else try {
                            clearTimeout(r), a.apply(window, t);
                        } catch (e) {}
                    } catch (e) {
                        l.onerror && l.onerror.call(window, e);
                    } finally {
                        l.oncomplete && l.oncomplete.apply(window, t), s.parentNode && s.parentNode.removeChild(s), 
                        window[o] = null;
                        try {
                            delete window[o];
                        } catch (e) {}
                    }
                };
            }
            utils.isEmptyObject(t.data) || (p += (p ? "&" : "") + v(t.data)), p && (e = e.replace(/\?/, "?" + p + "&")), 
            s.onerror = g(1), c && (r = setTimeout(g(1), c)), f = e, h = n, (m = s).setAttribute("type", "text/javascript"), 
            m.setAttribute("defer", "defer"), h && m.setAttribute("charset", h), m.setAttribute("src", f), 
            document.getElementsByTagName("head")[0].appendChild(m);
        }
        return {
            request: function(e, t) {
                t && "jsonp" == t.dataType ? n(e, t) : function(e, t) {
                    var i = c(), n = !1, o = {
                        method: "POST",
                        timeout: 5e3,
                        async: !0,
                        data: {},
                        onsuccess: function() {},
                        onerror: function() {}
                    };
                    if ("object" === _typeof(e) && (e = (t = e).url), i && e) {
                        var r = t ? utils.extend(o, t) : o, a = v(r);
                        utils.isEmptyObject(r.data) || (a += (a ? "&" : "") + v(r.data));
                        var s = setTimeout(function() {
                            4 != i.readyState && (n = !0, i.abort(), clearTimeout(s));
                        }, r.timeout), l = r.method.toUpperCase(), d = e + (-1 == e.indexOf("?") ? "?" : "&") + ("POST" == l ? "" : a + "&noCache=" + +new Date());
                        i.open(l, d, r.async), i.onreadystatechange = function() {
                            4 == i.readyState && (n || 200 != i.status ? r.onerror(i) : r.onsuccess(i));
                        }, "POST" == l ? (i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                        i.send(a)) : i.send(null);
                    }
                }(e, t);
            },
            getJSONP: function(e, t, i) {
                n(e, {
                    data: t,
                    oncomplete: i
                });
            }
        };
    }();
    var filterWord = UE.filterWord = function() {
        function u(e) {
            return e = e.replace(/[\d.]+\w+/g, function(e) {
                return utils.transUnitToPx(e);
            });
        }
        return function(e) {
            return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/gi.test(e) ? e.replace(/[\t\r\n]+/g, " ").replace(/<!--[\s\S]*?-->/gi, "").replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function(e) {
                if (browser.opera) return "";
                try {
                    if (/Bitmap/i.test(e)) return "";
                    var t = e.match(/width:([ \d.]*p[tx])/i)[1], i = e.match(/height:([ \d.]*p[tx])/i)[1], n = e.match(/src=\s*"([^"]*)"/i)[1];
                    return '<img width="' + u(t) + '" height="' + u(i) + '" src="' + n + '" />';
                } catch (e) {
                    return "";
                }
            }).replace(/<\/?div[^>]*>/g, "").replace(/v:\w+=(["']?)[^'"]+\1/g, "").replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, "").replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, "<p><strong>$1</strong></p>").replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, function(e, t, i, n) {
                return "class" == t && "MsoListParagraph" == n ? e : "";
            }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function(e, t, i) {
                return i.replace(/[\t\r\n ]+/g, " ");
            }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function(e, t, i, n) {
                for (var o, r = [], a = n.replace(/^\s+|\s+$/, "").replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function(e) {
                    return utils.transUnitToPx(e);
                }).split(/;\s*/g), s = 0; o = a[s]; s++) {
                    var l, d, c = o.split(":");
                    if (2 == c.length) {
                        if (l = c[0].toLowerCase(), d = c[1].toLowerCase(), /^(background)\w*/.test(l) && 0 == d.replace(/(initial|\s)/g, "").length || /^(margin)\w*/.test(l) && /^0\w+$/.test(d)) continue;
                        switch (l) {
                          case "mso-padding-alt":
                          case "mso-padding-top-alt":
                          case "mso-padding-right-alt":
                          case "mso-padding-bottom-alt":
                          case "mso-padding-left-alt":
                          case "mso-margin-alt":
                          case "mso-margin-top-alt":
                          case "mso-margin-right-alt":
                          case "mso-margin-bottom-alt":
                          case "mso-margin-left-alt":
                          case "mso-height":
                          case "mso-width":
                          case "mso-vertical-align-alt":
                            /<table/.test(t) || (r[s] = l.replace(/^mso-|-alt$/g, "") + ":" + u(d));
                            continue;

                          case "horiz-align":
                            r[s] = "text-align:" + d;
                            continue;

                          case "vert-align":
                            r[s] = "vertical-align:" + d;
                            continue;

                          case "font-color":
                          case "mso-foreground":
                            r[s] = "color:" + d;
                            continue;

                          case "mso-background":
                          case "mso-highlight":
                            r[s] = "background:" + d;
                            continue;

                          case "mso-default-height":
                            r[s] = "min-height:" + u(d);
                            continue;

                          case "mso-default-width":
                            r[s] = "min-width:" + u(d);
                            continue;

                          case "mso-padding-between-alt":
                            r[s] = "border-collapse:separate;border-spacing:" + u(d);
                            continue;

                          case "text-line-through":
                            "single" != d && "double" != d || (r[s] = "text-decoration:line-through");
                            continue;

                          case "mso-zero-height":
                            "yes" == d && (r[s] = "display:none");
                            continue;

                          case "margin":
                            if (!/[1-9]/.test(d)) continue;
                        }
                        if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(l) || /text\-indent|padding|margin/.test(l) && /\-[\d.]+/.test(d)) continue;
                        r[s] = l + ":" + c[1];
                    }
                }
                return t + (r.length ? ' style="' + r.join(";").replace(/;{2,}/g, ";") + '"' : "");
            }) : e;
        };
    }();
    !function() {
        var o = UE.uNode = function(e) {
            this.type = e.type, this.data = e.data, this.tagName = e.tagName, this.parentNode = e.parentNode, 
            this.attrs = e.attrs || {}, this.children = e.children;
        }, d = {
            href: 1,
            src: 1,
            _src: 1,
            _href: 1,
            cdata_data: 1
        }, c = {
            style: 1,
            script: 1
        }, n = "    ", r = "\n";
        function u(e, t, i) {
            return e.push(r), t + (i ? 1 : -1);
        }
        function m(e, t) {
            for (var i = 0; i < t; i++) e.push(n);
        }
        function f(e, t, i, n) {
            switch (e.type) {
              case "root":
                for (var o, r = 0; o = e.children[r++]; ) i && "element" == o.type && !dtd.$inlineWithA[o.tagName] && 1 < r && (u(t, n, !0), 
                m(t, n)), f(o, t, i, n);
                break;

              case "text":
                l = t, "pre" == (s = e).parentNode.tagName ? l.push(s.data) : l.push(c[s.parentNode.tagName] ? utils.html(s.data) : s.data.replace(/[ ]{2}/g, " &nbsp;"));
                break;

              case "element":
                !function(e, t, i, n) {
                    var o = "";
                    if (e.attrs) {
                        o = [];
                        var r = e.attrs;
                        for (var a in r) o.push(a + (void 0 !== r[a] ? '="' + (d[a] ? utils.html(r[a]).replace(/["]/g, function(e) {
                            return "&quot;";
                        }) : utils.unhtml(r[a])) + '"' : ""));
                        o = o.join(" ");
                    }
                    t.push("<" + e.tagName + (o ? " " + o : "") + (dtd.$empty[e.tagName] ? "/" : "") + ">"), 
                    i && !dtd.$inlineWithA[e.tagName] && "pre" != e.tagName && e.children && e.children.length && (n = u(t, n, !0), 
                    m(t, n));
                    if (e.children && e.children.length) for (var s, l = 0; s = e.children[l++]; ) i && "element" == s.type && !dtd.$inlineWithA[s.tagName] && 1 < l && (u(t, n), 
                    m(t, n)), f(s, t, i, n);
                    dtd.$empty[e.tagName] || (i && !dtd.$inlineWithA[e.tagName] && "pre" != e.tagName && e.children && e.children.length && (n = u(t, n), 
                    m(t, n)), t.push("</" + e.tagName + ">"));
                }(e, t, i, n);
                break;

              case "comment":
                a = e, t.push("\x3c!--" + a.data + "--\x3e");
            }
            var a, s, l;
            return t;
        }
        function a(e, t) {
            var i;
            if ("element" == e.type && e.getAttr("id") == t) return e;
            if (e.children && e.children.length) for (var n, o = 0; n = e.children[o++]; ) if (i = a(n, t)) return i;
        }
        function s(e, t, i) {
            if ("element" == e.type && e.tagName == t && i.push(e), e.children && e.children.length) for (var n, o = 0; n = e.children[o++]; ) s(n, t, i);
        }
        o.createElement = function(e) {
            return /[<>]/.test(e) ? UE.htmlparser(e).children[0] : new o({
                type: "element",
                children: [],
                tagName: e
            });
        }, o.createText = function(e, t) {
            return new UE.uNode({
                type: "text",
                data: t ? e : utils.unhtml(e || "")
            });
        }, o.prototype = {
            toHtml: function(e) {
                var t = [];
                return f(this, t, e, 0), t.join("");
            },
            innerHTML: function(e) {
                if ("element" != this.type || dtd.$empty[this.tagName]) return this;
                if (utils.isString(e)) {
                    if (this.children) for (var t = 0; i = this.children[t++]; ) i.parentNode = null;
                    this.children = [];
                    var i, n = UE.htmlparser(e);
                    for (t = 0; i = n.children[t++]; ) this.children.push(i), i.parentNode = this;
                    return this;
                }
                return (n = new UE.uNode({
                    type: "root",
                    children: this.children
                })).toHtml();
            },
            innerText: function(e, t) {
                if ("element" != this.type || dtd.$empty[this.tagName]) return this;
                if (e) {
                    if (this.children) for (var i, n = 0; i = this.children[n++]; ) i.parentNode = null;
                    return this.children = [], this.appendChild(o.createText(e, t)), this;
                }
                return this.toHtml().replace(/<[^>]+>/g, "");
            },
            getData: function() {
                return "element" == this.type ? "" : this.data;
            },
            firstChild: function() {
                return this.children ? this.children[0] : null;
            },
            lastChild: function() {
                return this.children ? this.children[this.children.length - 1] : null;
            },
            previousSibling: function() {
                for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) if (e === this) return 0 == i ? null : t.children[i - 1];
            },
            nextSibling: function() {
                for (var e, t = this.parentNode, i = 0; e = t.children[i++]; ) if (e === this) return t.children[i];
            },
            replaceChild: function(e, t) {
                if (this.children) {
                    e.parentNode && e.parentNode.removeChild(e);
                    for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 1, e), 
                    t.parentNode = null, e.parentNode = this, e;
                }
            },
            appendChild: function(e) {
                if ("root" == this.type || "element" == this.type && !dtd.$empty[this.tagName]) {
                    this.children || (this.children = []), e.parentNode && e.parentNode.removeChild(e);
                    for (var t, i = 0; t = this.children[i]; i++) if (t === e) {
                        this.children.splice(i, 1);
                        break;
                    }
                    return this.children.push(e), e.parentNode = this, e;
                }
            },
            insertBefore: function(e, t) {
                if (this.children) {
                    e.parentNode && e.parentNode.removeChild(e);
                    for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n, 0, e), 
                    e.parentNode = this, e;
                }
            },
            insertAfter: function(e, t) {
                if (this.children) {
                    e.parentNode && e.parentNode.removeChild(e);
                    for (var i, n = 0; i = this.children[n]; n++) if (i === t) return this.children.splice(n + 1, 0, e), 
                    e.parentNode = this, e;
                }
            },
            removeChild: function(e, t) {
                if (this.children) for (var i, n = 0; i = this.children[n]; n++) if (i === e) {
                    if (this.children.splice(n, 1), i.parentNode = null, t && i.children && i.children.length) for (var o, r = 0; o = i.children[r]; r++) this.children.splice(n + r, 0, o), 
                    o.parentNode = this;
                    return i;
                }
            },
            getAttr: function(e) {
                return this.attrs && this.attrs[e.toLowerCase()];
            },
            setAttr: function(e, t) {
                if (e) if (this.attrs || (this.attrs = {}), utils.isObject(e)) for (var i in e) e[i] ? this.attrs[i.toLowerCase()] = e[i] : delete this.attrs[i]; else t ? this.attrs[e.toLowerCase()] = t : delete this.attrs[e]; else delete this.attrs;
            },
            getIndex: function() {
                for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) if (e === this) return i;
                return -1;
            },
            getNodeById: function(e) {
                var t;
                if (this.children && this.children.length) for (var i, n = 0; i = this.children[n++]; ) if (t = a(i, e)) return t;
            },
            getNodesByTagName: function(e) {
                e = utils.trim(e).replace(/[ ]{2,}/g, " ").split(" ");
                var n = [], o = this;
                return utils.each(e, function(e) {
                    if (o.children && o.children.length) for (var t, i = 0; t = o.children[i++]; ) s(t, e, n);
                }), n;
            },
            getStyle: function(e) {
                var t = this.getAttr("style");
                if (!t) return "";
                var i = new RegExp("(^|;)\\s*" + e + ":([^;]+)", "i"), n = t.match(i);
                return n && n[0] ? n[2] : "";
            },
            setStyle: function(e, t) {
                function i(e, t) {
                    var i = new RegExp("(^|;)\\s*" + e + ":([^;]+;?)", "gi");
                    n = n.replace(i, "$1"), t && (n = e + ":" + utils.unhtml(t) + ";" + n);
                }
                var n = this.getAttr("style");
                if (n || (n = ""), utils.isObject(e)) for (var o in e) i(o, e[o]); else i(e, t);
                this.setAttr("style", utils.trim(n));
            },
            traversal: function(e) {
                return this.children && this.children.length && function e(t, i) {
                    if (t.children && t.children.length) for (var n, o = 0; n = t.children[o]; ) e(n, i), 
                    n.parentNode && (n.children && n.children.length && i(n), n.parentNode && o++); else i(t);
                }(this, e), this;
            }
        };
    }();
    var htmlparser = UE.htmlparser = function(e, i) {
        var t = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g, d = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, n = {
            b: 1,
            code: 1,
            i: 1,
            u: 1,
            strike: 1,
            s: 1,
            tt: 1,
            strong: 1,
            q: 1,
            samp: 1,
            em: 1,
            span: 1,
            sub: 1,
            img: 1,
            sup: 1,
            font: 1,
            big: 1,
            small: 1,
            iframe: 1,
            a: 1,
            br: 1,
            pre: 1
        };
        e = e.replace(new RegExp(domUtils.fillChar, "g"), ""), i || (e = e.replace(new RegExp("[\\r\\t\\n" + (i ? "" : " ") + "]*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n" + (i ? "" : " ") + "]*", "g"), function(e, t) {
            return t && n[t.toLowerCase()] ? e.replace(/(^[\n\r]+)|([\n\r]+$)/g, "") : e.replace(new RegExp("^[\\r\\n" + (i ? "" : " ") + "]+"), "").replace(new RegExp("[\\r\\n" + (i ? "" : " ") + "]+$"), "");
        }));
        var o, c = {
            href: 1,
            src: 1
        }, u = UE.uNode, m = {
            td: "tr",
            tr: [ "tbody", "thead", "tfoot" ],
            tbody: "table",
            th: "tr",
            thead: "table",
            tfoot: "table",
            caption: "table",
            li: [ "ul", "ol" ],
            dt: "dl",
            dd: "dl",
            option: "select"
        }, r = {
            ol: "li",
            ul: "li"
        };
        function a(e, t) {
            if (r[e.tagName]) {
                var i = u.createElement(r[e.tagName]);
                e.appendChild(i), i.appendChild(u.createText(t)), e = i;
            } else e.appendChild(u.createText(t));
        }
        function f(e, t, i) {
            var n;
            if (n = m[t]) {
                for (var o, r = e; "root" != r.type; ) {
                    if (utils.isArray(n) ? -1 != utils.indexOf(n, r.tagName) : n == r.tagName) {
                        e = r, o = !0;
                        break;
                    }
                    r = r.parentNode;
                }
                o || (e = f(e, utils.isArray(n) ? n[0] : n));
            }
            var a = new u({
                parentNode: e,
                type: "element",
                tagName: t.toLowerCase(),
                children: dtd.$empty[t] ? null : []
            });
            if (i) {
                for (var s, l = {}; s = d.exec(i); ) l[s[1].toLowerCase()] = c[s[1].toLowerCase()] ? s[2] || s[3] || s[4] : utils.unhtml(s[2] || s[3] || s[4]);
                a.attrs = l;
            }
            return e.children.push(a), dtd.$empty[t] ? e : a;
        }
        for (var s, l, h = 0, p = 0, g = new u({
            type: "root",
            children: []
        }), v = g; o = t.exec(e); ) {
            h = o.index;
            try {
                if (p < h && a(v, e.slice(p, h)), o[3]) dtd.$cdata[v.tagName] ? a(v, o[0]) : v = f(v, o[3].toLowerCase(), o[4]); else if (o[1]) {
                    if ("root" != v.type) if (dtd.$cdata[v.tagName] && !dtd.$cdata[o[1]]) a(v, o[0]); else {
                        for (var b = v; "element" == v.type && v.tagName != o[1].toLowerCase(); ) if ("root" == (v = v.parentNode).type) throw v = b, 
                        "break";
                        v = v.parentNode;
                    }
                } else o[2] && (s = v, l = o[2], s.children.push(new u({
                    type: "comment",
                    data: l,
                    parentNode: s
                })));
            } catch (e) {}
            p = t.lastIndex;
        }
        return p < e.length && a(v, e.slice(p)), g;
    }, filterNode = UE.filterNode = function() {
        function m(i, e) {
            switch (i.type) {
              case "text":
                break;

              case "element":
                var t;
                if (t = e[i.tagName]) if ("-" === t) i.parentNode.removeChild(i); else if (utils.isFunction(t)) {
                    var n = i.parentNode, o = i.getIndex();
                    if (t(i), i.parentNode) {
                        if (i.children) for (var r = 0; u = i.children[r]; ) m(u, e), u.parentNode && r++;
                    } else for (r = o; u = n.children[r]; ) m(u, e), u.parentNode && r++;
                } else {
                    var a = t.$;
                    if (a && i.attrs) {
                        var s, l = {};
                        for (var d in a) {
                            if (s = i.getAttr(d), "style" == d && utils.isArray(a[d])) {
                                var c = [];
                                utils.each(a[d], function(e) {
                                    var t;
                                    (t = i.getStyle(e)) && c.push(e + ":" + t);
                                }), s = c.join(";");
                            }
                            s && (l[d] = s);
                        }
                        i.attrs = l;
                    }
                    if (i.children) for (r = 0; u = i.children[r]; ) m(u, e), u.parentNode && r++;
                } else if (dtd.$cdata[i.tagName]) i.parentNode.removeChild(i); else {
                    n = i.parentNode, o = i.getIndex();
                    i.parentNode.removeChild(i, !0);
                    var u;
                    for (r = o; u = n.children[r]; ) m(u, e), u.parentNode && r++;
                }
                break;

              case "comment":
                i.parentNode.removeChild(i);
            }
        }
        return function(e, t) {
            if (utils.isEmptyObject(t)) return e;
            var i;
            (i = t["-"]) && utils.each(i.split(" "), function(e) {
                t[e] = "-";
            });
            for (var n, o = 0; n = e.children[o]; ) m(n, t), n.parentNode && o++;
            return e;
        };
    }(), fA;
    UE.plugin = (fA = {}, {
        register: function(e, t, i, n) {
            i && utils.isFunction(i) && (n = i, i = null), fA[e] = {
                optionName: i || e,
                execFn: t,
                afterDisabled: n
            };
        },
        load: function(i) {
            utils.each(fA, function(e) {
                var t = e.execFn.call(i);
                !1 !== i.options[e.optionName] ? t && utils.each(t, function(e, t) {
                    switch (t.toLowerCase()) {
                      case "shortcutkey":
                        i.addshortcutkey(e);
                        break;

                      case "bindevents":
                        utils.each(e, function(e, t) {
                            i.addListener(t, e);
                        });
                        break;

                      case "bindmultievents":
                        utils.each(utils.isArray(e) ? e : [ e ], function(t) {
                            var e = utils.trim(t.type).split(/\s+/);
                            utils.each(e, function(e) {
                                i.addListener(e, t.handler);
                            });
                        });
                        break;

                      case "commands":
                        utils.each(e, function(e, t) {
                            i.commands[t] = e;
                        });
                        break;

                      case "outputrule":
                        i.addOutputRule(e);
                        break;

                      case "inputrule":
                        i.addInputRule(e);
                        break;

                      case "defaultoptions":
                        i.setOpt(e);
                    }
                }) : e.afterDisabled && e.afterDisabled.call(i);
            }), utils.each(UE.plugins, function(e) {
                e.call(i);
            });
        },
        run: function(e, t) {
            var i = fA[e];
            i && i.exeFn.call(t);
        }
    });
    var keymap = UE.keymap = {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Shift: 16,
        Control: 17,
        Alt: 18,
        CapsLock: 20,
        Esc: 27,
        Spacebar: 32,
        PageUp: 33,
        PageDown: 34,
        End: 35,
        Home: 36,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Insert: 45,
        Del: 46,
        NumLock: 144,
        Cmd: 91,
        "=": 187,
        "-": 189,
        b: 66,
        i: 73,
        z: 90,
        y: 89,
        v: 86,
        x: 88,
        s: 83,
        n: 78
    }, LocalStorage = UE.LocalStorage = (DA = window.localStorage || ((NA = document.createElement("div")).style.display = "none", 
    NA.addBehavior ? (NA.addBehavior("#default#userdata"), {
        getItem: function(e) {
            var t = null;
            try {
                document.body.appendChild(NA), NA.load(EA), t = NA.getAttribute(e), document.body.removeChild(NA);
            } catch (e) {}
            return t;
        },
        setItem: function(e, t) {
            document.body.appendChild(NA), NA.setAttribute(e, t), NA.save(EA), document.body.removeChild(NA);
        },
        removeItem: function(e) {
            document.body.appendChild(NA), NA.removeAttribute(e), NA.save(EA), document.body.removeChild(NA);
        }
    }) : null) || null, EA = "localStorage", {
        saveLocalData: function(e, t) {
            return !(!DA || !t || (DA.setItem(e, t), 0));
        },
        getLocalData: function(e) {
            return DA ? DA.getItem(e) : null;
        },
        removeItem: function(e) {
            DA && DA.removeItem(e);
        }
    }), NA, DA, EA, XA, EI, FI, kT, LY;
    XA = "ueditor_preference", UE.Editor.prototype.setPreferences = function(e, t) {
        var i = {};
        utils.isString(e) ? i[e] = t : i = e;
        var n = LocalStorage.getLocalData(XA);
        n && (n = utils.str2json(n)) ? utils.extend(n, i) : n = i, n && LocalStorage.saveLocalData(XA, utils.json2str(n));
    }, UE.Editor.prototype.getPreferences = function(e) {
        var t = LocalStorage.getLocalData(XA);
        return t && (t = utils.str2json(t)) ? e ? t[e] : t : null;
    }, UE.Editor.prototype.removePreferences = function(e) {
        var t = LocalStorage.getLocalData(XA);
        t && (t = utils.str2json(t)) && (t[e] = void 0, delete t[e]), t && LocalStorage.saveLocalData(XA, utils.json2str(t));
    }, UE.plugins.defaultfilter = function() {
        var s = this;
        s.setOpt({
            allowDivTransToP: !0,
            disabledTableInTable: !0,
            rgb2Hex: !0
        }), s.addInputRule(function(e) {
            var r, a = this.options.allowDivTransToP;
            e.traversal(function(o) {
                if ("element" == o.type) {
                    if (!dtd.$cdata[o.tagName] && s.options.autoClearEmptyNode && dtd.$inline[o.tagName] && !dtd.$empty[o.tagName] && (!o.attrs || utils.isEmptyObject(o.attrs))) return void (o.firstChild() ? "span" != o.tagName || o.attrs && !utils.isEmptyObject(o.attrs) || o.parentNode.removeChild(o, !0) : o.parentNode.removeChild(o));
                    switch (o.tagName) {
                      case "style":
                      case "script":
                        o.setAttr({
                            cdata_tag: o.tagName,
                            cdata_data: o.innerHTML() || "",
                            _ue_custom_node_: "true"
                        }), o.tagName = "div", o.innerHTML("");
                        break;

                      case "a":
                        (r = o.getAttr("href")) && o.setAttr("_href", r);
                        break;

                      case "img":
                        if ((r = o.getAttr("src")) && /^data:/.test(r)) {
                            o.parentNode.removeChild(o);
                            break;
                        }
                        o.setAttr("_src", o.getAttr("src"));
                        break;

                      case "span":
                        browser.webkit && (r = o.getStyle("white-space")) && /nowrap|normal/.test(r) && (o.setStyle("white-space", ""), 
                        s.options.autoClearEmptyNode && utils.isEmptyObject(o.attrs) && o.parentNode.removeChild(o, !0)), 
                        (r = o.getAttr("id")) && /^_baidu_bookmark_/i.test(r) && o.parentNode.removeChild(o);
                        break;

                      case "p":
                        (r = o.getAttr("align")) && (o.setAttr("align"), o.setStyle("text-align", r)), utils.each(o.children, function(e) {
                            if ("element" == e.type && "p" == e.tagName) {
                                var t = e.nextSibling();
                                o.parentNode.insertAfter(e, o);
                                for (var i = e; t; ) {
                                    var n = t.nextSibling();
                                    o.parentNode.insertAfter(t, i), i = t, t = n;
                                }
                                return !1;
                            }
                        }), o.firstChild() || o.innerHTML(browser.ie ? "&nbsp;" : "<br/>");
                        break;

                      case "div":
                        if (o.getAttr("cdata_tag")) break;
                        if ((r = o.getAttr("class")) && /^line number\d+/.test(r)) break;
                        if (!a) break;
                        for (var e, t = UE.uNode.createElement("p"); e = o.firstChild(); ) "text" != e.type && UE.dom.dtd.$block[e.tagName] ? t.firstChild() ? (o.parentNode.insertBefore(t, o), 
                        t = UE.uNode.createElement("p")) : o.parentNode.insertBefore(e, o) : t.appendChild(e);
                        t.firstChild() && o.parentNode.insertBefore(t, o), o.parentNode.removeChild(o);
                        break;

                      case "dl":
                        o.tagName = "ul";
                        break;

                      case "dt":
                      case "dd":
                        o.tagName = "li";
                        break;

                      case "li":
                        var i = o.getAttr("class");
                        i && /list\-/.test(i) || o.setAttr();
                        var n = o.getNodesByTagName("ol ul");
                        UE.utils.each(n, function(e) {
                            o.parentNode.insertAfter(e, o);
                        });
                        break;

                      case "td":
                      case "th":
                      case "caption":
                        o.children && o.children.length || o.appendChild(browser.ie11below ? UE.uNode.createText(" ") : UE.uNode.createElement("br"));
                        break;

                      case "table":
                        s.options.disabledTableInTable && function(e) {
                            for (;e && "element" == e.type; ) {
                                if ("td" == e.tagName) return !0;
                                e = e.parentNode;
                            }
                            return !1;
                        }(o) && (o.parentNode.insertBefore(UE.uNode.createText(o.innerText()), o), o.parentNode.removeChild(o));
                    }
                }
            });
        }), s.addOutputRule(function(e) {
            var i;
            e.traversal(function(e) {
                if ("element" == e.type) {
                    if (s.options.autoClearEmptyNode && dtd.$inline[e.tagName] && !dtd.$empty[e.tagName] && (!e.attrs || utils.isEmptyObject(e.attrs))) return void (e.firstChild() ? "span" != e.tagName || e.attrs && !utils.isEmptyObject(e.attrs) || e.parentNode.removeChild(e, !0) : e.parentNode.removeChild(e));
                    switch (e.tagName) {
                      case "div":
                        (i = e.getAttr("cdata_tag")) && (e.tagName = i, e.appendChild(UE.uNode.createText(e.getAttr("cdata_data"))), 
                        e.setAttr({
                            cdata_tag: "",
                            cdata_data: "",
                            _ue_custom_node_: ""
                        }));
                        break;

                      case "a":
                        (i = e.getAttr("_href")) && e.setAttr({
                            href: utils.html(i),
                            _href: ""
                        });
                        break;

                      case "span":
                        if ((i = e.getAttr("id")) && /^_baidu_bookmark_/i.test(i) && e.parentNode.removeChild(e), 
                        s.getOpt("rgb2Hex")) {
                            var t = e.getAttr("style");
                            t && e.setAttr("style", t.replace(/rgba?\(([\d,\s]+)\)/g, function(e, t) {
                                var i = t.split(",");
                                if (3 < i.length) return "";
                                t = "#";
                                for (var n, o = 0; n = i[o++]; ) t += 1 == (n = parseInt(n.replace(/[^\d]/gi, ""), 10).toString(16)).length ? "0" + n : n;
                                return t.toUpperCase();
                            }));
                        }
                        break;

                      case "img":
                        (i = e.getAttr("_src")) && e.setAttr({
                            src: e.getAttr("_src"),
                            _src: ""
                        });
                    }
                }
            });
        });
    }, UE.commands.inserthtml = {
        execCommand: function(e, t, i) {
            var n, o, r = this;
            if (t && !0 !== r.fireEvent("beforeinserthtml", t)) {
                if ((o = (n = r.selection.getRange()).document.createElement("div")).style.display = "inline", 
                !i) {
                    var a = UE.htmlparser(t);
                    r.options.filterRules && UE.filterNode(a, r.options.filterRules), r.filterInputRule(a), 
                    t = a.toHtml();
                }
                if (o.innerHTML = utils.trim(t), !n.collapsed) {
                    var s = n.startContainer;
                    if (domUtils.isFillChar(s) && n.setStartBefore(s), s = n.endContainer, domUtils.isFillChar(s) && n.setEndAfter(s), 
                    n.txtToElmBoundary(), n.endContainer && 1 == n.endContainer.nodeType && (s = n.endContainer.childNodes[n.endOffset]) && domUtils.isBr(s) && n.setEndAfter(s), 
                    0 == n.startOffset && (s = n.startContainer, domUtils.isBoundaryNode(s, "firstChild") && (s = n.endContainer, 
                    n.endOffset == (3 == s.nodeType ? s.nodeValue.length : s.childNodes.length) && domUtils.isBoundaryNode(s, "lastChild") && (r.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", 
                    n.setStart(r.body.firstChild, 0).collapse(!0)))), !n.collapsed && n.deleteContents(), 
                    1 == n.startContainer.nodeType) if ((l = n.startContainer.childNodes[n.startOffset]) && domUtils.isBlockElm(l) && (v = l.previousSibling) && domUtils.isBlockElm(v)) {
                        for (n.setEnd(v, v.childNodes.length).collapse(); l.firstChild; ) v.appendChild(l.firstChild);
                        domUtils.remove(l);
                    }
                }
                var l, d, c, u, m = 0;
                n.inFillChar() && (l = n.startContainer, domUtils.isFillChar(l) ? (n.setStartBefore(l).collapse(!0), 
                domUtils.remove(l)) : domUtils.isFillChar(l, !0) && (l.nodeValue = l.nodeValue.replace(fillCharReg, ""), 
                n.startOffset--, n.collapsed && n.collapse(!0)));
                var f = domUtils.findParentByTagName(n.startContainer, "li", !0);
                if (f) {
                    for (var h; l = o.firstChild; ) {
                        for (;l && (3 == l.nodeType || !domUtils.isBlockElm(l) || "HR" == l.tagName); ) b = l.nextSibling, 
                        n.insertNode(l).collapse(), h = l, l = b;
                        if (l) if (/^(ol|ul)$/i.test(l.tagName)) {
                            for (;l.firstChild; ) h = l.firstChild, domUtils.insertAfter(f, l.firstChild), f = f.nextSibling;
                            domUtils.remove(l);
                        } else {
                            var p;
                            b = l.nextSibling, p = r.document.createElement("li"), domUtils.insertAfter(f, p), 
                            p.appendChild(l), h = l, l = b, f = p;
                        }
                    }
                    f = domUtils.findParentByTagName(n.startContainer, "li", !0), domUtils.isEmptyBlock(f) && domUtils.remove(f), 
                    h && n.setStartAfter(h).collapse(!0).select(!0);
                } else {
                    for (;l = o.firstChild; ) {
                        if (m) {
                            for (var g = r.document.createElement("p"); l && (3 == l.nodeType || !dtd.$block[l.tagName]); ) u = l.nextSibling, 
                            g.appendChild(l), l = u;
                            g.firstChild && (l = g);
                        }
                        if (n.insertNode(l), u = l.nextSibling, !m && l.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm(l) && (d = domUtils.findParent(l, function(e) {
                            return domUtils.isBlockElm(e);
                        })) && "body" != d.tagName.toLowerCase() && (!dtd[d.tagName][l.nodeName] || l.parentNode !== d)) {
                            if (dtd[d.tagName][l.nodeName]) for (c = l.parentNode; c !== d; ) c = (v = c).parentNode; else v = d;
                            domUtils.breakParent(l, v || c);
                            var v = l.previousSibling;
                            domUtils.trimWhiteTextNode(v), v.childNodes.length || domUtils.remove(v), !browser.ie && (b = l.nextSibling) && domUtils.isBlockElm(b) && b.lastChild && !domUtils.isBr(b.lastChild) && b.appendChild(r.document.createElement("br")), 
                            m = 1;
                        }
                        var b = l.nextSibling;
                        if (!o.firstChild && b && domUtils.isBlockElm(b)) {
                            n.setStart(b, 0).collapse(!0);
                            break;
                        }
                        n.setEndAfter(l).collapse();
                    }
                    if (l = n.startContainer, u && domUtils.isBr(u) && domUtils.remove(u), domUtils.isBlockElm(l) && domUtils.isEmptyNode(l)) if (u = l.nextSibling) domUtils.remove(l), 
                    1 == u.nodeType && dtd.$block[u.tagName] && n.setStart(u, 0).collapse(!0).shrinkBoundary(); else try {
                        l.innerHTML = browser.ie ? domUtils.fillChar : "<br/>";
                    } catch (e) {
                        n.setStartBefore(l), domUtils.remove(l);
                    }
                    try {
                        n.select(!0);
                    } catch (e) {}
                }
                setTimeout(function() {
                    (n = r.selection.getRange()).scrollToView(r.autoHeightEnabled, r.autoHeightEnabled ? domUtils.getXY(r.iframe).y : 0), 
                    r.fireEvent("afterinserthtml", t);
                }, 200);
            }
        }
    }, UE.plugins.autotypeset = function() {
        this.setOpt({
            autotypeset: {
                mergeEmptyline: !0,
                removeClass: !0,
                removeEmptyline: !1,
                textAlign: "left",
                imageBlockLine: "center",
                pasteFilter: !1,
                clearFontSize: !1,
                clearFontFamily: !1,
                removeEmptyNode: !1,
                removeTagNames: utils.extend({
                    div: 1
                }, dtd.$removeEmpty),
                indent: !1,
                indentValue: "2em",
                bdc2sb: !1,
                tobdc: !1
            }
        });
        var p, e, t = this, g = t.options.autotypeset, v = {
            selectTdClass: 1,
            pagebreak: 1,
            anchorclass: 1
        }, b = {
            li: 1
        }, i = {
            div: 1,
            p: 1,
            blockquote: 1,
            center: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            span: 1
        };
        g && (e = t.getPreferences("autotypeset"), utils.extend(t.options.autotypeset, e), 
        g.pasteFilter && t.addListener("beforepaste", n), t.commands.autotypeset = {
            execCommand: function() {
                t.removeListener("beforepaste", n), g.pasteFilter && t.addListener("beforepaste", n), 
                n.call(t);
            }
        });
        function y(e, t) {
            return e && 3 != e.nodeType ? domUtils.isBr(e) ? 1 : e && e.parentNode && i[e.tagName.toLowerCase()] ? p && p.contains(e) || e.getAttribute("pagebreak") ? 0 : t ? !domUtils.isEmptyBlock(e) : domUtils.isEmptyBlock(e, new RegExp("[\\s" + domUtils.fillChar + "]", "g")) : void 0 : 0;
        }
        function C(e) {
            e.style.cssText || (domUtils.removeAttributes(e, [ "style" ]), "span" == e.tagName.toLowerCase() && domUtils.hasNoAttributes(e) && domUtils.remove(e, !0));
        }
        function n(e, t) {
            var i, n = this;
            if (t) {
                if (!g.pasteFilter) return;
                (i = n.document.createElement("div")).innerHTML = t.html;
            } else i = n.document.body;
            for (var o, r, a = domUtils.getElementsByTagName(i, "*"), s = 0; o = a[s++]; ) if (!0 !== n.fireEvent("excludeNodeinautotype", o)) {
                if (g.clearFontSize && o.style.fontSize && (domUtils.removeStyle(o, "font-size"), 
                C(o)), g.clearFontFamily && o.style.fontFamily && (domUtils.removeStyle(o, "font-family"), 
                C(o)), y(o)) {
                    if (g.mergeEmptyline) for (var l = o.nextSibling, d = domUtils.isBr(o); y(l) && (l = (u = l).nextSibling, 
                    !d || l && (!l || domUtils.isBr(l))); ) domUtils.remove(u);
                    if (g.removeEmptyline && domUtils.inDoc(o, i) && !b[o.parentNode.tagName.toLowerCase()]) {
                        if (domUtils.isBr(o) && (l = o.nextSibling) && !domUtils.isBr(l)) continue;
                        domUtils.remove(o);
                        continue;
                    }
                }
                if (y(o, !0) && "SPAN" != o.tagName && (g.indent && (o.style.textIndent = g.indentValue), 
                g.textAlign && (o.style.textAlign = g.textAlign)), g.removeClass && o.className && !v[o.className.toLowerCase()]) {
                    if (p && p.contains(o)) continue;
                    domUtils.removeAttributes(o, [ "class" ]);
                }
                if (g.imageBlockLine && "img" == o.tagName.toLowerCase() && !o.getAttribute("emotion")) if (t) {
                    var c = o;
                    switch (g.imageBlockLine) {
                      case "left":
                      case "right":
                      case "none":
                        for (var u, m, f = c.parentNode; dtd.$inline[f.tagName] || "A" == f.tagName; ) f = f.parentNode;
                        if ("P" == (u = f).tagName && "center" == domUtils.getStyle(u, "text-align") && !domUtils.isBody(u) && 1 == domUtils.getChildCount(u, function(e) {
                            return !domUtils.isBr(e) && !domUtils.isWhitespace(e);
                        })) if (m = u.previousSibling, l = u.nextSibling, m && l && 1 == m.nodeType && 1 == l.nodeType && m.tagName == l.tagName && domUtils.isBlockElm(m)) {
                            for (m.appendChild(u.firstChild); l.firstChild; ) m.appendChild(l.firstChild);
                            domUtils.remove(u), domUtils.remove(l);
                        } else domUtils.setStyle(u, "text-align", "");
                        domUtils.setStyle(c, "float", g.imageBlockLine);
                        break;

                      case "center":
                        if ("center" != n.queryCommandValue("imagefloat")) {
                            for (f = c.parentNode, domUtils.setStyle(c, "float", "none"), u = c; f && 1 == domUtils.getChildCount(f, function(e) {
                                return !domUtils.isBr(e) && !domUtils.isWhitespace(e);
                            }) && (dtd.$inline[f.tagName] || "A" == f.tagName); ) f = (u = f).parentNode;
                            var h = n.document.createElement("p");
                            domUtils.setAttributes(h, {
                                style: "text-align:center"
                            }), u.parentNode.insertBefore(h, u), h.appendChild(u), domUtils.setStyle(u, "float", "");
                        }
                    }
                } else {
                    n.selection.getRange().selectNode(o).select(), n.execCommand("imagefloat", g.imageBlockLine);
                }
                g.removeEmptyNode && g.removeTagNames[o.tagName.toLowerCase()] && domUtils.hasNoAttributes(o) && domUtils.isEmptyBlock(o) && domUtils.remove(o);
            }
            g.tobdc && ((r = UE.htmlparser(i.innerHTML)).traversal(function(e) {
                "text" == e.type && (e.data = function(e) {
                    e = utils.html(e);
                    for (var t = "", i = 0; i < e.length; i++) 32 == e.charCodeAt(i) ? t += String.fromCharCode(12288) : e.charCodeAt(i) < 127 ? t += String.fromCharCode(e.charCodeAt(i) + 65248) : t += e.charAt(i);
                    return t;
                }(e.data));
            }), i.innerHTML = r.toHtml());
            g.bdc2sb && ((r = UE.htmlparser(i.innerHTML)).traversal(function(e) {
                "text" == e.type && (e.data = function(e) {
                    for (var t = "", i = 0; i < e.length; i++) {
                        var n = e.charCodeAt(i);
                        t += 65281 <= n && n <= 65373 ? String.fromCharCode(e.charCodeAt(i) - 65248) : 12288 == n ? String.fromCharCode(e.charCodeAt(i) - 12288 + 32) : e.charAt(i);
                    }
                    return t;
                }(e.data));
            }), i.innerHTML = r.toHtml());
            t && (t.html = i.innerHTML);
        }
    }, UE.plugin.register("autosubmit", function() {
        return {
            shortcutkey: {
                autosubmit: "ctrl+13"
            },
            commands: {
                autosubmit: {
                    execCommand: function() {
                        var e = domUtils.findParentByTagName(this.iframe, "form", !1);
                        if (e) {
                            if (!1 === this.fireEvent("beforesubmit")) return;
                            this.sync(), e.submit();
                        }
                    }
                }
            }
        };
    }), UE.plugin.register("background", function() {
        var i, l = this, n = "editor_background", o = new RegExp("body[\\s]*\\{(.+)\\}", "i");
        function r(e) {
            var n = {}, t = e.split(";");
            return utils.each(t, function(e) {
                var t = e.indexOf(":"), i = utils.trim(e.substr(0, t)).toLowerCase();
                i && (n[i] = utils.trim(e.substr(t + 1) || ""));
            }), n;
        }
        function a(e) {
            if (e) {
                var t = [];
                for (var i in e) e.hasOwnProperty(i) && t.push(i + ":" + e[i] + "; ");
                utils.cssRule(n, t.length ? "body{" + t.join("") + "}" : "", l.document);
            } else utils.cssRule(n, "", l.document);
        }
        var s = l.hasContents;
        return l.hasContents = function() {
            if (l.queryCommandValue("background")) return !0;
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return s.apply(l, t);
        }, {
            bindEvents: {
                getAllHtml: function(e, t) {
                    var i = this.body, n = domUtils.getComputedStyle(i, "background-image"), o = "";
                    o = 0 < n.indexOf(l.options.imagePath) ? n.substring(n.indexOf(l.options.imagePath), n.length - 1).replace(/"|\(|\)/gi, "") : "none" != n ? n.replace(/url\("?|"?\)/gi, "") : "";
                    var r = '<style type="text/css">body{', a = {
                        "background-color": domUtils.getComputedStyle(i, "background-color") || "#ffffff",
                        "background-image": o ? "url(" + o + ")" : "",
                        "background-repeat": domUtils.getComputedStyle(i, "background-repeat") || "",
                        "background-position": browser.ie ? domUtils.getComputedStyle(i, "background-position-x") + " " + domUtils.getComputedStyle(i, "background-position-y") : domUtils.getComputedStyle(i, "background-position"),
                        height: domUtils.getComputedStyle(i, "height")
                    };
                    for (var s in a) a.hasOwnProperty(s) && (r += s + ":" + a[s] + "; ");
                    r += "}</style> ", t.push(r);
                },
                aftersetcontent: function() {
                    0 == i && a();
                }
            },
            inputRule: function(e) {
                i = !1, utils.each(e.getNodesByTagName("p"), function(e) {
                    var t = e.getAttr("data-background");
                    t && (i = !0, a(r(t)), e.parentNode.removeChild(e));
                });
            },
            outputRule: function(e) {
                var t = (utils.cssRule(n, this.document) || "").replace(/[\n\r]+/g, "").match(o);
                t && e.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + utils.trim(t[1].replace(/"/g, "").replace(/[\s]+/g, " ")) + '"><br/></p>'));
            },
            commands: {
                background: {
                    execCommand: function(e, t) {
                        a(t);
                    },
                    queryCommandValue: function() {
                        var e = (utils.cssRule(n, this.document) || "").replace(/[\n\r]+/g, "").match(o);
                        return e ? r(e[1]) : null;
                    },
                    notNeedUndo: !0
                }
            }
        };
    }), UE.commands.imagefloat = {
        execCommand: function(e, t) {
            var i = this, n = i.selection.getRange();
            if (!n.collapsed) {
                var o = n.getClosedNode();
                if (o && "IMG" == o.tagName) switch (t) {
                  case "left":
                  case "right":
                  case "none":
                    for (var r, a, s, l = o.parentNode; dtd.$inline[l.tagName] || "A" == l.tagName; ) l = l.parentNode;
                    if ("P" == (r = l).tagName && "center" == domUtils.getStyle(r, "text-align")) {
                        if (!domUtils.isBody(r) && 1 == domUtils.getChildCount(r, function(e) {
                            return !domUtils.isBr(e) && !domUtils.isWhitespace(e);
                        })) if (a = r.previousSibling, s = r.nextSibling, a && s && 1 == a.nodeType && 1 == s.nodeType && a.tagName == s.tagName && domUtils.isBlockElm(a)) {
                            for (a.appendChild(r.firstChild); s.firstChild; ) a.appendChild(s.firstChild);
                            domUtils.remove(r), domUtils.remove(s);
                        } else domUtils.setStyle(r, "text-align", "");
                        n.selectNode(o).select();
                    }
                    domUtils.setStyle(o, "float", "none" == t ? "" : t), "none" == t && domUtils.removeAttributes(o, "align");
                    break;

                  case "center":
                    if ("center" != i.queryCommandValue("imagefloat")) {
                        for (l = o.parentNode, domUtils.setStyle(o, "float", ""), domUtils.removeAttributes(o, "align"), 
                        r = o; l && 1 == domUtils.getChildCount(l, function(e) {
                            return !domUtils.isBr(e) && !domUtils.isWhitespace(e);
                        }) && (dtd.$inline[l.tagName] || "A" == l.tagName); ) l = (r = l).parentNode;
                        n.setStartBefore(r).setCursor(!1), (l = i.document.createElement("div")).appendChild(r), 
                        domUtils.setStyle(r, "float", ""), i.execCommand("insertHtml", '<p id="_img_parent_tmp" style="text-align:center">' + l.innerHTML + "</p>"), 
                        (r = i.document.getElementById("_img_parent_tmp")).removeAttribute("id"), r = r.firstChild, 
                        n.selectNode(r).select(), (s = r.parentNode.nextSibling) && domUtils.isEmptyNode(s) && domUtils.remove(s);
                    }
                }
            }
        },
        queryCommandValue: function() {
            var e, t, i = this.selection.getRange();
            return i.collapsed ? "none" : (e = i.getClosedNode()) && 1 == e.nodeType && "IMG" == e.tagName ? ("none" == (t = domUtils.getComputedStyle(e, "float") || e.getAttribute("align")) && (t = "center" == domUtils.getComputedStyle(e.parentNode, "text-align") ? "center" : t), 
            {
                left: 1,
                right: 1,
                center: 1
            }[t] ? t : "none") : "none";
        },
        queryCommandState: function() {
            var e, t = this.selection.getRange();
            return t.collapsed ? -1 : (e = t.getClosedNode()) && 1 == e.nodeType && "IMG" == e.tagName ? 0 : -1;
        }
    }, UE.commands.insertimage = {
        execCommand: function(e, t) {
            if ((t = utils.isArray(t) ? t : [ t ]).length) {
                var i = this, n = i.selection.getRange(), o = n.getClosedNode();
                if (!0 !== i.fireEvent("beforeinsertimage", t)) {
                    if (!o || !/img/i.test(o.tagName) || "edui-faked-video" == o.className && -1 == o.className.indexOf("edui-upload-video") || o.getAttribute("word_img")) {
                        var r, a = [], s = "";
                        if (r = t[0], 1 == t.length) s = '<img src="' + r.src + '" ' + (r._src ? ' _src="' + r._src + '" ' : "") + (r.width ? 'width="' + r.width + '" ' : "") + (r.height ? ' height="' + r.height + '" ' : "") + ("left" == r.floatStyle || "right" == r.floatStyle ? ' style="float:' + r.floatStyle + ';"' : "") + (r.title && "" != r.title ? ' title="' + r.title + '"' : "") + (r.border && "0" != r.border ? ' border="' + r.border + '"' : "") + (r.alt && "" != r.alt ? ' alt="' + r.alt + '"' : "") + (r.hspace && "0" != r.hspace ? ' hspace = "' + r.hspace + '"' : "") + (r.vspace && "0" != r.vspace ? ' vspace = "' + r.vspace + '"' : "") + "/>", 
                        "center" == r.floatStyle && (s = '<p style="text-align: center">' + s + "</p>"), 
                        a.push(s); else for (var l = 0; r = t[l++]; ) s = "<p " + ("center" == r.floatStyle ? 'style="text-align: center" ' : "") + '><img src="' + r.src + '" ' + (r.width ? 'width="' + r.width + '" ' : "") + (r._src ? ' _src="' + r._src + '" ' : "") + (r.height ? ' height="' + r.height + '" ' : "") + ' style="' + (r.floatStyle && "center" != r.floatStyle ? "float:" + r.floatStyle + ";" : "") + (r.border || "") + '" ' + (r.title ? ' title="' + r.title + '"' : "") + " /></p>", 
                        a.push(s);
                        i.execCommand("insertHtml", a.join(""));
                    } else {
                        var d = t.shift(), c = d.floatStyle;
                        delete d.floatStyle, domUtils.setAttributes(o, d), i.execCommand("imagefloat", c), 
                        0 < t.length && (n.setStartAfter(o).setCursor(!1, !0), i.execCommand("insertimage", t));
                    }
                    i.fireEvent("afterinsertimage", t);
                }
            }
        }
    }, UE.plugins.justify = function() {
        var u = domUtils.isBlockElm, i = {
            left: 1,
            right: 1,
            center: 1,
            justify: 1
        };
        UE.commands.justify = {
            execCommand: function(e, t) {
                var i, n = this.selection.getRange();
                return n.collapsed && (i = this.document.createTextNode("p"), n.insertNode(i)), 
                function(e, t) {
                    var i = e.createBookmark(), n = function(e) {
                        return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e);
                    };
                    e.enlarge(!0);
                    for (var o, r = e.createBookmark(), a = domUtils.getNextDomNode(r.start, !1, n), s = e.cloneRange(); a && !(domUtils.getPosition(a, r.end) & domUtils.POSITION_FOLLOWING); ) if (3 != a.nodeType && u(a)) a = domUtils.getNextDomNode(a, !0, n); else {
                        for (s.setStartBefore(a); a && a !== r.end && !u(a); ) o = a, a = domUtils.getNextDomNode(a, !1, null, function(e) {
                            return !u(e);
                        });
                        s.setEndAfter(o);
                        var l = s.getCommonAncestor();
                        if (!domUtils.isBody(l) && u(l)) domUtils.setStyles(l, utils.isString(t) ? {
                            "text-align": t
                        } : t), a = l; else {
                            var d = e.document.createElement("p");
                            domUtils.setStyles(d, utils.isString(t) ? {
                                "text-align": t
                            } : t);
                            var c = s.extractContents();
                            d.appendChild(c), s.insertNode(d), a = d;
                        }
                        a = domUtils.getNextDomNode(a, !1, n);
                    }
                    e.moveToBookmark(r).moveToBookmark(i);
                }(n, t), i && (n.setStartBefore(i).collapse(!0), domUtils.remove(i)), n.select(), 
                !0;
            },
            queryCommandValue: function() {
                var e = this.selection.getStart(), t = domUtils.getComputedStyle(e, "text-align");
                return i[t] ? t : "left";
            },
            queryCommandState: function() {
                var e = this.selection.getStart();
                return e && domUtils.findParentByTagName(e, [ "td", "th", "caption" ], !0) ? -1 : 0;
            }
        };
    }, UE.plugins.font = function() {
        var e = {
            forecolor: "color",
            backcolor: "background-color",
            fontsize: "font-size",
            fontfamily: "font-family",
            underline: "text-decoration",
            strikethrough: "text-decoration",
            fontborder: "border"
        }, d = {
            underline: 1,
            strikethrough: 1,
            fontborder: 1
        }, a = {
            forecolor: "color",
            backcolor: "background-color",
            fontsize: "font-size",
            fontfamily: "font-family"
        };
        function c(e, n, o) {
            var t, i = e.collapsed, r = e.createBookmark();
            if (i) for (t = r.start.parentNode; dtd.$inline[t.tagName]; ) t = t.parentNode; else t = domUtils.getCommonAncestor(r.start, r.end);
            utils.each(domUtils.getElementsByTagName(t, "span"), function(e) {
                if (e.parentNode && !domUtils.isBookmarkNode(e)) if (/\s*border\s*:\s*none;?\s*/i.test(e.style.cssText)) /^\s*border\s*:\s*none;?\s*$/.test(e.style.cssText) ? domUtils.remove(e, !0) : domUtils.removeStyle(e, "border"); else {
                    if (/border/i.test(e.style.cssText) && "SPAN" == e.parentNode.tagName && /border/i.test(e.parentNode.style.cssText) && (e.style.cssText = e.style.cssText.replace(/border[^:]*:[^;]+;?/gi, "")), 
                    "fontborder" != n || "none" != o) for (var t = e.nextSibling; t && 1 == t.nodeType && "SPAN" == t.tagName; ) if (domUtils.isBookmarkNode(t) && "fontborder" == n) e.appendChild(t), 
                    t = e.nextSibling; else {
                        if (t.style.cssText == e.style.cssText && (domUtils.moveChild(t, e), domUtils.remove(t)), 
                        e.nextSibling === t) break;
                        t = e.nextSibling;
                    }
                    if (function(e) {
                        for (var t; (t = e.parentNode) && "SPAN" == t.tagName && 1 == domUtils.getChildCount(t, function(e) {
                            return !domUtils.isBookmarkNode(e) && !domUtils.isBr(e);
                        }); ) t.style.cssText += e.style.cssText, domUtils.remove(e, !0), e = t;
                    }(e), browser.ie && 8 < browser.version) {
                        var i = domUtils.findParent(e, function(e) {
                            return "SPAN" == e.tagName && /background-color/.test(e.style.cssText);
                        });
                        i && !/background-color/.test(e.style.cssText) && (e.style.backgroundColor = i.style.backgroundColor);
                    }
                }
            }), e.moveToBookmark(r), function(e, t, i) {
                if (a[t] && (e.adjustmentBoundary(), !e.collapsed && 1 == e.startContainer.nodeType)) {
                    var n = e.startContainer.childNodes[e.startOffset];
                    if (n && domUtils.isTagNode(n, "span")) {
                        var o = e.createBookmark();
                        utils.each(domUtils.getElementsByTagName(n, "span"), function(e) {
                            e.parentNode && !domUtils.isBookmarkNode(e) && ("backcolor" == t && domUtils.getComputedStyle(e, "background-color").toLowerCase() === i || (domUtils.removeStyle(e, a[t]), 
                            0 == e.style.cssText.replace(/^\s+$/, "").length && domUtils.remove(e, !0)));
                        }), e.moveToBookmark(o);
                    }
                }
            }(e, n, o);
        }
        for (var t in this.setOpt({
            fontfamily: [ {
                name: "songti",
                val: "宋体,SimSun"
            }, {
                name: "yahei",
                val: "微软雅黑,Microsoft YaHei"
            }, {
                name: "kaiti",
                val: "楷体,楷体_GB2312, SimKai"
            }, {
                name: "heiti",
                val: "黑体, SimHei"
            }, {
                name: "lishu",
                val: "隶书, SimLi"
            }, {
                name: "andaleMono",
                val: "andale mono"
            }, {
                name: "arial",
                val: "arial, helvetica,sans-serif"
            }, {
                name: "arialBlack",
                val: "arial black,avant garde"
            }, {
                name: "comicSansMs",
                val: "comic sans ms"
            }, {
                name: "impact",
                val: "impact,chicago"
            }, {
                name: "timesNewRoman",
                val: "times new roman"
            } ],
            fontsize: [ 10, 11, 12, 14, 16, 18, 20, 24, 36 ]
        }), this.addInputRule(function(e) {
            utils.each(e.getNodesByTagName("u s del font strike"), function(e) {
                if ("font" == e.tagName) {
                    var t = [];
                    for (var i in e.attrs) switch (i) {
                      case "size":
                        t.push("font-size:" + ({
                            1: "10",
                            2: "12",
                            3: "16",
                            4: "18",
                            5: "24",
                            6: "32",
                            7: "48"
                        }[e.attrs[i]] || e.attrs[i]) + "px");
                        break;

                      case "color":
                        t.push("color:" + e.attrs[i]);
                        break;

                      case "face":
                        t.push("font-family:" + e.attrs[i]);
                        break;

                      case "style":
                        t.push(e.attrs[i]);
                    }
                    e.attrs = {
                        style: t.join(";")
                    };
                } else {
                    var n = "u" == e.tagName ? "underline" : "line-through";
                    e.attrs = {
                        style: (e.getAttr("style") || "") + "text-decoration:" + n + ";"
                    };
                }
                e.tagName = "span";
            });
        }), e) !function(s, l) {
            UE.commands[s] = {
                execCommand: function(e, t) {
                    t = t || (this.queryCommandState(e) ? "none" : "underline" == e ? "underline" : "fontborder" == e ? "1px solid #000" : "line-through");
                    var i, n = this, o = this.selection.getRange();
                    if ("default" == t) o.collapsed && (i = n.document.createTextNode("font"), o.insertNode(i).select()), 
                    n.execCommand("removeFormat", "span,a", l), i && (o.setStartBefore(i).collapse(!0), 
                    domUtils.remove(i)), c(o, e, t), o.select(); else if (o.collapsed) {
                        var r = domUtils.findParentByTagName(o.startContainer, "span", !0);
                        if (i = n.document.createTextNode("font"), !r || r.children.length || r[browser.ie ? "innerText" : "textContent"].replace(fillCharReg, "").length) {
                            if (o.insertNode(i), o.selectNode(i).select(), r = o.document.createElement("span"), 
                            d[s]) {
                                if (domUtils.findParentByTagName(i, "a", !0)) return o.setStartBefore(i).setCursor(), 
                                void domUtils.remove(i);
                                n.execCommand("removeFormat", "span,a", l);
                            }
                            if (r.style.cssText = l + ":" + t, i.parentNode.insertBefore(r, i), !browser.ie || browser.ie && 9 == browser.version) for (var a = r.parentNode; !domUtils.isBlockElm(a); ) "SPAN" == a.tagName && (r.style.cssText = a.style.cssText + ";" + r.style.cssText), 
                            a = a.parentNode;
                            opera ? setTimeout(function() {
                                o.setStart(r, 0).collapse(!0), c(o, e, t), o.select();
                            }) : (o.setStart(r, 0).collapse(!0), c(o, e, t), o.select());
                        } else o.insertNode(i), d[s] && (o.selectNode(i).select(), n.execCommand("removeFormat", "span,a", l, null), 
                        r = domUtils.findParentByTagName(i, "span", !0), o.setStartBefore(i)), r && (r.style.cssText += ";" + l + ":" + t), 
                        o.collapse(!0).select();
                        domUtils.remove(i);
                    } else d[s] && n.queryCommandValue(s) && n.execCommand("removeFormat", "span,a", l), 
                    (o = n.selection.getRange()).applyInlineStyle("span", {
                        style: l + ":" + t
                    }), c(o, e, t), o.select();
                    return !0;
                },
                queryCommandValue: function(e) {
                    var t = this.selection.getStart();
                    if ("underline" == e || "strikethrough" == e) {
                        for (var i, n = t; n && !domUtils.isBlockElm(n) && !domUtils.isBody(n); ) {
                            if (1 == n.nodeType && "none" != (i = domUtils.getComputedStyle(n, l))) return i;
                            n = n.parentNode;
                        }
                        return "none";
                    }
                    if ("fontborder" == e) {
                        for (var o, r = t; r && dtd.$inline[r.tagName]; ) {
                            if ((o = domUtils.getComputedStyle(r, "border")) && /1px/.test(o) && /solid/.test(o)) return o;
                            r = r.parentNode;
                        }
                        return "";
                    }
                    if ("FontSize" != e) return domUtils.getComputedStyle(t, l);
                    var a = domUtils.getComputedStyle(t, l);
                    return (r = /^([\d\.]+)(\w+)$/.exec(a)) ? Math.floor(r[1]) + r[2] : a;
                },
                queryCommandState: function(e) {
                    if (!d[e]) return 0;
                    var t = this.queryCommandValue(e);
                    return "fontborder" == e ? /1px/.test(t) && /solid/.test(t) : "underline" == e ? /underline/.test(t) : /line\-through/.test(t);
                }
            };
        }(t, e[t]);
    }, UE.plugins.link = function() {
        function l(e) {
            var t = e.startContainer, i = e.endContainer;
            (t = domUtils.findParentByTagName(t, "a", !0)) && e.setStartBefore(t), (i = domUtils.findParentByTagName(i, "a", !0)) && e.setEndAfter(i);
        }
        UE.commands.unlink = {
            execCommand: function() {
                var e, t = this.selection.getRange();
                t.collapsed && !domUtils.findParentByTagName(t.startContainer, "a", !0) || (e = t.createBookmark(), 
                l(t), t.removeInlineStyle("a").moveToBookmark(e).select());
            },
            queryCommandState: function() {
                return !this.highlight && this.queryCommandValue("link") ? 0 : -1;
            }
        }, UE.commands.link = {
            execCommand: function(e, t) {
                var i;
                t._href && (t._href = utils.unhtml(t._href, /[<">]/g)), t.href && (t.href = utils.unhtml(t.href, /[<">]/g)), 
                t.textValue && (t.textValue = utils.unhtml(t.textValue, /[<">]/g)), function(e, t, i) {
                    var n = e.cloneRange(), o = i.queryCommandValue("link");
                    l(e = e.adjustmentBoundary());
                    var r = e.startContainer;
                    if (1 == r.nodeType && o && (r = r.childNodes[e.startOffset]) && 1 == r.nodeType && "A" == r.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(r[browser.ie ? "innerText" : "textContent"]) && (r[browser.ie ? "innerText" : "textContent"] = utils.html(t.textValue || t.href)), 
                    n.collapsed && !o || (e.removeInlineStyle("a"), n = e.cloneRange()), n.collapsed) {
                        var a = e.document.createElement("a"), s = "";
                        t.textValue ? (s = utils.html(t.textValue), delete t.textValue) : s = utils.html(t.href), 
                        domUtils.setAttributes(a, t), (r = domUtils.findParentByTagName(n.startContainer, "a", !0)) && domUtils.isInNodeEndBoundary(n, r) && e.setStartAfter(r).collapse(!0), 
                        a[browser.ie ? "innerText" : "textContent"] = s, e.insertNode(a).selectNode(a);
                    } else e.applyInlineStyle("a", t);
                }(i = this.selection.getRange(), t, this), i.collapse().select(!0);
            },
            queryCommandValue: function() {
                var e, t = this.selection.getRange();
                if (!t.collapsed) {
                    t.shrinkBoundary();
                    var i = 3 != t.startContainer.nodeType && t.startContainer.childNodes[t.startOffset] ? t.startContainer.childNodes[t.startOffset] : t.startContainer, n = 3 == t.endContainer.nodeType || 0 == t.endOffset ? t.endContainer : t.endContainer.childNodes[t.endOffset - 1], o = t.getCommonAncestor();
                    if (!(e = domUtils.findParentByTagName(o, "a", !0)) && 1 == o.nodeType) for (var r, a, s, l = o.getElementsByTagName("a"), d = 0; s = l[d++]; ) if (r = domUtils.getPosition(s, i), 
                    a = domUtils.getPosition(s, n), (r & domUtils.POSITION_FOLLOWING || r & domUtils.POSITION_CONTAINS) && (a & domUtils.POSITION_PRECEDING || a & domUtils.POSITION_CONTAINS)) {
                        e = s;
                        break;
                    }
                    return e;
                }
                if ((e = 1 == (e = t.startContainer).nodeType ? e : e.parentNode) && (e = domUtils.findParentByTagName(e, "a", !0)) && !domUtils.isInNodeEndBoundary(t, e)) return e;
            },
            queryCommandState: function() {
                var e = this.selection.getRange().getClosedNode();
                return e && ("edui-faked-video" == e.className || -1 != e.className.indexOf("edui-upload-video")) ? -1 : 0;
            }
        };
    }, UE.plugins.insertframe = function() {
        var e = this;
        e.addListener("selectionchange", function() {
            e._iframe && delete e._iframe;
        });
    }, UE.commands.scrawl = {
        queryCommandState: function() {
            return browser.ie && browser.version <= 8 ? -1 : 0;
        }
    }, UE.plugins.removeformat = function() {
        this.setOpt({
            removeFormatTags: "b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var",
            removeFormatAttributes: "class,style,lang,width,height,align,hspace,valign"
        }), this.commands.removeformat = {
            execCommand: function(e, t, d, i, c) {
                var u, m, f = new RegExp("^(?:" + (t || this.options.removeFormatTags).replace(/,/g, "|") + ")$", "i"), h = d ? [] : (i || this.options.removeFormatAttributes).split(","), n = new dom.Range(this.document), p = function(e) {
                    return 1 == e.nodeType;
                };
                function g(e) {
                    if (3 == e.nodeType || "span" != e.tagName.toLowerCase()) return 0;
                    if (browser.ie) {
                        var t = e.attributes;
                        if (t.length) {
                            for (var i = 0, n = t.length; i < n; i++) if (t[i].specified) return 0;
                            return 1;
                        }
                    }
                    return !e.attributes.length;
                }
                (function(e) {
                    var t = e.createBookmark();
                    if (e.collapsed && e.enlarge(!0), !c) {
                        var i = domUtils.findParentByTagName(e.startContainer, "a", !0);
                        i && e.setStartBefore(i), (i = domUtils.findParentByTagName(e.endContainer, "a", !0)) && e.setEndAfter(i);
                    }
                    for (s = (u = e.createBookmark()).start; (m = s.parentNode) && !domUtils.isBlockElm(m); ) domUtils.breakParent(s, m), 
                    domUtils.clearEmptySibling(s);
                    if (u.end) {
                        for (s = u.end; (m = s.parentNode) && !domUtils.isBlockElm(m); ) domUtils.breakParent(s, m), 
                        domUtils.clearEmptySibling(s);
                        for (var n, o = domUtils.getNextDomNode(u.start, !1, p); o && o != u.end; ) n = domUtils.getNextDomNode(o, !0, p), 
                        dtd.$empty[o.tagName.toLowerCase()] || domUtils.isBookmarkNode(o) || (f.test(o.tagName) ? d ? (domUtils.removeStyle(o, d), 
                        g(o) && "text-decoration" != d && domUtils.remove(o, !0)) : domUtils.remove(o, !0) : dtd.$tableContent[o.tagName] || dtd.$list[o.tagName] || (domUtils.removeAttributes(o, h), 
                        g(o) && domUtils.remove(o, !0))), o = n;
                    }
                    var r = u.start.parentNode;
                    !domUtils.isBlockElm(r) || dtd.$tableContent[r.tagName] || dtd.$list[r.tagName] || domUtils.removeAttributes(r, h), 
                    r = u.end.parentNode, u.end && domUtils.isBlockElm(r) && !dtd.$tableContent[r.tagName] && !dtd.$list[r.tagName] && domUtils.removeAttributes(r, h), 
                    e.moveToBookmark(u).moveToBookmark(t);
                    for (var a, s = e.startContainer, l = e.collapsed; 1 == s.nodeType && domUtils.isEmptyNode(s) && dtd.$removeEmpty[s.tagName]; ) a = s.parentNode, 
                    e.setStartBefore(s), e.startContainer === e.endContainer && e.endOffset--, domUtils.remove(s), 
                    s = a;
                    if (!l) for (s = e.endContainer; 1 == s.nodeType && domUtils.isEmptyNode(s) && dtd.$removeEmpty[s.tagName]; ) a = s.parentNode, 
                    e.setEndBefore(s), domUtils.remove(s), s = a;
                })(n = this.selection.getRange()), n.select();
            }
        };
    }, UE.plugins.blockquote = function() {
        function y(e) {
            return domUtils.filterNodeList(e.selection.getStartElementPath(), "blockquote");
        }
        this.commands.blockquote = {
            execCommand: function(e, t) {
                var i = this.selection.getRange(), n = y(this), o = dtd.blockquote, r = i.createBookmark();
                if (n) {
                    var a = i.startContainer, s = domUtils.isBlockElm(a) ? a : domUtils.findParent(a, function(e) {
                        return domUtils.isBlockElm(e);
                    }), l = i.endContainer, d = domUtils.isBlockElm(l) ? l : domUtils.findParent(l, function(e) {
                        return domUtils.isBlockElm(e);
                    });
                    s = domUtils.findParentByTagName(s, "li", !0) || s, d = domUtils.findParentByTagName(d, "li", !0) || d, 
                    "LI" == s.tagName || "TD" == s.tagName || s === n || domUtils.isBody(s) ? domUtils.remove(n, !0) : domUtils.breakParent(s, n), 
                    s !== d && (n = domUtils.findParentByTagName(d, "blockquote")) && ("LI" == d.tagName || "TD" == d.tagName || domUtils.isBody(d) ? n.parentNode && domUtils.remove(n, !0) : domUtils.breakParent(d, n));
                    for (var c, u = domUtils.getElementsByTagName(this.document, "blockquote"), m = 0; c = u[m++]; ) c.childNodes.length ? domUtils.getPosition(c, s) & domUtils.POSITION_FOLLOWING && domUtils.getPosition(c, d) & domUtils.POSITION_PRECEDING && domUtils.remove(c, !0) : domUtils.remove(c);
                } else {
                    for (var f = i.cloneRange(), h = 1 == f.startContainer.nodeType ? f.startContainer : f.startContainer.parentNode, p = h, g = 1; ;) {
                        if (domUtils.isBody(h)) {
                            p !== h ? i.collapsed ? (f.selectNode(p), g = 0) : f.setStartBefore(p) : f.setStart(h, 0);
                            break;
                        }
                        if (!o[h.tagName]) {
                            i.collapsed ? f.selectNode(p) : f.setStartBefore(p);
                            break;
                        }
                        h = (p = h).parentNode;
                    }
                    if (g) for (p = h = h = 1 == f.endContainer.nodeType ? f.endContainer : f.endContainer.parentNode; ;) {
                        if (domUtils.isBody(h)) {
                            p !== h ? f.setEndAfter(p) : f.setEnd(h, h.childNodes.length);
                            break;
                        }
                        if (!o[h.tagName]) {
                            f.setEndAfter(p);
                            break;
                        }
                        h = (p = h).parentNode;
                    }
                    h = i.document.createElement("blockquote"), domUtils.setAttributes(h, t), h.appendChild(f.extractContents()), 
                    f.insertNode(h);
                    var v, b = domUtils.getElementsByTagName(h, "blockquote");
                    for (m = 0; v = b[m++]; ) v.parentNode && domUtils.remove(v, !0);
                }
                i.moveToBookmark(r).select();
            },
            queryCommandState: function() {
                return y(this) ? 1 : 0;
            }
        };
    }, UE.commands.touppercase = UE.commands.tolowercase = {
        execCommand: function(e) {
            var t = this.selection.getRange();
            if (t.collapsed) return t;
            for (var i = t.createBookmark(), n = i.end, o = function(e) {
                return !domUtils.isBr(e) && !domUtils.isWhitespace(e);
            }, r = domUtils.getNextDomNode(i.start, !1, o); r && domUtils.getPosition(r, n) & domUtils.POSITION_PRECEDING && (3 == r.nodeType && (r.nodeValue = r.nodeValue["touppercase" == e ? "toUpperCase" : "toLowerCase"]()), 
            (r = domUtils.getNextDomNode(r, !0, o)) !== n); ) ;
            t.moveToBookmark(i).select();
        }
    }, UE.commands.indent = {
        execCommand: function() {
            var e = this.queryCommandState("indent") ? "0em" : this.options.indentValue || "2em";
            this.execCommand("Paragraph", "p", {
                style: "text-indent:" + e
            });
        },
        queryCommandState: function() {
            var e = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
            return e && e.style.textIndent && parseInt(e.style.textIndent) ? 1 : 0;
        }
    }, UE.commands.print = {
        execCommand: function() {
            this.window.print();
        },
        notNeedUndo: 1
    }, UE.commands.preview = {
        execCommand: function() {
            var e = window.open("", "_blank", "").document;
            e.open(), e.write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><script src="' + this.options.UEDITOR_HOME_URL + "ueditor.parse.js\"><\/script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)<\/script></head><body><div>" + this.getContent(null, null, !0) + "</div></body></html>"), 
            e.close();
        },
        notNeedUndo: 1
    }, UE.plugins.selectall = function() {
        this.commands.selectall = {
            execCommand: function() {
                var e = this.body, t = this.selection.getRange();
                t.selectNodeContents(e), domUtils.isEmptyBlock(e) && (browser.opera && e.firstChild && 1 == e.firstChild.nodeType && t.setStartAtFirst(e.firstChild), 
                t.collapse(!0)), t.select(!0);
            },
            notNeedUndo: 1
        }, this.addshortcutkey({
            selectAll: "ctrl+65"
        });
    }, UE.plugins.paragraph = function() {
        var m = domUtils.isBlockElm, f = [ "TD", "LI", "PRE" ];
        this.setOpt("paragraph", {
            p: "",
            h1: "",
            h2: "",
            h3: "",
            h4: "",
            h5: "",
            h6: ""
        }), this.commands.paragraph = {
            execCommand: function(e, t, i, n) {
                var o = this.selection.getRange();
                if (o.collapsed) {
                    var r = this.document.createTextNode("p");
                    if (o.insertNode(r), browser.ie) {
                        var a = r.previousSibling;
                        a && domUtils.isWhitespace(a) && domUtils.remove(a), (a = r.nextSibling) && domUtils.isWhitespace(a) && domUtils.remove(a);
                    }
                }
                if (o = function(e, t, i, n) {
                    var o, r = e.createBookmark(), a = function(e) {
                        return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e);
                    };
                    e.enlarge(!0);
                    for (var s, l = e.createBookmark(), d = domUtils.getNextDomNode(l.start, !1, a), c = e.cloneRange(); d && !(domUtils.getPosition(d, l.end) & domUtils.POSITION_FOLLOWING); ) if (3 != d.nodeType && m(d)) d = domUtils.getNextDomNode(d, !0, a); else {
                        for (c.setStartBefore(d); d && d !== l.end && !m(d); ) s = d, d = domUtils.getNextDomNode(d, !1, null, function(e) {
                            return !m(e);
                        });
                        c.setEndAfter(s), o = e.document.createElement(t), i && (domUtils.setAttributes(o, i), 
                        n && "customstyle" == n && i.style && (o.style.cssText = i.style)), o.appendChild(c.extractContents()), 
                        domUtils.isEmptyNode(o) && domUtils.fillChar(e.document, o), c.insertNode(o);
                        var u = o.parentNode;
                        m(u) && !domUtils.isBody(o.parentNode) && -1 == utils.indexOf(f, u.tagName) && (n && "customstyle" == n || (u.getAttribute("dir") && o.setAttribute("dir", u.getAttribute("dir")), 
                        u.style.cssText && (o.style.cssText = u.style.cssText + ";" + o.style.cssText), 
                        u.style.textAlign && !o.style.textAlign && (o.style.textAlign = u.style.textAlign), 
                        u.style.textIndent && !o.style.textIndent && (o.style.textIndent = u.style.textIndent), 
                        u.style.padding && !o.style.padding && (o.style.padding = u.style.padding)), i && /h\d/i.test(u.tagName) && !/h\d/i.test(o.tagName) ? (domUtils.setAttributes(u, i), 
                        n && "customstyle" == n && i.style && (u.style.cssText = i.style), domUtils.remove(o.parentNode, !0), 
                        o = u) : domUtils.remove(o.parentNode, !0)), d = -1 != utils.indexOf(f, u.tagName) ? u : o, 
                        d = domUtils.getNextDomNode(d, !1, a);
                    }
                    return e.moveToBookmark(l).moveToBookmark(r);
                }(o, t, i, n), r && (o.setStartBefore(r).collapse(!0), pN = r.parentNode, domUtils.remove(r), 
                domUtils.isBlockElm(pN) && domUtils.isEmptyNode(pN) && domUtils.fillNode(this.document, pN)), 
                browser.gecko && o.collapsed && 1 == o.startContainer.nodeType) {
                    var s = o.startContainer.childNodes[o.startOffset];
                    s && 1 == s.nodeType && s.tagName.toLowerCase() == t && o.setStart(s, 0).collapse(!0);
                }
                return o.select(), !0;
            },
            queryCommandValue: function() {
                var e = domUtils.filterNodeList(this.selection.getStartElementPath(), "p h1 h2 h3 h4 h5 h6");
                return e ? e.tagName.toLowerCase() : "";
            }
        };
    }, EI = domUtils.isBlockElm, FI = function(e) {
        return domUtils.filterNodeList(e.selection.getStartElementPath(), function(e) {
            return e && 1 == e.nodeType && e.getAttribute("dir");
        });
    }, UE.commands.directionality = {
        execCommand: function(e, t) {
            var i = this.selection.getRange();
            if (i.collapsed) {
                var n = this.document.createTextNode("d");
                i.insertNode(n);
            }
            return function(e, t, i) {
                var n, o = function(e) {
                    return 1 == e.nodeType ? !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e);
                }, r = FI(t);
                if (r && e.collapsed) return r.setAttribute("dir", i);
                n = e.createBookmark(), e.enlarge(!0);
                for (var a, s = e.createBookmark(), l = domUtils.getNextDomNode(s.start, !1, o), d = e.cloneRange(); l && !(domUtils.getPosition(l, s.end) & domUtils.POSITION_FOLLOWING); ) if (3 != l.nodeType && EI(l)) l = domUtils.getNextDomNode(l, !0, o); else {
                    for (d.setStartBefore(l); l && l !== s.end && !EI(l); ) a = l, l = domUtils.getNextDomNode(l, !1, null, function(e) {
                        return !EI(e);
                    });
                    d.setEndAfter(a);
                    var c = d.getCommonAncestor();
                    if (!domUtils.isBody(c) && EI(c)) c.setAttribute("dir", i), l = c; else {
                        var u = e.document.createElement("p");
                        u.setAttribute("dir", i);
                        var m = d.extractContents();
                        u.appendChild(m), d.insertNode(u), l = u;
                    }
                    l = domUtils.getNextDomNode(l, !1, o);
                }
                e.moveToBookmark(s).moveToBookmark(n);
            }(i, this, t), n && (i.setStartBefore(n).collapse(!0), domUtils.remove(n)), i.select(), 
            !0;
        },
        queryCommandValue: function() {
            var e = FI(this);
            return e ? e.getAttribute("dir") : "ltr";
        }
    }, UE.plugins.horizontal = function() {
        this.commands.horizontal = {
            execCommand: function(e) {
                var t = this;
                if (-1 !== t.queryCommandState(e)) {
                    t.execCommand("insertHtml", "<hr>");
                    var i, n = t.selection.getRange(), o = n.startContainer;
                    if (1 == o.nodeType && !o.childNodes[n.startOffset]) (i = o.childNodes[n.startOffset - 1]) && 1 == i.nodeType && "HR" == i.tagName && ("p" == t.options.enterTag ? (i = t.document.createElement("p"), 
                    n.insertNode(i), n.setStart(i, 0).setCursor()) : (i = t.document.createElement("br"), 
                    n.insertNode(i), n.setStartBefore(i).setCursor()));
                    return !0;
                }
            },
            queryCommandState: function() {
                return domUtils.filterNodeList(this.selection.getStartElementPath(), "table") ? -1 : 0;
            }
        }, this.addListener("delkeydown", function(e, t) {
            var i = this.selection.getRange();
            if (i.txtToElmBoundary(!0), domUtils.isStartInblock(i)) {
                var n = i.startContainer.previousSibling;
                if (n && domUtils.isTagNode(n, "hr")) return domUtils.remove(n), i.select(), domUtils.preventDefault(t), 
                !0;
            }
        });
    }, UE.commands.time = UE.commands.date = {
        execCommand: function(e, t) {
            var i, n, o, r, a, s, l, d, c, u, m, f = new Date();
            this.execCommand("insertHtml", "time" == e ? (d = t, c = ("0" + (l = f).getHours()).slice(-2), 
            u = ("0" + l.getMinutes()).slice(-2), m = ("0" + l.getSeconds()).slice(-2), (d = d || "hh:ii:ss").replace(/hh/gi, c).replace(/ii/gi, u).replace(/ss/gi, m)) : (n = t, 
            o = ("000" + (i = f).getFullYear()).slice(-4), r = o.slice(-2), a = ("0" + (i.getMonth() + 1)).slice(-2), 
            s = ("0" + i.getDate()).slice(-2), (n = n || "yyyy-mm-dd").replace(/yyyy/gi, o).replace(/yy/gi, r).replace(/mm/gi, a).replace(/dd/gi, s)));
        }
    }, UE.plugins.rowspacing = function() {
        this.setOpt({
            rowspacingtop: [ "5", "10", "15", "20", "25" ],
            rowspacingbottom: [ "5", "10", "15", "20", "25" ]
        }), this.commands.rowspacing = {
            execCommand: function(e, t, i) {
                return this.execCommand("paragraph", "p", {
                    style: "margin-" + i + ":" + t + "px"
                }), !0;
            },
            queryCommandValue: function(e, t) {
                var i = domUtils.filterNodeList(this.selection.getStartElementPath(), function(e) {
                    return domUtils.isBlockElm(e);
                });
                return i && domUtils.getComputedStyle(i, "margin-" + t).replace(/[^\d]/g, "") || 0;
            }
        };
    }, UE.plugins.lineheight = function() {
        this.setOpt({
            lineheight: [ "1", "1.5", "1.75", "2", "3", "4", "5" ]
        }), this.commands.lineheight = {
            execCommand: function(e, t) {
                return this.execCommand("paragraph", "p", {
                    style: "line-height:" + ("1" == t ? "normal" : t + "em")
                }), !0;
            },
            queryCommandValue: function() {
                var e = domUtils.filterNodeList(this.selection.getStartElementPath(), function(e) {
                    return domUtils.isBlockElm(e);
                });
                if (e) {
                    var t = domUtils.getComputedStyle(e, "line-height");
                    return "normal" == t ? 1 : t.replace(/[^\d.]*/gi, "");
                }
            }
        };
    }, UE.plugins.insertcode = function() {
        var d = this;
        d.ready(function() {
            utils.cssRule("pre", "pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}", d.document);
        }), d.setOpt("insertcode", {
            as3: "ActionScript3",
            bash: "Bash/Shell",
            cpp: "C/C++",
            css: "Css",
            cf: "CodeFunction",
            "c#": "C#",
            delphi: "Delphi",
            diff: "Diff",
            erlang: "Erlang",
            groovy: "Groovy",
            html: "Html",
            java: "Java",
            jfx: "JavaFx",
            js: "Javascript",
            pl: "Perl",
            php: "Php",
            plain: "Plain Text",
            ps: "PowerShell",
            python: "Python",
            ruby: "Ruby",
            scala: "Scala",
            sql: "Sql",
            vb: "Vb",
            xml: "Xml"
        }), d.commands.insertcode = {
            execCommand: function(e, t) {
                var i = this, n = i.selection.getRange(), o = domUtils.findParentByTagName(n.startContainer, "pre", !0);
                if (o) o.className = "brush:" + t + ";toolbar:false;"; else {
                    var r = "";
                    if (n.collapsed) r = browser.ie && browser.ie11below ? browser.version <= 8 ? "&nbsp;" : "" : "<br/>"; else {
                        var a = n.extractContents(), s = i.document.createElement("div");
                        s.appendChild(a), utils.each(UE.filterNode(UE.htmlparser(s.innerHTML.replace(/[\r\t]/g, "")), i.options.filterTxtRules).children, function(t) {
                            if (browser.ie && browser.ie11below && 8 < browser.version) "element" == t.type ? "br" == t.tagName ? r += "\n" : dtd.$empty[t.tagName] || (utils.each(t.children, function(e) {
                                "element" == e.type ? "br" == e.tagName ? r += "\n" : dtd.$empty[t.tagName] || (r += e.innerText()) : r += e.data;
                            }), /\n$/.test(r) || (r += "\n")) : r += t.data + "\n", !t.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, "")); else if (browser.ie && browser.ie11below) "element" == t.type ? "br" == t.tagName ? r += "<br>" : dtd.$empty[t.tagName] || (utils.each(t.children, function(e) {
                                "element" == e.type ? "br" == e.tagName ? r += "<br>" : dtd.$empty[t.tagName] || (r += e.innerText()) : r += e.data;
                            }), /br>$/.test(r) || (r += "<br>")) : r += t.data + "<br>", !t.nextSibling() && /<br>$/.test(r) && (r = r.replace(/<br>$/, "")); else if (r += "element" == t.type ? dtd.$empty[t.tagName] ? "" : t.innerText() : t.data, 
                            !/br\/?\s*>$/.test(r)) {
                                if (!t.nextSibling()) return;
                                r += "<br>";
                            }
                        });
                    }
                    i.execCommand("inserthtml", '<pre id="coder"class="brush:' + t + ';toolbar:false">' + r + "</pre>", !0), 
                    o = i.document.getElementById("coder"), domUtils.removeAttributes(o, "id");
                    var l = o.previousSibling;
                    l && (3 == l.nodeType && 1 == l.nodeValue.length && browser.ie && 6 == browser.version || domUtils.isEmptyBlock(l)) && domUtils.remove(l);
                    n = i.selection.getRange();
                    domUtils.isEmptyBlock(o) ? n.setStart(o, 0).setCursor(!1, !0) : n.selectNodeContents(o).select();
                }
            },
            queryCommandValue: function() {
                var e = this.selection.getStartElementPath(), i = "";
                return utils.each(e, function(e) {
                    if ("PRE" == e.nodeName) {
                        var t = e.className.match(/brush:([^;]+)/);
                        return i = t && t[1] ? t[1] : "", !1;
                    }
                }), i;
            }
        }, d.addInputRule(function(e) {
            utils.each(e.getNodesByTagName("pre"), function(t) {
                var e = t.getNodesByTagName("br");
                if (e.length) browser.ie && browser.ie11below && 8 < browser.version && utils.each(e, function(e) {
                    var t = UE.uNode.createText("\n");
                    e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e);
                }); else if (!(browser.ie && browser.ie11below && 8 < browser.version)) {
                    var i = t.innerText().split(/\n/);
                    t.innerHTML(""), utils.each(i, function(e) {
                        e.length && t.appendChild(UE.uNode.createText(e)), t.appendChild(UE.uNode.createElement("br"));
                    });
                }
            });
        }), d.addOutputRule(function(e) {
            utils.each(e.getNodesByTagName("pre"), function(e) {
                var t = "";
                utils.each(e.children, function(e) {
                    "text" == e.type ? t += e.data.replace(/[ ]/g, "&nbsp;").replace(/\n$/, "") : "br" == e.tagName ? t += "\n" : t += dtd.$empty[e.tagName] ? e.innerText() : "";
                }), e.innerText(t.replace(/(&nbsp;|\n)+$/, ""));
            });
        }), d.notNeedCodeQuery = {
            help: 1,
            undo: 1,
            redo: 1,
            source: 1,
            print: 1,
            searchreplace: 1,
            fullscreen: 1,
            preview: 1,
            insertparagraph: 1,
            elementpath: 1,
            insertcode: 1,
            inserthtml: 1,
            selectall: 1
        };
        d.queryCommandState;
        d.queryCommandState = function(e) {
            return !this.notNeedCodeQuery[e.toLowerCase()] && this.selection && this.queryCommandValue("insertcode") ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments);
        }, d.addListener("beforeenterkeydown", function() {
            var e = d.selection.getRange();
            if (t = domUtils.findParentByTagName(e.startContainer, "pre", !0)) {
                if (d.fireEvent("saveScene"), e.collapsed || e.deleteContents(), !browser.ie || browser.ie9above) {
                    var t, i = d.document.createElement("br");
                    for (e.insertNode(i).setStartAfter(i).collapse(!0), i.nextSibling || browser.ie && !(10 < browser.version) ? e.setStartAfter(i) : e.insertNode(i.cloneNode(!1)), 
                    t = i.previousSibling; t; ) if (!(t = (s = t).previousSibling) || "BR" == t.nodeName) {
                        t = s;
                        break;
                    }
                    if (t) {
                        for (var n = ""; t && "BR" != t.nodeName && new RegExp("^[\\s" + domUtils.fillChar + "]*$").test(t.nodeValue); ) n += t.nodeValue, 
                        t = t.nextSibling;
                        if ("BR" != t.nodeName) (l = t.nodeValue.match(new RegExp("^([\\s" + domUtils.fillChar + "]+)"))) && l[1] && (n += l[1]);
                        n && (n = d.document.createTextNode(n), e.insertNode(n).setStartAfter(n));
                    }
                    e.collapse(!0).select(!0);
                } else if (8 < browser.version) {
                    var o = d.document.createTextNode("\n"), r = e.startContainer;
                    if (0 == e.startOffset) {
                        if (r.previousSibling) {
                            e.insertNode(o);
                            var a = d.document.createTextNode(" ");
                            e.setStartAfter(o).insertNode(a).setStart(a, 0).collapse(!0).select(!0);
                        }
                    } else {
                        e.insertNode(o).setStartAfter(o);
                        a = d.document.createTextNode(" ");
                        (r = e.startContainer.childNodes[e.startOffset]) && !/^\n/.test(r.nodeValue) && e.setStartBefore(o), 
                        e.insertNode(a).setStart(a, 0).collapse(!0).select(!0);
                    }
                } else {
                    var s;
                    i = d.document.createElement("br");
                    for (e.insertNode(i), e.insertNode(d.document.createTextNode(domUtils.fillChar)), 
                    e.setStartAfter(i), t = i.previousSibling; t; ) if (!(t = (s = t).previousSibling) || "BR" == t.nodeName) {
                        t = s;
                        break;
                    }
                    if (t) {
                        var l;
                        for (n = ""; t && "BR" != t.nodeName && new RegExp("^[ " + domUtils.fillChar + "]*$").test(t.nodeValue); ) n += t.nodeValue, 
                        t = t.nextSibling;
                        if ("BR" != t.nodeName) (l = t.nodeValue.match(new RegExp("^([ " + domUtils.fillChar + "]+)"))) && l[1] && (n += l[1]);
                        n = d.document.createTextNode(n), e.insertNode(n).setStartAfter(n);
                    }
                    e.collapse(!0).select();
                }
                return d.fireEvent("saveScene"), !0;
            }
        }), d.addListener("tabkeydown", function(e, t) {
            var i = d.selection.getRange(), n = domUtils.findParentByTagName(i.startContainer, "pre", !0);
            if (n) {
                if (d.fireEvent("saveScene"), t.shiftKey) ; else if (i.collapsed) {
                    var o = d.document.createTextNode("    ");
                    i.insertNode(o).setStartAfter(o).collapse(!0).select(!0);
                } else {
                    for (var r = i.createBookmark(), a = r.start.previousSibling; a; ) {
                        if (n.firstChild === a && !domUtils.isBr(a)) {
                            n.insertBefore(d.document.createTextNode("    "), a);
                            break;
                        }
                        if (domUtils.isBr(a)) {
                            n.insertBefore(d.document.createTextNode("    "), a.nextSibling);
                            break;
                        }
                        a = a.previousSibling;
                    }
                    var s = r.end;
                    for (a = r.start.nextSibling, n.firstChild === r.start && n.insertBefore(d.document.createTextNode("    "), a.nextSibling); a && a !== s; ) {
                        if (domUtils.isBr(a) && a.nextSibling) {
                            if (a.nextSibling === s) break;
                            n.insertBefore(d.document.createTextNode("    "), a.nextSibling);
                        }
                        a = a.nextSibling;
                    }
                    i.moveToBookmark(r).select();
                }
                return d.fireEvent("saveScene"), !0;
            }
        }), d.addListener("beforeinserthtml", function(e, t) {
            var i = this, n = i.selection.getRange();
            if (domUtils.findParentByTagName(n.startContainer, "pre", !0)) {
                n.collapsed || n.deleteContents();
                var o = "";
                if (browser.ie && 8 < browser.version) {
                    utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function(t) {
                        "element" == t.type ? "br" == t.tagName ? o += "\n" : dtd.$empty[t.tagName] || (utils.each(t.children, function(e) {
                            "element" == e.type ? "br" == e.tagName ? o += "\n" : dtd.$empty[t.tagName] || (o += e.innerText()) : o += e.data;
                        }), /\n$/.test(o) || (o += "\n")) : o += t.data + "\n", !t.nextSibling() && /\n$/.test(o) && (o = o.replace(/\n$/, ""));
                    });
                    var r = i.document.createTextNode(utils.html(o.replace(/&nbsp;/g, " ")));
                    n.insertNode(r).selectNode(r).select();
                } else {
                    var a = i.document.createDocumentFragment();
                    utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function(t) {
                        "element" == t.type ? "br" == t.tagName ? a.appendChild(i.document.createElement("br")) : dtd.$empty[t.tagName] || (utils.each(t.children, function(e) {
                            "element" == e.type ? "br" == e.tagName ? a.appendChild(i.document.createElement("br")) : dtd.$empty[t.tagName] || a.appendChild(i.document.createTextNode(utils.html(e.innerText().replace(/&nbsp;/g, " ")))) : a.appendChild(i.document.createTextNode(utils.html(e.data.replace(/&nbsp;/g, " "))));
                        }), "BR" != a.lastChild.nodeName && a.appendChild(i.document.createElement("br"))) : a.appendChild(i.document.createTextNode(utils.html(t.data.replace(/&nbsp;/g, " ")))), 
                        t.nextSibling() || "BR" != a.lastChild.nodeName || a.removeChild(a.lastChild);
                    }), n.insertNode(a).select();
                }
                return !0;
            }
        }), d.addListener("keydown", function(e, t) {
            if (40 == (t.keyCode || t.which)) {
                var i, n = this.selection.getRange(), o = n.startContainer;
                if (n.collapsed && (i = domUtils.findParentByTagName(n.startContainer, "pre", !0)) && !i.nextSibling) {
                    for (var r = i.lastChild; r && "BR" == r.nodeName; ) r = r.previousSibling;
                    (r === o || n.startContainer === i && n.startOffset == i.childNodes.length) && (this.execCommand("insertparagraph"), 
                    domUtils.preventDefault(t));
                }
            }
        }), d.addListener("delkeydown", function(e, t) {
            var i = this.selection.getRange();
            i.txtToElmBoundary(!0);
            var n = i.startContainer;
            if (domUtils.isTagNode(n, "pre") && i.collapsed && domUtils.isStartInblock(i)) {
                var o = d.document.createElement("p");
                return domUtils.fillNode(d.document, o), n.parentNode.insertBefore(o, n), domUtils.remove(n), 
                i.setStart(o, 0).setCursor(!1, !0), domUtils.preventDefault(t), !0;
            }
        });
    }, UE.commands.cleardoc = {
        execCommand: function(e) {
            var t = this, i = t.options.enterTag, n = t.selection.getRange();
            "br" == i ? (t.body.innerHTML = "<br/>", n.setStart(t.body, 0).setCursor()) : (t.body.innerHTML = "<p>" + (ie ? "" : "<br/>") + "</p>", 
            n.setStart(t.body.firstChild, 0).setCursor(!1, !0)), setTimeout(function() {
                t.fireEvent("clearDoc");
            }, 0);
        }
    }, UE.plugin.register("anchor", function() {
        return {
            bindEvents: {
                ready: function() {
                    utils.cssRule("anchor", ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}", this.document);
                }
            },
            outputRule: function(e) {
                utils.each(e.getNodesByTagName("img"), function(e) {
                    var t;
                    (t = e.getAttr("anchorname")) && (e.tagName = "a", e.setAttr({
                        anchorname: "",
                        name: t,
                        class: ""
                    }));
                });
            },
            inputRule: function(e) {
                utils.each(e.getNodesByTagName("a"), function(e) {
                    var t;
                    if ((t = e.getAttr("name")) && !e.getAttr("href")) {
                        if (/^\_Toc\d+$/.test(t)) return void e.parentNode.removeChild(e);
                        e.tagName = "img", e.setAttr({
                            anchorname: e.getAttr("name"),
                            class: "anchorclass"
                        }), e.setAttr("name");
                    }
                });
            },
            commands: {
                anchor: {
                    execCommand: function(e, t) {
                        var i = this.selection.getRange(), n = i.getClosedNode();
                        if (n && n.getAttribute("anchorname")) t ? n.setAttribute("anchorname", t) : (i.setStartBefore(n).setCursor(), 
                        domUtils.remove(n)); else if (t) {
                            var o = this.document.createElement("img");
                            i.collapse(!0), domUtils.setAttributes(o, {
                                anchorname: t,
                                class: "anchorclass"
                            }), i.insertNode(o).setStartAfter(o).setCursor(!1, !0);
                        }
                    }
                }
            }
        };
    }), UE.plugins.wordcount = function() {
        var i, e = this;
        e.setOpt("wordCount", !0), e.addListener("contentchange", function() {
            e.fireEvent("wordcount");
        }), e.addListener("ready", function() {
            var t = this;
            domUtils.on(t.body, "keyup", function(e) {
                (e.keyCode || e.which) in {
                    16: 1,
                    18: 1,
                    20: 1,
                    37: 1,
                    38: 1,
                    39: 1,
                    40: 1
                } || (clearTimeout(i), i = setTimeout(function() {
                    t.fireEvent("wordcount");
                }, 200));
            });
        });
    }, UE.plugins.pagebreak = function() {
        var c = this, u = [ "td" ];
        function m(e) {
            if (domUtils.isEmptyBlock(e)) {
                for (var t, i = e.firstChild; i && 1 == i.nodeType && domUtils.isEmptyBlock(i); ) i = (t = i).firstChild;
                !t && (t = e), domUtils.fillNode(c.document, t);
            }
        }
        function f(e) {
            return e && 1 == e.nodeType && "HR" == e.tagName && "pagebreak" == e.className;
        }
        c.setOpt("pageBreakTag", "_ueditor_page_break_tag_"), c.ready(function() {
            utils.cssRule("pagebreak", ".pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}", c.document);
        }), c.addInputRule(function(e) {
            e.traversal(function(e) {
                if ("text" == e.type && e.data == c.options.pageBreakTag) {
                    var t = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">');
                    e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e);
                }
            });
        }), c.addOutputRule(function(e) {
            utils.each(e.getNodesByTagName("hr"), function(e) {
                if ("pagebreak" == e.getAttr("class")) {
                    var t = UE.uNode.createText(c.options.pageBreakTag);
                    e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e);
                }
            });
        }), c.commands.pagebreak = {
            execCommand: function() {
                var e = c.selection.getRange(), t = c.document.createElement("hr");
                domUtils.setAttributes(t, {
                    class: "pagebreak",
                    noshade: "noshade",
                    size: "5"
                }), domUtils.unSelectable(t);
                var i = domUtils.findParentByTagName(e.startContainer, u, !0), n = [];
                if (i) switch (i.tagName) {
                  case "TD":
                    if ((s = i.parentNode).previousSibling) s.parentNode.insertBefore(t, s), n = domUtils.findParents(t); else {
                        var o = domUtils.findParentByTagName(s, "table");
                        o.parentNode.insertBefore(t, o), n = domUtils.findParents(t, !0);
                    }
                    t !== (s = n[1]) && domUtils.breakParent(t, s), c.fireEvent("afteradjusttable", c.document);
                } else {
                    if (!e.collapsed) {
                        e.deleteContents();
                        for (var r = e.startContainer; !domUtils.isBody(r) && domUtils.isBlockElm(r) && domUtils.isEmptyNode(r); ) e.setStartBefore(r).collapse(!0), 
                        domUtils.remove(r), r = e.startContainer;
                    }
                    e.insertNode(t);
                    for (var a, s = t.parentNode; !domUtils.isBody(s); ) domUtils.breakParent(t, s), 
                    (a = t.nextSibling) && domUtils.isEmptyBlock(a) && domUtils.remove(a), s = t.parentNode;
                    a = t.nextSibling;
                    var l = t.previousSibling;
                    if (f(l) ? domUtils.remove(l) : l && m(l), a) f(a) ? domUtils.remove(a) : m(a), 
                    e.setEndAfter(t).collapse(!1); else {
                        var d = c.document.createElement("p");
                        t.parentNode.appendChild(d), domUtils.fillNode(c.document, d), e.setStart(d, 0).collapse(!0);
                    }
                    e.select(!0);
                }
            }
        };
    }, UE.plugin.register("wordimage", function() {
        var r = this, i = [];
        return {
            commands: {
                wordimage: {
                    execCommand: function() {
                        for (var e, t = domUtils.getElementsByTagName(r.body, "img"), i = [], n = 0; e = t[n++]; ) {
                            var o = e.getAttribute("word_img");
                            o && i.push(o);
                        }
                        return i;
                    },
                    queryCommandState: function() {
                        i = domUtils.getElementsByTagName(r.body, "img");
                        for (var e, t = 0; e = i[t++]; ) if (e.getAttribute("word_img")) return 1;
                        return -1;
                    },
                    notNeedUndo: !0
                }
            },
            inputRule: function(e) {
                utils.each(e.getNodesByTagName("img"), function(e) {
                    var t = e.attrs, i = parseInt(t.width) < 128 || parseInt(t.height) < 43, n = r.options, o = n.UEDITOR_HOME_URL + "themes/default/images/spacer.gif";
                    t.src && /^(?:(file:\/+))/.test(t.src) && e.setAttr({
                        width: t.width,
                        height: t.height,
                        alt: t.alt,
                        word_img: t.src,
                        src: o,
                        style: "background:url(" + (i ? n.themePath + n.theme + "/images/word.gif" : n.langPath + n.lang + "/images/localimage.png") + ") no-repeat center center;border:1px solid #ddd"
                    });
                });
            }
        };
    }), UE.plugins.dragdrop = function() {
        var o = this;
        o.ready(function() {
            domUtils.on(this.body, "dragend", function() {
                var e = o.selection.getRange(), t = e.getClosedNode() || o.selection.getStart();
                if (t && "IMG" == t.tagName) {
                    for (var i, n = t.previousSibling; (i = t.nextSibling) && 1 == i.nodeType && "SPAN" == i.tagName && !i.firstChild; ) domUtils.remove(i);
                    (!n || 1 != n.nodeType || domUtils.isEmptyBlock(n)) && n || i && (!i || domUtils.isEmptyBlock(i)) || (n && "P" == n.tagName && !domUtils.isEmptyBlock(n) ? (n.appendChild(t), 
                    domUtils.moveChild(i, n), domUtils.remove(i)) : i && "P" == i.tagName && !domUtils.isEmptyBlock(i) && i.insertBefore(t, i.firstChild), 
                    n && "P" == n.tagName && domUtils.isEmptyBlock(n) && domUtils.remove(n), i && "P" == i.tagName && domUtils.isEmptyBlock(i) && domUtils.remove(i), 
                    e.selectNode(t).select(), o.fireEvent("saveScene"));
                }
            });
        }), o.addListener("keyup", function(e, t) {
            if (13 == (t.keyCode || t.which)) {
                var i, n = o.selection.getRange();
                (i = domUtils.findParentByTagName(n.startContainer, "p", !0)) && "center" == domUtils.getComputedStyle(i, "text-align") && domUtils.removeStyle(i, "text-align");
            }
        });
    }, UE.plugins.undo = function() {
        var a, s = this, l = s.options.maxUndoCount || 20, r = s.options.maxInputCount || 20, o = new RegExp(domUtils.fillChar + "|</hr>", "gi"), d = {
            ol: 1,
            ul: 1,
            table: 1,
            tbody: 1,
            tr: 1,
            body: 1
        }, c = s.options.autoClearEmptyNode;
        function u(e, t) {
            if (e.length != t.length) return 0;
            for (var i = 0, n = e.length; i < n; i++) if (e[i] != t[i]) return 0;
            return 1;
        }
        s.undoManger = new function() {
            this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.undo = function() {
                if (this.hasUndo) {
                    if (!this.list[this.index - 1] && 1 == this.list.length) return void this.reset();
                    for (;this.list[this.index].content == this.list[this.index - 1].content; ) if (this.index--, 
                    0 == this.index) return this.restore(0);
                    this.restore(--this.index);
                }
            }, this.redo = function() {
                if (this.hasRedo) {
                    for (;this.list[this.index].content == this.list[this.index + 1].content; ) if (this.index++, 
                    this.index == this.list.length - 1) return this.restore(this.index);
                    this.restore(++this.index);
                }
            }, this.restore = function() {
                var t = this.editor, e = this.list[this.index], i = UE.htmlparser(e.content.replace(o, ""));
                t.options.autoClearEmptyNode = !1, t.filterInputRule(i), t.options.autoClearEmptyNode = c, 
                t.document.body.innerHTML = i.toHtml(), t.fireEvent("afterscencerestore"), browser.ie && utils.each(domUtils.getElementsByTagName(t.document, "td th caption p"), function(e) {
                    domUtils.isEmptyNode(e) && domUtils.fillNode(t.document, e);
                });
                try {
                    var n = new dom.Range(t.document).moveToAddress(e.address);
                    n.select(d[n.startContainer.nodeName.toLowerCase()]);
                } catch (e) {}
                this.update(), this.clearKey(), t.fireEvent("reset", !0);
            }, this.getScene = function() {
                var e = this.editor, t = e.selection.getRange().createAddress(!1, !0);
                e.fireEvent("beforegetscene");
                var i = UE.htmlparser(e.body.innerHTML);
                e.options.autoClearEmptyNode = !1, e.filterOutputRule(i), e.options.autoClearEmptyNode = c;
                var n = i.toHtml();
                return e.fireEvent("aftergetscene"), {
                    address: t,
                    content: n
                };
            }, this.save = function(e, t) {
                clearTimeout(a);
                var i, n, o = this.getScene(t), r = this.list[this.index];
                r && r.content != o.content && s.trigger("contentchange"), r && r.content == o.content && (e || (i = r.address, 
                n = o.address, i.collapsed == n.collapsed && u(i.startAddress, n.startAddress) && u(i.endAddress, n.endAddress))) || (this.list = this.list.slice(0, this.index + 1), 
                this.list.push(o), this.list.length > l && this.list.shift(), this.index = this.list.length - 1, 
                this.clearKey(), this.update());
            }, this.update = function() {
                this.hasRedo = !!this.list[this.index + 1], this.hasUndo = !!this.list[this.index - 1];
            }, this.reset = function() {
                this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.clearKey();
            }, this.clearKey = function() {
                f = 0, null;
            };
        }(), (s.undoManger.editor = s).addListener("saveScene", function() {
            var e, t = Array.prototype.splice.call(arguments, 1);
            (e = this.undoManger).save.apply(e, _toConsumableArray(t));
        }), s.addListener("reset", function(e, t) {
            t || this.undoManger.reset();
        }), s.commands.redo = s.commands.undo = {
            execCommand: function(e) {
                this.undoManger[e]();
            },
            queryCommandState: function(e) {
                return this.undoManger["has" + ("undo" == e.toLowerCase() ? "Undo" : "Redo")] ? 0 : -1;
            },
            notNeedUndo: 1
        };
        var m = {
            16: 1,
            17: 1,
            18: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1
        }, f = 0, h = !1;
        s.addListener("ready", function() {
            domUtils.on(this.body, "compositionstart", function() {
                h = !0;
            }), domUtils.on(this.body, "compositionend", function() {
                h = !1;
            });
        }), s.addshortcutkey({
            Undo: "ctrl+90",
            Redo: "ctrl+89"
        });
        var p = !0;
        s.addListener("keydown", function(e, t) {
            var i = this, n = t.keyCode || t.which;
            if (!(m[n] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
                var o = function(e) {
                    e.undoManger.save(!1, !0), e.fireEvent("selectionchange");
                };
                if (h) return;
                if (!i.selection.getRange().collapsed) return i.undoManger.save(!1, !0), void (p = !1);
                0 == i.undoManger.list.length && i.undoManger.save(!0), clearTimeout(a), a = setTimeout(function() {
                    if (h) var e = setInterval(function() {
                        h || (o(i), clearInterval(e));
                    }, 300); else o(i);
                }, 200), n, r <= ++f && o(i);
            }
        }), s.addListener("keyup", function(e, t) {
            var i = t.keyCode || t.which;
            if (!(m[i] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
                if (h) return;
                p || (this.undoManger.save(!1, !0), p = !0);
            }
        }), s.stopCmdUndo = function() {
            s.__hasEnterExecCommand = !0;
        }, s.startCmdUndo = function() {
            s.__hasEnterExecCommand = !1;
        };
    }, UE.plugin.register("copy", function() {
        var o = this;
        function e() {
            ZeroClipboard.config({
                debug: !1,
                swfPath: "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/zeroclipboard/ZeroClipboard.swf"
            });
            var e = o.zeroclipboard = new ZeroClipboard();
            e.on("copy", function(e) {
                var t = e.client, i = o.selection.getRange(), n = document.createElement("div");
                n.appendChild(i.cloneContents()), t.setText(n.innerText || n.textContent), t.setHtml(n.innerHTML), 
                i.select();
            }), e.on("mouseover mouseout", function(e) {
                var t = e.target;
                t && ("mouseover" == e.type ? domUtils.addClass(t, "edui-state-hover") : "mouseout" == e.type && domUtils.removeClasses(t, "edui-state-hover"));
            }), e.on("wrongflash noflash", function() {
                ZeroClipboard.destroy();
            }), o.fireEvent("zeroclipboardready", e);
        }
        return {
            bindEvents: {
                ready: function() {
                    browser.ie || (window.ZeroClipboard ? e() : utils.loadFile(document, {
                        src: "https://cdn.jsdelivr.net/npm/fex-editor@2.1.1/dist/third-party/zeroclipboard/ZeroClipboard.js",
                        tag: "script",
                        type: "text/javascript",
                        defer: "defer"
                    }, function() {
                        e();
                    }));
                }
            },
            commands: {
                copy: {
                    execCommand: function(e) {
                        o.document.execCommand("copy") || alert(o.getLang("copymsg"));
                    }
                }
            }
        };
    }), UE.plugins.paste = function() {
        function t(n) {
            var o = this.document;
            if (!o.getElementById("baidu_pastebin")) {
                var r = this.selection.getRange(), a = r.createBookmark(), s = o.createElement("div");
                s.id = "baidu_pastebin", browser.webkit && s.appendChild(o.createTextNode(domUtils.fillChar + domUtils.fillChar)), 
                o.body.appendChild(s), a.start.style.display = "", s.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:" + domUtils.getXY(a.start).y + "px", 
                r.selectNodeContents(s).select(!0), setTimeout(function() {
                    if (browser.webkit) for (var e, t = 0, i = o.querySelectorAll("#baidu_pastebin"); e = i[t++]; ) {
                        if (!domUtils.isEmptyNode(e)) {
                            s = e;
                            break;
                        }
                        domUtils.remove(e);
                    }
                    try {
                        s.parentNode.removeChild(s);
                    } catch (e) {}
                    r.moveToBookmark(a).select(!0), n(s);
                }, 0);
            }
        }
        var v, b, y, C = this;
        function N(e) {
            return e.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function(e, t, i, n) {
                return {
                    img: 1
                }[i = i.toLowerCase()] ? e : (n = n.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function(e, t, i) {
                    return {
                        src: 1,
                        href: 1,
                        name: 1
                    }[t.toLowerCase()] ? t + "=" + i + " " : "";
                }), {
                    span: 1,
                    div: 1
                }[i] ? "" : "<" + t + i + " " + utils.trim(n) + ">");
            });
        }
        function i(e) {
            var t;
            if (e.firstChild) {
                for (var i, n = domUtils.getElementsByTagName(e, "span"), o = 0; i = n[o++]; ) "_baidu_cut_start" != i.id && "_baidu_cut_end" != i.id || domUtils.remove(i);
                if (browser.webkit) {
                    var r, a = e.querySelectorAll("div br");
                    for (o = 0; r = a[o++]; ) {
                        var s = r.parentNode;
                        "DIV" == s.tagName && 1 == s.childNodes.length && (s.innerHTML = "<p><br/></p>", 
                        domUtils.remove(s));
                    }
                    var l, d = e.querySelectorAll("#baidu_pastebin");
                    for (o = 0; l = d[o++]; ) {
                        var c = C.document.createElement("p");
                        for (l.parentNode.insertBefore(c, l); l.firstChild; ) c.appendChild(l.firstChild);
                        domUtils.remove(l);
                    }
                    var u = e.querySelectorAll("meta");
                    for (o = 0; f = u[o++]; ) domUtils.remove(f);
                    a = e.querySelectorAll("br");
                    for (o = 0; f = a[o++]; ) /^apple-/i.test(f.className) && domUtils.remove(f);
                }
                if (browser.gecko) {
                    var m = e.querySelectorAll("[_moz_dirty]");
                    for (o = 0; f = m[o++]; ) f.removeAttribute("_moz_dirty");
                }
                if (!browser.ie) {
                    var f, h = e.querySelectorAll("span.Apple-style-span");
                    for (o = 0; f = h[o++]; ) domUtils.remove(f, !0);
                }
                t = e.innerHTML, t = UE.filterWord(t);
                var p = UE.htmlparser(t);
                if (C.options.filterRules && UE.filterNode(p, C.options.filterRules), C.filterInputRule(p), 
                browser.webkit) {
                    var g = p.lastChild();
                    g && "element" == g.type && "br" == g.tagName && p.removeChild(g), utils.each(C.body.querySelectorAll("div"), function(e) {
                        domUtils.isEmptyBlock(e) && domUtils.remove(e, !0);
                    });
                }
                if (t = {
                    html: p.toHtml()
                }, C.fireEvent("beforepaste", t, p), !t.html) return;
                p = UE.htmlparser(t.html, !0), 1 === C.queryCommandState("pasteplain") ? C.execCommand("insertHtml", UE.filterNode(p, C.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(p, C.options.filterTxtRules), 
                v = p.toHtml(), b = t.html, y = C.selection.getRange().createAddress(!0), C.execCommand("insertHtml", !0 === C.getOpt("retainOnlyLabelPasted") ? N(b) : b, !0)), 
                C.fireEvent("afterpaste", t);
            }
        }
        C.setOpt({
            retainOnlyLabelPasted: !1
        }), C.addListener("pasteTransfer", function(e, t) {
            if (y && v && b && v != b) {
                var i = C.selection.getRange();
                if (i.moveToAddress(y, !0), !i.collapsed) {
                    for (;!domUtils.isBody(i.startContainer); ) {
                        var n = i.startContainer;
                        if (1 == n.nodeType) {
                            if (!(n = n.childNodes[i.startOffset])) {
                                i.setStartBefore(i.startContainer);
                                continue;
                            }
                            var o = n.previousSibling;
                            o && 3 == o.nodeType && new RegExp("^[\n\r\t " + domUtils.fillChar + "]*$").test(o.nodeValue) && i.setStartBefore(o);
                        }
                        if (0 != i.startOffset) break;
                        i.setStartBefore(i.startContainer);
                    }
                    for (;!domUtils.isBody(i.endContainer); ) {
                        var r = i.endContainer;
                        if (1 == r.nodeType) {
                            if (!(r = r.childNodes[i.endOffset])) {
                                i.setEndAfter(i.endContainer);
                                continue;
                            }
                            var a = r.nextSibling;
                            a && 3 == a.nodeType && new RegExp("^[\n\r\t" + domUtils.fillChar + "]*$").test(a.nodeValue) && i.setEndAfter(a);
                        }
                        if (i.endOffset != i.endContainer[3 == i.endContainer.nodeType ? "nodeValue" : "childNodes"].length) break;
                        i.setEndAfter(i.endContainer);
                    }
                }
                i.deleteContents(), i.select(!0), C.__hasEnterExecCommand = !0;
                var s = b;
                2 === t ? s = N(s) : t && (s = v), C.execCommand("inserthtml", s, !0), C.__hasEnterExecCommand = !1;
                for (var l = C.selection.getRange(); !domUtils.isBody(l.startContainer) && !l.startOffset && l.startContainer[3 == l.startContainer.nodeType ? "nodeValue" : "childNodes"].length; ) l.setStartBefore(l.startContainer);
                var d = l.createAddress(!0);
                y.endAddress = d.startAddress;
            }
        }), C.addListener("ready", function() {
            domUtils.on(C.body, "cut", function() {
                !C.selection.getRange().collapsed && C.undoManger && C.undoManger.save();
            }), domUtils.on(C.body, browser.ie || browser.opera ? "keydown" : "paste", function(e) {
                (!browser.ie && !browser.opera || (e.ctrlKey || e.metaKey) && "86" == e.keyCode) && t.call(C, function(e) {
                    i(e);
                });
            });
        }), C.commands.paste = {
            execCommand: function(e) {
                browser.ie ? (t.call(C, function(e) {
                    i(e);
                }), C.document.execCommand("paste")) : alert(C.getLang("pastemsg"));
            }
        };
    }, UE.plugins.pasteplain = function() {
        this.setOpt({
            pasteplain: !1,
            filterTxtRules: function() {
                function e(e) {
                    e.tagName = "p", e.setStyle();
                }
                function t(e) {
                    e.parentNode.removeChild(e, !0);
                }
                return {
                    "-": "script style object iframe embed input select",
                    p: {
                        $: {}
                    },
                    br: {
                        $: {}
                    },
                    div: function(e) {
                        for (var t, i = UE.uNode.createElement("p"); t = e.firstChild(); ) "text" != t.type && UE.dom.dtd.$block[t.tagName] ? i.firstChild() ? (e.parentNode.insertBefore(i, e), 
                        i = UE.uNode.createElement("p")) : e.parentNode.insertBefore(t, e) : i.appendChild(t);
                        i.firstChild() && e.parentNode.insertBefore(i, e), e.parentNode.removeChild(e);
                    },
                    ol: t,
                    ul: t,
                    dl: t,
                    dt: t,
                    dd: t,
                    li: t,
                    caption: e,
                    th: e,
                    tr: e,
                    h1: e,
                    h2: e,
                    h3: e,
                    h4: e,
                    h5: e,
                    h6: e,
                    td: function(e) {
                        !!e.innerText() && e.parentNode.insertAfter(UE.uNode.createText(" &nbsp; &nbsp;"), e), 
                        e.parentNode.removeChild(e, e.innerText());
                    }
                };
            }()
        });
        var e = this.options.pasteplain;
        this.commands.pasteplain = {
            queryCommandState: function() {
                return e ? 1 : 0;
            },
            execCommand: function() {
                e = 0 | !e;
            },
            notNeedUndo: 1
        };
    }, UE.plugins.list = function() {
        var C = this, _ = {
            TD: 1,
            PRE: 1,
            BLOCKQUOTE: 1
        }, d = {
            cn: "cn-1-",
            cn1: "cn-2-",
            cn2: "cn-3-",
            num: "num-1-",
            num1: "num-2-",
            num2: "num-3-",
            dash: "dash",
            dot: "dot"
        };
        function e(e) {
            var t = [];
            for (var i in e) t.push(i);
            return t;
        }
        C.setOpt({
            autoTransWordToList: !1,
            insertorderedlist: {
                num: "",
                num1: "",
                num2: "",
                cn: "",
                cn1: "",
                cn2: "",
                decimal: "",
                "lower-alpha": "",
                "lower-roman": "",
                "upper-alpha": "",
                "upper-roman": ""
            },
            insertunorderedlist: {
                circle: "",
                disc: "",
                square: "",
                dash: "",
                dot: ""
            },
            listDefaultPaddingLeft: "30",
            listiconpath: "http://bs.baidu.com/listicon/",
            maxListLevel: -1,
            disablePInList: !1
        });
        var h = {
            OL: e(C.options.insertorderedlist),
            UL: e(C.options.insertunorderedlist)
        }, n = C.options.listiconpath;
        for (var t in d) C.options.insertorderedlist.hasOwnProperty(t) || C.options.insertunorderedlist.hasOwnProperty(t) || delete d[t];
        function L(e) {
            var t = e.className;
            return domUtils.hasClass(e, /custom_/) ? t.match(/custom_(\w+)/)[1] : domUtils.getStyle(e, "list-style-type");
        }
        function a(s, l) {
            utils.each(domUtils.getElementsByTagName(s, "ol ul"), function(o) {
                if (domUtils.inDoc(o, s)) {
                    var e = o.parentNode;
                    if (e.tagName == o.tagName) {
                        var t = L(o) || ("OL" == o.tagName ? "decimal" : "disc");
                        if (t == (L(e) || ("OL" == e.tagName ? "decimal" : "disc"))) {
                            var i = utils.indexOf(h[o.tagName], t);
                            i = i + 1 == h[o.tagName].length ? 0 : i + 1, D(o, h[o.tagName][i]);
                        }
                    }
                    var r = 0, n = 2;
                    domUtils.hasClass(o, /custom_/) ? /[ou]l/i.test(e.tagName) && domUtils.hasClass(e, /custom_/) || (n = 1) : /[ou]l/i.test(e.tagName) && domUtils.hasClass(e, /custom_/) && (n = 3);
                    var a = domUtils.getStyle(o, "list-style-type");
                    a && (o.style.cssText = "list-style-type:" + a), o.className = utils.trim(o.className.replace(/list-paddingleft-\w+/, "")) + " list-paddingleft-" + n, 
                    utils.each(domUtils.getElementsByTagName(o, "li"), function(e) {
                        if (e.style.cssText && (e.style.cssText = ""), e.firstChild) {
                            if (e.parentNode === o) {
                                if (r++, domUtils.hasClass(o, /custom_/)) {
                                    var t = 1, i = L(o);
                                    if ("OL" == o.tagName) {
                                        if (i) switch (i) {
                                          case "cn":
                                          case "cn1":
                                          case "cn2":
                                            10 < r && (r % 10 == 0 || 10 < r && r < 20) ? t = 2 : 20 < r && (t = 3);
                                            break;

                                          case "num2":
                                            9 < r && (t = 2);
                                        }
                                        e.className = "list-" + d[i] + r + " list-" + i + "-paddingleft-" + t;
                                    } else e.className = "list-" + d[i] + " list-" + i + "-paddingleft";
                                } else e.className = e.className.replace(/list-[\w\-]+/gi, "");
                                var n = e.getAttribute("class");
                                null === n || n.replace(/\s/g, "") || domUtils.removeAttributes(e, "class");
                            }
                        } else domUtils.remove(e);
                    }), !l && R(o, o.tagName.toLowerCase(), L(o) || domUtils.getStyle(o, "list-style-type"), !0);
                }
            });
        }
        function R(e, t, i, n) {
            var o = e.nextSibling;
            o && 1 == o.nodeType && o.tagName.toLowerCase() == t && (L(o) || domUtils.getStyle(o, "list-style-type") || ("ol" == t ? "decimal" : "disc")) == i && (domUtils.moveChild(o, e), 
            0 == o.childNodes.length && domUtils.remove(o)), o && domUtils.isFillChar(o) && domUtils.remove(o);
            var r = e.previousSibling;
            r && 1 == r.nodeType && r.tagName.toLowerCase() == t && (L(r) || domUtils.getStyle(r, "list-style-type") || ("ol" == t ? "decimal" : "disc")) == i && domUtils.moveChild(e, r), 
            r && domUtils.isFillChar(r) && domUtils.remove(r), !n && domUtils.isEmptyBlock(e) && domUtils.remove(e), 
            L(e) && a(e.ownerDocument, !0);
        }
        function D(e, t) {
            d[t] && (e.className = "custom_" + t);
            try {
                domUtils.setStyle(e, "list-style-type", t);
            } catch (e) {}
        }
        function N(e) {
            var t = e.previousSibling;
            t && domUtils.isEmptyBlock(t) && domUtils.remove(t), (t = e.nextSibling) && domUtils.isEmptyBlock(t) && domUtils.remove(t);
        }
        function O(e) {
            for (;e && !domUtils.isBody(e); ) {
                if ("TABLE" == e.nodeName) return null;
                if ("LI" == e.nodeName) return e;
                e = e.parentNode;
            }
        }
        C.ready(function() {
            var e = [];
            for (var t in d) {
                if ("dash" == t || "dot" == t) e.push("li.list-" + d[t] + "{background-image:url(" + n + d[t] + ".gif)}"), 
                e.push("ul.custom_" + t + "{list-style:none;}ul.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}"); else {
                    for (var i = 0; i < 99; i++) e.push("li.list-" + d[t] + i + "{background-image:url(" + n + "list-" + d[t] + i + ".gif)}");
                    e.push("ol.custom_" + t + "{list-style:none;}ol.custom_" + t + " li{background-position:0 3px;background-repeat:no-repeat}");
                }
                switch (t) {
                  case "cn":
                    e.push("li.list-" + t + "-paddingleft-1{padding-left:25px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}"), 
                    e.push("li.list-" + t + "-paddingleft-3{padding-left:55px}");
                    break;

                  case "cn1":
                    e.push("li.list-" + t + "-paddingleft-1{padding-left:30px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}"), 
                    e.push("li.list-" + t + "-paddingleft-3{padding-left:55px}");
                    break;

                  case "cn2":
                    e.push("li.list-" + t + "-paddingleft-1{padding-left:40px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:55px}"), 
                    e.push("li.list-" + t + "-paddingleft-3{padding-left:68px}");
                    break;

                  case "num":
                  case "num1":
                    e.push("li.list-" + t + "-paddingleft-1{padding-left:25px}");
                    break;

                  case "num2":
                    e.push("li.list-" + t + "-paddingleft-1{padding-left:35px}"), e.push("li.list-" + t + "-paddingleft-2{padding-left:40px}");
                    break;

                  case "dash":
                    e.push("li.list-" + t + "-paddingleft{padding-left:35px}");
                    break;

                  case "dot":
                    e.push("li.list-" + t + "-paddingleft{padding-left:20px}");
                }
            }
            e.push(".list-paddingleft-1{padding-left:0}"), e.push(".list-paddingleft-2{padding-left:" + C.options.listDefaultPaddingLeft + "px}"), 
            e.push(".list-paddingleft-3{padding-left:" + 2 * C.options.listDefaultPaddingLeft + "px}"), 
            utils.cssRule("list", "ol,ul{margin:0;pading:0;" + (browser.ie ? "" : "width:95%") + "}li{clear:both;}" + e.join("\n"), C.document);
        }), C.ready(function() {
            domUtils.on(C.body, "cut", function() {
                setTimeout(function() {
                    var e, t = C.selection.getRange();
                    if (!t.collapsed && (e = domUtils.findParentByTagName(t.startContainer, "li", !0)) && !e.nextSibling && domUtils.isEmptyBlock(e)) {
                        var i, n = e.parentNode;
                        if (i = n.previousSibling) domUtils.remove(n), t.setStartAtLast(i).collapse(!0), 
                        t.select(!0); else if (i = n.nextSibling) domUtils.remove(n), t.setStartAtFirst(i).collapse(!0), 
                        t.select(!0); else {
                            var o = C.document.createElement("p");
                            domUtils.fillNode(C.document, o), n.parentNode.insertBefore(o, n), domUtils.remove(n), 
                            t.setStart(o, 0).collapse(!0), t.select(!0);
                        }
                    }
                });
            });
        }), C.addListener("beforepaste", function(o, e) {
            var t, i = this.selection.getRange(), r = UE.htmlparser(e.html, !0);
            if (t = domUtils.findParentByTagName(i.startContainer, "li", !0)) {
                var a = t.parentNode, n = "OL" == a.tagName ? "ul" : "ol";
                utils.each(r.getNodesByTagName(n), function(e) {
                    if (e.tagName = a.tagName, e.setAttr(), e.parentNode === r) o = L(a) || ("OL" == a.tagName ? "decimal" : "disc"); else {
                        var t = e.parentNode.getAttr("class");
                        (o = t && /custom_/.test(t) ? t.match(/custom_(\w+)/)[1] : e.parentNode.getStyle("list-style-type")) || (o = "OL" == a.tagName ? "decimal" : "disc");
                    }
                    var i = utils.indexOf(h[a.tagName], o);
                    e.parentNode !== r && (i = i + 1 == h[a.tagName].length ? 0 : i + 1);
                    var n = h[a.tagName][i];
                    d[n] ? e.setAttr("class", "custom_" + n) : e.setStyle("list-style-type", n);
                });
            }
            e.html = r.toHtml();
        }), !0 === C.getOpt("disablePInList") && C.addOutputRule(function(e) {
            utils.each(e.getNodesByTagName("li"), function(n) {
                var o = [], r = 0;
                utils.each(n.children, function(e) {
                    if ("p" == e.tagName) {
                        for (var t; t = e.children.pop(); ) o.splice(r, 0, t), t.parentNode = n, lastNode = t;
                        if (!(t = o[o.length - 1]) || "element" != t.type || "br" != t.tagName) {
                            var i = UE.uNode.createElement("br");
                            i.parentNode = n, o.push(i);
                        }
                        r = o.length;
                    }
                }), o.length && (n.children = o);
            });
        }), C.addInputRule(function(e) {
            if (utils.each(e.getNodesByTagName("li"), function(e) {
                for (var t, i = UE.uNode.createElement("p"), n = 0; t = e.children[n]; ) "text" == t.type || dtd.p[t.tagName] ? i.appendChild(t) : i.firstChild() ? (e.insertBefore(i, t), 
                i = UE.uNode.createElement("p"), n += 2) : n++;
                (i.firstChild() && !i.parentNode || !e.firstChild()) && e.appendChild(i), i.firstChild() || i.innerHTML(browser.ie ? "&nbsp;" : "<br/>");
                var o = e.firstChild(), r = o.lastChild();
                r && "text" == r.type && /^\s*$/.test(r.data) && o.removeChild(r);
            }), C.options.autoTransWordToList) {
                var s = function(e, t) {
                    var i = t.firstChild();
                    if (i && "element" == i.type && "span" == i.tagName && /Wingdings|Symbol/.test(i.getStyle("font-family"))) {
                        for (var n in o) if (o[n] == i.data) return n;
                        return "disc";
                    }
                    for (var n in l) if (l[n].test(e)) return n;
                }, l = {
                    num1: /^\d+\)/,
                    decimal: /^\d+\./,
                    "lower-alpha": /^[a-z]+\)/,
                    "upper-alpha": /^[A-Z]+\./,
                    cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
                    cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
                }, o = {
                    square: "n"
                };
                utils.each(e.getNodesByTagName("p"), function(e) {
                    if ("MsoListParagraph" == e.getAttr("class")) {
                        e.setStyle("margin", ""), e.setStyle("margin-left", ""), e.setAttr("class", "");
                        var t, i = e, n = e;
                        if ("li" != e.parentNode.tagName && (t = s(e.innerText(), e))) {
                            var o = UE.uNode.createElement(C.options.insertorderedlist.hasOwnProperty(t) ? "ol" : "ul");
                            for (d[t] ? o.setAttr("class", "custom_" + t) : o.setStyle("list-style-type", t); e && "li" != e.parentNode.tagName && s(e.innerText(), e); ) (i = e.nextSibling()) || e.parentNode.insertBefore(o, e), 
                            a(o, e, t), e = i;
                            !o.parentNode && e && e.parentNode && e.parentNode.insertBefore(o, e);
                        }
                        var r = n.firstChild();
                        r && "element" == r.type && "span" == r.tagName && /^\s*(&nbsp;)+\s*$/.test(r.innerText()) && r.parentNode.removeChild(r);
                    }
                    function a(e, t, i) {
                        if ("ol" == e.tagName) if (browser.ie) {
                            var n = t.firstChild();
                            "element" == n.type && "span" == n.tagName && l[i].test(n.innerText()) && t.removeChild(n);
                        } else t.innerHTML(t.innerHTML().replace(l[i], "")); else t.removeChild(t.firstChild());
                        var o = UE.uNode.createElement("li");
                        o.appendChild(t), e.appendChild(o);
                    }
                });
            }
        }), C.addListener("contentchange", function() {
            a(C.document);
        }), C.addListener("keydown", function(e, t) {
            function i() {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1, C.fireEvent("contentchange"), 
                C.undoManger && C.undoManger.save();
            }
            function n(e, t) {
                for (;e && !domUtils.isBody(e); ) {
                    if (t(e)) return null;
                    if (1 == e.nodeType && /[ou]l/i.test(e.tagName)) return e;
                    e = e.parentNode;
                }
                return null;
            }
            var o = t.keyCode || t.which;
            if (13 == o && !t.shiftKey) {
                var r = C.selection.getRange(), a = domUtils.findParent(r.startContainer, function(e) {
                    return domUtils.isBlockElm(e);
                }, !0), s = domUtils.findParentByTagName(r.startContainer, "li", !0);
                if (a && "PRE" != a.tagName && !s) {
                    var l = a.innerHTML.replace(new RegExp(domUtils.fillChar, "g"), "");
                    /^\s*1\s*\.[^\d]/.test(l) && (a.innerHTML = l.replace(/^\s*1\s*\./, ""), r.setStartAtLast(a).collapse(!0).select(), 
                    C.__hasEnterExecCommand = !0, C.execCommand("insertorderedlist"), C.__hasEnterExecCommand = !1);
                }
                var d = C.selection.getRange(), c = n(d.startContainer, function(e) {
                    return "TABLE" == e.tagName;
                }), u = d.collapsed ? c : n(d.endContainer, function(e) {
                    return "TABLE" == e.tagName;
                });
                if (c && u && c === u) {
                    if (!d.collapsed) {
                        if (c = domUtils.findParentByTagName(d.startContainer, "li", !0), u = domUtils.findParentByTagName(d.endContainer, "li", !0), 
                        !c || !u || c !== u) {
                            var m = d.cloneRange(), f = m.collapse(!1).createBookmark();
                            return d.deleteContents(), m.moveToBookmark(f), N(s = domUtils.findParentByTagName(m.startContainer, "li", !0)), 
                            m.select(), void i();
                        }
                        if (d.deleteContents(), (s = domUtils.findParentByTagName(d.startContainer, "li", !0)) && domUtils.isEmptyBlock(s)) return b = s.previousSibling, 
                        next = s.nextSibling, p = C.document.createElement("p"), domUtils.fillNode(C.document, p), 
                        y = s.parentNode, b && next ? (d.setStart(next, 0).collapse(!0).select(!0), domUtils.remove(s)) : ((b || next) && b ? s.parentNode.parentNode.insertBefore(p, y.nextSibling) : y.parentNode.insertBefore(p, y), 
                        domUtils.remove(s), y.firstChild || domUtils.remove(y), d.setStart(p, 0).setCursor()), 
                        void i();
                    }
                    if (s = domUtils.findParentByTagName(d.startContainer, "li", !0)) {
                        if (domUtils.isEmptyBlock(s)) {
                            if (f = d.createBookmark(), s !== (y = s.parentNode).lastChild ? (domUtils.breakParent(s, y), 
                            N(s)) : (y.parentNode.insertBefore(s, y.nextSibling), domUtils.isEmptyNode(y) && domUtils.remove(y)), 
                            !dtd.$list[s.parentNode.tagName]) if (domUtils.isBlockElm(s.firstChild)) domUtils.remove(s, !0); else {
                                for (p = C.document.createElement("p"), s.parentNode.insertBefore(p, s); s.firstChild; ) p.appendChild(s.firstChild);
                                domUtils.remove(s);
                            }
                            d.moveToBookmark(f).select();
                        } else {
                            var h = s.firstChild;
                            if (!h || !domUtils.isBlockElm(h)) {
                                var p = C.document.createElement("p");
                                for (!s.firstChild && domUtils.fillNode(C.document, p); s.firstChild; ) p.appendChild(s.firstChild);
                                s.appendChild(p), h = p;
                            }
                            var g = C.document.createElement("span");
                            d.insertNode(g), domUtils.breakParent(g, s);
                            var v = g.nextSibling;
                            (h = v.firstChild) || (p = C.document.createElement("p"), domUtils.fillNode(C.document, p), 
                            v.appendChild(p), h = p), domUtils.isEmptyNode(h) && (h.innerHTML = "", domUtils.fillNode(C.document, h)), 
                            d.setStart(h, 0).collapse(!0).shrinkBoundary().select(), domUtils.remove(g);
                            var b = v.previousSibling;
                            b && domUtils.isEmptyBlock(b) && (b.innerHTML = "<p></p>", domUtils.fillNode(C.document, b.firstChild));
                        }
                        i();
                    }
                }
            }
            if (8 == o && (d = C.selection.getRange()).collapsed && domUtils.isStartInblock(d) && (m = d.cloneRange().trimBoundary(), 
            (s = domUtils.findParentByTagName(d.startContainer, "li", !0)) && domUtils.isStartInblock(m))) {
                if ((c = domUtils.findParentByTagName(d.startContainer, "p", !0)) && c !== s.firstChild) {
                    var y = domUtils.findParentByTagName(c, [ "ol", "ul" ]);
                    return domUtils.breakParent(c, y), N(c), C.fireEvent("contentchange"), d.setStart(c, 0).setCursor(!1, !0), 
                    C.fireEvent("saveScene"), void domUtils.preventDefault(t);
                }
                if (s && (b = s.previousSibling)) {
                    if (46 == o && s.childNodes.length) return;
                    if (dtd.$list[b.tagName] && (b = b.lastChild), C.undoManger && C.undoManger.save(), 
                    h = s.firstChild, domUtils.isBlockElm(h)) if (domUtils.isEmptyNode(h)) for (b.appendChild(h), 
                    d.setStart(h, 0).setCursor(!1, !0); s.firstChild; ) b.appendChild(s.firstChild); else g = C.document.createElement("span"), 
                    d.insertNode(g), domUtils.isEmptyBlock(b) && (b.innerHTML = ""), domUtils.moveChild(s, b), 
                    d.setStartBefore(g).collapse(!0).select(!0), domUtils.remove(g); else if (domUtils.isEmptyNode(s)) {
                        p = C.document.createElement("p");
                        b.appendChild(p), d.setStart(p, 0).setCursor();
                    } else for (d.setEnd(b, b.childNodes.length).collapse().select(!0); s.firstChild; ) b.appendChild(s.firstChild);
                    return domUtils.remove(s), C.fireEvent("contentchange"), C.fireEvent("saveScene"), 
                    void domUtils.preventDefault(t);
                }
                if (s && !s.previousSibling) {
                    y = s.parentNode, f = d.createBookmark();
                    if (domUtils.isTagNode(y.parentNode, "ol ul")) y.parentNode.insertBefore(s, y), 
                    domUtils.isEmptyNode(y) && domUtils.remove(y); else {
                        for (;s.firstChild; ) y.parentNode.insertBefore(s.firstChild, y);
                        domUtils.remove(s), domUtils.isEmptyNode(y) && domUtils.remove(y);
                    }
                    return d.moveToBookmark(f).setCursor(!1, !0), C.fireEvent("contentchange"), C.fireEvent("saveScene"), 
                    void domUtils.preventDefault(t);
                }
            }
        }), C.addListener("keyup", function(e, t) {
            if (8 == (t.keyCode || t.which)) {
                var i, n = C.selection.getRange();
                (i = domUtils.findParentByTagName(n.startContainer, [ "ol", "ul" ], !0)) && R(i, i.tagName.toLowerCase(), L(i) || domUtils.getComputedStyle(i, "list-style-type"), !0);
            }
        }), C.addListener("tabkeydown", function() {
            var e = C.selection.getRange();
            function t(e) {
                if (-1 != C.options.maxListLevel) {
                    for (var t = e.parentNode, i = 0; /[ou]l/i.test(t.tagName); ) i++, t = t.parentNode;
                    if (i >= C.options.maxListLevel) return !0;
                }
            }
            var i = domUtils.findParentByTagName(e.startContainer, "li", !0);
            if (i) {
                var n;
                if (!e.collapsed) {
                    C.fireEvent("saveScene"), n = e.createBookmark();
                    for (var o, r, a = 0, s = domUtils.findParents(i); r = s[a++]; ) if (domUtils.isTagNode(r, "ol ul")) {
                        o = r;
                        break;
                    }
                    var l = i;
                    if (n.end) for (;l && !(domUtils.getPosition(l, n.end) & domUtils.POSITION_FOLLOWING); ) if (t(l)) l = domUtils.getNextDomNode(l, !1, null, function(e) {
                        return e !== o;
                    }); else {
                        m = l.parentNode, f = C.document.createElement(m.tagName);
                        var d = (c = utils.indexOf(h[f.tagName], L(m) || domUtils.getComputedStyle(m, "list-style-type"))) + 1 == h[f.tagName].length ? 0 : c + 1;
                        for (D(f, u = h[f.tagName][d]), m.insertBefore(f, l); l && !(domUtils.getPosition(l, n.end) & domUtils.POSITION_FOLLOWING); ) {
                            if (i = l.nextSibling, f.appendChild(l), !i || domUtils.isTagNode(i, "ol ul")) {
                                if (i) for (;(i = i.firstChild) && "LI" != i.tagName; ) ; else i = domUtils.getNextDomNode(l, !1, null, function(e) {
                                    return e !== o;
                                });
                                break;
                            }
                            l = i;
                        }
                        R(f, f.tagName.toLowerCase(), u), l = i;
                    }
                    return C.fireEvent("contentchange"), e.moveToBookmark(n).select(), !0;
                }
                if (t(i)) return !0;
                var c, u, m = i.parentNode, f = C.document.createElement(m.tagName);
                if (c = (c = utils.indexOf(h[f.tagName], L(m) || domUtils.getComputedStyle(m, "list-style-type"))) + 1 == h[f.tagName].length ? 0 : c + 1, 
                D(f, u = h[f.tagName][c]), domUtils.isStartInblock(e)) return C.fireEvent("saveScene"), 
                n = e.createBookmark(), m.insertBefore(f, i), f.appendChild(i), R(f, f.tagName.toLowerCase(), u), 
                C.fireEvent("contentchange"), e.moveToBookmark(n).select(!0), !0;
            }
        }), C.commands.insertorderedlist = C.commands.insertunorderedlist = {
            execCommand: function(e, t) {
                t || (t = "insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
                var i = this, n = this.selection.getRange(), o = function(e) {
                    return 1 == e.nodeType ? "br" != e.tagName.toLowerCase() : !domUtils.isWhitespace(e);
                }, r = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", a = i.document.createDocumentFragment();
                n.adjustmentBoundary().shrinkBoundary();
                var s, l, d, c, u = n.createBookmark(!0), m = O(i.document.getElementById(u.start)), f = 0, h = O(i.document.getElementById(u.end)), p = 0;
                if (m || h) {
                    if (m && (s = m.parentNode), u.end || (h = m), h && (l = h.parentNode), s === l) {
                        for (;m !== h; ) {
                            if (m = (c = m).nextSibling, !domUtils.isBlockElm(c.firstChild)) {
                                for (var g = i.document.createElement("p"); c.firstChild; ) g.appendChild(c.firstChild);
                                c.appendChild(g);
                            }
                            a.appendChild(c);
                        }
                        if (c = i.document.createElement("span"), s.insertBefore(c, h), !domUtils.isBlockElm(h.firstChild)) {
                            for (g = i.document.createElement("p"); h.firstChild; ) g.appendChild(h.firstChild);
                            h.appendChild(g);
                        }
                        a.appendChild(h), domUtils.breakParent(c, s), domUtils.isEmptyNode(c.previousSibling) && domUtils.remove(c.previousSibling), 
                        domUtils.isEmptyNode(c.nextSibling) && domUtils.remove(c.nextSibling);
                        var v = L(s) || domUtils.getComputedStyle(s, "list-style-type") || ("insertorderedlist" == e.toLowerCase() ? "decimal" : "disc");
                        if (s.tagName.toLowerCase() == r && v == t) {
                            for (var b = 0, y = i.document.createDocumentFragment(); A = a.firstChild; ) if (domUtils.isTagNode(A, "ol ul")) y.appendChild(A); else for (;A.firstChild; ) y.appendChild(A.firstChild), 
                            domUtils.remove(A);
                            c.parentNode.insertBefore(y, c);
                        } else D(d = i.document.createElement(r), t), d.appendChild(a), c.parentNode.insertBefore(d, c);
                        return domUtils.remove(c), d && R(d, r, t), void n.moveToBookmark(u).select();
                    }
                    if (m) {
                        for (;m; ) {
                            if (c = m.nextSibling, domUtils.isTagNode(m, "ol ul")) a.appendChild(m); else {
                                for (var C = i.document.createDocumentFragment(), N = 0; m.firstChild; ) domUtils.isBlockElm(m.firstChild) && (N = 1), 
                                C.appendChild(m.firstChild);
                                if (N) a.appendChild(C); else {
                                    var x = i.document.createElement("p");
                                    x.appendChild(C), a.appendChild(x);
                                }
                                domUtils.remove(m);
                            }
                            m = c;
                        }
                        s.parentNode.insertBefore(a, s.nextSibling), domUtils.isEmptyNode(s) ? (n.setStartBefore(s), 
                        domUtils.remove(s)) : n.setStartAfter(s), f = 1;
                    }
                    if (h && domUtils.inDoc(l, i.document)) {
                        for (m = l.firstChild; m && m !== h; ) {
                            if (c = m.nextSibling, domUtils.isTagNode(m, "ol ul")) a.appendChild(m); else {
                                for (C = i.document.createDocumentFragment(), N = 0; m.firstChild; ) domUtils.isBlockElm(m.firstChild) && (N = 1), 
                                C.appendChild(m.firstChild);
                                N ? a.appendChild(C) : ((x = i.document.createElement("p")).appendChild(C), a.appendChild(x)), 
                                domUtils.remove(m);
                            }
                            m = c;
                        }
                        var w = domUtils.createElement(i.document, "div", {
                            tmpDiv: 1
                        });
                        domUtils.moveChild(h, w), a.appendChild(w), domUtils.remove(h), l.parentNode.insertBefore(a, l), 
                        n.setEndBefore(l), domUtils.isEmptyNode(l) && domUtils.remove(l), p = 1;
                    }
                }
                f || n.setStartBefore(i.document.getElementById(u.start)), u.end && !p && n.setEndAfter(i.document.getElementById(u.end)), 
                n.enlarge(!0, function(e) {
                    return _[e.tagName];
                }), a = i.document.createDocumentFragment();
                for (var U = n.createBookmark(), E = domUtils.getNextDomNode(U.start, !1, o), T = n.cloneRange(), S = domUtils.isBlockElm; E && E !== U.end && domUtils.getPosition(E, U.end) & domUtils.POSITION_PRECEDING; ) if (3 == E.nodeType || dtd.li[E.tagName]) {
                    if (1 == E.nodeType && dtd.$list[E.tagName]) {
                        for (;E.firstChild; ) a.appendChild(E.firstChild);
                        B = domUtils.getNextDomNode(E, !1, o), domUtils.remove(E), E = B;
                        continue;
                    }
                    for (B = E, T.setStartBefore(E); E && E !== U.end && (!S(E) || domUtils.isBookmarkNode(E)); ) B = E, 
                    E = domUtils.getNextDomNode(E, !1, null, function(e) {
                        return !_[e.tagName];
                    });
                    E && S(E) && (c = domUtils.getNextDomNode(B, !1, o)) && domUtils.isBookmarkNode(c) && (E = domUtils.getNextDomNode(c, !1, o), 
                    B = c), T.setEndAfter(B), E = domUtils.getNextDomNode(B, !1, o);
                    var k = n.document.createElement("li");
                    if (k.appendChild(T.extractContents()), domUtils.isEmptyNode(k)) {
                        for (var B = n.document.createElement("p"); k.firstChild; ) B.appendChild(k.firstChild);
                        k.appendChild(B);
                    }
                    a.appendChild(k);
                } else E = domUtils.getNextDomNode(E, !0, o);
                n.moveToBookmark(U).collapse(!0), D(d = i.document.createElement(r), t), d.appendChild(a), 
                n.insertNode(d), R(d, r, t);
                b = 0;
                for (var A, I = domUtils.getElementsByTagName(d, "div"); A = I[b++]; ) A.getAttribute("tmpDiv") && domUtils.remove(A, !0);
                n.moveToBookmark(u).select();
            },
            queryCommandState: function(e) {
                for (var t, i = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", n = this.selection.getStartElementPath(), o = 0; t = n[o++]; ) {
                    if ("TABLE" == t.nodeName) return 0;
                    if (i == t.nodeName.toLowerCase()) return 1;
                }
                return 0;
            },
            queryCommandValue: function(e) {
                for (var t, i, n = "insertorderedlist" == e.toLowerCase() ? "ol" : "ul", o = this.selection.getStartElementPath(), r = 0; i = o[r++]; ) {
                    if ("TABLE" == i.nodeName) {
                        t = null;
                        break;
                    }
                    if (n == i.nodeName.toLowerCase()) {
                        t = i;
                        break;
                    }
                }
                return t ? L(t) || domUtils.getComputedStyle(t, "list-style-type") : null;
            }
        };
    }, kT = {
        textarea: function(e, t) {
            var i = t.ownerDocument.createElement("textarea");
            return i.style.cssText = "position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;", 
            browser.ie && browser.version < 8 && (i.style.width = t.offsetWidth + "px", i.style.height = t.offsetHeight + "px", 
            t.onresize = function() {
                i.style.width = t.offsetWidth + "px", i.style.height = t.offsetHeight + "px";
            }), t.appendChild(i), {
                setContent: function(e) {
                    i.value = e;
                },
                getContent: function() {
                    return i.value;
                },
                select: function() {
                    var e;
                    browser.ie ? ((e = i.createTextRange()).collapse(!0), e.select()) : (i.setSelectionRange(0, 0), 
                    i.focus());
                },
                dispose: function() {
                    t.removeChild(i), t.onresize = null, t = i = null;
                },
                focus: function() {
                    i.focus();
                },
                blur: function() {
                    i.blur();
                }
            };
        },
        codemirror: function(e, t) {
            var i = window.CodeMirror(t, {
                mode: "text/html",
                tabMode: "indent",
                lineNumbers: !0,
                lineWrapping: !0
            }), n = i.getWrapperElement();
            return n.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;', 
            i.getScrollerElement().style.cssText = "position:absolute;left:0;top:0;width:100%;height:100%;", 
            i.refresh(), {
                getCodeMirror: function() {
                    return i;
                },
                setContent: function(e) {
                    i.setValue(e);
                },
                getContent: function() {
                    return i.getValue();
                },
                select: function() {
                    i.focus();
                },
                dispose: function() {
                    t.removeChild(n), i = n = null;
                },
                focus: function() {
                    i.focus();
                },
                blur: function() {
                    i.setOption("readOnly", !0), i.setOption("readOnly", !1);
                }
            };
        }
    }, UE.plugins.source = function() {
        var a, s, l, d, c, u, m, f = this, h = this.options, p = !1;
        h.sourceEditor = browser.ie ? "textarea" : h.sourceEditor || "codemirror", f.setOpt({
            sourceEditorFirst: !1
        }), f.commands.source = {
            execCommand: function() {
                if (p = !p) {
                    m = f.selection.getRange().createAddress(!1, !0), f.undoManger && f.undoManger.save(!0), 
                    browser.gecko && (f.body.contentEditable = !1), c = f.iframe.style.cssText, f.iframe.style.cssText += "position:absolute;left:-32768px;top:-32768px;", 
                    f.fireEvent("beforegetcontent");
                    var e = UE.htmlparser(f.body.innerHTML);
                    f.filterOutputRule(e), e.traversal(function(e) {
                        if ("element" == e.type) switch (e.tagName) {
                          case "td":
                          case "th":
                          case "caption":
                            e.children && 1 == e.children.length && "br" == e.firstChild().tagName && e.removeChild(e.firstChild());
                            break;

                          case "pre":
                            e.innerText(e.innerText().replace(/&nbsp;/g, " "));
                        }
                    }), f.fireEvent("aftergetcontent");
                    var t = e.toHtml(!0);
                    r = f.iframe.parentNode, (a = kT["codemirror" == h.sourceEditor && window.CodeMirror ? "codemirror" : "textarea"](f, r)).setContent(t), 
                    s = f.setContent, f.setContent = function(e) {
                        var t = UE.htmlparser(e);
                        f.filterInputRule(t), e = t.toHtml(), a.setContent(e);
                    }, setTimeout(function() {
                        a.select(), f.addListener("fullscreenchanged", function() {
                            try {
                                a.getCodeMirror().refresh();
                            } catch (e) {}
                        });
                    }), u = f.getContent, f.getContent = function() {
                        return a.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>";
                    }, l = f.focus, d = f.blur, f.focus = function() {
                        a.focus();
                    }, f.blur = function() {
                        d.call(f), a.blur();
                    };
                } else {
                    f.iframe.style.cssText = c;
                    var i = a.getContent() || "<p>" + (browser.ie ? "" : "<br/>") + "</p>";
                    i = i.replace(new RegExp("[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>", "g"), function(e, t) {
                        return t && !dtd.$inlineWithA[t.toLowerCase()] ? e.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, "") : e.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, "");
                    }), f.setContent = s, f.setContent(i), a.dispose(), a = null, f.getContent = u, 
                    f.focus = l, f.blur = d;
                    var n = f.body.firstChild;
                    if (n || (f.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", n = f.body.firstChild), 
                    f.undoManger && f.undoManger.save(!0), browser.gecko) {
                        var o = document.createElement("input");
                        o.style.cssText = "position:absolute;left:0;top:-32768px", document.body.appendChild(o), 
                        f.body.contentEditable = !1, setTimeout(function() {
                            domUtils.setViewportOffset(o, {
                                left: -32768,
                                top: 0
                            }), o.focus(), setTimeout(function() {
                                f.body.contentEditable = !0, f.selection.getRange().moveToAddress(m).select(!0), 
                                domUtils.remove(o);
                            });
                        });
                    } else try {
                        f.selection.getRange().moveToAddress(m).select(!0);
                    } catch (e) {}
                }
                var r;
                this.fireEvent("sourcemodechanged", p);
            },
            queryCommandState: function() {
                return 0 | p;
            },
            notNeedUndo: 1
        };
        var t = f.queryCommandState;
        f.queryCommandState = function(e) {
            return e = e.toLowerCase(), p ? e in {
                source: 1,
                fullscreen: 1
            } ? 1 : -1 : t.apply(this, arguments);
        }, "codemirror" == h.sourceEditor && f.addListener("ready", function() {
            utils.loadFile(document, {
                src: h.codeMirrorJsUrl || "https://cdn.jsdelivr.net/npm/codemirror@2.33.0/lib/codemirror.js",
                tag: "script",
                type: "text/javascript",
                defer: "defer"
            }, function() {
                h.sourceEditorFirst && setTimeout(function() {
                    f.execCommand("source");
                }, 0);
            }), utils.loadFile(document, {
                tag: "link",
                rel: "stylesheet",
                type: "text/css",
                href: h.codeMirrorCssUrl || "https://cdn.jsdelivr.net/npm/codemirror@2.33.0/lib/codemirror.css"
            });
        });
    }, UE.plugins.enterkey = function() {
        var l, d = this, c = d.options.enterTag;
        d.addListener("keyup", function(e, t) {
            if (13 == (t.keyCode || t.which)) {
                var i, n = d.selection.getRange(), o = n.startContainer;
                if (browser.ie) d.fireEvent("saveScene", !0, !0); else {
                    if (/h\d/i.test(l)) {
                        if (browser.gecko) domUtils.findParentByTagName(o, [ "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption", "table" ], !0) || (d.document.execCommand("formatBlock", !1, "<p>"), 
                        i = 1); else if (1 == o.nodeType) {
                            var r, a = d.document.createTextNode("");
                            if (n.insertNode(a), r = domUtils.findParentByTagName(a, "div", !0)) {
                                for (var s = d.document.createElement("p"); r.firstChild; ) s.appendChild(r.firstChild);
                                r.parentNode.insertBefore(s, r), domUtils.remove(r), n.setStartBefore(a).setCursor(), 
                                i = 1;
                            }
                            domUtils.remove(a);
                        }
                        d.undoManger && i && d.undoManger.save();
                    }
                    browser.opera && n.select();
                }
            }
        }), d.addListener("keydown", function(e, t) {
            if (13 == (t.keyCode || t.which)) {
                if (d.fireEvent("beforeenterkeydown")) return void domUtils.preventDefault(t);
                d.fireEvent("saveScene", !0, !0), l = "";
                var i = d.selection.getRange();
                if (!i.collapsed) {
                    var n = i.startContainer, o = i.endContainer, r = domUtils.findParentByTagName(n, "td", !0), a = domUtils.findParentByTagName(o, "td", !0);
                    if (r && a && r !== a || !r && a || r && !a) return void (t.preventDefault ? t.preventDefault() : t.returnValue = !1);
                }
                if ("p" == c) browser.ie || ((n = domUtils.findParentByTagName(i.startContainer, [ "ol", "ul", "p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "caption" ], !0)) || browser.opera ? (l = n.tagName, 
                "p" == n.tagName.toLowerCase() && browser.gecko && domUtils.removeDirtyAttr(n)) : (d.document.execCommand("formatBlock", !1, "<p>"), 
                browser.gecko && (i = d.selection.getRange(), (n = domUtils.findParentByTagName(i.startContainer, "p", !0)) && domUtils.removeDirtyAttr(n)))); else if (t.preventDefault ? t.preventDefault() : t.returnValue = !1, 
                i.collapsed) s = i.document.createElement("br"), i.insertNode(s), s.parentNode.lastChild === s ? (s.parentNode.insertBefore(s.cloneNode(!0), s), 
                i.setStartBefore(s)) : i.setStartAfter(s), i.setCursor(); else if (i.deleteContents(), 
                1 == (n = i.startContainer).nodeType && (n = n.childNodes[i.startOffset])) {
                    for (;1 == n.nodeType; ) {
                        if (dtd.$empty[n.tagName]) return i.setStartBefore(n).setCursor(), d.undoManger && d.undoManger.save(), 
                        !1;
                        if (!n.firstChild) {
                            var s = i.document.createElement("br");
                            return n.appendChild(s), i.setStart(n, 0).setCursor(), d.undoManger && d.undoManger.save(), 
                            !1;
                        }
                        n = n.firstChild;
                    }
                    n === i.startContainer.childNodes[i.startOffset] ? (s = i.document.createElement("br"), 
                    i.insertNode(s).setCursor()) : i.setStart(n, 0).setCursor();
                } else s = i.document.createElement("br"), i.insertNode(s).setStartAfter(s).setCursor();
            }
        });
    }, UE.plugins.keystrokes = function() {
        var y = this, C = !0;
        y.addListener("keydown", function(e, t) {
            var i = t.keyCode || t.which, n = y.selection.getRange();
            if (!n.collapsed && !(t.ctrlKey || t.shiftKey || t.altKey || t.metaKey) && (65 <= i && i <= 90 || 48 <= i && i <= 57 || 96 <= i && i <= 111 || {
                13: 1,
                8: 1,
                46: 1
            }[i])) {
                var o = n.startContainer;
                if (domUtils.isFillChar(o) && n.setStartBefore(o), o = n.endContainer, domUtils.isFillChar(o) && n.setEndAfter(o), 
                n.txtToElmBoundary(), n.endContainer && 1 == n.endContainer.nodeType && (o = n.endContainer.childNodes[n.endOffset]) && domUtils.isBr(o) && n.setEndAfter(o), 
                0 == n.startOffset && (o = n.startContainer, domUtils.isBoundaryNode(o, "firstChild") && (o = n.endContainer, 
                n.endOffset == (3 == o.nodeType ? o.nodeValue.length : o.childNodes.length) && domUtils.isBoundaryNode(o, "lastChild")))) return y.fireEvent("saveScene"), 
                y.body.innerHTML = "<p>" + (browser.ie ? "" : "<br/>") + "</p>", n.setStart(y.body.firstChild, 0).setCursor(!1, !0), 
                void y._selectionChange();
            }
            if (i == keymap.Backspace) {
                if (n = y.selection.getRange(), C = n.collapsed, y.fireEvent("delkeydown", t)) return;
                var r, a;
                if (n.collapsed && n.inFillChar() && (r = n.startContainer, domUtils.isFillChar(r) ? (n.setStartBefore(r).shrinkBoundary(!0).collapse(!0), 
                domUtils.remove(r)) : (r.nodeValue = r.nodeValue.replace(new RegExp("^" + domUtils.fillChar), ""), 
                n.startOffset--, n.collapse(!0).select(!0))), r = n.getClosedNode()) return y.fireEvent("saveScene"), 
                n.setStartBefore(r), domUtils.remove(r), n.setCursor(), y.fireEvent("saveScene"), 
                void domUtils.preventDefault(t);
                if (!browser.ie && (r = domUtils.findParentByTagName(n.startContainer, "table", !0), 
                a = domUtils.findParentByTagName(n.endContainer, "table", !0), r && !a || !r && a || r !== a)) return void t.preventDefault();
            }
            if (i == keymap.Tab) {
                var s = {
                    ol: 1,
                    ul: 1,
                    table: 1
                };
                if (y.fireEvent("tabkeydown", t)) return void domUtils.preventDefault(t);
                var l = y.selection.getRange();
                y.fireEvent("saveScene");
                for (var d = 0, c = "", u = y.options.tabSize || 4, m = y.options.tabNode || "&nbsp;"; d < u; d++) c += m;
                var f = y.document.createElement("span");
                if (f.innerHTML = c + domUtils.fillChar, l.collapsed) l.insertNode(f.cloneNode(!0).firstChild).setCursor(!0); else {
                    var h = function(e) {
                        return domUtils.isBlockElm(e) && !s[e.tagName.toLowerCase()];
                    };
                    if (r = domUtils.findParent(l.startContainer, h, !0), a = domUtils.findParent(l.endContainer, h, !0), 
                    r && a && r === a) l.deleteContents(), l.insertNode(f.cloneNode(!0).firstChild).setCursor(!0); else {
                        var p = l.createBookmark();
                        l.enlarge(!0);
                        for (var g = l.createBookmark(), v = domUtils.getNextDomNode(g.start, !1, h); v && !(domUtils.getPosition(v, g.end) & domUtils.POSITION_FOLLOWING); ) v.insertBefore(f.cloneNode(!0).firstChild, v.firstChild), 
                        v = domUtils.getNextDomNode(v, !1, h);
                        l.moveToBookmark(g).moveToBookmark(p).select();
                    }
                }
                domUtils.preventDefault(t);
            }
            if (browser.gecko && 46 == i && (l = y.selection.getRange()).collapsed && (r = l.startContainer, 
            domUtils.isEmptyBlock(r))) {
                for (var b = r.parentNode; 1 == domUtils.getChildCount(b) && !domUtils.isBody(b); ) b = (r = b).parentNode;
                r === b.lastChild && t.preventDefault();
            } else browser.chrome && y.on("keydown", function(e, t) {
                var i = t.keyCode || t.which;
                if ((t.metaKey && t.altKey || t.ctrlKey && t.shiftKey) && 73 == i) return !0;
            });
        }), y.addListener("keyup", function(e, t) {
            var i;
            if ((t.keyCode || t.which) == keymap.Backspace) {
                if (this.fireEvent("delkeyup")) return;
                if ((i = this.selection.getRange()).collapsed) {
                    if ((r = domUtils.findParentByTagName(i.startContainer, [ "h1", "h2", "h3", "h4", "h5", "h6" ], !0)) && domUtils.isEmptyBlock(r)) {
                        var n = r.previousSibling;
                        if (n && "TABLE" != n.nodeName) return domUtils.remove(r), void i.setStartAtLast(n).setCursor(!1, !0);
                        var o = r.nextSibling;
                        if (o && "TABLE" != o.nodeName) return domUtils.remove(r), void i.setStartAtFirst(o).setCursor(!1, !0);
                    }
                    if (domUtils.isBody(i.startContainer)) {
                        var r = domUtils.createElement(this.document, "p", {
                            innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
                        });
                        i.insertNode(r).setStart(r, 0).setCursor(!1, !0);
                    }
                }
                if (!C && (3 == i.startContainer.nodeType || 1 == i.startContainer.nodeType && domUtils.isEmptyBlock(i.startContainer))) if (browser.ie) {
                    var a = i.document.createElement("span");
                    i.insertNode(a).setStartBefore(a).collapse(!0), i.select(), domUtils.remove(a);
                } else i.select();
            }
        });
    }, UE.plugins.fiximgclick = function() {
        var r, n = !1;
        function l() {
            this.editor = null, this.resizer = null, this.cover = null, this.doc = document, 
            this.prePos = {
                x: 0,
                y: 0
            }, this.startPos = {
                x: 0,
                y: 0
            };
        }
        return r = [ [ 0, 0, -1, -1 ], [ 0, 0, 0, -1 ], [ 0, 0, 1, -1 ], [ 0, 0, -1, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, -1, 1 ], [ 0, 0, 0, 1 ], [ 0, 0, 1, 1 ] ], 
        l.prototype = {
            init: function(e) {
                var t = this;
                t.editor = e, t.startPos = this.prePos = {
                    x: 0,
                    y: 0
                }, t.dragId = -1;
                var n = [], o = t.cover = document.createElement("div"), r = t.resizer = document.createElement("div");
                for (o.id = t.editor.ui.id + "_imagescale_cover", o.style.cssText = "position:absolute;display:none;z-index:" + t.editor.options.zIndex + ";filter:alpha(opacity=0); opacity:0;background:#CCC;", 
                domUtils.on(o, "mousedown click", function() {
                    t.hide();
                }), i = 0; i < 8; i++) n.push('<span class="edui-editor-imagescale-hand' + i + '"></span>');
                r.id = t.editor.ui.id + "_imagescale", r.className = "edui-editor-imagescale", r.innerHTML = n.join(""), 
                r.style.cssText += ";display:none;border:1px solid #3b77ff;z-index:" + t.editor.options.zIndex + ";", 
                t.editor.ui.getDom().appendChild(o), t.editor.ui.getDom().appendChild(r), t.initStyle(), 
                t.initEvents();
            },
            initStyle: function() {
                utils.cssRule("imagescale", ".edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}");
            },
            initEvents: function() {
                this.startPos.x = this.startPos.y = 0, this.isDraging = !1;
            },
            _eventHandler: function(e) {
                var t = this;
                switch (e.type) {
                  case "mousedown":
                    var i;
                    -1 != (i = e.target || e.srcElement).className.indexOf("edui-editor-imagescale-hand") && -1 == t.dragId && (t.dragId = i.className.slice(-1), 
                    t.startPos.x = t.prePos.x = e.clientX, t.startPos.y = t.prePos.y = e.clientY, domUtils.on(t.doc, "mousemove", t.proxy(t._eventHandler, t)));
                    break;

                  case "mousemove":
                    -1 != t.dragId && (t.updateContainerStyle(t.dragId, {
                        x: e.clientX - t.prePos.x,
                        y: e.clientY - t.prePos.y
                    }), t.prePos.x = e.clientX, t.prePos.y = e.clientY, n = !0, t.updateTargetElement());
                    break;

                  case "mouseup":
                    -1 != t.dragId && (t.updateContainerStyle(t.dragId, {
                        x: e.clientX - t.prePos.x,
                        y: e.clientY - t.prePos.y
                    }), t.updateTargetElement(), t.target.parentNode && t.attachTo(t.target), t.dragId = -1), 
                    domUtils.un(t.doc, "mousemove", t.proxy(t._eventHandler, t)), n && (n = !1, t.editor.fireEvent("contentchange"));
                }
            },
            updateTargetElement: function() {
                var e = this;
                domUtils.setStyles(e.target, {
                    width: e.resizer.style.width,
                    height: e.resizer.style.height
                }), e.target.width = parseInt(e.resizer.style.width), e.target.height = parseInt(e.resizer.style.height), 
                e.attachTo(e.target);
            },
            updateContainerStyle: function(e, t) {
                var i, n = this, o = n.resizer;
                0 != r[e][0] && (i = parseInt(o.style.left) + t.x, o.style.left = n._validScaledProp("left", i) + "px"), 
                0 != r[e][1] && (i = parseInt(o.style.top) + t.y, o.style.top = n._validScaledProp("top", i) + "px"), 
                0 != r[e][2] && (i = o.clientWidth + r[e][2] * t.x, o.style.width = n._validScaledProp("width", i) + "px"), 
                0 != r[e][3] && (i = o.clientHeight + r[e][3] * t.y, o.style.height = n._validScaledProp("height", i) + "px");
            },
            _validScaledProp: function(e, t) {
                var i = this.resizer, n = document;
                switch (t = isNaN(t) ? 0 : t, e) {
                  case "left":
                    return t < 0 ? 0 : t + i.clientWidth > n.clientWidth ? n.clientWidth - i.clientWidth : t;

                  case "top":
                    return t < 0 ? 0 : t + i.clientHeight > n.clientHeight ? n.clientHeight - i.clientHeight : t;

                  case "width":
                    return t <= 0 ? 1 : t + i.offsetLeft > n.clientWidth ? n.clientWidth - i.offsetLeft : t;

                  case "height":
                    return t <= 0 ? 1 : t + i.offsetTop > n.clientHeight ? n.clientHeight - i.offsetTop : t;
                }
            },
            hideCover: function() {
                this.cover.style.display = "none";
            },
            showCover: function() {
                var e = this, t = domUtils.getXY(e.editor.ui.getDom()), i = domUtils.getXY(e.editor.iframe);
                domUtils.setStyles(e.cover, {
                    width: e.editor.iframe.offsetWidth + "px",
                    height: e.editor.iframe.offsetHeight + "px",
                    top: i.y - t.y + "px",
                    left: i.x - t.x + "px",
                    position: "absolute",
                    display: ""
                });
            },
            show: function(e) {
                var t = this;
                t.resizer.style.display = "block", e && t.attachTo(e), domUtils.on(this.resizer, "mousedown", t.proxy(t._eventHandler, t)), 
                domUtils.on(t.doc, "mouseup", t.proxy(t._eventHandler, t)), t.showCover(), t.editor.fireEvent("afterscaleshow", t), 
                t.editor.fireEvent("saveScene");
            },
            hide: function() {
                var e = this;
                e.hideCover(), e.resizer.style.display = "none", domUtils.un(e.resizer, "mousedown", e.proxy(e._eventHandler, e)), 
                domUtils.un(e.doc, "mouseup", e.proxy(e._eventHandler, e)), e.editor.fireEvent("afterscalehide", e);
            },
            proxy: function(t, i) {
                return function(e) {
                    return t.apply(i || this, arguments);
                };
            },
            attachTo: function(e) {
                var t = this.target = e, i = this.resizer, n = domUtils.getXY(t), o = domUtils.getXY(this.editor.iframe), r = domUtils.getXY(i.parentNode);
                domUtils.setStyles(i, {
                    width: t.width + "px",
                    height: t.height + "px",
                    left: o.x + n.x - this.editor.document.body.scrollLeft - r.x - parseInt(i.style.borderLeftWidth) + "px",
                    top: o.y + n.y - this.editor.document.body.scrollTop - r.y - parseInt(i.style.borderTopWidth) + "px"
                });
            }
        }, function() {
            var a, s = this;
            s.setOpt("imageScaleEnabled", !0), !browser.ie && s.options.imageScaleEnabled && s.addListener("click", function(e, t) {
                var i = s.selection.getRange().getClosedNode();
                if (i && "IMG" == i.tagName && "false" != s.body.contentEditable) {
                    if (i.getAttribute("anchorname") || domUtils.hasClass(i, "loadingclass") || domUtils.hasClass(i, "loaderrorclass")) return;
                    if (!a) {
                        (a = new l()).init(s), s.ui.getDom().appendChild(a.resizer);
                        var n, o = function(e) {
                            a.hide(), a.target && s.selection.getRange().selectNode(a.target).select();
                        }, r = function(e) {
                            var t = e.target || e.srcElement;
                            !t || void 0 !== t.className && -1 != t.className.indexOf("edui-editor-imagescale") || o();
                        };
                        s.addListener("afterscaleshow", function(e) {
                            s.addListener("beforekeydown", o), s.addListener("beforemousedown", r), domUtils.on(document, "keydown", o), 
                            domUtils.on(document, "mousedown", r), s.selection.getNative().removeAllRanges();
                        }), s.addListener("afterscalehide", function(e) {
                            s.removeListener("beforekeydown", o), s.removeListener("beforemousedown", r), domUtils.un(document, "keydown", o), 
                            domUtils.un(document, "mousedown", r);
                            var t = a.target;
                            t.parentNode && s.selection.getRange().selectNode(t).select();
                        }), domUtils.on(a.resizer, "mousedown", function(e) {
                            s.selection.getNative().removeAllRanges();
                            var t = e.target || e.srcElement;
                            t && -1 == t.className.indexOf("edui-editor-imagescale-hand") && (n = setTimeout(function() {
                                a.hide(), a.target && s.selection.getRange().selectNode(t).select();
                            }, 200));
                        }), domUtils.on(a.resizer, "mouseup", function(e) {
                            var t = e.target || e.srcElement;
                            t && -1 == t.className.indexOf("edui-editor-imagescale-hand") && clearTimeout(n);
                        });
                    }
                    a.show(i);
                } else a && "none" != a.resizer.style.display && a.hide();
            }), browser.webkit && s.addListener("click", function(e, t) {
                "IMG" == t.target.tagName && "false" != s.body.contentEditable && new dom.Range(s.document).selectNode(t.target).select();
            });
        };
    }(), UE.plugin.register("autolink", function() {
        return browser.ie ? {} : {
            bindEvents: {
                reset: function() {
                    0;
                },
                keydown: function(e, t) {
                    var i = this, n = t.keyCode || t.which;
                    if (32 == n || 13 == n) {
                        for (var o, r, a = i.selection.getNative(), s = a.getRangeAt(0).cloneRange(), l = s.startContainer; 1 == l.nodeType && 0 < s.startOffset && (l = s.startContainer.childNodes[s.startOffset - 1]); ) s.setStart(l, 1 == l.nodeType ? l.childNodes.length : l.nodeValue.length), 
                        s.collapse(!0), l = s.startContainer;
                        do {
                            if (0 == s.startOffset) {
                                for (l = s.startContainer.previousSibling; l && 1 == l.nodeType; ) l = l.lastChild;
                                if (!l || domUtils.isFillChar(l)) break;
                                o = l.nodeValue.length;
                            } else l = s.startContainer, o = s.startOffset;
                            s.setStart(l, o - 1), r = s.toString().charCodeAt(0);
                        } while (160 != r && 32 != r);
                        if (s.toString().replace(new RegExp(domUtils.fillChar, "g"), "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
                            for (;s.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(s.toString()); ) try {
                                s.setStart(s.startContainer, s.startOffset + 1);
                            } catch (e) {
                                for (l = s.startContainer; !(next = l.nextSibling); ) {
                                    if (domUtils.isBody(l)) return;
                                    l = l.parentNode;
                                }
                                s.setStart(next, 0);
                            }
                            if (domUtils.findParentByTagName(s.startContainer, "a", !0)) return;
                            var d, c = i.document.createElement("a"), u = i.document.createTextNode(" ");
                            i.undoManger && i.undoManger.save(), c.appendChild(s.extractContents()), c.href = c.innerHTML = c.innerHTML.replace(/<[^>]+>/g, ""), 
                            d = c.getAttribute("href").replace(new RegExp(domUtils.fillChar, "g"), ""), d = /^(?:https?:\/\/)/gi.test(d) ? d : "http://" + d, 
                            c.setAttribute("_src", utils.html(d)), c.href = utils.html(d), s.insertNode(c), 
                            c.parentNode.insertBefore(u, c.nextSibling), s.setStart(u, 0), s.collapse(!0), a.removeAllRanges(), 
                            a.addRange(s), i.undoManger && i.undoManger.save();
                        }
                    }
                }
            }
        };
    }, function() {
        var s = {
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            13: 1,
            32: 1
        };
        browser.ie && this.addListener("keyup", function(e, t) {
            var i = t.keyCode;
            if (s[i]) {
                var n = this.selection.getRange(), o = n.startContainer;
                if (13 == i) {
                    for (;o && !domUtils.isBody(o) && !domUtils.isBlockElm(o); ) o = o.parentNode;
                    var r;
                    if (o && !domUtils.isBody(o) && "P" == o.nodeName) if ((r = o.previousSibling) && 1 == r.nodeType) (r = function(e) {
                        if (3 == e.nodeType) return null;
                        if ("A" == e.nodeName) return e;
                        for (var t = e.lastChild; t; ) {
                            if ("A" == t.nodeName) return t;
                            if (3 == t.nodeType) {
                                if (domUtils.isWhitespace(t)) {
                                    t = t.previousSibling;
                                    continue;
                                }
                                return null;
                            }
                            t = t.lastChild;
                        }
                    }(r)) && !r.getAttribute("_href") && domUtils.remove(r, !0);
                } else if (32 == i) 3 == o.nodeType && /^\s$/.test(o.nodeValue) && (o = o.previousSibling) && "A" == o.nodeName && !o.getAttribute("_href") && domUtils.remove(o, !0); else if ((o = domUtils.findParentByTagName(o, "a", !0)) && !o.getAttribute("_href")) {
                    var a = n.createBookmark();
                    domUtils.remove(o, !0), n.moveToBookmark(a).select(!0);
                }
            }
        });
    }), UE.plugins.autoheight = function() {
        var t = this;
        if (t.autoHeightEnabled = !1 !== t.options.autoHeightEnabled, t.autoHeightEnabled) {
            var i, n, e, o, r, a = 0, s = t.options;
            t.addListener("fullscreenchanged", function(e, t) {
                o = t;
            }), t.addListener("destroy", function() {
                domUtils.un(t.window, "scroll", d), t.removeListener("contentchange afterinserthtml keyup mouseup", l);
            }), t.enableAutoHeight = function() {
                var e = this;
                if (e.autoHeightEnabled) {
                    var t = e.document;
                    e.autoHeightEnabled = !0, i = t.body.style.overflowY, t.body.style.overflowY = "hidden", 
                    e.addListener("contentchange afterinserthtml keyup mouseup", l), setTimeout(function() {
                        l.call(e);
                    }, browser.gecko ? 100 : 0), e.fireEvent("autoheightchanged", e.autoHeightEnabled);
                }
            }, t.disableAutoHeight = function() {
                t.body.style.overflowY = i || "", t.removeListener("contentchange", l), t.removeListener("keyup", l), 
                t.removeListener("mouseup", l), t.autoHeightEnabled = !1, t.fireEvent("autoheightchanged", t.autoHeightEnabled);
            }, t.on("setHeight", function() {
                t.disableAutoHeight();
            }), t.addListener("ready", function() {
                var e;
                t.enableAutoHeight(), domUtils.on(browser.ie ? t.body : t.document, browser.webkit ? "dragover" : "drop", function() {
                    clearTimeout(e), e = setTimeout(function() {
                        l.call(t);
                    }, 100);
                }), domUtils.on(t.window, "scroll", d);
            });
        }
        function l() {
            var t = this;
            clearTimeout(e), o || (!t.queryCommandState || t.queryCommandState && 1 != t.queryCommandState("source")) && (e = setTimeout(function() {
                for (var e = t.body.lastChild; e && 1 != e.nodeType; ) e = e.previousSibling;
                e && 1 == e.nodeType && (e.style.clear = "both", (n = Math.max(domUtils.getXY(e).y + e.offsetHeight + 25, Math.max(s.minFrameHeight, s.initialFrameHeight))) != a && (n !== parseInt(t.iframe.parentNode.style.height) && (t.iframe.parentNode.style.height = n + "px"), 
                t.body.style.height = n + "px", a = n), domUtils.removeStyle(e, "clear"));
            }, 50));
        }
        function d() {
            t.window && (null === r ? r = t.window.scrollY : 0 == t.window.scrollY && 0 != r && (t.window.scrollTo(0, 0), 
            r = null));
        }
    }, UE.plugins.autofloat = function() {
        var r = this, t = r.getLang();
        r.setOpt({
            topOffset: 0
        });
        var e = !1 !== r.options.autoFloatEnabled, a = r.options.topOffset;
        if (e) {
            var i, s, l, d, n = UE.ui.uiUtils, c = browser.ie && browser.version <= 6, u = browser.quirks, m = document.createElement("div"), f = !0, o = utils.defer(function() {
                p();
            }, browser.ie ? 200 : 100, !0);
            r.addListener("destroy", function() {
                domUtils.un(window, [ "scroll", "resize" ], p), r.removeListener("keydown", o);
            }), r.addListener("ready", function() {
                if (UE.ui || (alert(t.autofloatMsg), 0)) {
                    if (!r.ui) return;
                    d = n.getClientRect, s = r.ui.getDom("toolbarbox"), l = d(s).top, i = s.style.cssText, 
                    m.style.height = s.offsetHeight + "px", c && ((e = document.body.style).backgroundImage = 'url("about:blank")', 
                    e.backgroundAttachment = "fixed"), domUtils.on(window, [ "scroll", "resize" ], p), 
                    r.addListener("keydown", o), r.addListener("beforefullscreenchange", function(e, t) {
                        t && h();
                    }), r.addListener("fullscreenchanged", function(e, t) {
                        t || p();
                    }), r.addListener("sourcemodechanged", function(e, t) {
                        setTimeout(function() {
                            p();
                        }, 0);
                    }), r.addListener("clearDoc", function() {
                        setTimeout(function() {
                            p();
                        }, 0);
                    });
                }
                var e;
            });
        }
        function h() {
            f = !0, m.parentNode && m.parentNode.removeChild(m), s.style.cssText = i;
        }
        function p() {
            var e, t, i, n = d(r.container), o = r.options.toolbarTopOffset || 0;
            n.top < 0 && n.bottom - s.offsetHeight > o ? (e = domUtils.getXY(s), t = domUtils.getComputedStyle(s, "position"), 
            i = domUtils.getComputedStyle(s, "left"), s.style.width = s.offsetWidth + "px", 
            s.style.zIndex = 1 * r.options.zIndex + 1, s.parentNode.insertBefore(m, s), c || u && browser.ie ? ("absolute" != s.style.position && (s.style.position = "absolute"), 
            s.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - l + a + "px") : (browser.ie7Compat && f && (f = !1, 
            s.style.left = domUtils.getXY(s).x - document.documentElement.getBoundingClientRect().left + 2 + "px"), 
            "fixed" != s.style.position && (s.style.position = "fixed", s.style.top = a + "px", 
            ("absolute" == t || "relative" == t) && parseFloat(i) && (s.style.left = e.x + "px")))) : h();
        }
    }, UE.plugins.video = function() {
        var c = this;
        function u(e, t, i, n, o, r, a) {
            var s;
            switch (a) {
              case "image":
                s = "<img " + (n ? 'id="' + n + '"' : "") + ' width="' + t + '" height="' + i + '" _url="' + e + '" class="' + r.replace(/\bvideo-js\b/, "") + '" src="' + c.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + c.options.UEDITOR_HOME_URL + "themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" + (o ? "float:" + o + ";" : "") + '" />';
                break;

              case "embed":
                s = '<embed type="application/x-shockwave-flash" class="' + r + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + utils.html(e) + '" width="' + t + '" height="' + i + '"' + (o ? ' style="float:' + o + '"' : "") + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >';
                break;

              case "video":
                var l = e.substr(e.lastIndexOf(".") + 1);
                "ogv" == l && (l = "ogg"), s = "<video" + (n ? ' id="' + n + '"' : "") + ' class="' + r + ' video-js" ' + (o ? ' style="float:' + o + '"' : "") + ' controls preload="none" width="' + t + '" height="' + i + '" src="' + e + '" data-setup="{}"><source src="' + e + '" type="video/' + l + '" /></video>';
            }
            return s;
        }
        function t(e, n) {
            utils.each(e.getNodesByTagName(n ? "img" : "embed video"), function(e) {
                var t = e.getAttr("class");
                if (t && -1 != t.indexOf("edui-faked-video")) {
                    var i = u(n ? e.getAttr("_url") : e.getAttr("src"), e.getAttr("width"), e.getAttr("height"), null, e.getStyle("float") || "", t, n ? "embed" : "image");
                    e.parentNode.replaceChild(UE.uNode.createElement(i), e);
                }
                if (t && -1 != t.indexOf("edui-upload-video")) {
                    i = u(n ? e.getAttr("_url") : e.getAttr("src"), e.getAttr("width"), e.getAttr("height"), null, e.getStyle("float") || "", t, n ? "video" : "image");
                    e.parentNode.replaceChild(UE.uNode.createElement(i), e);
                }
            });
        }
        c.addOutputRule(function(e) {
            t(e, !0);
        }), c.addInputRule(function(e) {
            t(e);
        }), c.commands.insertvideo = {
            execCommand: function(e, t, i) {
                if (t = utils.isArray(t) ? t : [ t ], !0 !== c.fireEvent("beforeinsertvideo", t)) {
                    for (var n, o, r = [], a = 0, s = t.length; a < s; a++) o = t[a], n = "upload" == i ? "edui-upload-video video-js vjs-default-skin" : "edui-faked-video", 
                    r.push(u(o.url, o.width || 420, o.height || 280, "tmpVedio" + a, null, n, "image"));
                    c.execCommand("inserthtml", r.join(""), !0);
                    var l = this.selection.getRange();
                    for (a = 0, s = t.length; a < s; a++) {
                        var d = this.document.getElementById("tmpVedio" + a);
                        domUtils.removeAttributes(d, "id"), l.selectNode(d).select(), c.execCommand("imagefloat", t[a].align);
                    }
                    c.fireEvent("afterinsertvideo", t);
                }
            },
            queryCommandState: function() {
                var e = c.selection.getRange().getClosedNode();
                return e && ("edui-faked-video" == e.className || -1 != e.className.indexOf("edui-upload-video")) ? 1 : 0;
            }
        };
    }, LY = UE.UETable = function(e) {
        this.table = e, this.indexTable = [], this.selectedTds = [], this.cellsRange = {}, 
        this.update(e);
    }, LY.removeSelectedClass = function(e) {
        utils.each(e, function(e) {
            domUtils.removeClasses(e, "selectTdClass");
        });
    }, LY.addSelectedClass = function(e) {
        utils.each(e, function(e) {
            domUtils.addClass(e, "selectTdClass");
        });
    }, LY.isEmptyBlock = function(e) {
        var t = new RegExp(domUtils.fillChar, "g");
        if (0 < e[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length) return 0;
        for (var i in dtd.$isNotEmpty) if (dtd.$isNotEmpty.hasOwnProperty(i) && e.getElementsByTagName(i).length) return 0;
        return 1;
    }, LY.getWidth = function(e) {
        return e ? parseInt(domUtils.getComputedStyle(e, "width"), 10) : 0;
    }, LY.getTableCellAlignState = function(e) {
        !utils.isArray(e) && (e = [ e ]);
        var i = {}, n = [ "align", "valign" ], o = null, r = !0;
        return utils.each(e, function(t) {
            return utils.each(n, function(e) {
                if (o = t.getAttribute(e), !i[e] && o) i[e] = o; else if (!i[e] || o !== i[e]) return r = !1;
            }), r;
        }), r ? i : null;
    }, LY.getTableItemsByRange = function(e) {
        var t = e.selection.getStart();
        t && t.id && 0 === t.id.indexOf("_baidu_bookmark_start_") && t.nextSibling && (t = t.nextSibling);
        var i = t && domUtils.findParentByTagName(t, [ "td", "th" ], !0), n = i && i.parentNode, o = n && domUtils.findParentByTagName(n, [ "table" ]), r = o && o.getElementsByTagName("caption")[0];
        return {
            cell: i,
            tr: n,
            table: o,
            caption: r
        };
    }, LY.getUETableBySelected = function(e) {
        var t = LY.getTableItemsByRange(e).table;
        return t && t.ueTable && t.ueTable.selectedTds.length ? t.ueTable : null;
    }, LY.getDefaultValue = function(e, t) {
        var i, n, o, r, a = {
            thin: "0px",
            medium: "1px",
            thick: "2px"
        };
        if (t) return s = t.getElementsByTagName("td")[0], r = domUtils.getComputedStyle(t, "border-left-width"), 
        i = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, "padding-left"), n = parseInt(a[r] || r, 10), 
        r = domUtils.getComputedStyle(s, "border-left-width"), {
            tableBorder: i,
            tdPadding: n,
            tdBorder: o = parseInt(a[r] || r, 10)
        };
        (t = e.document.createElement("table")).insertRow(0).insertCell(0).innerHTML = "xxx", 
        e.body.appendChild(t);
        var s = t.getElementsByTagName("td")[0];
        return r = domUtils.getComputedStyle(t, "border-left-width"), i = parseInt(a[r] || r, 10), 
        r = domUtils.getComputedStyle(s, "padding-left"), n = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, "border-left-width"), 
        o = parseInt(a[r] || r, 10), domUtils.remove(t), {
            tableBorder: i,
            tdPadding: n,
            tdBorder: o
        };
    }, LY.getUETable = function(e) {
        var t = e.tagName.toLowerCase();
        return (e = "td" == t || "th" == t || "caption" == t ? domUtils.findParentByTagName(e, "table", !0) : e).ueTable || (e.ueTable = new LY(e)), 
        e.ueTable;
    }, LY.cloneCell = function(e, t, i) {
        if (!e || utils.isString(e)) return this.table.ownerDocument.createElement(e || "td");
        var n = domUtils.hasClass(e, "selectTdClass");
        n && domUtils.removeClasses(e, "selectTdClass");
        var o = e.cloneNode(!0);
        return t && (o.rowSpan = o.colSpan = 1), !i && domUtils.removeAttributes(o, "width height"), 
        !i && domUtils.removeAttributes(o, "style"), o.style.borderLeftStyle = "", o.style.borderTopStyle = "", 
        o.style.borderLeftColor = e.style.borderRightColor, o.style.borderLeftWidth = e.style.borderRightWidth, 
        o.style.borderTopColor = e.style.borderBottomColor, o.style.borderTopWidth = e.style.borderBottomWidth, 
        n && domUtils.addClass(e, "selectTdClass"), o;
    }, LY.prototype = {
        getMaxRows: function() {
            for (var e, t = this.table.rows, i = 1, n = 0; e = t[n]; n++) {
                for (var o, r = 1, a = 0; o = e.cells[a++]; ) r = Math.max(o.rowSpan || 1, r);
                i = Math.max(r + n, i);
            }
            return i;
        },
        getMaxCols: function() {
            for (var e, t = this.table.rows, i = 0, n = {}, o = 0; e = t[o]; o++) {
                for (var r, a = 0, s = 0; r = e.cells[s++]; ) if (a += r.colSpan || 1, r.rowSpan && 1 < r.rowSpan) for (var l = 1; l < r.rowSpan; l++) n["row_" + (o + l)] ? n["row_" + (o + l)]++ : n["row_" + (o + l)] = r.colSpan || 1;
                a += n["row_" + o] || 0, i = Math.max(a, i);
            }
            return i;
        },
        getCellColIndex: function(e) {},
        getHSideCell: function(e, t) {
            try {
                var i, n, o = this.getCellInfo(e), r = this.selectedTds.length, a = this.cellsRange;
                return !t && (r ? !a.beginColIndex : !o.colIndex) || t && (r ? a.endColIndex == this.colsNum - 1 : o.colIndex == this.colsNum - 1) ? null : (i = r ? a.beginRowIndex : o.rowIndex, 
                n = t ? r ? a.endColIndex + 1 : o.colIndex + 1 : r ? a.beginColIndex - 1 : o.colIndex < 1 ? 0 : o.colIndex - 1, 
                this.getCell(this.indexTable[i][n].rowIndex, this.indexTable[i][n].cellIndex));
            } catch (e) {}
        },
        getTabNextCell: function(e, t) {
            var i, n = this.getCellInfo(e), o = t || n.rowIndex, r = n.colIndex + 1 + (n.colSpan - 1);
            try {
                i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex);
            } catch (e) {
                try {
                    o = 1 * o + 1, r = 0, i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex);
                } catch (e) {}
            }
            return i;
        },
        getVSideCell: function(e, t, i) {
            try {
                var n, o, r = this.getCellInfo(e), a = this.selectedTds.length && !i, s = this.cellsRange;
                return !t && 0 == r.rowIndex || t && (a ? s.endRowIndex == this.rowsNum - 1 : r.rowIndex + r.rowSpan > this.rowsNum - 1) ? null : (n = t ? a ? s.endRowIndex + 1 : r.rowIndex + r.rowSpan : a ? s.beginRowIndex - 1 : r.rowIndex - 1, 
                o = a ? s.beginColIndex : r.colIndex, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex));
            } catch (e) {}
        },
        getSameEndPosCells: function(e, t) {
            try {
                for (var i = "x" === t.toLowerCase(), n = domUtils.getXY(e)[i ? "x" : "y"] + e["offset" + (i ? "Width" : "Height")], o = this.table.rows, r = null, a = [], s = 0; s < this.rowsNum; s++) {
                    r = o[s].cells;
                    for (var l, d = 0; l = r[d++]; ) {
                        var c = domUtils.getXY(l)[i ? "x" : "y"] + l["offset" + (i ? "Width" : "Height")];
                        if (n < c && i) break;
                        if ((e == l || n == c) && (1 == l[i ? "colSpan" : "rowSpan"] && a.push(l), i)) break;
                    }
                }
                return a;
            } catch (e) {}
        },
        setCellContent: function(e, t) {
            e.innerHTML = t || (browser.ie ? domUtils.fillChar : "<br />");
        },
        cloneCell: LY.cloneCell,
        getSameStartPosXCells: function(e) {
            try {
                for (var t, i = domUtils.getXY(e).x + e.offsetWidth, n = this.table.rows, o = [], r = 0; r < this.rowsNum; r++) {
                    t = n[r].cells;
                    for (var a, s = 0; a = t[s++]; ) {
                        var l = domUtils.getXY(a).x;
                        if (i < l) break;
                        if (l == i && 1 == a.colSpan) {
                            o.push(a);
                            break;
                        }
                    }
                }
                return o;
            } catch (e) {}
        },
        update: function(e) {
            this.table = e || this.table, this.selectedTds = [], this.cellsRange = {}, this.indexTable = [];
            for (var t = this.table.rows, i = this.getMaxRows(), n = i - t.length, o = this.getMaxCols(); n--; ) this.table.insertRow(t.length);
            this.rowsNum = i, this.colsNum = o;
            for (var r = 0, a = t.length; r < a; r++) this.indexTable[r] = new Array(o);
            for (var s, l = 0; s = t[l]; l++) for (var d, c = 0, u = s.cells; d = u[c]; c++) {
                d.rowSpan > i && (d.rowSpan = i);
                for (var m = c, f = d.rowSpan || 1, h = d.colSpan || 1; this.indexTable[l][m]; ) m++;
                for (var p = 0; p < f; p++) for (var g = 0; g < h; g++) this.indexTable[l + p][m + g] = {
                    rowIndex: l,
                    cellIndex: c,
                    colIndex: m,
                    rowSpan: f,
                    colSpan: h
                };
            }
            for (p = 0; p < i; p++) for (g = 0; g < o; g++) void 0 === this.indexTable[p][g] && (d = (d = (s = t[p]).cells[s.cells.length - 1]) ? d.cloneNode(!0) : this.table.ownerDocument.createElement("td"), 
            this.setCellContent(d), 1 !== d.colSpan && (d.colSpan = 1), 1 !== d.rowSpan && (d.rowSpan = 1), 
            s.appendChild(d), this.indexTable[p][g] = {
                rowIndex: p,
                cellIndex: d.cellIndex,
                colIndex: g,
                rowSpan: 1,
                colSpan: 1
            });
            var v = domUtils.getElementsByTagName(this.table, "td"), b = [];
            if (utils.each(v, function(e) {
                domUtils.hasClass(e, "selectTdClass") && b.push(e);
            }), b.length) {
                var y = b[0], C = b[b.length - 1], N = this.getCellInfo(y), x = this.getCellInfo(C);
                this.selectedTds = b, this.cellsRange = {
                    beginRowIndex: N.rowIndex,
                    beginColIndex: N.colIndex,
                    endRowIndex: x.rowIndex + x.rowSpan - 1,
                    endColIndex: x.colIndex + x.colSpan - 1
                };
            }
            if (!domUtils.hasClass(this.table.rows[0], "firstRow")) for (domUtils.addClass(this.table.rows[0], "firstRow"), 
            r = 1; r < this.table.rows.length; r++) domUtils.removeClasses(this.table.rows[r], "firstRow");
        },
        getCellInfo: function(e) {
            if (e) for (var t = e.cellIndex, i = e.parentNode.rowIndex, n = this.indexTable[i], o = this.colsNum, r = t; r < o; r++) {
                var a = n[r];
                if (a.rowIndex === i && a.cellIndex === t) return a;
            }
        },
        getCell: function(e, t) {
            return e < this.rowsNum && this.table.rows[e].cells[t] || null;
        },
        deleteCell: function(e, t) {
            t = "number" == typeof t ? t : e.parentNode.rowIndex, this.table.rows[t].deleteCell(e.cellIndex);
        },
        getCellsRange: function(e, t) {
            try {
                var m = this, i = m.getCellInfo(e);
                if (e === t) return {
                    beginRowIndex: i.rowIndex,
                    beginColIndex: i.colIndex,
                    endRowIndex: i.rowIndex + i.rowSpan - 1,
                    endColIndex: i.colIndex + i.colSpan - 1
                };
                var n = m.getCellInfo(t);
                return function e(t, i, n, o) {
                    var r, a, s, l = t, d = i, c = n, u = o;
                    if (0 < t) for (a = i; a < o; a++) (s = (r = m.indexTable[t][a]).rowIndex) < t && (l = Math.min(s, l));
                    if (o < m.colsNum) for (s = t; s < n; s++) o < (a = (r = m.indexTable[s][o]).colIndex + r.colSpan - 1) && (u = Math.max(a, u));
                    if (n < m.rowsNum) for (a = i; a < o; a++) n < (s = (r = m.indexTable[n][a]).rowIndex + r.rowSpan - 1) && (c = Math.max(s, c));
                    if (0 < i) for (s = t; s < n; s++) (a = (r = m.indexTable[s][i]).colIndex) < i && (d = Math.min(r.colIndex, d));
                    return l != t || d != i || c != n || u != o ? e(l, d, c, u) : {
                        beginRowIndex: t,
                        beginColIndex: i,
                        endRowIndex: n,
                        endColIndex: o
                    };
                }(Math.min(i.rowIndex, n.rowIndex), Math.min(i.colIndex, n.colIndex), Math.max(i.rowIndex + i.rowSpan - 1, n.rowIndex + n.rowSpan - 1), Math.max(i.colIndex + i.colSpan - 1, n.colIndex + n.colSpan - 1));
            } catch (e) {}
        },
        getCells: function(e) {
            this.clearSelected();
            for (var t, i, n, o = e.beginRowIndex, r = e.beginColIndex, a = e.endRowIndex, s = e.endColIndex, l = {}, d = [], c = o; c <= a; c++) for (var u = r; u <= s; u++) {
                var m = (i = (t = this.indexTable[c][u]).rowIndex) + "|" + (n = t.colIndex);
                if (!l[m]) {
                    if (l[m] = 1, i < c || n < u || i + t.rowSpan - 1 > a || n + t.colSpan - 1 > s) return null;
                    d.push(this.getCell(i, t.cellIndex));
                }
            }
            return d;
        },
        clearSelected: function() {
            LY.removeSelectedClass(this.selectedTds), this.selectedTds = [], this.cellsRange = {};
        },
        setSelected: function(e) {
            var t = this.getCells(e);
            LY.addSelectedClass(t), this.selectedTds = t, this.cellsRange = e;
        },
        isFullRow: function() {
            var e = this.cellsRange;
            return e.endColIndex - e.beginColIndex + 1 == this.colsNum;
        },
        isFullCol: function() {
            var e = this.cellsRange, t = this.table.getElementsByTagName("th"), i = e.endRowIndex - e.beginRowIndex + 1;
            return t.length ? i == this.rowsNum || i == this.rowsNum - 1 : i == this.rowsNum;
        },
        getNextCell: function(e, t, i) {
            try {
                var n, o, r = this.getCellInfo(e), a = this.selectedTds.length && !i, s = this.cellsRange;
                return !t && 0 == r.rowIndex || t && (a ? s.endRowIndex == this.rowsNum - 1 : r.rowIndex + r.rowSpan > this.rowsNum - 1) ? null : (n = t ? a ? s.endRowIndex + 1 : r.rowIndex + r.rowSpan : a ? s.beginRowIndex - 1 : r.rowIndex - 1, 
                o = a ? s.beginColIndex : r.colIndex, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex));
            } catch (e) {}
        },
        getPreviewCell: function(e, t) {
            try {
                var i, n, o = this.getCellInfo(e), r = this.selectedTds.length, a = this.cellsRange;
                return !t && (r ? !a.beginColIndex : !o.colIndex) || t && (r ? a.endColIndex == this.colsNum - 1 : o.rowIndex > this.colsNum - 1) ? null : (i = t ? r ? a.beginRowIndex : o.rowIndex < 1 ? 0 : o.rowIndex - 1 : r ? a.beginRowIndex : o.rowIndex, 
                n = t ? r ? a.endColIndex + 1 : o.colIndex : r ? a.beginColIndex - 1 : o.colIndex < 1 ? 0 : o.colIndex - 1, 
                this.getCell(this.indexTable[i][n].rowIndex, this.indexTable[i][n].cellIndex));
            } catch (e) {}
        },
        moveContent: function(e, t) {
            if (!LY.isEmptyBlock(t)) if (LY.isEmptyBlock(e)) e.innerHTML = t.innerHTML; else {
                var i = e.lastChild;
                for (3 != i.nodeType && dtd.$block[i.tagName] || e.appendChild(e.ownerDocument.createElement("br")); i = t.firstChild; ) e.appendChild(i);
            }
        },
        mergeRight: function(e) {
            var t = this.getCellInfo(e), i = t.colIndex + t.colSpan, n = this.indexTable[t.rowIndex][i], o = this.getCell(n.rowIndex, n.cellIndex);
            e.colSpan = t.colSpan + n.colSpan, e.removeAttribute("width"), this.moveContent(e, o), 
            this.deleteCell(o, n.rowIndex), this.update();
        },
        mergeDown: function(e) {
            var t = this.getCellInfo(e), i = t.rowIndex + t.rowSpan, n = this.indexTable[i][t.colIndex], o = this.getCell(n.rowIndex, n.cellIndex);
            e.rowSpan = t.rowSpan + n.rowSpan, e.removeAttribute("height"), this.moveContent(e, o), 
            this.deleteCell(o, n.rowIndex), this.update();
        },
        mergeRange: function() {
            for (var e, t = this.cellsRange, i = this.getCell(t.beginRowIndex, this.indexTable[t.beginRowIndex][t.beginColIndex].cellIndex), n = this.getCells(t), o = 0; e = n[o++]; ) e !== i && (this.moveContent(i, e), 
            this.deleteCell(e));
            if (i.rowSpan = t.endRowIndex - t.beginRowIndex + 1, 1 < i.rowSpan && i.removeAttribute("height"), 
            i.colSpan = t.endColIndex - t.beginColIndex + 1, 1 < i.colSpan && i.removeAttribute("width"), 
            i.rowSpan == this.rowsNum && 1 != i.colSpan && (i.colSpan = 1), i.colSpan == this.colsNum && 1 != i.rowSpan) {
                var r = i.parentNode.rowIndex;
                if (this.table.deleteRow) for (var a = o = r + 1, s = i.rowSpan; o < s; o++) this.table.deleteRow(a); else for (o = 0, 
                s = i.rowSpan - 1; o < s; o++) {
                    var l = this.table.rows[r + 1];
                    l.parentNode.removeChild(l);
                }
                i.rowSpan = 1;
            }
            this.update();
        },
        insertRow: function(e, t) {
            var i, n = this.colsNum, o = this.table, r = o.insertRow(e), a = null, s = "string" == typeof t && "TH" == t.toUpperCase();
            function l(e, t, i) {
                if (0 == e) {
                    var n = (i.nextSibling || i.previousSibling).cells[e];
                    "TH" == n.tagName && ((n = t.ownerDocument.createElement("th")).appendChild(t.firstChild), 
                    i.insertBefore(n, t), domUtils.remove(t));
                } else if ("TH" == t.tagName) {
                    var o = t.ownerDocument.createElement("td");
                    o.appendChild(t.firstChild), i.insertBefore(o, t), domUtils.remove(t);
                }
            }
            if (0 == e || e == this.rowsNum) {
                for (var d = 0; d < n; d++) i = this.cloneCell(t, !0), this.setCellContent(i), i.getAttribute("vAlign") && i.setAttribute("vAlign", i.getAttribute("vAlign")), 
                r.appendChild(i), s || l(d, i, r);
                s && (a = o.createTHead()).insertBefore(r, a.firstChild);
            } else {
                var c = this.indexTable[e];
                for (d = 0; d < n; d++) {
                    var u = c[d];
                    u.rowIndex < e ? (i = this.getCell(u.rowIndex, u.cellIndex)).rowSpan = u.rowSpan + 1 : (i = this.cloneCell(t, !0), 
                    this.setCellContent(i), r.appendChild(i)), s || l(d, i, r);
                }
            }
            return this.update(), r;
        },
        deleteRow: function(e) {
            for (var t = this.table.rows[e], i = this.indexTable[e], n = this.colsNum, o = 0, r = 0; r < n; ) {
                var a = i[r], s = this.getCell(a.rowIndex, a.cellIndex);
                if (1 < s.rowSpan && a.rowIndex == e) {
                    var l = s.cloneNode(!0);
                    l.rowSpan = s.rowSpan - 1, l.innerHTML = "";
                    var d, c = e + (s.rowSpan = 1), u = this.table.rows[c], m = this.getPreviewMergedCellsNum(c, r) - o;
                    m < r ? (d = r - m - 1, domUtils.insertAfter(u.cells[d], l)) : u.cells.length && u.insertBefore(l, u.cells[0]), 
                    o += 1;
                }
                r += s.colSpan || 1;
            }
            var f = [], h = {};
            for (r = 0; r < n; r++) {
                var p = i[r].rowIndex, g = i[r].cellIndex, v = p + "_" + g;
                h[v] || (h[v] = 1, s = this.getCell(p, g), f.push(s));
            }
            var b = [];
            utils.each(f, function(e) {
                1 == e.rowSpan ? e.parentNode.removeChild(e) : b.push(e);
            }), utils.each(b, function(e) {
                e.rowSpan--;
            }), t.parentNode.removeChild(t), this.update();
        },
        insertCol: function(e, t, i) {
            var n, o, r, a = this.rowsNum, s = 0, l = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10), d = "string" == typeof t && "TH" == t.toUpperCase();
            function c(e, t, i) {
                if (0 == e) {
                    var n = t.nextSibling || t.previousSibling;
                    "TH" == n.tagName && ((n = t.ownerDocument.createElement("th")).appendChild(t.firstChild), 
                    i.insertBefore(n, t), domUtils.remove(t));
                } else if ("TH" == t.tagName) {
                    var o = t.ownerDocument.createElement("td");
                    o.appendChild(t.firstChild), i.insertBefore(o, t), domUtils.remove(t);
                }
            }
            if (0 == e || e == this.colsNum) for (;s < a; s++) r = (n = this.table.rows[s]).cells[0 == e ? e : n.cells.length], 
            o = this.cloneCell(t, !0), this.setCellContent(o), o.setAttribute("vAlign", o.getAttribute("vAlign")), 
            r && o.setAttribute("width", r.getAttribute("width")), e ? domUtils.insertAfter(n.cells[n.cells.length - 1], o) : n.insertBefore(o, n.cells[0]), 
            d || c(s, o, n); else for (;s < a; s++) {
                var u = this.indexTable[s][e];
                u.colIndex < e ? (o = this.getCell(u.rowIndex, u.cellIndex)).colSpan = u.colSpan + 1 : (r = (n = this.table.rows[s]).cells[u.cellIndex], 
                o = this.cloneCell(t, !0), this.setCellContent(o), o.setAttribute("vAlign", o.getAttribute("vAlign")), 
                r && o.setAttribute("width", r.getAttribute("width")), r ? n.insertBefore(o, r) : n.appendChild(o)), 
                d || c(s, o, n);
            }
            this.update(), this.updateWidth(l, i || {
                tdPadding: 10,
                tdBorder: 1
            });
        },
        updateWidth: function(t, e) {
            var i = this.table, n = LY.getWidth(i) - 2 * e.tdPadding - e.tdBorder + t;
            if (n < i.ownerDocument.body.offsetWidth) i.setAttribute("width", n); else {
                var o = domUtils.getElementsByTagName(this.table, "td th");
                utils.each(o, function(e) {
                    e.setAttribute("width", t);
                });
            }
        },
        deleteCol: function(e) {
            for (var t = this.indexTable, i = this.table.rows, n = this.table.getAttribute("width"), o = 0, r = this.rowsNum, a = {}, s = 0; s < r; ) {
                var l = t[s][e], d = l.rowIndex + "_" + l.colIndex;
                if (!a[d]) {
                    a[d] = 1;
                    var c = this.getCell(l.rowIndex, l.cellIndex);
                    o || (o = c && parseInt(c.offsetWidth / c.colSpan, 10).toFixed(0)), 1 < c.colSpan ? c.colSpan-- : i[s].deleteCell(l.cellIndex), 
                    s += l.rowSpan || 1;
                }
            }
            this.table.setAttribute("width", n - o), this.update();
        },
        splitToCells: function(e) {
            var t = this, i = this.splitToRows(e);
            utils.each(i, function(e) {
                t.splitToCols(e);
            });
        },
        splitToRows: function(e) {
            var t = this.getCellInfo(e), i = t.rowIndex, n = t.colIndex, o = [];
            e.rowSpan = 1, o.push(e);
            for (var r = i, a = i + t.rowSpan; r < a; r++) if (r != i) {
                var s = this.table.rows[r].insertCell(n - this.getPreviewMergedCellsNum(r, n));
                s.colSpan = t.colSpan, this.setCellContent(s), s.setAttribute("vAlign", e.getAttribute("vAlign")), 
                s.setAttribute("align", e.getAttribute("align")), e.style.cssText && (s.style.cssText = e.style.cssText), 
                o.push(s);
            }
            return this.update(), o;
        },
        getPreviewMergedCellsNum: function(e, t) {
            for (var i = this.indexTable[e], n = 0, o = 0; o < t; ) {
                var r = i[o].colSpan;
                n += r - (i[o].rowIndex == e ? 1 : 0), o += r;
            }
            return n;
        },
        splitToCols: function(e) {
            var t = (e.offsetWidth / e.colSpan - 22).toFixed(0), i = this.getCellInfo(e), n = i.rowIndex, o = i.colIndex, r = [];
            e.colSpan = 1, e.setAttribute("width", t), r.push(e);
            for (var a = o, s = o + i.colSpan; a < s; a++) if (a != o) {
                var l = this.table.rows[n], d = l.insertCell(this.indexTable[n][a].cellIndex + 1);
                if (d.rowSpan = i.rowSpan, this.setCellContent(d), d.setAttribute("vAlign", e.getAttribute("vAlign")), 
                d.setAttribute("align", e.getAttribute("align")), d.setAttribute("width", t), e.style.cssText && (d.style.cssText = e.style.cssText), 
                "TH" == e.tagName) {
                    var c = e.ownerDocument.createElement("th");
                    c.appendChild(d.firstChild), c.setAttribute("vAlign", e.getAttribute("vAlign")), 
                    c.rowSpan = d.rowSpan, l.insertBefore(c, d), domUtils.remove(d);
                }
                r.push(d);
            }
            return this.update(), r;
        },
        isLastCell: function(e, t, i) {
            t = t || this.rowsNum, i = i || this.colsNum;
            var n = this.getCellInfo(e);
            return n.rowIndex + n.rowSpan == t && n.colIndex + n.colSpan == i;
        },
        getLastCell: function(e) {
            e = e || this.table.getElementsByTagName("td"), this.getCellInfo(e[0]);
            var t, i = this, n = e[0], o = n.parentNode, r = 0, a = 0;
            return utils.each(e, function(e) {
                e.parentNode == o && (a += e.colSpan || 1), r += e.rowSpan * e.colSpan || 1;
            }), t = r / a, utils.each(e, function(e) {
                if (i.isLastCell(e, t, a)) return n = e, !1;
            }), n;
        },
        selectRow: function(e) {
            var t = this.indexTable[e], i = this.getCell(t[0].rowIndex, t[0].cellIndex), n = this.getCell(t[this.colsNum - 1].rowIndex, t[this.colsNum - 1].cellIndex), o = this.getCellsRange(i, n);
            this.setSelected(o);
        },
        selectTable: function() {
            var e = this.table.getElementsByTagName("td"), t = this.getCellsRange(e[0], e[e.length - 1]);
            this.setSelected(t);
        },
        setBackground: function(e, t) {
            if ("string" == typeof t) utils.each(e, function(e) {
                e.style.backgroundColor = t;
            }); else if ("object" === _typeof(t)) {
                t = utils.extend({
                    repeat: !0,
                    colorList: [ "#ddd", "#fff" ]
                }, t);
                for (var i, n = this.getCellInfo(e[0]).rowIndex, o = 0, r = t.colorList, a = 0; i = e[a++]; ) {
                    var s = this.getCellInfo(i);
                    i.style.backgroundColor = (l = r, d = n + o == s.rowIndex ? o : ++o, c = t.repeat, 
                    l[d] ? l[d] : c ? l[d % l.length] : "");
                }
            }
            var l, d, c;
        },
        removeBackground: function(e) {
            utils.each(e, function(e) {
                e.style.backgroundColor = "";
            });
        }
    }, function() {
        var i = UE.UETable, u = function(e) {
            return i.getTableItemsByRange(e);
        }, r = function(e) {
            return i.getUETableBySelected(e);
        }, g = function(e, t) {
            return i.getDefaultValue(e, t);
        }, m = function(e) {
            return i.getUETable(e);
        };
        function n(e, t) {
            var i, n, o, r, a = domUtils.getElementsByTagName(e, "td th");
            utils.each(a, function(e) {
                e.removeAttribute("width");
            }), e.setAttribute("width", (n = !0, o = g(i = t, e), (r = i.body).offsetWidth - (n ? 2 * parseInt(domUtils.getComputedStyle(r, "margin-left"), 10) : 0) - 2 * o.tableBorder - (i.options.offsetWidth || 0)));
            var s = [];
            setTimeout(function() {
                utils.each(a, function(e) {
                    1 == e.colSpan && s.push(e.offsetWidth);
                }), utils.each(a, function(e, t) {
                    1 == e.colSpan && e.setAttribute("width", s[t] + "");
                });
            }, 0);
        }
        function a(e) {
            var t = u(e).cell;
            if (t) {
                var i = m(t);
                return i.selectedTds.length ? i.selectedTds : [ t ];
            }
            return [];
        }
        UE.commands.inserttable = {
            queryCommandState: function() {
                return u(this).table ? -1 : 0;
            },
            execCommand: function(e, t) {
                t || (t = utils.extend({}, {
                    numCols: this.options.defaultCols,
                    numRows: this.options.defaultRows,
                    tdvalign: this.options.tdvalign
                }));
                var i = this.selection.getRange().startContainer, n = domUtils.findParent(i, function(e) {
                    return domUtils.isBlockElm(e);
                }, !0) || this.body, o = g(this), r = n.offsetWidth, a = Math.floor(r / t.numCols - 2 * o.tdPadding - o.tdBorder);
                !t.tdvalign && (t.tdvalign = this.options.tdvalign), this.execCommand("inserthtml", function(e, t) {
                    for (var i = [], n = e.numRows, o = e.numCols, r = 0; r < n; r++) {
                        i.push("<tr" + (0 == r ? ' class="firstRow"' : "") + ">");
                        for (var a = 0; a < o; a++) i.push('<td width="' + t + '"  vAlign="' + e.tdvalign + '" >' + (browser.ie && browser.version < 11 ? domUtils.fillChar : "<br/>") + "</td>");
                        i.push("</tr>");
                    }
                    return "<table><tbody>" + i.join("") + "</tbody></table>";
                }(t, a));
            }
        }, UE.commands.insertparagraphbeforetable = {
            queryCommandState: function() {
                return u(this).cell ? 0 : -1;
            },
            execCommand: function() {
                var e = u(this).table;
                if (e) {
                    var t = this.document.createElement("p");
                    t.innerHTML = browser.ie ? "&nbsp;" : "<br />", e.parentNode.insertBefore(t, e), 
                    this.selection.getRange().setStart(t, 0).setCursor();
                }
            }
        }, UE.commands.deletetable = {
            queryCommandState: function() {
                var e = this.selection.getRange();
                return domUtils.findParentByTagName(e.startContainer, "table", !0) ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = this.selection.getRange();
                if (t = t || domUtils.findParentByTagName(i.startContainer, "table", !0)) {
                    var n = t.nextSibling;
                    n || (n = domUtils.createElement(this.document, "p", {
                        innerHTML: browser.ie ? domUtils.fillChar : "<br/>"
                    }), t.parentNode.insertBefore(n, t)), domUtils.remove(t), i = this.selection.getRange(), 
                    3 == n.nodeType ? i.setStartBefore(n) : i.setStart(n, 0), i.setCursor(!1, !0), this.fireEvent("tablehasdeleted");
                }
            }
        }, UE.commands.cellalign = {
            queryCommandState: function() {
                return a(this).length ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = a(this);
                if (i.length) for (var n, o = 0; n = i[o++]; ) n.setAttribute("align", t);
            }
        }, UE.commands.cellvalign = {
            queryCommandState: function() {
                return a(this).length ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = a(this);
                if (i.length) for (var n, o = 0; n = i[o++]; ) n.setAttribute("vAlign", t);
            }
        }, UE.commands.insertcaption = {
            queryCommandState: function() {
                var e = u(this).table;
                return e && 0 == e.getElementsByTagName("caption").length ? 1 : -1;
            },
            execCommand: function() {
                var e = u(this).table;
                if (e) {
                    var t = this.document.createElement("caption");
                    t.innerHTML = browser.ie ? domUtils.fillChar : "<br/>", e.insertBefore(t, e.firstChild), 
                    this.selection.getRange().setStart(t, 0).setCursor();
                }
            }
        }, UE.commands.deletecaption = {
            queryCommandState: function() {
                var e = this.selection.getRange(), t = domUtils.findParentByTagName(e.startContainer, "table");
                return t ? 0 == t.getElementsByTagName("caption").length ? -1 : 1 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = domUtils.findParentByTagName(e.startContainer, "table");
                t && (domUtils.remove(t.getElementsByTagName("caption")[0]), this.selection.getRange().setStart(t.rows[0].cells[0], 0).setCursor());
            }
        }, UE.commands.inserttitle = {
            queryCommandState: function() {
                var e = u(this).table;
                if (e) {
                    var t = e.rows[0];
                    return "th" != t.cells[t.cells.length - 1].tagName.toLowerCase() ? 0 : -1;
                }
                return -1;
            },
            execCommand: function() {
                var e = u(this).table;
                e && m(e).insertRow(0, "th");
                var t = e.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(t, 0).setCursor(!1, !0);
            }
        }, UE.commands.deletetitle = {
            queryCommandState: function() {
                var e = u(this).table;
                if (e) {
                    var t = e.rows[0];
                    return "th" == t.cells[t.cells.length - 1].tagName.toLowerCase() ? 0 : -1;
                }
                return -1;
            },
            execCommand: function() {
                var e = u(this).table;
                e && domUtils.remove(e.rows[0]);
                var t = e.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(t, 0).setCursor(!1, !0);
            }
        }, UE.commands.inserttitlecol = {
            queryCommandState: function() {
                var e = u(this).table;
                return e ? e.rows[e.rows.length - 1].getElementsByTagName("th").length ? -1 : 0 : -1;
            },
            execCommand: function(e) {
                var t = u(this).table;
                t && m(t).insertCol(0, "th"), n(t, this);
                var i = t.getElementsByTagName("th")[0];
                this.selection.getRange().setStart(i, 0).setCursor(!1, !0);
            }
        }, UE.commands.deletetitlecol = {
            queryCommandState: function() {
                var e = u(this).table;
                return e && e.rows[e.rows.length - 1].getElementsByTagName("th").length ? 0 : -1;
            },
            execCommand: function() {
                var e = u(this).table;
                if (e) for (var t = 0; t < e.rows.length; t++) domUtils.remove(e.rows[t].children[0]);
                n(e, this);
                var i = e.getElementsByTagName("td")[0];
                this.selection.getRange().setStart(i, 0).setCursor(!1, !0);
            }
        }, UE.commands.mergeright = {
            queryCommandState: function(e) {
                var t = u(this), i = t.table, n = t.cell;
                if (!i || !n) return -1;
                var o = m(i);
                if (o.selectedTds.length) return -1;
                var r = o.getCellInfo(n), a = r.colIndex + r.colSpan;
                if (a >= o.colsNum) return -1;
                var s = o.indexTable[r.rowIndex][a], l = i.rows[s.rowIndex].cells[s.cellIndex];
                return l && n.tagName == l.tagName && s.rowIndex == r.rowIndex && s.rowSpan == r.rowSpan ? 0 : -1;
            },
            execCommand: function(e) {
                var t = this.selection.getRange(), i = t.createBookmark(!0), n = u(this).cell;
                m(n).mergeRight(n), t.moveToBookmark(i).select();
            }
        }, UE.commands.mergedown = {
            queryCommandState: function(e) {
                var t = u(this), i = t.table, n = t.cell;
                if (!i || !n) return -1;
                var o = m(i);
                if (o.selectedTds.length) return -1;
                var r = o.getCellInfo(n), a = r.rowIndex + r.rowSpan;
                if (a >= o.rowsNum) return -1;
                var s = o.indexTable[a][r.colIndex], l = i.rows[s.rowIndex].cells[s.cellIndex];
                return l && n.tagName == l.tagName && s.colIndex == r.colIndex && s.colSpan == r.colSpan ? 0 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this).cell;
                m(i).mergeDown(i), e.moveToBookmark(t).select();
            }
        }, UE.commands.mergecells = {
            queryCommandState: function() {
                return r(this) ? 0 : -1;
            },
            execCommand: function() {
                var e = r(this);
                if (e && e.selectedTds.length) {
                    var t = e.selectedTds[0];
                    e.mergeRange();
                    var i = this.selection.getRange();
                    domUtils.isEmptyBlock(t) ? i.setStart(t, 0).collapse(!0) : i.selectNodeContents(t), 
                    i.select();
                }
            }
        }, UE.commands.insertrow = {
            queryCommandState: function() {
                var e = u(this), t = e.cell;
                return t && ("TD" == t.tagName || "TH" == t.tagName && e.tr !== e.table.rows[0]) && m(e.table).rowsNum < this.options.maxRowNum ? 0 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this), n = i.cell, o = i.table, r = m(o), a = r.getCellInfo(n);
                if (r.selectedTds.length) for (var s = r.cellsRange, l = 0, d = s.endRowIndex - s.beginRowIndex + 1; l < d; l++) r.insertRow(s.beginRowIndex, n); else r.insertRow(a.rowIndex, n);
                e.moveToBookmark(t).select(), "enabled" === o.getAttribute("interlaced") && this.fireEvent("interlacetable", o);
            }
        }, UE.commands.insertrownext = {
            queryCommandState: function() {
                var e = u(this), t = e.cell;
                return t && "TD" == t.tagName && m(e.table).rowsNum < this.options.maxRowNum ? 0 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this), n = i.cell, o = i.table, r = m(o), a = r.getCellInfo(n);
                if (r.selectedTds.length) for (var s = r.cellsRange, l = 0, d = s.endRowIndex - s.beginRowIndex + 1; l < d; l++) r.insertRow(s.endRowIndex + 1, n); else r.insertRow(a.rowIndex + a.rowSpan, n);
                e.moveToBookmark(t).select(), "enabled" === o.getAttribute("interlaced") && this.fireEvent("interlacetable", o);
            }
        }, UE.commands.deleterow = {
            queryCommandState: function() {
                return u(this).cell ? 0 : -1;
            },
            execCommand: function() {
                var e = u(this).cell, t = m(e), i = t.cellsRange, n = t.getCellInfo(e), o = t.getVSideCell(e), r = t.getVSideCell(e, !0), a = this.selection.getRange();
                if (utils.isEmptyObject(i)) t.deleteRow(n.rowIndex); else for (var s = i.beginRowIndex; s < i.endRowIndex + 1; s++) t.deleteRow(i.beginRowIndex);
                var l = t.table;
                if (l.getElementsByTagName("td").length) if (1 == n.rowSpan || n.rowSpan == i.endRowIndex - i.beginRowIndex + 1) (r || o) && a.selectNodeContents(r || o).setCursor(!1, !0); else {
                    var d = t.getCell(n.rowIndex, t.indexTable[n.rowIndex][n.colIndex].cellIndex);
                    d && a.selectNodeContents(d).setCursor(!1, !0);
                } else {
                    var c = l.nextSibling;
                    domUtils.remove(l), c && a.setStart(c, 0).setCursor(!1, !0);
                }
                "enabled" === l.getAttribute("interlaced") && this.fireEvent("interlacetable", l);
            }
        }, UE.commands.insertcol = {
            queryCommandState: function(e) {
                var t = u(this), i = t.cell;
                return i && ("TD" == i.tagName || "TH" == i.tagName && i !== t.tr.cells[0]) && m(t.table).colsNum < this.options.maxColNum ? 0 : -1;
            },
            execCommand: function(e) {
                var t = this.selection.getRange(), i = t.createBookmark(!0);
                if (-1 != this.queryCommandState(e)) {
                    var n = u(this).cell, o = m(n), r = o.getCellInfo(n);
                    if (o.selectedTds.length) for (var a = o.cellsRange, s = 0, l = a.endColIndex - a.beginColIndex + 1; s < l; s++) o.insertCol(a.beginColIndex, n); else o.insertCol(r.colIndex, n);
                    t.moveToBookmark(i).select(!0);
                }
            }
        }, UE.commands.insertcolnext = {
            queryCommandState: function() {
                var e = u(this);
                return e.cell && m(e.table).colsNum < this.options.maxColNum ? 0 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this).cell, n = m(i), o = n.getCellInfo(i);
                if (n.selectedTds.length) for (var r = n.cellsRange, a = 0, s = r.endColIndex - r.beginColIndex + 1; a < s; a++) n.insertCol(r.endColIndex + 1, i); else n.insertCol(o.colIndex + o.colSpan, i);
                e.moveToBookmark(t).select();
            }
        }, UE.commands.deletecol = {
            queryCommandState: function() {
                return u(this).cell ? 0 : -1;
            },
            execCommand: function() {
                var e = u(this).cell, t = m(e), i = t.cellsRange, n = t.getCellInfo(e), o = t.getHSideCell(e), r = t.getHSideCell(e, !0);
                if (utils.isEmptyObject(i)) t.deleteCol(n.colIndex); else for (var a = i.beginColIndex; a < i.endColIndex + 1; a++) t.deleteCol(i.beginColIndex);
                var s = t.table, l = this.selection.getRange();
                if (s.getElementsByTagName("td").length) domUtils.inDoc(e, this.document) ? l.setStart(e, 0).setCursor(!1, !0) : r && domUtils.inDoc(r, this.document) ? l.selectNodeContents(r).setCursor(!1, !0) : o && domUtils.inDoc(o, this.document) && l.selectNodeContents(o).setCursor(!0, !0); else {
                    var d = s.nextSibling;
                    domUtils.remove(s), d && l.setStart(d, 0).setCursor(!1, !0);
                }
            }
        }, UE.commands.splittocells = {
            queryCommandState: function() {
                var e = u(this), t = e.cell;
                return t ? 0 < m(e.table).selectedTds.length ? -1 : t && (1 < t.colSpan || 1 < t.rowSpan) ? 0 : -1 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this).cell;
                m(i).splitToCells(i), e.moveToBookmark(t).select();
            }
        }, UE.commands.splittorows = {
            queryCommandState: function() {
                var e = u(this), t = e.cell;
                return t ? 0 < m(e.table).selectedTds.length ? -1 : t && 1 < t.rowSpan ? 0 : -1 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this).cell;
                m(i).splitToRows(i), e.moveToBookmark(t).select();
            }
        }, UE.commands.splittocols = {
            queryCommandState: function() {
                var e = u(this), t = e.cell;
                return t ? 0 < m(e.table).selectedTds.length ? -1 : t && 1 < t.colSpan ? 0 : -1 : -1;
            },
            execCommand: function() {
                var e = this.selection.getRange(), t = e.createBookmark(!0), i = u(this).cell;
                m(i).splitToCols(i), e.moveToBookmark(t).select();
            }
        }, UE.commands.adaptbytext = UE.commands.adaptbywindow = {
            queryCommandState: function() {
                return u(this).table ? 0 : -1;
            },
            execCommand: function(e) {
                var t = u(this).table;
                if (t) if ("adaptbywindow" == e) n(t, this); else {
                    var i = domUtils.getElementsByTagName(t, "td th");
                    utils.each(i, function(e) {
                        e.removeAttribute("width");
                    }), t.removeAttribute("width");
                }
            }
        }, UE.commands.averagedistributecol = {
            queryCommandState: function() {
                var e = r(this);
                return e && (e.isFullRow() || e.isFullCol()) ? 0 : -1;
            },
            execCommand: function(e) {
                var l = this, d = r(l);
                d && d.selectedTds.length && function(t) {
                    utils.each(domUtils.getElementsByTagName(d.table, "th"), function(e) {
                        e.setAttribute("width", "");
                    });
                    var e = d.isFullRow() ? domUtils.getElementsByTagName(d.table, "td") : d.selectedTds;
                    utils.each(e, function(e) {
                        1 == e.colSpan && e.setAttribute("width", t);
                    });
                }(function() {
                    var e = d.table, t = 0, i = 0, n = g(l, e);
                    if (d.isFullRow()) t = e.offsetWidth, i = d.colsNum; else for (var o, r = d.cellsRange.beginColIndex, a = d.cellsRange.endColIndex, s = r; s <= a; ) t += (o = d.selectedTds[s]).offsetWidth, 
                    s += o.colSpan, i += 1;
                    return Math.ceil(t / i) - 2 * n.tdBorder - 2 * n.tdPadding;
                }());
            }
        }, UE.commands.averagedistributerow = {
            queryCommandState: function() {
                var e = r(this);
                return e ? e.selectedTds && /th/gi.test(e.selectedTds[0].tagName) ? -1 : e.isFullRow() || e.isFullCol() ? 0 : -1 : -1;
            },
            execCommand: function(e) {
                var t, i, h = this, p = r(h);
                p && p.selectedTds.length && (t = function() {
                    var e, t = 0, i = p.table, n = g(h, i), o = parseInt(domUtils.getComputedStyle(i.getElementsByTagName("td")[0], "padding-top"));
                    if (p.isFullCol()) {
                        var r, a, s = domUtils.getElementsByTagName(i, "caption"), l = domUtils.getElementsByTagName(i, "th");
                        0 < s.length && (r = s[0].offsetHeight), 0 < l.length && (a = l[0].offsetHeight), 
                        t = i.offsetHeight - (r || 0) - (a || 0), e = 0 == l.length ? p.rowsNum : p.rowsNum - 1;
                    } else {
                        for (var d = p.cellsRange.beginRowIndex, c = p.cellsRange.endRowIndex, u = 0, m = domUtils.getElementsByTagName(i, "tr"), f = d; f <= c; f++) t += m[f].offsetHeight, 
                        u += 1;
                        e = u;
                    }
                    return browser.ie && browser.version < 9 ? Math.ceil(t / e) : Math.ceil(t / e) - 2 * n.tdBorder - 2 * o;
                }(), i = p.isFullCol() ? domUtils.getElementsByTagName(p.table, "td") : p.selectedTds, 
                utils.each(i, function(e) {
                    1 == e.rowSpan && e.setAttribute("height", t);
                }));
            }
        }, UE.commands.cellalignment = {
            queryCommandState: function() {
                return u(this).table ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = r(this);
                if (i) utils.each(i.selectedTds, function(e) {
                    domUtils.setAttributes(e, t);
                }); else {
                    var n = this.selection.getStart(), o = n && domUtils.findParentByTagName(n, [ "td", "th", "caption" ], !0);
                    /caption/gi.test(o.tagName) ? (o.style.textAlign = t.align, o.style.verticalAlign = t.vAlign) : domUtils.setAttributes(o, t), 
                    this.selection.getRange().setCursor(!0);
                }
            },
            queryCommandValue: function(e) {
                var t = u(this).cell;
                if (t || (t = a(this)[0]), t) {
                    var i = UE.UETable.getUETable(t).selectedTds;
                    return !i.length && (i = t), UE.UETable.getTableCellAlignState(i);
                }
                return null;
            }
        }, UE.commands.tablealignment = {
            queryCommandState: function() {
                return browser.ie && browser.version < 8 ? -1 : u(this).table ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = this.selection.getStart(), n = i && domUtils.findParentByTagName(i, [ "table" ], !0);
                n && n.setAttribute("align", t);
            }
        }, UE.commands.edittable = {
            queryCommandState: function() {
                return u(this).table ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = this.selection.getRange(), n = domUtils.findParentByTagName(i.startContainer, "table");
                if (n) {
                    var o = domUtils.getElementsByTagName(n, "td").concat(domUtils.getElementsByTagName(n, "th"), domUtils.getElementsByTagName(n, "caption"));
                    utils.each(o, function(e) {
                        e.style.borderColor = t;
                    });
                }
            }
        }, UE.commands.edittd = {
            queryCommandState: function() {
                return u(this).table ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = r(this);
                if (i) utils.each(i.selectedTds, function(e) {
                    e.style.backgroundColor = t;
                }); else {
                    var n = this.selection.getStart(), o = n && domUtils.findParentByTagName(n, [ "td", "th", "caption" ], !0);
                    o && (o.style.backgroundColor = t);
                }
            }
        }, UE.commands.settablebackground = {
            queryCommandState: function() {
                return 1 < a(this).length ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i;
                i = a(this), m(i[0]).setBackground(i, t);
            }
        }, UE.commands.cleartablebackground = {
            queryCommandState: function() {
                var e = a(this);
                if (!e.length) return -1;
                for (var t, i = 0; t = e[i++]; ) if ("" !== t.style.backgroundColor) return 0;
                return -1;
            },
            execCommand: function() {
                var e = a(this);
                m(e[0]).removeBackground(e);
            }
        }, UE.commands.interlacetable = UE.commands.uninterlacetable = {
            queryCommandState: function(e) {
                var t = u(this).table;
                if (!t) return -1;
                var i = t.getAttribute("interlaced");
                return "interlacetable" == e ? "enabled" === i ? -1 : 0 : i && "disabled" !== i ? 0 : -1;
            },
            execCommand: function(e, t) {
                var i = u(this).table;
                "interlacetable" == e ? (i.setAttribute("interlaced", "enabled"), this.fireEvent("interlacetable", i, t)) : (i.setAttribute("interlaced", "disabled"), 
                this.fireEvent("uninterlacetable", i));
            }
        }, UE.commands.setbordervisible = {
            queryCommandState: function(e) {
                return u(this).table ? 0 : -1;
            },
            execCommand: function() {
                var e = u(this).table;
                utils.each(domUtils.getElementsByTagName(e, "td"), function(e) {
                    e.style.borderWidth = "1px", e.style.borderStyle = "solid";
                });
            }
        };
    }(), UE.plugins.table = function() {
        var u = this, r = null, m = 5, f = !1, n = 5, a = 10, h = 0, p = null, g = 360, T = UE.UETable, S = function(e) {
            return T.getUETable(e);
        }, k = function(e) {
            return T.getUETableBySelected(e);
        }, B = function(e, t) {
            return T.getDefaultValue(e, t);
        }, s = function(e) {
            return T.removeSelectedClass(e);
        };
        u.ready(function() {
            var i = this, n = i.selection.getText;
            i.selection.getText = function() {
                var e = k(i);
                if (e) {
                    var t = "";
                    return utils.each(e.selectedTds, function(e) {
                        t += e[browser.ie ? "innerText" : "textContent"];
                    }), t;
                }
                return n.call(i.selection);
            };
        });
        var v = null, l = null, b = "", y = !1, o = null, d = !1, C = null, N = null, x = !1;
        u.setOpt({
            maxColNum: 20,
            maxRowNum: 100,
            defaultCols: 5,
            defaultRows: 5,
            tdvalign: "top",
            cursorpath: u.options.UEDITOR_HOME_URL + "themes/default/images/cursor_",
            tableDragable: !1,
            classList: [ "ue-table-interlace-color-single", "ue-table-interlace-color-double" ]
        }), u.getUETable = S;
        var A = {
            deletetable: 1,
            inserttable: 1,
            cellvalign: 1,
            insertcaption: 1,
            deletecaption: 1,
            inserttitle: 1,
            deletetitle: 1,
            mergeright: 1,
            mergedown: 1,
            mergecells: 1,
            insertrow: 1,
            insertrownext: 1,
            deleterow: 1,
            insertcol: 1,
            insertcolnext: 1,
            deletecol: 1,
            splittocells: 1,
            splittorows: 1,
            splittocols: 1,
            adaptbytext: 1,
            adaptbywindow: 1,
            adaptbycustomer: 1,
            insertparagraph: 1,
            insertparagraphbeforetable: 1,
            averagedistributecol: 1,
            averagedistributerow: 1
        };
        function I(e, t) {
            i(e, "width", !0), i(e, "height", !0);
        }
        function i(e, t, i) {
            e.style[t] && (i && e.setAttribute(t, parseInt(e.style[t], 10)), e.style[t] = "");
        }
        function _(e) {
            return "TD" == e.tagName || "TH" == e.tagName ? e : (t = domUtils.findParentByTagName(e, "td", !0) || domUtils.findParentByTagName(e, "th", !0)) ? t : null;
            var t;
        }
        function L(e) {
            var t = new RegExp(domUtils.fillChar, "g");
            if (0 < e[browser.ie ? "innerText" : "textContent"].replace(/^\s*$/, "").replace(t, "").length) return 0;
            for (var i in dtd.$isNotEmpty) if (e.getElementsByTagName(i).length) return 0;
            return 1;
        }
        function w(e) {
            return e.pageX || e.pageY ? {
                x: e.pageX,
                y: e.pageY
            } : {
                x: e.clientX + u.document.body.scrollLeft - u.document.body.clientLeft,
                y: e.clientY + u.document.body.scrollTop - u.document.body.clientTop
            };
        }
        function t(e) {
            if (!$()) try {
                var t, i = _(e.target || e.srcElement);
                if (f && (u.body.style.webkitUserSelect = "none", (Math.abs(p.x - e.clientX) > a || Math.abs(p.y - e.clientY) > a) && (E(), 
                f = !1, h = 0, P(e))), b && N) return h = 0, u.body.style.webkitUserSelect = "none", 
                u.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), t = w(e), 
                D(u, !0, b, t, i), void ("h" == b ? C.style.left = function(e, t) {
                    var i = S(e);
                    if (i) {
                        var n = i.getSameEndPosCells(e, "x")[0], o = i.getSameStartPosXCells(e)[0], r = w(t).x, a = (n ? domUtils.getXY(n).x : domUtils.getXY(i.table).x) + 20, s = o ? domUtils.getXY(o).x + o.offsetWidth - 20 : u.body.offsetWidth + 5 || parseInt(domUtils.getComputedStyle(u.body, "width"), 10);
                        return s -= m, r < (a += m) ? a : s < r ? s : r;
                    }
                }(N, e) + "px" : "v" == b && (C.style.top = function(e, t) {
                    try {
                        var i = domUtils.getXY(e).y, n = w(t).y;
                        return n < i ? i : n;
                    } catch (e) {}
                }(N, e) + "px"));
                if (i) {
                    if (!0 === u.fireEvent("excludetable", i)) return;
                    var n = U(i, t = w(e)), o = domUtils.findParentByTagName(i, "table", !0);
                    if (R(o, i, e, !0)) {
                        if (!0 === u.fireEvent("excludetable", o)) return;
                        u.body.style.cursor = "url(" + u.options.cursorpath + "h.png),pointer";
                    } else if (R(o, i, e)) {
                        if (!0 === u.fireEvent("excludetable", o)) return;
                        u.body.style.cursor = "url(" + u.options.cursorpath + "v.png),pointer";
                    } else {
                        u.body.style.cursor = "text";
                        /\d/.test(n) && (n = n.replace(/\d/, ""), i = S(i).getPreviewCell(i, "v" == n)), 
                        D(u, !!i && !!n, i ? n : "", t, i);
                    }
                } else c(!1, o, u);
            } catch (e) {}
        }
        function c(e, t, i) {
            if (e) !function(r, a) {
                var s, e = domUtils.getXY(r), t = r.ownerDocument;
                if (o && o.parentNode) return;
                (o = t.createElement("div")).contentEditable = !1, o.innerHTML = "", o.style.cssText = "width:15px;height:15px;background-image:url(" + a.options.UEDITOR_HOME_URL + "dialogs/table/dragicon.png);position: absolute;cursor:move;top:" + (e.y - 15) + "px;left:" + e.x + "px;", 
                domUtils.unSelectable(o), o.onmouseover = function(e) {
                    d = !0;
                }, o.onmouseout = function(e) {
                    d = !1;
                }, domUtils.on(o, "click", function(e, t) {
                    var i;
                    i = this, clearTimeout(s), s = setTimeout(function() {
                        a.fireEvent("tableClicked", r, i);
                    }, 300);
                }), domUtils.on(o, "dblclick", function(e, t) {
                    !function(e) {
                        clearTimeout(s);
                        var t = S(r), i = r.rows[0].cells[0], n = t.getLastCell(), o = t.getCellsRange(i, n);
                        a.selection.getRange().setStart(i, 0).setCursor(!1, !0), t.setSelected(o);
                    }();
                }), domUtils.on(o, "dragstart", function(e, t) {
                    domUtils.preventDefault(t);
                }), t.body.appendChild(o);
            }(t, i); else {
                if (d) return;
                setTimeout(function() {
                    !d && o && o.parentNode && o.parentNode.removeChild(o);
                }, 2e3);
            }
        }
        function R(e, t, i, n) {
            var o = w(i), r = U(t, o);
            if (n) {
                var a = e.getElementsByTagName("caption")[0], s = a ? a.offsetHeight : 0;
                return "v1" == r && o.y - domUtils.getXY(e).y - s < 8;
            }
            return "h1" == r && o.x - domUtils.getXY(e).x < 8;
        }
        function D(e, t, i, n, o) {
            try {
                e.body.style.cursor = "h" == i ? "col-resize" : "v" == i ? "row-resize" : "text", 
                browser.ie && (!i || x || k(e) ? j(e) : (W(e, e.document), Y(i, o))), y = t;
            } catch (e) {}
        }
        function U(e, t) {
            var i = domUtils.getXY(e);
            return i ? i.x + e.offsetWidth - t.x < n ? "h" : t.x - i.x < n ? "h1" : i.y + e.offsetHeight - t.y < n ? "v" : t.y - i.y < n ? "v1" : "" : "";
        }
        function O(e, t) {
            if (!$()) if (p = {
                x: t.clientX,
                y: t.clientY
            }, 2 == t.button) {
                var i = k(u), n = !1;
                if (i) {
                    var o = X(u, t);
                    utils.each(i.selectedTds, function(e) {
                        e === o && (n = !0);
                    }), n ? (o = i.selectedTds[0], setTimeout(function() {
                        u.selection.getRange().setStart(o, 0).setCursor(!1, !0);
                    }, 0)) : (s(domUtils.getElementsByTagName(u.body, "th td")), i.clearSelected());
                }
            } else !function(e) {
                if (s(domUtils.getElementsByTagName(u.body, "td th")), utils.each(u.document.getElementsByTagName("table"), function(e) {
                    e.ueTable = null;
                }), !(v = X(u, e))) return;
                var t = domUtils.findParentByTagName(v, "table", !0);
                ut = S(t), ut && ut.clearSelected(), y ? function(e) {
                    browser.ie && (e = function(e) {
                        var t = [ "pageX", "pageY", "clientX", "clientY", "srcElement", "target" ], i = {};
                        if (e) for (var n, o, r = 0; n = t[r]; r++) (o = e[n]) && (i[n] = o);
                        return i;
                    }(e));
                    E(), f = !0, r = setTimeout(function() {
                        P(e);
                    }, g);
                }(e) : (u.document.body.style.webkitUserSelect = "", x = !0, u.addListener("mouseover", H));
            }(t);
        }
        function E() {
            r && clearTimeout(r), r = null;
        }
        function P(e) {
            if (f = !1, v = e.target || e.srcElement) {
                var t = U(v, w(e));
                /\d/.test(t) && (t = t.replace(/\d/, ""), v = S(v).getPreviewCell(v, "v" == t)), 
                j(u), W(u, u.document), u.fireEvent("saveScene"), Y(t, v), x = !0, b = t, N = v;
            }
        }
        function M(e, t) {
            if (!$()) {
                if (E(), f = !1, y && (h = ++h % 3, p = {
                    x: t.clientX,
                    y: t.clientY
                }, setTimeout(function() {
                    0 < h && h--;
                }, g), 2 === h)) return h = 0, void function(e) {
                    h = 0;
                    var t, i = _((e = e || u.window.event).target || e.srcElement);
                    if (i && (t = U(i, w(e))) && (j(u), "h1" == t && (t = "h", R(domUtils.findParentByTagName(i, "table"), i, e) ? u.execCommand("adaptbywindow") : (i = S(i).getPreviewCell(i)) && u.selection.getRange().selectNodeContents(i).setCursor(!0, !0)), 
                    "h" == t)) {
                        var n = S(i), o = q(i, n.table, !0);
                        o = function(e, t) {
                            for (var i = [], n = null, o = 0, r = e.length; o < r; o++) (n = e[o][t]) && i.push(n);
                            return i;
                        }(o, "left"), n.width = n.offsetWidth;
                        var r = [], a = [];
                        utils.each(o, function(e) {
                            r.push(e.offsetWidth);
                        }), utils.each(o, function(e) {
                            e.removeAttribute("width");
                        }), window.setTimeout(function() {
                            var n = !0;
                            utils.each(o, function(e, t) {
                                var i = e.offsetWidth;
                                if (i > r[t]) return n = !1;
                                a.push(i);
                            });
                            var i = n ? a : r;
                            utils.each(o, function(e, t) {
                                e.width = i[t] - V();
                            });
                        }, 0);
                    }
                }(t);
                if (2 != t.button) {
                    var i = this, n = i.selection.getRange(), o = domUtils.findParentByTagName(n.startContainer, "table", !0), r = domUtils.findParentByTagName(n.endContainer, "table", !0);
                    if ((o || r) && (o === r ? (o = domUtils.findParentByTagName(n.startContainer, [ "td", "th", "caption" ], !0)) !== (r = domUtils.findParentByTagName(n.endContainer, [ "td", "th", "caption" ], !0)) && i.selection.clearRange() : i.selection.clearRange()), 
                    x = !1, i.document.body.style.webkitUserSelect = "", b && N && (i.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"](), 
                    h = 0, C = i.document.getElementById("ue_tableDragLine"))) {
                        var a = domUtils.getXY(N), s = domUtils.getXY(C);
                        switch (b) {
                          case "h":
                            !function(e, t) {
                                var i = S(e);
                                if (i) {
                                    var n = i.table, o = q(e, n);
                                    if (n.style.width = "", n.removeAttribute("width"), t = function(i, e, t) {
                                        if ((i -= V()) < 0) return 0;
                                        var n = (i -= z(e)) < 0 ? "left" : "right";
                                        return i = Math.abs(i), utils.each(t, function(e) {
                                            var t = e[n];
                                            t && (i = Math.min(i, z(t) - m));
                                        }), i = i < 0 ? 0 : i, "left" === n ? -i : i;
                                    }(t, e, o), e.nextSibling) {
                                        utils.each(o, function(e) {
                                            e.left.width = +e.left.width + t, e.right && (e.right.width = +e.right.width - t);
                                        });
                                    } else utils.each(o, function(e) {
                                        e.left.width -= -t;
                                    });
                                }
                            }(N, s.x - a.x);
                            break;

                          case "v":
                            !function(e, t) {
                                if (Math.abs(t) < 10) return;
                                var i = S(e);
                                if (i) for (var n, o = i.getSameEndPosCells(e, "y"), r = o[0] ? o[0].offsetHeight : 0, a = 0; n = o[a++]; ) F(n, t, r);
                            }(N, s.y - a.y - N.offsetHeight);
                        }
                        return b = "", N = null, j(i), void i.fireEvent("saveScene");
                    }
                    if (v) {
                        var l = S(v), d = l ? l.selectedTds[0] : null;
                        if (d) n = new dom.Range(i.document), domUtils.isEmptyBlock(d) ? n.setStart(d, 0).setCursor(!1, !0) : n.selectNodeContents(d).shrinkBoundary().setCursor(!1, !0); else if (!(n = i.selection.getRange().shrinkBoundary()).collapsed) {
                            o = domUtils.findParentByTagName(n.startContainer, [ "td", "th" ], !0), r = domUtils.findParentByTagName(n.endContainer, [ "td", "th" ], !0);
                            (o && !r || !o && r || o && r && o !== r) && n.setCursor(!1, !0);
                        }
                        v = null, i.removeListener("mouseover", H);
                    } else {
                        var c = domUtils.findParentByTagName(t.target || t.srcElement, "td", !0);
                        if (c || (c = domUtils.findParentByTagName(t.target || t.srcElement, "th", !0)), 
                        c && ("TD" == c.tagName || "TH" == c.tagName)) {
                            if (!0 === i.fireEvent("excludetable", c)) return;
                            (n = new dom.Range(i.document)).setStart(c, 0).setCursor(!1, !0);
                        }
                    }
                    i._selectionChange(250, t);
                }
            }
        }
        function H(e, t) {
            if (!$()) {
                var i = t.target || t.srcElement;
                if (l = domUtils.findParentByTagName(i, "td", !0) || domUtils.findParentByTagName(i, "th", !0), 
                v && l && ("TD" == v.tagName && "TD" == l.tagName || "TH" == v.tagName && "TH" == l.tagName) && domUtils.findParentByTagName(v, "table") == domUtils.findParentByTagName(l, "table")) {
                    var n = S(l);
                    if (v != l) {
                        this.document.body.style.webkitUserSelect = "none", this.selection.getNative()[browser.ie9below ? "empty" : "removeAllRanges"]();
                        var o = n.getCellsRange(v, l);
                        n.setSelected(o);
                    } else this.document.body.style.webkitUserSelect = "", n.clearSelected();
                }
                t.preventDefault ? t.preventDefault() : t.returnValue = !1;
            }
        }
        function F(e, t, i) {
            var n = parseInt(domUtils.getComputedStyle(e, "line-height"), 10), o = i + t;
            t = o < n ? n : o, e.style.height && (e.style.height = ""), 1 == e.rowSpan ? e.setAttribute("height", t) : e.removeAttribute && e.removeAttribute("height");
        }
        function $() {
            return "false" === u.body.contentEditable;
        }
        function q(e, t, n) {
            if (t || (t = domUtils.findParentByTagName(e, "table")), !t) return null;
            domUtils.getNodeIndex(e);
            for (var i = e, o = t.rows, r = 0; i; ) 1 === i.nodeType && (r += i.colSpan || 1), 
            i = i.previousSibling;
            i = null;
            var a = [];
            return utils.each(o, function(e) {
                var t = e.cells, i = 0;
                utils.each(t, function(e) {
                    return (i += e.colSpan || 1) === r ? (a.push({
                        left: e,
                        right: e.nextSibling || null
                    }), !1) : r < i ? (n && a.push({
                        left: e
                    }), !1) : void 0;
                });
            }), a;
        }
        function z(e) {
            var t = 0;
            t = e.offsetWidth - V();
            e.nextSibling || (t -= function(e) {
                if (tab = domUtils.findParentByTagName(e, "table", !1), void 0 === tab.offsetVal) {
                    var t = e.previousSibling;
                    tab.offsetVal = t && e.offsetWidth - t.offsetWidth === T.borderWidth ? T.borderWidth : 0;
                }
                return tab.offsetVal;
            }(e)), t = t < 0 ? 0 : t;
            try {
                e.width = t;
            } catch (e) {}
            return t;
        }
        function V() {
            if (void 0 === T.tabcellSpace) {
                var e = u.document.createElement("table"), t = u.document.createElement("tbody"), i = u.document.createElement("tr"), n = u.document.createElement("td"), o = null;
                n.style.cssText = "border: 0;", n.width = 1, i.appendChild(n), i.appendChild(o = n.cloneNode(!1)), 
                t.appendChild(i), e.appendChild(t), e.style.cssText = "visibility: hidden;", u.body.appendChild(e), 
                T.paddingSpace = n.offsetWidth - 1;
                var r = e.offsetWidth;
                n.style.cssText = "", o.style.cssText = "", T.borderWidth = (e.offsetWidth - r) / 3, 
                T.tabcellSpace = T.paddingSpace + T.borderWidth, u.body.removeChild(e);
            }
            return V = function() {
                return T.tabcellSpace;
            }, T.tabcellSpace;
        }
        function W(e, t) {
            x || (C = e.document.createElement("div"), domUtils.setAttributes(C, {
                id: "ue_tableDragLine",
                unselectable: "on",
                contenteditable: !1,
                onresizestart: "return false",
                ondragstart: "return false",
                onselectstart: "return false",
                style: "background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)"
            }), e.body.appendChild(C));
        }
        function j(e) {
            if (!x) for (var t; t = e.document.getElementById("ue_tableDragLine"); ) domUtils.remove(t);
        }
        function Y(e, t) {
            if (t) {
                var i, n = domUtils.findParentByTagName(t, "table"), o = n.getElementsByTagName("caption"), r = n.offsetWidth, a = n.offsetHeight - (0 < o.length ? o[0].offsetHeight : 0), s = domUtils.getXY(n), l = domUtils.getXY(t);
                switch (e) {
                  case "h":
                    i = "height:" + a + "px;top:" + (s.y + (0 < o.length ? o[0].offsetHeight : 0)) + "px;left:" + (l.x + t.offsetWidth), 
                    C.style.cssText = i + "px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)";
                    break;

                  case "v":
                    i = "width:" + r + "px;left:" + s.x + "px;top:" + (l.y + t.offsetHeight), C.style.cssText = i + "px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)";
                }
            }
        }
        function G(e, t) {
            for (var i, n, o = domUtils.getElementsByTagName(e.body, "table"), r = 0; n = o[r++]; ) {
                var a = domUtils.getElementsByTagName(n, "td");
                a[0] && (t ? (i = a[0].style.borderColor.replace(/\s/g, ""), /(#ffffff)|(rgb\(255,255,255\))/gi.test(i) && domUtils.addClass(n, "noBorderTable")) : domUtils.removeClasses(n, "noBorderTable"));
            }
        }
        function X(e, t) {
            var i, n = domUtils.findParentByTagName(t.target || t.srcElement, [ "td", "th" ], !0);
            if (!n) return null;
            if (i = U(n, w(t)), !n) return null;
            if ("h1" === i && n.previousSibling) {
                var o = domUtils.getXY(n), r = n.offsetWidth;
                Math.abs(o.x + r - t.clientX) > r / 3 && (n = n.previousSibling);
            } else if ("v1" === i && n.parentNode.previousSibling) {
                o = domUtils.getXY(n);
                var a = n.offsetHeight;
                Math.abs(o.y + a - t.clientY) > a / 3 && (n = n.parentNode.previousSibling.firstChild);
            }
            return n && !0 !== e.fireEvent("excludetable", n) ? n : null;
        }
        u.ready(function() {
            var w, U, E, e;
            utils.cssRule("table", ".selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}", u.document), 
            u.addListener("keydown", function(e, t) {
                var i = this, n = t.keyCode || t.which;
                if (8 == n) {
                    var o;
                    (o = k(i)) && o.selectedTds.length && (o.isFullCol() ? i.execCommand("deletecol") : o.isFullRow() ? i.execCommand("deleterow") : i.fireEvent("delcells"), 
                    domUtils.preventDefault(t));
                    var r = domUtils.findParentByTagName(i.selection.getStart(), "caption", !0), a = i.selection.getRange();
                    if (a.collapsed && r && L(r)) {
                        i.fireEvent("saveScene");
                        var s = r.parentNode;
                        domUtils.remove(r), s && a.setStart(s.rows[0].cells[0], 0).setCursor(!1, !0), i.fireEvent("saveScene");
                    }
                }
                if (46 == n && (o = k(i))) {
                    i.fireEvent("saveScene");
                    for (var l = 0; p = o.selectedTds[l++]; ) domUtils.fillNode(i.document, p);
                    i.fireEvent("saveScene"), domUtils.preventDefault(t);
                }
                if (13 == n) {
                    var d = i.selection.getRange();
                    if (r = domUtils.findParentByTagName(d.startContainer, "caption", !0)) {
                        var s = domUtils.findParentByTagName(r, "table");
                        return d.collapsed ? r && d.setStart(s.rows[0].cells[0], 0).setCursor(!1, !0) : (d.deleteContents(), 
                        i.fireEvent("saveScene")), void domUtils.preventDefault(t);
                    }
                    if (d.collapsed) if (s = domUtils.findParentByTagName(d.startContainer, "table")) {
                        var c = s.rows[0].cells[0], u = domUtils.findParentByTagName(i.selection.getStart(), [ "td", "th" ], !0), m = s.previousSibling;
                        if (c === u && (!m || 1 == m.nodeType && "TABLE" == m.tagName) && domUtils.isStartInblock(d)) {
                            var f = domUtils.findParent(i.selection.getStart(), function(e) {
                                return domUtils.isBlockElm(e);
                            }, !0);
                            f && (/t(h|d)/i.test(f.tagName) || f === u.firstChild) && (i.execCommand("insertparagraphbeforetable"), 
                            domUtils.preventDefault(t));
                        }
                    }
                }
                if ((t.ctrlKey || t.metaKey) && "67" == t.keyCode && (w = null, o = k(i))) {
                    var h = o.selectedTds;
                    U = o.isFullCol(), E = o.isFullRow(), w = [ [ o.cloneCell(h[0], null, !0) ] ];
                    var p;
                    for (l = 1; p = h[l]; l++) p.parentNode !== h[l - 1].parentNode ? w.push([ o.cloneCell(p, null, !0) ]) : w[w.length - 1].push(o.cloneCell(p, null, !0));
                }
            }), u.addListener("tablehasdeleted", function() {
                D(this, !1, "", null), o && domUtils.remove(o);
            }), u.addListener("beforepaste", function(e, t) {
                var i = this, n = i.selection.getRange();
                if (domUtils.findParentByTagName(n.startContainer, "caption", !0)) return (o = i.document.createElement("div")).innerHTML = t.html, 
                void (t.html = o[browser.ie9below ? "innerText" : "textContent"]);
                var o, r, a = k(i);
                if (w) {
                    i.fireEvent("saveScene");
                    n = i.selection.getRange();
                    var s, l, d = domUtils.findParentByTagName(n.startContainer, [ "td", "th" ], !0);
                    if (d) {
                        var c = S(d);
                        if (E) {
                            var u = c.getCellInfo(d).rowIndex;
                            "TH" == d.tagName && u++;
                            for (var m = 0; v = w[m++]; ) {
                                for (var f = c.insertRow(u++, "td"), h = 0; C = v[h]; h++) {
                                    var p = f.cells[h];
                                    p || (p = f.insertCell(h)), p.innerHTML = C.innerHTML, C.getAttribute("width") && p.setAttribute("width", C.getAttribute("width")), 
                                    C.getAttribute("vAlign") && p.setAttribute("vAlign", C.getAttribute("vAlign")), 
                                    C.getAttribute("align") && p.setAttribute("align", C.getAttribute("align")), C.style.cssText && (p.style.cssText = C.style.cssText);
                                }
                                for (h = 0; (C = f.cells[h]) && v[h]; h++) C.innerHTML = v[h].innerHTML, v[h].getAttribute("width") && C.setAttribute("width", v[h].getAttribute("width")), 
                                v[h].getAttribute("vAlign") && C.setAttribute("vAlign", v[h].getAttribute("vAlign")), 
                                v[h].getAttribute("align") && C.setAttribute("align", v[h].getAttribute("align")), 
                                v[h].style.cssText && (C.style.cssText = v[h].style.cssText);
                            }
                        } else {
                            if (U) {
                                y = c.getCellInfo(d);
                                for (var g = 0, v = (h = 0, w[0]); C = v[h++]; ) g += C.colSpan || 1;
                                for (i.__hasEnterExecCommand = !0, m = 0; m < g; m++) i.execCommand("insertcol");
                                i.__hasEnterExecCommand = !1, "TH" == (d = c.table.rows[0].cells[y.cellIndex]).tagName && (d = c.table.rows[1].cells[y.cellIndex]);
                            }
                            for (m = 0; v = w[m++]; ) {
                                s = d;
                                for (h = 0; C = v[h++]; ) if (d) d.innerHTML = C.innerHTML, C.getAttribute("width") && d.setAttribute("width", C.getAttribute("width")), 
                                C.getAttribute("vAlign") && d.setAttribute("vAlign", C.getAttribute("vAlign")), 
                                C.getAttribute("align") && d.setAttribute("align", C.getAttribute("align")), C.style.cssText && (d.style.cssText = C.style.cssText), 
                                d = (l = d).nextSibling; else {
                                    var b = C.cloneNode(!0);
                                    domUtils.removeAttributes(b, [ "class", "rowSpan", "colSpan" ]), l.parentNode.appendChild(b);
                                }
                                if (d = c.getNextCell(s, !0, !0), !w[m]) break;
                                if (!d) {
                                    var y = c.getCellInfo(s);
                                    c.table.insertRow(c.table.rows.length), c.update(), d = c.getVSideCell(s, !0);
                                }
                            }
                        }
                        c.update();
                    } else {
                        a = i.document.createElement("table");
                        for (m = 0; v = w[m++]; ) {
                            var C;
                            for (f = a.insertRow(a.rows.length), h = 0; C = v[h++]; ) b = T.cloneCell(C, null, !0), 
                            domUtils.removeAttributes(b, [ "class" ]), f.appendChild(b);
                            2 == h && 1 < b.rowSpan && (b.rowSpan = 1);
                        }
                        var N = B(i), x = i.body.offsetWidth - 2 * parseInt(domUtils.getComputedStyle(i.body, "margin-left"), 10) - 2 * N.tableBorder - (i.options.offsetWidth || 0);
                        i.execCommand("insertHTML", "<table  " + (U && E ? 'width="' + x + '"' : "") + ">" + a.innerHTML.replace(/>\s*</g, "><").replace(/\bth\b/gi, "td") + "</table>");
                    }
                    return i.fireEvent("contentchange"), i.fireEvent("saveScene"), !(t.html = "");
                }
                (o = i.document.createElement("div")).innerHTML = t.html, r = o.getElementsByTagName("table"), 
                domUtils.findParentByTagName(i.selection.getStart(), "table") ? (utils.each(r, function(e) {
                    domUtils.remove(e);
                }), domUtils.findParentByTagName(i.selection.getStart(), "caption", !0) && (o.innerHTML = o[browser.ie ? "innerText" : "textContent"])) : utils.each(r, function(e) {
                    I(e, !0), domUtils.removeAttributes(e, [ "style", "border" ]), utils.each(domUtils.getElementsByTagName(e, "td"), function(e) {
                        L(e) && domUtils.fillNode(i.document, e), I(e, !0);
                    });
                }), t.html = o.innerHTML;
            }), u.addListener("afterpaste", function() {
                utils.each(domUtils.getElementsByTagName(u.body, "table"), function(e) {
                    if (e.offsetWidth > u.body.offsetWidth) {
                        var t = B(u, e);
                        e.style.width = u.body.offsetWidth - 2 * parseInt(domUtils.getComputedStyle(u.body, "margin-left"), 10) - 2 * t.tableBorder - (u.options.offsetWidth || 0) + "px";
                    }
                });
            }), u.addListener("blur", function() {
                w = null;
            }), u.addListener("keydown", function() {
                clearTimeout(e), e = setTimeout(function() {
                    var e = u.selection.getRange(), t = domUtils.findParentByTagName(e.startContainer, [ "th", "td" ], !0);
                    if (t) {
                        var i = t.parentNode.parentNode.parentNode;
                        i.offsetWidth > i.getAttribute("width") && (t.style.wordBreak = "break-all");
                    }
                }, 100);
            }), u.addListener("selectionchange", function() {
                D(u, !1, "", null);
            }), u.addListener("contentchange", function() {
                var d = this;
                if (j(d), !k(d)) {
                    var e = d.selection.getRange().startContainer;
                    e = domUtils.findParentByTagName(e, [ "td", "th" ], !0), utils.each(domUtils.getElementsByTagName(d.document, "table"), function(e) {
                        !0 !== d.fireEvent("excludetable", e) && (e.ueTable = new T(e), e.onmouseover = function() {
                            d.fireEvent("tablemouseover", e);
                        }, e.onmousemove = function() {
                            d.fireEvent("tablemousemove", e), d.options.tableDragable && c(!0, this, d), utils.defer(function() {
                                d.fireEvent("contentchange", 50);
                            }, !0);
                        }, e.onmouseout = function() {
                            d.fireEvent("tablemouseout", e), D(d, !1, "", null), j(d);
                        }, e.onclick = function(e) {
                            var t = _((e = d.window.event || e).target || e.srcElement);
                            if (t) {
                                var i, n = S(t), o = n.table, r = n.getCellInfo(t), a = d.selection.getRange();
                                if (R(o, t, e, !0)) {
                                    var s = n.getCell(n.indexTable[n.rowsNum - 1][r.colIndex].rowIndex, n.indexTable[n.rowsNum - 1][r.colIndex].cellIndex);
                                    e.shiftKey && n.selectedTds.length ? n.selectedTds[0] !== s ? (i = n.getCellsRange(n.selectedTds[0], s), 
                                    n.setSelected(i)) : a && a.selectNodeContents(s).select() : t !== s ? (i = n.getCellsRange(t, s), 
                                    n.setSelected(i)) : a && a.selectNodeContents(s).select();
                                } else if (R(o, t, e)) {
                                    var l = n.getCell(n.indexTable[r.rowIndex][n.colsNum - 1].rowIndex, n.indexTable[r.rowIndex][n.colsNum - 1].cellIndex);
                                    e.shiftKey && n.selectedTds.length ? n.selectedTds[0] !== l ? (i = n.getCellsRange(n.selectedTds[0], l), 
                                    n.setSelected(i)) : a && a.selectNodeContents(l).select() : t !== l ? (i = n.getCellsRange(t, l), 
                                    n.setSelected(i)) : a && a.selectNodeContents(l).select();
                                }
                            }
                        });
                    }), G(d, !0);
                }
            }), domUtils.on(u.document, "mousemove", t), domUtils.on(u.document, "mouseout", function(e) {
                "TABLE" == (e.target || e.srcElement).tagName && D(u, !1, "", null);
            }), u.addListener("interlacetable", function(e, t, i) {
                if (t) for (var n, o, r, a = t.rows, s = a.length, l = 0; l < s; l++) a[l].className = (n = i || this.options.classList, 
                r = !0, n[o = l] ? n[o] : r ? n[o % n.length] : "");
            }), u.addListener("uninterlacetable", function(e, t) {
                if (t) for (var i = t.rows, n = this.options.classList, o = i.length, r = 0; r < o; r++) domUtils.removeClasses(i[r], n);
            }), u.addListener("mousedown", O), u.addListener("mouseup", M), domUtils.on(u.body, "dragstart", function(e) {
                M.call(u, "dragstart", e);
            }), u.addOutputRule(function(e) {
                utils.each(e.getNodesByTagName("div"), function(e) {
                    "ue_tableDragLine" == e.getAttr("id") && e.parentNode.removeChild(e);
                });
            });
            var a = 0;
            u.addListener("mousedown", function() {
                a = 0;
            }), u.addListener("tabkeydown", function() {
                var e = this.selection.getRange(), t = e.getCommonAncestor(!0, !0), i = domUtils.findParentByTagName(t, "table");
                if (i) {
                    if (domUtils.findParentByTagName(t, "caption", !0)) {
                        (n = domUtils.getElementsByTagName(i, "th td")) && n.length && e.setStart(n[0], 0).setCursor(!1, !0);
                    } else {
                        var n = domUtils.findParentByTagName(t, [ "td", "th" ], !0), o = S(n);
                        a = 1 < n.rowSpan ? a : o.getCellInfo(n).rowIndex;
                        var r = o.getTabNextCell(n, a);
                        r ? L(r) ? e.setStart(r, 0).setCursor(!1, !0) : e.selectNodeContents(r).select() : (u.fireEvent("saveScene"), 
                        u.__hasEnterExecCommand = !0, this.execCommand("insertrownext"), u.__hasEnterExecCommand = !1, 
                        (e = this.selection.getRange()).setStart(i.rows[i.rows.length - 1].cells[0], 0).setCursor(), 
                        u.fireEvent("saveScene"));
                    }
                    return !0;
                }
            }), browser.ie && u.addListener("selectionchange", function() {
                D(this, !1, "", null);
            }), u.addListener("keydown", function(e, t) {
                var i = t.keyCode || t.which;
                if (8 != i && 46 != i) {
                    var n = !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey);
                    n && s(domUtils.getElementsByTagName(this.body, "td"));
                    var o = k(this);
                    o && n && o.clearSelected();
                }
            }), u.addListener("beforegetcontent", function() {
                G(this, !1), browser.ie && utils.each(this.document.getElementsByTagName("caption"), function(e) {
                    domUtils.isEmptyNode(e) && (e.innerHTML = "&nbsp;");
                });
            }), u.addListener("aftergetcontent", function() {
                G(this, !0);
            }), u.addListener("getAllHtml", function() {
                s(u.document.getElementsByTagName("td"));
            }), u.addListener("fullscreenchanged", function(e, t) {
                if (!t) {
                    var d = this.body.offsetWidth / document.body.offsetWidth, i = domUtils.getElementsByTagName(this.body, "table");
                    utils.each(i, function(e) {
                        if (e.offsetWidth < u.body.offsetWidth) return !1;
                        var t, i, n, o, r = domUtils.getElementsByTagName(e, "td"), a = [];
                        utils.each(r, function(e) {
                            a.push(e.offsetWidth);
                        });
                        for (var s, l = 0; s = r[l]; l++) s.setAttribute("width", Math.floor(a[l] * d));
                        e.setAttribute("width", Math.floor((i = !0, n = B(t = u), (o = t.body).offsetWidth - (i ? 2 * parseInt(domUtils.getComputedStyle(o, "margin-left"), 10) : 0) - 2 * n.tableBorder - (t.options.offsetWidth || 0))));
                    });
                }
            });
            var h = u.execCommand;
            u.execCommand = function(e, t) {
                var i = this;
                e = e.toLowerCase();
                var n, o, r = k(i), a = new dom.Range(i.document), s = i.commands[e] || UE.commands[e];
                if (s) {
                    if (!r || A[e] || s.notNeedUndo || i.__hasEnterExecCommand) o = h.apply(i, arguments); else {
                        i.__hasEnterExecCommand = !0, i.fireEvent("beforeexeccommand", e), n = r.selectedTds;
                        for (var l, d, c, u = -2, m = -2, f = 0; c = n[f]; f++) L(c) ? a.setStart(c, 0).setCursor(!1, !0) : a.selectNode(c).select(!0), 
                        d = i.queryCommandState(e), l = i.queryCommandValue(e), -1 != d && (u === d && m === l || (i._ignoreContentChange = !0, 
                        o = h.apply(i, arguments), i._ignoreContentChange = !1), u = i.queryCommandState(e), 
                        m = i.queryCommandValue(e), domUtils.isEmptyBlock(c) && domUtils.fillNode(i.document, c));
                        a.setStart(n[0], 0).shrinkBoundary(!0).setCursor(!1, !0), i.fireEvent("contentchange"), 
                        i.fireEvent("afterexeccommand", e), i.__hasEnterExecCommand = !1, i._selectionChange();
                    }
                    return o;
                }
            };
        });
    }, UE.UETable.prototype.sortTable = function(i, n) {
        var e = this.table, t = e.rows, o = [], r = "TH" === t[0].cells[0].tagName, a = 0;
        if (this.selectedTds.length) {
            for (var s = this.cellsRange, l = s.endRowIndex + 1, d = s.beginRowIndex; d < l; d++) o[d] = t[d];
            o.splice(0, s.beginRowIndex), a = s.endRowIndex + 1 === this.rowsNum ? 0 : s.endRowIndex + 1;
        } else for (d = 0, l = t.length; d < l; d++) o[d] = t[d];
        var c = {
            reversecurrent: function(e, t) {
                return 1;
            },
            orderbyasc: function(e, t) {
                var i = e.innerText || e.textContent, n = t.innerText || t.textContent;
                return i.localeCompare(n);
            },
            reversebyasc: function(e, t) {
                var i = e.innerHTML;
                return t.innerHTML.localeCompare(i);
            },
            orderbynum: function(e, t) {
                var i = e[browser.ie ? "innerText" : "textContent"].match(/\d+/), n = t[browser.ie ? "innerText" : "textContent"].match(/\d+/);
                return i && (i = +i[0]), n && (n = +n[0]), (i || 0) - (n || 0);
            },
            reversebynum: function(e, t) {
                var i = e[browser.ie ? "innerText" : "textContent"].match(/\d+/), n = t[browser.ie ? "innerText" : "textContent"].match(/\d+/);
                return i && (i = +i[0]), n && (n = +n[0]), (n || 0) - (i || 0);
            }
        };
        e.setAttribute("data-sort-type", n && "string" == typeof n && c[n] ? n : ""), r && o.splice(0, 1), 
        o = utils.sort(o, function(e, t) {
            return n && "function" == typeof n ? n.call(this, e.cells[i], t.cells[i]) : n && "number" == typeof n ? 1 : n && "string" == typeof n && c[n] ? c[n].call(this, e.cells[i], t.cells[i]) : c.orderbyasc.call(this, e.cells[i], t.cells[i]);
        });
        var u = e.ownerDocument.createDocumentFragment(), m = 0;
        for (l = o.length; m < l; m++) u.appendChild(o[m]);
        var f = e.getElementsByTagName("tbody")[0];
        a ? f.insertBefore(u, t[a - s.endRowIndex + s.beginRowIndex - 1]) : f.appendChild(u);
    }, UE.plugins.tablesort = function() {
        var e = this, d = UE.UETable, c = function(e) {
            return d.getTableItemsByRange(e);
        };
        e.ready(function() {
            utils.cssRule("tablesort", "table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(" + e.options.themePath + e.options.theme + "/images/sortable.png);}", e.document), 
            e.addListener("afterexeccommand", function(e, t) {
                "mergeright" != t && "mergedown" != t && "mergecells" != t || this.execCommand("disablesort");
            });
        }), UE.commands.sorttable = {
            queryCommandState: function() {
                var e = c(this);
                if (!e.cell) return -1;
                for (var t, i = e.table.getElementsByTagName("td"), n = 0; t = i[n++]; ) if (1 != t.rowSpan || 1 != t.colSpan) return -1;
                return 0;
            },
            execCommand: function(e, t) {
                var i, n = this.selection.getRange(), o = n.createBookmark(!0), r = c(this), a = r.cell, s = (i = r.table, 
                d.getUETable(i)), l = s.getCellInfo(a);
                s.sortTable(l.cellIndex, t), n.moveToBookmark(o);
                try {
                    n.select();
                } catch (e) {}
            }
        }, UE.commands.enablesort = UE.commands.disablesort = {
            queryCommandState: function(e) {
                var t = c(this).table;
                if (t && "enablesort" == e) for (var i = domUtils.getElementsByTagName(t, "th td"), n = 0; n < i.length; n++) if (1 < i[n].getAttribute("colspan") || 1 < i[n].getAttribute("rowspan")) return -1;
                return t ? "enablesort" == e ^ "sortEnabled" != t.getAttribute("data-sort") ? -1 : 0 : -1;
            },
            execCommand: function(e) {
                var t = c(this).table;
                t.setAttribute("data-sort", "enablesort" == e ? "sortEnabled" : "sortDisabled"), 
                "enablesort" == e ? domUtils.addClass(t, "sortEnabled") : domUtils.removeClasses(t, "sortEnabled");
            }
        };
    }, UE.plugins.contextmenu = function() {
        var l = this;
        if (l.setOpt("enableContextMenu", l.getOpt("enableContextMenu") || !0), !1 !== l.getOpt("enableContextMenu")) {
            var d, c = l.getLang("contextMenu"), u = l.options.contextMenu || [ {
                label: c.selectall,
                cmdName: "selectall"
            }, {
                label: c.cleardoc,
                cmdName: "cleardoc",
                exec: function() {
                    confirm(c.confirmclear) && this.execCommand("cleardoc");
                }
            }, "-", {
                label: c.unlink,
                cmdName: "unlink"
            }, "-", {
                group: c.paragraph,
                icon: "justifyjustify",
                subMenu: [ {
                    label: c.justifyleft,
                    cmdName: "justify",
                    value: "left"
                }, {
                    label: c.justifyright,
                    cmdName: "justify",
                    value: "right"
                }, {
                    label: c.justifycenter,
                    cmdName: "justify",
                    value: "center"
                }, {
                    label: c.justifyjustify,
                    cmdName: "justify",
                    value: "justify"
                } ]
            }, "-", {
                group: c.table,
                icon: "table",
                subMenu: [ {
                    label: c.inserttable,
                    cmdName: "inserttable"
                }, {
                    label: c.deletetable,
                    cmdName: "deletetable"
                }, "-", {
                    label: c.deleterow,
                    cmdName: "deleterow"
                }, {
                    label: c.deletecol,
                    cmdName: "deletecol"
                }, {
                    label: c.insertcol,
                    cmdName: "insertcol"
                }, {
                    label: c.insertcolnext,
                    cmdName: "insertcolnext"
                }, {
                    label: c.insertrow,
                    cmdName: "insertrow"
                }, {
                    label: c.insertrownext,
                    cmdName: "insertrownext"
                }, "-", {
                    label: c.insertcaption,
                    cmdName: "insertcaption"
                }, {
                    label: c.deletecaption,
                    cmdName: "deletecaption"
                }, {
                    label: c.inserttitle,
                    cmdName: "inserttitle"
                }, {
                    label: c.deletetitle,
                    cmdName: "deletetitle"
                }, {
                    label: c.inserttitlecol,
                    cmdName: "inserttitlecol"
                }, {
                    label: c.deletetitlecol,
                    cmdName: "deletetitlecol"
                }, "-", {
                    label: c.mergecells,
                    cmdName: "mergecells"
                }, {
                    label: c.mergeright,
                    cmdName: "mergeright"
                }, {
                    label: c.mergedown,
                    cmdName: "mergedown"
                }, "-", {
                    label: c.splittorows,
                    cmdName: "splittorows"
                }, {
                    label: c.splittocols,
                    cmdName: "splittocols"
                }, {
                    label: c.splittocells,
                    cmdName: "splittocells"
                }, "-", {
                    label: c.averageDiseRow,
                    cmdName: "averagedistributerow"
                }, {
                    label: c.averageDisCol,
                    cmdName: "averagedistributecol"
                }, "-", {
                    label: c.edittd,
                    cmdName: "edittd",
                    exec: function() {
                        UE.ui.edittd && new UE.ui.edittd(this), this.getDialog("edittd").open();
                    }
                }, {
                    label: c.edittable,
                    cmdName: "edittable",
                    exec: function() {
                        UE.ui.edittable && new UE.ui.edittable(this), this.getDialog("edittable").open();
                    }
                }, {
                    label: c.setbordervisible,
                    cmdName: "setbordervisible"
                } ]
            }, {
                group: c.tablesort,
                icon: "tablesort",
                subMenu: [ {
                    label: c.enablesort,
                    cmdName: "enablesort"
                }, {
                    label: c.disablesort,
                    cmdName: "disablesort"
                }, "-", {
                    label: c.reversecurrent,
                    cmdName: "sorttable",
                    value: "reversecurrent"
                }, {
                    label: c.orderbyasc,
                    cmdName: "sorttable",
                    value: "orderbyasc"
                }, {
                    label: c.reversebyasc,
                    cmdName: "sorttable",
                    value: "reversebyasc"
                }, {
                    label: c.orderbynum,
                    cmdName: "sorttable",
                    value: "orderbynum"
                }, {
                    label: c.reversebynum,
                    cmdName: "sorttable",
                    value: "reversebynum"
                } ]
            }, {
                group: c.borderbk,
                icon: "borderBack",
                subMenu: [ {
                    label: c.setcolor,
                    cmdName: "interlacetable",
                    exec: function() {
                        this.execCommand("interlacetable");
                    }
                }, {
                    label: c.unsetcolor,
                    cmdName: "uninterlacetable",
                    exec: function() {
                        this.execCommand("uninterlacetable");
                    }
                }, {
                    label: c.setbackground,
                    cmdName: "settablebackground",
                    exec: function() {
                        this.execCommand("settablebackground", {
                            repeat: !0,
                            colorList: [ "#bbb", "#ccc" ]
                        });
                    }
                }, {
                    label: c.unsetbackground,
                    cmdName: "cleartablebackground",
                    exec: function() {
                        this.execCommand("cleartablebackground");
                    }
                }, {
                    label: c.redandblue,
                    cmdName: "settablebackground",
                    exec: function() {
                        this.execCommand("settablebackground", {
                            repeat: !0,
                            colorList: [ "red", "blue" ]
                        });
                    }
                }, {
                    label: c.threecolorgradient,
                    cmdName: "settablebackground",
                    exec: function() {
                        this.execCommand("settablebackground", {
                            repeat: !0,
                            colorList: [ "#aaa", "#bbb", "#ccc" ]
                        });
                    }
                } ]
            }, {
                group: c.aligntd,
                icon: "aligntd",
                subMenu: [ {
                    cmdName: "cellalignment",
                    value: {
                        align: "left",
                        vAlign: "top"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "center",
                        vAlign: "top"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "right",
                        vAlign: "top"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "left",
                        vAlign: "middle"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "center",
                        vAlign: "middle"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "right",
                        vAlign: "middle"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "left",
                        vAlign: "bottom"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "center",
                        vAlign: "bottom"
                    }
                }, {
                    cmdName: "cellalignment",
                    value: {
                        align: "right",
                        vAlign: "bottom"
                    }
                } ]
            }, {
                group: c.aligntable,
                icon: "aligntable",
                subMenu: [ {
                    cmdName: "tablealignment",
                    className: "left",
                    label: c.tableleft,
                    value: "left"
                }, {
                    cmdName: "tablealignment",
                    className: "center",
                    label: c.tablecenter,
                    value: "center"
                }, {
                    cmdName: "tablealignment",
                    className: "right",
                    label: c.tableright,
                    value: "right"
                } ]
            }, "-", {
                label: c.insertparagraphbefore,
                cmdName: "insertparagraph",
                value: !0
            }, {
                label: c.insertparagraphafter,
                cmdName: "insertparagraph"
            }, {
                label: c.copy,
                cmdName: "copy"
            }, {
                label: c.paste,
                cmdName: "paste"
            } ];
            if (u.length) {
                var m = UE.ui.uiUtils;
                l.addListener("contextmenu", function(e, t) {
                    var i = m.getViewportOffsetByEvent(t);
                    l.fireEvent("beforeselectionchange"), d && d.destroy();
                    for (var n, o = 0, r = []; n = u[o]; o++) {
                        var a;
                        !function(e) {
                            if ("-" == e) (a = r[r.length - 1]) && "-" !== a && r.push("-"); else if (e.hasOwnProperty("group")) {
                                for (var t, i = 0, n = []; t = e.subMenu[i]; i++) !function(e) {
                                    "-" == e ? (a = n[n.length - 1]) && "-" !== a ? n.push("-") : n.splice(n.length - 1) : (l.commands[e.cmdName] || UE.commands[e.cmdName] || e.query) && -1 < (e.query ? e.query() : l.queryCommandState(e.cmdName)) && n.push({
                                        label: e.label || l.getLang("contextMenu." + e.cmdName + (e.value || "")) || "",
                                        className: "edui-for-" + e.cmdName + (e.className ? " edui-for-" + e.cmdName + "-" + e.className : ""),
                                        onclick: e.exec ? function() {
                                            e.exec.call(l);
                                        } : function() {
                                            l.execCommand(e.cmdName, e.value);
                                        }
                                    });
                                }(t);
                                if (n.length) {
                                    r.push({
                                        label: function() {
                                            switch (e.icon) {
                                              case "table":
                                                return l.getLang("contextMenu.table");

                                              case "justifyjustify":
                                                return l.getLang("contextMenu.paragraph");

                                              case "aligntd":
                                                return l.getLang("contextMenu.aligntd");

                                              case "aligntable":
                                                return l.getLang("contextMenu.aligntable");

                                              case "tablesort":
                                                return c.tablesort;

                                              case "borderBack":
                                                return c.borderbk;

                                              default:
                                                return "";
                                            }
                                        }(),
                                        className: "edui-for-" + e.icon,
                                        subMenu: {
                                            items: n,
                                            editor: l
                                        }
                                    });
                                }
                            } else (l.commands[e.cmdName] || UE.commands[e.cmdName] || e.query) && -1 < (e.query ? e.query.call(l) : l.queryCommandState(e.cmdName)) && r.push({
                                label: e.label || l.getLang("contextMenu." + e.cmdName),
                                className: "edui-for-" + (e.icon ? e.icon : e.cmdName + (e.value || "")),
                                onclick: e.exec ? function() {
                                    e.exec.call(l);
                                } : function() {
                                    l.execCommand(e.cmdName, e.value);
                                }
                            });
                        }(n);
                    }
                    if ("-" == r[r.length - 1] && r.pop(), (d = new UE.ui.Menu({
                        items: r,
                        className: "edui-contextmenu",
                        editor: l
                    })).render(), d.showAt(i), l.fireEvent("aftershowcontextmenu", d), domUtils.preventDefault(t), 
                    browser.ie) {
                        var s;
                        try {
                            s = l.selection.getNative().createRange();
                        } catch (e) {
                            return;
                        }
                        if (s.item) new dom.Range(l.document).selectNode(s.item(0)).select(!0, !0);
                    }
                }), l.addListener("aftershowcontextmenu", function(e, t) {
                    if (l.zeroclipboard) {
                        var i = t.items;
                        for (var n in i) "edui-for-copy" == i[n].className && l.zeroclipboard.clip(i[n].getDom());
                    }
                });
            }
        }
    }, UE.plugins.shortcutmenu = function() {
        var r, a = this.options.shortcutMenu || [];
        a.length && (this.addListener("contextmenu mouseup", function(e, t) {
            var i = this, n = {
                type: e,
                target: t.target || t.srcElement,
                screenX: t.screenX,
                screenY: t.screenY,
                clientX: t.clientX,
                clientY: t.clientY
            };
            if (setTimeout(function() {
                !1 !== i.selection.getRange().collapsed && "contextmenu" != e || (r || ((r = new baidu.editor.ui.ShortCutMenu({
                    editor: i,
                    items: a,
                    theme: i.options.theme,
                    className: "edui-shortcutmenu"
                })).render(), i.fireEvent("afterrendershortcutmenu", r)), r.show(n, !!UE.plugins.contextmenu));
            }), "contextmenu" == e && (domUtils.preventDefault(t), browser.ie9below)) {
                var o;
                try {
                    o = i.selection.getNative().createRange();
                } catch (t) {
                    return;
                }
                if (o.item) new dom.Range(i.document).selectNode(o.item(0)).select(!0, !0);
            }
        }), this.addListener("keydown", function(e) {
            "keydown" == e && r && !r.isHidden && r.hide();
        }));
    }, UE.plugins.basestyle = function() {
        var e = {
            bold: [ "strong", "b" ],
            italic: [ "em", "i" ],
            subscript: [ "sub" ],
            superscript: [ "sup" ]
        }, a = function(e, t) {
            return domUtils.filterNodeList(e.selection.getStartElementPath(), t);
        }, s = this;
        for (var t in s.addshortcutkey({
            Bold: "ctrl+66",
            Italic: "ctrl+73",
            Underline: "ctrl+85"
        }), s.addInputRule(function(e) {
            utils.each(e.getNodesByTagName("b i"), function(e) {
                switch (e.tagName) {
                  case "b":
                    e.tagName = "strong";
                    break;

                  case "i":
                    e.tagName = "em";
                }
            });
        }), e) !function(e, r) {
            s.commands[e] = {
                execCommand: function(e) {
                    var t = s.selection.getRange(), i = a(this, r);
                    if (t.collapsed) {
                        if (i) {
                            var n = s.document.createTextNode("");
                            t.insertNode(n).removeInlineStyle(r), t.setStartBefore(n), domUtils.remove(n);
                        } else {
                            var o = t.document.createElement(r[0]);
                            "superscript" != e && "subscript" != e || (n = s.document.createTextNode(""), t.insertNode(n).removeInlineStyle([ "sub", "sup" ]).setStartBefore(n).collapse(!0)), 
                            t.insertNode(o).setStart(o, 0);
                        }
                        t.collapse(!0);
                    } else "superscript" != e && "subscript" != e || i && i.tagName.toLowerCase() == e || t.removeInlineStyle([ "sub", "sup" ]), 
                    i ? t.removeInlineStyle(r) : t.applyInlineStyle(r[0]);
                    t.select();
                },
                queryCommandState: function() {
                    return a(this, r) ? 1 : 0;
                }
            };
        }(t, e[t]);
    }, UE.plugins.elementpath = function() {
        var r, a, o = this;
        o.setOpt("elementPathEnabled", !0), o.options.elementPathEnabled && (o.commands.elementpath = {
            execCommand: function(e, t) {
                var i = a[t], n = o.selection.getRange();
                r = 1 * t, n.selectNode(i).select();
            },
            queryCommandValue: function() {
                var e = [].concat(this.selection.getStartElementPath()).reverse(), t = [];
                a = e;
                for (var i, n = 0; i = e[n]; n++) if (3 != i.nodeType) {
                    var o = i.tagName.toLowerCase();
                    if ("img" == o && i.getAttribute("anchorname") && (o = "anchor"), t[n] = o, r == n) {
                        r = -1;
                        break;
                    }
                }
                return t;
            }
        });
    }, UE.plugins.formatmatch = function() {
        var l, d = this, c = [], u = 0;
        function m(e, t) {
            if (browser.webkit) var i = "IMG" == t.target.tagName ? t.target : null;
            d.undoManger && d.undoManger.save();
            var n, o = d.selection.getRange(), r = i || o.getClosedNode();
            if (l && r && "IMG" == r.tagName) r.style.cssText += ";float:" + (l.style.cssFloat || l.style.styleFloat || "none") + ";display:" + (l.style.display || "inline"), 
            l = null; else if (!l) {
                if (o.collapsed) {
                    var a = d.document.createTextNode("match");
                    o.insertNode(a).select();
                }
                d.__hasEnterExecCommand = !0;
                var s = d.options.removeFormatAttributes;
                d.options.removeFormatAttributes = "", d.execCommand("removeformat"), d.options.removeFormatAttributes = s, 
                d.__hasEnterExecCommand = !1, o = d.selection.getRange(), c.length && (n = o, a && n.selectNode(a), 
                n.applyInlineStyle(c[c.length - 1].tagName, null, c)), a && o.setStartBefore(a).collapse(!0), 
                o.select(), a && domUtils.remove(a);
            }
            d.undoManger && d.undoManger.save(), d.removeListener("mouseup", m), u = 0;
        }
        d.addListener("reset", function() {
            c = [], u = 0;
        }), d.commands.formatmatch = {
            execCommand: function(e) {
                if (u) return u = 0, c = [], void d.removeListener("mouseup", m);
                var t = d.selection.getRange();
                if (!(l = t.getClosedNode()) || "IMG" != l.tagName) {
                    t.collapse(!0).shrinkBoundary();
                    var i = t.startContainer;
                    c = domUtils.findParents(i, !0, function(e) {
                        return !domUtils.isBlockElm(e) && 1 == e.nodeType;
                    });
                    for (var n, o = 0; n = c[o]; o++) if ("A" == n.tagName) {
                        c.splice(o, 1);
                        break;
                    }
                }
                d.addListener("mouseup", m), u = 1;
            },
            queryCommandState: function() {
                return u;
            },
            notNeedUndo: 1
        };
    }, UE.plugin.register("searchreplace", function() {
        var r = this, u = {
            table: 1,
            tbody: 1,
            tr: 1,
            ol: 1,
            ul: 1
        }, m = null;
        function f(e) {
            return (3 == e.nodeType ? e.nodeValue : e[browser.ie ? "innerText" : "textContent"]).replace(domUtils.fillChar, "");
        }
        function h(e, t, i) {
            var n, o = t.searchStr, r = new RegExp(o, "g" + (t.casesensitive ? "" : "i"));
            if (-1 == t.dir) {
                if (e = (e = e.substr(0, i)).split("").reverse().join(""), o = o.split("").reverse().join(""), 
                n = r.exec(e)) return i - n.index - o.length;
            } else if (e = e.substr(i), n = r.exec(e)) return n.index + i;
            return -1;
        }
        function p(e, t, i) {
            for (var n, o = 0, r = e.firstChild, a = 0; r; ) {
                if (3 == r.nodeType) {
                    if (t <= (o += a = f(r).replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length)) return {
                        node: r,
                        index: a - (o - t)
                    };
                } else if (!dtd.$empty[r.tagName] && t <= (o += a = f(r).replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, "").length) && (n = p(r, a - (o - t), i))) return n;
                r = domUtils.getNextDomNode(r);
            }
        }
        function a(e, t) {
            var i, n = m || e.selection.getRange(), o = t.searchStr, r = e.document.createElement("span");
            if (r.innerHTML = "$$ueditor_searchreplace_key$$", n.shrinkBoundary(!0), !n.collapsed) {
                n.select();
                var a = e.selection.getText();
                if (new RegExp("^" + t.searchStr + "$", t.casesensitive ? "" : "i").test(a)) {
                    if (null != t.replaceStr) return g(n, t.replaceStr), n.select(), !0;
                    n.collapse(-1 == t.dir);
                }
            }
            n.insertNode(r), n.enlargeToBlockElm(!0);
            var s = f(i = n.startContainer).indexOf("$$ueditor_searchreplace_key$$");
            n.setStartBefore(r), domUtils.remove(r);
            var l = function(e, t, i) {
                var n, o = i.all || 1 == i.dir ? "getNextDomNode" : "getPreDomNode";
                for (domUtils.isBody(e) && (e = e.firstChild); e; ) {
                    if (-1 != (n = h(f(e), i, t))) return {
                        node: e,
                        index: n
                    };
                    for (e = domUtils[o](e); e && u[e.nodeName.toLowerCase()]; ) e = domUtils[o](e, !0);
                    e && (t = -1 == i.dir ? f(e).length : 0);
                }
            }(i, s, t);
            if (l) {
                var d = p(l.node, l.index, o), c = p(l.node, l.index + o.length, o);
                return n.setStart(d.node, d.index).setEnd(c.node, c.index), void 0 !== t.replaceStr && g(n, t.replaceStr), 
                n.select(), !0;
            }
            n.setCursor();
        }
        function g(e, t) {
            t = r.document.createTextNode(t), e.deleteContents().insertNode(t);
        }
        return {
            commands: {
                searchreplace: {
                    execCommand: function(e, t) {
                        utils.extend(t, {
                            all: !1,
                            casesensitive: !1,
                            dir: 1
                        }, !0);
                        var i = 0;
                        if (t.all) {
                            m = null;
                            var n = r.selection.getRange(), o = r.body.firstChild;
                            for (o && 1 == o.nodeType ? (n.setStart(o, 0), n.shrinkBoundary(!0)) : 3 == o.nodeType && n.setStartBefore(o), 
                            n.collapse(!0).select(!0), void 0 !== t.replaceStr && r.fireEvent("saveScene"); a(this, t); ) i++, 
                            (m = r.selection.getRange()).collapse(-1 == t.dir);
                            i && r.fireEvent("saveScene");
                        } else void 0 !== t.replaceStr && r.fireEvent("saveScene"), a(this, t) && (i++, 
                        (m = r.selection.getRange()).collapse(-1 == t.dir)), i && r.fireEvent("saveScene");
                        return i;
                    },
                    notNeedUndo: 1
                }
            },
            bindEvents: {
                clearlastSearchResult: function() {
                    m = null;
                }
            }
        };
    }), UE.plugins.customstyle = function() {
        var a = this;
        a.setOpt({
            customstyle: [ {
                tag: "h1",
                name: "tc",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;"
            }, {
                tag: "h1",
                name: "tl",
                style: "font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;"
            }, {
                tag: "span",
                name: "im",
                style: "font-size:16px;font-style:italic;font-weight:bold;line-height:18px;"
            }, {
                tag: "span",
                name: "hi",
                style: "font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;"
            } ]
        }), a.commands.customstyle = {
            execCommand: function(e, t) {
                var i, n, o = t.tag, r = domUtils.findParent(this.selection.getStart(), function(e) {
                    return e.getAttribute("label");
                }, !0), a = {};
                for (var s in t) void 0 !== t[s] && (a[s] = t[s]);
                if (delete a.tag, r && r.getAttribute("label") == t.label) {
                    if (n = (i = this.selection.getRange()).createBookmark(), i.collapsed) if (dtd.$block[r.tagName]) {
                        var l = this.document.createElement("p");
                        domUtils.moveChild(r, l), r.parentNode.insertBefore(l, r), domUtils.remove(r);
                    } else domUtils.remove(r, !0); else {
                        var d = domUtils.getCommonAncestor(n.start, n.end), c = domUtils.getElementsByTagName(d, o);
                        new RegExp(o, "i").test(d.tagName) && c.push(d);
                        for (var u, m = 0; u = c[m++]; ) if (u.getAttribute("label") == t.label) {
                            var f = domUtils.getPosition(u, n.start), h = domUtils.getPosition(u, n.end);
                            if ((f & domUtils.POSITION_FOLLOWING || f & domUtils.POSITION_CONTAINS) && (h & domUtils.POSITION_PRECEDING || h & domUtils.POSITION_CONTAINS) && dtd.$block[o]) {
                                l = this.document.createElement("p");
                                domUtils.moveChild(u, l), u.parentNode.insertBefore(l, u);
                            }
                            domUtils.remove(u, !0);
                        }
                        (r = domUtils.findParent(d, function(e) {
                            return e.getAttribute("label") == t.label;
                        }, !0)) && domUtils.remove(r, !0);
                    }
                    i.moveToBookmark(n).select();
                } else if (dtd.$block[o]) {
                    if (this.execCommand("paragraph", o, a, "customstyle"), !(i = this.selection.getRange()).collapsed) {
                        i.collapse(), r = domUtils.findParent(this.selection.getStart(), function(e) {
                            return e.getAttribute("label") == t.label;
                        }, !0);
                        var p = this.document.createElement("p");
                        domUtils.insertAfter(r, p), domUtils.fillNode(this.document, p), i.setStart(p, 0).setCursor();
                    }
                } else {
                    if ((i = this.selection.getRange()).collapsed) return r = this.document.createElement(o), 
                    domUtils.setAttributes(r, a), void i.insertNode(r).setStart(r, 0).setCursor();
                    n = i.createBookmark(), i.applyInlineStyle(o, a).moveToBookmark(n).select();
                }
            },
            queryCommandValue: function() {
                var e = domUtils.filterNodeList(this.selection.getStartElementPath(), function(e) {
                    return e.getAttribute("label");
                });
                return e ? e.getAttribute("label") : "";
            }
        }, a.addListener("keyup", function(e, t) {
            var i = t.keyCode || t.which;
            if (32 == i || 13 == i) {
                var n = a.selection.getRange();
                if (n.collapsed) {
                    var o = domUtils.findParent(a.selection.getStart(), function(e) {
                        return e.getAttribute("label");
                    }, !0);
                    if (o && dtd.$block[o.tagName] && domUtils.isEmptyNode(o)) {
                        var r = a.document.createElement("p");
                        domUtils.insertAfter(o, r), domUtils.fillNode(a.document, r), domUtils.remove(o), 
                        n.setStart(r, 0).setCursor();
                    }
                }
            }
        });
    }, UE.plugins.catchremoteimage = function() {
        var me = this, ajax = UE.ajax;
        !1 !== me.options.catchRemoteImageEnable && (me.setOpt({
            catchRemoteImageEnable: !1
        }), me.addListener("afterpaste", function() {
            me.fireEvent("catchRemoteImage");
        }), me.addListener("catchRemoteImage", function() {
            for (var catcherLocalDomain = me.getOpt("catcherLocalDomain"), catcherActionUrl = me.getActionUrl(me.getOpt("catcherActionName")), catcherUrlPrefix = me.getOpt("catcherUrlPrefix"), catcherFieldName = me.getOpt("catcherFieldName"), remoteImages = [], loadingIMG = me.options.themePath + me.options.theme + "/images/spacer.gif", imgs = me.document.querySelectorAll('[style*="url"],img'), test = function(e, t) {
                if (-1 != e.indexOf(location.host) || /(^\.)|(^\/)/.test(e)) return !0;
                if (t) for (var i, n = 0; i = t[n++]; ) if (-1 !== e.indexOf(i)) return !0;
                return !1;
            }, i = 0, ci; ci = imgs[i++]; ) if (!ci.getAttribute("word_img")) if ("IMG" == ci.nodeName) {
                var src = ci.getAttribute("_src") || ci.src || "";
                /^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain) && (remoteImages.push(src), 
                domUtils.setAttributes(ci, {
                    class: "loadingclass",
                    _src: src,
                    src: loadingIMG
                }));
            } else {
                var backgroundImageurl = ci.style.cssText.replace(/.*\s?url\([\'\"]?/, "").replace(/[\'\"]?\).*/, "");
                /^(https?|ftp):/i.test(backgroundImageurl) && !test(backgroundImageurl, catcherLocalDomain) && (remoteImages.push(backgroundImageurl), 
                ci.style.cssText = ci.style.cssText.replace(backgroundImageurl, loadingIMG), domUtils.setAttributes(ci, {
                    "data-background": backgroundImageurl
                }));
            }
            function catchremoteimage(e, t) {
                var i = utils.serializeParam(me.queryCommandValue("serverparam")) || "", n = utils.formatUrl(catcherActionUrl + (-1 == catcherActionUrl.indexOf("?") ? "?" : "&") + i), o = {
                    method: "POST",
                    dataType: utils.isCrossDomainUrl(n) ? "jsonp" : "",
                    timeout: 6e4,
                    onsuccess: t.success,
                    onerror: t.error
                };
                o[catcherFieldName] = e, ajax.request(n, o);
            }
            remoteImages.length && catchremoteimage(remoteImages, {
                success: function success(r) {
                    try {
                        var info = void 0 !== r.state ? r : eval("(" + r.responseText + ")");
                    } catch (e) {
                        return;
                    }
                    var i, j, ci, cj, oldSrc, newSrc, list = info.list, catchFailList = [], catchSuccessList = [], failIMG = me.options.themePath + me.options.theme + "/images/img-cracked.png";
                    for (i = 0; ci = imgs[i++]; ) for (oldSrc = ci.getAttribute("_src") || ci.src || "", 
                    oldBgIMG = ci.getAttribute("data-background") || "", j = 0; cj = list[j++]; ) {
                        if (oldSrc == cj.source && "SUCCESS" == cj.state) {
                            newSrc = catcherUrlPrefix + cj.url, domUtils.removeClasses(ci, "loadingclass"), 
                            domUtils.setAttributes(ci, {
                                src: newSrc,
                                _src: newSrc,
                                "data-catchResult": "img_catchSuccess"
                            }), catchSuccessList.push(ci);
                            break;
                        }
                        if (oldSrc == cj.source && "FAIL" == cj.state) {
                            domUtils.removeClasses(ci, "loadingclass"), domUtils.setAttributes(ci, {
                                src: failIMG,
                                _src: failIMG,
                                "data-catchResult": "img_catchFail"
                            }), catchFailList.push(ci);
                            break;
                        }
                        if (oldBgIMG == cj.source && "SUCCESS" == cj.state) {
                            newBgIMG = catcherUrlPrefix + cj.url, ci.style.cssText = ci.style.cssText.replace(loadingIMG, newBgIMG), 
                            domUtils.removeAttributes(ci, "data-background"), domUtils.setAttributes(ci, {
                                "data-catchResult": "img_catchSuccess"
                            }), catchSuccessList.push(ci);
                            break;
                        }
                        if (oldBgIMG == cj.source && "FAIL" == cj.state) {
                            ci.style.cssText = ci.style.cssText.replace(loadingIMG, failIMG), domUtils.removeAttributes(ci, "data-background"), 
                            domUtils.setAttributes(ci, {
                                "data-catchResult": "img_catchFail"
                            }), catchFailList.push(ci);
                            break;
                        }
                    }
                    me.fireEvent("catchremotesuccess", catchSuccessList, catchFailList);
                },
                error: function() {
                    me.fireEvent("catchremoteerror");
                }
            });
        }));
    }, UE.commands.insertparagraph = {
        execCommand: function(e, t) {
            for (var i, n = this.selection.getRange(), o = n.startContainer; o && !domUtils.isBody(o); ) o = (i = o).parentNode;
            if (i) {
                var r = this.document.createElement("p");
                t ? i.parentNode.insertBefore(r, i) : i.parentNode.insertBefore(r, i.nextSibling), 
                domUtils.fillNode(this.document, r), n.setStart(r, 0).setCursor(!1, !0);
            }
        }
    }, UE.plugins.template = function() {
        UE.commands.template = {
            execCommand: function(e, t) {
                t.html && this.execCommand("inserthtml", t.html);
            }
        }, this.addListener("click", function(e, t) {
            var i = t.target || t.srcElement, n = this.selection.getRange(), o = domUtils.findParent(i, function(e) {
                if (e.className && domUtils.hasClass(e, "ue_t")) return e;
            }, !0);
            o && n.selectNode(o).shrinkBoundary().select();
        }), this.addListener("keydown", function(e, t) {
            var i = this.selection.getRange();
            if (!i.collapsed && !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
                var n = domUtils.findParent(i.startContainer, function(e) {
                    if (e.className && domUtils.hasClass(e, "ue_t")) return e;
                }, !0);
                n && domUtils.removeClasses(n, [ "ue_t" ]);
            }
        });
    }, UE.plugin.register("autoupload", function() {
        function s(e, t) {
            var i, r, n, o, a, s, l, d, c = t, u = /image\/\w+/i.test(e.type) ? "image" : "file", m = "loading_" + (+new Date()).toString(36);
            if (i = c.getOpt(u + "FieldName"), r = c.getOpt(u + "UrlPrefix"), n = c.getOpt(u + "MaxSize"), 
            o = c.getOpt(u + "AllowFiles"), a = c.getActionUrl(c.getOpt(u + "ActionName")), 
            l = function(e) {
                var t = c.document.getElementById(m);
                t && domUtils.remove(t), c.fireEvent("showmessage", {
                    id: m,
                    content: e,
                    type: "error",
                    timeout: 4e3
                });
            }, d = "image" == u ? (s = '<img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif">', 
            function(e) {
                var t = r + e.url, i = c.document.getElementById(m);
                i && (domUtils.removeClasses(i, "loadingclass"), i.setAttribute("src", t), i.setAttribute("_src", t), 
                i.setAttribute("alt", e.original || ""), i.removeAttribute("id"), c.trigger("contentchange", i));
            }) : (s = '<p><img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif"></p>', 
            function(e) {
                var t = r + e.url, i = c.document.getElementById(m), n = c.selection.getRange(), o = n.createBookmark();
                n.selectNode(i).select(), c.execCommand("insertfile", {
                    url: t
                }), n.moveToBookmark(o).select();
            }), c.execCommand("inserthtml", s), c.getOpt(u + "ActionName")) if (e.size > n) l(c.getLang("autoupload.exceedSizeError")); else {
                var f = e.name ? e.name.substr(e.name.lastIndexOf(".")) : "";
                if (f && "image" != u || o && -1 == (o.join("") + ".").indexOf(f.toLowerCase() + ".")) l(c.getLang("autoupload.exceedTypeError")); else {
                    var h = new XMLHttpRequest(), p = new FormData(), g = utils.serializeParam(c.queryCommandValue("serverparam")) || "", v = utils.formatUrl(a + (-1 == a.indexOf("?") ? "?" : "&") + g);
                    p.append(i, e, e.name || "blob." + e.type.substr("image/".length)), p.append("type", "ajax"), 
                    h.open("post", v, !0), h.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
                    h.addEventListener("load", function(e) {
                        try {
                            var t = new Function("return " + utils.trim(e.target.response))();
                            "SUCCESS" == t.state && t.url ? d(t) : l(t.state);
                        } catch (e) {
                            l(c.getLang("autoupload.loadError"));
                        }
                    }), h.send(p);
                }
            } else l(c.getLang("autoupload.errorLoadConfig"));
        }
        function l(e) {
            return e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null;
        }
        return {
            outputRule: function(e) {
                utils.each(e.getNodesByTagName("img"), function(e) {
                    /\b(loaderrorclass)|(bloaderrorclass)\b/.test(e.getAttr("class")) && e.parentNode.removeChild(e);
                }), utils.each(e.getNodesByTagName("p"), function(e) {
                    /\bloadpara\b/.test(e.getAttr("class")) && e.parentNode.removeChild(e);
                });
            },
            bindEvents: {
                defaultOptions: {
                    enableDragUpload: !0,
                    enablePasteUpload: !0
                },
                ready: function(e) {
                    var a = this;
                    if (window.FormData && window.FileReader) {
                        var t = function(e) {
                            var t, i, n = !1;
                            if (t = "paste" == e.type ? (i = e).clipboardData && i.clipboardData.items && 1 == i.clipboardData.items.length && /^image\//.test(i.clipboardData.items[0].type) ? i.clipboardData.items : null : l(e)) {
                                for (var o, r = t.length; r--; ) (o = t[r]).getAsFile && (o = o.getAsFile()), o && 0 < o.size && (s(o, a), 
                                n = !0);
                                n && e.preventDefault();
                            }
                        };
                        !1 !== a.getOpt("enablePasteUpload") && domUtils.on(a.body, "paste ", t), !1 !== a.getOpt("enableDragUpload") ? (domUtils.on(a.body, "drop", t), 
                        domUtils.on(a.body, "dragover", function(e) {
                            "Files" == e.dataTransfer.types[0] && e.preventDefault();
                        })) : browser.gecko && domUtils.on(a.body, "drop", function(e) {
                            l(e) && e.preventDefault();
                        }), utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document);
                    }
                }
            }
        };
    }), UE.plugin.register("autosave", function() {
        var i = this, n = new Date(), o = 20, r = null;
        function e(e) {
            var t;
            new Date() - n < o || (e.hasContents() ? (n = new Date(), e._saveFlag = null, t = i.body.innerHTML, 
            !1 !== e.fireEvent("beforeautosave", {
                content: t
            }) && (i.setPreferences(r, t), e.fireEvent("afterautosave", {
                content: t
            }))) : r && i.removePreferences(r));
        }
        return {
            defaultOptions: {
                saveInterval: 500,
                enableAutoSave: !0
            },
            bindEvents: {
                ready: function() {
                    var e = "-drafts-data", t = null;
                    t = i.key ? i.key + e : (i.container.parentNode.id || "ue-common") + e, r = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, "_") + t;
                },
                contentchange: function() {
                    i.getOpt("enableAutoSave") && r && (i._saveFlag && window.clearTimeout(i._saveFlag), 
                    0 < i.options.saveInterval ? i._saveFlag = window.setTimeout(function() {
                        e(i);
                    }, i.options.saveInterval) : e(i));
                }
            },
            commands: {
                clearlocaldata: {
                    execCommand: function(e, t) {
                        r && i.getPreferences(r) && i.removePreferences(r);
                    },
                    notNeedUndo: !0,
                    ignoreContentChange: !0
                },
                getlocaldata: {
                    execCommand: function(e, t) {
                        return r && i.getPreferences(r) || "";
                    },
                    notNeedUndo: !0,
                    ignoreContentChange: !0
                },
                drafts: {
                    execCommand: function(e, t) {
                        r && (i.body.innerHTML = i.getPreferences(r) || "<p>" + domUtils.fillHtml + "</p>", 
                        i.focus(!0));
                    },
                    queryCommandState: function() {
                        return r ? null === i.getPreferences(r) ? -1 : 0 : -1;
                    },
                    notNeedUndo: !0,
                    ignoreContentChange: !0
                }
            }
        };
    }), UE.plugin.register("charts", function() {
        var a = this;
        return {
            bindEvents: {
                chartserror: function() {}
            },
            commands: {
                charts: {
                    execCommand: function(e, t) {
                        var i = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0), n = [], o = {};
                        if (!i) return !1;
                        if (!s(i)) return a.fireEvent("chartserror"), !1;
                        for (var r in o.title = t.title || "", o.subTitle = t.subTitle || "", o.xTitle = t.xTitle || "", 
                        o.yTitle = t.yTitle || "", o.suffix = t.suffix || "", o.tip = t.tip || "", o.dataFormat = t.tableDataFormat || "", 
                        o.chartType = t.chartType || 0, o) o.hasOwnProperty(r) && n.push(r + ":" + o[r]);
                        i.setAttribute("data-chart", n.join(";")), domUtils.addClass(i, "edui-charts-table");
                    },
                    queryCommandState: function(e, t) {
                        var i = domUtils.findParentByTagName(this.selection.getRange().startContainer, "table", !0);
                        return i && s(i) ? 0 : -1;
                    }
                }
            },
            inputRule: function(e) {
                utils.each(e.getNodesByTagName("table"), function(e) {
                    void 0 !== e.getAttr("data-chart") && e.setAttr("style");
                });
            },
            outputRule: function(e) {
                utils.each(e.getNodesByTagName("table"), function(e) {
                    void 0 !== e.getAttr("data-chart") && e.setAttr("style", "display: none;");
                });
            }
        };
        function s(e) {
            var t, i;
            if (e.rows.length < 2) return !1;
            if (e.rows[0].cells.length < 2) return !1;
            i = (t = e.rows[0].cells).length;
            for (var n = 0; r = t[n]; n++) if ("th" !== r.tagName.toLowerCase()) return !1;
            var o;
            for (n = 1; o = e.rows[n]; n++) {
                if (o.cells.length != i) return !1;
                if ("th" !== o.cells[0].tagName.toLowerCase()) return !1;
                for (var r, a = 1; r = o.cells[a]; a++) {
                    var s = utils.trim(r.innerText || r.textContent || "");
                    if (s = s.replace(new RegExp(UE.dom.domUtils.fillChar, "g"), "").replace(/^\s+|\s+$/g, ""), 
                    !/^\d*\.?\d+$/.test(s)) return !1;
                }
            }
            return !0;
        }
    }), UE.plugin.register("section", function() {
        function i(e) {
            this.tag = "", this.level = -1, this.dom = null, this.nextSection = null, this.previousSection = null, 
            this.parentSection = null, this.startAddress = [], this.endAddress = [], this.children = [];
        }
        function p(e) {
            var t = new i();
            return utils.extend(t, e);
        }
        function c(e, t) {
            for (var i = t, n = 0; n < e.length; n++) {
                if (!i.childNodes) return null;
                i = i.childNodes[e[n]];
            }
            return i;
        }
        var n = this;
        return {
            bindMultiEvents: {
                type: "aftersetcontent afterscencerestore",
                handler: function() {
                    n.fireEvent("updateSections");
                }
            },
            bindEvents: {
                ready: function() {
                    n.fireEvent("updateSections"), domUtils.on(n.body, "drop paste", function() {
                        n.fireEvent("updateSections");
                    });
                },
                afterexeccommand: function(e, t) {
                    "paragraph" == t && n.fireEvent("updateSections");
                },
                keyup: function(e, t) {
                    if (1 != this.selection.getRange().collapsed) this.fireEvent("updateSections"); else {
                        var i = t.keyCode || t.which;
                        13 != i && 8 != i && 46 != i || this.fireEvent("updateSections");
                    }
                }
            },
            commands: {
                getsections: {
                    execCommand: function(e, t) {
                        for (var i = t || [ "h1", "h2", "h3", "h4", "h5", "h6" ], n = 0; n < i.length; n++) "string" == typeof i[n] ? i[n] = function(t) {
                            return function(e) {
                                return e.tagName == t.toUpperCase();
                            };
                        }(i[n]) : "function" != typeof i[n] && (i[n] = function(e) {
                            return null;
                        });
                        function m(e) {
                            for (var t = 0; t < i.length; t++) if (i[t](e)) return t;
                            return -1;
                        }
                        var f = this, o = p({
                            level: -1,
                            title: "root"
                        }), h = o;
                        return function e(t, i) {
                            for (var n, o, r, a = null, s = t.childNodes, l = 0, d = s.length; l < d; l++) if (0 <= (n = m(r = s[l]))) {
                                var c = f.selection.getRange().selectNode(r).createAddress(!0).startAddress, u = p({
                                    tag: r.tagName,
                                    title: r.innerText || r.textContent || "",
                                    level: n,
                                    dom: r,
                                    startAddress: utils.clone(c, []),
                                    endAddress: utils.clone(c, []),
                                    children: []
                                });
                                for (o = (h.nextSection = u).previousSection = h; n <= o.level; ) o = o.parentSection;
                                (u.parentSection = o).children.push(u), a = h = u;
                            } else 1 === r.nodeType && e(r, i), a && a.endAddress[a.endAddress.length - 1]++;
                        }(f.body, o), o;
                    },
                    notNeedUndo: !0
                },
                movesection: {
                    execCommand: function(e, t, i, n) {
                        var o, r;
                        if (t && i && -1 != i.level && (r = c(o = n ? i.endAddress : i.startAddress, this.body), 
                        o && r && !function(e, t, i) {
                            for (var n = !1, o = !1, r = 0; r < e.length && !(r >= i.length); r++) {
                                if (i[r] > e[r]) {
                                    n = !0;
                                    break;
                                }
                                if (i[r] < e[r]) break;
                            }
                            for (var r = 0; r < t.length && !(r >= i.length); r++) {
                                if (i[r] < e[r]) {
                                    o = !0;
                                    break;
                                }
                                if (i[r] > e[r]) break;
                            }
                            return n && o;
                        }(t.startAddress, t.endAddress, o))) {
                            var a, s, l = c(t.startAddress, this.body), d = c(t.endAddress, this.body);
                            if (n) for (a = d; a && !(domUtils.getPosition(l, a) & domUtils.POSITION_FOLLOWING) && (s = a.previousSibling, 
                            domUtils.insertAfter(r, a), a != l); ) a = s; else for (a = l; a && !(domUtils.getPosition(a, d) & domUtils.POSITION_FOLLOWING) && (s = a.nextSibling, 
                            r.parentNode.insertBefore(a, r), a != d); ) a = s;
                            this.fireEvent("updateSections");
                        }
                    }
                },
                deletesection: {
                    execCommand: function(e, t, i) {
                        var n = this;
                        if (t) {
                            var o, r = l(t.startAddress), a = l(t.endAddress), s = r;
                            if (i) domUtils.remove(s); else for (;s && domUtils.inDoc(a, n.document) && !(domUtils.getPosition(s, a) & domUtils.POSITION_FOLLOWING); ) o = s.nextSibling, 
                            domUtils.remove(s), s = o;
                            n.fireEvent("updateSections");
                        }
                        function l(e) {
                            for (var t = n.body, i = 0; i < e.length; i++) {
                                if (!t.childNodes) return null;
                                t = t.childNodes[e[i]];
                            }
                            return t;
                        }
                    }
                },
                selectsection: {
                    execCommand: function(e, t) {
                        if (!t && !t.dom) return !1;
                        var i = this.selection.getRange(), n = {
                            startAddress: utils.clone(t.startAddress, []),
                            endAddress: utils.clone(t.endAddress, [])
                        };
                        return n.endAddress[n.endAddress.length - 1]++, i.moveToAddress(n).select().scrollToView(), 
                        !0;
                    },
                    notNeedUndo: !0
                },
                scrolltosection: {
                    execCommand: function(e, t) {
                        if (!t && !t.dom) return !1;
                        var i = this.selection.getRange(), n = {
                            startAddress: t.startAddress,
                            endAddress: t.endAddress
                        };
                        return n.endAddress[n.endAddress.length - 1]++, i.moveToAddress(n).scrollToView(), 
                        !0;
                    },
                    notNeedUndo: !0
                }
            }
        };
    }), UE.plugin.register("simpleupload", function() {
        var i, m = this, f = !1;
        function n() {
            var a = i.offsetWidth || 20, s = i.offsetHeight || 20, c = document.createElement("iframe"), u = "display:block;width:" + a + "px;height:" + s + "px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;";
            domUtils.on(c, "load", function() {
                var e, t, i, n = (+new Date()).toString(36);
                i = (t = c.contentDocument || c.contentWindow.document).body, (e = t.createElement("div")).innerHTML = '<form id="edui_form_' + n + '" target="edui_iframe_' + n + '" method="POST" enctype="multipart/form-data" action="' + m.getOpt("serverUrl") + '" style="' + u + '"><input id="edui_input_' + n + '" type="file" accept="image/*" name="' + m.options.imageFieldName + '" style="' + u + '"></form><iframe id="edui_iframe_' + n + '" name="edui_iframe_' + n + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>', 
                e.className = "edui-" + m.options.theme, e.id = m.ui.id + "_iframeupload", i.style.cssText = u, 
                i.style.width = a + "px", i.style.height = s + "px", i.appendChild(e), i.parentNode && (i.parentNode.style.width = a + "px", 
                i.parentNode.style.height = a + "px");
                var o, l = t.getElementById("edui_form_" + n), r = t.getElementById("edui_input_" + n), d = t.getElementById("edui_iframe_" + n);
                domUtils.on(r, "change", function() {
                    if (r.value) {
                        var a = "loading_" + (+new Date()).toString(36), e = utils.serializeParam(m.queryCommandValue("serverparam")) || "", t = m.getActionUrl(m.getOpt("imageActionName")), i = m.getOpt("imageAllowFiles");
                        if (m.focus(), m.execCommand("inserthtml", '<img class="loadingclass" id="' + a + '" src="' + m.options.themePath + m.options.theme + '/images/spacer.gif">'), 
                        m.getOpt("imageActionName")) {
                            var n = r.value, o = n ? n.substr(n.lastIndexOf(".")) : "";
                            !o || i && -1 == (i.join("") + ".").indexOf(o.toLowerCase() + ".") ? s(m.getLang("simpleupload.exceedTypeError")) : (domUtils.on(d, "load", function e() {
                                try {
                                    var t, i, n, o = (d.contentDocument || d.contentWindow.document).body, r = o.innerText || o.textContent || "";
                                    i = new Function("return " + r)(), t = m.options.imageUrlPrefix + i.url, "SUCCESS" == i.state && i.url ? (n = m.document.getElementById(a), 
                                    domUtils.removeClasses(n, "loadingclass"), n.setAttribute("src", t), n.setAttribute("_src", t), 
                                    n.setAttribute("alt", i.original || ""), n.removeAttribute("id"), m.fireEvent("contentchange")) : s(i.state);
                                } catch (e) {
                                    s(m.getLang("simpleupload.loadError"));
                                }
                                l.reset(), domUtils.un(d, "load", e);
                            }), l.action = utils.formatUrl(t + (-1 == t.indexOf("?") ? "?" : "&") + e), l.submit());
                        } else errorHandler(m.getLang("autoupload.errorLoadConfig"));
                    }
                    function s(e) {
                        if (a) {
                            var t = m.document.getElementById(a);
                            t && domUtils.remove(t), m.fireEvent("showmessage", {
                                id: a,
                                content: e,
                                type: "error",
                                timeout: 4e3
                            });
                        }
                    }
                }), m.addListener("selectionchange", function() {
                    clearTimeout(o), o = setTimeout(function() {
                        var e = m.queryCommandState("simpleupload");
                        r.disabled = -1 == e && "disabled";
                    }, 400);
                }), f = !0;
            }), c.style.cssText = u, i.appendChild(c);
        }
        return {
            bindEvents: {
                ready: function() {
                    utils.cssRule("loading", ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document);
                },
                simpleuploadbtnready: function(e, t) {
                    i = t, m.afterConfigReady(n);
                }
            },
            outputRule: function(e) {
                utils.each(e.getNodesByTagName("img"), function(e) {
                    /\b(loaderrorclass)|(bloaderrorclass)\b/.test(e.getAttr("class")) && e.parentNode.removeChild(e);
                });
            },
            commands: {
                simpleupload: {
                    queryCommandState: function() {
                        return f ? 0 : -1;
                    }
                }
            }
        };
    }), UE.plugin.register("serverparam", function() {
        var n = {};
        return {
            commands: {
                serverparam: {
                    execCommand: function(e, t, i) {
                        null == t ? n = {} : utils.isString(t) ? null == i ? delete n[t] : n[t] = i : utils.isObject(t) ? utils.extend(n, t, !1) : utils.isFunction(t) && utils.extend(n, t(), !1);
                    },
                    queryCommandValue: function() {
                        return n || {};
                    }
                }
            }
        };
    }), UE.plugin.register("insertfile", function() {
        var m = this;
        return {
            commands: {
                insertfile: {
                    execCommand: function(e, t) {
                        if (t = utils.isArray(t) ? t : [ t ], !0 !== m.fireEvent("beforeinsertfile", t)) {
                            var i, n, o, r, a, s, l, d = "", c = m.getOpt("UEDITOR_HOME_URL"), u = c + ("/" == c.substr(c.length - 1) ? "" : "/") + "dialogs/attachment/fileTypeImages/";
                            for (i = 0; i < t.length; i++) n = t[i], o = u + (a = n.url, void 0, s = a.substr(a.lastIndexOf(".") + 1).toLowerCase(), 
                            (l = {
                                rar: "icon_rar.gif",
                                zip: "icon_rar.gif",
                                tar: "icon_rar.gif",
                                gz: "icon_rar.gif",
                                bz2: "icon_rar.gif",
                                doc: "icon_doc.gif",
                                docx: "icon_doc.gif",
                                pdf: "icon_pdf.gif",
                                mp3: "icon_mp3.gif",
                                xls: "icon_xls.gif",
                                chm: "icon_chm.gif",
                                ppt: "icon_ppt.gif",
                                pptx: "icon_ppt.gif",
                                avi: "icon_mv.gif",
                                rmvb: "icon_mv.gif",
                                wmv: "icon_mv.gif",
                                flv: "icon_mv.gif",
                                swf: "icon_mv.gif",
                                rm: "icon_mv.gif",
                                exe: "icon_exe.gif",
                                psd: "icon_psd.gif",
                                txt: "icon_txt.gif",
                                jpg: "icon_jpg.gif",
                                png: "icon_jpg.gif",
                                jpeg: "icon_jpg.gif",
                                gif: "icon_jpg.gif",
                                ico: "icon_jpg.gif",
                                bmp: "icon_jpg.gif"
                            })[s] ? l[s] : l.txt), r = n.title || n.url.substr(n.url.lastIndexOf("/") + 1), 
                            d += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' + o + '" _src="' + o + '" /><a style="font-size:12px; color:#0066cc;" href="' + n.url + '" title="' + r + '">' + r + "</a></p>";
                            m.execCommand("insertHtml", d), m.fireEvent("afterinsertfile", t);
                        }
                    }
                }
            }
        };
    });
    var baidu = baidu || {}, Bva, Cva, Dva, Eva, cwa, dwa, ewa, iwa, jwa, kwa, lwa, mwa, eya, fya, gya, hya, Lya, Mya, Nya, Oya, yza, zza, Aza, Bza, Qza, Rza, Tza, Uza, Vza, kAa, lAa, mAa, nAa, oAa, pAa, GAa, HAa, IAa, JAa, KAa, VAa, WAa, XAa, SBa, TBa, UBa, VBa, WBa, lCa, mCa, nCa, oCa, pCa, BCa, CCa, DCa, ECa, cEa, dEa, eEa, fEa, gEa, MEa, NEa, OEa, FEa, GEa, HEa, IEa, JEa, KEa, LEa, sGa, tGa, uGa, vGa, DGa, EGa, FGa, GGa, ZHa, $Ha, _Ha, dIa, eIa, fIa, gIa;
    baidu.editor = baidu.editor || {}, UE.ui = baidu.editor.ui = {}, function() {
        var r = baidu.editor.browser, a = baidu.editor.dom.domUtils, i = "$EDITORUI", n = window[i] = {}, t = "ID" + i, o = 0, s = baidu.editor.ui.uiUtils = {
            uid: function(e) {
                return e ? e[t] || (e[t] = ++o) : ++o;
            },
            hook: function(s, e) {
                var l;
                return s && s._callbacks ? l = s : (l = function() {
                    for (var e, t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                    s && (e = s.apply(this, i));
                    for (var o = l._callbacks, r = o.length; r--; ) {
                        var a = o[r].apply(this, i);
                        void 0 === e && (e = a);
                    }
                    return e;
                })._callbacks = [], l._callbacks.push(e), l;
            },
            createElementByHtml: function(e) {
                var t = document.createElement("div");
                return t.innerHTML = e, (t = t.firstChild).parentNode.removeChild(t), t;
            },
            getViewportElement: function() {
                return r.ie && r.quirks ? document.body : document.documentElement;
            },
            getClientRect: function(e) {
                var t;
                try {
                    t = e.getBoundingClientRect();
                } catch (e) {
                    t = {
                        left: 0,
                        top: 0,
                        height: 0,
                        width: 0
                    };
                }
                for (var i, n = {
                    left: Math.round(t.left),
                    top: Math.round(t.top),
                    height: Math.round(t.bottom - t.top),
                    width: Math.round(t.right - t.left)
                }; (i = e.ownerDocument) !== document && (e = a.getWindow(i).frameElement); ) t = e.getBoundingClientRect(), 
                n.left += t.left, n.top += t.top;
                return n.bottom = n.top + n.height, n.right = n.left + n.width, n;
            },
            getViewportRect: function() {
                var e = s.getViewportElement(), t = 0 | (window.innerWidth || e.clientWidth), i = 0 | (window.innerHeight || e.clientHeight);
                return {
                    left: 0,
                    top: 0,
                    height: i,
                    width: t,
                    bottom: i,
                    right: t
                };
            },
            setViewportOffset: function(e, t) {
                var i = s.getFixedLayer();
                e.parentNode === i ? (e.style.left = t.left + "px", e.style.top = t.top + "px") : a.setViewportOffset(e, t);
            },
            getEventOffset: function(e) {
                var t = e.target || e.srcElement, i = s.getClientRect(t), n = s.getViewportOffsetByEvent(e);
                return {
                    left: n.left - i.left,
                    top: n.top - i.top
                };
            },
            getViewportOffsetByEvent: function(e) {
                var t = e.target || e.srcElement, i = a.getWindow(t).frameElement, n = {
                    left: e.clientX,
                    top: e.clientY
                };
                if (i && t.ownerDocument !== document) {
                    var o = s.getClientRect(i);
                    n.left += o.left, n.top += o.top;
                }
                return n;
            },
            setGlobal: function(e, t) {
                return n[e] = t, i + '["' + e + '"]';
            },
            unsetGlobal: function(e) {
                delete n[e];
            },
            copyAttributes: function(e, t) {
                for (var i = t.attributes, n = i.length; n--; ) {
                    var o = i[n];
                    "style" == o.nodeName || "class" == o.nodeName || r.ie && !o.specified || e.setAttribute(o.nodeName, o.nodeValue);
                }
                t.className && a.addClass(e, t.className), t.style.cssText && (e.style.cssText += ";" + t.style.cssText);
            },
            removeStyle: function(e, t) {
                if (e.style.removeProperty) e.style.removeProperty(t); else {
                    if (!e.style.removeAttribute) throw "";
                    e.style.removeAttribute(t);
                }
            },
            contains: function(e, t) {
                return e && t && e !== t && (e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t));
            },
            startDrag: function(e, n, i) {
                i = i || document;
                var o = e.clientX, r = e.clientY;
                function a(e) {
                    var t = e.clientX - o, i = e.clientY - r;
                    n.ondragmove(t, i, e), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
                }
                if (i.addEventListener) {
                    var t = function e(t) {
                        i.removeEventListener("mousemove", a, !0), i.removeEventListener("mouseup", e, !0), 
                        window.removeEventListener("mouseup", e, !0), n.ondragstop();
                    };
                    i.addEventListener("mousemove", a, !0), i.addEventListener("mouseup", t, !0), window.addEventListener("mouseup", t, !0), 
                    e.preventDefault();
                } else {
                    var s = function e() {
                        l.releaseCapture(), l.detachEvent("onmousemove", a), l.detachEvent("onmouseup", e), 
                        l.detachEvent("onlosecaptrue", e), n.ondragstop();
                    }, l = e.srcElement;
                    l.setCapture(), l.attachEvent("onmousemove", a), l.attachEvent("onmouseup", s), 
                    l.attachEvent("onlosecaptrue", s), e.returnValue = !1;
                }
                n.ondragstart();
            },
            getFixedLayer: function() {
                var e = document.getElementById("edui_fixedlayer");
                return null == e && ((e = document.createElement("div")).id = "edui_fixedlayer", 
                document.body.appendChild(e), r.ie && r.version <= 8 ? (e.style.position = "absolute", 
                a.on(window, "scroll", l), a.on(window, "resize", baidu.editor.utils.defer(l, 0, !0)), 
                setTimeout(l)) : e.style.position = "fixed", e.style.left = "0", e.style.top = "0", 
                e.style.width = "0", e.style.height = "0"), e;
            },
            makeUnselectable: function(e) {
                if (r.opera || r.ie && r.version < 9) {
                    if (e.unselectable = "on", e.hasChildNodes()) for (var t = 0; t < e.childNodes.length; t++) 1 == e.childNodes[t].nodeType && s.makeUnselectable(e.childNodes[t]);
                } else void 0 !== e.style.MozUserSelect ? e.style.MozUserSelect = "none" : void 0 !== e.style.WebkitUserSelect ? e.style.WebkitUserSelect = "none" : void 0 !== e.style.KhtmlUserSelect && (e.style.KhtmlUserSelect = "none");
            }
        };
        function l() {
            var e = document.getElementById("edui_fixedlayer");
            s.setViewportOffset(e, {
                left: 0,
                top: 0
            });
        }
    }(), Bva = baidu.editor.utils, Cva = baidu.editor.ui.uiUtils, Dva = baidu.editor.EventBase, 
    Eva = baidu.editor.ui.UIBase = function() {}, Eva.prototype = {
        className: "",
        uiName: "",
        initOptions: function(e) {
            for (var t in e) this[t] = e[t];
            this.id = this.id || "edui" + Cva.uid();
        },
        initUIBase: function() {
            this._globalKey = Bva.unhtml(Cva.setGlobal(this.id, this));
        },
        render: function(e) {
            for (var t, i = this.renderHtml(), n = Cva.createElementByHtml(i), o = domUtils.getElementsByTagName(n, "*"), r = "edui-" + (this.theme || this.editor.options.theme), a = document.getElementById("edui_fixedlayer"), s = 0; t = o[s++]; ) domUtils.addClass(t, r);
            domUtils.addClass(n, r), a && (a.className = "", domUtils.addClass(a, r));
            var l = this.getDom();
            null != l ? (l.parentNode.replaceChild(n, l), Cva.copyAttributes(n, l)) : ("string" == typeof e && (e = document.getElementById(e)), 
            e = e || Cva.getFixedLayer(), domUtils.addClass(e, r), e.appendChild(n)), this.postRender();
        },
        getDom: function(e) {
            return e ? document.getElementById(this.id + "_" + e) : document.getElementById(this.id);
        },
        postRender: function() {
            this.fireEvent("postrender");
        },
        getHtmlTpl: function() {
            return "";
        },
        formatHtml: function(e) {
            var t = "edui-" + this.uiName;
            return e.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? t + "-" : "").replace(/%%/g, (this.uiName ? t : "") + " " + this.className).replace(/\$\$/g, this._globalKey);
        },
        renderHtml: function() {
            return this.formatHtml(this.getHtmlTpl());
        },
        dispose: function() {
            var e = this.getDom();
            e && baidu.editor.dom.domUtils.remove(e), Cva.unsetGlobal(this.id);
        }
    }, Bva.inherits(Eva, Dva), cwa = baidu.editor.utils, dwa = baidu.editor.ui.UIBase, 
    ewa = baidu.editor.ui.Separator = function(e) {
        this.initOptions(e), this.initSeparator();
    }, ewa.prototype = {
        uiName: "separator",
        initSeparator: function() {
            this.initUIBase();
        },
        getHtmlTpl: function() {
            return '<div id="##" class="edui-box %%"></div>';
        }
    }, cwa.inherits(ewa, dwa), iwa = baidu.editor.utils, jwa = baidu.editor.dom.domUtils, 
    kwa = baidu.editor.ui.UIBase, lwa = baidu.editor.ui.uiUtils, mwa = baidu.editor.ui.Mask = function(e) {
        this.initOptions(e), this.initUIBase();
    }, mwa.prototype = {
        getHtmlTpl: function() {
            return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>';
        },
        postRender: function() {
            var e = this;
            jwa.on(window, "resize", function() {
                setTimeout(function() {
                    e.isHidden() || e._fill();
                });
            });
        },
        show: function(e) {
            this._fill(), this.getDom().style.display = "", this.getDom().style.zIndex = e;
        },
        hide: function() {
            this.getDom().style.display = "none", this.getDom().style.zIndex = "";
        },
        isHidden: function() {
            return "none" == this.getDom().style.display;
        },
        _onMouseDown: function() {
            return !1;
        },
        _onClick: function(e, t) {
            this.fireEvent("click", e, t);
        },
        _fill: function() {
            var e = this.getDom(), t = lwa.getViewportRect();
            e.style.width = t.width + "px", e.style.height = t.height + "px";
        }
    }, iwa.inherits(mwa, kwa), function() {
        var e = baidu.editor.utils, c = baidu.editor.ui.uiUtils, u = baidu.editor.dom.domUtils, a = baidu.editor.ui.UIBase, t = baidu.editor.ui.Popup = function(e) {
            this.initOptions(e), this.initPopup();
        }, o = [];
        function i(e, t) {
            for (var i = 0; i < o.length; i++) {
                var n = o[i];
                if (!n.isHidden() && !1 !== n.queryAutoHide(t)) {
                    if (e && /scroll/gi.test(e.type) && "edui-wordpastepop" == n.className) return;
                    n.hide();
                }
            }
            o.length && n.editor.fireEvent("afterhidepop");
        }
        t.postHide = i;
        var m = [ "edui-anchor-topleft", "edui-anchor-topright", "edui-anchor-bottomleft", "edui-anchor-bottomright" ];
        t.prototype = {
            SHADOW_RADIUS: 5,
            content: null,
            _hidden: !1,
            autoRender: !0,
            canSideLeft: !0,
            canSideUp: !0,
            initPopup: function() {
                this.initUIBase(), o.push(this);
            },
            getHtmlTpl: function() {
                return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + "  </div> </div></div>";
            },
            getContentHtmlTpl: function() {
                return this.content ? "string" == typeof this.content ? this.content : this.content.renderHtml() : "";
            },
            _UIBase_postRender: a.prototype.postRender,
            postRender: function() {
                if (this.content instanceof a && this.content.postRender(), this.captureWheel && !this.captured) {
                    this.captured = !0;
                    var e = (document.documentElement.clientHeight || document.body.clientHeight) - 80, t = this.getDom().offsetHeight, i = c.getClientRect(this.combox.getDom()).top, n = this.getDom("content"), o = this.getDom("body").getElementsByTagName("iframe"), r = this;
                    for (o.length && (o = o[0]); e < i + t; ) t -= 30;
                    n.style.height = t + "px", o && (o.style.height = t + "px"), window.XMLHttpRequest ? u.on(n, "onmousewheel" in document.body ? "mousewheel" : "DOMMouseScroll", function(e) {
                        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.wheelDelta ? n.scrollTop -= e.wheelDelta / 120 * 60 : n.scrollTop -= e.detail / -3 * 60;
                    }) : u.on(this.getDom(), "mousewheel", function(e) {
                        e.returnValue = !1, r.getDom("content").scrollTop -= e.wheelDelta / 120 * 60;
                    });
                }
                this.fireEvent("postRenderAfter"), this.hide(!0), this._UIBase_postRender();
            },
            _doAutoRender: function() {
                !this.getDom() && this.autoRender && this.render();
            },
            mesureSize: function() {
                var e = this.getDom("content");
                return c.getClientRect(e);
            },
            fitSize: function() {
                if (this.captureWheel && this.sized) return this.__size;
                this.sized = !0;
                var e = this.getDom("body");
                e.style.width = "", e.style.height = "";
                var t = this.mesureSize();
                if (this.captureWheel) {
                    e.style.width = -(-20 - t.width) + "px";
                    var i = parseInt(this.getDom("content").style.height, 10);
                    !window.isNaN(i) && (t.height = i);
                } else e.style.width = t.width + "px";
                return e.style.height = t.height + "px", this.__size = t, this.captureWheel && (this.getDom("content").style.overflow = "auto"), 
                t;
            },
            showAnchor: function(e, t) {
                this.showAnchorRect(c.getClientRect(e), t);
            },
            showAnchorRect: function(e, t, i) {
                this._doAutoRender();
                var n = c.getViewportRect();
                this.getDom().style.visibility = "hidden", this._show();
                var o, r, a, s, l = this.fitSize();
                s = t ? (o = this.canSideLeft && e.right + l.width > n.right && e.left > l.width, 
                r = this.canSideUp && e.top + l.height > n.bottom && e.bottom > l.height, a = o ? e.left - l.width : e.right, 
                r ? e.bottom - l.height : e.top) : (o = this.canSideLeft && e.right + l.width > n.right && e.left > l.width, 
                r = this.canSideUp && e.top + l.height > n.bottom && e.bottom > l.height, a = o ? e.right - l.width : e.left, 
                r ? e.top - l.height : e.bottom);
                var d = this.getDom();
                c.setViewportOffset(d, {
                    left: a,
                    top: s
                }), u.removeClasses(d, m), d.className += " " + m[2 * (r ? 1 : 0) + (o ? 1 : 0)], 
                this.editor && (d.style.zIndex = 1 * this.editor.container.style.zIndex + 10, baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = d.style.zIndex - 1), 
                this.getDom().style.visibility = "visible";
            },
            showAt: function(e) {
                var t = e.left, i = e.top, n = {
                    left: t,
                    top: i,
                    right: t,
                    bottom: i,
                    height: 0,
                    width: 0
                };
                this.showAnchorRect(n, !1, !0);
            },
            _show: function() {
                this._hidden && (this.getDom().style.display = "", this._hidden = !1, this.fireEvent("show"));
            },
            isHidden: function() {
                return this._hidden;
            },
            show: function() {
                this._doAutoRender(), this._show();
            },
            hide: function(e) {
                !this._hidden && this.getDom() && (this.getDom().style.display = "none", this._hidden = !0, 
                e || this.fireEvent("hide"));
            },
            queryAutoHide: function(e) {
                return !e || !c.contains(this.getDom(), e);
            }
        }, e.inherits(t, a), u.on(document, "mousedown", function(e) {
            i(e, e.target || e.srcElement);
        }), u.on(window, "scroll", function(e, t) {
            i(e, t);
        });
    }(), function() {
        var e = baidu.editor.utils, t = baidu.editor.ui.UIBase, i = baidu.editor.ui.ColorPicker = function(e) {
            this.initOptions(e), this.noColorText = this.noColorText || this.editor.getLang("clearColor"), 
            this.initUIBase();
        };
        i.prototype = {
            getHtmlTpl: function() {
                return function(e, t) {
                    for (var i = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + e + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + t.getLang("themeColor") + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', n = 0; n < o.length; n++) n && n % 10 == 0 && (i += "</tr>" + (60 == n ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + t.getLang("standardColor") + "</td></tr>" : "") + "<tr" + (60 == n ? ' class="edui-colorpicker-tablefirstrow"' : "") + ">"), 
                    i += n < 70 ? '<td style="padding: 0 2px;"><a hidefocus title="' + o[n] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + o[n] + '" style="background-color:#' + o[n] + ";border:solid #ccc;" + (n < 10 || 60 <= n ? "border-width:1px;" : 10 <= n && n < 20 ? "border-width:1px 1px 0 1px;" : "border-width:0 1px 0 1px;") + '"></a></td>' : "";
                    return i += "</tr></table></div>";
                }(this.noColorText, this.editor);
            },
            _onTableClick: function(e) {
                var t = (e.target || e.srcElement).getAttribute("data-color");
                t && this.fireEvent("pickcolor", t);
            },
            _onTableOver: function(e) {
                var t = (e.target || e.srcElement).getAttribute("data-color");
                t && (this.getDom("preview").style.backgroundColor = t);
            },
            _onTableOut: function() {
                this.getDom("preview").style.backgroundColor = "";
            },
            _onPickNoColor: function() {
                this.fireEvent("picknocolor");
            }
        }, e.inherits(i, t);
        var o = "ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,d8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,".split(",");
    }(), eya = baidu.editor.utils, fya = baidu.editor.ui.uiUtils, gya = baidu.editor.ui.UIBase, 
    hya = baidu.editor.ui.TablePicker = function(e) {
        this.initOptions(e), this.initTablePicker();
    }, hya.prototype = {
        defaultNumRows: 10,
        defaultNumCols: 10,
        maxNumRows: 20,
        maxNumCols: 20,
        numRows: 10,
        numCols: 10,
        lengthOfCellSide: 22,
        initTablePicker: function() {
            this.initUIBase();
        },
        getHtmlTpl: function() {
            return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>';
        },
        _UIBase_render: gya.prototype.render,
        render: function(e) {
            this._UIBase_render(e), this.getDom("label").innerHTML = "0" + this.editor.getLang("t_row") + " x 0" + this.editor.getLang("t_col");
        },
        _track: function(e, t) {
            var i = this.getDom("overlay").style, n = this.lengthOfCellSide;
            i.width = e * n + "px", i.height = t * n + "px", this.getDom("label").innerHTML = e + this.editor.getLang("t_col") + " x " + t + this.editor.getLang("t_row"), 
            this.numCols = e, this.numRows = t;
        },
        _onMouseOver: function(e, t) {
            var i = e.relatedTarget || e.fromElement;
            fya.contains(t, i) || t === i || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), 
            this.getDom("overlay").style.visibility = "");
        },
        _onMouseOut: function(e, t) {
            var i = e.relatedTarget || e.toElement;
            fya.contains(t, i) || t === i || (this.getDom("label").innerHTML = "0" + this.editor.getLang("t_col") + " x 0" + this.editor.getLang("t_row"), 
            this.getDom("overlay").style.visibility = "hidden");
        },
        _onMouseMove: function(e, t) {
            this.getDom("overlay").style;
            var i = fya.getEventOffset(e), n = this.lengthOfCellSide, o = Math.ceil(i.left / n), r = Math.ceil(i.top / n);
            this._track(o, r);
        },
        _onClick: function() {
            this.fireEvent("picktable", this.numCols, this.numRows);
        }
    }, eya.inherits(hya, gya), Lya = baidu.editor.browser, Mya = baidu.editor.dom.domUtils, 
    Nya = baidu.editor.ui.uiUtils, Oya = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (Lya.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"'), 
    baidu.editor.ui.Stateful = {
        alwalysHoverable: !1,
        target: null,
        Stateful_init: function() {
            this._Stateful_dGetHtmlTpl = this.getHtmlTpl, this.getHtmlTpl = this.Stateful_getHtmlTpl;
        },
        Stateful_getHtmlTpl: function() {
            return this._Stateful_dGetHtmlTpl().replace(/stateful/g, function() {
                return Oya;
            });
        },
        Stateful_onMouseEnter: function(e, t) {
            this.target = t, this.isDisabled() && !this.alwalysHoverable || (this.addState("hover"), 
            this.fireEvent("over"));
        },
        Stateful_onMouseLeave: function(e, t) {
            this.isDisabled() && !this.alwalysHoverable || (this.removeState("hover"), this.removeState("active"), 
            this.fireEvent("out"));
        },
        Stateful_onMouseOver: function(e, t) {
            var i = e.relatedTarget;
            Nya.contains(t, i) || t === i || this.Stateful_onMouseEnter(e, t);
        },
        Stateful_onMouseOut: function(e, t) {
            var i = e.relatedTarget;
            Nya.contains(t, i) || t === i || this.Stateful_onMouseLeave(e, t);
        },
        Stateful_onMouseDown: function(e, t) {
            this.isDisabled() || this.addState("active");
        },
        Stateful_onMouseUp: function(e, t) {
            this.isDisabled() || this.removeState("active");
        },
        Stateful_postRender: function() {
            this.disabled && !this.hasState("disabled") && this.addState("disabled");
        },
        hasState: function(e) {
            return Mya.hasClass(this.getStateDom(), "edui-state-" + e);
        },
        addState: function(e) {
            this.hasState(e) || (this.getStateDom().className += " edui-state-" + e);
        },
        removeState: function(e) {
            this.hasState(e) && Mya.removeClasses(this.getStateDom(), [ "edui-state-" + e ]);
        },
        getStateDom: function() {
            return this.getDom("state");
        },
        isChecked: function() {
            return this.hasState("checked");
        },
        setChecked: function(e) {
            !this.isDisabled() && e ? this.addState("checked") : this.removeState("checked");
        },
        isDisabled: function() {
            return this.hasState("disabled");
        },
        setDisabled: function(e) {
            e ? (this.removeState("hover"), this.removeState("checked"), this.removeState("active"), 
            this.addState("disabled")) : this.removeState("disabled");
        }
    }, yza = baidu.editor.utils, zza = baidu.editor.ui.UIBase, Aza = baidu.editor.ui.Stateful, 
    Bza = baidu.editor.ui.Button = function(e) {
        if (e.name) {
            var t = e.name, i = e.cssRules;
            e.className || (e.className = "edui-for-" + t), e.cssRules = ".edui-" + (e.theme || "default") + " .edui-toolbar .edui-button.edui-for-" + t + " .edui-icon {" + i + "}";
        }
        this.initOptions(e), this.initButton();
    }, Bza.prototype = {
        uiName: "button",
        label: "",
        title: "",
        showIcon: !0,
        showText: !0,
        cssRules: "",
        initButton: function() {
            this.initUIBase(), this.Stateful_init(), this.cssRules && yza.cssRule("edui-customize-" + this.name + "-style", this.cssRules);
        },
        getHtmlTpl: function() {
            return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : "") + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : "") + (this.showText ? '<div class="edui-box edui-label">' + this.label + "</div>" : "") + "</div></div></div></div>";
        },
        postRender: function() {
            this.Stateful_postRender(), this.setDisabled(this.disabled);
        },
        _onMouseDown: function(e) {
            var t = e.target || e.srcElement, i = t && t.tagName && t.tagName.toLowerCase();
            if ("input" == i || "object" == i || "object" == i) return !1;
        },
        _onClick: function() {
            this.isDisabled() || this.fireEvent("click");
        },
        setTitle: function(e) {
            this.getDom("label").innerHTML = e;
        }
    }, yza.inherits(Bza, zza), yza.extend(Bza.prototype, Aza), Qza = baidu.editor.utils, 
    Rza = baidu.editor.ui.uiUtils, baidu.editor.dom.domUtils, Tza = baidu.editor.ui.UIBase, 
    Uza = baidu.editor.ui.Stateful, Vza = baidu.editor.ui.SplitButton = function(e) {
        this.initOptions(e), this.initSplitButton();
    }, Vza.prototype = {
        popup: null,
        uiName: "splitbutton",
        title: "",
        initSplitButton: function() {
            if (this.initUIBase(), this.Stateful_init(), null != this.popup) {
                var e = this.popup;
                this.popup = null, this.setPopup(e);
            }
        },
        _UIBase_postRender: Tza.prototype.postRender,
        postRender: function() {
            this.Stateful_postRender(), this._UIBase_postRender();
        },
        setPopup: function(e) {
            this.popup !== e && (null != this.popup && this.popup.dispose(), e.addListener("show", Qza.bind(this._onPopupShow, this)), 
            e.addListener("hide", Qza.bind(this._onPopupHide, this)), e.addListener("postrender", Qza.bind(function() {
                e.getDom("body").appendChild(Rza.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (Rza.getClientRect(this.getDom()).width + 20) + 'px"></div>')), 
                e.getDom().className += " " + this.className;
            }, this)), this.popup = e);
        },
        _onPopupShow: function() {
            this.addState("opened");
        },
        _onPopupHide: function() {
            this.removeState("opened");
        },
        getHtmlTpl: function() {
            return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"' : "") + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>';
        },
        showPopup: function() {
            var e = Rza.getClientRect(this.getDom());
            e.top -= this.popup.SHADOW_RADIUS, e.height += this.popup.SHADOW_RADIUS, this.popup.showAnchorRect(e);
        },
        _onArrowClick: function(e, t) {
            this.isDisabled() || this.showPopup();
        },
        _onButtonClick: function() {
            this.isDisabled() || this.fireEvent("buttonclick");
        }
    }, Qza.inherits(Vza, Tza), Qza.extend(Vza.prototype, Uza, !0), kAa = baidu.editor.utils, 
    lAa = baidu.editor.ui.uiUtils, mAa = baidu.editor.ui.ColorPicker, nAa = baidu.editor.ui.Popup, 
    oAa = baidu.editor.ui.SplitButton, pAa = baidu.editor.ui.ColorButton = function(e) {
        this.initOptions(e), this.initColorButton();
    }, pAa.prototype = {
        initColorButton: function() {
            var i = this;
            this.popup = new nAa({
                content: new mAa({
                    noColorText: i.editor.getLang("clearColor"),
                    editor: i.editor,
                    onpickcolor: function(e, t) {
                        i._onPickColor(t);
                    },
                    onpicknocolor: function(e, t) {
                        i._onPickNoColor(t);
                    }
                }),
                editor: i.editor
            }), this.initSplitButton();
        },
        _SplitButton_postRender: oAa.prototype.postRender,
        postRender: function() {
            this._SplitButton_postRender(), this.getDom("button_body").appendChild(lAa.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')), 
            this.getDom().className += " edui-colorbutton";
        },
        setColor: function(e) {
            this.getDom("colorlump").style.backgroundColor = e, this.color = e;
        },
        _onPickColor: function(e) {
            !1 !== this.fireEvent("pickcolor", e) && (this.setColor(e), this.popup.hide());
        },
        _onPickNoColor: function(e) {
            !1 !== this.fireEvent("picknocolor") && this.popup.hide();
        }
    }, kAa.inherits(pAa, oAa), GAa = baidu.editor.utils, HAa = baidu.editor.ui.Popup, 
    IAa = baidu.editor.ui.TablePicker, JAa = baidu.editor.ui.SplitButton, KAa = baidu.editor.ui.TableButton = function(e) {
        this.initOptions(e), this.initTableButton();
    }, KAa.prototype = {
        initTableButton: function() {
            var n = this;
            this.popup = new HAa({
                content: new IAa({
                    editor: n.editor,
                    onpicktable: function(e, t, i) {
                        n._onPickTable(t, i);
                    }
                }),
                editor: n.editor
            }), this.initSplitButton();
        },
        _onPickTable: function(e, t) {
            !1 !== this.fireEvent("picktable", e, t) && this.popup.hide();
        }
    }, GAa.inherits(KAa, JAa), VAa = baidu.editor.utils, WAa = baidu.editor.ui.UIBase, 
    XAa = baidu.editor.ui.AutoTypeSetPicker = function(e) {
        this.initOptions(e), this.initAutoTypeSetPicker();
    }, XAa.prototype = {
        initAutoTypeSetPicker: function() {
            this.initUIBase();
        },
        getHtmlTpl: function() {
            var e = this.editor, t = e.options.autotypeset, i = e.getLang("autoTypeSet"), n = "textAlignValue" + e.uid, o = "imageBlockLineValue" + e.uid, r = "symbolConverValue" + e.uid;
            return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (t.mergeEmptyline ? "checked" : "") + ">" + i.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (t.removeEmptyline ? "checked" : "") + ">" + i.delLine + '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (t.removeClass ? "checked" : "") + ">" + i.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (t.indent ? "checked" : "") + ">" + i.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (t.textAlign ? "checked" : "") + ">" + i.alignment + '</td><td colspan="2" id="' + n + '"><input type="radio" name="' + n + '" value="left" ' + (t.textAlign && "left" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + n + '" value="center" ' + (t.textAlign && "center" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + n + '" value="right" ' + (t.textAlign && "right" == t.textAlign ? "checked" : "") + ">" + e.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (t.imageBlockLine ? "checked" : "") + ">" + i.imageFloat + '</td><td nowrap id="' + o + '"><input type="radio" name="' + o + '" value="none" ' + (t.imageBlockLine && "none" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("default") + '<input type="radio" name="' + o + '" value="left" ' + (t.imageBlockLine && "left" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyleft") + '<input type="radio" name="' + o + '" value="center" ' + (t.imageBlockLine && "center" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifycenter") + '<input type="radio" name="' + o + '" value="right" ' + (t.imageBlockLine && "right" == t.imageBlockLine ? "checked" : "") + ">" + e.getLang("justifyright") + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (t.clearFontSize ? "checked" : "") + ">" + i.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (t.clearFontFamily ? "checked" : "") + ">" + i.removeFontFamily + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (t.removeEmptyNode ? "checked" : "") + ">" + i.removeHtml + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (t.pasteFilter ? "checked" : "") + ">" + i.pasteFilter + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (t.bdc2sb || t.tobdc ? "checked" : "") + ">" + i.symbol + '</td><td id="' + r + '"><input type="radio" name="bdc" value="bdc2sb" ' + (t.bdc2sb ? "checked" : "") + ">" + i.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (t.tobdc ? "checked" : "") + ">" + i.tobdc + '</td><td nowrap align="right"><button >' + i.run + "</button></td></tr></table></div></div>";
        },
        _UIBase_render: WAa.prototype.render
    }, VAa.inherits(XAa, WAa), function() {
        var p = baidu.editor.utils, e = baidu.editor.ui.Popup, i = baidu.editor.ui.AutoTypeSetPicker, t = baidu.editor.ui.SplitButton, n = baidu.editor.ui.AutoTypeSetButton = function(e) {
            this.initOptions(e), this.initAutoTypeSetButton();
        };
        function c(e) {
            for (var t, i = {}, n = e.getDom(), o = e.editor.uid, r = null, a = domUtils.getElementsByTagName(n, "input"), s = a.length - 1; t = a[s--]; ) if ("checkbox" == t.getAttribute("type")) if (i[r = t.getAttribute("name")] && delete i[r], 
            t.checked) {
                var l = document.getElementById(r + "Value" + o);
                if (l) {
                    if (/input/gi.test(l.tagName)) i[r] = l.value; else for (var d, c = l.getElementsByTagName("input"), u = c.length - 1; d = c[u--]; ) if (d.checked) {
                        i[r] = d.value;
                        break;
                    }
                } else i[r] = !0;
            } else i[r] = !1; else i[t.getAttribute("value")] = t.checked;
            var m, f = domUtils.getElementsByTagName(n, "select");
            for (s = 0; m = f[s++]; ) {
                var h = m.getAttribute("name");
                i[h] = i[h] ? m.value : "";
            }
            p.extend(e.editor.options.autotypeset, i), e.editor.setPreferences("autotypeset", i);
        }
        n.prototype = {
            initAutoTypeSetButton: function() {
                var d = this;
                this.popup = new e({
                    content: new i({
                        editor: d.editor
                    }),
                    editor: d.editor,
                    hide: function() {
                        !this._hidden && this.getDom() && (c(this), this.getDom().style.display = "none", 
                        this._hidden = !0, this.fireEvent("hide"));
                    }
                });
                var t = 0;
                this.popup.addListener("postRenderAfter", function() {
                    var l = this;
                    if (!t) {
                        var e = this.getDom();
                        e.getElementsByTagName("button")[0].onclick = function() {
                            c(l), d.editor.execCommand("autotypeset"), l.hide();
                        }, domUtils.on(e, "click", function(e) {
                            var t = e.target || e.srcElement, i = d.editor.uid;
                            if (t && "INPUT" == t.tagName) {
                                if ("imageBlockLine" == t.name || "textAlign" == t.name || "symbolConver" == t.name) for (var n = t.checked, o = document.getElementById(t.name + "Value" + i).getElementsByTagName("input"), r = {
                                    imageBlockLine: "none",
                                    textAlign: "left",
                                    symbolConver: "tobdc"
                                }, a = 0; a < o.length; a++) n ? o[a].value == r[t.name] && (o[a].checked = "checked") : o[a].checked = !1;
                                if (t.name == "imageBlockLineValue" + i || t.name == "textAlignValue" + i || "bdc" == t.name) {
                                    var s = t.parentNode.previousSibling.getElementsByTagName("input");
                                    s && (s[0].checked = !0);
                                }
                                c(l);
                            }
                        }), t = 1;
                    }
                }), this.initSplitButton();
            }
        }, p.inherits(n, t);
    }(), SBa = baidu.editor.utils, TBa = baidu.editor.ui.Popup, UBa = baidu.editor.ui.Stateful, 
    VBa = baidu.editor.ui.UIBase, WBa = baidu.editor.ui.CellAlignPicker = function(e) {
        this.initOptions(e), this.initSelected(), this.initCellAlignPicker();
    }, WBa.prototype = {
        initSelected: function() {
            var e = {
                top: 0,
                middle: 1,
                bottom: 2
            }, t = {
                left: 0,
                center: 1,
                right: 2
            }, i = 3;
            this.selected && (this.selectedIndex = e[this.selected.valign] * i + t[this.selected.align]);
        },
        initCellAlignPicker: function() {
            this.initUIBase(), this.Stateful_init();
        },
        getHtmlTpl: function() {
            for (var e = [ "left", "center", "right" ], t = null, i = -1, n = [], o = 0; o < 9; o++) t = this.selectedIndex === o ? ' class="edui-cellalign-selected" ' : "", 
            0 == (i = o % 3) && n.push("<tr>"), n.push('<td index="' + o + '" ' + t + ' stateful><div class="edui-icon edui-' + e[i] + '"></div></td>'), 
            2 === i && n.push("</tr>");
            return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + n.join("") + "</table></div></div>";
        },
        getStateDom: function() {
            return this.target;
        },
        _onClick: function(e) {
            var t = e.target || e.srcElement;
            /icon/.test(t.className) && (this.items[t.parentNode.getAttribute("index")].onclick(), 
            TBa.postHide(e));
        },
        _UIBase_render: VBa.prototype.render
    }, SBa.inherits(WBa, VBa), SBa.extend(WBa.prototype, UBa, !0), lCa = baidu.editor.utils, 
    mCa = baidu.editor.ui.Stateful, nCa = baidu.editor.ui.uiUtils, oCa = baidu.editor.ui.UIBase, 
    pCa = baidu.editor.ui.PastePicker = function(e) {
        this.initOptions(e), this.initPastePicker();
    }, pCa.prototype = {
        initPastePicker: function() {
            this.initUIBase(), this.Stateful_init();
        },
        getHtmlTpl: function() {
            return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang("pasteOpt") + '</div><div class="edui-button"><div title="' + this.editor.getLang("pasteSourceFormat") + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang("tagFormat") + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang("pasteTextFormat") + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>';
        },
        getStateDom: function() {
            return this.target;
        },
        format: function(e) {
            this.editor.ui._isTransfer = !0, this.editor.fireEvent("pasteTransfer", e);
        },
        _onClick: function(e) {
            var t = domUtils.getNextDomNode(e), i = nCa.getViewportRect().height, n = nCa.getClientRect(t);
            n.top + n.height > i ? t.style.top = -n.height - e.offsetHeight + "px" : t.style.top = "", 
            /hidden/gi.test(domUtils.getComputedStyle(t, "visibility")) ? (t.style.visibility = "visible", 
            domUtils.addClass(e, "edui-state-opened")) : (t.style.visibility = "hidden", domUtils.removeClasses(e, "edui-state-opened"));
        },
        _UIBase_render: oCa.prototype.render
    }, lCa.inherits(pCa, oCa), lCa.extend(pCa.prototype, mCa, !0), BCa = baidu.editor.utils, 
    CCa = baidu.editor.ui.uiUtils, DCa = baidu.editor.ui.UIBase, ECa = baidu.editor.ui.Toolbar = function(e) {
        this.initOptions(e), this.initToolbar();
    }, ECa.prototype = {
        items: null,
        initToolbar: function() {
            this.items = this.items || [], this.initUIBase();
        },
        add: function(e, t) {
            void 0 === t ? this.items.push(e) : this.items.splice(t, 0, e);
        },
        getHtmlTpl: function() {
            for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
            return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + e.join("") + "</div>";
        },
        postRender: function() {
            for (var e = this.getDom(), t = 0; t < this.items.length; t++) this.items[t].postRender();
            CCa.makeUnselectable(e);
        },
        _onMouseDown: function(e) {
            var t = e.target || e.srcElement, i = t && t.tagName && t.tagName.toLowerCase();
            if ("input" == i || "object" == i || "object" == i) return !1;
        }
    }, BCa.inherits(ECa, DCa), function() {
        var e = baidu.editor.utils, i = baidu.editor.dom.domUtils, o = baidu.editor.ui.uiUtils, t = baidu.editor.ui.UIBase, n = baidu.editor.ui.Popup, r = baidu.editor.ui.Stateful, a = baidu.editor.ui.CellAlignPicker, s = baidu.editor.ui.Menu = function(e) {
            this.initOptions(e), this.initMenu();
        }, l = {
            renderHtml: function() {
                return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>';
            },
            postRender: function() {},
            queryAutoHide: function() {
                return !0;
            }
        };
        s.prototype = {
            items: null,
            uiName: "menu",
            initMenu: function() {
                this.items = this.items || [], this.initPopup(), this.initItems();
            },
            initItems: function() {
                for (var e = 0; e < this.items.length; e++) {
                    var t = this.items[e];
                    "-" == t ? this.items[e] = this.getSeparator() : t instanceof d || (t.editor = this.editor, 
                    t.theme = this.editor.options.theme, this.items[e] = this.createItem(t));
                }
            },
            getSeparator: function() {
                return l;
            },
            createItem: function(e) {
                return e.menu = this, new d(e);
            },
            _Popup_getContentHtmlTpl: n.prototype.getContentHtmlTpl,
            getContentHtmlTpl: function() {
                if (0 == this.items.length) return this._Popup_getContentHtmlTpl();
                for (var e = [], t = 0; t < this.items.length; t++) {
                    var i = this.items[t];
                    e[t] = i.renderHtml();
                }
                return '<div class="%%-body">' + e.join("") + "</div>";
            },
            _Popup_postRender: n.prototype.postRender,
            postRender: function() {
                for (var n = this, e = 0; e < this.items.length; e++) {
                    var t = this.items[e];
                    t.ownerMenu = this, t.postRender();
                }
                i.on(this.getDom(), "mouseover", function(e) {
                    var t = (e = e || event).relatedTarget || e.fromElement, i = n.getDom();
                    o.contains(i, t) || i === t || n.fireEvent("over");
                }), this._Popup_postRender();
            },
            queryAutoHide: function(e) {
                if (e) {
                    if (o.contains(this.getDom(), e)) return !1;
                    for (var t = 0; t < this.items.length; t++) {
                        if (!1 === this.items[t].queryAutoHide(e)) return !1;
                    }
                }
            },
            clearItems: function() {
                for (var e = 0; e < this.items.length; e++) {
                    var t = this.items[e];
                    clearTimeout(t._showingTimer), clearTimeout(t._closingTimer), t.subMenu && t.subMenu.destroy();
                }
                this.items = [];
            },
            destroy: function() {
                this.getDom() && i.remove(this.getDom()), this.clearItems();
            },
            dispose: function() {
                this.destroy();
            }
        }, e.inherits(s, n);
        var d = baidu.editor.ui.MenuItem = function(e) {
            if (this.initOptions(e), this.initUIBase(), this.Stateful_init(), this.subMenu && !(this.subMenu instanceof s)) if (e.className && -1 != e.className.indexOf("aligntd")) {
                var t = this;
                this.subMenu.selected = this.editor.queryCommandValue("cellalignment"), this.subMenu = new n({
                    content: new a(this.subMenu),
                    parentMenu: t,
                    editor: t.editor,
                    destroy: function() {
                        this.getDom() && i.remove(this.getDom());
                    }
                }), this.subMenu.addListener("postRenderAfter", function() {
                    i.on(this.getDom(), "mouseover", function() {
                        t.addState("opened");
                    });
                });
            } else this.subMenu = new s(this.subMenu);
        };
        d.prototype = {
            label: "",
            subMenu: null,
            ownerMenu: null,
            uiName: "menuitem",
            alwalysHoverable: !0,
            getHtmlTpl: function() {
                return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + "</div></div>";
            },
            postRender: function() {
                var i = this;
                this.addListener("over", function() {
                    i.ownerMenu.fireEvent("submenuover", i), i.subMenu && i.delayShowSubMenu();
                }), this.subMenu && (this.getDom().className += " edui-hassubmenu", this.subMenu.render(), 
                this.addListener("out", function() {
                    i.delayHideSubMenu();
                }), this.subMenu.addListener("over", function() {
                    clearTimeout(i._closingTimer), i._closingTimer = null, i.addState("opened");
                }), this.ownerMenu.addListener("hide", function() {
                    i.hideSubMenu();
                }), this.ownerMenu.addListener("submenuover", function(e, t) {
                    t !== i && i.delayHideSubMenu();
                }), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function(e) {
                    return (!e || !o.contains(i.getDom(), e)) && this._bakQueryAutoHide(e);
                }), this.getDom().style.tabIndex = "-1", o.makeUnselectable(this.getDom()), this.Stateful_postRender();
            },
            delayShowSubMenu: function() {
                var e = this;
                e.isDisabled() || (e.addState("opened"), clearTimeout(e._showingTimer), clearTimeout(e._closingTimer), 
                e._closingTimer = null, e._showingTimer = setTimeout(function() {
                    e.showSubMenu();
                }, 250));
            },
            delayHideSubMenu: function() {
                var e = this;
                e.isDisabled() || (e.removeState("opened"), clearTimeout(e._showingTimer), e._closingTimer || (e._closingTimer = setTimeout(function() {
                    e.hasState("opened") || e.hideSubMenu(), e._closingTimer = null;
                }, 400)));
            },
            renderLabelHtml: function() {
                return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || "") + "</div>";
            },
            getStateDom: function() {
                return this.getDom();
            },
            queryAutoHide: function(e) {
                if (this.subMenu && this.hasState("opened")) return this.subMenu.queryAutoHide(e);
            },
            _onClick: function(e, t) {
                this.hasState("disabled") || !1 !== this.fireEvent("click", e, t) && (this.subMenu ? this.showSubMenu() : n.postHide(e));
            },
            showSubMenu: function() {
                var e = o.getClientRect(this.getDom());
                e.right -= 5, e.left += 2, e.width -= 7, e.top -= 4, e.bottom += 4, e.height += 8, 
                this.subMenu.showAnchorRect(e, !0, !0);
            },
            hideSubMenu: function() {
                this.subMenu.hide();
            }
        }, e.inherits(d, t), e.extend(d.prototype, r, !0);
    }(), cEa = baidu.editor.utils, dEa = baidu.editor.ui.uiUtils, eEa = baidu.editor.ui.Menu, 
    fEa = baidu.editor.ui.SplitButton, gEa = baidu.editor.ui.Combox = function(e) {
        this.initOptions(e), this.initCombox();
    }, gEa.prototype = {
        uiName: "combox",
        onbuttonclick: function() {
            this.showPopup();
        },
        initCombox: function() {
            var e = this;
            this.items = this.items || [];
            for (var t = 0; t < this.items.length; t++) {
                var i = this.items[t];
                i.uiName = "listitem", i.index = t, i.onclick = function() {
                    e.selectByIndex(this.index);
                };
            }
            this.popup = new eEa({
                items: this.items,
                uiName: "list",
                editor: this.editor,
                captureWheel: !0,
                combox: this
            }), this.initSplitButton();
        },
        _SplitButton_postRender: fEa.prototype.postRender,
        postRender: function() {
            this._SplitButton_postRender(), this.setLabel(this.label || ""), this.setValue(this.initValue || "");
        },
        showPopup: function() {
            var e = dEa.getClientRect(this.getDom());
            e.top += 1, e.bottom -= 1, e.height -= 2, this.popup.showAnchorRect(e);
        },
        getValue: function() {
            return this.value;
        },
        setValue: function(e) {
            var t = this.indexByValue(e);
            this.value = -1 != t ? (this.selectedIndex = t, this.setLabel(this.items[t].label), 
            this.items[t].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(e)), 
            e);
        },
        setLabel: function(e) {
            this.getDom("button_body").innerHTML = e, this.label = e;
        },
        getLabelForUnknowValue: function(e) {
            return e;
        },
        indexByValue: function(e) {
            for (var t = 0; t < this.items.length; t++) if (e == this.items[t].value) return t;
            return -1;
        },
        getItem: function(e) {
            return this.items[e];
        },
        selectByIndex: function(e) {
            e < this.items.length && !1 !== this.fireEvent("select", e) && (this.selectedIndex = e, 
            this.value = this.items[e].value, this.setLabel(this.items[e].label));
        }
    }, cEa.inherits(gEa, fEa), FEa = baidu.editor.utils, GEa = baidu.editor.dom.domUtils, 
    HEa = baidu.editor.ui.uiUtils, IEa = baidu.editor.ui.Mask, JEa = baidu.editor.ui.UIBase, 
    KEa = baidu.editor.ui.Button, LEa = baidu.editor.ui.Dialog = function(e) {
        if (e.name) {
            var t = e.name, i = e.cssRules;
            e.className || (e.className = "edui-for-" + t), i && (e.cssRules = ".edui-for-" + t + " .edui-dialog-content  {" + i + "}");
        }
        this.initOptions(FEa.extend({
            autoReset: !0,
            draggable: !0,
            onok: function() {},
            oncancel: function() {},
            onclose: function(e, t) {
                return t ? this.onok() : this.oncancel();
            },
            holdScroll: !1
        }, e)), this.initDialog();
    }, LEa.prototype = {
        draggable: !1,
        uiName: "dialog",
        initDialog: function() {
            var e = this, t = this.editor.options.theme;
            if (this.cssRules && (this.cssRules = ".edui-" + t + " " + this.cssRules, FEa.cssRule("edui-customize-" + this.name + "-style", this.cssRules)), 
            this.initUIBase(), this.modalMask = MEa || (MEa = new IEa({
                className: "edui-dialog-modalmask",
                theme: t,
                onclick: function() {
                    OEa && OEa.close(!1);
                }
            })), this.dragMask = NEa || (NEa = new IEa({
                className: "edui-dialog-dragmask",
                theme: t
            })), this.closeButton = new KEa({
                className: "edui-dialog-closebutton",
                title: e.closeDialog,
                theme: t,
                onclick: function() {
                    e.close(!1);
                }
            }), this.fullscreen && this.initResizeEvent(), this.buttons) for (var i = 0; i < this.buttons.length; i++) this.buttons[i] instanceof KEa || (this.buttons[i] = new KEa(FEa.extend(this.buttons[i], {
                editor: this.editor
            }, !0)));
        },
        initResizeEvent: function() {
            var r = this;
            GEa.on(window, "resize", function() {
                r._hidden || void 0 === r._hidden || (r.__resizeTimer && window.clearTimeout(r.__resizeTimer), 
                r.__resizeTimer = window.setTimeout(function() {
                    r.__resizeTimer = null;
                    var e = r.getDom(), t = r.getDom("content"), i = UE.ui.uiUtils.getClientRect(e), n = UE.ui.uiUtils.getClientRect(t), o = HEa.getViewportRect();
                    t.style.width = o.width - i.width + n.width + "px", t.style.height = o.height - i.height + n.height + "px", 
                    e.style.width = o.width + "px", e.style.height = o.height + "px", r.fireEvent("resize");
                }, 100));
            });
        },
        fitSize: function() {
            var e = this.getDom("body"), t = this.mesureSize();
            return e.style.width = t.width + "px", e.style.height = t.height + "px", t;
        },
        safeSetOffset: function(e) {
            var t = this.getDom(), i = HEa.getViewportRect(), n = HEa.getClientRect(t), o = e.left;
            o + n.width > i.right && (o = i.right - n.width);
            var r = e.top;
            r + n.height > i.bottom && (r = i.bottom - n.height), t.style.left = Math.max(o, 0) + "px", 
            t.style.top = Math.max(r, 0) + "px";
        },
        showAtCenter: function() {
            var e = HEa.getViewportRect();
            if (this.fullscreen) {
                var t = this.getDom(), i = this.getDom("content");
                t.style.display = "block";
                var n = UE.ui.uiUtils.getClientRect(t), o = UE.ui.uiUtils.getClientRect(i);
                t.style.left = "-100000px", i.style.width = e.width - n.width + o.width + "px", 
                i.style.height = e.height - n.height + o.height + "px", t.style.width = e.width + "px", 
                t.style.height = e.height + "px", t.style.left = 0, this._originalContext = {
                    html: {
                        overflowX: document.documentElement.style.overflowX,
                        overflowY: document.documentElement.style.overflowY
                    },
                    body: {
                        overflowX: document.body.style.overflowX,
                        overflowY: document.body.style.overflowY
                    }
                }, document.documentElement.style.overflowX = "hidden", document.documentElement.style.overflowY = "hidden", 
                document.body.style.overflowX = "hidden", document.body.style.overflowY = "hidden";
            } else {
                this.getDom().style.display = "";
                var r = this.fitSize(), a = 0 | this.getDom("titlebar").offsetHeight, s = e.width / 2 - r.width / 2, l = e.height / 2 - (r.height - a) / 2 - a, d = this.getDom();
                this.safeSetOffset({
                    left: Math.max(0 | s, 0),
                    top: Math.max(0 | l, 0)
                }), GEa.hasClass(d, "edui-state-centered") || (d.className += " edui-state-centered");
            }
            this._show();
        },
        getContentHtml: function() {
            var e = "";
            return "string" == typeof this.content ? e = this.content : this.iframeUrl && (e = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>'), 
            e;
        },
        getHtmlTpl: function() {
            var e = "";
            if (this.buttons) {
                for (var t = [], i = 0; i < this.buttons.length; i++) t[i] = this.buttons[i].renderHtml();
                e = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + t.join("") + "</div></div>";
            }
            return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || "") + "</span></div>" + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? "" : this.getContentHtml()) + "</div>" + e + "</div></div></div>";
        },
        postRender: function() {
            this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide()), this.dragMask.getDom() || (this.dragMask.render(), 
            this.dragMask.hide());
            var e = this;
            if (this.addListener("show", function() {
                e.modalMask.show(this.getDom().style.zIndex - 2);
            }), this.addListener("hide", function() {
                e.modalMask.hide();
            }), this.buttons) for (var t = 0; t < this.buttons.length; t++) this.buttons[t].postRender();
            GEa.on(window, "resize", function() {
                setTimeout(function() {
                    e.isHidden() || e.safeSetOffset(HEa.getClientRect(e.getDom()));
                });
            }), this._hide();
        },
        mesureSize: function() {
            var e = this.getDom("body"), t = HEa.getClientRect(this.getDom("content")).width;
            return e.style.width = t, HEa.getClientRect(e);
        },
        _onTitlebarMouseDown: function(e, t) {
            if (this.draggable) {
                HEa.getViewportRect();
                var o, r = this;
                HEa.startDrag(e, {
                    ondragstart: function() {
                        o = HEa.getClientRect(r.getDom()), r.getDom("contmask").style.visibility = "visible", 
                        r.dragMask.show(r.getDom().style.zIndex - 1);
                    },
                    ondragmove: function(e, t) {
                        var i = o.left + e, n = o.top + t;
                        r.safeSetOffset({
                            left: i,
                            top: n
                        });
                    },
                    ondragstop: function() {
                        r.getDom("contmask").style.visibility = "hidden", GEa.removeClasses(r.getDom(), [ "edui-state-centered" ]), 
                        r.dragMask.hide();
                    }
                });
            }
        },
        reset: function() {
            this.getDom("content").innerHTML = this.getContentHtml(), this.fireEvent("dialogafterreset");
        },
        _show: function() {
            this._hidden && (this.getDom().style.display = "", this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), 
            this._hidden = !1, this.fireEvent("show"), baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4);
        },
        isHidden: function() {
            return this._hidden;
        },
        _hide: function() {
            if (!this._hidden) {
                var e = this.getDom();
                e.style.display = "none", e.style.zIndex = "", e.style.width = "", e.style.height = "", 
                this._hidden = !0, this.fireEvent("hide");
            }
        },
        open: function() {
            if (this.autoReset) try {
                this.reset();
            } catch (e) {
                this.render(), this.open();
            }
            if (this.showAtCenter(), this.iframeUrl) try {
                this.getDom("iframe").focus();
            } catch (e) {}
            OEa = this;
        },
        _onCloseButtonClick: function(e, t) {
            this.close(!1);
        },
        close: function(e) {
            if (!1 !== this.fireEvent("close", e)) {
                this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, 
                document.documentElement.style.overflowY = this._originalContext.html.overflowY, 
                document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, 
                delete this._originalContext), this._hide();
                var t = this.getDom("content"), i = this.getDom("iframe");
                if (t && i) {
                    var n = i.contentDocument || i.contentWindow.document;
                    n && (n.body.innerHTML = ""), GEa.remove(t);
                }
            }
        }
    }, FEa.inherits(LEa, JEa), sGa = baidu.editor.utils, tGa = baidu.editor.ui.Menu, 
    uGa = baidu.editor.ui.SplitButton, vGa = baidu.editor.ui.MenuButton = function(e) {
        this.initOptions(e), this.initMenuButton();
    }, vGa.prototype = {
        initMenuButton: function() {
            var t = this;
            this.uiName = "menubutton", this.popup = new tGa({
                items: t.items,
                className: t.className,
                editor: t.editor
            }), this.popup.addListener("show", function() {
                for (var e = 0; e < this.items.length; e++) this.items[e].removeState("checked"), 
                this.items[e].value == t._value && (this.items[e].addState("checked"), this.value = t._value);
            }), this.initSplitButton();
        },
        setValue: function(e) {
            this._value = e;
        }
    }, sGa.inherits(vGa, uGa), DGa = baidu.editor.utils, EGa = baidu.editor.ui.Popup, 
    FGa = baidu.editor.ui.SplitButton, GGa = baidu.editor.ui.MultiMenuPop = function(e) {
        this.initOptions(e), this.initMultiMenu();
    }, GGa.prototype = {
        initMultiMenu: function() {
            var e = this;
            this.popup = new EGa({
                content: "",
                editor: e.editor,
                iframe_rendered: !1,
                onshow: function() {
                    this.iframe_rendered || (this.iframe_rendered = !0, this.getDom("content").innerHTML = '<iframe id="' + e.id + '_iframe" src="' + e.iframeUrl + '" frameborder="0"></iframe>', 
                    e.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * e.editor.container.style.zIndex + 1));
                }
            }), this.onbuttonclick = function() {
                this.showPopup();
            }, this.initSplitButton();
        }
    }, DGa.inherits(GGa, FGa), function() {
        var c, n = baidu.editor.ui, e = n.UIBase, d = n.uiUtils, o = baidu.editor.utils, u = baidu.editor.dom.domUtils, r = [], a = !1, t = n.ShortCutMenu = function(e) {
            this.initOptions(e), this.initShortCutMenu();
        };
        function i(e) {
            var t = e.target || e.srcElement;
            if (!u.findParent(t, function(e) {
                return u.hasClass(e, "edui-shortcutmenu") || u.hasClass(e, "edui-popup");
            }, !0)) for (var i, n = 0; i = r[n++]; ) i.hide();
        }
        t.postHide = i, t.prototype = {
            isHidden: !0,
            SPACE: 5,
            initShortCutMenu: function() {
                this.items = this.items || [], this.initUIBase(), this.initItems(), this.initEvent(), 
                r.push(this);
            },
            initEvent: function() {
                var d = this, e = d.editor.document;
                u.on(e, "mousemove", function(e) {
                    if (!1 === d.isHidden) {
                        if (d.getSubMenuMark() || "contextmenu" == d.eventType) return;
                        var t = !0, i = d.getDom(), n = i.offsetWidth, o = i.offsetHeight, r = n / 2 + d.SPACE, a = o / 2, s = Math.abs(e.screenX - d.left), l = Math.abs(e.screenY - d.top);
                        clearTimeout(c), c = setTimeout(function() {
                            0 < l && l < a ? d.setOpacity(i, "1") : a < l && l < a + 70 ? (d.setOpacity(i, "0.5"), 
                            t = !1) : a + 70 < l && l < a + 140 && d.hide(), t && 0 < s && s < r ? d.setOpacity(i, "1") : r < s && s < r + 70 ? d.setOpacity(i, "0.5") : r + 70 < s && s < r + 140 && d.hide();
                        });
                    }
                }), browser.chrome && u.on(e, "mouseout", function(e) {
                    var t = e.relatedTarget || e.toElement;
                    null != t && "HTML" != t.tagName || d.hide();
                }), d.editor.addListener("afterhidepop", function() {
                    d.isHidden || (a = !0);
                });
            },
            initItems: function() {
                if (o.isArray(this.items)) for (var e = 0, t = this.items.length; e < t; e++) {
                    var i = this.items[e].toLowerCase();
                    n[i] && (this.items[e] = new n[i](this.editor), this.items[e].className += " edui-shortcutsubmenu ");
                }
            },
            setOpacity: function(e, t) {
                browser.ie && browser.version < 9 ? e.style.filter = "alpha(opacity = " + 100 * parseFloat(t) + ");" : e.style.opacity = t;
            },
            getSubMenuMark: function() {
                a = !1;
                for (var e, t = d.getFixedLayer(), i = u.getElementsByTagName(t, "div", function(e) {
                    return u.hasClass(e, "edui-shortcutsubmenu edui-popup");
                }), n = 0; e = i[n++]; ) "none" != e.style.display && (a = !0);
                return a;
            },
            show: function(e, t) {
                var i = this, n = {}, o = this.getDom(), r = d.getFixedLayer();
                function a(e) {
                    e.left < 0 && (e.left = 0), e.top < 0 && (e.top = 0), o.style.cssText = "position:absolute;left:" + e.left + "px;top:" + e.top + "px;";
                }
                function s(e) {
                    e.tagName || (e = e.getDom()), n.left = parseInt(e.style.left), n.top = parseInt(e.style.top), 
                    n.top -= o.offsetHeight + 15, a(n);
                }
                if (i.eventType = e.type, o.style.cssText = "display:block;left:-9999px", "contextmenu" == e.type && t) {
                    var l = u.getElementsByTagName(r, "div", "edui-contextmenu")[0];
                    l ? s(l) : i.editor.addListener("aftershowcontextmenu", function(e, t) {
                        s(t);
                    });
                } else (n = d.getViewportOffsetByEvent(e)).top -= o.offsetHeight + i.SPACE, n.left += i.SPACE + 20, 
                a(n), i.setOpacity(o, .2);
                i.isHidden = !1, i.left = e.screenX + o.offsetWidth / 2 - i.SPACE, i.top = e.screenY - o.offsetHeight / 2 - i.SPACE, 
                i.editor && (o.style.zIndex = 1 * i.editor.container.style.zIndex + 10, r.style.zIndex = o.style.zIndex - 1);
            },
            hide: function() {
                this.getDom() && (this.getDom().style.display = "none"), this.isHidden = !0;
            },
            postRender: function() {
                if (o.isArray(this.items)) for (var e, t = 0; e = this.items[t++]; ) e.postRender();
            },
            getHtmlTpl: function() {
                var e;
                if (o.isArray(this.items)) {
                    e = [];
                    for (var t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml();
                    e = e.join("");
                } else e = this.items;
                return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + e + "</div>";
            }
        }, o.inherits(t, e), u.on(document, "mousedown", function(e) {
            i(e);
        }), u.on(window, "scroll", function(e) {
            i(e);
        });
    }(), ZHa = baidu.editor.utils, $Ha = baidu.editor.ui.UIBase, _Ha = baidu.editor.ui.Breakline = function(e) {
        this.initOptions(e), this.initSeparator();
    }, _Ha.prototype = {
        uiName: "Breakline",
        initSeparator: function() {
            this.initUIBase();
        },
        getHtmlTpl: function() {
            return "<br/>";
        }
    }, ZHa.inherits(_Ha, $Ha), dIa = baidu.editor.utils, eIa = baidu.editor.dom.domUtils, 
    fIa = baidu.editor.ui.UIBase, gIa = baidu.editor.ui.Message = function(e) {
        this.initOptions(e), this.initMessage();
    }, gIa.prototype = {
        initMessage: function() {
            this.initUIBase();
        },
        getHtmlTpl: function() {
            return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">×</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>';
        },
        reset: function(e) {
            var t = this;
            e.keepshow || (clearTimeout(this.timer), t.timer = setTimeout(function() {
                t.hide();
            }, e.timeout || 4e3)), void 0 !== e.content && t.setContent(e.content), void 0 !== e.type && t.setType(e.type), 
            t.show();
        },
        postRender: function() {
            var e = this, t = this.getDom("closer");
            t && eIa.on(t, "click", function() {
                e.hide();
            });
        },
        setContent: function(e) {
            this.getDom("content").innerHTML = e;
        },
        setType: function(e) {
            e = e || "info";
            var t = this.getDom("body");
            t.className = t.className.replace(/edui-message-type-[\w-]+/, "edui-message-type-" + e);
        },
        getContent: function() {
            return this.getDom("content").innerHTML;
        },
        getType: function() {
            var e = this.getDom("body").match(/edui-message-type-([\w-]+)/);
            return e ? e[1] : "";
        },
        show: function() {
            this.getDom().style.display = "block";
        },
        hide: function() {
            var e = this.getDom();
            e && (e.style.display = "none", e.parentNode && e.parentNode.removeChild(e));
        }
    }, dIa.inherits(gIa, fIa), function() {
        var c = baidu.editor.utils, u = baidu.editor.ui, t = u.Dialog;
        u.buttons = {}, u.Dialog = function(e) {
            var n = new t(e);
            return n.addListener("hide", function() {
                if (n.editor) {
                    var e = n.editor;
                    try {
                        if (browser.gecko) {
                            var t = e.window.scrollY, i = e.window.scrollX;
                            e.body.focus(), e.window.scrollTo(i, t);
                        } else e.focus();
                    } catch (e) {}
                }
            }), n;
        };
        for (var s = {
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
        }, e = [ "undo", "redo", "formatmatch", "bold", "italic", "underline", "fontborder", "touppercase", "tolowercase", "strikethrough", "subscript", "superscript", "source", "indent", "outdent", "blockquote", "pasteplain", "pagebreak", "selectall", "print", "horizontal", "removeformat", "time", "date", "unlink", "insertparagraphbeforetable", "insertrow", "insertcol", "mergeright", "mergedown", "deleterow", "deletecol", "splittorows", "splittocols", "splittocells", "mergecells", "deletetable", "drafts" ], i = 0; r = e[i++]; ) r = r.toLowerCase(), 
        u[r] = function(a) {
            return function(o) {
                var r = new u.Button({
                    className: "edui-for-" + a,
                    title: o.options.labelMap[a] || o.getLang("labelMap." + a) || "",
                    onclick: function() {
                        o.execCommand(a);
                    },
                    theme: o.options.theme,
                    showText: !1
                });
                return u.buttons[a] = r, o.addListener("selectionchange", function(e, t, i) {
                    var n = o.queryCommandState(a);
                    -1 == n ? (r.setDisabled(!0), r.setChecked(!1)) : i || (r.setDisabled(!1), r.setChecked(n));
                }), r;
            };
        }(r);
        u.cleardoc = function(e) {
            var t = new u.Button({
                className: "edui-for-cleardoc",
                title: e.options.labelMap.cleardoc || e.getLang("labelMap.cleardoc") || "",
                theme: e.options.theme,
                onclick: function() {
                    confirm(e.getLang("confirmClear")) && e.execCommand("cleardoc");
                }
            });
            return u.buttons.cleardoc = t, e.addListener("selectionchange", function() {
                t.setDisabled(-1 == e.queryCommandState("cleardoc"));
            }), t;
        };
        var n = {
            justify: [ "left", "right", "center", "justify" ],
            imagefloat: [ "none", "left", "center", "right" ],
            directionality: [ "ltr", "rtl" ]
        };
        for (var o in n) !function(a, e) {
            for (var t, i = 0; t = e[i++]; ) !function(r) {
                u[a.replace("float", "") + r] = function(n) {
                    var o = new u.Button({
                        className: "edui-for-" + a.replace("float", "") + r,
                        title: n.options.labelMap[a.replace("float", "") + r] || n.getLang("labelMap." + a.replace("float", "") + r) || "",
                        theme: n.options.theme,
                        onclick: function() {
                            n.execCommand(a, r);
                        }
                    });
                    return u.buttons[a] = o, n.addListener("selectionchange", function(e, t, i) {
                        o.setDisabled(-1 == n.queryCommandState(a)), o.setChecked(n.queryCommandValue(a) == r && !i);
                    }), o;
                };
            }(t);
        }(o, n[o]);
        var r;
        for (i = 0; r = [ "backcolor", "forecolor" ][i++]; ) u[r] = function(n) {
            return function(i) {
                var e = new u.ColorButton({
                    className: "edui-for-" + n,
                    color: "default",
                    title: i.options.labelMap[n] || i.getLang("labelMap." + n) || "",
                    editor: i,
                    onpickcolor: function(e, t) {
                        i.execCommand(n, t);
                    },
                    onpicknocolor: function() {
                        i.execCommand(n, "default"), this.setColor("transparent"), this.color = "default";
                    },
                    onbuttonclick: function() {
                        i.execCommand(n, this.color);
                    }
                });
                return u.buttons[n] = e, i.addListener("selectionchange", function() {
                    e.setDisabled(-1 == i.queryCommandState(n));
                }), e;
            };
        }(r);
        var a = {
            noOk: [ "searchreplace", "help", "spechars", "preview" ],
            ok: [ "attachment", "anchor", "link", "insertimage", "map", "gmap", "insertframe", "wordimage", "insertvideo", "insertframe", "edittip", "edittable", "edittd", "scrawl", "template", "background", "charts" ]
        };
        for (var o in a) !function(a, e) {
            for (var t, i = 0; t = e[i++]; ) browser.opera && "searchreplace" === t || function(r) {
                u[r] = function(t, e, i) {
                    var n;
                    e = e || (t.options.iframeUrlMap || {})[r] || s[r], i = t.options.labelMap[r] || t.getLang("labelMap." + r) || "", 
                    e && (n = new u.Dialog(c.extend({
                        iframeUrl: t.ui.mapUrl(e),
                        editor: t,
                        className: "edui-for-" + r,
                        title: i,
                        holdScroll: "insertimage" === r,
                        fullscreen: /charts|preview/.test(r),
                        closeDialog: t.getLang("closeDialog")
                    }, "ok" == a ? {
                        buttons: [ {
                            className: "edui-okbutton",
                            label: t.getLang("ok"),
                            editor: t,
                            onclick: function() {
                                n.close(!0);
                            }
                        }, {
                            className: "edui-cancelbutton",
                            label: t.getLang("cancel"),
                            editor: t,
                            onclick: function() {
                                n.close(!1);
                            }
                        } ]
                    } : {})), t.ui._dialogs[r + "Dialog"] = n);
                    var o = new u.Button({
                        className: "edui-for-" + r,
                        title: i,
                        onclick: function() {
                            if (n) switch (r) {
                              case "wordimage":
                                var e = t.execCommand("wordimage");
                                e && e.length && (n.render(), n.open());
                                break;

                              case "scrawl":
                                -1 != t.queryCommandState("scrawl") && (n.render(), n.open());
                                break;

                              default:
                                n.render(), n.open();
                            }
                        },
                        theme: t.options.theme,
                        disabled: "scrawl" == r && -1 == t.queryCommandState("scrawl") || "charts" == r
                    });
                    return u.buttons[r] = o, t.addListener("selectionchange", function() {
                        if (!(r in {
                            edittable: 1
                        })) {
                            var e = t.queryCommandState(r);
                            o.getDom() && (o.setDisabled(-1 == e), o.setChecked(e));
                        }
                    }), o;
                };
            }(t.toLowerCase());
        }(o, a[o]);
        u.insertcode = function(o, e, r) {
            e = o.options.insertcode || [], r = o.options.labelMap.insertcode || o.getLang("labelMap.insertcode") || "";
            var i = [];
            c.each(e, function(e, t) {
                i.push({
                    label: e,
                    value: t,
                    theme: o.options.theme,
                    renderLabelHtml: function() {
                        return '<div class="edui-label %%-label" >' + (this.label || "") + "</div>";
                    }
                });
            });
            var a = new u.Combox({
                editor: o,
                items: i,
                onselect: function(e, t) {
                    o.execCommand("insertcode", this.items[t].value);
                },
                onbuttonclick: function() {
                    this.showPopup();
                },
                title: r,
                initValue: r,
                className: "edui-for-insertcode",
                indexByValue: function(e) {
                    if (e) for (var t, i = 0; t = this.items[i]; i++) if (-1 != t.value.indexOf(e)) return i;
                    return -1;
                }
            });
            return u.buttons.insertcode = a, o.addListener("selectionchange", function(e, t, i) {
                if (!i) if (-1 == o.queryCommandState("insertcode")) a.setDisabled(!0); else {
                    a.setDisabled(!1);
                    var n = o.queryCommandValue("insertcode");
                    if (!n) return void a.setValue(r);
                    n && (n = n.replace(/['"]/g, "").split(",")[0]), a.setValue(n);
                }
            }), a;
        }, u.fontfamily = function(o, e, t) {
            if (e = o.options.fontfamily || [], t = o.options.labelMap.fontfamily || o.getLang("labelMap.fontfamily") || "", 
            e.length) {
                for (var i, n = 0, r = []; i = e[n]; n++) {
                    var a = o.getLang("fontfamily")[i.name] || "";
                    s = i.label || a, l = i.val, r.push({
                        label: s,
                        value: l,
                        theme: o.options.theme,
                        renderLabelHtml: function() {
                            return '<div class="edui-label %%-label" style="font-family:' + c.unhtml(this.value) + '">' + (this.label || "") + "</div>";
                        }
                    });
                }
                var s, l, d = new u.Combox({
                    editor: o,
                    items: r,
                    onselect: function(e, t) {
                        o.execCommand("FontFamily", this.items[t].value);
                    },
                    onbuttonclick: function() {
                        this.showPopup();
                    },
                    title: t,
                    initValue: t,
                    className: "edui-for-fontfamily",
                    indexByValue: function(e) {
                        if (e) for (var t, i = 0; t = this.items[i]; i++) if (-1 != t.value.indexOf(e)) return i;
                        return -1;
                    }
                });
                return u.buttons.fontfamily = d, o.addListener("selectionchange", function(e, t, i) {
                    if (!i) if (-1 == o.queryCommandState("FontFamily")) d.setDisabled(!0); else {
                        d.setDisabled(!1);
                        var n = o.queryCommandValue("FontFamily");
                        n && (n = n.replace(/['"]/g, "").split(",")[0]), d.setValue(n);
                    }
                }), d;
            }
        }, u.fontsize = function(n, e, t) {
            if (t = n.options.labelMap.fontsize || n.getLang("labelMap.fontsize") || "", (e = e || n.options.fontsize || []).length) {
                for (var i = [], o = 0; o < e.length; o++) {
                    var r = e[o] + "px";
                    i.push({
                        label: r,
                        value: r,
                        theme: n.options.theme,
                        renderLabelHtml: function() {
                            return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || "") + "</div>";
                        }
                    });
                }
                var a = new u.Combox({
                    editor: n,
                    items: i,
                    title: t,
                    initValue: t,
                    onselect: function(e, t) {
                        n.execCommand("FontSize", this.items[t].value);
                    },
                    onbuttonclick: function() {
                        this.showPopup();
                    },
                    className: "edui-for-fontsize"
                });
                return u.buttons.fontsize = a, n.addListener("selectionchange", function(e, t, i) {
                    i || (-1 == n.queryCommandState("FontSize") ? a.setDisabled(!0) : (a.setDisabled(!1), 
                    a.setValue(n.queryCommandValue("FontSize"))));
                }), a;
            }
        }, u.paragraph = function(o, e, t) {
            if (t = o.options.labelMap.paragraph || o.getLang("labelMap.paragraph") || "", e = o.options.paragraph || [], 
            !c.isEmptyObject(e)) {
                var i = [];
                for (var n in e) i.push({
                    value: n,
                    label: e[n] || o.getLang("paragraph")[n],
                    theme: o.options.theme,
                    renderLabelHtml: function() {
                        return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || "") + "</span></div>";
                    }
                });
                var r = new u.Combox({
                    editor: o,
                    items: i,
                    title: t,
                    initValue: t,
                    className: "edui-for-paragraph",
                    onselect: function(e, t) {
                        o.execCommand("Paragraph", this.items[t].value);
                    },
                    onbuttonclick: function() {
                        this.showPopup();
                    }
                });
                return u.buttons.paragraph = r, o.addListener("selectionchange", function(e, t, i) {
                    if (!i) if (-1 == o.queryCommandState("Paragraph")) r.setDisabled(!0); else {
                        r.setDisabled(!1);
                        var n = o.queryCommandValue("Paragraph");
                        -1 != r.indexByValue(n) ? r.setValue(n) : r.setValue(r.initValue);
                    }
                }), r;
            }
        }, u.customstyle = function(o) {
            var e = o.options.customstyle || [], t = o.options.labelMap.customstyle || o.getLang("labelMap.customstyle") || "";
            if (e.length) {
                for (var i, n = o.getLang("customstyle"), r = 0, a = []; i = e[r++]; ) !function(e) {
                    var t = {};
                    t.label = e.label ? e.label : n[e.name], t.style = e.style, t.className = e.className, 
                    t.tag = e.tag, a.push({
                        label: t.label,
                        value: t,
                        theme: o.options.theme,
                        renderLabelHtml: function() {
                            return '<div class="edui-label %%-label"><' + t.tag + " " + (t.className ? ' class="' + t.className + '"' : "") + (t.style ? ' style="' + t.style + '"' : "") + ">" + t.label + "</" + t.tag + "></div>";
                        }
                    });
                }(i);
                var s = new u.Combox({
                    editor: o,
                    items: a,
                    title: t,
                    initValue: t,
                    className: "edui-for-customstyle",
                    onselect: function(e, t) {
                        o.execCommand("customstyle", this.items[t].value);
                    },
                    onbuttonclick: function() {
                        this.showPopup();
                    },
                    indexByValue: function(e) {
                        for (var t, i = 0; t = this.items[i++]; ) if (t.label == e) return i - 1;
                        return -1;
                    }
                });
                return u.buttons.customstyle = s, o.addListener("selectionchange", function(e, t, i) {
                    if (!i) if (-1 == o.queryCommandState("customstyle")) s.setDisabled(!0); else {
                        s.setDisabled(!1);
                        var n = o.queryCommandValue("customstyle");
                        -1 != s.indexByValue(n) ? s.setValue(n) : s.setValue(s.initValue);
                    }
                }), s;
            }
        }, u.inserttable = function(n, e, t) {
            t = n.options.labelMap.inserttable || n.getLang("labelMap.inserttable") || "";
            var i = new u.TableButton({
                editor: n,
                title: t,
                className: "edui-for-inserttable",
                onpicktable: function(e, t, i) {
                    n.execCommand("InsertTable", {
                        numRows: i,
                        numCols: t,
                        border: 1
                    });
                },
                onbuttonclick: function() {
                    this.showPopup();
                }
            });
            return u.buttons.inserttable = i, n.addListener("selectionchange", function() {
                i.setDisabled(-1 == n.queryCommandState("inserttable"));
            }), i;
        }, u.lineheight = function(i) {
            var e = i.options.lineheight || [];
            if (e.length) {
                for (var t, n = 0, o = []; t = e[n++]; ) o.push({
                    label: t,
                    value: t,
                    theme: i.options.theme,
                    onclick: function() {
                        i.execCommand("lineheight", this.value);
                    }
                });
                var r = new u.MenuButton({
                    editor: i,
                    className: "edui-for-lineheight",
                    title: i.options.labelMap.lineheight || i.getLang("labelMap.lineheight") || "",
                    items: o,
                    onbuttonclick: function() {
                        var e = i.queryCommandValue("LineHeight") || this.value;
                        i.execCommand("LineHeight", e);
                    }
                });
                return u.buttons.lineheight = r, i.addListener("selectionchange", function() {
                    var e = i.queryCommandState("LineHeight");
                    if (-1 == e) r.setDisabled(!0); else {
                        r.setDisabled(!1);
                        var t = i.queryCommandValue("LineHeight");
                        t && r.setValue((t + "").replace(/cm/, "")), r.setChecked(e);
                    }
                }), r;
            }
        };
        for (var l, d = [ "top", "bottom" ], m = 0; l = d[m++]; ) !function(a) {
            u["rowspacing" + a] = function(i) {
                var e = i.options["rowspacing" + a] || [];
                if (!e.length) return null;
                for (var t, n = 0, o = []; t = e[n++]; ) o.push({
                    label: t,
                    value: t,
                    theme: i.options.theme,
                    onclick: function() {
                        i.execCommand("rowspacing", this.value, a);
                    }
                });
                var r = new u.MenuButton({
                    editor: i,
                    className: "edui-for-rowspacing" + a,
                    title: i.options.labelMap["rowspacing" + a] || i.getLang("labelMap.rowspacing" + a) || "",
                    items: o,
                    onbuttonclick: function() {
                        var e = i.queryCommandValue("rowspacing", a) || this.value;
                        i.execCommand("rowspacing", e, a);
                    }
                });
                return u.buttons[a] = r, i.addListener("selectionchange", function() {
                    var e = i.queryCommandState("rowspacing", a);
                    if (-1 == e) r.setDisabled(!0); else {
                        r.setDisabled(!1);
                        var t = i.queryCommandValue("rowspacing", a);
                        t && r.setValue((t + "").replace(/%/, "")), r.setChecked(e);
                    }
                }), r;
            };
        }(l);
        for (var f, h = [ "insertorderedlist", "insertunorderedlist" ], p = 0; f = h[p++]; ) !function(a) {
            u[a] = function(i) {
                var e = i.options[a], t = function() {
                    i.execCommand(a, this.value);
                }, n = [];
                for (var o in e) n.push({
                    label: e[o] || i.getLang()[a][o] || "",
                    value: o,
                    theme: i.options.theme,
                    onclick: t
                });
                var r = new u.MenuButton({
                    editor: i,
                    className: "edui-for-" + a,
                    title: i.getLang("labelMap." + a) || "",
                    items: n,
                    onbuttonclick: function() {
                        var e = i.queryCommandValue(a) || this.value;
                        i.execCommand(a, e);
                    }
                });
                return u.buttons[a] = r, i.addListener("selectionchange", function() {
                    var e = i.queryCommandState(a);
                    if (-1 == e) r.setDisabled(!0); else {
                        r.setDisabled(!1);
                        var t = i.queryCommandValue(a);
                        r.setValue(t), r.setChecked(e);
                    }
                }), r;
            };
        }(f);
        u.fullscreen = function(t, e) {
            e = t.options.labelMap.fullscreen || t.getLang("labelMap.fullscreen") || "";
            var i = new u.Button({
                className: "edui-for-fullscreen",
                title: e,
                theme: t.options.theme,
                onclick: function() {
                    t.ui && t.ui.setFullScreen(!t.ui.isFullScreen()), this.setChecked(t.ui.isFullScreen());
                }
            });
            return u.buttons.fullscreen = i, t.addListener("selectionchange", function() {
                var e = t.queryCommandState("fullscreen");
                i.setDisabled(-1 == e), i.setChecked(t.ui.isFullScreen());
            }), i;
        }, u.emotion = function(e, t) {
            var i = "emotion", n = new u.MultiMenuPop({
                title: e.options.labelMap[i] || e.getLang("labelMap." + i) || "",
                editor: e,
                className: "edui-for-" + i,
                iframeUrl: e.ui.mapUrl(t || (e.options.iframeUrlMap || {})[i] || s[i])
            });
            return u.buttons[i] = n, e.addListener("selectionchange", function() {
                n.setDisabled(-1 == e.queryCommandState(i));
            }), n;
        }, u.autotypeset = function(e) {
            var t = new u.AutoTypeSetButton({
                editor: e,
                title: e.options.labelMap.autotypeset || e.getLang("labelMap.autotypeset") || "",
                className: "edui-for-autotypeset",
                onbuttonclick: function() {
                    e.execCommand("autotypeset");
                }
            });
            return u.buttons.autotypeset = t, e.addListener("selectionchange", function() {
                t.setDisabled(-1 == e.queryCommandState("autotypeset"));
            }), t;
        }, u.simpleupload = function(o) {
            var r = "simpleupload", a = new u.Button({
                className: "edui-for-" + r,
                title: o.options.labelMap[r] || o.getLang("labelMap." + r) || "",
                onclick: function() {},
                theme: o.options.theme,
                showText: !1
            });
            return u.buttons[r] = a, o.addListener("ready", function() {
                var e = a.getDom("body").children[0];
                o.fireEvent("simpleuploadbtnready", e);
            }), o.addListener("selectionchange", function(e, t, i) {
                var n = o.queryCommandState(r);
                -1 == n ? (a.setDisabled(!0), a.setChecked(!1)) : i || (a.setDisabled(!1), a.setChecked(n));
            }), a;
        };
    }(), function() {
        var m = baidu.editor.utils, t = baidu.editor.ui.uiUtils, r = baidu.editor.ui.UIBase, N = baidu.editor.dom.domUtils, a = [];
        function u(e) {
            this.initOptions(e), this.initEditorUI();
        }
        u.prototype = {
            uiName: "editor",
            initEditorUI: function() {
                (this.editor.ui = this)._dialogs = {}, this.initUIBase(), this._initToolbars();
                var n, c = this.editor, o = this;
                c.addListener("ready", function() {
                    if (c.getDialog = function(e) {
                        return c.ui._dialogs[e + "Dialog"];
                    }, N.on(c.window, "scroll", function(e) {
                        baidu.editor.ui.Popup.postHide(e);
                    }), c.ui._actualFrameWidth = c.options.initialFrameWidth, UE.browser.ie && 6 === UE.browser.version && c.container.ownerDocument.execCommand("BackgroundImageCache", !1, !0), 
                    c.options.elementPathEnabled && (c.ui.getDom("elementpath").innerHTML = '<div class="edui-editor-breadcrumb">' + c.getLang("elementPathTip") + ":</div>"), 
                    c.options.wordCount) {
                        N.on(c.document, "click", function() {
                            r(c, o);
                            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                            N.un(c.document, "click", t.callee);
                        }), c.ui.getDom("wordcount").innerHTML = c.getLang("wordCountTip");
                    }
                    c.ui._scale(), c.options.scaleEnabled ? (c.autoHeightEnabled && c.disableAutoHeight(), 
                    o.enableScale()) : o.disableScale(), c.options.elementPathEnabled || c.options.wordCount || c.options.scaleEnabled || (c.ui.getDom("elementpath").style.display = "none", 
                    c.ui.getDom("wordcount").style.display = "none", c.ui.getDom("scale").style.display = "none"), 
                    c.selection.isFocus() && c.fireEvent("selectionchange", !1, !0);
                }), c.addListener("mousedown", function(e, t) {
                    var i = t.target || t.srcElement;
                    baidu.editor.ui.Popup.postHide(t, i), baidu.editor.ui.ShortCutMenu.postHide(t);
                }), c.addListener("delcells", function() {
                    UE.ui.edittip && new UE.ui.edittip(c), c.getDialog("edittip").open();
                });
                var e, i = !1;
                function r(e, t) {
                    e.setOpt({
                        wordCount: !0,
                        maximumWords: 1e4,
                        wordCountMsg: e.options.wordCountMsg || e.getLang("wordCountMsg"),
                        wordOverFlowMsg: e.options.wordOverFlowMsg || e.getLang("wordOverFlowMsg")
                    });
                    var i = e.options, n = i.maximumWords, o = i.wordCountMsg, r = i.wordOverFlowMsg, a = t.getDom("wordcount");
                    if (i.wordCount) {
                        var s = e.getContentLength(!0);
                        n < s ? (a.innerHTML = r, e.fireEvent("wordcountoverflow")) : a.innerHTML = o.replace("{#leave}", n - s).replace("{#count}", s);
                    }
                }
                c.addListener("afterpaste", function() {
                    c.queryCommandState("pasteplain") || (baidu.editor.ui.PastePicker && (n = new baidu.editor.ui.Popup({
                        content: new baidu.editor.ui.PastePicker({
                            editor: c
                        }),
                        editor: c,
                        className: "edui-wordpastepop"
                    })).render(), i = !0);
                }), c.addListener("afterinserthtml", function() {
                    clearTimeout(e), e = setTimeout(function() {
                        if (n && (i || c.ui._isTransfer)) {
                            if (n.isHidden()) {
                                var e = N.createElement(c.document, "span", {
                                    style: "line-height:0px;",
                                    innerHTML: "\ufeff"
                                });
                                c.selection.getRange().insertNode(e);
                                var t = getDomNode(e, "firstChild", "previousSibling");
                                t && n.showAnchor(3 == t.nodeType ? t.parentNode : t), N.remove(e);
                            } else n.show();
                            delete c.ui._isTransfer, i = !1;
                        }
                    }, 200);
                }), c.addListener("contextmenu", function(e, t) {
                    baidu.editor.ui.Popup.postHide(t);
                }), c.addListener("keydown", function(e, t) {
                    n && n.dispose(t);
                    var i = t.keyCode || t.which;
                    t.altKey && 90 == i && UE.ui.buttons.fullscreen.onclick();
                }), c.addListener("wordcount", function(e) {
                    r(this, o);
                }), c.addListener("selectionchange", function() {
                    c.options.elementPathEnabled && o[(-1 == c.queryCommandState("elementpath") ? "dis" : "en") + "ableElementPath"](), 
                    c.options.scaleEnabled && o[(-1 == c.queryCommandState("scale") ? "dis" : "en") + "ableScale"]();
                });
                var u = new baidu.editor.ui.Popup({
                    editor: c,
                    content: "",
                    className: "edui-bubble",
                    _onEditButtonClick: function() {
                        this.hide(), c.ui._dialogs.linkDialog.open();
                    },
                    _onImgEditButtonClick: function(e) {
                        this.hide(), c.ui._dialogs[e] && c.ui._dialogs[e].open();
                    },
                    _onImgSetFloat: function(e) {
                        this.hide(), c.execCommand("imagefloat", e);
                    },
                    _setIframeAlign: function(e) {
                        var t = u.anchorEl, i = t.cloneNode(!0);
                        switch (e) {
                          case -2:
                            i.setAttribute("align", "");
                            break;

                          case -1:
                            i.setAttribute("align", "left");
                            break;

                          case 1:
                            i.setAttribute("align", "right");
                        }
                        t.parentNode.insertBefore(i, t), N.remove(t), u.anchorEl = i, u.showAnchor(u.anchorEl);
                    },
                    _updateIframe: function() {
                        var e = c._iframe = u.anchorEl;
                        N.hasClass(e, "ueditor_baidumap") ? (c.selection.getRange().selectNode(e).select(), 
                        c.ui._dialogs.mapDialog.open()) : c.ui._dialogs.insertframeDialog.open(), u.hide();
                    },
                    _onRemoveButtonClick: function(e) {
                        c.execCommand(e), this.hide();
                    },
                    queryAutoHide: function(e) {
                        return e && e.ownerDocument == c.document && ("img" == e.tagName.toLowerCase() || N.findParentByTagName(e, "a", !0)) ? e !== u.anchorEl : baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, e);
                    }
                });
                u.render(), c.options.imagePopup && (c.addListener("mouseover", function(e, t) {
                    var i = (t = t || window.event).target || t.srcElement;
                    if (c.ui._dialogs.insertframeDialog && /iframe/gi.test(i.tagName)) {
                        var n = u.formatHtml("<nobr>" + c.getLang("property") + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + c.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + c.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + c.getLang("justifyright") + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + c.getLang("modify") + "</span></nobr>");
                        n ? (u.getDom("content").innerHTML = n, u.anchorEl = i, u.showAnchor(u.anchorEl)) : u.hide();
                    }
                }), c.addListener("selectionchange", function(e, t) {
                    if (t) {
                        var i = "", n = "", o = c.selection.getRange().getClosedNode(), r = c.ui._dialogs;
                        if (o && "IMG" == o.tagName) {
                            var a = "insertimageDialog";
                            if (-1 == o.className.indexOf("edui-faked-video") && -1 == o.className.indexOf("edui-upload-video") || (a = "insertvideoDialog"), 
                            -1 != o.src.indexOf("http://api.map.baidu.com") && (a = "mapDialog"), -1 != o.src.indexOf("http://maps.google.com/maps/api/staticmap") && (a = "gmapDialog"), 
                            o.getAttribute("anchorname") && (a = "anchorDialog", i = u.formatHtml("<nobr>" + c.getLang("property") + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + c.getLang("modify") + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + c.getLang("delete") + "</span></nobr>")), 
                            o.getAttribute("word_img") && (c.word_img = [ o.getAttribute("word_img") ], a = "wordimageDialog"), 
                            (N.hasClass(o, "loadingclass") || N.hasClass(o, "loaderrorclass")) && (a = ""), 
                            !r[a]) return;
                            n = "<nobr>" + c.getLang("property") + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + c.getLang("default") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + c.getLang("justifyleft") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + c.getLang("justifyright") + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + c.getLang("justifycenter") + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + a + '\');" class="edui-clickable">' + c.getLang("modify") + "</span></nobr>", 
                            !i && (i = u.formatHtml(n));
                        }
                        if (c.ui._dialogs.linkDialog) {
                            var s, l = c.queryCommandValue("link");
                            if (l && (s = l.getAttribute("_href") || l.getAttribute("href", 2))) {
                                var d = s;
                                30 < s.length && (d = s.substring(0, 20) + "..."), i && (i += '<div style="height:5px;"></div>'), 
                                i += u.formatHtml("<nobr>" + c.getLang("anthorMsg") + ': <a target="_blank" href="' + s + '" title="' + s + '" >' + d + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + c.getLang("modify") + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + c.getLang("clear") + "</span></nobr>"), 
                                u.showAnchor(l);
                            }
                        }
                        i ? (u.getDom("content").innerHTML = i, u.anchorEl = o || l, u.showAnchor(u.anchorEl)) : u.hide();
                    }
                }));
            },
            _initToolbars: function() {
                for (var e = this.editor, t = this.toolbars || [], i = [], n = [], o = 0; o < t.length; o++) {
                    for (var r = t[o], a = new baidu.editor.ui.Toolbar({
                        theme: e.options.theme
                    }), s = 0; s < r.length; s++) {
                        var l = r[s], d = null;
                        if ("string" == typeof l) {
                            "|" == (l = l.toLowerCase()) && (l = "Separator"), "||" == l && (l = "Breakline");
                            var c = baidu.editor.ui[l];
                            if (c) if (m.isFunction(c)) d = new baidu.editor.ui[l](e); else {
                                if (c.id && c.id != e.key) continue;
                                var u = c.execFn.call(e, e, l);
                                if (u) {
                                    if (void 0 === c.index) {
                                        a.add(u);
                                        continue;
                                    }
                                    n.push({
                                        index: c.index,
                                        itemUI: u
                                    });
                                }
                            }
                            if ("fullscreen" == l) {
                                i && i[0] ? i[0].items.splice(0, 0, d) : d && a.items.splice(0, 0, d);
                                continue;
                            }
                        } else d = l;
                        d && d.id && a.add(d);
                    }
                    i[o] = a;
                }
                m.each(n, function(e) {
                    a.add(e.itemUI, e.index);
                }), this.toolbars = i;
            },
            getHtmlTpl: function() {
                return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + "</div></div>" : "") + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang("clickToUpload") + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>';
            },
            showWordImageDialog: function() {
                this._dialogs.wordimageDialog.open();
            },
            renderToolbarBoxHtml: function() {
                for (var e = [], t = 0; t < this.toolbars.length; t++) e.push(this.toolbars[t].renderHtml());
                return e.join("");
            },
            setFullScreen: function(e) {
                var t = this.editor, i = t.container.parentNode.parentNode;
                if (this._fullscreen != e) {
                    if (this._fullscreen = e, this.editor.fireEvent("beforefullscreenchange", e), baidu.editor.browser.gecko) var n = t.selection.getRange().createBookmark();
                    if (e) {
                        for (;"BODY" != i.tagName; ) {
                            var o = baidu.editor.dom.domUtils.getComputedStyle(i, "position");
                            a.push(o), i.style.position = "static", i = i.parentNode;
                        }
                        this._bakHtmlOverflow = document.documentElement.style.overflow, this._bakBodyOverflow = document.body.style.overflow, 
                        this._bakAutoHeight = this.editor.autoHeightEnabled, this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop), 
                        this._bakEditorContaninerWidth = t.iframe.parentNode.offsetWidth, this._bakAutoHeight && (t.autoHeightEnabled = !1, 
                        this.editor.disableAutoHeight()), document.documentElement.style.overflow = "hidden", 
                        window.scrollTo(0, window.scrollY), this._bakCssText = this.getDom().style.cssText, 
                        this._bakCssText1 = this.getDom("iframeholder").style.cssText, t.iframe.parentNode.style.width = "", 
                        this._updateFullScreen();
                    } else {
                        for (;"BODY" != i.tagName; ) i.style.position = a.shift(), i = i.parentNode;
                        this.getDom().style.cssText = this._bakCssText, this.getDom("iframeholder").style.cssText = this._bakCssText1, 
                        this._bakAutoHeight && (t.autoHeightEnabled = !0, this.editor.enableAutoHeight()), 
                        document.documentElement.style.overflow = this._bakHtmlOverflow, document.body.style.overflow = this._bakBodyOverflow, 
                        t.iframe.parentNode.style.width = this._bakEditorContaninerWidth + "px", window.scrollTo(0, this._bakScrollTop);
                    }
                    if (browser.gecko && "true" === t.body.contentEditable) {
                        var r = document.createElement("input");
                        document.body.appendChild(r), t.body.contentEditable = !1, setTimeout(function() {
                            r.focus(), setTimeout(function() {
                                t.body.contentEditable = !0, t.fireEvent("fullscreenchanged", e), t.selection.getRange().moveToBookmark(n).select(!0), 
                                baidu.editor.dom.domUtils.remove(r), e && window.scroll(0, 0);
                            }, 0);
                        }, 0);
                    }
                    "true" === t.body.contentEditable && (this.editor.fireEvent("fullscreenchanged", e), 
                    this.triggerLayout());
                }
            },
            _updateFullScreen: function() {
                if (this._fullscreen) {
                    var e = t.getViewportRect();
                    if (this.getDom().style.cssText = "border:0;position:absolute;left:0;top:" + (this.editor.options.topOffset || 0) + "px;width:" + e.width + "px;height:" + e.height + "px;z-index:" + (1 * this.getDom().style.zIndex + 100), 
                    t.setViewportOffset(this.getDom(), {
                        left: 0,
                        top: this.editor.options.topOffset || 0
                    }), this.editor.setHeight(e.height - this.getDom("toolbarbox").offsetHeight - this.getDom("bottombar").offsetHeight - (this.editor.options.topOffset || 0), !0), 
                    browser.gecko) try {
                        window.onresize();
                    } catch (e) {}
                }
            },
            _updateElementPath: function() {
                var e, t = this.getDom("elementpath");
                if (this.elementPathEnabled && (e = this.editor.queryCommandValue("elementpath"))) {
                    for (var i, n = [], o = 0; i = e[o]; o++) n[o] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + o + '&quot;);">' + i + "</span>");
                    t.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang("elementPathTip") + ": " + n.join(" &gt; ") + "</div>";
                } else t.style.display = "none";
            },
            disableElementPath: function() {
                var e = this.getDom("elementpath");
                e.innerHTML = "", e.style.display = "none", this.elementPathEnabled = !1;
            },
            enableElementPath: function() {
                this.getDom("elementpath").style.display = "", this.elementPathEnabled = !0, this._updateElementPath();
            },
            _scale: function() {
                var i = document, e = this.editor, t = e.container, n = e.document, o = this.getDom("toolbarbox"), r = this.getDom("bottombar"), a = this.getDom("scale"), s = this.getDom("scalelayer"), l = !1, d = null, c = 0, u = e.options.minFrameWidth, m = 0, f = 0, h = 0, p = 0;
                function g() {
                    d = N.getXY(t), c || (c = e.options.minFrameHeight + o.offsetHeight + r.offsetHeight), 
                    s.style.cssText = "position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:" + t.offsetWidth + "px;height:" + t.offsetHeight + "px;z-index:" + (e.options.zIndex + 1), 
                    N.on(i, "mousemove", b), N.on(n, "mouseup", y), N.on(i, "mouseup", y);
                }
                var v = this;
                function b(e) {
                    C();
                    var t = e || window.event;
                    m = t.pageX || i.documentElement.scrollLeft + t.clientX, f = t.pageY || i.documentElement.scrollTop + t.clientY, 
                    h = m - d.x, p = f - d.y, u <= h && (l = !0, s.style.width = h + "px"), c <= p && (l = !0, 
                    s.style.height = p + "px");
                }
                function y() {
                    l && (l = !1, e.ui._actualFrameWidth = s.offsetWidth - 2, t.style.width = e.ui._actualFrameWidth + "px", 
                    e.setHeight(s.offsetHeight - r.offsetHeight - o.offsetHeight - 2, !0)), s && (s.style.display = "none"), 
                    C(), N.un(i, "mousemove", b), N.un(n, "mouseup", y), N.un(i, "mouseup", y);
                }
                function C() {
                    browser.ie ? i.selection.clear() : window.getSelection().removeAllRanges();
                }
                this.editor.addListener("fullscreenchanged", function(e, t) {
                    if (t) v.disableScale(); else if (v.editor.options.scaleEnabled) {
                        v.enableScale();
                        var i = v.editor.document.createElement("span");
                        v.editor.body.appendChild(i), v.editor.body.style.height = Math.max(N.getXY(i).y, v.editor.iframe.offsetHeight - 20) + "px", 
                        N.remove(i);
                    }
                }), this.enableScale = function() {
                    1 != e.queryCommandState("source") && (a.style.display = "", this.scaleEnabled = !0, 
                    N.on(a, "mousedown", g));
                }, this.disableScale = function() {
                    a.style.display = "none", this.scaleEnabled = !1, N.un(a, "mousedown", g);
                };
            },
            isFullScreen: function() {
                return this._fullscreen;
            },
            postRender: function() {
                r.prototype.postRender.call(this);
                for (var e = 0; e < this.toolbars.length; e++) this.toolbars[e].postRender();
                var t, i = this, n = baidu.editor.dom.domUtils, o = function() {
                    clearTimeout(t), t = setTimeout(function() {
                        i._updateFullScreen();
                    });
                };
                n.on(window, "resize", o), i.addListener("destroy", function() {
                    n.un(window, "resize", o), clearTimeout(t);
                });
            },
            showToolbarMsg: function(e, t) {
                (this.getDom("toolbarmsg_label").innerHTML = e, this.getDom("toolbarmsg").style.display = "", 
                t) || (this.getDom("upload_dialog").style.display = "none");
            },
            hideToolbarMsg: function() {
                this.getDom("toolbarmsg").style.display = "none";
            },
            mapUrl: function(e) {
                return e ? e.replace("~/", this.editor.options.UEDITOR_HOME_URL || "") : "";
            },
            triggerLayout: function() {
                var e = this.getDom();
                "1" == e.style.zoom ? e.style.zoom = "100%" : e.style.zoom = "1";
            }
        }, m.inherits(u, baidu.editor.ui.UIBase);
        var n = {};
        UE.ui.Editor = function(e) {
            var d = new UE.Editor(e);
            d.options.editor = d, m.loadFile(document, {
                href: d.options.themePath + d.options.theme + "/css/ueditor.css",
                tag: "link",
                type: "text/css",
                rel: "stylesheet"
            });
            var c = d.render;
            return d.render = function(l) {
                l.constructor === String && (d.key = l, n[l] = d), m.domReady(function() {
                    function e() {
                        if (d.setOpt({
                            labelMap: d.options.labelMap || d.getLang("labelMap")
                        }), new u(d.options), l && (l.constructor === String && (l = document.getElementById(l)), 
                        l && l.getAttribute("name") && (d.options.textarea = l.getAttribute("name")), l && /script|textarea/gi.test(l.tagName))) {
                            var e = document.createElement("div");
                            l.parentNode.insertBefore(e, l);
                            var t = l.value || l.innerHTML;
                            d.options.initialContent = /^[\t\r\n ]*$/.test(t) ? d.options.initialContent : t.replace(/>[\n\r\t]+([ ]{4})+/g, ">").replace(/[\n\r\t]+([ ]{4})+</g, "<").replace(/>[\n\r\t]+</g, "><"), 
                            l.className && (e.className = l.className), l.style.cssText && (e.style.cssText = l.style.cssText), 
                            /textarea/i.test(l.tagName) ? (d.textarea = l, d.textarea.style.display = "none") : l.parentNode.removeChild(l), 
                            l.id && (e.id = l.id, N.removeAttributes(l, "id")), (l = e).innerHTML = "";
                        }
                        N.addClass(l, "edui-" + d.options.theme), d.ui.render(l);
                        var i = d.options;
                        d.container = d.ui.getDom();
                        for (var n = N.findParents(l, !0), o = [], r = 0; s = n[r]; r++) o[r] = s.style.display, 
                        s.style.display = "block";
                        if (i.initialFrameWidth) i.minFrameWidth = i.initialFrameWidth; else {
                            i.minFrameWidth = i.initialFrameWidth = l.offsetWidth;
                            var a = l.style.width;
                            /%$/.test(a) && (i.initialFrameWidth = a);
                        }
                        i.initialFrameHeight ? i.minFrameHeight = i.initialFrameHeight : i.initialFrameHeight = i.minFrameHeight = l.offsetHeight;
                        var s;
                        for (r = 0; s = n[r]; r++) s.style.display = o[r];
                        l.style.height && (l.style.height = ""), d.container.style.width = i.initialFrameWidth + (/%$/.test(i.initialFrameWidth) ? "" : "px"), 
                        d.container.style.zIndex = i.zIndex, c.call(d, d.ui.getDom("iframeholder")), d.fireEvent("afteruiready");
                    }
                    d.langIsReady ? e() : d.addListener("langReady", e);
                });
            }, d;
        }, UE.getEditor = function(e, t) {
            var i = n[e];
            return i || (i = n[e] = new UE.ui.Editor(t)).render(e), i;
        }, UE.delEditor = function(e) {
            var t;
            (t = n[e]) && (t.key && t.destroy(), delete n[e]);
        }, UE.registerUI = function(e, t, i, n) {
            m.each(e.split(/\s+/), function(e) {
                baidu.editor.ui[e] = {
                    id: n,
                    execFn: t,
                    index: i
                };
            });
        };
    }(), UE.registerUI("message", function(e) {
        var o, r = baidu.editor.ui.Message, a = [], s = e;
        function l() {
            if (o && s.ui) {
                var e = s.ui.getDom("toolbarbox");
                e && (o.style.top = e.offsetHeight + 3 + "px"), o.style.zIndex = Math.max(s.options.zIndex, s.iframe.style.zIndex) + 1;
            }
        }
        s.setOpt("enableMessageShow", !0), !1 !== s.getOpt("enableMessageShow") && (s.addListener("ready", function() {
            o = document.getElementById(s.ui.id + "_message_holder"), l(), setTimeout(function() {
                l();
            }, 500);
        }), s.addListener("showmessage", function(e, t) {
            t = utils.isString(t) ? {
                content: t
            } : t;
            var i = new r({
                timeout: t.timeout,
                type: t.type,
                content: t.content,
                keepshow: t.keepshow,
                editor: s
            }), n = t.id || "msg_" + (+new Date()).toString(36);
            return i.render(o), (a[n] = i).reset(t), l(), n;
        }), s.addListener("updatemessage", function(e, t, i) {
            i = utils.isString(i) ? {
                content: i
            } : i;
            var n = a[t];
            n.render(o), n && n.reset(i);
        }), s.addListener("hidemessage", function(e, t) {
            var i = a[t];
            i && i.hide();
        }));
    }), UE.registerUI("autosave", function(e) {
        var t = null, i = null;
        e.on("afterautosave", function() {
            clearTimeout(t), t = setTimeout(function() {
                i && e.trigger("hidemessage", i), i = e.trigger("showmessage", {
                    content: e.getLang("autosave.success"),
                    timeout: 2e3
                });
            }, 2e3);
        });
    });
}();