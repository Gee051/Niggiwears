import User from "../../models/User";
import dbConnect from "@/app/config/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to the database
      await dbConnect();

      const { name, email, password } = req.body;

      // Create a new user
      const user = await User.create({ name, email, password });

      // Respond with a JSON object containing the newly created user
      res.status(201).json({ user });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
