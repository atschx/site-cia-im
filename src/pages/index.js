import * as React from "react"
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'


const IndexPage = () => {
  return (
    <Layout pageTitle="Hello, Gatsby!">
      <StaticImage alt="Clifford" src="../images/icon.png" />
      <p>本网站由 Gatsby 强力驱动，使用 Gatsby Cloud 托管。</p>
    </Layout>
  )
}

export default IndexPage