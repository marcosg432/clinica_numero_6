@echo off
echo ========================================
echo Configurar Git e Enviar para GitHub
echo ========================================
echo.

REM Adicionar Git ao PATH
set "PATH=%PATH%;C:\Program Files\Git\cmd"

echo Por favor, informe:
echo.
set /p GIT_NAME="Seu nome (ex: Joao Silva): "
set /p GIT_EMAIL="Seu email do GitHub: "
set /p GIT_URL="URL do seu repositorio GitHub (ex: https://github.com/usuario/repositorio.git): "

echo.
echo Configurando Git...
git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo Fazendo commit...
git add .
git commit -m "Initial commit - Sistema Clínica Odontológica"

echo.
echo Conectando com GitHub...
git branch -M main
git remote add origin "%GIT_URL%"

echo.
echo Enviando para GitHub...
git push -u origin main

echo.
echo ========================================
echo PRONTO! Projeto enviado para GitHub!
echo ========================================
pause

