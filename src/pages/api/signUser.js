// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const userDetails = req.body;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.USERS_URL) {
    return res.status(500).json({ error: "USERS_URL is not defined" });
  }

  try {
    console.log("trying sign");
    const response = await axios.post(`${process.env.USERS_URL}`, userDetails);
    return res.status(201).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add user account",
      error: error,
    });
  }
}
