import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
    container,
    siteTitle,
    navLinks,
    navLinkItem
} from './index.module.css'

const Layout = (props) => {

    // 基于 graphql 获取 gatsby-config.js 中配置的网站标题信息。
    const data = useStaticQuery(graphql`query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    return (
        <div className={container}>
            <title>{props.pageTitle} | {data.site.siteMetadata.title}</title>
            <div class="wapper">
                <header className={siteTitle}>{data.site.siteMetadata.title}</header>
                <div class="site-header">
                    <nav class="site-nav">
                        <ul className={navLinks}>
                            <li className={navLinkItem}>
                                <Link to="/" class="page-link">Home</Link>
                            </li>
                            <li className={navLinkItem}>
                                <Link to="/blog" class="page-link">Blog</Link>
                            </li>
                            <li className={navLinkItem}>
                                <Link to="/about" class="page-link">About</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <main class="site-body">
                <h1 class="post-title">{props.pageTitle}</h1>
                {props.children}
            </main>

            <footer class="site-footer">
                <div class="wapper">
                    <h2 class="footer-heading">write now,think more(different)</h2>
                    <div class="footer-col-wrapper">
                        <div class="footer-col">
                            <ul class="contact-list">
                                <li>在宇宙中留下你的足迹</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Layout