# 📝 Blogging Platform

A **production-ready blogging platform** built with **Node.js, Express.js, MongoDB, and JWT Authentication**.  
This application provides a system with role-based access control, allowing admins to manage blogs and moderate comments efficiently.  

---

## ✨ Features

- 🔐 **Authentication & Authorization**  
  - JWT-based auth with refresh tokens  
  - Role-based access: `superadmin` 
  - Secure password hashing (bcrypt)

- 📰 **Blog Management**  
  - Create, update, delete blogs  
  - publish support  
  - Recent blogs fetch  

- 💬 **Comment System**  
  - Add, approve, and delete comments  
  - Moderation support with admin approval  

- ⚡ **Architecture**  
  - Scalable folder structure (controllers, routes, models, middlewares)  
  - Centralized error handling  
  - Environment-based config management  

- ☁️ **Deployment**  
  - Optimized for serverless deployment on **Vercel**  
  - `.env` based configuration  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (ESM modules)  
- **Framework:** Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Auth & Security:** JWT, bcrypt, CORS  
- **Deployment:** Vercel (Serverless Functions)  

---

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Kaifuddin009/Blog-eng.git
   cd zap
