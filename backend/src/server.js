import express from "express";
import notesRoutes from "./routes/notesRouts.js";
import { connectdb } from "./config/db.js";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

// REQUIRED for Render / Upstash
app.set("trust proxy", 1);

// CORS 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Rate limiter (apply before routes)
app.use(rateLimiter);

// Request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/notes", notesRoutes);

// DB + Server start
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
