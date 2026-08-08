import db from "../../lib/db";

export default async function handler(req, res) {
  const subs = await db.subscription.findMany();
  res.json(subs);
}
