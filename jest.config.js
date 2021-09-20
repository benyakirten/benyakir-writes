const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
});

module.exports = {
    transform: {
        "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
    },
    testRegex: "(/__tests__/.*(\\.test|spec))\\.(tsx?)$",
    moduleNameMapper: {
        "searchData.json": "<rootDir>/__mocks__/searchData.json",
        ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
        ...paths,
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["node_modules", ".cache", "public"],
    transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
    globals: {
        __PATH_PREFIX__: "",
    },
    testURL: "http://localhost",
    setupFiles: ["<rootDir>/loadershim.js"],
    testEnvironment: `jsdom`,
    setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
};
