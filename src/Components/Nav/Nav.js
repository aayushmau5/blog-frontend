import { NavLink } from "react-router-dom";

import "./Nav.css";

function Header({ path }) {
  return (
    <header className="flex justify-between p-2">
      <div className="heading">
        <span className="text-gray-400">cd</span> aayushmau5
        <span className="text-gray-400">\</span> blogs
      </div>
      <div className="nav-links">
        <NavLink exact to="/" className="mr-2">
          Home
        </NavLink>
        <NavLink exact to="/login" className="mr-2">
          Login
        </NavLink>
        <NavLink exact to="/signup" className="mr-2">
          Signup
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
