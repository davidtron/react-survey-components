import React from 'react';
import {Col, FormGroup, Input, Label} from 'reactstrap';

const TextBoxAnswer = ({questionId, question, answer, ...props}) => {
    return (
        <FormGroup className="bg-warning py-sm-1" row>
            <Label for={questionId} sm={4}>{question}</Label>
            <Col sm={8}>
            <Input className="mb-2 mb-sm-0" type="text" name={questionId} id={questionId} defaultValue={answer}/>
            </Col>
        </FormGroup>
    )
};

export default TextBoxAnswer