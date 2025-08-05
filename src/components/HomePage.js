import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/music');
  };

  return (
    <div className="home-page">
      <div className="home-content">
        <h1 className="app-title">vibelist</h1>
        <div className="app-description">
          <p>Descubre tu próximo hit favorito</p>
          <p>Te presentamos 6 canciones seleccionadas especialmente para ti</p>
          <p>¡Dale like a las que te gusten y encuentra tu nueva música!</p>
        </div>
        <button className="start-button" onClick={handleStart}>
          Comenzar
        </button>
      </div>
    </div>
  );
}

export default HomePage; 