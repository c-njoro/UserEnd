import IntaSend from "intasend-node";

export default async function handler(req, res) {
  const { amount, name, email } = req.body;
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!amount || !name || !email) {
    return res.status(400).json({ message: "Amount is required" });
  }

  console.log("Email", email);

  try {
    let intasend = new IntaSend(
      process.env.INSTA_PUBLISHABLE_KEY,
      process.env.INSTA_SECRET_API,
      true // Set to false in production
    );

    let collection = intasend.collection();
    const response = await collection.charge({
      first_name: name,
      last_name: "Doe",
      email: "mwanikic314@gmail.com",
      host: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
      amount: amount,
      currency: "KES",
      api_ref: "test",
      redirect_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/thank-you`,
    });

    res
      .status(200)
      .json({ checkout_url: response.url, wholeResponse: response });
  } catch (error) {
    console.error("Charge error:", error.toString("utf8"));
    res
      .status(500)
      .json({ message: "Payment failed", error: error.toString("utf-8") });
  }
}
