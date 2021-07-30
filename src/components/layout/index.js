import * as React from 'react'
import { Link } from 'gatsby'
import { 
    container ,
    heading,
    navLinks,
    navLinkItem,
    navLinkText
} from './index.module.css'

const Layout = ( props ) => {

    return(
        <div className={container}>
            <title>{ props.pageTitle }</title>
            <nav>
                <ul className={navLinks}>
                    <li className={navLinkItem}>
                        <Link to="/" className={navLinkText}>Home</Link>
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
        </div>
    )
}

export default Layout