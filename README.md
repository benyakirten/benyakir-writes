# Table of Contents
1. [What am I looking at?](#what-am-i-looking-at?)
2. [How to run the repository](#how-do-i-get-it-working)
3. [How does it work?](#how-does-it-work)
4. [Some notable features](#some-notable-features)
5. [Planned Changes](#planned-changes)
6. [Change Log](#change-log)

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

## Planned Changes

> Add the showcase pages from benyakiredits.com (it will be awhile before this happens. Don't hold your breath)
> Improve the filter functionality to use hash tables instead of arrays and pre-preparing search terms during the build process
> Additional improvements to efficiency with memoization
> Add unit and E2E testing

## Changelog

> 9/7/2021: 
> 1. First deployment
> 2. Fixed a few issues I didn't notice by running build before deployment, namely that I still needed to use useLocation for the page transitions. Also that I needed a backup for categories that didn't have any posts in them (such as bens-blogs, the overarching category for my regular blog pages).
> 9/8/2021: Worked on improving media queries for a few components, added a form component that uses Netlify forms and added global search functionality. I created a new hook, useLookup, for use with a hash table for faster search results. I tested it, and the difference, using all 134 blog posts/projects/etc. from my blog? About 2 milliseconds. It is, really, more efficient. It's just that I need to write a few thousand more blog posts before it starts mattering. Oh, and it increases build time from 30ish seconds to 3 minutes. That's why, for now, I haven't fixed the other search functionalities to use the more efficient hash tables. It may come in the future, but I only get 300 free built minutes per month from Netlify, and I like to be pretty far from build time.
> 9/9/2021: Tried another fix for the contact form, tried to fix the way the underbar exceeded the sidebar on some links
> 9/10/2021 (1 AM): I promise I'm going to work on testing soon. But for now I found a way to make the search functionality not (too) slow and laggy. During the createPages node process in gatsby-node, the graphql backend is queried, and the items are prepared for search then saved to a JSON file. Then that file is opened and used for the search component. Effectively, the search items are prepared on build, which works out fine because the repo is rebuilt every time a post/etc is added. I kept all the old search functionality in utils/search.ts, though most of the functionality has been remade in gatsby-node.js. One day, I will add the same sort of functionality to the other filters.
> 9/10/2021 (4 PM): Fonts now preload with use of the gatsby-plugin-preload-fonts. I promise tests are coming soon.
> 9/11/2021: Fixed a small error on the underbar for the portfolio link and now search items are automatically sorted by date.