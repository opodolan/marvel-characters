import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/characters" />} />
      <Route path="/characters" element={<CharacterList />} />
      <Route path="/characters/:id" element={<CharacterDetail />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;
