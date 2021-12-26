! function(e, t) {
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Spinner = t()
}(this, (function() {
    "use strict";
    var e, t = ["webkit", "Moz", "ms", "O"],
        i = {};

    function r(e, t) {
        var i, r = document.createElement(e || "div");
        for (i in t) r[i] = t[i];
        return r
    }

    function s(e) {
        for (var t = 1, i = arguments.length; t < i; t++) e.appendChild(arguments[t]);
        return e
    }
    var n, a = (n = r("style", {
        type: "text/css"
    }), s(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet);

    function o(t, r, s, n) {
        var o = ["opacity", r, ~~(100 * t), s, n].join("-"),
            d = .01 + s / n * 100,
            c = Math.max(1 - (1 - t) / r * (100 - d), t),
            l = e.substring(0, e.indexOf("Animation")).toLowerCase(),
            h = l && "-" + l + "-" || "";
        return i[o] || (a.insertRule("@" + h + "keyframes " + o + "{0%{opacity:" + c + "}" + d + "%{opacity:" + t + "}" + (d + .01) + "%{opacity:1}" + (d + r) % 100 + "%{opacity:" + t + "}100%{opacity:" + c + "}}", a.cssRules.length), i[o] = 1), o
    }

    function d(e, i) {
        var r, s, n = e.style;
        for (i = i.charAt(0).toUpperCase() + i.slice(1), s = 0; s < t.length; s++)
            if (void 0 !== n[r = t[s] + i]) return r;
        if (void 0 !== n[i]) return i
    }

    function c(e, t) {
        for (var i in t) e.style[d(e, i) || i] = t[i];
        return e
    }

    function l(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var r in i) void 0 === e[r] && (e[r] = i[r])
        }
        return e
    }

    function h(e, t) {
        return "string" == typeof e ? e : e[t % e.length]
    }
    var _ = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: 1 / 4,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "50%",
        left: "50%",
        position: "absolute"
    };

    function u(e) {
        this.opts = l(e || {}, u.defaults, _)
    }
    u.defaults = {}, l(u.prototype, {
        spin: function(t) {
            this.stop();
            var i = this,
                s = i.opts,
                n = i.el = c(r(0, {
                    className: s.className
                }), {
                    position: s.position,
                    width: 0,
                    zIndex: s.zIndex
                });
            s.radius, s.length, s.width;
            if (c(n, {
                    left: s.left,
                    top: s.top
                }), t && t.insertBefore(n, t.firstChild || null), n.setAttribute("role", "progressbar"), i.lines(n, i.opts), !e) {
                var a, o = 0,
                    d = (s.lines - 1) * (1 - s.direction) / 2,
                    l = s.fps,
                    h = l / s.speed,
                    _ = (1 - s.opacity) / (h * s.trail / 100),
                    u = h / s.lines;
                ! function e() {
                    o++;
                    for (var t = 0; t < s.lines; t++) a = Math.max(1 - (o + (s.lines - t) * u) % h * _, s.opacity), i.opacity(n, t * s.direction + d, a, s);
                    i.timeout = i.el && setTimeout(e, ~~(1e3 / l))
                }()
            }
            return i
        },
        stop: function() {
            var e = this.el;
            return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = void 0), this
        },
        lines: function(t, i) {
            var n, a = 0,
                d = (i.lines - 1) * (1 - i.direction) / 2;

            function l(e, t) {
                return c(r(), {
                    position: "absolute",
                    width: i.length + i.width + "px",
                    height: i.width + "px",
                    background: e,
                    boxShadow: t,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / i.lines * a + i.rotate) + "deg) translate(" + i.radius + "px,0)",
                    borderRadius: (i.corners * i.width >> 1) + "px"
                })
            }
            for (; a < i.lines; a++) n = c(r(), {
                position: "absolute",
                top: 1 + ~(i.width / 2) + "px",
                transform: i.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: i.opacity,
                animation: e && o(i.opacity, i.trail, d + a * i.direction, i.lines) + " " + 1 / i.speed + "s linear infinite"
            }), i.shadow && s(n, c(l("#000", "0 0 4px #000"), {
                top: "2px"
            })), s(t, s(n, l(h(i.color, a), "0 0 1px rgba(0,0,0,.1)")));
            return t
        },
        opacity: function(e, t, i) {
            t < e.childNodes.length && (e.childNodes[t].style.opacity = i)
        }
    });
    var f = c(r("group"), {
        behavior: "url(#default#VML)"
    });
    return !d(f, "transform") && f.adj ? function() {
        function e(e, t) {
            return r("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
        }
        a.addRule(".spin-vml", "behavior:url(#default#VML)"), u.prototype.lines = function(t, i) {
            var r = i.length + i.width,
                n = 2 * r;

            function a() {
                return c(e("group", {
                    coordsize: n + " " + n,
                    coordorigin: -r + " " + -r
                }), {
                    width: n,
                    height: n
                })
            }
            var o, d = 2 * -(i.width + i.length) + "px",
                l = c(a(), {
                    position: "absolute",
                    top: d,
                    left: d
                });

            function _(t, n, o) {
                s(l, s(c(a(), {
                    rotation: 360 / i.lines * t + "deg",
                    left: ~~n
                }), s(c(e("roundrect", {
                    arcsize: i.corners
                }), {
                    width: r,
                    height: i.width,
                    left: i.radius,
                    top: -i.width >> 1,
                    filter: o
                }), e("fill", {
                    color: h(i.color, t),
                    opacity: i.opacity
                }), e("stroke", {
                    opacity: 0
                }))))
            }
            if (i.shadow)
                for (o = 1; o <= i.lines; o++) _(o, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (o = 1; o <= i.lines; o++) _(o);
            return s(t, l)
        }, u.prototype.opacity = function(e, t, i, r) {
            var s = e.firstChild;
            r = r.shadow && r.lines || 0, s && t + r < s.childNodes.length && (s = (s = (s = s.childNodes[t + r]) && s.firstChild) && s.firstChild) && (s.opacity = i)
        }
    }() : e = d(f, "animation"), u
})),
function(e, t) {
    "object" == typeof exports ? module.exports = t() : "function" == typeof define && define.amd ? define(["./spin"], t) : e.Ladda = t(e.Spinner)
}(this, (function(e) {
    "use strict";
    var t = [];

    function i(i) {
        if (void 0 !== i) {
            i.querySelector(".ladda-label") || (i.innerHTML = '<span class="ladda-label">' + i.innerHTML + "</span>");
            var r, s = function(t) {
                    var i, r = t.offsetHeight;
                    r > 32 && (r *= .8);
                    t.hasAttribute("data-spinner-size") && (r = parseInt(t.getAttribute("data-spinner-size"), 10));
                    t.hasAttribute("data-spinner-color") && (i = t.getAttribute("data-spinner-color"));
                    var s = .2 * r;
                    return new e({
                        color: i || "#fff",
                        lines: 12,
                        radius: s,
                        length: .6 * s,
                        width: s < 7 ? 2 : 3,
                        zIndex: "auto",
                        top: "50%",
                        left: "50%",
                        className: ""
                    })
                }(i),
                n = document.createElement("span");
            n.className = "ladda-spinner", i.appendChild(n);
            var a = {
                start: function() {
                    return i.setAttribute("disabled", ""), i.setAttribute("data-loading", ""), clearTimeout(r), s.spin(n), this.setProgress(0), this
                },
                startAfter: function(e) {
                    return clearTimeout(r), r = setTimeout((function() {
                        a.start()
                    }), e), this
                },
                stop: function() {
                    return i.removeAttribute("disabled"), i.removeAttribute("data-loading"), clearTimeout(r), r = setTimeout((function() {
                        s.stop()
                    }), 1e3), this
                },
                remove: function() {
                    return this.isLoading() && this.stop(), n.parentNode.removeChild(n), this
                },
                toggle: function() {
                    return this.isLoading() ? this.stop() : this.start(), this
                },
                setProgress: function(e) {
                    e = Math.max(Math.min(e, 1), 0);
                    var t = i.querySelector(".ladda-progress");
                    0 === e && t && t.parentNode ? t.parentNode.removeChild(t) : (t || ((t = document.createElement("div")).className = "ladda-progress", i.appendChild(t)), t.style.width = (e || 0) * i.offsetWidth + "px")
                },
                enable: function() {
                    return this.stop(), this
                },
                disable: function() {
                    return this.stop(), i.setAttribute("disabled", ""), this
                },
                isLoading: function() {
                    return i.hasAttribute("data-loading")
                },
                getTarget: function() {
                    return i
                }
            };
            return t.push(a), a
        }
        console.warn("Ladda button target must be defined.")
    }
    return {
        bind: function(e, t) {
            t = t || {};
            var r = [];
            "string" == typeof e ? r = function(e) {
                for (var t = [], i = 0; i < e.length; i++) t.push(e[i]);
                return t
            }(document.querySelectorAll(e)) : "object" == typeof e && "string" == typeof e.nodeName && (r = [e]);
            for (var s = 0, n = r.length; s < n; s++) ! function() {
                var e = r[s];
                if ("function" == typeof e.addEventListener) {
                    var n = i(e),
                        a = -1;
                    e.addEventListener("click", (function() {
                        n.startAfter(1), "number" == typeof t.timeout && (clearTimeout(a), a = setTimeout(n.stop, t.timeout)), "function" == typeof t.callback && t.callback.apply(null, [n])
                    }), !1)
                }
            }()
        },
        create: i,
        stopAll: function() {
            for (var e = 0, i = t.length; e < i; e++) t[e].stop()
        }
    }
})),
function(e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}((function(e, t) {
    "use strict";
    if (!e.jstree) {
        var i = 0,
            r = !1,
            s = !1,
            n = !1,
            a = [],
            o = e("script:last").attr("src"),
            d = window.document,
            c = window.setImmediate,
            l = window.Promise;
        !c && l && (c = function(e, t) {
            l.resolve(t).then(e)
        }), e.jstree = {
            version: "3.3.10",
            defaults: {
                plugins: []
            },
            plugins: {},
            path: o && -1 !== o.indexOf("/") ? o.replace(/\/[^\/]+$/, "") : "",
            idregex: /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
            root: "#"
        }, e.jstree.create = function(t, r) {
            var s = new e.jstree.core(++i),
                n = r;
            return r = e.extend(!0, {}, e.jstree.defaults, r), n && n.plugins && (r.plugins = n.plugins), e.each(r.plugins, (function(e, t) {
                "core" !== e && (s = s.plugin(t, r[t]))
            })), e(t).data("jstree", s), s.init(t, r), s
        }, e.jstree.destroy = function() {
            e(".jstree:jstree").jstree("destroy"), e(d).off(".jstree")
        }, e.jstree.core = function(e) {
            this._id = e, this._cnt = 0, this._wrk = null, this._data = {
                core: {
                    themes: {
                        name: !1,
                        dots: !1,
                        icons: !1,
                        ellipsis: !1
                    },
                    selected: [],
                    last_error: {},
                    working: !1,
                    worker_queue: [],
                    focused: null
                }
            }
        }, e.jstree.reference = function(t) {
            var i = null,
                r = null;
            if (!t || !t.id || t.tagName && t.nodeType || (t = t.id), !r || !r.length) try {
                r = e(t)
            } catch (e) {}
            if (!r || !r.length) try {
                r = e("#" + t.replace(e.jstree.idregex, "\\$&"))
            } catch (e) {}
            return r && r.length && (r = r.closest(".jstree")).length && (r = r.data("jstree")) ? i = r : e(".jstree").each((function() {
                var r = e(this).data("jstree");
                if (r && r._model.data[t]) return i = r, !1
            })), i
        }, e.fn.jstree = function(i) {
            var r = "string" == typeof i,
                s = Array.prototype.slice.call(arguments, 1),
                n = null;
            return !(!0 === i && !this.length) && (this.each((function() {
                var a = e.jstree.reference(this),
                    o = r && a ? a[i] : null;
                if (n = r && o ? o.apply(a, s) : null, a || r || i !== t && !e.isPlainObject(i) || e.jstree.create(this, i), (a && !r || !0 === i) && (n = a || !1), null !== n && n !== t) return !1
            })), null !== n && n !== t ? n : this)
        }, e.expr.pseudos.jstree = e.expr.createPseudo((function(i) {
            return function(i) {
                return e(i).hasClass("jstree") && e(i).data("jstree") !== t
            }
        })), e.jstree.defaults.core = {
            data: !1,
            strings: !1,
            check_callback: !1,
            error: e.noop,
            animation: 200,
            multiple: !0,
            themes: {
                name: !1,
                url: !1,
                dir: !1,
                dots: !0,
                icons: !0,
                ellipsis: !1,
                stripes: !1,
                variant: !1,
                responsive: !1
            },
            expand_selected_onload: !0,
            worker: !0,
            force_text: !1,
            dblclick_toggle: !0,
            loaded_state: !1,
            restore_focus: !0,
            keyboard: {
                "ctrl-space": function(t) {
                    t.type = "click", e(t.currentTarget).trigger(t)
                },
                enter: function(t) {
                    t.type = "click", e(t.currentTarget).trigger(t)
                },
                left: function(t) {
                    if (t.preventDefault(), this.is_open(t.currentTarget)) this.close_node(t.currentTarget);
                    else {
                        var i = this.get_parent(t.currentTarget);
                        i && i.id !== e.jstree.root && this.get_node(i, !0).children(".jstree-anchor").focus()
                    }
                },
                up: function(e) {
                    e.preventDefault();
                    var t = this.get_prev_dom(e.currentTarget);
                    t && t.length && t.children(".jstree-anchor").focus()
                },
                right: function(t) {
                    if (t.preventDefault(), this.is_closed(t.currentTarget)) this.open_node(t.currentTarget, (function(e) {
                        this.get_node(e, !0).children(".jstree-anchor").focus()
                    }));
                    else if (this.is_open(t.currentTarget)) {
                        var i = this.get_node(t.currentTarget, !0).children(".jstree-children")[0];
                        i && e(this._firstChild(i)).children(".jstree-anchor").focus()
                    }
                },
                down: function(e) {
                    e.preventDefault();
                    var t = this.get_next_dom(e.currentTarget);
                    t && t.length && t.children(".jstree-anchor").focus()
                },
                "*": function(e) {
                    this.open_all()
                },
                home: function(t) {
                    t.preventDefault();
                    var i = this._firstChild(this.get_container_ul()[0]);
                    i && e(i).children(".jstree-anchor").filter(":visible").focus()
                },
                end: function(e) {
                    e.preventDefault(), this.element.find(".jstree-anchor").filter(":visible").last().focus()
                },
                f2: function(e) {
                    e.preventDefault(), this.edit(e.currentTarget)
                }
            }
        }, e.jstree.core.prototype = {
            plugin: function(t, i) {
                var r = e.jstree.plugins[t];
                return r ? (this._data[t] = {}, r.prototype = this, new r(i, this)) : this
            },
            init: function(t, i) {
                this._model = {
                    data: {},
                    changed: [],
                    force_full_redraw: !1,
                    redraw_timeout: !1,
                    default_state: {
                        loaded: !0,
                        opened: !1,
                        selected: !1,
                        disabled: !1
                    }
                }, this._model.data[e.jstree.root] = {
                    id: e.jstree.root,
                    parent: null,
                    parents: [],
                    children: [],
                    children_d: [],
                    state: {
                        loaded: !1
                    }
                }, this.element = e(t).addClass("jstree jstree-" + this._id), this.settings = i, this._data.core.ready = !1, this._data.core.loaded = !1, this._data.core.rtl = "rtl" === this.element.css("direction"), this.element[this._data.core.rtl ? "addClass" : "removeClass"]("jstree-rtl"), this.element.attr("role", "tree"), this.settings.core.multiple && this.element.attr("aria-multiselectable", !0), this.element.attr("tabindex") || this.element.attr("tabindex", "0"), this.bind(), this.trigger("init"), this._data.core.original_container_html = this.element.find(" > ul > li").clone(!0), this._data.core.original_container_html.find("li").addBack().contents().filter((function() {
                    return 3 === this.nodeType && (!this.nodeValue || /^\s+$/.test(this.nodeValue))
                })).remove(), this.element.html("<ul class='jstree-container-ul jstree-children' role='group'><li id='j" + this._id + "_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='presentation'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' role='treeitem' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.element.attr("aria-activedescendant", "j" + this._id + "_loading"), this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24, this._data.core.node = this._create_prototype_node(), this.trigger("loading"), this.load_node(e.jstree.root)
            },
            destroy: function(e) {
                if (this.trigger("destroy"), this._wrk) try {
                    window.URL.revokeObjectURL(this._wrk), this._wrk = null
                } catch (e) {}
                e || this.element.empty(), this.teardown()
            },
            _create_prototype_node: function() {
                var e, t, i = d.createElement("LI");
                return i.setAttribute("role", "presentation"), (e = d.createElement("I")).className = "jstree-icon jstree-ocl", e.setAttribute("role", "presentation"), i.appendChild(e), (e = d.createElement("A")).className = "jstree-anchor", e.setAttribute("href", "#"), e.setAttribute("tabindex", "-1"), e.setAttribute("role", "treeitem"), (t = d.createElement("I")).className = "jstree-icon jstree-themeicon", t.setAttribute("role", "presentation"), e.appendChild(t), i.appendChild(e), e = t = null, i
            },
            _kbevent_to_func: function(e) {
                var t = [];
                if (e.ctrlKey && t.push("ctrl"), e.altKey && t.push("alt"), e.shiftKey && t.push("shift"), t.push({
                        8: "Backspace",
                        9: "Tab",
                        13: "Enter",
                        19: "Pause",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "Print",
                        45: "Insert",
                        46: "Delete",
                        96: "Numpad0",
                        97: "Numpad1",
                        98: "Numpad2",
                        99: "Numpad3",
                        100: "Numpad4",
                        101: "Numpad5",
                        102: "Numpad6",
                        103: "Numpad7",
                        104: "Numpad8",
                        105: "Numpad9",
                        "-13": "NumpadEnter",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "Numlock",
                        145: "Scrolllock",
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        61: "=",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        107: "+",
                        109: "-",
                        110: ".",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        111: "/",
                        106: "*",
                        173: "-"
                    }[e.which] || e.which), "shift-shift" === (t = t.sort().join("-").toLowerCase()) || "ctrl-ctrl" === t || "alt-alt" === t) return null;
                var i, r, s = this.settings.core.keyboard;
                for (i in s)
                    if (s.hasOwnProperty(i) && ("-" !== (r = i) && "+" !== r && (r = (r = r.replace("--", "-MINUS").replace("+-", "-MINUS").replace("++", "-PLUS").replace("-+", "-PLUS")).split(/-|\+/).sort().join("-").replace("MINUS", "-").replace("PLUS", "+").toLowerCase()), r === t)) return s[i];
                return null
            },
            teardown: function() {
                this.unbind(), this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class", (function() {
                    return this.className.replace(/jstree[^ ]*|$/gi, "")
                })), this.element = null
            },
            bind: function() {
                var t = "",
                    i = null,
                    r = 0;
                this.element.on("dblclick.jstree", (function(e) {
                    if (e.target.tagName && "input" === e.target.tagName.toLowerCase()) return !0;
                    if (d.selection && d.selection.empty) d.selection.empty();
                    else if (window.getSelection) {
                        var t = window.getSelection();
                        try {
                            t.removeAllRanges(), t.collapse()
                        } catch (e) {}
                    }
                })).on("mousedown.jstree", e.proxy((function(e) {
                    e.target === this.element[0] && (e.preventDefault(), r = +new Date)
                }), this)).on("mousedown.jstree", ".jstree-ocl", (function(e) {
                    e.preventDefault()
                })).on("click.jstree", ".jstree-ocl", e.proxy((function(e) {
                    this.toggle_node(e.target)
                }), this)).on("dblclick.jstree", ".jstree-anchor", e.proxy((function(e) {
                    if (e.target.tagName && "input" === e.target.tagName.toLowerCase()) return !0;
                    this.settings.core.dblclick_toggle && this.toggle_node(e.target)
                }), this)).on("click.jstree", ".jstree-anchor", e.proxy((function(t) {
                    t.preventDefault(), t.currentTarget !== d.activeElement && e(t.currentTarget).focus(), this.activate_node(t.currentTarget, t)
                }), this)).on("keydown.jstree", ".jstree-anchor", e.proxy((function(e) {
                    if (e.target.tagName && "input" === e.target.tagName.toLowerCase()) return !0;
                    this._data.core.rtl && (37 === e.which ? e.which = 39 : 39 === e.which && (e.which = 37));
                    var t = this._kbevent_to_func(e);
                    if (t) {
                        var i = t.call(this, e);
                        if (!1 === i || !0 === i) return i
                    }
                }), this)).on("load_node.jstree", e.proxy((function(t, i) {
                    i.status && (i.node.id !== e.jstree.root || this._data.core.loaded || (this._data.core.loaded = !0, this._firstChild(this.get_container_ul()[0]) && this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id), this.trigger("loaded")), this._data.core.ready || setTimeout(e.proxy((function() {
                        if (this.element && !this.get_container_ul().find(".jstree-loading").length) {
                            if (this._data.core.ready = !0, this._data.core.selected.length) {
                                if (this.settings.core.expand_selected_onload) {
                                    var t, i, r = [];
                                    for (t = 0, i = this._data.core.selected.length; t < i; t++) r = r.concat(this._model.data[this._data.core.selected[t]].parents);
                                    for (t = 0, i = (r = e.vakata.array_unique(r)).length; t < i; t++) this.open_node(r[t], !1, 0)
                                }
                                this.trigger("changed", {
                                    action: "ready",
                                    selected: this._data.core.selected
                                })
                            }
                            this.trigger("ready")
                        }
                    }), this), 0))
                }), this)).on("keypress.jstree", e.proxy((function(r) {
                    if (r.target.tagName && "input" === r.target.tagName.toLowerCase()) return !0;
                    i && clearTimeout(i), i = setTimeout((function() {
                        t = ""
                    }), 500);
                    var s = String.fromCharCode(r.which).toLowerCase(),
                        n = this.element.find(".jstree-anchor").filter(":visible"),
                        a = n.index(d.activeElement) || 0,
                        o = !1;
                    if ((t += s).length > 1) {
                        if (n.slice(a).each(e.proxy((function(i, r) {
                                if (0 === e(r).text().toLowerCase().indexOf(t)) return e(r).focus(), o = !0, !1
                            }), this)), o) return;
                        if (n.slice(0, a).each(e.proxy((function(i, r) {
                                if (0 === e(r).text().toLowerCase().indexOf(t)) return e(r).focus(), o = !0, !1
                            }), this)), o) return
                    }
                    if (new RegExp("^" + s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + "+$").test(t)) {
                        if (n.slice(a + 1).each(e.proxy((function(t, i) {
                                if (e(i).text().toLowerCase().charAt(0) === s) return e(i).focus(), o = !0, !1
                            }), this)), o) return;
                        if (n.slice(0, a + 1).each(e.proxy((function(t, i) {
                                if (e(i).text().toLowerCase().charAt(0) === s) return e(i).focus(), o = !0, !1
                            }), this)), o) return
                    }
                }), this)).on("init.jstree", e.proxy((function() {
                    var e = this.settings.core.themes;
                    this._data.core.themes.dots = e.dots, this._data.core.themes.stripes = e.stripes, this._data.core.themes.icons = e.icons, this._data.core.themes.ellipsis = e.ellipsis, this.set_theme(e.name || "default", e.url), this.set_theme_variant(e.variant)
                }), this)).on("loading.jstree", e.proxy((function() {
                    this[this._data.core.themes.dots ? "show_dots" : "hide_dots"](), this[this._data.core.themes.icons ? "show_icons" : "hide_icons"](), this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"](), this[this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis"]()
                }), this)).on("blur.jstree", ".jstree-anchor", e.proxy((function(t) {
                    this._data.core.focused = null, e(t.currentTarget).filter(".jstree-hovered").trigger("mouseleave"), this.element.attr("tabindex", "0")
                }), this)).on("focus.jstree", ".jstree-anchor", e.proxy((function(t) {
                    var i = this.get_node(t.currentTarget);
                    i && i.id && (this._data.core.focused = i.id), this.element.find(".jstree-hovered").not(t.currentTarget).trigger("mouseleave"), e(t.currentTarget).trigger("mouseenter"), this.element.attr("tabindex", "-1")
                }), this)).on("focus.jstree", e.proxy((function() {
                    if (+new Date - r > 500 && !this._data.core.focused && this.settings.core.restore_focus) {
                        r = 0;
                        var e = this.get_node(this.element.attr("aria-activedescendant"), !0);
                        e && e.find("> .jstree-anchor").focus()
                    }
                }), this)).on("mouseenter.jstree", ".jstree-anchor", e.proxy((function(e) {
                    this.hover_node(e.currentTarget)
                }), this)).on("mouseleave.jstree", ".jstree-anchor", e.proxy((function(e) {
                    this.dehover_node(e.currentTarget)
                }), this))
            },
            unbind: function() {
                this.element.off(".jstree"), e(d).off(".jstree-" + this._id)
            },
            trigger: function(e, t) {
                t || (t = {}), t.instance = this, this.element.triggerHandler(e.replace(".jstree", "") + ".jstree", t)
            },
            get_container: function() {
                return this.element
            },
            get_container_ul: function() {
                return this.element.children(".jstree-children").first()
            },
            get_string: function(t) {
                var i = this.settings.core.strings;
                return e.isFunction(i) ? i.call(this, t) : i && i[t] ? i[t] : t
            },
            _firstChild: function(e) {
                for (e = e ? e.firstChild : null; null !== e && 1 !== e.nodeType;) e = e.nextSibling;
                return e
            },
            _nextSibling: function(e) {
                for (e = e ? e.nextSibling : null; null !== e && 1 !== e.nodeType;) e = e.nextSibling;
                return e
            },
            _previousSibling: function(e) {
                for (e = e ? e.previousSibling : null; null !== e && 1 !== e.nodeType;) e = e.previousSibling;
                return e
            },
            get_node: function(t, i) {
                var r;
                t && t.id && (t = t.id), t instanceof e && t.length && t[0].id && (t = t[0].id);
                try {
                    if (this._model.data[t]) t = this._model.data[t];
                    else if ("string" == typeof t && this._model.data[t.replace(/^#/, "")]) t = this._model.data[t.replace(/^#/, "")];
                    else if ("string" == typeof t && (r = e("#" + t.replace(e.jstree.idregex, "\\$&"), this.element)).length && this._model.data[r.closest(".jstree-node").attr("id")]) t = this._model.data[r.closest(".jstree-node").attr("id")];
                    else if ((r = this.element.find(t)).length && this._model.data[r.closest(".jstree-node").attr("id")]) t = this._model.data[r.closest(".jstree-node").attr("id")];
                    else {
                        if (!(r = this.element.find(t)).length || !r.hasClass("jstree")) return !1;
                        t = this._model.data[e.jstree.root]
                    }
                    return i && (t = t.id === e.jstree.root ? this.element : e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)), t
                } catch (e) {
                    return !1
                }
            },
            get_path: function(t, i, r) {
                if (!(t = t.parents ? t : this.get_node(t)) || t.id === e.jstree.root || !t.parents) return !1;
                var s, n, a = [];
                for (a.push(r ? t.id : t.text), s = 0, n = t.parents.length; s < n; s++) a.push(r ? t.parents[s] : this.get_text(t.parents[s]));
                return a = a.reverse().slice(1), i ? a.join(i) : a
            },
            get_next_dom: function(t, i) {
                var r;
                if ((t = this.get_node(t, !0))[0] === this.element[0]) {
                    for (r = this._firstChild(this.get_container_ul()[0]); r && 0 === r.offsetHeight;) r = this._nextSibling(r);
                    return !!r && e(r)
                }
                if (!t || !t.length) return !1;
                if (i) {
                    r = t[0];
                    do {
                        r = this._nextSibling(r)
                    } while (r && 0 === r.offsetHeight);
                    return !!r && e(r)
                }
                if (t.hasClass("jstree-open")) {
                    for (r = this._firstChild(t.children(".jstree-children")[0]); r && 0 === r.offsetHeight;) r = this._nextSibling(r);
                    if (null !== r) return e(r)
                }
                r = t[0];
                do {
                    r = this._nextSibling(r)
                } while (r && 0 === r.offsetHeight);
                return null !== r ? e(r) : t.parentsUntil(".jstree", ".jstree-node").nextAll(".jstree-node:visible").first()
            },
            get_prev_dom: function(t, i) {
                var r;
                if ((t = this.get_node(t, !0))[0] === this.element[0]) {
                    for (r = this.get_container_ul()[0].lastChild; r && 0 === r.offsetHeight;) r = this._previousSibling(r);
                    return !!r && e(r)
                }
                if (!t || !t.length) return !1;
                if (i) {
                    r = t[0];
                    do {
                        r = this._previousSibling(r)
                    } while (r && 0 === r.offsetHeight);
                    return !!r && e(r)
                }
                r = t[0];
                do {
                    r = this._previousSibling(r)
                } while (r && 0 === r.offsetHeight);
                if (null !== r) {
                    for (t = e(r); t.hasClass("jstree-open");) t = t.children(".jstree-children").first().children(".jstree-node:visible:last");
                    return t
                }
                return !(!(r = t[0].parentNode.parentNode) || !r.className || -1 === r.className.indexOf("jstree-node")) && e(r)
            },
            get_parent: function(t) {
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && t.parent
            },
            get_children_dom: function(e) {
                return (e = this.get_node(e, !0))[0] === this.element[0] ? this.get_container_ul().children(".jstree-node") : !(!e || !e.length) && e.children(".jstree-children").children(".jstree-node")
            },
            is_parent: function(e) {
                return (e = this.get_node(e)) && (!1 === e.state.loaded || e.children.length > 0)
            },
            is_loaded: function(e) {
                return (e = this.get_node(e)) && e.state.loaded
            },
            is_loading: function(e) {
                return (e = this.get_node(e)) && e.state && e.state.loading
            },
            is_open: function(e) {
                return (e = this.get_node(e)) && e.state.opened
            },
            is_closed: function(e) {
                return (e = this.get_node(e)) && this.is_parent(e) && !e.state.opened
            },
            is_leaf: function(e) {
                return !this.is_parent(e)
            },
            load_node: function(t, i) {
                var r, s, n, a, o;
                if (e.isArray(t)) return this._load_nodes(t.slice(), i), !0;
                if (!(t = this.get_node(t))) return i && i.call(this, t, !1), !1;
                if (t.state.loaded) {
                    for (t.state.loaded = !1, n = 0, a = t.parents.length; n < a; n++) this._model.data[t.parents[n]].children_d = e.vakata.array_filter(this._model.data[t.parents[n]].children_d, (function(i) {
                        return -1 === e.inArray(i, t.children_d)
                    }));
                    for (r = 0, s = t.children_d.length; r < s; r++) this._model.data[t.children_d[r]].state.selected && (o = !0), delete this._model.data[t.children_d[r]];
                    o && (this._data.core.selected = e.vakata.array_filter(this._data.core.selected, (function(i) {
                        return -1 === e.inArray(i, t.children_d)
                    }))), t.children = [], t.children_d = [], o && this.trigger("changed", {
                        action: "load_node",
                        node: t,
                        selected: this._data.core.selected
                    })
                }
                return t.state.failed = !1, t.state.loading = !0, this.get_node(t, !0).addClass("jstree-loading").attr("aria-busy", !0), this._load_node(t, e.proxy((function(e) {
                    (t = this._model.data[t.id]).state.loading = !1, t.state.loaded = e, t.state.failed = !t.state.loaded;
                    var r, s = this.get_node(t, !0),
                        n = 0,
                        a = this._model.data,
                        o = !1;
                    for (n = 0, r = t.children.length; n < r; n++)
                        if (a[t.children[n]] && !a[t.children[n]].state.hidden) {
                            o = !0;
                            break
                        }
                    t.state.loaded && s && s.length && (s.removeClass("jstree-closed jstree-open jstree-leaf"), o ? "#" !== t.id && s.addClass(t.state.opened ? "jstree-open" : "jstree-closed") : s.addClass("jstree-leaf")), s.removeClass("jstree-loading").attr("aria-busy", !1), this.trigger("load_node", {
                        node: t,
                        status: e
                    }), i && i.call(this, t, e)
                }), this)), !0
            },
            _load_nodes: function(e, t, i, r) {
                var s, n, a = !0,
                    o = function() {
                        this._load_nodes(e, t, !0)
                    },
                    d = this._model.data,
                    c = [];
                for (s = 0, n = e.length; s < n; s++) d[e[s]] && (!d[e[s]].state.loaded && !d[e[s]].state.failed || !i && r) && (this.is_loading(e[s]) || this.load_node(e[s], o), a = !1);
                if (a) {
                    for (s = 0, n = e.length; s < n; s++) d[e[s]] && d[e[s]].state.loaded && c.push(e[s]);
                    t && !t.done && (t.call(this, c), t.done = !0)
                }
            },
            load_all: function(t, i) {
                if (t || (t = e.jstree.root), !(t = this.get_node(t))) return !1;
                var r, s, n = [],
                    a = this._model.data,
                    o = a[t.id].children_d;
                for (t.state && !t.state.loaded && n.push(t.id), r = 0, s = o.length; r < s; r++) a[o[r]] && a[o[r]].state && !a[o[r]].state.loaded && n.push(o[r]);
                n.length ? this._load_nodes(n, (function() {
                    this.load_all(t, i)
                })) : (i && i.call(this, t), this.trigger("load_all", {
                    node: t
                }))
            },
            _load_node: function(t, i) {
                var r, s = this.settings.core.data,
                    n = function() {
                        return 3 !== this.nodeType && 8 !== this.nodeType
                    };
                return s ? e.isFunction(s) ? s.call(this, t, e.proxy((function(r) {
                    !1 === r ? i.call(this, !1) : this["string" == typeof r ? "_append_html_data" : "_append_json_data"](t, "string" == typeof r ? e(e.parseHTML(r)).filter(n) : r, (function(e) {
                        i.call(this, e)
                    }))
                }), this)) : "object" == typeof s ? s.url ? (s = e.extend(!0, {}, s), e.isFunction(s.url) && (s.url = s.url.call(this, t)), e.isFunction(s.data) && (s.data = s.data.call(this, t)), e.ajax(s).done(e.proxy((function(r, s, a) {
                    var o = a.getResponseHeader("Content-Type");
                    return o && -1 !== o.indexOf("json") || "object" == typeof r ? this._append_json_data(t, r, (function(e) {
                        i.call(this, e)
                    })) : o && -1 !== o.indexOf("html") || "string" == typeof r ? this._append_html_data(t, e(e.parseHTML(r)).filter(n), (function(e) {
                        i.call(this, e)
                    })) : (this._data.core.last_error = {
                        error: "ajax",
                        plugin: "core",
                        id: "core_04",
                        reason: "Could not load node",
                        data: JSON.stringify({
                            id: t.id,
                            xhr: a
                        })
                    }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1))
                }), this)).fail(e.proxy((function(e) {
                    this._data.core.last_error = {
                        error: "ajax",
                        plugin: "core",
                        id: "core_04",
                        reason: "Could not load node",
                        data: JSON.stringify({
                            id: t.id,
                            xhr: e
                        })
                    }, i.call(this, !1), this.settings.core.error.call(this, this._data.core.last_error)
                }), this))) : (r = e.isArray(s) ? e.extend(!0, [], s) : e.isPlainObject(s) ? e.extend(!0, {}, s) : s, t.id === e.jstree.root ? this._append_json_data(t, r, (function(e) {
                    i.call(this, e)
                })) : (this._data.core.last_error = {
                    error: "nodata",
                    plugin: "core",
                    id: "core_05",
                    reason: "Could not load node",
                    data: JSON.stringify({
                        id: t.id
                    })
                }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1))) : "string" == typeof s ? t.id === e.jstree.root ? this._append_html_data(t, e(e.parseHTML(s)).filter(n), (function(e) {
                    i.call(this, e)
                })) : (this._data.core.last_error = {
                    error: "nodata",
                    plugin: "core",
                    id: "core_06",
                    reason: "Could not load node",
                    data: JSON.stringify({
                        id: t.id
                    })
                }, this.settings.core.error.call(this, this._data.core.last_error), i.call(this, !1)) : i.call(this, !1) : t.id === e.jstree.root ? this._append_html_data(t, this._data.core.original_container_html.clone(!0), (function(e) {
                    i.call(this, e)
                })) : i.call(this, !1)
            },
            _node_changed: function(t) {
                (t = this.get_node(t)) && -1 === e.inArray(t.id, this._model.changed) && this._model.changed.push(t.id)
            },
            _append_html_data: function(t, i, r) {
                (t = this.get_node(t)).children = [], t.children_d = [];
                var s, n, a, o = i.is("ul") ? i.children() : i,
                    d = t.id,
                    c = [],
                    l = [],
                    h = this._model.data,
                    _ = h[d],
                    u = this._data.core.selected.length;
                for (o.each(e.proxy((function(t, i) {
                        (s = this._parse_model_from_html(e(i), d, _.parents.concat())) && (c.push(s), l.push(s), h[s].children_d.length && (l = l.concat(h[s].children_d)))
                    }), this)), _.children = c, _.children_d = l, n = 0, a = _.parents.length; n < a; n++) h[_.parents[n]].children_d = h[_.parents[n]].children_d.concat(l);
                this.trigger("model", {
                    nodes: l,
                    parent: d
                }), d !== e.jstree.root ? (this._node_changed(d), this.redraw()) : (this.get_container_ul().children(".jstree-initial-node").remove(), this.redraw(!0)), this._data.core.selected.length !== u && this.trigger("changed", {
                    action: "model",
                    selected: this._data.core.selected
                }), r.call(this, !0)
            },
            _append_json_data: function(t, i, r, s) {
                if (null !== this.element) {
                    (t = this.get_node(t)).children = [], t.children_d = [], i.d && "string" == typeof(i = i.d) && (i = JSON.parse(i)), e.isArray(i) || (i = [i]);
                    var n = null,
                        a = {
                            df: this._model.default_state,
                            dat: i,
                            par: t.id,
                            m: this._model.data,
                            t_id: this._id,
                            t_cnt: this._cnt,
                            sel: this._data.core.selected
                        },
                        o = this,
                        d = function(e, t) {
                            e.data && (e = e.data);
                            var i, r, s, n, a = e.dat,
                                d = e.par,
                                c = [],
                                l = [],
                                h = [],
                                _ = e.df,
                                u = e.t_id,
                                f = e.t_cnt,
                                g = e.m,
                                p = g[d],
                                m = e.sel,
                                v = function(e, i, r) {
                                    r = r ? r.concat() : [], i && r.unshift(i);
                                    var s, n, a, o, d = e.id.toString(),
                                        c = {
                                            id: d,
                                            text: e.text || "",
                                            icon: e.icon === t || e.icon,
                                            parent: i,
                                            parents: r,
                                            children: e.children || [],
                                            children_d: e.children_d || [],
                                            data: e.data,
                                            state: {},
                                            li_attr: {
                                                id: !1
                                            },
                                            a_attr: {
                                                href: "#"
                                            },
                                            original: !1
                                        };
                                    for (s in _) _.hasOwnProperty(s) && (c.state[s] = _[s]);
                                    if (e && e.data && e.data.jstree && e.data.jstree.icon && (c.icon = e.data.jstree.icon), c.icon !== t && null !== c.icon && "" !== c.icon || (c.icon = !0), e && e.data && (c.data = e.data, e.data.jstree))
                                        for (s in e.data.jstree) e.data.jstree.hasOwnProperty(s) && (c.state[s] = e.data.jstree[s]);
                                    if (e && "object" == typeof e.state)
                                        for (s in e.state) e.state.hasOwnProperty(s) && (c.state[s] = e.state[s]);
                                    if (e && "object" == typeof e.li_attr)
                                        for (s in e.li_attr) e.li_attr.hasOwnProperty(s) && (c.li_attr[s] = e.li_attr[s]);
                                    if (c.li_attr.id || (c.li_attr.id = d), e && "object" == typeof e.a_attr)
                                        for (s in e.a_attr) e.a_attr.hasOwnProperty(s) && (c.a_attr[s] = e.a_attr[s]);
                                    for (e && e.children && !0 === e.children && (c.state.loaded = !1, c.children = [], c.children_d = []), g[c.id] = c, s = 0, n = c.children.length; s < n; s++) a = v(g[c.children[s]], c.id, r), o = g[a], c.children_d.push(a), o.children_d.length && (c.children_d = c.children_d.concat(o.children_d));
                                    return delete e.data, delete e.children, g[c.id].original = e, c.state.selected && h.push(c.id), c.id
                                },
                                j = function(e, i, r) {
                                    r = r ? r.concat() : [], i && r.unshift(i);
                                    var s, n, a, o, d, c = !1;
                                    do {
                                        c = "j" + u + "_" + ++f
                                    } while (g[c]);
                                    for (s in d = {
                                            id: !1,
                                            text: "string" == typeof e ? e : "",
                                            icon: "object" != typeof e || e.icon === t || e.icon,
                                            parent: i,
                                            parents: r,
                                            children: [],
                                            children_d: [],
                                            data: null,
                                            state: {},
                                            li_attr: {
                                                id: !1
                                            },
                                            a_attr: {
                                                href: "#"
                                            },
                                            original: !1
                                        }, _) _.hasOwnProperty(s) && (d.state[s] = _[s]);
                                    if (e && e.id && (d.id = e.id.toString()), e && e.text && (d.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (d.icon = e.data.jstree.icon), d.icon !== t && null !== d.icon && "" !== d.icon || (d.icon = !0), e && e.data && (d.data = e.data, e.data.jstree))
                                        for (s in e.data.jstree) e.data.jstree.hasOwnProperty(s) && (d.state[s] = e.data.jstree[s]);
                                    if (e && "object" == typeof e.state)
                                        for (s in e.state) e.state.hasOwnProperty(s) && (d.state[s] = e.state[s]);
                                    if (e && "object" == typeof e.li_attr)
                                        for (s in e.li_attr) e.li_attr.hasOwnProperty(s) && (d.li_attr[s] = e.li_attr[s]);
                                    if (d.li_attr.id && !d.id && (d.id = d.li_attr.id.toString()), d.id || (d.id = c), d.li_attr.id || (d.li_attr.id = d.id), e && "object" == typeof e.a_attr)
                                        for (s in e.a_attr) e.a_attr.hasOwnProperty(s) && (d.a_attr[s] = e.a_attr[s]);
                                    if (e && e.children && e.children.length) {
                                        for (s = 0, n = e.children.length; s < n; s++) a = j(e.children[s], d.id, r), o = g[a], d.children.push(a), o.children_d.length && (d.children_d = d.children_d.concat(o.children_d));
                                        d.children_d = d.children_d.concat(d.children)
                                    }
                                    return e && e.children && !0 === e.children && (d.state.loaded = !1, d.children = [], d.children_d = []), delete e.data, delete e.children, d.original = e, g[d.id] = d, d.state.selected && h.push(d.id), d.id
                                };
                            if (a.length && a[0].id !== t && a[0].parent !== t) {
                                for (r = 0, s = a.length; r < s; r++) a[r].children || (a[r].children = []), a[r].state || (a[r].state = {}), g[a[r].id.toString()] = a[r];
                                for (r = 0, s = a.length; r < s; r++) g[a[r].parent.toString()] ? (g[a[r].parent.toString()].children.push(a[r].id.toString()), p.children_d.push(a[r].id.toString())) : void 0 !== o && (o._data.core.last_error = {
                                    error: "parse",
                                    plugin: "core",
                                    id: "core_07",
                                    reason: "Node with invalid parent",
                                    data: JSON.stringify({
                                        id: a[r].id.toString(),
                                        parent: a[r].parent.toString()
                                    })
                                }, o.settings.core.error.call(o, o._data.core.last_error));
                                for (r = 0, s = p.children.length; r < s; r++) i = v(g[p.children[r]], d, p.parents.concat()), l.push(i), g[i].children_d.length && (l = l.concat(g[i].children_d));
                                for (r = 0, s = p.parents.length; r < s; r++) g[p.parents[r]].children_d = g[p.parents[r]].children_d.concat(l);
                                n = {
                                    cnt: f,
                                    mod: g,
                                    sel: m,
                                    par: d,
                                    dpc: l,
                                    add: h
                                }
                            } else {
                                for (r = 0, s = a.length; r < s; r++)(i = j(a[r], d, p.parents.concat())) && (c.push(i), l.push(i), g[i].children_d.length && (l = l.concat(g[i].children_d)));
                                for (p.children = c, p.children_d = l, r = 0, s = p.parents.length; r < s; r++) g[p.parents[r]].children_d = g[p.parents[r]].children_d.concat(l);
                                n = {
                                    cnt: f,
                                    mod: g,
                                    sel: m,
                                    par: d,
                                    dpc: l,
                                    add: h
                                }
                            }
                            if ("undefined" != typeof window && void 0 !== window.document) return n;
                            postMessage(n)
                        },
                        l = function(t, i) {
                            if (null !== this.element) {
                                this._cnt = t.cnt;
                                var s, n = this._model.data;
                                for (s in n) n.hasOwnProperty(s) && n[s].state && n[s].state.loading && t.mod[s] && (t.mod[s].state.loading = !0);
                                if (this._model.data = t.mod, i) {
                                    var a, d = t.add,
                                        l = t.sel,
                                        h = this._data.core.selected.slice();
                                    if (n = this._model.data, l.length !== h.length || e.vakata.array_unique(l.concat(h)).length !== l.length) {
                                        for (s = 0, a = l.length; s < a; s++) - 1 === e.inArray(l[s], d) && -1 === e.inArray(l[s], h) && (n[l[s]].state.selected = !1);
                                        for (s = 0, a = h.length; s < a; s++) - 1 === e.inArray(h[s], l) && (n[h[s]].state.selected = !0)
                                    }
                                }
                                t.add.length && (this._data.core.selected = this._data.core.selected.concat(t.add)), this.trigger("model", {
                                    nodes: t.dpc,
                                    parent: t.par
                                }), t.par !== e.jstree.root ? (this._node_changed(t.par), this.redraw()) : this.redraw(!0), t.add.length && this.trigger("changed", {
                                    action: "model",
                                    selected: this._data.core.selected
                                }), !i && c ? c((function() {
                                    r.call(o, !0)
                                })) : r.call(o, !0)
                            }
                        };
                    if (this.settings.core.worker && window.Blob && window.URL && window.Worker) try {
                        null === this._wrk && (this._wrk = window.URL.createObjectURL(new window.Blob(["self.onmessage = " + d.toString()], {
                            type: "text/javascript"
                        }))), !this._data.core.working || s ? (this._data.core.working = !0, (n = new window.Worker(this._wrk)).onmessage = e.proxy((function(e) {
                            l.call(this, e.data, !0);
                            try {
                                n.terminate(), n = null
                            } catch (e) {}
                            this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1
                        }), this), a.par ? n.postMessage(a) : this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1) : this._data.core.worker_queue.push([t, i, r, !0])
                    } catch (e) {
                        l.call(this, d(a), !1), this._data.core.worker_queue.length ? this._append_json_data.apply(this, this._data.core.worker_queue.shift()) : this._data.core.working = !1
                    } else l.call(this, d(a), !1)
                }
            },
            _parse_model_from_html: function(i, r, s) {
                s = s ? [].concat(s) : [], r && s.unshift(r);
                var n, a, o, d, c, l = this._model.data,
                    h = {
                        id: !1,
                        text: !1,
                        icon: !0,
                        parent: r,
                        parents: s,
                        children: [],
                        children_d: [],
                        data: null,
                        state: {},
                        li_attr: {
                            id: !1
                        },
                        a_attr: {
                            href: "#"
                        },
                        original: !1
                    };
                for (o in this._model.default_state) this._model.default_state.hasOwnProperty(o) && (h.state[o] = this._model.default_state[o]);
                if (d = e.vakata.attributes(i, !0), e.each(d, (function(t, i) {
                        if (!(i = e.trim(i)).length) return !0;
                        h.li_attr[t] = i, "id" === t && (h.id = i.toString())
                    })), (d = i.children("a").first()).length && (d = e.vakata.attributes(d, !0), e.each(d, (function(t, i) {
                        (i = e.trim(i)).length && (h.a_attr[t] = i)
                    }))), (d = i.children("a").first().length ? i.children("a").first().clone() : i.clone()).children("ins, i, ul").remove(), d = d.html(), d = e("<div></div>").html(d), h.text = this.settings.core.force_text ? d.text() : d.html(), d = i.data(), h.data = d ? e.extend(!0, {}, d) : null, h.state.opened = i.hasClass("jstree-open"), h.state.selected = i.children("a").hasClass("jstree-clicked"), h.state.disabled = i.children("a").hasClass("jstree-disabled"), h.data && h.data.jstree)
                    for (o in h.data.jstree) h.data.jstree.hasOwnProperty(o) && (h.state[o] = h.data.jstree[o]);
                (d = i.children("a").children(".jstree-themeicon")).length && (h.icon = !d.hasClass("jstree-themeicon-hidden") && d.attr("rel")), h.state.icon !== t && (h.icon = h.state.icon), h.icon !== t && null !== h.icon && "" !== h.icon || (h.icon = !0), d = i.children("ul").children("li");
                do {
                    c = "j" + this._id + "_" + ++this._cnt
                } while (l[c]);
                return h.id = h.li_attr.id ? h.li_attr.id.toString() : c, d.length ? (d.each(e.proxy((function(t, i) {
                    n = this._parse_model_from_html(e(i), h.id, s), a = this._model.data[n], h.children.push(n), a.children_d.length && (h.children_d = h.children_d.concat(a.children_d))
                }), this)), h.children_d = h.children_d.concat(h.children)) : i.hasClass("jstree-closed") && (h.state.loaded = !1), h.li_attr.class && (h.li_attr.class = h.li_attr.class.replace("jstree-closed", "").replace("jstree-open", "")), h.a_attr.class && (h.a_attr.class = h.a_attr.class.replace("jstree-clicked", "").replace("jstree-disabled", "")), l[h.id] = h, h.state.selected && this._data.core.selected.push(h.id), h.id
            },
            _parse_model_from_flat_json: function(e, i, r) {
                r = r ? r.concat() : [], i && r.unshift(i);
                var s, n, a, o, d = e.id.toString(),
                    c = this._model.data,
                    l = this._model.default_state,
                    h = {
                        id: d,
                        text: e.text || "",
                        icon: e.icon === t || e.icon,
                        parent: i,
                        parents: r,
                        children: e.children || [],
                        children_d: e.children_d || [],
                        data: e.data,
                        state: {},
                        li_attr: {
                            id: !1
                        },
                        a_attr: {
                            href: "#"
                        },
                        original: !1
                    };
                for (s in l) l.hasOwnProperty(s) && (h.state[s] = l[s]);
                if (e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), h.icon !== t && null !== h.icon && "" !== h.icon || (h.icon = !0), e && e.data && (h.data = e.data, e.data.jstree))
                    for (s in e.data.jstree) e.data.jstree.hasOwnProperty(s) && (h.state[s] = e.data.jstree[s]);
                if (e && "object" == typeof e.state)
                    for (s in e.state) e.state.hasOwnProperty(s) && (h.state[s] = e.state[s]);
                if (e && "object" == typeof e.li_attr)
                    for (s in e.li_attr) e.li_attr.hasOwnProperty(s) && (h.li_attr[s] = e.li_attr[s]);
                if (h.li_attr.id || (h.li_attr.id = d), e && "object" == typeof e.a_attr)
                    for (s in e.a_attr) e.a_attr.hasOwnProperty(s) && (h.a_attr[s] = e.a_attr[s]);
                for (e && e.children && !0 === e.children && (h.state.loaded = !1, h.children = [], h.children_d = []), c[h.id] = h, s = 0, n = h.children.length; s < n; s++) o = c[a = this._parse_model_from_flat_json(c[h.children[s]], h.id, r)], h.children_d.push(a), o.children_d.length && (h.children_d = h.children_d.concat(o.children_d));
                return delete e.data, delete e.children, c[h.id].original = e, h.state.selected && this._data.core.selected.push(h.id), h.id
            },
            _parse_model_from_json: function(e, i, r) {
                r = r ? r.concat() : [], i && r.unshift(i);
                var s, n, a, o, d, c = !1,
                    l = this._model.data,
                    h = this._model.default_state;
                do {
                    c = "j" + this._id + "_" + ++this._cnt
                } while (l[c]);
                for (s in d = {
                        id: !1,
                        text: "string" == typeof e ? e : "",
                        icon: "object" != typeof e || e.icon === t || e.icon,
                        parent: i,
                        parents: r,
                        children: [],
                        children_d: [],
                        data: null,
                        state: {},
                        li_attr: {
                            id: !1
                        },
                        a_attr: {
                            href: "#"
                        },
                        original: !1
                    }, h) h.hasOwnProperty(s) && (d.state[s] = h[s]);
                if (e && e.id && (d.id = e.id.toString()), e && e.text && (d.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (d.icon = e.data.jstree.icon), d.icon !== t && null !== d.icon && "" !== d.icon || (d.icon = !0), e && e.data && (d.data = e.data, e.data.jstree))
                    for (s in e.data.jstree) e.data.jstree.hasOwnProperty(s) && (d.state[s] = e.data.jstree[s]);
                if (e && "object" == typeof e.state)
                    for (s in e.state) e.state.hasOwnProperty(s) && (d.state[s] = e.state[s]);
                if (e && "object" == typeof e.li_attr)
                    for (s in e.li_attr) e.li_attr.hasOwnProperty(s) && (d.li_attr[s] = e.li_attr[s]);
                if (d.li_attr.id && !d.id && (d.id = d.li_attr.id.toString()), d.id || (d.id = c), d.li_attr.id || (d.li_attr.id = d.id), e && "object" == typeof e.a_attr)
                    for (s in e.a_attr) e.a_attr.hasOwnProperty(s) && (d.a_attr[s] = e.a_attr[s]);
                if (e && e.children && e.children.length) {
                    for (s = 0, n = e.children.length; s < n; s++) o = l[a = this._parse_model_from_json(e.children[s], d.id, r)], d.children.push(a), o.children_d.length && (d.children_d = d.children_d.concat(o.children_d));
                    d.children_d = d.children.concat(d.children_d)
                }
                return e && e.children && !0 === e.children && (d.state.loaded = !1, d.children = [], d.children_d = []), delete e.data, delete e.children, d.original = e, l[d.id] = d, d.state.selected && this._data.core.selected.push(d.id), d.id
            },
            _redraw: function() {
                var t, i, r, s = this._model.force_full_redraw ? this._model.data[e.jstree.root].children.concat([]) : this._model.changed.concat([]),
                    n = d.createElement("UL"),
                    a = this._data.core.focused;
                for (i = 0, r = s.length; i < r; i++)(t = this.redraw_node(s[i], !0, this._model.force_full_redraw)) && this._model.force_full_redraw && n.appendChild(t);
                this._model.force_full_redraw && (n.className = this.get_container_ul()[0].className, n.setAttribute("role", "group"), this.element.empty().append(n)), null !== a && this.settings.core.restore_focus && ((t = this.get_node(a, !0)) && t.length && t.children(".jstree-anchor")[0] !== d.activeElement ? t.children(".jstree-anchor").focus() : this._data.core.focused = null), this._model.force_full_redraw = !1, this._model.changed = [], this.trigger("redraw", {
                    nodes: s
                })
            },
            redraw: function(e) {
                e && (this._model.force_full_redraw = !0), this._redraw()
            },
            draw_children: function(t) {
                var i = this.get_node(t),
                    r = !1,
                    s = !1,
                    n = !1,
                    a = d;
                if (!i) return !1;
                if (i.id === e.jstree.root) return this.redraw(!0);
                if (!(t = this.get_node(t, !0)) || !t.length) return !1;
                if (t.children(".jstree-children").remove(), t = t[0], i.children.length && i.state.loaded) {
                    for ((n = a.createElement("UL")).setAttribute("role", "group"), n.className = "jstree-children", r = 0, s = i.children.length; r < s; r++) n.appendChild(this.redraw_node(i.children[r], !0, !0));
                    t.appendChild(n)
                }
            },
            redraw_node: function(t, i, r, s) {
                var n = this.get_node(t),
                    a = !1,
                    o = !1,
                    c = !1,
                    l = !1,
                    h = !1,
                    _ = !1,
                    u = "",
                    f = d,
                    g = this._model.data,
                    p = !1,
                    m = null,
                    v = 0,
                    j = 0,
                    y = !1,
                    k = !1;
                if (!n) return !1;
                if (n.id === e.jstree.root) return this.redraw(!0);
                if (i = i || 0 === n.children.length, t = d.querySelector ? this.element[0].querySelector("#" + (-1 !== "0123456789".indexOf(n.id[0]) ? "\\3" + n.id[0] + " " + n.id.substr(1).replace(e.jstree.idregex, "\\$&") : n.id.replace(e.jstree.idregex, "\\$&"))) : d.getElementById(n.id)) t = e(t), r || ((a = t.parent().parent()[0]) === this.element[0] && (a = null), o = t.index()), i || !n.children.length || t.children(".jstree-children").length || (i = !0), i || (c = t.children(".jstree-children")[0]), p = t.children(".jstree-anchor")[0] === d.activeElement, t.remove();
                else if (i = !0, !r) {
                    if (!(null === (a = n.parent !== e.jstree.root ? e("#" + n.parent.replace(e.jstree.idregex, "\\$&"), this.element)[0] : null) || a && g[n.parent].state.opened)) return !1;
                    o = e.inArray(n.id, null === a ? g[e.jstree.root].children : g[n.parent].children)
                }
                for (l in t = this._data.core.node.cloneNode(!0), u = "jstree-node ", n.li_attr)
                    if (n.li_attr.hasOwnProperty(l)) {
                        if ("id" === l) continue;
                        "class" !== l ? t.setAttribute(l, n.li_attr[l]) : u += n.li_attr[l]
                    }
                for (n.a_attr.id || (n.a_attr.id = n.id + "_anchor"), t.setAttribute("aria-selected", !!n.state.selected), t.childNodes[1].setAttribute("aria-selected", !!n.state.selected), t.setAttribute("aria-level", n.parents.length), t.childNodes[1].setAttribute("aria-level", n.parents.length), t.setAttribute("aria-labelledby", n.a_attr.id), n.state.disabled && (t.setAttribute("aria-disabled", !0), t.childNodes[1].setAttribute("aria-disabled", !0)), l = 0, h = n.children.length; l < h; l++)
                    if (!g[n.children[l]].state.hidden) {
                        y = !0;
                        break
                    }
                if (null !== n.parent && g[n.parent] && !n.state.hidden && (l = e.inArray(n.id, g[n.parent].children), k = n.id, -1 !== l))
                    for (l++, h = g[n.parent].children.length; l < h && (g[g[n.parent].children[l]].state.hidden || (k = g[n.parent].children[l]), k === n.id); l++);
                for (h in n.state.hidden && (u += " jstree-hidden"), n.state.loading && (u += " jstree-loading"), n.state.loaded && !y ? u += " jstree-leaf" : (u += n.state.opened && n.state.loaded ? " jstree-open" : " jstree-closed", t.setAttribute("aria-expanded", n.state.opened && n.state.loaded), t.childNodes[1].setAttribute("aria-expanded", n.state.opened && n.state.loaded)), k === n.id && (u += " jstree-last"), t.id = n.id, t.className = u, u = (n.state.selected ? " jstree-clicked" : "") + (n.state.disabled ? " jstree-disabled" : ""), n.a_attr)
                    if (n.a_attr.hasOwnProperty(h)) {
                        if ("href" === h && "#" === n.a_attr[h]) continue;
                        "class" !== h ? t.childNodes[1].setAttribute(h, n.a_attr[h]) : u += " " + n.a_attr[h]
                    }
                if (u.length && (t.childNodes[1].className = "jstree-anchor " + u), (n.icon && !0 !== n.icon || !1 === n.icon) && (!1 === n.icon ? t.childNodes[1].childNodes[0].className += " jstree-themeicon-hidden" : -1 === n.icon.indexOf("/") && -1 === n.icon.indexOf(".") ? t.childNodes[1].childNodes[0].className += " " + n.icon + " jstree-themeicon-custom" : (t.childNodes[1].childNodes[0].style.backgroundImage = 'url("' + n.icon + '")', t.childNodes[1].childNodes[0].style.backgroundPosition = "center center", t.childNodes[1].childNodes[0].style.backgroundSize = "auto", t.childNodes[1].childNodes[0].className += " jstree-themeicon-custom")), this.settings.core.force_text ? t.childNodes[1].appendChild(f.createTextNode(n.text)) : t.childNodes[1].innerHTML += n.text, i && n.children.length && (n.state.opened || s) && n.state.loaded) {
                    for ((_ = f.createElement("UL")).setAttribute("role", "group"), _.className = "jstree-children", l = 0, h = n.children.length; l < h; l++) _.appendChild(this.redraw_node(n.children[l], i, !0));
                    t.appendChild(_)
                }
                if (c && t.appendChild(c), !r) {
                    for (a || (a = this.element[0]), l = 0, h = a.childNodes.length; l < h; l++)
                        if (a.childNodes[l] && a.childNodes[l].className && -1 !== a.childNodes[l].className.indexOf("jstree-children")) {
                            m = a.childNodes[l];
                            break
                        }
                    m || ((m = f.createElement("UL")).setAttribute("role", "group"), m.className = "jstree-children", a.appendChild(m)), o < (a = m).childNodes.length ? a.insertBefore(t, a.childNodes[o]) : a.appendChild(t), p && (v = this.element[0].scrollTop, j = this.element[0].scrollLeft, t.childNodes[1].focus(), this.element[0].scrollTop = v, this.element[0].scrollLeft = j)
                }
                return n.state.opened && !n.state.loaded && (n.state.opened = !1, setTimeout(e.proxy((function() {
                    this.open_node(n.id, !1, 0)
                }), this), 0)), t
            },
            open_node: function(i, r, s) {
                var n, a, o, d;
                if (e.isArray(i)) {
                    for (n = 0, a = (i = i.slice()).length; n < a; n++) this.open_node(i[n], r, s);
                    return !0
                }
                return !(!(i = this.get_node(i)) || i.id === e.jstree.root) && (s = s === t ? this.settings.core.animation : s, this.is_closed(i) ? this.is_loaded(i) ? (o = this.get_node(i, !0), d = this, o.length && (s && o.children(".jstree-children").length && o.children(".jstree-children").stop(!0, !0), i.children.length && !this._firstChild(o.children(".jstree-children")[0]) && this.draw_children(i), s ? (this.trigger("before_open", {
                    node: i
                }), o.children(".jstree-children").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", !0).children(".jstree-anchor").attr("aria-expanded", !0).end().children(".jstree-children").stop(!0, !0).slideDown(s, (function() {
                    this.style.display = "", d.element && d.trigger("after_open", {
                        node: i
                    })
                }))) : (this.trigger("before_open", {
                    node: i
                }), o[0].className = o[0].className.replace("jstree-closed", "jstree-open"), o[0].setAttribute("aria-expanded", !0), o[0].childNodes[1].setAttribute("aria-expanded", !0))), i.state.opened = !0, r && r.call(this, i, !0), o.length || this.trigger("before_open", {
                    node: i
                }), this.trigger("open_node", {
                    node: i
                }), s && o.length || this.trigger("after_open", {
                    node: i
                }), !0) : this.is_loading(i) ? setTimeout(e.proxy((function() {
                    this.open_node(i, r, s)
                }), this), 500) : void this.load_node(i, (function(e, t) {
                    return t ? this.open_node(e, r, s) : !!r && r.call(this, e, !1)
                })) : (r && r.call(this, i, !1), !1))
            },
            _open_to: function(t) {
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                var i, r, s = t.parents;
                for (i = 0, r = s.length; i < r; i += 1) i !== e.jstree.root && this.open_node(s[i], !1, 0);
                return e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)
            },
            close_node: function(i, r) {
                var s, n, a, o;
                if (e.isArray(i)) {
                    for (s = 0, n = (i = i.slice()).length; s < n; s++) this.close_node(i[s], r);
                    return !0
                }
                return !(!(i = this.get_node(i)) || i.id === e.jstree.root) && (!this.is_closed(i) && (r = r === t ? this.settings.core.animation : r, a = this, o = this.get_node(i, !0), i.state.opened = !1, this.trigger("close_node", {
                    node: i
                }), void(o.length ? r ? o.children(".jstree-children").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", !1).children(".jstree-anchor").attr("aria-expanded", !1).end().children(".jstree-children").stop(!0, !0).slideUp(r, (function() {
                    this.style.display = "", o.children(".jstree-children").remove(), a.element && a.trigger("after_close", {
                        node: i
                    })
                })) : (o[0].className = o[0].className.replace("jstree-open", "jstree-closed"), o.children(".jstree-anchor").attr("aria-expanded", !1), o.attr("aria-expanded", !1).children(".jstree-children").remove(), this.trigger("after_close", {
                    node: i
                })) : this.trigger("after_close", {
                    node: i
                }))))
            },
            toggle_node: function(t) {
                var i, r;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.toggle_node(t[i]);
                    return !0
                }
                return this.is_closed(t) ? this.open_node(t) : this.is_open(t) ? this.close_node(t) : void 0
            },
            open_all: function(t, i, r) {
                if (t || (t = e.jstree.root), !(t = this.get_node(t))) return !1;
                var s, n, a, o = t.id === e.jstree.root ? this.get_container_ul() : this.get_node(t, !0);
                if (!o.length) {
                    for (s = 0, n = t.children_d.length; s < n; s++) this.is_closed(this._model.data[t.children_d[s]]) && (this._model.data[t.children_d[s]].state.opened = !0);
                    return this.trigger("open_all", {
                        node: t
                    })
                }
                r = r || o, a = this, (o = this.is_closed(t) ? o.find(".jstree-closed").addBack() : o.find(".jstree-closed")).each((function() {
                    a.open_node(this, (function(e, t) {
                        t && this.is_parent(e) && this.open_all(e, i, r)
                    }), i || 0)
                })), 0 === r.find(".jstree-closed").length && this.trigger("open_all", {
                    node: this.get_node(r)
                })
            },
            close_all: function(t, i) {
                if (t || (t = e.jstree.root), !(t = this.get_node(t))) return !1;
                var r, s, n = t.id === e.jstree.root ? this.get_container_ul() : this.get_node(t, !0),
                    a = this;
                for (n.length && (n = this.is_open(t) ? n.find(".jstree-open").addBack() : n.find(".jstree-open"), e(n.get().reverse()).each((function() {
                        a.close_node(this, i || 0)
                    }))), r = 0, s = t.children_d.length; r < s; r++) this._model.data[t.children_d[r]].state.opened = !1;
                this.trigger("close_all", {
                    node: t
                })
            },
            is_disabled: function(e) {
                return (e = this.get_node(e)) && e.state && e.state.disabled
            },
            enable_node: function(t) {
                var i, r;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.enable_node(t[i]);
                    return !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                t.state.disabled = !1, this.get_node(t, !0).children(".jstree-anchor").removeClass("jstree-disabled").attr("aria-disabled", !1), this.trigger("enable_node", {
                    node: t
                })
            },
            disable_node: function(t) {
                var i, r;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.disable_node(t[i]);
                    return !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                t.state.disabled = !0, this.get_node(t, !0).children(".jstree-anchor").addClass("jstree-disabled").attr("aria-disabled", !0), this.trigger("disable_node", {
                    node: t
                })
            },
            is_hidden: function(e) {
                return !0 === (e = this.get_node(e)).state.hidden
            },
            hide_node: function(t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (r = 0, s = (t = t.slice()).length; r < s; r++) this.hide_node(t[r], !0);
                    return i || this.redraw(), !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                t.state.hidden || (t.state.hidden = !0, this._node_changed(t.parent), i || this.redraw(), this.trigger("hide_node", {
                    node: t
                }))
            },
            show_node: function(t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (r = 0, s = (t = t.slice()).length; r < s; r++) this.show_node(t[r], !0);
                    return i || this.redraw(), !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                t.state.hidden && (t.state.hidden = !1, this._node_changed(t.parent), i || this.redraw(), this.trigger("show_node", {
                    node: t
                }))
            },
            hide_all: function(t) {
                var i, r = this._model.data,
                    s = [];
                for (i in r) r.hasOwnProperty(i) && i !== e.jstree.root && !r[i].state.hidden && (r[i].state.hidden = !0, s.push(i));
                return this._model.force_full_redraw = !0, t || this.redraw(), this.trigger("hide_all", {
                    nodes: s
                }), s
            },
            show_all: function(t) {
                var i, r = this._model.data,
                    s = [];
                for (i in r) r.hasOwnProperty(i) && i !== e.jstree.root && r[i].state.hidden && (r[i].state.hidden = !1, s.push(i));
                return this._model.force_full_redraw = !0, t || this.redraw(), this.trigger("show_all", {
                    nodes: s
                }), s
            },
            activate_node: function(e, i) {
                if (this.is_disabled(e)) return !1;
                if (i && "object" == typeof i || (i = {}), this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== t ? this.get_node(this._data.core.last_clicked.id) : null, this._data.core.last_clicked && !this._data.core.last_clicked.state.selected && (this._data.core.last_clicked = null), !this._data.core.last_clicked && this._data.core.selected.length && (this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1])), this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && (!i.shiftKey || this._data.core.last_clicked && this.get_parent(e) && this.get_parent(e) === this._data.core.last_clicked.parent))
                    if (i.shiftKey) {
                        var r, s, n = this.get_node(e).id,
                            a = this._data.core.last_clicked.id,
                            o = this.get_node(this._data.core.last_clicked.parent).children,
                            d = !1;
                        for (r = 0, s = o.length; r < s; r += 1) o[r] === n && (d = !d), o[r] === a && (d = !d), this.is_disabled(o[r]) || !d && o[r] !== n && o[r] !== a ? this.deselect_node(o[r], !0, i) : this.is_hidden(o[r]) || this.select_node(o[r], !0, !1, i);
                        this.trigger("changed", {
                            action: "select_node",
                            node: this.get_node(e),
                            selected: this._data.core.selected,
                            event: i
                        })
                    } else this.is_selected(e) ? this.deselect_node(e, !1, i) : this.select_node(e, !1, !1, i);
                else !this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && this.is_selected(e) ? this.deselect_node(e, !1, i) : (this.deselect_all(!0), this.select_node(e, !1, !1, i), this._data.core.last_clicked = this.get_node(e));
                this.trigger("activate_node", {
                    node: this.get_node(e),
                    event: i
                })
            },
            hover_node: function(e) {
                if (!(e = this.get_node(e, !0)) || !e.length || e.children(".jstree-hovered").length) return !1;
                var t = this.element.find(".jstree-hovered"),
                    i = this.element;
                t && t.length && this.dehover_node(t), e.children(".jstree-anchor").addClass("jstree-hovered"), this.trigger("hover_node", {
                    node: this.get_node(e)
                }), setTimeout((function() {
                    i.attr("aria-activedescendant", e[0].id)
                }), 0)
            },
            dehover_node: function(e) {
                if (!(e = this.get_node(e, !0)) || !e.length || !e.children(".jstree-hovered").length) return !1;
                e.children(".jstree-anchor").removeClass("jstree-hovered"), this.trigger("dehover_node", {
                    node: this.get_node(e)
                })
            },
            select_node: function(t, i, r, s) {
                var n, a, o;
                if (e.isArray(t)) {
                    for (a = 0, o = (t = t.slice()).length; a < o; a++) this.select_node(t[a], i, r, s);
                    return !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                n = this.get_node(t, !0), t.state.selected || (t.state.selected = !0, this._data.core.selected.push(t.id), r || (n = this._open_to(t)), n && n.length && n.attr("aria-selected", !0).children(".jstree-anchor").addClass("jstree-clicked").attr("aria-selected", !0), this.trigger("select_node", {
                    node: t,
                    selected: this._data.core.selected,
                    event: s
                }), i || this.trigger("changed", {
                    action: "select_node",
                    node: t,
                    selected: this._data.core.selected,
                    event: s
                }))
            },
            deselect_node: function(t, i, r) {
                var s, n, a;
                if (e.isArray(t)) {
                    for (s = 0, n = (t = t.slice()).length; s < n; s++) this.deselect_node(t[s], i, r);
                    return !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                a = this.get_node(t, !0), t.state.selected && (t.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, t.id), a.length && a.attr("aria-selected", !1).children(".jstree-anchor").removeClass("jstree-clicked").attr("aria-selected", !1), this.trigger("deselect_node", {
                    node: t,
                    selected: this._data.core.selected,
                    event: r
                }), i || this.trigger("changed", {
                    action: "deselect_node",
                    node: t,
                    selected: this._data.core.selected,
                    event: r
                }))
            },
            select_all: function(t) {
                var i, r, s = this._data.core.selected.concat([]);
                for (this._data.core.selected = this._model.data[e.jstree.root].children_d.concat(), i = 0, r = this._data.core.selected.length; i < r; i++) this._model.data[this._data.core.selected[i]] && (this._model.data[this._data.core.selected[i]].state.selected = !0);
                this.redraw(!0), this.trigger("select_all", {
                    selected: this._data.core.selected
                }), t || this.trigger("changed", {
                    action: "select_all",
                    selected: this._data.core.selected,
                    old_selection: s
                })
            },
            deselect_all: function(e) {
                var t, i, r = this._data.core.selected.concat([]);
                for (t = 0, i = this._data.core.selected.length; t < i; t++) this._model.data[this._data.core.selected[t]] && (this._model.data[this._data.core.selected[t]].state.selected = !1);
                this._data.core.selected = [], this.element.find(".jstree-clicked").removeClass("jstree-clicked").attr("aria-selected", !1).parent().attr("aria-selected", !1), this.trigger("deselect_all", {
                    selected: this._data.core.selected,
                    node: r
                }), e || this.trigger("changed", {
                    action: "deselect_all",
                    selected: this._data.core.selected,
                    old_selection: r
                })
            },
            is_selected: function(t) {
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && t.state.selected
            },
            get_selected: function(t) {
                return t ? e.map(this._data.core.selected, e.proxy((function(e) {
                    return this.get_node(e)
                }), this)) : this._data.core.selected.slice()
            },
            get_top_selected: function(t) {
                var i, r, s, n, a = this.get_selected(!0),
                    o = {};
                for (i = 0, r = a.length; i < r; i++) o[a[i].id] = a[i];
                for (i = 0, r = a.length; i < r; i++)
                    for (s = 0, n = a[i].children_d.length; s < n; s++) o[a[i].children_d[s]] && delete o[a[i].children_d[s]];
                for (i in a = [], o) o.hasOwnProperty(i) && a.push(i);
                return t ? e.map(a, e.proxy((function(e) {
                    return this.get_node(e)
                }), this)) : a
            },
            get_bottom_selected: function(t) {
                var i, r, s = this.get_selected(!0),
                    n = [];
                for (i = 0, r = s.length; i < r; i++) s[i].children.length || n.push(s[i].id);
                return t ? e.map(n, e.proxy((function(e) {
                    return this.get_node(e)
                }), this)) : n
            },
            get_state: function() {
                var t, i = {
                    core: {
                        open: [],
                        loaded: [],
                        scroll: {
                            left: this.element.scrollLeft(),
                            top: this.element.scrollTop()
                        },
                        selected: []
                    }
                };
                for (t in this._model.data) this._model.data.hasOwnProperty(t) && t !== e.jstree.root && (this._model.data[t].state.loaded && this.settings.core.loaded_state && i.core.loaded.push(t), this._model.data[t].state.opened && i.core.open.push(t), this._model.data[t].state.selected && i.core.selected.push(t));
                return i
            },
            set_state: function(i, r) {
                if (i) {
                    if (i.core && i.core.selected && i.core.initial_selection === t && (i.core.initial_selection = this._data.core.selected.concat([]).sort().join(",")), i.core) {
                        var s, n;
                        if (i.core.loaded) return this.settings.core.loaded_state && e.isArray(i.core.loaded) && i.core.loaded.length ? this._load_nodes(i.core.loaded, (function(e) {
                            delete i.core.loaded, this.set_state(i, r)
                        })) : (delete i.core.loaded, this.set_state(i, r)), !1;
                        if (i.core.open) return e.isArray(i.core.open) && i.core.open.length ? this._load_nodes(i.core.open, (function(e) {
                            this.open_node(e, !1, 0), delete i.core.open, this.set_state(i, r)
                        })) : (delete i.core.open, this.set_state(i, r)), !1;
                        if (i.core.scroll) return i.core.scroll && i.core.scroll.left !== t && this.element.scrollLeft(i.core.scroll.left), i.core.scroll && i.core.scroll.top !== t && this.element.scrollTop(i.core.scroll.top), delete i.core.scroll, this.set_state(i, r), !1;
                        if (i.core.selected) return s = this, i.core.initial_selection !== t && i.core.initial_selection !== this._data.core.selected.concat([]).sort().join(",") || (this.deselect_all(), e.each(i.core.selected, (function(e, t) {
                            s.select_node(t, !1, !0)
                        }))), delete i.core.initial_selection, delete i.core.selected, this.set_state(i, r), !1;
                        for (n in i) i.hasOwnProperty(n) && "core" !== n && -1 === e.inArray(n, this.settings.plugins) && delete i[n];
                        if (e.isEmptyObject(i.core)) return delete i.core, this.set_state(i, r), !1
                    }
                    return !e.isEmptyObject(i) || (i = null, r && r.call(this), this.trigger("set_state"), !1)
                }
                return !1
            },
            refresh: function(t, i) {
                this._data.core.state = !0 === i ? {} : this.get_state(), i && e.isFunction(i) && (this._data.core.state = i.call(this, this._data.core.state)), this._cnt = 0, this._model.data = {}, this._model.data[e.jstree.root] = {
                    id: e.jstree.root,
                    parent: null,
                    parents: [],
                    children: [],
                    children_d: [],
                    state: {
                        loaded: !1
                    }
                }, this._data.core.selected = [], this._data.core.last_clicked = null, this._data.core.focused = null;
                var r = this.get_container_ul()[0].className;
                t || (this.element.html("<ul class='" + r + "' role='group'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='presentation' id='j" + this._id + "_loading'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' role='treeitem' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.element.attr("aria-activedescendant", "j" + this._id + "_loading")), this.load_node(e.jstree.root, (function(t, i) {
                    i && (this.get_container_ul()[0].className = r, this._firstChild(this.get_container_ul()[0]) && this.element.attr("aria-activedescendant", this._firstChild(this.get_container_ul()[0]).id), this.set_state(e.extend(!0, {}, this._data.core.state), (function() {
                        this.trigger("refresh")
                    }))), this._data.core.state = null
                }))
            },
            refresh_node: function(t) {
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                var i = [],
                    r = [],
                    s = this._data.core.selected.concat([]);
                r.push(t.id), !0 === t.state.opened && i.push(t.id), this.get_node(t, !0).find(".jstree-open").each((function() {
                    r.push(this.id), i.push(this.id)
                })), this._load_nodes(r, e.proxy((function(e) {
                    this.open_node(i, !1, 0), this.select_node(s), this.trigger("refresh_node", {
                        node: t,
                        nodes: e
                    })
                }), this), !1, !0)
            },
            set_id: function(t, i) {
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                var r, s, n = this._model.data,
                    a = t.id;
                for (i = i.toString(), n[t.parent].children[e.inArray(t.id, n[t.parent].children)] = i, r = 0, s = t.parents.length; r < s; r++) n[t.parents[r]].children_d[e.inArray(t.id, n[t.parents[r]].children_d)] = i;
                for (r = 0, s = t.children.length; r < s; r++) n[t.children[r]].parent = i;
                for (r = 0, s = t.children_d.length; r < s; r++) n[t.children_d[r]].parents[e.inArray(t.id, n[t.children_d[r]].parents)] = i;
                return -1 !== (r = e.inArray(t.id, this._data.core.selected)) && (this._data.core.selected[r] = i), (r = this.get_node(t.id, !0)) && (r.attr("id", i), this.element.attr("aria-activedescendant") === t.id && this.element.attr("aria-activedescendant", i)), delete n[t.id], t.id = i, t.li_attr.id = i, n[i] = t, this.trigger("set_id", {
                    node: t,
                    new: t.id,
                    old: a
                }), !0
            },
            get_text: function(t) {
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && t.text
            },
            set_text: function(t, i) {
                var r, s;
                if (e.isArray(t)) {
                    for (r = 0, s = (t = t.slice()).length; r < s; r++) this.set_text(t[r], i);
                    return !0
                }
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && (t.text = i, this.get_node(t, !0).length && this.redraw_node(t.id), this.trigger("set_text", {
                    obj: t,
                    text: i
                }), !0)
            },
            get_json: function(t, i, r) {
                if (!(t = this.get_node(t || e.jstree.root))) return !1;
                i && i.flat && !r && (r = []);
                var s, n, a = {
                    id: t.id,
                    text: t.text,
                    icon: this.get_icon(t),
                    li_attr: e.extend(!0, {}, t.li_attr),
                    a_attr: e.extend(!0, {}, t.a_attr),
                    state: {},
                    data: (!i || !i.no_data) && e.extend(!0, e.isArray(t.data) ? [] : {}, t.data)
                };
                if (i && i.flat ? a.parent = t.parent : a.children = [], i && i.no_state) delete a.state;
                else
                    for (s in t.state) t.state.hasOwnProperty(s) && (a.state[s] = t.state[s]);
                if (i && i.no_li_attr && delete a.li_attr, i && i.no_a_attr && delete a.a_attr, i && i.no_id && (delete a.id, a.li_attr && a.li_attr.id && delete a.li_attr.id, a.a_attr && a.a_attr.id && delete a.a_attr.id), i && i.flat && t.id !== e.jstree.root && r.push(a), !i || !i.no_children)
                    for (s = 0, n = t.children.length; s < n; s++) i && i.flat ? this.get_json(t.children[s], i, r) : a.children.push(this.get_json(t.children[s], i));
                return i && i.flat ? r : t.id === e.jstree.root ? a.children : a
            },
            create_node: function(i, r, s, n, a) {
                if (null === i && (i = e.jstree.root), !(i = this.get_node(i))) return !1;
                if (!(s = s === t ? "last" : s).toString().match(/^(before|after)$/) && !a && !this.is_loaded(i)) return this.load_node(i, (function() {
                    this.create_node(i, r, s, n, !0)
                }));
                var o, d, c, l;
                switch (r || (r = {
                    text: this.get_string("New node")
                }), (r = "string" == typeof r ? {
                    text: r
                } : e.extend(!0, {}, r)).text === t && (r.text = this.get_string("New node")), i.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case "before":
                        o = this.get_node(i.parent), s = e.inArray(i.id, o.children), i = o;
                        break;
                    case "after":
                        o = this.get_node(i.parent), s = e.inArray(i.id, o.children) + 1, i = o;
                        break;
                    case "inside":
                    case "first":
                        s = 0;
                        break;
                    case "last":
                        s = i.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > i.children.length && (s = i.children.length), r.id || (r.id = !0), !this.check("create_node", r, i, s)) return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (!0 === r.id && delete r.id, !(r = this._parse_model_from_json(r, i.id, i.parents.concat()))) return !1;
                for (o = this.get_node(r), (d = []).push(r), d = d.concat(o.children_d), this.trigger("model", {
                        nodes: d,
                        parent: i.id
                    }), i.children_d = i.children_d.concat(d), c = 0, l = i.parents.length; c < l; c++) this._model.data[i.parents[c]].children_d = this._model.data[i.parents[c]].children_d.concat(d);
                for (r = o, o = [], c = 0, l = i.children.length; c < l; c++) o[c >= s ? c + 1 : c] = i.children[c];
                return o[s] = r.id, i.children = o, this.redraw_node(i, !0), this.trigger("create_node", {
                    node: this.get_node(r),
                    parent: i.id,
                    position: s
                }), n && n.call(this, this.get_node(r)), r.id
            },
            rename_node: function(t, i) {
                var r, s, n;
                if (e.isArray(t)) {
                    for (r = 0, s = (t = t.slice()).length; r < s; r++) this.rename_node(t[r], i);
                    return !0
                }
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && (n = t.text, this.check("rename_node", t, this.get_parent(t), i) ? (this.set_text(t, i), this.trigger("rename_node", {
                    node: t,
                    text: i,
                    old: n
                }), !0) : (this.settings.core.error.call(this, this._data.core.last_error), !1))
            },
            delete_node: function(t) {
                var i, r, s, n, a, o, d, c, l, h, _, u;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.delete_node(t[i]);
                    return !0
                }
                if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                if (s = this.get_node(t.parent), n = e.inArray(t.id, s.children), h = !1, !this.check("delete_node", t, s, n)) return this.settings.core.error.call(this, this._data.core.last_error), !1;
                for (-1 !== n && (s.children = e.vakata.array_remove(s.children, n)), (a = t.children_d.concat([])).push(t.id), o = 0, d = t.parents.length; o < d; o++) this._model.data[t.parents[o]].children_d = e.vakata.array_filter(this._model.data[t.parents[o]].children_d, (function(t) {
                    return -1 === e.inArray(t, a)
                }));
                for (c = 0, l = a.length; c < l; c++)
                    if (this._model.data[a[c]].state.selected) {
                        h = !0;
                        break
                    }
                for (h && (this._data.core.selected = e.vakata.array_filter(this._data.core.selected, (function(t) {
                        return -1 === e.inArray(t, a)
                    }))), this.trigger("delete_node", {
                        node: t,
                        parent: s.id
                    }), h && this.trigger("changed", {
                        action: "delete_node",
                        node: t,
                        selected: this._data.core.selected,
                        parent: s.id
                    }), c = 0, l = a.length; c < l; c++) delete this._model.data[a[c]];
                return -1 !== e.inArray(this._data.core.focused, a) && (this._data.core.focused = null, _ = this.element[0].scrollTop, u = this.element[0].scrollLeft, s.id === e.jstree.root ? this._model.data[e.jstree.root].children[0] && this.get_node(this._model.data[e.jstree.root].children[0], !0).children(".jstree-anchor").focus() : this.get_node(s, !0).children(".jstree-anchor").focus(), this.element[0].scrollTop = _, this.element[0].scrollLeft = u), this.redraw_node(s, !0), !0
            },
            check: function(t, i, r, s, n) {
                i = i && i.id ? i : this.get_node(i), r = r && r.id ? r : this.get_node(r);
                var a = t.match(/^move_node|copy_node|create_node$/i) ? r : i,
                    o = this.settings.core.check_callback;
                if ("move_node" === t || "copy_node" === t) {
                    if (!(n && n.is_multi || "move_node" !== t || e.inArray(i.id, r.children) !== s)) return this._data.core.last_error = {
                        error: "check",
                        plugin: "core",
                        id: "core_08",
                        reason: "Moving node to its current position",
                        data: JSON.stringify({
                            chk: t,
                            pos: s,
                            obj: !(!i || !i.id) && i.id,
                            par: !(!r || !r.id) && r.id
                        })
                    }, !1;
                    if (!(n && n.is_multi || i.id !== r.id && ("move_node" !== t || e.inArray(i.id, r.children) !== s) && -1 === e.inArray(r.id, i.children_d))) return this._data.core.last_error = {
                        error: "check",
                        plugin: "core",
                        id: "core_01",
                        reason: "Moving parent inside child",
                        data: JSON.stringify({
                            chk: t,
                            pos: s,
                            obj: !(!i || !i.id) && i.id,
                            par: !(!r || !r.id) && r.id
                        })
                    }, !1
                }
                return a && a.data && (a = a.data), a && a.functions && (!1 === a.functions[t] || !0 === a.functions[t]) ? (!1 === a.functions[t] && (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_02",
                    reason: "Node data prevents function: " + t,
                    data: JSON.stringify({
                        chk: t,
                        pos: s,
                        obj: !(!i || !i.id) && i.id,
                        par: !(!r || !r.id) && r.id
                    })
                }), a.functions[t]) : !(!1 === o || e.isFunction(o) && !1 === o.call(this, t, i, r, s, n) || o && !1 === o[t]) || (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_03",
                    reason: "User config for core.check_callback prevents function: " + t,
                    data: JSON.stringify({
                        chk: t,
                        pos: s,
                        obj: !(!i || !i.id) && i.id,
                        par: !(!r || !r.id) && r.id
                    })
                }, !1)
            },
            last_error: function() {
                return this._data.core.last_error
            },
            move_node: function(i, r, s, n, a, o, d) {
                var c, l, h, _, u, f, g, p, m, v, j, y, k, b;
                if (r = this.get_node(r), s = s === t ? 0 : s, !r) return !1;
                if (!s.toString().match(/^(before|after)$/) && !a && !this.is_loaded(r)) return this.load_node(r, (function() {
                    this.move_node(i, r, s, n, !0, !1, d)
                }));
                if (e.isArray(i)) {
                    if (1 !== i.length) {
                        for (c = 0, l = i.length; c < l; c++)(m = this.move_node(i[c], r, s, n, a, !1, d)) && (r = m, s = "after");
                        return this.redraw(), !0
                    }
                    i = i[0]
                }
                if (!(i = i && i.id ? i : this.get_node(i)) || i.id === e.jstree.root) return !1;
                if (h = (i.parent || e.jstree.root).toString(), u = s.toString().match(/^(before|after)$/) && r.id !== e.jstree.root ? this.get_node(r.parent) : r, g = !(f = d || (this._model.data[i.id] ? this : e.jstree.reference(i.id))) || !f._id || this._id !== f._id, _ = f && f._id && h && f._model.data[h] && f._model.data[h].children ? e.inArray(i.id, f._model.data[h].children) : -1, f && f._id && (i = f._model.data[i.id]), g) return !!(m = this.copy_node(i, r, s, n, a, !1, d)) && (f && f.delete_node(i), m);
                switch (r.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case "before":
                        s = e.inArray(r.id, u.children);
                        break;
                    case "after":
                        s = e.inArray(r.id, u.children) + 1;
                        break;
                    case "inside":
                    case "first":
                        s = 0;
                        break;
                    case "last":
                        s = u.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > u.children.length && (s = u.children.length), !this.check("move_node", i, u, s, {
                        core: !0,
                        origin: d,
                        is_multi: f && f._id && f._id !== this._id,
                        is_foreign: !f || !f._id
                    })) return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (i.parent === u.id) {
                    for (p = u.children.concat(), -1 !== (m = e.inArray(i.id, p)) && (p = e.vakata.array_remove(p, m), s > m && s--), m = [], v = 0, j = p.length; v < j; v++) m[v >= s ? v + 1 : v] = p[v];
                    m[s] = i.id, u.children = m, this._node_changed(u.id), this.redraw(u.id === e.jstree.root)
                } else {
                    for ((m = i.children_d.concat()).push(i.id), v = 0, j = i.parents.length; v < j; v++) {
                        for (p = [], y = 0, k = (b = f._model.data[i.parents[v]].children_d).length; y < k; y++) - 1 === e.inArray(b[y], m) && p.push(b[y]);
                        f._model.data[i.parents[v]].children_d = p
                    }
                    for (f._model.data[h].children = e.vakata.array_remove_item(f._model.data[h].children, i.id), v = 0, j = u.parents.length; v < j; v++) this._model.data[u.parents[v]].children_d = this._model.data[u.parents[v]].children_d.concat(m);
                    for (p = [], v = 0, j = u.children.length; v < j; v++) p[v >= s ? v + 1 : v] = u.children[v];
                    for (p[s] = i.id, u.children = p, u.children_d.push(i.id), u.children_d = u.children_d.concat(i.children_d), i.parent = u.id, (m = u.parents.concat()).unshift(u.id), b = i.parents.length, i.parents = m, m = m.concat(), v = 0, j = i.children_d.length; v < j; v++) this._model.data[i.children_d[v]].parents = this._model.data[i.children_d[v]].parents.slice(0, -1 * b), Array.prototype.push.apply(this._model.data[i.children_d[v]].parents, m);
                    h !== e.jstree.root && u.id !== e.jstree.root || (this._model.force_full_redraw = !0), this._model.force_full_redraw || (this._node_changed(h), this._node_changed(u.id)), o || this.redraw()
                }
                return n && n.call(this, i, u, s), this.trigger("move_node", {
                    node: i,
                    parent: u.id,
                    position: s,
                    old_parent: h,
                    old_position: _,
                    is_multi: f && f._id && f._id !== this._id,
                    is_foreign: !f || !f._id,
                    old_instance: f,
                    new_instance: this
                }), i.id
            },
            copy_node: function(i, r, s, n, a, o, d) {
                var c, l, h, _, u, f, g, p, m, v;
                if (r = this.get_node(r), s = s === t ? 0 : s, !r) return !1;
                if (!s.toString().match(/^(before|after)$/) && !a && !this.is_loaded(r)) return this.load_node(r, (function() {
                    this.copy_node(i, r, s, n, !0, !1, d)
                }));
                if (e.isArray(i)) {
                    if (1 !== i.length) {
                        for (c = 0, l = i.length; c < l; c++)(_ = this.copy_node(i[c], r, s, n, a, !0, d)) && (r = _, s = "after");
                        return this.redraw(), !0
                    }
                    i = i[0]
                }
                if (!(i = i && i.id ? i : this.get_node(i)) || i.id === e.jstree.root) return !1;
                switch (p = (i.parent || e.jstree.root).toString(), m = s.toString().match(/^(before|after)$/) && r.id !== e.jstree.root ? this.get_node(r.parent) : r, !(v = d || (this._model.data[i.id] ? this : e.jstree.reference(i.id))) || !v._id || this._id !== v._id, v && v._id && (i = v._model.data[i.id]), r.id === e.jstree.root && ("before" === s && (s = "first"), "after" === s && (s = "last")), s) {
                    case "before":
                        s = e.inArray(r.id, m.children);
                        break;
                    case "after":
                        s = e.inArray(r.id, m.children) + 1;
                        break;
                    case "inside":
                    case "first":
                        s = 0;
                        break;
                    case "last":
                        s = m.children.length;
                        break;
                    default:
                        s || (s = 0)
                }
                if (s > m.children.length && (s = m.children.length), !this.check("copy_node", i, m, s, {
                        core: !0,
                        origin: d,
                        is_multi: v && v._id && v._id !== this._id,
                        is_foreign: !v || !v._id
                    })) return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (!(g = v ? v.get_json(i, {
                        no_id: !0,
                        no_data: !0,
                        no_state: !0
                    }) : i)) return !1;
                if (!0 === g.id && delete g.id, !(g = this._parse_model_from_json(g, m.id, m.parents.concat()))) return !1;
                for (_ = this.get_node(g), i && i.state && !1 === i.state.loaded && (_.state.loaded = !1), (h = []).push(g), h = h.concat(_.children_d), this.trigger("model", {
                        nodes: h,
                        parent: m.id
                    }), u = 0, f = m.parents.length; u < f; u++) this._model.data[m.parents[u]].children_d = this._model.data[m.parents[u]].children_d.concat(h);
                for (h = [], u = 0, f = m.children.length; u < f; u++) h[u >= s ? u + 1 : u] = m.children[u];
                return h[s] = _.id, m.children = h, m.children_d.push(_.id), m.children_d = m.children_d.concat(_.children_d), m.id === e.jstree.root && (this._model.force_full_redraw = !0), this._model.force_full_redraw || this._node_changed(m.id), o || this.redraw(m.id === e.jstree.root), n && n.call(this, _, m, s), this.trigger("copy_node", {
                    node: _,
                    original: i,
                    parent: m.id,
                    position: s,
                    old_parent: p,
                    old_position: v && v._id && p && v._model.data[p] && v._model.data[p].children ? e.inArray(i.id, v._model.data[p].children) : -1,
                    is_multi: v && v._id && v._id !== this._id,
                    is_foreign: !v || !v._id,
                    old_instance: v,
                    new_instance: this
                }), _.id
            },
            cut: function(t) {
                if (t || (t = this._data.core.selected.concat()), e.isArray(t) || (t = [t]), !t.length) return !1;
                var i, a, o, d = [];
                for (a = 0, o = t.length; a < o; a++)(i = this.get_node(t[a])) && i.id && i.id !== e.jstree.root && d.push(i);
                if (!d.length) return !1;
                r = d, n = this, s = "move_node", this.trigger("cut", {
                    node: t
                })
            },
            copy: function(t) {
                if (t || (t = this._data.core.selected.concat()), e.isArray(t) || (t = [t]), !t.length) return !1;
                var i, a, o, d = [];
                for (a = 0, o = t.length; a < o; a++)(i = this.get_node(t[a])) && i.id && i.id !== e.jstree.root && d.push(i);
                if (!d.length) return !1;
                r = d, n = this, s = "copy_node", this.trigger("copy", {
                    node: t
                })
            },
            get_buffer: function() {
                return {
                    mode: s,
                    node: r,
                    inst: n
                }
            },
            can_paste: function() {
                return !1 !== s && !1 !== r
            },
            paste: function(e, t) {
                if (!((e = this.get_node(e)) && s && s.match(/^(copy_node|move_node)$/) && r)) return !1;
                this[s](r, e, t, !1, !1, !1, n) && this.trigger("paste", {
                    parent: e.id,
                    node: r,
                    mode: s
                }), r = !1, s = !1, n = !1
            },
            clear_buffer: function() {
                r = !1, s = !1, n = !1, this.trigger("clear_buffer")
            },
            edit: function(t, i, r) {
                var s, n, a, o, c, l, h, _, u, f = !1;
                return !!(t = this.get_node(t)) && (this.check("edit", t, this.get_parent(t)) ? (u = t, i = "string" == typeof i ? i : t.text, this.set_text(t, ""), t = this._open_to(t), u.text = i, s = this._data.core.rtl, n = this.element.width(), this._data.core.focused = u.id, a = t.children(".jstree-anchor").focus(), o = e("<span></span>"), c = i, l = e("<div></div>", {
                    css: {
                        position: "absolute",
                        top: "-200px",
                        left: s ? "0px" : "-1000px",
                        visibility: "hidden"
                    }
                }).appendTo(d.body), h = e("<input />", {
                    value: c,
                    class: "jstree-rename-input",
                    css: {
                        padding: "0",
                        border: "1px solid silver",
                        "box-sizing": "border-box",
                        display: "inline-block",
                        height: this._data.core.li_height + "px",
                        lineHeight: this._data.core.li_height + "px",
                        width: "150px"
                    },
                    blur: e.proxy((function(i) {
                        i.stopImmediatePropagation(), i.preventDefault();
                        var s, n = o.children(".jstree-rename-input").val(),
                            d = this.settings.core.force_text;
                        "" === n && (n = c), l.remove(), o.replaceWith(a), o.remove(), c = d ? c : e("<div></div>").append(e.parseHTML(c)).html(), t = this.get_node(t), this.set_text(t, c), (s = !!this.rename_node(t, d ? e("<div></div>").text(n).text() : e("<div></div>").append(e.parseHTML(n)).html())) || this.set_text(t, c), this._data.core.focused = u.id, setTimeout(e.proxy((function() {
                            var e = this.get_node(u.id, !0);
                            e.length && (this._data.core.focused = u.id, e.children(".jstree-anchor").focus())
                        }), this), 0), r && r.call(this, u, s, f), h = null
                    }), this),
                    keydown: function(e) {
                        var t = e.which;
                        27 === t && (f = !0, this.value = c), 27 !== t && 13 !== t && 37 !== t && 38 !== t && 39 !== t && 40 !== t && 32 !== t || e.stopImmediatePropagation(), 27 !== t && 13 !== t || (e.preventDefault(), this.blur())
                    },
                    click: function(e) {
                        e.stopImmediatePropagation()
                    },
                    mousedown: function(e) {
                        e.stopImmediatePropagation()
                    },
                    keyup: function(e) {
                        h.width(Math.min(l.text("pW" + this.value).width(), n))
                    },
                    keypress: function(e) {
                        if (13 === e.which) return !1
                    }
                }), _ = {
                    fontFamily: a.css("fontFamily") || "",
                    fontSize: a.css("fontSize") || "",
                    fontWeight: a.css("fontWeight") || "",
                    fontStyle: a.css("fontStyle") || "",
                    fontStretch: a.css("fontStretch") || "",
                    fontVariant: a.css("fontVariant") || "",
                    letterSpacing: a.css("letterSpacing") || "",
                    wordSpacing: a.css("wordSpacing") || ""
                }, o.attr("class", a.attr("class")).append(a.contents().clone()).append(h), a.replaceWith(o), l.css(_), h.css(_).width(Math.min(l.text("pW" + h[0].value).width(), n))[0].select(), void e(d).one("mousedown.jstree touchstart.jstree dnd_start.vakata", (function(t) {
                    h && t.target !== h && e(h).blur()
                }))) : (this.settings.core.error.call(this, this._data.core.last_error), !1))
            },
            set_theme: function(t, i) {
                if (!t) return !1;
                if (!0 === i) {
                    var r = this.settings.core.themes.dir;
                    r || (r = e.jstree.path + "/themes"), i = r + "/" + t + "/style.css"
                }
                i && -1 === e.inArray(i, a) && (e("head").append('<link rel="stylesheet" href="' + i + '" type="text/css" />'), a.push(i)), this._data.core.themes.name && this.element.removeClass("jstree-" + this._data.core.themes.name), this._data.core.themes.name = t, this.element.addClass("jstree-" + t), this.element[this.settings.core.themes.responsive ? "addClass" : "removeClass"]("jstree-" + t + "-responsive"), this.trigger("set_theme", {
                    theme: t
                })
            },
            get_theme: function() {
                return this._data.core.themes.name
            },
            set_theme_variant: function(e) {
                this._data.core.themes.variant && this.element.removeClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant), this._data.core.themes.variant = e, e && this.element.addClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
            },
            get_theme_variant: function() {
                return this._data.core.themes.variant
            },
            show_stripes: function() {
                this._data.core.themes.stripes = !0, this.get_container_ul().addClass("jstree-striped"), this.trigger("show_stripes")
            },
            hide_stripes: function() {
                this._data.core.themes.stripes = !1, this.get_container_ul().removeClass("jstree-striped"), this.trigger("hide_stripes")
            },
            toggle_stripes: function() {
                this._data.core.themes.stripes ? this.hide_stripes() : this.show_stripes()
            },
            show_dots: function() {
                this._data.core.themes.dots = !0, this.get_container_ul().removeClass("jstree-no-dots"), this.trigger("show_dots")
            },
            hide_dots: function() {
                this._data.core.themes.dots = !1, this.get_container_ul().addClass("jstree-no-dots"), this.trigger("hide_dots")
            },
            toggle_dots: function() {
                this._data.core.themes.dots ? this.hide_dots() : this.show_dots()
            },
            show_icons: function() {
                this._data.core.themes.icons = !0, this.get_container_ul().removeClass("jstree-no-icons"), this.trigger("show_icons")
            },
            hide_icons: function() {
                this._data.core.themes.icons = !1, this.get_container_ul().addClass("jstree-no-icons"), this.trigger("hide_icons")
            },
            toggle_icons: function() {
                this._data.core.themes.icons ? this.hide_icons() : this.show_icons()
            },
            show_ellipsis: function() {
                this._data.core.themes.ellipsis = !0, this.get_container_ul().addClass("jstree-ellipsis"), this.trigger("show_ellipsis")
            },
            hide_ellipsis: function() {
                this._data.core.themes.ellipsis = !1, this.get_container_ul().removeClass("jstree-ellipsis"), this.trigger("hide_ellipsis")
            },
            toggle_ellipsis: function() {
                this._data.core.themes.ellipsis ? this.hide_ellipsis() : this.show_ellipsis()
            },
            set_icon: function(i, r) {
                var s, n, a, o;
                if (e.isArray(i)) {
                    for (s = 0, n = (i = i.slice()).length; s < n; s++) this.set_icon(i[s], r);
                    return !0
                }
                return !(!(i = this.get_node(i)) || i.id === e.jstree.root) && (o = i.icon, i.icon = !0 === r || null === r || r === t || "" === r || r, a = this.get_node(i, !0).children(".jstree-anchor").children(".jstree-themeicon"), !1 === r ? (a.removeClass("jstree-themeicon-custom " + o).css("background", "").removeAttr("rel"), this.hide_icon(i)) : !0 === r || null === r || r === t || "" === r ? (a.removeClass("jstree-themeicon-custom " + o).css("background", "").removeAttr("rel"), !1 === o && this.show_icon(i)) : -1 === r.indexOf("/") && -1 === r.indexOf(".") ? (a.removeClass(o).css("background", ""), a.addClass(r + " jstree-themeicon-custom").attr("rel", r), !1 === o && this.show_icon(i)) : (a.removeClass(o).css("background", ""), a.addClass("jstree-themeicon-custom").css("background", "url('" + r + "') center center no-repeat").attr("rel", r), !1 === o && this.show_icon(i)), !0)
            },
            get_icon: function(t) {
                return !(!(t = this.get_node(t)) || t.id === e.jstree.root) && t.icon
            },
            hide_icon: function(t) {
                var i, r;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.hide_icon(t[i]);
                    return !0
                }
                return !(!(t = this.get_node(t)) || t === e.jstree.root) && (t.icon = !1, this.get_node(t, !0).children(".jstree-anchor").children(".jstree-themeicon").addClass("jstree-themeicon-hidden"), !0)
            },
            show_icon: function(t) {
                var i, r, s;
                if (e.isArray(t)) {
                    for (i = 0, r = (t = t.slice()).length; i < r; i++) this.show_icon(t[i]);
                    return !0
                }
                return !(!(t = this.get_node(t)) || t === e.jstree.root) && (s = this.get_node(t, !0), t.icon = !s.length || s.children(".jstree-anchor").children(".jstree-themeicon").attr("rel"), t.icon || (t.icon = !0), s.children(".jstree-anchor").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden"), !0)
            }
        }, e.vakata = {}, e.vakata.attributes = function(t, i) {
            t = e(t)[0];
            var r = i ? {} : [];
            return t && t.attributes && e.each(t.attributes, (function(t, s) {
                -1 === e.inArray(s.name.toLowerCase(), ["style", "contenteditable", "hasfocus", "tabindex"]) && null !== s.value && "" !== e.trim(s.value) && (i ? r[s.name] = s.value : r.push(s.name))
            })), r
        }, e.vakata.array_unique = function(e) {
            var i, r, s = [],
                n = {};
            for (i = 0, r = e.length; i < r; i++) n[e[i]] === t && (s.push(e[i]), n[e[i]] = !0);
            return s
        }, e.vakata.array_remove = function(e, t) {
            return e.splice(t, 1), e
        }, e.vakata.array_remove_item = function(t, i) {
            var r = e.inArray(i, t);
            return -1 !== r ? e.vakata.array_remove(t, r) : t
        }, e.vakata.array_filter = function(e, t, i, r, s) {
            if (e.filter) return e.filter(t, i);
            for (s in r = [], e) ~~s + "" == s + "" && s >= 0 && t.call(i, e[s], +s, e) && r.push(e[s]);
            return r
        }, e.jstree.plugins.changed = function(e, t) {
            var i = [];
            this.trigger = function(e, r) {
                var s, n;
                if (r || (r = {}), "changed" === e.replace(".jstree", "")) {
                    r.changed = {
                        selected: [],
                        deselected: []
                    };
                    var a = {};
                    for (s = 0, n = i.length; s < n; s++) a[i[s]] = 1;
                    for (s = 0, n = r.selected.length; s < n; s++) a[r.selected[s]] ? a[r.selected[s]] = 2 : r.changed.selected.push(r.selected[s]);
                    for (s = 0, n = i.length; s < n; s++) 1 === a[i[s]] && r.changed.deselected.push(i[s]);
                    i = r.selected.slice()
                }
                t.trigger.call(this, e, r)
            }, this.refresh = function(e, r) {
                return i = [], t.refresh.apply(this, arguments)
            }
        };
        var h, _, u = d.createElement("I");
        u.className = "jstree-icon jstree-checkbox", u.setAttribute("role", "presentation"), e.jstree.defaults.checkbox = {
                visible: !0,
                three_state: !0,
                whole_node: !0,
                keep_selected_style: !0,
                cascade: "",
                tie_selection: !0,
                cascade_to_disabled: !0,
                cascade_to_hidden: !0
            }, e.jstree.plugins.checkbox = function(i, r) {
                this.bind = function() {
                    r.bind.call(this), this._data.checkbox.uto = !1, this._data.checkbox.selected = [], this.settings.checkbox.three_state && (this.settings.checkbox.cascade = "up+down+undetermined"), this.element.on("init.jstree", e.proxy((function() {
                        this._data.checkbox.visible = this.settings.checkbox.visible, this.settings.checkbox.keep_selected_style || this.element.addClass("jstree-checkbox-no-clicked"), this.settings.checkbox.tie_selection && this.element.addClass("jstree-checkbox-selection")
                    }), this)).on("loading.jstree", e.proxy((function() {
                        this[this._data.checkbox.visible ? "show_checkboxes" : "hide_checkboxes"]()
                    }), this)), -1 !== this.settings.checkbox.cascade.indexOf("undetermined") && this.element.on("changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree", e.proxy((function() {
                        this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)
                    }), this)), this.settings.checkbox.tie_selection || this.element.on("model.jstree", e.proxy((function(e, t) {
                        var i, r, s = this._model.data,
                            n = (s[t.parent], t.nodes);
                        for (i = 0, r = n.length; i < r; i++) s[n[i]].state.checked = s[n[i]].state.checked || s[n[i]].original && s[n[i]].original.state && s[n[i]].original.state.checked, s[n[i]].state.checked && this._data.checkbox.selected.push(n[i])
                    }), this)), -1 === this.settings.checkbox.cascade.indexOf("up") && -1 === this.settings.checkbox.cascade.indexOf("down") || this.element.on("model.jstree", e.proxy((function(t, i) {
                        var r, s, n, a, o, d, c = this._model.data,
                            l = c[i.parent],
                            h = i.nodes,
                            _ = [],
                            u = this.settings.checkbox.cascade,
                            f = this.settings.checkbox.tie_selection;
                        if (-1 !== u.indexOf("down"))
                            if (l.state[f ? "selected" : "checked"]) {
                                for (s = 0, n = h.length; s < n; s++) c[h[s]].state[f ? "selected" : "checked"] = !0;
                                this._data[f ? "core" : "checkbox"].selected = this._data[f ? "core" : "checkbox"].selected.concat(h)
                            } else
                                for (s = 0, n = h.length; s < n; s++)
                                    if (c[h[s]].state[f ? "selected" : "checked"]) {
                                        for (a = 0, o = c[h[s]].children_d.length; a < o; a++) c[c[h[s]].children_d[a]].state[f ? "selected" : "checked"] = !0;
                                        this._data[f ? "core" : "checkbox"].selected = this._data[f ? "core" : "checkbox"].selected.concat(c[h[s]].children_d)
                                    }
                        if (-1 !== u.indexOf("up")) {
                            for (s = 0, n = l.children_d.length; s < n; s++) c[l.children_d[s]].children.length || _.push(c[l.children_d[s]].parent);
                            for (a = 0, o = (_ = e.vakata.array_unique(_)).length; a < o; a++)
                                for (l = c[_[a]]; l && l.id !== e.jstree.root;) {
                                    for (r = 0, s = 0, n = l.children.length; s < n; s++) r += c[l.children[s]].state[f ? "selected" : "checked"];
                                    if (r !== n) break;
                                    l.state[f ? "selected" : "checked"] = !0, this._data[f ? "core" : "checkbox"].selected.push(l.id), (d = this.get_node(l, !0)) && d.length && d.attr("aria-selected", !0).children(".jstree-anchor").addClass(f ? "jstree-clicked" : "jstree-checked"), l = this.get_node(l.parent)
                                }
                        }
                        this._data[f ? "core" : "checkbox"].selected = e.vakata.array_unique(this._data[f ? "core" : "checkbox"].selected)
                    }), this)).on(this.settings.checkbox.tie_selection ? "select_node.jstree" : "check_node.jstree", e.proxy((function(t, i) {
                        var r, s, n, a, o = i.node,
                            d = this._model.data,
                            c = this.get_node(o.parent),
                            l = this.settings.checkbox.cascade,
                            h = this.settings.checkbox.tie_selection,
                            _ = {},
                            u = this._data[h ? "core" : "checkbox"].selected;
                        for (r = 0, s = u.length; r < s; r++) _[u[r]] = !0;
                        if (-1 !== l.indexOf("down")) {
                            var f = this._cascade_new_checked_state(o.id, !0),
                                g = o.children_d.concat(o.id);
                            for (r = 0, s = g.length; r < s; r++) f.indexOf(g[r]) > -1 ? _[g[r]] = !0 : delete _[g[r]]
                        }
                        if (-1 !== l.indexOf("up"))
                            for (; c && c.id !== e.jstree.root;) {
                                for (n = 0, r = 0, s = c.children.length; r < s; r++) n += d[c.children[r]].state[h ? "selected" : "checked"];
                                if (n !== s) break;
                                c.state[h ? "selected" : "checked"] = !0, _[c.id] = !0, (a = this.get_node(c, !0)) && a.length && a.attr("aria-selected", !0).children(".jstree-anchor").addClass(h ? "jstree-clicked" : "jstree-checked"), c = this.get_node(c.parent)
                            }
                        for (r in u = [], _) _.hasOwnProperty(r) && u.push(r);
                        this._data[h ? "core" : "checkbox"].selected = u
                    }), this)).on(this.settings.checkbox.tie_selection ? "deselect_all.jstree" : "uncheck_all.jstree", e.proxy((function(t, i) {
                        var r, s, n, a = this.get_node(e.jstree.root),
                            o = this._model.data;
                        for (r = 0, s = a.children_d.length; r < s; r++)(n = o[a.children_d[r]]) && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1)
                    }), this)).on(this.settings.checkbox.tie_selection ? "deselect_node.jstree" : "uncheck_node.jstree", e.proxy((function(t, i) {
                        var r, s, n, a = i.node,
                            o = (this.get_node(a, !0), this.settings.checkbox.cascade),
                            d = this.settings.checkbox.tie_selection,
                            c = this._data[d ? "core" : "checkbox"].selected,
                            l = a.children_d.concat(a.id);
                        if (-1 !== o.indexOf("down")) {
                            var h = this._cascade_new_checked_state(a.id, !1);
                            c = e.vakata.array_filter(c, (function(e) {
                                return -1 === l.indexOf(e) || h.indexOf(e) > -1
                            }))
                        }
                        if (-1 !== o.indexOf("up") && -1 === c.indexOf(a.id)) {
                            for (r = 0, s = a.parents.length; r < s; r++)(n = this._model.data[a.parents[r]]).state[d ? "selected" : "checked"] = !1, n && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1), (n = this.get_node(a.parents[r], !0)) && n.length && n.attr("aria-selected", !1).children(".jstree-anchor").removeClass(d ? "jstree-clicked" : "jstree-checked");
                            c = e.vakata.array_filter(c, (function(e) {
                                return -1 === a.parents.indexOf(e)
                            }))
                        }
                        this._data[d ? "core" : "checkbox"].selected = c
                    }), this)), -1 !== this.settings.checkbox.cascade.indexOf("up") && this.element.on("delete_node.jstree", e.proxy((function(t, i) {
                        for (var r, s, n, a, o = this.get_node(i.parent), d = this._model.data, c = this.settings.checkbox.tie_selection; o && o.id !== e.jstree.root && !o.state[c ? "selected" : "checked"];) {
                            for (n = 0, r = 0, s = o.children.length; r < s; r++) n += d[o.children[r]].state[c ? "selected" : "checked"];
                            if (!(s > 0 && n === s)) break;
                            o.state[c ? "selected" : "checked"] = !0, this._data[c ? "core" : "checkbox"].selected.push(o.id), (a = this.get_node(o, !0)) && a.length && a.attr("aria-selected", !0).children(".jstree-anchor").addClass(c ? "jstree-clicked" : "jstree-checked"), o = this.get_node(o.parent)
                        }
                    }), this)).on("move_node.jstree", e.proxy((function(t, i) {
                        var r, s, n, a, o, d = i.is_multi,
                            c = i.old_parent,
                            l = this.get_node(i.parent),
                            h = this._model.data,
                            _ = this.settings.checkbox.tie_selection;
                        if (!d)
                            for (r = this.get_node(c); r && r.id !== e.jstree.root && !r.state[_ ? "selected" : "checked"];) {
                                for (s = 0, n = 0, a = r.children.length; n < a; n++) s += h[r.children[n]].state[_ ? "selected" : "checked"];
                                if (!(a > 0 && s === a)) break;
                                r.state[_ ? "selected" : "checked"] = !0, this._data[_ ? "core" : "checkbox"].selected.push(r.id), (o = this.get_node(r, !0)) && o.length && o.attr("aria-selected", !0).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked"), r = this.get_node(r.parent)
                            }
                        for (r = l; r && r.id !== e.jstree.root;) {
                            for (s = 0, n = 0, a = r.children.length; n < a; n++) s += h[r.children[n]].state[_ ? "selected" : "checked"];
                            if (s === a) r.state[_ ? "selected" : "checked"] || (r.state[_ ? "selected" : "checked"] = !0, this._data[_ ? "core" : "checkbox"].selected.push(r.id), (o = this.get_node(r, !0)) && o.length && o.attr("aria-selected", !0).children(".jstree-anchor").addClass(_ ? "jstree-clicked" : "jstree-checked"));
                            else {
                                if (!r.state[_ ? "selected" : "checked"]) break;
                                r.state[_ ? "selected" : "checked"] = !1, this._data[_ ? "core" : "checkbox"].selected = e.vakata.array_remove_item(this._data[_ ? "core" : "checkbox"].selected, r.id), (o = this.get_node(r, !0)) && o.length && o.attr("aria-selected", !1).children(".jstree-anchor").removeClass(_ ? "jstree-clicked" : "jstree-checked")
                            }
                            r = this.get_node(r.parent)
                        }
                    }), this))
                }, this.get_undetermined = function(i) {
                    if (-1 === this.settings.checkbox.cascade.indexOf("undetermined")) return [];
                    var r, s, n, a, o = {},
                        d = this._model.data,
                        c = this.settings.checkbox.tie_selection,
                        l = this._data[c ? "core" : "checkbox"].selected,
                        h = [],
                        _ = this,
                        u = [];
                    for (r = 0, s = l.length; r < s; r++)
                        if (d[l[r]] && d[l[r]].parents)
                            for (n = 0, a = d[l[r]].parents.length; n < a && o[d[l[r]].parents[n]] === t; n++) d[l[r]].parents[n] !== e.jstree.root && (o[d[l[r]].parents[n]] = !0, h.push(d[l[r]].parents[n]));
                    for (this.element.find(".jstree-closed").not(":has(.jstree-children)").each((function() {
                            var i, c = _.get_node(this);
                            if (c)
                                if (c.state.loaded) {
                                    for (r = 0, s = c.children_d.length; r < s; r++)
                                        if (!(i = d[c.children_d[r]]).state.loaded && i.original && i.original.state && i.original.state.undetermined && !0 === i.original.state.undetermined)
                                            for (o[i.id] === t && i.id !== e.jstree.root && (o[i.id] = !0, h.push(i.id)), n = 0, a = i.parents.length; n < a; n++) o[i.parents[n]] === t && i.parents[n] !== e.jstree.root && (o[i.parents[n]] = !0, h.push(i.parents[n]))
                                } else if (c.original && c.original.state && c.original.state.undetermined && !0 === c.original.state.undetermined)
                                for (o[c.id] === t && c.id !== e.jstree.root && (o[c.id] = !0, h.push(c.id)), n = 0, a = c.parents.length; n < a; n++) o[c.parents[n]] === t && c.parents[n] !== e.jstree.root && (o[c.parents[n]] = !0, h.push(c.parents[n]))
                        })), r = 0, s = h.length; r < s; r++) d[h[r]].state[c ? "selected" : "checked"] || u.push(i ? d[h[r]] : h[r]);
                    return u
                }, this._undetermined = function() {
                    if (null !== this.element) {
                        var e, t, i, r = this.get_undetermined(!1);
                        for (this.element.find(".jstree-undetermined").removeClass("jstree-undetermined"), e = 0, t = r.length; e < t; e++)(i = this.get_node(r[e], !0)) && i.length && i.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-undetermined")
                    }
                }, this.redraw_node = function(t, i, s, n) {
                    if (t = r.redraw_node.apply(this, arguments)) {
                        var a, o, d = null,
                            c = null;
                        for (a = 0, o = t.childNodes.length; a < o; a++)
                            if (t.childNodes[a] && t.childNodes[a].className && -1 !== t.childNodes[a].className.indexOf("jstree-anchor")) {
                                d = t.childNodes[a];
                                break
                            }
                        d && (!this.settings.checkbox.tie_selection && this._model.data[t.id].state.checked && (d.className += " jstree-checked"), c = u.cloneNode(!1), this._model.data[t.id].state.checkbox_disabled && (c.className += " jstree-checkbox-disabled"), d.insertBefore(c, d.childNodes[0]))
                    }
                    return s || -1 === this.settings.checkbox.cascade.indexOf("undetermined") || (this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)), t
                }, this.show_checkboxes = function() {
                    this._data.core.themes.checkboxes = !0, this.get_container_ul().removeClass("jstree-no-checkboxes")
                }, this.hide_checkboxes = function() {
                    this._data.core.themes.checkboxes = !1, this.get_container_ul().addClass("jstree-no-checkboxes")
                }, this.toggle_checkboxes = function() {
                    this._data.core.themes.checkboxes ? this.hide_checkboxes() : this.show_checkboxes()
                }, this.is_undetermined = function(t) {
                    t = this.get_node(t);
                    var i, r, s = this.settings.checkbox.cascade,
                        n = this.settings.checkbox.tie_selection,
                        a = this._data[n ? "core" : "checkbox"].selected,
                        o = this._model.data;
                    if (!t || !0 === t.state[n ? "selected" : "checked"] || -1 === s.indexOf("undetermined") || -1 === s.indexOf("down") && -1 === s.indexOf("up")) return !1;
                    if (!t.state.loaded && !0 === t.original.state.undetermined) return !0;
                    for (i = 0, r = t.children_d.length; i < r; i++)
                        if (-1 !== e.inArray(t.children_d[i], a) || !o[t.children_d[i]].state.loaded && o[t.children_d[i]].original.state.undetermined) return !0;
                    return !1
                }, this.disable_checkbox = function(t) {
                    var i, r, s;
                    if (e.isArray(t)) {
                        for (i = 0, r = (t = t.slice()).length; i < r; i++) this.disable_checkbox(t[i]);
                        return !0
                    }
                    if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                    s = this.get_node(t, !0), t.state.checkbox_disabled || (t.state.checkbox_disabled = !0, s && s.length && s.children(".jstree-anchor").children(".jstree-checkbox").addClass("jstree-checkbox-disabled"), this.trigger("disable_checkbox", {
                        node: t
                    }))
                }, this.enable_checkbox = function(t) {
                    var i, r, s;
                    if (e.isArray(t)) {
                        for (i = 0, r = (t = t.slice()).length; i < r; i++) this.enable_checkbox(t[i]);
                        return !0
                    }
                    if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                    s = this.get_node(t, !0), t.state.checkbox_disabled && (t.state.checkbox_disabled = !1, s && s.length && s.children(".jstree-anchor").children(".jstree-checkbox").removeClass("jstree-checkbox-disabled"), this.trigger("enable_checkbox", {
                        node: t
                    }))
                }, this.activate_node = function(t, i) {
                    return !e(i.target).hasClass("jstree-checkbox-disabled") && (this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || e(i.target).hasClass("jstree-checkbox")) && (i.ctrlKey = !0), this.settings.checkbox.tie_selection || !this.settings.checkbox.whole_node && !e(i.target).hasClass("jstree-checkbox") ? r.activate_node.call(this, t, i) : !this.is_disabled(t) && (this.is_checked(t) ? this.uncheck_node(t, i) : this.check_node(t, i), void this.trigger("activate_node", {
                        node: this.get_node(t)
                    })))
                }, this._cascade_new_checked_state = function(e, t) {
                    var i, r, s, n = this.settings.checkbox.tie_selection,
                        a = this._model.data[e],
                        o = [],
                        d = [];
                    if (!this.settings.checkbox.cascade_to_disabled && a.state.disabled || !this.settings.checkbox.cascade_to_hidden && a.state.hidden) s = this.get_checked_descendants(e), a.state[n ? "selected" : "checked"] && s.push(a.id), o = o.concat(s);
                    else {
                        if (a.children)
                            for (i = 0, r = a.children.length; i < r; i++) {
                                var c = a.children[i];
                                s = this._cascade_new_checked_state(c, t), o = o.concat(s), s.indexOf(c) > -1 && d.push(c)
                            }
                        var l = this.get_node(a, !0),
                            h = d.length > 0 && d.length < a.children.length;
                        a.original && a.original.state && a.original.state.undetermined && (a.original.state.undetermined = h), h ? (a.state[n ? "selected" : "checked"] = !1, l.attr("aria-selected", !1).children(".jstree-anchor").removeClass(n ? "jstree-clicked" : "jstree-checked")) : t && d.length === a.children.length ? (a.state[n ? "selected" : "checked"] = t, o.push(a.id), l.attr("aria-selected", !0).children(".jstree-anchor").addClass(n ? "jstree-clicked" : "jstree-checked")) : (a.state[n ? "selected" : "checked"] = !1, l.attr("aria-selected", !1).children(".jstree-anchor").removeClass(n ? "jstree-clicked" : "jstree-checked"))
                    }
                    return o
                }, this.get_checked_descendants = function(t) {
                    var i = this,
                        r = i.settings.checkbox.tie_selection,
                        s = i._model.data[t];
                    return e.vakata.array_filter(s.children_d, (function(e) {
                        return i._model.data[e].state[r ? "selected" : "checked"]
                    }))
                }, this.check_node = function(t, i) {
                    if (this.settings.checkbox.tie_selection) return this.select_node(t, !1, !0, i);
                    var r, s, n;
                    if (e.isArray(t)) {
                        for (s = 0, n = (t = t.slice()).length; s < n; s++) this.check_node(t[s], i);
                        return !0
                    }
                    if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                    r = this.get_node(t, !0), t.state.checked || (t.state.checked = !0, this._data.checkbox.selected.push(t.id), r && r.length && r.children(".jstree-anchor").addClass("jstree-checked"), this.trigger("check_node", {
                        node: t,
                        selected: this._data.checkbox.selected,
                        event: i
                    }))
                }, this.uncheck_node = function(t, i) {
                    if (this.settings.checkbox.tie_selection) return this.deselect_node(t, !1, i);
                    var r, s, n;
                    if (e.isArray(t)) {
                        for (r = 0, s = (t = t.slice()).length; r < s; r++) this.uncheck_node(t[r], i);
                        return !0
                    }
                    if (!(t = this.get_node(t)) || t.id === e.jstree.root) return !1;
                    n = this.get_node(t, !0), t.state.checked && (t.state.checked = !1, this._data.checkbox.selected = e.vakata.array_remove_item(this._data.checkbox.selected, t.id), n.length && n.children(".jstree-anchor").removeClass("jstree-checked"), this.trigger("uncheck_node", {
                        node: t,
                        selected: this._data.checkbox.selected,
                        event: i
                    }))
                }, this.check_all = function() {
                    if (this.settings.checkbox.tie_selection) return this.select_all();
                    var t, i;
                    this._data.checkbox.selected.concat([]);
                    for (this._data.checkbox.selected = this._model.data[e.jstree.root].children_d.concat(), t = 0, i = this._data.checkbox.selected.length; t < i; t++) this._model.data[this._data.checkbox.selected[t]] && (this._model.data[this._data.checkbox.selected[t]].state.checked = !0);
                    this.redraw(!0), this.trigger("check_all", {
                        selected: this._data.checkbox.selected
                    })
                }, this.uncheck_all = function() {
                    if (this.settings.checkbox.tie_selection) return this.deselect_all();
                    var e, t, i = this._data.checkbox.selected.concat([]);
                    for (e = 0, t = this._data.checkbox.selected.length; e < t; e++) this._model.data[this._data.checkbox.selected[e]] && (this._model.data[this._data.checkbox.selected[e]].state.checked = !1);
                    this._data.checkbox.selected = [], this.element.find(".jstree-checked").removeClass("jstree-checked"), this.trigger("uncheck_all", {
                        selected: this._data.checkbox.selected,
                        node: i
                    })
                }, this.is_checked = function(t) {
                    return this.settings.checkbox.tie_selection ? this.is_selected(t) : !(!(t = this.get_node(t)) || t.id === e.jstree.root) && t.state.checked
                }, this.get_checked = function(t) {
                    return this.settings.checkbox.tie_selection ? this.get_selected(t) : t ? e.map(this._data.checkbox.selected, e.proxy((function(e) {
                        return this.get_node(e)
                    }), this)) : this._data.checkbox.selected.slice()
                }, this.get_top_checked = function(t) {
                    if (this.settings.checkbox.tie_selection) return this.get_top_selected(t);
                    var i, r, s, n, a = this.get_checked(!0),
                        o = {};
                    for (i = 0, r = a.length; i < r; i++) o[a[i].id] = a[i];
                    for (i = 0, r = a.length; i < r; i++)
                        for (s = 0, n = a[i].children_d.length; s < n; s++) o[a[i].children_d[s]] && delete o[a[i].children_d[s]];
                    for (i in a = [], o) o.hasOwnProperty(i) && a.push(i);
                    return t ? e.map(a, e.proxy((function(e) {
                        return this.get_node(e)
                    }), this)) : a
                }, this.get_bottom_checked = function(t) {
                    if (this.settings.checkbox.tie_selection) return this.get_bottom_selected(t);
                    var i, r, s = this.get_checked(!0),
                        n = [];
                    for (i = 0, r = s.length; i < r; i++) s[i].children.length || n.push(s[i].id);
                    return t ? e.map(n, e.proxy((function(e) {
                        return this.get_node(e)
                    }), this)) : n
                }, this.load_node = function(t, i) {
                    var s, n, a;
                    if (!e.isArray(t) && !this.settings.checkbox.tie_selection && (a = this.get_node(t)) && a.state.loaded)
                        for (s = 0, n = a.children_d.length; s < n; s++) this._model.data[a.children_d[s]].state.checked && (!0, this._data.checkbox.selected = e.vakata.array_remove_item(this._data.checkbox.selected, a.children_d[s]));
                    return r.load_node.apply(this, arguments)
                }, this.get_state = function() {
                    var e = r.get_state.apply(this, arguments);
                    return this.settings.checkbox.tie_selection || (e.checkbox = this._data.checkbox.selected.slice()), e
                }, this.set_state = function(t, i) {
                    var s = r.set_state.apply(this, arguments);
                    if (s && t.checkbox) {
                        if (!this.settings.checkbox.tie_selection) {
                            this.uncheck_all();
                            var n = this;
                            e.each(t.checkbox, (function(e, t) {
                                n.check_node(t)
                            }))
                        }
                        return delete t.checkbox, this.set_state(t, i), !1
                    }
                    return s
                }, this.refresh = function(e, t) {
                    return this.settings.checkbox.tie_selection && (this._data.checkbox.selected = []), r.refresh.apply(this, arguments)
                }
            }, e.jstree.defaults.conditionalselect = function() {
                return !0
            }, e.jstree.plugins.conditionalselect = function(e, t) {
                this.activate_node = function(e, i) {
                    if (this.settings.conditionalselect.call(this, this.get_node(e), i)) return t.activate_node.call(this, e, i)
                }
            }, e.jstree.defaults.contextmenu = {
                select_node: !0,
                show_at_node: !0,
                items: function(t, i) {
                    return {
                        create: {
                            separator_before: !1,
                            separator_after: !0,
                            _disabled: !1,
                            label: "Create",
                            action: function(t) {
                                var i = e.jstree.reference(t.reference),
                                    r = i.get_node(t.reference);
                                i.create_node(r, {}, "last", (function(e) {
                                    try {
                                        i.edit(e)
                                    } catch (t) {
                                        setTimeout((function() {
                                            i.edit(e)
                                        }), 0)
                                    }
                                }))
                            }
                        },
                        rename: {
                            separator_before: !1,
                            separator_after: !1,
                            _disabled: !1,
                            label: "Rename",
                            action: function(t) {
                                var i = e.jstree.reference(t.reference),
                                    r = i.get_node(t.reference);
                                i.edit(r)
                            }
                        },
                        remove: {
                            separator_before: !1,
                            icon: !1,
                            separator_after: !1,
                            _disabled: !1,
                            label: "Delete",
                            action: function(t) {
                                var i = e.jstree.reference(t.reference),
                                    r = i.get_node(t.reference);
                                i.is_selected(r) ? i.delete_node(i.get_selected()) : i.delete_node(r)
                            }
                        },
                        ccp: {
                            separator_before: !0,
                            icon: !1,
                            separator_after: !1,
                            label: "Edit",
                            action: !1,
                            submenu: {
                                cut: {
                                    separator_before: !1,
                                    separator_after: !1,
                                    label: "Cut",
                                    action: function(t) {
                                        var i = e.jstree.reference(t.reference),
                                            r = i.get_node(t.reference);
                                        i.is_selected(r) ? i.cut(i.get_top_selected()) : i.cut(r)
                                    }
                                },
                                copy: {
                                    separator_before: !1,
                                    icon: !1,
                                    separator_after: !1,
                                    label: "Copy",
                                    action: function(t) {
                                        var i = e.jstree.reference(t.reference),
                                            r = i.get_node(t.reference);
                                        i.is_selected(r) ? i.copy(i.get_top_selected()) : i.copy(r)
                                    }
                                },
                                paste: {
                                    separator_before: !1,
                                    icon: !1,
                                    _disabled: function(t) {
                                        return !e.jstree.reference(t.reference).can_paste()
                                    },
                                    separator_after: !1,
                                    label: "Paste",
                                    action: function(t) {
                                        var i = e.jstree.reference(t.reference),
                                            r = i.get_node(t.reference);
                                        i.paste(r)
                                    }
                                }
                            }
                        }
                    }
                }
            }, e.jstree.plugins.contextmenu = function(i, r) {
                this.bind = function() {
                    r.bind.call(this);
                    var t, i, s = 0,
                        n = null;
                    this.element.on("init.jstree loading.jstree ready.jstree", e.proxy((function() {
                        this.get_container_ul().addClass("jstree-contextmenu")
                    }), this)).on("contextmenu.jstree", ".jstree-anchor", e.proxy((function(e, t) {
                        "input" !== e.target.tagName.toLowerCase() && (e.preventDefault(), s = e.ctrlKey ? +new Date : 0, (t || n) && (s = +new Date + 1e4), n && clearTimeout(n), this.is_loading(e.currentTarget) || this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e))
                    }), this)).on("click.jstree", ".jstree-anchor", e.proxy((function(t) {
                        this._data.contextmenu.visible && (!s || +new Date - s > 250) && e.vakata.context.hide(), s = 0
                    }), this)).on("touchstart.jstree", ".jstree-anchor", (function(r) {
                        r.originalEvent && r.originalEvent.changedTouches && r.originalEvent.changedTouches[0] && (t = r.originalEvent.changedTouches[0].clientX, i = r.originalEvent.changedTouches[0].clientY, n = setTimeout((function() {
                            e(r.currentTarget).trigger("contextmenu", !0)
                        }), 750))
                    })).on("touchmove.vakata.jstree", (function(r) {
                        n && r.originalEvent && r.originalEvent.changedTouches && r.originalEvent.changedTouches[0] && (Math.abs(t - r.originalEvent.changedTouches[0].clientX) > 10 || Math.abs(i - r.originalEvent.changedTouches[0].clientY) > 10) && (clearTimeout(n), e.vakata.context.hide())
                    })).on("touchend.vakata.jstree", (function(e) {
                        n && clearTimeout(n)
                    })), e(d).on("context_hide.vakata.jstree", e.proxy((function(t, i) {
                        this._data.contextmenu.visible = !1, e(i.reference).removeClass("jstree-context")
                    }), this))
                }, this.teardown = function() {
                    this._data.contextmenu.visible && e.vakata.context.hide(), r.teardown.call(this)
                }, this.show_contextmenu = function(i, r, s, n) {
                    if (!(i = this.get_node(i)) || i.id === e.jstree.root) return !1;
                    var a = this.settings.contextmenu,
                        o = this.get_node(i, !0).children(".jstree-anchor"),
                        d = !1,
                        c = !1;
                    (a.show_at_node || r === t || s === t) && (d = o.offset(), r = d.left, s = d.top + this._data.core.li_height), this.settings.contextmenu.select_node && !this.is_selected(i) && this.activate_node(i, n), c = a.items, e.isFunction(c) && (c = c.call(this, i, e.proxy((function(e) {
                        this._show_contextmenu(i, r, s, e)
                    }), this))), e.isPlainObject(c) && this._show_contextmenu(i, r, s, c)
                }, this._show_contextmenu = function(t, i, r, s) {
                    var n = this.get_node(t, !0).children(".jstree-anchor");
                    e(d).one("context_show.vakata.jstree", e.proxy((function(t, i) {
                        var r = "jstree-contextmenu jstree-" + this.get_theme() + "-contextmenu";
                        e(i.element).addClass(r), n.addClass("jstree-context")
                    }), this)), this._data.contextmenu.visible = !0, e.vakata.context.show(n, {
                        x: i,
                        y: r
                    }, s), this.trigger("show_contextmenu", {
                        node: t,
                        x: i,
                        y: r
                    })
                }
            },
            function(e) {
                var t = !1,
                    i = {
                        element: !1,
                        reference: !1,
                        position_x: 0,
                        position_y: 0,
                        items: [],
                        html: "",
                        is_visible: !1
                    };
                e.vakata.context = {
                    settings: {
                        hide_onmouseleave: 0,
                        icons: !0
                    },
                    _trigger: function(t) {
                        e(d).triggerHandler("context_" + t + ".vakata", {
                            reference: i.reference,
                            element: i.element,
                            position: {
                                x: i.position_x,
                                y: i.position_y
                            }
                        })
                    },
                    _execute: function(t) {
                        return !(!(t = i.items[t]) || t._disabled && (!e.isFunction(t._disabled) || t._disabled({
                            item: t,
                            reference: i.reference,
                            element: i.element
                        })) || !t.action) && t.action.call(null, {
                            item: t,
                            reference: i.reference,
                            element: i.element,
                            position: {
                                x: i.position_x,
                                y: i.position_y
                            }
                        })
                    },
                    _parse: function(t, r) {
                        if (!t) return !1;
                        r || (i.html = "", i.items = []);
                        var s, n = "",
                            a = !1;
                        return r && (n += "<ul>"), e.each(t, (function(t, r) {
                            if (!r) return !0;
                            i.items.push(r), !a && r.separator_before && (n += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;</a></li>"), a = !1, n += "<li class='" + (r._class || "") + (!0 === r._disabled || e.isFunction(r._disabled) && r._disabled({
                                item: r,
                                reference: i.reference,
                                element: i.element
                            }) ? " vakata-contextmenu-disabled " : "") + "' " + (r.shortcut ? " data-shortcut='" + r.shortcut + "' " : "") + ">", n += "<a href='#' rel='" + (i.items.length - 1) + "' " + (r.title ? "title='" + r.title + "'" : "") + ">", e.vakata.context.settings.icons && (n += "<i ", r.icon && (-1 !== r.icon.indexOf("/") || -1 !== r.icon.indexOf(".") ? n += " style='background:url(\"" + r.icon + "\") center center no-repeat' " : n += " class='" + r.icon + "' "), n += "></i><span class='vakata-contextmenu-sep'>&#160;</span>"), n += (e.isFunction(r.label) ? r.label({
                                item: t,
                                reference: i.reference,
                                element: i.element
                            }) : r.label) + (r.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + r.shortcut + '">' + (r.shortcut_label || "") + "</span>" : "") + "</a>", r.submenu && (s = e.vakata.context._parse(r.submenu, !0)) && (n += s), n += "</li>", r.separator_after && (n += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;</a></li>", a = !0)
                        })), n = n.replace(/<li class\='vakata-context-separator'\><\/li\>$/, ""), r && (n += "</ul>"), r || (i.html = n, e.vakata.context._trigger("parse")), n.length > 10 && n
                    },
                    _show_submenu: function(i) {
                        if ((i = e(i)).length && i.children("ul").length) {
                            var r = i.children("ul"),
                                s = i.offset().left,
                                n = s + i.outerWidth(),
                                a = i.offset().top,
                                o = r.width(),
                                d = r.height(),
                                c = e(window).width() + e(window).scrollLeft(),
                                l = e(window).height() + e(window).scrollTop();
                            t ? i[n - (o + 10 + i.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left") : i[n + o > c && s > c - n ? "addClass" : "removeClass"]("vakata-context-right"), a + d + 10 > l && r.css("bottom", "-1px"), i.hasClass("vakata-context-right") ? s < o && r.css("margin-right", s - o) : c - n < o && r.css("margin-left", c - n - o), r.show()
                        }
                    },
                    show: function(r, s, n) {
                        var a, o, c, l, h, _, u, f;
                        switch (i.element && i.element.length && i.element.width(""), !0) {
                            case !s && !r:
                                return !1;
                            case !!s && !!r:
                                i.reference = r, i.position_x = s.x, i.position_y = s.y;
                                break;
                            case !s && !!r:
                                i.reference = r, a = r.offset(), i.position_x = a.left + r.outerHeight(), i.position_y = a.top;
                                break;
                            case !!s && !r:
                                i.position_x = s.x, i.position_y = s.y
                        }
                        r && !n && e(r).data("vakata_contextmenu") && (n = e(r).data("vakata_contextmenu")), e.vakata.context._parse(n) && i.element.html(i.html), i.items.length && (i.element.appendTo(d.body), o = i.element, c = i.position_x, l = i.position_y, h = o.width(), _ = o.height(), u = e(window).width() + e(window).scrollLeft(), f = e(window).height() + e(window).scrollTop(), t && (c -= o.outerWidth() - e(r).outerWidth()) < e(window).scrollLeft() + 20 && (c = e(window).scrollLeft() + 20), c + h + 20 > u && (c = u - (h + 20)), l + _ + 20 > f && (l = f - (_ + 20)), i.element.css({
                            left: c,
                            top: l
                        }).show().find("a").first().focus().parent().addClass("vakata-context-hover"), i.is_visible = !0, e.vakata.context._trigger("show"))
                    },
                    hide: function() {
                        i.is_visible && (i.element.hide().find("ul").hide().end().find(":focus").blur().end().detach(), i.is_visible = !1, e.vakata.context._trigger("hide"))
                    }
                }, e((function() {
                    t = "rtl" === e(d.body).css("direction");
                    var r = !1;
                    i.element = e("<ul class='vakata-context'></ul>"), i.element.on("mouseenter", "li", (function(t) {
                        t.stopImmediatePropagation(), e.contains(this, t.relatedTarget) || (r && clearTimeout(r), i.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(), e(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover"), e.vakata.context._show_submenu(this))
                    })).on("mouseleave", "li", (function(t) {
                        e.contains(this, t.relatedTarget) || e(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")
                    })).on("mouseleave", (function(t) {
                        e(this).find(".vakata-context-hover").removeClass("vakata-context-hover"), e.vakata.context.settings.hide_onmouseleave && (r = setTimeout((function() {
                            e.vakata.context.hide()
                        }), e.vakata.context.settings.hide_onmouseleave))
                    })).on("click", "a", (function(t) {
                        t.preventDefault(), e(this).blur().parent().hasClass("vakata-context-disabled") || !1 === e.vakata.context._execute(e(this).attr("rel")) || e.vakata.context.hide()
                    })).on("keydown", "a", (function(t) {
                        var r = null;
                        switch (t.which) {
                            case 13:
                            case 32:
                                t.type = "click", t.preventDefault(), e(t.currentTarget).trigger(t);
                                break;
                            case 37:
                                i.is_visible && (i.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                                break;
                            case 38:
                                i.is_visible && ((r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first()).length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                                break;
                            case 39:
                                i.is_visible && (i.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                                break;
                            case 40:
                                i.is_visible && ((r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first()).length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                                break;
                            case 27:
                                e.vakata.context.hide(), t.preventDefault()
                        }
                    })).on("keydown", (function(e) {
                        e.preventDefault();
                        var t = i.element.find(".vakata-contextmenu-shortcut-" + e.which).parent();
                        t.parent().not(".vakata-context-disabled") && t.click()
                    })), e(d).on("mousedown.vakata.jstree", (function(t) {
                        i.is_visible && i.element[0] !== t.target && !e.contains(i.element[0], t.target) && e.vakata.context.hide()
                    })).on("context_show.vakata.jstree", (function(e, r) {
                        i.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"), t && i.element.addClass("vakata-context-rtl").css("direction", "rtl"), i.element.find("ul").hide().end()
                    }))
                }))
            }(e), e.jstree.defaults.dnd = {
                copy: !0,
                open_timeout: 500,
                is_draggable: !0,
                check_while_dragging: !0,
                always_copy: !1,
                inside_pos: 0,
                drag_selection: !0,
                touch: !0,
                large_drop_target: !1,
                large_drag_target: !1,
                use_html5: !1
            }, e.jstree.plugins.dnd = function(t, i) {
                this.init = function(e, t) {
                    i.init.call(this, e, t), this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && "draggable" in d.createElement("span")
                }, this.bind = function() {
                    i.bind.call(this), this.element.on(this.settings.dnd.use_html5 ? "dragstart.jstree" : "mousedown.jstree touchstart.jstree", this.settings.dnd.large_drag_target ? ".jstree-node" : ".jstree-anchor", e.proxy((function(t) {
                        if (this.settings.dnd.large_drag_target && e(t.target).closest(".jstree-node")[0] !== t.currentTarget) return !0;
                        if ("touchstart" === t.type && (!this.settings.dnd.touch || "selected" === this.settings.dnd.touch && !e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").hasClass("jstree-clicked"))) return !0;
                        var i = this.get_node(t.target),
                            r = this.is_selected(i) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1,
                            s = r > 1 ? r + " " + this.get_string("nodes") : this.get_text(t.currentTarget);
                        if (this.settings.core.force_text && (s = e.vakata.html.escape(s)), i && i.id && i.id !== e.jstree.root && (1 === t.which || "touchstart" === t.type || "dragstart" === t.type) && (!0 === this.settings.dnd.is_draggable || e.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, r > 1 ? this.get_top_selected(!0) : [i], t))) {
                            if (h = {
                                    jstree: !0,
                                    origin: this,
                                    obj: this.get_node(i, !0),
                                    nodes: r > 1 ? this.get_top_selected() : [i.id]
                                }, _ = t.currentTarget, !this.settings.dnd.use_html5) return this.element.trigger("mousedown.jstree"), e.vakata.dnd.start(t, h, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + " jstree-" + this.get_theme() + "-" + this.get_theme_variant() + " " + (this.settings.core.themes.responsive ? " jstree-dnd-responsive" : "") + '"><i class="jstree-icon jstree-er"></i>' + s + '<ins class="jstree-copy" style="display:none;">+</ins></div>');
                            e.vakata.dnd._trigger("start", t, {
                                helper: e(),
                                element: _,
                                data: h
                            })
                        }
                    }), this)), this.settings.dnd.use_html5 && this.element.on("dragover.jstree", (function(t) {
                        return t.preventDefault(), e.vakata.dnd._trigger("move", t, {
                            helper: e(),
                            element: _,
                            data: h
                        }), !1
                    })).on("drop.jstree", e.proxy((function(t) {
                        return t.preventDefault(), e.vakata.dnd._trigger("stop", t, {
                            helper: e(),
                            element: _,
                            data: h
                        }), !1
                    }), this))
                }, this.redraw_node = function(e, t, r, s) {
                    if ((e = i.redraw_node.apply(this, arguments)) && this.settings.dnd.use_html5)
                        if (this.settings.dnd.large_drag_target) e.setAttribute("draggable", !0);
                        else {
                            var n, a, o = null;
                            for (n = 0, a = e.childNodes.length; n < a; n++)
                                if (e.childNodes[n] && e.childNodes[n].className && -1 !== e.childNodes[n].className.indexOf("jstree-anchor")) {
                                    o = e.childNodes[n];
                                    break
                                }
                            o && o.setAttribute("draggable", !0)
                        }
                    return e
                }
            }, e((function() {
                var i = !1,
                    r = !1,
                    s = !1,
                    n = !1,
                    a = e('<div id="jstree-marker">&#160;</div>').hide();
                e(d).on("dragover.vakata.jstree", (function(t) {
                    _ && e.vakata.dnd._trigger("move", t, {
                        helper: e(),
                        element: _,
                        data: h
                    })
                })).on("drop.vakata.jstree", (function(t) {
                    _ && (e.vakata.dnd._trigger("stop", t, {
                        helper: e(),
                        element: _,
                        data: h
                    }), _ = null, h = null)
                })).on("dnd_start.vakata.jstree", (function(e, t) {
                    i = !1, s = !1, t && t.data && t.data.jstree && a.appendTo(d.body)
                })).on("dnd_move.vakata.jstree", (function(o, d) {
                    var c = d.event.target !== s.target;
                    if (n && (d.event && "dragover" === d.event.type && !c || clearTimeout(n)), d && d.data && d.data.jstree && (!d.event.target.id || "jstree-marker" !== d.event.target.id)) {
                        s = d.event;
                        var l, h, _, u, f, g, p, m, v, j, y, k, b, x, w, C, N, A = e.jstree.reference(d.event.target),
                            T = !1,
                            O = !1,
                            S = !1;
                        if (A && A._data && A._data.dnd)
                            if (a.attr("class", "jstree-" + A.get_theme() + (A.settings.core.themes.responsive ? " jstree-dnd-responsive" : "")), w = d.data.origin && (d.data.origin.settings.dnd.always_copy || d.data.origin.settings.dnd.copy && (d.event.metaKey || d.event.ctrlKey)), d.helper.children().attr("class", "jstree-" + A.get_theme() + " jstree-" + A.get_theme() + "-" + A.get_theme_variant() + " " + (A.settings.core.themes.responsive ? " jstree-dnd-responsive" : "")).find(".jstree-copy").first()[w ? "show" : "hide"](), d.event.target !== A.element[0] && d.event.target !== A.get_container_ul()[0] || 0 !== A.get_container_ul().children().length) {
                                if ((T = A.settings.dnd.large_drop_target ? e(d.event.target).closest(".jstree-node").children(".jstree-anchor") : e(d.event.target).closest(".jstree-anchor")) && T.length && T.parent().is(".jstree-closed, .jstree-open, .jstree-leaf") && (O = T.offset(), S = (d.event.pageY !== t ? d.event.pageY : d.event.originalEvent.pageY) - O.top, _ = T.outerHeight(), g = S < _ / 3 ? ["b", "i", "a"] : S > _ - _ / 3 ? ["a", "i", "b"] : S > _ / 2 ? ["i", "a", "b"] : ["i", "b", "a"], e.each(g, (function(t, s) {
                                        switch (s) {
                                            case "b":
                                                l = O.left - 6, h = O.top, u = A.get_parent(T), f = T.parent().index(), N = "jstree-below";
                                                break;
                                            case "i":
                                                b = A.settings.dnd.inside_pos, x = A.get_node(T.parent()), l = O.left - 2, h = O.top + _ / 2 + 1, u = x.id, f = "first" === b ? 0 : "last" === b ? x.children.length : Math.min(b, x.children.length), N = "jstree-inside";
                                                break;
                                            case "a":
                                                l = O.left - 6, h = O.top + _, u = A.get_parent(T), f = T.parent().index() + 1, N = "jstree-above"
                                        }
                                        for (p = !0, m = 0, v = d.data.nodes.length; m < v; m++)
                                            if (j = d.data.origin && (d.data.origin.settings.dnd.always_copy || d.data.origin.settings.dnd.copy && (d.event.metaKey || d.event.ctrlKey)) ? "copy_node" : "move_node", y = f, "move_node" === j && "a" === s && d.data.origin && d.data.origin === A && u === A.get_parent(d.data.nodes[m]) && (k = A.get_node(u), y > e.inArray(d.data.nodes[m], k.children) && (y -= 1)), !(p = p && (A && A.settings && A.settings.dnd && !1 === A.settings.dnd.check_while_dragging || A.check(j, d.data.origin && d.data.origin !== A ? d.data.origin.get_node(d.data.nodes[m]) : d.data.nodes[m], u, y, {
                                                    dnd: !0,
                                                    ref: A.get_node(T.parent()),
                                                    pos: s,
                                                    origin: d.data.origin,
                                                    is_multi: d.data.origin && d.data.origin !== A,
                                                    is_foreign: !d.data.origin
                                                })))) {
                                                A && A.last_error && (r = A.last_error());
                                                break
                                            }
                                        var o, S;
                                        if ("i" === s && T.parent().is(".jstree-closed") && A.settings.dnd.open_timeout && (d.event && "dragover" === d.event.type && !c || (n && clearTimeout(n), n = setTimeout((o = A, S = T, function() {
                                                o.open_node(S)
                                            }), A.settings.dnd.open_timeout))), p) return (C = A.get_node(u, !0)).hasClass(".jstree-dnd-parent") || (e(".jstree-dnd-parent").removeClass("jstree-dnd-parent"), C.addClass("jstree-dnd-parent")), i = {
                                            ins: A,
                                            par: u,
                                            pos: "i" !== s || "last" !== b || 0 !== f || A.is_loaded(x) ? f : "last"
                                        }, a.css({
                                            left: l + "px",
                                            top: h + "px"
                                        }).show(), a.removeClass("jstree-above jstree-inside jstree-below").addClass(N), d.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok"), d.event.originalEvent && d.event.originalEvent.dataTransfer && (d.event.originalEvent.dataTransfer.dropEffect = w ? "copy" : "move"), r = {}, g = !0, !1
                                    })), !0 === g)) return
                            } else {
                                for (p = !0, m = 0, v = d.data.nodes.length; m < v && (p = p && A.check(d.data.origin && (d.data.origin.settings.dnd.always_copy || d.data.origin.settings.dnd.copy && (d.event.metaKey || d.event.ctrlKey)) ? "copy_node" : "move_node", d.data.origin && d.data.origin !== A ? d.data.origin.get_node(d.data.nodes[m]) : d.data.nodes[m], e.jstree.root, "last", {
                                        dnd: !0,
                                        ref: A.get_node(e.jstree.root),
                                        pos: "i",
                                        origin: d.data.origin,
                                        is_multi: d.data.origin && d.data.origin !== A,
                                        is_foreign: !d.data.origin
                                    })); m++);
                                if (p) return i = {
                                    ins: A,
                                    par: e.jstree.root,
                                    pos: "last"
                                }, a.hide(), d.helper.find(".jstree-icon").first().removeClass("jstree-er").addClass("jstree-ok"), void(d.event.originalEvent && d.event.originalEvent.dataTransfer && (d.event.originalEvent.dataTransfer.dropEffect = w ? "copy" : "move"))
                            }
                        e(".jstree-dnd-parent").removeClass("jstree-dnd-parent"), i = !1, d.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er"), d.event.originalEvent && d.event.originalEvent.dataTransfer, a.hide()
                    }
                })).on("dnd_scroll.vakata.jstree", (function(e, t) {
                    t && t.data && t.data.jstree && (a.hide(), i = !1, s = !1, t.helper.find(".jstree-icon").first().removeClass("jstree-ok").addClass("jstree-er"))
                })).on("dnd_stop.vakata.jstree", (function(t, o) {
                    if (e(".jstree-dnd-parent").removeClass("jstree-dnd-parent"), n && clearTimeout(n), o && o.data && o.data.jstree) {
                        a.hide().detach();
                        var d, c, l = [];
                        if (i) {
                            for (d = 0, c = o.data.nodes.length; d < c; d++) l[d] = o.data.origin ? o.data.origin.get_node(o.data.nodes[d]) : o.data.nodes[d];
                            i.ins[o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node"](l, i.par, i.pos, !1, !1, !1, o.data.origin)
                        } else(d = e(o.event.target).closest(".jstree")).length && r && r.error && "check" === r.error && (d = d.jstree(!0)) && d.settings.core.error.call(this, r);
                        s = !1, i = !1
                    }
                })).on("keyup.jstree keydown.jstree", (function(t, o) {
                    (o = e.vakata.dnd._get()) && o.data && o.data.jstree && ("keyup" === t.type && 27 === t.which ? (n && clearTimeout(n), i = !1, r = !1, s = !1, n = !1, a.hide().detach(), e.vakata.dnd._clean()) : (o.helper.find(".jstree-copy").first()[o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (t.metaKey || t.ctrlKey)) ? "show" : "hide"](), s && (s.metaKey = t.metaKey, s.ctrlKey = t.ctrlKey, e.vakata.dnd._trigger("move", s))))
                }))
            })),
            function(e) {
                e.vakata.html = {
                    div: e("<div></div>"),
                    escape: function(t) {
                        return e.vakata.html.div.text(t).html()
                    },
                    strip: function(t) {
                        return e.vakata.html.div.empty().append(e.parseHTML(t)).text()
                    }
                };
                var i = {
                    element: !1,
                    target: !1,
                    is_down: !1,
                    is_drag: !1,
                    helper: !1,
                    helper_w: 0,
                    data: !1,
                    init_x: 0,
                    init_y: 0,
                    scroll_l: 0,
                    scroll_t: 0,
                    scroll_e: !1,
                    scroll_i: !1,
                    is_touch: !1
                };
                e.vakata.dnd = {
                    settings: {
                        scroll_speed: 10,
                        scroll_proximity: 20,
                        helper_left: 5,
                        helper_top: 10,
                        threshold: 5,
                        threshold_touch: 10
                    },
                    _trigger: function(i, r, s) {
                        s === t && (s = e.vakata.dnd._get()), s.event = r, e(d).triggerHandler("dnd_" + i + ".vakata", s)
                    },
                    _get: function() {
                        return {
                            data: i.data,
                            element: i.element,
                            helper: i.helper
                        }
                    },
                    _clean: function() {
                        i.helper && i.helper.remove(), i.scroll_i && (clearInterval(i.scroll_i), i.scroll_i = !1), i = {
                            element: !1,
                            target: !1,
                            is_down: !1,
                            is_drag: !1,
                            helper: !1,
                            helper_w: 0,
                            data: !1,
                            init_x: 0,
                            init_y: 0,
                            scroll_l: 0,
                            scroll_t: 0,
                            scroll_e: !1,
                            scroll_i: !1,
                            is_touch: !1
                        }, _ = null, e(d).off("mousemove.vakata.jstree touchmove.vakata.jstree", e.vakata.dnd.drag), e(d).off("mouseup.vakata.jstree touchend.vakata.jstree", e.vakata.dnd.stop)
                    },
                    _scroll: function(t) {
                        if (!i.scroll_e || !i.scroll_l && !i.scroll_t) return i.scroll_i && (clearInterval(i.scroll_i), i.scroll_i = !1), !1;
                        if (!i.scroll_i) return i.scroll_i = setInterval(e.vakata.dnd._scroll, 100), !1;
                        if (!0 === t) return !1;
                        var r = i.scroll_e.scrollTop(),
                            s = i.scroll_e.scrollLeft();
                        i.scroll_e.scrollTop(r + i.scroll_t * e.vakata.dnd.settings.scroll_speed), i.scroll_e.scrollLeft(s + i.scroll_l * e.vakata.dnd.settings.scroll_speed), r === i.scroll_e.scrollTop() && s === i.scroll_e.scrollLeft() || e.vakata.dnd._trigger("scroll", i.scroll_e)
                    },
                    start: function(t, r, s) {
                        "touchstart" === t.type && t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] && (t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t.target = d.elementFromPoint(t.originalEvent.changedTouches[0].pageX - window.pageXOffset, t.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_drag && e.vakata.dnd.stop({});
                        try {
                            t.currentTarget.unselectable = "on", t.currentTarget.onselectstart = function() {
                                return !1
                            }, t.currentTarget.style && (t.currentTarget.style.touchAction = "none", t.currentTarget.style.msTouchAction = "none", t.currentTarget.style.MozUserSelect = "none")
                        } catch (e) {}
                        return i.init_x = t.pageX, i.init_y = t.pageY, i.data = r, i.is_down = !0, i.element = t.currentTarget, i.target = t.target, i.is_touch = "touchstart" === t.type, !1 !== s && (i.helper = e("<div id='vakata-dnd'></div>").html(s).css({
                            display: "block",
                            margin: "0",
                            padding: "0",
                            position: "absolute",
                            top: "-2000px",
                            lineHeight: "16px",
                            zIndex: "10000"
                        })), e(d).on("mousemove.vakata.jstree touchmove.vakata.jstree", e.vakata.dnd.drag), e(d).on("mouseup.vakata.jstree touchend.vakata.jstree", e.vakata.dnd.stop), !1
                    },
                    drag: function(t) {
                        if ("touchmove" === t.type && t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] && (t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t.target = d.elementFromPoint(t.originalEvent.changedTouches[0].pageX - window.pageXOffset, t.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_down) {
                            if (!i.is_drag) {
                                if (!(Math.abs(t.pageX - i.init_x) > (i.is_touch ? e.vakata.dnd.settings.threshold_touch : e.vakata.dnd.settings.threshold) || Math.abs(t.pageY - i.init_y) > (i.is_touch ? e.vakata.dnd.settings.threshold_touch : e.vakata.dnd.settings.threshold))) return;
                                i.helper && (i.helper.appendTo(d.body), i.helper_w = i.helper.outerWidth()), i.is_drag = !0, e(i.target).one("click.vakata", !1), e.vakata.dnd._trigger("start", t)
                            }
                            var r = !1,
                                s = !1,
                                n = !1,
                                a = !1,
                                o = !1,
                                c = !1,
                                l = !1,
                                h = !1,
                                _ = !1,
                                u = !1;
                            return i.scroll_t = 0, i.scroll_l = 0, i.scroll_e = !1, e(e(t.target).parentsUntil("body").addBack().get().reverse()).filter((function() {
                                return /^auto|scroll$/.test(e(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
                            })).each((function() {
                                var r = e(this),
                                    s = r.offset();
                                if (this.scrollHeight > this.offsetHeight && (s.top + r.height() - t.pageY < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = 1), t.pageY - s.top < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = -1)), this.scrollWidth > this.offsetWidth && (s.left + r.width() - t.pageX < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = 1), t.pageX - s.left < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = -1)), i.scroll_t || i.scroll_l) return i.scroll_e = e(this), !1
                            })), i.scroll_e || (r = e(d), s = e(window), n = r.height(), a = s.height(), o = r.width(), c = s.width(), l = r.scrollTop(), h = r.scrollLeft(), n > a && t.pageY - l < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = -1), n > a && a - (t.pageY - l) < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = 1), o > c && t.pageX - h < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = -1), o > c && c - (t.pageX - h) < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = 1), (i.scroll_t || i.scroll_l) && (i.scroll_e = r)), i.scroll_e && e.vakata.dnd._scroll(!0), i.helper && (_ = parseInt(t.pageY + e.vakata.dnd.settings.helper_top, 10), u = parseInt(t.pageX + e.vakata.dnd.settings.helper_left, 10), n && _ + 25 > n && (_ = n - 50), o && u + i.helper_w > o && (u = o - (i.helper_w + 2)), i.helper.css({
                                left: u + "px",
                                top: _ + "px"
                            })), e.vakata.dnd._trigger("move", t), !1
                        }
                    },
                    stop: function(t) {
                        if ("touchend" === t.type && t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] && (t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t.target = d.elementFromPoint(t.originalEvent.changedTouches[0].pageX - window.pageXOffset, t.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_drag) t.target !== i.target && e(i.target).off("click.vakata"), e.vakata.dnd._trigger("stop", t);
                        else if ("touchend" === t.type && t.target === i.target) {
                            var r = setTimeout((function() {
                                e(t.target).click()
                            }), 100);
                            e(t.target).one("click", (function() {
                                r && clearTimeout(r)
                            }))
                        }
                        return e.vakata.dnd._clean(), !1
                    }
                }
            }(e), e.jstree.defaults.massload = null, e.jstree.plugins.massload = function(t, i) {
                this.init = function(e, t) {
                    this._data.massload = {}, i.init.call(this, e, t)
                }, this._load_nodes = function(t, r, s, n) {
                    var a, o, d, c = this.settings.massload,
                        l = [],
                        h = this._model.data;
                    if (!s) {
                        for (a = 0, o = t.length; a < o; a++) h[t[a]] && (h[t[a]].state.loaded || h[t[a]].state.failed) && !n || (l.push(t[a]), (d = this.get_node(t[a], !0)) && d.length && d.addClass("jstree-loading").attr("aria-busy", !0));
                        if (this._data.massload = {}, l.length) {
                            if (e.isFunction(c)) return c.call(this, l, e.proxy((function(e) {
                                var a, o;
                                if (e)
                                    for (a in e) e.hasOwnProperty(a) && (this._data.massload[a] = e[a]);
                                for (a = 0, o = t.length; a < o; a++)(d = this.get_node(t[a], !0)) && d.length && d.removeClass("jstree-loading").attr("aria-busy", !1);
                                i._load_nodes.call(this, t, r, s, n)
                            }), this));
                            if ("object" == typeof c && c && c.url) return c = e.extend(!0, {}, c), e.isFunction(c.url) && (c.url = c.url.call(this, l)), e.isFunction(c.data) && (c.data = c.data.call(this, l)), e.ajax(c).done(e.proxy((function(e, a, o) {
                                var c, l;
                                if (e)
                                    for (c in e) e.hasOwnProperty(c) && (this._data.massload[c] = e[c]);
                                for (c = 0, l = t.length; c < l; c++)(d = this.get_node(t[c], !0)) && d.length && d.removeClass("jstree-loading").attr("aria-busy", !1);
                                i._load_nodes.call(this, t, r, s, n)
                            }), this)).fail(e.proxy((function(e) {
                                i._load_nodes.call(this, t, r, s, n)
                            }), this))
                        }
                    }
                    return i._load_nodes.call(this, t, r, s, n)
                }, this._load_node = function(t, r) {
                    var s, n = this._data.massload[t.id],
                        a = null;
                    return n ? (a = this["string" == typeof n ? "_append_html_data" : "_append_json_data"](t, "string" == typeof n ? e(e.parseHTML(n)).filter((function() {
                        return 3 !== this.nodeType
                    })) : n, (function(e) {
                        r.call(this, e)
                    })), (s = this.get_node(t.id, !0)) && s.length && s.removeClass("jstree-loading").attr("aria-busy", !1), delete this._data.massload[t.id], a) : i._load_node.call(this, t, r)
                }
            }, e.jstree.defaults.search = {
                ajax: !1,
                fuzzy: !1,
                case_sensitive: !1,
                show_only_matches: !1,
                show_only_matches_children: !1,
                close_opened_onclear: !0,
                search_leaves_only: !1,
                search_callback: !1
            }, e.jstree.plugins.search = function(i, r) {
                this.bind = function() {
                    r.bind.call(this), this._data.search.str = "", this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this._data.search.som = !1, this._data.search.smc = !1, this._data.search.hdn = [], this.element.on("search.jstree", e.proxy((function(t, i) {
                        if (this._data.search.som && i.res.length) {
                            var r, s, n, a, o = this._model.data,
                                d = [];
                            for (r = 0, s = i.res.length; r < s; r++)
                                if (o[i.res[r]] && !o[i.res[r]].state.hidden && (d.push(i.res[r]), d = d.concat(o[i.res[r]].parents), this._data.search.smc))
                                    for (n = 0, a = o[i.res[r]].children_d.length; n < a; n++) o[o[i.res[r]].children_d[n]] && !o[o[i.res[r]].children_d[n]].state.hidden && d.push(o[i.res[r]].children_d[n]);
                            d = e.vakata.array_remove_item(e.vakata.array_unique(d), e.jstree.root), this._data.search.hdn = this.hide_all(!0), this.show_node(d, !0), this.redraw(!0)
                        }
                    }), this)).on("clear_search.jstree", e.proxy((function(e, t) {
                        this._data.search.som && t.res.length && (this.show_node(this._data.search.hdn, !0), this.redraw(!0))
                    }), this))
                }, this.search = function(i, r, s, n, a, o) {
                    if (!1 === i || "" === e.trim(i.toString())) return this.clear_search();
                    n = (n = this.get_node(n)) && n.id ? n.id : null, i = i.toString();
                    var d, c, l = this.settings.search,
                        h = !!l.ajax && l.ajax,
                        _ = this._model.data,
                        u = null,
                        f = [],
                        g = [];
                    if (this._data.search.res.length && !a && this.clear_search(), s === t && (s = l.show_only_matches), o === t && (o = l.show_only_matches_children), !r && !1 !== h) return e.isFunction(h) ? h.call(this, i, e.proxy((function(t) {
                        t && t.d && (t = t.d), this._load_nodes(e.isArray(t) ? e.vakata.array_unique(t) : [], (function() {
                            this.search(i, !0, s, n, a, o)
                        }))
                    }), this), n) : ((h = e.extend({}, h)).data || (h.data = {}), h.data.str = i, n && (h.data.inside = n), this._data.search.lastRequest && this._data.search.lastRequest.abort(), this._data.search.lastRequest = e.ajax(h).fail(e.proxy((function() {
                        this._data.core.last_error = {
                            error: "ajax",
                            plugin: "search",
                            id: "search_01",
                            reason: "Could not load search parents",
                            data: JSON.stringify(h)
                        }, this.settings.core.error.call(this, this._data.core.last_error)
                    }), this)).done(e.proxy((function(t) {
                        t && t.d && (t = t.d), this._load_nodes(e.isArray(t) ? e.vakata.array_unique(t) : [], (function() {
                            this.search(i, !0, s, n, a, o)
                        }))
                    }), this)), this._data.search.lastRequest);
                    if (a || (this._data.search.str = i, this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this._data.search.som = s, this._data.search.smc = o), u = new e.vakata.search(i, !0, {
                            caseSensitive: l.case_sensitive,
                            fuzzy: l.fuzzy
                        }), e.each(_[n || e.jstree.root].children_d, (function(e, t) {
                            var r = _[t];
                            r.text && !r.state.hidden && (!l.search_leaves_only || r.state.loaded && 0 === r.children.length) && (l.search_callback && l.search_callback.call(this, i, r) || !l.search_callback && u.search(r.text).isMatch) && (f.push(t), g = g.concat(r.parents))
                        })), f.length) {
                        for (d = 0, c = (g = e.vakata.array_unique(g)).length; d < c; d++) g[d] !== e.jstree.root && _[g[d]] && !0 === this.open_node(g[d], null, 0) && this._data.search.opn.push(g[d]);
                        a ? (this._data.search.dom = this._data.search.dom.add(e(this.element[0].querySelectorAll("#" + e.map(f, (function(t) {
                            return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                        })).join(", #")))), this._data.search.res = e.vakata.array_unique(this._data.search.res.concat(f))) : (this._data.search.dom = e(this.element[0].querySelectorAll("#" + e.map(f, (function(t) {
                            return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                        })).join(", #"))), this._data.search.res = f), this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")
                    }
                    this.trigger("search", {
                        nodes: this._data.search.dom,
                        str: i,
                        res: this._data.search.res,
                        show_only_matches: s
                    })
                }, this.clear_search = function() {
                    this.settings.search.close_opened_onclear && this.close_node(this._data.search.opn, 0), this.trigger("clear_search", {
                        nodes: this._data.search.dom,
                        str: this._data.search.str,
                        res: this._data.search.res
                    }), this._data.search.res.length && (this._data.search.dom = e(this.element[0].querySelectorAll("#" + e.map(this._data.search.res, (function(t) {
                        return -1 !== "0123456789".indexOf(t[0]) ? "\\3" + t[0] + " " + t.substr(1).replace(e.jstree.idregex, "\\$&") : t.replace(e.jstree.idregex, "\\$&")
                    })).join(", #"))), this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search")), this._data.search.str = "", this._data.search.res = [], this._data.search.opn = [], this._data.search.dom = e()
                }, this.redraw_node = function(t, i, s, n) {
                    if ((t = r.redraw_node.apply(this, arguments)) && -1 !== e.inArray(t.id, this._data.search.res)) {
                        var a, o, d = null;
                        for (a = 0, o = t.childNodes.length; a < o; a++)
                            if (t.childNodes[a] && t.childNodes[a].className && -1 !== t.childNodes[a].className.indexOf("jstree-anchor")) {
                                d = t.childNodes[a];
                                break
                            }
                        d && (d.className += " jstree-search")
                    }
                    return t
                }
            },
            function(e) {
                e.vakata.search = function(t, i, r) {
                    r = r || {}, !1 !== (r = e.extend({}, e.vakata.search.defaults, r)).fuzzy && (r.fuzzy = !0), t = r.caseSensitive ? t : t.toLowerCase();
                    var s, n, a, o, d = r.location,
                        c = r.distance,
                        l = r.threshold,
                        h = t.length;
                    return h > 32 && (r.fuzzy = !1), r.fuzzy && (s = 1 << h - 1, n = function() {
                        var e = {},
                            i = 0;
                        for (i = 0; i < h; i++) e[t.charAt(i)] = 0;
                        for (i = 0; i < h; i++) e[t.charAt(i)] |= 1 << h - i - 1;
                        return e
                    }(), a = function(e, t) {
                        var i = e / h,
                            r = Math.abs(d - t);
                        return c ? i + r / c : r ? 1 : i
                    }), o = function(e) {
                        if (e = r.caseSensitive ? e : e.toLowerCase(), t === e || -1 !== e.indexOf(t)) return {
                            isMatch: !0,
                            score: 0
                        };
                        if (!r.fuzzy) return {
                            isMatch: !1,
                            score: 1
                        };
                        var i, o, c, _, u, f, g, p, m, v = e.length,
                            j = l,
                            y = e.indexOf(t, d),
                            k = h + v,
                            b = 1,
                            x = [];
                        for (-1 !== y && (j = Math.min(a(0, y), j), -1 !== (y = e.lastIndexOf(t, d + h)) && (j = Math.min(a(0, y), j))), y = -1, i = 0; i < h; i++) {
                            for (c = 0, _ = k; c < _;) a(i, d + _) <= j ? c = _ : k = _, _ = Math.floor((k - c) / 2 + c);
                            for (k = _, f = Math.max(1, d - _ + 1), g = Math.min(d + _, v) + h, (p = new Array(g + 2))[g + 1] = (1 << i) - 1, o = g; o >= f; o--)
                                if (m = n[e.charAt(o - 1)], p[o] = 0 === i ? (p[o + 1] << 1 | 1) & m : (p[o + 1] << 1 | 1) & m | (u[o + 1] | u[o]) << 1 | 1 | u[o + 1], p[o] & s && (b = a(i, o - 1)) <= j) {
                                    if (j = b, y = o - 1, x.push(y), !(y > d)) break;
                                    f = Math.max(1, 2 * d - y)
                                }
                            if (a(i + 1, d) > j) break;
                            u = p
                        }
                        return {
                            isMatch: y >= 0,
                            score: b
                        }
                    }, !0 === i ? {
                        search: o
                    } : o(i)
                }, e.vakata.search.defaults = {
                    location: 0,
                    distance: 100,
                    threshold: .6,
                    fuzzy: !1,
                    caseSensitive: !1
                }
            }(e), e.jstree.defaults.sort = function(e, t) {
                return this.get_text(e) > this.get_text(t) ? 1 : -1
            }, e.jstree.plugins.sort = function(t, i) {
                this.bind = function() {
                    i.bind.call(this), this.element.on("model.jstree", e.proxy((function(e, t) {
                        this.sort(t.parent, !0)
                    }), this)).on("rename_node.jstree create_node.jstree", e.proxy((function(e, t) {
                        this.sort(t.parent || t.node.parent, !1), this.redraw_node(t.parent || t.node.parent, !0)
                    }), this)).on("move_node.jstree copy_node.jstree", e.proxy((function(e, t) {
                        this.sort(t.parent, !1), this.redraw_node(t.parent, !0)
                    }), this))
                }, this.sort = function(t, i) {
                    var r, s;
                    if ((t = this.get_node(t)) && t.children && t.children.length && (t.children.sort(e.proxy(this.settings.sort, this)), i))
                        for (r = 0, s = t.children_d.length; r < s; r++) this.sort(t.children_d[r], !1)
                }
            };
        var f = !1;
        e.jstree.defaults.state = {
                key: "jstree",
                events: "changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree",
                ttl: !1,
                filter: !1,
                preserve_loaded: !1
            }, e.jstree.plugins.state = function(t, i) {
                this.bind = function() {
                    i.bind.call(this);
                    var t = e.proxy((function() {
                        this.element.on(this.settings.state.events, e.proxy((function() {
                            f && clearTimeout(f), f = setTimeout(e.proxy((function() {
                                this.save_state()
                            }), this), 100)
                        }), this)), this.trigger("state_ready")
                    }), this);
                    this.element.on("ready.jstree", e.proxy((function(e, i) {
                        this.element.one("restore_state.jstree", t), this.restore_state() || t()
                    }), this))
                }, this.save_state = function() {
                    var t = this.get_state();
                    this.settings.state.preserve_loaded || delete t.core.loaded;
                    var i = {
                        state: t,
                        ttl: this.settings.state.ttl,
                        sec: +new Date
                    };
                    e.vakata.storage.set(this.settings.state.key, JSON.stringify(i))
                }, this.restore_state = function() {
                    var t = e.vakata.storage.get(this.settings.state.key);
                    if (t) try {
                        t = JSON.parse(t)
                    } catch (e) {
                        return !1
                    }
                    return !(t && t.ttl && t.sec && +new Date - t.sec > t.ttl) && (t && t.state && (t = t.state), t && e.isFunction(this.settings.state.filter) && (t = this.settings.state.filter.call(this, t)), !!t && (this.settings.state.preserve_loaded || delete t.core.loaded, this.element.one("set_state.jstree", (function(i, r) {
                        r.instance.trigger("restore_state", {
                            state: e.extend(!0, {}, t)
                        })
                    })), this.set_state(t), !0))
                }, this.clear_state = function() {
                    return e.vakata.storage.del(this.settings.state.key)
                }
            },
            function(e, t) {
                e.vakata.storage = {
                    set: function(e, t) {
                        return window.localStorage.setItem(e, t)
                    },
                    get: function(e) {
                        return window.localStorage.getItem(e)
                    },
                    del: function(e) {
                        return window.localStorage.removeItem(e)
                    }
                }
            }(e), e.jstree.defaults.types = {
                default: {}
            }, e.jstree.defaults.types[e.jstree.root] = {}, e.jstree.plugins.types = function(i, r) {
                this.init = function(i, s) {
                    var n, a;
                    if (s && s.types && s.types.default)
                        for (n in s.types)
                            if ("default" !== n && n !== e.jstree.root && s.types.hasOwnProperty(n))
                                for (a in s.types.default) s.types.default.hasOwnProperty(a) && s.types[n][a] === t && (s.types[n][a] = s.types.default[a]);
                    r.init.call(this, i, s), this._model.data[e.jstree.root].type = e.jstree.root
                }, this.refresh = function(t, i) {
                    r.refresh.call(this, t, i), this._model.data[e.jstree.root].type = e.jstree.root
                }, this.bind = function() {
                    this.element.on("model.jstree", e.proxy((function(i, r) {
                        var s, n, a, o = this._model.data,
                            d = r.nodes,
                            c = this.settings.types,
                            l = "default";
                        for (s = 0, n = d.length; s < n; s++) {
                            if (l = "default", o[d[s]].original && o[d[s]].original.type && c[o[d[s]].original.type] && (l = o[d[s]].original.type), o[d[s]].data && o[d[s]].data.jstree && o[d[s]].data.jstree.type && c[o[d[s]].data.jstree.type] && (l = o[d[s]].data.jstree.type), o[d[s]].type = l, !0 === o[d[s]].icon && c[l].icon !== t && (o[d[s]].icon = c[l].icon), c[l].li_attr !== t && "object" == typeof c[l].li_attr)
                                for (a in c[l].li_attr)
                                    if (c[l].li_attr.hasOwnProperty(a)) {
                                        if ("id" === a) continue;
                                        o[d[s]].li_attr[a] === t ? o[d[s]].li_attr[a] = c[l].li_attr[a] : "class" === a && (o[d[s]].li_attr.class = c[l].li_attr.class + " " + o[d[s]].li_attr.class)
                                    }
                            if (c[l].a_attr !== t && "object" == typeof c[l].a_attr)
                                for (a in c[l].a_attr)
                                    if (c[l].a_attr.hasOwnProperty(a)) {
                                        if ("id" === a) continue;
                                        o[d[s]].a_attr[a] === t ? o[d[s]].a_attr[a] = c[l].a_attr[a] : "href" === a && "#" === o[d[s]].a_attr[a] ? o[d[s]].a_attr.href = c[l].a_attr.href : "class" === a && (o[d[s]].a_attr.class = c[l].a_attr.class + " " + o[d[s]].a_attr.class)
                                    }
                        }
                        o[e.jstree.root].type = e.jstree.root
                    }), this)), r.bind.call(this)
                }, this.get_json = function(t, i, s) {
                    var n, a, o = this._model.data,
                        d = i ? e.extend(!0, {}, i, {
                            no_id: !1
                        }) : {},
                        c = r.get_json.call(this, t, d, s);
                    if (!1 === c) return !1;
                    if (e.isArray(c))
                        for (n = 0, a = c.length; n < a; n++) c[n].type = c[n].id && o[c[n].id] && o[c[n].id].type ? o[c[n].id].type : "default", i && i.no_id && (delete c[n].id, c[n].li_attr && c[n].li_attr.id && delete c[n].li_attr.id, c[n].a_attr && c[n].a_attr.id && delete c[n].a_attr.id);
                    else c.type = c.id && o[c.id] && o[c.id].type ? o[c.id].type : "default", i && i.no_id && (c = this._delete_ids(c));
                    return c
                }, this._delete_ids = function(t) {
                    if (e.isArray(t)) {
                        for (var i = 0, r = t.length; i < r; i++) t[i] = this._delete_ids(t[i]);
                        return t
                    }
                    return delete t.id, t.li_attr && t.li_attr.id && delete t.li_attr.id, t.a_attr && t.a_attr.id && delete t.a_attr.id, t.children && e.isArray(t.children) && (t.children = this._delete_ids(t.children)), t
                }, this.check = function(i, s, n, a, o) {
                    if (!1 === r.check.call(this, i, s, n, a, o)) return !1;
                    s = s && s.id ? s : this.get_node(s), n = n && n.id ? n : this.get_node(n);
                    var d, c, l, h, _ = s && s.id ? o && o.origin ? o.origin : e.jstree.reference(s.id) : null;
                    switch (_ = _ && _._model && _._model.data ? _._model.data : null, i) {
                        case "create_node":
                        case "move_node":
                        case "copy_node":
                            if ("move_node" !== i || -1 === e.inArray(s.id, n.children)) {
                                if ((d = this.get_rules(n)).max_children !== t && -1 !== d.max_children && d.max_children === n.children.length) return this._data.core.last_error = {
                                    error: "check",
                                    plugin: "types",
                                    id: "types_01",
                                    reason: "max_children prevents function: " + i,
                                    data: JSON.stringify({
                                        chk: i,
                                        pos: a,
                                        obj: !(!s || !s.id) && s.id,
                                        par: !(!n || !n.id) && n.id
                                    })
                                }, !1;
                                if (d.valid_children !== t && -1 !== d.valid_children && -1 === e.inArray(s.type || "default", d.valid_children)) return this._data.core.last_error = {
                                    error: "check",
                                    plugin: "types",
                                    id: "types_02",
                                    reason: "valid_children prevents function: " + i,
                                    data: JSON.stringify({
                                        chk: i,
                                        pos: a,
                                        obj: !(!s || !s.id) && s.id,
                                        par: !(!n || !n.id) && n.id
                                    })
                                }, !1;
                                if (_ && s.children_d && s.parents) {
                                    for (c = 0, l = 0, h = s.children_d.length; l < h; l++) c = Math.max(c, _[s.children_d[l]].parents.length);
                                    c = c - s.parents.length + 1
                                }(c <= 0 || c === t) && (c = 1);
                                do {
                                    if (d.max_depth !== t && -1 !== d.max_depth && d.max_depth < c) return this._data.core.last_error = {
                                        error: "check",
                                        plugin: "types",
                                        id: "types_03",
                                        reason: "max_depth prevents function: " + i,
                                        data: JSON.stringify({
                                            chk: i,
                                            pos: a,
                                            obj: !(!s || !s.id) && s.id,
                                            par: !(!n || !n.id) && n.id
                                        })
                                    }, !1;
                                    n = this.get_node(n.parent), d = this.get_rules(n), c++
                                } while (n)
                            }
                    }
                    return !0
                }, this.get_rules = function(e) {
                    if (!(e = this.get_node(e))) return !1;
                    var i = this.get_type(e, !0);
                    return i.max_depth === t && (i.max_depth = -1), i.max_children === t && (i.max_children = -1), i.valid_children === t && (i.valid_children = -1), i
                }, this.get_type = function(t, i) {
                    return !!(t = this.get_node(t)) && (i ? e.extend({
                        type: t.type
                    }, this.settings.types[t.type]) : t.type)
                }, this.set_type = function(i, r) {
                    var s, n, a, o, d, c, l, h, _ = this._model.data;
                    if (e.isArray(i)) {
                        for (n = 0, a = (i = i.slice()).length; n < a; n++) this.set_type(i[n], r);
                        return !0
                    }
                    if (s = this.settings.types, i = this.get_node(i), !s[r] || !i) return !1;
                    if ((l = this.get_node(i, !0)) && l.length && (h = l.children(".jstree-anchor")), o = i.type, d = this.get_icon(i), i.type = r, (!0 === d || !s[o] || s[o].icon !== t && d === s[o].icon) && this.set_icon(i, s[r].icon === t || s[r].icon), s[o] && s[o].li_attr !== t && "object" == typeof s[o].li_attr)
                        for (c in s[o].li_attr)
                            if (s[o].li_attr.hasOwnProperty(c)) {
                                if ("id" === c) continue;
                                "class" === c ? (_[i.id].li_attr.class = (_[i.id].li_attr.class || "").replace(s[o].li_attr[c], ""), l && l.removeClass(s[o].li_attr[c])) : _[i.id].li_attr[c] === s[o].li_attr[c] && (_[i.id].li_attr[c] = null, l && l.removeAttr(c))
                            }
                    if (s[o] && s[o].a_attr !== t && "object" == typeof s[o].a_attr)
                        for (c in s[o].a_attr)
                            if (s[o].a_attr.hasOwnProperty(c)) {
                                if ("id" === c) continue;
                                "class" === c ? (_[i.id].a_attr.class = (_[i.id].a_attr.class || "").replace(s[o].a_attr[c], ""), h && h.removeClass(s[o].a_attr[c])) : _[i.id].a_attr[c] === s[o].a_attr[c] && ("href" === c ? (_[i.id].a_attr[c] = "#", h && h.attr("href", "#")) : (delete _[i.id].a_attr[c], h && h.removeAttr(c)))
                            }
                    if (s[r].li_attr !== t && "object" == typeof s[r].li_attr)
                        for (c in s[r].li_attr)
                            if (s[r].li_attr.hasOwnProperty(c)) {
                                if ("id" === c) continue;
                                _[i.id].li_attr[c] === t ? (_[i.id].li_attr[c] = s[r].li_attr[c], l && ("class" === c ? l.addClass(s[r].li_attr[c]) : l.attr(c, s[r].li_attr[c]))) : "class" === c && (_[i.id].li_attr.class = s[r].li_attr[c] + " " + _[i.id].li_attr.class, l && l.addClass(s[r].li_attr[c]))
                            }
                    if (s[r].a_attr !== t && "object" == typeof s[r].a_attr)
                        for (c in s[r].a_attr)
                            if (s[r].a_attr.hasOwnProperty(c)) {
                                if ("id" === c) continue;
                                _[i.id].a_attr[c] === t ? (_[i.id].a_attr[c] = s[r].a_attr[c], h && ("class" === c ? h.addClass(s[r].a_attr[c]) : h.attr(c, s[r].a_attr[c]))) : "href" === c && "#" === _[i.id].a_attr[c] ? (_[i.id].a_attr.href = s[r].a_attr.href, h && h.attr("href", s[r].a_attr.href)) : "class" === c && (_[i.id].a_attr.class = s[r].a_attr.class + " " + _[i.id].a_attr.class, h && h.addClass(s[r].a_attr[c]))
                            }
                    return !0
                }
            }, e.jstree.defaults.unique = {
                case_sensitive: !1,
                trim_whitespace: !1,
                duplicate: function(e, t) {
                    return e + " (" + t + ")"
                }
            }, e.jstree.plugins.unique = function(i, r) {
                this.check = function(t, i, s, n, a) {
                    if (!1 === r.check.call(this, t, i, s, n, a)) return !1;
                    if (i = i && i.id ? i : this.get_node(i), !(s = s && s.id ? s : this.get_node(s)) || !s.children) return !0;
                    var o, d, c, l = "rename_node" === t ? n : i.text,
                        h = [],
                        _ = this.settings.unique.case_sensitive,
                        u = this.settings.unique.trim_whitespace,
                        f = this._model.data;
                    for (o = 0, d = s.children.length; o < d; o++) c = f[s.children[o]].text, _ || (c = c.toLowerCase()), u && (c = c.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")), h.push(c);
                    switch (_ || (l = l.toLowerCase()), u && (l = l.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")), t) {
                        case "delete_node":
                            return !0;
                        case "rename_node":
                            return c = i.text || "", _ || (c = c.toLowerCase()), u && (c = c.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")), (o = -1 === e.inArray(l, h) || i.text && c === l) || (this._data.core.last_error = {
                                error: "check",
                                plugin: "unique",
                                id: "unique_01",
                                reason: "Child with name " + l + " already exists. Preventing: " + t,
                                data: JSON.stringify({
                                    chk: t,
                                    pos: n,
                                    obj: !(!i || !i.id) && i.id,
                                    par: !(!s || !s.id) && s.id
                                })
                            }), o;
                        case "create_node":
                            return (o = -1 === e.inArray(l, h)) || (this._data.core.last_error = {
                                error: "check",
                                plugin: "unique",
                                id: "unique_04",
                                reason: "Child with name " + l + " already exists. Preventing: " + t,
                                data: JSON.stringify({
                                    chk: t,
                                    pos: n,
                                    obj: !(!i || !i.id) && i.id,
                                    par: !(!s || !s.id) && s.id
                                })
                            }), o;
                        case "copy_node":
                            return (o = -1 === e.inArray(l, h)) || (this._data.core.last_error = {
                                error: "check",
                                plugin: "unique",
                                id: "unique_02",
                                reason: "Child with name " + l + " already exists. Preventing: " + t,
                                data: JSON.stringify({
                                    chk: t,
                                    pos: n,
                                    obj: !(!i || !i.id) && i.id,
                                    par: !(!s || !s.id) && s.id
                                })
                            }), o;
                        case "move_node":
                            return (o = i.parent === s.id && (!a || !a.is_multi) || -1 === e.inArray(l, h)) || (this._data.core.last_error = {
                                error: "check",
                                plugin: "unique",
                                id: "unique_03",
                                reason: "Child with name " + l + " already exists. Preventing: " + t,
                                data: JSON.stringify({
                                    chk: t,
                                    pos: n,
                                    obj: !(!i || !i.id) && i.id,
                                    par: !(!s || !s.id) && s.id
                                })
                            }), o
                    }
                    return !0
                }, this.create_node = function(i, s, n, a, o) {
                    if (!s || s.text === t) {
                        if (null === i && (i = e.jstree.root), !(i = this.get_node(i))) return r.create_node.call(this, i, s, n, a, o);
                        if (!(n = n === t ? "last" : n).toString().match(/^(before|after)$/) && !o && !this.is_loaded(i)) return r.create_node.call(this, i, s, n, a, o);
                        s || (s = {});
                        var d, c, l, h, _, u, f = this._model.data,
                            g = this.settings.unique.case_sensitive,
                            p = this.settings.unique.trim_whitespace,
                            m = this.settings.unique.duplicate;
                        for (c = d = this.get_string("New node"), l = [], h = 0, _ = i.children.length; h < _; h++) u = f[i.children[h]].text, g || (u = u.toLowerCase()), p && (u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")), l.push(u);
                        for (h = 1, u = c, g || (u = u.toLowerCase()), p && (u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")); - 1 !== e.inArray(u, l);) u = c = m.call(this, d, ++h).toString(), g || (u = u.toLowerCase()), p && (u = u.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""));
                        s.text = c
                    }
                    return r.create_node.call(this, i, s, n, a, o)
                }
            };
        var g = d.createElement("DIV");
        if (g.setAttribute("unselectable", "on"), g.setAttribute("role", "presentation"), g.className = "jstree-wholerow", g.innerHTML = "&#160;", e.jstree.plugins.wholerow = function(t, i) {
                this.bind = function() {
                    i.bind.call(this), this.element.on("ready.jstree set_state.jstree", e.proxy((function() {
                        this.hide_dots()
                    }), this)).on("init.jstree loading.jstree ready.jstree", e.proxy((function() {
                        this.get_container_ul().addClass("jstree-wholerow-ul")
                    }), this)).on("deselect_all.jstree", e.proxy((function(e, t) {
                        this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")
                    }), this)).on("changed.jstree", e.proxy((function(e, t) {
                        this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
                        var i, r, s = !1;
                        for (i = 0, r = t.selected.length; i < r; i++)(s = this.get_node(t.selected[i], !0)) && s.length && s.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                    }), this)).on("open_node.jstree", e.proxy((function(e, t) {
                        this.get_node(t.node, !0).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                    }), this)).on("hover_node.jstree dehover_node.jstree", e.proxy((function(e, t) {
                        "hover_node" === e.type && this.is_disabled(t.node) || this.get_node(t.node, !0).children(".jstree-wholerow")["hover_node" === e.type ? "addClass" : "removeClass"]("jstree-wholerow-hovered")
                    }), this)).on("contextmenu.jstree", ".jstree-wholerow", e.proxy((function(t) {
                        if (this._data.contextmenu) {
                            t.preventDefault();
                            var i = e.Event("contextmenu", {
                                metaKey: t.metaKey,
                                ctrlKey: t.ctrlKey,
                                altKey: t.altKey,
                                shiftKey: t.shiftKey,
                                pageX: t.pageX,
                                pageY: t.pageY
                            });
                            e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i)
                        }
                    }), this)).on("click.jstree", ".jstree-wholerow", (function(t) {
                        t.stopImmediatePropagation();
                        var i = e.Event("click", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i).focus()
                    })).on("dblclick.jstree", ".jstree-wholerow", (function(t) {
                        t.stopImmediatePropagation();
                        var i = e.Event("dblclick", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i).focus()
                    })).on("click.jstree", ".jstree-leaf > .jstree-ocl", e.proxy((function(t) {
                        t.stopImmediatePropagation();
                        var i = e.Event("click", {
                            metaKey: t.metaKey,
                            ctrlKey: t.ctrlKey,
                            altKey: t.altKey,
                            shiftKey: t.shiftKey
                        });
                        e(t.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(i).focus()
                    }), this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", e.proxy((function(e) {
                        return e.stopImmediatePropagation(), this.is_disabled(e.currentTarget) || this.hover_node(e.currentTarget), !1
                    }), this)).on("mouseleave.jstree", ".jstree-node", e.proxy((function(e) {
                        this.dehover_node(e.currentTarget)
                    }), this))
                }, this.teardown = function() {
                    this.settings.wholerow && this.element.find(".jstree-wholerow").remove(), i.teardown.call(this)
                }, this.redraw_node = function(t, r, s, n) {
                    if (t = i.redraw_node.apply(this, arguments)) {
                        var a = g.cloneNode(!0); - 1 !== e.inArray(t.id, this._data.core.selected) && (a.className += " jstree-wholerow-clicked"), this._data.core.focused && this._data.core.focused === t.id && (a.className += " jstree-wholerow-hovered"), t.insertBefore(a, t.childNodes[0])
                    }
                    return t
                }
            }, window.customElements && Object && Object.create) {
            var p = Object.create(HTMLElement.prototype);
            p.createdCallback = function() {
                var t, i = {
                    core: {},
                    plugins: []
                };
                for (t in e.jstree.plugins) e.jstree.plugins.hasOwnProperty(t) && this.attributes[t] && (i.plugins.push(t), this.getAttribute(t) && JSON.parse(this.getAttribute(t)) && (i[t] = JSON.parse(this.getAttribute(t))));
                for (t in e.jstree.defaults.core) e.jstree.defaults.core.hasOwnProperty(t) && this.attributes[t] && (i.core[t] = JSON.parse(this.getAttribute(t)) || this.getAttribute(t));
                e(this).jstree(i)
            };
            try {
                window.customElements.define("vakata-jstree", (function() {}), {
                    prototype: p
                })
            } catch (e) {}
        }
    }
})),
function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
}((function(e) {
    var t, i = 0,
        r = Array.prototype.slice;
    e.cleanData = (t = e.cleanData, function(i) {
        var r, s, n;
        for (n = 0; null != (s = i[n]); n++) try {
            (r = e._data(s, "events")) && r.remove && e(s).triggerHandler("remove")
        } catch (e) {}
        t(i)
    }), e.widget = function(t, i, r) {
        var s, n, a, o, d = {},
            c = t.split(".")[0];
        return t = t.split(".")[1], s = c + "-" + t, r || (r = i, i = e.Widget), e.expr[":"][s.toLowerCase()] = function(t) {
            return !!e.data(t, s)
        }, e[c] = e[c] || {}, n = e[c][t], a = e[c][t] = function(e, t) {
            if (!this._createWidget) return new a(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(a, n, {
            version: r.version,
            _proto: e.extend({}, r),
            _childConstructors: []
        }), (o = new i).options = e.widget.extend({}, o.options), e.each(r, (function(t, r) {
            var s, n;
            e.isFunction(r) ? d[t] = (s = function() {
                return i.prototype[t].apply(this, arguments)
            }, n = function(e) {
                return i.prototype[t].apply(this, e)
            }, function() {
                var e, t = this._super,
                    i = this._superApply;
                return this._super = s, this._superApply = n, e = r.apply(this, arguments), this._super = t, this._superApply = i, e
            }) : d[t] = r
        })), a.prototype = e.widget.extend(o, {
            widgetEventPrefix: n && o.widgetEventPrefix || t
        }, d, {
            constructor: a,
            namespace: c,
            widgetName: t,
            widgetFullName: s
        }), n ? (e.each(n._childConstructors, (function(t, i) {
            var r = i.prototype;
            e.widget(r.namespace + "." + r.widgetName, a, i._proto)
        })), delete n._childConstructors) : i._childConstructors.push(a), e.widget.bridge(t, a), a
    }, e.widget.extend = function(t) {
        for (var i, s, n = r.call(arguments, 1), a = 0, o = n.length; a < o; a++)
            for (i in n[a]) s = n[a][i], n[a].hasOwnProperty(i) && void 0 !== s && (e.isPlainObject(s) ? t[i] = e.isPlainObject(t[i]) ? e.widget.extend({}, t[i], s) : e.widget.extend({}, s) : t[i] = s);
        return t
    }, e.widget.bridge = function(t, i) {
        var s = i.prototype.widgetFullName || t;
        e.fn[t] = function(n) {
            var a = "string" == typeof n,
                o = r.call(arguments, 1),
                d = this;
            return a ? this.each((function() {
                var i, r = e.data(this, s);
                return "instance" === n ? (d = r, !1) : r ? e.isFunction(r[n]) && "_" !== n.charAt(0) ? (i = r[n].apply(r, o)) !== r && void 0 !== i ? (d = i && i.jquery ? d.pushStack(i.get()) : i, !1) : void 0 : e.error("no such method '" + n + "' for " + t + " widget instance") : e.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + n + "'")
            })) : (o.length && (n = e.widget.extend.apply(null, [n].concat(o))), this.each((function() {
                var t = e.data(this, s);
                t ? (t.option(n || {}), t._init && t._init()) : e.data(this, s, new i(n, this))
            }))), d
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(t, i) {
            var r, s, n, a = t;
            if (0 === arguments.length) return e.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (a = {}, r = t.split("."), t = r.shift(), r.length) {
                    for (s = a[t] = e.widget.extend({}, this.options[t]), n = 0; n < r.length - 1; n++) s[r[n]] = s[r[n]] || {}, s = s[r[n]];
                    if (t = r.pop(), 1 === arguments.length) return void 0 === s[t] ? null : s[t];
                    s[t] = i
                } else {
                    if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
                    a[t] = i
                }
            return this._setOptions(a), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, "disabled" === e && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!t), t && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(t, i, r) {
            var s, n = this;
            "boolean" != typeof t && (r = i, i = t, t = !1), r ? (i = s = e(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, s = this.widget()), e.each(r, (function(r, a) {
                function o() {
                    if (t || !0 !== n.options.disabled && !e(this).hasClass("ui-state-disabled")) return ("string" == typeof a ? n[a] : a).apply(n, arguments)
                }
                "string" != typeof a && (o.guid = a.guid = a.guid || o.guid || e.guid++);
                var d = r.match(/^([\w:-]*)\s*(.*)$/),
                    c = d[1] + n.eventNamespace,
                    l = d[2];
                l ? s.delegate(l, c, o) : i.bind(c, o)
            }))
        },
        _off: function(t, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(i).undelegate(i), this.bindings = e(this.bindings.not(t).get()), this.focusable = e(this.focusable.not(t).get()), this.hoverable = e(this.hoverable.not(t).get())
        },
        _delay: function(e, t) {
            var i = this;
            return setTimeout((function() {
                return ("string" == typeof e ? i[e] : e).apply(i, arguments)
            }), t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var s, n, a = this.options[t];
            if (r = r || {}, (i = e.Event(i)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], n = i.originalEvent)
                for (s in n) s in i || (i[s] = n[s]);
            return this.element.trigger(i, r), !(e.isFunction(a) && !1 === a.apply(this.element[0], [i].concat(r)) || i.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, (function(t, i) {
        e.Widget.prototype["_" + t] = function(r, s, n) {
            "string" == typeof s && (s = {
                effect: s
            });
            var a, o = s ? !0 === s || "number" == typeof s ? i : s.effect || i : t;
            "number" == typeof(s = s || {}) && (s = {
                duration: s
            }), a = !e.isEmptyObject(s), s.complete = n, s.delay && r.delay(s.delay), a && e.effects && e.effects.effect[o] ? r[t](s) : o !== t && r[o] ? r[o](s.duration, s.easing, n) : r.queue((function(i) {
                e(this)[t](), n && n.call(r[0]), i()
            }))
        }
    }));
    e.widget
})), $.widget("my.app", {
    options: {
        states: ["initial", "initial urlEnter", "fileIsLoading", "fileIsLoaded"],
        state: "initial",
        class_prefix: "appState_"
    },
    _create: function() {},
    _setOption: function(e, t) {
        "state" == e && (t = this._state_validate(t), this.options.state != t && this._trigger("statechange", event, t)), this._super(e, t)
    },
    _setOptions: function(e) {
        this._super(e), this._refresh()
    },
    _refresh: function() {
        var e = this.options.class_prefix + this.options.states.join(" " + this.options.class_prefix);
        this.element.removeClass(e).addClass(this.options.class_prefix + this.options.state)
    },
    _state_validate: function(e) {
        if (void 0 === e) throw "Open_remote.change_state: no state provided";
        if (-1 == $.inArray(e, this.options.states)) throw "Open_remote.change_state: " + e + " state not supported";
        return e
    }
}), $.widget("my.archive", {
    options: {},
    _create: function() {
        this._on({
            "click #download_all_as_zip_button": function(e) {
                e.preventDefault();
                var t = $(e.currentTarget).data("href"),
                    i = Ladda.create(e.currentTarget);
                return i.start(), $.post(t, {}, (function(e) {
                    var t = !0;
                    try {
                        void 0 !== (e = $.parseJSON(e)).download_url && (t = !1)
                    } catch (e) {}
                    t ? _.popup("fail", "unable_to_download_file") : window.location = api_url + e.download_url
                })).always((function() {
                    i.stop()
                })), !1
            }
        })
    },
    unpack: function(e) {
        var t = this;
        void 0 === e.password && (e.password = ""), _.merge_isp(e), $.post(api_url + "/unpack/", e, (function(i) {
            try {
                i = $.parseJSON(i)
            } catch (i) {
                t._unpack_error({
                    archive_filename: e.archive_filename
                })
            }
            if (i)
                if (i.archive_filename = e.archive_filename, i.error)
                    if ("dailyjobs_exceeded" == i.message_type) Premium.show_premium_entry_popup("dailyjobs", i), t._cancel();
                    else if ("wrong_password" == i.error_type) {
                var r = window.prompt(_.lang("need_password_4_archive"));
                null !== r ? (e.password = r, t.unpack(e)) : t._cancel()
            } else t._unpack_error({
                archive_filename: e.archive_filename
            });
            else e.tree_data = i.tree, t._unpack_success(e)
        }))
    },
    _build_tree: function(e) {
        var t = this;
        this.element.find("#jstree").on("select_node.jstree", (function(i, r) {
            if (r.node.children.length > 0) r.instance.toggle_node(r.node);
            else {
                var s = t._get_item_path(r),
                    n = t._download_url(s, e, "download_t");
                $.get(n).done((function() {
                    var i = t._download_url(s, e);
                    window.location.href = i
                })).fail((function() {
                    _.popup("fail", "unable_to_download_file")
                }))
            }
        })).jstree({
            core: {
                data: e.tree_data
            }
        }), this.element.find(".filename").html(e.archive_filename.replace(/(\.\w+)\.\d+$/, "$1").replace(/\.part\d+(\.\w+)$/, "$1"))
    },
    reset_tree: function() {
        $.jstree.destroy(), this.element.find(".filename").html("")
    },
    _cancel: function() {
        this._trigger("cancel")
    },
    _unpack_success: function(e) {
        this._build_tree(e);
        var t = _.getCookie("uid") ? _.getCookie("uid") + "/" : "nouid/";
        this.element.find("#download_all_as_zip_button").data("href", api_url + "/compress/zip/" + t + e.tmp_filename), this._trigger("unpack_success")
    },
    _unpack_error: function(e) {
        _.popup_unsupported_file(e.archive_filename), this._trigger("unpack_error")
    },
    _uid: function() {
        return _.getCookie("uid") ? _.getCookie("uid") : "nouid"
    },
    _get_item_path: function(e) {
        var t = [];
        t.push(e.node.text);
        for (var i = e.node.parents, r = 0; r < i.length - 1; r++) {
            var s = e.instance.get_node(i[r]);
            t.push(s.text)
        }
        return t.reverse()
    },
    _download_url: function(e, t, i) {
        return void 0 === i && (i = "download_d"), api_url + "/" + i + "/" + this._uid() + "/" + t.tmp_filename + "/" + encodeURIComponent(e.join("/"))
    }
});
var app, archive, open_progress, or, api_url = "https://" + window.glob.s_encoder + "/" + window.glob.site_id,
    uploaded_files = [];

function upload_start() {
    uploaded_files = [], archive.archive("reset_tree"), open_progress.progressBar("reset"), app.app("option", "state", "fileIsLoading")
}
$(document).ready((function() {
    function e() {
        _.l("subscribed")
    }

    function t() {
        app.app("option", "state", "initial"), CloudApi.cancel(), i.cancel()
    }
    ServerAPI.init({
        lazy_load: !0
    }), CloudApi.init({
        openersContainer: ".cloudOpeners",
        attach_savers: !1,
        query: {
            ud: 1,
            i: window.i || ""
        },
        callbacks: {
            onOpenStart: function(e, t) {
                upload_start()
            },
            onOpenProgress: function(e) {
                open_progress.progressBar("option", "value", e)
            },
            onOpenComplete: function(e) {
                _.l(e)
            },
            onOpenSuccess: function(e) {
                archive.archive("unpack", {
                    tmp_filename: e.tmp_filename,
                    archive_filename: e.original_filename
                })
            },
            onOpenCancel: function() {
                app.app("option", "state", "initial")
            },
            onOpenError: function(e) {},
            onSubscribe: e,
            onSubscribeCancel: t
        }
    }), app = $("#the_app").app({
        statechange: function(e, t) {}
    }), archive = $("#archive").archive({
        cancel: function() {
            app.app("option", "state", "initial")
        },
        unpack_success: function() {
            open_progress.progressBar("success"), app.app("option", "state", "fileIsLoaded")
        },
        unpack_error: function() {
            open_progress.progressBar("fail"), app.app("option", "state", "initial")
        }
    }), open_progress = $("#open_progress_bar").progressBar({
        cancel: function() {
            app.app("option", "state", "initial"), CloudApi.cancel()
        }
    });
    var i = new Flow({
        target: api_url + "/upload/flow/",
        chunkSize: 10485760,
        query: {
            uid: _.getCookie("uid"),
            ud: 1
        }
    });
    i.assignBrowse(_.id("open_file_button")), i.assignDrop(_.first("body")), i.on("filesSubmitted", (function(e, t) {
        _.l("filesSubmitted", e), e.length && (upload_start(), i.upload())
    })), i.on("fileAdded", (function(i, r) {
        return UserSystem.filesize_check(i, {
            onSubscribe: e,
            onSubscribeCancel: t
        })
    })), i.on("fileSuccess", (function(e, t) {
        _.l("fileSuccess");
        try {
            t = JSON.parse(t), uploaded_files.push(t)
        } catch (e) {
            _.e(e)
        }
    })), i.on("complete", (function() {
        if (uploaded_files[0]) {
            var e = uploaded_files[0];
            if (uploaded_files.length > 1)
                for (var t = 0; t < uploaded_files.length; t++)
                    if (uploaded_files[t].original_filename.match(/\.([a-z]{3}|part01\.[a-z]{3}|\w{1,3}\.001)$/i)) {
                        e = uploaded_files[t];
                        break
                    }
            archive.archive("unpack", {
                tmp_filename: e.tmp_filename,
                archive_filename: e.original_filename
            })
        }
    })), i.on("progress", (function() {
        open_progress.progressBar("option", "value", parseInt(100 * i.progress()))
    })), i.on("error", (function(e, t, i) {
        _.e(e), open_progress.progressBar("fail")
    })), $("#extract_another_button").click((function() {
        app.app("option", "state", "initial")
    }));
    var r = $("#supported_formats .initial").text().split(", ");
    $("#supported_formats .initial").html(r.slice(0, 15).join(", ")), $("#supported_formats .more_formats").html(r.slice(16).join(", "));
    var s = _.lang("and_0_more").replace("{0}", r.slice(16).length);
    $("#supported_formats a.more_button").html(s), $("#supported_formats a.more_button").click((function(e) {
        $("#supported_formats .more_formats").toggle(), $(this).remove(), e.preventDefault()
    }))
})), $.widget("my.progressBar", {
    options: {
        value: 0
    },
    _create: function() {
        this.bar = this.element.find(".progress-bar"), this.bar.css("min-width", "2em"), this._on({
            "click button.cancel": function() {
                this._cancel()
            }
        })
    },
    reset: function() {
        this.option("value", 0), this.bar.removeClass("progress-bar-success").removeClass("progress-bar-danger"), this._stop_animation()
    },
    success: function() {
        this.bar.addClass("progress-bar-success"), this._stop_animation()
    },
    fail: function() {
        this._stop_animation(), this.bar.removeClass("progress-bar-success").addClass("progress-bar-danger"), this._stop_animation()
    },
    _refresh: function() {
        this.bar.css("width", this.options.value + "%").html(this.options.value + "%")
    },
    _cancel: function() {
        this.reset(), this._trigger("cancel")
    },
    _setOption: function(e, t) {
        "value" === e && (t = this._constrain(t)) > 0 && t < 100 && this._play_animation(), this._super(e, t)
    },
    _setOptions: function(e) {
        this._super(e), this._refresh()
    },
    _constrain: function(e) {
        return e > 100 ? e = 100 : e < 0 && (e = 0), e
    },
    _play_animation: function() {
        this.bar.hasClass("active") || this.bar.addClass("active")
    },
    _stop_animation: function() {
        this.bar.removeClass("active")
    }
});