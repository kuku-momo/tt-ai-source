import "../styles/pages/Video.css";
import {
  _ as Ce,
  o as $e,
  q as Q,
  s as Ve,
  b as o,
  e as n,
  j as c,
  F as L,
  r as T,
  v as P,
  z as le,
  y as Ie,
  g as N,
  t as i,
  l as v,
  G as h,
  D as Ue,
  m as u,
  p as H,
  x as Me,
  H as Ee,
  I as je,
} from "../runtime/index.js";
const De = { class: "video-page" },
  Se = { class: "model-list" },
  ze = { key: 0, class: "model-empty" },
  Ae = ["onClick"],
  Le = { class: "name model-name-line" },
  Te = { key: 0 },
  Oe = { key: 1 },
  Be = { class: "desc" },
  Fe = { class: "video-main" },
  Pe = { class: "history-section" },
  Re = { key: 0, class: "empty muted" },
  qe = { key: 1, class: "grid grid-3" },
  Ne = ["src"],
  He = { key: 1, class: "muted task-message" },
  Ke = { key: 2, class: "task-message error-message" },
  Ge = { key: 3, class: "task-message generating-message" },
  Je = { key: 0 },
  Qe = { class: "task-footer" },
  We = { class: "hp-time" },
  Xe = { class: "task-model" },
  Ye = ["onClick"],
  Ze = ["onClick"],
  el = { class: "form-card card" },
  ll = { class: "prompt-wrap" },
  tl = ["onMouseenter", "onClick"],
  al = ["src", "alt"],
  sl = { key: 0, class: "mention-tip" },
  nl = { class: "form-row" },
  ol = { key: 0, class: "ref-field" },
  ul = { class: "hint" },
  il = { class: "ref-picker" },
  rl = ["src", "alt"],
  cl = { key: 0, class: "frame-label" },
  vl = ["onClick"],
  dl = ["accept", "multiple"],
  fl = { key: 0, class: "hint ok ref-count" },
  pl = { key: 1, class: "ref-field" },
  ml = { class: "hint" },
  hl = { class: "file-control" },
  _l = { key: 1, class: "file-name" },
  gl = ["accept", "multiple"],
  yl = { key: 2, class: "ref-field" },
  bl = { class: "hint" },
  kl = { class: "file-control" },
  wl = { key: 1, class: "file-name" },
  xl = ["multiple"],
  Cl = { class: "hint" },
  $l = ["onUpdate:modelValue"],
  Vl = ["value"],
  Il = ["onUpdate:modelValue", "min", "max"],
  Ul = ["onUpdate:modelValue", "type", "placeholder"],
  Ml = { key: 3, class: "toggle-field" },
  El = ["onUpdate:modelValue"],
  jl = { class: "submit-field" },
  Dl = ["disabled"],
  Sl = { key: 1, class: "err form-error" },
  zl = {
    __name: "Video",
    setup(Al) {
      const M = v([]),
        V = v(""),
        te = h(() => M.value.find((e) => e.id === V.value) || null),
        I = h(() => {
          var e;
          return (
            ((e = te.value) == null ? void 0 : e.capability) || {
              input_mode: "none",
              input_label: "文生视频",
              image_min: 0,
              image_max: 0,
              video: !1,
              audio: !1,
              uploads: [],
              fields: {},
            }
          );
        }),
        K = h(() =>
          (I.value.uploads || []).filter(
            (e) => !e.when || r.value[e.when.field] === e.when.equals,
          ),
        ),
        y = h(() => K.value.find((e) => e.type === "image") || null),
        b = h(() => K.value.find((e) => e.type === "video") || null),
        U = h(() => K.value.find((e) => e.type === "audio") || null),
        ae = h(() => !!y.value),
        se = h(() => !!b.value),
        ne = h(() => !!U.value),
        E = h(() => {
          var e;
          return Math.max(1, ((e = y.value) == null ? void 0 : e.max) || 1);
        }),
        O = h(() => {
          var e;
          return Math.max(1, ((e = b.value) == null ? void 0 : e.max) || 1);
        }),
        B = h(() => {
          var e;
          return Math.max(1, ((e = U.value) == null ? void 0 : e.max) || 1);
        }),
        oe = h(() =>
          Object.fromEntries(
            Object.entries(I.value.fields || {}).filter(([, e]) => e),
          ),
        ),
        ue = h(() => {
          if (!V.value || R.value || $.value) return !1;
          const e = d.value.length + f.value.length + p.value.length,
            t = I.value.fields || {},
            l = Object.entries(t).some(
              ([a, s]) =>
                (s == null ? void 0 : s.material) &&
                String(r.value[a] || "").trim(),
            );
          return !(
            (!g.value.trim() &&
              !(I.value.prompt_required === !1 && (e > 0 || l))) ||
            Object.entries(t).some(
              ([a, s]) =>
                (s == null ? void 0 : s.required) &&
                !String(r.value[a] || "").trim(),
            ) ||
            (y.value && d.value.length < (y.value.min || 0)) ||
            (b.value && f.value.length < (b.value.min || 0)) ||
            (U.value && p.value.length < (U.value.min || 0))
          );
        }),
        g = v(""),
        d = v([]),
        j = v(null),
        x = v(null),
        C = v(null),
        f = v([]),
        p = v([]),
        W = v(null),
        r = v({}),
        R = v(!1),
        $ = v(0),
        k = v(""),
        G = v([]),
        w = v(!1),
        q = v(-1),
        X = v(""),
        D = v(0);
      let Y = null;
      const S = h(() => {
        const e = X.value.trim().toLowerCase();
        return d.value
          .map((t, l) => ({ image: t, index: l, label: `参考图${l + 1}` }))
          .filter(
            (t) =>
              !e ||
              t.label.toLowerCase().includes(e) ||
              `图${t.index + 1}`.includes(e),
          );
      });
      $e(async () => {
        const t = await (await fetch("/api/video/models")).json();
        (M.value = t.models || []),
          M.value.length && (V.value = M.value[0].id),
          F(),
          (Y = setInterval(F, 1e4));
      }),
        Q(V, () => {
          const e = {};
          for (const [t, l] of Object.entries(I.value.fields || {}))
            l && (e[t] = l.default);
          (r.value = e),
            (d.value = []),
            (f.value = []),
            (p.value = []),
            j.value && (j.value.value = ""),
            x.value && (x.value.value = ""),
            C.value && (C.value.value = "");
        }),
        Q(
          () => r.value.mode,
          (e, t) => {
            var a, s, m;
            if (t === void 0 || e === t) return;
            (d.value = []), (f.value = []), (p.value = []), (w.value = !1);
            const l = (a = I.value.fields) == null ? void 0 : a.ratio;
            if (
              ((s = l == null ? void 0 : l.options_by) == null
                ? void 0
                : s.field) === "mode"
            ) {
              const _ = (m = l.options_by.values) == null ? void 0 : m[e];
              _ != null &&
                _.length &&
                !_.includes(r.value.ratio) &&
                (r.value.ratio = _[0]);
            }
          },
        ),
        Q(
          () => r.value.api_model,
          (e, t) => {
            var s, m, _;
            if (t === void 0 || e === t) return;
            const l = (s = I.value.fields) == null ? void 0 : s.resolution;
            if (
              ((m = l == null ? void 0 : l.options_by) == null
                ? void 0
                : m.field) !== "api_model"
            )
              return;
            const a =
              ((_ = l.options_by.values) == null ? void 0 : _[e]) ||
              l.options ||
              [];
            a.length &&
              !a.includes(r.value.resolution) &&
              (r.value.resolution = a[0]);
          },
        ),
        Ve(() => clearInterval(Y));
      async function F() {
        const t = await (await fetch("/api/video/tasks")).json();
        G.value = t.tasks || [];
      }
      function J(e) {
        return new Promise((t, l) => {
          const a = new FileReader();
          (a.onload = () => t(a.result)),
            (a.onerror = () => l(new Error(`无法读取文件：${e.name}`))),
            a.readAsDataURL(e);
        });
      }
      function ie(e) {
        return new Promise((t, l) => {
          const a = new Image();
          (a.onload = () =>
            t({ width: a.naturalWidth, height: a.naturalHeight })),
            (a.onerror = () => l(new Error("无法识别图片尺寸"))),
            (a.src = e);
        });
      }
      async function re(e) {
        var l;
        const t = Array.from(e.target.files || []).slice(
          0,
          E.value - d.value.length,
        );
        (k.value = ""), ($.value += 1);
        try {
          for (const a of t) {
            const s = y.value || {};
            if (s.max_mb && a.size > s.max_mb * 1024 * 1024)
              throw new Error(`${a.name} 超过单张 ${s.max_mb}MB 限制`);
            const m =
                (l = a.name.split(".").pop()) == null
                  ? void 0
                  : l.toLowerCase(),
              _ = String(s.accept || "").toLowerCase();
            if (_ && m && !_.split(",").some((A) => A.trim() === `.${m}`))
              throw new Error(`${a.name} 的图片格式不受支持`);
            const z = await J(a);
            if ((s.min_size || s.max_size) && !["heic", "heif"].includes(m)) {
              const A = await ie(z);
              if (s.min_size && (A.width < s.min_size || A.height < s.min_size))
                throw new Error(`${a.name} 的宽高不能小于 ${s.min_size}px`);
              if (s.max_size && (A.width > s.max_size || A.height > s.max_size))
                throw new Error(`${a.name} 的宽高不能大于 ${s.max_size}px`);
            }
            d.value.length < E.value && d.value.push(z);
          }
        } catch (a) {
          k.value = a.message;
        } finally {
          ($.value -= 1), (e.target.value = "");
        }
      }
      async function ce(e) {
        var l;
        const t = Array.from(e.target.files || []).slice(
          0,
          O.value - f.value.length,
        );
        $.value += 1;
        try {
          for (const a of t) {
            let s;
            if (((l = b.value) == null ? void 0 : l.remote_upload) === "oss") {
              const m = new FormData();
              m.append("file", a);
              const _ = await fetch("/api/uploads/oss/video", {
                  method: "POST",
                  body: m,
                }),
                z = await _.json();
              if (!_.ok || !z.ok) throw new Error(z.msg || "视频上传失败");
              s = z.url;
            } else s = await J(a);
            f.value.length < O.value && f.value.push(s);
          }
        } catch (a) {
          k.value = a.message;
        } finally {
          ($.value -= 1), (e.target.value = "");
        }
      }
      async function ve(e) {
        const t = Array.from(e.target.files || []).slice(
          0,
          B.value - p.value.length,
        );
        $.value += 1;
        try {
          for (const l of t) {
            const a = await J(l);
            p.value.length < B.value && p.value.push(a);
          }
        } catch (l) {
          k.value = l.message;
        } finally {
          ($.value -= 1), (e.target.value = "");
        }
      }
      function de() {
        (f.value = []), x.value && (x.value.value = "");
      }
      function fe() {
        (p.value = []), C.value && (C.value.value = "");
      }
      function Z(e) {
        return e && typeof e == "object" ? e.value : e;
      }
      function pe(e) {
        return e && typeof e == "object" ? e.label : e;
      }
      function me(e) {
        var l;
        const t = e.options_by;
        return t
          ? ((l = t.values) == null ? void 0 : l[r.value[t.field]]) ||
              e.options ||
              []
          : e.options || [];
      }
      function he(e) {
        d.value.splice(e, 1),
          (g.value = g.value.replace(/@参考图(\d+)\s*/g, (t, l) => {
            const a = Number(l);
            return a === e + 1 ? "" : a > e + 1 ? `@参考图${a - 1} ` : t;
          })),
          (w.value = !1);
      }
      function _e(e) {
        const t = e.target.selectionStart ?? g.value.length,
          a = g.value.slice(0, t).match(/@([^\s@]*)$/);
        if (!a || !d.value.length) {
          w.value = !1;
          return;
        }
        (q.value = t - a[0].length),
          (X.value = a[1] || ""),
          (D.value = 0),
          (w.value = !0);
      }
      function ge(e) {
        if (!(!w.value || !S.value.length))
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            const t = e.key === "ArrowDown" ? 1 : -1;
            D.value = (D.value + t + S.value.length) % S.value.length;
          } else
            e.key === "Enter" || e.key === "Tab"
              ? (e.preventDefault(), ee(S.value[D.value].index))
              : e.key === "Escape" && (e.preventDefault(), (w.value = !1));
      }
      function ee(e) {
        const t = W.value,
          l = (t == null ? void 0 : t.selectionStart) ?? g.value.length,
          a = q.value >= 0 ? q.value : l,
          s = `@参考图${e + 1} `;
        (g.value = g.value.slice(0, a) + s + g.value.slice(l)),
          (w.value = !1),
          (q.value = -1),
          Ue(() => {
            const m = a + s.length;
            t == null || t.focus(), t == null || t.setSelectionRange(m, m);
          });
      }
      function ye() {
        setTimeout(() => {
          w.value = !1;
        }, 120);
      }
      async function be() {
        (R.value = !0), (k.value = "");
        try {
          const t = await (
            await fetch("/api/video/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: V.value,
                prompt: g.value.trim(),
                uploads: Object.fromEntries(
                  [
                    y.value ? [y.value.key, d.value] : null,
                    b.value ? [b.value.key, f.value] : null,
                    U.value ? [U.value.key, p.value] : null,
                  ].filter(Boolean),
                ),
                params: r.value,
              }),
            })
          ).json();
          t.ok
            ? ((g.value = ""),
              (d.value = []),
              (f.value = []),
              (p.value = []),
              j.value && (j.value.value = ""),
              x.value && (x.value.value = ""),
              C.value && (C.value.value = ""),
              F())
            : (k.value = t.msg || "提交失败");
        } catch (e) {
          k.value = e.message;
        } finally {
          R.value = !1;
        }
      }
      function ke(e) {
        return (
          {
            pending: "排队中",
            generating: "生成中",
            success: "已完成",
            failed: "失败",
          }[e.status] || e.status
        );
      }
      function we(e) {
        const t = document.createElement("a");
        (t.href = e.video_url),
          (t.download = `lingxi-video-${e.id}.mp4`),
          t.click();
      }
      async function xe(e) {
        confirm("删除该视频任务？") &&
          (await fetch(`/api/video/tasks/${e}`, { method: "DELETE" }), F());
      }
      return (e, t) => (
        u(),
        o("div", De, [
          n("div", Se, [
            M.value.length
              ? c("", !0)
              : (u(), o("div", ze, "暂无已配置的视频模型")),
            (u(!0),
            o(
              L,
              null,
              T(
                M.value,
                (l) => (
                  u(),
                  o(
                    "div",
                    {
                      key: l.id,
                      class: H(["model-item", { active: V.value === l.id }]),
                      onClick: (a) => (V.value = l.id),
                    },
                    [
                      n("div", Le, [
                        l.billing && l.billing_position === "before"
                          ? (u(), o("small", Te, i(l.billing), 1))
                          : c("", !0),
                        n("span", null, i(l.name), 1),
                        l.billing && l.billing_position !== "before"
                          ? (u(), o("small", Oe, i(l.billing), 1))
                          : c("", !0),
                      ]),
                      n("div", Be, i(l.desc), 1),
                    ],
                    10,
                    Ae,
                  )
                ),
              ),
              128,
            )),
          ]),
          n("div", Fe, [
            n("section", Pe, [
              n("div", { class: "sec-head" }, [
                t[5] ||
                  (t[5] = n("span", { class: "sec-title" }, "🎥 我的视频", -1)),
                n(
                  "button",
                  { class: "btn-plain refresh-btn", onClick: F },
                  "刷新",
                ),
              ]),
              G.value.length
                ? (u(),
                  o("div", qe, [
                    (u(!0),
                    o(
                      L,
                      null,
                      T(G.value, (l) => {
                        var a;
                        return (
                          u(),
                          o("article", { key: l.id, class: "vid-card card" }, [
                            n(
                              "div",
                              { class: H(["vid-status", l.status]) },
                              i(ke(l)),
                              3,
                            ),
                            l.status === "success" && l.video_url
                              ? (u(),
                                o(
                                  "video",
                                  { key: 0, src: l.video_url, controls: "" },
                                  null,
                                  8,
                                  Ne,
                                ))
                              : l.status === "success"
                                ? (u(), o("div", He, "未返回视频地址"))
                                : l.status === "failed"
                                  ? (u(),
                                    o(
                                      "div",
                                      Ke,
                                      i(l.error || "生成失败，未返回详细原因"),
                                      1,
                                    ))
                                  : (u(),
                                    o("div", Ge, [
                                      t[6] ||
                                        (t[6] = n(
                                          "span",
                                          { class: "spinner" },
                                          null,
                                          -1,
                                        )),
                                      t[7] ||
                                        (t[7] = N("生成中，请稍后查看… ", -1)),
                                      l.error
                                        ? (u(), o("small", Je, i(l.error), 1))
                                        : c("", !0),
                                    ])),
                            n("div", Qe, [
                              n(
                                "span",
                                We,
                                i(
                                  (a = l.created_at) == null
                                    ? void 0
                                    : a.slice(5, 16),
                                ),
                                1,
                              ),
                              n("span", Xe, i(l.model), 1),
                              t[8] ||
                                (t[8] = n(
                                  "span",
                                  { class: "spacer" },
                                  null,
                                  -1,
                                )),
                              l.status === "success" && l.video_url
                                ? (u(),
                                  o(
                                    "button",
                                    {
                                      key: 0,
                                      class: "btn-plain",
                                      onClick: (s) => we(l),
                                    },
                                    "下载",
                                    8,
                                    Ye,
                                  ))
                                : c("", !0),
                              n(
                                "button",
                                {
                                  class: "btn-plain btn-danger",
                                  onClick: (s) => xe(l.id),
                                },
                                "删除",
                                8,
                                Ze,
                              ),
                            ]),
                          ])
                        );
                      }),
                      128,
                    )),
                  ]))
                : (u(), o("div", Re, "暂无视频任务，去下面生成第一个视频吧")),
            ]),
            n("section", el, [
              t[15] ||
                (t[15] = n("div", { class: "form-title" }, "🎥 视频生成", -1)),
              n("div", ll, [
                P(
                  n(
                    "textarea",
                    {
                      ref_key: "promptInput",
                      ref: W,
                      "onUpdate:modelValue":
                        t[0] || (t[0] = (l) => (g.value = l)),
                      class: "input",
                      placeholder:
                        "描述视频内容；添加参考图后，输入 @ 可以引用指定图片...",
                      rows: "3",
                      onInput: _e,
                      onKeydown: ge,
                      onBlur: ye,
                    },
                    null,
                    544,
                  ),
                  [[le, g.value]],
                ),
                w.value && S.value.length
                  ? (u(),
                    o(
                      "div",
                      {
                        key: 0,
                        class: "mention-menu",
                        onMousedown: t[1] || (t[1] = Ie(() => {}, ["prevent"])),
                      },
                      [
                        t[10] ||
                          (t[10] = n(
                            "div",
                            { class: "mention-title" },
                            "选择要引用的参考图",
                            -1,
                          )),
                        (u(!0),
                        o(
                          L,
                          null,
                          T(
                            S.value,
                            (l, a) => (
                              u(),
                              o(
                                "button",
                                {
                                  key: l.index,
                                  type: "button",
                                  class: H([
                                    "mention-item",
                                    { active: a === D.value },
                                  ]),
                                  onMouseenter: (s) => (D.value = a),
                                  onClick: (s) => ee(l.index),
                                },
                                [
                                  n(
                                    "img",
                                    { src: l.image, alt: l.label },
                                    null,
                                    8,
                                    al,
                                  ),
                                  n("span", null, i(l.label), 1),
                                  t[9] ||
                                    (t[9] = n("small", null, "插入引用", -1)),
                                ],
                                42,
                                tl,
                              )
                            ),
                          ),
                          128,
                        )),
                      ],
                      32,
                    ))
                  : c("", !0),
              ]),
              d.value.length
                ? (u(),
                  o("div", sl, [
                    ...(t[11] ||
                      (t[11] = [
                        N("输入 ", -1),
                        n("b", null, "@", -1),
                        N(" 可在提示词中引用指定参考图", -1),
                      ])),
                  ]))
                : c("", !0),
              n("div", nl, [
                ae.value
                  ? (u(),
                    o("div", ol, [
                      n("label", ul, i(y.value.label), 1),
                      n("div", il, [
                        (u(!0),
                        o(
                          L,
                          null,
                          T(
                            d.value,
                            (l, a) => (
                              u(),
                              o("div", { key: a, class: "ref-thumb" }, [
                                n(
                                  "img",
                                  { src: l, alt: `参考图 ${a + 1}` },
                                  null,
                                  8,
                                  rl,
                                ),
                                ["images", "frames"].includes(y.value.key) &&
                                E.value === 2
                                  ? (u(),
                                    o(
                                      "span",
                                      cl,
                                      i(a === 0 ? "首帧" : "尾帧"),
                                      1,
                                    ))
                                  : c("", !0),
                                n(
                                  "button",
                                  {
                                    type: "button",
                                    class: "ref-remove",
                                    title: "移除这张图片",
                                    onClick: (s) => he(a),
                                  },
                                  "✕",
                                  8,
                                  vl,
                                ),
                              ])
                            ),
                          ),
                          128,
                        )),
                        d.value.length < E.value
                          ? (u(),
                            o(
                              "button",
                              {
                                key: 0,
                                type: "button",
                                class: "ref-add",
                                onClick:
                                  t[2] ||
                                  (t[2] = (l) => {
                                    var a;
                                    return (a = j.value) == null
                                      ? void 0
                                      : a.click();
                                  }),
                              },
                              [
                                t[12] ||
                                  (t[12] = n(
                                    "span",
                                    { class: "ref-plus" },
                                    "＋",
                                    -1,
                                  )),
                                n(
                                  "span",
                                  null,
                                  i(d.value.length ? "继续添加" : "添加图片"),
                                  1,
                                ),
                              ],
                            ))
                          : c("", !0),
                        n(
                          "input",
                          {
                            ref_key: "refInput",
                            ref: j,
                            type: "file",
                            accept: y.value.accept || "image/*",
                            multiple: E.value > 1,
                            class: "ref-file-input",
                            onChange: re,
                          },
                          null,
                          40,
                          dl,
                        ),
                      ]),
                      d.value.length
                        ? (u(),
                          o(
                            "div",
                            fl,
                            "已添加 " +
                              i(d.value.length) +
                              "/" +
                              i(E.value) +
                              " 张",
                            1,
                          ))
                        : c("", !0),
                    ]))
                  : c("", !0),
                se.value
                  ? (u(),
                    o("div", pl, [
                      n("label", ml, i(b.value.label), 1),
                      n("div", hl, [
                        f.value.length < O.value
                          ? (u(),
                            o(
                              "button",
                              {
                                key: 0,
                                type: "button",
                                class: "ref-add",
                                onClick:
                                  t[3] ||
                                  (t[3] = (l) => {
                                    var a;
                                    return (a = x.value) == null
                                      ? void 0
                                      : a.click();
                                  }),
                              },
                              [
                                t[13] ||
                                  (t[13] = n(
                                    "span",
                                    { class: "ref-plus" },
                                    "＋",
                                    -1,
                                  )),
                                n(
                                  "span",
                                  null,
                                  i(f.value.length ? "继续添加" : "上传视频"),
                                  1,
                                ),
                              ],
                            ))
                          : c("", !0),
                        f.value.length
                          ? (u(),
                            o(
                              "span",
                              _l,
                              "已添加 " +
                                i(f.value.length) +
                                "/" +
                                i(O.value) +
                                " 个",
                              1,
                            ))
                          : c("", !0),
                        f.value.length
                          ? (u(),
                            o(
                              "button",
                              {
                                key: 2,
                                type: "button",
                                class: "btn-plain btn-danger",
                                onClick: de,
                              },
                              "清空",
                            ))
                          : c("", !0),
                      ]),
                      n(
                        "input",
                        {
                          ref_key: "videoInput",
                          ref: x,
                          type: "file",
                          accept: b.value.accept || "video/*",
                          multiple: O.value > 1,
                          class: "ref-file-input",
                          onChange: ce,
                        },
                        null,
                        40,
                        gl,
                      ),
                    ]))
                  : c("", !0),
                ne.value
                  ? (u(),
                    o("div", yl, [
                      n("label", bl, i(U.value.label), 1),
                      n("div", kl, [
                        p.value.length < B.value
                          ? (u(),
                            o(
                              "button",
                              {
                                key: 0,
                                type: "button",
                                class: "ref-add",
                                onClick:
                                  t[4] ||
                                  (t[4] = (l) => {
                                    var a;
                                    return (a = C.value) == null
                                      ? void 0
                                      : a.click();
                                  }),
                              },
                              [
                                t[14] ||
                                  (t[14] = n(
                                    "span",
                                    { class: "ref-plus" },
                                    "＋",
                                    -1,
                                  )),
                                n(
                                  "span",
                                  null,
                                  i(p.value.length ? "继续添加" : "上传音频"),
                                  1,
                                ),
                              ],
                            ))
                          : c("", !0),
                        p.value.length
                          ? (u(),
                            o(
                              "span",
                              wl,
                              "已添加 " +
                                i(p.value.length) +
                                "/" +
                                i(B.value) +
                                " 段",
                              1,
                            ))
                          : c("", !0),
                        p.value.length
                          ? (u(),
                            o(
                              "button",
                              {
                                key: 2,
                                type: "button",
                                class: "btn-plain btn-danger",
                                onClick: fe,
                              },
                              "清空",
                            ))
                          : c("", !0),
                      ]),
                      n(
                        "input",
                        {
                          ref_key: "audioInput",
                          ref: C,
                          type: "file",
                          accept: "audio/*",
                          multiple: B.value > 1,
                          class: "ref-file-input",
                          onChange: ve,
                        },
                        null,
                        40,
                        xl,
                      ),
                    ]))
                  : c("", !0),
                (u(!0),
                o(
                  L,
                  null,
                  T(
                    oe.value,
                    (l, a) => (
                      u(),
                      o(
                        "div",
                        {
                          key: a,
                          class: H([
                            "option-field",
                            { "url-field": l.type === "url" },
                          ]),
                        },
                        [
                          n("label", Cl, i(l.label), 1),
                          l.options
                            ? P(
                                (u(),
                                o(
                                  "select",
                                  {
                                    key: 0,
                                    "onUpdate:modelValue": (s) =>
                                      (r.value[a] = s),
                                    class: "input",
                                  },
                                  [
                                    (u(!0),
                                    o(
                                      L,
                                      null,
                                      T(
                                        me(l),
                                        (s) => (
                                          u(),
                                          o(
                                            "option",
                                            { key: String(Z(s)), value: Z(s) },
                                            i(pe(s)) +
                                              i(a === "duration" ? " 秒" : ""),
                                            9,
                                            Vl,
                                          )
                                        ),
                                      ),
                                      128,
                                    )),
                                  ],
                                  8,
                                  $l,
                                )),
                                [[Me, r.value[a]]],
                              )
                            : l.type === "number"
                              ? P(
                                  (u(),
                                  o(
                                    "input",
                                    {
                                      key: 1,
                                      "onUpdate:modelValue": (s) =>
                                        (r.value[a] = s),
                                      type: "number",
                                      class: "input",
                                      min: l.min,
                                      max: l.max,
                                    },
                                    null,
                                    8,
                                    Il,
                                  )),
                                  [[le, r.value[a], void 0, { number: !0 }]],
                                )
                              : l.type === "text" || l.type === "url"
                                ? P(
                                    (u(),
                                    o(
                                      "input",
                                      {
                                        key: 2,
                                        "onUpdate:modelValue": (s) =>
                                          (r.value[a] = s),
                                        type: l.type === "url" ? "url" : "text",
                                        class: "input",
                                        placeholder: l.label,
                                      },
                                      null,
                                      8,
                                      Ul,
                                    )),
                                    [[Ee, r.value[a]]],
                                  )
                                : (u(),
                                  o("label", Ml, [
                                    P(
                                      n(
                                        "input",
                                        {
                                          "onUpdate:modelValue": (s) =>
                                            (r.value[a] = s),
                                          type: "checkbox",
                                        },
                                        null,
                                        8,
                                        El,
                                      ),
                                      [[je, r.value[a]]],
                                    ),
                                    N(
                                      " " + i(r.value[a] ? "已开启" : "关闭"),
                                      1,
                                    ),
                                  ])),
                        ],
                        2,
                      )
                    ),
                  ),
                  128,
                )),
                n("div", jl, [
                  n(
                    "button",
                    { class: "btn", disabled: !ue.value, onClick: be },
                    i(
                      $.value
                        ? "正在处理素材…"
                        : R.value
                          ? "提交中…"
                          : "生成视频",
                    ),
                    9,
                    Dl,
                  ),
                ]),
              ]),
              k.value ? (u(), o("div", Sl, "⚠ " + i(k.value), 1)) : c("", !0),
            ]),
          ]),
        ])
      );
    },
  },
  Tl = Ce(zl, [["__scopeId", "data-v-1a1a93c5"]]);
export { Tl as default };
