import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import ThemeLayout from 'soames-gatsby-theme/src/components/Layout';
import Header from 'soames-gatsby-theme/src/components/header';
import Footer from 'soames-gatsby-theme/src/components/footer';

import '../../styles/overrides.css'; // Your starter-specific styles

interface LayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isHomePage = false }) => {
  const data = useStaticQuery(graphql`
    query {
      wp {
        generalSettings {
          title
        }
      }
    }
  `);

  const siteTitle = data.wp?.generalSettings?.title || 'Site Title';
  return (
    <ThemeLayout isHomePage={isHomePage}>
      <Header title={siteTitle} isHomePage={isHomePage} />
      {children}
      <Footer title={siteTitle} />
    </ThemeLayout>
  );
};

export default Layout;
