import type { GatsbyConfig } from "gatsby"

const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: "鳥に生まれることができなかった人へ",
  author: {
    name: "Kento Yoshizu"
  },
  description: "A blog by Gatsby.",
  siteUrl: "https://gatsbystarterblogsource.gatsbyjs.io/"
}

const plugins: GatsbyConfig["plugins"] = [
  "gatsby-plugin-postcss",
  "gatsby-plugin-image",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      path: `${__dirname}/content/blog`,
      name: "blog"
    }
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: `${__dirname}/src/images`
    }
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 630
          }
        },
        {
          resolve: "gatsby-remark-responsive-iframe",
          options: {
            wrapperStyle: "margin-bottom: 1.0725rem"
          }
        },
        "gatsby-remark-prismjs",
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-smartypants"
      ]
    }
  },
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-plugin-feed",
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.nodes.map((node) => {
              return Object.assign({}, node.frontmatter, {
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ "content:encoded": node.html }]
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                nodes {
                  excerpt
                  html
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    date
                  }
                }
              }
            }
          `,
          output: "/rss.xml",
          title: "Gatsby Starter Blog RSS Feed"
        }
      ]
    }
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "Gatsby Starter Blog",
      short_name: "GatsbyJS",
      start_url: "/",
      background_color: "#ffffff",
      display: "minimal-ui",
      icon: "src/images/gatsby-icon.png"
    }
  }
]

const config: GatsbyConfig = {
  siteMetadata,
  plugins,
  graphqlTypegen: true
}

export default config
