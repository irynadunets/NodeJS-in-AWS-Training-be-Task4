// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: ["node_modules/(?!variables/.*)"],
  coverageReporters: ["html"]
};
