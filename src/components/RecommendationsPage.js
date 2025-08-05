import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendationsPage.css';

const recommendedSongs = [
  {
    id: 1,
    title: "Get You",
    artist: "Daniel Caesar",
    cover: "/music/covers/song1.jpeg",
    audioUrl: "/music/song1.mp3",
    description: "Simplemente TEMÓN"
  },
  {
    id: 2,
    title: "Japanese Denim",
    artist: "Daniel Caesar",
    cover: "/music/covers/song2.jpeg",
    audioUrl: "/music/song2.mp3",
    description: "Mi canción con Leo <3"
  },
  {
    id: 3,
    title: "Too Good To Say Goodbye",
    artist: "Bruno Mars",
    cover: "/music/covers/song3.jpeg",
    audioUrl: "/music/song3.mp3",
    description: "Muy buena para ser underrated"
  },
  {
    id: 4,
    title: "Till There Was You",
    artist: "The Beatles",
    cover: "/music/covers/song4.jpeg",
    audioUrl: "/music/song4.mp3",
    description: "El solo de guitarra es increible"
  },
  {
    id: 5,
    title: "Anna (Go To Him)",
    artist: "The Beatles",
    cover: "/music/covers/song5.jpeg",
    audioUrl: "/music/song5.mp3",
    description: "Dice mi nombre asi que es mi cancion"
  },
  {
    id: 6,
    title: "Hold Me Down",
    artist: "Daniel Caesar",
    cover: "/music/covers/song6.jpeg",
    audioUrl: "/music/song6.mp3",
    description: "La mejor de Daniel Caesar"
  },
  {
    id: 7,
    title: "Saturn",
    artist: "Sza",
    cover: "/music/covers/song7.jpeg",
    audioUrl: "/music/song7.mp3",
    description: "Te amo sza"
  },
  {
    id: 8,
    title: "18+1",
    artist: "Alvaro Diaz",
    cover: "/music/covers/song10.jpeg",
    audioUrl: "/music/song10.mp3",
    description: "temazo de alvarito"
  }
];

function RecommendationsPage() {
  const navigate = useNavigate();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    if (recommendedSongs.length > 0 && currentSongIndex < recommendedSongs.length) {
      const newAudio = new Audio(recommendedSongs[currentSongIndex].audioUrl);
      newAudio.volume = volume;
      setAudio(newAudio);
      audioRef.current = newAudio;
      
      // Event listeners para el audio
      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });
      
      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });
      
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
      
      return () => {
        newAudio.pause();
        newAudio.currentTime = 0;
        newAudio.removeEventListener('loadedmetadata', () => {});
        newAudio.removeEventListener('timeupdate', () => {});
        newAudio.removeEventListener('ended', () => {});
      };
    }
  }, [currentSongIndex, volume]);

  // Efecto separado para el volumen
  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [volume, audio]);

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.log('Error reproduciendo audio:', error);
          alert('No se pudo reproducir el audio. Verifica que el archivo existe.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (audio) {
      const newTime = (e.target.value / 100) * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  const handleSkipForward = () => {
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 10, duration);
    }
  };

  const handleSkipBackward = () => {
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNextSong = () => {
    if (currentSongIndex < recommendedSongs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      setCurrentTime(0);
    }
  };

  const handlePrevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      setCurrentTime(0);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    navigate('/music');
  };

  if (recommendedSongs.length === 0) {
    return <div className="loading">Cargando recomendaciones...</div>;
  }

  const currentSong = recommendedSongs[currentSongIndex];

  return (
    <div className="recommendations-page">
      <div className="recommendations-container">
        <div className="header-section">
          <h1 className="recommendations-title"> Canciones que deberías escuchar si o si!!</h1>
          <p className="recommendations-subtitle">Obviamente mis canciones fav son las que salieron antes jejeje</p>
        </div>

        <div className="song-player">
          <div className="song-info-header">
            <h2 className="song-title">{currentSong.title}</h2>
            <p className="song-artist">{currentSong.artist}</p>
            <p className="song-description">{currentSong.description}</p>
          </div>

          <div className="song-cover">
            <img src={currentSong.cover} alt={currentSong.title} />
            <button className="play-button" onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>

          <div className="audio-controls">
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <div className="seek-bar-container">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="seek-bar"
              />
            </div>
            
            <div className="control-buttons">
              <button className="control-btn" onClick={handlePrevSong}>
                ⏮️ Anterior
              </button>
              <button className="control-btn" onClick={handleSkipBackward}>
                ⏪ 10s
              </button>
              <button className="control-btn" onClick={handleSkipForward}>
                10s ⏩
              </button>
              <button className="control-btn" onClick={handleNextSong}>
                Siguiente ⏭️
              </button>
            </div>
            
            <div className="volume-control">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-bar"
              />
            </div>
          </div>

          <div className="song-counter">
            Canción {currentSongIndex + 1} de {recommendedSongs.length}
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button try-again" onClick={handleTryAgain}>
            🔄 Intentar de nuevo
          </button>
          <button className="action-button discover" onClick={handleGoHome}>
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecommendationsPage; 