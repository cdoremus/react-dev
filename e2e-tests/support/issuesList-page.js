const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;
const promise = webdriver.promise;
const config = require('./e2e-tests.config');

const BasePage = require('./base-page');
const CallsPage = require('./calls-page');
const HomePage = require('./home-page');
const AllActiveIssuesListPage = require('./allIssuesList-page');
/**
 * Page object for issues list related content,
 * which includes the issues list in the
 * sidebar and the list on the 'more issues' page.
 *
 */
class IssuesListPage extends BasePage {
  isInitialized() {
    const driver = this.driver;
    const issuesListSelector = By.css('#nav .issues-list');
    const allIssuesLinkSelector = By.css('a.issues__footer-link > span');
    const allIssuesLinkText = "View all active issues";

    return promise.all(driver.wait(until.elementLocated(issuesListSelector),
                                   config.defaultTimeout),
                       driver.wait(until.elementLocated(allIssuesLinkSelector),
                                   config.defaultTimeout))
      .then(() => {
        return driver.findElement(allIssuesLinkSelector).getText();
      })
      .then(text => {
        return text === allIssuesLinkText;
      });
  }

  /**
   * Navigates to the calls page after clicking on the first link
   * in the issues list.
   *
   * @returns {CallsPage} The call page navigated to by clicking
   * the first issue link
   */
  followFirstIssue() {
    return this.followIssue(1);
  }

  /**
   * Navigates to the calls page after clicking on the nth link
   * (issueNumber argument) in the issues list.
   *
   * @param {number} issueNumber The nth issue that is being
   * followed.
   * @returns {CallsPage} The calls page object,
   * which internally checks that the current page is
   * the calls page.
   */
  followIssue(issueNumber) {
    const issueSelector = By.css(`ul.issues-list li:nth-child(${issueNumber})`);
    this.waitForElement(issueSelector).click();
    return new CallsPage(this.driver);
  }

  /**
   * Navigates using the 'view all active issues' link
   *
   * @returns {AllActiveIssuesListPage} the page object
   * representing the 'NN Active Issues' page holding
   * all active issues
   */
  followAllActiveIssuesListLink() {
    const allIssuesLinkSelector = By.css('a.issues__footer-link > span');
    this.waitForElement(allIssuesLinkSelector).click();
    return new AllActiveIssuesListPage(this.driver);
  }

  /**
   * Navigates to the home page
   *
   * @returns {HomePage} the page object encapsulating
   * the site's home page.
   *
   */
  followHomeLink() {
    const selector = By.css('#root div > header > div > a > img');
    this.waitForElement(selector).click();
    return new HomePage(this.driver);
  }

}

module.exports = IssuesListPage;
