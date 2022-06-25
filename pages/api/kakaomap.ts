import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const cheerio = require("cheerio");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  let response;
  try {
    response = await axios.post(`http://localhost:3000/example/${id}`);
  } catch (err) {
    console.log(err);
  }
  res.send(response.data);
}
