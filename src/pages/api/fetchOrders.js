// pages/api/properties.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { customerId } = req.query;

    if (!customerId) {
      return res.status(405).json({ message: "Customer id needed" });
    }

    const response = await axios.get(`${process.env.ORDERS_URL}`, {
      params: {
        customerId: customerId,
      },
      headers: {
        Accept: "application/json",
      },
      timeout: 10000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({
      error: "Failed to fetch orders",
      message: error,
    });
  }
}
