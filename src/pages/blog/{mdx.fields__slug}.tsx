import * as React from 'react';
import Layout from '../../components/layout';
import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface BlogPostData {
  mdx: {
    frontmatter: {
      title: string;
      author: string;
      date: string;
      hero_image_alt: string;
      hero_image_credit_link: string;
      hero_image_credit_text: string;
      hero_image: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData;
        };
      };
    };
  };
}

interface BlogPostProps extends Omit<PageProps<BlogPostData>, 'children'> {
  children: React.ReactNode;
}

const BlogPost: React.FC<BlogPostProps> = ({ data, children }) => {
  const image = getImage(data.mdx.frontmatter.hero_image);

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <header className="mb-8">
        <p className="text-sm text-text-gray">
          {data.mdx.frontmatter.date} •
          <a
            href="https://github.com/atschx"
            className="text-link-blue hover:text-gray-900 hover:underline ml-1"
          >
            {data.mdx.frontmatter.author}
          </a>
        </p>
      </header>
      <div className="mb-4 rounded-lg overflow-hidden shadow-lg">
        {image && (
          <GatsbyImage
            image={image}
            alt={data.mdx.frontmatter.hero_image_alt}
            className="w-full"
          />
        )}
      </div>
      <p className="text-sm text-text-gray mb-6">
        Photo Credit:{' '}
        <a
          href={data.mdx.frontmatter.hero_image_credit_link}
          className="text-link-blue hover:text-gray-900 hover:underline"
        >
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
      <div className="prose max-w-none mb-8 pl-6">{children}</div>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        author
        date(formatString: "YYYY年MM月DD日")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      excerpt(pruneLength: 160)
    }
  }
`;

export const Head: React.FC<PageProps<BlogPostData>> = ({ data }) => {
  const { title, author, date } = data.mdx.frontmatter;
  const excerpt = (data.mdx as any).excerpt || '';

  return (
    <>
      <title>{title} | Always-fat's Blog</title>
      <meta name="description" content={excerpt} />
      <meta name="author" content={author} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={excerpt} />
      <meta property="og:type" content="article" />
      <meta property="article:author" content={author} />
      <meta property="article:published_time" content={date} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={excerpt} />
    </>
  );
};

export default BlogPost;
