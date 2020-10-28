import React,{ useEffect } from "react";
import { useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repos,setRepos] = useState([])

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      // console.log(response.data);
      // Aqui a api responde com todos os repositórios, então setamos direto tudo
      setRepos(response.data);

    })
  },[]);


  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      "url": "https://github.com/Rocketseat/umbriel",
      "title": "Fastas",
      "techs": ["Node", "Express", "TypeScript"]
    })
      // console.log(response.data)
      // Aqui a api responde somente o repositório criado, então precisamos resgatar os anteriores
    setRepos([...repos,response.data])

    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const remainedRepos = repos.filter(
      repo => repo.id !== id
    );

    setRepos(remainedRepos)
    
  }



  return (
    <div>
      <ul data-testid="repository-list">

      {repos.map(repo=>{
        return (

          <li key={repo.id}>
          {repo.title}
          
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>

        )
      })}



      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
