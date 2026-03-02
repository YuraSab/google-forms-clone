# 📋 Google Forms Lite Clone (Monorepo)

---

## 📂 Структура репозиторію

Проєкт організований за допомогою **npm workspaces**:

* **`/client`** — Frontend додаток (React + Vite + TS).
* **`/server`** — Backend сервер (Node.js + GraphQL).
* **`package.json`** — Коренева конфігурація воркспейсів та скрипти автоматизації.

---

## 🛠 Технології

| Сфера | Стек технологій |
| :--- | :--- |
| **Frontend** | React, TypeScript, Redux Toolkit (RTK) |
| **Data Fetching** | RTK Query + GraphQL Code Generation |
| **Backend** | Node.js, GraphQL (Apollo/Yoga) |
| **Storage** | In-memory storage (тимчасове збереження в пам'яті) |
| **Monorepo** | npm workspaces + concurrently |
| **Styling** | CSS Modules |

---

## 🚀 Як запустити проєкт локально

### 1. Клонування репозиторію
```bash
git clone https://github.com/YuraSab/google-forms-clone.git
cd google-forms-lite-clone
```

### 2. Встановлення залежностей
Завдяки використанню npm workspaces, ця команда автоматично встановить пакети для кореня, клієнта та сервера одночасно:
```bash
npm run install-all
```

### 3. Запуск у режимі розробки
Запустіть Frontend та Backend паралельно однією командою:
```bash
npm run dev
```

### Після запуску проєкт буде доступний за адресами:

Frontend (Vite): http://localhost:5173

GraphQL Server: http://localhost:4000/graphql
