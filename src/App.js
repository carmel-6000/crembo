import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Login from './Auth/Login';
import Auth from './Auth/Auth';
import Crembo from './scenes/crembo/crembo'
import Dashboard from './scenes/dashboard/dashboard'


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
            <Router>
                <div className="App">
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/" component={Crembo} />
                    <Route path="/login" render={(props) => <Login {...props} navHeader={this.updateNav} />}
                    />
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
