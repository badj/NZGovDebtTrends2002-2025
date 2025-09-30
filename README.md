# New Zealand Government Debt Trends (2002-2025) - Interactive Graph

> New Zealand Government Debt Trends (2002-2025) with Metrics using [Plotly Open Source Graphing JS Library (Plotly Website)](https://plotly.com/graphing-libraries/) / [Plotly Open Source Graphing JS Library (Plotly GitHub)](https://github.com/plotly/plotly.js) charting generated with historical static data from various sources *(refer to data sources provided below table section)* and end-to-end test automation coverage with [Playwright Test Framework](https://playwright.dev/) support generated with [MCP(Model Context Protocol)](https://modelcontextprotocol.io/docs/getting-started/intro).
>
> [![pages-build-deployment](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/pages/pages-build-deployment)

> - View the interactive GitHub Pages-hosted page: [NZ Governments Debt Trends 2002-2025](https://badj.github.io/NZGovDebtTrends2002-2025/)
> - **To view the standalone HTML file in your browser - Dark theme:**
>   - Download the [NZ_Governments Debt_Chart HTML file - Dark theme](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-basic-minified-embed-Dark-theme.html) - *with plotly.js (basic - minified) v1.58.5 embedded* → open HTML file in your browser.
>   - Download the [NZ_Governments Debt_Chart HTML file - Dark theme](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-v1-58-5-embed-Dark-theme.html) - *with plotly.js (not - minified) v1.58.5 embedded* → open HTML file in your browser.
>   - [NZ_Governments Debt_Chart HTML file - Dark theme](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-without-plotlyJS-embed-Dark-theme.html) - *without plotly.js embedded: requires library download from CDN using the latest plotly.js* → Open in IDE and download the latest plotly.js from CDN.
> 
> - **To view the standalone HTML file in your browser - Light theme:**
>   - Download the [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-basic-minified-embed.html) - *with plotly.js (basic - minified) v1.58.5 embedded* → open HTML file in your browser.
>   - Download the [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-v1-58-5-embed.html) - *with plotly.js (not - minified) v1.58.5 embedded* → open HTML file in your browser.
>   - [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-without-plotlyJS-embed.html) - *without plotly.js embedded: requires library download from CDN using the latest plotly.js* → Open in IDE and download the latest plotly.js from CDN.
> - The data table and all export options work directly in the browser.

> **Integrated Automated end-to-end testing:** 
> - Automated end-to-end testing has been integrated for the interactive visualisation using [Playwright](https://playwright.dev/) as the test framework:
> - The end-to-end tests verify the page and graph features, including dropdown filters, chart rendering, export options, and interactive controls.
> - [Playwright MCP (Model Context Protocol)](https://github.com/microsoft/playwright-mcp) was used with [GitHub Copilot](https://github.com/features/copilot), [Claude Sonnet](https://www.anthropic.com/claude/sonnet) and [Chat-GPT](https://chatgpt.com/) as agents for the prompts to [generate tests](.github/1-generate-tests.prompt.md) and for [fixing failing tests](.github/2-fix-failing-tests.prompt.md).
>
> [![Playwright Tests](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/main.yml/badge.svg)](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/main.yml)

> **Samples of the Interactive Graph - Dark and Light themes:**
> 
> ![chart-demo.gif](Images/chart-demo-dark.gif)
> 
> ![chart-demo.gif](Images/chart-demo-light.gif)

---
### Table of contents

- [Overview](#overview)
- [Project information](#project-information)
- [Playwright automated end-to-end tests](#playwright-automated-end-to-end-tests)
  - [Pre requisites](#pre-requisites)
  - [Setup](#setup)
  - [Run tests and generate the test run report to view test results](#run-tests-and-generate-the-test-run-report-to-view-the-test-results)
  - [CICD Integration](#cicd-integration)
  - [Playwright MCP integration with Claude Sonnet and Chat-GPT agents](#playwright-mcp-integration-with-claude-sonnet-and-chat-gpt-agents)
- [TODOs and Open Issues](#todos-and-open-issues)

---

### Overview

> Interactive Graph for New Zealand Government Debt Trends from 2002-2025 with metrics-supported features:

- **Scale Toggle Dropdown:**
  - A dropdown to switch between "Linear Scale" (default) and "Log Scale" for the right y-axis (Debt Amount, Per Capita, Population).
  - This affects only the secondary y-axis to handle the wide range of values (e.g., Debt Amount: 35–185B NZD, Per Capita: 8900–34300 NZD, Population: 3.9–5.4M).

- **Data Table graph views and dropdowns:**
  - The table is interactive and syncs with the chart’s filters (e.g., PM or Party filters adjust the table rows).
  - **Metrics Dropdown:** Toggle "All Metrics", "% GDP Only", "Amount Only", "Per Capita Only", "Population Only".
  - **Party Filter Dropdown:** Filter by "All Parties", "Labour Only", "National Only" (applies to debt metrics, not population).
  - **PM Filter Dropdown:** Filter by "All PMs", "Helen Clark", "John Key", "Bill English", "Jacinda Ardern", "Christopher Luxon".
  - **Population Colour Toggle Dropdown:** Options for "Green (Default)", "Orange", "Purple", "Hide Population".

- **Export Options:** "Export PNG" and "Export CSV" for downloading the graph image or data.
  - Buttons for the "Export Options" to toggle between a data table export (below the chart), exporting all columns (Year, Debt % GDP, Debt Amount, Per Capita, Prime Minister, Ruling Political Party, Population Count).
  - PNG: Downloads a high-resolution image (1200x750) via the "Export PNG" option.
  - CSV: Downloads a file (nz_government_debt_data.csv) with all table data.

- **Range Slider:** Zoom into specific year ranges (2002–2025).

- **Full hover tooltips:** All columns
  - Year
  - Debt % GDP
  - Amount
  - Per Capita
  - PM
  - Party
  - Population in millions

- **Party-based colouring:**
  - blue=Labour
  - red=National
  - for debt metrics, population in a separate colour.

- **PM change annotations:** Indicating PM change over.

- **The chart has four traces:** 
  - 0: % GDP
  - 1: Amount
  - 2: Per Capita
  - 3: Population in millions
 
---

### Project information

> [![pages-build-deployment](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/pages/pages-build-deployment)
> 
> - View as an Interactive GitHub Pages-hosted page: [NZ Governments Debt Trends 2002-2025](https://badj.github.io/NZGovDebtTrends2002-2025/) or 
> - As a standalone HTML file in your browser locally:
>   - Download the [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-basic-minified-embed.html) - *with plotly.js (basic - minified) v1.58.5 embedded* → open HTML file in your browser. 
>   - OR Download the [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-v1-58-5-embed.html) - *with plotly.js (not - minified) v1.58.5 embedded* → open HTML file in your browser.
>   - OR [NZ_Governments Debt_Chart HTML file](https://github.com/badj/NZGovDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-without-plotlyJS-embed.html) - *without plotly.js embedded: requires library download from CDN using the latest plotly.js* → Open in IDE → download the latest plotly.js from CDN. 
> - The data table and all export options work directly in the browser.

---

### Playwright automated end-to-end tests

> - Automated end-to-end testing has been integrated for the interactive visualisation using [Playwright](https://playwright.dev/) as the test framework:
>   - The end-to-end tests verify the page and graph features, including dropdown filters, chart rendering, export options, and interactive controls.
>   - [Playwright MCP (Model Context Protocol)](https://github.com/microsoft/playwright-mcp) was used with [GitHub Copilot](https://github.com/features/copilot), [Claude Sonnet](https://www.anthropic.com/claude/sonnet) and [Chat-GPT](https://chatgpt.com/) as agents for the prompts to [generate tests](.github/1-generate-tests.prompt.md) and for [fixing failing tests](.github/2-fix-failing-tests.prompt.md).
>
> - Playwright Key Test Coverage *(24 Tests)*:
>   - Visualisation loads and displays correctly.
>   - All dropdowns contain expected filter options.
>   - Selecting filters updates the graph as expected.
>   - Export buttons (PNG, CSV) trigger downloads.
>   - Mode bar and chart controls are present and functional.
>   - Table Data and Data Sources are present and functional.
> 
> [![Playwright Tests](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/main.yml/badge.svg)](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/main.yml)

---

### Pre-requisites

1. [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (Included with Node.js)

---
### Setup

1. Clone or Download
    - Clone this repository: `git clone https://github.com/badj/NZGovDebtTrends2002-2025.git`
    - Alternatively, download the ZIP file and extract it.
2. Navigate to Project Directory:
   ```bash
   cd NZGovDebtTrends2002-2025
   ```
3. Initialise a Node.js project
   ```bash
   npm init -y
   ```
4. Install Playwright
   ```bash
   npm i -D @playwright/test
   ```
5. Install browsers
   ```bash
   npx playwright install
   ``` 

---
### Run tests and generate the test run report to view the test results

**Test run with Playwright HTML report generation**

1. Execute the test (headless)
   ```bash
   npx playwright test
   ```
2. OR Execute the test (headed / browser opens)
   ```bash
   npx playwright test --headed
   ``` 
3. OR Execute the test with the UI
   ```bash
   npx playwright test --ui
   ```
4. OR Execute the test (headless) with increased workers to speed up the test run
   ```bash
   npx playwright test --workers=10
   ``` 
5. View the HTML report when test execution completes: ```show-report``` command prints to the terminal
   ```bash
   npx playwright show-report
   ```
- Terminal output sample of a successful test run
  ```terminaloutput
  NZGovDebtTrends2002-2025 (main) % npx playwright test --workers=10
  
  Running 24 tests using 10 workers
  24 passed (7.9s)
  
  To open last HTML report run:
  
  npx playwright show-report
  ```

---
### CICD Integration

- **GitHub Actions/Workflows:**
  - Automatically [publishes the GitHub Page](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/pages/pages-build-deployment) on every commit.
  - Automatically [runs Playwright tests](https://github.com/badj/NZGovDebtTrends2002-2025/actions/workflows/main.yml) on every commit and scheduled intervals.
- **Test Reports:** HTML reports are generated for each run and uploaded as workflow artefacts.
- **Trace & Video:** Retained on failure for debugging.

---
### Playwright MCP integration with Claude Sonnet and Chat-GPT agents

> - Usage of [Playwright MCP (Model Context Protocol)](https://github.com/microsoft/playwright-mcp) to generate a Playwright project that explores your site, write your Tests, and iterate until all tests pass.
> - Playwright MCP in Agent Mode can autonomously navigate your app, discover key functionality, and generate runnable tests — *in some cases, no manual scripting required.*
> - [GitHub Copilot](https://github.com/features/copilot) was set to use [Claude Sonnet](https://www.anthropic.com/claude/sonnet) and [Chat-GPT](https://chatgpt.com/) as agents in Agent mode.

**Configurations to enable Playwright MCP:**

1. Configure the MCP Playwright server to run locally inside your [IDE project folder](.idea/mcp.json) in a file called ```mcp.json``` *([IntelliJ IDEA / Webstorm](https://www.jetbrains.com/webstorm/) was used for this project)*

   ```JSON
   {
     "servers": {
       "playwright": {
         "command": "npx",
         "args": ["@playwright/mcp@latest"]
       }
     }
   }
   ```

2. In my project IDE folder [I added a file](.idea/settings.json) called ```settings.json```

- By adding this code, I didn’t have to click continue each time, allowing the agent to continue on its own.

  ```JSON
  {
  "chat.tools.autoApprove": true
  }
  ```

3. Prepare test prompts and add the prompt Markdown to the ```.github``` folder

- For this project, I created a prompt Markdown file [1-generate-tests](.github/1-generate-tests.prompt.md) to create the initial Playwright tests.
- For this project, I created a second prompt Markdown file [2-fix-failing-tests](.github/2-fix-failing-tests.prompt.md) to then later on continue to fix the generated Playwright tests further.

4. In the IDE, use Agent Mode, add the prompt to the context to create the initial tests and iterate until all tests pass.

- Agent mode uses the Playwright MCP to navigate to the site and use the browser to explore the app like a real user.
- Prompts prompt/instruct the agent to navigate, discover functionality, and then generate tests automatically based on its interactions.

   ```terminaloutput
   Explore https://badj.github.io/NZGovDebtTrends2002-2025/
   ```

- This generated the bulk of the test, allowing me to tweak it further to my preferences.
- After wrapping up the interactions, the agent summarises its findings to continue updating and fixing the tests as per your preferences.

5. Test Generation & Execution:
  
> The agent generates a full Playwright test file based on the interactions, and it fixes errors automatically before running each iteration of the tests.

- Once generated, it opens a terminal and runs the tests. When it passes, you can / should inspect the steps taken to confirm accuracy and check for false positives. 
- It’s a full cycle where it: MCP explores → MCP generates the tests → MCP executes the tests → MCP reviews the results of the test run. 
- **For best results:** Iterate and refine the prompts to increase the test count and prompt the agent to explore additional areas as well.

**Notes and observations during MCP usage with an agent to complete all tests to run green:**

>- Approximately 70% of the tests were created and fixed smoothly with [GitHub Copilot](https://github.com/features/copilot) set to use [Claude Sonnet 3.5](https://www.anthropic.com/claude/sonnet) and [Chat-GPT 4.1](https://chatgpt.com/) as agents using [Playwright MCP](https://github.com/microsoft/playwright-mcp).
>- Manual effort to fix and refactor some of the failing and passing tests was necessary where MCP missed the mark!

---

### TODOs and Open Issues:

**Enhancements to resolve:**

1. [Add toggle to set page to Dark or Light theme](https://github.com/badj/NZGovDebtTrends2002-2025/issues/7)

**Open Issues to resolve:**

2. [Decrease the test count after checking for duplicated coverage](https://github.com/badj/NZGovDebtTrends2002-2025/issues/2)
3. [Enable WebKit and Firefox cross-browser runners when 4 failing tests are fixed for the specific browsers encountering failures](https://github.com/badj/NZGovDebtTrends2002-2025/issues/1)

---
