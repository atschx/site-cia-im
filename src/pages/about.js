import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const AboutPage = ({ data }) => {
  return (
    <Layout pageTitle="Write now,think more(different).">
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    </Layout>
  )
}

export const query = graphql`{
  mdx(frontmatter: {tag: {eq: "bio"}}) {
    frontmatter {
      title
      date(formatString: "MMMM D, YYYY")
    }
    body
  }
}`

export default AboutPage