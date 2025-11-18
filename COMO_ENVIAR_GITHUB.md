# 🚀 Como Enviar Projeto para GitHub

## 📋 **PASSO A PASSO:**

### **1. Instalar Git (se não tiver)**

Execute no PowerShell:
```powershell
winget install --id Git.Git -e --source winget
```

Ou baixe em: https://git-scm.com/download/win

**Depois reinicie o terminal.**

---

### **2. Executar o Script Automático**

Execute o arquivo:
```
ENVIAR_GITHUB.bat
```

Ou faça manualmente:

---

### **3. Comandos Manuais (se preferir)**

Abra o terminal na pasta do projeto e execute:

```bash
# 1. Inicializar Git (se ainda não fez)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer commit
git commit -m "Initial commit - Sistema Clínica Odontológica"

# 4. Conectar com seu repositório GitHub
# (Substitua pela URL do seu repositório)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# 5. Renomear branch para main
git branch -M main

# 6. Enviar para GitHub
git push -u origin main
```

---

### **4. Se o Repositório Já Existe**

Se você já criou o repositório no GitHub e ele já tem arquivos:

```bash
# Conectar com o repositório
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Puxar o que já existe (se houver)
git pull origin main --allow-unrelated-histories

# Enviar seus arquivos
git push -u origin main
```

---

### **5. Onde Pegar a URL do Repositório**

1. Acesse seu repositório no GitHub
2. Clique no botão verde **"Code"**
3. Copie a URL que aparece (HTTPS)
4. Cole no comando `git remote add origin`

Exemplo de URL:
```
https://github.com/seu-usuario/clinica-odontologica.git
```

---

## ✅ **PRONTO!**

Depois de executar, seus arquivos estarão no GitHub! 🎉

---

## 🔄 **Para Atualizar no Futuro:**

Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

