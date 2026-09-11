import { NavLink } from "react-router-dom";
import dashboardIcon from "../../assets/icons/noun-dashboard.svg";
import productIcon from "../../assets/icons/noun-product.svg";
import eyeIcon from "../../assets/icons/noun-eye.svg";
import tagIcon from "../../assets/icons/noun-tag.svg";
import "./Sidebar.scss";

function Sidebar() {
  const username = localStorage.getItem("username");

  const navItemClassName = ({ isActive }) =>
    `nav-item${isActive ? " active" : ""}`;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>SHOP PORTAL</h2>
        <p>BACK-OFFICE</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={navItemClassName}>
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/products" className={navItemClassName}>
          <img src={productIcon} alt="Product" />
          <span>Produkter</span>
        </NavLink>

        <NavLink to="/categories" className={navItemClassName}>
          <img src={tagIcon} alt="Tag" />
          <span>Kategorier</span>
        </NavLink>

        <NavLink to="/preview" className={navItemClassName}>
          <img src={eyeIcon} alt="Eye" />
          <span>Förhandsgranska</span>
        </NavLink>
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          {username?.charAt(0).toUpperCase() || "R"}
        </div>

        <div className="user-info">
          <p className="user-name">
            {username?.charAt(0).toUpperCase() + username?.slice(1)}
          </p>
          <p className="user-role">Administratör</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar
