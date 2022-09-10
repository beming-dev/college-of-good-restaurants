// import type { NextApiRequest, NextApiResponse } from "next";
// const { Builder, By, until } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");

export default async function handler() {
  // req: NextApiRequest,
  // res: NextApiResponse
  // const { id } = req.body;
  // const driver = await new Builder()
  //   .forBrowser("chrome")
  //   .setChromeOptions(
  //     new chrome.Options()
  //       .windowSize({
  //         width: 500,
  //         height: 500,
  //       })
  //       .excludeSwitches("enable-logging")
  //       .headless()
  //   )
  //   .build();
  // try {
  //   await driver.get(`http://localhost:3000/example/${id}`);
  //   const result = await driver.findElements(By.className(".link_photo"));
  //   let result2 = await driver.wait(
  //     until.elementLocated(
  //       By.css(
  //         "#mArticle > div.cont_photo > div.photo_area > ul > li.size_l > a"
  //       )
  //     ),
  //     1000
  //   );
  //   result2 = await result2.getAttribute("style");
  //   res.send(result);
  // } catch (err) {
  //   console.log(err);
  // }
}
