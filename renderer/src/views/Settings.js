import "../styles/pages/Settings.css";
import {
  _ as K,
  o as T,
  b as l,
  e as t,
  v as w,
  z as j,
  H as M,
  t as o,
  j as k,
  J as N,
  F as f,
  r as _,
  l as d,
  G as x,
  m as i,
  p as V,
  g as D,
} from "../runtime/index.js";
const I = { class: "card", style: { padding: "24px", "max-width": "720px" } },
  O = { class: "field" },
  P = { class: "field" },
  U = { style: { display: "flex", gap: "10px" } },
  A = ["type", "placeholder"],
  J = { key: 0, class: "muted", style: { "font-size": "12px" } },
  L = {
    style: {
      display: "flex",
      gap: "12px",
      "margin-top": "8px",
      "align-items": "center",
    },
  },
  F = ["disabled"],
  R = {
    key: 0,
    style: {
      color: "var(--ok,#34d399)",
      "font-size": "13px",
      "margin-top": "10px",
    },
  },
  $ = { class: "page-head", style: { "margin-top": "34px" } },
  E = { class: "muted" },
  G = { class: "tabs", style: { margin: "14px 0" } },
  H = ["onClick"],
  q = { class: "badge" },
  Q = { class: "grid grid-2" },
  W = { class: "model-name" },
  X = { class: "model-id" },
  Y = { class: "model-tags" },
  Z = {
    __name: "Settings",
    setup(ee) {
      const n = d(""),
        c = d("https://api.lk888.ai"),
        r = d(""),
        p = d(!1),
        y = d(!1),
        m = d(!1),
        u = d(null),
        g = d("chat"),
        v = d({ chat: [], image: [], video: [] }),
        b = x(() => [
          { key: "chat", label: "文本模型", list: v.value.chat },
          { key: "image", label: "图片模型", list: v.value.image },
          { key: "video", label: "视频模型", list: v.value.video },
        ]),
        S = x(() => {
          var s;
          return (
            ((s = b.value.find((e) => e.key === g.value)) == null
              ? void 0
              : s.list) || []
          );
        }),
        C = x(
          () =>
            v.value.chat.length + v.value.image.length + v.value.video.length,
        ),
        P = d({ chat: {}, image: {}, video: {} });
      T(async () => {        try {
          const e = await (await fetch("/api/settings")).json();
          (c.value = e.apiBase || "https://api.lk888.ai"),
            (r.value = e.apiKeyMasked || ""),
            (v.value = e.models || { chat: [], image: [], video: [] }),
            (u.value = e.testResult);
          P.value = e.providers || { chat: {}, image: {}, video: {} };
          paintProviders(P.value);
        } catch {}
      });

      // 三段式模型配置：这套视图是压缩还原出来的渲染函数，新加的响应式字段
      // 在部分构建下不触发 patch，所以表单直接用原生 DOM 构建，稳且不依赖 diff 行为。
      const KINDS = [
        ["chat", "文本模型", "对话 / 剧本 / 分镜文本"],
        ["image", "图片模型", "绘画 / 封面 / 参考图"],
        ["video", "视频模型", "文生视频 / 图生视频"],
      ];

      function paintProviders(prov) {
        const host = document.querySelector(".prov-mount");
        if (!host) return;
        let html = "";
        for (const [kind, title, desc] of KINDS) {
          const g = prov[kind] || {};
          const hasKey = !!g.hasKey;
          html +=
            '<div class="prov-group" data-kind="' + kind + '">' +
            '<div class="prov-head"><strong>' + title + "</strong>" +
            '<span class="prov-desc">' + desc + "</span>" +
            '<span class="prov-badge' + (hasKey ? "" : " prov-badge-off") + '">' +
            (hasKey ? "已保存 " + (g.keyMasked || "Key") : "未配置") +
            "</span></div>" +
            '<div class="prov-grid">' +
            '<div class="prov-field"><label>API 地址</label>' +
            '<input data-f="base" type="text" placeholder="https://ai.tt2066.top/v1" value="' +
            String(g.base || "").replace(/"/g, "&quot;") + '" autocomplete="off"></div>' +
            '<div class="prov-field"><label>API Key</label>' +
            '<input data-f="key" type="password" placeholder="' +
            (hasKey ? "已保存，留空不修改" : "sk-xxxxxxxx") +
            '" value="" autocomplete="new-password"></div>' +
            '<div class="prov-field"><label>模型名</label>' +
            '<input data-f="model" type="text" placeholder="点「获取模型」选择" value="' +
            String(g.model || "").replace(/"/g, "&quot;") + '" autocomplete="off"></div>' +
            "</div>" +
            '<div class="prov-actions">' +
            '<button type="button" class="btn-plain" data-act="test">测试连接</button>' +
            '<button type="button" class="btn-plain" data-act="models">获取模型</button>' +
            '<button type="button" class="btn" data-act="save">保存</button>' +
            '<span class="prov-status"></span>' +
            "</div>" +
            '<div class="prov-models"></div>' +
            "</div>";
        }
        // 三段末尾加一个「全部保存」
        html +=
          '<div class="prov-saveall">' +
          '<button type="button" class="btn" id="prov-saveall-btn">全部保存</button>' +
          '<span class="prov-status" id="prov-saveall-status"></span>' +
          "</div>";
        host.innerHTML = html;
        host.onclick = onProvClick;
        const sa = document.getElementById("prov-saveall-btn");
        if (sa) sa.onclick = saveAllProviders;
      }

      // 带超时的 fetch（探测/保存统一用，避免按钮一直转）
      async function fetchTimeout(url, options, ms) {
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), ms || 15000);
        try {
          return await fetch(url, { ...options, signal: ctl.signal });
        } finally {
          clearTimeout(timer);
        }
      }

      async function saveAllProviders() {
        const btn = document.getElementById("prov-saveall-btn");
        const status = document.getElementById("prov-saveall-status");
        const setStatus = (text, ok) => {
          // paintProviders 会重绘 DOM，这里每次现取，避免拿到失效节点
          const el = document.getElementById("prov-saveall-status");
          if (!el) return;
          el.textContent = text;
          el.className = "prov-status " + (ok ? "ok" : "bad");
        };
        if (btn) btn.disabled = true;
        setStatus("正在保存…", true);
        try {
          const providers = readProviders();
          const r = await (
            await fetchTimeout(
              "/api/settings",
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ providers }),
              },
              15000
            )
          ).json();
          if (!r.ok) {
            setStatus("✗ " + (r.msg || "保存失败"), false);
            return;
          }
          const fresh = await (
            await fetchTimeout("/api/settings", { cache: "no-store" }, 15000)
          ).json();
          paintProviders(fresh.providers || {});
          setStatus("✓ 三段已全部保存", true);
        } catch (e) {
          setStatus(
            "✗ " + (e && e.name === "AbortError" ? "请求超时" : e && e.message ? e.message : e),
            false
          );
        } finally {
          const b2 = document.getElementById("prov-saveall-btn");
          if (b2) b2.disabled = false;
        }
      }

      async function onProvClick(ev) {
        const group = ev.target.closest(".prov-group");
        if (!group) return;
        const kind = group.getAttribute("data-kind");
        const read = (f) => {
          const el = group.querySelector('input[data-f="' + f + '"]');
          return el ? el.value.trim() : "";
        };

        // 点模型芯片 → 回填模型名
        const chip = ev.target.closest(".prov-chip");
        if (chip) {
          const inp = group.querySelector('input[data-f="model"]');
          if (inp) inp.value = chip.getAttribute("data-model") || "";
          group.querySelectorAll(".prov-chip").forEach((c) => {
            c.classList.toggle("active", c === chip);
          });
          return;
        }

        const btn = ev.target.closest("button[data-act]");
        if (!btn) return;
        const act = btn.getAttribute("data-act");
        const status = group.querySelector(".prov-status");
        const chips = group.querySelector(".prov-models");
        const setStatus = (text, ok) => {
          if (!status) return;
          status.textContent = text;
          status.className = "prov-status " + (ok ? "ok" : "bad");
        };

        // 单独保存这一段（不必滚到页面顶部按「保存配置」）
        if (act === "save") {
          const base = read("base");
          const model = read("model");
          if (!base) {
            setStatus("✗ 请先填写 API 地址", false);
            return;
          }
          setStatus("正在保存…", true);
          btn.disabled = true;
          try {
            const payload = { providers: {} };
            payload.providers[kind] = { base, key: read("key"), model };
            const r = await (
              await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })
            ).json();
            if (!r.ok) {
              setStatus("✗ " + (r.msg || "保存失败"), false);
              return;
            }
            const fresh = await (await fetch("/api/settings", { cache: "no-store" })).json();
            const g = (fresh.providers || {})[kind] || {};
            setStatus("✓ 已保存" + (g.keyMasked ? "（" + g.keyMasked + "）" : ""), true);
            const badge = group.querySelector(".prov-badge");
            if (badge) {
              badge.className = "prov-badge" + (g.hasKey ? "" : " prov-badge-off");
              badge.textContent = g.hasKey ? "已保存 " + (g.keyMasked || "Key") : "未配置";
            }
            const keyInput = group.querySelector('input[data-f="key"]');
            if (keyInput && g.hasKey) {
              keyInput.value = "";
              keyInput.placeholder = "已保存，留空不修改";
            }
          } catch (e) {
            setStatus("✗ " + (e && e.message ? e.message : e), false);
          } finally {
            btn.disabled = false;
          }
          return;
        }

        setStatus("正在连接…", true);
        if (chips) chips.innerHTML = "";
        btn.disabled = true;
        try {
          const r = await (
            await fetchTimeout(
              "/api/settings/probe",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ kind, base: read("base"), key: read("key") }),
              },
              15000
            )
          ).json();
          if (!r.ok) {
            setStatus("✗ " + (r.message || "连接失败"), false);
            return;
          }
          setStatus("✓ " + r.message, true);
          if (act === "models" && chips) {
            const cur = read("model");
            chips.innerHTML = (r.models || [])
              .slice(0, 80)
              .map((m) => {
                const safe = String(m).replace(/"/g, "&quot;");
                return (
                  '<button type="button" class="prov-chip' +
                  (m === cur ? " active" : "") +
                  '" data-model="' + safe + '">' + safe + "</button>"
                );
              })
              .join("");
          }
        } catch (e) {
          setStatus(
            "✗ " + (e && e.name === "AbortError" ? "连接超时，请检查地址或网络" : e && e.message ? e.message : e),
            false
          );
        } finally {
          btn.disabled = false;
        }
      }

      function readProviders() {
        const out = { chat: {}, image: {}, video: {} };
        document.querySelectorAll(".prov-group").forEach((el) => {
          const kind = el.getAttribute("data-kind");
          if (!out[kind]) return;
          el.querySelectorAll("input[data-f]").forEach((inp) => {
            out[kind][inp.getAttribute("data-f")] = inp.value.trim();
          });
        });
        return out;
      }
      async function B() {
        y.value = !1;
        const s = { apiBase: c.value, providers: readProviders() };
        n.value.trim() && (s.apiKey = n.value.trim());
        const e = await fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(s),
          }),
          a = await e.json().catch(() => ({}));
        if (!e.ok || !a.ok) return alert(a.msg || "保存失败");
        (y.value = !0),
          setTimeout(() => (y.value = !1), 2500),
          n.value &&
            (r.value = n.value.slice(0, 6) + "****" + n.value.slice(-4)),
          (n.value = "");
      }
      async function z() {
        (m.value = !0), (u.value = null);
        try {
          const s = await fetch("/api/settings/test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: n.value, apiBase: c.value }),
          });
          u.value = await s.json();
        } catch (s) {
          u.value = { ok: !1, error: s.message };
        }
        m.value = !1;
      }
      const provField = (ref, label, placeholder, type) =>
        t("div", { class: "prov-field" }, [
          t("label", null, label),
          w(
            t("input", {
              type: type || "text",
              placeholder,
              autocomplete: "new-password",
              "onUpdate:modelValue": (val) => {
                ref.value = val;
              },
            }),
            [[j, ref.value]],
          ),
        ]);

      const provGroup = () => t("div", { class: "prov-mount" });

      const __dead = (title, hasKey, rBase, rKey, rModel, hint) =>
        t("div", { class: "prov-group" }, [
          t("div", { class: "prov-head" }, [
            t("strong", null, title),
            hasKey.value
              ? t("span", { class: "prov-badge" }, "已保存 Key")
              : t("span", { class: "prov-badge prov-badge-off" }, "未配置"),
          ]),
          t("div", { class: "prov-grid" }, [
            provField(rBase, "API 地址", hint),
            provField(
              rKey,
              "API Key",
              hasKey.value ? "已保存，留空不修改" : "sk-xxxxxxxx",
              "password",
            ),
            provField(rModel, "模型名", "例如 gpt-4o-mini"),
          ]),
        ]);
      void __dead;

      return (s, e) => (
        i(),
        l("div", null, [
          e[7] ||
            (e[7] = t(
              "div",
              { class: "page-head" },
              [
                t("h2", null, "大模型设置"),
                t("div", { class: "muted" }, "模型服务与连接配置"),
              ],
              -1,
            )),
          t("div", I, [
            t("div", O, [
              e[3] || (e[3] = t("label", null, "API 地址（Base URL）", -1)),
              w(
                t(
                  "input",
                  {
                    "onUpdate:modelValue":
                      e[0] || (e[0] = (a) => (c.value = a)),
                    placeholder: "https://api.lk888.ai",
                  },
                  null,
                  512,
                ),
                [[j, c.value]],
              ),
              e[4] ||
                (e[4] = t(
                  "div",
                  { class: "muted", style: { "font-size": "12px" } },
                  "默认已对接TT助手AI中转站，一般无需修改",
                  -1,
                )),
            ]),
            t("div", P, [
              e[5] || (e[5] = t("label", null, "API Key", -1)),
              t("div", U, [
                w(
                  t(
                    "input",
                    {
                      "onUpdate:modelValue":
                        e[1] || (e[1] = (a) => (n.value = a)),
                      autocomplete: "new-password",
                      type: p.value ? "text" : "password",
                      placeholder: r.value
                        ? "已保存，留空则不修改"
                        : "sk-xxxxxxxx",
                    },
                    null,
                    8,
                    A,
                  ),
                  [[M, n.value]],
                ),
                t(
                  "button",
                  {
                    class: "btn-plain",
                    style: { "white-space": "nowrap" },
                    onClick: e[2] || (e[2] = (a) => (p.value = !p.value)),
                  },
                  o(p.value ? "隐藏" : "显示"),
                  1,
                ),
              ]),
              r.value
                ? (i(), l("div", J, "当前已保存：" + o(r.value), 1))
                : k("", !0),
            ]),
            t("div", L, [
              t("button", { class: "btn", onClick: B }, "保存配置"),
              t(
                "button",
                { class: "btn-plain", onClick: z, disabled: m.value },
                o(m.value ? "测试中..." : "测试连接"),
                9,
                F,
              ),
              u.value
                ? (i(),
                  l(
                    "span",
                    {
                      key: 0,
                      style: N({
                        color: u.value.ok ? "var(--ok,#34d399)" : "#f87171",
                        fontSize: 13,
                      }),
                    },
                    o(
                      u.value.ok
                        ? "✅ 连接成功，Key 有效"
                        : "❌ " + u.value.error,
                    ),
                    5,
                  ))
                : k("", !0),
            ]),
            y.value ? (i(), l("div", R, "✅ 已保存")) : k("", !0),
          ]),
          e[8] ||
            (e[8] = t(
              "p",
              { class: "muted storage-note" },
              "素材上传存储由平台后台统一管理，用户无需填写 OSS 配置。上传不可用时请联系管理员。",
              -1,
            )),
          t("div", { class: "prov-card" }, [
            t("h3", null, "模型分开配置"),
            t(
              "p",
              { class: "muted", style: { "font-size": "12px", margin: "0 0 14px" } },
              "文字、图片、视频可以分别使用不同的服务和 Key。调用时按类型自动选对应模型，互不影响。",
            ),
            provGroup(),
            t(
              "p",
              { class: "muted", style: { "font-size": "12px", margin: "10px 0 0" } },
              "提示：图片走 /images/generations，视频走 /videos 并自动轮询任务；地址填到 /v1 即可，路径由客户端拼接。",
            ),
          ]),
          t("div", $, [
            e[6] || (e[6] = t("h3", null, "已对接模型清单", -1)),
            t("div", E, "共 " + o(C.value) + " 个", 1),
          ]),
          t("div", G, [
            (i(!0),
            l(
              f,
              null,
              _(
                b.value,
                (a) => (
                  i(),
                  l(
                    "button",
                    {
                      key: a.key,
                      class: V(["tab", { active: g.value === a.key }]),
                      onClick: (h) => (g.value = a.key),
                    },
                    [D(o(a.label) + " ", 1), t("span", q, o(a.list.length), 1)],
                    10,
                    H,
                  )
                ),
              ),
              128,
            )),
          ]),
          t("div", Q, [
            (i(!0),
            l(
              f,
              null,
              _(
                S.value,
                (a) => (
                  i(),
                  l("div", { key: a.id, class: "card model-item" }, [
                    t("div", W, o(a.name), 1),
                    t("div", X, o(a.id), 1),
                    t("div", Y, [
                      (i(!0),
                      l(
                        f,
                        null,
                        _(
                          a.tags,
                          (h) => (
                            i(), l("span", { key: h, class: "tag" }, o(h), 1)
                          ),
                        ),
                        128,
                      )),
                    ]),
                  ])
                ),
              ),
              128,
            )),
          ]),
        ])
      );
    },
  },
  ae = K(Z, [["__scopeId", "data-v-004ba4af"]]);
export { ae as default };
