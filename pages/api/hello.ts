// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import usePassport from "@/hooks/usePassport";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (window !== undefined) {
    let { passports } = usePassport();
    passports.loginCallback();
  }

  res.status(200).json({ name: "John Doe" });
}
