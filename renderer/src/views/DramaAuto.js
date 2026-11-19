import "../styles/pages/DramaAuto.css";
import { _ as t, b as s, e as a, m as o, o as bt, l as M } from "../runtime/index.js";

async function getJson(url, options) {
  const res = await fetch(url, options);
  return res.json();
}

const n = {
  __name: "DramaAuto",
  setup() {
    const status = M(null);
    const busy = M(false);
    const steps = M("");
    const error = M("");
    const shot = M("");

    const load = async () => {
      try {
        status.value = await getJson("/api/comfy/status", { cache: "no-store" });
        error.value = "";
      } catch (e) {
        error.value = "网关未响应：" + (e && e.message ? e.message : e);
      }
    };

    const enable = async () => {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      steps.value = "开始准备本地引擎（首次约 6 GB 下载，请保持网络）…";
      try {
        const r = await getJson("/api/comfy/ensure", { method: "POST" });
        if (r.steps && r.steps.length) {
          steps.value = r.steps.map((x) => "· " + x.msg).join("\n");
        }
        if (!r.ok) error.value = r.message || "启用失败";
        await load();
      } catch (e) {
        error.value = e && e.message ? e.message : String(e);
      } finally {
        busy.value = false;
      }
    };

    const stop = async () => {
      await getJson("/api/comfy/stop", { method: "POST" });
      await load();
    };

    const test = async () => {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      try {
        const r = await getJson("/api/draw/generate", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ prompt: "云海上的东方仙城，电影感", size: "512x512", count: 1 })
        });
        const id = r.task && r.task.id;
        let done = false;
        for (let i = 0; i < 90 && !done; i += 1) {
          await new Promise((res) => setTimeout(res, 2000));
          const list = await getJson("/api/draw/tasks", { cache: "no-store" });
          const task = (list.tasks || []).find((x) => x.id === id);
          if (!task) continue;
          if (task.status === "success") {
            const imgs = JSON.parse(task.images || "[]");
            shot.value = imgs[0] || "";
            done = true;
          } else if (task.status === "failed") {
            error.value = task.error || "生成失败";
            done = true;
          }
        }
        await load();
      } catch (e) {
        error.value = e && e.message ? e.message : String(e);
      } finally {
        busy.value = false;
      }
    };

    bt(() => { load(); });

    const line = (label, value) => a("p", { class: "da-line" }, [
      a("span", { class: "da-k" }, label),
      a("span", { class: "da-v" }, value)
    ]);

    return (m, e) => {
      const st = status.value || {};
      const ck = st.checkpoints && st.checkpoints.length ? st.checkpoints[0] : "无";
      const free = st.freeDiskMb ? Math.round(st.freeDiskMb / 1024) + " GB" : "—";
      return o(), s("section", { class: "drama-auto-page" }, [
        a("header", { class: "drama-auto-head" }, [
          a("div", null, [
            a("span", null, "自动化创作"),
            a("h1", null, "AI漫剧全功能"),
            a("p", null, "本机 GPU 引擎：一次安装，之后离线出图，不绑定任何第三方账号。")
          ]),
          a("button", { class: "btn-plain", type: "button", onClick: load }, "刷新状态")
        ]),
        a("div", { class: "da-card" }, [
          a("h3", null, "引擎状态"),
          line("安装", st.installed ? "已安装" : "未安装"),
          line("运行", st.running ? "运行中 · 127.0.0.1:" + st.port : "未运行"),
          line("开关", st.enabled ? "已启用" : "未启用"),
          line("模型", ck),
          line("磁盘余量", free),
          a("div", { class: "da-actions" }, [
            a("button", { class: "btn", type: "button", onClick: enable, disabled: busy.value },
              busy.value ? "处理中…" : (st.installed ? "安装模型并启动" : "一键安装并启用")),
            a("button", { class: "btn-plain", type: "button", onClick: stop }, "停止"),
            a("button", { class: "btn-plain", type: "button", onClick: test, disabled: busy.value }, "试生成一张")
          ])
        ]),
        a("p", { class: "da-error" }, error.value || ""),
        a("pre", { class: "da-log" }, steps.value || "（尚无进度）"),
        a("div", { class: "da-preview" }, [
          a("h3", null, "生成结果"),
          shot.value
            ? a("img", { src: shot.value, alt: "生成结果" })
            : a("p", { class: "da-empty" }, "还没有图片。引擎就绪后点「试生成一张」。")
        ])
      ]);
    };
  }
};

const d = t(n, [["__scopeId", "data-v-252c42cc"]]);
export { d as default };
