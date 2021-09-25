const { compilerOptions } = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest/utils");
const paths = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
});

// function generateJsonPath(name) {
//     return `<rootDir>/__mocks__/${name}.json`;
// }

// function generateAllJsonPaths(names) {
//     const jsonPaths = {};
//     for (let name of names) {
//         jsonPaths[`${name}.json`] = generateJsonPath(name);
//     }
//     return jsonPaths;
// }

// const jsonPaths = generateAllJsonPaths([
//     "searchData",
//     "all",
//     "books",
//     "category-a",
//     "category-b",
//     "misc",
//     "projects",
//     "stories",
// ]);

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
