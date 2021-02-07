import React, { useState, useEffect } from "react";
import Nav from "./components/nav";
import './main.scss';
import Mainpage from "./pages/mainpage";
import Create from "./pages/create";
import Footer from "./components/footer";
import Receptory from "./pages/receptory";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReceptoryFile from "./pages/receptoryfile";

import data from './utils/util';
import firebase from './firebase';

function App() {

  const ref = firebase.firestore().collection("recipe");


  // const [recipes, setRecipes] = useState([]);
  const [recipes, setRecipes] = useState(data());

  console.log(recipes);

  const [recipe, setRecipe] = useState(recipes[0]);
  const [loading, setLoading] = useState(false);

  function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      console.log(items);
      setRecipes(items);
    });
    setLoading(false);
    console.log(recipes);
  }

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  return (

    // <div>
    //   <h1>Schools</h1>
    //   {recipes.map((recipe) => (
    //     <div key={recipe.id}>
    //       <h2>{recipe.artist}
    //         {recipe.id}</h2>
    //       <p>{recipe.description}
    //         {recipe.cover}</p>
    //       { console.log(recipe)}
    //     </div>
    //   ))}
    // </div>
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact render={(props) => <Mainpage recipes={recipes} recipe={recipe} setRecipe={setRecipe} />} />
          <Route path="/receptar" exact render={(props) => <Receptory recipes={recipes} setRecipe={setRecipe} />} />

          <Route path="/receptar/:id" render={(props) => <ReceptoryFile recipe={recipe} />} />
          <Route path="/create" render={(props) => <Create />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
