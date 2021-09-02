import "./style.scss";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Container from "../Container";

function Nav() {
  return (
    <Container>
      <div className="nav">
        <Link to="/">
          <img src={logo} alt="" className="nav_logo" />
        </Link>

        <nav className="nav_nav">
          <ul>
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
}

export default Nav;
