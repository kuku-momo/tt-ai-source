#!/usr/bin/env python3
"""
keygen.py —— 卡密签发工具（与 electron/license-core.cjs 字节级一致）

卡密格式：MYAI-<T><DDD>-<SSSS>-<HHHHHHHH>
  T        P = 永久卡 / D = 限时卡
  DDD      000（永久）或 001~3650（有效天数）
  SSSS     4 位 Crockford Base32 序列号
  HHHHHHHH HMAC-SHA256(SECRET, "MYAI|T|DDD|SSSS") 的前 4 字节，按 Crockford Base32 展开

用法：
  python tools/keygen.py -t P -n 5                 # 5 张永久卡
  python tools/keygen.py -t D -d 90 -n 5           # 5 张 90 天卡
  python tools/keygen.py -t P --seq 7K3M           # 指定序列号
  python tools/keygen.py --verify MYAI-P000-...    # 校验一张卡
  python tools/keygen.py --selftest                # 与 license-core.cjs 交叉自检
"""
import argparse
import binascii
import hashlib
import hmac
import json
import os
import secrets
import subprocess
import sys

PREFIX = "MYAI"
SECRET = b"AI-Creation/2026/license-core/v1:9f3c1d7a5b2e48c0a6d4f19b7e83c25d"
ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"  # Crockford Base32：无 I L O U


def encode_bytes(buf: bytes, chars: int) -> str:
    """与 JS 版逐字节相同：每字节拆成 (b>>3, b&31) 两个字符，循环取用。"""
    out = []
    i = 0
    while len(out) < chars:
        byte = buf[i % len(buf)]
        out.append(ALPHABET[byte >> 3])
        out.append(ALPHABET[byte & 31])
        i += 1
    return "".join(out)[:chars]


def sign(card_type: str, days: int, seq: str) -> str:
    padded = str(days).zfill(3)
    msg = f"{PREFIX}|{card_type}|{padded}|{seq}".encode("utf-8")
    mac = hmac.new(SECRET, msg, hashlib.sha256).digest()
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
    card_type, days_s, seq, sig = body[0], body[1:4], body[4:8], body[8:]
    if card_type not in ("P", "D") or not days_s.isdigit():
        return None
    return {
        "type": card_type,
        "days": int(days_s),
        "seq": seq,
        "sig": sig,
        "canonical": f"{PREFIX}-{card_type}{days_s}-{seq}-{sig}",
    }


def verify(code: str):
    parsed = parse(code)
    if not parsed:
        return {"ok": False, "reason": "卡密格式不正确"}
    expected = sign(parsed["type"], parsed["days"], parsed["seq"])
    if not hmac.compare_digest(expected, parsed["sig"]):
        return {"ok": False, "reason": "卡密无效或已被篡改"}
    if parsed["type"] == "D" and not (0 < parsed["days"] <= 3650):
        return {"ok": False, "reason": "有效期超出允许范围"}
    permanent = parsed["type"] == "P"
    return {
        "ok": True,
        "code": parsed["canonical"],
        "serial": parsed["seq"],
        "permanent": permanent,
        "days": 0 if permanent else parsed["days"],
        "cardName": "永久卡" if permanent else f"{parsed['days']} 天卡",
        "cardType": "permanent" if permanent else "duration",
    }


MAX_DAYS = 999  # DDD 只有 3 位；上游写成 3650 会生成解析不了的卡（见 docs/BUGS.md）


def generate(card_type="P", days=0, seq=None):
    card_type = "D" if str(card_type).upper() == "D" else "P"
    if card_type == "D":
        want = int(days or 30)
        if want > MAX_DAYS:
            print(f"[warn] 有效天数 {want} 超出 3 位字段上限，已按 {MAX_DAYS} 天签发", file=sys.stderr)
        days = max(1, min(MAX_DAYS, want))
    else:
        days = 0
    seq = normalize(seq or "")
    if len(seq) != 4:
        seq = encode_bytes(secrets.token_bytes(8), 4)
    return f"{PREFIX}-{card_type}{str(days).zfill(3)}-{seq}-{sign(card_type, days, seq)}"


def selftest():
    """把 JS 内核生成的卡拿到 Python 侧校验，再反过来验一次。"""
    here = os.path.dirname(os.path.abspath(__file__))
    core = os.path.join(here, "..", "electron", "license-core.cjs")
    js = f"""
const core = require({json.dumps(core)});
const out = {{}};
out.generated = [core.generate({{type:'P'}}), core.generate({{type:'D', days:90}})];
out.signP = core.sign('P', 0, '7K3M');
out.signD = core.sign('D', 90, 'ABCD');
console.log(JSON.stringify(out));
"""
    result = subprocess.run(["node", "-e", js], capture_output=True, text=True)
    if result.returncode != 0:
        print(result.stderr, file=sys.stderr)
        return 1
    data = json.loads(result.stdout)
    ok = True
    for code in data["generated"]:
        info = verify(code)
        print(("  OK  " if info["ok"] else " FAIL ") + code + "  " + (info.get("cardName") or info.get("reason")))
        ok = ok and info["ok"]
    for card_type, days, seq, expect in (
        ("P", 0, "7K3M", data["signP"]),
        ("D", 90, "ABCD", data["signD"]),
    ):
        got = sign(card_type, days, seq)
        same = got == expect
        print(("  OK  " if same else " FAIL ") + f"sign({card_type},{days},{seq}) = {got} / js={expect}")
        ok = ok and same
    print("自检通过" if ok else "自检失败")
    return 0 if ok else 1


def main():
    parser = argparse.ArgumentParser(description="AI Creation 卡密签发/校验")
    parser.add_argument("-t", "--type", default="P", choices=["P", "D", "p", "d"], help="P 永久 / D 限时")
    parser.add_argument("-d", "--days", type=int, default=30, help="限时卡天数（1-3650）")
    parser.add_argument("-n", "--count", type=int, default=1, help="生成数量")
    parser.add_argument("--seq", default=None, help="指定 4 位序列号")
    parser.add_argument("--verify", default=None, help="校验一张卡密")
    parser.add_argument("--selftest", action="store_true", help="与 license-core.cjs 交叉自检")
    args = parser.parse_args()

    if args.selftest:
        sys.exit(selftest())

    if args.verify:
        info = verify(args.verify)
        print(json.dumps(info, ensure_ascii=False, indent=2))
        sys.exit(0 if info["ok"] else 2)

    for _ in range(max(1, args.count)):
        code = generate(args.type, args.days, args.seq)
        print(code)


if __name__ == "__main__":
    main()
