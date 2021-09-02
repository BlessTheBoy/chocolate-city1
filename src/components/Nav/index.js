import "./style.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav">
      <Link to="/">
        <img src={logo} alt="" className="nav_logo" />
      </Link>

      <nav className="nav_nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">Contact</Link>
          </li>
          <li>
            <Link to="/users">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
