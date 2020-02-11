import React from 'react';
import logo from './logo.svg';
import './App.css';
import MemoryGame from './memory_game/memory_game.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Memory Game
      </header>
      <MemoryGame></MemoryGame>
    </div>
  );
}

export default App;
