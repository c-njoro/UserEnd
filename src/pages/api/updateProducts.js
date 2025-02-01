// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const updates = req.body;

  if (method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!id) {
    return res.status(400).json({
      error: "id are required,  is missing",
    });
  }
  console.log("Product to update id: ", id);

  if (!process.env.PRODUCTS_URL) {
    return res.status(500).json({ error: "USERS_URL is not defined" });
  }

  console.log(`${process.env.PRODUCTS_URL}/update/${id}`);
  console.log(updates);

  try {
    console.log("trying update");
    const response = await axios.put(
      `${process.env.PRODUCTS_URL}/update/${id}`,
      updates
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add count to cart",
      error: error,
    });
  }
}
