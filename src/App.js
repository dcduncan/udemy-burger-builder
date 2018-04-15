import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
          <Switch>
              <Route path="/orders" component={Orders}/>
              <Route path="/checkout" component={Checkout}/>
              <Route component={BurgerBuilder}/>
          </Switch>
      </Layout>
    );
  }
}

export default App;
