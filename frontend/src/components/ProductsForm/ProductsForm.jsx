import { useState } from "react";
import "./ProductsForm.scss";

function ProductsForm({ onClose, onCreated, categories }) {
  const [errors, setErrors] = useState({});

  const preventInvalidNumber = (event) => {
    if (event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  };

  const validateForm = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextErrors = {};

    if (!formData.get("name")?.trim()) {
      nextErrors.name = "Ange ett produktnamn.";
    }

    if (!formData.get("price")) {
      nextErrors.price = "Ange ett pris.";
    }

    if (!formData.get("stock")) {
      nextErrors.stock = "Ange lagersaldo.";
    }

    if (formData.getAll("categories").length === 0) {
      nextErrors.categories = "Välj minst en kategori.";
    }

    if (!formData.get("image")?.name) {
      nextErrors.image = "Välj en produktbild.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    formData.set("title", formData.get("name"));
    formData.set("description", "Skapad via Shop Portal");
    formData.set(
      "category_ids",
      JSON.stringify(formData.getAll("categories").map(Number))
    );

    onCreated(formData);
  };

  return (
    <div className="product-form-overlay" role="presentation">
      <form className="product-form" onSubmit={validateForm} noValidate>
        <header className="product-form-header">
          <h2>Lägg till produkt</h2>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Stäng formuläret"
          >
            ×
          </button>
        </header>

        <div className="product-form-body">
          {Object.keys(errors).length > 0 && (
            <p className="form-error-summary" role="alert">
              Fyll i alla obligatoriska fält innan du lägger till produkten.
            </p>
          )}

          <div className="product-form-fields">
            <div className="form-field form-field-wide">
              <label htmlFor="name">Produktnamn</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ange produktnamn"
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="price">Pris</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                onKeyDown={preventInvalidNumber}
                placeholder="Ange pris"
                aria-invalid={Boolean(errors.price)}
              />
              {errors.price && (
                <span className="field-error">{errors.price}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="stock">Lager</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                onKeyDown={preventInvalidNumber}
                placeholder="Ange lager"
                aria-invalid={Boolean(errors.stock)}
              />
              {errors.stock && (
                <span className="field-error">{errors.stock}</span>
              )}
            </div>
          </div>

          <fieldset
            className={`category-checkboxes ${
              errors.categories ? "has-error" : ""
            }`}
          >
            <legend>Kategorier</legend>

            <div className="category-options">
              {categories.map((category) => (
                <label key={category.id}>
                  <input
                    name="categories"
                    type="checkbox"
                    value={category.id}
                  />
                  {category.name}
                </label>
              ))}
            </div>

            {errors.categories && (
              <span className="field-error">{errors.categories}</span>
            )}
          </fieldset>

          <div className="form-field">
            <label htmlFor="image">Bild</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              aria-invalid={Boolean(errors.image)}
            />
            {errors.image && (
              <span className="field-error">{errors.image}</span>
            )}
          </div>
        </div>

        <footer className="product-form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Avbryt
          </button>
          <button type="submit" className="submit-button">
            Lägg till produkt
          </button>
        </footer>
      </form>
    </div>
  );
}

export default ProductsForm;
