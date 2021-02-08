//Modules
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import './main.scss';
import Mainpage from "./pages/mainpage";
import Create from "./pages/create";
import Footer from "./components/footer";
import Receptory from "./pages/receptory";
import Nav from "./components/nav";
import ReceptoryFile from "./pages/receptoryfile";

//Firebase
import data from './utils/util';
import firebase from './firebase';

function App() {

  const ref = firebase.firestore().collection("recipe");


  const [recipes, setRecipes] = useState(data());
  const [recipe, setRecipe] = useState(recipes[0]);
  const [loading, setLoading] = useState(false);
  const [mainImgs] = useState(recipes.filter(button => button.main === true));
  const [mainImg, setMainImg] = useState(mainImgs[0]);

  function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRecipes(items);
    });
    setLoading(false);

  }

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (

    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact render={(props) => <Mainpage recipes={recipes} recipe={recipe} setRecipe={setRecipe} mainImgs={mainImgs} mainImg={mainImg} setMainImg={setMainImg} />} />
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
