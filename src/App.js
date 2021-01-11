import React from "react";
import Nav from "./components/nav";
import './main.scss';
import Mainpage from "./pages/mainpage";
import Footer from "./components/footer";
import Receptory from "./pages/receptory";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReceptoryFile from "./pages/receptoryfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Mainpage} />
          <Route path="/receptar" component={Receptory} />
          <Route path="/create" component={ReceptoryFile} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
