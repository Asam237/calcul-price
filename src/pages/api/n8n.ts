import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  res.status(200).json({
    order: {
      id: 12345,
      customer: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
      },
      items: [
        {
          product: "Laptop",
          quantity: 1,
          price: 1200,
        },
      ],
    },
  });
}
