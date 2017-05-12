import { ForumPage } from './app.po';

describe('forum App', () => {
  let page: ForumPage;

  beforeEach(() => {
    page = new ForumPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
