import { expect, Page } from "@playwright/test";
import { BASKET_PAGE } from "../utils/urls";

export class BasketPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto(BASKET_PAGE);
    await this.page.waitForURL(BASKET_PAGE);
    await this.page.waitForTimeout(3000);
  }

  async getBasketIconCount(): Promise<string> {
    const basketCounter = this.page.locator(
      'button[aria-label="Show the shopping cart"] .fa-layers-counter'
    );
    const text = await basketCounter.innerText();
    return text;
  }

  async checkout() {
    await this.page.locator("button#checkoutButton").click();
  }

  async verifyTitle(title: string) {
    const productNames = this.page.locator("mat-cell.cdk-column-product");
    await expect(productNames.filter({ hasText: title })).toHaveCount(1);
  }

  verifyTotalPrice(price: string) {
    const totalPrice = this.page.locator("#price");
    expect(totalPrice).toContainText(price);
  }
}
