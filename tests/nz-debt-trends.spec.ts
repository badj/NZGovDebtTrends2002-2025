import { test, expect } from '@playwright/test';

test.describe('NZ Government Debt Trends Website - features and functionality tests', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('https://badj.github.io/NZGovDebtTrends2002-2025/');
            // Wait for the visualisation to be fully loaded
            await expect(page.locator('.js-plotly-plot')).toBeVisible();
        });

    test('Basic visualisation elements displayed', async ({ page }) => {
        
        // Verify main plot container
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Verify the main plot layers exist
        await expect(page.locator('.cartesianlayer')).toBeVisible();

        // Check for plotting area
        await expect(page.locator('.plot-container')).toBeVisible();
    });

    test('Interactive elements displayed', async ({ page }) => {
        
        // Get the plot container and its dimensions
        const plotContainer = page.locator('.js-plotly-plot');
        const box = await plotContainer.boundingBox();

        if (box) {
            // Move to the center of the plot
            await page.mouse.move(
                box.x + box.width / 2,
                box.y + box.height / 2
            );

            // Verify the presence of interactive elements
            const dragElements = page.locator('.drag');
            await expect(page.locator('.cartesianlayer')).toBeVisible();
            await expect(dragElements).toHaveCount(14);
            for (let i = 0; i < 14; i++) {
                await expect(dragElements.nth(i)).toBeVisible();
            }
        }
    });

    test('Mouse interactions handled', async ({ page }) => {
        
        // Get the plot container
        const plotContainer = page.locator('.js-plotly-plot');
        const box = await plotContainer.boundingBox();

        if (box) {
            // Move mouse to different areas of the plot
            await page.mouse.move(
                box.x + box.width / 2,
                box.y + box.height / 2
            );

            // Short wait for any hover effects
            await page.waitForTimeout(100);

            // Verify plot remains responsive
            await expect(plotContainer).toBeVisible();
            await expect(page.locator('.cartesianlayer')).toBeVisible();
        }
    });

    test('Visualisations loaded and displayed', async ({ page }) => {
       
        // Verify the page title
        await expect(page).toHaveTitle('NZ Government Debt Interactive Chart with Table and References');

        // Check if the main visualisation element is present
        await expect(page.locator('.js-plotly-plot')).toBeVisible();
    });

    test('Visualisation components displayed', async ({ page }) => {

        // Wait for and verify the Plotly graph container
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Verify the plot layout elements
        await expect(page.locator('.plot-container')).toBeVisible();

        // Verify that at least one gridlayer exists
        const gridLayer = page.locator('.gridlayer').first();
        await expect(gridLayer).toBeVisible();
    });

    test('Data table and Data References are displayed', async ({ page }) => {

        // Verify table is present and has basic structure
        const table = page.locator('table');
        await expect(table).toBeVisible();

        // Check for specific data source
        await expect(page.getByRole('link', { name: 'Statistics New Zealand -' })).toBeVisible();

        // Verify table headers
        const yearHeader = page.getByRole('cell', { name: 'Year' }).first();
        await expect(yearHeader).toBeVisible();
    });

    test('Available plot controls are available', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot area and wait for controls
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Check for basic modebar presence
        await expect(page.locator('.modebar')).toBeVisible();

        // Check for drag mode controls
        await expect(page.locator('a[data-attr="dragmode"]').first()).toBeVisible();

        // Check for zoom controls
        await expect(page.locator('a[data-attr="zoom"]').first()).toBeVisible();

        // Check for download option
        await expect(page.locator('a[data-title*="Download"]').first()).toBeVisible();

        // Check for autoscale/reset
        await expect(page.locator('a[data-title*="Reset"]').first()).toBeVisible();
    });

    test('Export PNG button downloads visualisation image', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Show modebar by hovering over plot
        await plotContainer.hover();
        await page.waitForTimeout(500);

        // Setup download handler
        const downloadPromise = page.waitForEvent('download');

        // Find and click the PNG download button
        const pngButton = page.getByRole('button', { name: 'Export PNG' });
        await expect(pngButton).toBeVisible();
        await pngButton.click();

        // Wait for the download
        const download = await downloadPromise;

        // Verify the downloaded file
        expect(download.suggestedFilename()).toMatch(/\.png$/);
    });

    test('Export CSV button downloads data table', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Show modebar by hovering over plot
        await plotContainer.hover();
        await page.waitForTimeout(500);

        // Setup download handler
        const downloadPromise = page.waitForEvent('download');

        // Find and click the CSV download button
        const pngButton = page.getByRole('button', { name: 'Export CSV' });
        // await page.getByRole('button', { name: 'Export PNG' }).click();
        await expect(pngButton).toBeVisible();
        await pngButton.click();

        // Wait for the download
        const download = await downloadPromise;

        // Verify the downloaded file
        expect(download.suggestedFilename()).toMatch(/\.csv$/);
    });

    test('Plot interaction modes works', async ({ page }) => {

        // Wait for plot
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Get plot dimensions for interaction
        const box = await plotContainer.boundingBox();
        if (!box) throw new Error('Plot container not found');

        // Test different interaction modes
        const modes = ['zoom', 'pan'];

        for (const mode of modes) {
            // Show modebar
            await plotContainer.hover();
            await page.waitForTimeout(500);

            // Click mode button
            const modeButton = page.locator(`.modebar-btn[data-title*="${mode}"i]`).first();
            await expect(modeButton).toBeVisible();
            await modeButton.click();

            // Verify plot remains interactive
            await expect(plotContainer).toBeVisible();
            await expect(page.locator('.draglayer')).toBeVisible();
        }
    });

    test('Plot type options works', async ({ page }) => {

        // Wait for plot
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot to show modebar
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Look for trace type button if available
        const traceButton = page.locator('.modebar-btn[data-title*="trace"i], .modebar-btn[data-title*="type"i]');

        if (await traceButton.isVisible()) {
            await traceButton.click();
            await page.waitForTimeout(500);

            // Check for common plot types in the menu
            const plotTypes = ['scatter', 'line', 'bar'];
            for (const type of plotTypes) {
                const typeOption = page.getByText(type, { exact: false });
                if (await typeOption.isVisible()) {
                    console.log(`Found plot type option: ${type}`);
                }
            }
        }

        // Verify plot remains visible
        await expect(plotContainer).toBeVisible();
    });

    test('Plot interactions work', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Wait for modebar to appear
        await plotContainer.hover();
        const modebar = page.locator('.modebar');
        await expect(modebar).toBeVisible();

        // Debugging: Log the full HTML of the modebar //TODO: Remove at some point - keeping for future debugging reference!
        // const modebarHTML = await modebar.innerHTML();
        // console.log('Modebar HTML:', modebarHTML);

        // Get plot dimensions
        const box = await plotContainer.boundingBox();
        if (!box) {
            throw new Error('Could not get plot dimensions');
        }

        // Test zoom interaction
        const zoomButton = page.locator('a.modebar-btn[data-attr="dragmode"][data-val="zoom"]');
        await expect(zoomButton).toBeVisible();
        await zoomButton.click();

        // Perform zoom action
        await page.mouse.move(box.x + box.width / 4, box.y + box.height / 4);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 3/4, box.y + box.height * 3/4);
        await page.mouse.up();

        // Reset axes
        const resetButton = page.locator('a.modebar-btn[data-attr="zoom"][data-val="reset"]');
        await expect(resetButton).toBeVisible();
        await resetButton.click();

        // Verify plot is still visible after interactions
        await expect(plotContainer).toBeVisible();
    });

    test('Verify plot controls and options', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot area and wait for controls
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Check for basic modebar presence
        await expect(page.locator('.modebar')).toBeVisible();

        // Check for drag mode controls
        await expect(page.locator('a[data-attr="dragmode"]').first()).toBeVisible();

        // Check for zoom controls
        await expect(page.locator('a[data-attr="zoom"]').first()).toBeVisible();

        // Check for download option
        await expect(page.locator('a[data-title*="Download"]').first()).toBeVisible();

        // Check for autoscale/reset
        await expect(page.locator('a[data-title*="Reset"]').first()).toBeVisible();
    });

    test('All interactive modes work', async ({ page }) => {

        // Wait for plot
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Get plot dimensions
        const box = await plotContainer.boundingBox();
        if (!box) throw new Error('Plot container not found');

        // Hover to show controls
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Test drag mode
        const dragButton = page.locator('a[data-attr="dragmode"]').first();
        await expect(dragButton).toBeVisible();
        await dragButton.click();

        // Verify plot remains interactive
        await expect(page.locator('.draglayer')).toBeVisible();

        // Try some interactions
        await page.mouse.move(box.x + box.width / 4, box.y + box.height / 4);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.up();

        // Reset view
        const resetButton = page.locator('a[data-title*="Reset"]').first();
        await resetButton.click();

        // Verify plot is still visible
        await expect(plotContainer).toBeVisible();
    });

    test('Visualisation changes are handled', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Interact with plot controls
        const buttons = await page.locator('.modebar-btn').all();

        // Try each control button
        for (const button of buttons) {
            const isVisible = await button.isVisible();
            if (isVisible) {
                await button.click();
                // Verify plot stays visible
                await expect(plotContainer).toBeVisible();
            }
        }

        // Reset view
        const resetButton = page.locator('a[data-title*="Reset"]').first();
        if (await resetButton.isVisible()) {
            await resetButton.click();
        }
    });

    test('All plot controls interactive as expected', async ({ page }) => {

        // Wait for plot to be visible and interactive
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot area to reveal controls
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Verify the modebar appears
        const modebar = page.locator('.modebar');
        await expect(modebar).toBeVisible();

        // Check for available plot controls using the correct data attributes
        const plotControls = [
            { attr: 'dragmode', val: 'zoom' },      // Zoom mode
            { attr: 'dragmode', val: 'pan' },       // Pan mode
            { attr: 'dragmode', val: 'select' },    // Box select
            { attr: 'zoom', val: 'in' },            // Zoom in
            { attr: 'zoom', val: 'out' },           // Zoom out
            { attr: 'zoom', val: 'reset' }          // Reset axes (corrected locator)
        ];

        // Check each control
        for (const control of plotControls) {
            const button = page.locator(`.modebar-btn[data-attr="${control.attr}"]${control.val ? `[data-val="${control.val}"]` : ''}`).first();
            await expect(button).toBeVisible();

            // Click the control to verify it's interactive
            await button.click();

            // Verify the plot remains visible
            await expect(plotContainer).toBeVisible();
        }
    });

    test('Download plot as PNG options downloading as expected', async ({ page }) => {

        // Wait for plot
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Show modebar
        await plotContainer.hover();
        await page.waitForTimeout(1000);

        // Find the download button (adjusted locator)
        const downloadButton = page.locator('.modebar-btn[data-title="Download plot as a png"]');
        await expect(downloadButton).toBeVisible();
        await downloadButton.click();

        // Verify plot stays visible
        await expect(plotContainer).toBeVisible();
    });

    test('Data point interaction interacting as expected', async ({ page }) => {

        // Wait for plot
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Move mouse over plot area
        const box = await plotContainer.boundingBox();
        if (box) {
            // Move to several points to check for tooltips
            const points = [
                { x: 0.25, y: 0.25 },
                { x: 0.5, y: 0.5 },
                { x: 0.75, y: 0.75 }
            ];

            for (const point of points) {
                await page.mouse.move(
                    box.x + box.width * point.x,
                    box.y + box.height * point.y
                );
                await page.waitForTimeout(100);
            }
        }

        // Verify plot remains responsive
        await expect(plotContainer).toBeVisible();
    });

    test('Plot interactions interacting as expected', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Show modebar by hovering over plot
        await plotContainer.hover();
        const modebar = page.locator('.modebar');
        await expect(modebar).toBeVisible();

        // Test zoom mode
        const zoomButton = page.locator('.modebar-btn[data-attr="dragmode"][data-val="zoom"]');
        await expect(zoomButton).toBeVisible();
        await zoomButton.click();

        // Get plot dimensions for interaction
        const box = await plotContainer.boundingBox();
        if (!box) throw new Error('Plot container not found');

        // Perform zoom gesture
        await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.25);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.75);
        await page.mouse.up();

        // Reset axes using the reset button
        const resetButton = page.locator('.modebar-btn[data-attr="zoom"][data-val="reset"]');
        await expect(resetButton).toBeVisible();
        await resetButton.click();

        // Test pan mode
        const panButton = page.locator('.modebar-btn[data-attr="dragmode"][data-val="pan"]');
        await expect(panButton).toBeVisible();
        await panButton.click();

        // Verify plot remains interactive
        await expect(plotContainer).toBeVisible();
        await expect(page.locator('.draglayer')).toBeVisible();
    });

    test('All Dropdowns contain expected graph data filter options', async ({ page }) => {
        
        await page.waitForLoadState('networkidle');
        await checkDropdownOptions(page, 'All Metrics', [
            'All Metrics', '% GDP Only', 'Amount Only', 'Per Capita Only', 'Population Only'
        ]);
        await checkDropdownOptions(page, 'All Parties', [
            'All Parties', 'Labour Only', 'National Only'
        ]);
        await checkDropdownOptions(page, 'All PMs', [
            'All PMs', 'Helen Clark', 'John Key', 'Bill English', 'Jacinda Ardern', 'Christopher Luxon'
        ]);
        await checkDropdownOptions(page, 'Green (Default)', [
            'Green (Default)', 'Orange', 'Purple', 'Hide Population'
        ]);
        await checkDropdownOptions(page, 'Linear Scale', [
            'Linear Scale', 'Log Scale'
        ]);
    });

    test('All Metrics selections update visualisation when filter options are changed', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();

        // Wait for and click the first dropdown (Chart Type)
        const chartTypeDropdown = page.locator('.updatemenu-header-group').first();
        await expect(chartTypeDropdown).toBeVisible();

        const filterOptions = [
            'All Metrics',
            '% GDP Only',
            'Amount Only',
            'Per Capita Only',
            'Population Only'
        ];

        // Test each filter option
        await testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions);
    });

    test('All Political Party selections update visualisation when filter options are changed', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();
        const chartTypeDropdown = page.locator('.updatemenu-header-group').nth(1);
        await expect(chartTypeDropdown).toBeVisible();

        const filterOptions = [
            'All Parties',
            'Labour Only',
            'National Only'
        ];

        // Test each filter option
        await testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions);
    });

    test('All PM selections update visualisation when filter options are changed', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();
        const chartTypeDropdown = page.locator('.updatemenu-header-group').nth(2);
        await expect(chartTypeDropdown).toBeVisible();

        const filterOptions = [
            'All PMs',
            'Helen Clark',
            'John Key',
            'Bill English',
            'Jacinda Ardern',
            'Christopher Luxon'
        ];

        // Test each filter option
        await testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions);
    });

    test('All colour selections update visualisation when filter options are changed', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();
        const chartTypeDropdown = page.locator('.updatemenu-header-group').nth(3);
        await expect(chartTypeDropdown).toBeVisible();

        const filterOptions = [
            'Green (Default)',
            'Orange',
            'Purple',
            'Hide Population'
        ];

        // Test each filter option
        await testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions);
    });

    test('All scale selections update visualisation when filter options are changed', async ({ page }) => {

        // Wait for plot to be visible
        const plotContainer = page.locator('.js-plotly-plot');
        await expect(plotContainer).toBeVisible();
        const chartTypeDropdown = page.locator('.updatemenu-header-group').nth(4);
        await expect(chartTypeDropdown).toBeVisible();

        const filterOptions = [
            'Linear Scale',
            'Log Scale'
        ];

        // Test each filter option
        await testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions);
    });

    // Helper functions

    // Helper function for dropdown checks - checking that all dropdown filters all available
    async function checkDropdownOptions(page, dropdownLabel, expectedOptions) {
        // Escape special regex characters in label
        const safeLabel = dropdownLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        await page.locator('g').filter({ hasText: new RegExp(`^${safeLabel}$`) }).first().click();
        await page.waitForTimeout(500);
        const pageText = await page.locator('body').innerText();
        const lines = pageText.split('\n').map(line => line.trim()).filter(Boolean);
        for (const option of expectedOptions) {
            expect(lines).toContain(option);
        }
    }

    // Helper function for dropdown checks - selecting all dropdown filters that are all available
    async function testDropdownOptions(page, chartTypeDropdown, plotContainer, filterOptions) {
        // Test each filter option
        for (const option of filterOptions) {
            // Click dropdown to show options
            await chartTypeDropdown.click();

            // Wait for dropdown menu and select option
            const dropdownMenu = page.locator('.updatemenu-item-text');
            const filterOption = dropdownMenu.getByText(option, { exact: true }).first();
            await filterOption.click();

            // Verify the visualisation updates
            await expect(plotContainer).toBeVisible();
            await expect(page.locator('.plot-container')).toBeVisible();
            await expect(page.locator('.scatterlayer').first()).toBeVisible();
        }
    }
});
