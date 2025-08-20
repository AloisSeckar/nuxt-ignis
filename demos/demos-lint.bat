REM lint all demos (windows version)
@echo off
FOR /F %%G IN (.\demos.txt) DO (
  @echo off
  if not "%%G"=="02_bare" (
    echo eslint check %%G
    cd %%G
    pnpm eslint
    cd ..
  )
  @echo off
)