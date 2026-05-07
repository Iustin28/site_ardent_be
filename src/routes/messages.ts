import { Router } from "express"
import { db } from "../db"
import { messages } from "../schema"

export const messagesRouter = Router()

messagesRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, company, message } = req.body

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const result = await db
      .insert(messages)
      .values({ firstName, lastName, email, company, message })
      .returning()

    res.status(201).json({ success: true, data: result[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to save message" })
  }
})