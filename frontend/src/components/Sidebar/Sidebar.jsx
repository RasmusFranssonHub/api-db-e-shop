import './Sidebar.scss';
import dashboardIcon from "../../assets/icons/noun-dashboard.svg";
import productIcon from "../../assets/icons/noun-product.svg";
import eyeIcon from "../../assets/icons/noun-eye.svg";
import tagIcon from "../../assets/icons/noun-tag.svg";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>SHOP PORTAL</h2>
        <p>BACK-OFFICE</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">
          <img src={dashboardIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </Link>

        <Link to="/products" className="nav-item">
          <img src={productIcon} alt="Product" />
          <span>Produkter</span>
        </Link>

        <Link to="/categories" className="nav-item">
          <img src={tagIcon} alt="Tag" />
          <span>Kategorier</span>
        </Link>

        <Link to="/preview" className="nav-item">
          <img src={eyeIcon} alt="Eye" />
          <span>Förhandsgranska</span>
        </Link>
      </nav>

      <div className="sidebar-user">

        <div className="user-avatar">
          R
        </div>

        <div className="user-info">
          <p className="user-name">Rasmus</p>
          <p className="user-role">Administratör</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar