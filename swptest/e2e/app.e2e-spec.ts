import { SwptestPage } from './app.po';

describe('swptest App', () => {
  let page: SwptestPage;

  beforeEach(() => {
    page = new SwptestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
