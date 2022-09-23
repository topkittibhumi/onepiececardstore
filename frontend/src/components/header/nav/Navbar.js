import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"
export default function Navbar() {
  return (
    <div className="nav">
      <ul>
        <CustomLink to="/single">Single Card</CustomLink>
        <CustomLink to="/graded">Graded Card</CustomLink>
        <CustomLink to="/sell">Sell</CustomLink>
      </ul>
    </div>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}