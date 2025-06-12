# 💳 KenTech Banking Dashboard

This project is a **banking dashboard** developed as part of the **Frontend Developer Technical Assessment for KenTech (2025)**. It allows users to manage bank accounts, view transactions, and track balances with a clean, responsive, and accessible UI.

---

## ⭐ Features

### 👤 User Profile
- ⭐ Displays basic user information (name, email, avatar)
- ⭐ Shows total income and withdrawals summary

### 💳 Accounts
- ⭐ Supports multiple accounts (e.g., EUR and KES)
- ⭐ Displays IBAN and current balance
- ⭐ Currency symbols rendered dynamically

### 📊 Transactions
- ⭐ View transaction history (description, date, time, amount)
- ⭐ Filter transactions by keyword
- ⭐ Add, edit, and delete transactions
- ⭐ Smart categorization (e.g., "shopping" → "Fashion")
- ⭐ Color-coded transactions (red = withdrawals, green = deposits)

### ⚙️ Additional Functionality
- ⭐ Glassmorphism UI (blur + transparency)
- ⭐ Dark mode toggle

---

## 🧩 Tech Stack

- ⚛️ **React + TypeScript**
- 🎨 **Chakra UI** for components
- 💨 **Tailwind CSS** for utility styling
- 📡 **Axios** for HTTP requests
- ⚡ **Vite** for lightning-fast build
- 🐘 **Sequelize** for backend ORM
- 🧠 **Supabase (PostgreSQL)** as the cloud database

---

## 🚀 Getting Started

### 📥 Clone the project

git clone https://github.com/your-username/kenbank-dashboard.git
cd kenbank-dashboard

### 🖥️ Frontend Setup
npm install
npm run dev

### 🛠️ Backend Setup
cd backend
npm install
cp .env.example .env

DB_NAME=postgres
DB_USER=postgres
DB_PASS=<provided-by-email>
DB_HOST=<provided-by-email>
DB_PORT=5432

npm run dev

📌 Final Notes

🔒 Credentials (DB_PASS & DB_HOST) are shared privately via email.

🛠 You don’t need to run any build commands. Just npm run dev on both sides.

✨ Everything is local—except the cloud database, which is hosted on Supabase.

🎉 Enjoy breaking the app
I'm looking forward to your feedback!