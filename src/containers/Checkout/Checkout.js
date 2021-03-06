import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {
//    state = { **redux implementation
//        ingredients: null,
//        totalPrice: 0
//    }
    
//    componentWillMount() {  **redux implementation
//        const query = new URLSearchParams(this.props.location.search);
//        const ingredients = {};
//        let price = 0;
//        for (let param of query.entries()) {
//            if (param[0] === 'price') {
//                price = param[1];
//            } else {
//                ingredients[param[0]] = +param[1];
//            }
//        }
//        this.setState({
//            ingredients: ingredients,
//            totalPrice: price
//        });
//    }
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
//        changed this.state.ingredients to this.props.ings after the implementation of redux
//<Route path={this.props.match.url + '/contact-data'} ** copy of route before redux implementation
//                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
        let summary = <Redirect to="/"/>
        const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
        if ( this.props.ings ) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ings}/>
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData}/>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);