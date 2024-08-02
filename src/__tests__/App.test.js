import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { CharacterProvider } from '../providers/CharacterProvider';

test('renders the App component without crashing', () => {
  render(
    <MemoryRouter>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </MemoryRouter>
  );

  expect(screen.getByAltText(/Marvel Logo/i)).toBeInTheDocument();
});
