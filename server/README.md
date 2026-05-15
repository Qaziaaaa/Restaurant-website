# Restaurant Commerce Backend Foundation

Production-grade, scalable MERN backend foundation for a restaurant commerce platform.

## Architecture Highlights
- **TypeScript**: Type safety across the board.
- **Clean Architecture**: Modular structure with controllers, services, models, and module-based logic.
- **Security**: Helmet, CORS, and rate limiting implemented.
- **Validation**: Zod for request data validation.
- **Error Handling**: Centralized global error handling with custom `AppError` and `asyncHandler`.
- **Logging**: Winston and Morgan for comprehensive logging.
- **Authentication**: JWT-based auth with role-based access control.

## Project Structure
```bash
server/
├── src/
│   ├── config/       # Environment and DB config
│   ├── constants/    # Enums and constants
│   ├── middlewares/  # Express middlewares (auth, error, validate)
│   ├── models/       # Mongoose models
│   ├── modules/      # Feature-based modules (auth, users, menu, etc.)
│   ├── routes/       # API routing
│   ├── utils/        # Utility functions (logger, jwt, etc.)
│   ├── app.ts        # App setup
│   └── server.ts     # Entry point
└── .env              # Environment variables
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### Setup
1. `cd server`
2. `npm install`
3. Create `.env` from template (included in project)
4. `npm run dev`

### API Versioning
All endpoints are prefixed with `/api/v1`.

## Core Endpoints
- `GET /api/v1/health`: Health Check
- `POST /api/v1/auth/register`: Register User
- `POST /api/v1/auth/login`: Login User
- `GET /api/v1/auth/me`: Get Current User (Protected)

## Scalability
- Modular design allows adding new features without bloating main files.
- Role-based system prepared for Customer, Admin, Chef, and Delivery.
- Docker ready for containerized deployment.
