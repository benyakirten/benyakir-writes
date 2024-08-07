[![Unit Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml/badge.svg?branch=main)](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml)
[![Accessibility Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml/badge.svg)](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml)

# Table of Contents

1. [What am I looking at?](#what-am-i-looking-at?)
2. [How to run the repository](#how-do-i-get-it-working)
3. [How does it work?](#how-does-it-work)
4. [Some notable features](#some-notable-features)
5. [Notes About Unit Testing](#some-notes-about-unit-testing)
6. [Planned Changes](#planned-changes)

## What am I looking at?

This is Benyakir Writes. It is a frontend using GatsbyJS that consumes from the same WordPress provider as my blog. Effectively, it is my blog but with Gatsby to make a SPA instead of using PHP. The reasons why I used Gatsby over another service is 1. I wanted to get some experience with Gatsby since I had already learned Next decently (though no project for it yet), 2. It uses GraphQL and has an ready-made plugin for WordPress. That's what I thought, at least, when I began. It's a bit more complicated than that. I had to add a few plugins and configure them on my WordPress installation (check out my Benyakir's Blog readme for the details).

Being powered by React makes it a lot easier to make everything feel like one large application. Which, obviously, both the WordPress side and the Gatsby side are, but, like, the sidebar persists which menus are open and stuff. Also, Gatsby has a great setup for static site generation, which is great. Also GatsbyImage and StaticImage are fantastic in general. Once upon a time, I wasn't a big fan of JAMStack, thinking of them as a cheap way to get around bad SEO for SPAs, but now I've grown to appreciate them, even though they're very opinionated.

## How do I get it working?

You will need a few things. This installation is obviously heavily tailored to my own WordPress blog. On that end you'll need several custom post types and to show them in GraphQL (I used my own plugin to make these post types) AND in the RestAPI, advanced custom fields and a few other plugins: 1. WPGraphQL, 2. WPGraphQL Gatsby, 3. [WPGraphQl ACF](https://github.com/wp-graphql/wp-graphql-acf), which you need to download and install as a plugin or use composer, 4. Enable GraphQL for all of your Custom Fields.

Then, once you get the WordPress installation hosted (or just running in a local environment), you'll need to create a .env.development and .env.production for development or production. Each must have a WP_URL environment variable. Or you can change gatsby-node to go directly to the URL if you don't need this functionality. Just to warn you, I highly suggest you test out both the production WP server and the development server before deployment to make sure everything works.

Once you have all this done, package.json lists the commands. I added dev so I wouldn't have to write out develop. Also, I exposed the dev server on the local network so I could visit the page from other devices. Watch out for that if you're not working in your home environment or whatever. You can just do this instead:

    npm run develop

## Some notable features

This is my first foray into Styled Components, so I had fun with that. I thought I'd hate them, but I found them really easy to work with. I think my favorite CSS framework is Tailwind, but I think I'm going to now use Styled Components when I work in React. I would definitely like to have used them when I was working on Recovering Grandeur, so I'll probably use them in my next Vue project too.

What I'm most proud of is in utils/identify-blocks.tsx. So, if you didn't know, WordPress stores the escaped HTML of any post/page in the database. So when you're using Gatsby with a WordPress server, you have one of two options: 1. parse the blocks for their content and then compile it in whatever you want or 2. frequently use the dangerouslySetHtml property on a lot of blocks. I, being the person I am, used the second option because it is the one used on the gatsby-wordpress-source official plugin and because that's a lot of work, even if it's mostly serial paragraphs, headings and lists. And knowing myself, I would make a ton of errors, and it would take me a few months to get them all corrected. Look, I work on the frontend, mostly, and Node/Python for the backend. I'm not going to write my own HTML compiler.

If you've studied the Syntax Highlighter custom block I made (hah, hah, no, I know you didn't), it is saved as a div with a special class that contains an invisible pre element with the information just written to it. What happens is that the blog post is made into a block, which is then looped through to detect divs with the special class. If they're detected, each block is aded to the loop in the correct order then searched for more divs. It could easily use recursion, but I did it with a for loop through an array whose length may grow.

Page transitions use react-transition-group instead of the usual Gatsby page transition plugins. They weren't working for one reason or another. All pages for blog categories (other than none), blog posts, projects, short stories and books are dynamically (then statically) generated. so typical Gatsby fare.

## Notes About Unit Testing

I can't figure out how to test the CustomLink's :after pseudoelement. When using native img elements, I couldn't figure out how to set the onerror property. Other than those things, I was able to test virtually every property I saw fit. The three big exceptions are 1. a few style properties, especially pseudo elements; 2. the category template component. I believe I'm running into problems because upon mount, the component loads a json file based on the category name, causing the state to update; 3. all the filter components using the new useDebounce hook were having an internal state change as soon as the component loaded. This usually doesn't cause a problem, but @testing-library/react cannot test state changes if this happens. Therefore, I had to add a special check that wouldn't modify the text search if the new text was empty and the already existing search was an empty array. This will never happen in real life and is an unnecessary check, but thankfully it should only cause O(2) additional time complexity per render.

One last note: if you run the tests, your terminal will flip out, but all the tests run correctly. As far as I can tell, these are eccentricities of Gatsby (and mostly come from adding custom props to a styled component that inherits from Gatsby's Link component), For example, it doesn't like that I named one prop underbarsize or that dark is a non-boolean property (or that it is?). Nevertheless, it all works correctly, so I don't know.

## Planned Changes

> Add the showcase pages from benyakiredits.com
> Add buttons to the theme customization page so they can be used in addition to the drag and drop features
> Add unit tests for all the new components/functions/etc - these are: the theme page and the draggable components that cause events (not the lists) because UI or organizational items aren't that interesting to test, especially with TypeScript already doing most of the testing I would, checking for correct props - the header components and the theme variant components are be tested in the various components
> Add customizable font sizes and allow all items to be moved around
> Fix spacing in styled components

## Known Bugs (to be fixed)

- Please tell me if you see a bug. I try to fix them as soon as I see them, even if I said I was taking a break and no longer working on this project.
