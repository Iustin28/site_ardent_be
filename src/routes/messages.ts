import { Router } from "express"
import { db } from "../db"
import { messages } from "../schema"

export const messagesRouter = Router()

const MAX_LENGTHS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  company: 150,
  message: 5000,
} as const

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

messagesRouter.post("/", async (req, res) => {
  try {
    const firstName = String(req.body?.firstName ?? "").trim()
    const lastName = String(req.body?.lastName ?? "").trim()
    const email = String(req.body?.email ?? "").trim()
    const company = String(req.body?.company ?? "").trim()
    const message = String(req.body?.message ?? "").trim()

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    if (
      firstName.length > MAX_LENGTHS.firstName ||
      lastName.length > MAX_LENGTHS.lastName ||
      email.length > MAX_LENGTHS.email ||
      company.length > MAX_LENGTHS.company ||
      message.length > MAX_LENGTHS.message
    ) {
      return res.status(400).json({ error: "One or more fields are too long" })
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" })
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
