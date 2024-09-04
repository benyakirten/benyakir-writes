[![Unit Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml/badge.svg?branch=main)](https://github.com/benyakirten/benyakir-writes/actions/workflows/unit_test.yml)
[![Accessibility Tests](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml/badge.svg)](https://github.com/benyakirten/benyakir-writes/actions/workflows/accessibility_test.yml)

# Table of Contents

1. [What am I looking at?](#what-am-i-looking-at?)
2. [How do I get it working?](#how-do-i-get-it-working)
3. [Gatsby, really?](#eww-gatsby)

## What am I looking at?

A Gatsby frontend that consumes data from my WP server. I wanted an SPA and didn't like PHP much (maybe I'll give Laravel a spin at some point). Unlike my other projects from 2020/2021, I keep this one updated, and I hope you enjoy it.

## How do I get it working?

The settings is (obviously) heavily tailored to my own WordPress blog. On that end you'll need several custom post types (custom plugin in my WordPress installation) and to show them in GraphQL AND in the RestAPI, advanced custom fields and a few other plugins: 1. WPGraphQL, 2. WPGraphQL Gatsby, 3. [WPGraphQl ACF](https://github.com/wp-graphql/wp-graphql-acf), which you need to download and install as a plugin or use composer, 4. Enable GraphQL for all of your Custom Fields.

Then, once you get the WordPress installation hosted (or just running in a local environment), you'll need a WordPress server. I request you don't query data from mine! Then you should change the`options.url` property for the `gatsby-source-wordpress` plugin in [gatsby-config](./gatsby-config.js).

## Eww, Gatsby

When I first made this blog, Gatsby seemed like all the hotness. And I think it does SSG well... except for the million of plugins and dependencies that you have to keep in tune. But I want to have a project that I work on that uses React, which Astro doesn't offer (it uses JSX, but that's not the same).
