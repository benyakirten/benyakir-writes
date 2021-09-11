const path = require("path")
const fs = require('fs')

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@Blocks": path.resolve(__dirname, "src/components/Blocks"),
                "@Gen": path.resolve(__dirname, "src/components/General"),
                "@Input": path.resolve(__dirname, "src/components/Input"),
                "@Pre": path.resolve(__dirname, "src/components/Prefix"),
                "@Posts": path.resolve(__dirname, "src/components/Posts"),
                "@Layout": path.resolve(__dirname, "src/components/Layout"),
                "@Variant": path.resolve(__dirname, "src/components/Variants"),
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
                "@Hooks": path.resolve(__dirname, "src/hooks"),
                "@Types": path.resolve(__dirname, "src/types"),
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
        const _title = title.toLowerCase().replace(/'/g, "").split(" ");
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
                            }
                        }
                        relationshipToBook
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
            allWpPost {
                nodes {
                    title
                    slug
                    date
                    content
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
        }
    `);

    if (searchQuery.errors) {
        reporter.error("Unable to query general search criteria");
    }

    function getTimeFromDateString(date) {
        const month = +date.substring(0, 2);
        return {
            year: +date.substring(6),
            month,
            ...getMonth(month),
            date: new Date(date)
        }
    }

    function getBlogPostDateInformation(date) {
        const year = +date.substring(0, 4)
        const month = +date.substring(5, 7)
        return {
            year,
            month,
            ...getMonth(month),
            date: new Date(date)
        }
    }

    function getMonth(month) {
        switch (month) {
            case 1:
                return {
                    full: "January",
                    short: "JAN"
                }
            case 2:
                return {
                    full: "February",
                    short: "FEB"
                }
            case 3:
                return {
                    full: "March",
                    short: "MAR"
                }
            case 4:
                return {
                    full: "April",
                    short: "APR"
                }
            case 5:
                return {
                    full: "May",
                    short: "MAY"
                }
            case 6:
                return {
                    full: "June",
                    short: "JUN"
                }
            case 7:
                return {
                    full: "July",
                    short: "JUL"
                }
            case 8:
                return {
                    full: "August",
                    short: "AUG"
                }
            case 9:
                return {
                    full: "September",
                    short: "SEP"
                }
            case 10:
                return {
                    full: "October",
                    short: "OCT"
                }
            case 11:
                return {
                    full: "November",
                    short: "NOV"
                }
            case 12:
                return {
                    full: "December",
                    short: "DEC"
                }
            default:
                return {
                    full: "January",
                    short: "JAN"
                }
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
                return "Tailwind CSS";
            default:
                return tech;
        }
    }

    function formatText (text) {
        return text
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/&#?\w+;/g, '')
            .replace(/\[/g, '')
            .replace(/\]/g, '')
            .replace(/\n/g, '')
            .replace(/,/g, '')
            .replace(/"/g, '')
            .replace(/'/g, '')
            .replace(/\)/g, '')
            .replace(/\(/g, '')
            .replace(/\./g, '')
            .replace(/\?/g, '')
            .replace(/\!/g, '')
    }

    function generateLookup(arr) {
        return arr.reduce((acc, next) => ({ ...acc, [formatText(next.toString()).toLowerCase()]: true }), {})
    }

    function generateStoryMeta(story) {
        const date = getTimeFromDateString(story.shortStory.publishedOn)
        let data = [
            ...story.title.split(" "),
            ...formatText(story.content).split(" "),
            date.full,
            date.short,
            date.year
        ]
        if (story.shortStory.alternateLinksNames) {
            data = data.concat(story.shortStory.alternateLinksNames.split(", "))
        }
        if (story.shortStory.relatedBook) {
            data = data.concat(story.shortStory.relatedBook.title.split(" "))
            data.push(story.shortStory.relationshipToBook)
        }
        return generateLookup(data.filter(d => !!d))
    }

    function generateBookMeta(book) {
        const date = getTimeFromDateString(book.book.publishedOn)
        let data = [
            ...book.title.split(" "),
            date.full,
            date.short,
            date.year,
            ...formatText(book.content).split(" "),
        ];
        if (book.book.relatedStories) {
            data = data.concat(book.book.relatedStories.flatMap(s => s.title.split(" ")))
        }
        if (book.book.relatedProject) {
            data = data.concat(book.book.relatedProject.title.split(" "))
        }
        if (book.book.relatedProjectDesc) {
            data = data.concat(book.book.relatedProjectDesc.split(" "))
        }
        return generateLookup(data.filter(d => !!d))
    }

    function generateProjectMeta(project) {
        const tech = project.project.technologies.split(", ")
        const date = getTimeFromDateString(project.project.firstReleased)
        const data = [
            ...project.title.split(" "),
            project.project.hostedOn,
            ...formatText(project.content).split(" "),
            date.full,
            date.short,
            date.year,
            ...project.project.technologies.split(", "),
            ...tech.map(t => getFullTechName(t))
        ]
        if (project.repoLink) {
            data.push('github')
            data.push('repo')
        }
        return generateLookup(data.filter(d => !!d))
    }

    function generatePostMeta(post) {
        const date = getBlogPostDateInformation(post.date)
        const data = [
            ...post.categories.nodes.flatMap(n => n.name.split(" ")),
            date.full,
            date.short,
            date.year,
            ...post.title.split(" "),
            ...formatText(post.content).split(" "),
            ...post.tags.nodes.flatMap(n => n.name.split(" "))
        ]
        return generateLookup(data.filter(d => !!d))
    }

    function generateGenericInfo(item, itemType) {
        return {
            type: itemType,
            slug: item.slug,
            title: item.title
        }
    }

    function prepareGlobalSearch(query) {
        const stories = query.data.allWpShortstory.nodes.map(s => ({
            ...generateGenericInfo(s, 'story'),
            meta: generateStoryMeta(s),
            date: getTimeFromDateString(s.shortStory.publishedOn).date
        }))

        const books = query.data.allWpBook.nodes.map(b => ({
            ...generateGenericInfo(b, 'book'),
            meta: generateBookMeta(b),
            date: getTimeFromDateString(b.book.publishedOn).date
        }))

        const projects = query.data.allWpProject.nodes.map(p => ({
            ...generateGenericInfo(p, 'project'),
            meta: generateProjectMeta(p),
            date: getTimeFromDateString(p.project.firstReleased).date
        }))

        const posts = query.data.allWpPost.nodes.map(p => ({
            ...generateGenericInfo(p, 'post'),
            meta: generatePostMeta(p),
            date: getBlogPostDateInformation(p.date).date
        }))

        return {
            stories,
            books,
            projects,
            posts
        }

    }

    function flattenSearchItems(items) {
        return items.map(i => ({
            type: i.type,
            meta: i.meta,
            slug: i.slug,
            title: i.title,
            date: i.date
        })).sort((a, b) => b.date.getTime() - a.date.getTime())
    }

    const globalSearch = prepareGlobalSearch(searchQuery)
    const flattenedSearch = flattenSearchItems([
        ...globalSearch.stories,
        ...globalSearch.books,
        ...globalSearch.projects,
        ...globalSearch.posts
    ])
    
    fs.writeFile('./src/data/searchData.json', JSON.stringify(flattenedSearch), 'utf-8', err => {
        if (err) {
            console.log("Error! " + err)
        } else {
            console.log("Success! Doing stuff!")
        }
    })
};
