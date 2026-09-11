import { useState } from "react";
import "./ProductEditForm.scss";

export default function ProductEditForm({
  product,
  onClose,
  onSave,
  onDelete,
  categories = [],
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image);
  const [imageFile, setImageFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [categoryIds, setCategoryIds] = useState(product.categoryIds ?? []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const toggleCategory = (categoryId) => {
    setCategoryIds((currentIds) => {
      if (currentIds.includes(categoryId)) {
        return currentIds.filter((id) => id !== categoryId);
      }

      return [...currentIds, categoryId];
    });
  };

  const save = (event) => {
    event.preventDefault();

    if (!name.trim() || price === "" || stock === "") return;

    onSave({
      ...product,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      image,
      imageFile,
      categoryIds,
    });

    onClose();
  };

  const confirmProductDeletion = () => {
    onDelete(product.id);
    onClose();
  };

  return (
    <div className="edit-product-overlay">
      <form className="edit-product-form" onSubmit={save}>
        <header>
          <h2>Redigera produkt</h2>
          <button type="button" onClick={onClose} aria-label="Stäng">
            ×
          </button>
        </header>

        <div className="edit-product-body">
          <div className="edit-image-preview">
            <img src={image} alt="Förhandsvisning" />

            <div className="edit-image-copy">
              <strong>Produktbild</strong>
              <span>Byt till en ny bild från din dator.</span>
              <label className="image-upload-button" htmlFor="edit-image">
                Välj ny bild
              </label>
              <input
                id="edit-image"
                className="image-upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <label>
            Produktnamn
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <div className="edit-product-grid">
            <label>
              Pris
              <input
                type="number"
                min="0"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </label>

            <label>
              Lager
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
                required
              />
            </label>
          </div>

          <fieldset className="edit-category-options">
            <legend>Kategorier</legend>

            {categories.map((category) => (
              <label key={category.id}>
                <input
                  type="checkbox"
                  checked={categoryIds.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                {category.name}
              </label>
            ))}
          </fieldset>

          {confirmDelete && (
            <div className="delete-confirm">
              <strong>Ta bort {product.name}?</strong>
              <span>Det går inte att ångra.</span>

              <div>
                <button type="button" onClick={() => setConfirmDelete(false)}>
                  Behåll
                </button>
                <button type="button" onClick={confirmProductDeletion}>
                  Ta bort
                </button>
              </div>
            </div>
          )}
        </div>

        <footer>
          <button
            type="button"
            className="delete-product"
            onClick={() => setConfirmDelete(true)}
          >
            Ta bort produkt
          </button>
          <button type="submit">Spara ändringar</button>
        </footer>
      </form>
    </div>
  );
}
