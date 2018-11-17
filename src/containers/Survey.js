import React, {Component} from 'react';


import Page from '../containers/Page'
import {Container, Progress} from 'reactstrap';
import update from "immutability-helper/index";


export default class Survey extends Component {
    constructor(props) {
        super(props);

        // TODO - load questions from API based on surveyId (so we can version them
        // TODO - load answers if we have any saved

        this.json = {
            pages: [
                {
                    pageId: "p1",
                    title: "Information Governance - page 1",
                    description: "This is some help text",
                    questions: [
                        {
                            questionId: "p1q1",
                            type: "radio",
                            question: "Do you store your users data securely?",
                            answers: ["yes", "partly", "slightly", "no"]
                        },
                        {
                            questionId: "p1q2",
                            type: "textarea",
                            question: "Fill in some text",
                        },
                    ]
                },
                {
                    pageId: "p2",
                    title: "Page 2",
                    description: "This is page 2",
                    questions: [
                        {
                            questionId: "p2q1",
                            type: "textarea",
                            question: "Fill in some text",
                        },
                    ]
                },
                {
                    pageId: "p3",
                    title: "Page 3",
                    description: "This is page 3",
                    questions: [
                        {
                            questionId: "p3q1",
                            type: "textarea",
                            question: "Final page, whats your thoughts?",
                        },
                    ]
                }
            ]
        };

        // load answers from db or generate empty answers to passthrough

        /*
        Generate answers state for all questions

         */

        const a = this.emptyAnswersForPages(this.json.pages);

        this.state = {
            currentPage: 0,
            answers: a
        };
    }

    emptyAnswersForPages = pages => {
        let emptyAnswersForEachPage = {};
        pages.forEach((page) => {
            const answers = this.emptyStateValuesForAnswers(page.questions);
            emptyAnswersForEachPage[page.pageId] = answers;
        });
        return emptyAnswersForEachPage;
    };


    // Generate answers for current question
    emptyStateValuesForAnswers = questions => {
        let answers = {};
        questions.forEach((question) => {
            answers[question.questionId] = "";
        });

        return answers;
    };

    quitPage = event => {
        console.log("Quit page pressed");

        console.log(event);
        //this.setState({currentPage: 0});
    };

    previousPage = answersSubmitted => {
        console.log("Prev page pressed");
        this.saveSubmittedAnswers(answersSubmitted);


        let pageNumber = this.state.currentPage - 1;
        this.setState({currentPage: pageNumber});
    };

    nextPage = answersSubmitted => {
        console.log("Next page pressed");
        this.saveSubmittedAnswers(answersSubmitted);

        let pageNumber = this.state.currentPage + 1;
        console.log(answersSubmitted);
        this.setState({currentPage: pageNumber});
    };


    saveSubmittedAnswers = answersSubmitted => {
        console.log(answersSubmitted);

        const updatedAnswers = update(this.state.answers, {[answersSubmitted.pageId]: {$set: answersSubmitted.answers}});
        this.setState({answers: updatedAnswers});
    };

    render() {

        const totalPages = this.json.pages.length;
        const currentPage = this.state.currentPage;

        let prevPageFunction = currentPage - 1 >= 0 ? this.previousPage : null;
        let nextPageFunction = currentPage + 1 < totalPages ? this.nextPage : null;
        let quitPageFunction = currentPage + 1 >= totalPages ? this.quitPage : null;


        let pageData = this.json.pages[currentPage];
        let answers = this.state.answers[pageData.pageId];

        console.log("Current page is ", currentPage);
        console.log("Using answers : ",answers);

        return (
            <Container>
                <Page key={pageData.pageId} answers={answers} pageData={pageData}
                      previous={prevPageFunction}
                      next={nextPageFunction}
                      quit={quitPageFunction}/>

                <Progress value={((currentPage+1)/totalPages * 100)}>Page {currentPage+1}</Progress>
            </Container>
        );
    }
}