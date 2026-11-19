import "../styles/pages/Chat.css";
import {
  _ as Se,
  o as Ce,
  a as Te,
  D as ae,
  b as i,
  e as a,
  v as ne,
  z as oe,
  F as U,
  r as K,
  t as m,
  j as C,
  g as Y,
  A as xe,
  y as le,
  l as c,
  G as Q,
  m as l,
  p as B,
  h as ie,
  u as re,
} from "../runtime/index.js";
import { C as Ie } from "../runtime/icons/check.js";
import { C as Ne } from "../runtime/icons/copy.js";
const je = { class: "chat-page" },
  Ae = { class: "model-list" },
  Ee = ["onClick"],
  Me = { class: "name" },
  Oe = { class: "desc" },
  Le = { class: "chat-main" },
  ze = { class: "chat-head" },
  Ue = { class: "muted" },
  Be = { key: 0, class: "empty" },
  De = { class: "msg-role" },
  Re = { class: "msg-body" },
  $e = { key: 0, class: "msg-images" },
  Fe = ["src"],
  Pe = { class: "msg-content" },
  Ve = { key: 1, class: "msg-actions" },
  Je = ["onClick"],
  Ke = { key: 1, class: "msg assistant" },
  qe = { class: "msg-role" },
  He = { class: "msg-body" },
  We = { key: 0, class: "waiting-state" },
  Ge = { class: "chat-input" },
  Ye = { key: 0, class: "image-attachment" },
  Qe = ["src"],
  Xe = { class: "attachment-info" },
  Ze = ["disabled"],
  et = ["placeholder", "onKeydown"],
  tt = { class: "input-actions" },
  st = ["disabled", "title"],
  at = ["disabled"],
  nt = ["disabled"],
  ot = { key: 1, class: "chat-error" },
  lt = { class: "history-panel" },
  it = ["onClick"],
  rt = { class: "hp-name" },
  ut = ["onClick"],
  ct = {
    key: 0,
    class: "muted",
    style: { padding: "12px", "font-size": "12px" },
  },
  X = "active-chat-session-id",
  dt = {
    __name: "Chat",
    setup(vt) {
      const y = c([]),
        q = c(""),
        g = c(""),
        d = c(null),
        _ = c([]),
        j = c([]),
        b = c(""),
        v = c(!1),
        T = c(""),
        D = c(null),
        R = c(null),
        h = c(null),
        x = c(!1),
        r = c(""),
        A = c(null),
        w = c(null);
      let $ = null,
        E = null,
        f = null;
      const ue = Q(() =>
          y.value.filter((s) =>
            (s.name + s.desc).toLowerCase().includes(q.value.toLowerCase()),
          ),
        ),
        Z = Q(() => {
          const s = y.value.find((e) => e.id === g.value);
          return s ? s.name : g.value || "未选择模型";
        }),
        F = Q(() => {
          var s;
          return (
            ((s = y.value.find((e) => e.id === g.value)) == null
              ? void 0
              : s.vision) === !0
          );
        });
      Ce(async () => {
        await ve(), await M(), (await ce()) || (await de());
      }),
        Te(() => {
          E && clearTimeout(E), f && clearTimeout(f);
        });
      async function ce() {
        const s = sessionStorage.getItem("pending-script-maker-chat");
        if (!s) return !1;
        sessionStorage.removeItem("pending-script-maker-chat");
        let e;
        try {
          e = JSON.parse(s);
        } catch {
          return !1;
        }
        return e != null && e.prompt
          ? (P(),
            e.model &&
              y.value.some((t) => t.id === e.model) &&
              (g.value = e.model),
            (b.value = e.prompt),
            await ae(),
            W(),
            !0)
          : !1;
      }
      async function de() {
        const s = Number(sessionStorage.getItem(X)),
          e = j.value.find((n) => n.generation_status === "running"),
          t = j.value.find((n) => n.id === s) || e;
        t && (await V(t.id));
      }
      function H(s) {
        s && sessionStorage.setItem(X, String(s));
      }
      function P() {
        sessionStorage.removeItem(X);
      }
      async function ve() {
        const e = await (await fetch("/api/chat/models")).json();
        (y.value = e.models || []), y.value.length && (g.value = y.value[0].id);
      }
      async function M() {
        const e = await (await fetch("/api/chat/sessions")).json();
        j.value = e.sessions || [];
      }
      function me(s) {
        f && clearTimeout(f),
          (g.value = s),
          (d.value = null),
          (w.value = null),
          (v.value = !1),
          (_.value = []),
          P(),
          I(),
          (r.value = "");
      }
      function fe(s) {
        if (s.model) {
          const e = y.value.find((t) => t.id === s.model);
          return e ? e.name : s.model;
        }
        return "AI";
      }
      async function pe() {
        f && clearTimeout(f),
          (d.value = null),
          (w.value = null),
          (v.value = !1),
          (_.value = []),
          (b.value = ""),
          P(),
          I(),
          (r.value = "");
      }
      async function V(s) {
        var n, o, k, u;
        f && clearTimeout(f), (d.value = s);
        const e = await fetch(`/api/chat/sessions/${s}/messages`),
          t = await e.json();
        if (!e.ok || t.ok === !1) throw new Error(t.msg || "加载对话失败");
        (_.value = (t.messages || []).map(ge)),
          H(s),
          (n = t.session) != null &&
            n.model &&
            y.value.some((O) => O.id === t.session.model) &&
            (g.value = t.session.model),
          ((o = t.session) == null ? void 0 : o.generation_status) === "running"
            ? ((v.value = !0), (w.value = s), ee(s))
            : ((v.value = !1),
              (w.value = null),
              ((k = t.session) == null ? void 0 : k.generation_status) ===
                "failed" &&
                (r.value =
                  t.session.generation_error || "生成失败，请重新发送")),
          I(),
          ((u = t.session) == null ? void 0 : u.generation_status) !==
            "failed" && (r.value = ""),
          J();
      }
      function ee(s) {
        f && clearTimeout(f),
          (f = setTimeout(async () => {
            if (Number(d.value) === Number(s))
              try {
                await V(s), await M();
              } catch (e) {
                (r.value = e.message), ee(s);
              }
          }, 2e3));
      }
      async function he(s) {
        confirm("删除该对话？") &&
          (await fetch(`/api/chat/sessions/${s}`, { method: "DELETE" }),
          d.value === s &&
            (f && clearTimeout(f),
            (d.value = null),
            (w.value = null),
            (v.value = !1),
            (_.value = []),
            P()),
          M());
      }
      async function W() {
        const s = b.value.trim() || (h.value ? "请详细描述图片内容。" : "");
        if (!s || v.value || x.value) return;
        const e = h.value ? { ...h.value } : null,
          t = "u" + Date.now();
        (b.value = ""),
          I(),
          (v.value = !0),
          (T.value = ""),
          (r.value = ""),
          ($ = new AbortController());
        let n = !1,
          o = d.value;
        _.value.push({
          id: t,
          role: "user",
          content: s,
          attachments: e ? [e.url] : [],
        }),
          J();
        try {
          if (!o) {
            const N = await fetch("/api/chat/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: s.slice(0, 20), model: g.value }),
              }),
              z = await N.json().catch(() => ({}));
            if (!N.ok || !z.id) throw new Error(z.msg || "创建对话失败");
            (o = z.id), (d.value = o), H(o), await M();
          }
          w.value = o;
          const u = await fetch("/api/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              session_id: o,
              model: g.value,
              prompt: s,
              images: e ? [e.url] : [],
            }),
            signal: $.signal,
          });
          if (!u.ok) {
            const N = await u.json().catch(() => ({}));
            throw new Error(N.msg || `请求失败 (${u.status})`);
          }
          const O = u.body.getReader(),
            be = new TextDecoder();
          let L = "",
            S = "";
          for (;;) {
            const { done: N, value: z } = await O.read();
            if (N) break;
            L += be.decode(z, { stream: !0 });
            let G;
            for (
              ;
              (G = L.indexOf(`
`)) >= 0;

            ) {
              const se = L.slice(0, G).trim();
              if (((L = L.slice(G + 1)), !se.startsWith("data:"))) continue;
              const ke = se.slice(5).trim();
              try {
                const p = JSON.parse(ke);
                p.type === "started"
                  ? ((o = p.session_id || o),
                    (d.value = o),
                    (w.value = o),
                    H(o))
                  : p.type === "delta"
                    ? ((S += p.content),
                      Number(d.value) === Number(o) && ((T.value = S), J()))
                    : p.type === "done"
                      ? ((S = p.content || S),
                        (T.value = S),
                        p.session_id && (d.value = p.session_id))
                      : p.type === "error" &&
                        ((r.value = p.msg || "生成失败"),
                        p.session_id && (d.value = p.session_id));
              } catch {}
            }
          }
          S &&
            _.value.push({
              id: "a" + Date.now(),
              role: "assistant",
              content: S,
              model: g.value,
            });
        } catch (u) {
          (n = !0),
            u.name !== "AbortError" &&
              ((r.value = "请求失败：" + u.message),
              (_.value = _.value.filter((O) => O.id !== t)),
              (b.value = s),
              e && (h.value = { ...e, preview: e.url }));
        }
        Number(w.value) === Number(o) &&
          ((v.value = !1), (w.value = null), (T.value = ""));
        const k = r.value;
        await M(),
          o && Number(d.value) === Number(o) && !n && (await V(o)),
          k && (r.value = k),
          J();
      }
      function ge(s) {
        let e = [];
        try {
          const t = JSON.parse(s.attachments_json || "[]");
          Array.isArray(t) && (e = t.filter((n) => typeof n == "string"));
        } catch {}
        return { ...s, attachments: e };
      }
      function te(s) {
        return Array.isArray(s.attachments) ? s.attachments : [];
      }
      async function _e(s) {
        const e = String((s == null ? void 0 : s.content) || "");
        if (e)
          try {
            let t = !1;
            if (navigator.clipboard && window.isSecureContext)
              try {
                await navigator.clipboard.writeText(e), (t = !0);
              } catch {}
            if (!t) {
              const n = document.createElement("textarea");
              if (
                ((n.value = e),
                n.setAttribute("readonly", ""),
                (n.style.position = "fixed"),
                (n.style.opacity = "0"),
                document.body.appendChild(n),
                n.select(),
                (t = document.execCommand("copy")),
                n.remove(),
                !t)
              )
                throw new Error("复制失败");
            }
            (A.value = s.id),
              E && clearTimeout(E),
              (E = setTimeout(() => {
                A.value = null;
              }, 1800));
          } catch {
            r.value = "复制失败，请选中文本后手动复制";
          }
      }
      async function ye(s) {
        var n;
        const e = (n = s.target.files) == null ? void 0 : n[0];
        if (((s.target.value = ""), !e)) return;
        if (((r.value = ""), !F.value)) {
          r.value = "当前模型不支持图片理解，请选择带“多模态”标签的模型";
          return;
        }
        if (e.size > 20 * 1024 * 1024) {
          r.value = "图片不能超过 20MB";
          return;
        }
        I();
        const t = URL.createObjectURL(e);
        x.value = !0;
        try {
          const o = new FormData();
          o.append("file", e);
          const k = await fetch("/api/uploads/oss/image", {
              method: "POST",
              body: o,
            }),
            u = await k.json().catch(() => ({}));
          if (!k.ok || !u.ok || !u.url)
            throw new Error(u.msg || "图片上传失败");
          h.value = {
            url: u.url,
            preview: t,
            name: u.name || e.name,
            size: u.size || e.size,
          };
        } catch (o) {
          URL.revokeObjectURL(t), (r.value = o.message);
        } finally {
          x.value = !1;
        }
      }
      function I() {
        var e;
        const s = (e = h.value) == null ? void 0 : e.preview;
        s != null && s.startsWith("blob:") && URL.revokeObjectURL(s),
          (h.value = null),
          R.value && (R.value.value = "");
      }
      function we() {
        $ && $.abort();
      }
      function J() {
        ae(() => {
          D.value && (D.value.scrollTop = D.value.scrollHeight);
        });
      }
      return (s, e) => (
        l(),
        i("div", je, [
          a("div", Ae, [
            ne(
              a(
                "input",
                {
                  "onUpdate:modelValue": e[0] || (e[0] = (t) => (q.value = t)),
                  class: "input",
                  placeholder: "搜索模型名称...",
                  style: { "margin-bottom": "8px" },
                },
                null,
                512,
              ),
              [[oe, q.value]],
            ),
            (l(!0),
            i(
              U,
              null,
              K(
                ue.value,
                (t) => (
                  l(),
                  i(
                    "div",
                    {
                      key: t.id,
                      class: B(["model-item", { active: g.value === t.id }]),
                      onClick: (n) => me(t.id),
                    },
                    [a("div", Me, m(t.name), 1), a("div", Oe, m(t.desc), 1)],
                    10,
                    Ee,
                  )
                ),
              ),
              128,
            )),
          ]),
          a("div", Le, [
            a("div", ze, [
              a("span", Ue, m(Z.value), 1),
              e[3] || (e[3] = a("span", { style: { flex: "1" } }, null, -1)),
              a("button", { class: "btn-plain", onClick: pe }, "＋ 新建对话"),
            ]),
            a(
              "div",
              { ref_key: "msgBox", ref: D, class: "msg-box" },
              [
                _.value.length
                  ? C("", !0)
                  : (l(),
                    i("div", Be, [
                      ...(e[4] ||
                        (e[4] = [
                          a("div", { class: "empty-title" }, "AI创作系统", -1),
                          a(
                            "div",
                            { class: "muted" },
                            "选择左侧模型，开始你的创作之旅",
                            -1,
                          ),
                        ])),
                    ])),
                (l(!0),
                i(
                  U,
                  null,
                  K(
                    _.value,
                    (t) => (
                      l(),
                      i(
                        "div",
                        { key: t.id, class: B(["msg", t.role]) },
                        [
                          a("div", De, m(t.role === "user" ? "我" : fe(t)), 1),
                          a("div", Re, [
                            te(t).length
                              ? (l(),
                                i("div", $e, [
                                  (l(!0),
                                  i(
                                    U,
                                    null,
                                    K(
                                      te(t),
                                      (n) => (
                                        l(),
                                        i(
                                          "img",
                                          { key: n, src: n, alt: "对话图片" },
                                          null,
                                          8,
                                          Fe,
                                        )
                                      ),
                                    ),
                                    128,
                                  )),
                                ]))
                              : C("", !0),
                            a("div", Pe, m(t.content), 1),
                            t.role === "assistant" && t.content
                              ? (l(),
                                i("div", Ve, [
                                  a(
                                    "button",
                                    {
                                      type: "button",
                                      class: B({ copied: A.value === t.id }),
                                      onClick: (n) => _e(t),
                                    },
                                    [
                                      A.value === t.id
                                        ? (l(),
                                          ie(re(Ie), { key: 0, size: 14 }))
                                        : (l(),
                                          ie(re(Ne), { key: 1, size: 14 })),
                                      Y(
                                        " " +
                                          m(
                                            A.value === t.id
                                              ? "已复制"
                                              : "复制全文",
                                          ),
                                        1,
                                      ),
                                    ],
                                    10,
                                    Je,
                                  ),
                                ]))
                              : C("", !0),
                          ]),
                        ],
                        2,
                      )
                    ),
                  ),
                  128,
                )),
                v.value
                  ? (l(),
                    i("div", Ke, [
                      a("div", qe, m(Z.value), 1),
                      a("div", He, [
                        T.value
                          ? (l(), i(U, { key: 1 }, [Y(m(T.value), 1)], 64))
                          : (l(),
                            i("span", We, [
                              ...(e[5] ||
                                (e[5] = [
                                  a(
                                    "span",
                                    { class: "waiting-spinner" },
                                    null,
                                    -1,
                                  ),
                                  a("span", null, "等待模型返回结果…", -1),
                                ])),
                            ])),
                        e[6] ||
                          (e[6] = a("span", { class: "cursor" }, "▍", -1)),
                      ]),
                    ]))
                  : C("", !0),
              ],
              512,
            ),
            a("div", Ge, [
              h.value
                ? (l(),
                  i("div", Ye, [
                    a(
                      "img",
                      {
                        src: h.value.preview || h.value.url,
                        alt: "待发送图片",
                      },
                      null,
                      8,
                      Qe,
                    ),
                    a("div", Xe, [
                      a("strong", null, m(h.value.name), 1),
                      e[7] ||
                        (e[7] = a(
                          "span",
                          null,
                          "图片已上传，可随消息一起发送",
                          -1,
                        )),
                    ]),
                    a(
                      "button",
                      {
                        class: "attachment-remove",
                        type: "button",
                        title: "移除图片",
                        disabled: v.value,
                        onClick: I,
                      },
                      "×",
                      8,
                      Ze,
                    ),
                  ]))
                : C("", !0),
              ne(
                a(
                  "textarea",
                  {
                    "onUpdate:modelValue":
                      e[1] || (e[1] = (t) => (b.value = t)),
                    class: "input",
                    placeholder: F.value
                      ? "输入问题，也可以上传图片让模型分析..."
                      : "你可以问我任何问题...",
                    rows: "2",
                    onKeydown: xe(le(W, ["exact", "prevent"]), ["enter"]),
                  },
                  null,
                  40,
                  et,
                ),
                [[oe, b.value]],
              ),
              a("div", tt, [
                a(
                  "input",
                  {
                    ref_key: "imageInput",
                    ref: R,
                    class: "file-input",
                    type: "file",
                    accept:
                      ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp",
                    onChange: ye,
                  },
                  null,
                  544,
                ),
                a(
                  "button",
                  {
                    class: "btn-plain upload-button",
                    type: "button",
                    disabled: v.value || x.value || !F.value,
                    title: F.value
                      ? "上传图片供模型分析"
                      : "当前模型不支持图片理解",
                    onClick:
                      e[2] ||
                      (e[2] = (t) => {
                        var n;
                        return (n = R.value) == null ? void 0 : n.click();
                      }),
                  },
                  [
                    e[8] ||
                      (e[8] = a(
                        "span",
                        { class: "upload-icon", "aria-hidden": "true" },
                        "＋",
                        -1,
                      )),
                    Y(" " + m(x.value ? "上传中..." : "上传图片"), 1),
                  ],
                  8,
                  st,
                ),
                e[9] ||
                  (e[9] = a("span", { class: "action-spacer" }, null, -1)),
                a(
                  "button",
                  {
                    class: "btn",
                    disabled:
                      (!b.value.trim() && !h.value) || v.value || x.value,
                    onClick: W,
                  },
                  m(v.value ? "生成中..." : "发送"),
                  9,
                  at,
                ),
                a(
                  "button",
                  { class: "btn-plain", disabled: v.value, onClick: we },
                  "停止",
                  8,
                  nt,
                ),
              ]),
              r.value ? (l(), i("div", ot, m(r.value), 1)) : C("", !0),
            ]),
          ]),
          a("div", lt, [
            e[10] || (e[10] = a("div", { class: "hp-title" }, "历史记录", -1)),
            (l(!0),
            i(
              U,
              null,
              K(j.value, (t) => {
                var n;
                return (
                  l(),
                  i(
                    "div",
                    {
                      key: t.id,
                      class: B(["hp-item", { active: d.value === t.id }]),
                      onClick: (o) => V(t.id),
                    },
                    [
                      a("div", rt, m(t.title), 1),
                      a(
                        "div",
                        {
                          class: B([
                            "hp-time",
                            {
                              running: t.generation_status === "running",
                              failed: t.generation_status === "failed",
                            },
                          ]),
                        },
                        m(
                          t.generation_status === "running"
                            ? "生成中…"
                            : t.generation_status === "failed"
                              ? "生成未完成"
                              : (n = t.updated_at) == null
                                ? void 0
                                : n.slice(5, 16),
                        ),
                        3,
                      ),
                      a(
                        "div",
                        {
                          class: "hp-del",
                          onClick: le((o) => he(t.id), ["stop"]),
                        },
                        "✕",
                        8,
                        ut,
                      ),
                    ],
                    10,
                    it,
                  )
                );
              }),
              128,
            )),
            j.value.length ? C("", !0) : (l(), i("div", ct, "暂无历史对话")),
          ]),
        ])
      );
    },
  },
  ht = Se(dt, [["__scopeId", "data-v-79e84e54"]]);
export { ht as default };
