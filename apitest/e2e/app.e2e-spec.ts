import { ApitestPage } from './app.po';

describe('apitest App', () => {
  let page: ApitestPage;

  beforeEach(() => {
    page = new ApitestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
