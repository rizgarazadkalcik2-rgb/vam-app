#!/usr/bin/env python3
"""
Decode/encode pipeline for VAM's static bundler pages
(public/static-pages/{platform,experiences,about,bundles,destinations/*}/index.html).

These pages embed their entire source as a JSON-encoded string inside a
<script type="__bundler/template"> tag, sitting alongside a
<script type="__bundler/manifest"> tag that holds base64-encoded image
assets. The encoding was reverse-engineered by round-tripping against the
existing files:

  encode(source) == json.dumps(source, ensure_ascii=True).replace("/", "\\/")

Every forward slash is escaped as \\/ (not just "</" — ALL of them,
including e.g. inside CSS comments like "/* ... */"). Skipping this step
corrupts the page in production (per CLAUDE.md).

Usage:
  python3 static_page_codec.py decode <page-dir> <out-file>
  python3 static_page_codec.py encode <page-dir> <in-file>

<page-dir> is e.g. public/static-pages/about (must contain index.html).
decode writes the raw embedded source (HTML/JS) to <out-file> for editing.
encode reads <in-file> and re-injects it into <page-dir>/index.html,
verifying a decode(encode(x)) == x round-trip before writing.
"""
import json
import re
import sys

TEMPLATE_RE = re.compile(r'(<script type="__bundler/template">)(.*?)(</script>)', re.S)


def _extract(html: str):
    m = TEMPLATE_RE.search(html)
    if not m:
        raise SystemExit("No <script type=\"__bundler/template\"> tag found")
    return m


def decode(page_dir: str, out_file: str):
    html = open(f"{page_dir}/index.html", encoding="utf-8").read()
    m = _extract(html)
    source = json.loads(m.group(2))
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(source)
    print(f"Decoded {len(source)} chars -> {out_file}")


def encode(page_dir: str, in_file: str):
    index_path = f"{page_dir}/index.html"
    html = open(index_path, encoding="utf-8").read()
    m = _extract(html)
    new_source = open(in_file, encoding="utf-8").read()

    encoded = json.dumps(new_source, ensure_ascii=True).replace("/", "\\/")

    # Round-trip sanity check before touching the real file.
    if json.loads(encoded) != new_source:
        raise SystemExit("Round-trip check failed — refusing to write. This should never happen.")

    new_html = html[: m.start(2)] + encoded + html[m.end(2) :]
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print(f"Encoded {len(new_source)} chars back into {index_path}")


if __name__ == "__main__":
    if len(sys.argv) != 4 or sys.argv[1] not in ("decode", "encode"):
        print(__doc__)
        sys.exit(1)
    cmd, page_dir, path = sys.argv[1], sys.argv[2], sys.argv[3]
    (decode if cmd == "decode" else encode)(page_dir, path)
