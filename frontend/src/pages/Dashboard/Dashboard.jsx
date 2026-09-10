import './Dashboard.scss';
import StatCard from '../../components/StatCard/StatCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import heroImage from '../../assets/hero/hero.png';
import fallbackProductImage from '../../assets/products/classic-tee.png';

/* Import icons for StatCard */
import statProductIcon from '../../assets/icons/noun-product.svg';
import statCategoryIcon from '../../assets/icons/noun-tag.svg';
import statLowStockIcon from '../../assets/icons/noun-cart.svg';

/* import icons for hero buttons */
import heroAddProductIcon from '../../assets/icons/plus-pink.svg';
import heroPreviewStoreIcon from '../../assets/icons/eye-pink.svg';

/* Form import */
import ProductsForm from '../../components/ProductsForm/ProductsForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const [stats, setStats] = useState({ products: 0, categories: 0, lowStock: 0 });
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  useEffect(() => {
    Promise.all([fetch('http://localhost:3000/products'), fetch('http://localhost:3000/categories')])
      .then(async ([productsResponse, categoriesResponse]) => [await productsResponse.json(), await categoriesResponse.json()])
      .then(([rows, categories]) => {
        setStats({ products: rows.length, categories: categories.length, lowStock: rows.filter((product) => Number(product.stock) <= 10).length });
        setRecentProducts(rows.sort((first, second) => new Date(second.created_date) - new Date(first.created_date)).slice(0, 5).map((row) => ({ ...row, image: row.image ? `http://localhost:3000${row.image}` : fallbackProductImage })));
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="dashboard">


      {/* HERO */}

      <section className="hero">
        <div className="hero-image">
          <img src={heroImage} alt="Hero" className="hero-img"/>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>God morgon, {username}!</h1>
            <p>Redo att annonsera mera?</p>
          </div>

          <div className="hero-buttons">
            <button className="cta-button1" onClick={() => setShowForm(true)}>
              <img src={heroAddProductIcon} alt="Add Product" />
              Lägg till produkter
            </button>

            <button className="cta-button2">
              <img src={heroPreviewStoreIcon} alt="Preview Store" />
              Förhandsgranska butik
            </button>
          </div>
        </div>
      </section>


      {/* STATS */}

      <section className="stats">
        <StatCard
          number={stats.products}
          label="Produkter totalt"
          icon={statProductIcon}
          onClick={() => navigate('/products?filter=all')}
        />

        <StatCard
          number={stats.categories}
          label="Kategorier"
          icon={statCategoryIcon}
          onClick={() => navigate('/categories')}
        />

        <StatCard
          number={stats.lowStock}
          label="Produkter med lågt saldo"
          icon={statLowStockIcon}
          onClick={() => navigate('/products?sort=stock_asc')}
        />
      </section>


      {/* PRODUCTS */}

    <section className="recent-products">
      <h2>Senast tillagda produkter</h2>

      <div className="product-list">
        {recentProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={`${product.price} SEK`}
            stock={`${product.stock}st i lager`}
            onEdit={() => navigate('/products')}
          />
        ))}
      </div>
    </section>
    {showForm && <ProductsForm onClose={() => setShowForm(false)} />}

    </div>
  )
}

export default Dashboard
