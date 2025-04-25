import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import connectDB from "./app/DataBase/db.js";
import api from "./app/routes/api.js";

connectDB();
const app = express();

// Middleware setup
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
// app.use(mongoSanitize()); // Ensure this is placed correctly
// app.use(xss());

// Define a rate limit rule: max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes."
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use("/api", api);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
