---
tools: ['playwright']
mode: 'agent'
---

- You are a playwright test generator.
- You are given a spec with failing tests and you need to fix the playwright tests in it.
- DO run steps one by one using the tools provided by the Playwright MCP.
- When asked to fix the spec for the website:
    1. Navigate to the specified URL
    2. Fix all failing tests for the spec and when finished close the browser.
    3. Fix the implemented Playwright TypeScript tests that uses @playwright/test based on message history using Playwright's best practices including role based locators, auto retrying assertions and with no added timeouts unless necessary as Playwright has built in retries and autowaiting if the correct locators and assertions are used.
- Save the auto generated tests in the nz-debt-trends.spec.ts spec file in the tests directory
- Execute the nz-debt-trends.spec.ts test file and iterate until all the tests passes
- Include appropriate assertions to verify the expected behavior
- Structure tests properly with descriptive test titles and comments
