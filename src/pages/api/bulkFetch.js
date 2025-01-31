// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { ids } = body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "A non-empty array of Property IDs is required" });
  }

  if (!process.env.PRODUCTS_URL) {
    return res.status(500).json({
      error: "Server configuration error: PRODUCTS_URL is not defined",
    });
  }

  try {
    const response = await axios.post(
      `${process.env.PRODUCTS_URL}/bulk`,
      { ids },
      {
        headers: {
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );
    console.log("Fetched from backend succesfully");

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);

    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data || error.message || "Internal Server Error";

    return res.status(status).json({
      error: "Failed to fetch property details",
      message: errorMessage,
    });
  }
}
