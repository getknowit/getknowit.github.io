#!/usr/bin/env bash
# Build the site and check it before anything is published:
#   1. astro build succeeds
#   2. every internal link and asset in dist/ points at a file that exists
#   3. every page has a link preview (og:image) and the image is under 300 KB, so WhatsApp shows it
set -euo pipefail
cd "$(dirname "$0")/.."

npx astro build

fail=0
echo "▸ Internal links"
missing="$(grep -rhoE '(href|src|poster)="/[^"#?]*' dist --include=*.html | sed -E 's/^(href|src|poster)="//' | sort -u | while read -r p; do
  f="dist${p%/}"
  [[ -f "$f" || -f "$f.html" || -f "$f/index.html" || "$p" == "/" ]] || echo "$p"
done)"
if [[ -n "$missing" ]]; then echo "  ✗ broken:"; echo "$missing" | sed 's/^/    /'; fail=1; else echo "  ✓ all resolve"; fi

echo "▸ Link previews"
for page in dist/*.html; do
  grep -q 'property="og:image"' "$page" || { echo "  ✗ $page has no og:image"; fail=1; }
done
size=$(wc -c < public/og.png)
if (( size > 300000 )); then echo "  ✗ og.png is ${size} bytes; WhatsApp skips images over 300 KB"; fail=1; else echo "  ✓ every page, og.png ${size} bytes"; fi

exit $fail
