import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import * as Forma from "form-data";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loadedImg = req.body.img;
  let response: any;
  const form2 = new FormData();
  const form = new URLSearchParams();
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
    res.send(response.data.data.url);
  } catch (err) {
    console.log(err);
  }
}
