import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MusicPage.css';

// INSTRUCCIONES PARA AGREGAR TUS CANCIONES:
// 1. Coloca tus archivos MP3 en: public/music/
// 2. Coloca tus imágenes JPEG en: public/music/covers/
// 3. Actualiza el array sampleSongs abajo con tus archivos

const sampleSongs = [
  {
    id: 1,
    title: "Get You",
    artist: "Daniel Caesar",
    cover: "/music/covers/song1.jpeg", // Tu imagen JPEG aquí
    audioUrl: "/music/song1.mp3" // Tu archivo MP3 aquí
  },
  {
    id: 2,
    title: "Japanese Denim",
    artist: "Daniel Caesar",
    cover: "/music/covers/song2.jpeg",
    audioUrl: "/music/song2.mp3"
  },
  {
    id: 3,
    title: "Too Good To Say Goodbye",
    artist: "Bruno Mars",
    cover: "/music/covers/song3.jpeg",
    audioUrl: "/music/song3.mp3"
  },
  {
    id: 4,
    title: "Till There Was You",
    artist: "The Beatles",
    cover: "/music/covers/song4.jpeg",
    audioUrl: "/music/song4.mp3"
  },
  {
    id: 5,
    title: "Anna (Go To Him)",
    artist: "The Beatles",
    cover: "/music/covers/song5.jpeg",
    audioUrl: "/music/song5.mp3"
  },
  {
    id: 6,
    title: "Hold Me Down",
    artist: "Daniel Caesar",
    cover: "/music/covers/song6.jpeg",
    audioUrl: "/music/song6.mp3"
  },
  {
    id: 7,
    title: "Hey Jude",
    artist: "The Beatles",
    cover: "/music/covers/song5.jpeg",
    audioUrl: "/music/song5.mp3"
  },
  {
    id: 8,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    cover: "/music/covers/song4.jpeg",
    audioUrl: "/music/song4.mp3"
  }
];

function MusicPage() {
  const navigate = useNavigate();
  const [currentSongs, setCurrentSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [ratings, setRatings] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [slideDirection, setSlideDirection] = useState(''); // 'left' o 'right'
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Seleccionar 6 canciones aleatorias
    const shuffled = [...sampleSongs].sort(() => 0.5 - Math.random());
    setCurrentSongs(shuffled.slice(0, 6));
  }, []);

  useEffect(() => {
    if (currentSongs.length > 0 && currentSongIndex < currentSongs.length) {
      const newAudio = new Audio(currentSongs[currentSongIndex].audioUrl);
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
  }, [currentSongIndex, currentSongs]);

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
        // Para YouTube, abrir en nueva pestaña
        if (audio.src.includes('youtube.com')) {
          window.open(audio.src, '_blank');
          return;
        }
        // Para archivos MP3 locales
        audio.play().catch(error => {
          console.log('Error reproduciendo audio:', error);
          alert('No se pudo reproducir el audio. Verifica que el archivo existe.');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (audio && !audio.src.includes('youtube.com')) {
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
    if (audio && !audio.src.includes('youtube.com')) {
      audio.currentTime = Math.min(audio.currentTime + 10, duration);
    }
  };

  const handleSkipBackward = () => {
    if (audio && !audio.src.includes('youtube.com')) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRating = (rating) => {
    const songId = currentSongs[currentSongIndex].id;
    const newRatings = {
      ...ratings,
      [songId]: rating
    };
    setRatings(newRatings);

    // Pausar audio si está reproduciéndose
    if (audio && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }

    // Iniciar animación
    setSlideDirection(rating === 'like' ? 'right' : 'left');
    setIsAnimating(true);

    // Esperar a que termine la animación antes de cambiar de canción
    setTimeout(() => {
      // Pasar a la siguiente canción
      if (currentSongIndex < currentSongs.length - 1) {
        setCurrentSongIndex(currentSongIndex + 1);
        setCurrentTime(0);
        setSlideDirection('');
        setIsAnimating(false);
      } else {
        // Ir a la página de resumen con las ratings actualizadas
        navigate('/summary', { state: { ratings: newRatings, songs: currentSongs } });
      }
    }, 300); // Duración de la animación
  };

  if (currentSongs.length === 0) {
    return <div className="loading">Cargando canciones...</div>;
  }

  const currentSong = currentSongs[currentSongIndex];
  const isYouTube = currentSong.audioUrl.includes('youtube.com');

  return (
    <div className="music-page">
      <div className="music-container">
        <div className="progress-bar">
          <div className="progress-text">
            Canción {currentSongIndex + 1} de {currentSongs.length}
          </div>
          <div className="progress-fill" style={{ width: `${((currentSongIndex + 1) / currentSongs.length) * 100}%` }}></div>
        </div>

        <div className={`song-card ${isAnimating ? `slide-${slideDirection}` : ''}`}>
          <div className="song-cover">
            <img src={currentSong.cover} alt={currentSong.title} />
            <button className="play-button" onClick={handlePlayPause}>
              {isYouTube ? '🎥' : (isPlaying ? '⏸️' : '▶️')}
            </button>
          </div>
          
          <div className="song-info">
            <h2 className="song-title">{currentSong.title}</h2>
            <p className="song-artist">{currentSong.artist}</p>
          </div>

          {!isYouTube && (
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
                <button className="control-btn" onClick={handleSkipBackward}>
                  ⏪ 10s
                </button>
                <button className="control-btn" onClick={handleSkipForward}>
                  10s ⏩
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
          )}

          <div className="rating-buttons">
            <button 
              className="rating-button dislike" 
              onClick={() => handleRating('dislike')}
            >
              👎 No me gusta
            </button>
            <button 
              className="rating-button like" 
              onClick={() => handleRating('like')}
            >
              👍 Me gusta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPage; 