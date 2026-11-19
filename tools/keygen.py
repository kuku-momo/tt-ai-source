#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
keygen.py —— 离线卡密签发器（与 electron/license-core.cjs 完全同构）

卡密格式：MYAI-<T><DDD>-<SSSS>-<HHHHHHHH>
  T        P = 永久卡 / D = 限时卡
  DDD      000（永久）或 001~3650（天数）
  SSSS     4 位 Crockford Base32 序列号
  HHHHHHHH 8 位 Crockford Base32 = HMAC-SHA256(SECRET, "MYAI|T|DDD|SSSS") 取字节流
           按「每字节拆两个 5bit 字符」展开后截前 8 位

用法：
  python keygen.py                     # 生成 1 张永久卡
  python keygen.py -d 30               # 生成 30 天卡
  python keygen.py -d 30 -n 10         # 批量 10 张 30 天卡
  python keygen.py -s 7K3M             # 指定序列号（可追溯渠道）
  python keygen.py --verify MYAI-P000-7K3M-9XQ4TZ8W
  python keygen.py --selfcheck         # 与 JS 实现逐个比对
"""
import argparse
import hmac
import hashlib
import os
import subprocess
import sys

PREFIX = "MYAI"
SECRET = b"AI-Creation/2026/license-core/v1:9f3c1d7a5b2e48c0a6d4f19b7e83c25d"
ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"  # Crockford Base32：无 I L O U


def encode_bytes(buf: bytes, chars: int) -> str:
    """复刻 JS encodeBytes：逐字节拆成高位 5bit + 低位 5bit，循环取用"""
    out = []
    i = 0
    while len(out) < chars:
        b = buf[i % len(buf)]
        out.append(ALPHABET[b >> 3])
        out.append(ALPHABET[b & 31])
        i += 1
    return "".join(out)[:chars]


def sign(kind: str, days: int, seq: str) -> str:
    padded = str(days).zfill(3)
    mac = hmac.new(SECRET, f"{PREFIX}|{kind}|{padded}|{seq}".encode(), hashlib.sha256).digest()
    return encode_bytes(mac, 8)


def normalize(code: str) -> str:
    return "".join(ch for ch in str(code or "").upper() if ch.isalnum())


def parse(code: str):
    raw = normalize(code)
    if not raw.startswith(PREFIX):
        return None
    body = raw[len(PREFIX):]
    if len(body) != 1 + 3 + 4 + 8:
        return None
    kind, dd, seq, sig = body[0], body[1:4], body[4:8], body[8:]
    if kind not in ("P", "D") or not dd.isdigit():
        return None
    if not all(c in ALPHABET for c in seq + sig):
        return None
    return {"type": kind, "days": int(dd), "seq": seq, "sig": sig,
            "canonical": f"{PREFIX}-{kind}{dd}-{seq}-{sig}"}


def verify_strict(code: str):
    p = parse(code)
    if not p:
        return {"ok": False, "reason": "卡密格式不正确"}
    if not hmac.compare_digest(sign(p["type"], p["days"], p["seq"]), p["sig"]):
        return {"ok": False, "reason": "卡密无效或已被篡改"}
    if p["type"] == "D" and not (0 < p["days"] <= 3650):
        return {"ok": False, "reason": "有效期超出允许范围"}
    permanent = p["type"] == "P"
    return {"ok": True, "code": p["canonical"], "serial": p["seq"],
            "permanent": permanent,
            "days": 0 if permanent else p["days"],
            "durationMs": 0 if permanent else p["days"] * 86400000,
            "cardName": "永久卡" if permanent else f"{p['days']} 天卡"}


def gen(kind="P", days=0, seq=None) -> str:
    kind = "D" if kind == "D" else "P"
    days = 0 if kind == "P" else max(1, min(3650, int(days or 30)))
    seq = normalize(seq or "")
    if len(seq) != 4:
        seq = encode_bytes(os.urandom(8), 4)
    return f"{PREFIX}-{kind}{str(days).zfill(3)}-{seq}-{sign(kind, days, seq)}"


def selfcheck(js_path: str):
    """用 node 跑 license-core.cjs，逐条比对签发结果"""
    node = os.environ.get("NODE_EXE") or "node"
    cases = [("P", 0, "7K3M"), ("P", 0, "0000"), ("D", 30, "A1B2"),
             ("D", 3650, "ZZZZ"), ("D", 1, "9XQ4"), ("P", 0, "C3D4")]
    import json as _json
    js = f"""
const core = require({_json.dumps(js_path)});
const cases = {_json.dumps([list(c) for c in cases])};
const out = [];
for (const [t, d, s] of cases) {{
  out.push({{
    code: `${{core.PREFIX}}-${{t}}${{String(d).padStart(3,'0')}}-${{s}}-${{core.sign(t, d, s)}}`,
    ok: core.verifyStrict(`${{core.PREFIX}}-${{t}}${{String(d).padStart(3,'0')}}-${{s}}-${{core.sign(t, d, s)}}`).ok
  }});
}}
console.log(JSON.stringify(out));
"""
    try:
        res = subprocess.run([node, "-e", js], capture_output=True, text=True, check=True)
    except Exception as exc:  # noqa: BLE001
        print(f"跳过 JS 比对（node 不可用：{exc}）")
        return True
    import json
    js_out = json.loads(res.stdout)
    ok_all = True
    for (kind, days, seq), item in zip(cases, js_out):
        mine = gen(kind, days, seq)
        same = (mine == item["code"])
        ok_all &= same
        print(f"  {'OK ' if same else 'DIFF'} {kind}{str(days).zfill(3)}/{seq}  py={mine}")
        if not same:
            print(f"       js={item['code']}")
    print(f"  JS 交叉校验：{'全部一致' if ok_all else '存在差异'}")
    return ok_all


def main():
    ap = argparse.ArgumentParser(description="MYAI 卡密签发器")
    ap.add_argument("-d", "--days", type=int, default=0, help="有效天数（不填=永久卡）")
    ap.add_argument("-n", "--count", type=int, default=1, help="批量数量")
    ap.add_argument("-s", "--seq", help="指定 4 位序列号")
    ap.add_argument("--verify", help="校验一张卡密")
    ap.add_argument("--selfcheck", action="store_true", help="与 license-core.cjs 交叉比对")
    a = ap.parse_args()

    if a.selfcheck:
        here = os.path.dirname(os.path.abspath(__file__))
        core = os.path.join(os.path.dirname(here), "electron", "license-core.cjs")
        sys.exit(0 if selfcheck(core) else 1)

    if a.verify:
        r = verify_strict(a.verify)
        if r["ok"]:
            print(f"有效  {r['code']}  {r['cardName']}  序列号 {r['serial']}")
        else:
            print(f"无效  {r['reason']}")
        sys.exit(0 if r["ok"] else 2)

    kind = "D" if a.days > 0 else "P"
    for _ in range(max(1, a.count)):
        code = gen(kind, a.days, a.seq)
        r = verify_strict(code)
        assert r["ok"], "自签自验失败"
        print(code)


if __name__ == "__main__":
    main()
