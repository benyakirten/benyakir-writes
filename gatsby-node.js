const path = require("path");

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
        "@StyleVars": path.resolve(__dirname, "src/styles/variables.ts"),
        "@Animations": path.resolve(__dirname, "src/styles/animations.ts"),
        "@Utils": path.resolve(__dirname, "src/utils"),
        "@Images": path.resolve(__dirname, "src/images"),
        "@Tech": path.resolve(__dirname, "src/images/tech"),
        "@Constants": path.resolve(__dirname, "src/data/constants.ts"),
        "@Hooks": path.resolve(__dirname, "src/hooks"),
        "@Types": path.resolve(__dirname, "src/types")
      }
    }
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
    reporter.error("There was an error fetching posts", result.errors)
  }

  function titleToKebab(title){
    const _title = title.toLowerCase().replace(/'/g, '').split(' ');
    return _title.join('-');
  }

  const { allWpPost, allWpBook, allWpProject, allWpShortstory, allWpCategory } = result.data
  
  const postTemplate = require.resolve(`./src/templates/Post.template.tsx`)
  const bookTemplate = require.resolve('./src/templates/Book.template.tsx')
  const projectTemplate = require.resolve('./src/templates/Project.template.tsx')
  const shortStoryTemplate = require.resolve('./src/templates/Shortstory.template.tsx')
  const categoryTemplate = require.resolve('./src/templates/Category.template.tsx')
  
  if (allWpPost.nodes.length) {
    allWpPost.nodes.map(post => {
      actions.createPage({
        path: `post/${post.slug}`,
        component: postTemplate,
        context: post,
      })
    })
  }

  if (allWpBook.nodes.length) {
    allWpBook.nodes.map(book => {
      actions.createPage({
        path: `book/${book.slug}`,
        component: bookTemplate,
        context: book,
      })
    })
  }

  if (allWpProject.nodes.length) {
    allWpProject.nodes.map(project => {
      actions.createPage({
        path: `project/${project.slug}`,
        component: projectTemplate,
        context: project,
      })
    })
  }

  if (allWpShortstory.nodes.length) {
    allWpShortstory.nodes.map(story => {
      actions.createPage({
        path: `story/${story.slug}`,
        component: shortStoryTemplate,
        context: story,
      })
    })
  }

  if (allWpCategory.nodes.length) {
    allWpCategory.nodes.map(cat => {
      actions.createPage({
        path: `blog/${titleToKebab(cat.name)}`,
        component: categoryTemplate,
        context: cat
      })
    })
  }
};