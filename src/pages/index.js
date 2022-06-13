import * as React from "react"
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import './main.css'

const IndexPage = () => {
  return (
    <Layout pageTitle="Hello, Gatsby!">
      <div class="pf-photo">
        <StaticImage alt="Clifford" src="../images/icon.png" />
      </div>
      <p>Using <Link to="https://www.gatsbyjs.com/docs/tutorial/">gatsbyjs</Link>, hosted by <Link to="https://www.gatsbyjs.com/products/cloud/">Gatsby Cloud</Link>。</p>
    </Layout>
  )
}

export default IndexPage