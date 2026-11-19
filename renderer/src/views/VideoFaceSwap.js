import "../styles/pages/VideoFaceSwap.css";
import {
  _ as q,
  o as H,
  s as K,
  b as o,
  e,
  t as u,
  j as h,
  g as N,
  v as S,
  z as Q,
  F as j,
  r as F,
  l as i,
  G as W,
  m as n,
  p as P,
  M as X,
} from "../runtime/index.js";
const Y = { class: "face-swap-page" },
  Z = { class: "page-head" },
  ee = ["disabled"],
  se = { class: "face-swap-grid" },
  te = { class: "card swap-form" },
  le = { class: "upload-grid" },
  ae = { class: "upload-box" },
  oe = { key: 0, class: "preview image-preview" },
  ne = ["src"],
  ie = ["disabled"],
  ue = { key: 2, class: "file-name" },
  de = { class: "upload-box" },
  re = { key: 0, class: "preview video-preview" },
  ce = ["src"],
  ve = ["disabled"],
  pe = { key: 2, class: "file-name" },
  me = { class: "field-block" },
  fe = { class: "field-block mode-block" },
  ge = { class: "mode-options" },
  _e = ["value"],
  be = ["disabled"],
  ye = { key: 0, class: "form-error" },
  ke = { class: "card history-card" },
  we = { class: "history-head" },
  he = { class: "history-count" },
  Ce = { key: 0, class: "empty-state" },
  Te = { key: 1, class: "task-grid" },
  xe = { class: "task-top" },
  Ie = { class: "task-time" },
  Ve = ["src"],
  Ee = { key: 1, class: "task-error" },
  Me = { key: 2, class: "task-pending" },
  De = { class: "task-bottom" },
  Ne = ["onClick"],
  Se = ["onClick"],
  B = "wan2.2-animate-mix",
  je =
    "将参考图片中的人物替换到参考视频中的人物，保持原视频的动作、镜头、背景、服装、表情变化和音频节奏不变，不新增其他人物或场景。",
  Fe = {
    __name: "VideoFaceSwap",
    setup(Pe) {
      const O = [
          {
            value: "wan-std",
            label: "标准模式",
            desc: "速度更快，适合快速预览",
          },
          {
            value: "wan-pro",
            label: "专业模式",
            desc: "细节更好，适合正式输出",
          },
        ],
        T = i(null),
        x = i(null),
        c = i(""),
        v = i(""),
        _ = i(""),
        b = i(""),
        y = i(""),
        k = i("wan-std"),
        p = i(!1),
        m = i(!1),
        w = i(!1),
        C = i(!1),
        d = i(""),
        f = i([]);
      let I = null;
      const V = W(
        () => !!(c.value && v.value && !w.value && !p.value && !m.value),
      );
      H(() => {
        g(), (I = setInterval(g, 1e4));
      }),
        K(() => clearInterval(I));
      async function E(l, s) {
        const t = new FormData();
        t.append("file", l);
        const a = await fetch(s, { method: "POST", body: t }),
          r = await a.json().catch(() => ({}));
        if (!a.ok || !r.ok || !r.url) throw new Error(r.msg || "素材上传失败");
        return r.url;
      }
      async function U(l) {
        var t;
        const s = (t = l.target.files) == null ? void 0 : t[0];
        if (((l.target.value = ""), !!s)) {
          if (s.size > 10 * 1024 * 1024) {
            d.value = "人物图片不能超过 10MB";
            return;
          }
          (d.value = ""), (p.value = !0);
          try {
            (c.value = await E(s, "/api/uploads/oss/image")),
              (_.value = s.name);
          } catch (a) {
            d.value = a.message;
          } finally {
            p.value = !1;
          }
        }
      }
      async function $(l) {
        var t;
        const s = (t = l.target.files) == null ? void 0 : t[0];
        if (((l.target.value = ""), !!s)) {
          (d.value = ""), (m.value = !0);
          try {
            (v.value = await E(s, "/api/uploads/oss/video")),
              (b.value = s.name);
          } catch (a) {
            d.value = a.message;
          } finally {
            m.value = !1;
          }
        }
      }
      function M() {
        (c.value = ""), (_.value = "");
      }
      function D() {
        (v.value = ""), (b.value = "");
      }
      async function L() {
        if (V.value) {
          (w.value = !0), (d.value = "");
          try {
            const l = await fetch("/api/video/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  model: B,
                  prompt: y.value.trim() || je,
                  params: { mode: k.value },
                  uploads: { image_url: [c.value], video_url: [v.value] },
                }),
              }),
              s = await l.json().catch(() => ({}));
            if (!l.ok || !s.ok)
              throw new Error(s.msg || "提交失败，请稍后重试");
            M(), D(), (y.value = ""), await g();
          } catch (l) {
            d.value = l.message;
          } finally {
            w.value = !1;
          }
        }
      }
      async function g() {
        C.value = !0;
        try {
          const l = await fetch("/api/video/tasks"),
            s = await l.json().catch(() => ({}));
          if (!l.ok) throw new Error(s.msg || "任务列表加载失败");
          f.value = (s.tasks || []).filter((t) => t.model === B);
        } catch (l) {
          f.value.length || (d.value = l.message);
        } finally {
          C.value = !1;
        }
      }
      function z(l) {
        return (
          {
            pending: "排队中",
            generating: "生成中",
            success: "已完成",
            failed: "失败",
          }[l.status] || l.status
        );
      }
      function G(l) {
        if (!l) return "";
        try {
          return new Date(l).toLocaleString("zh-CN", {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch {
          return l;
        }
      }
      function J(l) {
        const s = document.createElement("a");
        (s.href = l.video_url),
          (s.download = `video-face-swap-${l.id}.mp4`),
          s.click();
      }
      async function R(l) {
        confirm("删除这条换人记录？") &&
          (await fetch(`/api/video/tasks/${l}`, { method: "DELETE" }), g());
      }
      return (l, s) => (
        n(),
        o("div", Y, [
          e("header", Z, [
            s[4] ||
              (s[4] = e(
                "div",
                null,
                [
                  e("div", { class: "eyebrow" }, "视频复刻 · 独立工具"),
                  e("h1", null, "视频换人"),
                  e(
                    "p",
                    { class: "page-subtitle" },
                    "用一张新人物图片替换原视频中的人物，保留原视频的动作、背景和节奏。",
                  ),
                ],
                -1,
              )),
            e(
              "button",
              {
                class: "btn-plain",
                type: "button",
                disabled: C.value,
                onClick: g,
              },
              "↻ 刷新任务",
              8,
              ee,
            ),
          ]),
          e("div", se, [
            e("section", te, [
              s[14] ||
                (s[14] = e("div", { class: "section-title" }, "上传素材", -1)),
              e("div", le, [
                e("div", ae, [
                  s[7] ||
                    (s[7] = e(
                      "div",
                      { class: "upload-label" },
                      [e("span", null, "替换人物图片"), e("b", null, "必填")],
                      -1,
                    )),
                  c.value
                    ? (n(),
                      o("div", oe, [
                        e(
                          "img",
                          { src: c.value, alt: "替换人物预览" },
                          null,
                          8,
                          ne,
                        ),
                        e(
                          "button",
                          {
                            type: "button",
                            class: "preview-remove",
                            title: "移除图片",
                            onClick: M,
                          },
                          "×",
                        ),
                      ]))
                    : (n(),
                      o(
                        "button",
                        {
                          key: 1,
                          type: "button",
                          class: "upload-trigger",
                          disabled: p.value,
                          onClick:
                            s[0] ||
                            (s[0] = (t) => {
                              var a;
                              return (a = T.value) == null ? void 0 : a.click();
                            }),
                        },
                        [
                          s[5] ||
                            (s[5] = e(
                              "span",
                              { class: "upload-icon" },
                              "＋",
                              -1,
                            )),
                          e(
                            "span",
                            null,
                            u(p.value ? "正在上传…" : "选择人物图片"),
                            1,
                          ),
                          s[6] ||
                            (s[6] = e(
                              "small",
                              null,
                              "支持 JPG、PNG，单张不超过 10MB",
                              -1,
                            )),
                        ],
                        8,
                        ie,
                      )),
                  e(
                    "input",
                    {
                      ref_key: "imageInput",
                      ref: T,
                      class: "hidden-input",
                      type: "file",
                      accept: ".jpg,.jpeg,.png",
                      onChange: U,
                    },
                    null,
                    544,
                  ),
                  _.value ? (n(), o("div", ue, u(_.value), 1)) : h("", !0),
                ]),
                e("div", de, [
                  s[10] ||
                    (s[10] = e(
                      "div",
                      { class: "upload-label" },
                      [e("span", null, "原始参考视频"), e("b", null, "必填")],
                      -1,
                    )),
                  v.value
                    ? (n(),
                      o("div", re, [
                        e(
                          "video",
                          { src: v.value, controls: "", preload: "metadata" },
                          null,
                          8,
                          ce,
                        ),
                        e(
                          "button",
                          {
                            type: "button",
                            class: "preview-remove",
                            title: "移除视频",
                            onClick: D,
                          },
                          "×",
                        ),
                      ]))
                    : (n(),
                      o(
                        "button",
                        {
                          key: 1,
                          type: "button",
                          class: "upload-trigger",
                          disabled: m.value,
                          onClick:
                            s[1] ||
                            (s[1] = (t) => {
                              var a;
                              return (a = x.value) == null ? void 0 : a.click();
                            }),
                        },
                        [
                          s[8] ||
                            (s[8] = e(
                              "span",
                              { class: "upload-icon" },
                              "＋",
                              -1,
                            )),
                          e(
                            "span",
                            null,
                            u(m.value ? "正在上传…" : "选择原始视频"),
                            1,
                          ),
                          s[9] ||
                            (s[9] = e(
                              "small",
                              null,
                              "支持 MP4、MOV；单人连续镜头效果最佳",
                              -1,
                            )),
                        ],
                        8,
                        ve,
                      )),
                  e(
                    "input",
                    {
                      ref_key: "videoInput",
                      ref: x,
                      class: "hidden-input",
                      type: "file",
                      accept: ".mp4,.mov",
                      onChange: $,
                    },
                    null,
                    544,
                  ),
                  b.value ? (n(), o("div", pe, u(b.value), 1)) : h("", !0),
                ]),
              ]),
              e("div", me, [
                s[11] ||
                  (s[11] = e(
                    "label",
                    { for: "swap-prompt" },
                    [N("换人说明 "), e("span", null, "可选")],
                    -1,
                  )),
                S(
                  e(
                    "textarea",
                    {
                      id: "swap-prompt",
                      "onUpdate:modelValue":
                        s[2] || (s[2] = (t) => (y.value = t)),
                      class: "input",
                      rows: "3",
                      maxlength: "1000",
                      placeholder:
                        "例如：将视频中的人物替换为参考图片中的人物，保持原动作和表情变化。",
                    },
                    null,
                    512,
                  ),
                  [[Q, y.value]],
                ),
                s[12] ||
                  (s[12] = e(
                    "div",
                    { class: "field-hint" },
                    "未填写时会使用默认换人指令，不会额外添加人物或场景。",
                    -1,
                  )),
              ]),
              e("div", fe, [
                s[13] || (s[13] = e("label", null, "生成模式", -1)),
                e("div", ge, [
                  (n(),
                  o(
                    j,
                    null,
                    F(O, (t) =>
                      e(
                        "label",
                        {
                          key: t.value,
                          class: P([
                            "mode-option",
                            { selected: k.value === t.value },
                          ]),
                        },
                        [
                          S(
                            e(
                              "input",
                              {
                                "onUpdate:modelValue":
                                  s[3] || (s[3] = (a) => (k.value = a)),
                                type: "radio",
                                value: t.value,
                              },
                              null,
                              8,
                              _e,
                            ),
                            [[X, k.value]],
                          ),
                          e("span", null, [
                            e("strong", null, u(t.label), 1),
                            e("small", null, u(t.desc), 1),
                          ]),
                        ],
                        2,
                      ),
                    ),
                    64,
                  )),
                ]),
              ]),
              e(
                "button",
                {
                  class: "btn submit-button",
                  type: "button",
                  disabled: !V.value,
                  onClick: L,
                },
                u(w.value ? "提交中…" : "生成换人视频"),
                9,
                be,
              ),
              d.value ? (n(), o("div", ye, "⚠ " + u(d.value), 1)) : h("", !0),
            ]),
            s[15] ||
              (s[15] = e(
                "aside",
                { class: "card tips-card" },
                [
                  e("div", { class: "section-title" }, "上传要求"),
                  e("ul", null, [
                    e("li", null, "参考视频需要是单人物、连续同一镜头。"),
                    e(
                      "li",
                      null,
                      "人物应清晰可见，避免多人同框、频繁切镜或被遮挡。",
                    ),
                    e("li", null, "人物图片建议正面、光线均匀、面部无遮挡。"),
                    e(
                      "li",
                      null,
                      "标准模式速度更快，专业模式细节和稳定性更好。",
                    ),
                  ]),
                  e("div", { class: "model-note" }, [
                    e("span", { class: "status-dot" }),
                    N("当前模型：万相-视频换人"),
                  ]),
                ],
                -1,
              )),
          ]),
          e("section", ke, [
            e("div", we, [
              s[16] ||
                (s[16] = e("div", { class: "section-title" }, "换人记录", -1)),
              e("span", he, u(f.value.length) + " 条", 1),
            ]),
            f.value.length
              ? (n(),
                o("div", Te, [
                  (n(!0),
                  o(
                    j,
                    null,
                    F(f.value, (t) => {
                      var a, r;
                      return (
                        n(),
                        o("article", { key: t.id, class: "task-item" }, [
                          e("div", xe, [
                            e(
                              "span",
                              { class: P(["task-status", t.status]) },
                              u(z(t)),
                              3,
                            ),
                            e("span", Ie, u(G(t.created_at)), 1),
                          ]),
                          t.status === "success" && t.video_url
                            ? (n(),
                              o(
                                "video",
                                {
                                  key: 0,
                                  src: t.video_url,
                                  controls: "",
                                  preload: "metadata",
                                },
                                null,
                                8,
                                Ve,
                              ))
                            : t.status === "failed"
                              ? (n(),
                                o(
                                  "div",
                                  Ee,
                                  u(t.error || "生成失败，未返回详细原因"),
                                  1,
                                ))
                              : (n(),
                                o("div", Me, [
                                  ...(s[17] ||
                                    (s[17] = [
                                      e("span", { class: "spinner" }, null, -1),
                                      e(
                                        "span",
                                        null,
                                        "生成中，完成后会自动显示",
                                        -1,
                                      ),
                                    ])),
                                ])),
                          e("div", De, [
                            e(
                              "span",
                              null,
                              u(
                                ((r = (a = t.params) == null ? void 0 : a.ui) ==
                                null
                                  ? void 0
                                  : r.mode) === "wan-pro"
                                  ? "专业模式"
                                  : "标准模式",
                              ),
                              1,
                            ),
                            s[18] ||
                              (s[18] = e(
                                "span",
                                { class: "task-spacer" },
                                null,
                                -1,
                              )),
                            t.status === "success" && t.video_url
                              ? (n(),
                                o(
                                  "button",
                                  {
                                    key: 0,
                                    class: "btn-plain",
                                    type: "button",
                                    onClick: (A) => J(t),
                                  },
                                  "下载",
                                  8,
                                  Ne,
                                ))
                              : h("", !0),
                            e(
                              "button",
                              {
                                class: "btn-plain danger",
                                type: "button",
                                onClick: (A) => R(t.id),
                              },
                              "删除",
                              8,
                              Se,
                            ),
                          ]),
                        ])
                      );
                    }),
                    128,
                  )),
                ]))
              : (n(), o("div", Ce, "暂无换人任务，上传素材后生成第一个视频。")),
          ]),
        ])
      );
    },
  },
  Oe = q(Fe, [["__scopeId", "data-v-73a34b7f"]]);
export { Oe as default };
