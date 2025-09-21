# 📚 Library Management System API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A full-stack library management application built with TypeScript, Express.js, and MongoDB for managing library operations including book inventory, borrowing system, and comprehensive analytics. Built with MVC architecture and deployed on Vercel.

🌐 **Live API**: [https://library-management-application-beta.vercel.app](https://library-management-application-beta.vercel.app)

## 🚀 Features

### Core Functionality

- **📖 Book Management**: Complete CRUD operations with advanced filtering and sorting
- **📋 Borrowing System**: Automated inventory management with quantity validation
- **📊 Analytics Dashboard**: Real-time statistics and reporting
- **🔒 Data Validation**: Comprehensive input validation using Zod schemas
- **⚡ Performance**: MongoDB aggregation pipelines for efficient data processing
- **🛡️ Error Handling**: Global error middleware with standardized responses
- **📝 Type Safety**: Full TypeScript implementation with strict typing

### Advanced Features

- **ISBN Uniqueness**: Enforced at database and application level
- **Genre Filtering**: Predefined categories with validation
- **Inventory Tracking**: Automatic copy deduction and availability updates
- **Borrowing Analytics**: Aggregated statistics for business insights
- **Query Optimization**: Efficient database queries with proper indexing
- **Production Ready**: Deployed on Vercel with environment configuration

## 🛠️ Tech Stack

| Category        | Technology  | Purpose                            |
| --------------- | ----------- | ---------------------------------- |
| **Runtime**     | Node.js 18+ | JavaScript runtime                 |
| **Framework**   | Express.js  | Web application framework          |
| **Language**    | TypeScript  | Type-safe JavaScript               |
| **Database**    | MongoDB     | NoSQL document database            |
| **ODM**         | Mongoose    | MongoDB object modeling            |
| **Validation**  | Zod         | Schema validation library          |
| **Development** | ts-node-dev | Development server with hot reload |
| **Linting**     | ESLint      | Code quality and consistency       |
| **Deployment**  | Vercel      | Serverless deployment platform     |

## 📁 Project Architecture

```
src/
├── app/
│   ├── controllers/          # Route handlers and business logic
│   │   ├── books.controller.ts    # Book CRUD operations
│   │   ├── borrow.controller.ts   # Borrowing system
│   │   └── stats.controller.ts    # Analytics and reporting
│   ├── models/               # Database models and schemas
│   │   ├── books.model.ts         # Book data model
│   │   └── borrow.model.ts        # Borrowing records model
│   ├── interfaces/           # TypeScript type definitions
│   │   ├── books.interface.ts     # Book type definitions
│   │   └── borrow.interface.ts    # Borrow type definitions
│   ├── middlewares/          # Custom middleware functions
│   │   └── globalErrorHandler.ts  # Global error handling
│   ├── validators/           # Input validation schemas
│   │   ├── book.zod.validator.ts  # Book validation rules
│   │   └── borrow.zod.validator.ts # Borrow validation rules
│   ├── config/               # Configuration management
│   │   └── index.ts               # Environment configuration
│   └── errors/               # Custom error classes
│       └── AppError.ts            # Application error definitions
├── middlewares/              # Global middleware
│   └── asyncHandler.ts       # Async error handling wrapper
├── app.ts                    # Application setup and configuration
└── server.ts                 # Server entry point
```

## 🔗 API Endpoints

### Books Management

#### Create Book

```http
POST /api/books
Content-Type: application/json

{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64ab3f9e2a4b5c6d7e8f9012",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Books

```http
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=10
```

**Query Parameters:**

- `filter` (optional): Filter by genre (`FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`)
- `sortBy` (optional): Sort field (default: `createdAt`)
- `sort` (optional): Sort order `asc` or `desc` (default: `desc`)
- `limit` (optional): Number of results (default: `10`)

#### Get Book by ID

```http
GET /api/books/:bookId
```

#### Update Book

```http
PUT /api/books/:bookId
Content-Type: application/json

{
  "title": "Updated Title",
  "copies": 10
}
```

#### Delete Book

```http
DELETE /api/books/:bookId
```

### Borrowing System

#### Borrow Book

```http
POST /api/borrow
Content-Type: application/json

{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

**Features:**

- Validates available copies
- Automatically deducts from inventory
- Updates book availability status
- Prevents over-borrowing

#### Get Borrowed Books Summary

```http
GET /api/borrow
```

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 3,
      "dueDates": ["2025-07-18T00:00:00.000Z", "2025-08-01T00:00:00.000Z"]
    }
  ]
}
```

### Analytics & Reporting

#### Get Analytics Summary

```http
GET /api/stats
```

**Response:**

```json
{
  "success": true,
  "message": "Analytics summary",
  "data": {
    "totalBorrowedQuantity": 17,
    "totalBorrowRecords": 6,
    "totalBooks": 42,
    "totalCopies": 203
  }
}
```

**Metrics:**

- `totalBorrowedQuantity`: Sum of all borrowed book quantities
- `totalBorrowRecords`: Total number of borrowing transactions
- `totalBooks`: Total number of unique books in inventory
- `totalCopies`: Total number of book copies across all books

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/library-management-api.git
cd library-management-api
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/library-management
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management

# Frontend Configuration (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 4. Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### 5. Code Quality

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 📊 Database Schema

### Book Model

```typescript
interface IBook {
  title: string; // Required, max 200 chars
  author: string; // Required, max 100 chars
  genre: BookGenre; // Required, enum validation
  isbn: string; // Required, unique, trimmed
  description?: string; // Optional, max 1000 chars
  copies: number; // Required, min 0, integer
  available: boolean; // Default: true
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
}

