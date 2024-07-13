@echo off

rem Verifica si Node.js está instalado
node -v > nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js no está instalado. Instalando...

    rem Ejecuta el comando PowerShell para configurar Chocolatey
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

    echo Configuración de Chocolatey completada. Instalando Node.js LTS...

    rem Instala Node.js LTS utilizando Chocolatey
    choco install nodejs-lts --version=20.15.1 -y
) else (
    echo Node.js ya está instalado.
)

pause
