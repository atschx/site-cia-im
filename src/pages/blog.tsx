import * as React from 'react';
import Layout from '../components/layout';
import { Link, graphql, PageProps } from 'gatsby';

interface BlogNode {
  frontmatter: {
    date: string;
    title: string;
  };
  id: string;
  fields: {
    slug: string;
  };
  excerpt: string;
}

interface BlogPageData {
  allMdx: {
    nodes: BlogNode[];
  };
}

const BlogPage: React.FC<PageProps<BlogPageData>> = ({ data }) => {
  return (
    <Layout pageTitle="博客文章">
      <ul className="list-none pl-0 space-y-10">
        {data.allMdx.nodes.map((node) => (
          <li key={node.id} className="border-b border-border-gray pb-8">
            <article>
              <p className="text-sm text-text-gray mb-2">{node.frontmatter.date}</p>
              <h2 className="text-2xl font-light mb-3">
                <Link
                  to={`/blog${node.fields.slug}`}
                  className="text-link-blue hover:text-gray-900 hover:underline"
                >
                  {node.frontmatter.title}
                </Link>
              </h2>
              {node.excerpt && (
                <p className="text-text-gray text-base mb-4">{node.excerpt}</p>
              )}
              <Link
                to={`/blog${node.fields.slug}`}
                className="text-sm text-link-blue hover:text-gray-900 hover:underline inline-flex items-center"
              >
                阅读全文
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tag: { ne: "bio" } } }
    ) {
      nodes {
        frontmatter {
          date(formatString: "YYYY年MM月DD日")
          title
        }
        id
        fields {
          slug
        }
        excerpt(pruneLength: 160)
      }
    }
  }
`;

export default BlogPage;
