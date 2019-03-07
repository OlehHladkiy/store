import React, { Component } from 'react';
import { connect } from 'react-redux';
import {closeCartDialog} from '../../action/dialogs_actions';
import {getCartData, deleteFromCart, getCartItemsById} from '../../action/cart_actions';
import CartArticle from './cartArticle';
import CartPresentational from './cartPresentational';

class Cart extends Component {
    state = {
        totalValues: {},
        total: 0
    }

    closeDialog = () => {
        this.props.closeCartDialog();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.open !== nextProps.open){
            if(nextProps.open === true){
                // this.props.getCartData();
                this.props.getCartItemsById();
            } 
        }
    }

    deleteArticleFromCart = (id) => {
        this.props.deleteFromCart(id);
        let newTotalValues = {...this.state.totalValues};
        delete newTotalValues[id];

        this.setState({
            totalValues: newTotalValues
        }, () => {
            this.calculateTotal();
            this.props.getCartItemsById();
        })
    }

    renderArticles = () => (
        this.props.cartArticles && this.props.cartArticles.length !== 0 ?
            this.props.cartArticles.map(item => (
                <CartArticle 
                    {...item}
                    deleteFromCart={() => this.deleteArticleFromCart(item.article._id)}
                    pushTotalValues={this.pushTotalValues} 
                    key={item.article._id} 
                />
            ))
        : <div style={{display: "flex", alignItems: "center", justifyContent: "Center", height: "200px", fontSize: "40px"}}>
            Your cart is empty
          </div>
    )

    pushTotalValues = (item) => {
        let obj = {[item._id]: item.price};
    
        this.setState((state) => ({
            totalValues: {...state.totalValues, ...obj}
        }), this.calculateTotal)
    }

    calculateTotal = () => {
        let sum = 0;
        const {totalValues} = this.state;

        for(let key in totalValues){
            sum += +totalValues[key];
        }
        
        this.setState({
            total: sum
        })
    }

    render() {
        return (
            <CartPresentational
                {...this.props}
                closeDialog={this.closeDialog}
                renderArticles={this.renderArticles}
                total={this.state.total}
                length={this.props.cartArticles ? this.props.cartArticles.length : 0}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogs.openCartDialogStatus,
    cartArticles: state.cart.cartArticles
})

export default connect(mapStateToProps, { closeCartDialog, getCartData, deleteFromCart, getCartItemsById })(Cart);