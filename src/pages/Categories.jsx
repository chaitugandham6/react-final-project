
import { Link, Outlet, useParams } from "react-router-dom";
import Shop from "./Shop";

const categoryNames = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

export function CategoryLayout() {
  return (
    <section className="section">
      <span className="section-kicker">SHOP BY COLLECTION</span>
      <h1>Categories</h1>
      <div className="category-links">
        {categoryNames.map((name) => (
          <Link key={name} to={name}>
            {name.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
      <Outlet />
    </section>
  );
}

export function CategoryDetails() {
  const { category } = useParams();

  return (
    <div>
      <h2>{category.replaceAll("-", " ")}</h2>
      <ShopCategory category={category} />
    </div>
  );
}

function ShopCategory({ category }) {
  return (
    <Link
      className="primary-button"
      to={`/shop?category=${encodeURIComponent(category)}`}
    >
      View {category.replaceAll("-", " ")} products →
    </Link>
  );
}

// Fallback content for the category index route.
export function CategoryIndex() {
  return (
    <div>
      <p>Choose a category above to explore its collection.</p>
      <Shop />
    </div>
  );
}
