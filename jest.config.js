module.exports = {
  transform: { "^.+\\.(ts|tsx)?$": "ts-jest" },
  testEnvironment: "jsdom",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["jest-canvas-mock"],
};
