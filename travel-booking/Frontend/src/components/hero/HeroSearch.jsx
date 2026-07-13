import { Search } from "lucide-react";

const HeroSearch = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Destination"
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 transition"
        >
          <Search size={20} />
          Search
        </button>
      </form>
    </div>
  );
};

export default HeroSearch;