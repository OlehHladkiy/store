import React from 'react';
import MyButton from '../../services/button';
import { Dialog } from '@material-ui/core';

const CartPresentational = (props) => {
    const { open, closeDialog, renderArticles, total, length } = props;
    return (
        <Dialog 
                open={open} 
                onClose={closeDialog} 
                fullScreen
        >
            <div className="cart-container">
                <div className="cart-header">
                    <div className="header-text">
                        Cart
                    </div>
                    <div onClick={closeDialog}>
                        Close
                    </div>
                </div>
                <div className="cart-content">
                    <div className="cart-articles-container">
                        {renderArticles()}
                    </div>
                </div>
                <div className="cart-footer">
                    <MyButton
                        type="button"
                        text="Shopping"
                        runAction={closeDialog}
                        className="cart-button"
                    />
                    {
                        length > 0 ? 
                            <div>
                                <div className="total-section">
                                    Total: {total.toFixed(2)}$
                                </div>
                                <div className="cart-button" onClick={closeDialog}>
                                    <MyButton
                                        text="Checkout"
                                        linkTo="/order"
                                        className="cart-link"
                                    />
                                </div>
                            </div>
                        : null 
                    }
                </div>
            </div>
        </Dialog>
    );
}

export default CartPresentational;
