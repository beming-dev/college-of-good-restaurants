import NextLink from "next/link";
import React from "react"

export {Link};

const Link = ({href, children, ...props}:any) => {
    return(
        <NextLink href = {href}>
            <a {...props}>
                {children}
            </a>
        </NextLink>
    )
}