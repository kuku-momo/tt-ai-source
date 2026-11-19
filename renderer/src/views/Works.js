import "../styles/pages/Works.css";
import {
  _ as le,
  q as se,
  o as ne,
  a as oe,
  b as i,
  e as l,
  g as R,
  F as q,
  r as z,
  y as A,
  v as ie,
  z as ue,
  t as o,
  j as u,
  h as I,
  A as re,
  p as B,
  T as de,
  B as ce,
  l as r,
  D as ve,
  E as ke,
  m as n,
} from "../runtime/index.js";
import { W as pe } from "./WorkPublisher.js";
const we = { class: "works-page" },
  me = { class: "works-hero" },
  fe = { class: "works-toolbar" },
  he = { "aria-label": "作品分类" },
  _e = ["onClick"],
  ye = { key: 0, class: "works-message", role: "status" },
  be = { key: 1, class: "works-error", role: "alert" },
  ge = { key: 2, class: "works-empty" },
  Ce = { key: 3, class: "works-empty" },
  $e = { key: 4, class: "works-grid" },
  Se = ["aria-label", "onClick"],
  Te = ["src", "alt"],
  Ee = { key: 0, class: "work-pick" },
  Re = { class: "work-duration" },
  je = { class: "work-info" },
  Le = ["onClick"],
  Oe = { class: "work-meta" },
  Ue = { class: "work-author" },
  xe = { key: 0, class: "work-review" },
  Be = { key: 1, class: "work-actions" },
  Pe = ["onClick"],
  Me = ["onClick"],
  Ve = ["onClick"],
  We = { key: 5, class: "works-pagination" },
  De = ["disabled"],
  Ne = ["disabled"],
  qe = ["aria-label"],
  ze = { class: "work-screen" },
  Ae = ["src", "poster"],
  Ie = { class: "work-detail" },
  Ke = { class: "work-detail-top" },
  He = ["disabled"],
  Je = { class: "work-description" },
  Fe = { class: "work-detail-actions" },
  Ge = ["disabled"],
  Qe = { key: 3, role: "status" },
  Xe = { key: 0 },
  Ye = {
    __name: "Works",
    setup(Ze) {
      const h = ce(),
        P = ke(),
        K = [
          { id: "latest", label: "最新作品" },
          { id: "recommended", label: "精选推荐" },
          { id: "mine", label: "我的作品" },
        ],
        c = r("latest"),
        j = r(""),
        k = r(1),
        $ = r([]),
        S = r(0),
        L = r(!1),
        w = r(""),
        _ = r(""),
        m = r(!1),
        b = r(null),
        s = r(null),
        O = r(!1),
        T = r(!1),
        v = r(""),
        M = r(null);
      let g = 0,
        U = null,
        y = null;
      async function f(t, e) {
        const a = await fetch(t, e),
          d = await a.json();
        if (!a.ok || !d.ok) throw new Error(d.msg || "操作失败");
        return d;
      }
      function V(t, e) {
        return {
          method: t,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        };
      }
      async function p() {
        const t = ++g;
        (L.value = !0), (w.value = "");
        try {
          const e = new URLSearchParams({
            page: String(k.value),
            q: j.value,
            sort: c.value,
          });
          c.value === "mine" && e.set("mine", "1");
          const a = await f("/api/works?" + e);
          t === g && (($.value = a.works), (S.value = a.total));
        } catch (e) {
          t === g && (w.value = e.message);
        } finally {
          t === g && (L.value = !1);
        }
      }
      function H(t) {
        (c.value = t), (k.value = 1), (_.value = ""), p();
      }
      function J(t) {
        const e = Math.round(t);
        return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`;
      }
      function F(t) {
        return (
          {
            pending: "待审核",
            published: "已公开",
            rejected: "审核未通过",
            hidden: "已下架",
          }[t] || t
        );
      }
      async function x(t) {
        var e;
        (y = document.activeElement),
          (s.value = { ...t }),
          (U = null),
          (v.value = ""),
          h.params.id !== String(t.id) && P.push("/works/" + t.id),
          await ve(),
          (e = M.value) == null || e.focus();
      }
      function E() {
        var t;
        (s.value = null),
          (v.value = ""),
          h.params.id && P.push("/works"),
          (t = y == null ? void 0 : y.focus) == null || t.call(y);
      }
      async function W(t) {
        try {
          const e = await f("/api/works/" + encodeURIComponent(t));
          h.params.id === String(t) && x(e.work);
        } catch (e) {
          w.value = e.message;
        }
      }
      async function G() {
        var e;
        const t = s.value;
        if (!(!t || t.status !== "published" || U === t.id)) {
          U = t.id;
          try {
            const a = await f(`/api/works/${t.id}/view`, { method: "POST" });
            ((e = s.value) == null ? void 0 : e.id) === t.id &&
              (s.value.views = a.views),
              D(t.id, { views: a.views });
          } catch {}
        }
      }
      function D(t, e) {
        const a = $.value.find((d) => d.id === t);
        a && Object.assign(a, e);
      }
      async function Q() {
        var e;
        const t = s.value;
        if (t) {
          O.value = !0;
          try {
            const a = await f(
              `/api/works/${t.id}/like`,
              V("PUT", { liked: !t.liked }),
            );
            ((e = s.value) == null ? void 0 : e.id) === t.id &&
              Object.assign(s.value, { likes: a.likes, liked: a.liked }),
              D(t.id, { likes: a.likes, liked: a.liked });
          } catch (a) {
            v.value = a.message;
          } finally {
            O.value = !1;
          }
        }
      }
      async function X() {
        const t = new URL("/works/" + s.value.id, location.origin).href;
        try {
          await navigator.clipboard.writeText(t),
            (v.value = "分享链接已复制，登录后即可观看");
        } catch {
          window.prompt("复制作品链接（登录后可观看）", t);
        }
      }
      async function Y() {
        const t = s.value;
        (T.value = !0), (v.value = "正在准备下载…");
        try {
          const e = await fetch(t.download_url);
          if (!e.ok) throw new Error("下载失败，请稍后重试");
          const a = await e.blob(),
            d = URL.createObjectURL(a),
            C = document.createElement("a");
          (C.href = d),
            (C.download = t.title + ".mp4"),
            document.body.append(C),
            C.click(),
            C.remove(),
            setTimeout(() => URL.revokeObjectURL(d), 6e4),
            (v.value = "已发起下载");
        } catch (e) {
          v.value = e.message;
        } finally {
          T.value = !1;
        }
      }
      async function Z() {
        const t = window.prompt("请填写举报原因（最多500字）");
        if (t != null && t.trim())
          try {
            await f(
              `/api/works/${s.value.id}/report`,
              V("POST", { reason: t }),
            ),
              (v.value = "举报已提交，管理员会审核处理");
          } catch (e) {
            v.value = e.message;
          }
      }
      async function ee(t) {
        if (confirm("下架后其他用户将无法观看，确定下架？"))
          try {
            await f(`/api/works/${t.id}/hide`, { method: "POST" }),
              (_.value = "作品已下架"),
              p();
          } catch (e) {
            w.value = e.message;
          }
      }
      async function te(t) {
        if (confirm("确定删除这个作品？删除后将不再显示。"))
          try {
            await f(`/api/works/${t.id}`, { method: "DELETE" }),
              (_.value = "作品已删除"),
              p();
          } catch (e) {
            w.value = e.message;
          }
      }
      function ae() {
        (m.value = !1),
          (b.value = null),
          (_.value = "作品已提交审核，可在“我的作品”查看状态。"),
          (c.value = "mine"),
          (k.value = 1),
          p();
      }
      function N(t) {
        t.key === "Escape" && !m.value && s.value && E();
      }
      return (
        se(
          () => h.params.id,
          (t) => {
            var e;
            t && String((e = s.value) == null ? void 0 : e.id) !== String(t)
              ? W(t)
              : t || (s.value = null);
          },
        ),
        ne(() => {
          p(),
            h.params.id && W(h.params.id),
            document.addEventListener("keydown", N);
        }),
        oe(() => {
          g++, document.removeEventListener("keydown", N);
        }),
        (t, e) => (
          n(),
          i("div", we, [
            l("header", me, [
              e[7] ||
                (e[7] = l(
                  "div",
                  null,
                  [
                    l(
                      "span",
                      { class: "works-eyebrow" },
                      "CREATORS · SHOWCASE",
                    ),
                    l("h1", null, [
                      R("让好故事，被看见"),
                      l("span", null, "。"),
                    ]),
                    l(
                      "p",
                      null,
                      "分享你的短剧与创意，发现更多值得欣赏的作品。",
                    ),
                  ],
                  -1,
                )),
              l(
                "button",
                {
                  class: "works-primary",
                  onClick:
                    e[0] ||
                    (e[0] = (a) => {
                      (b.value = null), (m.value = !0);
                    }),
                },
                "＋ 发布作品",
              ),
              e[8] ||
                (e[8] = l(
                  "div",
                  { class: "hero-orbit", "aria-hidden": "true" },
                  "▶",
                  -1,
                )),
            ]),
            l("div", fe, [
              l("nav", he, [
                (n(),
                i(
                  q,
                  null,
                  z(K, (a) =>
                    l(
                      "button",
                      {
                        key: a.id,
                        class: B({ active: c.value === a.id }),
                        onClick: (d) => H(a.id),
                      },
                      o(a.label),
                      11,
                      _e,
                    ),
                  ),
                  64,
                )),
              ]),
              l(
                "form",
                {
                  class: "works-search",
                  onSubmit:
                    e[2] ||
                    (e[2] = A(
                      (a) => {
                        (k.value = 1), p();
                      },
                      ["prevent"],
                    )),
                },
                [
                  ie(
                    l(
                      "input",
                      {
                        "onUpdate:modelValue":
                          e[1] || (e[1] = (a) => (j.value = a)),
                        "aria-label": "搜索作品或作者",
                        placeholder: "搜索作品或作者",
                        maxlength: "80",
                      },
                      null,
                      512,
                    ),
                    [[ue, j.value]],
                  ),
                  e[9] ||
                    (e[9] = l("button", { "aria-label": "搜索" }, "⌕", -1)),
                ],
                32,
              ),
            ]),
            _.value ? (n(), i("p", ye, o(_.value), 1)) : u("", !0),
            w.value
              ? (n(),
                i("p", be, [
                  R(o(w.value) + " ", 1),
                  l("button", { onClick: p }, "重试"),
                ]))
              : u("", !0),
            L.value
              ? (n(), i("div", ge, "正在加载作品…"))
              : $.value.length
                ? (n(),
                  i("div", $e, [
                    (n(!0),
                    i(
                      q,
                      null,
                      z(
                        $.value,
                        (a) => (
                          n(),
                          i("article", { key: a.id, class: "work-card" }, [
                            l(
                              "button",
                              {
                                class: "work-cover",
                                "aria-label": `观看 ${a.title}`,
                                onClick: (d) => x(a),
                              },
                              [
                                l(
                                  "img",
                                  {
                                    src: a.cover_url,
                                    alt: a.title,
                                    loading: "lazy",
                                  },
                                  null,
                                  8,
                                  Te,
                                ),
                                a.recommended
                                  ? (n(), i("span", Ee, "精选推荐"))
                                  : u("", !0),
                                c.value === "mine"
                                  ? (n(),
                                    i(
                                      "span",
                                      {
                                        key: 1,
                                        class: B(["work-status", a.status]),
                                      },
                                      o(F(a.status)),
                                      3,
                                    ))
                                  : u("", !0),
                                e[11] ||
                                  (e[11] = l(
                                    "span",
                                    { class: "work-play" },
                                    "▶",
                                    -1,
                                  )),
                                l("span", Re, o(J(a.duration)), 1),
                              ],
                              8,
                              Se,
                            ),
                            l("div", je, [
                              l(
                                "button",
                                { class: "work-title", onClick: (d) => x(a) },
                                o(a.title),
                                9,
                                Le,
                              ),
                              l("div", Oe, [
                                l("span", Ue, [
                                  l("i", null, o(a.author_name.slice(0, 1)), 1),
                                  R(o(a.author_name), 1),
                                ]),
                                l(
                                  "span",
                                  null,
                                  "▷ " + o(a.views) + " · ♡ " + o(a.likes),
                                  1,
                                ),
                              ]),
                              c.value === "mine" && a.review_note
                                ? (n(),
                                  i(
                                    "p",
                                    xe,
                                    "审核说明：" + o(a.review_note),
                                    1,
                                  ))
                                : u("", !0),
                              c.value === "mine"
                                ? (n(),
                                  i("div", Be, [
                                    l(
                                      "button",
                                      {
                                        onClick: (d) => {
                                          (b.value = a), (m.value = !0);
                                        },
                                      },
                                      "编辑" +
                                        o(
                                          ["hidden", "rejected"].includes(
                                            a.status,
                                          )
                                            ? " / 重新提交"
                                            : "",
                                        ),
                                      9,
                                      Pe,
                                    ),
                                    ["pending", "published"].includes(a.status)
                                      ? (n(),
                                        i(
                                          "button",
                                          { key: 0, onClick: (d) => ee(a) },
                                          "下架",
                                          8,
                                          Me,
                                        ))
                                      : u("", !0),
                                    l(
                                      "button",
                                      { onClick: (d) => te(a) },
                                      "删除",
                                      8,
                                      Ve,
                                    ),
                                  ]))
                                : u("", !0),
                            ]),
                          ])
                        ),
                      ),
                      128,
                    )),
                  ]))
                : (n(),
                  i("div", Ce, [
                    e[10] || (e[10] = l("span", null, "🎬", -1)),
                    l(
                      "h2",
                      null,
                      o(
                        c.value === "mine"
                          ? "你的故事，从这里开始"
                          : c.value === "recommended"
                            ? "精彩作品，值得期待"
                            : "第一部作品，等你来发布",
                      ),
                      1,
                    ),
                    l(
                      "p",
                      null,
                      o(
                        c.value === "mine"
                          ? "上传自己的视频，或直接发布短剧制作中的成片。"
                          : "这里将展示创作者们审核通过的视频作品。",
                      ),
                      1,
                    ),
                    l(
                      "button",
                      {
                        class: "works-primary",
                        onClick:
                          e[3] ||
                          (e[3] = (a) => {
                            (b.value = null), (m.value = !0);
                          }),
                      },
                      "发布我的作品",
                    ),
                  ])),
            S.value > 12
              ? (n(),
                i("div", We, [
                  l(
                    "button",
                    {
                      disabled: k.value <= 1,
                      onClick:
                        e[4] ||
                        (e[4] = (a) => {
                          k.value--, p();
                        }),
                    },
                    "上一页",
                    8,
                    De,
                  ),
                  l(
                    "span",
                    null,
                    o(k.value) + " / " + o(Math.ceil(S.value / 12)),
                    1,
                  ),
                  l(
                    "button",
                    {
                      disabled: k.value * 12 >= S.value,
                      onClick:
                        e[5] ||
                        (e[5] = (a) => {
                          k.value++, p();
                        }),
                    },
                    "下一页",
                    8,
                    Ne,
                  ),
                ]))
              : u("", !0),
            m.value
              ? (n(),
                I(
                  pe,
                  {
                    key: 6,
                    work: b.value,
                    onClose: e[6] || (e[6] = (a) => (m.value = !1)),
                    onPublished: ae,
                  },
                  null,
                  8,
                  ["work"],
                ))
              : u("", !0),
            (n(),
            I(de, { to: "body" }, [
              s.value
                ? (n(),
                  i(
                    "div",
                    {
                      key: 0,
                      class: "work-view-overlay",
                      onClick: A(E, ["self"]),
                      onKeydown: re(E, ["esc"]),
                    },
                    [
                      l(
                        "section",
                        {
                          class: "work-view",
                          role: "dialog",
                          "aria-modal": "true",
                          "aria-label": s.value.title,
                        },
                        [
                          l(
                            "button",
                            {
                              ref_key: "closeButton",
                              ref: M,
                              class: "work-view-close",
                              "aria-label": "关闭播放",
                              onClick: E,
                            },
                            "×",
                            512,
                          ),
                          l("div", ze, [
                            (n(),
                            i(
                              "video",
                              {
                                key: s.value.id,
                                src: s.value.video_url,
                                poster: s.value.cover_url,
                                controls: "",
                                controlslist: "nodownload",
                                playsinline: "",
                                preload: "metadata",
                                onPlay: G,
                              },
                              null,
                              40,
                              Ae,
                            )),
                          ]),
                          l("div", Ie, [
                            l("div", Ke, [
                              l("div", null, [
                                l("h2", null, o(s.value.title), 1),
                                l("p", null, [
                                  R(
                                    "作者 · " + o(s.value.author_name) + " ",
                                    1,
                                  ),
                                  l(
                                    "span",
                                    null,
                                    "▷ " + o(s.value.views) + " 次观看",
                                    1,
                                  ),
                                ]),
                              ]),
                              s.value.status === "published"
                                ? (n(),
                                  i(
                                    "button",
                                    {
                                      key: 0,
                                      disabled: O.value,
                                      class: B({ liked: s.value.liked }),
                                      onClick: Q,
                                    },
                                    o(s.value.liked ? "♥" : "♡") +
                                      " " +
                                      o(s.value.likes),
                                    11,
                                    He,
                                  ))
                                : u("", !0),
                            ]),
                            l(
                              "p",
                              Je,
                              o(
                                s.value.description ||
                                  "作者还没有填写作品简介。",
                              ),
                              1,
                            ),
                            l("div", Fe, [
                              s.value.status === "published"
                                ? (n(),
                                  i(
                                    "button",
                                    { key: 0, onClick: X },
                                    "分享作品",
                                  ))
                                : u("", !0),
                              s.value.allow_download || s.value.own
                                ? (n(),
                                  i(
                                    "button",
                                    { key: 1, disabled: T.value, onClick: Y },
                                    o(T.value ? "下载中…" : "下载作品"),
                                    9,
                                    Ge,
                                  ))
                                : u("", !0),
                              s.value.status === "published" && !s.value.own
                                ? (n(),
                                  i("button", { key: 2, onClick: Z }, "举报"))
                                : u("", !0),
                              v.value
                                ? (n(), i("span", Qe, o(v.value), 1))
                                : u("", !0),
                            ]),
                            !s.value.allow_download && !s.value.own
                              ? (n(), i("small", Xe, "作者未开放下载"))
                              : u("", !0),
                          ]),
                        ],
                        8,
                        qe,
                      ),
                    ],
                    32,
                  ))
                : u("", !0),
            ])),
          ])
        )
      );
    },
  },
  at = le(Ye, [["__scopeId", "data-v-6c244e24"]]);
export { at as default };
