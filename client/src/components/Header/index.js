import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faShoppingCart from "@fortawesome/fontawesome-free-solid/faShoppingCart";
import faUserAlt from "@fortawesome/fontawesome-free-solid/faUserAlt";

import UserButton from "./userButton";
import { logout } from "../../action/user_actions";
import { openCartDialog } from "../../action/dialogs_actions";
import { handleCalculateCartItems } from "../../action/cart_actions";
import "./index.css";

class Header extends Component {
  state = {
    cartLen: 0
  };

  clickToLogo = () => {
    this.props.history.push("/");
  };

  openCart = () => {
    this.props.openCartDialog();
  };

  componentDidMount() {
    this.props.handleCalculateCartItems();
  }

  render() {
    return (
      <header className="header">
        <div className="header--logo" onClick={this.clickToLogo}>
          Sport Nutrition
        </div>

        {this.props.userData ? (
          <div className="header--container">
            <div className="header--basket header-btn" onClick={this.openCart}>
              <sup className="cart-length">{this.props.cartLength}</sup>
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="header--icon basket-icon"
              />
              Cart
            </div>
            <UserButton {...this.props} icon={faUserAlt} />
          </div>
        ) : (
          <div className="header--container">
            <div className="header--basket header-btn" />
            <div className="header--basket header-btn" />
          </div>
        )}
      </header>
    );
  }
}

const mapDispatchToProps = state => ({
  userData: state.user.userData,
  isFetching: state.user.isFetchingLogout,
  successLogout: state.user.successLogout,
  cartLength: state.cart.cartLength
});

export default connect(
  mapDispatchToProps,
  { logout, openCartDialog, handleCalculateCartItems }
)(withRouter(Header));
