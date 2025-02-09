export default function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border rounded-md"
    />
  );
}
