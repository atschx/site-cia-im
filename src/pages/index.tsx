import * as React from 'react';
import Layout from '../components/layout';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
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
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-light mb-6">
            Write now,think more(different).
          </h1>

          <blockquote className="mb-8 italic">
            <p className="mb-2 text-sm">
              对于值得的事，永远不会太晚，或者在我的情况下，太早，成为你想成为的人。
            </p>
            <p className="mb-2 text-sm">没有时间限制，随时停止。</p>
            <p className="mb-2 text-sm">你可以改变或保持不变。</p>
            <p className="mb-2 text-sm">没有规则。</p>
            <p className="mb-2 text-sm">我们可以尽力而为或使其变得最糟糕。</p>
            <p className="mb-2 text-sm">我希望你做到最好。</p>
            <p className="mb-2 text-sm">我希望你看到让你惊讶的事物。</p>
            <p className="mb-2 text-sm">我希望你感受到你从未感受过的事物。</p>
            <p className="text-sm">我希望你遇到有不同观点的人。</p>
          </blockquote>

          <p className="text-base">
            使用{' '}
            <Link
              to="https://www.gatsbyjs.com/docs/tutorial/"
              className="text-link-blue hover:text-gray-900 hover:underline"
            >
              Gatsby
            </Link>{' '}
            构建，由{' '}
            <Link
              to="https://www.gatsbyjs.com/products/cloud/"
              className="text-link-blue hover:text-gray-900 hover:underline"
            >
              Gatsby Cloud
            </Link>{' '}
            托管。
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
