@echo off
echo ========================================
echo Enviando Projeto para GitHub
echo ========================================
echo.

REM Verificar se Git está instalado
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Git nao encontrado. Instalando...
    echo.
    winget install --id Git.Git -e --source winget
    echo.
    echo Aguarde a instalacao terminar e execute este script novamente.
    echo Ou reinicie o terminal e execute novamente.
    pause
    exit /b 1
)

echo Git encontrado!
echo.

REM Verificar se já é um repositório Git
if exist .git (
    echo Repositorio Git ja inicializado.
) else (
    echo Inicializando repositorio Git...
    git init
    echo.
)

REM Adicionar todos os arquivos
echo Adicionando arquivos...
git add .
echo.

REM Verificar se há mudanças
git status --porcelain >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Nenhuma mudanca para commitar.
) else (
    echo Fazendo commit inicial...
    git commit -m "Initial commit - Sistema Clínica Odontológica"
    echo.
)

echo ========================================
echo PROXIMOS PASSOS MANUAIS:
echo ========================================
echo.
echo 1. Copie a URL do seu repositorio GitHub
echo    (exemplo: https://github.com/seu-usuario/seu-repositorio.git)
echo.
echo 2. Execute estes comandos no terminal:
echo.
echo    git remote add origin URL_DO_SEU_REPOSITORIO
echo    git branch -M main
echo    git push -u origin main
echo.
echo OU se o repositorio ja existe:
echo.
echo    git remote set-url origin URL_DO_SEU_REPOSITORIO
echo    git push -u origin main
echo.
echo ========================================
echo.
pause

