import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import nc from "next-connect";
import cors from "cors";

const handler = nc()
  .use(cors())
  .post((req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    axios
      .post(`${process.env.API_BASE_URL}/reasons/`, req.body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          res.status(500).json(error.message);
        } else {
          res.status(500).json({ message: "An unexpected error occurred" });
        }
      });
  });

export default handler;
