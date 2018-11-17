import React from 'react';
import {Col, FormGroup, Label} from 'reactstrap';
import RadioAnswer from './RadioAnswer';


const RadioAnswers = ({questionId, question, answers, selectedAnswer, inline, ...props}) => {
    return (
        <FormGroup className="bg-warning" row>
            <Label for={questionId} sm={4}>{question}</Label>
            <Col sm={8}>
            {answers.map((answer, i) => <RadioAnswer selected={answer===selectedAnswer} inline={inline} name={questionId} answer={answer} key={questionId + "-" + i}/>)}
            </Col>
        </FormGroup>
    )
};

export default RadioAnswers
