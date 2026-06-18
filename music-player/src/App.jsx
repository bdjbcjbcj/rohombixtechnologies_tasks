import { useState } from "react";
import { songs } from "./data/songs";

import Player from "./components/Player";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";

export default function App() {
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [category, setCategory] = useState("All");

  // search
  const handleSearch = (text) => {
    const filtered = songs.filter((s) =>
      s.title.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSongs(filtered);
  };

  // category filter
  const handleCategory = (cat) => {
    setCategory(cat);

    if (cat === "All") {
      setFilteredSongs(songs);
    } else {
      setFilteredSongs(songs.filter((s) => s.category === cat));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold text-center mb-5">
        🎵 My Music Player
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        <SearchBar onSearch={handleSearch} />
        <CategoryFilter onChange={handleCategory} />
        

        <Player
          currentSong={currentSong}
          songs={filteredSongs}
          setCurrentSong={setCurrentSong}
        />

        <Playlist songs={filteredSongs} setCurrentSong={setCurrentSong} />
      </div>
    </div>
  );
}
