import { useEffect, useMemo, useState } from "react";
import "./Categories.scss";
import plusIcon from "../../assets/icons/noun-plus.svg";
import categoryIcon from "../../assets/icons/noun-tag.svg";
import products from "../../data/products";
import CategoryForm from "../../components/CategoryForm/CategoryForm";

const initialCategories = Object.entries(products.reduce((groups, product) => ({ ...groups, [product.category]: (groups[product.category] ?? 0) + 1 }), {})).map(([name, productCount]) => ({ name, productCount, icon: categoryIcon }));

export default function Categories() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  useEffect(() => { fetch('http://localhost:3000/categories').then((response) => response.json()).then((rows) => setCategoryItems(rows.map((row) => ({ ...row, productCount: 0, icon: row.icon || categoryIcon })))); }, []);

  const categories = useMemo(() => {
    const categoryList = [...categoryItems];
    const filteredCategories = categoryList.filter((category) =>
      category.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return filteredCategories.sort((firstCategory, secondCategory) => {
      if (sort === "products") {
        return secondCategory.productCount - firstCategory.productCount || firstCategory.name.localeCompare(secondCategory.name);
      }

      return firstCategory.name.localeCompare(secondCategory.name);
    });
  }, [categoryItems, search, sort]);

  return (
    <section className="categories">
      <div className="categories-header">
        <div className="categories-header-text">
          <h1>Kategorier</h1>
          <p>Hantera dina produktkategorier här</p>
        </div>

        <button className="add-category-button" type="button" onClick={() => setShowForm(true)}>
          <img src={plusIcon} alt="" />
          Lägg till kategori
        </button>
      </div>

      <section className="categories-filter" aria-label="Filtrera kategorier">
        <h2>Filter</h2>
        <div className="categories-filter-controls">
          <label htmlFor="category-search">Sök:</label>
          <input id="category-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Sök kategori..." />

          <label htmlFor="category-sort">Sortera:</label>
          <select id="category-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="name">Namn: A–Ö</option>
            <option value="products">Flest produkter</option>
          </select>
        </div>
      </section>

      <section className="categories-content" aria-labelledby="all-categories-heading">
        <div className="categories-content-header">
          <h2 id="all-categories-heading">Alla kategorier</h2>
          <span>{categories.length} kategorier</span>
        </div>

        {categories.length > 0 ? (
          <div className="categories-list">
            {categories.map((category) => (
              <article className="category-card" key={category.name}>
                <div className="category-card-icon"><img src={category.icon} alt="" /></div>
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.productCount} {category.productCount === 1 ? "produkt" : "produkter"}</p>
                </div>
                <div className="category-card-actions"><button type="button" onClick={() => setEditingCategory(category)} aria-label={`Redigera ${category.name}`}>✎</button></div>
              </article>
            ))}
          </div>
        ) : (
          <p className="categories-empty">Inga kategorier matchar din sökning.</p>
        )}
      </section>

      {showForm && (
        <CategoryForm
          existingNames={categoryItems.map((category) => category.name)}
          onClose={() => setShowForm(false)}
          onCreate={async (category) => { const response = await fetch('http://localhost:3000/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(category) }); const saved = await response.json(); setCategoryItems((items) => [...items, { ...saved, productCount: 0, icon: saved.icon || categoryIcon }]); }}
        />
      )}
      {editingCategory && <CategoryForm category={editingCategory} existingNames={categoryItems.map((category) => category.name)} onClose={() => setEditingCategory(null)} onUpdate={async (updatedCategory) => { const response = await fetch(`http://localhost:3000/categories/${updatedCategory.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedCategory) }); const saved = await response.json(); setCategoryItems((items) => items.map((item) => item.id === saved.id ? { ...item, ...saved, productCount: item.productCount, icon: saved.icon || categoryIcon } : item)); }} onDelete={async (id) => { const response = await fetch(`http://localhost:3000/categories/${id}`, { method: 'DELETE' }); if (response.ok) setCategoryItems((items) => items.filter((item) => item.id !== id)); }} />}
    </section>
  );
}
