import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { CharacterProvider } from './providers/CharacterProvider';
import './styles/Index.scss';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </Router>
);
