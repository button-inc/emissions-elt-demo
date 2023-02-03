// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(200)
    .json([
      { name: "My profile", type: "link", href: "/dashboard" },
      { type: "separator" },
      { name: "Settings", type: "link", href: "/video/submit" },
      { type: "separator" },
      { name: "Logout", type: "link", href: "/user/logout" },
    ]);
}
