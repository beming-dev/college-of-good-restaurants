import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
  return <div>{children}</div>;
};

export default Layout;
