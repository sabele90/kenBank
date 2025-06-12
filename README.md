# 💳 KenTech Banking Dashboard

This project is a **banking dashboard** developed as part of the **Frontend Developer Technical Assessment for KenTech (2025)**. It allows users to manage bank accounts, view transactions, and track balances with a clean, responsive, and accessible UI.

## 📦 Features

### 👤 User Profile
- Displays basic user information (name, email, avatar).
- Shows total income and withdrawals summary.

### 💳 Accounts
- Supports multiple accounts (e.g., EUR and KES).
- Each account displays the IBAN and current balance.
- Currency symbols dynamically rendered based on account type.

### 📊 Transactions
- View transaction history with descriptions, date, time, and amounts.
- Filter transactions by search term.
- Add, edit, and delete transactions.
- Categorization based on keywords (e.g., “shopping” -> "Fashion").
- Transactions are color-coded (red for withdrawals, green for deposits).

### ⚙️ Additional Functionalities
- Glassmorphism UI (backdrop blur + transparency).
- Dark mode toggle.

## 🧩 Tech Stack

- **React + TypeScript**
- **Chakra UI** for UI components
- **Tailwind CSS** for utility classes
- **Axios** for API calls
- **Vite** as the build tool
- **Sequelize** (backend)

## 🔧 Scripts

### Frontend

npm install      # install frontend deps
npm run dev      # start frontend (Vite)
npm run build    # build for production

### Backend
cd backend
npm install       # install backend deps
npm run dev       # run Express API with ts-node