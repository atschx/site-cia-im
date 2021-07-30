import * as React from 'react'
import { Link ,useStaticQuery,graphql} from 'gatsby'
import { 
    container ,
    heading,
    navLinks,
    navLinkItem,
    navLinkText,
    siteTitle
} from './index.module.css'

const Layout = ( props ) => {

    // 基于 graphql 获取 gatsby-config.js 中配置的网站标题信息。
    const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

    console.log(data)

    return(
        <div className={container}>
            <title>{props.pageTitle} | {data.site.siteMetadata.title}</title>
            <header className={siteTitle}>{data.site.siteMetadata.title}</header>
            <nav>
                <ul className={navLinks}>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>Home</Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/blog"  className={navLinkText}>Blog</Link>
                    </li>
                    <li className={navLinkItem}>
                        <Link to="/about"  className={navLinkText}>About</Link>
                    </li>
                </ul>
            </nav>
            <main>
                <h1 className={heading}>{ props.pageTitle }</h1>
                {props.children}
            </main>

            <p>Using Gatsby, hosted by Gatsby Cloud.</p>
        </div>
    )
}

export default Layout