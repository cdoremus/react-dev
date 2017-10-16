const webdriver = require('selenium-webdriver');
const By = webdriver.By;

/**
 * Page object encapsulating FAQ page-related behaviors.
 *
 */
class FaqPage {
  isInitialized() {
    const pageTitleSelector = By.css('h2.about__title');
    const pageTitleText = "FREQUENTLY ASKED QUESTIONS";

    return this.waitForElement(pageTitleSelector,
                               "FAQ page hasn't loaded")
      .getText()
      .then(text => {
        return text === pageTitleText;
      });
  }

}

module.exports = FaqPage;