enum BookGenre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}
```

### Borrow Model

```typescript
interface IBorrowBooks {
  book: ObjectId; // Reference to Book
  quantity: number; // Required, min 1
  dueDate: Date; // Required
  createdAt: Date; // Auto-generated
  updatedAt: Date; // Auto-generated
}
```

## 🚨 Error Handling

The API implements comprehensive error handling with standardized response formats:

### Validation Error

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

### Not Found Error

```json
{
  "success": false,
  "message": "Book not found",
  "error": {
    "name": "NotFoundError",
    "statusCode": 404
  }
}
```

### Duplicate Key Error

```json
{
  "success": false,
  "message": "ISBN already exists",
  "error": {
    "name": "DuplicateKeyError",
    "field": "isbn",
    "value": "9780553380163"
  }
}
```

## 🚀 Deployment

### Vercel Deployment

The application is configured for seamless deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Set up environment variables in Vercel dashboard
3. **Build Settings**: Configure build command as `npm run build`
4. **Deploy**: Automatic deployment on every push to main branch

**Live URL**: [https://library-management-application-beta.vercel.app](https://library-management-application-beta.vercel.app)

### Environment Variables for Production

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/library-management
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

## 🧪 Testing

### Manual Testing

Use the provided Postman collection or test with curl:

```bash
# Test book creation
curl -X POST https://library-management-application-beta.vercel.app/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Book",
    "author": "Test Author",
    "genre": "FICTION",
    "isbn": "1234567890123",
    "copies": 5
  }'

# Test analytics
curl https://library-management-application-beta.vercel.app/api/stats

# Test borrowing
curl -X POST https://library-management-application-beta.vercel.app/api/borrow \
  -H "Content-Type: application/json" \
  -d '{
    "book": "BOOK_ID_HERE",
    "quantity": 1,
    "dueDate": "2025-12-31T00:00:00.000Z"
  }'
```

## 📈 Performance Considerations

- **Database Indexing**: Proper indexes on frequently queried fields
- **Aggregation Pipelines**: Efficient data processing for analytics
- **Query Optimization**: Minimal data transfer with projection
- **Error Boundaries**: Graceful error handling without crashes
- **Type Safety**: Compile-time error prevention

## 🔒 Security Features

- **Input Validation**: Comprehensive validation using Zod schemas
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Sanitization**: Safe error messages without sensitive data exposure
- **Type Safety**: Compile-time error prevention with TypeScript
- **Database Validation**: Mongoose schema validation at database level

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Raufur Islam**  
📧 [raufurislam@gmail.com](mailto:raufurislam@gmail.com)  
🌐 [Portfolio](https://raufurislam-portfolio.web.app)  
🐱 [GitHub](https://github.com/raufurislam)  
💼 [LinkedIn](https://linkedin.com/in/raufurislam)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Raufur Islam](https://github.com/raufurislam)

</div>
