// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { id, quantity } = body;

  if (!id || !quantity) {
    return res.status(400).json({ error: "id and quantity are required" });
  }

  if (!process.env.PRODUCTS_URL) {
    return res.status(500).json({
      error: "Server configuration error: PRODUCTS_URL is not defined",
    });
  }

  try {
    const response = await axios.post(
      `${process.env.PRODUCTS_URL}/updateStock`,
      { id, quantity },
      {
        headers: {
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    console.log("Stock updated successfully");

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);

    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data || error.message || "Internal Server Error";

    return res.status(status).json({
      error: "Failed to update stock",
      message: errorMessage,
    });
  }
}
