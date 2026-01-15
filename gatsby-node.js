const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for the about MDX file
  const result = await graphql(`
    query {
      mdx(frontmatter: {tag: {eq: "bio"}}) {
        id
        internal {
          contentFilePath
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // Create about page from the bio MDX
  const aboutMdx = result.data.mdx
  if (aboutMdx) {
    createPage({
      path: '/about',
      component: `${path.resolve('./src/templates/about-page.js')}?__contentFilePath=${aboutMdx.internal.contentFilePath}`,
      context: {
        id: aboutMdx.id
      }
    })
  }
}
