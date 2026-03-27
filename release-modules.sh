#!/bin/bash
set -e

# service script to release sub-modules
# will prompt for npm login during run

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

ALL_MODULES=(
  "01-core"
  "02-ui"
  "03-db"
  "04-forms"
  "05-validation"
  "06-content"
  "07-utils"
)

# Filter modules by comma-separated partial names (e.g. "ui,db")
# If no argument given, process all modules
MODULES=()
if [[ -n "$1" ]]; then
  IFS=',' read -ra FILTERS <<< "$1"
  for module in "${ALL_MODULES[@]}"; do
    for filter in "${FILTERS[@]}"; do
      filter=$(echo "$filter" | xargs) # trim whitespace
      if [[ "$module" == *"$filter"* ]]; then
        MODULES+=("$module")
        break
      fi
    done
  done
  if [[ ${#MODULES[@]} -eq 0 ]]; then
    echo "No modules matched filter: $1"
    exit 1
  fi
  echo "=== Nuxt Ignis Module Release (filtered: $1) ==="
else
  MODULES=("${ALL_MODULES[@]}")
  echo "=== Nuxt Ignis Module Release (all modules) ==="
fi

echo ""

# Step 1: Bump patch version and publish each module
for module in "${MODULES[@]}"; do
  MODULE_DIR="$ROOT_DIR/modules/$module"
  PACKAGE_NAME=$(node -e "console.log(require('$MODULE_DIR/package.json').name)")
  CURRENT_VERSION=$(node -e "console.log(require('$MODULE_DIR/package.json').version)")

  NEW_VERSION=$(node -e "
    const v = '$CURRENT_VERSION'.split('.');
    v[2] = parseInt(v[2]) + 1;
    console.log(v.join('.'));
  ")

  echo "[$module] $PACKAGE_NAME: $CURRENT_VERSION -> $NEW_VERSION"

  # Update version in package.json
  node -e "
    const fs = require('fs');
    const path = '$MODULE_DIR/package.json';
    const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
    pkg.version = '$NEW_VERSION';
    fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
  "

  # Publish from module directory
  cd "$MODULE_DIR"
  pnpm publish --access public --no-git-checks
  cd "$ROOT_DIR"
done

echo ""
echo "=== Updating pnpm-workspace.yaml catalog ==="
echo ""

# Step 2: Update @nuxt-ignis/* versions in pnpm-workspace.yaml
for module in "${MODULES[@]}"; do
  MODULE_DIR="$ROOT_DIR/modules/$module"
  PACKAGE_NAME=$(node -e "console.log(require('$MODULE_DIR/package.json').name)")
  NEW_VERSION=$(node -e "console.log(require('$MODULE_DIR/package.json').version)")

  sed -i "s|'$PACKAGE_NAME': .*|'$PACKAGE_NAME': $NEW_VERSION|" "$ROOT_DIR/pnpm-workspace.yaml"
  echo "  catalog: $PACKAGE_NAME -> $NEW_VERSION"
done

echo ""
echo "=== Waiting 10s for npm registry to update ==="
sleep 10

echo ""
echo "=== Running pnpm install in /core ==="
echo ""

# Step 3: Install updated deps in core
cd "$ROOT_DIR/core"
pnpm install

echo ""
echo "=== Release complete ==="
