//
// Validate SignUp popup
//
import { Page, Locator, test, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly signupLink: Locator;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signupButton: Locator;
  readonly closeButton: Locator;
  readonly signupModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLink = page.locator('#signin2');
    this.usernameInput = page.locator('#sign-username');
    this.emailInput = page.locator('#sign-email');
    this.passwordInput = page.locator('#sign-password');
    this.signupButton = page.locator("button[onclick='register()']");
    this.closeButton = page.locator('#signInModal .close');
    this.signupModal = page.locator('#signInModal');
  }

  async openSignupModal() {
    await this.signupLink.click();
    await this.signupModal.waitFor({ state: 'visible' });
  }

  async fillSignupForm(username: string, email: string, password: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitSignup() {
    await this.signupButton.click();
  }

  async closeModal() {
    await this.closeButton.click();
  }
}

test('Validate Sign Up modal fields', async ({ page }) => {
  const signup = new SignupPage(page);

  await page.goto('https://demoblaze.com');
  await signup.openSignupModal();

  await expect(signup.usernameInput).toBeVisible();
  //await expect(signup.emailInput).toBeVisible(); //DefectID DEF-002 
  await expect(signup.passwordInput).toBeVisible();
  await expect(signup.signupButton).toBeVisible();
  await expect(signup.closeButton).toBeVisible();
});

//
// Validate Login popup
//

export class LoginPage {
readonly page: Page;
readonly loginLink: Locator;
readonly loginModal: Locator;
readonly usernameInput: Locator;
readonly passwordInput: Locator;
readonly loginButton: Locator;
readonly closeButton: Locator;

constructor(page: Page) {
this.page = page;
this.loginLink = page.locator('#login2');
this.loginModal = page.locator('#logInModal');
this.usernameInput = page.locator('#loginusername');
this.passwordInput = page.locator('#loginpassword');
this.loginButton = page.locator("button[onclick='logIn()']");
this.closeButton = page.locator('#logInModal .close');
}

async openLoginModal() {
await this.loginLink.click();
await this.loginModal.waitFor({ state: 'visible' });
}

async fillLoginForm(username: string, password: string) {
await this.usernameInput.fill(username);
await this.passwordInput.fill(password);
}

async submitLogin() {
await this.loginButton.click();
}

async closeModal() {
await this.closeButton.click();
}
}

test('Validate Login modal fields and login action', async ({ page }) => {
const login = new LoginPage(page);

await page.goto('https://demoblaze.com');

await login.openLoginModal();

await expect(login.usernameInput).toBeVisible();
await expect(login.passwordInput).toBeVisible();
await expect(login.loginButton).toBeVisible();

await login.fillLoginForm('testuser', 'password123');
await login.submitLogin();
});

//
// Validate Cart page
//

export class CartPage {
readonly page: Page;
readonly cartLink: Locator;
readonly cartTableRows: Locator;
readonly totalPrice: Locator;
readonly deleteButtons: Locator;
readonly placeOrderButton: Locator;

constructor(page: Page) {
this.page = page;
this.cartLink = page.locator('#cartur');
this.cartTableRows = page.locator('#tbodyid > tr');
this.totalPrice = page.locator('#totalp');
this.deleteButtons = page.locator("a[onclick^='delete']");
this.placeOrderButton = page.locator("button[data-target='#orderModal']");
}

async openCart() {
await this.cartLink.click();
await this.page.waitForURL('https://demoblaze.com/cart.html');
}

async getCartItems() {
return await this.cartTableRows.count();
}

async verifyCartNotEmpty() {
const count = await this.getCartItems();
expect(count).toBeGreaterThan(0);
}

async deleteFirstItem() {
if (await this.deleteButtons.count() > 0) {
await this.deleteButtons.first().click();
await this.page.waitForTimeout(1000);
}
}

async proceedToCheckout() {
await this.placeOrderButton.click();
}
}

test('Verify Cart page show up with Place Order button', async ({ page }) => {
const cart = new CartPage(page);

await page.goto('https://demoblaze.com');

// Open cart page
await cart.openCart();

// Validate Place Order button
await expect(cart.placeOrderButton).toBeVisible();
});