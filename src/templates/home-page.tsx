import * as React from 'react';
import Layout from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';

interface HomePageProps {
  children: React.ReactNode;
}

/**
 * 首页模板组件
 * 内容由 MDX 文件 (blog/home.mdx) 提供
 */
const HomePage: React.FC<HomePageProps> = ({ children }) => {
  return (
    <Layout>
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
        {/* 个人头像 */}
        <div className="mb-6 md:mb-0">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-border-gray bg-code-bg p-1">
            <StaticImage
              alt="个人头像"
              src="../images/icon.png"
              className="rounded-full"
              imgClassName="rounded-full"
            />
          </div>
        </div>

        {/* MDX 内容区域 */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-light mb-6">
            Write now,think more(different).
          </h1>
          <div className="prose max-w-none dark:prose-invert">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
