import "../styles/pages/Draw.css";
import {
  c as he,
  _ as ye,
  o as be,
  s as ke,
  b as a,
  e as t,
  F as j,
  r as N,
  j as u,
  t as i,
  v as K,
  z as we,
  y as V,
  g as J,
  x as te,
  d as _e,
  h as Ce,
  f as C,
  u as x,
  T as xe,
  l as r,
  G as q,
  D as $e,
  m as n,
  p as le,
} from "../runtime/index.js";
import { D as se } from "../runtime/icons/download.js";
import { X as Te } from "../runtime/icons/x.js";
import { C as ze } from "../runtime/icons/chevronRight.js";
import { S as Ie } from "../runtime/icons/search.js";
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Ee = {
    name: "chevron-left",
    size: 24,
    node: [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]],
  },
  De = he(Ee),
  Le = { class: "draw-page" },
  Re = { class: "model-list" },
  Se = ["onClick"],
  Me = { class: "name" },
  Ae = { class: "desc" },
  Pe = { class: "draw-main" },
  Ue = { class: "history-section" },
  je = { key: 0, class: "empty muted" },
  Ne = { key: 1, class: "err", role: "alert" },
  Ve = { key: 2, class: "grid grid-4" },
  Be = { key: 0, class: "hist-thumb hist-loading" },
  Oe = { key: 1, class: "hist-thumb preview-thumb" },
  Fe = ["src"],
  Ke = { key: 0, class: "hist-num" },
  Je = ["onClick"],
  qe = { key: 2, class: "hist-thumb hist-fail" },
  Ge = { class: "hist-info" },
  He = { class: "hist-prompt" },
  Qe = { class: "hist-meta" },
  We = {
    key: 0,
    style: { color: "var(--yellow,#f59e0b)", "font-size": "11px" },
  },
  Xe = ["title"],
  Ye = ["title"],
  Ze = ["disabled", "aria-busy", "onClick"],
  et = ["onClick"],
  tt = ["onClick"],
  lt = { class: "form-card card" },
  st = { class: "prompt-wrap" },
  nt = ["onMouseenter", "onClick"],
  ot = ["src", "alt"],
  at = { key: 0, class: "mention-tip" },
  it = { class: "form-row" },
  rt = { class: "ref-picker" },
  ut = ["src", "alt"],
  dt = ["onClick"],
  ct = { key: 0, class: "hint ok ref-count" },
  vt = { style: { display: "flex", "align-items": "flex-end" } },
  pt = ["disabled"],
  ft = { key: 1, class: "err", style: { "margin-top": "10px" } },
  mt = { class: "lightbox-topbar" },
  gt = { class: "lightbox-title" },
  ht = { key: 0, class: "err", role: "alert" },
  yt = { class: "lightbox-actions" },
  bt = ["disabled", "aria-busy"],
  kt = ["src", "alt"],
  wt = { class: "modal error-modal" },
  _t = { class: "error-modal-head" },
  Ct = { class: "error-context" },
  xt = { class: "error-prompt" },
  $t = { class: "error-message" },
  Tt = { class: "actions" },
  zt = {
    __name: "Draw",
    setup(It) {
      const L = r([]),
        R = r(""),
        c = r(""),
        B = r("1:1"),
        O = r(1),
        v = r([]),
        S = r(null),
        G = r(null),
        m = r(!1),
        M = r(-1),
        H = r(""),
        k = r(0),
        A = r(!1),
        $ = r(""),
        T = r([]),
        f = r(null),
        h = r(null),
        g = r(0),
        y = r(!1),
        w = r("");
      let z = null;
      const I = q(() => b(h.value)),
        ne = q(() => I.value[g.value] || "");
      be(async () => {
        const e = await (await fetch("/api/draw/models")).json();
        (L.value = e.models || []),
          L.value.length && (R.value = L.value[0].id),
          E(),
          window.addEventListener("keydown", Y);
      });
      async function E() {
        const e = await (await fetch("/api/draw/tasks")).json();
        (T.value = e.tasks || []), T.value.some((l) => P(l.status)) || W();
      }
      function P(s) {
        return s === "pending" || s === "generating";
      }
      const _ = q(() => {
        const s = H.value.trim().toLowerCase();
        return v.value
          .map((e, l) => ({ image: e, index: l, label: `参考图${l + 1}` }))
          .filter(
            (e) =>
              !s ||
              e.label.toLowerCase().includes(s) ||
              `图${e.index + 1}`.includes(s),
          );
      });
      function oe(s) {
        const e = s.target.selectionStart ?? c.value.length,
          o = c.value.slice(0, e).match(/@([^\s@]*)$/);
        if (!o || !v.value.length) {
          m.value = !1;
          return;
        }
        (M.value = e - o[0].length),
          (H.value = o[1] || ""),
          (k.value = 0),
          (m.value = !0);
      }
      function ae(s) {
        if (!(!m.value || !_.value.length))
          if (s.key === "ArrowDown" || s.key === "ArrowUp") {
            s.preventDefault();
            const e = s.key === "ArrowDown" ? 1 : -1;
            k.value = (k.value + e + _.value.length) % _.value.length;
          } else
            s.key === "Enter" || s.key === "Tab"
              ? (s.preventDefault(), Q(_.value[k.value].index))
              : s.key === "Escape" && (s.preventDefault(), (m.value = !1));
      }
      function Q(s) {
        const e = G.value,
          l = (e == null ? void 0 : e.selectionStart) ?? c.value.length,
          o = M.value >= 0 ? M.value : l,
          p = `@参考图${s + 1} `;
        (c.value = c.value.slice(0, o) + p + c.value.slice(l)),
          (m.value = !1),
          (M.value = -1),
          $e(() => {
            const d = o + p.length;
            e == null || e.focus(), e == null || e.setSelectionRange(d, d);
          });
      }
      function ie() {
        setTimeout(() => {
          m.value = !1;
        }, 120);
      }
      function b(s) {
        if (!(s != null && s.images)) return [];
        try {
          const e = JSON.parse(s.images);
          return Array.isArray(e) ? e.filter(Boolean) : [];
        } catch {
          return [];
        }
      }
      function re() {
        z || (z = setInterval(E, 3e3));
      }
      function W() {
        z && (clearInterval(z), (z = null));
      }
      ke(() => {
        W(), window.removeEventListener("keydown", Y);
      });
      function ue(s) {
        const e = Array.from(s.target.files || []).slice(0, 9);
        for (const l of e) {
          const o = new FileReader();
          (o.onload = () => {
            v.value.length < 9 && v.value.push(o.result);
          }),
            o.readAsDataURL(l);
        }
        s.target.value = "";
      }
      function de(s) {
        v.value.splice(s, 1),
          (c.value = c.value.replace(/@参考图(\d+)\s*/g, (e, l) => {
            const o = Number(l);
            return o === s + 1 ? "" : o > s + 1 ? `@参考图${o - 1} ` : e;
          })),
          (m.value = !1);
      }
      async function ce() {
        (A.value = !0), ($.value = "");
        try {
          const e = await (
            await fetch("/api/draw/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: R.value,
                prompt: c.value.trim(),
                size: B.value,
                count: O.value,
                refImages: v.value,
              }),
            })
          ).json();
          e.ok
            ? ((c.value = ""),
              (v.value = []),
              S.value && (S.value.value = ""),
              E(),
              re())
            : ($.value = e.msg || "提交失败");
        } catch (s) {
          $.value = s.message;
        }
        A.value = !1;
      }
      async function X(s, e = 0) {
        var l, o, p;
        if (!(y.value || !(s != null && s.id))) {
          (y.value = !0), (w.value = "");
          try {
            const d = await fetch(
              `/api/draw/tasks/${s.id}/images/${e}/download`,
              { signal: AbortSignal.timeout(13e4) },
            );
            if (!d.ok) {
              const ge = await d.json().catch(() => ({}));
              throw new Error(ge.msg || `下载失败（HTTP ${d.status}）`);
            }
            if (
              !(
                (l = d.headers.get("content-type")) != null &&
                l.startsWith("image/")
              )
            )
              throw new Error("下载失败：服务器未返回图片");
            const me =
                ((p =
                  (o = d.headers.get("content-disposition")) == null
                    ? void 0
                    : o.match(/filename="?([^";]+)"?/i)) == null
                  ? void 0
                  : p[1]) || `lingxi-draw-${s.id}-${e + 1}.png`,
              Z = await d.blob();
            if (!Z.size) throw new Error("下载失败：图片为空");
            const ee = URL.createObjectURL(Z),
              D = document.createElement("a");
            (D.href = ee),
              (D.download = me),
              document.body.appendChild(D),
              D.click(),
              D.remove(),
              setTimeout(() => URL.revokeObjectURL(ee), 6e4);
          } catch (d) {
            w.value =
              d.name === "TimeoutError" ? "图片下载超时，请重试" : d.message;
          } finally {
            y.value = !1;
          }
        }
      }
      function ve(s, e = 0) {
        const l = b(s);
        l.length &&
          ((h.value = s), (g.value = Math.min(Math.max(e, 0), l.length - 1)));
      }
      function F() {
        (h.value = null), (g.value = 0);
      }
      function U(s) {
        const e = I.value.length;
        e < 2 || (g.value = (g.value + s + e) % e);
      }
      function Y(s) {
        h.value &&
          (s.key === "Escape"
            ? F()
            : s.key === "ArrowLeft"
              ? U(-1)
              : s.key === "ArrowRight" && U(1));
      }
      function pe(s) {
        f.value = s;
      }
      async function fe(s) {
        confirm("删除这条生成记录？") &&
          (await fetch(`/api/draw/tasks/${s}`, { method: "DELETE" }), E());
      }
      return (s, e) => (
        n(),
        a("div", Le, [
          t("div", Re, [
            (n(!0),
            a(
              j,
              null,
              N(
                L.value,
                (l) => (
                  n(),
                  a(
                    "div",
                    {
                      key: l.id,
                      class: le(["model-item", { active: R.value === l.id }]),
                      onClick: (o) => (R.value = l.id),
                    },
                    [t("div", Me, i(l.name), 1), t("div", Ae, i(l.desc), 1)],
                    10,
                    Se,
                  )
                ),
              ),
              128,
            )),
          ]),
          t("div", Pe, [
            t("div", Ue, [
              t("div", { class: "sec-head" }, [
                e[12] ||
                  (e[12] = t(
                    "span",
                    { style: { "font-weight": "700" } },
                    "🖼️ 生成记录",
                    -1,
                  )),
                t(
                  "button",
                  {
                    class: "btn-plain",
                    style: { "font-size": "12px" },
                    onClick: E,
                  },
                  "刷新",
                ),
              ]),
              T.value.length
                ? u("", !0)
                : (n(), a("div", je, "暂无生成记录，去下面生成第一张图吧")),
              w.value ? (n(), a("div", Ne, i(w.value), 1)) : u("", !0),
              T.value.length
                ? (n(),
                  a("div", Ve, [
                    (n(!0),
                    a(
                      j,
                      null,
                      N(T.value, (l) => {
                        var o, p;
                        return (
                          n(),
                          a("div", { key: l.id, class: "hist-card card" }, [
                            P(l.status)
                              ? (n(),
                                a("div", Be, [
                                  ...(e[13] ||
                                    (e[13] = [
                                      t("div", { class: "spinner" }, null, -1),
                                      t(
                                        "span",
                                        { style: { "font-size": "11px" } },
                                        "生成中...",
                                        -1,
                                      ),
                                    ])),
                                ]))
                              : b(l).length
                                ? (n(),
                                  a("div", Oe, [
                                    t(
                                      "img",
                                      { src: b(l)[0], alt: "生成图片" },
                                      null,
                                      8,
                                      Fe,
                                    ),
                                    b(l).length > 1
                                      ? (n(),
                                        a(
                                          "span",
                                          Ke,
                                          i(b(l).length) + " 张",
                                          1,
                                        ))
                                      : u("", !0),
                                    t(
                                      "button",
                                      {
                                        type: "button",
                                        class: "zoom-button",
                                        title: "查看大图",
                                        "aria-label": "查看大图",
                                        onClick: (d) => ve(l),
                                      },
                                      [
                                        C(x(Ie), {
                                          size: 18,
                                          "stroke-width": 2,
                                        }),
                                      ],
                                      8,
                                      Je,
                                    ),
                                  ]))
                                : (n(),
                                  a("div", qe, [
                                    ...(e[14] ||
                                      (e[14] = [
                                        t(
                                          "span",
                                          { class: "fail-icon" },
                                          "!",
                                          -1,
                                        ),
                                        t(
                                          "span",
                                          { class: "fail-label" },
                                          "生成失败",
                                          -1,
                                        ),
                                      ])),
                                  ])),
                            t("div", Ge, [
                              t(
                                "div",
                                He,
                                i(
                                  ((o = l.prompt) == null
                                    ? void 0
                                    : o.slice(0, 26)) || "未命名",
                                ),
                                1,
                              ),
                              t("div", Qe, [
                                t(
                                  "span",
                                  null,
                                  i(
                                    (p = l.created_at) == null
                                      ? void 0
                                      : p.slice(5, 16),
                                  ),
                                  1,
                                ),
                                t("span", null, i(l.model), 1),
                                P(l.status)
                                  ? (n(), a("span", We, "生成中"))
                                  : u("", !0),
                                P(l.status) && l.error
                                  ? (n(),
                                    a(
                                      "span",
                                      {
                                        key: 1,
                                        class: "err",
                                        style: { "font-size": "11px" },
                                        title: l.error,
                                      },
                                      "重试中",
                                      8,
                                      Xe,
                                    ))
                                  : u("", !0),
                              ]),
                              l.status === "failed"
                                ? (n(),
                                  a(
                                    "div",
                                    {
                                      key: 0,
                                      class: "hist-error",
                                      title:
                                        l.error || "生成失败，未返回详细原因",
                                    },
                                    i(l.error || "生成失败，未返回详细原因"),
                                    9,
                                    Ye,
                                  ))
                                : u("", !0),
                            ]),
                            t(
                              "div",
                              {
                                class: "hist-actions",
                                onClick: e[0] || (e[0] = V(() => {}, ["stop"])),
                              },
                              [
                                l.status === "success" && b(l).length
                                  ? (n(),
                                    a(
                                      "button",
                                      {
                                        key: 0,
                                        class: "btn-plain",
                                        disabled: y.value,
                                        "aria-busy": y.value,
                                        onClick: (d) => X(l),
                                      },
                                      [
                                        C(x(se), { size: 14 }),
                                        e[15] || (e[15] = J("下载", -1)),
                                      ],
                                      8,
                                      Ze,
                                    ))
                                  : u("", !0),
                                l.status === "failed"
                                  ? (n(),
                                    a(
                                      "button",
                                      {
                                        key: 1,
                                        class: "btn-plain",
                                        onClick: (d) => pe(l),
                                      },
                                      "查看错误",
                                      8,
                                      et,
                                    ))
                                  : u("", !0),
                                t(
                                  "button",
                                  {
                                    class: "btn-plain btn-danger",
                                    onClick: (d) => fe(l.id),
                                  },
                                  "删除",
                                  8,
                                  tt,
                                ),
                              ],
                            ),
                          ])
                        );
                      }),
                      128,
                    )),
                  ]))
                : u("", !0),
            ]),
            t("div", lt, [
              e[25] ||
                (e[25] = t(
                  "div",
                  { style: { "font-weight": "700", "margin-bottom": "12px" } },
                  "🎨 绘画生成",
                  -1,
                )),
              t("div", st, [
                K(
                  t(
                    "textarea",
                    {
                      ref_key: "promptInput",
                      ref: G,
                      "onUpdate:modelValue":
                        e[1] || (e[1] = (l) => (c.value = l)),
                      class: "input",
                      placeholder:
                        "描述你想生成的画面；添加参考图后，输入 @ 可以引用指定图片...",
                      rows: "3",
                      onInput: oe,
                      onKeydown: ae,
                      onBlur: ie,
                    },
                    null,
                    544,
                  ),
                  [[we, c.value]],
                ),
                m.value && _.value.length
                  ? (n(),
                    a(
                      "div",
                      {
                        key: 0,
                        class: "mention-menu",
                        onMousedown: e[2] || (e[2] = V(() => {}, ["prevent"])),
                      },
                      [
                        e[17] ||
                          (e[17] = t(
                            "div",
                            { class: "mention-title" },
                            "选择要引用的参考图",
                            -1,
                          )),
                        (n(!0),
                        a(
                          j,
                          null,
                          N(
                            _.value,
                            (l, o) => (
                              n(),
                              a(
                                "button",
                                {
                                  key: l.index,
                                  type: "button",
                                  class: le([
                                    "mention-item",
                                    { active: o === k.value },
                                  ]),
                                  onMouseenter: (p) => (k.value = o),
                                  onClick: (p) => Q(l.index),
                                },
                                [
                                  t(
                                    "img",
                                    { src: l.image, alt: l.label },
                                    null,
                                    8,
                                    ot,
                                  ),
                                  t("span", null, i(l.label), 1),
                                  e[16] ||
                                    (e[16] = t("small", null, "插入引用", -1)),
                                ],
                                42,
                                nt,
                              )
                            ),
                          ),
                          128,
                        )),
                      ],
                      32,
                    ))
                  : u("", !0),
              ]),
              v.value.length
                ? (n(),
                  a("div", at, [
                    ...(e[18] ||
                      (e[18] = [
                        J("输入 ", -1),
                        t("b", null, "@", -1),
                        J(" 可在提示词中引用指定参考图", -1),
                      ])),
                  ]))
                : u("", !0),
              t("div", it, [
                t("div", null, [
                  e[20] ||
                    (e[20] = t("label", { class: "hint" }, "比例 / 尺寸", -1)),
                  K(
                    t(
                      "select",
                      {
                        "onUpdate:modelValue":
                          e[3] || (e[3] = (l) => (B.value = l)),
                        class: "input",
                      },
                      [
                        ...(e[19] ||
                          (e[19] = [
                            _e(
                              '<option value="1:1" data-v-158c4328>1:1 方形</option><option value="9:16" data-v-158c4328>9:16 竖屏</option><option value="16:9" data-v-158c4328>16:9 横屏</option><option value="3:4" data-v-158c4328>3:4 竖版</option><option value="4:3" data-v-158c4328>4:3 横版</option><option value="2:3" data-v-158c4328>2:3 竖版</option><option value="3:2" data-v-158c4328>3:2 横版</option><option value="4:5" data-v-158c4328>4:5 竖版</option><option value="21:9" data-v-158c4328>21:9 超宽</option>',
                              9,
                            ),
                          ])),
                      ],
                      512,
                    ),
                    [[te, B.value]],
                  ),
                ]),
                t("div", null, [
                  e[22] || (e[22] = t("label", { class: "hint" }, "数量", -1)),
                  K(
                    t(
                      "select",
                      {
                        "onUpdate:modelValue":
                          e[4] || (e[4] = (l) => (O.value = l)),
                        class: "input",
                      },
                      [
                        ...(e[21] ||
                          (e[21] = [
                            t("option", { value: 1 }, "1 张", -1),
                            t("option", { value: 2 }, "2 张", -1),
                            t("option", { value: 4 }, "4 张", -1),
                          ])),
                      ],
                      512,
                    ),
                    [[te, O.value]],
                  ),
                ]),
                t("div", null, [
                  e[24] ||
                    (e[24] = t(
                      "label",
                      { class: "hint" },
                      "参考图（可选）",
                      -1,
                    )),
                  t("div", rt, [
                    (n(!0),
                    a(
                      j,
                      null,
                      N(
                        v.value,
                        (l, o) => (
                          n(),
                          a("div", { key: o, class: "ref-thumb" }, [
                            t(
                              "img",
                              { src: l, alt: `参考图 ${o + 1}` },
                              null,
                              8,
                              ut,
                            ),
                            t(
                              "button",
                              {
                                type: "button",
                                class: "ref-remove",
                                title: "移除这张图片",
                                onClick: (p) => de(o),
                              },
                              "✕",
                              8,
                              dt,
                            ),
                          ])
                        ),
                      ),
                      128,
                    )),
                    v.value.length < 9
                      ? (n(),
                        a(
                          "button",
                          {
                            key: 0,
                            type: "button",
                            class: "ref-add",
                            onClick:
                              e[5] ||
                              (e[5] = (l) => {
                                var o;
                                return (o = S.value) == null
                                  ? void 0
                                  : o.click();
                              }),
                          },
                          [
                            e[23] ||
                              (e[23] = t(
                                "span",
                                { class: "ref-plus" },
                                "＋",
                                -1,
                              )),
                            t(
                              "span",
                              null,
                              i(v.value.length ? "继续添加" : "添加参考图"),
                              1,
                            ),
                          ],
                        ))
                      : u("", !0),
                    t(
                      "input",
                      {
                        ref_key: "refInput",
                        ref: S,
                        type: "file",
                        accept: "image/*",
                        multiple: "",
                        class: "ref-file-input",
                        onChange: ue,
                      },
                      null,
                      544,
                    ),
                  ]),
                  v.value.length
                    ? (n(),
                      a("div", ct, "已添加 " + i(v.value.length) + "/9 张", 1))
                    : u("", !0),
                ]),
                t("div", vt, [
                  t(
                    "button",
                    {
                      class: "btn",
                      disabled: !c.value.trim() || A.value,
                      onClick: ce,
                    },
                    i(A.value ? "生成中..." : "立即生成"),
                    9,
                    pt,
                  ),
                ]),
              ]),
              $.value ? (n(), a("div", ft, "⚠ " + i($.value), 1)) : u("", !0),
            ]),
          ]),
          (n(),
          Ce(xe, { to: "body" }, [
            h.value
              ? (n(),
                a(
                  "div",
                  {
                    key: 0,
                    class: "image-lightbox",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "图片预览",
                    onClick: V(F, ["self"]),
                  },
                  [
                    t("div", mt, [
                      t("div", gt, [
                        t("strong", null, i(h.value.prompt || "生成图片"), 1),
                        t(
                          "span",
                          null,
                          i(g.value + 1) + " / " + i(I.value.length),
                          1,
                        ),
                        w.value
                          ? (n(), a("span", ht, i(w.value), 1))
                          : u("", !0),
                      ]),
                      t("div", yt, [
                        t(
                          "button",
                          {
                            type: "button",
                            title: "下载当前图片",
                            "aria-label": "下载当前图片",
                            disabled: y.value,
                            "aria-busy": y.value,
                            onClick:
                              e[6] || (e[6] = (l) => X(h.value, g.value)),
                          },
                          [C(x(se), { size: 20 })],
                          8,
                          bt,
                        ),
                        t(
                          "button",
                          {
                            type: "button",
                            title: "关闭预览",
                            "aria-label": "关闭预览",
                            onClick: F,
                          },
                          [C(x(Te), { size: 22 })],
                        ),
                      ]),
                    ]),
                    I.value.length > 1
                      ? (n(),
                        a(
                          "button",
                          {
                            key: 0,
                            type: "button",
                            class: "lightbox-nav lightbox-prev",
                            title: "上一张",
                            "aria-label": "上一张",
                            onClick: e[7] || (e[7] = (l) => U(-1)),
                          },
                          [C(x(De), { size: 30 })],
                        ))
                      : u("", !0),
                    t(
                      "img",
                      {
                        class: "lightbox-image",
                        src: ne.value,
                        alt: `生成图片 ${g.value + 1}`,
                      },
                      null,
                      8,
                      kt,
                    ),
                    I.value.length > 1
                      ? (n(),
                        a(
                          "button",
                          {
                            key: 1,
                            type: "button",
                            class: "lightbox-nav lightbox-next",
                            title: "下一张",
                            "aria-label": "下一张",
                            onClick: e[8] || (e[8] = (l) => U(1)),
                          },
                          [C(x(ze), { size: 30 })],
                        ))
                      : u("", !0),
                  ],
                ))
              : u("", !0),
          ])),
          f.value
            ? (n(),
              a(
                "div",
                {
                  key: 0,
                  class: "modal-mask",
                  onClick:
                    e[11] || (e[11] = V((l) => (f.value = null), ["self"])),
                },
                [
                  t("div", wt, [
                    t("div", _t, [
                      e[26] || (e[26] = t("h3", null, "图片生成失败", -1)),
                      t(
                        "button",
                        {
                          class: "close-btn",
                          onClick: e[9] || (e[9] = (l) => (f.value = null)),
                        },
                        "✕",
                      ),
                    ]),
                    t("div", Ct, [
                      t("span", null, "任务 #" + i(f.value.id), 1),
                      t("span", null, i(f.value.model), 1),
                      t("span", null, i(f.value.created_at), 1),
                    ]),
                    t("div", xt, i(f.value.prompt), 1),
                    t(
                      "div",
                      $t,
                      i(f.value.error || "生成失败，接口未返回详细原因"),
                      1,
                    ),
                    t("div", Tt, [
                      t(
                        "button",
                        {
                          class: "btn",
                          onClick: e[10] || (e[10] = (l) => (f.value = null)),
                        },
                        "知道了",
                      ),
                    ]),
                  ]),
                ],
              ))
            : u("", !0),
        ])
      );
    },
  },
  Mt = ye(zt, [["__scopeId", "data-v-158c4328"]]);
export { Mt as default };
