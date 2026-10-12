
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatPrice = (product) =>
  (product.price * 85).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, product) => sum + product.price * 85,
    0
  );

  return (
    <section className="section">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="primary-button">Start shopping →</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product, index) => (
              <article className="cart-item" key={`${product.id}-${index}`}>
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <h3>{product.title}</h3>
                  <p>{formatPrice(product)}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>
                  Remove
                </button>
              </article>
            ))}
          </div>

          <div className="cart-total">
            <h2>
              Total: {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })}
            </h2>
            <button className="primary-button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <p className="muted">
            Demo checkout only. No payment is collected.
          </p>
        </>
      )}
    </section>
  );
}
