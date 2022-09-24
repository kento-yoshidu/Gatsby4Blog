import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { Link } from "gatsby"

import * as Styles from "../styles/blog-post.module.scss"

import Seo from "../components/seo"
import Header from "../components/Header"
import PostInfo from "../components/PostInfo"

import "prismjs/themes/prism-tomorrow.css"
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

const BlogPostTemplate = ({ data }: { data: Queries.BlogPostBySlugQuery }) => {
  const { markdownRemark } = data
  const { previous } = data
  const { next } = data


  return (
    <Layout>
      <Header />

      <PostInfo
        postInfo={data.markdownRemark?.frontmatter}
      />

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <main
          dangerouslySetInnerHTML={{ __html: markdownRemark?.html || "" }}
          itemProp="articleBody"
          className={Styles.blogPost}
        />
      </article>

      {previous && (
        <p><Link to={previous.fields?.slug}>{previous.frontmatter?.title}</Link></p>
      )}

      {next && (
        <p><Link to={next.fields?.slug}>{next.frontmatter?.title}</Link></p>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({ data: { markdownRemark: post } }: { data: Queries.BlogPostBySlugQuery }) => (
  <Seo
    title={post?.frontmatter?.title || ""}
    description={post?.frontmatter?.description || ""}
  />
)

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        postdate(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        description
        seriesSlug
        seriesName
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
