import React from 'react';

import classes from './Modal.css';

const modal = (props) => {
    const style = props.show
    ? {
        transform: 'translateY(0)',
        opacity: '1'
    }
    : {
        transform: 'translateY(-100vh)',
        opacity: '0'
    };

    return (
        <div
            className={classes.Modal}
            style={style}
        >
            {props.children}
        </div>
    );
};

export default modal;