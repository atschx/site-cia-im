import * as React from 'react';
import Layout from '../components/layout';

interface AboutPageProps {
  children: React.ReactNode;
}

const AboutPage: React.FC<AboutPageProps> = ({ children }) => {
  return (
    <Layout pageTitle="Write now,think more(different).">
      <div className="prose max-w-none dark:prose-invert">{children}</div>
    </Layout>
  );
};

export default AboutPage;
