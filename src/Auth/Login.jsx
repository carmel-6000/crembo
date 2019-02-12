import React, { Component } from 'react';
import './Login.css';
import Auth from './Auth';
import { Redirect } from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            isLoading: false,
            redirTo: false
        }

    }
    handleLogin(e) {
        e.preventDefault();

        let email = this.refs.email.value;
        let pw = this.refs.pw.value;
        this.setState({ isLoading: true });

        Auth.authenticate(email, pw, (isAuthenticated) => {

            this.setState({ isLoading: false });
            if (isAuthenticated === false) {
                alert("Login Failed, \n Try again");
                return;
            }
            if (isAuthenticated === true) {
                { this.props.navHeader() };
                this.setState({ redirTo: 'home' });
            }

        });

        return false;
    }


    render() {
        if (this.state.redirTo !== false) {
            return (<Redirect to={{
                pathname: '/', state: this.state
            }} />);
        } else
            return (
                <div className='loginPage'>

                    <div className='loginBox'>
                        <div className='frow'>
                            <h3>ברוך הבא למערכת ההסעות של קרמבו! מי אתה?</h3>
                        </div>
                        <form onSubmit={this.handleLogin}>
                            <div className='frow'>
                                <input type='email' ref='email' placeholder='הכנס אימייל...' required />
                            </div>
                            <div className='frow'>
                                <input type='password' ref='pw' placeholder='הכנס סיסמה...' required />
                            </div>
                            <div className='frow'>
                                {this.state.isLoading ?
                                    <button className='btn btn-warning'>אנא המתן...</button> :
                                    <input type='submit' className='btn btn-lg btn-warning' value='הכנס' />
                                }
                            </div>
                        </form>


                    </div>
                </div>
            )

    }

}

export default Login;