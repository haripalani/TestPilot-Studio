import { chromium, Browser, Page } from 'playwright';
import { TestPilotContext } from '@testpilot/types';

export class PlaywrightAdapter implements Partial<TestPilotContext> {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async init() {
    this.browser = await chromium.launch({ headless: false });
    this.page = await this.browser.newPage();
  }

  async open(url: string) {
    if (!this.page) throw new Error('Page not initialized');
    await this.page.goto(url);
  }

  async input(selector: string, value: string) {
    if (!this.page) throw new Error('Page not initialized');
    // Simple heuristic: if selector doesn't look like a CSS selector, try to find by label or placeholder
    try {
      await this.page.fill(selector, value);
    } catch (e) {
      await this.page.getByLabel(selector).fill(value);
    }
  }

  async tap(selector: string) {
    if (!this.page) throw new Error('Page not initialized');
    try {
      await this.page.click(selector);
    } catch (e) {
      await this.page.getByRole('button', { name: selector }).click();
    }
  }

  async expect(condition: string | boolean) {
    if (!this.page) throw new Error('Page not initialized');
    
    if (typeof condition === 'boolean') {
      if (!condition) throw new Error('Assertion failed: expected true but got false');
      console.log('✅ Assertion passed');
      return;
    }

    const content = await this.page.textContent('body');
    if (!content?.includes(condition)) {
      throw new Error(`Expected text "${condition}" not found on page`);
    }
    console.log(`✅ Expect: "${condition}" found`);
  }

  async close() {
    await this.browser?.close();
  }
}
