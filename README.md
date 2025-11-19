# Snackmaster – Vending Management System

A complete vending machine management system built using **HTML, CSS, JavaScript (Frontend)** and **Node.js + Express + MySQL (Backend)**. This project supports user authentication, machine monitoring, inventory tracking, and CSV-based inventory subtraction.

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login
* Encrypted password handling (backend)
* Redirects to dashboard after login

### 📊 Dashboard

* Total machines overview
* Stock alerts
* Machine list with:

  * Machine ID
  * Location
  * Stock level
  * Last refill
  * Status indicators (Active / Low Stock)

### 🧭 Machine Management

* View individual machine details
* Tab-based navigation:

  * Machine Information
  * Inventory Subtraction Tool (CSV Tool)

### 📉 CSV Inventory Subtraction Tool

Master CSV (A) − Sales CSV (B) = Remaining Inventory (C)

* Upload Master Inventory CSV
* Upload Sales CSV
* Auto calculate remaining stock
* Color-coded results
* Option to download processed CSV

### 🔄 Refill Page

* Refill percentage input
* Add refill notes
* Auto update machine stock to 100%
* Update last refill date
* Refill history display

---

## 📂 Project Structure

```
/project-root
│── index.html            # Login Page
│── register.html         # User Registration Page
│── dashboard.html        # Main Dashboard & Tools
│── styles.css            # Styling (optional)
│
└── backend/
    ├── server.js         # Express server
    ├── db.js             # MySQL connection
    ├── routes/           # Authentication APIs
    └── package.json
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/snackmaster.git
cd snackmaster
```

### 2️⃣ Backend Setup

```
cd backend
npm install
```

### 3️⃣ Create `.env` File

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_NAME=your_database_name
PORT=5000
```

### 4️⃣ Start Backend Server

```
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🌐 Frontend Usage

Open the following files directly in your browser:

* `index.html` → Login Page
* `register.html` → Create Account
* `dashboard.html` → Dashboard (after login)

---



## 📌 Notes

* This is a frontend-driven project with a functional Node.js backend.
* All dashboard data (machines, stock, refills) is currently simulated on the frontend.
* You can expand the system further to connect the dashboard with live backend APIs.

---

## 👤 Author

**Sivaji**


