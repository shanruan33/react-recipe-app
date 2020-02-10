import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const APP_ID = process.env.REACT_APP_API_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('passion fruit');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => { 
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App" key="app">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes" key="key1">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={Math.round(recipe.recipe.calories)}
            ingredients={recipe.recipe.ingredients.map(ingredient => (
              <li key={ingredient.index}>{ingredient.text}</li>
            ))}
            image={recipe.recipe.image}
            // time={recipe.recipe.totalTime}
            diet={recipe.recipe.dietLabels[0]}
            link={recipe.recipe.url}
          />
        ))}
      </div>
    </div>
  );
}

const Recipe = ({ title, calories, ingredients, image, time, diet,link }) => {
  return (
    <div className="recipe-card">
      <h1>{title}</h1>
      <div className="recipe-content">
        <img src={image} alt='' />
        <div className="notes">
          <p>{diet}</p>
          <p>{calories} calories</p>
          {/* <p>{time} minutes</p> */}
          <a href={link}>Instruction</a>          
        </div>
        <ol className="ingrediant">
          {ingredients}
        </ol>
      </div>
    </div>
  );
}


export default App;
