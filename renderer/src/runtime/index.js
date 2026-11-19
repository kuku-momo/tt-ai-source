const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/Home-BE7O8OSv.js",
      "assets/sparkles-IALSmIzE.js",
      "assets/layers-CxUe-Vcm.js",
      "assets/wand-sparkles-BV7MfZJg.js",
      "assets/clapperboard-1dbdJ4KK.js",
      "assets/check-cXlZY8Kx.js",
      "assets/copy-U2ZmXKm8.js",
      "assets/plus-BgPWMvVP.js",
      "assets/arrow-right-BZScXsqk.js",
      "assets/file-text-DUPH4gWx.js",
      "assets/play-Coduizxi.js",
      "assets/arrow-up-right-BCjJ20qW.js",
      "assets/palette-BXq17dSz.js",
      "assets/Home-B96Zg3P4.css",
      "assets/Tasks-V180OipY.js",
      "assets/Tasks-CNLxa3xT.css",
      "assets/Works-CuVhDVvz.js",
      "assets/WorkPublisher-DKBwwGHS.js",
      "assets/WorkPublisher-CJlVdDGo.css",
      "assets/Works-Ba-IhWhf.css",
      "assets/Chat-DJ4_YN6R.js",
      "assets/Chat-D8hdXO8m.css",
      "assets/Draw-BZNOQoog.js",
      "assets/download-BwIkmfjC.js",
      "assets/x-DUmRXFcP.js",
      "assets/chevron-right-380BREwp.js",
      "assets/search-XOsvO7LP.js",
      "assets/Draw-DjNsGlox.css",
      "assets/Video-DsCDuv36.js",
      "assets/Video-ClcRu9sr.css",
      "assets/ShortDramaProduction-Ba6kQ3xf.js",
      "assets/refresh-cw-C3tpVxsU.js",
      "assets/loader-circle-D8DmJQ5i.js",
      "assets/triangle-alert-co4mELVU.js",
      "assets/trash-DnaC83vJ.js",
      "assets/ShortDramaProduction-4uw1g0ba.css",
      "assets/ShortDramaProductionWorkspace-BQ7iULQa.js",
      "assets/film-CqI-d0Uy.js",
      "assets/circle-check-CbnQ6F7H.js",
      "assets/upload-Df4L1YXZ.js",
      "assets/users-BX-iTuXk.js",
      "assets/ShortDramaProductionWorkspace-u3OMiVlX.css",
      "assets/DramaAuto-XMZJ7VLH.js",
      "assets/DramaAuto-CVpTdSjs.css",
      "assets/RemakeWorkshop-Byy1rjMp.js",
      "assets/RemakeWorkshop-B7Fk6Q1D.css",
      "assets/RemakeProgress-yswKXmfX.js",
      "assets/RemakeProgress-BQEuCmPB.css",
      "assets/VideoFaceSwap-B6yWxLor.js",
      "assets/VideoFaceSwap-wTbmUM0R.css",
      "assets/DramaCommerce-Bnc2du2U.js",
      "assets/DramaCommerce-C8m9Gyz3.css",
      "assets/ScriptTools-BdR3FAXi.js",
      "assets/ScriptTools-DIfmglz5.css",
      "assets/ScriptMaker-wNLgMG0u.js",
      "assets/ScriptMaker-ts4qZD32.css",
      "assets/Canvas-Dh-vXs0T.js",
      "assets/Canvas-C4dX03A0.css",
      "assets/Settings-B3SmdTQE.js",
      "assets/Settings-Dw0b0PGQ.css",
      "assets/Tutorials-B76Wc5K_.js",
      "assets/Tutorials--iOcG3TJ.css",
      "assets/Agency-C4kTZM5Z.js",
      "assets/Agency-AQSJ3WUK.css",
    ]),
) => i.map((i) => d[i]);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) s(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
/**
 * @vue/shared v3.5.43
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function il(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Te = {},
  Jt = [],
  vt = () => {},
  Oo = () => !1,
  cs = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  ds = (e) => e.startsWith("onUpdate:"),
  Ue = Object.assign,
  rl = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  tr = Object.prototype.hasOwnProperty,
  Ee = (e, t) => tr.call(e, t),
  oe = Array.isArray,
  Lt = (e) => Dn(e) === "[object Map]",
  St = (e) => Dn(e) === "[object Set]",
  Rl = (e) => Dn(e) === "[object Date]",
  ce = (e) => typeof e == "function",
  Re = (e) => typeof e == "string",
  gt = (e) => typeof e == "symbol",
  ke = (e) => e !== null && typeof e == "object",
  Ro = (e) => (ke(e) || ce(e)) && ce(e.then) && ce(e.catch),
  $o = Object.prototype.toString,
  Dn = (e) => $o.call(e),
  nr = (e) => Dn(e).slice(8, -1),
  Po = (e) => Dn(e) === "[object Object]",
  al = (e) =>
    Re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  _n = il(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  fs = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  sr = /-\w/g,
  Je = fs((e) => e.replace(sr, (t) => t.slice(1).toUpperCase())),
  lr = /\B([A-Z])/g,
  Ht = fs((e) => e.replace(lr, "-$1").toLowerCase()),
  ps = fs((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Ss = fs((e) => (e ? `on${ps(e)}` : "")),
  ht = (e, t) => !Object.is(e, t),
  zn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  Io = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  hs = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let $l;
const vs = () =>
  $l ||
  ($l =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function ul(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        l = Re(s) ? ar(s) : ul(s);
      if (l) for (const o in l) t[o] = l[o];
    }
    return t;
  } else if (Re(e) || ke(e)) return e;
}
const or = /;(?![^(]*\))/g,
  ir = /:([^]+)/,
  rr = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
function ar(e) {
  const t = {};
  return (
    e
      .replace(rr, (n) => (n.startsWith("/*") ? "" : n))
      .split(or)
      .forEach((n) => {
        if (n) {
          const s = n.split(ir);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function Se(e) {
  let t = "";
  if (Re(e)) t = e;
  else if (oe(e))
    for (let n = 0; n < e.length; n++) {
      const s = Se(e[n]);
      s && (t += s + " ");
    }
  else if (ke(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const ur =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  cr = il(ur);
function No(e) {
  return !!e || e === "";
}
function dr(e, t, n) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let l = 0; s && l < e.length; l++) s = lt(e[l], t[l], n);
  return s;
}
function Pl(e, t, n) {
  if (e.size !== t.size) return !1;
  const s = Array.from(t),
    l = new Uint8Array(s.length);
  for (const o of e) {
    let i = -1;
    for (let a = 0; a < s.length; a++)
      if (!l[a] && lt(o, s[a], n)) {
        i = a;
        break;
      }
    if (i < 0) return !1;
    l[i] = 1;
  }
  return !0;
}
function fr(e, t, n) {
  let s = Lt(e),
    l = Lt(t);
  if (s || l || ((s = St(e)), (l = St(t)), s || l))
    return s && l ? Pl(e, t, n) : !1;
  const o = Object.keys(e).length,
    i = Object.keys(t).length;
  if (o !== i) return !1;
  for (const a in e) {
    const u = e.hasOwnProperty(a),
      d = t.hasOwnProperty(a);
    if ((u && !d) || (!u && d) || !lt(e[a], t[a], n)) return !1;
  }
  return String(e) === String(t);
}
function Il(e, t, n, s) {
  n || (n = [new Map(), new Map()]);
  const [l, o] = n;
  if (l.has(e) || o.has(t)) return l.get(e) === t && o.get(t) === e;
  l.set(e, t), o.set(t, e);
  const i = s(e, t, n);
  return l.delete(e), o.delete(t), i;
}
function lt(e, t, n) {
  if (e === t) return !0;
  let s = Rl(e),
    l = Rl(t);
  return s || l
    ? s && l
      ? e.getTime() === t.getTime()
      : !1
    : ((s = gt(e)),
      (l = gt(t)),
      s || l
        ? e === t
        : ((s = oe(e)),
          (l = oe(t)),
          s || l
            ? s && l
              ? Il(e, t, n, dr)
              : !1
            : ((s = ke(e)),
              (l = ke(t)),
              s || l
                ? !s || !l
                  ? !1
                  : Il(e, t, n, fr)
                : String(e) === String(t))));
}
function cl(e, t) {
  return e.findIndex((n) => lt(n, t));
}
const Mo = (e) => !!(e && e.__v_isRef === !0),
  I = (e) =>
    Re(e)
      ? e
      : e == null
        ? ""
        : oe(e) || (ke(e) && (e.toString === $o || !ce(e.toString)))
          ? Mo(e)
            ? I(e.value)
            : JSON.stringify(e, Do, 2)
          : String(e),
  Do = (e, t) =>
    Mo(t)
      ? Do(e, t.value)
      : Lt(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce(
              (n, [s, l], o) => ((n[Ts(s, o) + " =>"] = l), n),
              {},
            ),
          }
        : St(t)
          ? { [`Set(${t.size})`]: [...t.values()].map((n) => Ts(n)) }
          : gt(t)
            ? Ts(t)
            : ke(t) && !oe(t) && !Po(t)
              ? String(t)
              : t,
  Ts = (e, t = "") => {
    var n;
    return gt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
  };
/**
 * @vue/reactivity v3.5.43
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Le;
class pr {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this._warnOnRun = !0),
      (this.__v_skip = !0),
      !t &&
        Le &&
        (Le.active
          ? ((this.parent = Le),
            (this.index = (Le.scopes || (Le.scopes = [])).push(this) - 1))
          : ((this._active = !1), (this._warnOnRun = !1)));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes) {
        const s = this.scopes.slice();
        for (t = 0, n = s.length; t < n; t++) s[t].pause();
      }
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes) {
        const l = this.scopes.slice();
        for (t = 0, n = l.length; t < n; t++) l[t].resume();
      }
      const s = this.effects.slice();
      for (t = 0, n = s.length; t < n; t++) s[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Le;
      try {
        return (Le = this), t();
      } finally {
        Le = n;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = Le), (Le = this));
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Le === this) Le = this.prevScope;
      else {
        let t = Le;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        const l = this.scopes.slice();
        for (n = 0, s = l.length; n < s; n++) l[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const l = this.parent.scopes.pop();
        l &&
          l !== this &&
          ((this.parent.scopes[this.index] = l), (l.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function hr() {
  return Le;
}
let Oe;
const Os = new WeakSet();
class Vo {
  constructor(t) {
    (this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      Le && (Le.active ? Le.effects.push(this) : (this.flags &= -2));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Os.has(this) && (Os.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Uo(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    (this.flags |= 2), Nl(this), jo(this);
    const t = Oe,
      n = st;
    (Oe = this), (st = !0);
    try {
      return this.fn();
    } finally {
      Fo(this), (Oe = t), (st = n), (this.flags &= -3);
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) pl(t);
      (this.deps = this.depsTail = void 0),
        Nl(this),
        this.onStop && this.onStop(),
        (this.flags &= -2);
    }
  }
  trigger() {
    this.flags & 64
      ? Os.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    Hs(this) && this.run();
  }
  get dirty() {
    return Hs(this);
  }
}
let Lo = 0,
  wn,
  En;
function Uo(e, t = !1) {
  if (((e.flags |= 8), t)) {
    (e.next = En), (En = e);
    return;
  }
  (e.next = wn), (wn = e);
}
function dl() {
  Lo++;
}
function fl() {
  if (--Lo > 0) return;
  if (En) {
    let t = En;
    for (En = void 0; t; ) {
      const n = t.next;
      (t.next = void 0), (t.flags &= -9), (t = n);
    }
  }
  let e;
  for (; wn; ) {
    let t = wn;
    for (wn = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function jo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    (t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t);
}
function Fo(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const l = s.prevDep;
    s.version === -1 ? (s === n && (n = l), pl(s), vr(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = l);
  }
  (e.deps = t), (e.depsTail = n);
}
function Hs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Bo(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Bo(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Tn) ||
    ((e.globalVersion = Tn),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Hs(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    n = Oe,
    s = st;
  (Oe = e), (st = !0);
  try {
    jo(e);
    const l = e.fn(e._value);
    (t.version === 0 || ht(l, e._value)) &&
      ((e.flags |= 128), (e._value = l), t.version++);
  } catch (l) {
    throw (t.version++, l);
  } finally {
    (Oe = n), (st = s), Fo(e), (e.flags &= -3);
  }
}
function pl(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: l } = e;
  if (
    (s && ((s.nextSub = l), (e.prevSub = void 0)),
    l && ((l.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) pl(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function vr(e) {
  const { prevDep: t, nextDep: n } = e;
  t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0));
}
let st = !0;
const Ho = [];
function Tt() {
  Ho.push(st), (st = !1);
}
function Ot() {
  const e = Ho.pop();
  st = e === void 0 ? !0 : e;
}
function Nl(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = Oe;
    Oe = void 0;
    try {
      t();
    } finally {
      Oe = n;
    }
  }
}
let Tn = 0;
class mr {
  constructor(t, n) {
    (this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0);
  }
}
class hl {
  constructor(t) {
    (this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0);
  }
  track(t) {
    if (!Oe || !st || Oe === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Oe)
      (n = this.activeLink = new mr(Oe, this)),
        Oe.deps
          ? ((n.prevDep = Oe.depsTail),
            (Oe.depsTail.nextDep = n),
            (Oe.depsTail = n))
          : (Oe.deps = Oe.depsTail = n),
        Ko(n);
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      (s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = Oe.depsTail),
        (n.nextDep = void 0),
        (Oe.depsTail.nextDep = n),
        (Oe.depsTail = n),
        Oe.deps === n && (Oe.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Tn++, this.notify(t);
  }
  notify(t) {
    dl();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      fl();
    }
  }
}
function Ko(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Ko(s);
    }
    const n = e.dep.subs;
    n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e);
  }
}
const Ks = new WeakMap(),
  Yt = Symbol(""),
  Ws = Symbol(""),
  On = Symbol("");
function Fe(e, t, n) {
  if (st && Oe) {
    let s = Ks.get(e);
    s || Ks.set(e, (s = new Map()));
    let l = s.get(n);
    l || (s.set(n, (l = new hl())), (l.map = s), (l.key = n)), l.track();
  }
}
function kt(e, t, n, s, l, o) {
  const i = Ks.get(e);
  if (!i) {
    Tn++;
    return;
  }
  const a = (u) => {
    u && u.trigger();
  };
  if ((dl(), t === "clear")) i.forEach(a);
  else {
    const u = oe(e),
      d = u && al(n);
    if (u && n === "length") {
      const c = Number(s);
      i.forEach((f, y) => {
        (y === "length" || y === On || (!gt(y) && y >= c)) && a(f);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && a(i.get(n)), d && a(i.get(On)), t)
      ) {
        case "add":
          u ? d && a(i.get("length")) : (a(i.get(Yt)), Lt(e) && a(i.get(Ws)));
          break;
        case "delete":
          u || (a(i.get(Yt)), Lt(e) && a(i.get(Ws)));
          break;
        case "set":
          Lt(e) && a(i.get(Yt));
          break;
      }
  }
  fl();
}
function en(e) {
  const t = we(e);
  return t === e || (Fe(t, "iterate", On), et(e))
    ? t
    : yt(e)
      ? Ut(e)
        ? t.map((n) => jt(nt(n)))
        : t.map(jt)
      : t.map(nt);
}
function ms(e) {
  return Fe((e = we(e)), "iterate", On), e;
}
function ft(e, t) {
  return yt(e) ? jt(Ut(e) ? nt(t) : t) : nt(t);
}
const gr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Rs(this, Symbol.iterator, (e) => ft(this, e));
  },
  concat(...e) {
    return en(this).concat(...e.map((t) => (oe(t) ? en(t) : t)));
  },
  entries() {
    return Rs(this, "entries", (e) => ((e[1] = ft(this, e[1])), e));
  },
  every(e, t) {
    return _t(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return _t(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => ft(this, s)),
      arguments,
    );
  },
  find(e, t) {
    return _t(this, "find", e, t, (n) => ft(this, n), arguments);
  },
  findIndex(e, t) {
    return _t(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return _t(this, "findLast", e, t, (n) => ft(this, n), arguments);
  },
  findLastIndex(e, t) {
    return _t(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return _t(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return $s(this, "includes", e);
  },
  indexOf(...e) {
    return $s(this, "indexOf", e);
  },
  join(e) {
    return en(this).join(e);
  },
  lastIndexOf(...e) {
    return $s(this, "lastIndexOf", e);
  },
  map(e, t) {
    return _t(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return pn(this, "pop");
  },
  push(...e) {
    return pn(this, "push", e);
  },
  reduce(e, ...t) {
    return Ml(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ml(this, "reduceRight", e, t);
  },
  shift() {
    return pn(this, "shift");
  },
  some(e, t) {
    return _t(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return pn(this, "splice", e);
  },
  toReversed() {
    return en(this).toReversed();
  },
  toSorted(e) {
    return en(this).toSorted(e);
  },
  toSpliced(...e) {
    return en(this).toSpliced(...e);
  },
  unshift(...e) {
    return pn(this, "unshift", e);
  },
  values() {
    return Rs(this, "values", (e) => ft(this, e));
  },
};
function Rs(e, t, n) {
  const s = ms(e),
    l = s[t]();
  return (
    s !== e &&
      !et(e) &&
      ((l._next = l.next),
      (l.next = () => {
        const o = l._next();
        return o.done || (o.value = n(o.value)), o;
      })),
    l
  );
}
const yr = Array.prototype;
function _t(e, t, n, s, l, o) {
  const i = ms(e),
    a = i !== e && !et(e),
    u = i[t];
  if (u !== yr[t]) {
    const f = u.apply(e, o);
    return a ? nt(f) : f;
  }
  let d = n;
  i !== e &&
    (a
      ? (d = function (f, y) {
          return n.call(this, ft(e, f), y, e);
        })
      : n.length > 2 &&
        (d = function (f, y) {
          return n.call(this, f, y, e);
        }));
  const c = u.call(i, d, s);
  return a && l ? l(c) : c;
}
function Ml(e, t, n, s) {
  const l = ms(e),
    o = l !== e && !et(e);
  let i = n,
    a = !1;
  l !== e &&
    (o
      ? ((a = s.length === 0),
        (i = function (d, c, f) {
          return (
            a && ((a = !1), (d = ft(e, d))), n.call(this, d, ft(e, c), f, e)
          );
        }))
      : n.length > 3 &&
        (i = function (d, c, f) {
          return n.call(this, d, c, f, e);
        }));
  const u = l[t](i, ...s);
  return a ? ft(e, u) : u;
}
function $s(e, t, n) {
  const s = we(e);
  Fe(s, "iterate", On);
  const l = s[t](...n);
  return (l === -1 || l === !1) && gl(n[0])
    ? ((n[0] = we(n[0])), s[t](...n))
    : l;
}
function pn(e, t, n = []) {
  Tt(), dl();
  const s = we(e)[t].apply(e, n);
  return fl(), Ot(), s;
}
const br = il("__proto__,__v_isRef,__isVue"),
  Wo = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(gt),
  );
function _r(e) {
  gt(e) || (e = String(e));
  const t = we(this);
  return Fe(t, "has", e), t.hasOwnProperty(e);
}
class Go {
  constructor(t = !1, n = !1) {
    (this._isReadonly = t), (this._isShallow = n);
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const l = this._isReadonly,
      o = this._isShallow;
    if (n === "__v_isReactive") return !l;
    if (n === "__v_isReadonly") return l;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (l ? (o ? Rr : Xo) : o ? Jo : zo).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = oe(t);
    if (!l) {
      let u;
      if (i && (u = gr[n])) return u;
      if (n === "hasOwnProperty") return _r;
    }
    const a = Reflect.get(t, n, Ke(t) ? t : s);
    if ((gt(n) ? Wo.has(n) : br(n)) || (l || Fe(t, "get", n), o)) return a;
    if (Ke(a)) {
      const u = i && al(n) ? a : a.value;
      return l && ke(u) ? qs(u) : u;
    }
    return ke(a) ? (l ? qs(a) : gs(a)) : a;
  }
}
class qo extends Go {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, l) {
    let o = t[n];
    const i = oe(t) && al(n);
    if (!this._isShallow) {
      const d = yt(o);
      if (
        (!et(s) && !yt(s) && ((o = we(o)), (s = we(s))), !i && Ke(o) && !Ke(s))
      )
        return d || (o.value = s), !0;
    }
    const a = i ? Number(n) < t.length : Ee(t, n),
      u = Reflect.set(t, n, s, Ke(t) ? t : l);
    return (
      t === we(l) &&
        u &&
        (a ? ht(s, o) && kt(t, "set", n, s) : kt(t, "add", n, s)),
      u
    );
  }
  deleteProperty(t, n) {
    const s = Ee(t, n);
    t[n];
    const l = Reflect.deleteProperty(t, n);
    return l && s && kt(t, "delete", n, void 0), l;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!gt(n) || !Wo.has(n)) && Fe(t, "has", n), s;
  }
  ownKeys(t) {
    return Fe(t, "iterate", oe(t) ? "length" : Yt), Reflect.ownKeys(t);
  }
}
class wr extends Go {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Er = new qo(),
  Cr = new wr(),
  kr = new qo(!0);
const Gs = (e) => e,
  jn = (e) => Reflect.getPrototypeOf(e);
function xr(e, t, n) {
  return function (...s) {
    const l = this.__v_raw,
      o = we(l),
      i = Lt(o),
      a = e === "entries" || (e === Symbol.iterator && i),
      u = e === "keys" && i,
      d = l[e](...s),
      c = n ? Gs : t ? jt : nt;
    return (
      !t && Fe(o, "iterate", u ? Ws : Yt),
      Ue(Object.create(d), {
        next() {
          const { value: f, done: y } = d.next();
          return y
            ? { value: f, done: y }
            : { value: a ? [c(f[0]), c(f[1])] : c(f), done: y };
        },
      })
    );
  };
}
function Fn(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ar(e, t) {
  const n = {
    get(l) {
      const o = this.__v_raw,
        i = we(o),
        a = we(l);
      e || (ht(l, a) && Fe(i, "get", l), Fe(i, "get", a));
      const { has: u } = jn(i),
        d = t ? Gs : e ? jt : nt;
      if (u.call(i, l)) return d(o.get(l));
      if (u.call(i, a)) return d(o.get(a));
      o !== i && o.get(l);
    },
    get size() {
      const l = this.__v_raw;
      return !e && Fe(we(l), "iterate", Yt), l.size;
    },
    has(l) {
      const o = this.__v_raw,
        i = we(o),
        a = we(l);
      return (
        e || (ht(l, a) && Fe(i, "has", l), Fe(i, "has", a)),
        l === a ? o.has(l) : o.has(l) || o.has(a)
      );
    },
    forEach(l, o) {
      const i = this,
        a = i.__v_raw,
        u = we(a),
        d = t ? Gs : e ? jt : nt;
      return (
        !e && Fe(u, "iterate", Yt),
        a.forEach((c, f) => l.call(o, d(c), d(f), i))
      );
    },
  };
  return (
    Ue(
      n,
      e
        ? {
            add: Fn("add"),
            set: Fn("set"),
            delete: Fn("delete"),
            clear: Fn("clear"),
          }
        : {
            add(l) {
              const o = we(this),
                i = jn(o),
                a = we(l),
                u = !t && !et(l) && !yt(l) ? a : l;
              return (
                i.has.call(o, u) ||
                  (ht(l, u) && i.has.call(o, l)) ||
                  (ht(a, u) && i.has.call(o, a)) ||
                  (o.add(u), kt(o, "add", u, u)),
                this
              );
            },
            set(l, o) {
              !t && !et(o) && !yt(o) && (o = we(o));
              const i = we(this),
                { has: a, get: u } = jn(i);
              let d = a.call(i, l);
              d || ((l = we(l)), (d = a.call(i, l)));
              const c = u.call(i, l);
              return (
                i.set(l, o),
                d ? ht(o, c) && kt(i, "set", l, o) : kt(i, "add", l, o),
                this
              );
            },
            delete(l) {
              const o = we(this),
                { has: i, get: a } = jn(o);
              let u = i.call(o, l);
              u || ((l = we(l)), (u = i.call(o, l))), a && a.call(o, l);
              const d = o.delete(l);
              return u && kt(o, "delete", l, void 0), d;
            },
            clear() {
              const l = we(this),
                o = l.size !== 0,
                i = l.clear();
              return o && kt(l, "clear", void 0, void 0), i;
            },
          },
    ),
    ["keys", "values", "entries", Symbol.iterator].forEach((l) => {
      n[l] = xr(l, e, t);
    }),
    n
  );
}
function vl(e, t) {
  const n = Ar(e, t);
  return (s, l, o) =>
    l === "__v_isReactive"
      ? !e
      : l === "__v_isReadonly"
        ? e
        : l === "__v_raw"
          ? s
          : Reflect.get(Ee(n, l) && l in s ? n : s, l, o);
}
const Sr = { get: vl(!1, !1) },
  Tr = { get: vl(!1, !0) },
  Or = { get: vl(!0, !1) };
const zo = new WeakMap(),
  Jo = new WeakMap(),
  Xo = new WeakMap(),
  Rr = new WeakMap();
function $r(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function gs(e) {
  return yt(e) ? e : ml(e, !1, Er, Sr, zo);
}
function Yo(e) {
  return ml(e, !1, kr, Tr, Jo);
}
function qs(e) {
  return ml(e, !0, Cr, Or, Xo);
}
function ml(e, t, n, s, l) {
  if (
    !ke(e) ||
    (e.__v_raw && !(t && e.__v_isReactive)) ||
    e.__v_skip ||
    !Object.isExtensible(e)
  )
    return e;
  const o = l.get(e);
  if (o) return o;
  const i = $r(nr(e));
  if (i === 0) return e;
  const a = new Proxy(e, i === 2 ? s : n);
  return l.set(e, a), a;
}
function Ut(e) {
  return yt(e) ? Ut(e.__v_raw) : !!(e && e.__v_isReactive);
}
function yt(e) {
  return !!(e && e.__v_isReadonly);
}
function et(e) {
  return !!(e && e.__v_isShallow);
}
function gl(e) {
  return e ? !!e.__v_raw : !1;
}
function we(e) {
  const t = e && e.__v_raw;
  return t ? we(t) : e;
}
function Pr(e) {
  return (
    !Ee(e, "__v_skip") && Object.isExtensible(e) && Io(e, "__v_skip", !0), e
  );
}
const nt = (e) => (ke(e) ? gs(e) : e),
  jt = (e) => (ke(e) ? qs(e) : e);
function Ke(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function M(e) {
  return Qo(e, !1);
}
function Ir(e) {
  return Qo(e, !0);
}
function Qo(e, t) {
  return Ke(e) ? e : new Nr(e, t);
}
class Nr {
  constructor(t, n) {
    (this.dep = new hl()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : we(t)),
      (this._value = n ? t : nt(t)),
      (this.__v_isShallow = n);
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || et(t) || yt(t);
    (t = s ? t : we(t)),
      ht(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : nt(t)),
        this.dep.trigger());
  }
}
function mt(e) {
  return Ke(e) ? e.value : e;
}
const Mr = {
  get: (e, t, n) => (t === "__v_raw" ? e : mt(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const l = e[t];
    return Ke(l) && !Ke(n) ? ((l.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Zo(e) {
  return Ut(e) ? e : new Proxy(e, Mr);
}
class Dr {
  constructor(t, n, s) {
    (this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new hl(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Tn - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s);
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && Oe !== this))
      return Uo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Bo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Vr(e, t, n = !1) {
  let s, l;
  return ce(e) ? (s = e) : ((s = e.get), (l = e.set)), new Dr(s, l, n);
}
const Bn = {},
  Qn = new WeakMap();
let qt;
function Lr(e, t = !1, n = qt) {
  if (n) {
    let s = Qn.get(n);
    s || Qn.set(n, (s = [])), s.push(e);
  }
}
function Ur(e, t, n = Te) {
  const {
      immediate: s,
      deep: l,
      once: o,
      scheduler: i,
      augmentJob: a,
      call: u,
    } = n,
    d = (N) => (l ? N : et(N) || l === !1 || l === 0 ? xt(N, 1) : xt(N));
  let c,
    f,
    y,
    m,
    b = !1,
    C = !1;
  if (
    (Ke(e)
      ? ((f = () => e.value), (b = et(e)))
      : Ut(e)
        ? ((f = () => d(e)), (b = !0))
        : oe(e)
          ? ((C = !0),
            (b = e.some((N) => Ut(N) || et(N))),
            (f = () =>
              e.map((N) => {
                if (Ke(N)) return N.value;
                if (Ut(N)) return d(N);
                if (ce(N)) return u ? u(N, 2) : N();
              })))
          : ce(e)
            ? t
              ? (f = u ? () => u(e, 2) : e)
              : (f = () => {
                  if (y) {
                    Tt();
                    try {
                      y();
                    } finally {
                      Ot();
                    }
                  }
                  const N = qt;
                  qt = c;
                  try {
                    return u ? u(e, 3, [m]) : e(m);
                  } finally {
                    qt = N;
                  }
                })
            : (f = vt),
    t && l)
  ) {
    const N = f,
      J = l === !0 ? 1 / 0 : l;
    f = () => xt(N(), J);
  }
  const _ = hr(),
    E = () => {
      c.stop(), _ && _.active && rl(_.effects, c);
    };
  if (o && t) {
    const N = t;
    t = (...J) => {
      const se = N(...J);
      return E(), se;
    };
  }
  let k = C ? new Array(e.length).fill(Bn) : Bn;
  const x = (N) => {
    if (!(!(c.flags & 1) || (!c.dirty && !N)))
      if (t) {
        const J = c.run();
        if (N || l || b || (C ? J.some((se, q) => ht(se, k[q])) : ht(J, k))) {
          y && y();
          const se = qt;
          qt = c;
          try {
            const q = [J, k === Bn ? void 0 : C && k[0] === Bn ? [] : k, m];
            (k = J), u ? u(t, 3, q) : t(...q);
          } finally {
            qt = se;
          }
        }
      } else c.run();
  };
  return (
    a && a(x),
    (c = new Vo(f)),
    (c.scheduler = i ? () => i(x, !1) : x),
    (m = (N) => Lr(N, !1, c)),
    (y = c.onStop =
      () => {
        const N = Qn.get(c);
        if (N) {
          if (u) u(N, 4);
          else for (const J of N) J();
          Qn.delete(c);
        }
      }),
    t ? (s ? x(!0) : (k = c.run())) : i ? i(x.bind(null, !0), !0) : c.run(),
    (E.pause = c.pause.bind(c)),
    (E.resume = c.resume.bind(c)),
    (E.stop = E),
    E
  );
}
function xt(e, t = 1 / 0, n) {
  if (
    t <= 0 ||
    !ke(e) ||
    e.__v_skip ||
    ((n = n || new Map()), (n.get(e) || 0) >= t)
  )
    return e;
  if ((n.set(e, t), t--, Ke(e))) xt(e.value, t, n);
  else if (oe(e)) for (let s = 0; s < e.length; s++) xt(e[s], t, n);
  else if (St(e) || Lt(e))
    e.forEach((s) => {
      xt(s, t, n);
    });
  else if (Po(e)) {
    for (const s in e) xt(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && xt(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.43
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Vn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (l) {
    ys(l, t, n);
  }
}
function ot(e, t, n, s) {
  if (ce(e)) {
    const l = Vn(e, t, n, s);
    return (
      l &&
        Ro(l) &&
        l.catch((o) => {
          ys(o, t, n);
        }),
      l
    );
  }
  if (oe(e)) {
    const l = [];
    for (let o = 0; o < e.length; o++) l.push(ot(e[o], t, n, s));
    return l;
  }
}
function ys(e, t, n, s = !0) {
  const l = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || Te;
  if (t) {
    let a = t.parent;
    const u = t.proxy,
      d = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; a; ) {
      const c = a.ec;
      if (c) {
        for (let f = 0; f < c.length; f++) if (c[f](e, u, d) === !1) return;
      }
      a = a.parent;
    }
    if (o) {
      Tt(), Vn(o, null, 10, [e, u, d]), Ot();
      return;
    }
  }
  jr(e, n, l, s, i);
}
function jr(e, t, n, s = !0, l = !1) {
  if (l) throw e;
  console.error(e);
}
const ze = [];
let dt = -1;
const ln = [];
let Mt = null,
  nn = 0;
const ei = Promise.resolve();
let Zn = null;
function bs(e) {
  const t = Zn || ei;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fr(e) {
  let t = dt + 1,
    n = ze.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      l = ze[s],
      o = Rn(l);
    o < e || (o === e && l.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function yl(e) {
  if (!(e.flags & 1)) {
    const t = Rn(e),
      n = ze[ze.length - 1];
    !n || (!(e.flags & 2) && t >= Rn(n)) ? ze.push(e) : ze.splice(Fr(t), 0, e),
      (e.flags |= 1),
      ti();
  }
}
function ti() {
  Zn || (Zn = ei.then(si));
}
function Br(e) {
  if (!oe(e))
    Mt && e.id === -1
      ? Mt.splice(nn + 1, 0, e)
      : e.flags & 1 || (ln.push(e), (e.flags |= 1));
  else for (let t = 0; t < e.length; t++) ln.push(e[t]);
  ti();
}
function Dl(e, t, n = dt + 1) {
  for (; n < ze.length; n++) {
    const s = ze[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      ze.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2);
    }
  }
}
function ni(e) {
  if (ln.length) {
    const t = [...new Set(ln)].sort((n, s) => Rn(n) - Rn(s));
    if (((ln.length = 0), Mt)) {
      for (let n = 0; n < t.length; n++) Mt.push(t[n]);
      return;
    }
    for (Mt = t, nn = 0; nn < Mt.length; nn++) {
      const n = Mt[nn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2);
    }
    (Mt = null), (nn = 0);
  }
}
const Rn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function si(e) {
  try {
    for (dt = 0; dt < ze.length; dt++) {
      const t = ze[dt];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        Vn(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; dt < ze.length; dt++) {
      const t = ze[dt];
      t && (t.flags &= -2);
    }
    (dt = -1),
      (ze.length = 0),
      ni(),
      (Zn = null),
      (ze.length || ln.length) && si();
  }
}
let Ye = null,
  li = null;
function es(e) {
  const t = Ye;
  return (Ye = e), (li = (e && e.type.__scopeId) || null), t;
}
function je(e, t = Ye, n) {
  if (!t || e._n) return e;
  const s = (...l) => {
    s._d && ss(-1);
    const o = es(t),
      i = Qt.length;
    let a;
    try {
      a = e(...l);
    } finally {
      for (let u = Qt.length; u > i; u--) Pi();
      es(o), s._d && ss(1);
    }
    return a;
  };
  return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function ie(e, t) {
  if (Ye === null) return e;
  const n = ks(Ye),
    s = e.dirs || (e.dirs = []);
  for (let l = 0; l < t.length; l++) {
    let [o, i, a, u = Te] = t[l];
    o &&
      (ce(o) && (o = { mounted: o, updated: o }),
      o.deep && xt(i),
      s.push({
        dir: o,
        instance: n,
        value: i,
        oldValue: void 0,
        arg: a,
        modifiers: u,
      }));
  }
  return e;
}
function Kt(e, t, n, s) {
  const l = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < l.length; i++) {
    const a = l[i];
    o && (a.oldValue = o[i].value);
    let u = a.dir[s];
    u && (Tt(), ot(u, n, 8, [e.el, a, e, t]), Ot());
  }
}
function Jn(e, t) {
  if (He) {
    let n = He.provides;
    const s = He.parent && He.parent.provides;
    s === n && (n = He.provides = Object.create(s)), (n[e] = t);
  }
}
function tt(e, t, n = !1) {
  const s = La();
  if (s || on) {
    let l = on
      ? on._context.provides
      : s
        ? s.parent == null || s.ce
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return n && ce(t) ? t.call(s && s.proxy) : t;
  }
}
const Hr = Symbol.for("v-scx"),
  Kr = () => tt(Hr);
function Cn(e, t, n) {
  return oi(e, t, n);
}
function oi(e, t, n = Te) {
  const { immediate: s, deep: l, flush: o, once: i } = n,
    a = Ue({}, n),
    u = (t && s) || (!t && o !== "post");
  let d;
  if (In) {
    if (o === "sync") {
      const m = Kr();
      d = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!u) {
      const m = () => {};
      return (m.stop = vt), (m.resume = vt), (m.pause = vt), m;
    }
  }
  const c = He;
  a.call = (m, b, C) => ot(m, c, b, C);
  let f = !1;
  o === "post"
    ? (a.scheduler = (m) => {
        Ge(m, c && c.suspense);
      })
    : o !== "sync" &&
      ((f = !0),
      (a.scheduler = (m, b) => {
        b ? m() : yl(m);
      })),
    (a.augmentJob = (m) => {
      t && (m.flags |= 4),
        f && ((m.flags |= 2), c && ((m.id = c.uid), (m.i = c)));
    });
  const y = Ur(e, t, a);
  return In && (d ? d.push(y) : u && y()), y;
}
function Wr(e, t, n) {
  const s = this.proxy,
    l = Re(e) ? (e.includes(".") ? ii(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  ce(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Ln(this),
    a = oi(l, o.bind(s), n);
  return i(), a;
}
function ii(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let l = 0; l < n.length && s; l++) s = s[n[l]];
    return s;
  };
}
const Nt = new WeakMap(),
  ri = Symbol("_vte"),
  _s = (e) => e.__isTeleport,
  zt = (e) => e && (e.disabled || e.disabled === ""),
  Gr = (e) => e && (e.defer || e.defer === ""),
  Vl = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  Ll = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement,
  zs = (e, t) => {
    const n = e && e.to;
    return Re(n) ? (t ? t(n) : null) : n;
  },
  qr = {
    name: "Teleport",
    __isTeleport: !0,
    process(e, t, n, s, l, o, i, a, u, d) {
      const {
          mc: c,
          pc: f,
          pbc: y,
          o: {
            insert: m,
            querySelector: b,
            createText: C,
            createComment: _,
            parentNode: E,
          },
        } = d,
        k = zt(t.props);
      let { dynamicChildren: x } = t;
      const N = (q, le, z) => {
          q.shapeFlag & 16 && c(q.children, le, z, l, o, i, a, u);
        },
        J = (q = t) => {
          const le = zt(q.props),
            z = (q.target = zs(q.props, b)),
            O = Js(z, q, C, m);
          z &&
            (i !== "svg" && Vl(z)
              ? (i = "svg")
              : i !== "mathml" && Ll(z) && (i = "mathml"),
            l &&
              l.isCE &&
              (
                l.ce._teleportTargets || (l.ce._teleportTargets = new Set())
              ).add(z),
            le || (N(q, z, O), gn(q, !1)));
        },
        se = (q) => {
          const le = () => {
            if (Nt.get(q) === le) {
              if ((Nt.delete(q), zt(q.props))) {
                const z = E(q.el) || n;
                N(q, z, q.anchor), gn(q, !0);
              }
              J(q);
            }
          };
          Nt.set(q, le), Ge(le, o);
        };
      if (e == null) {
        const q = (t.el = C("")),
          le = (t.anchor = C(""));
        if ((m(q, n, s), m(le, n, s), Gr(t.props) || (o && o.pendingBranch))) {
          se(t);
          return;
        }
        k && (N(t, n, le), gn(t, !0)), J();
      } else {
        t.el = e.el;
        const q = (t.anchor = e.anchor),
          le = Nt.get(e);
        if (le) {
          (le.flags |= 8), Nt.delete(e), se(t);
          return;
        }
        t.targetStart = e.targetStart;
        const z = (t.target = e.target),
          O = (t.targetAnchor = e.targetAnchor),
          R = zt(e.props),
          Q = R ? n : z,
          re = R ? q : O;
        if (
          (i === "svg" || Vl(z)
            ? (i = "svg")
            : (i === "mathml" || Ll(z)) && (i = "mathml"),
          x
            ? (y(e.dynamicChildren, x, Q, l, o, i, a), Cl(e, t, !0))
            : u || f(e, t, Q, re, l, o, i, a, !1),
          k)
        )
          R
            ? t.props &&
              e.props &&
              t.props.to !== e.props.to &&
              (t.props.to = e.props.to)
            : Hn(t, n, q, d, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const pe = zs(t.props, b);
          pe && ((t.target = pe), Hn(t, pe, null, d, 0));
        } else R && Hn(t, z, O, d, 1);
        gn(t, k);
      }
    },
    remove(e, t, n, { um: s, o: { remove: l } }, o) {
      const {
          shapeFlag: i,
          children: a,
          anchor: u,
          targetStart: d,
          targetAnchor: c,
          target: f,
          props: y,
        } = e,
        m = zt(y),
        b = o || !m,
        C = Nt.get(e);
      if (
        (C && ((C.flags |= 8), Nt.delete(e)),
        f && (l(d), l(c)),
        o && l(u),
        !C && (m || f) && i & 16)
      )
        for (let _ = 0; _ < a.length; _++) {
          const E = a[_];
          s(E, t, n, b, !!E.dynamicChildren);
        }
    },
    move: Hn,
    hydrate: zr,
  };
function Hn(e, t, n, { o: { insert: s }, m: l }, o = 2) {
  o === 0 && s(e.targetAnchor, t, n);
  const { el: i, anchor: a, shapeFlag: u, children: d, props: c } = e,
    f = o === 2;
  if ((f && s(i, t, n), !Nt.has(e) && (!f || zt(c)) && u & 16))
    for (let y = 0; y < d.length; y++) l(d[y], t, n, 2);
  f && s(a, t, n);
}
function zr(
  e,
  t,
  n,
  s,
  l,
  o,
  {
    o: {
      nextSibling: i,
      parentNode: a,
      querySelector: u,
      insert: d,
      createText: c,
    },
  },
  f,
) {
  function y(_, E) {
    let k = E;
    for (; k; ) {
      if (k && k.nodeType === 8) {
        if (k.data === "teleport start anchor") t.targetStart = k;
        else if (k.data === "teleport anchor") {
          (t.targetAnchor = k), (_._lpa = t.targetAnchor && i(t.targetAnchor));
          break;
        }
      }
      k = i(k);
    }
  }
  function m(_, E) {
    E.anchor = f(i(_), E, a(_), n, s, l, o);
  }
  const b = (t.target = zs(t.props, u)),
    C = zt(t.props);
  if (b) {
    const _ = b._lpa || b.firstChild;
    t.shapeFlag & 16 &&
      (C
        ? (m(e, t),
          y(b, _),
          t.targetAnchor || Js(b, t, c, d, a(e) === b ? e : null))
        : ((t.anchor = i(e)),
          y(b, _),
          t.targetAnchor || Js(b, t, c, d),
          f(_ && i(_), t, b, n, s, l, o))),
      gn(t, C);
  } else
    C &&
      t.shapeFlag & 16 &&
      (m(e, t), (t.targetStart = e), (t.targetAnchor = i(e)));
  return t.anchor && i(t.anchor);
}
const Cv = qr;
function gn(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, l;
    for (
      t
        ? ((s = e.el), (l = e.anchor))
        : ((s = e.targetStart), (l = e.targetAnchor));
      s && s !== l;

    )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid),
        (s = s.nextSibling);
    n.ut();
  }
}
function Js(e, t, n, s, l = null) {
  const o = (t.targetStart = n("")),
    i = (t.targetAnchor = n(""));
  return (o[ri] = i), e && (s(o, e, l), s(i, e, l)), i;
}
const Ps = Symbol("_leaveCb");
function Jr(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e)
      if (n.type !== Rt) {
        t = n;
        break;
      }
  }
  return t;
}
function ai(e) {
  if (!_l(e)) return _s(e.type) && e.children ? Jr(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && ce(n.default)) return n.default();
  }
}
function bl(e, t) {
  if (e.shapeFlag & 6 && e.component) {
    e.transition = t;
    const n = e.component.subTree;
    bl((_s(n.type) && ai(n)) || n, t);
  } else
    e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function ui(e, t) {
  return ce(e) ? Ue({ name: e.name }, t, { setup: e }) : e;
}
function ci(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ul(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const ts = new WeakMap();
function kn(e, t, n, s, l = !1) {
  if (oe(e)) {
    e.forEach((C, _) => kn(C, t && (oe(t) ? t[_] : t), n, s, l));
    return;
  }
  if (xn(s) && !l) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      kn(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? ks(s.component) : s.el,
    i = l ? null : o,
    { i: a, r: u } = e,
    d = t && t.r,
    c = a.refs === Te ? (a.refs = {}) : a.refs,
    f = a.setupState,
    y = we(f),
    m = f === Te ? Oo : (C) => (Ul(c, C) ? !1 : Ee(y, C)),
    b = (C, _) => !(_ && Ul(c, _));
  if (d != null && d !== u) {
    if ((jl(t), Re(d))) (c[d] = null), m(d) && (f[d] = null);
    else if (Ke(d)) {
      const C = t;
      b(d, C.k) && (d.value = null), C.k && (c[C.k] = null);
    }
  }
  if (ce(u)) Vn(u, a, 12, [i, c]);
  else {
    const C = Re(u),
      _ = Ke(u);
    if (C || _) {
      const E = () => {
        if (e.f) {
          const k = C ? (m(u) ? f[u] : c[u]) : b() || !e.k ? u.value : c[e.k];
          if (l) oe(k) && rl(k, o);
          else if (oe(k)) k.includes(o) || k.push(o);
          else if (C) (c[u] = [o]), m(u) && (f[u] = c[u]);
          else {
            const x = [o];
            b(u, e.k) && (u.value = x), e.k && (c[e.k] = x);
          }
        } else
          C
            ? ((c[u] = i), m(u) && (f[u] = i))
            : _ && (b(u, e.k) && (u.value = i), e.k && (c[e.k] = i));
      };
      if (i) {
        const k = () => {
          E(), ts.delete(e);
        };
        (k.id = -1), ts.set(e, k), Ge(k, n);
      } else jl(e), E();
    }
  }
}
function jl(e) {
  const t = ts.get(e);
  t && ((t.flags |= 8), ts.delete(e));
}
vs().requestIdleCallback;
vs().cancelIdleCallback;
const xn = (e) => !!e.type.__asyncLoader,
  _l = (e) => e.type.__isKeepAlive;
function Xr(e, t) {
  di(e, "a", t);
}
function Yr(e, t) {
  di(e, "da", t);
}
function di(e, t, n = He) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let l = n;
      for (; l; ) {
        if (l.isDeactivated) return;
        l = l.parent;
      }
      return e();
    });
  if ((ws(t, s, n), n)) {
    let l = n.parent;
    for (; l && l.parent; )
      _l(l.parent.vnode) && Qr(s, t, n, l), (l = l.parent);
  }
}
function Qr(e, t, n, s) {
  const l = ws(t, e, s, !0);
  fi(() => {
    rl(s[t], l);
  }, n);
}
function ws(e, t, n = He, s = !1) {
  if (n) {
    const l = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          Tt();
          const a = Ln(n),
            u = ot(t, n, e, i);
          return a(), Ot(), u;
        });
    return s ? l.unshift(o) : l.push(o), o;
  }
}
const $t =
    (e) =>
    (t, n = He) => {
      (!In || e === "sp") && ws(e, (...s) => t(...s), n);
    },
  Zr = $t("bm"),
  bt = $t("m"),
  ea = $t("bu"),
  ta = $t("u"),
  Zt = $t("bum"),
  fi = $t("um"),
  na = $t("sp"),
  sa = $t("rtg"),
  la = $t("rtc");
function oa(e, t = He) {
  ws("ec", e, t);
}
const pi = "components";
function Xs(e, t) {
  return vi(pi, e, !0, t) || e;
}
const hi = Symbol.for("v-ndc");
function kv(e) {
  return Re(e) ? vi(pi, e, !1) || e : e || hi;
}
function vi(e, t, n = !0, s = !1) {
  const l = Ye || He;
  if (l) {
    const o = l.type;
    {
      const a = Ha(o, !1);
      if (a && (a === t || a === Je(t) || a === ps(Je(t)))) return o;
    }
    const i = Fl(l[e] || o[e], t) || Fl(l.appContext[e], t);
    return !i && s ? o : i;
  }
}
function Fl(e, t) {
  return e && (e[t] || e[Je(t)] || e[ps(Je(t))]);
}
function Be(e, t, n, s) {
  let l;
  const o = n,
    i = oe(e);
  if (i || Re(e)) {
    const a = i && Ut(e);
    let u = !1,
      d = !1;
    a && ((u = !et(e)), (d = yt(e)), (e = ms(e))), (l = new Array(e.length));
    for (let c = 0, f = e.length; c < f; c++)
      l[c] = t(u ? (d ? jt(nt(e[c])) : nt(e[c])) : e[c], c, void 0, o);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let a = 0; a < e; a++) l[a] = t(a + 1, a, void 0, o);
  } else if (ke(e))
    if (e[Symbol.iterator]) l = Array.from(e, (a, u) => t(a, u, void 0, o));
    else {
      const a = Object.keys(e);
      l = new Array(a.length);
      for (let u = 0, d = a.length; u < d; u++) {
        const c = a[u];
        l[u] = t(e[c], c, u, o);
      }
    }
  else l = [];
  return l;
}
const Ys = (e) => (e ? (Mi(e) ? ks(e) : Ys(e.parent)) : null),
  An = Ue(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ys(e.parent),
    $root: (e) => Ys(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => gi(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        yl(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = bs.bind(e.proxy)),
    $watch: (e) => Wr.bind(e),
  }),
  Is = (e, t) => e !== Te && !e.__isScriptSetup && Ee(e, t),
  ia = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: s,
        data: l,
        props: o,
        accessCache: i,
        type: a,
        appContext: u,
      } = e;
      if (t[0] !== "$") {
        const y = i[t];
        if (y !== void 0)
          switch (y) {
            case 1:
              return s[t];
            case 2:
              return l[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Is(s, t)) return (i[t] = 1), s[t];
          if (l !== Te && Ee(l, t)) return (i[t] = 2), l[t];
          if (Ee(o, t)) return (i[t] = 3), o[t];
          if (n !== Te && Ee(n, t)) return (i[t] = 4), n[t];
          Qs && (i[t] = 0);
        }
      }
      const d = An[t];
      let c, f;
      if (d) return t === "$attrs" && Fe(e.attrs, "get", ""), d(e);
      if ((c = a.__cssModules) && (c = c[t])) return c;
      if (n !== Te && Ee(n, t)) return (i[t] = 4), n[t];
      if (((f = u.config.globalProperties), Ee(f, t))) return f[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: l, ctx: o } = e;
      return Is(l, t)
        ? ((l[t] = n), !0)
        : s !== Te && Ee(s, t)
          ? ((s[t] = n), !0)
          : Ee(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: l,
          props: o,
          type: i,
        },
      },
      a,
    ) {
      let u;
      return !!(
        n[a] ||
        (e !== Te && a[0] !== "$" && Ee(e, a)) ||
        Is(t, a) ||
        Ee(o, a) ||
        Ee(s, a) ||
        Ee(An, a) ||
        Ee(l.config.globalProperties, a) ||
        ((u = i.__cssModules) && u[a])
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Ee(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Bl(e) {
  return oe(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Qs = !0;
function ra(e) {
  const t = gi(e),
    n = e.proxy,
    s = e.ctx;
  (Qs = !1), t.beforeCreate && Hl(t.beforeCreate, e, "bc");
  const {
    data: l,
    computed: o,
    methods: i,
    watch: a,
    provide: u,
    inject: d,
    created: c,
    beforeMount: f,
    mounted: y,
    beforeUpdate: m,
    updated: b,
    activated: C,
    deactivated: _,
    beforeDestroy: E,
    beforeUnmount: k,
    destroyed: x,
    unmounted: N,
    render: J,
    renderTracked: se,
    renderTriggered: q,
    errorCaptured: le,
    serverPrefetch: z,
    expose: O,
    inheritAttrs: R,
    components: Q,
    directives: re,
    filters: pe,
  } = t;
  if ((d && aa(d, s, null), i))
    for (const j in i) {
      const F = i[j];
      ce(F) && (s[j] = F.bind(n));
    }
  if (l) {
    const j = l.call(n, n);
    ke(j) && (e.data = gs(j));
  }
  if (((Qs = !0), o))
    for (const j in o) {
      const F = o[j],
        Z = ce(F) ? F.bind(n, n) : ce(F.get) ? F.get.bind(n, n) : vt,
        me = !ce(F) && ce(F.set) ? F.set.bind(n) : vt,
        ge = De({ get: Z, set: me });
      Object.defineProperty(s, j, {
        enumerable: !0,
        configurable: !0,
        get: () => ge.value,
        set: (Ce) => (ge.value = Ce),
      });
    }
  if (a) for (const j in a) mi(a[j], s, n, j);
  if (u) {
    const j = ce(u) ? u.call(n) : u;
    Reflect.ownKeys(j).forEach((F) => {
      Jn(F, j[F]);
    });
  }
  c && Hl(c, e, "c");
  function te(j, F) {
    oe(F) ? F.forEach((Z) => j(Z.bind(n))) : F && j(F.bind(n));
  }
  if (
    (te(Zr, f),
    te(bt, y),
    te(ea, m),
    te(ta, b),
    te(Xr, C),
    te(Yr, _),
    te(oa, le),
    te(la, se),
    te(sa, q),
    te(Zt, k),
    te(fi, N),
    te(na, z),
    oe(O))
  )
    if (O.length) {
      const j = e.exposed || (e.exposed = {});
      O.forEach((F) => {
        Object.defineProperty(j, F, {
          get: () => n[F],
          set: (Z) => (n[F] = Z),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  J && e.render === vt && (e.render = J),
    R != null && (e.inheritAttrs = R),
    Q && (e.components = Q),
    re && (e.directives = re),
    z && ci(e);
}
function aa(e, t, n = vt) {
  oe(e) && (e = Zs(e));
  for (const s in e) {
    const l = e[s];
    let o;
    ke(l)
      ? "default" in l
        ? (o = tt(l.from || s, l.default, !0))
        : (o = tt(l.from || s))
      : (o = tt(l)),
      Ke(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o);
  }
}
function Hl(e, t, n) {
  ot(oe(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function mi(e, t, n, s) {
  let l = s.includes(".") ? ii(n, s) : () => n[s];
  if (Re(e)) {
    const o = t[e];
    ce(o) && Cn(l, o);
  } else if (ce(e)) Cn(l, e.bind(n));
  else if (ke(e))
    if (oe(e)) e.forEach((o) => mi(o, t, n, s));
    else {
      const o = ce(e.handler) ? e.handler.bind(n) : t[e.handler];
      ce(o) && Cn(l, o, e);
    }
}
function gi(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: l,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    a = o.get(t);
  let u;
  return (
    a
      ? (u = a)
      : !l.length && !n && !s
        ? (u = t)
        : ((u = {}),
          l.length && l.forEach((d) => ns(u, d, i, !0)),
          ns(u, t, i)),
    ke(t) && o.set(t, u),
    u
  );
}
function ns(e, t, n, s = !1) {
  const { mixins: l, extends: o } = t;
  o && ns(e, o, n, !0), l && l.forEach((i) => ns(e, i, n, !0));
  for (const i in t)
    if (!(s && i === "expose")) {
      const a = ua[i] || (n && n[i]);
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const ua = {
  data: Kl,
  props: Wl,
  emits: Wl,
  methods: yn,
  computed: yn,
  beforeCreate: We,
  created: We,
  beforeMount: We,
  mounted: We,
  beforeUpdate: We,
  updated: We,
  beforeDestroy: We,
  beforeUnmount: We,
  destroyed: We,
  unmounted: We,
  activated: We,
  deactivated: We,
  errorCaptured: We,
  serverPrefetch: We,
  components: yn,
  directives: yn,
  watch: da,
  provide: Kl,
  inject: ca,
};
function Kl(e, t) {
  return t
    ? e
      ? function () {
          return Ue(
            ce(e) ? e.call(this, this) : e,
            ce(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function ca(e, t) {
  return yn(Zs(e), Zs(t));
}
function Zs(e) {
  if (oe(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function We(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function yn(e, t) {
  return e ? Ue(Object.create(null), e, t) : t;
}
function Wl(e, t) {
  return e
    ? oe(e) && oe(t)
      ? [...new Set([...e, ...t])]
      : Ue(Object.create(null), Bl(e), Bl(t ?? {}))
    : t;
}
function da(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ue(Object.create(null), e);
  for (const s in t) n[s] = We(e[s], t[s]);
  return n;
}
function yi() {
  return {
    app: null,
    config: {
      isNativeTag: Oo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let fa = 0;
function pa(e, t) {
  return function (s, l = null) {
    ce(s) || (s = Ue({}, s)), l != null && !ke(l) && (l = null);
    const o = yi(),
      i = new WeakSet(),
      a = [];
    let u = !1;
    const d = (o.app = {
      _uid: fa++,
      _component: s,
      _props: l,
      _container: null,
      _context: o,
      _instance: null,
      version: Wa,
      get config() {
        return o.config;
      },
      set config(c) {},
      use(c, ...f) {
        return (
          i.has(c) ||
            (c && ce(c.install)
              ? (i.add(c), c.install(d, ...f))
              : ce(c) && (i.add(c), c(d, ...f))),
          d
        );
      },
      mixin(c) {
        return o.mixins.includes(c) || o.mixins.push(c), d;
      },
      component(c, f) {
        return f ? ((o.components[c] = f), d) : o.components[c];
      },
      directive(c, f) {
        return f ? ((o.directives[c] = f), d) : o.directives[c];
      },
      mount(c, f, y) {
        if (!u) {
          const m = d._ceVNode || ve(s, l);
          return (
            (m.appContext = o),
            y === !0 ? (y = "svg") : y === !1 && (y = void 0),
            e(m, c, y),
            (u = !0),
            (d._container = c),
            (c.__vue_app__ = d),
            ks(m.component)
          );
        }
      },
      onUnmount(c) {
        a.push(c);
      },
      unmount() {
        u &&
          (ot(a, d._instance, 16),
          e(null, d._container),
          delete d._container.__vue_app__);
      },
      provide(c, f) {
        return (o.provides[c] = f), d;
      },
      runWithContext(c) {
        const f = on;
        on = d;
        try {
          return c();
        } finally {
          on = f;
        }
      },
    });
    return d;
  };
}
let on = null;
const ha = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Ht(t)}Modifiers`];
function va(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || Te;
  let l = n;
  const o = t.startsWith("update:"),
    i = o && ha(s, t.slice(7));
  i &&
    (i.trim && (l = n.map((c) => (Re(c) ? c.trim() : c))),
    i.number && (l = l.map(hs)));
  let a,
    u = s[(a = Ss(t))] || s[(a = Ss(Je(t)))];
  !u && o && (u = s[(a = Ss(Ht(t)))]), u && ot(u, e, 6, l);
  const d = s[a + "Once"];
  if (d) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), ot(d, e, 6, l);
  }
}
const ma = new WeakMap();
function bi(e, t, n = !1) {
  const s = n ? ma : t.emitsCache,
    l = s.get(e);
  if (l !== void 0) return l;
  const o = e.emits;
  let i = {},
    a = !1;
  if (!ce(e)) {
    const u = (d) => {
      const c = bi(d, t, !0);
      c && ((a = !0), Ue(i, c));
    };
    !n && t.mixins.length && t.mixins.forEach(u),
      e.extends && u(e.extends),
      e.mixins && e.mixins.forEach(u);
  }
  return !o && !a
    ? (ke(e) && s.set(e, null), null)
    : (oe(o) ? o.forEach((u) => (i[u] = null)) : Ue(i, o),
      ke(e) && s.set(e, i),
      i);
}
function Es(e, t) {
  return !e || !cs(t)
    ? !1
    : ((t = t.slice(2)),
      (t = t === "Once" ? t : t.replace(/Once$/, "")),
      Ee(e, t[0].toLowerCase() + t.slice(1)) || Ee(e, Ht(t)) || Ee(e, t));
}
function Gl(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: l,
      propsOptions: [o],
      slots: i,
      attrs: a,
      emit: u,
      render: d,
      renderCache: c,
      props: f,
      data: y,
      setupState: m,
      ctx: b,
      inheritAttrs: C,
    } = e,
    _ = es(e);
  let E, k;
  try {
    if (n.shapeFlag & 4) {
      const N = l || s,
        J = N;
      (E = pt(d.call(J, N, c, f, m, y, b))), (k = a);
    } else {
      const N = t;
      (E = pt(
        N.length > 1 ? N(f, { attrs: a, slots: i, emit: u }) : N(f, null))),
        (k = t.props ? a : ga(a));
    }
  } catch (N) {
    (Qt.length = 0), ys(N, e, 1), (E = ve(Rt));
  }
  let x = E;
  if (k && C !== !1) {
    const N = Object.keys(k),
      { shapeFlag: J } = x;
    N.length &&
      J & 7 &&
      (o && N.some(ds) && (k = ya(k, o)), (x = rn(x, k, !1, !0)));
  }
  if (
    (n.dirs &&
      ((x = rn(x, null, !1, !0)),
      (x.dirs = x.dirs ? x.dirs.concat(n.dirs) : n.dirs)),
    n.transition)
  ) {
    const N = (_s(x.type) && ai(x)) || x;
    bl(N, n.transition);
  }
  return (E = x), es(_), E;
}
const ga = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || cs(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  ya = (e, t) => {
    const n = {};
    for (const s in e) (!ds(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function ba(e, t, n) {
  const { props: s, children: l, component: o } = e,
    { props: i, children: a, patchFlag: u } = t,
    d = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16) return s ? ql(s, i, d) : !!i;
    if (u & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const y = c[f];
        if (_i(i, s, y) && !Es(d, y)) return !0;
      }
    }
  } else
    return (l || a) && (!a || !a.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? ql(s, i, d)
            : !0
          : !!i;
  return !1;
}
function ql(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < s.length; l++) {
    const o = s[l];
    if (_i(t, e, o) && !Es(n, o)) return !0;
  }
  return !1;
}
function _i(e, t, n) {
  const s = e[n],
    l = t[n];
  return n === "style" && ke(s) && ke(l) ? !lt(s, l) : s !== l;
}
function _a({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const l = t.subTree;
    if (
      (l.suspense &&
        l.suspense.activeBranch === e &&
        ((l.suspense.vnode.el = l.el = s), (e = l)),
      l === e)
    )
      ((e = t.vnode).el = s), (t = t.parent);
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const wi = {},
  Ei = () => Object.create(wi),
  Ci = (e) => Object.getPrototypeOf(e) === wi;
function wa(e, t, n, s = !1) {
  const l = {},
    o = Ei();
  (e.propsDefaults = Object.create(null)), ki(e, t, l, o);
  for (const i in e.propsOptions[0]) i in l || (l[i] = void 0);
  n ? (e.props = s ? l : Yo(l)) : e.type.props ? (e.props = l) : (e.props = o),
    (e.attrs = o);
}
function Ea(e, t, n, s) {
  const {
      props: l,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    a = we(l),
    [u] = e.propsOptions;
  let d = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let y = c[f];
        if (Es(e.emitsOptions, y)) continue;
        const m = t[y];
        if (u)
          if (Ee(o, y)) m !== o[y] && ((o[y] = m), (d = !0));
          else {
            const b = Je(y);
            l[b] = el(u, a, b, m, e, !1);
          }
        else m !== o[y] && ((o[y] = m), (d = !0));
      }
    }
  } else {
    ki(e, t, l, o) && (d = !0);
    let c;
    for (const f in a)
      (!t || (!Ee(t, f) && ((c = Ht(f)) === f || !Ee(t, c)))) &&
        (u
          ? n &&
            (n[f] !== void 0 || n[c] !== void 0) &&
            (l[f] = el(u, a, f, void 0, e, !0))
          : delete l[f]);
    if (o !== a)
      for (const f in o) (!t || !Ee(t, f)) && (delete o[f], (d = !0));
  }
  d && kt(e.attrs, "set", "");
}
function ki(e, t, n, s) {
  const [l, o] = e.propsOptions;
  let i = !1,
    a;
  if (t)
    for (let u in t) {
      if (_n(u)) continue;
      const d = t[u];
      let c;
      l && Ee(l, (c = Je(u)))
        ? !o || !o.includes(c)
          ? (n[c] = d)
          : ((a || (a = {}))[c] = d)
        : Es(e.emitsOptions, u) ||
          ((!(u in s) || d !== s[u]) && ((s[u] = d), (i = !0)));
    }
  if (o) {
    const u = we(n),
      d = a || Te;
    for (let c = 0; c < o.length; c++) {
      const f = o[c];
      n[f] = el(l, u, f, d[f], e, !Ee(d, f));
    }
  }
  return i;
}
function el(e, t, n, s, l, o) {
  const i = e[n];
  if (i != null) {
    const a = Ee(i, "default");
    if (a && s === void 0) {
      const u = i.default;
      if (i.type !== Function && !i.skipFactory && ce(u)) {
        const { propsDefaults: d } = l;
        if (n in d) s = d[n];
        else {
          const c = Ln(l);
          (s = d[n] = u.call(null, t)), c();
        }
      } else s = u;
      l.ce && l.ce._setProp(n, s);
    }
    i[0] &&
      (o && !a ? (s = !1) : i[1] && (s === "" || s === Ht(n)) && (s = !0));
  }
  return s;
}
const Ca = new WeakMap();
function xi(e, t, n = !1) {
  const s = n ? Ca : t.propsCache,
    l = s.get(e);
  if (l) return l;
  const o = e.props,
    i = {},
    a = [];
  let u = !1;
  if (!ce(e)) {
    const c = (f) => {
      u = !0;
      const [y, m] = xi(f, t, !0);
      Ue(i, y), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!o && !u) return ke(e) && s.set(e, Jt), Jt;
  if (oe(o))
    for (let c = 0; c < o.length; c++) {
      const f = Je(o[c]);
      zl(f) && (i[f] = Te);
    }
  else if (o)
    for (const c in o) {
      const f = Je(c);
      if (zl(f)) {
        const y = o[c],
          m = (i[f] = oe(y) || ce(y) ? { type: y } : Ue({}, y)),
          b = m.type;
        let C = !1,
          _ = !0;
        if (oe(b))
          for (let E = 0; E < b.length; ++E) {
            const k = b[E],
              x = ce(k) && k.name;
            if (x === "Boolean") {
              C = !0;
              break;
            } else x === "String" && (_ = !1);
          }
        else C = ce(b) && b.name === "Boolean";
        (m[0] = C), (m[1] = _), (C || Ee(m, "default")) && a.push(f);
      }
    }
  const d = [i, a];
  return ke(e) && s.set(e, d), d;
}
function zl(e) {
  return e[0] !== "$" && !_n(e);
}
const wl = (e) => e === "_" || e === "_ctx" || e === "$stable",
  El = (e) => (oe(e) ? e.map(pt) : [pt(e)]),
  ka = (e, t, n) => {
    if (t._n) return t;
    const s = je((...l) => El(t(...l)), n);
    return (s._c = !1), s;
  },
  Ai = (e, t, n) => {
    const s = e._ctx;
    for (const l in e) {
      if (wl(l)) continue;
      const o = e[l];
      if (ce(o)) t[l] = ka(l, o, s);
      else if (o != null) {
        const i = El(o);
        t[l] = () => i;
      }
    }
  },
  Si = (e, t) => {
    const n = El(t);
    e.slots.default = () => n;
  },
  Ti = (e, t, n) => {
    for (const s in t) (n || !wl(s)) && (e[s] = t[s]);
  },
  xa = (e, t, n) => {
    const s = (e.slots = Ei());
    if (e.vnode.shapeFlag & 32) {
      const l = t._;
      l ? (Ti(s, t, n), n && Io(s, "_", l, !0)) : Ai(t, s);
    } else t && Si(e, t);
  },
  Aa = (e, t, n) => {
    const { vnode: s, slots: l } = e;
    let o = !0,
      i = Te;
    if (s.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (o = !1)
          : Ti(l, t, n)
        : ((o = !t.$stable), Ai(t, l)),
        (i = t);
    } else t && (Si(e, t), (i = { default: 1 }));
    if (o) for (const a in l) !wl(a) && i[a] == null && delete l[a];
  },
  Ge = $a;
function Sa(e) {
  return Ta(e);
}
function Ta(e, t) {
  const n = vs();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: l,
      patchProp: o,
      createElement: i,
      createText: a,
      createComment: u,
      setText: d,
      setElementText: c,
      parentNode: f,
      nextSibling: y,
      setScopeId: m = vt,
      insertStaticContent: b,
    } = e,
    C = (
      p,
      g,
      h,
      v = null,
      T = null,
      S = null,
      U = void 0,
      L = null,
      D = !!g.dynamicChildren,
    ) => {
      if (p === g) return;
      p && !hn(p, g) && ((v = P(p)), Ce(p, T, S, !0), (p = null)),
        g.patchFlag === -2 && ((D = !1), (g.dynamicChildren = null)),
        g.dynamicChildren &&
          p &&
          p.dynamicChildren &&
          p.dynamicChildren.hasOnce &&
          (g.dynamicChildren === Jt && (g.dynamicChildren = []),
          (g.dynamicChildren.hasOnce = !0));
      const { type: w, ref: X, shapeFlag: G } = g;
      switch (w) {
        case Cs:
          _(p, g, h, v);
          break;
        case Rt:
          E(p, g, h, v);
          break;
        case Xn:
          p == null && k(g, h, v, U);
          break;
        case he:
          Q(p, g, h, v, T, S, U, L, D);
          break;
        default:
          G & 1
            ? J(p, g, h, v, T, S, U, L, D)
            : G & 6
              ? re(p, g, h, v, T, S, U, L, D)
              : (G & 64 || G & 128) && w.process(p, g, h, v, T, S, U, L, D, ee);
      }
      X != null && T
        ? kn(X, p && p.ref, S, g || p, !g)
        : X == null && p && p.ref != null && kn(p.ref, null, S, p, !0);
    },
    _ = (p, g, h, v) => {
      if (p == null) s((g.el = a(g.children)), h, v);
      else {
        const T = (g.el = p.el);
        g.children !== p.children && d(T, g.children);
      }
    },
    E = (p, g, h, v) => {
      p == null ? s((g.el = u(g.children || "")), h, v) : (g.el = p.el);
    },
    k = (p, g, h, v) => {
      [p.el, p.anchor] = b(p.children, g, h, v, p.el, p.anchor);
    },
    x = ({ el: p, anchor: g }, h, v) => {
      let T;
      for (; p && p !== g; ) (T = y(p)), s(p, h, v), (p = T);
      s(g, h, v);
    },
    N = ({ el: p, anchor: g }) => {
      let h;
      for (; p && p !== g; ) (h = y(p)), l(p), (p = h);
      l(g);
    },
    J = (p, g, h, v, T, S, U, L, D) => {
      if (
        (g.type === "svg" ? (U = "svg") : g.type === "math" && (U = "mathml"),
        p == null)
      )
        se(g, h, v, T, S, U, L, D);
      else {
        const w = p.el && p.el._isVueCE ? p.el : null;
        try {
          w && w._beginPatch(), z(p, g, T, S, U, L, D);
        } finally {
          w && w._endPatch();
        }
      }
    },
    se = (p, g, h, v, T, S, U, L) => {
      let D, w;
      const { props: X, shapeFlag: G, transition: ne, dirs: ae } = p;
      if (
        ((D = p.el = i(p.type, S, X && X.is, X)),
        G & 8
          ? c(D, p.children)
          : G & 16 && le(p.children, D, null, v, T, Ns(p, S), U, L),
        ae && Kt(p, null, v, "created"),
        q(D, p, p.scopeId, U, v),
        X)
      ) {
        for (const Ae in X)
          Ae !== "value" && !_n(Ae) && o(D, Ae, null, X[Ae], S, v);
        "value" in X && o(D, "value", null, X.value, S),
          (w = X.onVnodeBeforeMount) && ct(w, v, p);
      }
      ae && Kt(p, null, v, "beforeMount");
      const be = Oa(T, ne);
      be && ne.beforeEnter(D),
        s(D, g, h),
        ((w = X && X.onVnodeMounted) || be || ae) &&
          Ge(() => {
            try {
              w && ct(w, v, p),
                be && ne.enter(D),
                ae && Kt(p, null, v, "mounted");
            } finally {
            }
          }, T);
    },
    q = (p, g, h, v, T) => {
      if ((h && m(p, h), v)) for (let S = 0; S < v.length; S++) m(p, v[S]);
      if (T) {
        let S = T.subTree;
        if (
          g === S ||
          ($i(S.type) && (S.ssContent === g || S.ssFallback === g))
        ) {
          const U = T.vnode;
          q(p, U, U.scopeId, U.slotScopeIds, T.parent);
        }
      }
    },
    le = (p, g, h, v, T, S, U, L, D = 0) => {
      for (let w = D; w < p.length; w++) {
        const X = (p[w] = L ? Ct(p[w]) : pt(p[w]));
        C(null, X, g, h, v, T, S, U, L);
      }
    },
    z = (p, g, h, v, T, S, U) => {
      const L = (g.el = p.el);
      let { patchFlag: D, dynamicChildren: w, dirs: X } = g;
      D |= p.patchFlag & 16;
      const G = p.props || Te,
        ne = g.props || Te;
      let ae;
      if (
        (h && Wt(h, !1),
        (ae = ne.onVnodeBeforeUpdate) && ct(ae, h, g, p),
        X && Kt(g, p, h, "beforeUpdate"),
        h && Wt(h, !0),
        w &&
          (!p.dynamicChildren || p.dynamicChildren.length !== w.length) &&
          ((D = 0), (U = !1), (w = null)),
        ((G.innerHTML && ne.innerHTML == null) ||
          (G.textContent && ne.textContent == null)) &&
          c(L, ""),
        w
          ? O(p.dynamicChildren, w, L, h, v, Ns(g, T), S)
          : U || F(p, g, L, null, h, v, Ns(g, T), S, !1),
        D > 0)
      ) {
        if (D & 16) R(L, G, ne, h, T);
        else if (
          (D & 2 && G.class !== ne.class && o(L, "class", null, ne.class, T),
          D & 4 && o(L, "style", G.style, ne.style, T),
          D & 8)
        ) {
          const be = g.dynamicProps;
          for (let Ae = 0; Ae < be.length; Ae++) {
            const xe = be[Ae],
              Ie = G[xe],
              Ve = ne[xe];
            (Ve !== Ie || xe === "value") && o(L, xe, Ie, Ve, T, h);
          }
        }
        D & 1 && p.children !== g.children && c(L, g.children);
      } else !U && w == null && R(L, G, ne, h, T);
      ((ae = ne.onVnodeUpdated) || X) &&
        Ge(() => {
          ae && ct(ae, h, g, p), X && Kt(g, p, h, "updated");
        }, v);
    },
    O = (p, g, h, v, T, S, U) => {
      for (let L = 0; L < g.length; L++) {
        const D = p[L],
          w = g[L],
          X =
            D.el && (D.type === he || !hn(D, w) || D.shapeFlag & 198)
              ? f(D.el)
              : h;
        C(D, w, X, null, v, T, S, U, !0);
      }
    },
    R = (p, g, h, v, T) => {
      if (g !== h) {
        if (g !== Te)
          for (const S in g) !_n(S) && !(S in h) && o(p, S, g[S], null, T, v);
        for (const S in h) {
          if (_n(S)) continue;
          const U = h[S],
            L = g[S];
          U !== L && S !== "value" && o(p, S, L, U, T, v);
        }
        "value" in h && o(p, "value", g.value, h.value, T);
      }
    },
    Q = (p, g, h, v, T, S, U, L, D) => {
      const w = (g.el = p ? p.el : a("")),
        X = (g.anchor = p ? p.anchor : a(""));
      let { patchFlag: G, dynamicChildren: ne, slotScopeIds: ae } = g;
      ae && (L = L ? L.concat(ae) : ae),
        p == null
          ? (s(w, h, v), s(X, h, v), le(g.children || [], h, X, T, S, U, L, D))
          : G > 0 &&
              G & 64 &&
              ne &&
              p.dynamicChildren &&
              p.dynamicChildren.length === ne.length
            ? (O(p.dynamicChildren, ne, h, T, S, U, L),
              (g.key != null || (T && g === T.subTree)) && Cl(p, g, !0))
            : F(p, g, h, X, T, S, U, L, D);
    },
    re = (p, g, h, v, T, S, U, L, D) => {
      (g.slotScopeIds = L),
        p == null
          ? g.shapeFlag & 512
            ? T.ctx.activate(g, h, v, U, D)
            : pe(g, h, v, T, S, U, D)
          : $e(p, g, D);
    },
    pe = (p, g, h, v, T, S, U) => {
      const L = (p.component = Va(p, v, T));
      if ((_l(p) && (L.ctx.renderer = ee), Ua(L, !1, U), L.asyncDep)) {
        if ((T && T.registerDep(L, te, U), !p.el)) {
          const D = (L.subTree = ve(Rt));
          E(null, D, g, h), (p.placeholder = D.el);
        }
      } else te(L, p, g, h, T, S, U);
    },
    $e = (p, g, h) => {
      const v = (g.component = p.component);
      if (ba(p, g, h))
        if (v.asyncDep && !v.asyncResolved) {
          (g.el = p.el), j(v, g, h);
          return;
        } else (v.next = g), v.update();
      else (g.el = p.el), (v.vnode = g);
    },
    te = (p, g, h, v, T, S, U) => {
      const L = () => {
        if (p.isMounted) {
          let { next: G, bu: ne, u: ae, parent: be, vnode: Ae } = p;
          {
            const at = Oi(p);
            if (at) {
              G && ((G.el = Ae.el), j(p, G, U)),
                at.asyncDep.then(() => {
                  Ge(() => {
                    p.isUnmounted || w();
                  }, T);
                });
              return;
            }
          }
          let xe = G,
            Ie;
          Wt(p, !1),
            G ? ((G.el = Ae.el), j(p, G, U)) : (G = Ae),
            ne && zn(ne),
            (Ie = G.props && G.props.onVnodeBeforeUpdate) && ct(Ie, be, G, Ae),
            Wt(p, !0);
          const Ve = Gl(p),
            rt = p.subTree;
          (p.subTree = Ve),
            C(rt, Ve, f(rt.el), P(rt), p, T, S),
            (G.el = Ve.el),
            xe === null && _a(p, Ve.el),
            ae && Ge(ae, T),
            (Ie = G.props && G.props.onVnodeUpdated) &&
              Ge(() => ct(Ie, be, G, Ae), T);
        } else {
          let G;
          const { el: ne, props: ae } = g,
            { bm: be, m: Ae, parent: xe, root: Ie, type: Ve } = p,
            rt = xn(g);
          Wt(p, !1),
            be && zn(be),
            !rt && (G = ae && ae.onVnodeBeforeMount) && ct(G, xe, g),
            Wt(p, !0);
          {
            Ie.ce &&
              Ie.ce._hasShadowRoot() &&
              Ie.ce._injectChildStyle(Ve, p.parent ? p.parent.type : void 0);
            const at = (p.subTree = Gl(p));
            C(null, at, h, v, p, T, S), (g.el = at.el);
          }
          if ((Ae && Ge(Ae, T), !rt && (G = ae && ae.onVnodeMounted))) {
            const at = g;
            Ge(() => ct(G, xe, at), T);
          }
          (g.shapeFlag & 256 ||
            (xe && xn(xe.vnode) && xe.vnode.shapeFlag & 256)) &&
            p.a &&
            Ge(p.a, T),
            (p.isMounted = !0),
            (g = h = v = null);
        }
      };
      p.scope.on();
      const D = (p.effect = new Vo(L));
      p.scope.off();
      const w = (p.update = D.run.bind(D)),
        X = (p.job = D.runIfDirty.bind(D));
      (X.i = p), (X.id = p.uid), (D.scheduler = () => yl(X)), Wt(p, !0), w();
    },
    j = (p, g, h) => {
      g.component = p;
      const v = p.vnode.props;
      (p.vnode = g),
        (p.next = null),
        Ea(p, g.props, v, h),
        Aa(p, g.children, h),
        Tt(),
        Dl(p),
        Ot();
    },
    F = (p, g, h, v, T, S, U, L, D = !1) => {
      const w = p && p.children,
        X = p ? p.shapeFlag : 0,
        G = g.children,
        { patchFlag: ne, shapeFlag: ae } = g;
      if (ne > 0) {
        if (ne & 128) {
          me(w, G, h, v, T, S, U, L, D);
          return;
        } else if (ne & 256) {
          Z(w, G, h, v, T, S, U, L, D);
          return;
        }
      }
      ae & 8
        ? (X & 16 && fe(w, T, S), G !== w && c(h, G))
        : X & 16
          ? ae & 16
            ? me(w, G, h, v, T, S, U, L, D)
            : fe(w, T, S, !0)
          : (X & 8 && c(h, ""), ae & 16 && le(G, h, v, T, S, U, L, D));
    },
    Z = (p, g, h, v, T, S, U, L, D) => {
      (p = p || Jt), (g = g || Jt);
      const w = p.length,
        X = g.length,
        G = Math.min(w, X);
      let ne;
      for (ne = 0; ne < G; ne++) {
        const ae = (g[ne] = D ? Ct(g[ne]) : pt(g[ne]));
        C(p[ne], ae, h, null, T, S, U, L, D);
      }
      w > X ? fe(p, T, S, !0, !1, G) : le(g, h, v, T, S, U, L, D, G);
    },
    me = (p, g, h, v, T, S, U, L, D) => {
      let w = 0;
      const X = g.length;
      let G = p.length - 1,
        ne = X - 1;
      for (; w <= G && w <= ne; ) {
        const ae = p[w],
          be = (g[w] = D ? Ct(g[w]) : pt(g[w]));
        if (hn(ae, be)) C(ae, be, h, null, T, S, U, L, D);
        else break;
        w++;
      }
      for (; w <= G && w <= ne; ) {
        const ae = p[G],
          be = (g[ne] = D ? Ct(g[ne]) : pt(g[ne]));
        if (hn(ae, be)) C(ae, be, h, null, T, S, U, L, D);
        else break;
        G--, ne--;
      }
      if (w > G) {
        if (w <= ne) {
          const ae = ne + 1,
            be = ae < X ? g[ae].el : v;
          for (; w <= ne; )
            C(null, (g[w] = D ? Ct(g[w]) : pt(g[w])), h, be, T, S, U, L, D),
              w++;
        }
      } else if (w > ne) for (; w <= G; ) Ce(p[w], T, S, !0), w++;
      else {
        const ae = w,
          be = w,
          Ae = new Map();
        for (w = be; w <= ne; w++) {
          const Xe = (g[w] = D ? Ct(g[w]) : pt(g[w]));
          Xe.key != null && Ae.set(Xe.key, w);
        }
        let xe,
          Ie = 0;
        const Ve = ne - be + 1;
        let rt = !1,
          at = 0;
        const fn = new Array(Ve);
        for (w = 0; w < Ve; w++) fn[w] = 0;
        for (w = ae; w <= G; w++) {
          const Xe = p[w];
          if (Ie >= Ve) {
            Ce(Xe, T, S, !0);
            continue;
          }
          let ut;
          if (Xe.key != null) ut = Ae.get(Xe.key);
          else
            for (xe = be; xe <= ne; xe++)
              if (fn[xe - be] === 0 && hn(Xe, g[xe])) {
                ut = xe;
                break;
              }
          ut === void 0
            ? Ce(Xe, T, S, !0)
            : ((fn[ut - be] = w + 1),
              ut >= at ? (at = ut) : (rt = !0),
              C(Xe, g[ut], h, null, T, S, U, L, D),
              Ie++);
        }
        const Sl = rt ? Ra(fn) : Jt;
        for (xe = Sl.length - 1, w = Ve - 1; w >= 0; w--) {
          const Xe = be + w,
            ut = g[Xe],
            Tl = g[Xe + 1],
            Ol = Xe + 1 < X ? Tl.el || Ri(Tl) : v;
          fn[w] === 0
            ? C(null, ut, h, Ol, T, S, U, L, D)
            : rt && (xe < 0 || w !== Sl[xe] ? ge(ut, h, Ol, 2) : xe--);
        }
      }
    },
    ge = (p, g, h, v, T = null) => {
      const { el: S, type: U, transition: L, children: D, shapeFlag: w } = p;
      if (w & 6) {
        ge(p.component.subTree, g, h, v);
        return;
      }
      if (w & 128) {
        p.suspense.move(g, h, v);
        return;
      }
      if (w & 64) {
        U.move(p, g, h, ee);
        return;
      }
      if (U === he) {
        s(S, g, h);
        for (let G = 0; G < D.length; G++) ge(D[G], g, h, v);
        s(p.anchor, g, h);
        return;
      }
      if (U === Xn) {
        x(p, g, h);
        return;
      }
      if (v !== 2 && w & 1 && L)
        if (v === 0)
          L.persisted && !S[Ps]
            ? s(S, g, h)
            : (L.beforeEnter(S), s(S, g, h), Ge(() => L.enter(S), T));
        else {
          const { leave: G, delayLeave: ne, afterLeave: ae } = L,
            be = () => {
              p.ctx.isUnmounted ? l(S) : s(S, g, h);
            },
            Ae = () => {
              const xe = S._isLeaving || !!S[Ps];
              S._isLeaving && S[Ps](!0),
                L.persisted && !xe
                  ? be()
                  : G(S, () => {
                      be(), ae && ae();
                    });
            };
          ne ? ne(S, be, Ae) : Ae();
        }
      else s(S, g, h);
    },
    Ce = (p, g, h, v = !1, T = !1) => {
      const {
        type: S,
        props: U,
        ref: L,
        children: D,
        dynamicChildren: w,
        shapeFlag: X,
        patchFlag: G,
        dirs: ne,
        cacheIndex: ae,
        memo: be,
      } = p;
      if (
        ((G === -2 || (w && w.hasOnce)) && (T = !1),
        L != null && (Tt(), kn(L, null, h, p, !0), Ot()),
        ae != null && (!p.ctx || p.ctx === g) && (g.renderCache[ae] = void 0),
        X & 256)
      ) {
        g.ctx.deactivate(p);
        return;
      }
      const Ae = X & 1 && ne,
        xe = !xn(p);
      let Ie;
      if ((xe && (Ie = U && U.onVnodeBeforeUnmount) && ct(Ie, g, p), X & 6))
        B(p.component, h, v);
      else {
        if (X & 128) {
          p.suspense.unmount(h, v);
          return;
        }
        Ae && Kt(p, null, g, "beforeUnmount"),
          X & 64
            ? p.type.remove(p, g, h, ee, v)
            : w && !w.hasOnce && (S !== he || (G > 0 && G & 64))
              ? fe(w, g, h, !1, !0)
              : ((S === he && G & 384) || (!T && X & 16)) && fe(D, g, h),
          v && K(p);
      }
      const Ve = be != null && ae == null;
      ((xe && (Ie = U && U.onVnodeUnmounted)) || Ae || Ve) &&
        Ge(() => {
          Ie && ct(Ie, g, p),
            Ae && Kt(p, null, g, "unmounted"),
            Ve && (p.el = null);
        }, h);
    },
    K = (p) => {
      const { type: g, el: h, anchor: v, transition: T } = p;
      if (g === he) {
        V(h, v);
        return;
      }
      if (g === Xn) {
        N(p), T && !T.persisted && T.afterLeave && T.afterLeave();
        return;
      }
      const S = () => {
        l(h), T && !T.persisted && T.afterLeave && T.afterLeave();
      };
      if (p.shapeFlag & 1 && T && !T.persisted) {
        const { leave: U, delayLeave: L } = T,
          D = () => U(h, S);
        L ? L(p.el, S, D) : D();
      } else S();
    },
    V = (p, g) => {
      let h;
      for (; p !== g; ) (h = y(p)), l(p), (p = h);
      l(g);
    },
    B = (p, g, h) => {
      const { bum: v, scope: T, job: S, subTree: U, um: L, m: D, a: w } = p;
      Jl(D),
        Jl(w),
        v && zn(v),
        T.stop(),
        S
          ? ((S.flags |= 8), Ce(U, p, g, h))
          : p.vnode.el &&
            U &&
            ((U.transition = p.vnode.transition), Ce(U, p, g, h)),
        L && Ge(L, g),
        Ge(() => {
          p.isUnmounted = !0;
        }, g);
    },
    fe = (p, g, h, v = !1, T = !1, S = 0) => {
      for (let U = S; U < p.length; U++) Ce(p[U], g, h, v, T);
    },
    P = (p) => {
      if (p.shapeFlag & 6) return P(p.component.subTree);
      if (p.shapeFlag & 128) return p.suspense.next();
      const g = y(p.anchor || p.el),
        h = g && g[ri];
      return h ? y(h) : g;
    };
  let W = !1;
  const H = (p, g, h) => {
      let v;
      p == null
        ? g._vnode && (Ce(g._vnode, null, null, !0), (v = g._vnode.component))
        : C(g._vnode || null, p, g, null, null, null, h),
        (g._vnode = p),
        W || ((W = !0), Dl(v), ni(), (W = !1));
    },
    ee = {
      p: C,
      um: Ce,
      m: ge,
      r: K,
      mt: pe,
      mc: le,
      pc: F,
      pbc: O,
      n: P,
      o: e,
    };
  return { render: H, hydrate: void 0, createApp: pa(H) };
}
function Ns({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function Wt({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Oa(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Cl(e, t, n = !1) {
  const s = e.children,
    l = t.children;
  if (oe(s) && oe(l))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let a = l[o];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = l[o] = Ct(l[o])), (a.el = i.el)),
        !n && a.patchFlag !== -2 && Cl(i, a)),
        a.type === Cs &&
          (a.patchFlag === -1 && (a = l[o] = Ct(a)), (a.el = i.el)),
        a.type === Rt && !a.el && (a.el = i.el);
    }
}
function Ra(e) {
  const t = e.slice(),
    n = [0];
  let s, l, o, i, a;
  const u = e.length;
  for (s = 0; s < u; s++) {
    const d = e[s];
    if (d !== 0) {
      if (((l = n[n.length - 1]), e[l] < d)) {
        (t[s] = l), n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (a = (o + i) >> 1), e[n[a]] < d ? (o = a + 1) : (i = a);
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
function Oi(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Oi(t);
}
function Jl(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ri(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Ri(t.subTree) : null;
}
const $i = (e) => e.__isSuspense;
function $a(e, t) {
  t && t.pendingBranch
    ? oe(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Br(e);
}
const he = Symbol.for("v-fgt"),
  Cs = Symbol.for("v-txt"),
  Rt = Symbol.for("v-cmt"),
  Xn = Symbol.for("v-stc"),
  Qt = [];
let Qe = null;
function A(e = !1) {
  Qt.push((Qe = e ? null : []));
}
function Pi() {
  Qt.pop(), (Qe = Qt[Qt.length - 1] || null);
}
let $n = 1;
function ss(e, t = !1) {
  ($n += e), e < 0 && Qe && t && (Qe.hasOnce = !0);
}
function Ii(e) {
  return (
    (e.dynamicChildren = $n > 0 ? Qe || Jt : null),
    Pi(),
    $n > 0 && Qe && Qe.push(e),
    e
  );
}
function $(e, t, n, s, l, o) {
  return Ii(r(e, t, n, s, l, o, !0));
}
function Vt(e, t, n, s, l) {
  return Ii(ve(e, t, n, s, l, !0));
}
function ls(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function hn(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ni = ({ key: e }) => e ?? null,
  Yn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Re(e) || Ke(e) || ce(e)
        ? { i: Ye, r: e, k: t, f: !!n }
        : e
      : null
  );
function r(
  e,
  t = null,
  n = null,
  s = 0,
  l = null,
  o = e === he ? 0 : 1,
  i = !1,
  a = !1,
) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ni(t),
    ref: t && Yn(t),
    scopeId: li,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Ye,
  };
  return (
    a
      ? (is(u, n), o & 128 && e.normalize(u))
      : n && (u.shapeFlag |= Re(n) ? 8 : 16),
    $n > 0 &&
      !i &&
      Qe &&
      (u.patchFlag > 0 || o & 6) &&
      u.patchFlag !== 32 &&
      Qe.push(u),
    u
  );
}
const ve = Pa;
function Pa(e, t = null, n = null, s = 0, l = null, o = !1) {
  if (((!e || e === hi) && (e = Rt), ls(e))) {
    const a = rn(e, t, !0);
    return (
      n && is(a, n),
      $n > 0 &&
        !o &&
        Qe &&
        (a.shapeFlag & 6 ? (Qe[Qe.indexOf(e)] = a) : Qe.push(a)),
      (a.patchFlag = -2),
      a
    );
  }
  if ((Ka(e) && (e = e.__vccOpts), t)) {
    t = Ia(t);
    let { class: a, style: u } = t;
    a && !Re(a) && (t.class = Se(a)),
      ke(u) && (gl(u) && !oe(u) && (u = Ue({}, u)), (t.style = ul(u)));
  }
  const i = Re(e) ? 1 : $i(e) ? 128 : _s(e) ? 64 : ke(e) ? 4 : ce(e) ? 2 : 0;
  return r(e, t, n, s, l, i, o, !0);
}
function Ia(e) {
  return e ? (gl(e) || Ci(e) ? Ue({}, e) : e) : null;
}
function rn(e, t, n = !1, s = !1) {
  const { props: l, ref: o, patchFlag: i, children: a, transition: u } = e,
    d = t ? Na(l || {}, t) : l,
    c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: d,
      key: d && Ni(d),
      ref:
        t && t.ref
          ? n && o
            ? oe(o)
              ? o.concat(Yn(t))
              : [o, Yn(t)]
            : Yn(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: a,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== he ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: u,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && rn(e.ssContent),
      ssFallback: e.ssFallback && rn(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
      cacheIndex: e.cacheIndex,
    };
  return u && s && bl(c, u.clone(c)), c;
}
function ue(e = " ", t = 0) {
  return ve(Cs, null, e, t);
}
function os(e, t) {
  const n = ve(Xn, null, e);
  return (n.staticCount = t), n;
}
function Y(e = "", t = !1) {
  return t ? (A(), Vt(Rt, null, e)) : ve(Rt, null, e);
}
function pt(e) {
  return e == null || typeof e == "boolean"
    ? ve(Rt)
    : oe(e)
      ? ve(he, null, e.slice())
      : ls(e)
        ? Ct(e)
        : ve(Cs, null, String(e));
}
function Ct(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : rn(e);
}
function is(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (oe(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const l = t.default;
      l && (l._c && (l._d = !1), is(e, l()), l._c && (l._d = !0));
      return;
    } else {
      n = 32;
      const l = t._;
      !l && !Ci(t)
        ? (t._ctx = Ye)
        : l === 3 &&
          Ye &&
          (Ye.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else if (ce(t)) {
    if (s & 65) {
      is(e, { default: t });
      return;
    }
    (t = { default: t, _ctx: Ye }), (n = 32);
  } else (t = String(t)), s & 64 ? ((n = 16), (t = [ue(t)])) : (n = 8);
  (e.children = t), (e.shapeFlag |= n);
}
function Na(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const l in s)
      if (l === "class")
        t.class !== s.class && (t.class = Se([t.class, s.class]));
      else if (l === "style") t.style = ul([t.style, s.style]);
      else if (cs(l)) {
        const o = t[l],
          i = s[l];
        i && o !== i && !(oe(o) && o.includes(i))
          ? (t[l] = o ? [].concat(o, i) : i)
          : i == null && o == null && !ds(l) && (t[l] = i);
      } else l !== "" && (t[l] = s[l]);
  }
  return t;
}
function ct(e, t, n, s = null) {
  ot(e, t, 7, [n, s]);
}
const Ma = yi();
let Da = 0;
function Va(e, t, n) {
  const s = e.type,
    l = (t ? t.appContext : e.appContext) || Ma,
    o = {
      uid: Da++,
      vnode: e,
      type: s,
      parent: t,
      appContext: l,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new pr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(l.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: xi(s, l),
      emitsOptions: bi(s, l),
      emit: null,
      emitted: null,
      propsDefaults: Te,
      inheritAttrs: s.inheritAttrs,
      ctx: Te,
      data: Te,
      props: Te,
      attrs: Te,
      slots: Te,
      refs: Te,
      setupState: Te,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = va.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let He = null;
const La = () => He || Ye;
let rs, Pn;
{
  const e = vs(),
    t = (n, s) => {
      let l;
      return (
        (l = e[n]) || (l = e[n] = []),
        l.push(s),
        (o) => {
          l.length > 1 ? l.forEach((i) => i(o)) : l[0](o);
        }
      );
    };
  (rs = t("__VUE_INSTANCE_SETTERS__", (n) => (He = n))),
    (Pn = t("__VUE_SSR_SETTERS__", (n) => (In = n)));
}
const Ln = (e) => {
    const t = He;
    return (
      rs(e),
      e.scope.on(),
      () => {
        e.scope.off(), rs(t);
      }
    );
  },
  Xl = () => {
    He && He.scope.off(), rs(null);
  };
function Mi(e) {
  return e.vnode.shapeFlag & 4;
}
let In = !1;
function Ua(e, t = !1, n = !1) {
  t && Pn(t);
  const { props: s, children: l } = e.vnode,
    o = Mi(e);
  wa(e, s, o, t), xa(e, l, n || t);
  const i = o ? ja(e, t) : void 0;
  return t && Pn(!1), i;
}
function ja(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, ia));
  const { setup: s } = n;
  if (s) {
    Tt();
    const l = (e.setupContext = s.length > 1 ? Ba(e) : null),
      o = Ln(e),
      i = Vn(s, e, 0, [e.props, l]),
      a = Ro(i);
    if ((Ot(), o(), (a || e.sp) && !xn(e) && ci(e), a)) {
      if ((i.then(Xl, Xl), t))
        return i
          .then((u) => {
            Pn(!0);
            try {
              Yl(e, u, t);
            } finally {
              Pn(!1);
            }
          })
          .catch((u) => {
            ys(u, e, 0);
          });
      e.asyncDep = i;
    } else Yl(e, i);
  } else Di(e);
}
function Yl(e, t, n) {
  ce(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ke(t) && (e.setupState = Zo(t)),
    Di(e);
}
function Di(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || vt);
  {
    const l = Ln(e);
    Tt();
    try {
      ra(e);
    } finally {
      Ot(), l();
    }
  }
}
const Fa = {
  get(e, t) {
    return Fe(e, "get", ""), e[t];
  },
};
function Ba(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Fa),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ks(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(Zo(Pr(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in An) return An[n](e);
          },
          has(t, n) {
            return n in t || n in An;
          },
        }))
    : e.proxy;
}
function Ha(e, t = !0) {
  return ce(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ka(e) {
  return ce(e) && "__vccOpts" in e;
}
const De = (e, t) => Vr(e, t, In);
function Nn(e, t, n) {
  try {
    ss(-1);
    const s = arguments.length;
    return s === 2
      ? ke(t) && !oe(t)
        ? ls(t)
          ? ve(e, null, [t])
          : ve(e, t)
        : ve(e, null, t)
      : (s > 3
          ? (n = Array.prototype.slice.call(arguments, 2))
          : s === 3 && ls(n) && (n = [n]),
        ve(e, t, n));
  } finally {
    ss(1);
  }
}
const Wa = "3.5.43";
/**
 * @vue/runtime-dom v3.5.43
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let tl;
const Ql = typeof window < "u" && window.trustedTypes;
if (Ql)
  try {
    tl = Ql.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const Vi = tl ? (e) => tl.createHTML(e) : (e) => e,
  Ga = "http://www.w3.org/2000/svg",
  qa = "http://www.w3.org/1998/Math/MathML",
  Et = typeof document < "u" ? document : null,
  Zl = Et && Et.createElement("template"),
  za = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const l =
        t === "svg"
          ? Et.createElementNS(Ga, e)
          : t === "mathml"
            ? Et.createElementNS(qa, e)
            : n
              ? Et.createElement(e, { is: n })
              : Et.createElement(e);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          l.setAttribute("multiple", s.multiple),
        l
      );
    },
    createText: (e) => Et.createTextNode(e),
    createComment: (e) => Et.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Et.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, l, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (l && (l === o || l.nextSibling))
        for (
          ;
          t.insertBefore(l.cloneNode(!0), n),
            !(l === o || !(l = l.nextSibling));

        );
      else {
        Zl.innerHTML = Vi(
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e,
        );
        const a = Zl.content;
        if (s === "svg" || s === "mathml") {
          const u = a.firstChild;
          for (; u.firstChild; ) a.appendChild(u.firstChild);
          a.removeChild(u);
        }
        t.insertBefore(a, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Ja = Symbol("_vtc");
function Xa(e, t, n) {
  const s = e[Ja];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t);
}
const as = Symbol("_vod"),
  Li = Symbol("_vsh"),
  tn = {
    name: "show",
    beforeMount(e, { value: t }, { transition: n }) {
      (e[as] = e.style.display === "none" ? "" : e.style.display),
        n && t ? n.beforeEnter(e) : vn(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: s }) {
      !t != !n &&
        (s
          ? t
            ? (s.beforeEnter(e), vn(e, !0), s.enter(e))
            : s.leave(e, () => {
                vn(e, !1);
              })
          : vn(e, t));
    },
    beforeUnmount(e, { value: t }) {
      vn(e, t);
    },
  };
function vn(e, t) {
  (e.style.display = t ? e[as] : "none"), (e[Li] = !t);
}
const Ya = Symbol(""),
  Qa = /(?:^|;)\s*display\s*:/;
function Za(e, t, n) {
  const s = e.style,
    l = Re(n);
  let o = !1;
  if (n && !l) {
    if (t)
      if (Re(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          n[a] == null && bn(s, a, "");
        }
      else for (const i in t) n[i] == null && bn(s, i, "");
    for (const i in n) {
      i === "display" && (o = !0);
      const a = n[i];
      a != null
        ? tu(e, i, !Re(t) && t ? t[i] : void 0, a) || bn(s, i, a)
        : bn(s, i, "");
    }
  } else if (l) {
    if (t !== n) {
      const i = s[Ya];
      i && (n += ";" + i), (s.cssText = n), (o = Qa.test(n));
    }
  } else t && e.removeAttribute("style");
  as in e && ((e[as] = o ? s.display : ""), e[Li] && (s.display = "none"));
}
const Kn = /\s*!important$/;
function bn(e, t, n) {
  if (oe(n)) n.forEach((s) => bn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--")))
    Kn.test(n)
      ? e.setProperty(t, n.replace(Kn, ""), "important")
      : e.setProperty(t, n);
  else {
    const s = eu(e, t);
    Kn.test(n)
      ? e.setProperty(Ht(s), n.replace(Kn, ""), "important")
      : (e[s] = n);
  }
}
const eo = ["Webkit", "Moz", "ms"],
  Ms = {};
function eu(e, t) {
  const n = Ms[t];
  if (n) return n;
  let s = Je(t);
  if (s !== "filter" && s in e) return (Ms[t] = s);
  s = ps(s);
  for (let l = 0; l < eo.length; l++) {
    const o = eo[l] + s;
    if (o in e) return (Ms[t] = o);
  }
  return t;
}
function tu(e, t, n, s) {
  return (
    e.tagName === "TEXTAREA" &&
    (t === "width" || t === "height") &&
    Re(s) &&
    n === s
  );
}
const to = "http://www.w3.org/1999/xlink";
function no(e, t, n, s, l, o = cr(t)) {
  s && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(to, t.slice(6, t.length))
      : e.setAttributeNS(to, t, n)
    : n == null || (o && !No(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : gt(n) ? String(n) : n);
}
function so(e, t, n, s, l) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Vi(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value,
      u = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    (a !== u || !("_value" in e)) && (e.value = u),
      n == null && e.removeAttribute(t),
      (e._value = n);
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = No(n))
      : n == null && a === "string"
        ? ((n = ""), (i = !0))
        : a === "number" && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(l || t);
}
function At(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function nu(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const lo = Symbol("_vei");
function su(e, t, n, s, l = null) {
  const o = e[lo] || (e[lo] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [a, u] = iu(t);
    if (s) {
      const d = (o[t] = uu(s, l));
      At(e, a, d, u);
    } else i && (nu(e, a, i, u), (o[t] = void 0));
  }
}
const lu = /(Once|Passive|Capture)$/,
  ou = /^on:?(?:Once|Passive|Capture)$/;
function iu(e) {
  let t, n;
  for (; (n = e.match(lu)) && !ou.test(e); )
    t || (t = {}),
      (e = e.slice(0, e.length - n[1].length)),
      (t[n[1].toLowerCase()] = !0);
  return [e[2] === ":" ? e.slice(3) : Ht(e.slice(2)), t];
}
let Ds = 0;
const ru = Promise.resolve(),
  au = () => Ds || (ru.then(() => (Ds = 0)), (Ds = Date.now()));
function uu(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    const l = n.value;
    if (oe(l)) {
      const o = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        o.call(s), (s._stopped = !0);
      };
      const i = l.slice(),
        a = [s];
      for (let u = 0; u < i.length && !s._stopped; u++) {
        const d = i[u];
        d && ot(d, t, 5, a);
      }
    } else ot(l, t, 5, [s]);
  };
  return (n.value = e), (n.attached = au()), n;
}
const oo = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  cu = (e, t, n, s, l, o) => {
    const i = l === "svg";
    t === "class"
      ? Xa(e, s, i)
      : t === "style"
        ? Za(e, n, s)
        : cs(t)
          ? ds(t) || su(e, t, n, s, o)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : du(e, t, s, i)
              )
            ? (so(e, t, s),
              !e.tagName.includes("-") &&
                (t === "value" || t === "checked" || t === "selected") &&
                no(e, t, s, i, o, t !== "value"))
            : e._isVueCE &&
                (fu(e, t) ||
                  (e._def.__asyncLoader && (/[A-Z]/.test(t) || !Re(s))))
              ? so(e, Je(t), s, o, t)
              : (t === "true-value"
                  ? (e._trueValue = s)
                  : t === "false-value" && (e._falseValue = s),
                no(e, t, s, i));
  };
function du(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && oo(t) && ce(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "autocorrect" ||
    (t === "sandbox" && e.tagName === "IFRAME") ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const l = e.tagName;
    if (l === "IMG" || l === "VIDEO" || l === "CANVAS" || l === "SOURCE")
      return !1;
  }
  return oo(t) && Re(n) ? !1 : t in e;
}
function fu(e, t) {
  const n = e._def.props;
  if (!n) return !1;
  const s = Je(t);
  return Array.isArray(n)
    ? n.some((l) => Je(l) === s)
    : Object.keys(n).some((l) => Je(l) === s);
}
const Ft = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return oe(t) ? (n) => zn(t, n) : t;
};
function pu(e) {
  e.target.composing = !0;
}
function io(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Ze = Symbol("_assign"),
  Wn = Symbol("_initialValue");
function Vs(e, t, n) {
  return t && (e = e.trim()), n && (e = hs(e)), e;
}
const ye = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, l) {
      e.parentNode &&
        (e.type === "text"
          ? (e[Wn] = e.defaultValue.replace(/[\r\n]/g, ""))
          : e.type === "textarea" &&
            (e[Wn] = e.defaultValue.replace(
              /\r\n?/g,
              `
`))),
        (e[Ze] = Ft(l));
      const o = s || (l.props && l.props.type === "number");
      At(e, t ? "change" : "input", (i) => {
        i.target.composing || e[Ze](Vs(e.value, n, o));
      }),
        (n || o) &&
          At(e, "change", () => {
            e.value = Vs(e.value, n, o);
          }),
        t ||
          (At(e, "compositionstart", pu),
          At(e, "compositionend", io),
          At(e, "change", io));
    },
    mounted(e, { value: t, modifiers: { trim: n, number: s } }) {
      const l = t ?? "",
        o = e[Wn];
      delete e[Wn],
        o !== void 0 &&
        (e.type === "text" || e.type === "textarea") &&
        e.value !== o
          ? e[Ze](Vs(e.value, n, s))
          : (e.value = l);
    },
    beforeUpdate(
      e,
      { value: t, oldValue: n, modifiers: { lazy: s, trim: l, number: o } },
      i,
    ) {
      if (((e[Ze] = Ft(i)), e.composing)) return;
      const a =
          (o || e.type === "number") && !/^0\d/.test(e.value)
            ? hs(e.value)
            : e.value,
        u = t ?? "";
      if (a === u) return;
      const d = e.getRootNode();
      ((d instanceof Document || d instanceof ShadowRoot) &&
        d.activeElement === e &&
        e.type !== "range" &&
        ((s && t === n) || (l && e.value.trim() === u))) ||
        (e.value = u);
    },
  },
  Un = {
    deep: !0,
    created(e, t, n) {
      (e[Ze] = Ft(n)),
        At(e, "change", () => {
          const s = e._modelValue,
            l = an(e),
            o = e.checked,
            i = e[Ze];
          if (oe(s)) {
            const a = cl(s, l),
              u = a !== -1;
            if (o && !u) i(s.concat(l));
            else if (!o && u) {
              const d = [...s];
              d.splice(a, 1), i(d);
            }
          } else if (St(s)) {
            const a = new Set(s);
            o ? a.add(l) : a.delete(l), i(a);
          } else i(Ui(e, o));
        });
    },
    mounted: ro,
    beforeUpdate(e, t, n) {
      (e[Ze] = Ft(n)), ro(e, t, n);
    },
  };
function ro(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let l;
  if (oe(t)) l = cl(t, s.props.value) > -1;
  else if (St(t)) l = t.has(s.props.value);
  else {
    if (t === n) return;
    l = lt(t, Ui(e, !0));
  }
  e.checked !== l && (e.checked = l);
}
const hu = {
    created(e, { value: t }, n) {
      (e.checked = lt(t, n.props.value)),
        (e[Ze] = Ft(n)),
        At(e, "change", () => {
          e[Ze](an(e));
        });
    },
    beforeUpdate(e, { value: t, oldValue: n }, s) {
      (e[Ze] = Ft(s)), t !== n && (e.checked = lt(t, s.props.value));
    },
  },
  Bt = {
    deep: !0,
    created(e, { value: t, modifiers: { number: n } }, s) {
      (e._modelValue = t),
        At(e, "change", () => {
          const l = Array.prototype.filter
              .call(e.options, (u) => u.selected)
              .map((u) => (n ? hs(an(u)) : an(u))),
            o = e.multiple,
            i = o ? (St(e._modelValue) ? new Set(l) : l) : l[0],
            a = (e._pendingValue = [o, o ? (oe(i) ? l.slice() : l) : i]);
          try {
            e[Ze](i);
          } finally {
            bs(() => {
              e._pendingValue === a && (e._pendingValue = void 0);
            });
          }
        }),
        (e[Ze] = Ft(s));
    },
    mounted(e, { value: t }) {
      ao(e, t);
    },
    beforeUpdate(e, { value: t }, n) {
      (e._modelValue = t), (e[Ze] = Ft(n));
    },
    updated(e, { value: t }) {
      const n = e._pendingValue;
      (e._pendingValue = void 0),
        (!n || n[0] !== e.multiple || !vu(t, n[1], n[0])) && ao(e, t);
    },
  };
function vu(e, t, n) {
  if (!n || oe(e)) return lt(e, t);
  if (St(e)) {
    if (e.size !== t.length) return !1;
    for (const s of t) if (!e.has(s)) return !1;
    return !0;
  }
  return !1;
}
function ao(e, t) {
  const n = e.multiple,
    s = oe(t);
  if (!(n && !s && !St(t))) {
    for (let l = 0, o = e.options.length; l < o; l++) {
      const i = e.options[l],
        a = an(i);
      if (n)
        if (s) {
          const u = typeof a;
          u === "string" || u === "number"
            ? (i.selected = t.some((d) => String(d) === String(a)))
            : (i.selected = cl(t, a) > -1);
        } else i.selected = t.has(a);
      else if (lt(an(i), t)) {
        e.selectedIndex !== l && (e.selectedIndex = l);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function an(e) {
  return "_value" in e ? e._value : e.value;
}
function Ui(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const xv = {
  created(e, t, n) {
    Gn(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    Gn(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    Gn(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    Gn(e, t, n, s, "updated");
  },
};
function mu(e, t) {
  switch (e) {
    case "SELECT":
      return Bt;
    case "TEXTAREA":
      return ye;
    default:
      switch (t) {
        case "checkbox":
          return Un;
        case "radio":
          return hu;
        default:
          return ye;
      }
  }
}
function Gn(e, t, n, s, l) {
  const i = mu(e.tagName, n.props && n.props.type)[l];
  i && i(e, t, n, s);
}
const gu = ["ctrl", "shift", "alt", "meta"],
  yu = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => gu.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  un = (e, t) => {
    if (!e) return e;
    const n = e._withMods || (e._withMods = {}),
      s = t.join(".");
    return (
      n[s] ||
      (n[s] = (l, ...o) => {
        for (let i = 0; i < t.length; i++) {
          const a = yu[t[i]];
          if (a && a(l, t)) return;
        }
        return e(l, ...o);
      })
    );
  },
  bu = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  ji = (e, t) => {
    const n = e._withKeys || (e._withKeys = {}),
      s = t.join(".");
    return (
      n[s] ||
      (n[s] = (l) => {
        if (!("key" in l)) return;
        const o = Ht(l.key);
        if (t.some((i) => i === o || bu[i] === o)) return e(l);
      })
    );
  },
  _u = Ue({ patchProp: cu }, za);
let uo;
function wu() {
  return uo || (uo = Sa(_u));
}
const Eu = (...e) => {
  const t = wu().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const l = ku(s);
      if (!l) return;
      const o = t._component;
      !ce(o) && !o.render && !o.template && (o.template = l.innerHTML),
        l.nodeType === 1 && (l.textContent = "");
      const i = n(l, !1, Cu(l));
      return (
        l instanceof Element &&
          (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function Cu(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ku(e) {
  return Re(e) ? document.querySelector(e) : e;
}
const us = "/brand-icon.png",
  xu = "/char-hero-home.png";
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const sn = typeof document < "u";
function Fi(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function Au(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === "Module" ||
    (e.default && Fi(e.default))
  );
}
const _e = Object.assign;
function Ls(e, t) {
  const n = {};
  for (const s in t) {
    const l = t[s];
    n[s] = it(l) ? l.map(e) : e(l);
  }
  return n;
}
const Sn = () => {},
  it = Array.isArray;
function co(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
const Bi = /#/g,
  Su = /&/g,
  Tu = /\//g,
  Ou = /=/g,
  Ru = /\?/g,
  Hi = /\+/g,
  $u = /%5B/g,
  Pu = /%5D/g,
  Ki = /%5E/g,
  Iu = /%60/g,
  Wi = /%7B/g,
  Nu = /%7C/g,
  Gi = /%7D/g,
  Mu = /%20/g;
function kl(e) {
  return e == null
    ? ""
    : encodeURI("" + e)
        .replace(Nu, "|")
        .replace($u, "[")
        .replace(Pu, "]");
}
function Du(e) {
  return kl(e).replace(Wi, "{").replace(Gi, "}").replace(Ki, "^");
}
function nl(e) {
  return kl(e)
    .replace(Hi, "%2B")
    .replace(Mu, "+")
    .replace(Bi, "%23")
    .replace(Su, "%26")
    .replace(Iu, "`")
    .replace(Wi, "{")
    .replace(Gi, "}")
    .replace(Ki, "^");
}
function Vu(e) {
  return nl(e).replace(Ou, "%3D");
}
function Lu(e) {
  return kl(e).replace(Bi, "%23").replace(Ru, "%3F");
}
function Uu(e) {
  return Lu(e).replace(Tu, "%2F");
}
function Mn(e) {
  if (e == null) return null;
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const ju = /\/$/,
  Fu = (e) => e.replace(ju, "");
function Us(e, t, n = "/") {
  let s,
    l = {},
    o = "",
    i = "";
  const a = t.indexOf("#");
  let u = t.indexOf("?");
  return (
    (u = a >= 0 && u > a ? -1 : u),
    u >= 0 &&
      ((s = t.slice(0, u)),
      (o = t.slice(u, a > 0 ? a : t.length)),
      (l = e(o.slice(1)))),
    a >= 0 && ((s = s || t.slice(0, a)), (i = t.slice(a, t.length))),
    (s = Wu(s ?? t, n)),
    { fullPath: s + o + i, path: s, query: l, hash: Mn(i) }
  );
}
function Bu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function fo(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Hu(e, t, n) {
  const s = t.matched.length - 1,
    l = n.matched.length - 1;
  return (
    s > -1 &&
    s === l &&
    cn(t.matched[s], n.matched[l]) &&
    qi(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function cn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function qi(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (var n in e) if (!Ku(e[n], t[n])) return !1;
  return !0;
}
function Ku(e, t) {
  return it(e)
    ? po(e, t)
    : it(t)
      ? po(t, e)
      : (e == null ? void 0 : e.valueOf()) ===
        (t == null ? void 0 : t.valueOf());
}
function po(e, t) {
  return it(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function Wu(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    l = s[s.length - 1];
  (l === ".." || l === ".") && s.push("");
  let o = n.length - 1,
    i,
    a;
  for (i = 0; i < s.length; i++)
    if (((a = s[i]), a !== "."))
      if (a === "..") o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const It = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
let sl = (function (e) {
    return (e.pop = "pop"), (e.push = "push"), e;
  })({}),
  js = (function (e) {
    return (e.back = "back"), (e.forward = "forward"), (e.unknown = ""), e;
  })({});
function Gu(e) {
  if (!e)
    if (sn) {
      const t = document.querySelector("base");
      (e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
    } else e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Fu(e);
}
const qu = /^[^#]+#/;
function zu(e, t) {
  return e.replace(qu, "#") + t;
}
function Ju(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const xs = () => ({ left: window.scrollX, top: window.scrollY });
function Xu(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      l =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!l) return;
    t = Ju(l, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function ho(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const ll = new Map();
function Yu(e, t) {
  ll.set(e, t);
}
function Qu(e) {
  const t = ll.get(e);
  return ll.delete(e), t;
}
function Zu(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function zi(e) {
  return typeof e == "string" || typeof e == "symbol";
}
let Pe = (function (e) {
  return (
    (e[(e.MATCHER_NOT_FOUND = 1)] = "MATCHER_NOT_FOUND"),
    (e[(e.NAVIGATION_GUARD_REDIRECT = 2)] = "NAVIGATION_GUARD_REDIRECT"),
    (e[(e.NAVIGATION_ABORTED = 4)] = "NAVIGATION_ABORTED"),
    (e[(e.NAVIGATION_CANCELLED = 8)] = "NAVIGATION_CANCELLED"),
    (e[(e.NAVIGATION_DUPLICATED = 16)] = "NAVIGATION_DUPLICATED"),
    e
  );
})({});
const Ji = Symbol("");
Pe.MATCHER_NOT_FOUND + "",
  Pe.NAVIGATION_GUARD_REDIRECT + "",
  Pe.NAVIGATION_ABORTED + "",
  Pe.NAVIGATION_CANCELLED + "",
  Pe.NAVIGATION_DUPLICATED + "";
function dn(e, t) {
  return _e(new Error(), { type: e, [Ji]: !0 }, t);
}
function wt(e, t) {
  return e instanceof Error && Ji in e && (t == null || !!(e.type & t));
}
const ec = ["params", "query", "hash"];
function tc(e) {
  if (typeof e == "string") return e;
  if (e.path != null) return e.path;
  const t = {};
  for (const n of ec) n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
function nc(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const n = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let s = 0; s < n.length; ++s) {
    const l = n[s].replace(Hi, " "),
      o = l.indexOf("="),
      i = Mn(o < 0 ? l : l.slice(0, o)),
      a = o < 0 ? null : Mn(l.slice(o + 1));
    if (i in t) {
      let u = t[i];
      it(u) || (u = t[i] = [u]), u.push(a);
    } else t[i] = a;
  }
  return t;
}
function vo(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Vu(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (it(s) ? s.map((l) => l && nl(l)) : [s && nl(s)]).forEach((l) => {
      l !== void 0 &&
        ((t += (t.length ? "&" : "") + n), l != null && (t += "=" + l));
    });
  }
  return t;
}
function sc(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = it(s)
        ? s.map((l) => (l == null ? null : "" + l))
        : s == null
          ? s
          : "" + s);
  }
  return t;
}
const lc = Symbol(""),
  mo = Symbol(""),
  As = Symbol(""),
  xl = Symbol(""),
  ol = Symbol("");
function mn() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const l = e.indexOf(s);
        l > -1 && e.splice(l, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Dt(e, t, n, s, l, o = (i) => i()) {
  const i = s && (s.enterCallbacks[l] = s.enterCallbacks[l] || []);
  return () =>
    new Promise((a, u) => {
      const d = (y) => {
          y === !1
            ? u(dn(Pe.NAVIGATION_ABORTED, { from: n, to: t }))
            : y instanceof Error
              ? u(y)
              : Zu(y)
                ? u(dn(Pe.NAVIGATION_GUARD_REDIRECT, { from: t, to: y }))
                : (i &&
                    s.enterCallbacks[l] === i &&
                    typeof y == "function" &&
                    i.push(y),
                  a());
        },
        c = o(() => e.call(s && s.instances[l], t, n, d));
      let f = Promise.resolve(c);
      e.length < 3 && (f = f.then(d)), f.catch((y) => u(y));
    });
}
function Fs(e, t, n, s, l = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const a in i.components) {
      let u = i.components[a];
      if (!(t !== "beforeRouteEnter" && !i.instances[a]))
        if (Fi(u)) {
          const d = (u.__vccOpts || u)[t];
          d && o.push(Dt(d, n, s, i, a, l));
        } else {
          let d = u();
          o.push(() =>
            d.then((c) => {
              if (!c)
                throw new Error(
                  `Couldn't resolve component "${a}" at "${i.path}"`,
                );
              const f = Au(c) ? c.default : c;
              (i.mods[a] = c), (i.components[a] = f);
              const y = (f.__vccOpts || f)[t];
              return y && Dt(y, n, s, i, a, l)();
            }),
          );
        }
    }
  return o;
}
function oc(e, t) {
  const n = [],
    s = [],
    l = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const a = t.matched[i];
    a && (e.matched.find((d) => cn(d, a)) ? s.push(a) : n.push(a));
    const u = e.matched[i];
    u && (t.matched.find((d) => cn(d, u)) || l.push(u));
  }
  return [n, s, l];
}
/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let ic = () => location.protocol + "//" + location.host;
function Xi(e, t) {
  const { pathname: n, search: s, hash: l } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let i = l.includes(e.slice(o)) ? e.slice(o).length : 1,
      a = l.slice(i);
    return a[0] !== "/" && (a = "/" + a), fo(a, "");
  }
  return fo(n, e) + s + l;
}
function rc(e, t, n, s) {
  let l = [],
    o = [],
    i = null;
  const a = ({ state: y }) => {
    const m = Xi(e, location),
      b = n.value,
      C = t.value;
    let _ = 0;
    if (y) {
      if (((n.value = m), (t.value = y), i && i === b)) {
        i = null;
        return;
      }
      _ = C ? y.position - C.position : 0;
    } else s(m);
    l.forEach((E) => {
      E(n.value, b, {
        delta: _,
        type: sl.pop,
        direction: _ ? (_ > 0 ? js.forward : js.back) : js.unknown,
      });
    });
  };
  function u() {
    i = n.value;
  }
  function d(y) {
    l.push(y);
    const m = () => {
      const b = l.indexOf(y);
      b > -1 && l.splice(b, 1);
    };
    return o.push(m), m;
  }
  function c() {
    if (document.visibilityState === "hidden") {
      const { history: y } = window;
      if (!y.state) return;
      y.replaceState(_e({}, y.state, { scroll: xs() }), "");
    }
  }
  function f() {
    for (const y of o) y();
    (o = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("pagehide", c),
      document.removeEventListener("visibilitychange", c);
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("pagehide", c),
    document.addEventListener("visibilitychange", c),
    { pauseListeners: u, listen: d, destroy: f }
  );
}
function go(e, t, n, s = !1, l = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: l ? xs() : null,
  };
}
function ac(e) {
  const { history: t, location: n } = window,
    s = { value: Xi(e, n) },
    l = { value: t.state };
  l.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(u, d, c) {
    const f = e.indexOf("#"),
      y =
        f > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(f)) + u
          : ic() + e + u;
    try {
      t[c ? "replaceState" : "pushState"](d, "", y), (l.value = d);
    } catch (m) {
      console.error(m), n[c ? "replace" : "assign"](y);
    }
  }
  function i(u, d) {
    o(
      u,
      _e({}, t.state, go(l.value.back, u, l.value.forward, !0), d, {
        position: l.value.position,
      }),
      !0,
    ),
      (s.value = u);
  }
  function a(u, d) {
    const c = _e({}, l.value, t.state, { forward: u, scroll: xs() });
    o(c.current, c, !0),
      o(u, _e({}, go(s.value, u, null), { position: c.position + 1 }, d), !1),
      (s.value = u);
  }
  return { location: s, state: l, push: a, replace: i };
}
function uc(e) {
  e = Gu(e);
  const t = ac(e),
    n = rc(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const l = _e(
    { location: "", base: e, go: s, createHref: zu.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(l, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(l, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    l
  );
}
let Xt = (function (e) {
  return (
    (e[(e.Static = 0)] = "Static"),
    (e[(e.Param = 1)] = "Param"),
    (e[(e.Group = 2)] = "Group"),
    e
  );
})({});
var Me = (function (e) {
  return (
    (e[(e.Static = 0)] = "Static"),
    (e[(e.Param = 1)] = "Param"),
    (e[(e.ParamRegExp = 2)] = "ParamRegExp"),
    (e[(e.ParamRegExpEnd = 3)] = "ParamRegExpEnd"),
    (e[(e.EscapeNext = 4)] = "EscapeNext"),
    e
  );
})(Me || {});
const cc = { type: Xt.Static, value: "" },
  dc = /[a-zA-Z0-9_]/;
function fc(e) {
  if (!e) return [[]];
  if (e === "/") return [[cc]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${d}": ${m}`);
  }
  let n = Me.Static,
    s = n;
  const l = [];
  let o;
  function i() {
    o && l.push(o), (o = []);
  }
  let a = 0,
    u,
    d = "",
    c = "";
  function f() {
    d &&
      (n === Me.Static
        ? o.push({ type: Xt.Static, value: d })
        : n === Me.Param || n === Me.ParamRegExp || n === Me.ParamRegExpEnd
          ? (o.length > 1 &&
              (u === "*" || u === "+") &&
              t(
                `A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: Xt.Param,
              value: d,
              regexp: c,
              repeatable: u === "*" || u === "+",
              optional: u === "*" || u === "?",
            }))
          : t("Invalid state to consume buffer"),
      (d = ""));
  }
  function y() {
    d += u;
  }
  for (; a < e.length; ) {
    if (((u = e[a++]), u === "\\" && n !== Me.ParamRegExp)) {
      (s = n), (n = Me.EscapeNext);
      continue;
    }
    switch (n) {
      case Me.Static:
        u === "/" ? (d && f(), i()) : u === ":" ? (f(), (n = Me.Param)) : y();
        break;
      case Me.EscapeNext:
        y(), (n = s);
        break;
      case Me.Param:
        u === "("
          ? (n = Me.ParamRegExp)
          : dc.test(u)
            ? y()
            : (f(),
              (n = Me.Static),
              u !== "*" && u !== "?" && u !== "+" && a--);
        break;
      case Me.ParamRegExp:
        u === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + u)
            : (n = Me.ParamRegExpEnd)
          : (c += u);
        break;
      case Me.ParamRegExpEnd:
        f(),
          (n = Me.Static),
          u !== "*" && u !== "?" && u !== "+" && a--,
          (c = "");
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return (
    n === Me.ParamRegExp && t(`Unfinished custom RegExp for param "${d}"`),
    f(),
    i(),
    l
  );
}
const yo = "[^/]+?",
  pc = { sensitive: !1, strict: !1, start: !0, end: !0 };
var qe = (function (e) {
  return (
    (e[(e._multiplier = 10)] = "_multiplier"),
    (e[(e.Root = 90)] = "Root"),
    (e[(e.Segment = 40)] = "Segment"),
    (e[(e.SubSegment = 30)] = "SubSegment"),
    (e[(e.Static = 40)] = "Static"),
    (e[(e.Dynamic = 20)] = "Dynamic"),
    (e[(e.BonusCustomRegExp = 10)] = "BonusCustomRegExp"),
    (e[(e.BonusWildcard = -50)] = "BonusWildcard"),
    (e[(e.BonusRepeatable = -20)] = "BonusRepeatable"),
    (e[(e.BonusOptional = -8)] = "BonusOptional"),
    (e[(e.BonusStrict = 0.7000000000000001)] = "BonusStrict"),
    (e[(e.BonusCaseSensitive = 0.25)] = "BonusCaseSensitive"),
    e
  );
})(qe || {});
const hc = /[.+*?^${}()[\]/\\]/g;
function vc(e, t) {
  const n = _e({}, pc, t),
    s = [];
  let l = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const c = d.length ? [] : [qe.Root];
    n.strict && !d.length && (l += "/");
    for (let f = 0; f < d.length; f++) {
      const y = d[f];
      let m = qe.Segment + (n.sensitive ? qe.BonusCaseSensitive : 0);
      if (y.type === Xt.Static)
        f || (l += "/"), (l += y.value.replace(hc, "\\$&")), (m += qe.Static);
      else if (y.type === Xt.Param) {
        const { value: b, repeatable: C, optional: _, regexp: E } = y;
        o.push({ name: b, repeatable: C, optional: _ });
        const k = E || yo;
        if (k !== yo) {
          m += qe.BonusCustomRegExp;
          try {
            `${k}`;
          } catch (N) {
            throw new Error(
              `Invalid custom RegExp for param "${b}" (${k}): ` + N.message,
            );
          }
        }
        let x = C ? `((?:${k})(?:/(?:${k}))*)` : `(${k})`;
        f || (x = _ && d.length < 2 ? `(?:/${x})` : "/" + x),
          _ && (x += "?"),
          (l += x),
          (m += qe.Dynamic),
          _ && (m += qe.BonusOptional),
          C && (m += qe.BonusRepeatable),
          k === ".*" && (m += qe.BonusWildcard);
      }
      c.push(m);
    }
    s.push(c);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += qe.BonusStrict;
  }
  n.strict || (l += "/?"),
    n.end ? (l += "$") : n.strict && !l.endsWith("/") && (l += "(?:/|$)");
  const i = new RegExp(l, n.sensitive ? "" : "i");
  function a(d) {
    const c = d.match(i),
      f = {};
    if (!c) return null;
    for (let y = 1; y < c.length; y++) {
      const m = c[y] || "",
        b = o[y - 1];
      f[b.name] = m && b.repeatable ? m.split("/") : m;
    }
    return f;
  }
  function u(d) {
    let c = "",
      f = !1;
    for (const y of e) {
      (!f || !c.endsWith("/")) && (c += "/"), (f = !1);
      for (const m of y)
        if (m.type === Xt.Static) c += m.value;
        else if (m.type === Xt.Param) {
          const { value: b, repeatable: C, optional: _ } = m,
            E = b in d ? d[b] : "";
          if (it(E) && !C)
            throw new Error(
              `Provided param "${b}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const k = it(E) ? E.join("/") : E;
          if (!k)
            if (_)
              y.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${b}"`);
          c += k;
        }
    }
    return c || "/";
  }
  return { re: i, score: s, keys: o, parse: a, stringify: u };
}
function mc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === qe.Static + qe.Segment
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === qe.Static + qe.Segment
        ? 1
        : -1
      : 0;
}
function Yi(e, t) {
  let n = 0;
  const s = e.score,
    l = t.score;
  for (; n < s.length && n < l.length; ) {
    const o = mc(s[n], l[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(l.length - s.length) === 1) {
    if (bo(s)) return 1;
    if (bo(l)) return -1;
  }
  return l.length - s.length;
}
function bo(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const gc = { strict: !1, end: !0, sensitive: !1 };
function yc(e, t, n) {
  const s = vc(fc(e.path), n),
    l = _e(s, { record: e, parent: t, children: [], alias: [] });
  return t && !l.record.aliasOf == !t.record.aliasOf && t.children.push(l), l;
}
function bc(e, t) {
  const n = [],
    s = new Map();
  t = co(gc, t);
  function l(f) {
    return s.get(f);
  }
  function o(f, y, m) {
    const b = !m,
      C = wo(f);
    C.aliasOf = m && m.record;
    const _ = co(t, f),
      E = [C];
    if ("alias" in f) {
      const N = typeof f.alias == "string" ? [f.alias] : f.alias;
      for (const J of N)
        E.push(
          wo(
            _e({}, C, {
              components: m ? m.record.components : C.components,
              path: J,
              aliasOf: m ? m.record : C,
            }),
          ),
        );
    }
    let k, x;
    for (const N of E) {
      const { path: J } = N;
      if (y && J[0] !== "/") {
        const se = y.record.path,
          q = se[se.length - 1] === "/" ? "" : "/";
        N.path = y.record.path + (J && q + J);
      }
      if (
        ((k = yc(N, y, _)),
        m
          ? m.alias.push(k)
          : ((x = x || k),
            x !== k && x.alias.push(k),
            b && f.name && !Eo(k) && i(f.name)),
        Qi(k) && u(k),
        C.children)
      ) {
        const se = C.children;
        for (let q = 0; q < se.length; q++) o(se[q], k, m && m.children[q]);
      }
      m = m || k;
    }
    return x
      ? () => {
          i(x);
        }
      : Sn;
  }
  function i(f) {
    if (zi(f)) {
      const y = s.get(f);
      y &&
        (s.delete(f),
        n.splice(n.indexOf(y), 1),
        y.children.forEach(i),
        y.alias.forEach(i));
    } else {
      const y = n.indexOf(f);
      y > -1 &&
        (n.splice(y, 1),
        f.record.name && s.delete(f.record.name),
        f.children.forEach(i),
        f.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function u(f) {
    const y = Ec(f, n);
    n.splice(y, 0, f), f.record.name && !Eo(f) && s.set(f.record.name, f);
  }
  function d(f, y) {
    let m,
      b = {},
      C,
      _;
    if ("name" in f && f.name) {
      if (((m = s.get(f.name)), !m))
        throw dn(Pe.MATCHER_NOT_FOUND, { location: f });
      (_ = m.record.name),
        (b = _e(
          _o(
            y.params,
            m.keys
              .filter((x) => !x.optional)
              .concat(m.parent ? m.parent.keys.filter((x) => x.optional) : [])
              .map((x) => x.name),
          ),
          f.params &&
            _o(
              f.params,
              m.keys.map((x) => x.name)))),
        (C = m.stringify(b));
    } else if (f.path != null)
      (C = f.path),
        (m = n.find((x) => x.re.test(C))),
        m && ((b = m.parse(C)), (_ = m.record.name));
    else {
      if (((m = y.name ? s.get(y.name) : n.find((x) => x.re.test(y.path))), !m))
        throw dn(Pe.MATCHER_NOT_FOUND, { location: f, currentLocation: y });
      (_ = m.record.name),
        (b = _e({}, y.params, f.params)),
        (C = m.stringify(b));
    }
    const E = [];
    let k = m;
    for (; k; ) E.unshift(k.record), (k = k.parent);
    return { name: _, path: C, params: b, matched: E, meta: wc(E) };
  }
  e.forEach((f) => o(f));
  function c() {
    (n.length = 0), s.clear();
  }
  return {
    addRoute: o,
    resolve: d,
    removeRoute: i,
    clearRoutes: c,
    getRoutes: a,
    getRecordMatcher: l,
  };
}
function _o(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function wo(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: _c(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return Object.defineProperty(t, "mods", { value: {} }), t;
}
function _c(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Eo(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function wc(e) {
  return e.reduce((t, n) => _e(t, n.meta), {});
}
function Ec(e, t) {
  let n = 0,
    s = t.length;
  for (; n !== s; ) {
    const o = (n + s) >> 1;
    Yi(e, t[o]) < 0 ? (s = o) : (n = o + 1);
  }
  const l = Cc(e);
  return l && (s = t.lastIndexOf(l, s - 1)), s;
}
function Cc(e) {
  let t = e;
  for (; (t = t.parent); ) if (Qi(t) && Yi(e, t) === 0) return t;
}
function Qi({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function Co(e) {
  const t = tt(As),
    n = tt(xl),
    s = De(() => {
      const u = mt(e.to);
      return t.resolve(u);
    }),
    l = De(() => {
      const { matched: u } = s.value,
        { length: d } = u,
        c = u[d - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const y = f.findIndex(cn.bind(null, c));
      if (y > -1) return y;
      const m = ko(u[d - 2]);
      return d > 1 && ko(c) === m && f[f.length - 1].path !== m
        ? f.findIndex(cn.bind(null, u[d - 2]))
        : y;
    }),
    o = De(() => l.value > -1 && Tc(n.params, s.value.params)),
    i = De(
      () =>
        l.value > -1 &&
        l.value === n.matched.length - 1 &&
        qi(n.params, s.value.params),
    );
  function a(u = {}) {
    if (Sc(u)) {
      const d = t[mt(e.replace) ? "replace" : "push"](mt(e.to)).catch(Sn);
      return (
        e.viewTransition &&
          typeof document < "u" &&
          "startViewTransition" in document &&
          document.startViewTransition(() => d),
        d
      );
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: De(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: a,
  };
}
function kc(e) {
  return e.length === 1 ? e[0] : e;
}
const xc = ui({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
      viewTransition: Boolean,
    },
    useLink: Co,
    setup(e, { slots: t }) {
      const n = gs(Co(e)),
        { options: s } = tt(As),
        l = De(() => ({
          [xo(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [xo(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && kc(t.default(n));
        return e.custom
          ? o
          : Nn(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: l.value,
              },
              o,
            );
      };
    },
  }),
  Ac = xc;
function Sc(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Tc(e, t) {
  for (const n in t) {
    const s = t[n],
      l = e[n];
    if (typeof s == "string") {
      if (s !== l) return !1;
    } else if (
      !it(l) ||
      l.length !== s.length ||
      s.some((o, i) => o.valueOf() !== l[i].valueOf())
    )
      return !1;
  }
  return !0;
}
function ko(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const xo = (e, t, n) => e ?? t ?? n,
  Oc = ui({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = tt(ol),
        l = De(() => e.route || s.value),
        o = tt(mo, 0),
        i = De(() => {
          let d = mt(o);
          const { matched: c } = l.value;
          let f;
          for (; (f = c[d]) && !f.components; ) d++;
          return d;
        }),
        a = De(() => l.value.matched[i.value]);
      Jn(
        mo,
        De(() => i.value + 1),
      ),
        Jn(lc, a),
        Jn(ol, l);
      const u = M();
      return (
        Cn(
          () => [u.value, a.value, e.name],
          ([d, c, f], [y, m, b]) => {
            c &&
              ((c.instances[f] = d),
              m &&
                m !== c &&
                d &&
                d === y &&
                (c.leaveGuards.size || (c.leaveGuards = m.leaveGuards),
                c.updateGuards.size || (c.updateGuards = m.updateGuards))),
              d &&
                c &&
                (!m || !cn(c, m) || !y) &&
                (c.enterCallbacks[f] || []).forEach((C) => C(d));
          },
          { flush: "post" },
        ),
        () => {
          const d = l.value,
            c = e.name,
            f = a.value,
            y = f && f.components[c];
          if (!y) return Ao(n.default, { Component: y, route: d });
          const m = f.props[c],
            b = m
              ? m === !0
                ? d.params
                : typeof m == "function"
                  ? m(d)
                  : m
              : null,
            _ = Nn(
              y,
              _e({}, b, t, {
                onVnodeUnmounted: (E) => {
                  E.component.isUnmounted && (f.instances[c] = null);
                },
                ref: u,
              }),
            );
          return Ao(n.default, { Component: _, route: d }) || _;
        }
      );
    },
  });
function Ao(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const Rc = Oc;
function $c(e) {
  const t = bc(e.routes, e),
    n = e.parseQuery || nc,
    s = e.stringifyQuery || vo,
    l = e.history,
    o = mn(),
    i = mn(),
    a = mn(),
    u = Ir(It);
  let d = It;
  sn &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const c = Ls.bind(null, (P) => "" + P),
    f = Ls.bind(null, Uu),
    y = Ls.bind(null, Mn);
  function m(P, W) {
    let H, ee;
    return (
      zi(P) ? ((H = t.getRecordMatcher(P)), (ee = W)) : (ee = P),
      t.addRoute(ee, H)
    );
  }
  function b(P) {
    const W = t.getRecordMatcher(P);
    W && t.removeRoute(W);
  }
  function C() {
    return t.getRoutes().map((P) => P.record);
  }
  function _(P) {
    return !!t.getRecordMatcher(P);
  }
  function E(P, W) {
    if (((W = _e({}, W || u.value)), typeof P == "string")) {
      const h = Us(n, P, W.path),
        v = t.resolve({ path: h.path }, W),
        T = l.createHref(h.fullPath);
      return _e(h, v, {
        params: y(v.params),
        hash: Mn(h.hash),
        redirectedFrom: void 0,
        href: T,
      });
    }
    let H;
    if (P.path != null) H = _e({}, P, { path: Us(n, P.path, W.path).path });
    else {
      const h = _e({}, P.params);
      for (const v in h) h[v] == null && delete h[v];
      (H = _e({}, P, { params: f(h) })), (W.params = f(W.params));
    }
    const ee = t.resolve(H, W),
      de = P.hash || "";
    ee.params = c(y(ee.params));
    const p = Bu(s, _e({}, P, { hash: Du(de), path: ee.path })),
      g = l.createHref(p);
    return _e(
      { fullPath: p, hash: de, query: s === vo ? sc(P.query) : P.query || {} },
      ee,
      { redirectedFrom: void 0, href: g },
    );
  }
  function k(P) {
    return typeof P == "string" ? Us(n, P, u.value.path) : _e({}, P);
  }
  function x(P, W) {
    if (d !== P) return dn(Pe.NAVIGATION_CANCELLED, { from: W, to: P });
  }
  function N(P) {
    return q(P);
  }
  function J(P) {
    return N(_e(k(P), { replace: !0 }));
  }
  function se(P, W) {
    const H = P.matched[P.matched.length - 1];
    if (H && H.redirect) {
      const { redirect: ee } = H;
      let de = typeof ee == "function" ? ee(P, W) : ee;
      return (
        typeof de == "string" &&
          ((de =
            de.includes("?") || de.includes("#") ? (de = k(de)) : { path: de }),
          (de.params = {})),
        _e(
          {
            query: P.query,
            hash: P.hash,
            params: de.path != null ? {} : P.params,
          },
          de));
    }
  }
  function q(P, W) {
    const H = (d = E(P)),
      ee = u.value,
      de = P.state,
      p = P.force,
      g = P.replace === !0,
      h = se(H, ee);
    if (h)
      return q(
        _e(k(h), {
          state: typeof h == "object" ? _e({}, de, h.state) : de,
          force: p,
          replace: g,
        }),
        W || H,
      );
    const v = H;
    v.redirectedFrom = W;
    let T;
    return (
      !p &&
        Hu(s, ee, H) &&
        ((T = dn(Pe.NAVIGATION_DUPLICATED, { to: v, from: ee })),
        ge(ee, ee, !0, !1)),
      (T ? Promise.resolve(T) : O(v, ee))
        .catch((S) =>
          wt(S)
            ? wt(S, Pe.NAVIGATION_GUARD_REDIRECT)
              ? S
              : me(S)
            : F(S, v, ee),
        )
        .then((S) => {
          if (S) {
            if (wt(S, Pe.NAVIGATION_GUARD_REDIRECT))
              return q(
                _e({ replace: g }, k(S.to), {
                  state: typeof S.to == "object" ? _e({}, de, S.to.state) : de,
                  force: p,
                }),
                W || v,
              );
          } else S = Q(v, ee, !0, g, de);
          return R(v, ee, S), S;
        })
    );
  }
  function le(P, W) {
    const H = x(P, W);
    return H ? Promise.reject(H) : Promise.resolve();
  }
  function z(P) {
    const W = V.values().next().value;
    return W && typeof W.runWithContext == "function"
      ? W.runWithContext(P)
      : P();
  }
  function O(P, W) {
    let H;
    const [ee, de, p] = oc(P, W);
    H = Fs(ee.reverse(), "beforeRouteLeave", P, W);
    for (const h of ee)
      h.leaveGuards.forEach((v) => {
        H.push(Dt(v, P, W));
      });
    const g = le.bind(null, P, W);
    return (
      H.push(g),
      fe(H)
        .then(() => {
          H = [];
          for (const h of o.list()) H.push(Dt(h, P, W));
          return H.push(g), fe(H);
        })
        .then(() => {
          H = Fs(de, "beforeRouteUpdate", P, W);
          for (const h of de)
            h.updateGuards.forEach((v) => {
              H.push(Dt(v, P, W));
            });
          return H.push(g), fe(H);
        })
        .then(() => {
          H = [];
          for (const h of p)
            if (h.beforeEnter)
              if (it(h.beforeEnter))
                for (const v of h.beforeEnter) H.push(Dt(v, P, W));
              else H.push(Dt(h.beforeEnter, P, W));
          return H.push(g), fe(H);
        })
        .then(
          () => (
            P.matched.forEach((h) => (h.enterCallbacks = {})),
            (H = Fs(p, "beforeRouteEnter", P, W, z)),
            H.push(g),
            fe(H)
          ),
        )
        .then(() => {
          H = [];
          for (const h of i.list()) H.push(Dt(h, P, W));
          return H.push(g), fe(H);
        })
        .catch((h) => (wt(h, Pe.NAVIGATION_CANCELLED) ? h : Promise.reject(h)))
    );
  }
  function R(P, W, H) {
    a.list().forEach((ee) => z(() => ee(P, W, H)));
  }
  function Q(P, W, H, ee, de) {
    const p = x(P, W);
    if (p) return p;
    const g = W === It,
      h = sn ? history.state : {};
    H &&
      (ee || g
        ? l.replace(P.fullPath, _e({ scroll: g && h && h.scroll }, de))
        : l.push(P.fullPath, de)),
      (u.value = P),
      ge(P, W, H, g),
      me();
  }
  let re;
  function pe() {
    re ||
      (re = l.listen((P, W, H) => {
        if (!B.listening) return;
        const ee = E(P),
          de = se(ee, B.currentRoute.value);
        if (de) {
          q(_e(de, { replace: !0, force: !0 }), ee).catch(Sn);
          return;
        }
        d = ee;
        const p = u.value;
        sn && Yu(ho(p.fullPath, H.delta), xs()),
          O(ee, p)
            .catch((g) =>
              wt(g, Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_CANCELLED)
                ? g
                : wt(g, Pe.NAVIGATION_GUARD_REDIRECT)
                  ? (q(_e(k(g.to), { force: !0 }), ee)
                      .then((h) => {
                        wt(
                          h,
                          Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_DUPLICATED,
                        ) &&
                          !H.delta &&
                          H.type === sl.pop &&
                          l.go(-1, !1);
                      })
                      .catch(Sn),
                    Promise.reject())
                  : (H.delta && l.go(-H.delta, !1), F(g, ee, p)),
            )
            .then((g) => {
              (g = g || Q(ee, p, !1)),
                g &&
                  (H.delta && !wt(g, Pe.NAVIGATION_CANCELLED)
                    ? l.go(-H.delta, !1)
                    : H.type === sl.pop &&
                      wt(g, Pe.NAVIGATION_ABORTED | Pe.NAVIGATION_DUPLICATED) &&
                      l.go(-1, !1)),
                R(ee, p, g);
            })
            .catch(Sn);
      }));
  }
  let $e = mn(),
    te = mn(),
    j;
  function F(P, W, H) {
    me(P);
    const ee = te.list();
    return (
      ee.length ? ee.forEach((de) => de(P, W, H)) : console.error(P),
      Promise.reject(P)
    );
  }
  function Z() {
    return j && u.value !== It
      ? Promise.resolve()
      : new Promise((P, W) => {
          $e.add([P, W]);
        });
  }
  function me(P) {
    return (
      j ||
        ((j = !P),
        pe(),
        $e.list().forEach(([W, H]) => (P ? H(P) : W())),
        $e.reset()),
      P
    );
  }
  function ge(P, W, H, ee) {
    const { scrollBehavior: de } = e;
    if (!sn || !de) return Promise.resolve();
    const p =
      (!H && Qu(ho(P.fullPath, 0))) ||
      ((ee || !H) && history.state && history.state.scroll) ||
      null;
    return bs()
      .then(() => de(P, W, p))
      .then((g) => g && Xu(g))
      .catch((g) => F(g, P, W));
  }
  const Ce = (P) => l.go(P);
  let K;
  const V = new Set(),
    B = {
      currentRoute: u,
      listening: !0,
      addRoute: m,
      removeRoute: b,
      clearRoutes: t.clearRoutes,
      hasRoute: _,
      getRoutes: C,
      resolve: E,
      options: e,
      push: N,
      replace: J,
      go: Ce,
      back: () => Ce(-1),
      forward: () => Ce(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: a.add,
      onError: te.add,
      isReady: Z,
      install(P) {
        P.component("RouterLink", Ac),
          P.component("RouterView", Rc),
          (P.config.globalProperties.$router = B),
          Object.defineProperty(P.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => mt(u),
          }),
          sn &&
            !K &&
            u.value === It &&
            ((K = !0), N(l.location).catch((ee) => {}));
        const W = {};
        for (const ee in It)
          Object.defineProperty(W, ee, {
            get: () => u.value[ee],
            enumerable: !0,
          });
        P.provide(As, B), P.provide(xl, Yo(W)), P.provide(ol, u);
        const H = P.unmount;
        V.add(P),
          (P.unmount = function () {
            V.delete(P),
              V.size < 1 &&
                ((d = It),
                re && re(),
                (re = null),
                (u.value = It),
                (K = !1),
                (j = !1)),
              H();
          });
      },
    };
  function fe(P) {
    return P.reduce((W, H) => W.then(() => z(H)), Promise.resolve());
  }
  return B;
}
function Pc() {
  return tt(As);
}
function Zi(e) {
  return tt(xl);
}
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Gt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const So = (...e) =>
  e
    .filter((t, n, s) => !!t && t.trim() !== "" && s.indexOf(t) === n)
    .join(" ")
    .trim();
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ function Bs(e) {
  return e != null;
}
function Ic(e, t = {}) {
  var y, m;
  const n = t.attributeNames ?? {},
    s = (b) => n[b] ?? b,
    l = e.size ?? e.width ?? Gt.width,
    o = e.size ?? e.height ?? Gt.height,
    i =
      ((y = e.aliases) == null
        ? void 0
        : y
            .filter((b) => typeof b == "string" && b.trim() !== "")
            .map((b) => `lucide-${b}`)) ?? [],
    a = [...(e.name ? [`lucide-${e.name}`] : []), ...i],
    u =
      ((m = t.className) == null ? void 0 : m.split(" ").filter(Boolean)) ?? [],
    d = t.includeDefaultClasses === !1 ? So(...u) : So("lucide", ...a, ...u),
    c = t.absoluteStrokeWidth
      ? (Number(t.strokeWidth ?? Gt["stroke-width"]) *
          Number(e.size ?? e.width ?? Gt.width)) /
        Number(t.size ?? t.width ?? Gt.width)
      : (t.strokeWidth ?? Gt["stroke-width"]);
  return [
    "svg",
    {
      ...Object.entries(Gt).reduce((b, [C, _]) => ((b[s(C)] = _), b), {}),
      ...("color" in t && t.color && { [s("stroke")]: t.color }),
      ...("size" in t &&
        Bs(t.size) && { [s("width")]: t.size, [s("height")]: t.size }),
      ...("width" in t && Bs(t.width) && { [s("width")]: t.width }),
      ...("height" in t && Bs(t.height) && { [s("height")]: t.height }),
      [s("stroke-width")]: c,
      ...(d && { [s("class")]: d }),
      [s("viewBox")]: `0 0 ${l} ${o}`,
      ...(t.hasA11yProp === !1 ? { [s("aria-hidden")]: "true" } : {}),
      ...("attributes" in t && t.attributes),
    },
    e.node.map((b) => {
      const [C, _, E] = b,
        k = t.nonScalingStroke
          ? { [s("vector-effect")]: "non-scaling-stroke", ..._ }
          : _;
      return E ? [C, k, E] : [C, k];
    }),
  ];
}
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Nc = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
  return !1;
};
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const qn = (e) => e === "";
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Mc = (e) =>
  e == null ? void 0 : e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Dc = Symbol("lucide-icons");
function Vc() {
  return tt(Dc, {});
}
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Lc = (
  {
    name: e,
    iconNode: t,
    "icon-node": n,
    icon: s = { name: Mc(e), node: t ?? n, size: 24, aliases: [] },
    absoluteStrokeWidth: l,
    "absolute-stroke-width": o,
    nonScalingStroke: i,
    "non-scaling-stroke": a,
    strokeWidth: u,
    "stroke-width": d,
    size: c,
    width: f = c,
    height: y = c,
    color: m,
    ...b
  },
  { slots: C },
) => {
  var R;
  const {
      size: _,
      color: E,
      strokeWidth: k = 2,
      absoluteStrokeWidth: x = !1,
      nonScalingStroke: N = !1,
      class: J = "",
    } = Vc(),
    se = qn(l) || qn(o) || l === !0 || o === !0 || x === !0,
    q = qn(i) || qn(a) || i === !0 || a === !0 || N === !0;
  delete b.class;
  const le = (R = C.default) == null ? void 0 : R.call(C),
    [, z, O = []] = Ic(s, {
      color: m ?? E,
      width: f ?? c ?? _,
      height: y ?? c ?? _,
      strokeWidth: u ?? d ?? k,
      absoluteStrokeWidth: se,
      nonScalingStroke: q,
      className: J,
      hasA11yProp: (le != null && le.length > 0) || Nc(b),
      attributes: b,
    });
  return Nn("svg", z, [...O.map((Q) => Nn(...Q)), ...(le ?? [])]);
};
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ function Al(e, t = []) {
  const n = typeof e == "string" ? { name: e, node: t } : e;
  return (s, { slots: l }) =>
    Nn(Lc, { ...s, icon: n }, l.default ? { default: l.default } : void 0);
}
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Uc = {
    name: "circle-play",
    size: 24,
    node: [
      [
        "path",
        {
          d: "M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z",
          key: "kmsa83",
        },
      ],
      ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ],
    aliases: ["play-circle"],
  },
  jc = Al(Uc);
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Fc = {
    name: "volume-2",
    size: 24,
    node: [
      [
        "path",
        {
          d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
          key: "uqj9uw",
        },
      ],
      ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
      ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }],
    ],
  },
  Bc = Al(Fc);
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Hc = {
    name: "volume-x",
    size: 24,
    node: [
      [
        "path",
        {
          d: "M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z",
          key: "1p7khw",
        },
      ],
      ["path", { d: "m16.5 14.5 5-5", key: "cul3yw" }],
      ["path", { d: "m16.5 9.5 5 5", key: "1akey5" }],
    ],
  },
  Kc = Al(Hc),
  Pt = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, l] of t) n[s] = l;
    return n;
  },
  Wc = { key: 0, class: "claim-entry" },
  Gc = { class: "claim-body" },
  qc = { id: "claim-title" },
  zc = { key: 0, class: "claim-feedback", role: "status" },
  Jc = { key: 1, class: "claim-feedback", role: "alert" },
  Xc = { key: 0, class: "claim-qr-area" },
  Yc = { class: "claim-qr-frame" },
  Qc = ["src"],
  Zc = { key: 1, class: "claim-image-error" },
  ed = ["href", "download"],
  td = { class: "claim-wechat-row" },
  nd = ["disabled"],
  sd = { key: 1, class: "claim-copy-result", role: "status" },
  ld = { class: "claim-description" },
  od = { key: 2, class: "claim-hours" },
  id = { key: 3, class: "claim-feedback" },
  rd = {
    __name: "CardClaim",
    emits: ["return"],
    setup(e, { emit: t }) {
      const n = t,
        s = M(null),
        l = M(null),
        o = M(!1),
        i = M(!1),
        a = M(""),
        u = M(!1),
        d = M(!1),
        c = M("");
      let f,
        y = !1;
      async function m() {
        f == null || f.abort();
        const k = new AbortController();
        f = k;
        const x = setTimeout(() => k.abort(), 1e4);
        (i.value = !0), (a.value = ""), (u.value = !1);
        try {
          const N = await fetch("/api/site/card-claim", {
              cache: "no-store",
              signal: k.signal,
            }),
            J = await N.json();
          if (!N.ok || !J.ok) throw Error(J.msg || "领取信息加载失败");
          !y && f === k && ((l.value = J.config), (o.value = !0));
        } catch (N) {
          !y &&
            f === k &&
            (a.value =
              N.name === "AbortError"
                ? "连接超时，请重试。"
                : "领取信息暂时无法加载，请重试。");
        } finally {
          clearTimeout(x), !y && f === k && (i.value = !1);
        }
      }
      function b() {
        (c.value = ""), s.value.showModal(), m();
      }
      function C(k) {
        if (k.target !== s.value) return;
        const x = s.value.getBoundingClientRect();
        (k.clientX < x.left ||
          k.clientX > x.right ||
          k.clientY < x.top ||
          k.clientY > x.bottom) &&
          s.value.close();
      }
      function _() {
        s.value.close(), n("return");
      }
      async function E() {
        var k, x;
        if (!(d.value || !((k = l.value) != null && k.wechat))) {
          (d.value = !0), (c.value = "");
          try {
            try {
              if (!((x = navigator.clipboard) != null && x.writeText))
                throw Error("clipboard unavailable");
              await navigator.clipboard.writeText(l.value.wechat);
            } catch {
              const N = document.activeElement,
                J = document.createElement("textarea");
              (J.value = l.value.wechat),
                (J.style.cssText =
                  "position:fixed;opacity:0;width:1px;height:1px;"),
                s.value.appendChild(J);
              try {
                if ((J.select(), !document.execCommand("copy")))
                  throw Error("copy failed");
              } finally {
                J.remove(), N == null || N.focus();
              }
            }
            c.value = "微信号已复制，去微信搜索并添加好友。";
          } catch {
            c.value = "自动复制失败，请长按或选中上方微信号手动复制。";
          } finally {
            d.value = !1;
          }
        }
      }
      return (
        bt(m),
        Zt(() => {
          var k;
          (y = !0), f == null || f.abort(), (k = s.value) == null || k.close();
        }),
        (k, x) => {
          var N;
          return (
            A(),
            $(
              he,
              null,
              [
                !o.value || l.value
                  ? (A(),
                    $("div", Wc, [
                      x[4] || (x[4] = r("span", null, "还没有激活卡密？", -1)),
                      r(
                        "button",
                        { type: "button", class: "claim-link", onClick: b },
                        [
                          ...(x[3] ||
                            (x[3] = [
                              ue("点击领取 ", -1),
                              r("span", { "aria-hidden": "true" }, "→", -1),
                            ])),
                        ],
                      ),
                    ]))
                  : Y("", !0),
                r(
                  "dialog",
                  {
                    ref_key: "dialog",
                    ref: s,
                    class: "claim-dialog",
                    "aria-labelledby": "claim-title",
                    onClick: C,
                    onClose: x[2] || (x[2] = (J) => (c.value = "")),
                  },
                  [
                    r("div", Gc, [
                      r(
                        "button",
                        {
                          type: "button",
                          class: "claim-close",
                          "aria-label": "关闭领取卡密",
                          autofocus: "",
                          onClick: x[0] || (x[0] = (J) => s.value.close()),
                        },
                        "×",
                      ),
                      x[10] ||
                        (x[10] = r(
                          "span",
                          { class: "claim-eyebrow" },
                          "开启你的 AI 创作之旅",
                          -1)),
                      r(
                        "h2",
                        qc,
                        I(
                          ((N = l.value) == null ? void 0 : N.title) ||
                            "领取激活卡密",
                        ),
                        1,
                      ),
                      x[11] ||
                        (x[11] = r(
                          "p",
                          { class: "claim-subtitle" },
                          "加微信 · 领卡密 · 开始创作",
                          -1)),
                      i.value
                        ? (A(), $("p", zc, "正在加载领取信息…"))
                        : a.value
                          ? (A(),
                            $("div", Jc, [
                              r("p", null, I(a.value), 1),
                              r(
                                "button",
                                {
                                  type: "button",
                                  class: "btn-plain",
                                  onClick: m,
                                },
                                "重新加载",
                              ),
                            ]))
                          : l.value
                            ? (A(),
                              $(
                                he,
                                { key: 2 },
                                [
                                  l.value.qrImage
                                    ? (A(),
                                      $("div", Xc, [
                                        r("div", Yc, [
                                          u.value
                                            ? (A(),
                                              $("p", Zc, [
                                                ...(x[5] ||
                                                  (x[5] = [
                                                    ue(
                                                      "二维码暂时无法显示",
                                                      -1,
                                                    ),
                                                    r("br", null, null, -1),
                                                    ue(
                                                      "请复制下方微信号添加",
                                                      -1,
                                                    ),
                                                  ])),
                                              ]))
                                            : (A(),
                                              $(
                                                "img",
                                                {
                                                  key: 0,
                                                  src: l.value.qrImage,
                                                  alt: "客服微信加好友二维码",
                                                  class: "claim-qr",
                                                  onError:
                                                    x[1] ||
                                                    (x[1] = (J) =>
                                                      (u.value = !0)),
                                                },
                                                null,
                                                40,
                                                Qc)),
                                        ]),
                                        x[6] ||
                                          (x[6] = r(
                                            "p",
                                            { class: "claim-scan" },
                                            "打开微信扫一扫，添加客服",
                                            -1)),
                                        u.value
                                          ? Y("", !0)
                                          : (A(),
                                            $(
                                              "a",
                                              {
                                                key: 0,
                                                class: "claim-save",
                                                href: l.value.qrImage,
                                                download:
                                                  l.value.qrImage.startsWith(
                                                    "data:image/jpeg;",
                                                  )
                                                    ? "客服微信二维码.jpg"
                                                    : l.value.qrImage.startsWith(
                                                          "data:image/webp;",
                                                        )
                                                      ? "客服微信二维码.webp"
                                                      : "客服微信二维码.png",
                                              },
                                              "保存二维码",
                                              8,
                                              ed)),
                                      ]))
                                    : Y("", !0),
                                  r("div", td, [
                                    r("div", null, [
                                      x[7] ||
                                        (x[7] = r(
                                          "span",
                                          null,
                                          "客服微信",
                                          -1)),
                                      r("strong", null, I(l.value.wechat), 1),
                                    ]),
                                    r(
                                      "button",
                                      {
                                        type: "button",
                                        class: "claim-copy",
                                        disabled: d.value,
                                        onClick: E,
                                      },
                                      I(d.value ? "复制中…" : "复制微信号"),
                                      9,
                                      nd,
                                    ),
                                  ]),
                                  c.value
                                    ? (A(), $("p", sd, I(c.value), 1))
                                    : Y("", !0),
                                  x[8] ||
                                    (x[8] = r(
                                      "ol",
                                      { class: "claim-steps" },
                                      [
                                        r("li", null, [
                                          r("span", null, "1"),
                                          ue("添加微信"),
                                        ]),
                                        r("li", null, [
                                          r("span", null, "2"),
                                          ue("领取卡密"),
                                        ]),
                                        r("li", null, [
                                          r("span", null, "3"),
                                          ue("返回激活"),
                                        ]),
                                      ],
                                      -1)),
                                  r("p", ld, I(l.value.description), 1),
                                  l.value.serviceHours
                                    ? (A(),
                                      $(
                                        "p",
                                        od,
                                        "服务时间：" + I(l.value.serviceHours),
                                        1))
                                    : Y("", !0),
                                  x[9] ||
                                    (x[9] = r(
                                      "p",
                                      { class: "claim-note" },
                                      "领取规则以客服说明为准，请勿向他人泄露卡密。",
                                      -1)),
                                ],
                                64))
                            : (A(),
                              $("p", id, "领取入口暂未开放，请稍后再试。")),
                      r(
                        "button",
                        {
                          type: "button",
                          class: "btn claim-return",
                          onClick: _,
                        },
                        "已有卡密，返回激活",
                      ),
                    ]),
                  ],
                  544,
                ),
              ],
              64));
        }
      );
    },
  },
  ad = Pt(rd, [["__scopeId", "data-v-7dfc6e77"]]),
  ud = { class: "activate-page" },
  cd = { class: "wrap" },
  dd = { class: "main" },
  fd = { class: "left" },
  pd = { class: "activate-card" },
  hd = { class: "field" },
  vd = ["disabled"],
  md = { class: "right" },
  gd = { class: "char-stage" },
  yd = { class: "demo-video-grid" },
  bd = ["src", "poster", "muted", "aria-label"],
  _d = { class: "demo-video-label" },
  wd = ["aria-label", "aria-pressed", "title", "onClick"],
  Ed = {
    __name: "Activate",
    emits: ["activated"],
    setup(e, { emit: t }) {
      const n = t,
        s = M(""),
        l = M(null),
        o = M(""),
        i = M(!1),
        a = M(!1),
        u = [
          {
            id: "original",
            label: "短剧示例 01",
            src: "/media/short-drama-demo.mp4",
          },
          {
            id: "02",
            label: "短剧示例 02",
            src: "/media/login-demo-02.mp4",
            poster: "/media/login-demo-02.jpg",
          },
          {
            id: "03",
            label: "短剧示例 03",
            src: "/media/login-demo-03.mp4",
            poster: "/media/login-demo-03.jpg",
          },
          {
            id: "04",
            label: "短剧示例 04",
            src: "/media/login-demo-04-v2.mp4",
            poster: "/media/login-demo-04-v2.jpg",
          },
        ],
        d = new Map(),
        c = M(null);
      let f;
      function y(_, E) {
        const k = d.get(_);
        k !== E &&
          (k && (f == null || f.unobserve(k)),
          E ? (d.set(_, E), f == null || f.observe(E)) : d.delete(_));
      }
      async function m(_) {
        const E = d.get(_);
        if (E) {
          c.value = c.value === _ ? null : _;
          for (const [k, x] of d) x.muted = c.value !== k;
          if (c.value === _)
            try {
              await E.play();
            } catch {
              c.value === _ && (c.value = null), (E.muted = !0);
            }
        }
      }
      // 授权层已移除：该组件保留的提交入口不再请求 /api/auth/activate，
      // 直接按已授权处理（组件本身在 App 中已不可达）。
      async function b() {
        if (a.value) return;
        (o.value = "已授权"), (i.value = !0);
        setTimeout(() => n("activated", { ok: !0, activated: !0, permanent: !0 }), 0);
      }
      function C() {
        const _ = document.querySelector(".bg-stage");
        if (!_) return;
        const E = 22;
        for (let k = 0; k < E; k++) {
          const x = document.createElement("div");
          x.className = "particle";
          const N = 2 + Math.random() * 5;
          (x.style.width = N + "px"),
            (x.style.height = N + "px"),
            (x.style.left = Math.random() * 100 + "%"),
            (x.style.animationDuration = 7 + Math.random() * 10 + "s"),
            (x.style.animationDelay = Math.random() * 8 + "s"),
            _.appendChild(x);
        }
      }
      return (
        bt(() => {
          var _;
          C(),
            (_ = l.value) == null || _.focus(),
            (f = new IntersectionObserver(
              (E) => {
                for (const k of E)
                  k.isIntersecting
                    ? k.target.play().catch(() => {})
                    : k.target.pause();
              },
              { threshold: 0.15 }));
          for (const E of d.values()) f.observe(E);
        }),
        Zt(() => {
          f == null || f.disconnect();
          for (const _ of d.values()) _.pause();
        }),
        (_, E) => (
          A(),
          $("div", ud, [
            E[13] ||
              (E[13] = r(
                "div",
                { class: "bg-stage", "aria-hidden": "true" },
                [
                  r("div", { class: "aurora a1" }),
                  r("div", { class: "aurora a2" }),
                  r("div", { class: "aurora a3" }),
                ],
                -1)),
            r("div", cd, [
              E[11] ||
                (E[11] = os(
                  '<header class="topbar" data-v-ec73b82b><div class="brand" data-v-ec73b82b><div class="brand-mark" data-v-ec73b82b><img src="' +
                    us +
                    '" alt="" data-v-ec73b82b></div><div data-v-ec73b82b><div class="brand-name" data-v-ec73b82b><em data-v-ec73b82b>TT助手AI</em><span class="brand-tag" data-v-ec73b82b> · AI短剧创作系统</span></div><span class="brand-sub" data-v-ec73b82b>把故事，变成可执行的短剧</span></div></div></header>',
                  1)),
              r("div", dd, [
                r("div", fd, [
                  E[7] ||
                    (E[7] = os(
                      '<div class="hero" data-v-ec73b82b><span class="eyebrow" data-v-ec73b82b>AI 全流程创作 · 一键成片</span><h1 data-v-ec73b82b>让每一部短剧，<br data-v-ec73b82b><span class="grad" data-v-ec73b82b>从灵感到成片。</span></h1><p class="lead" data-v-ec73b82b>AI 剧本 · 角色三视图 · 分镜 · 视频生成 · 一键合成，全程自动化，小白也能一键拍出爆款竖屏短剧。</p><div class="hero-stats" data-v-ec73b82b><div class="stat" data-v-ec73b82b><div class="num" data-v-ec73b82b>全流程</div><div class="lbl" data-v-ec73b82b>剧本到成片自动化</div></div><div class="stat" data-v-ec73b82b><div class="num" data-v-ec73b82b>高画质</div><div class="lbl" data-v-ec73b82b>专业级生成引擎</div></div><div class="stat" data-v-ec73b82b><div class="num" data-v-ec73b82b>零门槛</div><div class="lbl" data-v-ec73b82b>无需技术基础</div></div></div></div>',
                      1)),
                  r("div", pd, [
                    E[3] || (E[3] = r("div", { class: "ac-glow" }, null, -1)),
                    E[4] ||
                      (E[4] = r(
                        "div",
                        { class: "ac-title" },
                        "激活你的创作系统",
                        -1)),
                    E[5] ||
                      (E[5] = r(
                        "div",
                        { class: "ac-sub" },
                        "输入购买获得的卡密，即可解锁全部创作能力",
                        -1)),
                    r("div", hd, [
                      E[2] ||
                        (E[2] = r("label", { for: "codeInput" }, "卡密", -1)),
                      ie(
                        r(
                          "input",
                          {
                            ref_key: "codeInput",
                            ref: l,
                            id: "codeInput",
                            "onUpdate:modelValue":
                              E[0] || (E[0] = (k) => (s.value = k)),
                            placeholder: "请输入卡密，如 LX-XXXX-XXXX",
                            autocomplete: "off",
                            onKeyup: ji(b, ["enter"]),
                          },
                          null,
                          544,
                        ),
                        [[ye, s.value]],
                      ),
                    ]),
                    r(
                      "div",
                      {
                        id: "codeHint",
                        class: Se(["hint", { err: !i.value, ok: i.value }]),
                        style: { "min-height": "18px", margin: "12px 0 0" },
                      },
                      I(o.value),
                      3,
                    ),
                    r(
                      "button",
                      { class: "main-btn", disabled: a.value, onClick: b },
                      "激活 / 登录",
                      8,
                      vd,
                    ),
                    ve(ad, {
                      onReturn:
                        E[1] ||
                        (E[1] = (k) => {
                          var x;
                          return (x = l.value) == null ? void 0 : x.focus();
                        }),
                    }),
                    E[6] ||
                      (E[6] = r(
                        "div",
                        { class: "secure-note" },
                        [
                          r(
                            "svg",
                            {
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              "stroke-width": "2",
                            },
                            [
                              r("rect", {
                                x: "4",
                                y: "10",
                                width: "16",
                                height: "11",
                                rx: "2",
                              }),
                              r("path", { d: "M8 10V7a4 4 0 018 0v3" }),
                            ],
                          ),
                          ue(" 正版系统 · 数据安全 · 专属客服支持 "),
                        ],
                        -1)),
                  ]),
                ]),
                r("div", md, [
                  r("div", gd, [
                    E[8] || (E[8] = r("div", { class: "halo" }, null, -1)),
                    E[9] ||
                      (E[9] = r(
                        "div",
                        { class: "demo-gallery-heading" },
                        [
                          r(
                            "span",
                            { class: "demo-gallery-kicker" },
                            "AI SHORT DRAMA",
                          ),
                          r("h2", null, "让创意，有画面。"),
                          r(
                            "p",
                            null,
                            "精选短剧示例 · 默认静音，点击右上角开启声音",
                          ),
                        ],
                        -1)),
                    r("div", yd, [
                      (A(),
                      $(
                        he,
                        null,
                        Be(u, (k) =>
                          r("div", { key: k.id, class: "demo-video-shell" }, [
                            r(
                              "video",
                              {
                                ref_for: !0,
                                ref: (x) => y(k.id, x),
                                class: "demo-video",
                                src: k.src,
                                poster: k.poster,
                                autoplay: "",
                                muted: c.value !== k.id,
                                loop: "",
                                playsinline: "",
                                preload: "metadata",
                                "aria-label": k.label,
                              },
                              null,
                              8,
                              bd,
                            ),
                            r("span", _d, [
                              ve(mt(jc), { size: 14 }),
                              ue(" " + I(k.label), 1),
                            ]),
                            r(
                              "button",
                              {
                                type: "button",
                                class: "demo-sound-toggle",
                                "aria-label":
                                  c.value === k.id
                                    ? `关闭${k.label}声音`
                                    : `开启${k.label}声音`,
                                "aria-pressed": c.value === k.id,
                                title:
                                  c.value === k.id ? "关闭声音" : "开启声音",
                                onClick: (x) => m(k.id),
                              },
                              [
                                c.value !== k.id
                                  ? (A(), Vt(mt(Kc), { key: 0, size: 18 }))
                                  : (A(), Vt(mt(Bc), { key: 1, size: 18 })),
                              ],
                              8,
                              wd,
                            ),
                          ]),
                        ),
                        64)),
                    ]),
                    E[10] ||
                      (E[10] = r(
                        "div",
                        { class: "char-tag" },
                        [r("span", { class: "dot" }), ue("AI 短剧 · 创作工场")],
                        -1)),
                  ]),
                ]),
              ]),
              E[12] ||
                (E[12] = r(
                  "footer",
                  { class: "footer" },
                  [
                    r("div", { class: "footer-inner" }, [
                      r("div", { class: "footer-left" }, [
                        r("span", null, "TT助手AI · AI短剧创作系统"),
                        r("span", null, "正版授权"),
                        r("span", null, "技术支持"),
                        r("span", null, "用户协议"),
                      ]),
                      r(
                        "div",
                        { class: "footer-right" },
                        "© 2026 TT助手AI · 版权所有",
                      ),
                    ]),
                  ],
                  -1)),
            ]),
          ])
        )
      );
    },
  },
  Cd = Pt(Ed, [["__scopeId", "data-v-ec73b82b"]]),
  kd = { class: "tutorial-body" },
  xd = { key: 0 },
  Ad = { key: 1, class: "paragraph" },
  Sd = ["href"],
  Td = { key: 2 },
  Od = ["href"],
  Rd = ["src", "alt"],
  $d = ["src"],
  Pd = { key: 2 },
  Id = {
    __name: "TutorialBody",
    props: { blocks: { type: Array, default: () => [] }, admin: Boolean },
    setup(e) {
      const t = e,
        n = (l) =>
          `${t.admin ? "/api/admin/tutorials" : "/api/tutorials"}/media/${encodeURIComponent(l)}`;
      function s(l = "") {
        return l
          .split(/(https?:\/\/[^\s<>"']+)/g)
          .map((o) => ({ text: o, href: /^https?:\/\//.test(o) ? o : null }));
      }
      return (l, o) => (
        A(),
        $("div", kd, [
          (A(!0),
          $(
            he,
            null,
            Be(
              e.blocks,
              (i, a) => (
                A(),
                $(
                  he,
                  { key: a },
                  [
                    i.type === "heading"
                      ? (A(), $("h2", xd, I(i.text), 1))
                      : i.type === "text"
                        ? (A(),
                          $("p", Ad, [
                            (A(!0),
                            $(
                              he,
                              null,
                              Be(
                                s(i.text),
                                (u, d) => (
                                  A(),
                                  $(
                                    he,
                                    { key: d },
                                    [
                                      u.href
                                        ? (A(),
                                          $(
                                            "a",
                                            {
                                              key: 0,
                                              href: u.href,
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                            },
                                            I(u.text),
                                            9,
                                            Sd))
                                        : (A(),
                                          $(
                                            he,
                                            { key: 1 },
                                            [ue(I(u.text), 1)],
                                            64)),
                                    ],
                                    64)),
                              ),
                              128)),
                          ]))
                        : i.media_id
                          ? (A(),
                            $("figure", Td, [
                              i.type === "image"
                                ? (A(),
                                  $(
                                    "a",
                                    {
                                      key: 0,
                                      href: n(i.media_id),
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      title: "查看原图",
                                    },
                                    [
                                      r(
                                        "img",
                                        {
                                          src: n(i.media_id),
                                          alt: i.caption || "教程图片",
                                          loading: "lazy",
                                        },
                                        null,
                                        8,
                                        Rd,
                                      ),
                                    ],
                                    8,
                                    Od))
                                : i.type === "video"
                                  ? (A(),
                                    $(
                                      "video",
                                      {
                                        key: 1,
                                        src: n(i.media_id),
                                        controls: "",
                                        playsinline: "",
                                        preload: "metadata",
                                      },
                                      "浏览器不支持此视频，请使用新版浏览器。",
                                      8,
                                      $d))
                                  : Y("", !0),
                              i.caption
                                ? (A(), $("figcaption", Pd, I(i.caption), 1))
                                : Y("", !0),
                            ]))
                          : Y("", !0),
                  ],
                  64)),
            ),
            128)),
        ])
      );
    },
  },
  Nd = Pt(Id, [["__scopeId", "data-v-0bae878d"]]),
  Md = { class: "tutorial-manager" },
  Dd = { class: "manager-heading" },
  Vd = ["disabled"],
  Ld = ["role"],
  Ud = { key: 1 },
  jd = { class: "categories-panel", open: "" },
  Fd = ["disabled"],
  Bd = { class: "category-form" },
  Hd = { class: "category-list" },
  Kd = ["onClick"],
  Wd = ["onClick"],
  Gd = { class: "manager-layout" },
  qd = { class: "article-list" },
  zd = ["disabled"],
  Jd = ["value"],
  Xd = ["disabled", "onClick"],
  Yd = { key: 0, class: "hint" },
  Qd = { key: 0, class: "article-editor" },
  Zd = ["disabled"],
  ef = { class: "editor-heading" },
  tf = { key: 0, class: "hint" },
  nf = { class: "two-cols" },
  sf = ["value"],
  lf = { class: "block-toolbar" },
  of = { class: "upload-button" },
  rf = { class: "upload-button" },
  af = { class: "block-heading" },
  uf = ["disabled", "aria-label", "onClick"],
  cf = ["disabled", "aria-label", "onClick"],
  df = ["aria-label", "onClick"],
  ff = ["onUpdate:modelValue", "aria-label"],
  pf = ["onUpdate:modelValue", "aria-label"],
  hf = ["src"],
  vf = ["src"],
  mf = ["onUpdate:modelValue"],
  gf = { key: 0, class: "hint" },
  yf = { class: "save-bar" },
  bf = { class: "publish" },
  _f = { class: "save-actions" },
  wf = { key: 0, class: "upload-progress", role: "status" },
  Ef = ["value"],
  Cf = { key: 1, class: "preview" },
  kf = { key: 1, class: "hint empty-editor" },
  xf = {
    __name: "TutorialManager",
    setup(e) {
      const t = M([]),
        n = M([]),
        s = M(null),
        l = M(""),
        o = M({ name: "", sort_order: 0 }),
        i = M(""),
        a = M(!1),
        u = M(!1),
        d = M(!1),
        c = M(0),
        f = M(!1),
        y = M(""),
        m = M(!1),
        b = De(() => a.value || u.value || d.value),
        C = De(() => s.value && JSON.stringify(s.value) !== l.value),
        _ = De(() =>
          n.value.filter((K) => !i.value || K.category_id === Number(i.value)),
        ),
        E = { text: "文字", heading: "小标题", image: "图片", video: "视频" },
        k = (K) => {
          var V;
          return (
            ((V = t.value.find((B) => B.id === K)) == null ? void 0 : V.name) ||
            "教程"
          );
        },
        x = (K) => `/api/admin/tutorials/media/${encodeURIComponent(K)}`;
      let N = 0,
        J = null;
      function se(K, V = !1) {
        (y.value = K), (m.value = V);
      }
      async function q(K = "", V = "GET", B) {
        const fe = await fetch("/api/admin/tutorials" + K, {
            method: V,
            headers: { "Content-Type": "application/json" },
            ...(B === void 0 ? {} : { body: JSON.stringify(B) }),
          }),
          P = await fe.json().catch(() => ({}));
        if (!fe.ok || !P.ok)
          throw Error(
            P.msg ||
              (fe.status === 413
                ? "文件超出服务器上传限制"
                : "请求失败，请重试"),
          );
        return P;
      }
      async function le() {
        const K = await q();
        (t.value = K.categories), (n.value = K.articles);
      }
      async function z() {
        a.value = !0;
        try {
          await le();
        } catch (K) {
          se(K.message, !0);
        } finally {
          a.value = !1;
        }
      }
      function O() {
        return (
          !C.value || confirm("当前文章有未保存的修改，确定放弃这些修改？")
        );
      }
      function R(K) {
        (s.value = { ...K, blocks: K.blocks.map((V) => ({ ...V, key: ++N })) }),
          (l.value = JSON.stringify(s.value)),
          (f.value = !1);
      }
      function Q() {
        var K;
        O() &&
          R({
            title: "",
            summary: "",
            category_id: (K = t.value[0]) == null ? void 0 : K.id,
            published: !1,
            sort_order: 0,
            blocks: [{ type: "text", text: "" }],
          });
      }
      function re(K) {
        O() && R(K);
      }
      function pe() {
        o.value = { name: "", sort_order: 0 };
      }
      async function $e() {
        u.value = !0;
        try {
          await q(
            o.value.id ? `/categories/${o.value.id}` : "/categories",
            o.value.id ? "PUT" : "POST",
            o.value,
          ),
            pe(),
            await le(),
            se("分类已保存");
        } catch (K) {
          se(K.message, !0);
        } finally {
          u.value = !1;
        }
      }
      async function te(K) {
        if (confirm(`删除分类“${K.name}”？有文章的分类不能删除。`)) {
          u.value = !0;
          try {
            await q(`/categories/${K.id}`, "DELETE"),
              o.value.id === K.id && pe(),
              await le(),
              se("分类已删除");
          } catch (V) {
            se(V.message, !0);
          } finally {
            u.value = !1;
          }
        }
      }
      function j(K) {
        s.value.blocks.push({ type: K, text: "", key: ++N });
      }
      function F(K, V) {
        const [B] = s.value.blocks.splice(K, 1);
        s.value.blocks.splice(K + V, 0, B);
      }
      async function Z() {
        if (!b.value) {
          u.value = !0;
          try {
            const K = {
                ...s.value,
                blocks: s.value.blocks.map(({ key: B, ...fe }) => fe),
              },
              V = await q(
                s.value.id ? `/articles/${s.value.id}` : "/articles",
                s.value.id ? "PUT" : "POST",
                K,
              );
            (s.value.id = V.id),
              (l.value = JSON.stringify(s.value)),
              se(
                s.value.published
                  ? "文章已发布，用户可在教程中心查看"
                  : "草稿已保存，仅后台可见",
              ),
              await le().catch(() =>
                se("文章已保存，列表刷新失败，请点击刷新列表", !0),
              );
          } catch (K) {
            se(K.message, !0);
          } finally {
            u.value = !1;
          }
        }
      }
      async function me() {
        if (
          confirm(`确定删除文章“${s.value.title}”？用户将无法再查看这篇文章。`)
        ) {
          u.value = !0;
          try {
            await q(`/articles/${s.value.id}`, "DELETE"),
              (s.value = null),
              (l.value = ""),
              await le(),
              se("文章已删除");
          } catch (K) {
            se(K.message, !0);
          } finally {
            u.value = !1;
          }
        }
      }
      async function ge(K, V) {
        var W;
        const B = (W = K.target.files) == null ? void 0 : W[0];
        if (((K.target.value = ""), !B || b.value)) return;
        const fe = V === "image" ? 10 : 100;
        if (B.size > fe * 1024 * 1024)
          return se(
            `上传失败：${V === "image" ? "图片" : "视频"}不能超过 ${fe}MB`,
            !0,
          );
        if (
          !(V === "image" ? /\.(jpe?g|png|gif|webp)$/i : /\.(mp4|webm)$/i).test(
            B.name))
          return se("上传失败：文件格式不支持，请使用按钮旁注明的格式", !0);
        (d.value = !0), (c.value = 0);
        try {
          const H = await new Promise((ee, de) => {
            const p = new XMLHttpRequest();
            (J = p),
              p.open("POST", "/api/admin/tutorials/media"),
              (p.timeout = 6e5),
              (p.upload.onprogress = (h) => {
                h.lengthComputable &&
                  (c.value = Math.round((h.loaded / h.total) * 100));
              }),
              (p.onload = () => {
                let h;
                try {
                  h = JSON.parse(p.responseText);
                } catch {
                  h = {};
                }
                p.status >= 200 && p.status < 300 && h.ok
                  ? ee(h.media)
                  : de(
                      Error(
                        h.msg ||
                          (p.status === 413
                            ? "服务器限制了上传大小，请联系管理员调整"
                            : "上传失败，请重试"),
                      ),
                    );
              }),
              (p.onerror = () => de(Error("网络中断，上传失败，请重试"))),
              (p.ontimeout = () =>
                de(Error("上传超时，请检查网络或压缩视频后重试"))),
              (p.onabort = () => de(Error("上传已取消")));
            const g = new FormData();
            g.append("file", B), p.send(g);
          });
          s.value.blocks.push({
            type: H.kind,
            media_id: H.id,
            caption: "",
            key: ++N,
          }),
            se("上传成功，已插入正文；保存文章后生效");
        } catch (H) {
          se(H.message, !0);
        } finally {
          (d.value = !1), (J = null);
        }
      }
      function Ce(K) {
        (C.value || d.value) && (K.preventDefault(), (K.returnValue = ""));
      }
      return (
        bt(() => {
          z(), window.addEventListener("beforeunload", Ce);
        }),
        Zt(() => {
          J == null || J.abort(),
            window.removeEventListener("beforeunload", Ce);
        }),
        (K, V) => (
          A(),
          $("section", Md, [
            r("div", Dd, [
              V[13] ||
                (V[13] = r(
                  "div",
                  null,
                  [
                    r("h2", null, "教程中心管理"),
                    r(
                      "p",
                      null,
                      "管理左侧「教程中心」的分类与文章，支持图文和视频教程。",
                    ),
                  ],
                  -1)),
              r(
                "button",
                { class: "secondary", disabled: b.value, onClick: z },
                "刷新列表",
                8,
                Vd,
              ),
            ]),
            y.value
              ? (A(),
                $(
                  "p",
                  {
                    key: 0,
                    class: Se(["notice", m.value ? "error" : "success"]),
                    role: m.value ? "alert" : "status",
                  },
                  I(y.value),
                  11,
                  Ld))
              : Y("", !0),
            a.value
              ? (A(), $("p", Ud, "正在加载…"))
              : (A(),
                $(
                  he,
                  { key: 2 },
                  [
                    r("details", jd, [
                      V[16] || (V[16] = r("summary", null, "分类管理", -1)),
                      r(
                        "fieldset",
                        { disabled: b.value },
                        [
                          r("div", Bd, [
                            r("label", null, [
                              V[14] || (V[14] = ue("分类名称", -1)),
                              ie(
                                r(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      V[0] ||
                                      (V[0] = (B) => (o.value.name = B)),
                                    maxlength: "40",
                                    placeholder: "例如：API 教程、使用教程",
                                  },
                                  null,
                                  512,
                                ),
                                [[ye, o.value.name]],
                              ),
                            ]),
                            r("label", null, [
                              V[15] || (V[15] = ue("分类排序", -1)),
                              ie(
                                r(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      V[1] ||
                                      (V[1] = (B) => (o.value.sort_order = B)),
                                    type: "number",
                                  },
                                  null,
                                  512,
                                ),
                                [
                                  [
                                    ye,
                                    o.value.sort_order,
                                    void 0,
                                    { number: !0 },
                                  ],
                                ],
                              ),
                            ]),
                            r(
                              "button",
                              { class: "primary", onClick: $e },
                              I(o.value.id ? "保存分类" : "添加分类"),
                              1,
                            ),
                            o.value.id
                              ? (A(),
                                $(
                                  "button",
                                  { key: 0, class: "secondary", onClick: pe },
                                  "取消"))
                              : Y("", !0),
                          ]),
                          r("div", Hd, [
                            (A(!0),
                            $(
                              he,
                              null,
                              Be(
                                t.value,
                                (B) => (
                                  A(),
                                  $("div", { key: B.id }, [
                                    r("strong", null, I(B.name), 1),
                                    r(
                                      "span",
                                      null,
                                      "排序 " + I(B.sort_order),
                                      1,
                                    ),
                                    r(
                                      "button",
                                      {
                                        class: "plain",
                                        onClick: (fe) => (o.value = { ...B }),
                                      },
                                      "编辑分类",
                                      8,
                                      Kd,
                                    ),
                                    r(
                                      "button",
                                      {
                                        class: "danger",
                                        onClick: (fe) => te(B),
                                      },
                                      "删除分类",
                                      8,
                                      Wd,
                                    ),
                                  ])
                                ),
                              ),
                              128)),
                          ]),
                        ],
                        8,
                        Fd,
                      ),
                    ]),
                    r("div", Gd, [
                      r("aside", qd, [
                        r(
                          "button",
                          {
                            class: "primary",
                            disabled: b.value || !t.value.length,
                            onClick: Q,
                          },
                          "＋ 新建文章",
                          8,
                          zd,
                        ),
                        ie(
                          r(
                            "select",
                            {
                              "onUpdate:modelValue":
                                V[2] || (V[2] = (B) => (i.value = B)),
                              "aria-label": "筛选文章分类",
                            },
                            [
                              V[17] ||
                                (V[17] = r(
                                  "option",
                                  { value: "" },
                                  "全部分类",
                                  -1)),
                              (A(!0),
                              $(
                                he,
                                null,
                                Be(
                                  t.value,
                                  (B) => (
                                    A(),
                                    $(
                                      "option",
                                      { key: B.id, value: B.id },
                                      I(B.name),
                                      9,
                                      Jd)),
                                ),
                                128)),
                            ],
                            512,
                          ),
                          [[Bt, i.value]],
                        ),
                        (A(!0),
                        $(
                          he,
                          null,
                          Be(_.value, (B) => {
                            var fe;
                            return (
                              A(),
                              $(
                                "button",
                                {
                                  key: B.id,
                                  disabled: b.value,
                                  class: Se([
                                    "article-item",
                                    {
                                      selected:
                                        ((fe = s.value) == null
                                          ? void 0
                                          : fe.id) === B.id,
                                    },
                                  ]),
                                  onClick: (P) => re(B),
                                },
                                [
                                  r("strong", null, I(B.title), 1),
                                  r(
                                    "span",
                                    null,
                                    I(k(B.category_id)) +
                                      " · " +
                                      I(B.published ? "已发布" : "草稿"),
                                    1,
                                  ),
                                ],
                                10,
                                Xd));
                          }),
                          128)),
                        _.value.length
                          ? Y("", !0)
                          : (A(), $("p", Yd, "暂无文章，点击上方新建。")),
                      ]),
                      s.value
                        ? (A(),
                          $("div", Qd, [
                            r(
                              "fieldset",
                              { disabled: b.value },
                              [
                                r("div", ef, [
                                  r(
                                    "h3",
                                    null,
                                    I(s.value.id ? "编辑文章" : "新建文章"),
                                    1,
                                  ),
                                  C.value
                                    ? (A(), $("span", tf, "有未保存的修改"))
                                    : Y("", !0),
                                ]),
                                r("label", null, [
                                  V[18] || (V[18] = ue("文章标题", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          V[3] ||
                                          (V[3] = (B) => (s.value.title = B)),
                                        maxlength: "120",
                                        placeholder: "填写教程标题",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, s.value.title]],
                                  ),
                                ]),
                                r("div", nf, [
                                  r("label", null, [
                                    V[19] || (V[19] = ue("所属分类", -1)),
                                    ie(
                                      r(
                                        "select",
                                        {
                                          "onUpdate:modelValue":
                                            V[4] ||
                                            (V[4] = (B) =>
                                              (s.value.category_id = B)),
                                          "aria-label": "所属分类",
                                        },
                                        [
                                          (A(!0),
                                          $(
                                            he,
                                            null,
                                            Be(
                                              t.value,
                                              (B) => (
                                                A(),
                                                $(
                                                  "option",
                                                  { key: B.id, value: B.id },
                                                  I(B.name),
                                                  9,
                                                  sf)),
                                            ),
                                            128)),
                                        ],
                                        512,
                                      ),
                                      [[Bt, s.value.category_id]],
                                    ),
                                  ]),
                                  r("label", null, [
                                    V[20] || (V[20] = ue("文章排序", -1)),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            V[5] ||
                                            (V[5] = (B) =>
                                              (s.value.sort_order = B)),
                                          type: "number",
                                        },
                                        null,
                                        512,
                                      ),
                                      [
                                        [
                                          ye,
                                          s.value.sort_order,
                                          void 0,
                                          { number: !0 },
                                        ],
                                      ],
                                    ),
                                  ]),
                                ]),
                                r("label", null, [
                                  V[21] || (V[21] = ue("文章简介", -1)),
                                  ie(
                                    r(
                                      "textarea",
                                      {
                                        "onUpdate:modelValue":
                                          V[6] ||
                                          (V[6] = (B) => (s.value.summary = B)),
                                        maxlength: "500",
                                        rows: "2",
                                        placeholder:
                                          "简要介绍教程内容，显示在文章列表",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, s.value.summary]],
                                  ),
                                ]),
                                r("div", lf, [
                                  V[24] ||
                                    (V[24] = r("strong", null, "文章正文", -1)),
                                  r(
                                    "button",
                                    {
                                      class: "secondary",
                                      onClick:
                                        V[7] || (V[7] = (B) => j("text")),
                                    },
                                    "＋ 文字",
                                  ),
                                  r(
                                    "button",
                                    {
                                      class: "secondary",
                                      onClick:
                                        V[8] || (V[8] = (B) => j("heading")),
                                    },
                                    "＋ 小标题",
                                  ),
                                  r("label", of, [
                                    V[22] || (V[22] = ue("＋ 上传图片", -1)),
                                    r(
                                      "input",
                                      {
                                        type: "file",
                                        accept:
                                          "image/jpeg,image/png,image/gif,image/webp",
                                        onChange:
                                          V[9] ||
                                          (V[9] = (B) => ge(B, "image")),
                                      },
                                      null,
                                      32,
                                    ),
                                  ]),
                                  r("label", rf, [
                                    V[23] || (V[23] = ue("＋ 上传视频", -1)),
                                    r(
                                      "input",
                                      {
                                        type: "file",
                                        accept: "video/mp4,video/webm",
                                        onChange:
                                          V[10] ||
                                          (V[10] = (B) => ge(B, "video")),
                                      },
                                      null,
                                      32,
                                    ),
                                  ]),
                                ]),
                                V[27] ||
                                  (V[27] = r(
                                    "p",
                                    { class: "hint" },
                                    "图片支持 JPG、PNG、GIF、WebP（10MB 内）；视频支持 MP4、WebM（100MB 内，推荐 MP4 / H.264）。文字中的网址会自动显示为链接。",
                                    -1)),
                                (A(!0),
                                $(
                                  he,
                                  null,
                                  Be(
                                    s.value.blocks,
                                    (B, fe) => (
                                      A(),
                                      $(
                                        "div",
                                        { key: B.key, class: "content-block" },
                                        [
                                          r("div", af, [
                                            r(
                                              "span",
                                              null,
                                              I(fe + 1) + " · " + I(E[B.type]),
                                              1,
                                            ),
                                            r("div", null, [
                                              r(
                                                "button",
                                                {
                                                  class: "plain",
                                                  disabled: fe === 0,
                                                  "aria-label": `上移第 ${fe + 1} 段`,
                                                  onClick: (P) => F(fe, -1),
                                                },
                                                "上移",
                                                8,
                                                uf,
                                              ),
                                              r(
                                                "button",
                                                {
                                                  class: "plain",
                                                  disabled:
                                                    fe ===
                                                    s.value.blocks.length - 1,
                                                  "aria-label": `下移第 ${fe + 1} 段`,
                                                  onClick: (P) => F(fe, 1),
                                                },
                                                "下移",
                                                8,
                                                cf,
                                              ),
                                              r(
                                                "button",
                                                {
                                                  class: "danger",
                                                  "aria-label": `移除第 ${fe + 1} 段`,
                                                  onClick: (P) =>
                                                    s.value.blocks.splice(
                                                      fe,
                                                      1,
                                                    ),
                                                },
                                                "移除",
                                                8,
                                                df,
                                              ),
                                            ]),
                                          ]),
                                          B.type === "text"
                                            ? ie(
                                                (A(),
                                                $(
                                                  "textarea",
                                                  {
                                                    key: 0,
                                                    "onUpdate:modelValue": (
                                                      P,
                                                    ) => (B.text = P),
                                                    "aria-label": `第 ${fe + 1} 段文字`,
                                                    rows: "6",
                                                    maxlength: "30000",
                                                    placeholder:
                                                      "输入正文，支持换行和网址",
                                                  },
                                                  null,
                                                  8,
                                                  ff)),
                                                [[ye, B.text]],
                                              )
                                            : B.type === "heading"
                                              ? ie(
                                                  (A(),
                                                  $(
                                                    "input",
                                                    {
                                                      key: 1,
                                                      "onUpdate:modelValue": (
                                                        P,
                                                      ) => (B.text = P),
                                                      "aria-label": `第 ${fe + 1} 段小标题`,
                                                      maxlength: "200",
                                                      placeholder: "输入小标题",
                                                    },
                                                    null,
                                                    8,
                                                    pf)),
                                                  [[ye, B.text]],
                                                )
                                              : (A(),
                                                $(
                                                  he,
                                                  { key: 2 },
                                                  [
                                                    B.type === "image"
                                                      ? (A(),
                                                        $(
                                                          "img",
                                                          {
                                                            key: 0,
                                                            src: x(B.media_id),
                                                            alt: "教程图片预览",
                                                          },
                                                          null,
                                                          8,
                                                          hf))
                                                      : (A(),
                                                        $(
                                                          "video",
                                                          {
                                                            key: 1,
                                                            src: x(B.media_id),
                                                            controls: "",
                                                            preload: "metadata",
                                                          },
                                                          null,
                                                          8,
                                                          vf)),
                                                    r("label", null, [
                                                      V[25] ||
                                                        (V[25] = ue(
                                                          "图片 / 视频说明",
                                                          -1)),
                                                      ie(
                                                        r(
                                                          "input",
                                                          {
                                                            "onUpdate:modelValue":
                                                              (P) =>
                                                                (B.caption = P),
                                                            maxlength: "500",
                                                            placeholder:
                                                              "可选：添加说明文字",
                                                          },
                                                          null,
                                                          8,
                                                          mf,
                                                        ),
                                                        [[ye, B.caption]],
                                                      ),
                                                    ]),
                                                  ],
                                                  64)),
                                        ])),
                                  ),
                                  128)),
                                s.value.blocks.length
                                  ? Y("", !0)
                                  : (A(),
                                    $(
                                      "p",
                                      gf,
                                      "点击上方按钮添加文字、图片或视频。")),
                                r("div", yf, [
                                  r("label", bf, [
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            V[11] ||
                                            (V[11] = (B) =>
                                              (s.value.published = B)),
                                          type: "checkbox",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[Un, s.value.published]],
                                    ),
                                    V[26] ||
                                      (V[26] = ue(
                                        " 发布给用户（取消勾选保存为草稿）",
                                        -1)),
                                  ]),
                                  r("div", _f, [
                                    r(
                                      "button",
                                      { class: "primary", onClick: Z },
                                      I(u.value ? "保存中…" : "保存文章"),
                                      1,
                                    ),
                                    r(
                                      "button",
                                      {
                                        class: "secondary",
                                        onClick:
                                          V[12] ||
                                          (V[12] = (B) => (f.value = !f.value)),
                                      },
                                      I(f.value ? "收起预览" : "预览文章"),
                                      1,
                                    ),
                                    s.value.id
                                      ? (A(),
                                        $(
                                          "button",
                                          {
                                            key: 0,
                                            class: "danger",
                                            onClick: me,
                                          },
                                          "删除文章"))
                                      : Y("", !0),
                                  ]),
                                ]),
                              ],
                              8,
                              Zd,
                            ),
                            d.value
                              ? (A(),
                                $("div", wf, [
                                  r(
                                    "progress",
                                    { value: c.value, max: "100" },
                                    null,
                                    8,
                                    Ef,
                                  ),
                                  r(
                                    "span",
                                    null,
                                    "上传中 " +
                                      I(c.value) +
                                      "%" +
                                      I(
                                        c.value === 100
                                          ? "，正在保存文件…"
                                          : "",
                                      ),
                                    1,
                                  ),
                                ]))
                              : Y("", !0),
                            f.value
                              ? (A(),
                                $("article", Cf, [
                                  V[28] ||
                                    (V[28] = r(
                                      "span",
                                      { class: "hint" },
                                      "文章预览",
                                      -1)),
                                  r("h2", null, I(s.value.title), 1),
                                  r("p", null, I(s.value.summary), 1),
                                  ve(
                                    Nd,
                                    { blocks: s.value.blocks, admin: "" },
                                    null,
                                    8,
                                    ["blocks"],
                                  ),
                                ]))
                              : Y("", !0),
                          ]))
                        : (A(),
                          $(
                            "p",
                            kf,
                            "选择一篇文章编辑，或新建图文、视频教程。")),
                    ]),
                  ],
                  64)),
          ])
        )
      );
    },
  },
  Af = Pt(xf, [["__scopeId", "data-v-2a86e713"]]),
  tp = { render: () => null },
  np = { class: "claim-manager" },
  sp = { key: 0, class: "claim-lock" },
  lp = ["disabled"],
  op = ["disabled"],
  ip = { key: 0, class: "error", role: "alert" },
  rp = { class: "claim-access" },
  ap = { key: 0, role: "status" },
  up = { key: 1, class: "error", role: "alert" },
  cp = ["disabled"],
  dp = { class: "toggle" },
  fp = ["required"],
  pp = { class: "image-editor" },
  hp = { class: "image-actions" },
  vp = ["src"],
  mp = ["required"],
  gp = { class: "btn", type: "submit" },
  yp = { key: 0, class: "success", role: "status" },
  bp = {
    __name: "CardClaimManager",
    setup(e) {
      const t = M(""),
        n = M(""),
        s = M(!1),
        l = M(null),
        o = M(!1),
        i = M(!1),
        a = M(!1),
        u = M(""),
        d = M(""),
        c = "/api/admin/card-claim",
        f = new Set();
      let y,
        m = 0,
        b = !1,
        C;
      function _(z) {
        z &&
          fetch(c + "/lock", {
            method: "POST",
            headers: { "X-Card-Claim-Token": z },
            keepalive: !0,
          }).catch(() => {});
      }
      function E(z = "") {
        const O = t.value;
        m++,
          clearTimeout(y),
          (t.value = ""),
          (n.value = ""),
          (l.value = null),
          (o.value = !1),
          (i.value = !1),
          (a.value = !1),
          (s.value = !1),
          (u.value = z),
          (d.value = "");
        for (const R of f) R.abort();
        f.clear(),
          (C == null ? void 0 : C.readyState) === 1 && C.abort(),
          (C = null),
          _(O);
      }
      async function k() {
        if (s.value || b || !n.value) return;
        const z = m,
          O = new AbortController();
        f.add(O);
        const R = JSON.stringify({ password: n.value });
        (n.value = ""), (s.value = !0), (u.value = "");
        try {
          const Q = await fetch(c + "/unlock", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: R,
              signal: O.signal,
              cache: "no-store",
            }),
            re = await Q.json().catch(() => ({}));
          if (b || z !== m) {
            _(re.token);
            return;
          }
          if (!Q.ok || !re.ok) throw Error(re.msg || "验证失败，请重试");
          if (
            !re.token ||
            !Number.isFinite(re.expiresAt) ||
            re.expiresAt <= Date.now()
          )
            throw (_(re.token), Error("验证已失效，请重新输入独立密码"));
          (t.value = re.token),
            (y = setTimeout(
              () => E("验证已过期，请重新输入独立密码"),
              re.expiresAt - Date.now())),
            await N();
        } catch (Q) {
          !b && z === m && (u.value = Q.message);
        } finally {
          f.delete(O), z === m && (s.value = !1);
        }
      }
      async function x(z = {}) {
        if (!t.value || b) throw Error("请先输入独立密码解锁卡密领取设置");
        const O = m,
          R = new AbortController();
        f.add(R);
        try {
          const Q = await fetch(c, {
              cache: "no-store",
              ...z,
              headers: { ...z.headers, "X-Card-Claim-Token": t.value },
              signal: R.signal,
            }),
            re = await Q.json().catch(() => ({}));
          if (b || O !== m) throw Error("栏目已锁定");
          if (Q.status === 401 || re.code === "CARD_CLAIM_LOCKED")
            throw (E("验证已失效，请重新输入独立密码"), Error("栏目已锁定"));
          if (!Q.ok || !re.ok) throw Error(re.msg || "请求失败，请重试");
          return re;
        } finally {
          f.delete(R);
        }
      }
      async function N() {
        if (o.value || b || !t.value) return;
        const z = m;
        (o.value = !0), (u.value = "");
        try {
          const O = await x();
          !b && z === m && (l.value = O.config);
        } catch (O) {
          !b && z === m && (u.value = O.message);
        } finally {
          z === m && (o.value = !1);
        }
      }
      async function J(z) {
        var Q;
        const O = (Q = z.target.files) == null ? void 0 : Q[0];
        if (
          ((z.target.value = ""),
          !O || b || !t.value || !l.value || a.value || i.value)
        )
          return;
        const R = m;
        if (
          ((u.value = ""),
          (d.value = ""),
          !["image/png", "image/jpeg", "image/webp"].includes(O.type) ||
            O.size > 1024 * 1024)
        ) {
          u.value = "请选择 1 MB 以内的 PNG、JPG 或 WEBP 图片";
          return;
        }
        a.value = !0;
        try {
          const re = await new Promise((pe, $e) => {
            const te = new FileReader();
            (C = te),
              (te.onload = () => pe(te.result)),
              (te.onerror = () => $e(Error("图片读取失败，请重试"))),
              (te.onabort = () => $e(Error("栏目已锁定"))),
              te.readAsDataURL(O);
          });
          if (
            (await new Promise((pe, $e) => {
              const te = new Image();
              (te.onload = pe),
                (te.onerror = () =>
                  $e(Error("图片无法打开，请换一张清晰的二维码"))),
                (te.src = re);
            }),
            b || R !== m || !l.value)
          )
            return;
          (l.value.qrImage = re), (d.value = "二维码已选择，请保存领取设置。");
        } catch (re) {
          !b && R === m && (u.value = re.message);
        } finally {
          R === m && ((a.value = !1), (C = null));
        }
      }
      async function se() {
        if (i.value || a.value || b || !t.value || !l.value) return;
        const z = m;
        (i.value = !0), (u.value = ""), (d.value = "");
        try {
          const O = await x({
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(l.value),
          });
          if (b || z !== m) return;
          (l.value = O.config), (d.value = "领取设置已保存。");
        } catch (O) {
          !b && z === m && (u.value = O.message);
        } finally {
          z === m && (i.value = !1);
        }
      }
      function q() {
        document.hidden && E();
      }
      function le() {
        E();
      }
      return (
        bt(() => {
          document.addEventListener("visibilitychange", q),
            window.addEventListener("pagehide", le);
        }),
        Zt(() => {
          (b = !0),
            E(),
            document.removeEventListener("visibilitychange", q),
            window.removeEventListener("pagehide", le);
        }),
        (z, O) => (
          A(),
          $("section", np, [
            t.value
              ? (A(),
                $(
                  he,
                  { key: 1 },
                  [
                    r("header", rp, [
                      O[11] ||
                        (O[11] = r("span", null, "已通过独立密码验证", -1)),
                      r(
                        "button",
                        {
                          type: "button",
                          class: "btn-plain",
                          onClick: O[1] || (O[1] = (R) => E()),
                        },
                        "立即锁定",
                      ),
                    ]),
                    O[20] ||
                      (O[20] = r(
                        "p",
                        { class: "public-note" },
                        "这里的微信号、二维码和领取说明会展示给未登录用户。仅展示联系方式，不会公开卡密库存。",
                        -1)),
                    o.value ? (A(), $("p", ap, "正在加载设置…")) : Y("", !0),
                    u.value ? (A(), $("p", up, I(u.value), 1)) : Y("", !0),
                    !l.value && !o.value
                      ? (A(),
                        $(
                          "button",
                          { key: 2, class: "btn-plain", onClick: N },
                          "重新加载"))
                      : Y("", !0),
                    l.value
                      ? (A(),
                        $(
                          "form",
                          { key: 3, onSubmit: un(se, ["prevent"]) },
                          [
                            r(
                              "fieldset",
                              { disabled: i.value || a.value },
                              [
                                r("label", dp, [
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          O[2] ||
                                          (O[2] = (R) => (l.value.enabled = R)),
                                        type: "checkbox",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[Un, l.value.enabled]],
                                  ),
                                  O[12] ||
                                    (O[12] = ue(
                                      " 在用户登录页显示「领取卡密」入口",
                                      -1)),
                                ]),
                                r("label", null, [
                                  O[13] || (O[13] = ue("弹窗标题", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          O[3] ||
                                          (O[3] = (R) => (l.value.title = R)),
                                        maxlength: "40",
                                        required: "",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, l.value.title]],
                                  ),
                                ]),
                                r("label", null, [
                                  O[14] || (O[14] = ue("客服微信号", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          O[4] ||
                                          (O[4] = (R) => (l.value.wechat = R)),
                                        maxlength: "64",
                                        required: l.value.enabled,
                                        placeholder: "例如：wx520qfj",
                                        spellcheck: "false",
                                      },
                                      null,
                                      8,
                                      fp,
                                    ),
                                    [[ye, l.value.wechat]],
                                  ),
                                ]),
                                r("div", pp, [
                                  r("div", null, [
                                    O[15] ||
                                      (O[15] = r(
                                        "span",
                                        { class: "field-title" },
                                        "微信加好友二维码",
                                        -1)),
                                    O[16] ||
                                      (O[16] = r(
                                        "p",
                                        null,
                                        "PNG、JPG、WEBP，最大 1 MB。请上传清晰、完整的二维码。",
                                        -1)),
                                    r(
                                      "input",
                                      {
                                        type: "file",
                                        "aria-label": "上传微信二维码",
                                        accept:
                                          "image/png,image/jpeg,image/webp",
                                        onChange: J,
                                      },
                                      null,
                                      32,
                                    ),
                                    r("div", hp, [
                                      l.value.qrImage
                                        ? (A(),
                                          $(
                                            "button",
                                            {
                                              key: 0,
                                              type: "button",
                                              class: "btn-plain",
                                              onClick:
                                                O[5] ||
                                                (O[5] = (R) =>
                                                  (l.value.qrImage = "")),
                                            },
                                            "移除二维码"))
                                        : Y("", !0),
                                      r(
                                        "button",
                                        {
                                          type: "button",
                                          class: "btn-plain",
                                          onClick:
                                            O[6] ||
                                            (O[6] = (R) =>
                                              (l.value.qrImage =
                                                "/api/site/card-claim/qr")),
                                        },
                                        "使用初始二维码",
                                      ),
                                    ]),
                                  ]),
                                  l.value.qrImage
                                    ? (A(),
                                      $(
                                        "img",
                                        {
                                          key: 0,
                                          src: l.value.qrImage,
                                          alt: "当前微信二维码预览",
                                        },
                                        null,
                                        8,
                                        vp))
                                    : Y("", !0),
                                ]),
                                r("label", null, [
                                  O[17] || (O[17] = ue("领取说明", -1)),
                                  ie(
                                    r(
                                      "textarea",
                                      {
                                        "onUpdate:modelValue":
                                          O[7] ||
                                          (O[7] = (R) =>
                                            (l.value.description = R)),
                                        maxlength: "2000",
                                        rows: "4",
                                        required: l.value.enabled,
                                      },
                                      null,
                                      8,
                                      mp,
                                    ),
                                    [[ye, l.value.description]],
                                  ),
                                ]),
                                r("label", null, [
                                  O[18] ||
                                    (O[18] = ue("客服服务时间（选填）", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          O[8] ||
                                          (O[8] = (R) =>
                                            (l.value.serviceHours = R)),
                                        maxlength: "100",
                                        placeholder:
                                          "例如：每天 09:00—22:00，不填则不显示",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, l.value.serviceHours]],
                                  ),
                                ]),
                                r(
                                  "button",
                                  gp,
                                  I(
                                    i.value
                                      ? "保存中…"
                                      : a.value
                                        ? "读取图片中…"
                                        : "保存领取设置",
                                  ),
                                  1,
                                ),
                              ],
                              8,
                              cp,
                            ),
                            d.value
                              ? (A(), $("p", yp, I(d.value), 1))
                              : Y("", !0),
                            O[19] ||
                              (O[19] = r(
                                "p",
                                { class: "save-tip" },
                                "修改后请点击保存。用户下次打开领取弹窗时会读取最新信息。",
                                -1)),
                          ],
                          32))
                      : Y("", !0),
                  ],
                  64))
              : (A(),
                $("div", sp, [
                  O[9] || (O[9] = r("h2", null, "卡密领取设置 · 独立验证", -1)),
                  O[10] ||
                    (O[10] = r(
                      "p",
                      null,
                      "请输入管理独立密码。解锁后可查看和修改设置，有效期 10 分钟；离开栏目或隐藏页面后自动锁定，未保存的修改不会保留。",
                      -1)),
                  r(
                    "form",
                    { onSubmit: un(k, ["prevent"]), class: "unlock-form" },
                    [
                      ie(
                        r(
                          "input",
                          {
                            "onUpdate:modelValue":
                              O[0] || (O[0] = (R) => (n.value = R)),
                            type: "password",
                            "aria-label": "卡密领取设置独立密码",
                            placeholder: "请输入独立密码",
                            autocomplete: "off",
                            maxlength: "256",
                            disabled: s.value,
                          },
                          null,
                          8,
                          lp,
                        ),
                        [[ye, n.value]],
                      ),
                      r(
                        "button",
                        {
                          type: "submit",
                          class: "btn",
                          disabled: s.value || !n.value,
                        },
                        I(s.value ? "验证中…" : "解锁设置"),
                        9,
                        op,
                      ),
                    ],
                    32,
                  ),
                  u.value ? (A(), $("p", ip, I(u.value), 1)) : Y("", !0),
                ])),
          ])
        )
      );
    },
  },
  _p = Pt(bp, [["__scopeId", "data-v-00bc54dd"]]),
  wp = { class: "oss-manager" },
  Ep = { key: 0, class: "access-lock" },
  Cp = ["disabled"],
  kp = ["disabled"],
  xp = { class: "access-bar" },
  Ap = { key: 0, role: "status" },
  Sp = ["disabled"],
  Tp = { class: "toggle" },
  Op = { class: "hint" },
  Rp = { class: "grid-fields" },
  $p = { class: "grid-fields" },
  Pp = ["placeholder"],
  Ip = ["placeholder"],
  Np = { class: "actions" },
  Mp = { class: "btn", type: "submit" },
  Dp = { key: 2, class: "error", role: "alert" },
  Vp = { key: 3, class: "success", role: "status" },
  Lp = {
    __name: "OssManager",
    setup(e) {
      const t = M(""),
        n = M(""),
        s = M(!1),
        l = M(null),
        o = M(!1),
        i = M(!1),
        a = M(""),
        u = M(""),
        d = M(""),
        c = "/api/admin/oss",
        f = new Set();
      let y,
        m = 0,
        b = !1;
      function C(O) {
        O &&
          fetch(c + "/lock", {
            method: "POST",
            headers: { "X-Oss-Token": O },
            keepalive: !0,
          }).catch(() => {});
      }
      function _(O = "") {
        const R = t.value;
        m++,
          clearTimeout(y),
          (t.value = ""),
          (n.value = ""),
          (l.value = null),
          (i.value = !1),
          (a.value = ""),
          (s.value = !1),
          (o.value = !1),
          (u.value = O),
          (d.value = "");
        for (const Q of f) Q.abort();
        f.clear(), C(R);
      }
      async function E() {
        if (s.value || b || !n.value) return;
        const O = m,
          R = new AbortController();
        f.add(R);
        const Q = JSON.stringify({ password: n.value });
        (n.value = ""), (s.value = !0), (u.value = "");
        try {
          const re = await fetch(c + "/unlock", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: Q,
              signal: R.signal,
              cache: "no-store",
            }),
            pe = await re.json().catch(() => ({}));
          if (b || O !== m) {
            C(pe.token);
            return;
          }
          if (!re.ok || !pe.ok) throw Error(pe.msg || "验证失败，请重试");
          if (
            !pe.token ||
            !Number.isFinite(pe.expiresAt) ||
            pe.expiresAt <= Date.now()
          )
            throw (C(pe.token), Error("验证已失效，请重新输入独立密码"));
          (t.value = pe.token),
            (y = setTimeout(
              () => _("验证已过期，请重新输入独立密码"),
              pe.expiresAt - Date.now())),
            await N();
        } catch (re) {
          !b && O === m && (u.value = re.message);
        } finally {
          f.delete(R), O === m && (s.value = !1);
        }
      }
      async function k(O = "", R = {}) {
        if (!t.value || b) throw Error("请先输入独立密码解锁 OSS 设置");
        const Q = m,
          re = new AbortController();
        f.add(re);
        try {
          const pe = await fetch(c + O, {
              cache: "no-store",
              ...R,
              headers: { ...R.headers, "X-Oss-Token": t.value },
              signal: re.signal,
            }),
            $e = await pe.json().catch(() => ({}));
          if (b || Q !== m) throw Error("栏目已锁定");
          if (pe.status === 401 || $e.code === "OSS_LOCKED")
            throw (_("验证已失效，请重新输入独立密码"), Error("栏目已锁定"));
          if (!pe.ok || !$e.ok) throw Error($e.msg || "请求失败，请重试");
          return $e;
        } finally {
          f.delete(re);
        }
      }
      function x(O) {
        (l.value = { ...O, accessKeyId: "", accessKeySecret: "" }),
          (o.value = O.enabled);
      }
      async function N() {
        if (i.value || b || !t.value) return;
        const O = m;
        (i.value = !0), (u.value = "");
        try {
          const R = await k();
          !b && O === m && x(R.config);
        } catch (R) {
          !b && O === m && (u.value = R.message);
        } finally {
          O === m && (i.value = !1);
        }
      }
      async function J(O = !1) {
        if (a.value || b || !t.value || !l.value) return;
        const R = m;
        (a.value = O ? "test" : "save"), (u.value = ""), (d.value = "");
        try {
          const Q = await k(O ? "/test" : "", {
            method: O ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(l.value),
          });
          if (b || R !== m) return;
          O || x(Q.config),
            (d.value = O
              ? Q.msg
              : Q.config.enabled
                ? "统一 OSS 已保存并启用，新上传使用平台配置。"
                : "设置已保存，统一 OSS 未启用，保留老用户已有配置。");
        } catch (Q) {
          !b && R === m && (u.value = Q.message);
        } finally {
          R === m && (a.value = "");
        }
      }
      const se = () => J(!1),
        q = () => J(!0);
      function le() {
        document.hidden && _();
      }
      function z() {
        _();
      }
      return (
        bt(() => {
          document.addEventListener("visibilitychange", le),
            window.addEventListener("pagehide", z);
        }),
        Zt(() => {
          (b = !0),
            _(),
            document.removeEventListener("visibilitychange", le),
            window.removeEventListener("pagehide", z);
        }),
        (O, R) => (
          A(),
          $("section", wp, [
            t.value
              ? (A(),
                $(
                  he,
                  { key: 1 },
                  [
                    r("header", xp, [
                      R[12] ||
                        (R[12] = r("span", null, "已通过独立密码验证", -1)),
                      r(
                        "button",
                        {
                          type: "button",
                          class: "btn-plain",
                          onClick: R[1] || (R[1] = (Q) => _()),
                        },
                        "立即锁定",
                      ),
                    ]),
                    R[25] ||
                      (R[25] = r(
                        "p",
                        { class: "notice" },
                        "统一配置用于原有的图片、视频素材上传。启用后，所有用户的新上传使用平台 OSS，用户端无需配置；费用由平台承担。本设置不会自动转存 AI 生成图或迁移历史图片。",
                        -1)),
                    i.value ? (A(), $("p", Ap, "正在加载设置…")) : Y("", !0),
                    !l.value && !i.value
                      ? (A(),
                        $(
                          "button",
                          { key: 1, class: "btn-plain", onClick: N },
                          "重新加载"))
                      : Y("", !0),
                    l.value
                      ? (A(),
                        $(
                          "form",
                          { key: 2, onSubmit: un(se, ["prevent"]) },
                          [
                            r(
                              "fieldset",
                              { disabled: a.value !== "" },
                              [
                                r("label", Tp, [
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          R[2] ||
                                          (R[2] = (Q) => (l.value.enabled = Q)),
                                        type: "checkbox",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[Un, l.value.enabled]],
                                  ),
                                  R[13] || (R[13] = ue("启用平台统一 OSS", -1)),
                                ]),
                                r(
                                  "p",
                                  Op,
                                  "当前已保存状态：" +
                                    I(
                                      o.value
                                        ? "已启用统一存储"
                                        : "未启用，兼容老用户已有配置",
                                    ) +
                                    "。停用时仅回退到各用户原有配置，没有配置的用户需联系管理员。更改开关后需点击保存。",
                                  1,
                                ),
                                r("div", Rp, [
                                  r("label", null, [
                                    R[14] || (R[14] = ue("Region", -1)),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            R[3] ||
                                            (R[3] = (Q) =>
                                              (l.value.region = Q)),
                                          placeholder: "oss-cn-hangzhou",
                                          maxlength: "128",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, l.value.region]],
                                    ),
                                  ]),
                                  r("label", null, [
                                    R[15] || (R[15] = ue("Bucket", -1)),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            R[4] ||
                                            (R[4] = (Q) =>
                                              (l.value.bucket = Q)),
                                          placeholder: "your-bucket",
                                          maxlength: "63",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, l.value.bucket]],
                                    ),
                                  ]),
                                ]),
                                r("label", null, [
                                  R[16] || (R[16] = ue("Endpoint（可选）", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          R[5] ||
                                          (R[5] = (Q) =>
                                            (l.value.endpoint = Q)),
                                        placeholder:
                                          "通常留空，按 Region 自动选择",
                                        maxlength: "512",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, l.value.endpoint]],
                                  ),
                                  R[17] ||
                                    (R[17] = r(
                                      "small",
                                      null,
                                      "如需填写，请使用阿里云 OSS HTTPS 地域端点。",
                                      -1)),
                                ]),
                                r("div", $p, [
                                  r("label", null, [
                                    R[18] || (R[18] = ue("AccessKey ID", -1)),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            R[6] ||
                                            (R[6] = (Q) =>
                                              (l.value.accessKeyId = Q)),
                                          type: "password",
                                          autocomplete: "new-password",
                                          placeholder: l.value.accessKeyIdSet
                                            ? "已保存，留空保持不变"
                                            : "填写 AccessKey ID",
                                          maxlength: "512",
                                        },
                                        null,
                                        8,
                                        Pp,
                                      ),
                                      [[ye, l.value.accessKeyId]],
                                    ),
                                  ]),
                                  r("label", null, [
                                    R[19] ||
                                      (R[19] = ue("AccessKey Secret", -1)),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            R[7] ||
                                            (R[7] = (Q) =>
                                              (l.value.accessKeySecret = Q)),
                                          type: "password",
                                          autocomplete: "new-password",
                                          placeholder: l.value
                                            .accessKeySecretSet
                                            ? "已保存，留空保持不变"
                                            : "填写 AccessKey Secret",
                                          maxlength: "512",
                                        },
                                        null,
                                        8,
                                        Ip,
                                      ),
                                      [[ye, l.value.accessKeySecret]],
                                    ),
                                  ]),
                                ]),
                                R[24] ||
                                  (R[24] = r(
                                    "p",
                                    { class: "hint" },
                                    "已保存的密钥不会回显。建议使用仅限指定 Bucket 和目录的 RAM 凭证；更换账号时请同时填写 ID 和 Secret。",
                                    -1)),
                                r("label", null, [
                                  R[20] || (R[20] = ue("对象目录", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          R[8] ||
                                          (R[8] = (Q) => (l.value.prefix = Q)),
                                        placeholder: "lingxi-ai/uploads",
                                        maxlength: "512",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, l.value.prefix]],
                                  ),
                                  R[21] ||
                                    (R[21] = r(
                                      "small",
                                      null,
                                      "新上传文件会在此目录下按卡密归属分目录存放，不改变项目归属或历史地址。",
                                      -1)),
                                ]),
                                r("label", null, [
                                  R[22] ||
                                    (R[22] = ue("自定义访问域名（可选）", -1)),
                                  ie(
                                    r(
                                      "input",
                                      {
                                        "onUpdate:modelValue":
                                          R[9] ||
                                          (R[9] = (Q) =>
                                            (l.value.publicBaseUrl = Q)),
                                        placeholder:
                                          "https://media.example.com",
                                        maxlength: "512",
                                      },
                                      null,
                                      512,
                                    ),
                                    [[ye, l.value.publicBaseUrl]],
                                  ),
                                  R[23] ||
                                    (R[23] = r(
                                      "small",
                                      null,
                                      "仅填写已配置好的 HTTPS 访问域名。留空使用现有 24 小时签名链接机制，本次不改变历史链接有效期。",
                                      -1)),
                                ]),
                                r("div", Np, [
                                  r(
                                    "button",
                                    {
                                      type: "button",
                                      class: "btn-plain",
                                      onClick: q,
                                    },
                                    I(
                                      a.value === "test"
                                        ? "测试中…"
                                        : "测试连接（不保存）",
                                    ),
                                    1,
                                  ),
                                  r(
                                    "button",
                                    Mp,
                                    I(
                                      a.value === "save"
                                        ? "保存中…"
                                        : "保存设置",
                                    ),
                                    1,
                                  ),
                                ]),
                              ],
                              8,
                              Sp,
                            ),
                          ],
                          32))
                      : Y("", !0),
                  ],
                  64))
              : (A(),
                $("div", Ep, [
                  R[10] ||
                    (R[10] = r("h2", null, "OSS 存储设置 · 独立验证", -1)),
                  R[11] ||
                    (R[11] = r(
                      "p",
                      null,
                      "请输入管理独立密码。解锁有效期 10 分钟，离开栏目或隐藏页面后自动锁定。",
                      -1)),
                  r(
                    "form",
                    { class: "unlock-form", onSubmit: un(E, ["prevent"]) },
                    [
                      ie(
                        r(
                          "input",
                          {
                            "onUpdate:modelValue":
                              R[0] || (R[0] = (Q) => (n.value = Q)),
                            type: "password",
                            "aria-label": "OSS 设置独立密码",
                            placeholder: "请输入独立密码",
                            autocomplete: "off",
                            maxlength: "256",
                            disabled: s.value,
                          },
                          null,
                          8,
                          Cp,
                        ),
                        [[ye, n.value]],
                      ),
                      r(
                        "button",
                        {
                          type: "submit",
                          class: "btn",
                          disabled: s.value || !n.value,
                        },
                        I(s.value ? "验证中…" : "解锁设置"),
                        9,
                        kp,
                      ),
                    ],
                    32,
                  ),
                ])),
            u.value ? (A(), $("p", Dp, I(u.value), 1)) : Y("", !0),
            d.value ? (A(), $("p", Vp, I(d.value), 1)) : Y("", !0),
          ])
        )
      );
    },
  },
  Up = Pt(Lp, [["__scopeId", "data-v-a0b62a8c"]]),
  jp = { class: "wm-panel" },
  Fp = { class: "wm-toolbar" },
  Bp = { key: 0, role: "alert" },
  Hp = { key: 1 },
  Kp = { key: 2 },
  Wp = { class: "wm-preview" },
  Gp = ["src"],
  qp = ["onClick"],
  zp = ["src", "alt"],
  Jp = { class: "wm-copy" },
  Xp = { class: "wm-description" },
  Yp = { key: 0 },
  Qp = { key: 1, class: "wm-reports" },
  Zp = { class: "wm-actions" },
  eh = ["disabled", "onClick"],
  th = ["disabled", "onClick"],
  nh = ["disabled", "onClick"],
  sh = ["disabled", "onClick"],
  lh = ["disabled", "onClick"],
  oh = { key: 3, class: "wm-pagination" },
  ih = ["disabled"],
  rh = ["disabled"],
  ah = {
    __name: "WorksManager",
    setup(e) {
      const t = M("pending"),
        n = M(1),
        s = M(0),
        l = M([]),
        o = M(!1),
        i = M(!1),
        a = M(""),
        u = M(null),
        d = {
          pending: "待审核",
          published: "已公开",
          rejected: "未通过",
          hidden: "已下架",
        };
      async function c() {
        (o.value = !0), (a.value = ""), (u.value = null);
        try {
          const y = await fetch(
              `/api/admin/works?status=${t.value}&page=${n.value}`,
            ),
            m = await y.json();
          if (!y.ok || !m.ok) throw new Error(m.msg || "加载失败");
          (l.value = m.works), (s.value = m.total);
        } catch (y) {
          a.value = y.message;
        } finally {
          o.value = !1;
        }
      }
      async function f(y, m) {
        let b = "";
        if (
          !(
            ["reject", "hide"].includes(m) &&
            ((b = prompt(
              m === "reject"
                ? "填写未通过原因，作者可看到："
                : "填写下架原因，作者可看到：")),
            !(b != null && b.trim()))
          ) &&
          !(m === "publish" && !confirm(`确认审核通过并公开“${y.title}”？`))
        ) {
          (i.value = !0), (a.value = "");
          try {
            const C = await fetch(`/api/admin/works/${y.id}/review`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: m,
                  note: b,
                  revision: y.revision,
                  recommended: !y.recommended,
                }),
              }),
              _ = await C.json();
            if (!C.ok || !_.ok) throw new Error(_.msg || "操作失败");
            await c();
          } catch (C) {
            a.value = C.message;
          } finally {
            i.value = !1;
          }
        }
      }
      return (
        bt(c),
        (y, m) => (
          A(),
          $("section", jp, [
            r("div", Fp, [
              ie(
                r(
                  "select",
                  {
                    "onUpdate:modelValue":
                      m[0] || (m[0] = (b) => (t.value = b)),
                    onChange:
                      m[1] ||
                      (m[1] = (b) => {
                        (n.value = 1), c();
                      }),
                  },
                  [
                    ...(m[4] ||
                      (m[4] = [
                        os(
                          '<option value="pending" data-v-868a8887>待审核</option><option value="published" data-v-868a8887>已公开</option><option value="reported" data-v-868a8887>待处理举报</option><option value="rejected" data-v-868a8887>未通过</option><option value="hidden" data-v-868a8887>已下架</option><option value="all" data-v-868a8887>全部作品</option>',
                          6,
                        ),
                      ])),
                  ],
                  544,
                ),
                [[Bt, t.value]],
              ),
              r("button", { onClick: c }, "刷新"),
              r("span", null, "共 " + I(s.value) + " 个作品", 1),
            ]),
            a.value ? (A(), $("p", Bp, I(a.value), 1)) : Y("", !0),
            o.value
              ? (A(), $("p", Hp, "正在加载…"))
              : l.value.length
                ? Y("", !0)
                : (A(), $("p", Kp, "当前没有作品。")),
            (A(!0),
            $(
              he,
              null,
              Be(l.value, (b) => {
                var C, _;
                return (
                  A(),
                  $("article", { key: b.id, class: "wm-work" }, [
                    r("div", Wp, [
                      u.value === b.id
                        ? (A(),
                          $(
                            "video",
                            {
                              key: 0,
                              src: b.video_url,
                              controls: "",
                              playsinline: "",
                              preload: "metadata",
                            },
                            null,
                            8,
                            Gp))
                        : (A(),
                          $(
                            "button",
                            { key: 1, onClick: (E) => (u.value = b.id) },
                            [
                              r(
                                "img",
                                { src: b.cover_url, alt: b.title },
                                null,
                                8,
                                zp,
                              ),
                              m[5] ||
                                (m[5] = r("span", null, "▶ 预览视频", -1)),
                            ],
                            8,
                            qp)),
                    ]),
                    r("div", Jp, [
                      r("h3", null, [
                        ue(I(b.title) + " ", 1),
                        r("small", null, "#" + I(b.id), 1),
                      ]),
                      r(
                        "p",
                        null,
                        I(b.author_name) +
                          " · " +
                          I(d[b.status]) +
                          " · " +
                          I(Math.round(b.duration)) +
                          "秒 · " +
                          I(b.allow_download ? "开放下载" : "禁止下载"),
                        1,
                      ),
                      r("p", Xp, I(b.description || "暂无简介"), 1),
                      b.review_note
                        ? (A(), $("p", Yp, "审核说明：" + I(b.review_note), 1))
                        : Y("", !0),
                      (C = b.reports) != null && C.length
                        ? (A(),
                          $("div", Qp, [
                            r(
                              "b",
                              null,
                              "举报 " + I(b.reports.length) + " 条",
                              1,
                            ),
                            (A(!0),
                            $(
                              he,
                              null,
                              Be(
                                b.reports,
                                (E) => (
                                  A(), $("p", { key: E.id }, I(E.reason), 1)
                                ),
                              ),
                              128)),
                          ]))
                        : Y("", !0),
                      r("div", Zp, [
                        b.status !== "published"
                          ? (A(),
                            $(
                              "button",
                              {
                                key: 0,
                                disabled: i.value,
                                onClick: (E) => f(b, "publish"),
                              },
                              "审核通过并公开",
                              8,
                              eh))
                          : Y("", !0),
                        b.status === "pending"
                          ? (A(),
                            $(
                              "button",
                              {
                                key: 1,
                                disabled: i.value,
                                onClick: (E) => f(b, "reject"),
                              },
                              "不通过",
                              8,
                              th))
                          : Y("", !0),
                        b.status === "published"
                          ? (A(),
                            $(
                              "button",
                              {
                                key: 2,
                                disabled: i.value,
                                onClick: (E) => f(b, "recommend"),
                              },
                              I(b.recommended ? "取消推荐" : "设为推荐"),
                              9,
                              nh))
                          : Y("", !0),
                        b.status === "published"
                          ? (A(),
                            $(
                              "button",
                              {
                                key: 3,
                                disabled: i.value,
                                onClick: (E) => f(b, "hide"),
                              },
                              "下架",
                              8,
                              sh))
                          : Y("", !0),
                        (_ = b.reports) != null && _.length
                          ? (A(),
                            $(
                              "button",
                              {
                                key: 4,
                                disabled: i.value,
                                onClick: (E) => f(b, "resolve-reports"),
                              },
                              "举报已处理",
                              8,
                              lh))
                          : Y("", !0),
                      ]),
                    ]),
                  ])
                );
              }),
              128)),
            s.value > 12
              ? (A(),
                $("div", oh, [
                  r(
                    "button",
                    {
                      disabled: n.value <= 1 || o.value,
                      onClick:
                        m[2] ||
                        (m[2] = (b) => {
                          n.value--, c();
                        }),
                    },
                    "上一页",
                    8,
                    ih,
                  ),
                  r(
                    "span",
                    null,
                    I(n.value) + " / " + I(Math.ceil(s.value / 12)),
                    1,
                  ),
                  r(
                    "button",
                    {
                      disabled: n.value * 12 >= s.value || o.value,
                      onClick:
                        m[3] ||
                        (m[3] = (b) => {
                          n.value++, c();
                        }),
                    },
                    "下一页",
                    8,
                    rh,
                  ),
                ]))
              : Y("", !0),
          ])
        )
      );
    },
  },
  uh = Pt(ah, [["__scopeId", "data-v-868a8887"]]);
function ch(e) {
  return e.expires_at
    ? new Date(e.expires_at).toLocaleString("zh-CN", { hour12: !1 })
    : e.card_type === "permanent"
      ? "永久有效"
      : e.status === "unused" && !e.activated_at && e.duration_ms > 0
        ? "未激活，激活后计时"
        : "—";
}
const dh = { key: 0, class: "admin-login panel" },
  fh = { key: 0, class: "message error" },
  ph = ["disabled"],
  hh = { class: "admin-sidebar" },
  vh = { "aria-label": "后台栏目" },
  mh = ["aria-current", "onClick"],
  gh = { "aria-hidden": "true" },
  yh = { class: "admin-header" },
  bh = { class: "actions" },
  _h = { class: "metrics" },
  wh = { class: "metric panel" },
  Eh = { class: "metric panel" },
  Ch = { class: "metric panel" },
  kh = { class: "metric panel" },
  xh = { class: "grid" },
  Ah = { class: "panel card-panel" },
  Sh = { class: "create-row" },
  Th = ["disabled"],
  Oh = { key: 0, class: "generated-cards" },
  Rh = { class: "generated-header" },
  $h = ["disabled"],
  Ph = ["value"],
  Ih = { class: "table-wrap" },
  Nh = { class: "row-actions" },
  Mh = ["onClick"],
  Dh = ["onClick"],
  Vh = ["onClick"],
  Lh = { key: 0 },
  Uh = { class: "panel side-panel" },
  jh = { class: "detail" },
  Fh = { class: "detail" },
  Bh = { class: "detail" },
  Hh = { class: "detail" },
  Kh = { class: "panel style-panel" },
  Wh = { class: "style-editor" },
  Gh = { class: "style-enabled" },
  qh = { class: "style-editor-actions" },
  zh = { class: "table-wrap style-table-wrap" },
  Jh = { class: "style-name-cell" },
  Xh = ["src", "alt"],
  Yh = { class: "style-key" },
  Qh = ["title"],
  Zh = { class: "row-actions" },
  ev = ["onClick"],
  tv = { class: "upload-link" },
  nv = ["onChange"],
  sv = ["onClick"],
  lv = ["onClick"],
  ov = { key: 0 },
  iv = {
    __name: "Admin",
    setup(e) {
      const t = Zi(),
        n = Pc(),
        s = M(null),
        l = [
          {
            id: "works",
            label: "作品广场管理",
            icon: "🎬",
            description: "审核用户作品、设置推荐并处理举报",
          },
          {
            id: "overview",
            label: "运行概况",
            icon: "📊",
            description: "查看服务状态与任务概况",
          },
          {
            id: "oss",
            label: "OSS 存储设置",
            icon: "☁️",
            description: "统一管理素材上传存储，用户端无需填写 OSS 配置",
          },
          {
            id: "styles",
            label: "画风设定",
            icon: "🎨",
            description: "管理画风名称、提示词与示例图片",
          },
          {
            id: "tutorials",
            label: "教程中心管理",
            icon: "📖",
            description: "管理教程分类、图文文章和视频",
          },
        ],
        o = De(() =>
          l.some((h) => h.id === t.query.section) ? t.query.section : "overview",
        ),
        i = De(() => l.find((h) => h.id === o.value)),
        a = M({});
      function u(h) {
        o.value !== h &&
          n.push({ path: "/admin", query: { ...t.query, section: h } });
      }
      Cn(
        o,
        async (h) => {
          var v;
          (a.value[h] = !0),
            await bs(),
            (v = s.value) == null || v.scrollTo({ top: 0 });
        },
        { immediate: !0 },
      );
      const d = M(!1),
        c = M(""),
        f = M(!1),
        y = M(""),
        m = M("error"),
        b = M([]),
        C = M({}),
        _ = M(1),
        E = M("month"),
        k = M(!1),
        x = M([]),
        N = M(null),
        J = M(!1),
        se = M(""),
        q = M(!1),
        le = M([]),
        z = M(null),
        O = M({
          label: "",
          preset_key: "",
          category: "live",
          tone: "film",
          prompt: "",
          sort_order: 0,
          enabled: !0,
        }),
        R = M({}),
        Q = De(() => {
          var v;
          const h = Number(
            ((v = C.value.server) == null ? void 0 : v.uptime) || 0,
          );
          return h < 60
            ? `${h} 秒`
            : h < 3600
              ? `${Math.floor(h / 60)} 分钟`
              : `${Math.floor(h / 3600)} 小时`;
        });
      function re(h) {
        return (
          {
            unused: "未使用",
            used: "已使用",
            revoked: "已撤销",
            expired: "已过期",
          }[h] || h
        );
      }
      function pe(h) {
        var v;
        return (((v = C.value.tasks) == null ? void 0 : v[h]) || []).reduce(
          (T, S) => T + Number(S.count || 0),
          0,
        );
      }
      function $e(h) {
        return { live: "真人", anime: "动漫", "3d": "3D" }[h] || h;
      }
      function te(h, v = "error") {
        (y.value = h),
          (m.value = v),
          setTimeout(() => {
            y.value = "";
          }, 3e3);
      }
      async function j(h, v) {
        const T = await fetch(h, v),
          S = await T.json().catch(() => ({}));
        if (!T.ok) throw new Error(S.msg || "请求失败");
        return S;
      }
      async function F() {
        const h = await j("/api/admin/status");
        (d.value = !!h.authenticated), d.value && (await ge());
      }
      async function Z() {
        if (!c.value) return te("请输入后台密码");
        f.value = !0;
        try {
          await j("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password: c.value }),
          }),
            (d.value = !0),
            (c.value = ""),
            await ge();
        } catch (h) {
          te(h.message);
        } finally {
          f.value = !1;
        }
      }
      async function me() {
        await j("/api/admin/logout", { method: "POST" }).catch(() => {}),
          (d.value = !1),
          (x.value = []),
          (se.value = "");
      }
      // 卡密已从本工程移除：概况与画风设置就位即可，不再拉取卡密列表。
      async function ge() {
        const [h, T] = await Promise.all([
          j("/api/admin/overview"),
          j("/api/admin/style-presets"),
        ]);
        (C.value = h), (b.value = []), (le.value = T.presets || []);
      }
      function Ce() {
        (z.value = null),
          (O.value = {
            label: "",
            preset_key: "",
            category: "live",
            tone: "film",
            prompt: "",
            sort_order: 0,
            enabled: !0,
          });
      }
      function K(h) {
        var v;
        (z.value = h.id),
          (O.value = {
            label: h.label,
            preset_key: h.preset_key,
            category: h.category,
            tone: h.tone,
            prompt: h.prompt,
            sort_order: h.sort_order,
            enabled: !!h.enabled,
          }),
          (v = s.value) == null || v.scrollTo({ top: 0, behavior: "smooth" });
      }
      async function V() {
        try {
          const h = z.value ? "PUT" : "POST",
            v = z.value
              ? `/api/admin/style-presets/${z.value}`
              : "/api/admin/style-presets";
          await j(v, {
            method: h,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(O.value),
          }),
            await ge(),
            Ce(),
            te("画风设定已保存，用户端新建项目会读取最新启用列表", "success");
        } catch (h) {
          te(h.message);
        }
      }
      async function B(h) {
        if (confirm(`确定删除画风“${h.label}”？已创建项目不受影响。`))
          try {
            await j(`/api/admin/style-presets/${h.id}`, { method: "DELETE" }),
              await ge(),
              z.value === h.id && Ce(),
              te("画风已删除", "success");
          } catch (v) {
            te(v.message);
          }
      }
      async function fe(h, v) {
        var D, w;
        const T = (D = v.target.files) == null ? void 0 : D[0];
        if (((v.target.value = ""), !T)) return;
        const S = `.${((w = T.name.split(".").pop()) == null ? void 0 : w.toLowerCase()) || ""}`;
        if (![".jpg", ".jpeg", ".jfif", ".png", ".webp", ".avif"].includes(S)) {
          R.value[h.id] = {
            type: "error",
            text: "上传失败：仅支持 JPG、PNG、WEBP、AVIF",
          };
          return;
        }
        if (T.size > 5 * 1024 * 1024) {
          R.value[h.id] = { type: "error", text: "上传失败：图片不能超过 5MB" };
          return;
        }
        R.value[h.id] = { type: "pending", text: "上传中…" };
        const L = new FormData();
        L.append("image", T);
        try {
          await j(`/api/admin/style-presets/${h.id}/image`, {
            method: "POST",
            body: L,
          }),
            await ge(),
            (R.value[h.id] = { type: "success", text: "上传成功" }),
            te("画风示例图已上传", "success");
        } catch (X) {
          (R.value[h.id] = { type: "error", text: `上传失败：${X.message}` }),
            te(X.message);
        }
      }
      async function P(h) {
        if (confirm(`移除“${h.label}”的示例图？`))
          try {
            await j(`/api/admin/style-presets/${h.id}/image`, {
              method: "DELETE",
            }),
              await ge(),
              te("示例图已移除", "success");
          } catch (v) {
            te(v.message);
          }
      }
      async function W() {
        if (!k.value) {
          k.value = !0;
          try {
            const h = await j("/api/admin/cards", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ count: _.value, cardType: E.value }),
            });
            (x.value = h.cards || []),
              (se.value = ""),
              te(
                `已生成 ${x.value.length} 张卡密，点击“一键复制本批卡密”即可复制`,
                "success",
              ),
              await ge().catch(() =>
                te(
                  "卡密已生成并显示在下方，列表刷新失败，请点击刷新；无需重复生成",
                ),
              );
          } catch (h) {
            te(h.message);
          } finally {
            k.value = !1;
          }
        }
      }
      async function H(h) {
        var S, U;
        if ((S = navigator.clipboard) != null && S.writeText)
          try {
            return await navigator.clipboard.writeText(h), !0;
          } catch {}
        const v = document.createElement("textarea");
        (v.value = h),
          (v.readOnly = !0),
          (v.style.cssText = "position:fixed;left:-9999px;top:0;");
        const T = document.activeElement;
        document.body.appendChild(v), v.select();
        try {
          return document.execCommand("copy");
        } catch {
          return !1;
        } finally {
          v.remove(),
            (U = T == null ? void 0 : T.focus) == null ||
              U.call(T, { preventScroll: !0 });
        }
      }
      async function ee() {
        var v, T;
        if (J.value || !x.value.length) return;
        J.value = !0;
        const h = [...x.value];
        try {
          const S = await H(
            h.join(`
`),
          );
          (q.value = !S),
            (se.value = S
              ? `已复制 ${h.length} 张卡密，每行一张`
              : "浏览器未允许自动复制，已选中卡密，请按 Ctrl+C 或长按复制。"),
            S ||
              ((v = N.value) == null || v.focus(),
              (T = N.value) == null || T.select());
        } finally {
          J.value = !1;
        }
      }
      async function de(h) {
        const v = await H(h.code);
        te(
          v ? "卡密已复制" : "复制失败，请选中该行卡密后手动复制",
          v ? "success" : "error",
        );
      }
      async function p(h) {
        if (confirm(`确定撤销卡密 ${h.code}？`))
          try {
            await j(`/api/admin/cards/${h.id}/revoke`, { method: "POST" }),
              await ge(),
              te("卡密已撤销", "success");
          } catch (v) {
            te(v.message);
          }
      }
      async function g(h) {
        if (
          confirm(
            `确定重置卡密 ${h.code}？已有用户会立即退出。首次激活时间和原到期时间不会改变，也不会重新赠送时长。`))
          try {
            await j(`/api/admin/cards/${h.id}/reset`, { method: "POST" }),
              await ge(),
              te("卡密已重置", "success");
          } catch (v) {
            te(v.message);
          }
      }
      return (
        bt(() => F().catch((h) => te(h.message))),
        (h, v) => {
          var S, U, L, D;
          const T = Xs("router-link");
          return (
            A(),
            $(
              "main",
              { class: Se(["admin-page", { "admin-authenticated": d.value }]) },
              [
                d.value
                  ? (A(),
                    $(
                      he,
                      { key: 1 },
                      [
                        r("aside", hh, [
                          v[17] ||
                            (v[17] = r(
                              "div",
                              { class: "admin-brand" },
                              [
                                r("span", { class: "admin-brand-mark" }, [
                                  r("img", { src: us, alt: "TT助手AI" }),
                                ]),
                                r("span", null, [
                                  r("strong", null, "TT助手AI"),
                                  r("small", null, "后台管理"),
                                ]),
                              ],
                              -1)),
                          r("nav", vh, [
                            (A(),
                            $(
                              he,
                              null,
                              Be(l, (w) =>
                                r(
                                  "button",
                                  {
                                    key: w.id,
                                    class: Se([
                                      "admin-nav-item",
                                      { active: o.value === w.id },
                                    ]),
                                    "aria-current":
                                      o.value === w.id ? "page" : void 0,
                                    onClick: (X) => u(w.id),
                                  },
                                  [
                                    r("span", gh, I(w.icon), 1),
                                    ue(I(w.label), 1),
                                  ],
                                  10,
                                  mh,
                                ),
                              ),
                              64)),
                          ]),
                          ve(
                            T,
                            { to: "/", class: "back-to-site" },
                            {
                              default: je(() => [
                                ...(v[16] ||
                                  (v[16] = [ue("← 返回用户端", -1)])),
                              ]),
                              _: 1,
                            },
                          ),
                        ]),
                        r(
                          "div",
                          {
                            ref_key: "contentPane",
                            ref: s,
                            class: "admin-content",
                          },
                          [
                            r("header", yh, [
                              r("div", null, [
                                v[18] ||
                                  (v[18] = r(
                                    "div",
                                    { class: "eyebrow" },
                                    "SERVER CONTROL",
                                    -1)),
                                r("h1", null, I(i.value.label), 1),
                                r("p", null, I(i.value.description), 1),
                              ]),
                              r("div", bh, [
                                ["overview", "cards", "styles"].includes(
                                  o.value,
                                )
                                  ? (A(),
                                    $(
                                      "button",
                                      {
                                        key: 0,
                                        class: "secondary",
                                        onClick:
                                          v[1] ||
                                          (v[1] = (w) =>
                                            ge().catch((X) => te(X.message))),
                                      },
                                      "刷新"))
                                  : Y("", !0),
                                r(
                                  "button",
                                  { class: "secondary", onClick: me },
                                  "退出后台",
                                ),
                              ]),
                            ]),
                            y.value
                              ? (A(),
                                $(
                                  "div",
                                  { key: 0, class: Se(["message", m.value]) },
                                  I(y.value),
                                  3))
                              : Y("", !0),
                            ie(
                              r(
                                "section",
                                _h,
                                [
                                  r("div", wh, [
                                    v[19] ||
                                      (v[19] = r("span", null, "服务状态", -1)),
                                    v[20] ||
                                      (v[20] = r(
                                        "strong",
                                        { class: "ok" },
                                        "运行中",
                                        -1)),
                                    r(
                                      "small",
                                      null,
                                      I(
                                        ((S = C.value.server) == null
                                          ? void 0
                                          : S.node) || "Node.js",
                                      ),
                                      1,
                                    ),
                                  ]),
                                  r("div", Eh, [
                                    v[21] ||
                                      (v[21] = r("span", null, "卡密总数", -1)),
                                    r(
                                      "strong",
                                      null,
                                      I(
                                        ((U = C.value.cards) == null
                                          ? void 0
                                          : U.total) || 0,
                                      ),
                                      1,
                                    ),
                                    r(
                                      "small",
                                      null,
                                      "未使用 " +
                                        I(
                                          ((L = C.value.cards) == null
                                            ? void 0
                                            : L.unused) || 0,
                                        ) +
                                        " 张",
                                      1,
                                    ),
                                  ]),
                                  r("div", Ch, [
                                    v[22] ||
                                      (v[22] = r("span", null, "激活会话", -1)),
                                    r(
                                      "strong",
                                      null,
                                      I(C.value.sessions || 0),
                                      1,
                                    ),
                                    v[23] ||
                                      (v[23] = r(
                                        "small",
                                        null,
                                        "有效用户会话",
                                        -1)),
                                  ]),
                                  r("div", kh, [
                                    v[24] ||
                                      (v[24] = r("span", null, "运行时间", -1)),
                                    r("strong", null, I(Q.value), 1),
                                    v[25] ||
                                      (v[25] = r(
                                        "small",
                                        null,
                                        "服务启动后",
                                        -1)),
                                  ]),
                                ],
                                512,
                              ),
                              [[tn, o.value === "overview"]],
                            ),
                            ie(
                              r(
                                "section",
                                xh,
                                [
                                  ie(
                                    r(
                                      "div",
                                      Ah,
                                      [
                                        v[30] ||
                                          (v[30] = r(
                                            "div",
                                            { class: "panel-title" },
                                            [
                                              r("div", null, [
                                                r("h2", null, "卡密管理"),
                                                r(
                                                  "p",
                                                  null,
                                                  "卡密首次激活后开始计时，未激活不扣时长；重置不会延长有效期。",
                                                ),
                                              ]),
                                            ],
                                            -1)),
                                        r("div", Sh, [
                                          ie(
                                            r(
                                              "select",
                                              {
                                                "onUpdate:modelValue":
                                                  v[2] ||
                                                  (v[2] = (w) => (E.value = w)),
                                                class: "input type-select",
                                              },
                                              [
                                                ...(v[26] ||
                                                  (v[26] = [
                                                    r(
                                                      "option",
                                                      { value: "test" },
                                                      "测试卡（1小时）",
                                                      -1,
                                                    ),
                                                    r(
                                                      "option",
                                                      { value: "day" },
                                                      "天卡（1天）",
                                                      -1,
                                                    ),
                                                    r(
                                                      "option",
                                                      { value: "month" },
                                                      "月卡（30天）",
                                                      -1,
                                                    ),
                                                    r(
                                                      "option",
                                                      { value: "permanent" },
                                                      "永久卡",
                                                      -1,
                                                    ),
                                                  ])),
                                              ],
                                              512,
                                            ),
                                            [[Bt, E.value]],
                                          ),
                                          ie(
                                            r(
                                              "input",
                                              {
                                                "onUpdate:modelValue":
                                                  v[3] ||
                                                  (v[3] = (w) => (_.value = w)),
                                                class: "input",
                                                type: "number",
                                                min: "1",
                                                max: "1000",
                                              },
                                              null,
                                              512,
                                            ),
                                            [
                                              [
                                                ye,
                                                _.value,
                                                void 0,
                                                { number: !0 },
                                              ],
                                            ],
                                          ),
                                          r(
                                            "button",
                                            {
                                              class: "primary",
                                              disabled: k.value,
                                              onClick: W,
                                            },
                                            I(
                                              k.value
                                                ? "生成中…"
                                                : "批量生成卡密",
                                            ),
                                            9,
                                            Th,
                                          ),
                                        ]),
                                        x.value.length
                                          ? (A(),
                                            $("div", Oh, [
                                              r("div", Rh, [
                                                r("div", null, [
                                                  r(
                                                    "strong",
                                                    null,
                                                    "本次生成 " +
                                                      I(x.value.length) +
                                                      " 张卡密",
                                                    1,
                                                  ),
                                                  v[27] ||
                                                    (v[27] = r(
                                                      "p",
                                                      null,
                                                      "每行一个卡密，可一键复制后分发。",
                                                      -1)),
                                                ]),
                                                r(
                                                  "button",
                                                  {
                                                    class: "secondary",
                                                    disabled: J.value,
                                                    onClick: ee,
                                                  },
                                                  I(
                                                    J.value
                                                      ? "复制中…"
                                                      : "一键复制本批卡密",
                                                  ),
                                                  9,
                                                  $h,
                                                ),
                                              ]),
                                              r(
                                                "textarea",
                                                {
                                                  ref_key:
                                                    "generatedCardsInput",
                                                  ref: N,
                                                  class:
                                                    "input generated-codes",
                                                  "aria-label":
                                                    "本次生成的卡密",
                                                  value: x.value.join(`
`),
                                                  readonly: "",
                                                  spellcheck: "false",
                                                },
                                                null,
                                                8,
                                                Ph,
                                              ),
                                              se.value
                                                ? (A(),
                                                  $(
                                                    "p",
                                                    {
                                                      key: 0,
                                                      class: Se([
                                                        "copy-result",
                                                        q.value
                                                          ? "error"
                                                          : "success",
                                                      ]),
                                                      role: "status",
                                                    },
                                                    I(se.value),
                                                    3))
                                                : Y("", !0),
                                            ]))
                                          : Y("", !0),
                                        r("div", Ih, [
                                          r("table", null, [
                                            v[29] ||
                                              (v[29] = r(
                                                "thead",
                                                null,
                                                [
                                                  r("tr", null, [
                                                    r("th", null, "卡密"),
                                                    r("th", null, "类型"),
                                                    r("th", null, "状态"),
                                                    r(
                                                      "th",
                                                      null,
                                                      "首次激活时间",
                                                    ),
                                                    r("th", null, "到期时间"),
                                                    r("th", null, "操作"),
                                                  ]),
                                                ],
                                                -1)),
                                            r("tbody", null, [
                                              (A(!0),
                                              $(
                                                he,
                                                null,
                                                Be(
                                                  b.value,
                                                  (w) => (
                                                    A(),
                                                    $("tr", { key: w.id }, [
                                                      r("td", null, [
                                                        r(
                                                          "code",
                                                          null,
                                                          I(w.code),
                                                          1,
                                                        ),
                                                      ]),
                                                      r(
                                                        "td",
                                                        null,
                                                        I(
                                                          w.card_name ||
                                                            "普通卡",
                                                        ),
                                                        1,
                                                      ),
                                                      r("td", null, [
                                                        r(
                                                          "span",
                                                          {
                                                            class: Se([
                                                              "status",
                                                              w.status,
                                                            ]),
                                                          },
                                                          I(re(w.status)),
                                                          3,
                                                        ),
                                                      ]),
                                                      r(
                                                        "td",
                                                        null,
                                                        I(
                                                          w.activated_at
                                                            ? new Date(
                                                                w.activated_at,
                                                              ).toLocaleString(
                                                                "zh-CN",
                                                                { hour12: !1 },
                                                              )
                                                            : "—",
                                                        ),
                                                        1,
                                                      ),
                                                      r(
                                                        "td",
                                                        null,
                                                        I(mt(ch)(w)),
                                                        1,
                                                      ),
                                                      r("td", Nh, [
                                                        r(
                                                          "button",
                                                          {
                                                            class: "link",
                                                            onClick: (X) =>
                                                              de(w),
                                                          },
                                                          "复制",
                                                          8,
                                                          Mh,
                                                        ),
                                                        w.status === "used"
                                                          ? (A(),
                                                            $(
                                                              "button",
                                                              {
                                                                key: 0,
                                                                class: "link",
                                                                onClick: (X) =>
                                                                  g(w),
                                                              },
                                                              "重置",
                                                              8,
                                                              Dh))
                                                          : Y("", !0),
                                                        w.status !== "revoked"
                                                          ? (A(),
                                                            $(
                                                              "button",
                                                              {
                                                                key: 1,
                                                                class:
                                                                  "danger-link",
                                                                onClick: (X) =>
                                                                  p(w),
                                                              },
                                                              "撤销",
                                                              8,
                                                              Vh))
                                                          : Y("", !0),
                                                      ]),
                                                    ])
                                                  ),
                                                ),
                                                128)),
                                              b.value.length
                                                ? Y("", !0)
                                                : (A(),
                                                  $("tr", Lh, [
                                                    ...(v[28] ||
                                                      (v[28] = [
                                                        r(
                                                          "td",
                                                          {
                                                            colspan: "6",
                                                            class: "empty",
                                                          },
                                                          "暂无卡密",
                                                          -1,
                                                        ),
                                                      ])),
                                                  ])),
                                            ]),
                                          ]),
                                        ]),
                                      ],
                                      512,
                                    ),
                                    [[tn, !1]],
                                  ),
                                  ie(
                                    r(
                                      "div",
                                      Uh,
                                      [
                                        v[35] ||
                                          (v[35] = r(
                                            "div",
                                            { class: "panel-title" },
                                            [
                                              r("div", null, [
                                                r("h2", null, "后端概况"),
                                                r(
                                                  "p",
                                                  null,
                                                  "用于本地联调和上线前检查",
                                                ),
                                              ]),
                                            ],
                                            -1)),
                                        v[36] ||
                                          (v[36] = r(
                                            "div",
                                            { class: "detail" },
                                            [
                                              r("span", null, "健康检查"),
                                              r(
                                                "a",
                                                {
                                                  href: "/api/health",
                                                  target: "_blank",
                                                },
                                                "/api/health",
                                              ),
                                            ],
                                            -1)),
                                        v[37] ||
                                          (v[37] = r(
                                            "div",
                                            { class: "detail" },
                                            [
                                              r("span", null, "用户端接口"),
                                              r("code", null, "/api"),
                                            ],
                                            -1)),
                                        r("div", jh, [
                                          v[31] ||
                                            (v[31] = r(
                                              "span",
                                              null,
                                              "当前时间",
                                              -1)),
                                          r(
                                            "span",
                                            null,
                                            I(
                                              ((D = C.value.server) == null
                                                ? void 0
                                                : D.now) || "—",
                                            ),
                                            1,
                                          ),
                                        ]),
                                        r("div", Fh, [
                                          v[32] ||
                                            (v[32] = r(
                                              "span",
                                              null,
                                              "图像任务",
                                              -1)),
                                          r("span", null, I(pe("draw")), 1),
                                        ]),
                                        r("div", Bh, [
                                          v[33] ||
                                            (v[33] = r(
                                              "span",
                                              null,
                                              "视频任务",
                                              -1)),
                                          r("span", null, I(pe("video")), 1),
                                        ]),
                                        r("div", Hh, [
                                          v[34] ||
                                            (v[34] = r(
                                              "span",
                                              null,
                                              "短剧任务",
                                              -1)),
                                          r("span", null, I(pe("drama")), 1),
                                        ]),
                                      ],
                                      512,
                                    ),
                                    [[tn, o.value === "overview"]],
                                  ),
                                ],
                                512,
                              ),
                              [[tn, o.value === "overview"]],
                            ),
                            ie(
                              r(
                                "section",
                                Kh,
                                [
                                  v[42] ||
                                    (v[42] = r(
                                      "div",
                                      { class: "panel-title" },
                                      [
                                        r("div", null, [
                                          r("h2", null, "画风设定管理"),
                                          r(
                                            "p",
                                            null,
                                            "维护用户端“新建短剧项目”里的画风名称与提示词；已创建项目会保留原有画风快照。",
                                          ),
                                        ]),
                                      ],
                                      -1)),
                                  r("div", Wh, [
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            v[4] ||
                                            (v[4] = (w) => (O.value.label = w)),
                                          class: "input",
                                          placeholder:
                                            "画风名称，例如：东方仙侠电影",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, O.value.label]],
                                    ),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            v[5] ||
                                            (v[5] = (w) =>
                                              (O.value.preset_key = w)),
                                          class: "input",
                                          placeholder:
                                            "唯一标识，例如：xianxia-film",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, O.value.preset_key]],
                                    ),
                                    ie(
                                      r(
                                        "select",
                                        {
                                          "onUpdate:modelValue":
                                            v[6] ||
                                            (v[6] = (w) =>
                                              (O.value.category = w)),
                                          class: "input",
                                        },
                                        [
                                          ...(v[38] ||
                                            (v[38] = [
                                              r(
                                                "option",
                                                { value: "live" },
                                                "真人",
                                                -1,
                                              ),
                                              r(
                                                "option",
                                                { value: "anime" },
                                                "动漫",
                                                -1,
                                              ),
                                              r(
                                                "option",
                                                { value: "3d" },
                                                "3D",
                                                -1,
                                              ),
                                            ])),
                                        ],
                                        512,
                                      ),
                                      [[Bt, O.value.category]],
                                    ),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            v[7] ||
                                            (v[7] = (w) => (O.value.tone = w)),
                                          class: "input",
                                          placeholder: "色块标识，例如：film",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, O.value.tone]],
                                    ),
                                    ie(
                                      r(
                                        "input",
                                        {
                                          "onUpdate:modelValue":
                                            v[8] ||
                                            (v[8] = (w) =>
                                              (O.value.sort_order = w)),
                                          class: "input",
                                          type: "number",
                                          min: "0",
                                          placeholder: "排序",
                                        },
                                        null,
                                        512,
                                      ),
                                      [
                                        [
                                          ye,
                                          O.value.sort_order,
                                          void 0,
                                          { number: !0 },
                                        ],
                                      ],
                                    ),
                                    r("label", Gh, [
                                      ie(
                                        r(
                                          "input",
                                          {
                                            "onUpdate:modelValue":
                                              v[9] ||
                                              (v[9] = (w) =>
                                                (O.value.enabled = w)),
                                            type: "checkbox",
                                          },
                                          null,
                                          512,
                                        ),
                                        [[Un, O.value.enabled]],
                                      ),
                                      v[39] || (v[39] = ue(" 用户端启用", -1)),
                                    ]),
                                    ie(
                                      r(
                                        "textarea",
                                        {
                                          "onUpdate:modelValue":
                                            v[10] ||
                                            (v[10] = (w) =>
                                              (O.value.prompt = w)),
                                          class: "input style-prompt",
                                          placeholder:
                                            "画风提示词：会随项目带入剧本、分镜、图片等后续生成流程",
                                        },
                                        null,
                                        512,
                                      ),
                                      [[ye, O.value.prompt]],
                                    ),
                                    r("div", qh, [
                                      r(
                                        "button",
                                        { class: "primary", onClick: V },
                                        I(z.value ? "保存画风" : "新增画风"),
                                        1,
                                      ),
                                      z.value
                                        ? (A(),
                                          $(
                                            "button",
                                            {
                                              key: 0,
                                              class: "secondary",
                                              onClick: Ce,
                                            },
                                            "取消编辑"))
                                        : Y("", !0),
                                    ]),
                                  ]),
                                  r("div", zh, [
                                    r("table", null, [
                                      v[41] ||
                                        (v[41] = r(
                                          "thead",
                                          null,
                                          [
                                            r("tr", null, [
                                              r("th", null, "名称"),
                                              r("th", null, "分类"),
                                              r("th", null, "提示词"),
                                              r("th", null, "状态"),
                                              r("th", null, "排序"),
                                              r("th", null, "操作"),
                                            ]),
                                          ],
                                          -1)),
                                      r("tbody", null, [
                                        (A(!0),
                                        $(
                                          he,
                                          null,
                                          Be(
                                            le.value,
                                            (w) => (
                                              A(),
                                              $("tr", { key: w.id }, [
                                                r("td", null, [
                                                  r("div", Jh, [
                                                    w.image
                                                      ? (A(),
                                                        $(
                                                          "img",
                                                          {
                                                            key: 0,
                                                            src: w.image,
                                                            alt: `${w.label}示例图`,
                                                          },
                                                          null,
                                                          8,
                                                          Xh))
                                                      : Y("", !0),
                                                    r("div", null, [
                                                      r(
                                                        "strong",
                                                        null,
                                                        I(w.label),
                                                        1,
                                                      ),
                                                      r(
                                                        "small",
                                                        Yh,
                                                        I(w.preset_key),
                                                        1,
                                                      ),
                                                    ]),
                                                  ]),
                                                ]),
                                                r(
                                                  "td",
                                                  null,
                                                  I($e(w.category)),
                                                  1,
                                                ),
                                                r(
                                                  "td",
                                                  {
                                                    class: "style-prompt-cell",
                                                    title: w.prompt,
                                                  },
                                                  I(w.prompt),
                                                  9,
                                                  Qh,
                                                ),
                                                r("td", null, [
                                                  r(
                                                    "span",
                                                    {
                                                      class: Se([
                                                        "status",
                                                        w.enabled
                                                          ? "unused"
                                                          : "revoked",
                                                      ]),
                                                    },
                                                    I(
                                                      w.enabled
                                                        ? "启用"
                                                        : "停用",
                                                    ),
                                                    3,
                                                  ),
                                                ]),
                                                r(
                                                  "td",
                                                  null,
                                                  I(w.sort_order),
                                                  1,
                                                ),
                                                r("td", Zh, [
                                                  r(
                                                    "button",
                                                    {
                                                      class: "link",
                                                      onClick: (X) => K(w),
                                                    },
                                                    "编辑",
                                                    8,
                                                    ev,
                                                  ),
                                                  r("label", tv, [
                                                    ue(
                                                      I(
                                                        w.image
                                                          ? "更换图"
                                                          : "上传图",
                                                      ),
                                                      1,
                                                    ),
                                                    r(
                                                      "input",
                                                      {
                                                        type: "file",
                                                        accept:
                                                          ".jpg,.jpeg,.jfif,.png,.webp,.avif,image/jpeg,image/png,image/webp,image/avif",
                                                        onChange: (X) =>
                                                          fe(w, X),
                                                      },
                                                      null,
                                                      40,
                                                      nv,
                                                    ),
                                                  ]),
                                                  w.image
                                                    ? (A(),
                                                      $(
                                                        "button",
                                                        {
                                                          key: 0,
                                                          class: "danger-link",
                                                          onClick: (X) => P(w),
                                                        },
                                                        "移除图",
                                                        8,
                                                        sv))
                                                    : Y("", !0),
                                                  r(
                                                    "button",
                                                    {
                                                      class: "danger-link",
                                                      onClick: (X) => B(w),
                                                    },
                                                    "删除",
                                                    8,
                                                    lv,
                                                  ),
                                                  R.value[w.id]
                                                    ? (A(),
                                                      $(
                                                        "small",
                                                        {
                                                          key: 1,
                                                          class: Se([
                                                            "upload-state",
                                                            R.value[w.id].type,
                                                          ]),
                                                        },
                                                        I(R.value[w.id].text),
                                                        3))
                                                    : Y("", !0),
                                                ]),
                                              ])
                                            ),
                                          ),
                                          128)),
                                        le.value.length
                                          ? Y("", !0)
                                          : (A(),
                                            $("tr", ov, [
                                              ...(v[40] ||
                                                (v[40] = [
                                                  r(
                                                    "td",
                                                    {
                                                      colspan: "6",
                                                      class: "empty",
                                                    },
                                                    "暂无画风设定",
                                                    -1,
                                                  ),
                                                ])),
                                            ])),
                                      ]),
                                    ]),
                                  ]),
                                ],
                                512,
                              ),
                              [[tn, o.value === "styles"]],
                            ),
                            a.value.tutorials
                              ? ie((A(), Vt(Af, { key: 1 }, null, 512)), [
                                  [tn, o.value === "tutorials"],
                                ])
                              : Y("", !0),
                            o.value === "card-claim"
                              ? (A(), Vt(_p, { key: 3 }))
                              : Y("", !0),
                            o.value === "oss"
                              ? (A(), Vt(Up, { key: 4 }))
                              : Y("", !0),
                            o.value === "works"
                              ? (A(), Vt(uh, { key: 5 }))
                              : Y("", !0),
                          ],
                          512,
                        ),
                      ],
                      64))
                  : (A(),
                    $("section", dh, [
                      v[11] ||
                        (v[11] = r(
                          "div",
                          { class: "admin-login-brand" },
                          [
                            r("span", { class: "admin-brand-mark" }, [
                              r("img", { src: us, alt: "TT助手AI" }),
                            ]),
                            r("span", null, [
                              r("strong", null, "TT助手AI"),
                              r("small", null, "AI短剧创作系统"),
                            ]),
                          ],
                          -1)),
                      v[12] ||
                        (v[12] = r(
                          "div",
                          { class: "eyebrow" },
                          "SERVER CONTROL",
                          -1)),
                      v[13] || (v[13] = r("h1", null, "后台管理", -1)),
                      v[14] ||
                        (v[14] = r("p", null, "管理服务状态与内容", -1)),
                      ie(
                        r(
                          "input",
                          {
                            "onUpdate:modelValue":
                              v[0] || (v[0] = (w) => (c.value = w)),
                            class: "input",
                            type: "password",
                            placeholder: "请输入后台密码",
                            onKeyup: ji(Z, ["enter"]),
                          },
                          null,
                          544,
                        ),
                        [[ye, c.value]],
                      ),
                      y.value ? (A(), $("div", fh, I(y.value), 1)) : Y("", !0),
                      r(
                        "button",
                        { class: "primary", disabled: f.value, onClick: Z },
                        I(f.value ? "登录中…" : "登录后台"),
                        9,
                        ph,
                      ),
                      v[15] ||
                        (v[15] = r(
                          "div",
                          { class: "admin-tip" },
                          [
                            ue("本地默认密码："),
                            r("code", null, "admin-local-2026"),
                            ue("。部署服务器前请设置 ADMIN_PASSWORD。"),
                          ],
                          -1)),
                    ])),
              ],
              2));
        }
      );
    },
  },
  er = Pt(iv, [["__scopeId", "data-v-820608e7"]]),
  rv = { key: 0, class: "app-shell" },
  av = { key: 1, class: "app-shell" },
  uv = { key: 2, class: "app-shell" },
  cv = { key: 3, class: "app-shell" },
  dv = { class: "sidebar" },
  fv = { class: "main" },
  pv = { class: "topbar" },
  hv = ["href", "title"],
  vv = { key: 0 },
  mv = { class: "badge" },
  gv = { class: "content" },
  yv = {
    __name: "App",
    setup(e) {
      const t = Zi(),
        n = M(!1),
        s = M(!0),
        l = De(() => t.path.startsWith("/admin")),
        o = M({}),
        i = M({
          version: "1.5.4",
          downloadUrl: "/downloads/AI-Creation-Windows-v1.5.4.zip",
        }),
        a = M(!1),
        // 授权层已移除：顶栏不再显示任何卡密/有效期状态文字。
        u = De(() => "");
      function d(C) {
        try {
          return new Date(C).toLocaleDateString("zh-CN");
        } catch {
          return C;
        }
      }
      // 授权校验已移除：不再请求 /api/auth/status，直接进入已授权状态，
      // 激活页组件（Cd）在本工程中永不可达。
      bt(async () => {
        (n.value = !0),
          (o.value = {
            activated: !0,
            cardName: "本地版",
            cardType: "local",
            permanent: !0,
            expiresAt: null,
          }),
          c(),
          (s.value = !1);
      });
      async function c() {
        var C, _;
        try {
          const E = await fetch("/downloads/AI-Creation-Windows-version.json", {
            cache: "no-store",
          });
          if (!E.ok) return;
          const k = await E.json();
          /^\d+\.\d+\.\d+$/.test(k.version) &&
            k.downloadUrl ===
              `/downloads/AI-Creation-Windows-v${k.version}.zip` &&
            (i.value = { version: k.version, downloadUrl: k.downloadUrl });
        } catch {}
        try {
          const E = await ((_ =
            (C = window.aiCreationUpdater) == null ? void 0 : C.check) == null
            ? void 0
            : _.call(C));
          a.value = !!(E != null && E.available);
        } catch {}
      }
      function f(C = {}) {
        (n.value = !0), (o.value = C);
      }
      function y() {
        window.location.reload();
      }
      function m(C) {
        return C === "/"
          ? t.path === "/"
          : t.path === C || t.path.startsWith(C + "/");
      }
      // 卡密已移除：不再有「退出登录」语义，按钮点击直接刷新客户端。
      async function b() {
        window.location.reload();
      }
      return (C, _) => {
        const E = Xs("router-link"),
          k = Xs("router-view");
        return s.value
          ? (A(),
            $("div", rv, [
              ...(_[0] ||
                (_[0] = [
                  r(
                    "div",
                    { style: { margin: "auto", color: "var(--text-dim)" } },
                    "加载中...",
                    -1,
                  ),
                ])),
            ]))
          : l.value
            ? (A(), $("div", av, [ve(er, { class: "admin-root" })]))
            : n.value
              ? (A(),
                $("div", cv, [
                  r("aside", dv, [
                    _[15] ||
                      (_[15] = os(
                        '<div class="sidebar-aurora" aria-hidden="true"><div class="sa-band sa-band-a"></div><div class="sa-band sa-band-b"></div></div><div class="sidebar-glow" aria-hidden="true"></div><div class="brand"><span class="brand-logo"><img src="' +
                          us +
                          '" alt=""></span><span class="brand-text"><strong>TT助手AI</strong><em>AI短剧创作系统</em></span></div><div class="section">功能区</div>',
                        4)),
                    ve(
                      E,
                      { to: "/", class: Se(["nav-item", { active: m("/") }]) },
                      {
                        default: je(() => [
                          ...(_[1] ||
                            (_[1] = [
                              r("span", { class: "icon" }, "🏠", -1),
                              r("span", { class: "label" }, "首页", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/tasks",
                        class: Se(["nav-item", { active: m("/tasks") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[2] ||
                            (_[2] = [
                              r("span", { class: "icon" }, "📋", -1),
                              r("span", { class: "label" }, "任务记录", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/short-drama-production",
                        class: Se([
                          "nav-item nav-item-featured",
                          { active: m("/short-drama-production") },
                        ]),
                      },
                      {
                        default: je(() => [
                          ...(_[3] ||
                            (_[3] = [
                              r(
                                "span",
                                { class: "icon", title: "推荐" },
                                "🔥",
                                -1,
                              ),
                              r("span", { class: "label" }, "短剧制作", -1),
                              r("span", { class: "nav-recommend" }, "推荐", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/drama-auto",
                        class: Se([
                          "nav-item nav-item-featured",
                          { active: m("/drama-auto") },
                        ]),
                      },
                      {
                        default: je(() => [
                          ...(_[4] ||
                            (_[4] = [
                              r(
                                "span",
                                { class: "icon", title: "推荐" },
                                "🔥",
                                -1,
                              ),
                              r("span", { class: "label" }, "AI漫剧全功能", -1),
                              r("span", { class: "nav-recommend" }, "推荐", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/remake-workshop",
                        class: Se([
                          "nav-item nav-item-featured",
                          { active: m("/remake-workshop") },
                        ]),
                      },
                      {
                        default: je(() => [
                          ...(_[5] ||
                            (_[5] = [
                              r(
                                "span",
                                { class: "icon", title: "推荐" },
                                "🔥",
                                -1,
                              ),
                              r("span", { class: "label" }, "短剧重制", -1),
                              r("span", { class: "nav-recommend" }, "推荐", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/video-face-swap",
                        class: Se([
                          "nav-item",
                          { active: m("/video-face-swap") },
                        ]),
                      },
                      {
                        default: je(() => [
                          ...(_[6] ||
                            (_[6] = [
                              r("span", { class: "icon" }, "🪄", -1),
                              r("span", { class: "label" }, "视频换人", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/script-maker",
                        class: Se(["nav-item", { active: m("/script-maker") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[7] ||
                            (_[7] = [
                              r("span", { class: "icon" }, "✍️", -1),
                              r("span", { class: "label" }, "剧本制作", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/works",
                        class: Se(["nav-item", { active: m("/works") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[8] ||
                            (_[8] = [
                              r("span", { class: "icon" }, "🎬", -1),
                              r("span", { class: "label" }, "作品广场", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    _[16] ||
                      (_[16] = r("div", { class: "section" }, "大模型", -1)),
                    ve(
                      E,
                      {
                        to: "/chat",
                        class: Se(["nav-item", { active: m("/chat") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[9] ||
                            (_[9] = [
                              r("span", { class: "icon" }, "💬", -1),
                              r("span", { class: "label" }, "聊天", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/draw",
                        class: Se(["nav-item", { active: m("/draw") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[10] ||
                            (_[10] = [
                              r("span", { class: "icon" }, "🎨", -1),
                              r("span", { class: "label" }, "绘画", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    ve(
                      E,
                      {
                        to: "/video",
                        class: Se(["nav-item", { active: m("/video") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[11] ||
                            (_[11] = [
                              r("span", { class: "icon" }, "🎥", -1),
                              r("span", { class: "label" }, "视频", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    _[17] ||
                      (_[17] = r("div", { class: "section" }, "工具箱", -1)),
                    ve(
                      E,
                      {
                        to: "/settings",
                        class: Se(["nav-item", { active: m("/settings") }]),
                      },
                      {
                        default: je(() => [
                          ...(_[12] ||
                            (_[12] = [
                              r("span", { class: "icon" }, "⚙️", -1),
                              r("span", { class: "label" }, "大模型设置", -1),
                            ])),
                        ]),
                        _: 1,
                      },
                      8,
                      ["class"],
                    ),
                    _[19] ||
                      (_[19] = r(
                        "div",
                        { class: "sidebar-art", "aria-hidden": "true" },
                        [
                          r("img", { src: xu, alt: "" }),
                          r(
                            "span",
                            { class: "art-caption" },
                            "把故事，变成可执行的短剧",
                          ),
                        ],
                        -1)),
                  ]),
                  r("div", fv, [
                    r("div", pv, [
                      r("div", { class: "refresh-control" }, [
                        _[21] ||
                          (_[21] = r(
                            "span",
                            { class: "refresh-label" },
                            "刷新",
                            -1)),
                        r(
                          "button",
                          {
                            class: "refresh-button",
                            type: "button",
                            title: "刷新客户端",
                            "aria-label": "刷新客户端",
                            onClick: y,
                          },
                          [
                            ...(_[20] ||
                              (_[20] = [
                                r("span", { "aria-hidden": "true" }, "↻", -1),
                              ])),
                          ],
                        ),
                      ]),
                      r(
                        "a",
                        {
                          class: "client-version-link",
                          href: i.value.downloadUrl,
                          title: `下载最新版客户端 v${i.value.version}`,
                        },
                        [
                          r("span", null, "客户端 v" + I(i.value.version), 1),
                          a.value ? (A(), $("small", vv, "有新版")) : Y("", !0),
                        ],
                        8,
                        hv,
                      ),
                      r("span", mv, I(u.value), 1),
                      r("button", { class: "btn", onClick: b }, "刷新"),
                    ]),
                    r("div", gv, [ve(k)]),
                  ]),
                ]))
              : (A(), $("div", uv, [ve(k)]));
      };
    },
  },
  bv = "modulepreload",
  _v = function (e) {
    return "/" + e;
  },
  To = {},
  Ne = function (t, n, s) {
    let l = Promise.resolve();
    if (n && n.length > 0) {
      let i = function (d) {
        return Promise.all(
          d.map((c) =>
            Promise.resolve(c).then(
              (f) => ({ status: "fulfilled", value: f }),
              (f) => ({ status: "rejected", reason: f }),
            ),
          ),
        );
      };
      document.getElementsByTagName("link");
      const a = document.querySelector("meta[property=csp-nonce]"),
        u =
          (a == null ? void 0 : a.nonce) ||
          (a == null ? void 0 : a.getAttribute("nonce"));
      l = i(
        n.map((d) => {
          if (((d = _v(d)), d in To)) return;
          To[d] = !0;
          const c = d.endsWith(".css"),
            f = c ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${d}"]${f}`)) return;
          const y = document.createElement("link");
          if (
            ((y.rel = c ? "stylesheet" : bv),
            c || (y.as = "script"),
            (y.crossOrigin = ""),
            (y.href = d),
            u && y.setAttribute("nonce", u),
            document.head.appendChild(y),
            c)
          )
            return new Promise((m, b) => {
              y.addEventListener("load", m),
                y.addEventListener("error", () =>
                  b(new Error(`Unable to preload CSS for ${d}`)),
                );
            });
        }),
      );
    }
    function o(i) {
      const a = new Event("vite:preloadError", { cancelable: !0 });
      if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
        throw i;
    }
    return l.then((i) => {
      for (const a of i || []) a.status === "rejected" && o(a.reason);
      return t().catch(o);
    });
  },
  wv = [
    {
      path: "/",
      name: "home",
      component: () =>
        Ne(
          () => import("../views/Home.js"),
        ),
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () =>
        Ne(() => import("../views/Tasks.js")),
    },
    {
      path: "/works/:id?",
      name: "works",
      component: () =>
        Ne(
          () => import("../views/Works.js"),
        ),
    },
    {
      path: "/chat",
      name: "chat",
      component: () =>
        Ne(() => import("../views/Chat.js")),
    },
    {
      path: "/draw",
      name: "draw",
      component: () =>
        Ne(
          () => import("../views/Draw.js"),
        ),
    },
    {
      path: "/video",
      name: "video",
      component: () =>
        Ne(() => import("../views/Video.js")),
    },
    { path: "/drama", name: "drama", redirect: "/short-drama-production" },
    {
      path: "/short-drama-production",
      name: "short-drama-production",
      component: () =>
        Ne(
          () => import("../views/ShortDramaProduction.js"),
        ),
    },
    {
      path: "/short-drama-production/project/:id",
      name: "short-drama-production-project",
      component: () =>
        Ne(
          () => import("../views/ShortDramaProductionWorkspace.js"),
        ),
    },
    {
      path: "/drama-auto",
      name: "drama-auto",
      component: () =>
        Ne(() => import("../views/DramaAuto.js")),
    },
    {
      path: "/video-recreation",
      name: "video-recreation-hidden",
      redirect: "/",
    },
    {
      path: "/remake-workshop",
      name: "remake-workshop",
      component: () =>
        Ne(
          () => import("../views/RemakeWorkshop.js"),
        ),
    },
    {
      path: "/remake-workshop/project/:id/progress",
      name: "remake-workshop-progress",
      component: () =>
        Ne(
          () => import("../views/RemakeProgress.js"),
        ),
    },
    {
      path: "/video-face-swap",
      name: "video-face-swap",
      component: () =>
        Ne(
          () => import("../views/VideoFaceSwap.js"),
        ),
    },
    {
      path: "/drama-commerce",
      name: "drama-commerce",
      component: () =>
        Ne(
          () => import("../views/DramaCommerce.js"),
        ),
    },
    {
      path: "/drama/project/:id",
      name: "drama-project",
      redirect: "/short-drama-production",
    },
    { path: "/drama/editor", redirect: "/short-drama-production" },
    {
      path: "/script-tools",
      name: "script-tools",
      component: () =>
        Ne(
          () => import("../views/ScriptTools.js"),
        ),
    },
    {
      path: "/script-maker",
      name: "script-maker",
      component: () =>
        Ne(
          () => import("../views/ScriptMaker.js"),
        ),
    },
    {
      path: "/canvas",
      name: "canvas",
      component: () =>
        Ne(() => import("../views/Canvas.js")),
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        Ne(() => import("../views/Settings.js")),
    },
    {
      path: "/tutorials/:id?",
      name: "tutorials",
      component: () =>
        Ne(() => import("../views/Tutorials.js")),
    },
    {
      path: "/admin",
      name: "admin",
      component: er,
    },
  ],
  Ev = $c({ history: uc(), routes: wv });
export { yv as App, Ev as router, Eu as createApp };
export {
  ji as A,
  Zi as B,
  jc as C,
  bs as D,
  Pc as E,
  he as F,
  De as G,
  xv as H,
  Un as I,
  ul as J,
  gs as K,
  Pr as L,
  hu as M,
  Nd as N,
  Cv as T,
  Kc as V,
  Pt as _,
  Zt as a,
  $ as b,
  Al as c,
  os as d,
  r as e,
  ve as f,
  ue as g,
  Vt as h,
  Bc as i,
  Y as j,
  Xs as k,
  M as l,
  A as m,
  kv as n,
  bt as o,
  Se as p,
  Cn as q,
  Be as r,
  fi as s,
  I as t,
  mt as u,
  ie as v,
  je as w,
  Bt as x,
  un as y,
  ye as z,
};
