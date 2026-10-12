
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSuccess(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Enter at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Subject is required.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  return (
    <section className="section form-page">
      <span className="section-kicker">WE'RE HERE TO HELP</span>
      <h1>Contact ShopSphere</h1>
      <p>Send a message using the form below.</p>

      {success && (
        <p className="success-message" role="status">
          Your form passed validation successfully. This demo does not send
          messages to a server.
        </p>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label>
          Subject
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          {errors.subject && <small className="error">{errors.subject}</small>}
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
          {errors.message && <small className="error">{errors.message}</small>}
        </label>

        <button className="primary-button" type="submit">
          Submit Message
        </button>
      </form>
    </section>
  );
}
