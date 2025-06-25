@echo off
FOR /F %%G IN (.\demos.txt) DO (
  @echo off
  echo "pnpm (re)install" %%G
  cd %%G
  rmdir /S /Q node_modules
  del /Q pnpm-lock.yaml
  pnpm install
  pnpm audit --production fix
  @echo off
)
