import { NavLink } from "react-router-dom";

import "./Nav.css";

function Header({ isAuthenticated }) {
  return (
    <header className="navbar">
      <div className="heading">
        <span className="notImportant">cd</span> aayushmau5
        <span className="notImportant">\</span> blogs
      </div>
      <div className="nav-links">
        <NavLink exact to="/">
          Home
        </NavLink>
        {!isAuthenticated ? (
          <>
            <NavLink exact to="/login">
              Login
            </NavLink>
            <NavLink exact to="/signup">
              Signup
            </NavLink>
          </>
        ) : (
          <>
            <NavLink exact to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink exact to="/add-blog">
              Post
            </NavLink>
            <NavLink exact to="/logout">
              Logout
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
