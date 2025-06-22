# Library Management API

A simple Library Management System built with Express.js, TypeScript, and MongoDB.

## 🚀 Features

- ✅ **CRUD Operations** - Create, read, update, and delete books
- ✅ **Book Borrowing** - Borrow books with quantity tracking and due dates
- ✅ **Smart Filtering** - Filter books by genre, sort by different fields
- ✅ **Aggregation Pipeline** - Get borrowed books summary with total quantities
- ✅ **Business Logic** - Automatic availability control when borrowing
- ✅ **Input Validation** - Comprehensive validation with Zod and Validator
- ✅ **Error Handling** - Clear error messages for all scenarios

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd library-management-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Setup environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

   Update the `.env` file:
   \`\`\`env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/library-management
   NODE_ENV=development
   \`\`\`

4. **Start the application**
   \`\`\`bash

   # Development mode

   npm run dev

   # Production mode

   npm run build
   npm start
   \`\`\`

## 📚 API Endpoints

### Books

- **POST** `/api/books` - Create a new book
- **GET** `/api/books` - Get all books (with filtering and sorting)
- **GET** `/api/books/:bookId` - Get a specific book by ID
- **PUT** `/api/books/:bookId` - Update a book
- **DELETE** `/api/books/:bookId` - Delete a book

### Borrowing

- **POST** `/api/borrow` - Borrow a book
- **GET** `/api/borrow` - Get borrowed books summary

## 🔧 Usage Examples

### Create a Book

\`\`\`bash
curl -X POST http://localhost:5000/api/books \\
-H "Content-Type: application/json" \\
-d '{
"title": "The Theory of Everything",
"author": "Stephen Hawking",
"genre": "SCIENCE",
"isbn": "9780553380163",
"description": "An overview of cosmology and black holes.",
"copies": 5
}'
\`\`\`

### Get Books with Filtering

\`\`\`bash
curl "http://localhost:5000/api/books?filter=SCIENCE&sort=desc&limit=5"
\`\`\`

### Borrow a Book

\`\`\`bash
curl -X POST http://localhost:5000/api/borrow \\
-H "Content-Type: application/json" \\
-d '{
"book": "64ab3f9e2a4b5c6d7e8f9012",
"quantity": 2,
"dueDate": "2025-07-18T00:00:00.000Z"
}'
\`\`\`

## 🏗️ Project Structure

\`\`\`
src/
├── app/
│ ├── controllers/
│ │ ├── books.controller.ts # Book CRUD operations
│ │ └── borrow.controller.ts # Borrowing operations
│ ├── interfaces/
│ │ └── books.interface.ts # TypeScript interfaces
│ └── models/
│ └── books.model.ts # Mongoose models
├── config/
│ └── index.ts # Configuration settings
├── app.ts # Express app setup
└── server.ts # Server entry point
\`\`\`

## 🔧 Key Features Implementation

### 1. **Mongoose Static Method**

- `Book.borrowBook()` - Handles borrowing business logic

### 2. **Mongoose Instance Method**

- `book.updateAvailability()` - Updates book availability

### 3. **Mongoose Middleware**

- Pre-save hook to automatically update availability

### 4. **Aggregation Pipeline**

- Groups borrow records by book
- Sums total borrowed quantities
- Joins with book details

### 5. **Input Validation**

- Zod schemas for type-safe validation
- Validator.js for ISBN and ObjectId validation

### 6. **Business Logic**

- Automatic availability updates
- Copy tracking when borrowing
- Insufficient copies prevention

## 🧪 Testing

Test the API using tools like Postman, Insomnia, or curl with the examples above.

## 🚀 Deployment

1. **Build the project**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Set environment variables**
   \`\`\`bash
   export NODE_ENV=production
   export MONGODB_URI=your-production-mongodb-uri
   export PORT=5000
   \`\`\`

3. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

## 📝 Environment Variables

| Variable      | Description               | Default                                      |
| ------------- | ------------------------- | -------------------------------------------- |
| `PORT`        | Server port               | 5000                                         |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/library-management |
| `NODE_ENV`    | Environment mode          | development                                  |

## 🛡️ Error Handling

The API provides comprehensive error handling:

- **Validation errors** - Detailed field-specific messages
- **404 errors** - Resource not found
- **Business logic errors** - Insufficient copies, etc.
- **Database errors** - Connection and operation errors

## 📄 License

MIT License

---

**Happy Coding! 🚀**
\`\`\`
