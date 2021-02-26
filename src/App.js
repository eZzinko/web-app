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
            <Route path="/" exact render={(props) => <Mainpage />} />
            <Route path="/receptar" exact render={(props) => <Receptory setAsyncDataActive={setAsyncDataActive} />} />
            <Route path="/receptar/:id" render={(props) => <ReceptoryFile logged={logged} />} />
            <Route path="/edit/:id" render={(props) => <Edit />} />
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
