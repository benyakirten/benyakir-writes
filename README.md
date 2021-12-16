[![Unit Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml/badge.svg?branch=main)](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml)
[![Accessibility Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml/badge.svg)](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml)
# Table of Contents
1. [What am I looking at?](#what-am-i-looking-at?)
2. [How to run the repository](#how-do-i-get-it-working)
3. [How does it work?](#how-does-it-work)
4. [Some notable features](#some-notable-features)
5. [Notes About Unit Testing](#some-notes-about-unit-testing)
6. [Planned Changes](#planned-changes)
7. [Change Log](#change-log)

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

One last note: if you run the tests, your terminal will flip out, but all the tests run correctly. As far as I can tell, these are eccentricities of Gatsby (and mostly come from adding custom props to a styled component that inherits from Gatsby's Link component), For example, it doesn't like that I named one prop underbarSize or that dark is a non-boolean property (or that it is?). Nevertheless, it all works correctly, so I don't know.

## Planned Changes

> Add the showcase pages from benyakiredits.com
> Add customizable pallets and various options for theme

## Changelog

*  9/7/2021: 
> 1. First deployment
> 2. Fixed a few issues I didn't notice by running build before deployment, namely that I still needed to use useLocation for the page transitions. Also that I needed a backup for categories that didn't have any posts in them (such as bens-blogs, the overarching category for my regular blog pages).
* 9/8/2021: Worked on improving media queries for a few components, added a form component that uses Netlify forms and added global search functionality. I created a new hook, useLookup, for use with a hash table for faster search results. I tested it, and the difference, using all 134 blog posts/projects/etc. from my blog? About 2 milliseconds. It is, really, more efficient. It's just that I need to write a few thousand more blog posts before it starts mattering. Oh, and it increases build time from 30ish seconds to 3 minutes. That's why, for now, I haven't fixed the other search functionalities to use the more efficient hash tables. It may come in the future, but I only get 300 free built minutes per month from Netlify, and I like to be pretty far from build time.
* 9/9/2021: Tried another fix for the contact form, tried to fix the way the underbar exceeded the sidebar on some links
* 9/10/2021 (1 AM): I promise I'm going to work on testing soon. But for now I found a way to make the search functionality not (too) slow and laggy. During the createPages node process in gatsby-node, the graphql backend is queried, and the items are prepared for search then saved to a JSON file. Then that file is opened and used for the search component. Effectively, the search items are prepared on build, which works out fine because the repo is rebuilt every time a post/etc is added. I kept all the old search functionality in utils/search.ts, though most of the functionality has been remade in gatsby-node.js. One day, I will add the same sort of functionality to the other filters.
* 9/10/2021 (4 PM): Fonts now preload with use of the gatsby-plugin-preload-fonts. I promise tests are coming soon.
* 9/11/2021: Fixed a small error on the underbar for the portfolio link and now search items are automatically sorted by date.
* 9/12/2021: Added a small fix to the foldout height between 900px and 1400px
* 9/20/2021: A humongous amount of changes and the first set of unit tests.
> 1. Filter functionality has been fixed in the book and story filters. Dates were previously set incorrectly and any new upper limit would be set to the lower limit and vice versa. This has been fixed.
> 2. Search functionality now properly uses the useEffect hook so that the search no longer only changes when the search string changes. Now, if there is a search string and one of the categories becomes enabled/disabled, the search will dynamically show the results instead of needing to change the search string
> 3. The choice input component now properly takes on the checkbox role and has an aria-checked property as well as a label.
> 4. Added memoization to most components that processed posts (mostly filters)
> 5. I noticed that the latestUpdate field on my WordPress blog was giving dates as d/m/y instead of m/d/y, which was causing errors.
> 6. A whole lot of minor fixes I should've written down as I was doing them like random log statements I forgot to delete. Oh, I remembered another one right now. The logo now longer errors out if the static query cannot retrieve the icon.
* 9/24/2021: A humongous amount of changes:
> 1. I figured out what the problem was with testing the button component. I just had to let jest run through the timers so that unit test is nwo functioning
> 2. Filter pages now use pagination with a few options to customize them. It streamlines things, reduces load time and increases accessibility.
> 3. Made some minor accessibility changes to the sidebar - more changes coming int he future
> 4. I changed cards to use a monospace font. This way how much space the content is relatively equal per word (minus line breaks)
> 5. All data for the filters is created during the static build process, much like the global search items. This way they are generated at build time and not whenever the page is loaded. There are a number of additional effeciency I added into this (it was my plan to do it separately, but it worked out this way).
> 6. The content/excerpt is limited to 150-200 words depending on the category
> 7. The meta criteria is generated as a hashtable. This limits search time to O(n * m) (instead of of O(m * n * o)), though n is an array of length 1-2 usually. To go with this, the filters now use the hashtable instead of the string to filter. The one disadvantage is that partially completed search strings will now no longer give the results for the full string (such as typing 'ap' instead of 'api'). This, however, I think is worth it because the slight decrease in functionality greatly increases effeciency - words for a programmer to die by.
> 8. Decreased the debounce timeout for the filter string to search for the items. 600ms felt like it was loading something instead of waiting for the input to be complete. 250ms now gives the user a moment to search.
> 9. Unit tests have been fixed to work with these new changes.
* 9/26/2021: Added E2E tests for accessibility and obviously changed a bunch of stuff to increase accessibility. For some reason, this gives a bunch of weird messages, durign the build process, but I have no idea why. I may do more E2E tests, but almost all functionality is covered under the normal tests. I also added the static filter files to .gitignore so they're forcibly generated. Because of this, the file system now generates the appropriate folders if they don't exist already. I also formatted the messages using the reporter given to the method during the build process so they look more similar to the other gatsby messages (I swear this has nothing to do with adding the weird messages).
* 9/26/2021 (later): Forgot to delete a console log and a few tweaks for smaller screens.
* 9/27/2021: I thought I was just going to update the text on a few items. Turns out I needed to fix the test suite. To be honest, the unit tests are way more brittle than I thought they would be. I will have to consider how I unit test React components in the future. The accessibility tests found new color contrast errors I had no idea about. I have fixed them, though I'm unsure if it will find more. It all seems functional now.
* 10/1/2021: Adjusted some styles for media queries. Notably, reduced the font size for phones and made the expanded sidebar smaller.
* 10/13/2021: Added Travis for CI
* 10/23/2021: Added some memoization. A lot of extraneous stuff gets painted for reasons I'm not sure yet. I'll have to investigate.
* 12/5/2021 (pt. 1): Changed the sidebar to become just an icon on mobile when it's closed (to save screen space, inspired by me browsing elixirschool.com). I also updated gatsby to v4.3, not of my volition but because my WP plugin stopped working.
* 12/5/2021 (pt. 2):  Added github action because Travis CI no longer wants to let me test for free. Also changed the SyntaxHighlighter unit test and now put in a timer to measure how long static generation for search indexing takes.
* 12/6/2021: Remove travis workflow
* 12/10/2021: A lot of UI updates and adding day/night/customizable themes
> 1. The clickable part of the sidebar now should not exceed the sidebar
> 2. IconGrid is now a grid instead of a flexbox
> 3. Added a useValidation hook and changed past self-contained validation to use it
> 4. Project Cards are now divided into two parts with fixed widths
> 5. The Logo is now a div with a mask of the SVG. That way I can change the fill without having to use an svg tag.
> 6. Change text inputs and textareas to have a border, not an outline.
> 7. Pagination now sets all items within it to a certain width instead of cards specifically having that width
> 8. A lot of color variables have been rendered useless and been replaced by color themes - they will be removed soo 
> 9. A new day/night toggle is available on the sidebar.
> 10. To accomplish this, I added redux. For testing, I added a wrapper and removed most snapshots because snapshot testing isn't great in the first place. DownArrow is the only component that still uses it. The wrapper must include the Layout component since it contains the theme settings for the styled components. Long story short, all unit tests that required a certain button or image now have to contend with another button or image.
* 12/14/2021: I've built out a few features from the previous step. To be more exact:
> 1. GitHub actions run only on pull request, not on push
> 2. Fixed the readme to not be hot garbage. I can preview the markdown file without uploading it so I have no excuse.
> 3. Changed the default color theme to day
> 4. Changed how projects were displayed - they now have a header like posts/books/stories
> 5. Moved the headers for blog posts/books/stories/projects into their own components.
> 6. Added custom Cypress commands to cut down slightly on the repetition that was added with the new tests for color themes. I also found out that the syntax highlighter made by prism light needed a tabindex of 0 or something. It never showed up on the accessibility tests before, but I'm always happy to make thiings more accessible.