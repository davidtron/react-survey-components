import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Survey from "./containers/Survey";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Survey/>
        );
    }
}

