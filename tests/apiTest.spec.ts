import { test, expect } from "@playwright/test";

test("Should return personal and alternate names", async ({ request }) => {
  //send GET request
  const response = await request.get(
    "https://openlibrary.org/authors/OL1A.json"
  );

  //assert STATUS code
  expect(response.status()).toBe(200);

  //parse JSON response
  const body = await response.json();

  //log it into the console
  console.log(body);

  //Assertions
  expect(body.personal_name).toBe("Sachi Rautroy");
  expect(body.alternate_names).toContain("Yugashrashta Sachi Routray");
});
