import React, { Component } from 'react';
import './Login.css';
import { Auth } from './Auth';
import { Redirect } from 'react-router';
import logovan from './../img/logovan.png';
import vangoh from "./../img/vangoh.jpg";


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
                alert("שם משתמש או סיסמה אינם נכונים. \n אנא נסה שנית!");

                return;
            }
            if (isAuthenticated === true) {
                {this.props.navHeader()} ;
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
                <div class="container h-100 ">
                <img src={vangoh} alt="bg" class="bg"/> 
                    <div class="d-flex justify-content-center h-100 d-flex align-items-center">
                        <div class="user_card">
                            <div class="d-flex justify-content-center">
                                <div class="brand_logo_container">
                                    <img src={logovan} class="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <div class="d-flex justify-content-center form_container">
                                <form onSubmit={this.handleLogin}>
                                    <div class="form-group">
                                        <h1 class="text-center logintitle" >התחברות</h1>
                                    </div>

                                    <div class="input-group mb-3">

                                        <div class="input-group-append">
                                            <span class="input-group-text"><i class="fas fa-user" /></span>
                                        </div>
                                        <input type='email' ref='email' placeholder='הכנס אימייל...' required class="form-control input_user" />
                                    </div>
                                    <div class="input-group mb-2">
                                        <div class="input-group-append">
                                            <span className="input-group-text"><i class="fas fa-key"></i></span>
                                        </div>
                                        <input type='password' ref='pw' placeholder='הכנס סיסמה...' required class="form-control input_pass" />
                                    </div>
                                    <div class="d-flex justify-content-center mt-4 login_container">

                                        <input type="submit" value={this.state.isLoading ? "אנא המתן..." : "התחבר"} className="btn login_btn" />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            )

    }

}

export default Login;
