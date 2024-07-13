@echo off

:: Imprimir mensaje de validación de Node.js
echo Validando si Node.js esta instalado...

node -v > nul 2>&1
if %errorlevel% neq 0 (

    echo Node.js no está instalado. Instalando...

    rem Ejecuta el comando PowerShell para configurar Chocolatey
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

    rem Ejecuta el comando PowerShell para instalar Node.js LTS con Chocolatey
    powershell -Command "choco install nodejs-lts --version=20.15.1 -y"

    echo Instalación completada.
) else (
    echo Node.js ya está instalado en este sistema.
)

:: Imprimir mensaje de validación de la carpeta node_modules
echo Validando si la carpeta node_modules existe...

:: Verificar si la carpeta node_modules existe
if not exist "node_modules" (
    echo La carpeta node_modules no existe. Ejecutando npm install...
    npm install
) else (
    echo La carpeta node_modules ya existe.
)

:: Imprimir mensaje de ejecución del script start
echo Ejecutando npm run start...
npm run start

pause
