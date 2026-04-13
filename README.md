# 🎒 FindIt – College Lost & Found Platform

FindIt is a full-stack web application designed to help students report, search, and recover lost items within a college campus. Users can upload details of lost/found items, and others can browse or claim them easily.

---

## 🚀 Features

* 🔐 User Authentication (Login / Register)
* 📦 Post Lost or Found Items
* 🔍 Search & Browse Items
* 🖼️ Image Upload (via Cloudinary)
* 💬 Messaging between users
* 📱 Responsive UI

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite + TypeScript)
* Tailwind CSS
* shadcn/ui + Radix UI
* React Router
* React Query
* Axios

### 🔹 Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer (File Uploads)
* Cloudinary (Image Storage)
* bcrypt / bcryptjs

---

## 📂 Project Structure

```
findit/
│
├── frontend/       # React frontend (Vite)
├── backend/        # Express backend API
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AAK191/find-it.git
cd findit
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Overview

* `POST /auth/register` → Register user
* `POST /auth/login` → Login user
* `GET /items` → Get all items
* `POST /items` → Add lost/found item
* `GET /messages` → Get messages

---

## 🌟 How It Works

1. Users sign up / log in
2. Upload lost or found item details
3. Add images for better identification
4. Other users can search and connect
5. Items can be recovered easily

---

## 🧪 Testing

```bash
npm run test
```

---

## 📦 Build

```bash
npm run build
```

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a PR.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

Developed by **Anusha**

---

## 💡 Future Improvements

* Notifications system 🔔
* Admin dashboard 📊
* AI-based item matching 🤖
* Mobile app version 📱

---

⭐ If you like this project, give it a star on GitHub!
