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
      <header className="mb-8">
        <p className="text-sm text-text-gray">
          {data.mdx.frontmatter.date} •
          <a href="https://github.com/atschx" className="text-link-blue hover:text-gray-900 hover:underline ml-1">
            {data.mdx.frontmatter.author}
          </a>
          <span className="mx-2">|</span>
          阅读本文需要 {data.mdx.timeToRead} 分钟
        </p>
      </header>
      <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
        <GatsbyImage
          image={image}
          alt={data.mdx.frontmatter.hero_image_alt}
          className="w-full"
        />
      </div>
      <p className="text-sm text-text-gray mb-6">
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link} className="text-link-blue hover:text-gray-900 hover:underline">
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <div className="prose max-w-none mb-8 pl-6">
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`query MyQuery($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      author
      date(formatString: "YYYY年MM月DD日")
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