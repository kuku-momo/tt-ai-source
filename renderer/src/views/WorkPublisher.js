import "../styles/pages/WorkPublisher.css";
import {
  _ as X,
  l as r,
  q as G,
  o as Q,
  a as Z,
  m as v,
  h as ee,
  e as t,
  A as q,
  y as K,
  t as c,
  b as p,
  p as D,
  g as k,
  v as y,
  x as le,
  F as N,
  r as te,
  j as g,
  z as R,
  I as z,
  T as oe,
} from "../runtime/index.js";
const ae = { id: "wp-title" },
  se = ["disabled"],
  ne = { class: "wp-body" },
  ue = { class: "wp-tabs" },
  ie = ["disabled"],
  re = ["disabled"],
  de = { key: 0, class: "wp-file" },
  ve = ["disabled"],
  pe = { key: 1 },
  ce = ["disabled"],
  me = { value: "" },
  be = ["value"],
  fe = { key: 0 },
  we = { class: "wp-grid" },
  ke = ["disabled"],
  ye = ["disabled"],
  ge = ["disabled"],
  he = ["disabled"],
  _e = ["src"],
  $e = { class: "wp-check" },
  Ue = ["disabled"],
  Ce = { key: 1, class: "wp-check" },
  Se = ["disabled"],
  xe = { class: "wp-note" },
  Me = { key: 2, class: "wp-progress", role: "status" },
  Re = ["value"],
  je = { key: 3, class: "wp-error", role: "alert" },
  Ie = ["disabled"],
  Ee = ["disabled"],
  Le = {
    __name: "WorkPublisher",
    props: { work: Object, source: Object, projectId: [String, Number] },
    emits: ["close", "published"],
    setup(h, { emit: W }) {
      var O, V, B, T, P;
      const n = h,
        A = W,
        m = r(n.source || n.projectId ? "source" : "upload"),
        S = r(null),
        x = r(null),
        b = r(""),
        _ = r(n.source ? `${n.source.type}:${n.source.id}` : ""),
        $ = r([]),
        U = r(!1),
        s = r(!1),
        d = r(""),
        f = r(0),
        M = r(!1),
        j = r(null);
      let I = "";
      try {
        I = localStorage.getItem("works:author") || "";
      } catch {}
      const u = r({
        title:
          ((O = n.work) == null ? void 0 : O.title) ||
          ((V = n.source) == null ? void 0 : V.title) ||
          "",
        author_name: ((B = n.work) == null ? void 0 : B.author_name) || I,
        description: ((T = n.work) == null ? void 0 : T.description) || "",
        allow_download:
          ((P = n.work) == null ? void 0 : P.allow_download) || !1,
      });
      let E = !1,
        i = null;
      const C = document.activeElement;
      function H(o) {
        const e = [
            ...o.currentTarget.querySelectorAll(
              "button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled)",
            ),
          ].filter((w) => w.getClientRects().length),
          a = e[0],
          l = e.at(-1);
        o.shiftKey && document.activeElement === a
          ? (o.preventDefault(), l == null || l.focus())
          : !o.shiftKey &&
            document.activeElement === l &&
            (o.preventDefault(), a == null || a.focus());
      }
      G(_, (o, e) => {
        const a = $.value.find((w) => `${w.type}:${w.id}` === o),
          l = $.value.find((w) => `${w.type}:${w.id}` === e);
        a &&
          (!u.value.title ||
            u.value.title === (l == null ? void 0 : l.title)) &&
          (u.value.title = a.title.slice(0, 80));
      });
      async function L() {
        if (!E) {
          U.value = !0;
          try {
            const o = await fetch(
                "/api/works/sources" +
                  (n.projectId
                    ? `?project_id=${encodeURIComponent(n.projectId)}`
                    : ""),
              ),
              e = await o.json();
            if (!o.ok || !e.ok) throw new Error(e.msg || "视频列表加载失败");
            ($.value = e.sources), (E = !0);
          } catch (o) {
            d.value = o.message;
          } finally {
            U.value = !1;
          }
        }
      }
      function Y(o) {
        var a;
        const e = (a = o.target.files) == null ? void 0 : a[0];
        if (e) {
          if (
            e.size > 500 * 1024 * 1024 ||
            !e.name.toLowerCase().endsWith(".mp4")
          ) {
            (d.value = "请选择不超过500MB的MP4视频"), (o.target.value = "");
            return;
          }
          (S.value = e),
            (d.value = ""),
            u.value.title ||
              (u.value.title = e.name.replace(/\.mp4$/i, "").slice(0, 80));
        }
      }
      function F(o) {
        var a;
        const e = (a = o.target.files) == null ? void 0 : a[0];
        if (e) {
          if (e.size > 5 * 1024 * 1024) {
            (d.value = "封面不能超过5MB"), (o.target.value = "");
            return;
          }
          b.value && URL.revokeObjectURL(b.value),
            (x.value = e),
            (b.value = URL.createObjectURL(e)),
            (d.value = "");
        }
      }
      async function J() {
        d.value = "";
        const o = new FormData();
        for (const [e, a] of Object.entries(u.value)) o.append(e, String(a));
        if (
          (x.value && o.append("cover", x.value),
          n.work && o.append("revision", String(n.work.revision)),
          !n.work)
        )
          if (
            (o.append("confirm_rights", String(M.value)), m.value === "upload")
          ) {
            if (!S.value) {
              d.value = "请先选择视频";
              return;
            }
            o.append("video", S.value);
          } else {
            if (!_.value) {
              d.value = "请选择已完成视频";
              return;
            }
            const [e, a] = _.value.split(":");
            o.append("source_type", e), o.append("source_id", a);
          }
        (s.value = !0), (f.value = 0);
        try {
          await new Promise((e, a) => {
            (i = new XMLHttpRequest()),
              i.open(
                n.work ? "PUT" : "POST",
                n.work ? `/api/works/${n.work.id}` : "/api/works",
              ),
              (i.timeout = 900 * 1e3),
              (i.upload.onprogress = (l) => {
                l.lengthComputable &&
                  (f.value = Math.round((l.loaded / l.total) * 100));
              }),
              (i.upload.onload = () => {
                f.value = 100;
              }),
              (i.onerror = () =>
                a(new Error("网络连接中断，请检查“我的作品”确认是否提交成功"))),
              (i.ontimeout = () =>
                a(new Error("处理时间较长，请到“我的作品”查看后再重试"))),
              (i.onload = () => {
                let l;
                try {
                  l = JSON.parse(i.responseText);
                } catch {
                  return a(new Error(`提交失败（${i.status}），请稍后再试`));
                }
                i.status >= 200 && i.status < 300 && l.ok
                  ? e(l)
                  : a(new Error(l.msg || "提交失败"));
              }),
              i.send(o);
          });
          try {
            localStorage.setItem("works:author", u.value.author_name);
          } catch {}
          A("published");
        } catch (e) {
          d.value = e.message;
        } finally {
          (s.value = !1), (i = null);
        }
      }
      return (
        Q(() => {
          var o;
          (o = j.value) == null || o.focus(), m.value === "source" && L();
        }),
        Z(() => {
          var o;
          b.value && URL.revokeObjectURL(b.value),
            (o = C == null ? void 0 : C.focus) == null || o.call(C);
        }),
        (o, e) => {
          var a;
          return (
            v(),
            ee(oe, { to: "body" }, [
              t(
                "div",
                {
                  class: "wp-overlay",
                  onClick:
                    e[10] ||
                    (e[10] = K((l) => !s.value && o.$emit("close"), ["self"])),
                  onKeydown:
                    e[11] ||
                    (e[11] = q((l) => !s.value && o.$emit("close"), ["esc"])),
                },
                [
                  t(
                    "form",
                    {
                      class: "wp-dialog",
                      role: "dialog",
                      "aria-modal": "true",
                      "aria-labelledby": "wp-title",
                      onSubmit: K(J, ["prevent"]),
                      onKeydown: q(H, ["tab"]),
                    },
                    [
                      t("header", null, [
                        t("div", null, [
                          e[12] ||
                            (e[12] = t("small", null, "SHARE YOUR STORY", -1)),
                          t("h2", ae, c(h.work ? "编辑作品" : "发布作品"), 1),
                          e[13] ||
                            (e[13] = t(
                              "p",
                              null,
                              "让你的故事，被更多人看见。",
                              -1,
                            )),
                        ]),
                        t(
                          "button",
                          {
                            type: "button",
                            class: "wp-close",
                            "aria-label": "关闭",
                            disabled: s.value,
                            onClick: e[0] || (e[0] = (l) => o.$emit("close")),
                          },
                          "×",
                          8,
                          se,
                        ),
                      ]),
                      t("div", ne, [
                        h.work
                          ? g("", !0)
                          : (v(),
                            p(
                              N,
                              { key: 0 },
                              [
                                t("div", ue, [
                                  t(
                                    "button",
                                    {
                                      type: "button",
                                      class: D({
                                        active: m.value === "upload",
                                      }),
                                      disabled: s.value,
                                      onClick:
                                        e[1] ||
                                        (e[1] = (l) => (m.value = "upload")),
                                    },
                                    "上传视频",
                                    10,
                                    ie,
                                  ),
                                  t(
                                    "button",
                                    {
                                      type: "button",
                                      class: D({
                                        active: m.value === "source",
                                      }),
                                      disabled: s.value,
                                      onClick:
                                        e[2] ||
                                        (e[2] = (l) => {
                                          (m.value = "source"), L();
                                        }),
                                    },
                                    "从短剧制作选择",
                                    10,
                                    re,
                                  ),
                                ]),
                                m.value === "upload"
                                  ? (v(),
                                    p("label", de, [
                                      e[14] ||
                                        (e[14] = t("span", null, "🎬", -1)),
                                      t(
                                        "strong",
                                        null,
                                        c(
                                          ((a = S.value) == null
                                            ? void 0
                                            : a.name) || "选择你的视频作品",
                                        ),
                                        1,
                                      ),
                                      e[15] ||
                                        (e[15] = t(
                                          "small",
                                          null,
                                          "MP4 · 最大500MB · 最长30分钟",
                                          -1,
                                        )),
                                      t(
                                        "input",
                                        {
                                          type: "file",
                                          accept: "video/mp4,.mp4",
                                          disabled: s.value,
                                          onChange: Y,
                                        },
                                        null,
                                        40,
                                        ve,
                                      ),
                                    ]))
                                  : (v(),
                                    p("label", pe, [
                                      e[16] ||
                                        (e[16] = k("选择已完成视频", -1)),
                                      y(
                                        t(
                                          "select",
                                          {
                                            "onUpdate:modelValue":
                                              e[3] ||
                                              (e[3] = (l) => (_.value = l)),
                                            disabled: s.value || U.value,
                                          },
                                          [
                                            t(
                                              "option",
                                              me,
                                              c(
                                                U.value
                                                  ? "加载中…"
                                                  : "请选择成片或视频片段",
                                              ),
                                              1,
                                            ),
                                            (v(!0),
                                            p(
                                              N,
                                              null,
                                              te(
                                                $.value,
                                                (l) => (
                                                  v(),
                                                  p(
                                                    "option",
                                                    {
                                                      key: l.type + l.id,
                                                      value:
                                                        l.type + ":" + l.id,
                                                    },
                                                    c(l.title),
                                                    9,
                                                    be,
                                                  )
                                                ),
                                              ),
                                              128,
                                            )),
                                          ],
                                          8,
                                          ce,
                                        ),
                                        [[le, _.value]],
                                      ),
                                      !U.value && !$.value.length
                                        ? (v(),
                                          p(
                                            "small",
                                            fe,
                                            "暂无成功视频，请先在短剧制作中完成视频生成。",
                                          ))
                                        : g("", !0),
                                    ])),
                              ],
                              64,
                            )),
                        t("div", we, [
                          t("label", null, [
                            e[17] || (e[17] = k("作品标题", -1)),
                            y(
                              t(
                                "input",
                                {
                                  ref_key: "titleInput",
                                  ref: j,
                                  "onUpdate:modelValue":
                                    e[4] || (e[4] = (l) => (u.value.title = l)),
                                  maxlength: "80",
                                  required: "",
                                  disabled: s.value,
                                  placeholder: "为你的作品取个名字",
                                },
                                null,
                                8,
                                ke,
                              ),
                              [[R, u.value.title, void 0, { trim: !0 }]],
                            ),
                          ]),
                          t("label", null, [
                            e[18] || (e[18] = k("作者昵称", -1)),
                            y(
                              t(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    e[5] ||
                                    (e[5] = (l) => (u.value.author_name = l)),
                                  maxlength: "30",
                                  required: "",
                                  disabled: s.value,
                                  placeholder: "观众看到的作者名称",
                                },
                                null,
                                8,
                                ye,
                              ),
                              [[R, u.value.author_name, void 0, { trim: !0 }]],
                            ),
                          ]),
                        ]),
                        t("label", null, [
                          e[19] || (e[19] = k("作品简介", -1)),
                          y(
                            t(
                              "textarea",
                              {
                                "onUpdate:modelValue":
                                  e[6] ||
                                  (e[6] = (l) => (u.value.description = l)),
                                maxlength: "1000",
                                rows: "3",
                                disabled: s.value,
                                placeholder:
                                  "介绍故事、创作灵感或制作心得（选填）",
                              },
                              null,
                              8,
                              ge,
                            ),
                            [[R, u.value.description]],
                          ),
                        ]),
                        t("label", null, [
                          e[20] || (e[20] = k("作品封面 ", -1)),
                          e[21] ||
                            (e[21] = t(
                              "small",
                              null,
                              "不上传时自动使用视频画面；图片不超过5MB",
                              -1,
                            )),
                          t(
                            "input",
                            {
                              type: "file",
                              accept: "image/jpeg,image/png,image/webp",
                              disabled: s.value,
                              onChange: F,
                            },
                            null,
                            40,
                            he,
                          ),
                          b.value
                            ? (v(),
                              p(
                                "img",
                                {
                                  key: 0,
                                  class: "wp-cover",
                                  src: b.value,
                                  alt: "封面预览",
                                },
                                null,
                                8,
                                _e,
                              ))
                            : g("", !0),
                        ]),
                        t("label", $e, [
                          y(
                            t(
                              "input",
                              {
                                "onUpdate:modelValue":
                                  e[7] ||
                                  (e[7] = (l) => (u.value.allow_download = l)),
                                type: "checkbox",
                                disabled: s.value,
                              },
                              null,
                              8,
                              Ue,
                            ),
                            [[z, u.value.allow_download]],
                          ),
                          e[22] ||
                            (e[22] = t(
                              "span",
                              null,
                              [
                                k("允许其他用户下载作品"),
                                t(
                                  "small",
                                  null,
                                  "默认关闭，其他用户仍可以在线观看。",
                                ),
                              ],
                              -1,
                            )),
                        ]),
                        h.work
                          ? g("", !0)
                          : (v(),
                            p("label", Ce, [
                              y(
                                t(
                                  "input",
                                  {
                                    "onUpdate:modelValue":
                                      e[8] || (e[8] = (l) => (M.value = l)),
                                    type: "checkbox",
                                    required: "",
                                    disabled: s.value,
                                  },
                                  null,
                                  8,
                                  Se,
                                ),
                                [[z, M.value]],
                              ),
                              e[23] ||
                                (e[23] = t(
                                  "span",
                                  null,
                                  "我确认有权发布本视频及其中的图片、音乐等内容。",
                                  -1,
                                )),
                            ])),
                        t(
                          "p",
                          xe,
                          c(
                            h.work
                              ? "修改后会重新审核，审核通过前暂不在广场展示。"
                              : "提交后等待管理员审核，审核通过后会出现在作品广场。",
                          ),
                          1,
                        ),
                        s.value
                          ? (v(),
                            p("div", Me, [
                              t(
                                "progress",
                                {
                                  max: "100",
                                  value: f.value < 100 ? f.value : void 0,
                                },
                                null,
                                8,
                                Re,
                              ),
                              t(
                                "span",
                                null,
                                c(
                                  f.value < 100
                                    ? `正在上传 ${f.value}%`
                                    : "正在处理视频与封面，请稍候…",
                                ),
                                1,
                              ),
                            ]))
                          : g("", !0),
                        d.value ? (v(), p("p", je, c(d.value), 1)) : g("", !0),
                      ]),
                      t("footer", null, [
                        t(
                          "button",
                          {
                            type: "button",
                            disabled: s.value,
                            onClick: e[9] || (e[9] = (l) => o.$emit("close")),
                          },
                          "取消",
                          8,
                          Ie,
                        ),
                        t(
                          "button",
                          { class: "wp-primary", disabled: s.value },
                          c(s.value ? "正在提交…" : "提交审核"),
                          9,
                          Ee,
                        ),
                      ]),
                    ],
                    32,
                  ),
                ],
                32,
              ),
            ])
          );
        }
      );
    },
  },
  Ve = X(Le, [["__scopeId", "data-v-1ec683f6"]]);
export { Ve as W };
