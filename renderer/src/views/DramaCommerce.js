import "../styles/pages/DramaCommerce.css";
import {
  _ as we,
  o as xe,
  b as i,
  e as s,
  t as d,
  g as c,
  v as p,
  z as h,
  x as U,
  F as w,
  r as S,
  p as A,
  j as P,
  l as v,
  K as ae,
  G as le,
  m as r,
} from "../runtime/index.js";
const he = { class: "commerce-wrap" },
  Se = { class: "head" },
  Ce = { class: "head-actions" },
  Ve = ["disabled"],
  $e = ["disabled"],
  Ne = { class: "layout3" },
  je = { class: "panel col-left" },
  Ae = { class: "block" },
  Ie = { class: "field" },
  Ue = { class: "field" },
  Pe = { class: "field" },
  Oe = { class: "field" },
  Te = ["value"],
  Me = { class: "field" },
  ze = { class: "row-fields" },
  Ee = { class: "field" },
  De = ["value"],
  Je = { class: "field" },
  Le = { class: "block" },
  Re = { class: "mode-tabs" },
  Fe = { key: 1, class: "hint" },
  Be = { class: "block" },
  Ke = { class: "asset-grid" },
  qe = ["src"],
  Ge = ["onClick"],
  He = { class: "asset-add" },
  Ye = ["disabled"],
  Qe = { key: 0, class: "hint ok" },
  We = { class: "asset-grid" },
  Xe = ["src"],
  Ze = ["onClick"],
  et = { class: "asset-add" },
  tt = { class: "panel col-mid" },
  st = { class: "toolbar" },
  at = { class: "field inline" },
  lt = ["value"],
  ot = { class: "field inline" },
  nt = ["value"],
  it = { key: 0, class: "empty" },
  rt = { key: 1, class: "story-list" },
  ut = ["onClick"],
  dt = { class: "sc-head" },
  ct = { class: "sc-time" },
  vt = { class: "sc-app" },
  pt = { class: "sc-role" },
  ft = { class: "sc-prompt" },
  _t = { key: 0, class: "sc-vo" },
  mt = { key: 1, class: "shot-video" },
  yt = ["src"],
  gt = { key: 1, class: "v-status gen" },
  bt = { key: 2, class: "v-status fail" },
  kt = { class: "mid-foot" },
  wt = ["disabled"],
  xt = ["disabled"],
  ht = { class: "panel col-right" },
  St = { class: "det-head" },
  Ct = { class: "field" },
  Vt = { class: "field" },
  $t = { class: "grid2" },
  Nt = { class: "field" },
  jt = { class: "field" },
  At = { class: "field" },
  It = { class: "field" },
  Ut = { class: "refs" },
  Pt = ["onClick"],
  Ot = ["onClick"],
  Tt = { key: 0, class: "hint" },
  Mt = ["disabled"],
  zt = ["href"],
  Et = { key: 1, class: "empty" },
  G = "commerce_project_id",
  Dt = {
    __name: "DramaCommerce",
    setup(Jt) {
      const V = v(null),
        o = ae({
          product: "",
          sell_point: "",
          audience: "",
          style: "现代都市",
          scene: "",
          duration_seconds: 30,
          ratio: "9:16",
        }),
        oe = [
          "现代都市",
          "古装国风",
          "汉服古风",
          "宫廷豪门",
          "民国怀旧",
          "港风复古",
          "科技未来/赛博",
          "甜美治愈",
          "田园生活",
          "职场精英",
          "运动街头",
          "悬疑烧脑",
          "旅行度假",
        ],
        x = v("ai"),
        $ = v(""),
        f = v([]),
        _ = v([]),
        C = v([]),
        g = v(null),
        D = v([]),
        I = v([]),
        O = v(""),
        b = v(""),
        J = v(!1),
        T = v(!1),
        M = v(!1),
        z = v(""),
        L = ae({}),
        N = v(0),
        R = v(!1),
        m = async (a, e = {}) => {
          const t = await fetch(a, {
              headers:
                e.body instanceof FormData
                  ? {}
                  : { "Content-Type": "application/json" },
              ...e,
            }),
            l = await t.json().catch(() => ({}));
          if (!t.ok || l.ok === !1)
            throw new Error(l.msg || `请求失败(${t.status})`);
          return l;
        };
      function ne(a) {
        try {
          localStorage.setItem(G, String(a));
        } catch {}
      }
      function ie() {
        try {
          localStorage.removeItem(G);
        } catch {}
      }
      const F = le(() => {
          if (!g.value || !g.value.stages) return [];
          const a = [];
          let e = 0;
          return (
            g.value.stages.forEach((t) => {
              (t.shots || []).forEach((l) => {
                const n = Number(l.duration_seconds) || 0;
                a.push({ stage: t, shot: l, start: e, end: e + n }), (e += n);
              });
            }),
            a
          );
        }),
        u = le(() => {
          var a;
          return ((a = F.value[N.value]) == null ? void 0 : a.shot) || null;
        });
      function re(a) {
        var t;
        const e =
          (t = F.value.find((l) => l.shot === a)) == null ? void 0 : t.stage;
        return (e && e.label) || "镜头";
      }
      function ue(a) {
        return (a.shot.refs || []).some((t) => _.value.includes(t))
          ? "角色：有模特参考"
          : "角色：AI 虚拟";
      }
      function de() {
        ie(),
          (V.value = null),
          (o.product = ""),
          (o.sell_point = ""),
          (o.audience = ""),
          (o.style = "现代都市"),
          (o.scene = ""),
          (o.duration_seconds = 30),
          (o.ratio = "9:16"),
          (x.value = "ai"),
          ($.value = ""),
          (C.value = []),
          (g.value = null),
          (z.value = ""),
          (N.value = 0),
          alert("已新建空白项目，填好内容后点“生成带货故事板”");
      }
      async function ce(a) {
        try {
          const t = (await m(`/api/drama-commerce/projects/${a}`)).project;
          return t
            ? ((V.value = t.id),
              t.brief &&
                ((o.product = t.brief.product || ""),
                (o.sell_point = t.brief.sell_point || ""),
                (o.audience = t.brief.audience || ""),
                (o.style = t.brief.style || "现代都市"),
                (o.scene = t.brief.scene || ""),
                (o.duration_seconds = t.brief.duration_seconds || 30),
                (o.ratio = t.brief.ratio || "9:16")),
              (x.value = t.story_source_mode || "ai"),
              ($.value = t.story_text || ""),
              (f.value = Array.isArray(t.product_images)
                ? t.product_images
                : []),
              (_.value = Array.isArray(t.role_images) ? t.role_images : []),
              (C.value = Array.isArray(t.role_meta) ? t.role_meta : []),
              t.storyboard &&
                ((g.value = t.storyboard),
                (g.value.stages || []).forEach((l) =>
                  (l.shots || []).forEach((n) => {
                    (n.refs = Array.isArray(n.refs) ? n.refs : []),
                      (n.video_status = n.video_status || ""),
                      (n.video_error = n.video_error || "");
                  }),
                )),
              t.video_model && (b.value = t.video_model),
              (N.value = 0),
              !0)
            : !1;
        } catch {
          return !1;
        }
      }
      async function H(a, e) {
        var n;
        const t = (n = e.target.files) == null ? void 0 : n[0];
        if (((e.target.value = ""), !t)) return;
        const l = new FormData();
        l.append("file", t);
        try {
          const y = await m("/api/uploads/oss/image", {
            method: "POST",
            body: l,
          });
          a === "product"
            ? (f.value.push(y.url), Y(y.url))
            : (_.value.push(y.url), ve(y.url));
        } catch (y) {
          alert("上传失败：" + y.message);
        }
      }
      async function Y(a) {
        if (!M.value) {
          (M.value = !0), (z.value = "");
          try {
            const e = await m("/api/drama-commerce/analyze-product", {
              method: "POST",
              body: JSON.stringify({ image_url: a }),
            });
            e.product_name && (o.product = e.product_name),
              e.sell_points && (o.sell_point = e.sell_points),
              e.audience && (o.audience = e.audience),
              (z.value = e.product_name || "已识别");
          } catch (e) {
            alert("产品识别失败：" + e.message);
          } finally {
            M.value = !1;
          }
        }
      }
      async function ve(a) {
        try {
          const e = await m("/api/drama-commerce/analyze-character", {
              method: "POST",
              body: JSON.stringify({ image_url: a }),
            }),
            t = {
              url: a,
              gender: e.gender || "",
              age_group: e.age_group || "",
              appearance: e.appearance || "",
              clothing: e.clothing || "",
              vibe: e.vibe || "",
              identity: e.identity || "",
              summary: e.summary || "",
            },
            l = C.value.findIndex((n) => n.url === a);
          l >= 0 ? (C.value[l] = t) : C.value.push(t),
            _.value.length === 1 && (o.product = o.product || "");
        } catch {}
      }
      async function pe() {
        if (V.value) return V.value;
        const a = await m("/api/drama-commerce/projects", {
          method: "POST",
          body: JSON.stringify({
            brief: { ...o },
            story_source_mode: x.value,
            story_text: $.value,
            product_images: f.value,
            role_images: _.value,
            role_meta: C.value,
            video_model: b.value,
          }),
        });
        return (V.value = a.id), ne(a.id), a.id;
      }
      async function fe() {
        if (V.value) {
          J.value = !0;
          try {
            await m(`/api/drama-commerce/projects/${V.value}`, {
              method: "PUT",
              body: JSON.stringify({
                brief: { ...o },
                story_source_mode: x.value,
                story_text: $.value,
                product_images: f.value,
                role_images: _.value,
                role_meta: C.value,
                storyboard: g.value,
                video_model: b.value,
              }),
            }),
              alert("已保存");
          } catch (a) {
            alert("保存失败：" + a.message);
          } finally {
            J.value = !1;
          }
        }
      }
      async function _e() {
        T.value = !0;
        try {
          const a = await pe();
          await m(`/api/drama-commerce/projects/${a}`, {
            method: "PUT",
            body: JSON.stringify({
              brief: { ...o },
              story_source_mode: x.value,
              story_text: $.value,
              product_images: f.value,
              role_images: _.value,
              role_meta: C.value,
              video_model: b.value,
            }),
          });
          const e = await m(`/api/drama-commerce/projects/${a}/storyboard`, {
            method: "POST",
            body: JSON.stringify({ model: O.value }),
          });
          e.storyboard.stages.forEach((t) => {
            t.shots.forEach((l) => {
              if (((l.refs = l.refs || []), !l.refs.length)) {
                const n = [];
                l.product_appearance !== "none" && n.push(...f.value),
                  _.value.length && n.push(_.value[0]),
                  (l.refs = [...new Set(n)]);
              }
              (l.video_url = l.video_url || ""),
                (l.video_status = l.video_status || ""),
                (l.video_error = l.video_error || "");
            });
          }),
            (g.value = e.storyboard),
            (N.value = 0),
            e.model && (O.value = e.model);
        } catch (a) {
          alert("生成失败：" + a.message);
        } finally {
          T.value = !1;
        }
      }
      function Q(a, e) {
        const t = a.refs.indexOf(e);
        t >= 0 ? a.refs.splice(t, 1) : a.refs.push(e);
      }
      function W(a) {
        return (
          { none: "未出现", introduce: "登场", use: "使用", cta: "主推收尾" }[
            a
          ] || a
        );
      }
      function X() {
        const a = I.value.find((e) => e.id === b.value);
        return (a && a.capability) || {};
      }
      function me(a) {
        const e = X(),
          t = e.fields || {},
          l = {};
        for (const k of Object.keys(t)) {
          const j = t[k];
          if (k === "duration" || k === "audio_duration") {
            let E = Number(a.duration_seconds) || Number(j.default) || 5;
            if (Array.isArray(j.options)) {
              const q = j.options.map(Number).filter(Number.isFinite);
              q.length &&
                !q.includes(E) &&
                (E = q.reduce((te, se) =>
                  Math.abs(se - E) < Math.abs(te - E) ? se : te,
                ));
            }
            l[k] = E;
          } else
            k === "ratio" || k === "aspect_ratio"
              ? (l[k] =
                  Array.isArray(j.options) && j.options.includes(o.ratio)
                    ? o.ratio
                    : j.default || "9:16")
              : k === "resolution" && (l[k] = j.default || "720p");
        }
        let n = String(a.visual_prompt || "").trim();
        const y = String(a.voiceover || "").trim();
        y &&
          (n += `

【角色口播/对白（由画面中的角色清晰说出这句台词）】：“${y}”`);
        const B = { model: b.value, prompt: n, params: l },
          ee = a.refs || [],
          K = (e.uploads || []).find((k) => k.type === "image");
        return (
          K
            ? (B.uploads = { [K.key]: ee.slice(0, K.max || 9) })
            : ((B.refImages = ee), (B.uploads = {})),
          B
        );
      }
      function ye(a) {
        return new Promise((e) => setTimeout(e, a));
      }
      async function ge(a) {
        const e = Date.now();
        for (; Date.now() - e < 9e5; ) {
          await ye(4e3);
          try {
            const l = (await m(`/api/video/tasks/${a.task_id}`)).task;
            if (!l) continue;
            const n = String(l.status || "").toLowerCase();
            if (["success", "done", "completed", "finished"].includes(n))
              return (
                (a.video_url = l.video_url || a.video_url || ""),
                (a.video_status = "done"),
                { ok: !0, msg: `镜${a.index_no}已生成` }
              );
            if (
              ["failed", "error", "canceled", "cancelled", "rejected"].includes(
                n,
              )
            )
              return (
                (a.video_status = "failed"),
                (a.video_error = String(l.error || "生成失败")),
                { ok: !1, msg: `镜${a.index_no}：${l.error || "生成失败"}` }
              );
          } catch {}
        }
        return (
          (a.video_status = "failed"),
          (a.video_error = "生成超时（可能仍在排队）"),
          { ok: !1, msg: `镜${a.index_no}生成超时` }
        );
      }
      async function Z(a) {
        if (!b.value) return { ok: !1, msg: "请先选择视频模型" };
        if (!a.visual_prompt)
          return { ok: !1, msg: `镜头${a.index_no}缺少画面提示词` };
        const e = X(),
          t = Number(e.image_min || 0) > 0,
          l = (a.refs || []).length > 0;
        if (t && !l)
          return {
            ok: !1,
            msg: `镜头${a.index_no}需参考图，请先勾选产品图/角色图`,
          };
        (a.video_status = "generating"),
          (a.video_error = ""),
          (a.video_url = a.video_url || ""),
          (L[a.index_no] = !0);
        try {
          const n = await m("/api/video/generate", {
              method: "POST",
              body: JSON.stringify(me(a)),
            }),
            y = n.id || n.task_id;
          return y
            ? ((a.task_id = y), await ge(a))
            : n.video_url
              ? ((a.video_url = n.video_url),
                (a.video_status = "done"),
                { ok: !0, msg: `镜${a.index_no}已生成` })
              : ((a.video_status = "failed"),
                (a.video_error = "未知响应"),
                { ok: !1, msg: `镜${a.index_no}未知响应` });
        } catch (n) {
          return (
            (a.video_status = "failed"),
            (a.video_error = n.message || "生成失败"),
            { ok: !1, msg: `镜${a.index_no}：${n.message}` }
          );
        } finally {
          L[a.index_no] = !1;
        }
      }
      async function be(a) {
        const e = await Z(a);
        e.ok || alert(e.msg);
      }
      async function ke() {
        R.value = !0;
        const a = await Promise.all(
          F.value.map((t) => Z(t.shot).then((l) => l.msg || l.ok)),
        );
        R.value = !1;
        const e = a.filter((t) => typeof t == "string");
        e.length &&
          alert(
            `部分镜头失败：
` +
              e.join(`
`),
          );
      }
      return (
        xe(async () => {
          try {
            const a = await m("/api/chat/models");
            (D.value = a.models || []),
              D.value.length && (O.value = D.value[0].id);
          } catch {}
          try {
            const a = await m("/api/video/models");
            if (((I.value = a.models || []), I.value.length)) {
              const e = I.value.find(
                (t) =>
                  t.capability && Number(t.capability.image_min || 0) === 0,
              );
              b.value = (e || I.value[0]).id;
            }
          } catch {}
          try {
            const a = localStorage.getItem(G);
            a && (await ce(Number(a)));
          } catch {}
        }),
        (a, e) => (
          r(),
          i("div", he, [
            s("div", Se, [
              e[22] ||
                (e[22] = s(
                  "div",
                  null,
                  [
                    s("h1", null, "短剧带货 · 工作台"),
                    s(
                      "p",
                      { class: "sub" },
                      "填 Brief → 选剧情来源 → 传产品图/角色 → 生成带货故事板 → 逐镜出片",
                    ),
                  ],
                  -1,
                )),
              s("div", Ce, [
                s(
                  "button",
                  {
                    class: "btn-plain",
                    disabled: !V.value || J.value,
                    onClick: fe,
                  },
                  d(J.value ? "保存中…" : "保存项目"),
                  9,
                  Ve,
                ),
                s(
                  "button",
                  { class: "btn-plain", disabled: T.value, onClick: de },
                  "新建项目",
                  8,
                  $e,
                ),
              ]),
            ]),
            s("div", Ne, [
              s("aside", je, [
                s("section", Ae, [
                  e[32] || (e[32] = s("h3", null, "① 广告需求（Brief）", -1)),
                  s("label", Ie, [
                    e[23] || (e[23] = c("产品 / 品牌名 ", -1)),
                    p(
                      s(
                        "input",
                        {
                          "onUpdate:modelValue":
                            e[0] || (e[0] = (t) => (o.product = t)),
                          placeholder: "如：极简高级香水",
                        },
                        null,
                        512,
                      ),
                      [[h, o.product]],
                    ),
                  ]),
                  s("label", Ue, [
                    e[24] || (e[24] = c("核心卖点 ", -1)),
                    p(
                      s(
                        "textarea",
                        {
                          "onUpdate:modelValue":
                            e[1] || (e[1] = (t) => (o.sell_point = t)),
                          rows: "2",
                          placeholder: "如：纯净通透 · 8K 柔光",
                        },
                        null,
                        512,
                      ),
                      [[h, o.sell_point]],
                    ),
                  ]),
                  s("label", Pe, [
                    e[25] || (e[25] = c("目标人群 / 调性 ", -1)),
                    p(
                      s(
                        "input",
                        {
                          "onUpdate:modelValue":
                            e[2] || (e[2] = (t) => (o.audience = t)),
                          placeholder: "如：都市女性 · 高级感",
                        },
                        null,
                        512,
                      ),
                      [[h, o.audience]],
                    ),
                  ]),
                  s("label", Oe, [
                    e[26] || (e[26] = c("画风 / 时代背景 ", -1)),
                    p(
                      s(
                        "select",
                        {
                          "onUpdate:modelValue":
                            e[3] || (e[3] = (t) => (o.style = t)),
                        },
                        [
                          (r(),
                          i(
                            w,
                            null,
                            S(oe, (t) =>
                              s("option", { key: t, value: t }, d(t), 9, Te),
                            ),
                            64,
                          )),
                        ],
                        512,
                      ),
                      [[U, o.style]],
                    ),
                  ]),
                  s("label", Me, [
                    e[27] || (e[27] = c("场景 / 地点设定 ", -1)),
                    p(
                      s(
                        "input",
                        {
                          "onUpdate:modelValue":
                            e[4] || (e[4] = (t) => (o.scene = t)),
                          placeholder: "如：宋代闺房内室，烛光·雕花木窗",
                        },
                        null,
                        512,
                      ),
                      [[h, o.scene]],
                    ),
                    e[28] ||
                      (e[28] = s(
                        "span",
                        { class: "hint" },
                        "填了会统一写进全部 5 镜，保证场景一致",
                        -1,
                      )),
                  ]),
                  s("div", ze, [
                    s("label", Ee, [
                      e[29] || (e[29] = c("时长 ", -1)),
                      p(
                        s(
                          "select",
                          {
                            "onUpdate:modelValue":
                              e[5] || (e[5] = (t) => (o.duration_seconds = t)),
                          },
                          [
                            (r(),
                            i(
                              w,
                              null,
                              S([15, 30, 45, 60], (t) =>
                                s(
                                  "option",
                                  { key: t, value: t },
                                  d(t) + " 秒",
                                  9,
                                  De,
                                ),
                              ),
                              64,
                            )),
                          ],
                          512,
                        ),
                        [[U, o.duration_seconds, void 0, { number: !0 }]],
                      ),
                    ]),
                    s("label", Je, [
                      e[31] || (e[31] = c("画幅 ", -1)),
                      p(
                        s(
                          "select",
                          {
                            "onUpdate:modelValue":
                              e[6] || (e[6] = (t) => (o.ratio = t)),
                          },
                          [
                            ...(e[30] ||
                              (e[30] = [
                                s("option", { value: "9:16" }, "9:16 竖屏", -1),
                                s("option", { value: "16:9" }, "16:9 横屏", -1),
                                s("option", { value: "1:1" }, "1:1 方形", -1),
                              ])),
                          ],
                          512,
                        ),
                        [[U, o.ratio]],
                      ),
                    ]),
                  ]),
                ]),
                s("section", Le, [
                  e[33] ||
                    (e[33] = s("h3", null, "② 剧情来源（决定开头内容）", -1)),
                  s("div", Re, [
                    s(
                      "button",
                      {
                        class: A({ on: x.value === "ai" }),
                        onClick: e[7] || (e[7] = (t) => (x.value = "ai")),
                      },
                      "AI 自动编",
                      2,
                    ),
                    s(
                      "button",
                      {
                        class: A({ on: x.value === "upload" }),
                        onClick: e[8] || (e[8] = (t) => (x.value = "upload")),
                      },
                      "用户上传剧情",
                      2,
                    ),
                  ]),
                  x.value === "upload"
                    ? p(
                        (r(),
                        i(
                          "textarea",
                          {
                            key: 0,
                            "onUpdate:modelValue":
                              e[9] || (e[9] = (t) => ($.value = t)),
                            rows: "4",
                            placeholder:
                              "粘贴开场剧情 / 剧本 / 故事大纲，系统照它生成分镜",
                          },
                          null,
                          512,
                        )),
                        [[h, $.value]],
                      )
                    : (r(),
                      i(
                        "p",
                        Fe,
                        "未提供剧情时，系统按画风与卖点自动设计开场钩子。",
                      )),
                ]),
                s("section", Be, [
                  e[36] || (e[36] = s("h3", null, "③ 素材", -1)),
                  e[37] ||
                    (e[37] = s(
                      "div",
                      { class: "asset-title" },
                      [c("产品图库 "), s("small", null, "（成片商品一致）")],
                      -1,
                    )),
                  s("div", Ke, [
                    (r(!0),
                    i(
                      w,
                      null,
                      S(
                        f.value,
                        (t, l) => (
                          r(),
                          i("div", { key: "p" + l, class: "asset-cell" }, [
                            s("img", { src: t }, null, 8, qe),
                            s(
                              "button",
                              {
                                class: "x",
                                onClick: (n) => f.value.splice(l, 1),
                              },
                              "×",
                              8,
                              Ge,
                            ),
                          ])
                        ),
                      ),
                      128,
                    )),
                    s("label", He, [
                      s(
                        "input",
                        {
                          type: "file",
                          accept: "image/*",
                          onChange: e[10] || (e[10] = (t) => H("product", t)),
                        },
                        null,
                        32,
                      ),
                      e[34] || (e[34] = s("span", null, "+ 上传", -1)),
                    ]),
                  ]),
                  s(
                    "button",
                    {
                      class: "btn-ai",
                      disabled: M.value || !f.value.length,
                      onClick:
                        e[11] ||
                        (e[11] = (t) => Y(f.value[f.value.length - 1])),
                    },
                    d(M.value ? "AI 识别中…" : "AI 识别产品名 / 卖点"),
                    9,
                    Ye,
                  ),
                  z.value
                    ? (r(), i("p", Qe, "AI 已自动填入：" + d(z.value), 1))
                    : P("", !0),
                  e[38] ||
                    (e[38] = s(
                      "div",
                      { class: "asset-title", style: { "margin-top": "10px" } },
                      [
                        c("角色库（模特） "),
                        s("small", null, "（人物形象一致）"),
                      ],
                      -1,
                    )),
                  s("div", We, [
                    (r(!0),
                    i(
                      w,
                      null,
                      S(
                        _.value,
                        (t, l) => (
                          r(),
                          i("div", { key: "r" + l, class: "asset-cell" }, [
                            s("img", { src: t }, null, 8, Xe),
                            s(
                              "button",
                              {
                                class: "x",
                                onClick: (n) => _.value.splice(l, 1),
                              },
                              "×",
                              8,
                              Ze,
                            ),
                          ])
                        ),
                      ),
                      128,
                    )),
                    s("label", et, [
                      s(
                        "input",
                        {
                          type: "file",
                          accept: "image/*",
                          onChange: e[12] || (e[12] = (t) => H("role", t)),
                        },
                        null,
                        32,
                      ),
                      e[35] || (e[35] = s("span", null, "+ 上传", -1)),
                    ]),
                  ]),
                  (r(!0),
                  i(
                    w,
                    null,
                    S(
                      C.value,
                      (t, l) => (
                        r(),
                        i(
                          "p",
                          { key: "rm" + l, class: "hint ok" },
                          "角色" +
                            d(l + 1) +
                            " 已识别：" +
                            d(t.summary || "（未识别）"),
                          1,
                        )
                      ),
                    ),
                    128,
                  )),
                  e[39] ||
                    (e[39] = s(
                      "p",
                      { class: "hint warn" },
                      "真人素材仅限有使用权的人物；产品图与角色互不串用。",
                      -1,
                    )),
                ]),
              ]),
              s("main", tt, [
                s("div", st, [
                  s("label", at, [
                    e[40] || (e[40] = c("故事板模型 ", -1)),
                    p(
                      s(
                        "select",
                        {
                          "onUpdate:modelValue":
                            e[13] || (e[13] = (t) => (O.value = t)),
                        },
                        [
                          (r(!0),
                          i(
                            w,
                            null,
                            S(
                              D.value,
                              (t) => (
                                r(),
                                i(
                                  "option",
                                  { key: t.id, value: t.id },
                                  d(t.name || t.id),
                                  9,
                                  lt,
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        512,
                      ),
                      [[U, O.value]],
                    ),
                  ]),
                  s("label", ot, [
                    e[41] || (e[41] = c("视频模型 ", -1)),
                    p(
                      s(
                        "select",
                        {
                          "onUpdate:modelValue":
                            e[14] || (e[14] = (t) => (b.value = t)),
                        },
                        [
                          (r(!0),
                          i(
                            w,
                            null,
                            S(
                              I.value,
                              (t) => (
                                r(),
                                i(
                                  "option",
                                  { key: t.id, value: t.id },
                                  d(t.name || t.id),
                                  9,
                                  nt,
                                )
                              ),
                            ),
                            128,
                          )),
                        ],
                        512,
                      ),
                      [[U, b.value]],
                    ),
                  ]),
                ]),
                g.value
                  ? (r(),
                    i("div", rt, [
                      (r(!0),
                      i(
                        w,
                        null,
                        S(
                          F.value,
                          (t, l) => (
                            r(),
                            i(
                              "div",
                              {
                                key: t.stage.key,
                                class: A([
                                  "shot-card",
                                  ["sc-" + t.stage.key, { sel: N.value === l }],
                                ]),
                                onClick: (n) => (N.value = l),
                              },
                              [
                                s("div", dt, [
                                  s(
                                    "b",
                                    null,
                                    "镜" +
                                      d(t.shot.index_no || l + 1) +
                                      " · " +
                                      d(t.stage.label),
                                    1,
                                  ),
                                  s(
                                    "span",
                                    ct,
                                    d(t.start) + "s–" + d(t.end) + "s",
                                    1,
                                  ),
                                ]),
                                s("div", vt, [
                                  s(
                                    "span",
                                    {
                                      class: A([
                                        "badge",
                                        "app-" + t.shot.product_appearance,
                                      ]),
                                    },
                                    d(W(t.shot.product_appearance)),
                                    3,
                                  ),
                                  s("span", pt, d(ue(t)), 1),
                                ]),
                                s(
                                  "p",
                                  ft,
                                  d(t.shot.visual_prompt || "（未生成画面）"),
                                  1,
                                ),
                                t.shot.voiceover
                                  ? (r(),
                                    i("p", _t, "🎙 " + d(t.shot.voiceover), 1))
                                  : P("", !0),
                                t.shot.video_url || t.shot.video_status
                                  ? (r(),
                                    i("div", mt, [
                                      t.shot.video_url
                                        ? (r(),
                                          i(
                                            "video",
                                            {
                                              key: 0,
                                              src: t.shot.video_url,
                                              controls: "",
                                              preload: "metadata",
                                            },
                                            null,
                                            8,
                                            yt,
                                          ))
                                        : t.shot.video_status === "generating"
                                          ? (r(),
                                            i("div", gt, "⏳ 视频生成中…"))
                                          : t.shot.video_status === "failed"
                                            ? (r(),
                                              i(
                                                "div",
                                                bt,
                                                "❌ " +
                                                  d(
                                                    t.shot.video_error ||
                                                      "生成失败",
                                                  ),
                                                1,
                                              ))
                                            : P("", !0),
                                    ]))
                                  : P("", !0),
                              ],
                              10,
                              ut,
                            )
                          ),
                        ),
                        128,
                      )),
                    ]))
                  : (r(),
                    i("div", it, [
                      ...(e[42] ||
                        (e[42] = [
                          s(
                            "p",
                            null,
                            "还没有带货故事板。填好左侧内容后，点“生成带货故事板”。",
                            -1,
                          ),
                          s(
                            "p",
                            { class: "sub" },
                            "固定 5 镜：开场钩子 → 痛点冲突 → 产品登场 → 效果反转 → 卖点收尾",
                            -1,
                          ),
                        ])),
                    ])),
                s("div", kt, [
                  s(
                    "button",
                    { class: "btn big", disabled: T.value, onClick: _e },
                    d(
                      T.value
                        ? "生成中…"
                        : g.value
                          ? "重新生成故事板"
                          : "生成带货故事板",
                    ),
                    9,
                    wt,
                  ),
                  s(
                    "button",
                    {
                      class: "btn big alt",
                      disabled: !g.value || R.value,
                      onClick: ke,
                    },
                    d(R.value ? "逐镜生成中…" : "逐镜生成带货视频"),
                    9,
                    xt,
                  ),
                ]),
              ]),
              s("aside", ht, [
                u.value
                  ? (r(),
                    i(
                      w,
                      { key: 0 },
                      [
                        e[51] || (e[51] = s("h3", null, "⑤ 当前镜头详情", -1)),
                        s("div", St, [
                          s(
                            "b",
                            null,
                            "镜头" +
                              d(N.value + 1) +
                              " · " +
                              d(u.value.stage_name || "" || re(u.value)),
                            1,
                          ),
                          s(
                            "span",
                            {
                              class: A([
                                "badge",
                                "app-" + u.value.product_appearance,
                              ]),
                            },
                            d(W(u.value.product_appearance)),
                            3,
                          ),
                        ]),
                        s("label", Ct, [
                          e[43] ||
                            (e[43] = c("画面提示词（visual_prompt） ", -1)),
                          p(
                            s(
                              "textarea",
                              {
                                "onUpdate:modelValue":
                                  e[15] ||
                                  (e[15] = (t) => (u.value.visual_prompt = t)),
                                rows: "5",
                              },
                              null,
                              512,
                            ),
                            [[h, u.value.visual_prompt]],
                          ),
                        ]),
                        s("label", Vt, [
                          e[44] || (e[44] = c("口播 / 对白 ", -1)),
                          p(
                            s(
                              "textarea",
                              {
                                "onUpdate:modelValue":
                                  e[16] ||
                                  (e[16] = (t) => (u.value.voiceover = t)),
                                rows: "2",
                              },
                              null,
                              512,
                            ),
                            [[h, u.value.voiceover]],
                          ),
                        ]),
                        s("div", $t, [
                          s("label", Nt, [
                            e[45] || (e[45] = c("时长 ", -1)),
                            p(
                              s(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    e[17] ||
                                    (e[17] = (t) =>
                                      (u.value.duration_seconds = t)),
                                  type: "number",
                                  min: "4",
                                  max: "15",
                                },
                                null,
                                512,
                              ),
                              [
                                [
                                  h,
                                  u.value.duration_seconds,
                                  void 0,
                                  { number: !0 },
                                ],
                              ],
                            ),
                          ]),
                          s("label", jt, [
                            e[46] || (e[46] = c("景别 ", -1)),
                            p(
                              s(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    e[18] ||
                                    (e[18] = (t) => (u.value.shot_size = t)),
                                },
                                null,
                                512,
                              ),
                              [[h, u.value.shot_size]],
                            ),
                          ]),
                          s("label", At, [
                            e[47] || (e[47] = c("机位/运镜 ", -1)),
                            p(
                              s(
                                "input",
                                {
                                  "onUpdate:modelValue":
                                    e[19] ||
                                    (e[19] = (t) => (u.value.camera = t)),
                                },
                                null,
                                512,
                              ),
                              [[h, u.value.camera]],
                            ),
                          ]),
                          s("label", It, [
                            e[49] || (e[49] = c("产品植入 ", -1)),
                            p(
                              s(
                                "select",
                                {
                                  "onUpdate:modelValue":
                                    e[20] ||
                                    (e[20] = (t) =>
                                      (u.value.product_appearance = t)),
                                },
                                [
                                  ...(e[48] ||
                                    (e[48] = [
                                      s(
                                        "option",
                                        { value: "none" },
                                        "未出现",
                                        -1,
                                      ),
                                      s(
                                        "option",
                                        { value: "introduce" },
                                        "登场",
                                        -1,
                                      ),
                                      s("option", { value: "use" }, "使用", -1),
                                      s(
                                        "option",
                                        { value: "cta" },
                                        "主推收尾",
                                        -1,
                                      ),
                                    ])),
                                ],
                                512,
                              ),
                              [[U, u.value.product_appearance]],
                            ),
                          ]),
                        ]),
                        s("div", Ut, [
                          e[50] ||
                            (e[50] = s(
                              "span",
                              { class: "ref-label" },
                              "参考素材：",
                              -1,
                            )),
                          (r(!0),
                          i(
                            w,
                            null,
                            S(
                              f.value,
                              (t, l) => (
                                r(),
                                i(
                                  "button",
                                  {
                                    key: "rp" + l,
                                    class: A({
                                      on: (u.value.refs || []).includes(t),
                                    }),
                                    onClick: (n) => Q(u.value, t),
                                  },
                                  "产品" + d(l + 1),
                                  11,
                                  Pt,
                                )
                              ),
                            ),
                            128,
                          )),
                          (r(!0),
                          i(
                            w,
                            null,
                            S(
                              _.value,
                              (t, l) => (
                                r(),
                                i(
                                  "button",
                                  {
                                    key: "rr" + l,
                                    class: A({
                                      on: (u.value.refs || []).includes(t),
                                    }),
                                    onClick: (n) => Q(u.value, t),
                                  },
                                  "角色" + d(l + 1),
                                  11,
                                  Ot,
                                )
                              ),
                            ),
                            128,
                          )),
                          !f.value.length && !_.value.length
                            ? (r(), i("span", Tt, "无参考素材"))
                            : P("", !0),
                        ]),
                        s(
                          "button",
                          {
                            class: "btn det-btn",
                            disabled: !b.value || L[u.value.index_no],
                            onClick: e[21] || (e[21] = (t) => be(u.value)),
                          },
                          d(
                            L[u.value.index_no]
                              ? "提交中…"
                              : u.value.video_url
                                ? "重新生成本镜"
                                : "生成本镜视频",
                          ),
                          9,
                          Mt,
                        ),
                        u.value.video_url
                          ? (r(),
                            i(
                              "a",
                              {
                                key: 0,
                                href: u.value.video_url,
                                target: "_blank",
                                class: "view-link",
                              },
                              "查看本镜视频",
                              8,
                              zt,
                            ))
                          : P("", !0),
                      ],
                      64,
                    ))
                  : (r(),
                    i("div", Et, [
                      ...(e[52] ||
                        (e[52] = [
                          s(
                            "p",
                            null,
                            "先点“生成带货故事板”，再点某个镜头查看详情并逐镜出片。",
                            -1,
                          ),
                        ])),
                    ])),
              ]),
            ]),
          ])
        )
      );
    },
  },
  Ft = we(Dt, [["__scopeId", "data-v-861ac357"]]);
export { Ft as default };
