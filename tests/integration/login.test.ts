import { describe, before, after } from "mocha";
import puppeteer from "puppeteer";
import { expect } from "chai";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.TEST_FIXTURE_USERNAME;
const password = process.env.TEST_FIXTURE_PASSWORD;
const url = "http://localhost:3000";
let browser;
let page;

describe("Login page", () => {
  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto(`${url}/login`);
    page.waitForTimeout(10000);
  });

  after(async () => {
    await browser.close();
  });

  it("should allow a user to log in", async () => {
    await page.goto(`${url}/login`);
    await page.type("#email", username);
    await page.type("#password", password);
    await page.click("[type='submit']");
    await page.waitForNavigation();

    const logout = await page.$(".sticky-logout");
    expect(typeof logout === "undefined").to.equal(false);

    if (typeof logout === "undefined") {
      await page.screenshot({ path: "login-failure.png" });
    }

    await page.click(".sticky-logout");
  });
});
