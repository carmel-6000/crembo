import React, { Component } from 'react';
import './App.css';
import { Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import Login from './Auth/Login';
import Auth from './Auth/Auth';
import Crembo from './scenes/crembo/crembo';
import Dashboard from './scenes/dashboard/dashboard';
import history from './history';
import AssistantSide from './scenes/assistants/home';
import notFound from './scenes/crembo/notFound';
import NavBar from './scenes/crembo/navbar';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)

class App extends Component {

    constructor(props) {
        super(props)
        this.state = { navHeader: Auth.isAuthenticated() === true ? true : false }
    }

    updateNav = () => {
        this.setState({ navHeader: true })
    }

    render() {
        return (
            <Router history={history}>
                <div className="App">
                    <NavBar/>
                    <Switch>
                        <PrivateRoute path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/assistant" component={AssistantSide} />
                        <PrivateRoute path="/" component={Crembo} />
                        <PrivateRoute component={notFound} />
                    </Switch>
                    <Route path="/login" render={(props) => <Login {...props} navHeader={this.updateNav} />}/>
                </div>
            </Router>
        );
    }
}



// class NAME extends Component {
//     render() {
//         return (

//         );
//     }
// }


export default App
