
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useFetchData from "../hooks/useFetchData";

export default function Shop() {
  const { data, loading, error } = useFetchData(
    "https://dummyjson.com/products?limit=100"
  );

  const [params, setParams] = useSearchParams();
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "all";
  const page = Math.max(1, Number(params.get("page")) || 1);
  const pageSize = 8;

  const categories = [
    "all",
    ...new Set(data.map((product) => product.category)),
  ];

  const filtered = data.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  function updateParams(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);

    if (key !== "page") next.delete("page");
    setParams(next);
  }

  if (loading) return <p className="status">Loading products...</p>;
  if (error) return <p className="status">{error}</p>;

  return (
    <section className="section">
      <span className="section-kicker">DISCOVER YOUR NEXT FAVORITE</span>
      <h1>Shop All Products</h1>

      <div className="shop-controls">
        <input
          value={search}
          placeholder="Search products..."
          onChange={(event) => updateParams("search", event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => updateParams("category", event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All categories" : item}
            </option>
          ))}
        </select>
      </div>

      <p className="muted">
        {filtered.length} products found · Page {currentPage} of {pageCount}
      </p>

      {visible.length ? (
        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="status">No products match your search.</p>
      )}

      <div className="pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() => updateParams("page", String(currentPage - 1))}
        >
          ← Previous
        </button>
        <span>{currentPage} / {pageCount}</span>
        <button
          disabled={currentPage >= pageCount}
          onClick={() => updateParams("page", String(currentPage + 1))}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
