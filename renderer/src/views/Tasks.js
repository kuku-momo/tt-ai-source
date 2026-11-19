import "../styles/pages/Tasks.css";
import {
  _ as V,
  q as $,
  o as I,
  s as B,
  b as o,
  e,
  t as l,
  F as b,
  r as w,
  v as E,
  x as U,
  d as j,
  j as i,
  l as c,
  k as q,
  m as n,
  p as f,
  f as D,
  w as F,
  g as L,
} from "../runtime/index.js";
const M = { class: "tasks-page" },
  R = { class: "page-head" },
  z = ["disabled"],
  O = { class: "stats" },
  P = { class: "stat card" },
  A = { class: "stat card" },
  G = { class: "stat card" },
  H = { class: "yellow" },
  J = { class: "stat card" },
  K = { class: "green" },
  Q = { class: "stat card" },
  W = { class: "red" },
  X = { class: "filters card" },
  Y = { class: "filter-group" },
  Z = ["onClick"],
  tt = { class: "filter-group" },
  et = { key: 0, class: "error-box" },
  st = { key: 1, class: "empty card" },
  at = { class: "task-list" },
  lt = ["src"],
  ot = ["src"],
  nt = { key: 2 },
  it = { class: "task-main" },
  rt = { class: "task-title-row" },
  dt = { class: "type-tag" },
  ct = { key: 0, class: "status-tag failed" },
  ut = { class: "task-id" },
  _t = ["title"],
  pt = { class: "task-meta" },
  vt = { key: 0 },
  mt = { key: 1 },
  gt = { key: 2 },
  ft = ["title"],
  yt = { class: "task-actions" },
  ht = ["onClick"],
  bt = {
    __name: "Tasks",
    setup(wt) {
      const g = c([]),
        d = c({}),
        _ = c("all"),
        p = c("all"),
        u = c(!1),
        v = c("");
      let y = null;
      const k = [
        { value: "all", label: "全部" },
        { value: "draw", label: "绘画" },
        { value: "video", label: "视频" },
        { value: "drama", label: "短剧" },
      ];
      async function m() {
        (u.value = !0), (v.value = "");
        try {
          const a = new URLSearchParams({
              type: _.value,
              status: p.value,
              limit: "100",
            }),
            s = await fetch(`/api/tasks?${a}`),
            r = await s.json();
          if (!s.ok || !r.ok) throw new Error(r.msg || "任务记录加载失败");
          (g.value = r.tasks || []), (d.value = r.stats || {});
        } catch (a) {
          v.value = a.message || "任务记录加载失败";
        } finally {
          u.value = !1;
        }
      }
      $([_, p], m),
        I(() => {
          m(), (y = setInterval(m, 5e3));
        }),
        B(() => clearInterval(y));
      function C(a) {
        return (
          {
            pending: "等待中",
            generating: "生成中",
            success: "已完成",
            failed: "失败",
          }[a] || a
        );
      }
      function T(a) {
        return { draw: "🎨", video: "🎥", drama: "🎬" }[a] || "📋";
      }
      function h(a) {
        return a ? String(a).replace("T", " ").slice(0, 16) : "-";
      }
      function x(a) {
        const s = a.media_type === "image" ? "png" : "mp4";
        return `${String(a.title || "短剧结果")
          .replace(/[\\/:*?"<>|]/g, "_")
          .slice(0, 80)}.${s}`;
      }
      async function N(a) {
        const s = document.createElement("a");
        (s.href = a.result_url),
          (s.download = x(a)),
          (s.target = "_blank"),
          (s.rel = "noopener"),
          document.body.appendChild(s),
          s.click(),
          s.remove();
      }
      return (a, s) => {
        const r = q("router-link");
        return (
          n(),
          o("div", M, [
            e("div", R, [
              s[1] ||
                (s[1] = e(
                  "div",
                  null,
                  [
                    e("h2", null, "任务记录"),
                    e(
                      "p",
                      { class: "muted" },
                      "集中查看绘画、视频和短剧任务；进行中的任务会自动刷新。",
                    ),
                  ],
                  -1,
                )),
              e(
                "button",
                { class: "btn-plain", disabled: u.value, onClick: m },
                l(u.value ? "刷新中…" : "刷新"),
                9,
                z,
              ),
            ]),
            e("div", O, [
              e("div", P, [
                s[2] || (s[2] = e("span", { class: "muted" }, "全部", -1)),
                e("strong", null, l(d.value.total || 0), 1),
              ]),
              e("div", A, [
                s[3] || (s[3] = e("span", { class: "muted" }, "等待中", -1)),
                e("strong", null, l(d.value.pending || 0), 1),
              ]),
              e("div", G, [
                s[4] || (s[4] = e("span", { class: "muted" }, "生成中", -1)),
                e("strong", H, l(d.value.generating || 0), 1),
              ]),
              e("div", J, [
                s[5] || (s[5] = e("span", { class: "muted" }, "已完成", -1)),
                e("strong", K, l(d.value.success || 0), 1),
              ]),
              e("div", Q, [
                s[6] || (s[6] = e("span", { class: "muted" }, "失败", -1)),
                e("strong", W, l(d.value.failed || 0), 1),
              ]),
            ]),
            e("div", X, [
              e("div", Y, [
                s[7] || (s[7] = e("span", { class: "hint" }, "板块", -1)),
                (n(),
                o(
                  b,
                  null,
                  w(k, (t) =>
                    e(
                      "button",
                      {
                        key: t.value,
                        class: f(["chip", { active: _.value === t.value }]),
                        onClick: (S) => (_.value = t.value),
                      },
                      l(t.label),
                      11,
                      Z,
                    ),
                  ),
                  64,
                )),
              ]),
              e("div", tt, [
                s[9] || (s[9] = e("span", { class: "hint" }, "状态", -1)),
                E(
                  e(
                    "select",
                    {
                      "onUpdate:modelValue":
                        s[0] || (s[0] = (t) => (p.value = t)),
                      class: "input status-select",
                    },
                    [
                      ...(s[8] ||
                        (s[8] = [
                          j(
                            '<option value="all" data-v-5a56fb25>全部状态</option><option value="pending" data-v-5a56fb25>等待中</option><option value="generating" data-v-5a56fb25>生成中</option><option value="success" data-v-5a56fb25>已完成</option><option value="failed" data-v-5a56fb25>失败</option>',
                            5,
                          ),
                        ])),
                    ],
                    512,
                  ),
                  [[U, p.value]],
                ),
              ]),
            ]),
            v.value ? (n(), o("div", et, "⚠ " + l(v.value), 1)) : i("", !0),
            !u.value && !g.value.length
              ? (n(), o("div", st, "暂无符合条件的任务记录"))
              : i("", !0),
            e("div", at, [
              (n(!0),
              o(
                b,
                null,
                w(
                  g.value,
                  (t) => (
                    n(),
                    o("article", { key: t.key, class: "task-row card" }, [
                      e(
                        "div",
                        { class: f(["preview", t.type]) },
                        [
                          t.result_url &&
                          (t.type === "draw" || t.media_type === "image")
                            ? (n(),
                              o(
                                "img",
                                { key: 0, src: t.result_url, alt: "生成结果" },
                                null,
                                8,
                                lt,
                              ))
                            : t.result_url &&
                                (t.type === "video" || t.media_type === "video")
                              ? (n(),
                                o(
                                  "video",
                                  {
                                    key: 1,
                                    src: t.result_url,
                                    muted: "",
                                    preload: "metadata",
                                  },
                                  null,
                                  8,
                                  ot,
                                ))
                              : (n(), o("span", nt, l(T(t.type)), 1)),
                        ],
                        2,
                      ),
                      e("div", it, [
                        e("div", rt, [
                          e("span", dt, l(t.type_label), 1),
                          e(
                            "span",
                            { class: f(["status-tag", t.status]) },
                            l(C(t.status)),
                            3,
                          ),
                          t.is_stale
                            ? (n(), o("span", ct, "已过期"))
                            : i("", !0),
                          e("span", ut, "#" + l(t.source_id), 1),
                        ]),
                        e(
                          "div",
                          { class: "task-title", title: t.title },
                          l(t.title || "未命名任务"),
                          9,
                          _t,
                        ),
                        e("div", pt, [
                          t.model
                            ? (n(), o("span", vt, "模型：" + l(t.model), 1))
                            : i("", !0),
                          e("span", null, "创建：" + l(h(t.created_at)), 1),
                          t.updated_at && t.updated_at !== t.created_at
                            ? (n(),
                              o("span", mt, "更新：" + l(h(t.updated_at)), 1))
                            : i("", !0),
                          t.result_count
                            ? (n(),
                              o("span", gt, "结果：" + l(t.result_count), 1))
                            : i("", !0),
                        ]),
                        t.error
                          ? (n(),
                            o(
                              "div",
                              { key: 0, class: "task-error", title: t.error },
                              l(t.error),
                              9,
                              ft,
                            ))
                          : i("", !0),
                      ]),
                      e("div", yt, [
                        D(
                          r,
                          { to: t.target || "/", class: "btn-plain" },
                          {
                            default: F(() => [
                              ...(s[10] || (s[10] = [L("查看板块", -1)])),
                            ]),
                            _: 1,
                          },
                          8,
                          ["to"],
                        ),
                        t.result_url
                          ? (n(),
                            o(
                              "button",
                              {
                                key: 0,
                                class: "btn-plain",
                                onClick: (S) => N(t),
                              },
                              "下载 / 打开结果",
                              8,
                              ht,
                            ))
                          : i("", !0),
                      ]),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ])
        );
      };
    },
  },
  Ct = V(bt, [["__scopeId", "data-v-5a56fb25"]]);
export { Ct as default };
