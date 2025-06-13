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
- ⭐ Color-coded transactions (red = withdrawals, green = deposits)
- ⭐ CSV Export of transaction history
- ⭐ CSV import for bulk transactions


### ⚙️ Additional Functionality
- ⭐ Glassmorphism UI (blur + transparency)
- ⭐ Dark mode toggle
- ⭐ Conversion from EUR to KES
- ⭐ Smart categorization (e.g., "shopping" → "Fashion")

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

git clone https://github.com/sabele90/kenBank.git
cd kenbank-dashboard

### 🖥️ Frontend Setup
- npm install
- npm run dev

### 🛠️ Backend Setup
- cd backend
- npm install
- cp .env.example .env
- npm run dev

### 🗂 CSV Import Format
- cd importCsv
- This file contains the necessary headers (description, amount, account_id, category_id) and example data.
You can use it by clicking “Import CSV” on the dashboard and selecting the file to simulate a transaction upload.

📌 Final Notes

🔒 Credentials (DB_PASS & DB_HOST) are shared privately via email.

🛠 You don’t need to run any build commands. Just npm run dev on both sides.

✨ Everything is local—except the cloud database, which is hosted on Supabase.

🎉 Enjoy breaking the app
I'm looking forward to your feedback!