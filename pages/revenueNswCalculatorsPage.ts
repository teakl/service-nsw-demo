import { Page, Locator, expect } from "@playwright/test";

export class revenueNswCalculatorsPage {
  readonly page: Page;
  readonly passengerYesRadio: Locator;
  readonly passengerNoRadio: Locator;
  readonly purchasePriceOrValue: Locator;
  readonly checkOnlineButton: Locator;
  readonly calculateButton: Locator;
  readonly resetButton: Locator;
  readonly refreshButton: Locator;
  readonly calculateModalWindow: Locator;
  readonly modalBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passengerYesRadio = page.locator('label[for="passenger_Y"]');
    this.passengerNoRadio = page.locator('label[for="passenger_N"]');
    this.checkOnlineButton = page.getByRole("button", { name: "Check online" });
    this.purchasePriceOrValue = page.locator("#purchasePrice");
    this.calculateButton = page.locator("button.btn.btn-primary", {
      hasText: "Calculate",
    });
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.refreshButton = page.getByRole("button", { name: "Refresh" });
    this.calculateModalWindow = page.locator("h4.modal-title", {
      hasText: "Calculation",
    });
    this.modalBody = page.locator(".modal-body");
  }

  async goto() {
    await this.page.goto("/transaction/check-motor-vehicle-stamp-duty");
    await this.checkOnlineButton.click();
  }

  async calculateStampDuty() {
    await this.passengerYesRadio.click();
    await this.purchasePriceOrValue.fill("35000");
    await this.calculateButton.click();
  }

  async expectCalculationModalWindowVisible() {
    await this.calculateModalWindow.waitFor({ state: "visible" });
    await expect(this.calculateModalWindow).toHaveText("Calculation");
  }

  async verifyStampDutyDetails() {
    await this.modalBody.waitFor({ state: "visible" });

    const modalRow = this.modalBody.locator("tr", {
      hasText: "Duty payable",
    });

    await modalRow.waitFor({ state: "visible", timeout: 20000 });
    await // Assert passenger vehicle
    await expect(
      this.modalBody.locator("tr", {
        hasText: "Is this registration for a passenger vehicle?",
      })
    ).toContainText("Yes");

    // Assert purchase price
    await expect(
      this.modalBody.locator("tr", { hasText: "Purchase price or value" })
    ).toContainText("$35,000.00");

    // Assert duty payable
    await expect(modalRow).toContainText("$1,050.00");
  }
}
