import "./ProductsForm.scss";

function ProductsForm({ onClose }) {
  return (
    <div className="product-form-overlay">
      <form className="product-form">

        <button
          type="button"
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Lägg till produkt</h2>

        <label htmlFor="name">Produktnamn:</label>
        <input
          id="name"
          type="text"
          placeholder="Ange produktnamn"
        />

        <label htmlFor="price">Pris:</label>
        <input
          id="price"
          type="number"
          min="0"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          placeholder="Ange pris"
        />

        <label htmlFor="stock">Lager:</label>
        <input
          id="stock"
          type="number"
          min="0"
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          placeholder="Ange lager"
        />

        <fieldset className="category-checkboxes">
        <legend>Kategorier:</legend>

        <label>
            <input type="checkbox" value="his" />
            För honom
        </label>

        <label>
            <input type="checkbox" value="hers" />
            För henne
        </label>

        <label>
            <input type="checkbox" value="t-shirt" />
            T-shirts
        </label>

        <label>
            <input type="checkbox" value="hoodies" />
            Hoodies
        </label>

        <label>
            <input type="checkbox" value="socks" />
            Strumpor
        </label>

        <label>
            <input type="checkbox" value="caps-&-beanies" />
            Kepsar & Mössor
        </label>
        </fieldset>

        <label htmlFor="image">Bild:</label>
        <input
          id="image"
          type="file"
          accept="image/*"
        />

        <button type="submit">
          Lägg till produkt
        </button>

      </form>
    </div>
  );
}

export default ProductsForm;