const webdriver = require('selenium-webdriver');
const By = webdriver.By;

const BasePage = require('./base-page');
const CallsPage = require('./calls-page');
const HomePage = require('./home-page');

/**
 * Page object for the All Active Issues page that holds
 * a list of all active issues.
 */
class AllActiveIssuesListPage extends BasePage {
  isInitialized() {
    const moreIssuesTitleSelector = By.css('main .call__title');
    const moreIssuesTitleTextRegex = /^([\d,.]*) ACTIVE ISSUES$/;

    return this.waitForElement(moreIssuesTitleSelector,
                               "All Active Issues page isn't loaded")
      .getText()
      .then(text => {
        const match = text.match(moreIssuesTitleTextRegex);
        return match !== undefined && match !== null;
      });
  }

  /**
   * Navigates to the first issue in the list of low-priority issues.
   *
   * @returns {CallsPage} resolves to the calls page object,
   * which internally checks that the current page is the
   * Calls page.
   */
  followFirstIssue() {
    const firstIssueSelector = By.css('section.call ul.issues-list li:nth-child(1)');
    this.waitForElement(firstIssueSelector).click();
    return new CallsPage(this.driver);
  }

  /**
   * Navigates to the home page from the all active
   * issues page.
   *
   * @returns {HomePage} resolves to the home page object,
   * which internally checks that the current page is the
   * Home page.
   */
  followHomeLink() {
    const selector = By.css('div.logo__header__logo layout > a > img');
    this.waitForElement(selector).click();
    return new HomePage(this.driver);
  }

}

module.exports = AllActiveIssuesListPage;
