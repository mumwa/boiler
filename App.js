import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";

import Footer from "./components/views/Footer";
import LandingPage from "./components/views/LandingPage";
import LoginPage from "./components/views/LoginPage";
import NavBar from "./components/views/NavBar";
import RegisterPage from "./components/views/RegisterPage";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={withRouter(LandingPage)}/>
                <Route exact path="/login" component={withRouter(LoginPage)}/>
                <Route exact path="/register" component={withRouter(RegisterPage)}/>

                <Route component={() => <Redirect to="/"/>}/>
            </Switch>
        </Router>
    );
}

export default App;
