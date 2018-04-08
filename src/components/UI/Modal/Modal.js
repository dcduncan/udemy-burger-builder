import React from 'react';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

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
        <Aux>
            <Backdrop show={props.show} onClick={props.modalClosed}/>
            <div
                className={classes.Modal}
                style={style}
            >
                {props.children}
            </div>
        </Aux>
    );
};

export default modal;