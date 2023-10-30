import clientPromise from "@/utils/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { address, NFT } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db("Bounty");
    console.log(address);

    // Check if the wallet address already exists in the database
    const existingWallet = await db
      .collection("BTY")
      .findOne({ address: address });

    if (existingWallet) {
      await db.collection("BTY").updateOne(
        { address: address },
        {
          $set: {
            Nft: NFT,
          },
        }
      );

      res.status(200).json({
        message: "NFT minted successfully",
        data: existingWallet,
      });
    } else {
      // If the wallet address does not exist
      res.status(404).json({ msg: "User does not exist" });
    }
  } catch (e) {
    console.error("Minting Error:", e);
    res.status(500).json({ error: "An error occurred while Minting" });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
