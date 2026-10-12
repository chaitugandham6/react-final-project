
import { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ cartCount }) {
  const searchRef = useRef(null);
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    const query = searchRef.current.value.trim();

    navigate(`/shop?search=${encodeURIComponent(query)}`);
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        Shop<span>Sphere</span>.
      </Link>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </nav>

      <form className="nav-search" onSubmit={handleSearch}>
        <input
          ref={searchRef}
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button type="submit">Search</button>
      </form>

      <div className="nav-actions">
        <Link to="/profile">Profile</Link>
        <Link to="/wishlist">♡ Wishlist</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
      </div>
    </header>
  );
}
