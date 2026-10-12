
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import useFetchData from "../hooks/useFetchData";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    `https://dummyjson.com/products/${id}`
  );
  const { addToCart } = useCart();

  if (loading) return <p className="status">Loading product...</p>;
  if (error || !data || !data.id) {
    return <p className="status">Product could not be found.</p>;
  }

  return (
    <section className="section details-layout">
      <img src={data.thumbnail} alt={data.title} />
      <div>
        <span className="section-kicker">{data.category}</span>
        <h1>{data.title}</h1>
        <p>★ {data.rating} / 5</p>
        <h2>₹{(data.price * 85).toLocaleString("en-IN")}</h2>
        <p>{data.description}</p>
        <p>Availability: {data.stock > 0 ? "In stock" : "Out of stock"}</p>
        <button
          className="primary-button"
          disabled={data.stock <= 0}
          onClick={() => addToCart(data)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
