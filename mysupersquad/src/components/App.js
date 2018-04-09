import React, { Component } from 'react';
import CharacterList from './CharacterList';
import HeroList from './HeroList';
import SquadStats from './SquadStats';
import '../styles/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>SuperSquad</h2>
        <div className="col">
          <CharacterList />
        </div>
        <div className="col">
          <HeroList />
        </div>
        <div className="col">
          <SquadStats />
        </div>
      </div>
    )
  }
}

export default App;
