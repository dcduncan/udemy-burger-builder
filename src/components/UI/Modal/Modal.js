import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component {

    componentShouldUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        const style = this.props.show
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
                <Backdrop show={this.props.show} onClick={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={style}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;