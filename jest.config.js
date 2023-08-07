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
        "all.json": "<rootDir>/__mocks__/all.json",
        "books.json": "<rootDir>/__mocks__/books.json",
        "category-a.json": "<rootDir>/__mocks__/category-a.json",
        "category-b.json": "<rootDir>/__mocks__/category-b.json",
        "misc.json": "<rootDir>/__mocks__/misc.json",
        "projects.json": "<rootDir>/__mocks__/projects.json",
        "stories.json": "<rootDir>/__mocks__/stories.json",
        ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
        ...paths,
    },
    testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`],
    globals: {
        __PATH_PREFIX__: "",
    },
    setupFiles: ["<rootDir>/loadershim.js"],
    setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        url: "http://localhost"
    }
};
