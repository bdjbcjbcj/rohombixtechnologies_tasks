const categories = ["All", "Pop", "Rock", "EDM"];

export default function CategoryFilter({ onChange }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}