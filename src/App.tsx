import React from 'react';
import './App.scss';
import {
  Navigate, Route, Routes, Link,
} from 'react-router-dom';
import Game from './pages/Game/Game';
import Statistics from './pages/Statistics/Statistics';

const App = () => (
  <div className="App">
    <div className="nav">
      <Link to="/statistics" className="link">
        Statistics
      </Link>
      <Link to="/game" className="link">
        Game
      </Link>
    </div>
    <Routes>
      <Route path="/" element={<Navigate to="/game" />} />
      <Route path="/game" element={<Game />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  </div>
);

export default App;
