const path = require("path");
const fs = require("fs");
const fsPromise = require("fs/promises")

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@Blocks": path.resolve(__dirname, "src/components/Blocks/index.ts"),
                "@Gen": path.resolve(__dirname, "src/components/General/index.ts"),
                "@Input": path.resolve(__dirname, "src/components/Input/index.ts"),
                "@Pre": path.resolve(__dirname, "src/components/Prefix/index.ts"),
                "@Draggable": path.resolve(__dirname, "src/components/Input/Draggable/index.ts"),
                "@Posts": path.resolve(__dirname, "src/components/Posts/index.ts"),
                "@Layout": path.resolve(__dirname, "src/components/Layout/index.ts"),
                "@Variants": path.resolve(__dirname, "src/components/Variants/index.ts"),
                "@Styles": path.resolve(__dirname, "src/styles"),
                "@StyleVars": path.resolve(
                    __dirname,
                    "src/styles/variables.ts"
                ),
                "@Animations": path.resolve(
                    __dirname,
                    "src/styles/animations.ts"
                ),
                "@Utils": path.resolve(__dirname, "src/utils"),
                "@Images": path.resolve(__dirname, "src/images"),
                "@Tech": path.resolve(__dirname, "src/images/tech"),
                "@Constants": path.resolve(__dirname, "src/data/constants.ts"),
                "@Hooks": path.resolve(__dirname, "src/hooks/index.ts"),
                "@Data": path.resolve(__dirname, "src/data"),
                "@WPData": path.resolve(__dirname, "src/data/wp"),
                "@Types": path.resolve(__dirname, "src/types"),
                "@Store": path.resolve(__dirname, "src/store"),
                "@TestProps": path.resolve(__dirname, "__tests__/props.ts"),
                "@TestUtils": path.resolve(__dirname, "__tests__/test-utils.tsx")
            },
        },
    });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
    const result = await graphql(`
        {
            allWpPost {
                nodes {
                    id
                    slug
                }
            }
            allWpBook {
                nodes {
                    slug
                    id
                }
            }
            allWpProject {
                nodes {
                    slug
                    id
                }
            }
            allWpShortstory {
                nodes {
                    slug
                    id
                }
            }
            allWpCategory {
                nodes {
                    name
                }
            }
        }
    `);
    if (result.errors) {
        reporter.error("There was an error fetching posts", result.errors);
    }

    function titleToKebab(title) {
        // Since this function is only applied in the build phase
        // and on titles written by humans, the complexity/lack of it doesn't matter
        const _title = title
            .toLowerCase()
            .trim()
            .replace(/['\.\[\]\{\}\!\?\,:@#\*]/g, "")
            .replace(/\s{2,}/g, " ")
            .split(" ");
        if (_title.every((part) => part.length === 0)) {
            throw new Error(
                "Invalid title -- format must include characters other than apostraphes, spaces, !@#*[]{} or punctuation"
            );
        }
        return _title.join("-");
    }

    const {
        allWpPost,
        allWpBook,
        allWpProject,
        allWpShortstory,
        allWpCategory,
    } = result.data;

    const postTemplate = require.resolve(`./src/templates/Post.template.tsx`);
    const bookTemplate = require.resolve("./src/templates/Book.template.tsx");
    const projectTemplate = require.resolve(
        "./src/templates/Project.template.tsx"
    );
    const shortStoryTemplate = require.resolve(
        "./src/templates/Shortstory.template.tsx"
    );
    const categoryTemplate = require.resolve(
        "./src/templates/Category.template.tsx"
    );

    if (allWpPost.nodes.length) {
        allWpPost.nodes.map((post) => {
            actions.createPage({
                path: `post/${post.slug}`,
                component: postTemplate,
                context: post,
            });
        });
    }

    if (allWpBook.nodes.length) {
        allWpBook.nodes.map((book) => {
            actions.createPage({
                path: `book/${book.slug}`,
                component: bookTemplate,
                context: book,
            });
        });
    }

    if (allWpProject.nodes.length) {
        allWpProject.nodes.map((project) => {
            actions.createPage({
                path: `project/${project.slug}`,
                component: projectTemplate,
                context: project,
            });
        });
    }

    if (allWpShortstory.nodes.length) {
        allWpShortstory.nodes.map((story) => {
            actions.createPage({
                path: `story/${story.slug}`,
                component: shortStoryTemplate,
                context: story,
            });
        });
    }

    if (allWpCategory.nodes.length) {
        allWpCategory.nodes.map((cat) => {
            actions.createPage({
                path: `blog/${titleToKebab(cat.name)}`,
                component: categoryTemplate,
                context: cat,
            });
        });
    }

    const searchQuery = await graphql(`
        query {
            allWpBook {
                nodes {
                    slug
                    title
                    content
                    book {
                        publishedOn
                        purchaseLinks
                        purchaseLinksNames
                        cover {
                            localFile {
                                childImageSharp {
                                    gatsbyImageData(
                                        formats: [AUTO, AVIF, WEBP]
                                        height: 200
                                    )
                                }
                            }
                        }
                        relatedStories {
                            ... on WpShortstory {
                                title
                                slug
                            }
                        }
                        relatedProject {
                            ... on WpProject {
                                title
                            }
                        }
                        relatedProjectDesc
                    }
                }
            }
            allWpShortstory {
                nodes {
                    title
                    content
                    slug
                    shortStory {
                        publishedOn
                        relatedBook {
                            ... on WpBook {
                                title
                                content
                                slug
                                book {
                                    cover {
                                        localFile {
                                            childImageSharp {
                                                gatsbyImageData(
                                                    formats: [AUTO, AVIF, WEBP]
                                                    height: 150
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        relationshipToBook
                    }
                }
            }
            allWpPost {
                nodes {
                    title
                    slug
                    date
                    excerpt
                    categories {
                        nodes {
                            name
                        }
                    }
                    tags {
                        nodes {
                            name
                        }
                    }
                }
            }
            allWpProject {
                nodes {
                    project {
                        technologies
                        mainLink
                        repoLink
                        hostedOn
                        firstReleased
                        latestUpdate
                    }
                    title
                    content
                    slug
                }
            }
            allFile {
                nodes {
                    publicURL
                    name
                }
            }
        }
    `);

    if (searchQuery.errors) {
        reporter.error("Unable to query general filtering and search data");
    }

    function getTimeFromDateString(date) {
        const month = +date.substring(0, 2);
        return {
            year: +date.substring(6),
            month,
            ...getMonth(month),
            date: new Date(date),
        };
    }

    function getBlogPostDateInformation(date) {
        const year = +date.substring(0, 4);
        const month = +date.substring(5, 7);
        return {
            year,
            month,
            ...getMonth(month),
            date: new Date(date),
        };
    }

    function getMonth(month) {
        switch (month) {
            case 1:
                return {
                    full: "January",
                    short: "JAN",
                };
            case 2:
                return {
                    full: "February",
                    short: "FEB",
                };
            case 3:
                return {
                    full: "March",
                    short: "MAR",
                };
            case 4:
                return {
                    full: "April",
                    short: "APR",
                };
            case 5:
                return {
                    full: "May",
                    short: "MAY",
                };
            case 6:
                return {
                    full: "June",
                    short: "JUN",
                };
            case 7:
                return {
                    full: "July",
                    short: "JUL",
                };
            case 8:
                return {
                    full: "August",
                    short: "AUG",
                };
            case 9:
                return {
                    full: "September",
                    short: "SEP",
                };
            case 10:
                return {
                    full: "October",
                    short: "OCT",
                };
            case 11:
                return {
                    full: "November",
                    short: "NOV",
                };
            case 12:
                return {
                    full: "December",
                    short: "DEC",
                };
            default:
                return {
                    full: "January",
                    short: "JAN",
                };
        }
    }

    function getFullTechName(tech) {
        switch (tech.toLowerCase()) {
            case "html":
                return "HTML";
            case "css":
                return "CSS";
            case "sass":
                return "Sass";
            case "js":
                return "JavaScript";
            case "ts":
                return "TypeScript";
            case "py":
                return "Python";
            case "php":
                return "PHP";
            case "wp":
                return "WordPress";
            case "ng":
                return "Angular";
            case "swift":
                return "Swift";
            case "react":
                return "React";
            case "vue":
                return "Vue";
            case "cs":
                return "C#";
            case "unity":
                return "Unity";
            case "ml":
                return "Machine Learning";
            case "svelte":
                return "Svelte";
            case "gql":
                return "GraphQL";
            case "tw":
                return "Tailwind";
            default:
                return tech;
        }
    }

    function formatText(text) {
        if (!text) return;
        return text
            .replace(/<\/?[\w\s=":\/\.]+>/g, "")
            .replace(/&#?\w+;/g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, "")
            .replace(/\n/g, "")
            .replace(/,/g, "")
            .replace(/"/g, "")
            .replace(/'/g, "")
            .replace(/\)/g, "")
            .replace(/\(/g, "")
            .replace(/\./g, "")
            .replace(/\?/g, "")
            .replace(/\!/g, "");
    }

    function firstWords(sentence, length) {
        if (length >= sentence.length) {
            return sentence;
        }
        const sub = sentence.substring(0, length);
        if (/^\s*$/.test(sub) || sub.length === 0) {
            throw new Error(
                "Sentence section must be longer than 0 and contain letters other than blank spaces"
            );
        }
        return sub.replace(/\s\S*$/, "...");
    }

    function generateLookup(arr) {
        return arr.reduce(
            (acc, next) => ({
                ...acc,
                [formatText(next.toString()).toLowerCase()]: true,
            }),
            {}
        );
    }

    function formatProject(project, hashedIcons) {
        const tech = project.project.technologies.split(", ");
        const piecemealProject = {
            title: project.title,
            slug: project.slug,
            mainLink: project.project.mainLink,
            hostedOn: project.project.hostedOn,
            repoLink: project.project.repoLink,
            content: firstWords(project.content, 100),
            firstReleased: getTimeFromDateString(project.project.firstReleased),
            shortTechnologies: tech,
            longTechnologies: tech.map((t) => getFullTechName(t)),
        };
        if (project.project.latestUpdate) {
            piecemealProject.latestUpdate = getTimeFromDateString(
                project.project.latestUpdate
            );
        }
        piecemealProject.icons = getIconsForProject(
            piecemealProject,
            hashedIcons
        );
        return {
            ...piecemealProject,
            meta: generateProjectMeta(piecemealProject),
        };
    }

    function getAllUsedShortTechs(rawProjects) {
        const techs = rawProjects.flatMap((p) =>
            p.project.technologies.split(", ")
        );
        return Array.from(new Set(techs));
    }

    function getAllUsedTechnologies(shortTechs) {
        return Array.from(new Set(shortTechs.map((t) => getFullTechName(t))));
    }

    function getAllHosts(projects) {
        const nonUniqueHosts = projects
            .filter((p) => !!p.hostedOn)
            .map((p) => p.hostedOn);
        return Array.from(new Set(nonUniqueHosts));
    }

    function hashUsedIcons(allIcons, allShortTechs) {
        return allIcons
            .filter((f) => allShortTechs.includes(f.name))
            .map((f) => ({ ...f, name: getFullTechName(f.name) }))
            .reduce(
                (acc, next) => ({ ...acc, [next.name]: next.publicURL }),
                {}
            );
    }

    function getIconsForProject(project, hashedIcons) {
        return project.longTechnologies.map((t) => ({
            name: t,
            publicURL: hashedIcons[t],
        }));
    }

    function generateProjectMeta(project) {
        const data = [
            ...project.title.split(" "),
            project.hostedOn,
            ...formatText(project.content).split(" "),
            project.firstReleased.full,
            project.firstReleased.short,
            project.firstReleased.year,
            ...project.shortTechnologies,
            ...project.longTechnologies,
        ];
        if (project.repoLink) {
            data.push("github");
            data.push("repo");
        }
        return generateLookup(data.filter((d) => !!d));
    }

    function formatStory(story) {
        const _story = {
            slug: story.slug,
            title: story.title,
            content: firstWords(formatText(story.content), 170),
            published: getTimeFromDateString(story.shortStory.publishedOn),
            book: !story.shortStory.relatedBook
                ? null
                : {
                      title: story.shortStory.relatedBook.title,
                      slug: story.shortStory.relatedBook.slug,
                      content: formatText(
                          firstWords(story.shortStory.relatedBook.content, 50)
                      ),
                      relationship: story.shortStory.relationshipToBook
                          ? story.shortStory.relationshipToBook
                          : "Related story",
                      cover:
                          story.shortStory.relatedBook.book &&
                          story.shortStory.relatedBook.book.cover
                              ? story.shortStory.relatedBook.book.cover
                                    .localFile.childImageSharp.gatsbyImageData
                              : null,
                  },
        };
        const flattenedStory = {
            ..._story,
            meta: generateStoryMeta(story),
        };
        return flattenedStory;
    }

    function generateStoryMeta(rawStory) {
        const date = getTimeFromDateString(rawStory.shortStory.publishedOn);
        let data = [
            ...rawStory.title.split(" "),
            ...formatText(rawStory.content).split(" "),
            date.full,
            date.short,
            date.year,
        ];
        if (rawStory.shortStory.alternateLinksNames) {
            data = data.concat(
                rawStory.shortStory.alternateLinksNames.split(", ")
            );
        }
        if (rawStory.shortStory.relatedBook) {
            data = data.concat(
                rawStory.shortStory.relatedBook.title.split(" ")
            );
            data.push(rawStory.shortStory.relationshipToBook);
        }
        return generateLookup(data.filter((d) => !!d));
    }

    function formatBook(book) {
        const links = book.book.purchaseLinks.split(", ");
        const linkNames = book.book.purchaseLinksNames.split(", ");
        const purchaseLinks = [];
        for (let i = 0; i < links.length; i++) {
            purchaseLinks.push({
                link: links[i],
                name: i < linkNames.length ? linkNames[i] : links[i],
            });
        }
        const _book = {
            slug: book.slug,
            title: book.title,
            published: getTimeFromDateString(book.book.publishedOn),
            content: firstWords(book.content, 170),
            cover: book.book.cover
                ? book.book.cover.localFile.childImageSharp.gatsbyImageData
                : null,
            stories: book.book.relatedStories,
            project: !book.book.relatedProject
                ? null
                : {
                      ...book.book.relatedProject,
                      description: book.book.relatedProjectDesc,
                  },
            purchaseLinks,
        };
        const flattenedBook = {
            ..._book,
            meta: generateBookMeta(_book),
        };
        return flattenedBook;
    }

    function generateBookMeta(book) {
        let data = [
            ...book.title.split(" "),
            book.published.full,
            book.published.short,
            book.published.year,
            ...book.purchaseLinks,
            ...formatText(book.content).split(" "),
        ];
        if (book.stories) {
            data = data.concat(book.stories.flatMap((s) => s.title.split(" ")));
        }
        if (book.project) {
            data = data.concat(book.project.title.split(" "));
            data = data.concat(book.project.description.split(" "));
        }
        return generateLookup(data.filter((d) => !!d));
    }

    function formatPost(post) {
        const data = {
            title: post.title,
            slug: post.slug,
            excerpt: firstWords(formatText(post.excerpt), 150),
            content: formatText(post.content),
            published: getBlogPostDateInformation(post.date),
            categories:
                post.categories.nodes &&
                post.categories.nodes.map((n) => n.name),
            tags: post.tags.nodes && post.tags.nodes.map((n) => n.name),
        };

        const flattenedPost = {
            ...data,
            meta: generatePostMeta(data),
        };

        return flattenedPost;
    }

    function generatePostMeta(post) {
        const data = [
            ...post.categories,
            ...post.tags,
            post.published.full,
            post.published.short,
            post.published.year,
            ...post.title.split(" "),
            ...formatText(post.excerpt).split(" "),
        ];
        return generateLookup(data.filter((d) => !!d));
    }

    const allStartTime = Date.now();

    async function checkAndCreateFolder(path) {
        if (!fs.existsSync(path)) {
            reporter.info(`${path} directory does not exist. Creating it now...`)
            try {
                await fsPromise.mkdir(path)
                reporter.success(`${path} created successfully`)
            } catch (e) {
                reporter.error(`Error creating ${path}: ${e.message}`)
            }
        } else {
            reporter.info(`${path} already exists, continuing...`)
        }
    }

    await checkAndCreateFolder("./src/data/wp")
    await checkAndCreateFolder("./src/data/wp/Author")
    await checkAndCreateFolder("./src/data/wp/Projects")
    await checkAndCreateFolder("./src/data/wp/Posts")

    const bookStartTime = Date.now();
    const books = searchQuery.data.allWpBook.nodes;
    const formattedBooks = books
        .map((b) => formatBook(b))
        .sort(
            (a, b) => b.published.date.getTime() - a.published.date.getTime()
        );
    
    function getTimeDiff(start) {
        const diff = ((Date.now() - start) / 1000).toFixed(2);
        return +diff;
    }

    fs.writeFile(
        "./src/data/wp/Author/books.json",
        JSON.stringify(formattedBooks),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing book data! " + err);
            } else {
                reporter.success(`Success writing book data! It took ${getTimeDiff(bookStartTime)} seconds.`);
            }
        }
    );

    const storyStartTime = Date.now();
    const stories = searchQuery.data.allWpShortstory.nodes;
    const formattedStories = stories
        .map((s) => formatStory(s))
        .sort(
            (a, b) => b.published.date.getTime() - a.published.date.getTime()
        );
    
    fs.writeFile(
        "./src/data/wp/Author/stories.json",
        JSON.stringify(formattedStories),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing stories data! " + err);
            } else {
                reporter.success(`Success writing stories data! It took ${getTimeDiff(storyStartTime)} seconds.`);
            }
        }
    );

    const postsStartTime = Date.now();
    const posts = searchQuery.data.allWpPost.nodes;
    const formattedPosts = posts
        .map((p) => formatPost(p))
        .sort(
            (a, b) => b.published.date.getTime() - a.published.date.getTime()
        );
    const allCategories = allWpCategory.nodes.map((cat) => cat.name);

    for (let cat of allCategories) {
        const filteredPosts = formattedPosts.filter((p) =>
            p.categories.includes(cat)
        );
        if (filteredPosts.length > 0) {
            fs.writeFile(
                `./src/data/wp/Posts/${titleToKebab(cat)}.json`,
                JSON.stringify(filteredPosts),
                "utf-8",
                (err) => {
                    if (err) {
                        reporter.error(
                            `Error writing posts data for category ${cat}! ` +
                                err
                        );
                    } else {
                        reporter.success(`Success writing posts data for ${cat}!`);
                    }
                }
            );
        }
    }

    fs.writeFile(
        "./src/data/wp/Posts/all.json",
        JSON.stringify(formattedPosts),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing posts data! " + err);
            } else {
                reporter.success(`Success writing posts data! It took ${getTimeDiff(postsStartTime)} seconds.`);
            }
        }
    );
    
    
    const projectsStartTime = Date.now();
    const projects = searchQuery.data.allWpProject.nodes;
    const shortTechs = getAllUsedShortTechs(projects);
    const longTechs = getAllUsedTechnologies(shortTechs);
    const icons = searchQuery.data.allFile.nodes;
    const usedIcons = hashUsedIcons(icons, shortTechs);
    
    
    const formattedProjects = projects
        .map((p) => formatProject(p, usedIcons))
        .sort(
            (a, b) =>
            b.firstReleased.date.getTime() - a.firstReleased.date.getTime()
        );
        
    const allHosts = getAllHosts(formattedProjects);

    fs.writeFile(
        "./src/data/wp/Projects/misc.json",
        JSON.stringify({
            longTechs,
            shortTechs,
            usedIcons,
            hosts: allHosts,
        }),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing project misc! " + err);
            } else {
                reporter.success("Success writing project misc!");
            }
        }
    );

    fs.writeFile(
        "./src/data/wp/Projects/projects.json",
        JSON.stringify(formattedProjects),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing project data! " + err);
            } else {
                reporter.success(`Success writing project data! It took ${getTimeDiff(projectsStartTime)} seconds.`);
            }
        }
    );

    function generateGenericInfo(item, itemType) {
        return {
            type: itemType,
            slug: item.slug,
            title: item.title,
        };
    }

    function prepareGlobalSearch() {
        const stories = formattedStories.map((s) => ({
            ...generateGenericInfo(s, "story"),
            meta: s.meta,
        }));

        const books = formattedBooks.map((b) => ({
            ...generateGenericInfo(b, "book"),
            meta: b.meta,
        }));

        const projects = formattedProjects.map((p) => ({
            ...generateGenericInfo(p, "project"),
            meta: p.meta,
        }));

        const posts = formattedPosts.map((p) => ({
            ...generateGenericInfo(p, "post"),
            meta: p.meta,
        }));

        return {
            stories,
            books,
            projects,
            posts,
        };
    }

    function flattenSearchItems(items) {
        return items.map((i) => ({
            type: i.type,
            meta: i.meta,
            slug: i.slug,
            title: i.title,
            date: i.date,
        }));
    }

    const globalSearch = prepareGlobalSearch();
    const flattenedSearch = flattenSearchItems([
        ...globalSearch.stories,
        ...globalSearch.books,
        ...globalSearch.projects,
        ...globalSearch.posts,
    ]);

    fs.writeFile(
        "./src/data/searchData.json",
        JSON.stringify(flattenedSearch),
        "utf-8",
        (err) => {
            if (err) {
                reporter.error("Error writing general search data! " + err);
            } else {
                reporter.success(`Success writing general search data! It took ${getTimeDiff(allStartTime)} seconds.`);
            }
        }
    );
};
