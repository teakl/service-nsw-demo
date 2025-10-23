import { test, expect } from "@playwright/test";
import { revenueNswCalculatorsPage } from "../pages/revenueNswCalculatorsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Calculate Stamp Duty", async ({ page, baseURL }) => {
  const revenueCalculationsPage = new revenueNswCalculatorsPage(page);
  await revenueCalculationsPage.goto();
  await revenueCalculationsPage.calculateStampDuty();
  await revenueCalculationsPage.expectCalculationModalWindowVisible();
  await revenueCalculationsPage.verifyStampDutyDetails();
});
