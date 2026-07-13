const tags = [
  "Dubai",
  "Paris",
  "London",
  "Turkey",
  "Thailand",
  "Maldives",
];

const PopularTags = () => {
  return (
    <div>
      <p className="text-gray-600 font-medium mb-3">
        Popular Destinations
      </p>

      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 rounded-full bg-white border hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;