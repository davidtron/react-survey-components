import React from 'react';
import {Col, FormGroup, Input, Label} from 'reactstrap';

const TextAnswer = ({questionId, question, answer, ...props}) => {
    return (
        <FormGroup className="bg-warning" row>
            <Label for={questionId} sm={4}>{question}</Label>
            <Col sm={8}>
            <Input type="textarea" name={questionId} id={questionId} defaultValue={answer}/>
            </Col>
        </FormGroup>
    )
};

export default TextAnswer