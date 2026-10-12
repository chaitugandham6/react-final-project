
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleWishlist } from "../redux/wishlistSlice";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { addToCart } = useCart();

  const saved = wishlist.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <button
          className="wishlist-button"
          onClick={() => dispatch(toggleWishlist(product))}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        >
          {saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="rating">★ {product.rating ?? "New"}</p>

        <div className="price-row">
          <strong>₹{(product.price * 85).toLocaleString("en-IN")}</strong>
          {product.discountPercentage > 0 && (
            <span className="discount-tag">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        <div className="product-actions">
          <Link className="details-button" to={`/product/${product.id}`}>
            Details
          </Link>
          <button
            className="add-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
