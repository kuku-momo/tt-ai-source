import "../styles/pages/RemakeProgress.css";
import {
  c as U,
  _ as se,
  o as te,
  s as le,
  b as u,
  e,
  u as i,
  f as d,
  t as n,
  g as _,
  p as $,
  h as k,
  J as B,
  j as O,
  F as M,
  r as V,
  E as ae,
  l as f,
  G as y,
  B as oe,
  m as o,
} from "../runtime/index.js";
import { A as re, F as ne } from "../runtime/icons/film.js";
import { L as F } from "../runtime/icons/loaderCircle.js";
import { T as q } from "../runtime/icons/triangleAlert.js";
import { R as J } from "../runtime/icons/refreshCw.js";
import { C as G } from "../runtime/icons/check.js";
import { S as ie } from "../runtime/icons/sparkles.js";
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ue = {
    name: "circle",
    size: 24,
    node: [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]],
  },
  ce = U(ue);
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const de = {
    name: "rotate-ccw",
    size: 24,
    node: [
      [
        "path",
        {
          d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
          key: "1357e3",
        },
      ],
      ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
    ],
  },
  pe = U(de),
  ve = { class: "remake-progress-page" },
  me = { class: "progress-header" },
  ge = { key: 0, class: "progress-loading" },
  ke = { key: 1, class: "progress-loading is-error" },
  ye = { key: 2, class: "progress-content" },
  _e = { class: "progress-hero" },
  fe = { class: "hero-copy" },
  he = { class: "overall-progress" },
  be = { class: "progress-track" },
  we = { key: 0, class: "connection-message" },
  Se = { class: "progress-grid" },
  Ie = { class: "pipeline-card" },
  ze = { class: "pipeline-list" },
  Ce = { class: "stage-marker" },
  $e = { class: "episodes-card" },
  Oe = { class: "episode-list" },
  Ee = { class: "episode-icon" },
  De = { class: "episode-copy" },
  Pe = { class: "episode-state" },
  Re = ["disabled", "onClick"],
  je = { key: 1, class: "episode-error" },
  xe = { class: "progress-footer" },
  Le = {
    __name: "RemakeProgress",
    setup(Ne) {
      const W = oe(),
        S = ae(),
        p = y(() => Number(W.params.id)),
        a = f(null),
        h = f(!0),
        v = f(""),
        b = f("connecting"),
        c = f(new Set());
      let m = null,
        E = !0,
        D = !1;
      const P = [
          {
            key: "queued",
            label: "进入拆解队列",
            description: "后台任务已创建，可以安全离开页面。",
            threshold: 0,
          },
          {
            key: "preparing",
            label: "准备视频素材",
            description: "校验并转换为模型可分析的视频。",
            threshold: 10,
          },
          {
            key: "extracting_assets",
            label: "识别全局设定",
            description: "提取角色、场景与关键道具。",
            threshold: 20,
          },
          {
            key: "detecting_scenes",
            label: "检测并切分镜头",
            description: "分析转场和镜头边界。",
            threshold: 42,
          },
          {
            key: "generating_storyboards",
            label: "生成专业分镜",
            description: "逐镜头生成画面、动作与运镜描述。",
            threshold: 55,
          },
          {
            key: "persisting",
            label: "保存设定与分镜",
            description: "写入项目资产和分镜工作区。",
            threshold: 88,
          },
          {
            key: "completed",
            label: "拆解完成",
            description: "设定和分镜已经生成。",
            threshold: 100,
          },
        ],
        g = y(() => {
          var t;
          return (
            ((t = a.value) == null ? void 0 : t.aggregate_status) ===
            "completed"
          );
        }),
        I = y(() => {
          var t, s;
          return !!(
            (s = (t = a.value) == null ? void 0 : t.source_summary) != null &&
            s.failed
          );
        }),
        H = y(() => {
          var t, s, r;
          return (
            ((r =
              (s = (t = a.value) == null ? void 0 : t.sources) == null
                ? void 0
                : s
                    .map((l) => l.task)
                    .find(
                      (l) =>
                        l &&
                        !["completed", "failed", "cancelled"].includes(
                          l.status,
                        ),
                    )) == null
              ? void 0
              : r.stage) || (g.value ? "completed" : "queued")
          );
        }),
        K = y(() => {
          var t, s, r;
          return g.value
            ? "视频拆解完成"
            : ((t = a.value) == null ? void 0 : t.aggregate_status) === "failed"
              ? "视频拆解失败"
              : ((s = a.value) == null ? void 0 : s.aggregate_status) ===
                  "partial_failed"
                ? "部分剧集拆解失败"
                : ((r = a.value) == null ? void 0 : r.aggregate_status) ===
                    "queued"
                  ? "等待开始拆解"
                  : "正在拆解视频";
        }),
        Q = y(() =>
          g.value
            ? "设定和分镜已经生成，可以进入创作页面。"
            : I.value
              ? "已完成的剧集会保留，可单独重试失败剧集。"
              : "AI 正在识别设定、切分镜头并生成分镜。关闭或离开本页面不会中断后台任务。",
        );
      function z(t) {
        var s;
        return g.value ||
          (((s = a.value) == null ? void 0 : s.overall_progress) || 0) >
            t.threshold
          ? "completed"
          : H.value === t.key
            ? "active"
            : "pending";
      }
      function X(t) {
        var s;
        return (
          ((s = P.find((r) => r.key === t)) == null ? void 0 : s.label) ||
          "正在处理"
        );
      }
      function Y(t) {
        var r;
        const s = (r = t.task) == null ? void 0 : r.status;
        return s === "completed"
          ? "已完成"
          : s === "failed" || s === "cancelled"
            ? "拆解失败"
            : s === "running"
              ? t.task.stage_text || X(t.task.stage)
              : "队列中";
      }
      async function w(t, s = {}) {
        const r = await fetch(t, { cache: "no-store", ...s }),
          l = await r.json().catch(() => ({}));
        if (!r.ok || l.ok === !1)
          throw new Error(l.msg || `请求失败（${r.status}）`);
        return l;
      }
      function C(t) {
        (a.value = t),
          (b.value = t.terminal ? "closed" : "live"),
          (v.value = "");
      }
      async function R() {
        if (!p.value) {
          (v.value = "重制项目编号无效"), (h.value = !1);
          return;
        }
        h.value = !0;
        try {
          C(await w(`/api/remake-workshop/projects/${p.value}/progress`)),
            a.value.terminal || j();
        } catch (t) {
          v.value = t.message || "无法读取拆解进度";
        } finally {
          h.value = !1;
        }
      }
      function j() {
        clearInterval(m),
          (m = setInterval(async () => {
            if (!(!E || !p.value))
              try {
                C(await w(`/api/remake-workshop/projects/${p.value}/progress`)),
                  a.value.terminal && (clearInterval(m), (m = null));
              } catch (t) {
                (b.value = "reconnecting"),
                  (v.value = t.message || "进度连接中断");
              }
          }, 3e3));
      }
      async function Z(t) {
        if (!c.value.has(t.source_id)) {
          c.value = new Set(c.value).add(t.source_id);
          try {
            await w(
              `/api/remake-workshop/projects/${p.value}/sources/${t.source_id}/retry`,
              { method: "POST" },
            ),
              C(await w(`/api/remake-workshop/projects/${p.value}/progress`)),
              j();
          } catch (s) {
            v.value = s.message || "重试失败";
          } finally {
            const s = new Set(c.value);
            s.delete(t.source_id), (c.value = s);
          }
        }
      }
      function ee() {
        var t;
        (t = a.value) != null &&
          t.entry_path &&
          !D &&
          ((D = !0), clearInterval(m), S.replace(a.value.entry_path));
      }
      return (
        te(R),
        le(() => {
          (E = !1), clearInterval(m);
        }),
        (t, s) => {
          var r;
          return (
            o(),
            u("main", ve, [
              e("header", me, [
                e(
                  "button",
                  {
                    class: "back-btn",
                    type: "button",
                    title: "返回项目列表",
                    onClick:
                      s[0] || (s[0] = (l) => i(S).push("/remake-workshop")),
                  },
                  [d(i(re), { size: 18 })],
                ),
                e("div", null, [
                  s[2] ||
                    (s[2] = e("small", null, "AI VIDEO DECOMPOSITION", -1)),
                  e(
                    "strong",
                    null,
                    n(((r = a.value) == null ? void 0 : r.name) || "重制拆解"),
                    1,
                  ),
                ]),
                s[3] ||
                  (s[3] = e(
                    "span",
                    { class: "background-badge" },
                    [e("i"), _("后台持续运行")],
                    -1,
                  )),
              ]),
              h.value
                ? (o(),
                  u("section", ge, [
                    d(i(F), { size: 30 }),
                    s[4] || (s[4] = e("strong", null, "正在连接拆解任务…", -1)),
                    s[5] ||
                      (s[5] = e("p", null, "正在读取后台保存的最新进度。", -1)),
                  ]))
                : a.value
                  ? (o(),
                    u("div", ye, [
                      e("section", _e, [
                        e(
                          "div",
                          {
                            class: $([
                              "hero-icon",
                              {
                                complete: t.complete,
                                failed: a.value.terminal && I.value,
                              },
                            ]),
                          },
                          [
                            g.value
                              ? (o(), k(i(G), { key: 0, size: 28 }))
                              : a.value.terminal && I.value
                                ? (o(), k(i(q), { key: 1, size: 28 }))
                                : (o(), k(i(ie), { key: 2, size: 28 })),
                          ],
                          2,
                        ),
                        e("div", fe, [
                          e(
                            "small",
                            null,
                            n(
                              b.value === "reconnecting"
                                ? "正在重新连接实时进度"
                                : "AI VIDEO DECOMPOSITION",
                            ),
                            1,
                          ),
                          e("h1", null, n(K.value), 1),
                          e("p", null, n(Q.value), 1),
                        ]),
                        e("div", he, [
                          e("strong", null, [
                            _(n(a.value.overall_progress), 1),
                            s[8] || (s[8] = e("small", null, "%", -1)),
                          ]),
                          s[9] || (s[9] = e("span", null, "总体进度", -1)),
                        ]),
                        e("div", be, [
                          e(
                            "span",
                            {
                              style: B({
                                width: `${a.value.overall_progress}%`,
                              }),
                            },
                            null,
                            4,
                          ),
                        ]),
                        b.value === "reconnecting"
                          ? (o(),
                            u("p", we, [
                              d(i(J), { size: 13 }),
                              s[10] ||
                                (s[10] = _(
                                  "实时连接中断，正在自动重连；后台任务不受影响。",
                                  -1,
                                )),
                            ]))
                          : O("", !0),
                      ]),
                      e("section", Se, [
                        e("article", Ie, [
                          e("header", null, [
                            s[11] ||
                              (s[11] = e(
                                "div",
                                null,
                                [
                                  e("small", null, "PROCESS"),
                                  e("h2", null, "拆解过程"),
                                ],
                                -1,
                              )),
                            e(
                              "span",
                              null,
                              n(a.value.source_summary.completed) +
                                "/" +
                                n(a.value.source_summary.total) +
                                " 集完成",
                              1,
                            ),
                          ]),
                          e("ol", ze, [
                            (o(),
                            u(
                              M,
                              null,
                              V(P, (l) =>
                                e(
                                  "li",
                                  { key: l.key, class: $(`is-${z(l)}`) },
                                  [
                                    e("span", Ce, [
                                      z(l) === "completed"
                                        ? (o(), k(i(G), { key: 0, size: 14 }))
                                        : z(l) === "active"
                                          ? (o(), k(i(F), { key: 1, size: 15 }))
                                          : (o(),
                                            k(i(ce), { key: 2, size: 10 })),
                                    ]),
                                    e("div", null, [
                                      e("strong", null, n(l.label), 1),
                                      e("p", null, n(l.description), 1),
                                    ]),
                                  ],
                                  2,
                                ),
                              ),
                              64,
                            )),
                          ]),
                        ]),
                        e("article", $e, [
                          s[12] ||
                            (s[12] = e(
                              "header",
                              null,
                              [
                                e("div", null, [
                                  e("small", null, "EPISODES"),
                                  e("h2", null, "剧集进度"),
                                ]),
                              ],
                              -1,
                            )),
                          e("div", Oe, [
                            (o(!0),
                            u(
                              M,
                              null,
                              V(a.value.sources, (l) => {
                                var x, L, N, T, A;
                                return (
                                  o(),
                                  u(
                                    "section",
                                    {
                                      key: l.source_id,
                                      class: $([
                                        "episode-item",
                                        {
                                          failed: [
                                            "failed",
                                            "cancelled",
                                          ].includes(
                                            (x = l.task) == null
                                              ? void 0
                                              : x.status,
                                          ),
                                        },
                                      ]),
                                    },
                                    [
                                      e("span", Ee, [d(i(ne), { size: 17 })]),
                                      e("div", De, [
                                        e(
                                          "strong",
                                          null,
                                          "第 " + n(l.episode_number) + " 集",
                                          1,
                                        ),
                                        e("p", null, n(l.original_filename), 1),
                                        e("div", null, [
                                          e(
                                            "span",
                                            {
                                              style: B({
                                                width: `${((L = l.task) == null ? void 0 : L.progress) || 0}%`,
                                              }),
                                            },
                                            null,
                                            4,
                                          ),
                                        ]),
                                      ]),
                                      e("div", Pe, [
                                        e(
                                          "strong",
                                          null,
                                          n(
                                            ((N = l.task) == null
                                              ? void 0
                                              : N.progress) || 0,
                                          ) + "%",
                                          1,
                                        ),
                                        e("span", null, n(Y(l)), 1),
                                      ]),
                                      ["failed", "cancelled"].includes(
                                        (T = l.task) == null
                                          ? void 0
                                          : T.status,
                                      )
                                        ? (o(),
                                          u(
                                            "button",
                                            {
                                              key: 0,
                                              class: "retry-btn",
                                              disabled: c.value.has(
                                                l.source_id,
                                              ),
                                              onClick: (Te) => Z(l),
                                            },
                                            [
                                              d(i(pe), { size: 13 }),
                                              _(
                                                n(
                                                  c.value.has(l.source_id)
                                                    ? "重试中"
                                                    : "重试",
                                                ),
                                                1,
                                              ),
                                            ],
                                            8,
                                            Re,
                                          ))
                                        : O("", !0),
                                      (A = l.task) != null && A.error_message
                                        ? (o(),
                                          u(
                                            "p",
                                            je,
                                            n(l.task.error_message),
                                            1,
                                          ))
                                        : O("", !0),
                                    ],
                                    2,
                                  )
                                );
                              }),
                              128,
                            )),
                          ]),
                        ]),
                      ]),
                      e("footer", xe, [
                        s[13] ||
                          (s[13] = e(
                            "p",
                            null,
                            [
                              e("strong", null, "可以放心离开"),
                              e(
                                "span",
                                null,
                                "任务状态和结果保存在后台，稍后回来会继续显示最新进度。",
                              ),
                            ],
                            -1,
                          )),
                        g.value
                          ? (o(),
                            u(
                              "button",
                              { key: 0, class: "action primary", onClick: ee },
                              "进入设定与分镜",
                            ))
                          : (o(),
                            u(
                              "button",
                              {
                                key: 1,
                                class: "action secondary",
                                onClick:
                                  s[1] ||
                                  (s[1] = (l) => i(S).push("/remake-workshop")),
                              },
                              "返回项目列表",
                            )),
                      ]),
                    ]))
                  : (o(),
                    u("section", ke, [
                      d(i(q), { size: 30 }),
                      s[7] ||
                        (s[7] = e("strong", null, "暂时无法读取拆解进度", -1)),
                      e("p", null, n(v.value), 1),
                      e("button", { class: "action secondary", onClick: R }, [
                        d(i(J), { size: 15 }),
                        s[6] || (s[6] = _("重新连接", -1)),
                      ]),
                    ])),
            ])
          );
        }
      );
    },
  },
  Ge = se(Le, [["__scopeId", "data-v-4e282dd1"]]);
export { Ge as default };
