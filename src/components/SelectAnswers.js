import React from 'react';
import {Col, FormGroup, Label, Input} from 'reactstrap';


const SelectAnswers = ({questionId, question, required, answers, selectedAnswer}) => {
    return (
        <FormGroup className="bg-warning" row>
            <Label for={questionId} sm={4}>{question} {required ? null : <p>(optional)</p>}</Label>
            <Col sm={8}>
                <Input className="mb-2 mb-sm-0" type="select" name={questionId} id={questionId} defaultValue={selectedAnswer}>
                    {answers.map((answer, i) => <option key={questionId + "-" + i}>{answer}</option>)}
                </Input>
            </Col>
        </FormGroup>
    )
};

export default SelectAnswers
