"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightAdapter = void 0;
const playwright_1 = require("playwright");
class PlaywrightAdapter {
    browser = null;
    page = null;
    async init() {
        this.browser = await playwright_1.chromium.launch({ headless: false });
        this.page = await this.browser.newPage();
    }
    async open(url) {
        if (!this.page)
            throw new Error('Page not initialized');
        await this.page.goto(url);
    }
    async input(selector, value) {
        if (!this.page)
            throw new Error('Page not initialized');
        // Simple heuristic: if selector doesn't look like a CSS selector, try to find by label or placeholder
        try {
            await this.page.fill(selector, value);
        }
        catch (e) {
            await this.page.getByLabel(selector).fill(value);
        }
    }
    async tap(selector) {
        if (!this.page)
            throw new Error('Page not initialized');
        try {
            await this.page.click(selector);
        }
        catch (e) {
            await this.page.getByRole('button', { name: selector }).click();
        }
    }
    async expect(text) {
        if (!this.page)
            throw new Error('Page not initialized');
        const content = await this.page.textContent('body');
        if (!content?.includes(text)) {
            throw new Error(`Expected text "${text}" not found on page`);
        }
    }
    async close() {
        await this.browser?.close();
    }
}
exports.PlaywrightAdapter = PlaywrightAdapter;
//# sourceMappingURL=index.js.map