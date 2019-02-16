import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faUserAlt from '@fortawesome/fontawesome-free-solid/faUserAlt';

import AuthButton from './auth-button';
import { logout } from '../../action/user_actions'; 
import './index.css';

class Header extends Component {
    render() {
        // if(!this.props.userData){
        //     return <CircularProgress color="secondary"/>
        // }
        return (
            <header className="header">
                <div className="header--logo" onClick={() => this.props.history.push('/')}>
                    Sport Nutrition
                </div>

                <div className="header--search">
                    <TextField
                        label="Search"
                        className="header--input"
                        variant="outlined"
                    />
                </div>
                { this.props.userData ?
                    <div className="header--container">
                        <div className="header--basket header-btn">
                            <sup className="cart-length">{this.props.userData.cart ? this.props.userData.cart.length : 0}</sup>
                            <FontAwesomeIcon icon={faShoppingCart} className="header--icon basket-icon"/>
                            Cart
                        </div>
                        <AuthButton {...this.props} icon={faUserAlt}/>
                    </div>
                :   <div className="header--container">
                        <div className="header--basket header-btn">
                        </div>
                        <div className="header--basket header-btn">
                        </div>
                    </div>
                }
            </header>
        )
    }
}

const mapDispatchToProps = (state) => ({
    userData: state.user.userData,
    isFetching: state.user.isFetchingLogout,
    successLogout: state.user.successLogout
})

export default connect(mapDispatchToProps, { logout })(withRouter(Header));
//#5489d9