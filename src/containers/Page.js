import React, {Component} from 'react';

import RadioAnswers from '../components/RadioAnswers'
import TextAreaAnswer from '../components/TextAreaAnswer'
import TextBoxAnswer from '../components/TextBoxAnswer'
import {Button, Form, FormGroup, Container, ButtonGroup} from 'reactstrap';
import update from 'immutability-helper';
import Paragraphs from '../components/Paragraphs';


export default class Page extends Component {
    constructor(allprops) {
        super(allprops);

        const {pageData, answers, previous, next, quit, ...props} = allprops;
        this.pageData = pageData;

        this.previous = previous;
        this.next = next;
        this.quit = quit;

        console.log("Using answers ", answers);

        this.state = {
            answers: answers
        };
    }

    handleSubmit = async callbackWith => {
        const result = {
            pageId: this.pageData.pageId,
            answers: this.state.answers
        };

        callbackWith(result);
    };

    preventEnter = event => {
        event.preventDefault();
    };

    handleChange = async event => {
        const updatedAnswers = update(this.state.answers, {[event.target.name]: {$set: event.target.value}});
        this.setState({answers: updatedAnswers});
    };

    getQuestionFromId = (questionId) => {
        const matchedQuestions = this.pageData.questions.filter(question => question.questionId === questionId);
        if(matchedQuestions.length !== 1) {
            throw new Error("Could not find single question matching question id " + questionId + " from " + JSON.stringify(this.pageData));
        }

        return matchedQuestions[0];
    };

    unansweredQuestions = () => {
        // if any of the answers is empty then we return true
        let questionIds = Object.keys(this.state.answers);
        let unansweredQuestion = false;


        questionIds.forEach(questionId => {
            // Check if question needs answer

            const question = this.getQuestionFromId(questionId);
            if (question.required && this.state.answers[questionId] === "") {
                unansweredQuestion = true;
            }
        });

        return unansweredQuestion;
    };

    renderQuestions = questions => {
        return questions.map((question, i) => {
            if (question.type === 'radio') {
                return <RadioAnswers key={i} questionId={question.questionId} question={question.question}
                                     answers={question.answers} selectedAnswer={this.state.answers[question.questionId]}
                                     inline/>
            } else if (question.type === 'textarea') {
                return <TextAreaAnswer key={i} questionId={question.questionId} question={question.question}
                                   answer={this.state.answers[question.questionId]}/>
            } else if (question.type === 'text') {
                return <TextBoxAnswer key={i} questionId={question.questionId} question={question.question}
                                   answer={this.state.answers[question.questionId]}/>
            }
            return <div>no questions</div>
        });
    };

    render() {


        return (
            <Container>
                <h2>{this.pageData.title}</h2>
                <Paragraphs input={this.pageData.description} />
                <Form onSubmit={this.preventEnter} onChange={this.handleChange}>

                    {this.renderQuestions(this.pageData.questions)}

                    <FormGroup inline row>
                        <ButtonGroup sm={{offset: 0}}>

                            {this.previous !== null ?
                                <Button onClick={() => this.handleSubmit(this.previous)}>Previous</Button>
                                : null
                            }

                            {this.next !== null ?
                                <Button disabled={this.unansweredQuestions()}
                                        onClick={() => this.handleSubmit(this.next)}>Next</Button>
                                :
                                <Button disabled={this.unansweredQuestions()}
                                        onClick={() => this.handleSubmit(this.quit)}>Complete</Button>
                            }
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

