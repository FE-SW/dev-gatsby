import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

interface SiteMetadata {
  title: string
}

interface Frontmatter {
  title: string
  date?: string
  description?: string
}

interface MarkdownRemark {
  id: string
  html: string
  frontmatter: Frontmatter
  excerpt: string
  fields: {
    slug: string
  }
}

interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: SiteMetadata
    }
    markdownRemark: MarkdownRemark
    previous?: MarkdownRemark
    next?: MarkdownRemark
  }
  location: Location
}

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: BlogPostTemplateProps) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul className="flex flex-wrap justify-between list-none p-0">
          <li>
            {previous && (
              <Link
                to={previous.fields.slug}
                rel="prev"
                className="text-blue-500 hover:text-blue-600"
              >
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                className="text-blue-500 hover:text-blue-600"
              >
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }: any) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

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
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
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
