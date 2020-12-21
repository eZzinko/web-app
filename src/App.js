import React from "react";
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
