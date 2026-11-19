import "../styles/pages/Canvas.css";
import {
  c as s,
  _ as a,
  o as n,
  b as o,
  e as t,
  f as d,
  u as r,
  m as p,
} from "../runtime/index.js";
/**
 * @license @lucide/vue v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c = {
    name: "construction",
    size: 24,
    node: [
      [
        "rect",
        { x: "2", y: "6", width: "20", height: "8", rx: "1", key: "1estib" },
      ],
      ["path", { d: "M17 14v7", key: "7m2elx" }],
      ["path", { d: "M7 14v7", key: "1cm7wv" }],
      ["path", { d: "M17 3v3", key: "1v4jwn" }],
      ["path", { d: "M7 3v3", key: "7o6guu" }],
      ["path", { d: "M10 14 2.3 6.3", key: "1023jk" }],
      ["path", { d: "m14 6 7.7 7.7", key: "1s8pl2" }],
      ["path", { d: "m8 6 8 8", key: "hl96qh" }],
    ],
  },
  l = s(c),
  i = { key: 0, class: "canvas-development" },
  u = { class: "development-mark" },
  m = {
    __name: "Canvas",
    setup(v) {
      return (
        n(() => {}),
        (k, e) => (
          p(),
          o("div", i, [
            t("div", u, [d(r(l), { size: 30 })]),
            e[0] || (e[0] = t("h1", null, "无限画布", -1)),
            e[1] || (e[1] = t("strong", null, "开发中", -1)),
            e[2] ||
              (e[2] = t("p", null, "该功能暂时关闭，完成后重新开放。", -1)),
          ])
        )
      );
    },
  },
  h = a(m, [["__scopeId", "data-v-6faa4756"]]);
export { h as default };
