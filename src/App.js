import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repository =>
          <li key={repository.id} >
              <a href={repository.url} target="_blank" rel="noopener noreferrer">
                {repository.title}
              </a>

              <button onClick={() => handleRemoveRepository(1)}>
                Remover
              </button>            
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
