import {Link} from 'react-router-dom';

const Header = () => {
  return <header>
      <div className="logo">Logo</div>
      <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
      </div>
  </header>;
};

export default Header;
