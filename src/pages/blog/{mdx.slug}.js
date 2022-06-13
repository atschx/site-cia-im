import * as React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const BlogPost = ({ data }) => {

  // console.log(data.mdx.tableOfContents)
  const image = getImage(data.mdx.frontmatter.hero_image)

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <header class="post-header">
        <p class="post-meta">{data.mdx.frontmatter.date} • <a href="https://github.com/atschx">{data.mdx.frontmatter.author}</a> | 阅读本文需要 {data.mdx.timeToRead} 分钟</p>
      </header>
      <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`query MyQuery($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      author
      date(formatString: "MMMM D, YYYY")
      hero_image_alt
      hero_image_credit_link
      hero_image_credit_text
      hero_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
    body
    timeToRead
    tableOfContents
  }
}
`

export default BlogPost