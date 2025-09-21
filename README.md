# New Zealand Government Debt Trends (2002-2025)

> New Zealand Government Debt Trends (2002-2025) with Metrics as an Interactive Standalone HTML file with [Plotly Open Source Graphing JS Library](https://plotly.com/graphing-libraries/) 
charting.
 
---
### Table of contents

- [Overview](#overview)
- [Project information](#project-information)
- [Gotcha's / Issues and Work in Progress](#gotchas)


---

### Overview

Fully Enhanced Interactive Chart for New Zealand Government Debt with metrics-supported features:

- **Scale Toggle Dropdown:**
  - A dropdown to switch between "Linear Scale" (default) and "Log Scale" for the right y-axis (Debt Amount, Per Capita, Population).
  - This affects only the secondary y-axis to handle the wide range of values (e.g., Debt Amount: 35–185B NZD, Per Capita: 8900–34300 NZD, Population: 3.9–5.4M).

- **Data Table chart views and dropdowns:**
  - The table is interactive and syncs with the chart’s filters (e.g., PM or Party filters adjust the table rows).
  - **Metrics Dropdown:** Toggle "All Metrics", "% GDP Only", "Amount Only", "Per Capita Only", "Population Only".
  - **Party Filter Dropdown:** Filter by "All Parties", "Labour Only", "National Only" (applies to debt metrics, not population).
  - **PM Filter Dropdown:** Filter by "All PMs", "Helen Clark", "John Key", "Bill English", "Jacinda Ardern", "Christopher Luxon".
  - **Population Colour Toggle Dropdown:** Options for "Green (Default)", "Orange", "Purple", "Hide Population".

- **Export Options:** "Export PNG" and "Export CSV" for downloading the chart image or data.
  - Buttons for the "Export Options" to toggle between a data table export (below the chart), exporting all columns (Year, Debt % GDP, Debt Amount, Per Capita, Prime Minister, Ruling Political Party, Population Count).
  - PNG: Downloads a high-resolution image (1200x750) via the "Export PNG" option.
  - CSV: Downloads a file (nz_government_debt_data.csv) with all table data.

- **Range Slider:** Zoom into specific year ranges (2002–2025).
- **Full hover tooltips:** All columns (Year, Debt % GDP, Amount, Per Capita, PM, Party, Population, Population in millions).
- **Party-based colouring:** (blue=Labour, red=National) for debt metrics, population in a separate colour.
- **PM change annotations:** Indicating PM change over.

- **The chart has 4 traces:** 
  - 0: % GDP
  - 1: Amount
  - 2: Per Capita
  - 3: Population in millions

Download the [NZ_DEBT_CHART HTML File](https://github.com/badj/NZGovernmentsDebtTrends2002-2025/blob/main/NZ_DEBT_CHART-IT-plotlyJS-basic-minified-embed.html) to open in your browser. The data table and all export options work directly in the browser.

---
### Project information

> This project repo contains TODO

---

### Gotcha's

- TODO

---
