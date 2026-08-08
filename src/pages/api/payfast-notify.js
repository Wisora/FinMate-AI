export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;
  console.log("PayFast notify:", data);

  // TODO: validate signature properly
  const validation = "VALID"; // placeholder

  if (validation === "VALID") {
    // Example: update subscription in DB
    // await db.subscription.update({ where: { userId: data.custom_str1 }, data: { status: "active" } });
    console.log("Payment confirmed, subscription activated.");
  }

  res.status(200).end();
}
