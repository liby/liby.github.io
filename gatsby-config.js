module.exports = {
  siteMetadata: {
    title: `Bryan Lee\'s blog`,
    name: `Bryan Lee`,
    siteUrl: `https://liby.github.io`,
    description: `What I cannot create, I do not understand.`,
    hero: {
      heading: `Don't make me think.`,
      maxWidth: 500,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/liby`,
      },
      {
        name: `twitter`,
        url: `https://bit.ly/3CSfXii`,
      }
    ],
  },
  plugins: [
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Bryan Lee\'s Blog`,
        short_name: `Bryan`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-D5L27NK26B'],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      }
    }
  ],
};
