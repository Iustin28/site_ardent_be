import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { messagesRouter } from "./routes/messages"
import { db } from "./db"

dotenv.config()
const app = express()

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter((origin): origin is string => Boolean(origin)),
)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true)
        return
      }

      callback(new Error("CORS blocked"), false)
    },
  }),
)
app.use(express.json({ limit: "100kb" }))

app.use("/api/messages", messagesRouter)

const PORT = process.env.PORT || 4000

async function checkDatabaseConnection() {
    try {
        await db.execute(`SELECT 1`);
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error);
        process.exit(1); // stop the server if DB connection fails
    }
}

checkDatabaseConnection();


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
