import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Account from "./Account";
import Upload from "./components/Upload";
import Image from "./components/Image";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/login" exact component={Account} />
        {/* <Route path="/user/:userID" component={UserPage}> */}
        {/* <Upload />
        <Image /> */}
      </Router>
    </div>
  );
}

export default App;
