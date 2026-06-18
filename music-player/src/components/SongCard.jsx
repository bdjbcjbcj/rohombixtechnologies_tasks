export default function SongCard({ song, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-3 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer flex justify-between"
    >
      <div>
        <p className="font-semibold">{song.title}</p>
        <p className="text-sm text-gray-300">{song.artist}</p>
      </div>

      <span className="text-xs bg-gray-900 px-2 py-1 rounded">
        {song.category}
      </span>
    </div>
  );
}