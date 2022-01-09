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
> Add buttons to the theme customization page so they can be used in addition to the drag and drop features
> Add unit tests for all the new components/functions/etc - these are: the theme page and the draggable components that cause events (not the lists) because UI or organizational items aren't that interesting to test, especially with TypeScript already doing most of the testing I would, checking for correct props - the header components and the theme variant components are be tested in the various components
> Add customizable font sizes and allow all items to be moved around
> Fix spacing in styled components

## Known Bugs (to be fixed)
* Please tell me if you see a bug. I try to fix them as soon as I see them, even if I said I was taking a break and no longer working on this project.

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
* 12/16/2021: I've built out a few features from the previous step. To be more exact:
> 1. Fixed the readme to not be hot garbage. I can preview the markdown file without uploading it so I have no excuse.
> 2. Changed the default color theme to day
> 3. Changed how projects were displayed - they now have a header like posts/books/stories
> 4. Moved the headers for blog posts/books/stories/projects into their own components.
> 5. Added custom Cypress commands to cut down slightly on the repetition that was added with the new tests for color themes. I also found out that the syntax highlighter made by prism light needed a tabindex of 0 or something. It never showed up on the accessibility tests before, but I'm always happy to make thiings more accessible.
* 12/20/2021: I realized that the night theme had some bad colors in it, so I pushed when the theme page isn't built out. But now, I've done the following.
> 1. GitHub actions run only on pull request, not on push
> 2. Fixed one last time I didn't use the new cypress command. This makes the GH Actions Accessibility tests work
> 3. Changed the name of useDropdown to useAlternation. This is because it was no longer just used for dropdowns. However, alternation isn't a great name, and toggle fits more, but useToggle is already taken by a hook that could, theoretically, be called useOnOff, but useToggle is a great solution. I'll have to ponder this.
> 4. Added some drag and drop components because I always need practice with them. Oh yeah, and they were useful here.
* 12/29/2021: Everything's a work in progress.
> 1. Fixed some stuff so by default the theme should work with your computer color preference.
> 2. Changed the import path for hooks so they're all just exported from one @Hooks path.
> 3. It inspired me to do that for all components. It involved a lot of me double checking import paths.
> 4. I took the opportunity to also make spacing much more consistent in all the components. It should be two spaces everywhere. However, in styled components prettier doesn't automatically register it because it's a template literal. Long story short, it's on my to-do list.
> 5. Added a useMultiple hook - I added also a useValidation hook on 12/10, I just forgot to mention it in the notes.
> 6. Add a recursive function to search from a dom node to the body tag if any element has a specific attribute. It's super simple and was needed for at least several months. I just forgot to put it in.
> 7. Added a max-width to the topbar of the foldout component. It fits much better now.
> 8. Added a recursive function to flatten a theme into an array of property groups, each with an array of properties, each of which defines an array of accessors (just strings that I use to access the properties on objects) - yeah, the type is string[][][]
> 9. I figured out reference types in time to figure out how to write a function that accesses and sets nested object properties. Yes, this is a joke, but I wrote an eval function then I was like... wait. My excuse is that it's not the usual code I write because I try to mimic functional programming styles (at least somewhat, I am spoiled by loops and if clauses).
> 10. So that recursive function is to define a shape of how to access all the  nested properties of a theme so it never needs to be updated (except maybe for looks and stuff). I don't work on things on my portfolio for them to work well or look nice. I do it to push the boundaries of what I know how to do and to implement something I've read about but never really experimented with.
* 12/31/2021:
> 1. Added back in tests on push. I forgot the main reason I did this: so I wouldn't always have to run the tests manually, or that it would run the tests even if I forgot to do them myself.
> 2. Added an SVGContainer component that uses an SVG as a mask over a DIV. Basically, it was how the logo worked, but now it's a component for SVG items in general.
> 3. Added in those buttons to the themes so you don't have to drag and drop to interact with them. But you can do that too. Please. Just try it.
> 4. Added some accessibility tests. What's really annoying is finding the ONE tabbable element that's supposed to be hidden.
> 5. I'm sorry. I'm not adding unit tests for right now. It's really close to New Year's, and I have to admit I hate writing unit tests., especially for components. I plan on adding them in the coming weeks, but right now I've got interviews and celebrating with my family on my mind.
* 12/31/2021 (later):
> 1. I accidentally disabled some accessibility tests. I enabled them. Oh, and I disabled one accessibility test that was failing on pull requests but not pushes and not on my computer. It's on blog pages when I change the category, and I am suspecting that for some reason the GH Action on pull requests isn't building out the data correctly. But I can't figure that one out right now, and so I'll just disable it until I have the time to run a 10 minute check every time I want to see if it's working.
> 2. I added in unit tests for the hooks and the new utils. If it isn't clear, I usually don't like writing unit tests for components. But it's by far the best way to test certain functionality. The life of a programmer!
* 1/2/2021:
> 1. Screw it. Only run the GH Actions on push. That way the accessibility tests don't get caught up on some weird thing or other. I'm not going to give GH Actions the satisfaction of failing my accessibility tests arbitrarily.
> 2. Wow, I forgot to put keys on DestinationItems in the DestinationList. I usually don't mess that up, do I?
> 3. Uh, I forgot to set the role of IconButton to button. I kinda forgot.
> 4. I added unit tests for the ReorderableItem and DestinationItem but not the lists of each because the lists are mostly just to render a list of said items. TypeScript tests for almost everything that I would test for.
> 5. I also added the other unit tests I said I was going to add. It was less work than I thought it would be, but it was basically as tedious as I thought. At least I'm getting good at unit testing React components. That's good, right? Right?
> 6. A few notes: I didn't test the header components or the individual parts of the theme page. They were just better covered under the tests for the larger pages.
* 1/3/2021: Added aria-pressed to the toggle component and keydown event handlers for space and enter to the icon button component. I forgot about some aria rules, and I apologize!
* 1/4/2021:
> 1. I really forgot the easiest way to swap two items in an array and wrote the code like ES2015 didn't exist. I apologize. I swear I remembered it when I was writing the code, I just forgot why I remembered it and then swiftly forgot about it.
> 2. I made the theme controls into more components and made the organization more logical. There's more refactoring to be done, but it'll be awhile. I'm taking a break and then working on another project. If you want to know, it'll be a fullstack project. Either it will be one Nuxt project to handle both frontend and backend or SvelteKit and Elixir to handle database interactions and web sockets.
* 1/4/2021 (later): Okay, I swear I'm done after this.
> 1. I realized I had forgotten that mobile devices can't drag and drop. So I added a media query to detect it and disable the drop targets on mobile, freeing up screen space.
> 2. Added a fadein to when a theme is selected for modification.
* 1/5/2021: Okay, this really is the last thing... unless I notice or remember something.
> 1. I realized it was way better to have the droppable theme options (set as preferred/etc.) as separate components. Yes, it should never have been any other way, and I've fixed it.
> 2. Whoopsy. It was possible to delete the day and night theme. That's fixed now.
> 3. In honor of Elixir, I decided to make the nested object accessor functions into recursive functions, meaning getThemeProps of utils/other and changePropOnTheme (okay, because of Redux Toolkit, it's easoer not to use a pure function, but the accessing part is a recursive function).
* 1/9/2021: I discovered two errors: on large screens, when the sidebar is open the links are still spilling over and that color changes weren't working on nested properties.
> The first one was super easy to fix. It just involved me moving a little CSS around.
> The latter one... let me tell you. Did you know that in JavaScript a condition can also be an assignment? For example, if I wrote ```if (accessor.length = 1) { ... }``` then it assigns accessor.length the value of 1? Yeah, so I knew about that, and I even remarked on it. It's a bit like the walrus operator in Python, but you don't even need the walrus. Turns out I wrote that exact line above instead of accessor.length === 1. I feel like an idiot.
> Oh, I also split up the words some of the theme properties if they were compound words (offColor) so now they display as Off Color (instead of OffColor)
