import React from 'react';
import {Col, FormGroup, Label} from 'reactstrap';
import RadioAnswer from './RadioAnswer';


const RadioAnswers = ({questionId, question, required, answers, selectedAnswer, inline}) => {
    return (
        <FormGroup className="bg-warning" row>
            <Label for={questionId} sm={4}>{question} {required ? null : <p>(optional)</p>}</Label>
            <Col sm={8}>
            {answers.map((answer, i) => <RadioAnswer selected={answer===selectedAnswer} inline={inline} name={questionId} answer={answer} key={questionId + "-" + i}/>)}
            </Col>
        </FormGroup>
    )
};

export default RadioAnswers
