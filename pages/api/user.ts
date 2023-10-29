import clientPromise from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { address } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("Bounty");

    // Check if the wallet address already exists in the database
    const existingWallet = await db
      .collection("BTY")
      .findOne({ address: address });

    if (existingWallet) {
      // If the wallet address exists, return an error message
      res.status(200).json({
        message: "Wallet address already exists",
        data: existingWallet,
      });
    } else {
      // If the wallet address does not exist, insert it into the database
      await db
        .collection("BTY")
        .insertOne({ address: req.body, level: 1, BTY: 0, Rewards: 0 });
      res.status(200).json({ msg: "Wallet inserted successfully" });
    }
  } catch (e) {
    console.error("Update Error:", e);
    res
      .status(500)
      .json({ error: "An error occurred while updating the data" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
