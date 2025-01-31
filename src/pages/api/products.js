// pages/api/properties.js
import axios from "axios";
import axiosRetry from "axios-retry";

export default async function handler(req, res) {
  try {
    const { name, price, stock, category } = req.query;

    // Build query string
    const queryParams = new URLSearchParams();
    if (name) queryParams.append("name", name);
    if (price) queryParams.append("price", price);
    if (stock) queryParams.append("stock", stock);
    if (category) queryParams.append("category", category);

    const queryString = queryParams.toString();
    const url = `${process.env.PRODUCTS_URL}${
      queryString ? `?${queryString}` : ""
    }`;
    axiosRetry(axios, { retries: 3 });
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        // Add any other required headers
      },
      timeout: 10000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("API Route Error:", error);
    return res.status(500).json({
      error: "Failed to fetch properties",
      message: error.message,
    });
  }
}
