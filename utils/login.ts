import { Page } from "@playwright/test";
import { LOGIN_PAGE } from "./urls";

// Have to register a new user to test login if it's banned on the website already
export const EMAIL = "primyada.bus@gmail.com";
const PASSWORD = "Prim@353682";

export async function login(page: Page) {
  await page.goto(LOGIN_PAGE);

  await page.fill("input#email", EMAIL);
  await page.fill("input#password", PASSWORD);
  await page.click("button#loginButton");

  await page.waitForTimeout(2000);
}
