const imgbbUploader = require("imgbb-uploader");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loadedImg = req.body.img;

  let response: any;
  try {
    await imgbbUploader(process.env.NEXT_PUBLIC_IMGBB_KEY, loadedImg)
      .then((res: any) => console.log(res))
      .catch((error: any) => console.log(error));
    res.send(response);
  } catch (err) {
    console.log(err);
  }
}
