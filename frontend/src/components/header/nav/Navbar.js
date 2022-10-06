import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "./styles.css"
export default function Navbar() {
  return (
    <div className="nav">
      <ul>
      <CustomLink to="/">Home</CustomLink>

         <CustomLink to="/tcg">Card Game</CustomLink>
        <CustomLink to="/single">Single Card</CustomLink>
        <CustomLink to="/boardgame">Board Game</CustomLink>
        <CustomLink to="/figurine">Figurine </CustomLink>

        <CustomLink to="/accessorires">Accessories</CustomLink>
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