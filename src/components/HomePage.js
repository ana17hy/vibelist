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
          <p>Holi 🌷</p>
          <p>Acá te dejo 6 canciones que me encantan y siento que podrían gustarte :D</p>
          <p>dale like a las que vibren contigo y skip a las que no...</p>
          <p>al final te muestro tu resumen musical 🎧</p>
        </div>
        <button className="start-button" onClick={handleStart}>
        🌟 let's gooo
        </button>
      </div>
    </div>
  );
}

export default HomePage; 