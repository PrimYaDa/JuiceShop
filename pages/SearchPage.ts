import { Page } from "@playwright/test";
import { SEARCH_PAGE } from "../utils/urls";

export class SearchPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(SEARCH_PAGE);
    await this.waitProducts();
  }

  async waitProducts() {
    await this.page.waitForSelector("mat-grid-tile");
  }

  async searchProduct(name: string) {
    const searchButton = this.page.locator("mat-icon.mat-search_icon-search");
    await searchButton.click();

    const searchInput = this.page.locator("input#mat-input-1");
    await searchInput.fill(name);
    await this.page.keyboard.press("Enter");
  }

  async getProductTitles(): Promise<string[]> {
    return await this.page
      .locator("mat-grid-tile .item-name")
      .allTextContents();
  }

  async addProductToBasket(name: string) {
    const productCards = await this.page.locator("mat-card").all();

    for (const card of productCards) {
      const title = (await card.locator(".item-name").innerText()).trim();

      if (title.toLowerCase().includes(name.toLowerCase())) {
        await card.locator('button[aria-label="Add to Basket"]').click();
        return;
      }
    }

    throw new Error(`Product containing name "${name}" not found`);
  }
}
