import React from 'react';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({children, className=""}: LayoutProps) => {
  return (
    <div className={`w-full h-full inline-block z-0 bg-light p-24 dark:bg-dark xl:p-24 lg:p-16 md:p-12 sm:p-8 ${className}`}>
        {children}
    </div>
  )
}

export default Layout