module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "benyakir-writes",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://benyakiredits.com/graphql",
      },
    },
    "gatsby-plugin-styled-components",
  ],
};
