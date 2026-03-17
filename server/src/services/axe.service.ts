import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

export const runAxeAudit = async (url: string) => {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const results = await new AxePuppeteer(page)
      .withRules(['aria-allowed-attr', 'color-contrast', 'label', 'button-name', 'image-alt'])
      .analyze();

    await browser.close();
    return results.violations;
  } catch (error) {
    await browser.close();
    throw error;
  }
};
