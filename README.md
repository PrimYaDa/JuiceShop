# Shop Tests

This project contains automated Playwright tests for the [OWASP Juice Shop](https://juice-shop.herokuapp.com/) website.

The goal is to verify basic shopping functionalities like adding products to the basket, checking out, and managing addresses.

---

## Getting Started

### 1. Install dependencies

Make sure you have Node.js installed, then run:

```bash
npm install
```

### 2. Run tests

#### Run all tests headlessly

```bash
npm run test
```

#### Run tests with the Playwright UI

```bash
npm run test:ui
```

---

## Project Structure

```
.
├── pages/          # Page Object Models for different pages
│   ├── AddressCreatePage.ts
│   ├── AddressSelectPage.ts
│   ├── BasketPage.ts
│   ├── SearchPage.ts
│
├── tests/          # Playwright test files
│   ├── checkout.test.ts
│
├── utils/          # Helper utilities and constants
│   ├── clearBasket.ts
│   ├── closeDisclaimer.ts
│   ├── login.ts
│   ├── urls.ts
│
├── package.json
├── README.md
└── playwright.config.ts (optional) # Playwright test runner configuration
```

## Tech Stack

- Playwright
- Node.js
- TypeScript
