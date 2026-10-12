
import { useState } from "react";

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <section className="section">
      <h1>My Profile</h1>

      {loggedIn ? (
        <div>
          <h2>Welcome to ShopSphere!</h2>
          <p>You are viewing the demo profile.</p>
          <button onClick={() => setLoggedIn(false)}>Log out</button>
        </div>
      ) : (
        <div>
          <p>Sign in to view your demo profile.</p>
          <button
            className="primary-button"
            onClick={() => setLoggedIn(true)}
          >
            Demo Sign In
          </button>
        </div>
      )}

      <p className="muted">
        This is a UI demonstration, not real authentication.
      </p>
    </section>
  );
}
