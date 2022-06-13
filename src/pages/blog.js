import * as React from 'react'
import Layout from '../components/layout'
import { Link, graphql } from 'gatsby'

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="Posts">
      <ul class='post-list'>
        {
          data.allMdx.nodes.map(node => (
            <li key={node.id}>
              {/* <article key={node.id}> */}
              <p class='post-meta'>{node.frontmatter.date}</p>
              <h2>
                <Link class='post-link' to={`/blog/${node.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h2>
              {/* </article> */}
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export const query = graphql`
query{
  allMdx(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {tag: {ne: "bio"}}}
    ) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        title
      }
      id
      slug
    }
  }
}
`

export default BlogPage