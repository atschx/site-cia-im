module.exports = {
  siteMetadata: {
    siteUrl: "https://cia.im",
    title: "Always-fat's Blog",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        mdxOptions: {
          remarkPlugins: [
            require('remark-gfm'),
          ],
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              quality: 90,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `header-link-icon`,
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: false,
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              showLineNumbers: true,
            },
          },
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
};
