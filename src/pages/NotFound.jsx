
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section not-found">
      <span className="section-kicker">404 — PAGE NOT FOUND</span>
      <h1>Looks like this page is out of stock.</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link className="primary-button" to="/">Return Home →</Link>
    </section>
  );
}
