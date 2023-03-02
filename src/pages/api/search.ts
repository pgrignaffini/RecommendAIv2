import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import nc from "next-connect";
import cors from "cors";

const handler = nc()
  .use(cors())
  .get((req: NextApiRequest, res: NextApiResponse) => {
    axios
      .get(
        `${process.env.TMDB_API_URL}/search/multi?api_key=${process.env.API_KEY}&page=1&include_adult=false`,
        {
          params: req.query,
        }
      )
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
