import { getCharacters } from '../services/marvelService';
import axios from 'axios';

jest.mock('axios');

test('fetches characters from API', async () => {
  const characters = [{ id: 1, name: 'Spider-Man' }];
  axios.get.mockResolvedValue({ data: { data: { results: characters } } });

  const result = await getCharacters();
  expect(result).toEqual(characters);
});
