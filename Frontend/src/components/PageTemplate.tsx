import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageTemplateProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children, header = true, footer = true }) => {
  return (
    <div className="page-template">
      {header && <Header />}
      <div className="page-content">
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};

export default PageTemplate; 