import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import plusIcon from "../../assets/icons/noun-plus.svg";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductEditForm from "../../components/ProductEditForm/ProductEditForm";
import ProductsForm from "../../components/ProductsForm/ProductsForm";
import products from "../../data/products";
import "./Products.scss";

function formatProduct(row) {
  return {
    ...row,
    categoryIds: row.category_ids
      ? row.category_ids.split(",").map(Number)
      : [],
    name: row.title,
    price: Number(row.price),
    image: row.image
      ? `http://localhost:3000${row.image}`
      : products[0].image,
  };
}

function Products() {
  const [showForm, setShowForm] = useState(false);
  const [productItems, setProductItems] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(searchParams.get("sort") ?? "");
  const [categoryId, setCategoryId] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (!response.ok) throw new Error("Kunde inte hämta produkter.");

        return response.json();
      })
      .then((rows) => setProductItems(rows.map(formatProduct)))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then(setCategories);
  }, []);

  const visibleProducts = [...productItems]
    .filter((product) => {
      const nameMatches = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatches =
        categoryId === "all" || product.categoryIds.includes(Number(categoryId));

      return nameMatches && categoryMatches;
    })
    .sort((firstProduct, secondProduct) => {
      if (sort === "stock_asc") {
        return firstProduct.stock - secondProduct.stock;
      }

      if (sort === "price_asc") {
        return firstProduct.price - secondProduct.price;
      }

      if (sort === "price_desc") {
        return secondProduct.price - firstProduct.price;
      }

      return 0;
    });

  const createProduct = async (body) => {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body,
    });
    const created = await response.json();

    if (!response.ok) throw new Error(created.error);

    const newProduct = {
      ...formatProduct(created),
      categoryIds: JSON.parse(body.get("category_ids")),
    };

    setProductItems((items) => [newProduct, ...items]);
    setShowForm(false);
  };

  const updateProduct = async (updatedProduct) => {
    const body = new FormData();

    body.append("title", updatedProduct.name);
    body.append("price", updatedProduct.price);
    body.append("stock", updatedProduct.stock);
    body.append("category_ids", JSON.stringify(updatedProduct.categoryIds));

    if (updatedProduct.imageFile) {
      body.append("image", updatedProduct.imageFile);
    }

    const response = await fetch(
      `http://localhost:3000/products/${updatedProduct.id}`,
      { method: "PATCH", body }
    );
    const saved = await response.json();

    if (!response.ok) throw new Error(saved.error);

    setProductItems((items) =>
      items.map((item) =>
        item.id === saved.id
          ? {
              ...formatProduct(saved),
              categoryIds: updatedProduct.categoryIds,
            }
          : item
      )
    );
  };

  const deleteProduct = async (id) => {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setProductItems((items) => items.filter((item) => item.id !== id));
    }
  };

  return (
    <section className="products">
      <div className="products-header">
        <div className="products-header-text">
          <h1>Produkter</h1>
          <p>Hantera dina produkter här</p>
        </div>

        <button
          className="add-product-button"
          onClick={() => setShowForm(true)}
        >
          <img src={plusIcon} alt="" />
          Lägg till produkt
        </button>
      </div>

      <section className="products-filter">
        <h2>Filter</h2>

        <div className="products-filter-controls">
          <label htmlFor="search">Sök:</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Sök produkt..."
          />

          <label htmlFor="category">Kategori:</label>
          <select
            id="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value="all">Alla</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="sort">Sortera:</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="">Standard</option>
            <option value="price_asc">Pris: lägst först</option>
            <option value="price_desc">Pris: högst först</option>
            <option value="stock_asc">Lager: lägst först</option>
          </select>
        </div>
      </section>

      <div className="product-list">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.name}
            price={`${product.price} SEK`}
            stock={`${product.stock}st i lager`}
            onEdit={() => setEditingProduct(product)}
          />
        ))}
      </div>

      {showForm && (
        <ProductsForm
          categories={categories}
          onClose={() => setShowForm(false)}
          onCreated={createProduct}
        />
      )}

      {editingProduct && (
        <ProductEditForm
          categories={categories}
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={updateProduct}
          onDelete={deleteProduct}
        />
      )}
    </section>
  );
}

export default Products;
