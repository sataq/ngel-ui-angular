module.exports = function () {
    this.Given(/^I am on the home page$/, function () {
        return browser.url("/");
    });

    this.Then(/^the page header should be "(.+)"$/, function (text) {
        return browser.waitForText("h1=" + text);
    });

    this.When(/^I click the "(.+)" link$/, function (text) {
        return browser.click('a=' + text);
    });
};