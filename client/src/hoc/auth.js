import React, {Component} from 'react';
import {connect} from 'react-redux';
import { auth } from '../action/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';  

const Auth = (ChildComponent, reload, adminRoute = null) => {
    class AuthCheck extends Component {
        state = {
            loading: true
        }

        componentDidMount(){
            window.scrollTo(0, 0);
            this.props.auth();
        }    

        componentWillReceiveProps(nextProps){
            if(this.props.isFetchingAuth !== nextProps.isFetchingAuth){
                if(nextProps.isFetchingAuth === false){
                    this.setState({
                        loading: false
                    })
                    if(nextProps.userData){
                        if(!nextProps.userData.isAuth){
                            if(reload){
                                this.props.history.push('/login')
                            }
                        } else {
                            if(adminRoute && !nextProps.userData.isAdmin){
                                this.props.history.push('/user/dashboard')
                            } else {
                                if(reload === false){
                                    this.props.history.push('/user/dashboard')
                                }
                            }
                        }                
                    }
                }
            }
        }

        render(){
            if(this.state.loading){
                return ( 
                    <div className="loader">
                        <CircularProgress color="secondary"/>
                    </div>
                )
            }

            return <ChildComponent {...this.props}/>
        }
    }

    const mapStateToProps = (state) => ({
        isFetchingAuth: state.user.isFetchingAuth,
        userData: state.user.userData
    })

    return connect(mapStateToProps, {auth})(AuthCheck);
}

export default Auth;
