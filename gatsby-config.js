module.exports = {
	siteMetadata: {
		siteUrl: "https://www.benyakir-writes.com",
		title: "Benyakir Writes",
	},
	plugins: [
		["gatsby-plugin-netlify"],
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
	],
};
