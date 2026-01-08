export default function Badge({ text }) {
  return (
    <span
      style={{
        padding: "2px 8px",
        marginRight: "6px",
        borderRadius: "12px",
        background: "#e5e7eb",
        fontSize: "12px",
      }}
    >
      {text}
    </span>
  );
}
