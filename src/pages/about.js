import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'

const AboutPage = () => {
    return (
        <Layout pageTitle="I'm always-fat.">
            <p>十年磨一剑，岁月不饶人。欢迎来撩，微信公众号：常胖。</p>
            <StaticImage alt="Clifford" src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg"/>
        </Layout>
    )
}

export default AboutPage