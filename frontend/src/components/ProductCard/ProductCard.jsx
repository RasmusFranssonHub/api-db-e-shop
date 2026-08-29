import './ProductCard.scss';

export default function ProductCard({ image, title, price, stock }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />

      <div className="product-title-container">
        <h3 className="product-title">{title}</h3>
        
        <div className="product-details">
          <p className="product-price">{price}</p>
          <p className="product-stock">{stock}</p>
        </div>
      </div>
    </div>
  );
}