#!/usr/bin/env bash

# lint all demos (windows version)

set -euo pipefail

while read -r dir; do
  if [[ "$dir" != "02_bare" ]]; then
    echo "eslint check $dir"
    cd "$dir" || continue
    pnpm eslint
    cd ..
  fi
done < ./demos.txt
