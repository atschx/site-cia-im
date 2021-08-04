import * as React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const BlogPost = ({ data }) => {

    console.log(data.mdx.tableOfContents)

    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <p>{data.mdx.frontmatter.date} | 阅读本文需要 {data.mdx.timeToRead} 分钟</p>
            <MDXRenderer>
                 {data.mdx.body}
            </MDXRenderer>
        </Layout>
    )
}

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
      timeToRead
      tableOfContents
    }
  }
`

export default BlogPost