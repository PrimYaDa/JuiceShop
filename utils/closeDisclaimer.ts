import { Page } from "@playwright/test";

export async function closeDisclaimer(page: Page) {
  const dismissButton = page.locator("button.close-dialog");

  if (await dismissButton.isVisible({ timeout: 3000 }).catch(() => false)) {
    await dismissButton.click();
  }
}
