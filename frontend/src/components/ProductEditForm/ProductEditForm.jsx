import { useState } from "react";
import "./ProductEditForm.scss";

export default function ProductEditForm({ product, onClose, onSave, onDelete }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [image, setImage] = useState(product.image);
  const [imageFile, setImageFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const save = (event) => {
    event.preventDefault();
    if (!name.trim() || price === "" || stock === "") return;
    onSave({ ...product, name: name.trim(), price: Number(price), stock: Number(stock), image, imageFile });
    onClose();
  };

  return <div className="edit-product-overlay"><form className="edit-product-form" onSubmit={save}>
    <header><h2>Redigera produkt</h2><button type="button" onClick={onClose} aria-label="Stäng">×</button></header>
    <div className="edit-product-body">
      <div className="edit-image-preview"><img src={image} alt="Förhandsvisning" /><div className="edit-image-copy"><strong>Produktbild</strong><span>Byt till en ny bild från din dator.</span><label className="image-upload-button" htmlFor="edit-image">Välj ny bild</label><input id="edit-image" className="image-upload-input" type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setImageFile(file); setImage(URL.createObjectURL(file)); } }} /></div></div>
      <label>Produktnamn<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
      <div className="edit-product-grid"><label>Pris<input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required /></label><label>Lager<input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required /></label></div>
      {confirmDelete && <div className="delete-confirm"><strong>Ta bort {product.name}?</strong><span>Det går inte att ångra.</span><div><button type="button" onClick={() => setConfirmDelete(false)}>Behåll</button><button type="button" onClick={() => { onDelete(product.id); onClose(); }}>Ta bort</button></div></div>}
    </div>
    <footer><button type="button" className="delete-product" onClick={() => setConfirmDelete(true)}>Ta bort produkt</button><button type="submit">Spara ändringar</button></footer>
  </form></div>;
}
