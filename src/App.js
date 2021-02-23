//Modules
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';

//Import style tree based on SCSS
import './main.scss';   //::root

//Components
import Footer from "./components/footer";
import Nav from "./components/nav";

//Pages
import Mainpage from "./pages/mainpage";
import Create from "./pages/create";
import Receptory from "./pages/receptory"
import ReceptoryFile from "./pages/receptoryfile";
import Profile from './pages/profile';
import Edit from './pages/edit';
import LoginPage from "./pages/loginPage";

//Firebase
import PrivateRoute from "./components/privateRoute";

//Mocup data
import data from './utils/util';

function App() {

  //Firebase initialization for Firestore collection

  //Global STATE configuration
  // eslint-disable-next-line 
  const [recipes, setRecipes] = useState(data());         //All recipes - default data from mocup
  const [recipe, setRecipe] = useState(recipes[0]);      //Selected first from mocup
  //
  const [mainImgs] = useState(recipes.filter(button => button.main === true));          //Filter for heading slideshow
  const [mainImg, setMainImg] = useState(mainImgs[0]);          //First displayed heading from slideshow
  //
  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [asyncDataID, setAsyncDataID] = useState();
  const [asyncDataActive, setAsyncDataActive] = useState();

  return (

    //React router 
    <Router>
      <div className="App">

        {/* Navigation component */}
        <Nav logged={logged} setLogged={setLogged} />

        {/* Custom AuthetificationPrivider to secure pages */}
        <AuthProvider setLogged={setLogged} currentUser={currentUser} setCurrentUser={setCurrentUser}>
          <Switch>

            {/* Public routes */}
            <Route path="/" exact render={(props) => <Mainpage recipes={recipes} recipe={recipe} setRecipe={setRecipe} mainImgs={mainImgs} mainImg={mainImg} setMainImg={setMainImg} />} />
            <Route path="/receptar" exact render={(props) => <Receptory setAsyncDataActive={setAsyncDataActive} />} />
            <Route path="/receptar/:id" render={(props) => <ReceptoryFile logged={logged} />} />
            {/* <Route path="/receptar/:id" render={(props) => <ReceptoryFile id={recipe.id} />} /> */}
            <Route path="/edit/:id" render={(props) => <Edit recipe={recipe} />} />
            <Route path="/login" render={(props) => <LoginPage setLogged={setLogged} />} />

            {/* Private routers */}
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/account" component={Profile} props={currentUser} />
          </Switch>
        </AuthProvider>
        <Footer />
      </div>

      {/* Footer component */}
    </Router>
  );
}

export default App;
