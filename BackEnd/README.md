# 🚀 API .NET 10 + PostgreSQL + Scalar no macOS M4

Projeto completo utilizando:

- .NET 10
- ASP.NET Core Web API
- PostgreSQL
- Entity Framework Core
- Scaffold CRUD
- Scalar
- VS Code
- macOS Apple Silicon (M1/M2/M3/M4)

---

# 📚 Objetivo

Criar uma API REST moderna utilizando:

- Code First
- Entity Framework Core
- PostgreSQL
- Scaffold automático
- Documentação moderna com Scalar

Sem necessidade de escrever SQL manualmente.

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia   | Função              |
| ------------ | ------------------- |
| .NET 10      | Framework backend   |
| ASP.NET Core | API REST            |
| PostgreSQL   | Banco de dados      |
| EF Core      | ORM                 |
| Scalar       | Documentação API    |
| VS Code      | Editor              |
| Postgres.app | PostgreSQL no macOS |

---

# ✅ Pré-requisitos

- macOS Apple Silicon
- Internet
- Terminal
- VS Code

---

# 📦 PASSO 1 — Instalar .NET 10 (5 min)

## Download

https://dotnet.microsoft.com/pt-br/download

Escolher:

- macOS
- ARM64

---

## Verificar instalação

```bash
dotnet --version
```

---

## ✅ Resultado esperado

```bash
10.0.xxx
```

---

## 📸 Screenshot sugerido

```txt
/docs/images/dotnet-version.png
```

---

# 💻 PASSO 2 — Instalar VS Code (3 min)

## Download

https://code.visualstudio.com/

---

# 🧩 PASSO 3 — Instalar extensões VS Code (5 min)

## Instalar:

- C# Dev Kit
- C#
- Thunder Client

---

## Links

### C# Dev Kit

https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit

### C#

https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp

### Thunder Client

https://www.thunderclient.com/

---

## 📸 Screenshot sugerido

```txt
/docs/images/vscode-extensions.png
```

---

# 🐘 PASSO 4 — Instalar PostgreSQL (5 min)

## Download

https://postgresapp.com/

---

## Abrir aplicativo

Abrir:

- Applications
- Postgres.app

Clicar:

- Initialize
- Start

---

## 📸 Screenshot sugerido

```txt
/docs/images/postgres-app.png
```

---

# ⚙️ PASSO 5 — Configurar PATH no macOS (3 min)

## PostgreSQL

```bash
echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zprofile
```

---

## Tools .NET

```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zprofile
```

---

## Recarregar terminal

```bash
source ~/.zprofile
```

---

## Verificar PostgreSQL

```bash
psql --version
```

---

## ✅ Resultado esperado

```bash
psql (PostgreSQL) 18.x
```

---

# 📁 PASSO 6 — Criar Projeto (3 min)

## Criar pasta

```bash
mkdir VSCodeAPI
cd VSCodeAPI
```

---

## Criar API

```bash
dotnet new webapi -f net10.0
```

---

## Atulizar Workload do .NET

```bash
sudo dotnet workload update
```

---


## 📸 Screenshot sugerido

```txt
/docs/images/project-created.png
```

---

# 📦 PASSO 7 — Instalar Pacotes (5 min)

## PostgreSQL EF Core

```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

---

## EF Tools

```bash
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

---

## EF Design

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## Scaffold Generator

```bash
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```

---

## Compatibilidade Scaffold

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

---

## Scalar

```bash
dotnet add package Scalar.AspNetCore
```

---

# 🧰 PASSO 8 — Instalar Ferramentas Globais (3 min)

## Entity Framework

```bash
dotnet tool install --global dotnet-ef
```

---

## Scaffold Generator

```bash
dotnet tool install --global dotnet-aspnet-codegenerator
```

---

## ✅ Resultado esperado

```bash
Tool 'dotnet-ef' installed successfully.
```

---

# 🧱 PASSO 9 — Criar Model Produto (5 min)

## Criar pasta

```txt
Models/
```

---

## Criar arquivo

```txt
Models/Produto.cs
```

---

## Código

```csharp
namespace VSCodeAPI.Models;

public class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public decimal Preco { get; set; }
}
```

---

# 🗄️ PASSO 10 — Criar DbContext (5 min)

## Criar arquivo

