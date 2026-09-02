import "./Products.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";
import plusIcon from "../../assets/icons/noun-plus.svg";
import { useState } from "react";
import ProductsForm from "../../components/ProductsForm/ProductsForm";

function Products() {
  const [showForm, setShowForm] = useState(false);
  return (


    <section className="products">


    {/* HEADER*/}
      <div className="products-header">
        <div className="products-header-text">
          <h1>Produkter</h1>
          <p>Hantera dina produkter här</p>
        </div>
        <button 
          className="add-product-button"
          onClick={() => setShowForm(true)}
          >
          <img src={plusIcon} alt="Add Product" />
          Lägg till produkt
        </button>
      </div>

    {/* FILTER*/}

      <section className="products-filter">
        <h2>Filter</h2>

        <div className="products-filter-controls">
        <label htmlFor="search">Sök:</label>
        <input
          id="search"
          type="text"
          placeholder="Sök produkt..."
        />

        <label htmlFor="category">Kategori:</label>
        <select id="category">
          <option value="all">Alla</option>
          <option value="his">För honom</option>
          <option value="hers">För henne</option>
          <option value="t-shirt">T-shirts</option>
          <option value="hoodies">Hoodies</option>
          <option value="socks">Strumpor</option>
          <option value="caps-&-beanies">Kepsar & Mössor</option>
        </select>

        <label htmlFor="sort">Sortera:</label>
        <select id="sort">
          <option value="">Standard</option>
          <option value="price_asc">Pris: lägst först</option>
          <option value="price_desc">Pris: högst först</option>
        </select>
        </div>
      </section>

    {/* PRODUCT LIST*/}

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
      {showForm && <ProductsForm onClose={() => setShowForm(false)} />}

    </section>
  );
}

export default Products;