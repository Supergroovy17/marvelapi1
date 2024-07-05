import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css';

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const PUBLIC_KEY = 'b96a6acec29a60984b77eec6325b103f';
  const HASH = '2d8caf72dd1e5437a9f2e7f70b0645f9';
  const API_URL = 'https://gateway.marvel.com/v1/public/characters';

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const params = {
          ts: 1,
          apikey: PUBLIC_KEY,
          hash: HASH,
          ...(searchQuery && { nameStartsWith: searchQuery }),
        };

        const response = await axios.get(API_URL, { params });
        setCharacters(response.data.data.results);
        setError(null);
      } catch (err) {
        setError('Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [searchQuery]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="character-list">
      <Navbar searchQuery={searchQuery} onInputChange={handleInputChange} />
      <div className="character-cards">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => onCharacterClick(character.id)}
          >
            <img
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ searchQuery, onInputChange }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search characters..."
            aria-label="Search"
            value={searchQuery}
            onChange={onInputChange}
          />
          {}
          {}
        </form>
      </div>
    </nav>
  );
};

export default CharacterList;
