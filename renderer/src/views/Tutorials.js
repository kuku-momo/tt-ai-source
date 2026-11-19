import "../styles/pages/Tutorials.css";
import {
  _ as $,
  q as V,
  b as l,
  e as t,
  g as N,
  t as r,
  j as f,
  F as p,
  u as I,
  f as x,
  w as B,
  N as L,
  p as E,
  r as T,
  v as R,
  z as j,
  l as i,
  B as q,
  k as z,
  G as A,
  m as s,
  h as D,
} from "../runtime/index.js";
const F = { class: "tutorial-center" },
  G = { key: 0, class: "error", role: "alert" },
  U = { key: 1, role: "status" },
  M = { key: 0, class: "article" },
  P = { class: "tag" },
  S = { key: 0, class: "summary" },
  H = { class: "filters", "aria-label": "教程分类" },
  J = ["onClick"],
  K = { class: "articles" },
  O = { class: "card-meta" },
  Q = { key: 0, class: "empty" },
  W = {
    __name: "Tutorials",
    setup(X) {
      const _ = q(),
        k = i([]),
        g = i([]),
        n = i(null),
        c = i(null),
        m = i(""),
        d = i(""),
        h = i(!1),
        b = A(() =>
          g.value.filter(
            (o) =>
              (!c.value || o.category_id === c.value) &&
              `${o.title} ${o.summary}`
                .toLowerCase()
                .includes(m.value.trim().toLowerCase()),
          ),
        ),
        w = (o) => {
          var e;
          return (
            ((e = k.value.find((u) => u.id === o)) == null ? void 0 : e.name) ||
            "教程"
          );
        };
      let v = 0;
      async function C() {
        const o = ++v;
        (h.value = !0), (d.value = ""), (n.value = null);
        try {
          const e = await fetch("/api/tutorials", { cache: "no-store" }),
            u = await e.json();
          if (!e.ok || !u.ok) throw Error(u.msg || "教程加载失败");
          if (o !== v) return;
          if (((k.value = u.categories), (g.value = u.articles), _.params.id)) {
            const a = await fetch(
                `/api/tutorials/articles/${encodeURIComponent(_.params.id)}`,
                { cache: "no-store" },
              ),
              y = await a.json();
            if (!a.ok || !y.ok) throw Error(y.msg || "文章加载失败");
            o === v && (n.value = y.article);
          }
        } catch (e) {
          o === v && (d.value = e.message);
        } finally {
          o === v && (h.value = !1);
        }
      }
      return (
        V(() => _.params.id, C, { immediate: !0 }),
        (o, e) => {
          const u = z("router-link");
          return (
            s(),
            l("main", F, [
              e[4] ||
                (e[4] = t(
                  "header",
                  null,
                  [
                    t("span", { class: "eyebrow" }, "LEARNING CENTER"),
                    t("h1", null, "教程中心"),
                    t(
                      "p",
                      null,
                      "从 API 配置到创作技巧，按分类查找需要的教程。",
                    ),
                  ],
                  -1,
                )),
              d.value
                ? (s(),
                  l("div", G, [
                    N(r(d.value) + " ", 1),
                    t("button", { class: "btn-plain", onClick: C }, "重新加载"),
                  ]))
                : f("", !0),
              h.value
                ? (s(), l("p", U, "正在加载教程…"))
                : (s(),
                  l(
                    p,
                    { key: 2 },
                    [
                      I(_).params.id
                        ? (s(),
                          l(
                            p,
                            { key: 0 },
                            [
                              x(
                                u,
                                { class: "back", to: "/tutorials" },
                                {
                                  default: B(() => [
                                    ...(e[2] ||
                                      (e[2] = [N("← 返回教程列表", -1)])),
                                  ]),
                                  _: 1,
                                },
                              ),
                              n.value
                                ? (s(),
                                  l("article", M, [
                                    t("span", P, r(w(n.value.category_id)), 1),
                                    t("h1", null, r(n.value.title), 1),
                                    n.value.summary
                                      ? (s(), l("p", S, r(n.value.summary), 1))
                                      : f("", !0),
                                    x(L, { blocks: n.value.blocks }, null, 8, [
                                      "blocks",
                                    ]),
                                  ]))
                                : f("", !0),
                            ],
                            64,
                          ))
                        : (s(),
                          l(
                            p,
                            { key: 1 },
                            [
                              t("div", H, [
                                t(
                                  "button",
                                  {
                                    class: E({ active: !c.value }),
                                    onClick:
                                      e[0] || (e[0] = (a) => (c.value = null)),
                                  },
                                  "全部教程",
                                  2,
                                ),
                                (s(!0),
                                l(
                                  p,
                                  null,
                                  T(
                                    k.value,
                                    (a) => (
                                      s(),
                                      l(
                                        "button",
                                        {
                                          key: a.id,
                                          class: E({
                                            active: c.value === a.id,
                                          }),
                                          onClick: (y) => (c.value = a.id),
                                        },
                                        r(a.name),
                                        11,
                                        J,
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              R(
                                t(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      e[1] || (e[1] = (a) => (m.value = a)),
                                    class: "search",
                                    "aria-label": "搜索教程",
                                    placeholder: "搜索教程标题或简介",
                                  },
                                  null,
                                  512,
                                ),
                                [[j, m.value]],
                              ),
                              t("div", K, [
                                (s(!0),
                                l(
                                  p,
                                  null,
                                  T(
                                    b.value,
                                    (a) => (
                                      s(),
                                      D(
                                        u,
                                        {
                                          key: a.id,
                                          to: `/tutorials/${a.id}`,
                                          class: "article-card",
                                        },
                                        {
                                          default: B(() => [
                                            t("div", O, [
                                              t(
                                                "span",
                                                null,
                                                r(w(a.category_id)),
                                                1,
                                              ),
                                              t(
                                                "span",
                                                null,
                                                r(
                                                  a.has_video
                                                    ? "视频 · 图文"
                                                    : "图文教程",
                                                ),
                                                1,
                                              ),
                                            ]),
                                            t("h2", null, r(a.title), 1),
                                            t(
                                              "p",
                                              null,
                                              r(
                                                a.summary || "点击查看完整教程",
                                              ),
                                              1,
                                            ),
                                            e[3] ||
                                              (e[3] = t(
                                                "span",
                                                { class: "read" },
                                                "阅读教程 →",
                                                -1,
                                              )),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ["to"],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]),
                              !b.value.length && !d.value
                                ? (s(),
                                  l(
                                    "div",
                                    Q,
                                    r(
                                      m.value
                                        ? "没有找到匹配的教程，请换个关键词。"
                                        : "这个分类还没有发布教程。",
                                    ),
                                    1,
                                  ))
                                : f("", !0),
                            ],
                            64,
                          )),
                    ],
                    64,
                  )),
            ])
          );
        }
      );
    },
  },
  Z = $(W, [["__scopeId", "data-v-32eb13ff"]]);
export { Z as default };
