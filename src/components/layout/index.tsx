import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import ThemeToggle from '../common/ThemeToggle';

interface LayoutProps {
  /** 页面标题 */
  pageTitle?: string;
  /** 是否禁用 prose 样式 */
  noProse?: boolean;
  /** 子元素 */
  children: React.ReactNode;
}

interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout: React.FC<LayoutProps> = ({ pageTitle, noProse, children }) => {
  // 基于 graphql 获取 gatsby-config.js 中配置的网站标题信息。
  const data = useStaticQuery<SiteMetadata>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 font-light min-h-screen flex flex-col">
      <title>
        {pageTitle} | {data.site.siteMetadata.title}
      </title>

      {/* 标题部分 */}
      <header className="py-8 text-center relative">
        <div className="absolute right-0 top-8">
          <ThemeToggle />
        </div>
        <Link to="/" className="inline-block hover:no-underline">
          <h1 className="text-4xl md:text-5xl text-gray-700 font-light tracking-tight mb-0 dark:text-dark-text">
            {data.site.siteMetadata.title}
          </h1>
        </Link>
      </header>

      {/* 导航部分 */}
      <nav className="border-t-2 border-b border-border-gray py-4 mb-8 dark:border-dark-border">
        <ul className="flex flex-wrap justify-center md:justify-start list-none m-0 p-0">
          <li className="mr-8 mb-2">
            <Link
              to="/"
              className="text-link-blue hover:text-gray-900 hover:underline dark:text-dark-link dark:hover:text-white"
            >
              首页
            </Link>
          </li>
          <li className="mr-8 mb-2">
            <Link
              to="/blog"
              className="text-link-blue hover:text-gray-900 hover:underline dark:text-dark-link dark:hover:text-white"
            >
              博客
            </Link>
          </li>
          <li className="mr-8 mb-2">
            <Link
              to="/photography"
              className="text-link-blue hover:text-gray-900 hover:underline dark:text-dark-link dark:hover:text-white"
            >
              摄影
            </Link>
          </li>
          <li className="mr-8 mb-2">
            <Link
              to="/about"
              className="text-link-blue hover:text-gray-900 hover:underline dark:text-dark-link dark:hover:text-white"
            >
              关于
            </Link>
          </li>
        </ul>
      </nav>

      {/* 主要内容区域 */}
      <main className="py-6 flex-grow">
        {pageTitle && (
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8 dark:text-dark-text">
            {pageTitle}
          </h1>
        )}
        <div className={`${noProse ? '' : 'prose'} max-w-none dark:prose-invert`}>
          {children}
        </div>
      </main>

      {/* 页脚部分 */}
      <footer className="border-t border-border-gray py-8 mt-auto text-text-gray dark:border-dark-border dark:text-gray-400">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-light mb-4 dark:text-dark-text">
              write now,think more(different)
            </h2>
            <p className="text-sm dark:text-gray-400">在宇宙中留下你的足迹</p>
          </div>
          <div className="text-sm text-right">
            © {new Date().getFullYear()} 保留所有权利
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
