import React from "react";
import Infocard from "./components/infocard";
import Nav from "./components/nav";
import './main.scss';
import Mainpage from "./pages/mainpage";

function App() {
  return (
    <div className="App">
      <Nav />
      <Mainpage />
    </div>
  );
}

export default App;
