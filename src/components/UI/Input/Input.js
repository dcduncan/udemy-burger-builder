import React from 'react';

import classes from './Input.css';

function getInputElement(props) {

    const inputClasses = [classes.InputElement];
    if (!props.valid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    const classNames = inputClasses.join(' ');

    switch (props.elementType) {
        case ('input'):
            return <input
                className={classNames}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange}
            />;
        case ('textarea'):
            return <textarea
                className={classNames}
                {...props.elementConfig}
                value={props.value}
                onChange={props.onChange}
            />;
        case ('select'):
            return (
                <select
                    className={classNames}
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elementConfig.options.map((option) =>
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    )}
                </select>
            );
        default:
            throw new Error('unknow input type' + props.inputType);
    }
}

const input = (props) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Label} style={{textTransform: 'capitalize'}}></label>
            {getInputElement(props)}
        </div>
    );
};

export default input;