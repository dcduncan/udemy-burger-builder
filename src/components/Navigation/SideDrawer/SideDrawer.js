import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {

    const attachedClasses = [classes.SideDrawer];
    if (props.isOpen) {
        attachedClasses.push(classes.Open);
    } else {
        attachedClasses.push(classes.Close);
    }

    return (
        <Aux>
            <Backdrop show={props.isOpen} onClick={props.close}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;