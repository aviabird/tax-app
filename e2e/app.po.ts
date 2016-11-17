import { browser, element, by } from 'protractor';

export class TaxAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ta-root h1')).getText();
  }
}
