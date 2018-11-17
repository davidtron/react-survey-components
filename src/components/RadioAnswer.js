import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';


const RadioAnswer = ({answer, name, inline, selected, ...props}) => {
    return (
        <FormGroup className="" check inline={inline}>
            <Label for={name} check className="col-form-label">
                <Input type="radio" name={name} defaultChecked={selected} value={answer} key={name} />{' '}
                {answer}
            </Label>
        </FormGroup>
    )
};

export default RadioAnswer