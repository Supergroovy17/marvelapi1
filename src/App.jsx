import React, { useState } from 'react';
import CharacterList from './assets/Components/CharacterList';
import CharacterDetail from './assets/Components/CharacterDetail';
import './App.css';

function App() {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterClick = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="app">
      <h1></h1>
      <div className="app-content">
        <CharacterList onCharacterClick={handleCharacterClick} />
        <CharacterDetail characterId={selectedCharacterId} />
      </div>
    </div>
  );
}

export default App;
