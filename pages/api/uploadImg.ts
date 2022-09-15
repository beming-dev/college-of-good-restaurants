import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loadedImg = req.body.img;
  let response: any;
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32mb", // Set desired value here
    },
  },
};
