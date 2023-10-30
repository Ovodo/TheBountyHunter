import clientPromise from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse<any>) {
  const { address } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Bounty");
    console.log(address);

    // Check if the wallet address already exists in the database
    const existingWallet = await db
      .collection("BTY")
      .findOne({ address: address });

    if (existingWallet) {
      let rewardIncrement: number;
      switch (existingWallet.level) {
        case 1:
          rewardIncrement = 1000;
          break;
        case 2:
          rewardIncrement = 5000;
          break;
        case 3:
          rewardIncrement = 20000;
          break;
        case 4:
          rewardIncrement = 50000;
          break;
        case 5:
          rewardIncrement = 100000;
          break;
        case 6:
          return;
        default:
          rewardIncrement = 0; // Set a default value or handle other levels as needed
      }

      if (existingWallet.level > 5) {
        alert("No more Criminals at this moment");
        return;
      }

      // Update the level and rewards
      await db.collection("BTY").updateOne(
        { address: address },
        {
          $inc: {
            level: 1,
            Rewards: rewardIncrement,
          },
        }
      );

      res.status(200).json({
        message: "Level and rewards updated",
        data: existingWallet,
      });
    } else {
      // If the wallet address does not exist
      res.status(404).json({ msg: "User does not exist" });
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
