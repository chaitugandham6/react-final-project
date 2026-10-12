
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

import {
  CategoryLayout,
  CategoryDetails,
  CategoryIndex,
} from "./pages/Categories";

function Layout() {
  const { cart } = useCart();

  return (
    <>
      <Navbar cartCount={cart.length} />
      <main className="app-content">
        <Outlet />
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="/">Shop<span>Sphere</span>.</a>
        <p>Good finds. Better experiences.</p>
        <small>© 2026 ShopSphere — React Final Project</small>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="admin" element={<Admin />} />

        <Route path="categories" element={<CategoryLayout />}>
          <Route index element={<CategoryIndex />} />
          <Route path=":category" element={<CategoryDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
