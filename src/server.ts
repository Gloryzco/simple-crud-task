import "reflect-metadata";
import http from 'http';
import app from "./app";
import config from "./core/config/config";

const httpServer = http.createServer(app);

// Start the server
const port = config.port || 3033;
// const port = config.port;
httpServer.listen(port, async () => {
  console.warn(`Server started at port: ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    httpServer.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    httpServer.close(() => {
        process.exit(1);
    });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
    httpServer.close(() => {
        console.error('Process terminated');
        process.exit(1);
    });
});

process.on('ECONNREFUSED', () => {
  httpServer.close(() => {
      console.error('DB not connecting');
      process.exit(1);
  });
});
