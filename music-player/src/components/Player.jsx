import { useEffect, useRef, useState } from "react";

export default function Player({ currentSong, songs, setCurrentSong }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [speed, setSpeed] = useState(1);

  // play when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentSong]);

  // play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // next song
  const nextSong = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const next = songs[(index + 1) % songs.length];
    setCurrentSong(next);
    setIsPlaying(true);
  };

  // prev song
  const prevSong = () => {
    const index = songs.findIndex((s) => s.id === currentSong.id);
    const prev = songs[(index - 1 + songs.length) % songs.length];
    setCurrentSong(prev);
    setIsPlaying(true);
  };

  // volume
  const changeVolume = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.current.volume = value;
  };

  // time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // seek bar
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  // speed change
  const changeSpeed = (e) => {
    const value = parseFloat(e.target.value);
    setSpeed(value);
    audioRef.current.playbackRate = value;
  };

  // download
  const downloadSong = () => {
    const link = document.createElement("a");
    link.href = currentSong.src;
    link.download = currentSong.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // format time
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">{currentSong.title}</h2>
      <p className="text-gray-400">{currentSong.artist}</p>

      {/* AUDIO */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* SEEK BAR */}
      <div className="mt-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full"
        />

        <div className="flex justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-3 mt-4 flex-wrap">
        <button onClick={prevSong} className="px-3 py-2 bg-gray-700 rounded">
          ⏮
        </button>

        <button onClick={togglePlay} className="px-3 py-2 bg-green-600 rounded">
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>

        <button onClick={nextSong} className="px-3 py-2 bg-gray-700 rounded">
          ⏭
        </button>

        {/* DOWNLOAD */}
        <button onClick={downloadSong} className="px-3 py-2 bg-blue-600 rounded">
          ⬇ Download
        </button>
      </div>

      {/* SPEED */}
      <div className="mt-4">
        <label className="block mb-1">Speed</label>
        <select
          value={speed}
          onChange={changeSpeed}
          className="bg-gray-700 p-2 rounded w-full"
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x (Normal)</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* VOLUME */}
      <div className="mt-4">
        <label className="block mb-2">Volume ({Math.round(volume * 100)}%)</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={changeVolume}
          className="w-full"
        />
      </div>
    </div>
  );
}