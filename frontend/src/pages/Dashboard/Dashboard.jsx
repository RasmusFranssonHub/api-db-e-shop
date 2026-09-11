import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/hero/hero.png";
import mobileHeroImage from "../../assets/hero/header-mobile.png";
import heroPreviewStoreIcon from "../../assets/icons/eye-pink.svg";
import heroAddProductIcon from "../../assets/icons/plus-pink.svg";
import statLowStockIcon from "../../assets/icons/noun-cart.svg";
import statProductIcon from "../../assets/icons/noun-product.svg";
import statCategoryIcon from "../../assets/icons/noun-tag.svg";
import fallbackProductImage from "../../assets/products/classic-tee.png";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductsForm from "../../components/ProductsForm/ProductsForm";
import StatCard from "../../components/StatCard/StatCard";
import "./Dashboard.scss";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    lowStock: 0,
  });
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/products"),
      fetch("http://localhost:3000/categories"),
    ])
      .then(async ([productsResponse, categoriesResponse]) => [
        await productsResponse.json(),
        await categoriesResponse.json(),
      ])
      .then(([rows, categories]) => {
        const lowStock = rows.filter(
          (product) => Number(product.stock) <= 10
        ).length;
        const newestProducts = rows
          .sort(
            (first, second) =>
              new Date(second.created_date) - new Date(first.created_date)
          )
          .slice(0, 5)
          .map((row) => ({
            ...row,
            image: row.image
              ? `http://localhost:3000${row.image}`
              : fallbackProductImage,
          }));

        setStats({
          products: rows.length,
          categories: categories.length,
          lowStock,
        });
        setRecentProducts(newestProducts);
        setCategories(categories);
      })
      .catch((error) => console.error(error));
  }, []);

  const createProduct = async (body) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body,
    });
    const created = await response.json();

    if (!response.ok) {
      throw new Error(created.error || "Produkten kunde inte sparas.");
    }

    const newProduct = {
      ...created,
      image: created.image
        ? `http://localhost:3000${created.image}`
        : fallbackProductImage,
    };

    setRecentProducts((items) => [newProduct, ...items].slice(0, 5));
    setStats((currentStats) => ({
      ...currentStats,
      products: currentStats.products + 1,
      lowStock:
        currentStats.lowStock + (Number(created.stock) <= 10 ? 1 : 0),
    }));
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      <section className="hero">
        <div className="hero-image">
          <picture>
            <source media="(max-width: 1200px)" srcSet={mobileHeroImage} />
            <img src={heroImage} alt="Hero" className="hero-img" />
          </picture>
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
      <section className="stats">
        <StatCard
          number={stats.products}
          label="Produkter i butiken"
          icon={statProductIcon}
          onClick={() => navigate("/products?filter=all")}
        />

        <StatCard
          number={stats.categories}
          label="Kategorier i butiken"
          icon={statCategoryIcon}
          onClick={() => navigate("/categories")}
        />

        <StatCard
          number={stats.lowStock}
          label="Produkter med lågt saldo"
          icon={statLowStockIcon}
          onClick={() => navigate("/products?sort=stock_asc")}
        />
      </section>
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
            onEdit={() => navigate("/products")}
          />
        ))}
      </div>
      </section>

      {showForm && (
        <ProductsForm
          categories={categories}
          onClose={() => setShowForm(false)}
          onCreated={createProduct}
        />
      )}
    </div>
  );
}

export default Dashboard;
