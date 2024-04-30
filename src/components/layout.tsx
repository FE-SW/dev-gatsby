import * as React from "react"
import { Link } from "gatsby"

interface LayoutProps {
  location: {
    pathname: string;
  };
  title: string;
  children: React.ReactNode;
}

const Layout = ({ location, title, children }:LayoutProps) => {
  const rootPath = `/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="flex items-center justify-center text-sm text-gray-500">
        © {` `} jungseokwoo
      </footer>
    </div>
  )
}

export default Layout