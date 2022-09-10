import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  let response;
  try {
    response = await axios.post(`http://localhost:3000/example/${id}`);
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
}
