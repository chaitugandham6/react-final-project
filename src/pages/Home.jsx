
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="section-kicker">THE NEW SEASON</span>
          <h1>Elevate Your Everyday.</h1>
          <p>Discover modern essentials for your style and lifestyle.</p>
          <Link className="primary-button" to="/shop">
            Explore Collection →
          </Link>
        </div>
      </section>

      <section className="section">
        <span className="section-kicker">WHY SHOPSPHERE?</span>
        <h2>Shopping, made better.</h2>
        <div className="benefits">
          <article><h3>Quality Finds</h3><p>Discover products selected for everyday living.</p></article>
          <article><h3>Easy Shopping</h3><p>Find products quickly with search and filters.</p></article>
          <article><h3>Simple Returns</h3><p>A clear shopping experience from start to finish.</p></article>
        </div>
        <Link to="/categories" className="text-button">Explore categories →</Link>
      </section>
    </>
  );
}
