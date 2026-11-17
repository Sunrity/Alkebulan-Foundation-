import express, { type Application, type Response, type Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoute.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Core Middlewares
const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "https://alkebulanimpact.org",
  "https://www.alkebulanimpact.org",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Base Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes); 

// Health Check Endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});