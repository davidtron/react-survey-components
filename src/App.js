import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Survey from "./containers/Survey";

export default class App extends Component {
    constructor(props) {
        super(props);

        // TODO - load questions from API based on surveyId (so we can version them
        // TODO - load answers if we have any saved


    }

    render() {
        return (
            <Survey/>
        );
    }
}

