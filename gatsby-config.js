require("dotenv").config();

module.exports = {
	siteMetadata: {
		siteUrl: "https://www.benyakir-writes.com",
		title: "Benyakir Writes",
	},
	plugins: [
		"gatsby-plugin-sharp",
		"gatsby-plugin-image",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/files/`,
			},
		},
		{
			resolve: "gatsby-source-wordpress",
			options: {
				url: "https://benyakiredits.com/graphql",
			},
		},
		"gatsby-plugin-styled-components",
		{
			resolve: "gatsby-plugin-typescript",
			options: {
				isTSX: true, // defaults to false
				jsxPragma: "jsx", // defaults to "React"
				allExtensions: true, // defaults to false
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "Benyakir Writes",
				short_name: "Ben Writes",
				start_url: "/",
				background_color: "#000",
				theme_color: "#fff",
				display: "standalone",
				icon: "src/files/images/icon.png",
			},
		},
		{
			resolve: "gatsby-plugin-posthog",
			options: {
				// Specify the API key for your PostHog Project (required)
				apiKey: process.env.POSTHOG_KEY,
				apiHost: process.env.POSTHOG_HOST,
				head: true,
				isEnabledDevMode: false,
			},
		},
	],
};
