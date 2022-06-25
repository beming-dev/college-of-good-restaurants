import { NextPage } from "next";
import NextLink from "next/link";
import React from "react";

export { Link };

interface propsType {
  href: string;
  children: React.ReactNode;
}

const Link: NextPage<propsType> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
