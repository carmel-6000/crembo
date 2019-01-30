

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PrivateRoute from '../../App'
import './crembo.css';


class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
<div class="font-responsive"> 
                 <div class="jumbotron center">
                 <svg class="img-thumbnail bd-placeholder-img rounded-circle" width="200" height="200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 140x140"><title>Placeholder</title><rect fill="#777" width="100%" height="100%"></rect><text fill="#777" dy=".3em" x="50%" y="50%">140x140</text></svg>

                <h1 class="display-3">ברוך הבא, משתמש!</h1>
                <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr class="my-4"/>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a class="btn secondary btn-lg" href="#" role="button">Learn more</a>
                </div>
  </div>
                );
            }
        }
        
        
        
        export default Home
