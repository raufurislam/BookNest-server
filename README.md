# 📚 Library Management API

A robust, TypeScript-powered RESTful API for managing books and borrowing records in a library system. Built with Express.js, MongoDB, and Mongoose.

🌐 **Live Demo**: [library-management-application-beta.vercel.app](https://library-management-application-beta.vercel.app)

---

## 🚀 Features

- ✅ Book creation with strict validation (`title`, `isbn`, `copies`, etc.)
- ✅ ISBN uniqueness enforced
- ✅ Genre filtering & sorting
- ✅ Update & delete book records
- ✅ Borrow books with quantity validation
- ✅ Automatically updates book availability and copies
- ✅ Aggregated summary of total borrowed books
- ✅ Global error handler and clean response format
- ✅ Well-structured TypeScript backend
- ✅ Ready for production with Vercel deployment

---

## 🛠️ Tech Stack

- **Backend:** Express.js + TypeScript
- **Database:** MongoDB + Mongoose
- **Validation:** Mongoose + Zod
- **Dev Tools:** ts-node-dev, ESLint, Prettier
- **Deployment:** Vercel

---

## 📁 Project Structure

```

src/
├── app/
│   └── controllers/         // Route controllers (books, borrow)
├── models/                  // Mongoose models
├── interfaces/              // TypeScript interfaces for data types
├── middlewares/            // Global error handler
├── config/                  // DB connection logic
├── errors/                  // Custom AppError class
├── server.ts                // App entry point

```

---

## 📚 API Endpoints

### 1. 📘 Create a Book

`POST /api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

✅ **Validations**: ISBN must be unique, genre must be predefined.

---

### 2. 📖 Get All Books

`GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=5`

- Filter by genre
- Sort by any field
- Limit results

---

### 3. 🔍 Get Book by ID

`GET /api/books/:bookId`

---

### 4. ✏️ Update a Book

`PATCH /api/books/:bookId`

---

### 5. 🗑️ Delete a Book

`DELETE /api/books/:bookId`

---

### 6. 📦 Borrow a Book

`POST /api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

- Checks available copies
- Reduces count
- Marks availability `false` if no copies left

---

### 7. 📊 Borrowed Books Summary

`GET /api/borrow`

Returns total borrowed quantities per book:

```json
[
  {
    "book": {
      "title": "The Theory of Everything",
      "isbn": "9780553380163"
    },
    "totalQuantity": 5
  }
]
```

---

## 🧪 Validation & Error Format

All errors follow this standard format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a non-negative number"
      }
    }
  }
}
```

---

## 🧰 Local Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/yourname/library-management-api.git
cd library-management-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup `.env` file**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library-management
```

4. **Run in dev mode**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Start production**

```bash
npm start
```

---

## 🔒 Environment Variables

| Key           | Description               |
| ------------- | ------------------------- |
| `PORT`        | Port to run server        |
| `MONGODB_URI` | MongoDB connection string |

---

## 📦 Scripts

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start in development mode |
| `npm run build`  | Transpile TS to JS        |
| `npm start`      | Start production server   |
| `npm run lint`   | Lint your codebase        |
| `npm run format` | Auto-format your codebase |

---

## ✅ Deployment

Deployed to **Vercel**
🔗 [library-management-application-beta.vercel.app](https://library-management-application-beta.vercel.app)

---

## 👨‍💻 Author

**Raufur Islam Nayem** <br>
📧 [raufurislam@gmail.com](mailto:raufurislam@gmail.com) <br>
🌐 [Portfolio](https://raufurislam-portfolio.web.app) <br>
🐱 [GitHub](https://github.com/raufurislam) <br>
