/*
Product Name: dhtmlxTabbar 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/
if (typeof(window.dhx) == "undefined") {
    window.dhx = window.dhx4 = {
        version: "5.1.0",
        skin: null,
        skinDetect: function(a) {
            var b = Math.floor(dhx4.readFromCss(a + "_skin_detect") / 10) * 10;
            return {
                10: "dhx_skyblue",
                20: "dhx_web",
                30: "dhx_terrace",
                40: "material"
            } [b] || null
        },
        readFromCss: function(c, d, e) {
            var b = document.createElement("DIV");
            b.className = c;
            if (document.body.firstChild != null) {
                document.body.insertBefore(b, document.body.firstChild)
            } else {
                document.body.appendChild(b)
            }
            if (typeof(e) == "string") {
                b.innerHTML = e
            }
            var a = b[d || "offsetWidth"];
            b.parentNode.removeChild(b);
            b = null;
            return a
        },
        lastId: 1,
        newId: function() {
            return this.lastId++
        },
        zim: {
            data: {},
            step: 5,
            first: function() {
                return 100
            },
            last: function() {
                var c = this.first();
                for (var b in this.data) {
                    c = Math.max(c, this.data[b])
                }
                return c
            },
            reserve: function(a) {
                this.data[a] = this.last() + this.step;
                return this.data[a]
            },
            clear: function(a) {
                if (this.data[a] != null) {
                    this.data[a] = null;
                    delete this.data[a]
                }
            }
        },
        s2b: function(a) {
            if (typeof(a) == "string") {
                a = a.toLowerCase()
            }
            return (a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on")
        },
        s2j: function(s) {
            var obj = null;
            dhx4.temp = null;
            try {
                eval("dhx4.temp=" + s)
            } catch (e) {
                dhx4.temp = null
            }
            obj = dhx4.temp;
            dhx4.temp = null;
            return obj
        },
        absLeft: function(a) {
            if (typeof(a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).left
        },
        absTop: function(a) {
            if (typeof(a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).top
        },
        _aOfs: function(a) {
            var c = 0,
                b = 0;
            while (a) {
                c = c + parseInt(a.offsetTop);
                b = b + parseInt(a.offsetLeft);
                a = a.offsetParent
            }
            return {
                top: c,
                left: b
            }
        },
        _aOfsRect: function(d) {
            var g = d.getBoundingClientRect();
            var h = document.body;
            var b = document.documentElement;
            var a = window.pageYOffset || b.scrollTop || h.scrollTop;
            var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
            var f = b.clientTop || h.clientTop || 0;
            var i = b.clientLeft || h.clientLeft || 0;
            var j = g.top + a - f;
            var c = g.left + e - i;
            return {
                top: Math.round(j),
                left: Math.round(c)
            }
        },
        getOffset: function(a) {
            if (a.getBoundingClientRect) {
                return this._aOfsRect(a)
            } else {
                return this._aOfs(a)
            }
        },
        _isObj: function(a) {
            return (a != null && typeof(a) == "object" && typeof(a.length) == "undefined")
        },
        _copyObj: function(d) {
            if (this._isObj(d)) {
                var c = {};
                for (var b in d) {
                    if (typeof(d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    } else {
                        c[b] = d[b]
                    }
                }
            } else {
                var c = [];
                for (var b = 0; b < d.length; b++) {
                    if (typeof(d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    } else {
                        c[b] = d[b]
                    }
                }
            }
            return c
        },
        screenDim: function() {
            var a = (navigator.userAgent.indexOf("MSIE") >= 0);
            var b = {};
            b.left = document.body.scrollLeft;
            b.right = b.left + (window.innerWidth || document.body.clientWidth);
            b.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, document.body.scrollTop);
            b.bottom = b.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
            return b
        },
        selectTextRange: function(d, g, b) {
            d = (typeof(d) == "string" ? document.getElementById(d) : d);
            var a = d.value.length;
            g = Math.max(Math.min(g, a), 0);
            b = Math.min(b, a);
            if (d.setSelectionRange) {
                try {
                    d.setSelectionRange(g, b)
                } catch (f) {}
            } else {
                if (d.createTextRange) {
                    var c = d.createTextRange();
                    c.moveStart("character", g);
                    c.moveEnd("character", b - a);
                    try {
                        c.select()
                    } catch (f) {}
                }
            }
        },
        transData: null,
        transDetect: function() {
            if (this.transData == null) {
                this.transData = {
                    transProp: false,
                    transEv: null
                };
                var c = {
                    MozTransition: "transitionend",
                    WebkitTransition: "webkitTransitionEnd",
                    OTransition: "oTransitionEnd",
                    msTransition: "transitionend",
                    transition: "transitionend"
                };
                for (var b in c) {
                    if (this.transData.transProp == false && document.documentElement.style[b] != null) {
                        this.transData.transProp = b;
                        this.transData.transEv = c[b]
                    }
                }
                c = null
            }
            return this.transData
        },
        _xmlNodeValue: function(a) {
            var c = "";
            for (var b = 0; b < a.childNodes.length; b++) {
                c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue.toString().replace(/^[\n\r\s]{0,}/, "").replace(/[\n\r\s]{0,}$/, "") : "")
            }
            return c
        }
    };
    window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
    window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
    window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
    window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
    window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
    window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
    window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
    window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    window.dhx4.dnd = {
        evs: {},
        p_en: ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),
        _mTouch: function(a) {
            return (window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse")
        },
        _touchOn: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "";
            a = null
        },
        _touchOff: function(a) {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "none";
            a = null
        }
    };
    if (window.navigator.pointerEnabled == true) {
        window.dhx4.dnd.evs = {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        }
    } else {
        if (window.navigator.msPointerEnabled == true) {
            window.dhx4.dnd.evs = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
            }
        } else {
            if (typeof(window.addEventListener) != "undefined") {
                window.dhx4.dnd.evs = {
                    start: "touchstart",
                    move: "touchmove",
                    end: "touchend"
                }
            }
        }
    }
}
if (typeof(window.dhx4.template) == "undefined") {
    window.dhx4.trim = function(a) {
        return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")
    };
    window.dhx4.template = function(b, c, a) {
        return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function() {
            var g = arguments[1];
            var f = window.dhx4.trim(arguments[3]);
            var h = null;
            var e = [c[g]];
            if (f.length > 0) {
                f = f.split(":");
                var d = [];
                for (var i = 0; i < f.length; i++) {
                    if (i > 0 && d[d.length - 1].match(/\\$/) != null) {
                        d[d.length - 1] = d[d.length - 1].replace(/\\$/, "") + ":" + f[i]
                    } else {
                        d.push(f[i])
                    }
                }
                h = d[0];
                for (var i = 1; i < d.length; i++) {
                    e.push(d[i])
                }
            }
            if (typeof(h) == "string" && typeof(window.dhx4.template[h]) == "function") {
                return window.dhx4.template[h].apply(window.dhx4.template, e)
            }
            if (g.length > 0 && typeof(c[g]) != "undefined") {
                if (a == true) {
                    return window.dhx4.trim(c[g])
                }
                return String(c[g])
            }
            return ""
        })
    };
    window.dhx4.template.date = function(a, b) {
        if (a != null) {
            if (a instanceof Date) {
                return window.dhx4.date2str(a, b)
            } else {
                a = a.toString();
                if (a.match(/^\d*$/) != null) {
                    return window.dhx4.date2str(new Date(parseInt(a)), b)
                }
                return a
            }
        }
        return ""
    };
    window.dhx4.template.maxlength = function(b, a) {
        return String(b).substr(0, a)
    };
    window.dhx4.template.number_format = function(d, e, c, a) {
        var b = window.dhx4.template._parseFmt(e, c, a);
        if (b == false) {
            return d
        }
        return window.dhx4.template._getFmtValue(d, b)
    };
    window.dhx4.template.lowercase = function(a) {
        if (typeof(a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toLowerCase()
    };
    window.dhx4.template.uppercase = function(a) {
        if (typeof(a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toUpperCase()
    };
    window.dhx4.template._parseFmt = function(h, c, a) {
        var d = h.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);
        if (d == null || d.length != 4) {
            return false
        }
        var b = {
            i_len: false,
            i_sep: (typeof(c) == "string" ? c : ","),
            d_len: false,
            d_sep: (typeof(a) == "string" ? a : "."),
            s_bef: (typeof(d[1]) == "string" ? d[1] : ""),
            s_aft: (typeof(d[3]) == "string" ? d[3] : "")
        };
        var g = d[2].split(".");
        if (g[1] != null) {
            b.d_len = g[1].length
        }
        var e = g[0].split(",");
        if (e.length > 1) {
            b.i_len = e[e.length - 1].length
        }
        return b
    };
    window.dhx4.template._getFmtValue = function(value, fmt) {
        var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);
        if (r != null && r.length == 5) {
            var v0 = "";
            if (r[1] != null) {
                v0 += r[1]
            }
            v0 += fmt.s_bef;
            if (fmt.i_len !== false) {
                var i = 0;
                var v1 = "";
                for (var q = r[2].length - 1; q >= 0; q--) {
                    v1 = "" + r[2].charAt(q) + v1;
                    if (++i == fmt.i_len && q > 0) {
                        v1 = fmt.i_sep + v1;
                        i = 0
                    }
                }
                v0 += v1
            } else {
                v0 += r[2]
            }
            if (fmt.d_len !== false) {
                if (r[4] == null) {
                    r[4] = ""
                }
                while (r[4].length < fmt.d_len) {
                    r[4] += "0"
                }
                eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");
                var t1 = (r[4]).match(dhx4.temp);
                if (t1 != null) {
                    v0 += fmt.d_sep + t1
                }
                dhx4.temp = t1 = null
            }
            v0 += fmt.s_aft;
            return v0
        }
        return value
    }
}
if (typeof(window.dhx4.dateLang) == "undefined") {
    window.dhx4.dateLang = "en";
    window.dhx4.dateStrings = {
        en: {
            monthFullName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthShortName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayFullName: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayShortName: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        }
    };
    window.dhx4.dateFormat = {
        en: "%Y-%m-%d"
    };
    window.dhx4.date2str = function(f, d, a) {
        if (d == null || typeof(d) == "undefined") {
            d = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (a == null || typeof(a) == "undefined") {
            a = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        if (f instanceof Date) {
            var e = function(g) {
                return (String(g).length == 1 ? "0" + String(g) : g)
            };
            var b = function(i) {
                switch (i) {
                    case "%d":
                        return e(f.getDate());
                    case "%j":
                        return f.getDate();
                    case "%D":
                        return a.dayShortName[f.getDay()];
                    case "%l":
                        return a.dayFullName[f.getDay()];
                    case "%m":
                        return e(f.getMonth() + 1);
                    case "%n":
                        return f.getMonth() + 1;
                    case "%M":
                        return a.monthShortName[f.getMonth()];
                    case "%F":
                        return a.monthFullName[f.getMonth()];
                    case "%y":
                        return e(f.getYear() % 100);
                    case "%Y":
                        return f.getFullYear();
                    case "%g":
                        return (f.getHours() + 11) % 12 + 1;
                    case "%h":
                        return e((f.getHours() + 11) % 12 + 1);
                    case "%G":
                        return f.getHours();
                    case "%H":
                        return e(f.getHours());
                    case "%i":
                        return e(f.getMinutes());
                    case "%s":
                        return e(f.getSeconds());
                    case "%a":
                        return (f.getHours() > 11 ? "pm" : "am");
                    case "%A":
                        return (f.getHours() > 11 ? "PM" : "AM");
                    case "%%":
                        return "%";
                    case "%u":
                        return f.getMilliseconds();
                    case "%P":
                        if (window.dhx4.temp_calendar != null && window.dhx4.temp_calendar.tz != null) {
                            return window.dhx4.temp_calendar.tz
                        }
                        var k = f.getTimezoneOffset();
                        var j = Math.abs(Math.floor(k / 60));
                        var g = Math.abs(k) - j * 60;
                        return (k > 0 ? "-" : "+") + e(j) + ":" + e(g);
                    default:
                        return i
                }
            };
            var c = String(d || window.dhx4.dateFormat).replace(/%[a-zA-Z]/g, b)
        }
        return (c || String(f))
    };
    window.dhx4.str2date = function(g, s, x) {
        if (s == null || typeof(s) == "undefined") {
            s = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (x == null || typeof(x) == "undefined") {
            x = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        s = s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g, "\\$&");
        var u = [];
        var j = [];
        s = s.replace(/%[a-z]/gi, function(e) {
            switch (e) {
                case "%d":
                case "%m":
                case "%y":
                case "%h":
                case "%H":
                case "%i":
                case "%s":
                    j.push(e);
                    return "(\\d{2})";
                case "%D":
                case "%l":
                case "%M":
                case "%F":
                    j.push(e);
                    return "([a-zéûä\u0430-\u044F\u0451]{1,})";
                case "%j":
                case "%n":
                case "%g":
                case "%G":
                    j.push(e);
                    return "(\\d{1,2})";
                case "%Y":
                    j.push(e);
                    return "(\\d{4})";
                case "%a":
                    j.push(e);
                    return "([a|p]m)";
                case "%A":
                    j.push(e);
                    return "([A|P]M)";
                case "%u":
                    j.push(e);
                    return "(\\d{1,6})";
                case "%P":
                    j.push(e);
                    return "([+-]\\d{1,2}:\\d{1,2})"
            }
            return e
        });
        var y = new RegExp(s, "i");
        var l = g.match(y);
        if (l == null || l.length - 1 != j.length) {
            return "Invalid Date"
        }
        for (var b = 1; b < l.length; b++) {
            u.push(l[b])
        }
        var c = {
            "%y": 1,
            "%Y": 1,
            "%n": 2,
            "%m": 2,
            "%M": 2,
            "%F": 2,
            "%d": 3,
            "%j": 3,
            "%a": 4,
            "%A": 4,
            "%H": 5,
            "%G": 5,
            "%h": 5,
            "%g": 5,
            "%i": 6,
            "%s": 7,
            "%u": 7,
            "%P": 7
        };
        var m = {};
        var i = {};
        for (var b = 0; b < j.length; b++) {
            if (typeof(c[j[b]]) != "undefined") {
                var d = c[j[b]];
                if (!m[d]) {
                    m[d] = [];
                    i[d] = []
                }
                m[d].push(u[b]);
                i[d].push(j[b])
            }
        }
        u = [];
        j = [];
        for (var b = 1; b <= 7; b++) {
            if (m[b] != null) {
                for (var o = 0; o < m[b].length; o++) {
                    u.push(m[b][o]);
                    j.push(i[b][o])
                }
            }
        }
        var a = new Date();
        a.setDate(1);
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        var n = function(k, e) {
            for (var f = 0; f < e.length; f++) {
                if (e[f].toLowerCase() == k) {
                    return f
                }
            }
            return -1
        };
        for (var b = 0; b < u.length; b++) {
            switch (j[b]) {
                case "%d":
                case "%j":
                case "%n":
                case "%m":
                case "%Y":
                case "%H":
                case "%G":
                case "%i":
                case "%s":
                case "%u":
                    if (!isNaN(u[b])) {
                        a[{
                            "%d": "setDate",
                            "%j": "setDate",
                            "%n": "setMonth",
                            "%m": "setMonth",
                            "%Y": "setFullYear",
                            "%H": "setHours",
                            "%G": "setHours",
                            "%i": "setMinutes",
                            "%s": "setSeconds",
                            "%u": "setMilliseconds"
                        } [j[b]]](Number(u[b]) + (j[b] == "%m" || j[b] == "%n" ? -1 : 0))
                    }
                    break;
                case "%M":
                case "%F":
                    var h = n(u[b].toLowerCase(), x[{
                        "%M": "monthShortName",
                        "%F": "monthFullName"
                    } [j[b]]]);
                    if (h >= 0) {
                        a.setMonth(h)
                    }
                    break;
                case "%y":
                    if (!isNaN(u[b])) {
                        var t = Number(u[b]);
                        a.setFullYear(t + (t > 50 ? 1900 : 2000))
                    }
                    break;
                case "%g":
                case "%h":
                    if (!isNaN(u[b])) {
                        var t = Number(u[b]);
                        if (t <= 12 && t >= 0) {
                            a.setHours(t + (n("pm", u) >= 0 ? (t == 12 ? 0 : 12) : (t == 12 ? -12 : 0)))
                        }
                    }
                    break;
                case "%P":
                    if (window.dhx4.temp_calendar != null) {
                        window.dhx4.temp_calendar.tz = u[b]
                    }
                    break
            }
        }
        return a
    }
}
if (typeof(window.dhx4.ajax) == "undefined") {
    window.dhx4.ajax = {
        cache: false,
        method: "get",
        parse: function(a) {
            if (typeof a !== "string") {
                return a
            }
            a = a.replace(/^[\s]+/, "");
            if (window.DOMParser && !dhx4.isIE) {
                var b = (new window.DOMParser()).parseFromString(a, "text/xml")
            } else {
                if (window.ActiveXObject !== window.undefined) {
                    var b = new window.ActiveXObject("Microsoft.XMLDOM");
                    b.async = "false";
                    b.loadXML(a)
                }
            }
            return b
        },
        xmltop: function(a, d, c) {
            if (typeof d.status == "undefined" || d.status < 400) {
                xml = (!d.responseXML) ? dhx4.ajax.parse(d.responseText || d) : (d.responseXML || d);
                if (xml && xml.documentElement !== null) {
                    try {
                        if (!xml.getElementsByTagName("parsererror").length) {
                            return xml.getElementsByTagName(a)[0]
                        }
                    } catch (b) {}
                }
            }
            if (c !== -1) {
                dhx4.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], c])
            }
            return document.createElement("DIV")
        },
        xpath: function(c, a) {
            if (!a.nodeName) {
                a = a.responseXML || a
            }
            if (dhx4.isIE) {
                try {
                    return a.selectNodes(c) || []
                } catch (f) {
                    return []
                }
            } else {
                var d = [];
                var g;
                var b = (a.ownerDocument || a).evaluate(c, a, null, XPathResult.ANY_TYPE, null);
                while (g = b.iterateNext()) {
                    d.push(g)
                }
                return d
            }
        },
        query: function(a) {
            return dhx4.ajax._call((a.method || "GET"), a.url, a.data || "", (a.async || true), a.callback, null, a.headers)
        },
        get: function(a, b) {
            return this._call("GET", a, null, true, b)
        },
        getSync: function(a) {
            return this._call("GET", a, null, false)
        },
        put: function(b, a, c) {
            return this._call("PUT", b, a, true, c)
        },
        del: function(b, a, c) {
            return this._call("DELETE", b, a, true, c)
        },
        post: function(b, a, c) {
            if (arguments.length == 1) {
                a = ""
            } else {
                if (arguments.length == 2 && (typeof(a) == "function" || typeof(window[a]) == "function")) {
                    c = a;
                    a = ""
                } else {
                    a = String(a)
                }
            }
            return this._call("POST", b, a, true, c)
        },
        postSync: function(b, a) {
            a = (a == null ? "" : String(a));
            return this._call("POST", b, a, false)
        },
        getLong: function(a, b) {
            this._call("GET", a, null, true, b, {
                url: a
            })
        },
        postLong: function(b, a, c) {
            if (arguments.length == 2 && (typeof(a) == "function" || typeof(window[a]))) {
                c = a;
                a = ""
            }
            this._call("POST", b, a, true, c, {
                url: b,
                postData: a
            })
        },
        _call: function(b, c, d, h, j, n, f) {
            if (typeof d === "object") {
                var g = [];
                for (var k in d) {
                    g.push(k + "=" + encodeURIComponent(d[k]))
                }
                d = g.join("&")
            }
            var e = dhx.promise.defer();
            var m = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
            var i = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
            if (h == true) {
                m.onreadystatechange = function() {
                    if ((m.readyState == 4) || (i == true && m.readyState == 3)) {
                        if (m.status != 200 || m.responseText == "") {
                            e.reject(m);
                            if (!dhx4.callEvent("onAjaxError", [{
                                    xmlDoc: m,
                                    filePath: c,
                                    async: h
                                }])) {
                                return
                            }
                        }
                        window.setTimeout(function() {
                            if (typeof(j) == "function") {
                                try {
                                    j.apply(window, [{
                                        xmlDoc: m,
                                        filePath: c,
                                        async: h
                                    }])
                                } catch (a) {
                                    e.reject(a)
                                }
                                e.resolve(m.responseText)
                            }
                            if (n != null) {
                                if (typeof(n.postData) != "undefined") {
                                    dhx4.ajax.postLong(n.url, n.postData, j)
                                } else {
                                    dhx4.ajax.getLong(n.url, j)
                                }
                            }
                            j = null;
                            m = null
                        }, 1)
                    }
                }
            }
            if (b == "GET") {
                c += this._dhxr(c)
            }
            m.open(b, c, h);
            if (f != null) {
                for (var l in f) {
                    m.setRequestHeader(l, f[l])
                }
            } else {
                if (b == "POST" || b == "PUT" || b == "DELETE") {
                    m.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                } else {
                    if (b == "GET") {
                        d = null
                    }
                }
            }
            m.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            m.send(d);
            if (h != true) {
                if ((m.readyState == 4) || (i == true && m.readyState == 3)) {
                    if (m.status != 200 || m.responseText == "") {
                        dhx4.callEvent("onAjaxError", [{
                            xmlDoc: m,
                            filePath: c,
                            async: h
                        }])
                    }
                }
            }
            e.xmlDoc = m;
            e.filePath = c;
            e.async = h;
            return e
        },
        _dhxr: function(a, b) {
            if (this.cache != true) {
                if (a.match(/^[\?\&]$/) == null) {
                    a = (a.indexOf("?") >= 0 ? "&" : "?")
                }
                if (typeof(b) == "undefined") {
                    b = true
                }
                return a + "dhxr" + new Date().getTime() + (b == true ? "=1" : "")
            }
            return ""
        }
    }
}
if (typeof(window.dhx4._enableDataLoading) == "undefined") {
    window.dhx4._enableDataLoading = function(g, c, f, e, h) {
        if (h == "clear") {
            for (var b in g._dhxdataload) {
                g._dhxdataload[b] = null;
                delete g._dhxdataload[b]
            }
            g._loadData = null;
            g._dhxdataload = null;
            g.load = null;
            g.loadStruct = null;
            g = null;
            return
        }
        g._dhxdataload = {
            initObj: c,
            xmlToJson: f,
            xmlRootTag: e,
            onBeforeXLS: null
        };
        g._loadData = function(n, o, p) {
            if (arguments.length == 2) {
                p = o;
                o = null
            }
            var m = null;
            if (arguments.length == 3) {
                p = arguments[2]
            }
            this.callEvent("onXLS", []);
            if (typeof(n) == "string") {
                var l = n.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
                var s = new RegExp("^<" + this._dhxdataload.xmlRootTag);
                if (s.test(l.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {
                    m = dhx4.ajax.parse(n);
                    if (m != null) {
                        m = this[this._dhxdataload.xmlToJson].apply(this, [m])
                    }
                }
                if (m == null && (l.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || l.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
                    m = dhx4.s2j(l)
                }
                if (m == null) {
                    var j = [];
                    if (typeof(this._dhxdataload.onBeforeXLS) == "function") {
                        var l = this._dhxdataload.onBeforeXLS.apply(this, [n]);
                        if (l != null && typeof(l) == "object") {
                            if (l.url != null) {
                                n = l.url
                            }
                            if (l.params != null) {
                                for (var q in l.params) {
                                    j.push(q + "=" + encodeURIComponent(l.params[q]))
                                }
                            }
                        }
                    }
                    var r = this;
                    var i = function(a) {
                        var k = null;
                        if ((a.xmlDoc.getResponseHeader("Content-Type") || "").search(/xml/gi) >= 0 || (a.xmlDoc.responseText.replace(/^\s{1,}/, "")).match(/^</) != null) {
                            k = r[r._dhxdataload.xmlToJson].apply(r, [a.xmlDoc.responseXML])
                        } else {
                            k = dhx4.s2j(a.xmlDoc.responseText)
                        }
                        if (k != null) {
                            r[r._dhxdataload.initObj].apply(r, [k, n])
                        }
                        r.callEvent("onXLE", []);
                        if (p != null) {
                            if (typeof(p) == "function") {
                                p.apply(r, [])
                            } else {
                                if (typeof(window[p]) == "function") {
                                    window[p].apply(r, [])
                                }
                            }
                        }
                        i = p = null;
                        k = a = r = null
                    };
                    j = j.join("&") + (typeof(o) == "string" ? "&" + o : "");
                    if (dhx4.ajax.method == "post") {
                        return dhx4.ajax.post(n, j, i)
                    } else {
                        if (dhx4.ajax.method == "get") {
                            return dhx4.ajax.get(n + (j.length > 0 ? (n.indexOf("?") > 0 ? "&" : "?") + j : ""), i)
                        }
                    }
                    return
                }
            } else {
                if (typeof(n.documentElement) == "object" || (typeof(n.tagName) != "undefined" && typeof(n.getElementsByTagName) != "undefined" && n.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
                    m = this[this._dhxdataload.xmlToJson].apply(this, [n])
                } else {
                    m = window.dhx4._copyObj(n)
                }
            }
            if (m != null) {
                this[this._dhxdataload.initObj].apply(this, [m])
            }
            this.callEvent("onXLE", []);
            if (p != null) {
                if (typeof(p) == "function") {
                    p.apply(this, [])
                } else {
                    if (typeof(window[p]) == "function") {
                        window[p].apply(this, [])
                    }
                }
                p = null
            }
        };
        if (h != null) {
            var d = {
                struct: "loadStruct",
                data: "load"
            };
            for (var b in h) {
                if (h[b] == true) {
                    g[d[b]] = function() {
                        return this._loadData.apply(this, arguments)
                    }
                }
            }
        }
        g = null
    }
}
if (typeof(window.dhx4._eventable) == "undefined") {
    window.dhx4._eventable = function(a, b) {
        if (b == "clear") {
            a.detachAllEvents();
            a.dhxevs = null;
            a.attachEvent = null;
            a.detachEvent = null;
            a.checkEvent = null;
            a.callEvent = null;
            a.detachAllEvents = null;
            a = null;
            return
        }
        a.dhxevs = {
            data: {}
        };
        a.attachEvent = function(c, e) {
            c = String(c).toLowerCase();
            if (!this.dhxevs.data[c]) {
                this.dhxevs.data[c] = {}
            }
            var d = window.dhx4.newId();
            this.dhxevs.data[c][d] = e;
            return d
        };
        a.detachEvent = function(f) {
            for (var d in this.dhxevs.data) {
                var e = 0;
                for (var c in this.dhxevs.data[d]) {
                    if (c == f) {
                        this.dhxevs.data[d][c] = null;
                        delete this.dhxevs.data[d][c]
                    } else {
                        e++
                    }
                }
                if (e == 0) {
                    this.dhxevs.data[d] = null;
                    delete this.dhxevs.data[d]
                }
            }
        };
        a.checkEvent = function(c) {
            c = String(c).toLowerCase();
            return (this.dhxevs.data[c] != null)
        };
        a.callEvent = function(d, f) {
            d = String(d).toLowerCase();
            if (this.dhxevs.data[d] == null) {
                return true
            }
            var e = true;
            for (var c in this.dhxevs.data[d]) {
                e = this.dhxevs.data[d][c].apply(this, f) && e
            }
            return e
        };
        a.detachAllEvents = function() {
            for (var d in this.dhxevs.data) {
                for (var c in this.dhxevs.data[d]) {
                    this.dhxevs.data[d][c] = null;
                    delete this.dhxevs.data[d][c]
                }
                this.dhxevs.data[d] = null;
                delete this.dhxevs.data[d]
            }
        };
        a = null
    };
    dhx4._eventable(dhx4)
}
if (!window.dhtmlxValidation) {
    dhtmlxValidation = function() {};
    dhtmlxValidation.prototype = {
        isEmpty: function(a) {
            return a == ""
        },
        isNotEmpty: function(a) {
            return (a instanceof Array ? a.length > 0 : !a == "")
        },
        isValidBoolean: function(a) {
            return !!a.toString().match(/^(0|1|true|false)$/)
        },
        isValidEmail: function(a) {
            return !!a.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i)
        },
        isValidInteger: function(a) {
            return !!a.toString().match(/(^-?\d+$)/)
        },
        isValidNumeric: function(a) {
            return !!a.toString().match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/)
        },
        isValidAplhaNumeric: function(a) {
            return !!a.toString().match(/^[_\-a-z0-9]+$/gi)
        },
        isValidDatetime: function(b) {
            var a = b.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
            return a && !!(a[1] <= 9999 && a[2] <= 12 && a[3] <= 31 && a[4] <= 59 && a[5] <= 59 && a[6] <= 59) || false
        },
        isValidDate: function(a) {
            var b = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            return b && !!(b[1] <= 9999 && b[2] <= 12 && b[3] <= 31) || false
        },
        isValidTime: function(b) {
            var a = b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            return a && !!(a[1] <= 24 && a[2] <= 59 && a[3] <= 59) || false
        },
        isValidIPv4: function(a) {
            var b = a.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
            return b && !!(b[1] <= 255 && b[2] <= 255 && b[3] <= 255 && b[4] <= 255) || false
        },
        isValidCurrency: function(a) {
            return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false
        },
        isValidSSN: function(a) {
            return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false
        },
        isValidSIN: function(a) {
            return a.toString().match(/^\d{9}$/) && true || false
        }
    };
    dhtmlxValidation = new dhtmlxValidation()
}
if (typeof(window.dhtmlx) == "undefined") {
    window.dhtmlx = {
        extend: function(d, c) {
            for (var e in c) {
                if (!d[e]) {
                    d[e] = c[e]
                }
            }
            return d
        },
        extend_api: function(a, d, c) {
            var b = window[a];
            if (!b) {
                return
            }
            window[a] = function(g) {
                if (g && typeof g == "object" && !g.tagName) {
                    var f = b.apply(this, (d._init ? d._init(g) : arguments));
                    for (var e in dhtmlx) {
                        if (d[e]) {
                            this[d[e]](dhtmlx[e])
                        }
                    }
                    for (var e in g) {
                        if (d[e]) {
                            this[d[e]](g[e])
                        } else {
                            if (e.indexOf("on") === 0) {
                                this.attachEvent(e, g[e])
                            }
                        }
                    }
                } else {
                    var f = b.apply(this, arguments)
                }
                if (d._patch) {
                    d._patch(this)
                }
                return f || this
            };
            window[a].prototype = b.prototype;
            if (c) {
                dhtmlx.extend(window[a].prototype, c)
            }
        },
        url: function(a) {
            if (a.indexOf("?") != -1) {
                return "&"
            } else {
                return "?"
            }
        }
    }
}

function dhtmlDragAndDropObject() {
    if (window.dhtmlDragAndDrop) {
        return window.dhtmlDragAndDrop
    }
    this.lastLanding = 0;
    this.dragNode = 0;
    this.dragStartNode = 0;
    this.dragStartObject = 0;
    this.tempDOMU = null;
    this.tempDOMM = null;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {
    a.onmousedown = null;
    a.dragStarter = null;
    a.dragLanding = null
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {
    a.onmousedown = this.preCreateDragCopy;
    a.dragStarter = b;
    this.addDragLanding(a, b)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {
    a.dragLanding = b
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {
    if ((a || window.event) && (a || event).button == 2) {
        return
    }
    if (window.dhtmlDragAndDrop.waitDrag) {
        window.dhtmlDragAndDrop.waitDrag = 0;
        document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
        document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
        return false
    }
    if (window.dhtmlDragAndDrop.dragNode) {
        window.dhtmlDragAndDrop.stopDrag(a)
    }
    window.dhtmlDragAndDrop.waitDrag = 1;
    window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
    window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
    window.dhtmlDragAndDrop.dragStartNode = this;
    window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
    document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
    document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
    window.dhtmlDragAndDrop.downtime = new Date().valueOf();
    if ((a) && (a.preventDefault)) {
        a.preventDefault();
        return false
    }
    return false
};
dhtmlDragAndDropObject.prototype.callDrag = function(c) {
    if (!c) {
        c = window.event
    }
    dragger = window.dhtmlDragAndDrop;
    if ((new Date()).valueOf() - dragger.downtime < 100) {
        return
    }
    if (!dragger.dragNode) {
        if (dragger.waitDrag) {
            dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, c);
            if (!dragger.dragNode) {
                return dragger.stopDrag()
            }
            dragger.dragNode.onselectstart = function() {
                return false
            };
            dragger.gldragNode = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup = dragger.stopDrag;
            dragger.waitDrag = 0;
            dragger.dragNode.pWindow = window;
            dragger.initFrameRoute()
        } else {
            return dragger.stopDrag(c, true)
        }
    }
    if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode) {
        var a = dragger.gldragNode;
        if (dragger.gldragNode.old) {
            a = dragger.gldragNode.old
        }
        a.parentNode.removeChild(a);
        var b = dragger.dragNode.pWindow;
        if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {
            a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
        }
        if (_isIE) {
            var f = document.createElement("Div");
            f.innerHTML = dragger.dragNode.outerHTML;
            dragger.dragNode = f.childNodes[0]
        } else {
            dragger.dragNode = dragger.dragNode.cloneNode(true)
        }
        dragger.dragNode.pWindow = window;
        dragger.gldragNode.old = dragger.dragNode;
        document.body.appendChild(dragger.dragNode);
        b.dhtmlDragAndDrop.dragNode = dragger.dragNode
    }
    dragger.dragNode.style.left = c.clientX + 15 + (dragger.fx ? dragger.fx * (-1) : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
    dragger.dragNode.style.top = c.clientY + 3 + (dragger.fy ? dragger.fy * (-1) : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
    if (!c.srcElement) {
        var d = c.target
    } else {
        d = c.srcElement
    }
    dragger.checkLanding(d, c)
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(e) {
    if (window.name) {
        var c = parent.frames[window.name].frameElement.offsetParent;
        var d = 0;
        var b = 0;
        while (c) {
            d += c.offsetLeft;
            b += c.offsetTop;
            c = c.offsetParent
        }
        if ((parent.dhtmlDragAndDrop)) {
            var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            d += a.split("_")[0] * 1;
            b += a.split("_")[1] * 1
        }
        if (e) {
            return d + "_" + b
        } else {
            this.fx = d
        }
        this.fy = b
    }
    return "0_0"
};
dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {
    if ((b) && (b.dragLanding)) {
        if (this.lastLanding) {
            this.lastLanding.dragLanding._dragOut(this.lastLanding)
        }
        this.lastLanding = b;
        this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);
        this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
    } else {
        if ((b) && (b.tagName != "BODY")) {
            this.checkLanding(b.parentNode, a)
        } else {
            if (this.lastLanding) {
                this.lastLanding.dragLanding._dragOut(this.lastLanding, a.clientX, a.clientY, a)
            }
            this.lastLanding = 0;
            if (this._onNotFound) {
                this._onNotFound()
            }
        }
    }
};
dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {
    dragger = window.dhtmlDragAndDrop;
    if (!c) {
        dragger.stopFrameRoute();
        var a = dragger.lastLanding;
        dragger.lastLanding = null;
        if (a) {
            a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, a, (_isIE ? event.srcElement : b.target))
        }
    }
    dragger.lastLanding = null;
    if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
        dragger.dragNode.parentNode.removeChild(dragger.dragNode)
    }
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null;
    dragger.tempDOMM = null;
    dragger.waitDrag = 0
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {
    if (c) {
        window.dhtmlDragAndDrop.stopDrag(1, 1)
    }
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
            }
        } catch (b) {}
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.stopFrameRoute(window)
        }
    } catch (b) {}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, d) {
    if (c) {
        window.dhtmlDragAndDrop.preCreateDragCopy();
        window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
        window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
        window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
        window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
        window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
        window.waitDrag = 0;
        if (((!_isIE) && (d)) && ((!_isFF) || (_FFrv < 1.8))) {
            window.dhtmlDragAndDrop.calculateFramePosition()
        }
    }
    try {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.initFrameRoute(window)
        }
    } catch (b) {}
    for (var a = 0; a < window.frames.length; a++) {
        try {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.initFrameRoute(window, ((!c || d) ? 1 : 0))
            }
        } catch (b) {}
    }
};
_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;
if (navigator.userAgent.indexOf("Macintosh") != -1) {
    _isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    _isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") != -1) || (navigator.userAgent.indexOf("Konqueror") != -1)) {
    _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5));
    if (_KHTMLrv > 525) {
        _isFF = true;
        _FFrv = 1.9
    } else {
        _isKHTML = true
    }
} else {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        _isOpera = true;
        _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))
    } else {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            _isIE = true;
            if ((navigator.appVersion.indexOf("MSIE 8.0") != -1 || navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 10.0") != -1 || document.documentMode > 7) && document.compatMode != "BackCompat") {
                _isIE = 8
            }
        } else {
            if (navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") != -1) {
                _isIE = 8
            } else {
                _isFF = true;
                _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
            }
        }
    }
}
if (typeof(window.dhtmlxEvent) == "undefined") {
    function dhtmlxEvent(b, c, a) {
        if (b.addEventListener) {
            b.addEventListener(c, a, false)
        } else {
            if (b.attachEvent) {
                b.attachEvent("on" + c, a)
            }
        }
    }
}
if (dhtmlxEvent.touchDelay == null) {
    dhtmlxEvent.touchDelay = 2000
}
if (typeof(dhtmlxEvent.initTouch) == "undefined") {
    dhtmlxEvent.initTouch = function() {
        var d;
        var e;
        var b, a;
        dhtmlxEvent(document.body, "touchstart", function(f) {
            e = f.touches[0].target;
            b = f.touches[0].clientX;
            a = f.touches[0].clientY;
            d = window.setTimeout(c, dhtmlxEvent.touchDelay)
        });

        function c() {
            if (e) {
                var f = document.createEvent("HTMLEvents");
                f.initEvent("dblclick", true, true);
                e.dispatchEvent(f);
                d = e = null
            }
        }
        dhtmlxEvent(document.body, "touchmove", function(f) {
            if (d) {
                if (Math.abs(f.touches[0].clientX - b) > 50 || Math.abs(f.touches[0].clientY - a) > 50) {
                    window.clearTimeout(d);
                    d = e = false
                }
            }
        });
        dhtmlxEvent(document.body, "touchend", function(f) {
            if (d) {
                window.clearTimeout(d);
                d = e = false
            }
        });
        dhtmlxEvent.initTouch = function() {}
    }
}(function(b) {
    var c = typeof setImmediate !== "undefined" ? setImmediate : function(e) {
        setTimeout(e, 0)
    };

    function d(f, g) {
        var e = this;
        e.promise = e;
        e.state = "pending";
        e.val = null;
        e.fn = f || null;
        e.er = g || null;
        e.next = []
    }
    d.prototype.resolve = function(f) {
        var e = this;
        if (e.state === "pending") {
            e.val = f;
            e.state = "resolving";
            c(function() {
                e.fire()
            })
        }
    };
    d.prototype.reject = function(f) {
        var e = this;
        if (e.state === "pending") {
            e.val = f;
            e.state = "rejecting";
            c(function() {
                e.fire()
            })
        }
    };
    d.prototype.then = function(f, h) {
        var e = this;
        var g = new d(f, h);
        e.next.push(g);
        if (e.state === "resolved") {
            g.resolve(e.val)
        }
        if (e.state === "rejected") {
            g.reject(e.val)
        }
        return g
    };
    d.prototype.fail = function(e) {
        return this.then(null, e)
    };
    d.prototype.finish = function(g) {
        var e = this;
        e.state = g;
        if (e.state === "resolved") {
            for (var f = 0; f < e.next.length; f++) {
                e.next[f].resolve(e.val)
            }
        }
        if (e.state === "rejected") {
            for (var f = 0; f < e.next.length; f++) {
                e.next[f].reject(e.val)
            }
            if (!e.next.length) {
                throw (e.val)
            }
        }
    };
    d.prototype.thennable = function(j, f, h, m, l) {
        var g = this;
        l = l || g.val;
        if (typeof l === "object" && typeof j === "function") {
            try {
                var i = 0;
                j.call(l, function(e) {
                    if (i++ !== 0) {
                        return
                    }
                    f(e)
                }, function(e) {
                    if (i++ !== 0) {
                        return
                    }
                    h(e)
                })
            } catch (k) {
                h(k)
            }
        } else {
            m(l)
        }
    };
    d.prototype.fire = function() {
        var f = this;
        var g;
        try {
            g = f.val && f.val.then
        } catch (h) {
            f.val = h;
            f.state = "rejecting";
            return f.fire()
        }
        f.thennable(g, function(e) {
            f.val = e;
            f.state = "resolving";
            f.fire()
        }, function(e) {
            f.val = e;
            f.state = "rejecting";
            f.fire()
        }, function(i) {
            f.val = i;
            if (f.state === "resolving" && typeof f.fn === "function") {
                try {
                    f.val = f.fn.call(undefined, f.val)
                } catch (j) {
                    f.val = j;
                    return f.finish("rejected")
                }
            }
            if (f.state === "rejecting" && typeof f.er === "function") {
                try {
                    f.val = f.er.call(undefined, f.val);
                    f.state = "resolving"
                } catch (j) {
                    f.val = j;
                    return f.finish("rejected")
                }
            }
            if (f.val === f) {
                f.val = TypeError();
                return f.finish("rejected")
            }
            f.thennable(g, function(e) {
                f.val = e;
                f.finish("resolved")
            }, function(e) {
                f.val = e;
                f.finish("rejected")
            }, function(e) {
                f.val = e;
                f.state === "resolving" ? f.finish("resolved") : f.finish("rejected")
            })
        })
    };
    d.prototype.done = function() {
        if (this.state = "rejected" && !this.next) {
            throw this.val
        }
        return null
    };
    d.prototype.nodeify = function(e) {
        if (typeof e === "function") {
            return this.then(function(g) {
                try {
                    e(null, g)
                } catch (f) {
                    setImmediate(function() {
                        throw f
                    })
                }
                return g
            }, function(g) {
                try {
                    e(g)
                } catch (f) {
                    setImmediate(function() {
                        throw f
                    })
                }
                return g
            })
        }
        return this
    };
    d.prototype.spread = function(e, f) {
        return this.all().then(function(g) {
            return typeof e === "function" && e.apply(null, g)
        }, f)
    };
    d.prototype.all = function() {
        var e = this;
        return this.then(function(q) {
            var f = new d();
            if (!(q instanceof Array)) {
                f.reject(TypeError);
                return f
            }
            var h = 0;
            var o = q.length;

            function k() {
                if (++h === o) {
                    f.resolve(q)
                }
            }
            for (var m = 0, j = q.length; m < j; m++) {
                var r = q[m];
                var g;
                try {
                    g = r && r.then
                } catch (n) {
                    f.reject(n);
                    break
                }(function(l) {
                    e.thennable(g, function(i) {
                        q[l] = i;
                        k()
                    }, function(i) {
                        f.reject(i)
                    }, function() {
                        k()
                    }, r)
                })(m)
            }
            return f
        })
    };
    var a = {
        all: function(e) {
            var f = new d(null, null);
            f.resolve(e);
            return f.all()
        },
        defer: function() {
            return new d(null, null)
        },
        fcall: function() {
            var h = new d();
            var f = Array.apply([], arguments);
            var g = f.shift();
            try {
                var j = g.apply(null, f);
                h.resolve(j)
            } catch (i) {
                h.reject(i)
            }
            return h
        },
        nfcall: function() {
            var h = new d();
            var f = Array.apply([], arguments);
            var g = f.shift();
            try {
                f.push(function(e, j) {
                    if (e) {
                        return h.reject(e)
                    }
                    return h.resolve(j)
                });
                g.apply(null, f)
            } catch (i) {
                h.reject(i)
            }
            return h
        }
    };
    b.promise = a
})(dhx);

function dhtmlXCellObject(c, a) {
    this.cell = document.createElement("DIV");
    this.cell.className = "dhx_cell" + (a || "");
    this._idd = c;
    this._isCell = true;
    this.conf = {
        borders: true,
        idx: {},
        css: a || "",
        idx_data: {
            cont: "dhx_cell_cont",
            pr1: "dhx_cell_progress_bar",
            pr2: "dhx_cell_progress_img",
            pr3: "dhx_cell_progress_svg",
            menu: "dhx_cell_menu",
            toolbar: "dhx_cell_toolbar",
            ribbon: "dhx_cell_ribbon",
            sb: "dhx_cell_statusbar",
            cover: "dhx_cell_cover"
        },
        ofs_nodes: {
            t: {},
            b: {}
        }
    };
    this.dataNodes = {};
    this.views = {};
    var b = document.createElement("DIV");
    b.className = "dhx_cell_cont" + this.conf.css;
    this.cell.appendChild(b);
    b = null;
    this._updateIdx = function() {
        for (var d in this.conf.idx) {
            this.conf.idx[d] = null;
            delete this.conf.idx[d]
        }
        for (var g = 0; g < this.cell.childNodes.length; g++) {
            var e = this.cell.childNodes[g].className;
            for (var d in this.conf.idx_data) {
                var f = new RegExp(this.conf.idx_data[d]);
                if (e.match(f) != null) {
                    this.conf.idx[d] = g
                }
            }
        }
        this.callEvent("_onIdxUpdated", [])
    };
    this._adjustAttached = function() {
        for (var d in this.dataNodes) {
            if (this.dataNodes[d] != null && typeof(this.dataNodes[d].setSizes) == "function") {
                this.dataNodes[d].setSizes()
            }
        }
        if (this.dataObj != null && typeof(this.dataObj.setSizes) == "function") {
            if (this.dataType == "layout" && typeof(window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell && this.dataObj._getMainInst() != this.layout._getMainInst()) {
                this.dataObj.setSizes();
                return
            }
            this.dataObj.setSizes.apply(this.dataObj, arguments)
        }
    };
    this._setSize = function(m, k, n, g, i, j, e, f) {
        if (this.conf.size == null) {
            this.conf.size = {}
        }
        if (f == null) {
            f = {}
        }
        var o = {
            left: "x",
            top: "y",
            width: "w",
            height: "h"
        };
        this.conf.size.x = m;
        this.conf.size.y = k;
        this.conf.size.w = Math.max(n, 0);
        this.conf.size.h = Math.max(g, 0);
        for (var l in o) {
            var d = (f[l] || l);
            this.cell.style[d] = this.conf.size[o[l]] + "px"
        }
        this.callEvent("_onSetSize", []);
        if (j !== true) {
            this._adjustCont(i, e)
        } else {
            this._adjustAttached(i)
        }
        this._adjustProgress()
    };
    this._adjustCont = function(i, g) {
        var h = this.cell.childNodes[this.conf.idx.cont];
        if (typeof(window.dhtmlXLayoutCell) == "function" && this instanceof window.dhtmlXLayoutCell && this.conf.collapsed == true) {
            h.style.left = h.style.top = "0px";
            h.style.width = h.style.height = "200px";
            h = null;
            return
        }
        var f = 0;
        for (var d in this.conf.ofs_nodes.t) {
            var e = this.conf.ofs_nodes.t[d];
            f += (e == "func" ? this[d]() : (e == true ? this.cell.childNodes[this.conf.idx[d]].offsetHeight : 0))
        }
        var j = 0;
        for (var d in this.conf.ofs_nodes.b) {
            var e = this.conf.ofs_nodes.b[d];
            j += (e == "func" ? this[d]() : (e == true ? this.cell.childNodes[this.conf.idx[d]].offsetHeight : 0))
        }
        h.style.left = "0px";
        h.style.top = f + "px";
        if (this.conf.cells_cont == null) {
            this.conf.cells_cont = {};
            h.style.width = this.cell.offsetWidth + "px";
            h.style.height = Math.max(this.cell.offsetHeight - f - j, 0) + "px";
            this.conf.cells_cont.w = parseInt(h.style.width) - h.offsetWidth;
            this.conf.cells_cont.h = parseInt(h.style.height) - h.offsetHeight
        }
        h.style.left = "0px";
        h.style.top = f + "px";
        h.style.width = Math.max(this.cell.offsetWidth + this.conf.cells_cont.w, 0) + "px";
        h.style.height = Math.max(this.conf.size.h - f - j + this.conf.cells_cont.h, 0) + "px";
        h = null;
        this._adjustAttached(i);
        if (g == "expand" && this.dataType == "editor" && this.dataObj != null) {
            this.dataObj._prepareContent(true)
        }
    };
    this._mtbUpdBorder = function() {
        var e = ["menu", "toolbar", "ribbon"];
        for (var g = 0; g < e.length; g++) {
            if (this.conf.idx[e[g]] != null) {
                var h = this.cell.childNodes[this.conf.idx[e[g]]];
                var f = "dhx_cell_" + e[g] + "_no_borders";
                var d = "dhx_cell_" + e[g] + "_def";
                h.className = h.className.replace(new RegExp(this.conf.borders ? f : d), this.conf.borders ? d : f);
                h = null
            }
        }
    };
    this._resetSizeState = function() {
        this.conf.cells_cont = null
    };
    this.conf.view = "def";
    this.conf.views_loaded = {};
    this.conf.views_loaded[this.conf.view] = true;
    this._viewSave = function(f) {
        this.views[f] = {
            borders: this.conf.borders,
            ofs_nodes: {
                t: {},
                b: {}
            },
            url_data: this.conf.url_data,
            dataType: this.dataType,
            dataObj: this.dataObj,
            cellCont: [],
            dataNodes: {},
            dataNodesCont: {}
        };
        var g = this.cell.childNodes[this.conf.idx.cont];
        while (g.childNodes.length > 0) {
            this.views[f].cellCont.push(g.firstChild);
            g.removeChild(g.firstChild)
        }
        g = null;
        this.dataType = null;
        this.dataObj = null;
        this.conf.url_data = null;
        for (var e in this.dataNodes) {
            for (var d in this.conf.ofs_nodes) {
                if (typeof(this.conf.ofs_nodes[d][e]) != "undefined") {
                    this.views[f].ofs_nodes[d][e] = this.conf.ofs_nodes[d][e];
                    this.conf.ofs_nodes[d][e] = null;
                    delete this.conf.ofs_nodes[d][e]
                }
            }
            this.views[f].dataNodesCont[e] = this.cell.childNodes[this.conf.idx[e]];
            this.cell.removeChild(this.cell.childNodes[this.conf.idx[e]]);
            this.views[f].dataNodes[e] = this.dataNodes[e];
            this.dataNodes[e] = null;
            delete this.dataNodes[e];
            this._updateIdx()
        }
        this.callEvent("_onViewSave", [f])
    };
    this._viewRestore = function(f) {
        if (this.views[f] == null) {
            return
        }
        this.dataObj = this.views[f].dataObj;
        this.dataType = this.views[f].dataType;
        this.conf.url_data = this.views[f].url_data;
        for (var g = 0; g < this.views[f].cellCont.length; g++) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(this.views[f].cellCont[g])
        }
        for (var e in this.views[f].dataNodes) {
            this.dataNodes[e] = this.views[f].dataNodes[e];
            if (e == "menu") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.toolbar || this.conf.idx.cont])
            }
            if (e == "toolbar") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.cont])
            }
            if (e == "ribbon") {
                this.cell.insertBefore(this.views[f].dataNodesCont[e], this.cell.childNodes[this.conf.idx.cont])
            }
            if (e == "sb") {
                this.cell.appendChild(this.views[f].dataNodesCont[e])
            }
            this._updateIdx()
        }
        for (var e in this.views[f].ofs_nodes) {
            for (var d in this.views[f].ofs_nodes[e]) {
                this.conf.ofs_nodes[e][d] = this.views[f].ofs_nodes[e][d]
            }
        }
        if (this.conf.borders != this.views[f].borders) {
            this[this.views[f].borders ? "_showBorders" : "_hideBorders"](true)
        }
        if (this.dataType == "url" && this.conf.url_data != null && this.conf.url_data.ajax == false && this.conf.url_data.post_data != null) {
            this.reloadURL()
        }
        this.callEvent("_onViewRestore", [f]);
        this._viewDelete(f)
    };
    this._viewDelete = function(f) {
        if (this.views[f] == null) {
            return
        }
        this.views[f].borders = null;
        for (var e in this.views[f].ofs_nodes) {
            for (var d in this.views[f].ofs_nodes[e]) {
                this.views[f].ofs_nodes[e][d] = null
            }
            this.views[f].ofs_nodes[e] = null
        }
        this.views[f].dataType = null;
        this.views[f].dataObj = null;
        this.views[f].url_data = null;
        for (var g = 0; g < this.views[f].cellCont.length; g++) {
            this.views[f].cellCont[g] = null
        }
        this.views[f].cellCont = null;
        for (var e in this.views[f].dataNodes) {
            this.views[f].dataNodes[e] = null;
            this.views[f].dataNodesCont[e] = null
        }
        this.views[f].dataNodes = this.views[f].dataNodesCont = null;
        this.views[f] = null;
        delete this.views[f]
    };
    window.dhx4._eventable(this);
    this._updateIdx();
    return this
}
dhtmlXCellObject.prototype.showView = function(a) {
    if (this.conf.view == a) {
        return false
    }
    this._viewSave(this.conf.view);
    this._viewRestore(a);
    this._updateIdx();
    this._adjustCont();
    this.conf.view = a;
    var b = (typeof(this.conf.views_loaded[this.conf.view]) == "undefined");
    this.conf.views_loaded[this.conf.view] = true;
    return b
};
dhtmlXCellObject.prototype.getViewName = function() {
    return this.conf.view
};
dhtmlXCellObject.prototype.unloadView = function(d) {
    if (d == this.conf.view) {
        var e = this.conf.unloading;
        this.conf.unloading = true;
        if (typeof(this.detachMenu) == "function") {
            this.detachMenu()
        }
        if (typeof(this.detachToolbar) == "function") {
            this.detachToolbar()
        }
        if (typeof(this.detachRibbon) == "function") {
            this.detachRibbon()
        }
        this.detachStatusBar();
        this._detachObject(null, true);
        this.conf.unloading = e;
        if (!this.conf.unloading) {
            this._adjustCont(this._idd)
        }
        return
    }
    if (this.views[d] == null) {
        return
    }
    var c = this.views[d];
    for (var b in c.dataNodes) {
        if (typeof(c.dataNodes[b].unload) == "function") {
            c.dataNodes[b].unload()
        }
        c.dataNodes[b] = null;
        c.dataNodesCont[b] = null
    }
    if (c.dataType == "url") {
        if (c.cellCont != null && c.cellCont[0] != "null") {
            this._detachURLEvents(c.cellCont[0])
        }
    } else {
        if (c.dataObj != null) {
            if (typeof(c.dataObj.unload) == "function") {
                c.dataObj.unload()
            } else {
                if (typeof(c.dataObj.destructor) == "function") {
                    c.dataObj.destructor()
                }
            }
            c.dataObj = null
        }
    }
    c = null;
    this._viewDelete(d);
    if (typeof(this.conf.views_loaded[d]) != "undefined") {
        delete this.conf.views_loaded[d]
    }
};
dhtmlXCellObject.prototype.getId = function() {
    return this._idd
};
dhtmlXCellObject.prototype.progressOn = function() {
    if (this.conf.progress == true) {
        return
    }
    this.conf.progress = true;
    var b = document.createElement("DIV");
    b.className = this.conf.idx_data.pr1;
    var a = document.createElement("DIV");
    if (this.conf.skin == "material" && (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
        a.className = this.conf.idx_data.pr3;
        a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
    } else {
        a.className = this.conf.idx_data.pr2
    }
    if (this.conf.idx.cover != null) {
        this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cover])
    } else {
        this.cell.appendChild(a)
    }
    this.cell.insertBefore(b, a);
    b = a = null;
    this._updateIdx();
    this._adjustProgress()
};
dhtmlXCellObject.prototype.progressOff = function() {
    if (this.conf.progress != true) {
        return
    }
    for (var b in {
            pr3: 3,
            pr2: 2,
            pr1: 1
        }) {
        var c = this.cell.childNodes[this.conf.idx[b]];
        if (c != null) {
            c.parentNode.removeChild(c)
        }
        c = null
    }
    this.conf.progress = false;
    this._updateIdx()
};
dhtmlXCellObject.prototype._adjustProgress = function() {
    if (this.conf.idx.pr1 == null) {
        return
    }
    if (!this.conf.pr) {
        this.conf.pr = {}
    }
    var b = this.cell.childNodes[this.conf.idx.pr1];
    var a = this.cell.childNodes[this.conf.idx.pr2] || this.cell.childNodes[this.conf.idx.pr3];
    if (!this.conf.pr.ofs) {
        a.style.width = b.offsetWidth + "px";
        a.style.height = b.offsetHeight + "px";
        this.conf.pr.ofs = {
            w: a.offsetWidth - a.clientWidth,
            h: a.offsetHeight - a.clientHeight
        }
    }
    a.style.width = b.offsetWidth - this.conf.pr.ofs.w + "px";
    a.style.height = b.offsetHeight - this.conf.pr.ofs.h + "px";
    b = a = null
};
dhtmlXCellObject.prototype._showCellCover = function() {
    if (this.conf.cover == true) {
        return
    }
    this.conf.cover = true;
    var a = document.createElement("DIV");
    a.className = this.conf.idx_data.cover;
    this.cell.appendChild(a);
    a = null;
    this._updateIdx()
};
dhtmlXCellObject.prototype._hideCellCover = function() {
    if (this.conf.cover != true) {
        return
    }
    this.cell.removeChild(this.cell.childNodes[this.conf.idx.cover]);
    this._updateIdx();
    this.conf.cover = false
};
dhtmlXCellObject.prototype._showBorders = function(a) {
    if (this.conf.borders) {
        return
    }
    this.conf.borders = true;
    this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont" + this.conf.css;
    this.conf.cells_cont = null;
    this._mtbUpdBorder();
    this.callEvent("_onBorderChange", [true]);
    if (a !== true) {
        this._adjustCont(this._idd)
    }
};
dhtmlXCellObject.prototype._hideBorders = function(a) {
    if (!this.conf.borders) {
        return
    }
    this.conf.borders = false;
    this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont" + this.conf.css + " dhx_cell_cont_no_borders";
    this.conf.cells_cont = null;
    this._mtbUpdBorder();
    this.callEvent("_onBorderChange", [false]);
    if (a !== true) {
        this._adjustCont(this._idd)
    }
};
dhtmlXCellObject.prototype._getWidth = function() {
    return this.cell.offsetWidth
};
dhtmlXCellObject.prototype._getHeight = function() {
    return this.cell.offsetHeight
};
dhtmlXCellObject.prototype.showInnerScroll = function() {
    this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto"
};
dhtmlXCellObject.prototype._unload = function() {
    this.conf.unloading = true;
    this.callEvent("_onCellUnload", []);
    this.progressOff();
    this.unloadView(this.conf.view);
    this.dataNodes = null;
    this.cell.parentNode.removeChild(this.cell);
    this.cell = null;
    window.dhx4._eventable(this, "clear");
    for (var b in this.views) {
        this.unloadView(b)
    }
    this.conf = null;
    for (var b in this) {
        this[b] = null
    }
};
dhtmlXCellObject.prototype.attachObject = function(d, c) {
    if (window.dhx4.s2b(c) && !(typeof(window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell)) {
        c = false
    }
    if (typeof(d) == "string") {
        d = document.getElementById(d)
    }
    if (d.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
        d = null;
        return
    }
    if (c) {
        d.style.display = "";
        var a = d.offsetWidth;
        var b = d.offsetHeight
    }
    this._attachObject(d);
    this.dataType = "obj";
    d.style.display = "";
    d = null;
    if (c) {
        this._adjustByCont(a, b)
    }
};
dhtmlXCellObject.prototype.appendObject = function(a) {
    if (typeof(a) == "string") {
        a = document.getElementById(a)
    }
    if (a.parentNode == this.cell.childNodes[this.conf.idx.cont]) {
        a = null;
        return
    }
    if (!this.conf.append_mode) {
        this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto";
        this.conf.append_mode = true
    }
    this._attachObject(a, null, null, true);
    this.dataType = "obj";
    a.style.display = "";
    a = null
};
dhtmlXCellObject.prototype.detachObject = function(b, a) {
    this._detachObject(null, b, a)
};
dhtmlXCellObject.prototype.getAttachedStatusBar = function() {
    return this.dataNodes.sb
};
dhtmlXCellObject.prototype.getAttachedObject = function() {
    if (this.dataType == "obj" || this.dataType == "url" || this.dataType == "url-ajax") {
        return this.cell.childNodes[this.conf.idx.cont].firstChild
    } else {
        return this.dataObj
    }
};
dhtmlXCellObject.prototype.attachURL = function(b, l, c) {
    if (c == true) {
        c = {}
    }
    var d = (typeof(c) != "undefined" && c != false && c != null);
    if (this.conf.url_data == null) {
        this.conf.url_data = {}
    }
    this.conf.url_data.url = b;
    this.conf.url_data.ajax = (l == true);
    this.conf.url_data.post_data = (c == true ? {} : (c || null));
    if (this.conf.url_data.xml_doc != null) {
        try {
            this.conf.url_data.xml_doc.xmlDoc.abort()
        } catch (h) {}
        this.conf.url_data.xml_doc.xmlDoc = null;
        this.conf.url_data.xml_doc = null
    }
    if (l == true) {
        var k = this;
        if (d) {
            var f = "";
            for (var j in c) {
                f += "&" + encodeURIComponent(j) + "=" + encodeURIComponent(c[j])
            }
            this.conf.url_data.xml_doc = dhx4.ajax.post(b, f, function(a) {
                if (k.attachHTMLString != null && typeof(a.xmlDoc.responseText) == "string") {
                    k.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>" + a.xmlDoc.responseText + "</div>");
                    if (typeof(k._doOnFrameContentLoaded) == "function") {
                        k._doOnFrameContentLoaded()
                    }
                    k.dataType = "url-ajax"
                }
                k = a = null
            })
        } else {
            this.conf.url_data.xml_doc = dhx4.ajax.get(b, function(a) {
                if (k.attachHTMLString != null && typeof(a.xmlDoc.responseText) == "string") {
                    k.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>" + a.xmlDoc.responseText + "</div>");
                    if (typeof(k._doOnFrameContentLoaded) == "function") {
                        k._doOnFrameContentLoaded()
                    }
                    k.dataType = "url-ajax"
                }
                k = a = null
            })
        }
    } else {
        if (this.dataType == "url") {
            var g = this.getFrame()
        } else {
            var g = document.createElement("IFRAME");
			g.title='dhtmlx tab';
            g.frameBorder = 0;
            g.border = 0;
            g.style.width = "100%";
            g.style.height = "100%";
            g.style.position = "relative";
            this._attachObject(g);
            this.dataType = "url";
            this._attachURLEvents()
        }
        if (d) {
            var i = (typeof(this.conf.url_data.post_ifr) == "undefined");
            this.conf.url_data.post_ifr = true;
            if (i) {
                this._attachURLEvents()
            }
            g.src = "about:blank"
        } else {
            g.src = b + window.dhx4.ajax._dhxr(b)
        }
        g = null
    }
    g = null
};
dhtmlXCellObject.prototype.reloadURL = function() {
    if (!(this.dataType == "url" || this.dataType == "url-ajax")) {
        return
    }
    if (this.conf.url_data == null) {
        return
    }
    this.attachURL(this.conf.url_data.url, this.conf.url_data.ajax, this.conf.url_data.post_data)
};
dhtmlXCellObject.prototype.attachHTMLString = function(str) {
    this._attachObject(null, null, str);
    var z = str.match(/<script[^>]*>[^\f]*?<\/script>/g) || [];
    for (var i = 0; i < z.length; i++) {
        var s = z[i].replace(/<([\/]{0,1})script[^>]*>/gi, "");
        if (s) {
            if (window.execScript) {
                window.execScript(s)
            } else {
                window.eval(s)
            }
        }
    }
};
dhtmlXCellObject.prototype.attachScheduler = function(a, g, b, d) {
    d = d || window.scheduler;
    var e = false;
    if (b) {
        var f = document.getElementById(b);
        if (f) {
            e = true
        }
    }
    if (!e) {
        var c = b || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';
        var f = document.createElement("DIV");
        f.id = "dhxSchedObj_" + new Date().getTime();
        f.style.width = "100%";
        f.style.height = "100%";
        f.style.position = "relative";
        f.style.overflow = "hidden";
        f.className = "dhx_cal_container";
        f.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + c + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>'
    }
    this._attachObject(f);
    this.dataType = "scheduler";
    this.dataObj = d;
    this.dataObj.setSizes = function() {
        this.update_view()
    };
    d.init(f.id, a, g);
    f = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
};
dhtmlXCellObject.prototype.attachMap = function(a) {
    var b = document.createElement("DIV");
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.position = "relative";
    b.style.overflow = "hidden";
    this._attachObject(b);
    if (!a) {
        a = {
            center: new google.maps.LatLng(40.719837, -73.992348),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    }
    this.dataType = "maps";
    this.dataObj = new google.maps.Map(b, a);
    this.dataObj.setSizes = function() {
        google.maps.event.trigger(this, "resize")
    };
    b = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
};
dhtmlXCellObject.prototype._createNode_sb = function(g, d, f, a, e) {
    if (typeof(e) != "undefined") {
        g = e
    } else {
        var b = d || {};
        var i = (typeof(b.text) == "string" && b.text.length > 0 ? b.text : "&nbsp;");
        var c = (typeof(b.height) == "number" ? b.height : false);
        var g = document.createElement("DIV");
        g.className = "dhx_cell_statusbar_def";
        g.innerHTML = "<div class='" + (b.paging == true ? "dhx_cell_statusbar_paging" : "dhx_cell_statusbar_text") + "'>" + i + "</div>";
        if (c != false) {
            g.firstChild.style.height = g.firstChild.style.lineHeight = c + "px"
        }
    }
    if (this.conf.idx.pr1 != null) {
        this.cell.insertBefore(g, this.cell.childNodes[this.conf.idx.pr1])
    } else {
        this.cell.appendChild(g)
    }
    this.conf.ofs_nodes.b.sb = true;
    this._updateIdx();
    this._adjustCont(this._idd);
    return g
};
dhtmlXCellObject.prototype.attachStatusBar = function(a) {
    if (this.dataNodes.sb) {
        return
    }
    if (a != null && window.dhx4.s2b(a.paging) == true) {
        a.height = null
    }
    if (this.conf.skin == "dhx_skyblue" && typeof(window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        this.cell.childNodes[this.conf.idx.cont].className += " dhx_cell_statusbar_attached"
    }
    this.dataNodes.sb = this._attachObject("sb", a);
    this.dataNodes.sb.setText = function(b) {
        this.childNodes[0].innerHTML = b
    };
    this.dataNodes.sb.getText = function() {
        return this.childNodes[0].innerHTML
    };
    this.dataNodes.sb.onselectstart = function(b) {
        return false
    };
    return this.dataNodes.sb
};
dhtmlXCellObject.prototype.detachStatusBar = function() {
    if (!this.dataNodes.sb) {
        return
    }
    if (this.conf.skin == "dhx_skyblue" && typeof(window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        this.cell.childNodes[this.conf.idx.cont].className = this.cell.childNodes[this.conf.idx.cont].className.replace(/\s{0,}dhx_cell_statusbar_attached/, "")
    }
    this.dataNodes.sb.setText = this.dataNodes.sb.getText = this.dataNodes.sb.onselectstart = null;
    this.dataNodes.sb = null;
    delete this.dataNodes.sb;
    this._detachObject("sb")
};
dhtmlXCellObject.prototype.showStatusBar = function() {
    this._mtbShowHide("sb", "")
};
dhtmlXCellObject.prototype.hideStatusBar = function() {
    this._mtbShowHide("sb", "none")
};
dhtmlXCellObject.prototype._mtbShowHide = function(b, a) {
    if (!this.dataNodes[b]) {
        return
    }
    this.cell.childNodes[this.conf.idx[b]].style.display = a;
    this._adjustCont()
};
dhtmlXCellObject.prototype.getFrame = dhtmlXCellObject.prototype._getFrame = function() {
    if (this.dataType != "url") {
        return null
    }
    return this.cell.childNodes[this.conf.idx.cont].firstChild
};
dhtmlXCellObject.prototype._attachURLEvents = function() {
    if (this.dataType != "url") {
        return
    }
    var c = this;
    var b = this._idd;
    var a = this.cell.childNodes[this.conf.idx.cont].firstChild;
    if (typeof(this._doOnFrameMouseDown) != "function") {
        this._doOnFrameMouseDown = function(d) {
            c.callEvent("_onContentMouseDown", [b, d || event])
        }
    }
    if (typeof(window.addEventListener) == "function") {
        a.onload = function() {
            try {
                if (typeof(c._doOnFrameMouseDown) == "function") {
                    this.contentWindow.document.body.addEventListener("mousedown", c._doOnFrameMouseDown, false)
                }
            } catch (d) {}
            try {
                if (typeof(c._doOnFrameContentLoaded) == "function") {
                    c._doOnFrameContentLoaded()
                }
            } catch (d) {}
        }
    } else {
        a.onreadystatechange = function(d) {
            if (this.readyState == "complete") {
                try {
                    if (typeof(c._doOnFrameMouseDown) == "function") {
                        this.contentWindow.document.body.attachEvent("onmousedown", c._doOnFrameMouseDown)
                    }
                } catch (f) {}
                try {
                    if (typeof(c._doOnFrameContentLoaded) == "function") {
                        c._doOnFrameContentLoaded()
                    }
                } catch (f) {}
            }
        }
    }
};
dhtmlXCellObject.prototype._doOnFrameContentLoaded = function() {
    if (this.conf.url_data.post_ifr == true) {
        var h = this.getFrame().contentWindow.document;
        var g = h.createElement("FORM");
        g.method = "POST";
        g.action = this.conf.url_data.url;
        h.body.appendChild(g);
        var c = {};
        if (window.dhx4.ajax.cache != true) {
            c["dhxr" + new Date().getTime()] = "1"
        }
        for (var b in this.conf.url_data.post_data) {
            c[b] = this.conf.url_data.post_data[b]
        }
        for (var b in c) {
            var e = h.createElement("INPUT");
            e.type = "hidden";
            e.name = b;
            e.value = c[b];
            g.appendChild(e);
            e = null
        }
        this.conf.url_data.post_ifr = false;
        g.submit()
    } else {
        this.callEvent("_onContentLoaded", [this._idd])
    }
};
dhtmlXCellObject.prototype._detachURLEvents = function(a) {
    if (a == null) {
        if (this.dataType != "url") {
            return
        }
        a = this.cell.childNodes[this.conf.idx.cont].firstChild
    }
    if (!a) {
        return
    }
    if (typeof(window.addEventListener) == "function") {
        a.onload = null;
        try {
            a.contentWindow.document.body.removeEventListener("mousedown", this._doOnFrameMouseDown, false)
        } catch (b) {}
    } else {
        a.onreadystatechange = null;
        try {
            a.contentWindow.document.body.detachEvent("onmousedown", this._doOnFrameMouseDown)
        } catch (b) {}
    }
    a = null
};
dhtmlXCellObject.prototype._attachObject = function(e, b, d, a, c) {
    if (typeof(e) == "string" && {
            menu: 1,
            toolbar: 1,
            ribbon: 1,
            sb: 1
        } [e] == 1) {
        return this["_createNode_" + e].apply(this, arguments)
    }
    if (a != true) {
        this._detachObject(null, true, null)
    }
    if (typeof(d) == "string") {
        this.cell.childNodes[this.conf.idx.cont].innerHTML = d
    } else {
        this.cell.childNodes[this.conf.idx.cont].appendChild(e)
    }
    e = null
};
dhtmlXCellObject.prototype._detachObject = function(g, b, a) {
    this.callEvent("_onBeforeContentDetach", []);
    if (g == "menu" || g == "toolbar" || g == "ribbon" || g == "sb") {
        var f = this.cell.childNodes[this.conf.idx[g]];
        f.parentNode.removeChild(f);
        f = null;
        this.conf.ofs_nodes[g == "sb" ? "b" : "t"][g] = false;
        this._updateIdx();
        if (!this.conf.unloading) {
            this._adjustCont(this._idd)
        }
        return
    }
    if (b == true) {
        a = false
    } else {
        if (typeof(a) == "undefined") {
            a = document.body
        } else {
            if (typeof(a) == "string") {
                a = document.getElementById(a)
            }
        }
    }
    if (a === false) {
        if (this.conf.unloading == true && String(this.dataType).match(/ajax/) != null) {
            if (this.conf.url_data != null && this.conf.url_data.xml_doc != null) {
                try {
                    this.conf.url_data.xml_doc.xmlDoc.abort()
                } catch (d) {}
                this.conf.url_data.xml_doc.xmlDoc = null;
                this.conf.url_data.xml_doc = null
            }
        }
        if (this.dataType == "url") {
            this._detachURLEvents()
        } else {
            if (this.dataObj != null) {
                if (typeof(this.dataObj.unload) == "function") {
                    this.dataObj.unload()
                } else {
                    if (typeof(this.dataObj.destructor) == "function") {
                        this.dataObj.destructor()
                    }
                }
            }
        }
    }
    var f = this.cell.childNodes[this.conf.idx.cont];
    while (f.childNodes.length > 0) {
        if (a === false) {
            f.removeChild(f.lastChild)
        } else {
            f.firstChild.style.display = "none";
            a.appendChild(f.firstChild)
        }
    }
    if (this.conf.append_mode) {
        f.style.overflow = "";
        this.conf.append_mode = false
    }
    var c = (this.dataType == "tabbar");
    this.dataObj = null;
    this.dataType = null;
    a = f = null;
    if (this.conf.unloading != true && c) {
        this.showHeader(true);
        this._showBorders()
    }
};
dhtmlXCellObject.prototype._attachFromCell = function(b) {
    this.detachObject(true);
    var d = "layout";
    if (typeof(window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell) {
        d = "window"
    }
    if (typeof(window.dhtmlXWindowsCell) == "function" && b instanceof window.dhtmlXWindowsCell && b.wins.w[b._idd].conf.parked == true) {
        b.wins._winCellSetOpacity(b._idd, "open", false)
    }
    if (typeof(window.dhtmlXAccordionCell) == "function" && b instanceof window.dhtmlXAccordionCell && b.conf.opened == false) {
        b._cellSetOpacity("open", false)
    }
    for (var c in b.dataNodes) {
        this._attachObject(c, null, null, null, b.cell.childNodes[b.conf.idx[c]]);
        this.dataNodes[c] = b.dataNodes[c];
        b.dataNodes[c] = null;
        b.conf.ofs_nodes[c == "sb" ? "b" : "t"][c] = false;
        b._updateIdx()
    }
    this._mtbUpdBorder();
    if (b.dataType != null && b.dataObj != null) {
        this.dataType = b.dataType;
        this.dataObj = b.dataObj;
        while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
        }
        b.dataType = null;
        b.dataObj = null;
        if (this.dataType == "grid") {
            if (d == "window" && this.conf.skin == "dhx_skyblue") {
                this.dataObj.entBox.style.border = "1px solid #a4bed4";
                this.dataObj._sizeFix = 0
            } else {
                this.dataObj.entBox.style.border = "0px solid white";
                this.dataObj._sizeFix = 2
            }
        }
    } else {
        while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {
            this.cell.childNodes[this.conf.idx.cont].appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)
        }
    }
    this.conf.view = b.conf.view;
    b.conf.view = "def";
    for (var c in b.views) {
        this.views[c] = b.views[c];
        b.views[c] = null;
        delete b.views[c]
    }
    b._updateIdx();
    b._adjustCont();
    this._updateIdx();
    this._adjustCont();
    if (b.conf.progress == true) {
        b.progressOff();
        this.progressOn()
    } else {
        this.progressOff()
    }
    if (d == "window" && this.wins.w[this._idd].conf.parked) {
        this.wins._winCellSetOpacity(this._idd, "close", false)
    }
};

function dhtmlXCellTop(d, b) {
    if (arguments.length == 0 || typeof(d) == "undefined") {
        return
    }
    var a = this;
    this.dataNodes = {};
    this.conf.ofs = {
        t: 0,
        b: 0,
        l: 0,
        r: 0
    };
    this.conf.ofs_nodes = {
        t: {},
        b: {}
    };
    this.conf.progress = false;
    this.conf.fs_mode = false;
    this.conf.fs_tm = null;
    this.conf.fs_resize = false;
    if (d == document.body) {
        this.conf.fs_mode = true;
        this.base = d;
        if (this.base == document.body) {
            var c = {
                dhx_skyblue: {
                    t: 2,
                    b: 2,
                    l: 2,
                    r: 2
                },
                dhx_web: {
                    t: 8,
                    b: 8,
                    l: 8,
                    r: 8
                },
                dhx_terrace: {
                    t: 9,
                    b: 9,
                    l: 8,
                    r: 8
                },
                material: {
                    t: 9,
                    b: 9,
                    l: 8,
                    r: 8
                }
            };
            this.conf.ofs = (c[this.conf.skin] != null ? c[this.conf.skin] : c.dhx_skyblue)
        }
    } else {
        this.base = (typeof(d) == "string" ? document.getElementById(d) : d)
    }
    this.base.className += " " + this.conf.css + "_base_" + this.conf.skin;
    this.cont = document.createElement("DIV");
    this.cont.className = this.conf.css + "_cont";
    this.base.appendChild(this.cont);
    if (b != null) {
        this.setOffsets(b, false)
    } else {
        if (this.base._ofs != null) {
            this.setOffsets(this.base._ofs, false);
            this.base._ofs = null;
            try {
                delete this.base._ofs
            } catch (f) {}
        }
    }
    this._adjustCont = function() {
        var h = this.conf.ofs.t;
        for (var g in this.conf.ofs_nodes.t) {
            h += (this.conf.ofs_nodes.t[g] == true ? this.dataNodes[g].offsetHeight : 0)
        }
        var e = this.conf.ofs.b;
        for (var g in this.conf.ofs_nodes.b) {
            e += (this.conf.ofs_nodes.b[g] == true ? this.dataNodes[g].offsetHeight : 0)
        }
        this.cont.style.left = this.conf.ofs.l + "px";
        this.cont.style.width = this.base.clientWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
        this.cont.style.top = h + "px";
        this.cont.style.height = this.base.clientHeight - h - e + "px"
    };
    this._setBaseSkin = function(e) {
        this.base.className = this.base.className.replace(new RegExp(this.conf.css + "_base_" + this.conf.skin, "gi"), this.conf.css + "_base_" + e)
    };
    this._initFSResize = function() {
        if (this.conf.fs_resize == true) {
            return
        }
        this._doOnResizeStart = function() {
            window.clearTimeout(a.conf.fs_tm);
            a.conf.fs_tm = window.setTimeout(a._doOnResizeEnd, 200)
        };
        this._doOnResizeEnd = function() {
            a.setSizes()
        };
        if (typeof(window.addEventListener) == "function") {
            window.addEventListener("resize", this._doOnResizeStart, false)
        } else {
            window.attachEvent("onresize", this._doOnResizeStart)
        }
        this.conf.fs_resize = true
    };
    if (this.conf.fs_mode == true) {
        this._initFSResize()
    }
    this._unloadTop = function() {
        this._mtbUnload();
        this.detachHeader();
        this.detachFooter();
        if (this.conf.fs_mode == true) {
            if (typeof(window.addEventListener) == "function") {
                window.removeEventListener("resize", this._doOnResizeStart, false)
            } else {
                window.detachEvent("onresize", this._doOnResizeStart)
            }
        }
        this.base.removeChild(this.cont);
        var e = new RegExp("s{0,}" + this.conf.css + "_base_" + this.conf.skin, "gi");
        this.base.className = this.base.className.replace(e, "");
        this.cont = this.base = null;
        a = null
    };
    d = null
}
dhtmlXCellTop.prototype.setOffsets = function(f, e) {
    var d = false;
    for (var b in f) {
        var c = b.charAt(0);
        if (typeof(this.conf.ofs[c]) != "undefined" && !isNaN(f[b])) {
            this.conf.ofs[c] = parseInt(f[b]);
            d = true
        }
    }
    if (e !== false && typeof(this.setSizes) == "function" && d == true) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.attachMenu = function(a) {
    if (this.dataNodes.menu != null) {
        return
    }
    this.dataNodes.menuObj = document.createElement("DIV");
    this.dataNodes.menuObj.className = "dhxcelltop_menu";
    this.base.insertBefore(this.dataNodes.menuObj, this.dataNodes.toolbarObj || this.dataNodes.ribbonObj || this.cont);
    if (typeof(a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.menuObj;
    this.dataNodes.menu = new dhtmlXMenuObject(a);
    this.dataNodes.menuEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.menuObj.style.display == "none") {
            return
        }
        if (this.conf.ofs_menu == null) {
            this.dataNodes.menuObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
            this.conf.ofs_menu = {
                w: this.dataNodes.menuObj.offsetWidth - parseInt(this.dataNodes.menuObj.style.width)
            }
        }
        this.dataNodes.menuObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.menuObj.style.marginTop = (this.dataNodes.haObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.menuObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r - this.conf.ofs_menu.w + "px"
    });
    this.conf.ofs_nodes.t.menuObj = true;
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.menu
};
dhtmlXCellTop.prototype.detachMenu = function() {
    if (this.dataNodes.menu == null) {
        return
    }
    this.dataNodes.menu.unload();
    this.dataNodes.menu = null;
    this.dataNodes.menuObj.parentNode.removeChild(this.dataNodes.menuObj);
    this.dataNodes.menuObj = null;
    this.detachEvent(this.dataNodes.menuEv);
    this.dataNodes.menuEv = null;
    delete this.dataNodes.menu;
    delete this.dataNodes.menuObj;
    delete this.dataNodes.menuEv;
    this.conf.ofs_nodes.t.menuObj = false;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.attachToolbar = function(a) {
    if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
        return
    }
    this.dataNodes.toolbarObj = document.createElement("DIV");
    this.dataNodes.toolbarObj.className = "dhxcelltop_toolbar";
    this.base.insertBefore(this.dataNodes.toolbarObj, this.cont);
    this.dataNodes.toolbarObj.appendChild(document.createElement("DIV"));
    if (typeof(a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.toolbarObj.firstChild;
    this.dataNodes.toolbar = new dhtmlXToolbarObject(a);
    this.dataNodes.toolbarEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.toolbarObj.style.display == "none") {
            return
        }
        this.dataNodes.toolbarObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.toolbarObj.style.marginTop = (this.dataNodes.haObj != null || this.dataNodes.menuObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.toolbarObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.dataNodes.toolbar._masterCell = this;
    this.dataNodes.toolbar.attachEvent("_onIconSizeChange", function() {
        this._masterCell.setSizes()
    });
    this.conf.ofs_nodes.t.toolbarObj = true;
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.toolbar
};
dhtmlXCellTop.prototype.detachToolbar = function() {
    if (this.dataNodes.toolbar == null) {
        return
    }
    this.dataNodes.toolbar._masterCell = null;
    this.dataNodes.toolbar.unload();
    this.dataNodes.toolbar = null;
    this.dataNodes.toolbarObj.parentNode.removeChild(this.dataNodes.toolbarObj);
    this.dataNodes.toolbarObj = null;
    this.detachEvent(this.dataNodes.toolbarEv);
    this.dataNodes.toolbarEv = null;
    this.conf.ofs_nodes.t.toolbarObj = false;
    delete this.dataNodes.toolbar;
    delete this.dataNodes.toolbarObj;
    delete this.dataNodes.toolbarEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.attachRibbon = function(a) {
    if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {
        return
    }
    this.dataNodes.ribbonObj = document.createElement("DIV");
    this.dataNodes.ribbonObj.className = "dhxcelltop_ribbon";
    this.base.insertBefore(this.dataNodes.ribbonObj, this.cont);
    this.dataNodes.ribbonObj.appendChild(document.createElement("DIV"));
    if (typeof(a) != "object" || a == null) {
        a = {}
    }
    a.skin = this.conf.skin;
    a.parent = this.dataNodes.ribbonObj.firstChild;
    this.dataNodes.ribbon = new dhtmlXRibbon(a);
    this.dataNodes.ribbonEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.ribbonObj.style.display == "none") {
            return
        }
        this.dataNodes.ribbonObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.ribbonObj.style.marginTop = (this.dataNodes.haObj != null || this.dataNodes.menuObj != null ? 0 : this.conf.ofs.t) + "px";
        this.dataNodes.ribbonObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px";
        this.dataNodes.ribbon.setSizes()
    });
    this.conf.ofs_nodes.t.ribbonObj = true;
    var b = this;
    this.dataNodes.ribbon.attachEvent("_onHeightChanged", function() {
        b.setSizes()
    });
    this.setSizes();
    a.parnt = null;
    a = null;
    return this.dataNodes.ribbon
};
dhtmlXCellTop.prototype.detachRibbon = function() {
    if (this.dataNodes.ribbon == null) {
        return
    }
    this.dataNodes.ribbon.unload();
    this.dataNodes.ribbon = null;
    this.dataNodes.ribbonObj.parentNode.removeChild(this.dataNodes.ribbonObj);
    this.dataNodes.ribbonObj = null;
    this.detachEvent(this.dataNodes.ribbonEv);
    this.dataNodes.ribbonEv = null;
    this.conf.ofs_nodes.t.ribbonObj = false;
    delete this.dataNodes.ribbon;
    delete this.dataNodes.ribbonObj;
    delete this.dataNodes.ribbonEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.attachStatusBar = function(a) {
    if (this.dataNodes.sbObj) {
        return
    }
    if (typeof(a) == "undefined") {
        a = {}
    }
    this.dataNodes.sbObj = document.createElement("DIV");
    this.dataNodes.sbObj.className = "dhxcelltop_statusbar";
    if (this.cont.nextSibling != null) {
        this.base.insertBefore(this.dataNodes.sbObj, this.cont.nextSibling)
    } else {
        this.base.appendChild(this.dataNodes.sbObj)
    }
    this.dataNodes.sbObj.innerHTML = "<div class='dhxcont_statusbar'>" + (typeof(a.text) == "string" && a.text.length > 0 ? a.text : "&nbsp;") + "</div>";
    if (typeof(a.height) == "number") {
        this.dataNodes.sbObj.firstChild.style.height = this.dataNodes.sbObj.firstChild.style.lineHeight = a.height + "px"
    }
    this.dataNodes.sbObj.setText = function(b) {
        this.childNodes[0].innerHTML = b
    };
    this.dataNodes.sbObj.getText = function() {
        return this.childNodes[0].innerHTML
    };
    this.dataNodes.sbObj.onselectstart = function(b) {
        return false
    };
    this.dataNodes.sbEv = this.attachEvent("_onSetSizes", function() {
        if (this.dataNodes.sbObj.style.display == "none") {
            return
        }
        this.dataNodes.sbObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.sbObj.style.bottom = (this.dataNodes.faObj != null ? this.dataNodes.faObj.offsetHeight : 0) + this.conf.ofs.t + "px";
        this.dataNodes.sbObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.conf.ofs_nodes.b.sbObj = true;
    this.setSizes();
    return this.dataNodes.sbObj
};
dhtmlXCellTop.prototype.detachStatusBar = function() {
    if (!this.dataNodes.sbObj) {
        return
    }
    this.dataNodes.sbObj.setText = this.dataNodes.sbObj.getText = this.dataNodes.sbObj.onselectstart = null;
    this.dataNodes.sbObj.parentNode.removeChild(this.dataNodes.sbObj);
    this.dataNodes.sbObj = null;
    this.detachEvent(this.dataNodes.sbEv);
    this.dataNodes.sbEv = null;
    this.conf.ofs_nodes.b.sbObj = false;
    delete this.dataNodes.sb;
    delete this.dataNodes.sbObj;
    delete this.dataNodes.sbEv;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.showMenu = function() {
    this._mtbShowHide("menuObj", "")
};
dhtmlXCellTop.prototype.hideMenu = function() {
    this._mtbShowHide("menuObj", "none")
};
dhtmlXCellTop.prototype.showToolbar = function() {
    this._mtbShowHide("toolbarObj", "")
};
dhtmlXCellTop.prototype.hideToolbar = function() {
    this._mtbShowHide("toolbarObj", "none")
};
dhtmlXCellTop.prototype.showRibbon = function() {
    this._mtbShowHide("ribbonObj", "")
};
dhtmlXCellTop.prototype.hideRibbon = function() {
    this._mtbShowHide("ribbonObj", "none")
};
dhtmlXCellTop.prototype.showStatusBar = function() {
    this._mtbShowHide("sbObj", "")
};
dhtmlXCellTop.prototype.hideStatusBar = function() {
    this._mtbShowHide("sbObj", "none")
};
dhtmlXCellTop.prototype._mtbShowHide = function(b, a) {
    if (this.dataNodes[b] == null) {
        return
    }
    this.dataNodes[b].style.display = a;
    this.setSizes()
};
dhtmlXCellTop.prototype._mtbUnload = function(b, a) {
    this.detachMenu();
    this.detachToolbar();
    this.detachStatusBar();
    this.detachRibbon()
};
dhtmlXCellTop.prototype.getAttachedMenu = function() {
    return this.dataNodes.menu
};
dhtmlXCellTop.prototype.getAttachedToolbar = function() {
    return this.dataNodes.toolbar
};
dhtmlXCellTop.prototype.getAttachedRibbon = function() {
    return this.dataNodes.ribbon
};
dhtmlXCellTop.prototype.getAttachedStatusBar = function() {
    return this.dataNodes.sbObj
};
dhtmlXCellTop.prototype.progressOn = function() {
    if (this.conf.progress) {
        return
    }
    this.conf.progress = true;
    var b = document.createElement("DIV");
    b.className = "dhxcelltop_progress";
    this.base.appendChild(b);
    var a = document.createElement("DIV");
    if (this.conf.skin == "material" && (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {
        a.className = "dhxcelltop_progress_svg";
        a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'
    } else {
        var a = document.createElement("DIV");
        a.className = "dhxcelltop_progress_img"
    }
    this.base.appendChild(a);
    b = a = null
};
dhtmlXCellTop.prototype.progressOff = function() {
    if (!this.conf.progress) {
        return
    }
    var d = {
        dhxcelltop_progress: true,
        dhxcelltop_progress_img: true,
        dhxcelltop_progress_svg: true
    };
    for (var c = 0; c < this.base.childNodes.length; c++) {
        if (typeof(this.base.childNodes[c].className) != "undefined" && d[this.base.childNodes[c].className] == true) {
            d[this.base.childNodes[c].className] = this.base.childNodes[c]
        }
    }
    for (var b in d) {
        if (d[b] != true) {
            this.base.removeChild(d[b])
        }
        d[b] = null
    }
    this.conf.progress = false;
    d = null
};
dhtmlXCellTop.prototype.attachHeader = function(b, a) {
    if (this.dataNodes.haObj != null) {
        return
    }
    if (typeof(b) != "object") {
        b = document.getElementById(b)
    }
    this.dataNodes.haObj = document.createElement("DIV");
    this.dataNodes.haObj.className = "dhxcelltop_hdr";
    this.dataNodes.haObj.style.height = (a || b.offsetHeight) + "px";
    this.base.insertBefore(this.dataNodes.haObj, this.dataNodes.menuObj || this.dataNodes.toolbarObj || this.cont);
    this.dataNodes.haObj.appendChild(b);
    b.style.visibility = "visible";
    b = null;
    this.dataNodes.haEv = this.attachEvent("_onSetSizes", function() {
        this.dataNodes.haObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.haObj.style.marginTop = this.conf.ofs.t + "px";
        this.dataNodes.haObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.conf.ofs_nodes.t.haObj = true;
    this.setSizes()
};
dhtmlXCellTop.prototype.detachHeader = function() {
    if (!this.dataNodes.haObj) {
        return
    }
    while (this.dataNodes.haObj.childNodes.length > 0) {
        this.dataNodes.haObj.lastChild.style.visibility = "hidden";
        document.body.appendChild(this.dataNodes.haObj.lastChild)
    }
    this.dataNodes.haObj.parentNode.removeChild(this.dataNodes.haObj);
    this.dataNodes.haObj = null;
    this.detachEvent(this.dataNodes.haEv);
    this.dataNodes.haEv = null;
    this.conf.ofs_nodes.t.haObj = false;
    delete this.dataNodes.haEv;
    delete this.dataNodes.haObj;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};
dhtmlXCellTop.prototype.attachFooter = function(c, a) {
    if (this.dataNodes.faObj != null) {
        return
    }
    if (typeof(c) != "object") {
        c = document.getElementById(c)
    }
    this.dataNodes.faObj = document.createElement("DIV");
    this.dataNodes.faObj.className = "dhxcelltop_ftr";
    this.dataNodes.faObj.style.height = (a || c.offsetHeight) + "px";
    var b = (this.dataNodes.sbObj || this.cont);
    if (this.base.lastChild == b) {
        this.base.appendChild(this.dataNodes.faObj)
    } else {
        this.base.insertBefore(this.dataNodes.faObj, b.nextSibling)
    }
    this.dataNodes.faEv = this.attachEvent("_onSetSizes", function() {
        this.dataNodes.faObj.style.left = this.conf.ofs.l + "px";
        this.dataNodes.faObj.style.bottom = this.conf.ofs.b + "px";
        this.dataNodes.faObj.style.width = this.base.offsetWidth - this.conf.ofs.l - this.conf.ofs.r + "px"
    });
    this.dataNodes.faObj.appendChild(c);
    c.style.visibility = "visible";
    b = c = null;
    this.conf.ofs_nodes.b.faObj = true;
    this.setSizes()
};
dhtmlXCellTop.prototype.detachFooter = function() {
    if (!this.dataNodes.faObj) {
        return
    }
    while (this.dataNodes.faObj.childNodes.length > 0) {
        this.dataNodes.faObj.lastChild.style.visibility = "hidden";
        document.body.appendChild(this.dataNodes.faObj.lastChild)
    }
    this.dataNodes.faObj.parentNode.removeChild(this.dataNodes.faObj);
    this.dataNodes.faObj = null;
    this.detachEvent(this.dataNodes.faEv);
    this.dataNodes.faEv = null;
    this.conf.ofs_nodes.b.faObj = false;
    delete this.dataNodes.faEv;
    delete this.dataNodes.faObj;
    if (!this.conf.unloading) {
        this.setSizes()
    }
};

function dhtmlXTabBar(d, g) {
    var e = this;
    this.conf = {
        skin: (window.dhx4.skin || (typeof(dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhxtabbar") || "material"),
        css: "dhxtabbar",
        lastActive: null,
        closeButton: false,
        align: "left",
        tabsMode: (g == "bottom" ? "bottom" : "top"),
        tabsContCss: "",
        contZone: true,
        transSpeed: "0.15s",
        arwMode: "always",
        tabsOfs: 1,
        tabsTop: 0,
        url_demand: false,
        urls: {},
        autoload: {},
        tabsWidth: {
            dhx_terrace: [44, 14],
            dhx_web: [35, 9],
            dhx_skyblue: [35, 9],
            material: [44, 14]
        }
    };
    if (this.conf.skin == "material") {
        this.conf.arwMode = "auto"
    }
    var b = navigator.userAgent;
    if (b.indexOf("Safari") >= 0 && (b.indexOf("5.1.7") >= 0 || (b.match(/7[\.\d]* mobile/gi) != null && b.match(/AppleWebKit/gi) != null))) {
        this.conf.tabsContCss = " safari_517_fix"
    }
    var f;
    if (d != null && typeof(d) == "object" && typeof(d.tagName) == "undefined") {
        f = d.parent;
        if (typeof(d.skin) != "undefined") {
            this.conf.skin = d.skin
        }
        if (typeof(d.mode) != "undefined") {
            this.conf.tabsMode = (d.mode == "bottom" ? "bottom" : "top")
        }
        if (typeof(d.align) != "undefined") {
            this.conf.align = (d.align == "right" ? "right" : "left")
        }
        if (typeof(d.close_button) != "undefined") {
            this.conf.closeButton = window.dhx4.s2b(d.close_button)
        }
        if (typeof(d.content_zone) != "undefined") {
            this.conf.contZone = window.dhx4.s2b(d.content_zone)
        }
        if (typeof(d.xml) != "undefined") {
            this.conf.autoload.xml = d.xml
        }
        if (typeof(d.json) != "undefined") {
            this.conf.autoload.xml = d.json
        }
        if (typeof(d.tabs) != "undefined") {
            this.conf.autoload.tabs = d.tabs
        }
        if (typeof(d.onload) != "undefined") {
            this.conf.autoload.onload = d.onload
        }
        if (typeof(d.arrows_mode) != "undefined") {
            this.conf.autoload.arrows_mode = d.arrows_mode
        }
    } else {
        f = d
    }
    window.dhtmlXCellTop.apply(this, [f, d.offsets]);
    if (this.base._ofs != null && this.base._ofs.t != null) {
        this.conf.tabsTop = this.base._ofs.t
    }
    this.tabsMode = document.createElement("DIV");
    this.tabsMode.className = "dhxtabbar_tabs_" + this.conf.tabsMode;
    this.cont.appendChild(this.tabsMode);
    this.tabsArea = document.createElement("DIV");
    this.tabsArea.className = "dhxtabbar_tabs dhxtabbar_tabs_" + this.conf.tabsMode;
    this.tabsArea.innerHTML = "<div class='dhxtabbar_tabs_ar_left'><div class='dhxtabbar_arrow_img'></div></div><div class='dhxtabbar_tabs_base'><div class='dhxtabbar_tabs_cont_" + this.conf.align + this.conf.tabsContCss + "'><div class='dhxtabbar_tabs_line'></div></div></div><div class='dhxtabbar_tabs_ar_right'><div class='dhxtabbar_arrow_img'></div></div>";
    this.tabsArea.style.top = (this.conf.tabsMode == "top" ? this.conf.tabsTop + "px" : "auto");
    this.tabsMode.appendChild(this.tabsArea);
    this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align] = "0px";
    this.tabsArea.childNodes[0].onclick = function() {
        if (e.conf.align == "left") {
            e._moveTabs(1)
        } else {
            e._moveTabs(-1)
        }
    };
    this.tabsArea.childNodes[2].onclick = function() {
        if (e.conf.align == "left") {
            e._moveTabs(-1)
        } else {
            e._moveTabs(1)
        }
    };
    this._onTabsAreaClick = function(a) {
        return this._callMainEvent("onTabClose", [a])
    };
    this.tabsArea.onclick = function(h) {
        h = h || event;
        var a = (h.target || h.srcElement);
        while (a != null) {
            if (typeof(a._tabCloseId) != "undefined") {
                if (e._onTabsAreaClick(a._tabCloseId) !== true) {
                    return
                }
                e.t[a._tabCloseId].conf.remove = true;
                e._hideTab(a._tabCloseId);
                a = null
            } else {
                if (typeof(a._tabId) != "undefined") {
                    e._doOnClick(a._tabId);
                    a = null
                }
            }
            if (a != null) {
                a = a.parentNode;
                if (a == this) {
                    a = null
                }
            }
        }
    };
    this.tabsArea.onselectstart = function(a) {
        a = a || event;
        if (a.preventDefault) {
            a.preventDefault()
        } else {
            a.returnValue = false
        }
    };
    this._doOnClick = function(a) {
        this.callEvent("onTabClick", [a, this.conf.lastActive]);
        if (this.t[a].conf.enabled) {
            this._setTabActive(a)
        }
    };
    this.t = {};
    this.addTab = function(a, n, i, l, k, o) {
        o = (typeof(o) == "undefined" ? (this.conf.closeButton == true) : window.dhx4.s2b(o));
        k = window.dhx4.s2b(k);
        var j = document.createElement("DIV");
        j.className = "dhxtabbar_tab";
        j.innerHTML = "<div class='dhxtabbar_tab_text" + (o ? " dhxtabbar_tab_text_close" : "") + "'>" + n + "</div>" + (o ? "<div class='dhxtabbar_tab_close'></div>" : "");
        j._tabId = a;
        if (o) {
            j.childNodes[1]._tabCloseId = a
        }
        var h = this.tabsArea.childNodes[1].firstChild;
        if (l != null && l + 1 > 0 && l + 1 < h.childNodes.length) {
            h.insertBefore(j, h.childNodes[l + 1])
        } else {
            h.appendChild(j)
        }
        var q = false;
        if (typeof(i) == "undefined" || i == null || i == "*") {
            i = this._getLabelWidth(n, o);
            q = true
        } else {
            i = parseInt(i)
        }
        j.style.width = i + "px";
        var m = new dhtmlXTabBarCell(a, this);
        this.tabsMode.appendChild(m.cell);
        this.t[a] = {
            tab: j,
            cell: m,
            conf: {
                text: n,
                visible: true,
                active: false,
                enabled: true,
                close: o,
                width: i,
                autowidth: q
            }
        };
        h = m = null;
        if (k) {
            this._setTabActive(a)
        } else {
            this._adjustCell(a)
        }
        if (this.conf.initSeq != true && this.conf.arwMode == "auto") {
            this.setSizes()
        }
    };
    this.setSizes = function() {
        this._adjustCont();
        if (this.conf.tabsAreaOfs == null) {
            this.tabsArea.style.width = this.cont.offsetWidth + "px";
            this.conf.tabsAreaOfs = parseInt(this.tabsArea.style.width) - this.tabsArea.offsetWidth
        }
        this.tabsArea.style.width = this.cont.offsetWidth + this.conf.tabsAreaOfs + "px";
        this._adjustCell(this.conf.lastActive);
        this._adjustTabs(true);
        this.callEvent("_onSetSizes", [])
    };
    this._adjustCell = function(k) {
        if (!this.conf.contZone || k == null) {
            return
        }
        var j = (this.conf.tabsMode == "top" ? this.tabsArea.offsetHeight : 0) + this.conf.tabsTop;
        var i = this.cont.offsetHeight - this.tabsArea.offsetHeight - this.conf.tabsTop;
        var a = this.t[k].cell.dataType;
        if (this.conf.skin == "dhx_skyblue" && (a == "layout" || a == "tabbar" || a == "acc")) {
            if (this.conf.tabsMode == "top") {
                j = j - 1
            }
            i = i + 1
        }
        if (k != this.conf.lastActive) {
            j = -5000;
            this.t[k].cell.cell.style.visibility = "hidden";
            this.t[k].cell.cell.style.zIndex = 0
        }
        this.t[k].cell._setSize(0, j, this.cont.offsetWidth, i)
    };
    this.setTabsMode = function(a) {
        this.conf.tabsMode = (a == "bottom" ? "bottom" : "top");
        this.tabsMode.className = "dhxtabbar_tabs_" + this.conf.tabsMode;
        this.tabsArea.className = "dhxtabbar_tabs dhxtabbar_tabs_" + this.conf.tabsMode;
        this.tabsArea.style.top = (this.conf.tabsMode == "top" ? this.conf.tabsTop + "px" : "auto");
        this.setSizes()
    };
    this._tabCss = function(m, k) {
        var i = this.t[m].conf.active;
        var l = !this.t[m].conf.enabled;
        var j = !this.t[m].conf.visible;
        return "dhxtabbar_tab" + (j ? " dhxtabbar_tab_hidden" : (i || l ? " dhxtabbar_tab" + (i ? "_actv" : "") + (l ? "_dis" : "") : ""))
    };
    this._getLabelWidth = function(i, h) {
        if (this.tabsTextTest == null) {
            this.tabsTextTest = document.createElement("SPAN");
            this.tabsTextTest.className = "dhxtabbar_tabs_text_test_" + this.conf.skin
        }
        document.body.appendChild(this.tabsTextTest);
        this.tabsTextTest.innerHTML = i;
        var a = this.tabsTextTest.offsetWidth;
        if (window.dhx4.isIE && a == 0) {
            a = this.tabsTextTest.offsetWidth
        }
        a += this.conf.tabsWidth[this.conf.skin][0];
        if (h == true) {
            a += this.conf.tabsWidth[this.conf.skin][1]
        }
        document.body.removeChild(this.tabsTextTest);
        return a
    };
    this._adjustTabs = function(j) {
        if (this._checkArrows() == true || j == true) {
            this.tabsArea.childNodes[1].style.left = this.tabsArea.childNodes[0].offsetWidth - 1 + "px";
            this.tabsArea.childNodes[1].style.width = Math.max(0, this.tabsArea.clientWidth - this.tabsArea.childNodes[0].offsetWidth - this.tabsArea.childNodes[2].offsetWidth) + this.conf.tabsOfs * 2 + "px"
        }
        var m = this.tabsArea.childNodes[1];
        if (m.offsetWidth < 5) {
            m = null;
            return
        }
        var a = parseInt(m.childNodes[0].style[this.conf.align]);
        var i = null;
        for (var l = 0; l < m.childNodes[0].childNodes.length; l++) {
            var n = m.childNodes[0].childNodes[l]._tabId;
            if (n != null && this.t[n].conf.visible) {
                var h = this.t[n].tab.offsetWidth - this.conf.tabsOfs;
                if (this.t[n].conf.active) {
                    if (a < 0 || m.offsetWidth < h) {
                        i = {
                            d: 1,
                            id: n
                        }
                    } else {
                        if (a + h > m.offsetWidth) {
                            i = {
                                d: -1,
                                id: n
                            }
                        }
                    }
                }
                a += h
            }
        }
        if (i != null) {
            this._moveTabs(i.d, i.id)
        } else {
            if (m.offsetWidth > a + 1) {
                m.childNodes[0].style[this.conf.align] = Math.min(0, parseInt(m.childNodes[0].style[this.conf.align]) + (m.offsetWidth - a)) + "px"
            }
        }
        m = i = null
    };
    this._moveTabs = function(s, k) {
        var j = this.tabsArea.childNodes[1].childNodes[0];
        var o = 0;
        var u = [];
        var w = null;
        for (var a = 0; a < j.childNodes.length; a++) {
            var h = j.childNodes[a]._tabId;
            if (h != null && this.t[h].conf.visible) {
                u.push({
                    id: h,
                    w: this.t[h].tab.offsetWidth - this.conf.tabsOfs,
                    ind: o
                });
                if (h == k) {
                    w = o
                }
                o++
            }
        }
        var v = parseInt(this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align]);
        var n = this.tabsArea.clientWidth - this.tabsArea.childNodes[0].offsetWidth - this.tabsArea.childNodes[2].offsetWidth + this.conf.tabsOfs;
        var r = null;
        var m = null;
        for (var a = 0; a < u.length; a++) {
            u[a].x = v;
            if (r == null && v >= 0 && v + u[a].w > 0) {
                r = u[a]
            }
            if (v < n && v + u[a].w <= n) {
                m = u[a]
            }
            v += u[a].w
        }
        if (w != null) {
            var y = u[w]
        } else {
            var y = null;
            if (s > 0) {
                if (r == null) {
                    if (u.length > 0) {
                        y = u[u.length - 1]
                    }
                } else {
                    if (r.ind > 0 && u.length >= r.ind) {
                        y = u[r.ind - 1]
                    }
                }
            } else {
                if (m == null) {
                    if (u.length > 0) {
                        y = u[0]
                    }
                } else {
                    if (u.length > m.ind) {
                        y = u[m.ind + 1]
                    }
                }
            }
        }
        if (y != null) {
            if (s > 0) {
                if (v < n) {
                    j.style[this.conf.align] = Math.min(0, parseInt(j.style[this.conf.align]) + (n - v)) + "px"
                } else {
                    j.style[this.conf.align] = parseInt(j.style[this.conf.align]) - y.x + "px"
                }
            } else {
                j.style[this.conf.align] = parseInt(j.style[this.conf.align]) - y.x + n - y.w + "px"
            }
        }
        j = y = u = null
    };
    this._getNextVisible = function(h, a) {
        return this._getNearVisible(h, a, "next")
    };
    this._getPrevVisible = function(h, a) {
        return this._getNearVisible(h, a, "previous")
    };
    this._getFirstVisible = function() {
        return this._getNearVisible(null, false, "first")
    };
    this._getNearVisible = function(m, i, l) {
        if (l == "first") {
            var j = this.tabsArea.childNodes[1].childNodes[0].childNodes[1];
            l = "next"
        } else {
            if (m == null || this.t[m] == null) {
                return (i ? this._getFirstVisible() : null)
            }
            var j = this.t[m].tab[l + "Sibling"]
        }
        var h = null;
        while (j != null && h == null) {
            var a = j._tabId;
            if (a != null && h == null && this.t[a].conf.visible) {
                h = a
            } else {
                j = j[l + "Sibling"]
            }
        }
        j = null;
        return h
    };
    this._showTab = function(h, a) {
        if (this.t[h] == null) {
            return
        }
        if (this.t[h].conf.transActv == true) {
            if (this.t[h].conf.transMode == "show") {
                return
            }
        } else {
            if (this.t[h].conf.visible == true) {
                return
            }
        }
        if (this.conf.transProp !== false) {
            this.t[h].conf.transActv = true;
            this.t[h].conf.transMode = "show";
            this.t[h].conf.transProp = this.conf.transProp;
            this.t[h].conf.transActvId = (a ? h : null);
            if (!this.t[h].conf.transEv) {
                this.t[h].tab.addEventListener(this.conf.transEv, this._doOnTrEnd, false);
                this.t[h].conf.transEv = true
            }
            this.t[h].conf.visible = true;
            this.t[h].tab.className = this._tabCss(h);
            this.t[h].tab.style[this.conf.transProp] = this.conf.transValueWidth;
            this.t[h].tab.style.width = this.t[h].conf.width + "px";
            if (this.t[h].tab.clientWidth >= this.t[h].conf.width) {
                this.t[h].tab.style.visibility = "visible"
            }
        } else {
            this.t[h].conf.visible = true;
            this.t[h].tab.style.display = "";
            if (a || this.t[h].conf.active) {
                this.t[h].conf.active = false;
                this._setTabActive(h)
            } else {
                this._adjustTabs()
            }
        }
    };
    this._hideTab = function(l, a) {
        if (this.t[l] == null) {
            return
        }
        if (this.t[l].conf.transActv == true) {
            if (this.t[l].conf.transMode == "hide") {
                return
            }
        } else {
            if (this.t[l].conf.visible != true) {
                return
            }
        }
        var h = false;
        if (this.conf.lastActive == l) {
            this.conf.lastActive = null;
            this.t[l].conf.active = false;
            this.t[l].tab.className = this._tabCss(l);
            h = true
        }
        var j = this._getPrevVisible(l);
        var i = this._getNextVisible(l);
        var k = (h == true && a !== false ? (a == true ? null : a) || i || j : null);
        if (this.conf.transProp !== false) {
            this.t[l].conf.transActv = true;
            this.t[l].conf.transMode = "hide";
            this.t[l].conf.transProp = this.conf.transProp;
            this.t[l].conf.transActvId = k;
            this.t[l].conf.visible = false;
            if (!this.t[l].conf.transEv) {
                this.t[l].tab.addEventListener(this.conf.transEv, this._doOnTrEnd, false);
                this.t[l].conf.transEv = true
            }
            this.t[l].tab.style.visibility = "hidden";
            this.t[l].tab.className = e._tabCss(l);
            this.t[l].tab.style[this.conf.transProp] = this.conf.transValueWidth;
            this.t[l].tab.style.width = "0px"
        } else {
            this.t[l].tab.style.display = "none";
            this.t[l].conf.visible = false;
            if (this.conf.contZone) {
                this.t[l].cell.cell.style.visibility = "hidden";
                this.t[l].cell.cell.style.top = "-5000px"
            }
            if (k != null) {
                this._setTabActive(k)
            }
            this._adjustTabs();
            if (this.t[l].conf.remove) {
                this._removeTab(l)
            }
        }
    };
    this._isTabVisible = function(a) {
        return (this.t[a].conf.visible == true)
    };
    this._doOnTrEnd = function() {
        var i = this._tabId;
        if (e.t[i] == null) {
            return
        }
        var a = e.t[i];
        var h = a.conf.transActvId;
        if (a.conf.transMode == "hide") {
            if (a.conf.remove) {
                e._removeTab(i)
            } else {
                a.tab.style[a.conf.transProp] = "";
                if (e.conf.contZone) {
                    a.cell.cell.style.visibility = "hidden";
                    a.cell.cell.style.top = "-5000px"
                }
                a.conf.transActv = false
            }
        } else {
            if (a.conf.transMode == "show") {
                a.tab.style[a.conf.transProp] = "";
                a.tab.style.visibility = "visible";
                a.conf.transMode = null;
                a.conf.transActv = false
            }
        }
        if (h != null) {
            e._setTabActive(h)
        } else {
            e._adjustTabs()
        }
        a = null
    };
    this.enableTabCloseButton = function(a) {
        this.conf.closeButton = window.dhx4.s2b(a)
    };
    this.unload = function() {
        this.conf.unloading = true;
        this.clearAll();
        this.t = null;
        if (this.tabsTextTest != null) {
            if (this.tabsTextTest.parentNode) {
                this.tabsTextTest.parentNode.removeChild(this.tabsTextTest)
            }
            this.tabsTextTest = null
        }
        window.dhx4._enableDataLoading(this, null, null, null, "clear");
        this.tabsArea.childNodes[0].onclick = null;
        this.tabsArea.childNodes[2].onclick = null;
        this.tabsArea.onclick = null;
        this.tabsArea.onselectstart = null;
        this.tabsArea.parentNode.removeChild(this.tabsArea);
        this.tabsArea = null;
        this.tabsMode.parentNode.removeChild(this.tabsMode);
        this.tabsMode = null;
        this._unloadTop();
        window.dhx4._eventable(this, "clear");
        for (var h in this) {
            this[h] = null
        }
        e = null
    };
    this.enableContentZone = function(a) {
        this.conf.contZone = (a == true)
    };
    this.setSkin = function(i) {
        this._setBaseSkin(i);
        this.conf.skin = i;
        if (this.tabsTextTest != null) {
            this.tabsTextTest.className = "dhxtabbar_tabs_text_test_" + this.conf.skin
        }
        for (var h in this.t) {
            this.t[h].cell._resetSizeState();
            if (this.t[h].conf.autowidth == true) {
                this.t[h].conf.width = this._getLabelWidth(this.t[h].conf.text, this.t[h].conf.close);
                if (this.t[h].conf.visible) {
                    this.t[h].tab.style.width = this.t[h].conf.width + "px"
                }
            }
        }
        this.conf.tabsAreaOfs = null;
        this._fixTabsOfs();
        this.setSizes()
    };
    this.setAlign = function(a) {
        a = (a == "left" ? "left" : "right");
        if (a == this.conf.align) {
            this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align] = "0px";
            return
        }
        if (this.conf.transProp !== false) {
            this.tabsArea.childNodes[1].childNodes[0].style[this.conf.transProp] = ""
        }
        this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align] = "";
        this.conf.align = a;
        this.tabsArea.childNodes[1].childNodes[0].className = "dhxtabbar_tabs_cont_" + this.conf.align + this.conf.tabsContCss;
        this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align] = "0px";
        if (this.conf.transProp !== false) {
            this.conf.transValuePos = this.conf.align + " " + this.conf.transSpeed;
            this.tabsArea.childNodes[1].childNodes[0].style[this.conf.transProp] = this.conf.transValuePos
        }
    };
    this._initObj = function(j) {
        this.conf.initSeq = true;
        this.clearAll();
        var a = false;
        if (j.settings != null) {
            if (j.settings.skin != null) {
                this.setSkin(j.settings.skin)
            }
            if (j.settings.close_button != null) {
                this.enableTabCloseButton(window.dhx4.s2b(j.settings.close_button))
            } else {
                if (j.settings.closeButton != null) {
                    this.enableTabCloseButton(window.dhx4.s2b(j.settings.closeButton))
                }
            }
            if (j.settings.align != null) {
                this.setAlign(j.settings.align)
            }
            if (j.settings.hrefmode == "ajax") {
                a = true
            }
            if (j.settings.hrefmode == "ajax-html") {
                a = true;
                this.conf.url_demand = true
            }
        }
        if (j.tabs != null) {
            for (var i = 0; i < j.tabs.length; i++) {
                var h = j.tabs[i];
                if (typeof(h.id) == "undefined") {
                    h.id = window.dhx4.newId()
                }
                if (!isNaN(parseInt(h.width))) {
                    h.width = parseInt(h.width)
                } else {
                    h.width = null
                }
                this.addTab(h.id, h.text || h.label || "", h.width, h.index, window.dhx4.s2b(h.selected) || window.dhx4.s2b(h.active), h.close);
                if (h.content != null) {
                    this.cells(h.id).attachHTMLString(h.content)
                } else {
                    if (h.href != null) {
                        if (this.conf.url_demand == true) {
                            this.conf.urls[h.id] = {
                                href: h.href,
                                ajax: a
                            }
                        } else {
                            this.cells(h.id).attachURL(h.href, a)
                        }
                    }
                }
                if (typeof(h.enabled) != "undefined" && window.dhx4.s2b(h.enabled) == false) {
                    this.tabs(h.id).disable()
                } else {
                    if (typeof(h.disabled) != "undefined" && window.dhx4.s2b(h.disabled) == true) {
                        this.tabs(h.id).disable()
                    }
                }
            }
        }
        this.conf.initSeq = false;
        if (this.conf.arwMode == "auto") {
            this.setSizes()
        }
        if (this.conf.url_demand == true) {
            this._loadURLOnDemand(this.conf.lastActive)
        }
    };
    this._xmlToObj = function(l) {
        var k = {
            settings: {},
            tabs: []
        };
        var h = l.getElementsByTagName("tabbar")[0];
        if (h != null) {
            for (var m in {
                    skin: 1,
                    align: 1,
                    closeButton: 1,
                    hrefmode: 1
                }) {
                if (h.getAttribute(m) != null) {
                    k.settings[m] = h.getAttribute(m)
                }
            }
            var o = h.getElementsByTagName("tab");
            for (var i = 0; i < o.length; i++) {
                var j = {
                    text: (o[i].firstChild.nodeValue || "")
                };
                for (var m in {
                        id: 1,
                        width: 1,
                        close: 1,
                        selected: 1,
                        active: 1,
                        enabled: 1,
                        disabled: 1,
                        href: 1
                    }) {
                    if (o[i].getAttribute(m) != null) {
                        j[m] = o[i].getAttribute(m)
                    }
                }
                var p = o[i].getElementsByTagName("content")[0];
                if (p != null) {
                    j.content = "";
                    for (var n = 0; n < p.childNodes.length; n++) {
                        j.content += (p.childNodes[n].nodeValue || "")
                    }
                }
                k.tabs.push(j)
            }
        }
        return k
    };
    dhx4._enableDataLoading(this, "_initObj", "_xmlToObj", "tabbar", {
        struct: true
    });
    var c = window.dhx4.transDetect();
    this.conf.transProp = c.transProp;
    this.conf.transEv = c.transEv;
    this.conf.transValueWidth = "width " + this.conf.transSpeed;
    c = null;
    if (this.conf.transProp !== false) {
        this.conf.transValuePos = this.conf.align + " " + this.conf.transSpeed;
        this.tabsArea.childNodes[1].childNodes[0].style[this.conf.transProp] = this.conf.transValuePos
    }
    this._callMainEvent = function(h, a) {
        return this.callEvent(h, a)
    };
    window.dhx4._eventable(this);
    if (this.conf.autoload.json != null) {
        this.loadStruct(this.conf.autoload.json, this.conf.autoload.onload)
    } else {
        if (this.conf.autoload.xml != null) {
            this.loadStruct(this.conf.autoload.xml, this.conf.autoload.onload)
        } else {
            if (this.conf.autoload.tabs != null) {
                this.loadStruct({
                    tabs: this.conf.autoload.tabs
                }, this.conf.autoload.onload)
            }
        }
    }
    if (this.conf.autoload.arrows_mode != null) {
        this.setArrowsMode(this.conf.autoload.arrows_mode)
    }
    this._fixTabsOfs();
    this.setSizes();
    return this
}
dhtmlXTabBar.prototype = new dhtmlXCellTop();
dhtmlXTabBar.prototype._fixTabsOfs = function() {
    this.conf.tabsOfs = ({
        dhx_skyblue: 1,
        dhx_web: 0,
        dhx_terrace: 1,
        material: 0
    } [this.conf.skin])
};
dhtmlXTabBar.prototype.cells = dhtmlXTabBar.prototype.tabs = function(a) {
    if (this.t[a]) {
        return this.t[a].cell
    }
    return null
};
dhtmlXTabBar.prototype.getAllTabs = function() {
    var c = [];
    for (var b in this.t) {
        c.push(b)
    }
    return c
};
dhtmlXTabBar.prototype._setTabActive = function(b, a) {
    if (!this.t[b] || this.t[b].conf.active) {
        return
    }
    if (typeof(a) == "undefined") {
        a = true
    }
    if (a == true && this.callEvent("onSelect", [b, this.conf.lastActive]) !== true) {
        return
    }
    this.setTabInActive();
    this.t[b].conf.active = true;
    if (this.conf.contZone) {
        this.t[b].cell.cell.style.visibility = "visible";
        this.t[b].cell.cell.style.top = "0px";
        this.t[b].cell.cell.style.zIndex = 1
    }
    this.t[b].tab.className = this._tabCss(b);
    this.conf.lastActive = b;
    this.setSizes();
    if (this.conf.url_demand == true) {
        this._loadURLOnDemand(b)
    }
};
dhtmlXTabBar.prototype.setTabInActive = function() {
    if (this.conf.lastActive != null && this.t[this.conf.lastActive]) {
        this.t[this.conf.lastActive].conf.active = false;
        if (this.conf.contZone) {
            this.t[this.conf.lastActive].cell.cell.style.visibility = "hidden";
            this.t[this.conf.lastActive].cell.cell.style.top = "-5000px";
            this.t[this.conf.lastActive].cell.cell.style.zIndex = 0
        }
        this.t[this.conf.lastActive].tab.className = this._tabCss(this.conf.lastActive);
        this.conf.lastActive = null
    }
};
dhtmlXTabBar.prototype._isTabActive = function(a) {
    return (a == this.conf.lastActive && this.conf.lastActive != null)
};
dhtmlXTabBar.prototype.getActiveTab = function() {
    return this.conf.lastActive
};
dhtmlXTabBar.prototype.goToNextTab = function() {
    var a = this._getNextVisible(this.conf.lastActive, true);
    if (a != null) {
        this._setTabActive(a)
    }
};
dhtmlXTabBar.prototype.goToPrevTab = function() {
    var a = this._getPrevVisible(this.conf.lastActive, true);
    if (a != null) {
        this._setTabActive(a)
    }
};
dhtmlXTabBar.prototype._enableTab = function(b, a) {
    if (!this.t[b] || this.t[b].conf.enabled) {
        return
    }
    this.t[b].conf.enabled = true;
    this.t[b].tab.className = this._tabCss(b);
    if (a == true) {
        this._setTabActive(b)
    }
};
dhtmlXTabBar.prototype._disableTab = function(b, a) {
    if (!this.t[b] || !this.t[b].conf.enabled) {
        return
    }
    this.t[b].conf.enabled = false;
    this.t[b].tab.className = this._tabCss(b);
    if (a !== false && this.conf.lastActive == b) {
        if (a == true) {
            a = this._getNextVisible(b) || this._getPrevVisible(b)
        }
        this._setTabActive(a)
    }
};
dhtmlXTabBar.prototype._isTabEnabled = function(a) {
    return (this.t[a] != null && this.t[a].conf.enabled == true)
};
dhtmlXTabBar.prototype._setTabText = function(d, c, b) {
    if (!this.t[d]) {
        return
    }
    var a = false;
    if (typeof(b) == "undefined" || b == null) {
        b = this._getLabelWidth(c, this.t[d].conf.close);
        a = true
    }
    this.t[d].tab.style.width = b + "px";
    this.t[d].tab.childNodes[0].innerHTML = c;
    this.t[d].conf.text = c;
    this.t[d].conf.width = b;
    this.t[d].conf.autowidth = a
};
dhtmlXTabBar.prototype._getTabText = function(a) {
    if (!this.t[a]) {
        return null
    }
    return this.t[a].conf.text
};
dhtmlXTabBar.prototype._removeTab = function(h, c, f) {
    if (!this.t[h]) {
        return
    }
    
    //YCK 2020.05.27 : select 된 좌측 메뉴의 탭을 닫으면 unselect 시키도록
    if(h == dhxLeftTreeView.getSelectedId()){
    	dhxLeftTreeView.unselectItem(h);
    }
    
    
    if (f != true && this.t[h].conf.remove != true) {
        this.t[h].conf.remove = true;
        this._hideTab(h, c);
        return
    }
    if (typeof(c) == "undefined") {
        c = true
    }
    var d = this._getNextVisible(h);
    var e = this._getPrevVisible(h);
    if (this.t[h].conf.transEv == true) {
        this.t[h].tab.removeEventListener(this.conf.transEv, this._doOnTrEnd, false);
        this.t[h].conf.transEv = false
    }
    for (var b in this.t[h].conf) {
        this.t[h].conf[b] = null
    }
    this.t[h].conf = null;
    delete this.t[h].conf;
    this.t[h].cell._unload();
    this.t[h].cell = null;
    this.t[h].tab.parentNode.removeChild(this.t[h].tab);
    this.t[h].tab = null;
    this.t[h] = null;
    delete this.t[h];
    this.conf.urls[h] = null;
    delete this.conf.urls[h];
    if (this.conf.lastActive == h) {
        this.conf.lastActive = null;
        if (c != false) {
            var g = (c == true ? (d || e || this._getFirstVisible()) : c);
            if (g != null) {
                this._setTabActive(g)
            }
        }
    } else {
        if (f != true) {
            this._adjustTabs()
        }
    }
};
dhtmlXTabBar.prototype.clearAll = function() {
    for (var b in this.t) {
        this._removeTab(b, false, true)
    }
    this.tabsArea.childNodes[1].childNodes[0].style[this.conf.align] = "0px"
};
dhtmlXTabBar.prototype.moveTab = function(c, a) {
    if (!this.t[c] || a < 0) {
        return
    }
    a += 1;
    var b = this.tabsArea.childNodes[1].firstChild;
    if (b.childNodes[a] != this.t[c].tab) {
        b.removeChild(this.t[c].tab);
        if (a >= b.childNodes.length) {
            b.appendChild(this.t[c].tab)
        } else {
            b.insertBefore(this.t[c].tab, b.childNodes[a])
        }
    }
    b = null
};
dhtmlXTabBar.prototype._getIndex = function(d) {
    var a = -1;
    var c = this.tabsArea.childNodes[1].firstChild;
    for (var b = 1; b < c.childNodes.length; b++) {
        if (c.childNodes[b]._tabId == d) {
            a = b - 1
        }
    }
    c = null;
    return a
};
dhtmlXTabBar.prototype.getNumberOfTabs = function(d) {
    var c = 0;
    for (var b in this.t) {
        c += (d != true ? 1 : (this.t[b].conf.visible == true ? 1 : 0))
    }
    return c
};
dhtmlXTabBar.prototype.forEachCell = dhtmlXTabBar.prototype.forEachTab = function(c) {
    for (var b in this.t) {
        c.apply(window, [this.t[b].cell])
    }
};
dhtmlXTabBar.prototype.enableAutoReSize = function() {
    this._initFSResize()
};
dhtmlXTabBar.prototype.setArrowsMode = function(a) {
    a = {
        auto: "auto",
        always: "always"
    } [String(a)];
    if (a == null || a == this.conf.mode) {
        return
    }
    this.conf.arwMode = a;
    if (a == "always") {
        this.tabsArea.childNodes[0].className = "dhxtabbar_tabs_ar_left";
        this.tabsArea.childNodes[2].className = "dhxtabbar_tabs_ar_right"
    }
    this.setSizes()
};
dhtmlXTabBar.prototype._checkArrows = function() {
    var e = false;
    if (this.conf.arwMode == "auto") {
        var d = 0;
        for (var c in this.t) {
            d += this.t[c].tab.offsetWidth
        }
        var b = this.tabsArea.childNodes[0];
        var f = this.tabsArea.childNodes[2];
        if (d > this.cont.offsetWidth) {
            if (b.className.search(/dhxtabbar_tabs_ar_hidden/) >= 0) {
                b.className = b.className.replace(/\s{0,}dhxtabbar_tabs_ar_hidden/, "");
                f.className = f.className.replace(/\s{0,}dhxtabbar_tabs_ar_hidden/, "");
                e = true
            }
        } else {
            if (b.className.search(/dhxtabbar_tabs_ar_hidden/) < 1) {
                b.className += " dhxtabbar_tabs_ar_hidden";
                f.className += " dhxtabbar_tabs_ar_hidden";
                e = true
            }
        }
        b = f = null
    }
    return e
};
dhtmlXTabBar.prototype._loadURLOnDemand = function(a) {
    if (a != null && this.conf.urls[a] != null) {
        this.cells(a).attachURL(this.conf.urls[a].href, this.conf.urls[a].ajax);
        this.conf.urls[a] = null
    }
};
window.dhtmlXTabBarCell = function(d, c) {
    dhtmlXCellObject.apply(this, [d, "_tabbar"]);
    this.tabbar = c;
    this.conf.skin = this.tabbar.conf.skin;
    this.conf.tabbar_funcs = {
        show: "_showTab",
        hide: "_hideTab",
        isVisible: "_isTabVisible",
        enable: "_enableTab",
        disable: "_disableTab",
        isEnabled: "_isTabEnabled",
        getIndex: "_getIndex",
        getText: "_getTabText",
        setText: "_setTabText",
        setActive: "_setTabActive",
        isActive: "_isTabActive",
        close: "_removeTab"
    };
    this._tabbarCall = function(a) {
        return function() {
            var e = [this._idd];
            for (var f = 0; f < arguments.length; f++) {
                e.push(arguments[f])
            }
            return this.tabbar[a].apply(this.tabbar, e)
        }
    };
    for (var b in this.conf.tabbar_funcs) {
        if (typeof(this[b]) != "function") {
            this[b] = this._tabbarCall(this.conf.tabbar_funcs[b])
        }
    }
    this.attachEvent("_onCellUnload", function() {
        this.tabbar = null;
        for (var e in this.conf.tabbar_funcs) {
            this[e] = null;
            this.conf.tabbar_funcs[e] = null
        }
        this.conf.tabbar_funcs = null
    });
    this.attachEvent("_onContentLoaded", function() {
        this.tabbar._callMainEvent("onContentLoaded", arguments);
        this.tabbar._callMainEvent("onTabContentLoaded", arguments)
    });
    this.attachEvent("_onContentAttach", function() {
        this.tabbar._adjustCell(this.tabbar.conf.lastActive)
    });
    this.attachEvent("_onBeforeContentAttach", function(a) {
        if (a == "sidebar" && this.conf.skin != "dhx_skyblue") {
            this._hideBorders()
        }
    })
};
window.dhtmlXTabBarCell.prototype = new dhtmlXCellObject();
dhtmlXCellObject.prototype.attachTabbar = function(a) {
    this.callEvent("_onBeforeContentAttach", ["tabbar"]);
    if (typeof(a) == "string") {
        a = {
            mode: a
        }
    } else {
        if (typeof(a) != "object" || a == null) {
            a = {}
        }
    }
    var b = document.createElement("DIV");
    b.style.width = "100%";
    b.style.height = "100%";
    b.style.position = "relative";
    b.style.overflow = "hidden";
    if (typeof(window.dhtmlXAccordionCell) == "function" && this instanceof window.dhtmlXAccordionCell) {
        if (this.conf.skin == "material") {
            b._ofs = {
                t: -1,
                r: -1,
                b: -1,
                l: -1
            }
        } else {
            b._ofs = {
                t: -1
            }
        }
    }
    if (typeof(window.dhtmlXTabBarCell) == "function" && this instanceof window.dhtmlXTabBarCell) {
        if (this.conf.skin == "dhx_skyblue") {
            b._ofs = {
                t: -1,
                r: -1,
                b: -1,
                l: -1
            }
        }
        if (this.conf.skin == "material") {
            b._ofs = {
                t: 8,
                r: 8,
                b: 8,
                l: 8
            }
        }
    }
    if (typeof(window.dhtmlXSideBarCell) == "function" && this instanceof window.dhtmlXSideBarCell) {
        b._ofs = {
            l: -1
        };
        if (this.conf.skin == "dhx_web" && this.sidebar.conf.autohide == true) {
            b._ofs.l = 0
        }
        if (this.conf.skin == "dhx_terrace") {
            if (this.sidebar.conf.autohide == true) {
                b._ofs.l = 0
            }
            if (this.sidebar.conf.header == true) {
                b._ofs.t = -1
            }
        }
    }
    if (typeof(window.dhtmlXCarouselCell) == "function" && this instanceof window.dhtmlXCarouselCell) {
        this._hideBorders()
    }
    this._attachObject(b);
    a.skin = this.conf.skin;
    a.parent = b;
    this.dataType = "tabbar";
    this.dataObj = new dhtmlXTabBar(a);
    a.parent = b = null;
    a = null;
    this.callEvent("_onContentAttach", []);
    return this.dataObj
};

function dhtmlXTabBarInitFromHTML() {
    var z = document.getElementsByTagName("div");
    for (var i = 0; i < z.length; i++) {
        if (z[i].className.indexOf("dhtmlxTabBar") != -1) {
            var conf = {
                settings: {},
                tabs: []
            };
            var n = z[i];
            var id = n.id;
            n.className = "";
            var k = new Array();
            for (var j = 0; j < n.childNodes.length; j++) {
                if (n.childNodes[j].tagName && n.childNodes[j].tagName != "!") {
                    k[k.length] = n.childNodes[j]
                }
            }
            var skin = n.getAttribute("skin");
            if (skin != null) {
                conf.settings.skin = skin
            }
            var w = new dhtmlXTabBar({
                parent: id,
                mode: n.getAttribute("mode")
            });
            window[id] = w;
            acs = n.getAttribute("onbeforeinit");
            if (acs) {
                eval(acs)
            }
            align = n.getAttribute("align");
            if (align) {
                conf.settings.align = align
            }
            var cont = {};
            for (var j = 0; j < k.length; j++) {
                var m = k[j];
                var tab = {
                    id: m.id,
                    text: m.getAttribute("name"),
                    width: m.getAttribute("width"),
                    selected: m.getAttribute("selected"),
                    active: m.getAttribute("active"),
                    close: m.getAttribute("close")
                };
                var href = m.getAttribute("href");
                if (href) {
                    cont[m.id] = {
                        href: href
                    }
                } else {
                    cont[m.id] = {
                        cont: m
                    }
                }
                conf.tabs.push(tab)
            }
            w.loadStruct(conf);
            for (var a in cont) {
                if (cont[a].href) {
                    w.cells(a).attachURL(cont[a].href);
                    cont[a].href = null
                } else {
                    w.cells(a).attachObject(cont[a].cont);
                    if (cont[a].cont.style.display == "none") {
                        cont[a].cont.style.display = ""
                    }
                    cont[a].cont = null
                }
                cont[a] = null
            }
            var selId = n.getAttribute("select");
            if (selId != null) {
                w.tabs(selId).setActive()
            } else {
                if (w.getActiveTab() == null) {
                    var v = w._getFirstVisible();
                    if (v != null) {
                        w.cells(v).setActive()
                    }
                }
            }
            acs = n.getAttribute("oninit");
            if (acs) {
                eval(acs)
            }
        }
    }
    if (typeof(window.addEventListener) == "function") {
        window.removeEventListener("load", dhtmlXTabBarInitFromHTML, false)
    } else {
        window.detachEvent("onload", dhtmlXTabBarInitFromHTML)
    }
}
if (typeof(window.addEventListener) == "function") {
    window.addEventListener("load", dhtmlXTabBarInitFromHTML, false)
} else {
    window.attachEvent("onload", dhtmlXTabBarInitFromHTML)
};