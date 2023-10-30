import clientPromise from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { address, Rewards } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Bounty");
    console.log(address);

    // Convert the Rewards query param to a number
    const rewardsNumber = parseInt(Rewards as string, 10);

    // Check if the conversion was successful
    if (isNaN(rewardsNumber)) {
      res.status(400).json({ msg: "Invalid Rewards value" });
      return;
    }

    // Check if the wallet address already exists in the database
    const existingWallet = await db
      .collection("BTY")
      .findOne({ address: address });

    if (existingWallet) {
      // Update the level and rewards
      await db.collection("BTY").updateOne(
        { address: address },
        {
          $inc: {
            Rewards: -rewardsNumber, // This will decrement if rewardsNumber is negative
          },
        }
      );

      res.status(200).json({
        message: "Rewards updated",
        data: existingWallet,
      });
    } else {
      // If the wallet address does not exist
      res.status(404).json({ msg: "User does not exist" });
    }
  } catch (e) {
    console.error("Update Error:", e);
    res.status(500).json({ error: "An error occurred while updating rewards" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
