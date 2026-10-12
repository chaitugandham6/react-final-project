
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist } from "../redux/wishlistSlice";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <section className="section">
      <h1>My Wishlist</h1>
      <p>Products you've saved for later.</p>

      {wishlist.length === 0 ? (
        <p className="status">Your wishlist is empty. Browse the shop to save products.</p>
      ) : (
        <>
          <button className="text-button" onClick={() => dispatch(clearWishlist())}>
            Clear Wishlist
          </button>
          <div className="product-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
