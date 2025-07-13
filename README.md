# 📚 BookNote – Personal Notes & Bookmark Manager (Backend)

BookNote is a RESTful backend service built with **Node.js**, **Express**, and **MongoDB**, allowing users to securely manage personal **notes** and **bookmarks** with tagging, search, and favorites functionality.

---

## 🚀 Features

- 🔐 JWT-based user authentication
- 📝 Full CRUD for Notes
- 🔖 Bookmark manager with auto-title fetching
- 🏷️ Tags support and search filters
- ✅ Field and URL validation
- 🛡️ Protected routes & rate limiting

---

## 🏗️ Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** with **Mongoose**
- **JWT**, **bcryptjs**
- **Axios**, **Cheerio** for scraping bookmark titles
- **dotenv**, **express-rate-limit**

---

## 📁 Folder Structure

booknote/
├── controllers/ # Auth, notes, bookmarks logic
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── middlewares/ # Authentication and rate-limiter
├── utils/ # Validators and metadata scrapers
├── config/ # Database connection (optional)
├── .env # Environment variables
├── .gitignore
├── server.js
└── README.md

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/booknote.git
cd booknote
### 2. Install dependencies
```bash
npm install
### 3. Create .env file
```bash
touch .env
Add this to your .env:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmarks
JWT_SECRET=your-secure-secret
### 4. Start the development server
```bash
npm run dev   # If using nodemon
# or
node server.js
The API will be running at http://localhost:5000
🔐 API Endpoints
| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login + get token |

📝 Notes API
All notes routes require Bearer Token
| Method | Route            | Description                             |
| ------ | ---------------- | --------------------------------------- |
| POST   | `/api/notes`     | Create a note                           |
| GET    | `/api/notes`     | Get all notes (supports `q` and `tags`) |
| GET    | `/api/notes/:id` | Get a specific note                     |
| PUT    | `/api/notes/:id` | Update a note                           |
| DELETE | `/api/notes/:id` | Delete a note                           |

🔖 Bookmarks API
All bookmarks routes require Bearer Token
| Method | Route                | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/bookmarks`     | Create bookmark (auto-fetch title)       |
| GET    | `/api/bookmarks`     | Get all bookmarks (supports `q`, `tags`) |
| GET    | `/api/bookmarks/:id` | Get a specific bookmark                  |
| PUT    | `/api/bookmarks/:id` | Update bookmark                          |
| DELETE | `/api/bookmarks/:id` | Delete bookmark                          |

🔁 Health Check
| Method | Route     | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Server health check |
🧑‍💻 Author
Sajal Chaturvedi
📧 chaturvedisajal51@amail.com
