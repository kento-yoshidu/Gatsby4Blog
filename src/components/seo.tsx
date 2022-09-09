import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title }: { description: string, title?: string }) => {
  const { site } = useStaticQuery(
      graphql`
        query Seo {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `
  )

  const metaDescription = description || site.siteMetadata.description
  const pageTitle = title
    ? `${title} | ${site.siteMetadata.title}`
    : site.siteMetadata.title

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ""}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

Seo.defaultProps = {
  description: ""
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default Seo
