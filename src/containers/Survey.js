import React, {Component} from 'react';


import Page from '../containers/Page'
import {Container, Progress} from 'reactstrap';
import update from "immutability-helper/index";


export default class Survey extends Component {
    constructor(props) {
        super(props);

        this.json = {
            auditId: "auditNumber1",
            pages: [
                {
                    pageId: "p1",
                    title: "2018",
                    description: "This is the description",
                    questions: [
                        {
                            questionId: "p1q1",
                            type: "text",
                            question: "Test",
                            required: true
                        },
                        {
                            questionId: "p1q2",
                            type: "textarea",
                            question: "Test area",
                        },
                    ]
                },
                {
                    pageId: "p2",
                    title: "Information Governance",
                    description: "This is some help text",
                    questions: [
                        {
                            questionId: "p2q1",
                            type: "radio",
                            question: "Do you store your users' data securely either on your systems or in the cloud?",
                            answers: ["yes", "partly", "slightly", "no"],
                            required: true
                        },
                        {
                            questionId: "p2q2",
                            type: "textarea",
                            question: "Notes",
                        },
                        {
                            questionId: "p2q3",
                            type: "select",
                            question: "Are these the droids you are looking for?",
                            answers: ["yes", "partly", "slightly", "no"],
                            required: true
                        }
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
                            required: true
                        },
                    ]
                }
            ]
        };

        // load answers from db or generate empty answers to passthrough
        const answers = this.emptyAnswersForPages(this.json.pages);

        this.state = {
            currentPage: 0,
            answers: answers
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

    quitPage = answersSubmitted => {
        console.log("Complete page pressed");
        this.saveSubmittedAnswers(answersSubmitted);
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

        // console.log("Current page is ", currentPage);
        // console.log("Using answers : ",answers);

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