import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { BasketPage } from "../pages/BasketPage";
import { AddressSelectPage } from "../pages/AddressSelectPage";
import { AddressCreatePage } from "../pages/AddressCreatePage";
import { login } from "../utils/login";
import { closeDisclaimer } from "../utils/closeDisclaimer";
import { HOME_PAGE } from "../utils/urls";
import { clearBasket } from "../utils/clearBasket";

test.describe("Checkout flows", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeEach(async ({ page }) => {
    await page.goto(HOME_PAGE);
    await closeDisclaimer(page);
    await login(page);
    await clearBasket(page); // Clear basket before each test
  });

  test("Login and checkout with 1 product", async ({ page }) => {
    // Init pages needed for test suite
    const searchPage = new SearchPage(page);
    const basketPage = new BasketPage(page);
    const addressSelectPage = new AddressSelectPage(page);
    const addressCreatePage = new AddressCreatePage(page);

    await closeDisclaimer(page);

    // Navigate to All Products
    await searchPage.goto();

    // Verify basket is initially empty
    expect(await basketPage.getBasketIconCount()).toEqual("0");

    await searchPage.addProductToBasket("Apple Juice (1000ml)");

    await page.waitForTimeout(5000);

    expect(await basketPage.getBasketIconCount()).toEqual("1");

    //Go to basket page
    await basketPage.goto();

    // Verfiy basket items
    await basketPage.verifyTitle("Apple Juice (1000ml)");
    await basketPage.verifyTotalPrice("1.99");

    // Checkout
    await basketPage.checkout();

    // Add new address
    await addressSelectPage.addNewAddress();

    // Fill address form
    await addressCreatePage.fillAddressForm();
    await addressCreatePage.submit();
  });

  test("Login and checkout with 2 product", async ({ page }) => {
    // Init pages needed for test suite
    const searchPage = new SearchPage(page);
    const basketPage = new BasketPage(page);
    const addressSelectPage = new AddressSelectPage(page);
    const addressCreatePage = new AddressCreatePage(page);

    await closeDisclaimer(page);

    // Navigate to All Products
    await searchPage.goto();

    // Verify basket is initially empty
    expect(await basketPage.getBasketIconCount()).toEqual("0");

    await searchPage.addProductToBasket("Apple Juice (1000ml)");
    await searchPage.addProductToBasket("Lemon Juice (500ml)");

    await page.waitForTimeout(5000);

    expect(await basketPage.getBasketIconCount()).toEqual("2");

    //Go to basket page
    await basketPage.goto();

    // Verfiy basket items
    basketPage.verifyTitle("Apple Juice (1000ml)");
    basketPage.verifyTitle("Lemon Juice (500ml)");
    basketPage.verifyTotalPrice("4.98");

    // Checkout
    await basketPage.checkout();

    // Add new address
    await addressSelectPage.addNewAddress();

    // Fill address form
    await addressCreatePage.fillAddressForm();
    await addressCreatePage.submit();
  });
});
