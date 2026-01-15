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

  // Query for special MDX pages (home and about)
  const result = await graphql(`
    query {
      # 首页 MDX (tag: "home")
      homeMdx: mdx(frontmatter: { tag: { eq: "home" } }) {
        id
        internal {
          contentFilePath
        }
      }
      # 关于页面 MDX (tag: "bio")
      aboutMdx: mdx(frontmatter: { tag: { eq: "bio" } }) {
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

  // Create home page from MDX
  const homeMdx = result.data.homeMdx
  if (homeMdx) {
    createPage({
      path: '/',
      component: `${path.resolve('./src/templates/home-page.tsx')}?__contentFilePath=${homeMdx.internal.contentFilePath}`,
      context: {
        id: homeMdx.id,
      },
    })
  }

  // Create about page from MDX
  const aboutMdx = result.data.aboutMdx
  if (aboutMdx) {
    createPage({
      path: '/about',
      component: `${path.resolve('./src/templates/about-page.tsx')}?__contentFilePath=${aboutMdx.internal.contentFilePath}`,
      context: {
        id: aboutMdx.id,
      },
    })
  }
}
