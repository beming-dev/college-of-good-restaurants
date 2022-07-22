import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  let response;
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(
      new chrome.Options()
        .windowSize({
          width: 500,
          height: 500,
        })
        .excludeSwitches("enable-logging")
        .headless()
    )
    .build();
  try {
    await driver.get(`http://localhost:3000/example/${id}`);

    let result = await driver.findElements(By.className(".link_photo"));
    let result2 = await driver.wait(
      until.elementLocated(
        By.css(
          "#mArticle > div.cont_photo > div.photo_area > ul > li.size_l > a"
        )
      ),
      1000
    );
    result2 = await result2.getAttribute("style");
    console.log(result2);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
}
