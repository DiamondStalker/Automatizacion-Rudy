@echo off

rem Verifica si Node.js está instalado
node -v > nul 2>&1
if %errorlevel% equ 0 (
    rem Verifica la existencia de node_modules
    if not exist "node_modules" (
        echo Carpeta node_modules no encontrada. Ejecutando npm install...
        npm install
    ) else (
        echo Carpeta node_modules encontrada. Ejecutando npm run start...
        npm run start
    )
) else (
    echo Node.js no está instalado. Por favor, ejecuta Instalador.bat primero.
)

pause