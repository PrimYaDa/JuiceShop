import { Page } from "@playwright/test";
import { EMAIL } from "./login";
import { BASKET_PAGE } from "./urls";

export async function clearBasket(page: Page) {
  page.goto(BASKET_PAGE);
  page.waitForURL(BASKET_PAGE);
  const emailLocator = page.locator("h1 small", { hasText: EMAIL });

  try {
    await emailLocator.waitFor({ timeout: 5000 });
  } catch (e) {
    console.warn(`⚠️ Warning: Email "${EMAIL}" not found inside basket title.`);
  }

  const deleteButtons = page.locator("mat-cell.mat-column-remove button");

  const count = await deleteButtons.count();
  if (count === 0) {
    return;
  }

  while (
    (await page.locator("mat-cell.mat-column-remove button").count()) > 0
  ) {
    const firstDeleteButton = page
      .locator("mat-cell.mat-column-remove button")
      .first();
    await firstDeleteButton.click();
    await page.waitForTimeout(500);
  }
}
