
import { useState } from "react";
import axios from "axios";
import useFetchData from "../hooks/useFetchData";

const API = "https://dummyjson.com/products";

export default function Admin() {
  const { data, setData, loading, error } = useFetchData(
    `${API}?limit=10`
  );
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim().length < 3 || Number(price) <= 0) {
      setMessage("Enter a product name (3+ characters) and positive price.");
      return;
    }

    const productData = {
      title: title.trim(),
      price: Number(price),
    };

    try {
      if (editingId !== null) {
        await axios.put(`${API}/${editingId}`, productData);

        setData((previous) =>
          previous.map((item) =>
            item.id === editingId ? { ...item, ...productData } : item
          )
        );

        setMessage("Product updated in the demo interface.");
      } else {
        const response = await axios.post(`${API}/add`, productData);

        const newProduct = {
          id: response.data.id ?? Date.now(),
          thumbnail: "",
          category: "new",
          rating: 0,
          ...productData,
        };

        setData((previous) => [newProduct, ...previous]);
        setMessage("Product added to the demo interface.");
      }

      setTitle("");
      setPrice("");
      setEditingId(null);
    } catch {
      setMessage("The API request failed. Please try again.");
    }
  }

  function startEdit(product) {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(String(product.price));
    setMessage("");
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      setData((previous) => previous.filter((item) => item.id !== id));
      setMessage("Product removed from the demo interface.");
    } catch {
      setMessage("Unable to delete the product.");
    }
  }

  return (
    <section className="section admin-page">
      <span className="section-kicker">STORE MANAGEMENT</span>
      <h1>Product Admin</h1>
      <p>Manage the products shown in this demo.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Product name
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength="3"
            required
          />
        </label>

        <label>
          Price (API currency)
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </label>

        <button className="primary-button" type="submit">
          {editingId !== null ? "Update Product" : "Create Product"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle("");
              setPrice("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {message && <p className="status" role="status">{message}</p>}
      {loading && <p>Loading products...</p>}
      {error && <p className="error">{error}</p>}

      <div className="admin-list">
        {data.map((product) => (
          <article className="admin-row" key={product.id}>
            <div>
              <strong>{product.title}</strong>
              <p>₹{(product.price * 85).toLocaleString("en-IN")} (approx.)</p>
            </div>

            <div className="admin-actions">
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
