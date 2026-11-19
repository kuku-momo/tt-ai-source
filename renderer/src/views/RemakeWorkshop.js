import "../styles/pages/RemakeWorkshop.css";
import {
  _ as te,
  o as B,
  s as le,
  b as a,
  e as t,
  F as g,
  r as h,
  v as j,
  z as V,
  x as R,
  j as C,
  y as E,
  p as $,
  t as i,
  l as d,
  K as ae,
  G,
  E as oe,
  m as o,
  g as ne,
} from "../runtime/index.js";
const ie = { class: "remake-page" },
  re = { class: "hero" },
  ue = { class: "pipeline" },
  ce = { key: 0 },
  de = { class: "card create-card" },
  pe = { class: "source-modes" },
  ve = ["onClick"],
  ye = { class: "form-grid" },
  ke = { class: "field wide" },
  fe = { class: "field" },
  _e = { class: "field" },
  me = { class: "field" },
  be = { class: "style-panel" },
  ge = { class: "style-grid" },
  he = ["onClick"],
  we = ["src"],
  je = { key: 1, class: "style-placeholder" },
  Ce = { key: 0, class: "history-source" },
  $e = { key: 0, class: "empty" },
  De = ["onClick"],
  Ie = ["multiple", "webkitdirectory"],
  ze = { key: 0, class: "upload-empty" },
  xe = { key: 1, class: "file-list" },
  Te = { class: "actions" },
  Ve = ["disabled"],
  Ee = { key: 2, class: "error" },
  Fe = { class: "card history-card" },
  Me = { key: 0, class: "empty" },
  Se = { key: 1, class: "history-list" },
  Ne = ["onClick"],
  Oe = { class: "history-main" },
  Pe = { class: "counts" },
  Ae = ["onClick"],
  Ue = {
    __name: "RemakeWorkshop",
    setup(Be) {
      const T = oe(),
        D = d(null),
        y = d(null),
        I = d(!1),
        b = d(!1),
        f = d(""),
        _ = d([]),
        c = d(null);
      let w = null;
      const F = ["上传来源", "视频拆解", "资产设定", "分镜重制", "视频生成"],
        r = ae({
          title: "",
          episode_number: 1,
          aspect_ratio: "16:9",
          resolution: "720p",
          visual_style_key: "auto",
          visual_style: "",
        }),
        M = d([
          { key: "auto", label: "AI 识别风格" },
          { key: "realistic-general", label: "写实通用" },
          { key: "realistic-urban", label: "写实都市" },
          { key: "realistic-cinematic", label: "写实电影感" },
          { key: "anime-japanese", label: "2D日漫" },
          { key: "manhwa-urban", label: "2D韩漫都市" },
          { key: "chinese-3d", label: "3D国风" },
          { key: "xianxia-3d", label: "3D仙侠" },
          { key: "manhwa-2d", label: "2D韩漫" },
          { key: "otome-2d", label: "2D乙女" },
          { key: "chinese-animation-2d", label: "2D国漫" },
          { key: "cg", label: "CG风格" },
          { key: "cartoon-3d", label: "3D卡通" },
          { key: "cyberpunk-cg", label: "CG赛博朋克" },
          { key: "gongbi", label: "工笔画" },
          { key: "custom", label: "自定义风格" },
        ]),
        p = d("single"),
        z = d(null),
        S = d(null),
        L = [
          { key: "single", label: "单视频", icon: "🎞️" },
          { key: "folder", label: "多集文件夹", icon: "📁" },
          { key: "history", label: "历史重制", icon: "🕘" },
        ],
        m = G(() =>
          y.value ? (Array.isArray(y.value) ? y.value : [y.value]) : [],
        ),
        W = G(() => (b.value ? "正在上传并创建任务…" : "开始拆解"));
      function K(l) {
        const e = [...(l.target.files || [])];
        e.length && N(p.value === "folder" ? e : e[0]);
      }
      function J(l) {
        I.value = !1;
        const e = [...(l.dataTransfer.files || [])];
        e.length && N(p.value === "folder" ? e : e[0]);
      }
      function N(l) {
        const e = Array.isArray(l) ? l : [l];
        if (
          e.find(
            (n) =>
              !n.type.startsWith("video/") &&
              !/\.(mp4|mov|mkv|avi|flv|ts|wmv)$/i.test(n.name),
          )
        ) {
          f.value = "请选择视频文件";
          return;
        }
        (y.value = l),
          !r.title && e[0] && (r.title = e[0].name.replace(/\.[^.]+$/, ""));
      }
      function q(l, e = 1) {
        const s = String(l || "").match(
          /第\s*(\d+)\s*[集话]|(?:^|[^a-z\d])(?:EP|E)\s*0*(\d+)(?!\d)|(?:^|[^\d])0*(\d+)\s*集/i,
        );
        return (
          Number(
            (s == null ? void 0 : s[1]) ||
              (s == null ? void 0 : s[2]) ||
              (s == null ? void 0 : s[3]) ||
              e,
          ) || e
        );
      }
      function O() {
        (y.value = null), D.value && (D.value.value = "");
      }
      function H(l) {
        return l > 1024 ** 3
          ? `${(l / 1024 ** 3).toFixed(2)} GB`
          : `${(l / 1024 ** 2).toFixed(1)} MB`;
      }
      function Q(l) {
        try {
          return new Date(l).toLocaleString("zh-CN", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });
        } catch {
          return "";
        }
      }
      function P(l) {
        return (
          {
            uploaded: "待拆解",
            pending: "排队中",
            running: "处理中",
            completed: "已完成",
            failed: "失败",
          }[l] ||
          l ||
          "未知"
        );
      }
      async function k(l, e = {}) {
        const s = await fetch(l, e),
          n = await s.json().catch(() => ({}));
        if (!s.ok || n.ok === !1)
          throw new Error(n.msg || `请求失败（${s.status}）`);
        return n;
      }
      async function X() {
        if (!(!y.value || b.value)) {
          (b.value = !0), (f.value = "");
          try {
            if (p.value === "history" && z.value) {
              const u = _.value.find((se) => se.id === z.value),
                v =
                  (u == null ? void 0 : u.target_project_id) ||
                  (u == null ? void 0 : u.project_id);
              v && T.push(`/remake-workshop/project/${v}/progress`);
              return;
            }
            const l = [];
            for (const u of m.value) {
              const v = new FormData();
              v.append("file", u),
                l.push(
                  await k("/api/uploads/oss/video", {
                    method: "POST",
                    body: v,
                  }),
                );
            }
            const e = l[0],
              s = l.map((u, v) => ({
                source_url: u.url,
                source_name: u.name || m.value[v].name,
                source_size: u.size || m.value[v].size,
                episode_number:
                  p.value === "folder"
                    ? q(m.value[v].name, v + 1)
                    : r.episode_number,
              })),
              n = await k("/api/remake-workshop/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...r,
                  sources: s,
                  source_url: e.url,
                  source_name: e.name || m.value[0].name,
                  source_size: e.size || m.value[0].size,
                }),
              });
            await Promise.all(
              (n.sourceIds || [n.sourceId]).map((u) =>
                k(`/api/remake-workshop/projects/${u}/analyze`, {
                  method: "POST",
                }),
              ),
            ),
              O(),
              T.push(`/remake-workshop/project/${n.projectId}/progress`);
          } catch (l) {
            f.value = l.message || "创建重制任务失败";
          } finally {
            b.value = !1;
          }
        }
      }
      async function A(l) {
        try {
          const e = await k(`/api/remake-workshop/projects/${l.id}`);
          (c.value = { ...e.project, analysis: e.analysis }),
            c.value.status === "completed" &&
              (await U(c.value.target_project_id)),
            ["pending", "running"].includes(c.value.status) && Y();
        } catch (e) {
          f.value = e.message;
        }
      }
      async function U(l) {
        try {
          S.value = await k(`/api/short-drama-production/projects/${l}`);
        } catch {
          S.value = null;
        }
      }
      function Y() {
        clearInterval(w),
          (w = setInterval(async () => {
            if (c.value)
              try {
                const l = await k(
                  `/api/remake-workshop/projects/${c.value.id}/status`,
                );
                (c.value = { ...l.project, analysis: l.analysis }),
                  c.value.status === "completed" &&
                    (await U(c.value.target_project_id)),
                  await x(!1),
                  ["pending", "running"].includes(c.value.status) ||
                    (clearInterval(w), (w = null));
              } catch {}
          }, 3e3));
      }
      async function x(l = !1) {
        try {
          const e = await k("/api/remake-workshop/projects");
          (_.value = e.projects || []),
            l && _.value[0] && (await A(_.value[0]));
        } catch (e) {
          f.value = e.message;
        }
      }
      async function Z(l) {
        var e;
        if (confirm(`确定删除“${l.title}”及其短剧制作数据吗？`))
          try {
            await k(`/api/remake-workshop/projects/${l.id}`, {
              method: "DELETE",
            }),
              ((e = c.value) == null ? void 0 : e.id) === l.id &&
                (c.value = null),
              await x(!1);
          } catch (s) {
            f.value = s.message;
          }
      }
      function ee(l) {
        const e =
          (l == null ? void 0 : l.target_project_id) ||
          (l == null ? void 0 : l.project_id);
        e && T.push(`/remake-workshop/project/${e}/progress`);
      }
      return (
        B(() => x(!1)),
        le(() => clearInterval(w)),
        B(async () => {
          var l;
          try {
            const e = await k("/api/remake-workshop/capabilities");
            (l = e.styles) != null && l.length && (M.value = e.styles);
          } catch {}
        }),
        (l, e) => (
          o(),
          a("div", ie, [
            t("div", re, [
              e[10] ||
                (e[10] = t(
                  "div",
                  null,
                  [
                    t("div", { class: "eyebrow" }, "AI VIDEO RECONSTRUCTION"),
                    t("h1", null, "短剧重制"),
                    t(
                      "p",
                      null,
                      "上传一集短剧视频，自动提取全局资产、真实切分镜头，并生成可继续制作的分镜脚本。",
                    ),
                  ],
                  -1,
                )),
              t("div", ue, [
                (o(),
                a(
                  g,
                  null,
                  h(F, (s, n) =>
                    t("span", { key: s }, [
                      t("b", null, i(n + 1), 1),
                      ne(i(s), 1),
                      n < F.length - 1 ? (o(), a("i", ce, "→")) : C("", !0),
                    ]),
                  ),
                  64,
                )),
              ]),
            ]),
            t("section", de, [
              e[21] ||
                (e[21] = t(
                  "div",
                  { class: "section-title" },
                  [
                    t("h2", null, "新建重制项目"),
                    t("span", null, "支持 MP4、MOV、MKV 等常见视频格式"),
                  ],
                  -1,
                )),
              t("div", pe, [
                (o(),
                a(
                  g,
                  null,
                  h(L, (s) =>
                    t(
                      "button",
                      {
                        key: s.key,
                        type: "button",
                        class: $({ active: p.value === s.key }),
                        onClick: (n) => (p.value = s.key),
                      },
                      i(s.icon) + " " + i(s.label),
                      11,
                      ve,
                    ),
                  ),
                  64,
                )),
              ]),
              t("div", ye, [
                t("label", ke, [
                  e[11] || (e[11] = t("span", null, "项目名称", -1)),
                  j(
                    t(
                      "input",
                      {
                        "onUpdate:modelValue":
                          e[0] || (e[0] = (s) => (r.title = s)),
                        placeholder: "例如：第1集·人物替换重制",
                      },
                      null,
                      512,
                    ),
                    [[V, r.title]],
                  ),
                ]),
                t("label", fe, [
                  e[12] || (e[12] = t("span", null, "来源集数", -1)),
                  j(
                    t(
                      "input",
                      {
                        "onUpdate:modelValue":
                          e[1] || (e[1] = (s) => (r.episode_number = s)),
                        type: "number",
                        min: "1",
                      },
                      null,
                      512,
                    ),
                    [[V, r.episode_number, void 0, { number: !0 }]],
                  ),
                ]),
                t("label", _e, [
                  e[14] || (e[14] = t("span", null, "画面比例", -1)),
                  j(
                    t(
                      "select",
                      {
                        "onUpdate:modelValue":
                          e[2] || (e[2] = (s) => (r.aspect_ratio = s)),
                      },
                      [
                        ...(e[13] ||
                          (e[13] = [
                            t("option", null, "16:9", -1),
                            t("option", null, "9:16", -1),
                            t("option", null, "4:3", -1),
                            t("option", null, "3:4", -1),
                            t("option", null, "1:1", -1),
                          ])),
                      ],
                      512,
                    ),
                    [[R, r.aspect_ratio]],
                  ),
                ]),
                t("label", me, [
                  e[16] || (e[16] = t("span", null, "清晰度", -1)),
                  j(
                    t(
                      "select",
                      {
                        "onUpdate:modelValue":
                          e[3] || (e[3] = (s) => (r.resolution = s)),
                      },
                      [
                        ...(e[15] ||
                          (e[15] = [
                            t("option", null, "480p", -1),
                            t("option", null, "720p", -1),
                            t("option", null, "1080p", -1),
                          ])),
                      ],
                      512,
                    ),
                    [[R, r.resolution]],
                  ),
                ]),
              ]),
              t("div", be, [
                e[17] ||
                  (e[17] = t(
                    "div",
                    { class: "style-header" },
                    [
                      t("span", null, "统一画风"),
                      t(
                        "small",
                        null,
                        "会同时用于资产分析、分镜提示词和后续视频生成",
                      ),
                    ],
                    -1,
                  )),
                t("div", ge, [
                  (o(!0),
                  a(
                    g,
                    null,
                    h(
                      M.value,
                      (s) => (
                        o(),
                        a(
                          "button",
                          {
                            key: s.key,
                            type: "button",
                            class: $({ active: r.visual_style_key === s.key }),
                            onClick: (n) => (r.visual_style_key = s.key),
                          },
                          [
                            s.image
                              ? (o(),
                                a(
                                  "img",
                                  {
                                    key: 0,
                                    src: `/style-thumbnails/${s.key}.png`,
                                    alt: "",
                                  },
                                  null,
                                  8,
                                  we,
                                ))
                              : (o(), a("span", je, "✦")),
                            t("b", null, i(s.label), 1),
                          ],
                          10,
                          he,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
                r.visual_style_key === "custom"
                  ? j(
                      (o(),
                      a(
                        "textarea",
                        {
                          key: 0,
                          "onUpdate:modelValue":
                            e[4] || (e[4] = (s) => (r.visual_style = s)),
                          placeholder: "描述材质、光影、色彩、镜头和整体气质",
                        },
                        null,
                        512,
                      )),
                      [[V, r.visual_style]],
                    )
                  : C("", !0),
              ]),
              p.value === "history"
                ? (o(),
                  a("div", Ce, [
                    _.value.length
                      ? C("", !0)
                      : (o(), a("div", $e, "暂无历史重制项目")),
                    (o(!0),
                    a(
                      g,
                      null,
                      h(
                        _.value,
                        (s) => (
                          o(),
                          a(
                            "button",
                            {
                              key: s.target_project_id || s.id,
                              type: "button",
                              class: $({ selected: z.value === s.id }),
                              onClick: (n) => ee(s),
                            },
                            [
                              t("strong", null, i(s.title), 1),
                              t(
                                "small",
                                null,
                                i(s.source_name) + " · " + i(P(s.status)),
                                1,
                              ),
                            ],
                            10,
                            De,
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : (o(),
                  a(
                    "div",
                    {
                      key: 1,
                      class: $(["upload-box", { dragging: I.value }]),
                      onClick:
                        e[5] ||
                        (e[5] = (s) => {
                          var n;
                          return (n = D.value) == null ? void 0 : n.click();
                        }),
                      onDragover:
                        e[6] || (e[6] = E((s) => (I.value = !0), ["prevent"])),
                      onDragleave: e[7] || (e[7] = (s) => (I.value = !1)),
                      onDrop: E(J, ["prevent"]),
                    },
                    [
                      t(
                        "input",
                        {
                          ref_key: "fileInput",
                          ref: D,
                          type: "file",
                          multiple: p.value === "folder",
                          webkitdirectory: p.value === "folder" ? "" : void 0,
                          accept: "video/*,.mkv,.avi,.flv,.ts,.wmv",
                          onChange: K,
                        },
                        null,
                        40,
                        Ie,
                      ),
                      y.value
                        ? (o(),
                          a("div", xe, [
                            (o(!0),
                            a(
                              g,
                              null,
                              h(
                                m.value,
                                (s) => (
                                  o(),
                                  a("div", { key: s.name, class: "file-row" }, [
                                    e[19] ||
                                      (e[19] = t(
                                        "span",
                                        { class: "file-icon" },
                                        "🎞️",
                                        -1,
                                      )),
                                    t("div", null, [
                                      t("strong", null, i(s.name), 1),
                                      t("small", null, i(H(s.size)), 1),
                                    ]),
                                  ])
                                ),
                              ),
                              128,
                            )),
                            t(
                              "button",
                              { class: "text-btn", onClick: O },
                              "移除全部",
                            ),
                          ]))
                        : (o(),
                          a("div", ze, [
                            ...(e[18] ||
                              (e[18] = [
                                t(
                                  "strong",
                                  null,
                                  "拖入视频文件，或点击选择",
                                  -1,
                                ),
                                t(
                                  "small",
                                  null,
                                  "单集建议 1–2 分钟；文件先上传到平台素材存储",
                                  -1,
                                ),
                              ])),
                          ])),
                    ],
                    34,
                  )),
              t("div", Te, [
                t(
                  "button",
                  {
                    class: "primary",
                    disabled:
                      b.value || (p.value === "history" ? !z.value : !y.value),
                    onClick: X,
                  },
                  i(b.value ? W.value : "开始拆解"),
                  9,
                  Ve,
                ),
                e[20] ||
                  (e[20] = t(
                    "span",
                    { class: "hint" },
                    "将按“全局资产 → 真实切镜 → 逐镜分析”处理，完成后可进入短剧制作工作台。",
                    -1,
                  )),
              ]),
              f.value ? (o(), a("p", Ee, i(f.value), 1)) : C("", !0),
            ]),
            C("", !0),
            t("section", Fe, [
              t("div", { class: "section-title" }, [
                e[25] || (e[25] = t("h2", null, "历史重制项目", -1)),
                t("button", { class: "text-btn", onClick: x }, "刷新"),
              ]),
              _.value.length
                ? (o(),
                  a("div", Se, [
                    (o(!0),
                    a(
                      g,
                      null,
                      h(
                        _.value,
                        (s) => (
                          o(),
                          a(
                            "div",
                            {
                              key: s.id,
                              class: "history-item",
                              onClick: (n) => A(s),
                            },
                            [
                              t("div", Oe, [
                                t("strong", null, i(s.title), 1),
                                t(
                                  "small",
                                  null,
                                  i(s.source_name) +
                                    " · 第" +
                                    i(s.episode_number) +
                                    "集 · " +
                                    i(Q(s.updated_at)),
                                  1,
                                ),
                              ]),
                              t(
                                "span",
                                { class: $(["status", s.status]) },
                                i(P(s.status)),
                                3,
                              ),
                              t(
                                "span",
                                Pe,
                                i(s.asset_count || 0) +
                                  " 资产 · " +
                                  i(s.scene_count || 0) +
                                  " 镜头",
                                1,
                              ),
                              t(
                                "button",
                                {
                                  class: "danger-link",
                                  onClick: E((n) => Z(s), ["stop"]),
                                },
                                "删除",
                                8,
                                Ae,
                              ),
                            ],
                            8,
                            Ne,
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : (o(), a("div", Me, "还没有重制记录")),
            ]),
          ])
        )
      );
    },
  },
  Ge = te(Ue, [["__scopeId", "data-v-1b00fdcf"]]);
export { Ge as default };
