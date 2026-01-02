# 📝 Todo App – React, TypeScript, Supabase, Tailwind CSS

Aplikasi **Todo List** full-stack dengan frontend **React + TypeScript** dan backend **Supabase** (PostgreSQL, Auth, RLS).

Project ini dirancang menggunakan **feature-based architecture** dan **separation of concerns**, mengikuti praktik yang umum digunakan di dunia kerja agar scalable, maintainable, dan siap dikembangkan lebih lanjut.

---

## ✨ Fitur Utama

### 🔐 Autentikasi User
- Signup dengan email & password
- Login & logout
- Persist session (tetap login setelah refresh)

### ✅ Manajemen Todo
- Membuat todo baru
- Melihat daftar todo milik user yang sedang login
- Update status selesai / belum selesai
- Edit dan hapus todo
- Field tambahan:
  - Deskripsi
  - Prioritas (low, medium, high)
  - Due date

### 🛡️ Keamanan
- Row Level Security (RLS) di Supabase
- User hanya dapat mengakses todo miliknya sendiri

### 🎨 Frontend
- React + TypeScript
- Tailwind CSS v4
- Struktur project feature-based
- Path alias untuk import yang lebih rapi

---

## 🧰 Tech Stack

### Frontend
- React  
- TypeScript  
- Vite  
- React Router  
- Zustand  
- React Hook Form + Zod  
- Tailwind CSS v4  

### Backend
- Supabase (Postgres, Auth, API, RLS)
- Database schema:
  - `todos`
  - (opsional) `categories`

---

## 📁 Struktur Folder

```bash
/todo-app
├── /public
│   └── favicon.ico
├── /src
│   ├── /assets
│   ├── /components
│   │   ├── /ui
│   │   ├── /layout
│   │   └── /form
│   ├── /features
│   │   ├── /auth
│   │   └── /todos
│   ├── /hooks
│   ├── /layouts
│   ├── /lib
│   ├── /pages
│   ├── /routes
│   ├── /services
│   ├── /store
│   ├── /types
│   ├── /utils
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
