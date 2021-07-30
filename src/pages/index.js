import * as React from "react"
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'


const IndexPage = () => {
  return (
    <Layout pageTitle="Hello, Gatsby!">
      <StaticImage alt="Clifford" src="../images/icon.png" />
    </Layout>
  )
}

export default IndexPage