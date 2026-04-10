#!/usr/bin/env bash

# install all deps (windows version)

set -euo pipefail

while read -r dir; do
  echo "pnpm (re)install $dir"
  cd "$dir" || continue

  rm -rf node_modules

  pnpm install
  pnpm audit --production fix

  cd ..
done < ./demos.txt
