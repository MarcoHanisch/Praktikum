import { TutpokePage } from './app.po';

describe('tutpoke App', () => {
  let page: TutpokePage;

  beforeEach(() => {
    page = new TutpokePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
