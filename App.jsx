import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Lobby from './pages/Lobby';
import TicTacToe from './games/TicTacToe';
import Chess from './games/Chess';
import Header from './components/Header';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // Check for saved username in session storage
    const savedName = sessionStorage.getItem('gamepoint-username');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogin = (name) => {
    setUserName(name);
    sessionStorage.setItem('gamepoint-username', name);
  };

  const handleLogout = () => {
    setUserName('');
    sessionStorage.removeItem('gamepoint-username');
  };

  return (
    <BrowserRouter>
      {userName && <Header userName={userName} onLogout={handleLogout} />}
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={!userName ? <Landing onLogin={handleLogin} /> : <Navigate to="/lobby" />} 
          />
          <Route 
            path="/lobby" 
            element={userName ? <Lobby userName={userName} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/game/tictactoe/*" 
            element={userName ? <TicTacToe userName={userName} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/game/chess" 
            element={userName ? <Chess userName={userName} /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
