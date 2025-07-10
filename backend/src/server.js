import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"; // Adjust the path as necessary
import userRoutes from "./routes/user.route.js"; // Assuming you have user-related routes in user.route.js
import chatRoutes from "./routes/chat.route.js"; // Assuming you have chat-related routes in chat.route.js
import { connectDB } from "./lib/db.js"; // Ensure you have a db.js file that exports connectDB function





const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // Get the current directory name

app.use(cors({
    origin:"http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Assuming you have user-related routes in authRoutes, adjust as necessary
app.use("/api/chat",chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB(); // Ensure you have the connectDB function imported from your db.js file
});