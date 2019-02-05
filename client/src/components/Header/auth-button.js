import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class AuthButton extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickMenuItem = event => {
        let adress = event.currentTarget.innerText.toLowerCase().split(' ').join('_');
        if(adress.trim() === 'logout'){
            this.props.logout();
        }

        this.props.history.push(`/user/${adress.trim()}`);    
        this.handleClose();
    }

    redirectToLogin = () => {
        this.props.history.push('/login');
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isFetching !== nextProps.isFetching){
            if(nextProps.successLogout){
                nextProps.history.push('/');
            }
        }
    }

    render() {
        const {anchorEl} = this.state;
        const {userData} = this.props;
        let isAuth = userData.isAuth;
        
        return (
            <div>
                <div className="header--auth header-btn" onClick={isAuth ? this.handleClick : this.redirectToLogin}>
                    <FontAwesomeIcon icon={this.props.icon} className="header--icon user-icon"/>
                        {
                            !isAuth ?
                                "Login"
                            : userData.name
                        }
                </div>
                {
                    isAuth ?
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleClickMenuItem}>Dashboard</MenuItem>
                            <MenuItem onClick={this.handleClickMenuItem}>Logout</MenuItem>
                        </Menu>
                    : null
                }
            </div>
        )
    }
}

export default AuthButton;