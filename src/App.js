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
    const newRepository = {
      "title": `Novo repositório [${Date.now()}]`,
      "url": "https://github.com",
      "techs": ["NodeJS", "ReactJS", "React Native"]
    }

    const { data } = await api.post('/repositories', newRepository);

    setRepositories([...respositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(respositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repository =>
          <li key={repository.id} >
              <a href={repository.url} target="_blank" rel="noopener noreferrer">
                {repository.title}
              </a>

              <button onClick={() => handleRemoveRepository(repository.id)}>
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
