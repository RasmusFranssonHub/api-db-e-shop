import "./ProductCard.scss";

export default function ProductCard({
  image,
  title,
  price,
  stock,
  onEdit,
}) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />

      <div className="product-title-container">
        <div className="product-card-heading">
          <h3 className="product-title">{title}</h3>

          {onEdit && (
            <button
              className="edit-product-button"
              type="button"
              onClick={onEdit}
              aria-label={`Redigera ${title}`}
            >
              ✎
            </button>
          )}
        </div>

        <div className="product-details">
          <p className="product-price">{price}</p>
          <p className="product-stock">{stock}</p>
        </div>
      </div>
    </div>
  );
}
