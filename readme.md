# Node.js Express TypeScript Boilerplate

A lightweight, production-ready boilerplate for building scalable microservices using Node.js, Express, and TypeScript.

## Features

- 🚀 **TypeScript** - Type safety and better developer experience
- 📦 **Express.js** - Fast, unopinionated web framework
- 🔍 **Error Handling** - Centralized error handling with custom error classes
- 📝 **Logging** - Structured logging with Pino
- 🔄 **Request Tracing** - Correlation IDs for request tracking
- 🛡️ **Security** - Basic security with Helmet and CORS
- 🐳 **Docker** - Multi-stage builds for optimal container size
- ✨ **Code Quality** - ESLint and Prettier for consistent code style
- 🧪 **Testing Ready** - Set up for unit and integration tests

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/node-express-ts-boilerplate.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares
├── routes/         # Route definitions
├── services/       # Business logic
├── utils/          # Utility functions
└── server.ts       # Application entry point
```

## Environment Variables

| Variable     | Description      | Default     |
| ------------ | ---------------- | ----------- |
| PACKAGE_NAME | Application name | -           |
| API_VERSION  | API version      | v1          |
| API_PORT     | HTTP port        | 3000        |
| LOG_LEVEL    | Logging level    | info        |
| ENV          | Environment      | development |

## Docker Support

```bash
# Build image
docker build -t my-service .

# Run container
docker run -p 3000:3000 -e PACKAGE_NAME=appName my-service
```

## API Documentation

- `GET /api/v1/health-check` - Health check endpoint
- Additional endpoints documentation coming soon...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
