export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search songs..."
      className="w-full p-3 rounded-lg bg-gray-800 outline-none"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}