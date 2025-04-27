import { expect, Page } from "@playwright/test";

export class AddressSelectPage {
  constructor(private page: Page) {}

  async addNewAddress() {
    await this.page.locator('button[aria-label="Add a new address"]').click();
  }

  async selectAddress(name: string) {
    const row = this.page.locator("mat-row", {
      has: this.page.locator("mat-cell.mat-column-Name", { hasText: name }),
    });

    const radioButton = row.locator('input[type="radio"]');
    await expect(radioButton).toBeVisible();
    await radioButton.check();
  }

  async continue() {
    const continueButton = this.page.locator(
      'button[aria-label="Proceed to payment selection"]'
    );
    await continueButton.click();
  }
}
