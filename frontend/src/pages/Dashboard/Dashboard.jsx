import './Dashboard.scss';
import StatCard from '../../components/StatCard/StatCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import heroImage from '../../assets/hero/hero.png';
import {products} from '../../data/products';

/* Import icons for StatCard */
import statProductIcon from '../../assets/icons/noun-product.svg';
import statCategoryIcon from '../../assets/icons/noun-tag.svg';
import statLowStockIcon from '../../assets/icons/noun-cart.svg';

/* import icons for hero buttons */
import heroAddProductIcon from '../../assets/icons/plus-pink.svg';
import heroPreviewStoreIcon from '../../assets/icons/eye-pink.svg';

/* Form import */
import ProductsForm from '../../components/ProductsForm/ProductsForm';
import { useState } from 'react';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="dashboard">


      {/* HERO */}

      <section className="hero">
        <div className="hero-image">
          <img src={heroImage} alt="Hero" className="hero-img"/>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>God morgon, Rasmus!</h1>
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
          number={45}
          label="Produkter totalt"
          icon={statProductIcon}
        />

        <StatCard
          number={14}
          label="Kategorier"
          icon={statCategoryIcon}
        />

        <StatCard
          number={9}
          label="Produkter med lågt saldo"
          icon={statLowStockIcon}
        />
      </section>


      {/* PRODUCTS */}

    <section className="recent-products">
      <h2>Senast tillagda produkter</h2>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.name}
            price={`${product.price} SEK`}
            stock={`${product.stock}st i lager`}
          />
        ))}
      </div>
    </section>
    {showForm && <ProductsForm onClose={() => setShowForm(false)} />}

    </div>
  )
}

export default Dashboard