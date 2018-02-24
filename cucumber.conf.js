module.exports = function () {
    var screenshotPath = "./build/reports/cucumber-screenshots/";
    var failCount = 0;

    this.After(function (scenario, callback) {
        if (scenario.isFailed()) {
            failCount++;
            var hyphenCaseName = scenario.getName().toLowerCase().replace(/ /g, "-");
            var screenshotTitle = "failure-" + failCount + "-" + hyphenCaseName + ".png";
            browser.saveScreenshot(screenshotPath + screenshotTitle).then(callback);
        } else {
            callback();
        }
    });
};