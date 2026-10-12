
export default function ProtectedMessage({ title, children }) {
  return (
    <aside className="notice-card">
      <h3>{title}</h3>
      <div>{children}</div>
    </aside>
  );
}
