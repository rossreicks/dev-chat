import { SlackClonePage } from './app.po';

describe('slack-clone App', function() {
  let page: SlackClonePage;

  beforeEach(() => {
    page = new SlackClonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