```txt
Models/AppDbContext.cs
```

---

## Código

```csharp
using Microsoft.EntityFrameworkCore;

namespace VSCodeAPI.Models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Produto> Produtos => Set<Produto>();
}
```

---

# 🔌 PASSO 11 — Configurar appsettings.json (2 min)

## Adicionar:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Database=escola_db;Username=postgres"
}
```

---

# ⚡ PASSO 12 — Configurar Program.cs (5 min)

## Código completo

```csharp
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using VSCodeAPI.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// app.UseHttpsRedirection();

app.MapGet("/", () => "API funcionando 🚀");

app.MapControllers();

app.Run();
```

---

# 🧬 PASSO 13 — Criar Migration (2 min)

```bash
dotnet ef migrations add InitialCreate
```

---

## ✅ Resultado esperado

```bash
Done.
```

---

# 🏗️ PASSO 14 — Criar Banco Automaticamente (2 min)

```bash
dotnet ef database update
```

---

## ✅ Resultado esperado

```bash
Applying migration...
Done.
```

---

# 🤖 PASSO 15 — Gerar CRUD Automático (2 min)

```bash
dotnet aspnet-codegenerator controller \
-name ProdutosController \
-m Produto \
-dc AppDbContext \
-api \
-outDir Controllers
```

---

## ✅ Resultado esperado

```bash
Added Controller : Controllers/ProdutosController.cs
```

---

## 📸 Screenshot sugerido

```txt
/docs/images/scaffold-controller.png
```

---

# ▶️ PASSO 16 — Executar API (1 min)

```bash
dotnet watch run
```

---

## ✅ Resultado esperado

```bash
Now listening on: http://localhost:5189
```

---

# 🌐 PASSO 17 — Testar API (2 min)

## Rota principal

```txt
http://localhost:5189
```

---

## Resultado esperado

```txt
API funcionando 🚀
```

---

# 📦 PASSO 18 — Testar CRUD Produtos

## Endpoint

```txt
http://localhost:5189/api/produtos
```

---

## Resultado esperado

```json
[]
```

---

# 📚 PASSO 19 — Abrir Scalar (1 min)

## Abrir:

```txt
http://localhost:5189/scalar
```

---

## Resultado esperado

Interface moderna da API.

---

## 📸 Screenshot sugerido

```txt
/docs/images/scalar-open.png
```

---

# 🧪 PASSO 20 — Testar POST no Scalar

## Endpoint

```txt
POST /api/produtos
```

---

## Body

```json
{
  "nome": "Notebook",
  "preco": 3500
}
```

---

## Resultado esperado

```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3500
}
```

---

# 🧠 Fluxo Moderno Utilizado

```txt
Model C#
↓
Migration
↓
Banco Automático
↓
Scaffold CRUD
↓
API REST
↓
Scalar
```

---

# 📁 Estrutura Final

```txt
VSCodeAPI/
│
├── Controllers/
│   └── ProdutosController.cs
│
├── Models/
│   ├── Produto.cs
│   └── AppDbContext.cs
│
├── Migrations/
│
├── Program.cs
├── appsettings.json
└── VSCodeAPI.csproj
```

---

# ❌ Troubleshooting

---

## Problema: Porta em uso

### Erro

```txt
address already in use
```

---

### Solução

```bash
lsof -i :5189
kill -9 PID
```

---

## Problema: dotnet-ef não encontrado

### Solução

```bash
echo 'export PATH="$PATH:$HOME/.dotnet/tools"' >> ~/.zprofile
source ~/.zprofile
```

---

## Problema: psql não encontrado

### Solução

```bash
echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zprofile
source ~/.zprofile
```

---

## Problema: HTTPS

### Erro

```txt
Failed to determine the https port for redirect
```

---

### Solução

Comentar:

```csharp
// app.UseHttpsRedirection();
```

---

# 🚀 Próximos Passos

- DTOs
- FluentValidation
- JWT
- AutoMapper
- Repository Pattern
- Services
- Docker
- Deploy
- Clean Architecture

---

# 👨‍🏫 Projeto Educacional

Projeto desenvolvido para estudos de:

- APIs REST
- .NET 10
- PostgreSQL
- Entity Framework Core
- Scaffold
- Scalar
- macOS Apple Silicon

---
