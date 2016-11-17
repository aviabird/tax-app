import { TaxAppPage } from './app.po';

describe('tax-app App', function() {
  let page: TaxAppPage;

  beforeEach(() => {
    page = new TaxAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ta works!');
  });
});
