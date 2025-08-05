import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SummaryPage.css';

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ratings, songs } = location.state || { ratings: {}, songs: [] };

  const handleTryAgain = () => {
    navigate('/music');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleDiscoverMusic = () => {
    navigate('/recommendations');
  };

  // Calcular estadísticas
  const likedSongs = songs.filter(song => ratings[song.id] === 'like');
  const dislikedSongs = songs.filter(song => ratings[song.id] === 'dislike');
  const totalRated = likedSongs.length + dislikedSongs.length;
  const likePercentage = totalRated > 0 ? Math.round((likedSongs.length / totalRated) * 100) : 0;

  return (
    <div className="summary-page">
      <div className="summary-container">
        <h1 className="summary-title">¡Resultados de tu vibelist!</h1>
        
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{likedSongs.length}</div>
            <div className="stat-label">Canciones que te gustaron</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{dislikedSongs.length}</div>
            <div className="stat-label">Canciones que no te gustaron</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">{likePercentage}%</div>
            <div className="stat-label">Porcentaje de aprobación</div>
          </div>
        </div>

        {likedSongs.length > 0 && (
          <div className="liked-songs">
            <h2>🎵 Canciones que te gustaron:</h2>
            <div className="songs-grid">
              {likedSongs.map(song => (
                <div key={song.id} className="song-item liked">
                  <img src={song.cover} alt={song.title} />
                  <div className="song-details">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {dislikedSongs.length > 0 && (
          <div className="disliked-songs">
            <h2>👎 Canciones que no te gustaron:</h2>
            <div className="songs-grid">
              {dislikedSongs.map(song => (
                <div key={song.id} className="song-item disliked">
                  <img src={song.cover} alt={song.title} />
                  <div className="song-details">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button className="action-button try-again" onClick={handleTryAgain}>
            🔄 Intentar de nuevo
          </button>
          <button className="action-button discover" onClick={handleDiscoverMusic}>
            🎵 Descubre mi gusto musical
          </button>
          <button className="action-button go-home" onClick={handleGoHome}>
            🏠 Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage; 