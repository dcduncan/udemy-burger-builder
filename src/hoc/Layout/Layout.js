import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    };

    sideDrawerToggleHandler = () => {
        this.setState((previousState) => {
            return {
                showSideDrawer: !previousState.showSideDrawer
            }
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar open={this.sideDrawerToggleHandler}/>
                <SideDrawer isOpen={this.state.showSideDrawer} close={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;