import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import Account from "./Account";
import UserPage from "./UserPage";
import PhotoPage from "./PhotoPage";
import Upload from "./components/Upload";
import Image from "./components/Image";
import { UserContext } from "./Context";
import { ModalContext } from "./Context";

function App() {
  const [state, setState] = useState({ user: null });
  const [modalShow, setModalShow] = useState(true);

  return (
    <div>
      <UserContext.Provider value={[state, setState]}>
        <ModalContext.Provider value={[modalShow, setModalShow]}>
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/upload" exact component={Upload} />
            <Route path="/login" exact component={Account} />
            <Route path="/signup" exact component={Account} />
            <Route path="/user/:userID" component={UserPage} />
            <Route path="/p/:fileName" component={PhotoPage} />
          </Router>
        </ModalContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
