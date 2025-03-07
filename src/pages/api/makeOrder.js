// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;

  const newOrder = req.body;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ORDERS_URL) {
    return res.status(500).json({ error: "ORDERS_URL is not defined" });
  }

  try {
    console.log("trying making");
    const response = await axios.post(`${process.env.ORDERS_URL}`, newOrder);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create order ",
      error: error,
    });
  }
}
