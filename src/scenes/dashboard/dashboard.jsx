import React, { Component } from 'react';
import Grid from '../../Grid/Grid';
import { Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Login from '../../Auth/Login';
import Auth from '../../Auth/Auth';
import logoImage from '../../img/carmel.png';
import './dashboard.css';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Auth.isAuthenticated() === true ? <Component {...props} /> : <Redirect to='/login' />
    )} />
)

// class NavHeaderComponent extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <ul className="nav d-flex flex-row-reverse">
//                 <a className="nav-linker" onClick={this.props.logout} href="#"> <i className="fas fa-sign-in-alt" /> Log out</a>
//                 <Link to="/dashboard/user" style={{ textDecoration: 'none' }}>
//                 <a className="nav-linker" href="#"><i className="fas fa-user-tie" /> Admin</a>
//                 </Link>
//             </ul>
//         );
//     }
// }

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <SideBar />
                        <div className="theme-option">
                            <button tavindex="0" className="theme-button" type="button"> <i className="fas fa-cog fa-2x"></i> </button>
                        </div>

                        {/* THIS IS WHERE THE MAIN CONTACT IS  */}
                        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                            <Breadcrumbs />
                            <PrivateRoute exact path="/dashboard" component={DefaultTables} />
                            <PrivateRoute exact path="/dashboard/table/:modelName" component={MatchTableToRoute} />
                            <PrivateRoute exact path="/dashboard/user" component={User} />
                        </main>
                        {/* THE END OF THE MAIN CONTANT */}
                    </div>
                </div>
            </div>
        );
    }
}


//MATCH THE ROUTES
class MatchTableToRoute extends Component {
    render() {
        let modelName = this.props.match.params.modelName;
       
        //NAME LOWER CHANGES ThisWord to this_word. 
        let namelower = (modelName.charAt(0).toLowerCase() + modelName.slice(1)).replace(/([A-Z])/, "_$&").toLowerCase();
        return (
            <Grid modelMeta={'/api/meta/' + namelower} modelApi={'/api/' + modelName} useShortFieldsSyntax={true} navHeader={this.updateNav} />
        );
    }
}

//THIS IS WHERE THE CARMEL6000LOGO, ADMIN AND LOGIN IS. 
// class NavBar extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             navHeader: Auth.isAuthenticated() === true ? true : false,
//         }

//     }

//     updateNav = () => {
//         this.setState({ navHeader: true })
//     }

//     // Calling Auth.logout -> clears cache and returns back. hitting route login
//     logOut = () => {
//         Auth.logout();
//         this.setState({ navHeader: false });
//     }
//     render() {
//         let navHeader = this.state.navHeader === true ? <NavHeaderComponent logout={this.logOut} /> : "";
//         return (
//             <nav className="navbar navbar-dark fixed-top shadow navbar-admin">
//                 <div className="d-flex flex-row">
//                     <img src={logoImage} className="App-logo" />
//                     <a className="brand p-2" href="/dashoboard">Carmel6000</a>
//                 </div>
//                 {navHeader}

//             </nav>


//         );
//     }
// }

//SIDEBAR  - CONTAIN ALL THE LINKS AND STUFF 
class SideBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            TableList: []
        }

    }
    componentDidMount() {
        let url = '/api/get-models-list';
        Auth.authFetch(url)
        .then(response => { return response.json() }).then(res => {
                
                this.setState({ TableList: res });
            });
    }

    render() {
        return (
            <nav id="sidebar" className="col-md-2 d-none d-md-block bg-light sidebar">
                <div id="sidebarText" className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">
                                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                                    Dashboard <span className="sr-only">(current)</span>
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link dropdown-toggle" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">
                              <i className="fas fa-table" /> Tables
                         </a>
                            <div className="collapse multi-collapse" id="multiCollapseExample1">
                                <div className="nav-item">
                                    {
                                        this.state.TableList.map((modelName) => {
                                            return (
                                                <a href={"/dashboard/table/" + modelName} className="nav-link">
                                                    <i className="fas fa-arrow-right" /> {modelName}
                                                </a>
                                            );
                                        }

                                        )
                                    }
                                </div>
                            </div>

                        </li>
                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Projects</span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                <i className="fas fa-flask" />  Labrador
                        </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                <i className="fas fa-question" /> Kedai Li
                        </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <span data-feather="file-text"></span>
                                <i className="fas fa-utensils" />   Roiki
                    </a>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}


//THE TEXT RIGHT TO THE SIDEBAR 
class Breadcrumbs extends Component {
    render() {
        return (   
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Main Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary">Share</button>
                        <button className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
               </button>
                </div>
            </div>


        );
    }
}


//USER PAGE 
class User extends Component {
    render() {
        return (
            <div>
                <p> Welcome, USER!</p>
            </div>
        );
    }
}

class DefaultTables extends Component {
    render() {
        return (
            <div className="row justify-content-around">


                <div className="color col-lg-4 col-sm-6 col-12">
                    <div className="mb-2 d-flex">
                        <h3 className="mb-0 mr-auto"><span>Current Projects List</span></h3>
                    </div>
                    <div className="table-responsive-material">
                        <table className="default-table table table-sm remove-table-border table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col" className="text-center">Date</th>
                                    <th scope="col" className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Jambo Admin</h4>
                                    </td>
                                    <td className="text-center p-1">Oct 21</td>
                                    <td className="text-center"><span className="badge badge-warning">IDK</span></td>
                                </tr>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Chatbull</h4>
                                    </td>
                                    <td className="text-center p-1">Oct 22</td>
                                    <td className="text-center"><span className="badge badge-warning">IDK</span></td>
                                </tr>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Mouldifi</h4>
                                    </td>
                                    <td className="text-center p-1">Nov 12</td>
                                    <td className="text-center"><span className="badge badge-warning">IDK</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className=" color col-lg-4 col-sm-6 col-12">
                    <div className="mb-3 d-flex">
                        <h3 className="mb-0 mr-auto"><span>Current Projects List</span></h3>
                    </div>
                    <div className="table-responsive-material">
                        <table className="default-table table table-sm remove-table-border table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col" className="text-center">Date</th>
                                    <th scope="col" className="text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Jambo Admin</h4>
                                    </td>
                                    <td className="text-center p-1">Oct 21</td>
                                    <td className="text-center"><span className="badge badge-danger">FAILED</span></td>
                                </tr>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Chatbull</h4>
                                    </td>
                                    <td className="text-center p-1">Oct 22</td>
                                    <td className="text-center"><span className="badge badge-danger">FAILED</span></td>
                                </tr>
                                <tr tabIndex="-1">
                                    <td className="max-width-100">
                                        <h4 className="text-truncate mb-0">Mouldifi</h4>
                                    </td>
                                    <td className="text-center p-1">Nov 12</td>
                                    <td className="text-center"><span className="badge badge-danger">FAILED</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}



export default Dashboard
