import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dashboardIcon from "../../assets/icons/noun-dashboard.svg";
import productIcon from "../../assets/icons/noun-product.svg";
import eyeIcon from "../../assets/icons/noun-eye.svg";
import tagIcon from "../../assets/icons/noun-tag.svg";
import "./SideBar.scss";

function Sidebar() {
  const username = localStorage.getItem("username");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const displayName = username
    ? `${username.charAt(0).toUpperCase()}${username.slice(1)}`
    : "Rasmus";

  const navItemClassName = ({ isActive }) =>
    `nav-item${isActive ? " active" : ""}`;

  const closeMenu = () => setIsOpen(false);

  const logOut = () => {
    localStorage.removeItem("username");
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={closeMenu}
          aria-label="Stäng meny"
        />
      )}

      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="sidebar-header">
        <h2>SHOP PORTAL</h2>
        <p>BACK-OFFICE</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={navItemClassName} onClick={closeMenu}>
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/products" className={navItemClassName} onClick={closeMenu}>
          <img src={productIcon} alt="Product" />
          <span>Produkter</span>
        </NavLink>

        <NavLink to="/categories" className={navItemClassName} onClick={closeMenu}>
          <img src={tagIcon} alt="Tag" />
          <span>Kategorier</span>
        </NavLink>

        <NavLink to="/preview" className={navItemClassName} onClick={closeMenu}>
          <img src={eyeIcon} alt="Eye" />
          <span>Förhandsgranska</span>
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          {displayName.charAt(0)}
        </div>

        <div className="user-info">
          <p className="user-name">{displayName}</p>
          <p className="user-role">Administratör</p>
        </div>

        <button type="button" className="logout-button" onClick={logOut}>
          Logga ut
        </button>
      </div>
      </aside>
    </>
  );
}

export default Sidebar
