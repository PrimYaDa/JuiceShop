import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { HOME_PAGE } from "../utils/urls";
import { closeDisclaimer } from "../utils/closeDisclaimer";

test.describe("Search flows", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_PAGE);
    await closeDisclaimer(page);
  });

  test("Search for apple and check results", async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.goto();
    await searchPage.searchProduct("apple");
    await searchPage.waitProducts();

    const titles = await searchPage.getProductTitles();

    // Should be 2 "apple" products
    expect(
      titles.filter((title) => title.toLowerCase().includes("apple"))
    ).toHaveLength(2);

    // Should not contain "banana" product
    expect(
      titles.some((title) => title.toLowerCase().includes("banana"))
    ).toBeFalsy();
  });
});
