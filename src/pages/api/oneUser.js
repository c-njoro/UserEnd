// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method, query } = req;

  if (method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = query;

  if (!email) {
    return res.status(400).json({ error: "Property ID is required" });
  }

  if (!process.env.USERS_URL) {
    return res.status(500).json({ error: "PRODUCTS_URL is not defined" });
  }

  try {
    const response = await axios.get(
      `${process.env.USERS_URL}/find?email=${email}`,

      {
        headers: {
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({
      error: "Failed to fetch user details",
      message: error.message,
    });
  }
}
