import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('orders.json')
            .then((response) => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false
                })
            })
    }

    getSpinnerOrOrders = () => {
        if (this.state.loading) {
            return <Spinner/>
        } else {
            return this.state.orders.map((order) =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            );
        }
    };

    render() {
        return (
           <div>
               {this.getSpinnerOrOrders()}
           </div>
        );
    }
}

export default withErrorHandler(Orders, axios);