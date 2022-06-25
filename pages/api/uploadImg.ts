const imgbbUploader = require("imgbb-uploader");
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const FormData = require("form-data");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loadedImg = req.body.img;
  let response: any;
  let form = new FormData();
  try {
    // await imgbbUploader(process.env.NEXT_PUBLIC_IMGBB_KEY, loadedImg)
    //   .then((res: any) => console.log(res))
    //   .catch((error: any) => console.log(error));
    // res.send(response);
    form.append("image", loadedImg.split(",", 2)[1]);
    response = await axios({
      method: "POST",
      url: `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      data: form,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}