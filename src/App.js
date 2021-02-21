//Modules
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';

//Components
import './main.scss';
import Mainpage from "./pages/mainpage";
import Create from "./pages/create";
import Footer from "./components/footer";
import Receptory from "./pages/receptory";
import Nav from "./components/nav";
import ReceptoryFile from "./pages/receptoryfile";
import Profile from './pages/profile';
import Edit from './pages/edit';


//Firebase
import data from './utils/util';
import firebase from './firebase';
import PrivateRoute from "./components/privateRoute";
import LoginPage from "./pages/loginPage";
import PlaceholderCard from "./components/placeholderCard";

function App() {

  const ref = firebase.firestore().collection("recipe");


  const [recipes, setRecipes] = useState(data());
  const [recipe, setRecipe] = useState(recipes[0]);
  // const [recipes, setRecipes] = useState();
  // const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(false);
  const [mainImgs] = useState(recipes.filter(button => button.main === true));
  const [mainImg, setMainImg] = useState(mainImgs[0]);
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  async function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
        // console.log(items);
      });
      setRecipes(items);
    });
    setLoading(false);
  }

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  const loadingArr = [];
  for (let i = 0; i < 9; i++) {
    loadingArr.push(<PlaceholderCard />);
  }
  if (loading) {
    return (
      { loadingArr }
    )
  }
  return (

    <Router>
      <div className="App">
        <Nav logged={logged} setLogged={setLogged} />
        <AuthProvider setLogged={setLogged} currentUser={currentUser} setCurrentUser={setCurrentUser}>
          <Switch>
            <Route path="/" exact render={(props) => <Mainpage recipes={recipes} recipe={recipe} setRecipe={setRecipe} mainImgs={mainImgs} mainImg={mainImg} setMainImg={setMainImg} />} />
            <Route path="/receptar" exact render={(props) => <Receptory recipes={recipes} setRecipe={setRecipe} />} />
            <Route path="/receptar/:id" render={(props) => <ReceptoryFile recipe={recipe} logged={logged} />} />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/account" component={Profile} props={currentUser} recipes={recipes} />
            <Route path="/edit/:id" render={(props) => <Edit recipe={recipe} />} />
            <Route path="/login" render={(props) => <LoginPage setLogged={setLogged} />} />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
