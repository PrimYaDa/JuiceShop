import { Page } from "@playwright/test";

export class AddressCreatePage {
  constructor(private page: Page) {}

  async fillAddressForm(name = "John Doe") {
    await this.page.fill(
      'input[placeholder="Please provide a country."]',
      "Testland"
    );
    await this.page.fill(
      'input[placeholder="Please provide a name."]',
      name
    );
    await this.page.fill(
      'input[placeholder="Please provide a mobile number."]',
      "1234567890"
    );
    await this.page.fill(
      'input[placeholder="Please provide a ZIP code."]',
      "12345"
    );
    await this.page.fill(
      'textarea[placeholder="Please provide an address."]',
      "123 Test Street"
    );
    await this.page.fill(
      'input[placeholder="Please provide a city."]',
      "Test City"
    );
    await this.page.fill(
      'input[placeholder="Please provide a state."]',
      "Test State"
    );
  }

  async submit() {
    await this.page.locator("button#submitButton").click();
  }
}
