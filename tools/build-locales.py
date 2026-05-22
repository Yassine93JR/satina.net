#!/usr/bin/env python3
"""Build assets/js/locales.js from assets/i18n/*.json (source of truth)."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
I18N_DIR = ROOT / "assets" / "i18n"
OUT_JS = ROOT / "assets" / "js" / "locales.js"


def main():
    data = {}
    for path in sorted(I18N_DIR.glob("*.json")):
        data[path.stem] = json.loads(path.read_text(encoding="utf-8"))
    OUT_JS.write_text(
        "window.SATINA_LOCALES = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"OK {OUT_JS} — {len(data)} languages")


if __name__ == "__main__":
    main()
