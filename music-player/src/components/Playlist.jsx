import SongCard from "./SongCard";

export default function Playlist({ songs, setCurrentSong }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-3">Playlist</h2>

      <div className="space-y-2">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onClick={() => setCurrentSong(song)}
          />
        ))}
      </div>
    </div>
  );
}