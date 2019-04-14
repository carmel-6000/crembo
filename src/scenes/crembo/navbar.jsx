import React, { Component } from 'react';
import { Auth } from '../../Auth/Auth';
import Sidebar from './sidebar';
import './crembo.css';

//THIS IS WHERE THE CARMEL6000LOGO, ADMIN AND LOGIN IS. 
class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            navHeader: Auth.isAuthenticated() === true ? true : false,
        }

    }

    // Calling Auth.logout -> clears cache and returns back. hitting route login
    logOut = () => {
        Auth.logout();
        this.setState({ navHeader: false });
    }
    render() {
        let navHeader = this.state.navHeader === true ?  <Sidebar logout={this.logOut} /> : "";
        return (

            <header>
                <nav className="navbar navbar-dark fixed-top primary ">
                    {navHeader}
                    <a className="navbar-brand">{this.props.title || 'כנפיים של קרמבו'}</a>
                </nav>
            </header>

        );
    }
}

export default  NavBar; 
