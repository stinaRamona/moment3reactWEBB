import { NavLink } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext";
import "../css/Header.css"; 

const Header = () => {

  const {user, logout} = useAuth(); 

  return (
    <header>
      <h1>Bloggen</h1>
        <ul>
            <li><NavLink to="/" className="nav-link">Start</NavLink></li>
            <li><NavLink to="/admin" className="nav-link">Admin</NavLink></li>
            <li>
              {!user ? <NavLink to="/login" className="nav-link">Logga in</NavLink> : <button id="logOutBtn" onClick={logout}>Logga ut</button>}
            </li>
        </ul>
    </header>
  )
}

export default Header
