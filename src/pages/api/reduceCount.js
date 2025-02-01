// pages/api/property.js
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const { email, id } = req.body;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!email || !id) {
    return res.status(400).json({
      error: "Email and id are required, either both or one is missing",
    });
  }
  console.log("email: ", email, "id: ", id);

  if (!process.env.USERS_URL) {
    return res.status(500).json({ error: "USERS_URL is not defined" });
  }

  try {
    const response = await axios.post(
      `${process.env.USERS_URL}/reduceFavorite`,
      {
        email,
        id,
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response.status == 408) {
      return res.status(408).json({ message: "item NOT IN THE CART" });
    }
    // if (error.response.status == 404) {
    //   return res.status(404).json({ message: "USER NOT FOUND" });
    // }
    return res.status(500).json({
      message: "Failed to add count to cart",
      error: error,
    });
  }
}
