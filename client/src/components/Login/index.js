import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login } from '../../action/user_actions';

import FormField from '../../services/formField';
import {update, generateData, formIsValid} from '../../services/formAction';
import CircularProgress from '@material-ui/core/CircularProgress';  
import MyButton from '../../services/button';
import './index.css';

class Login extends Component {
    state = {
        formSuccess: false,
        formError: false,
        formData: {
            email: {
                element: 'input',
                value: '',
                key: 'email',
                config: {
                    type: 'email',
                    name: 'email-input',
                    placeholder: 'Enter your email',
                    label: 'Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                showLabel: true
            },
            password: {
                element: 'input',
                value: '',
                key: 'password',
                config: {
                    type: 'password',
                    name: 'password-input',
                    placeholder: 'password',
                    label: 'Password',
                },
                validation: {
                    required: true
                },
                valid: false,
                showLabel: true
            }
        },
        loading: false
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);

        this.props.login(dataToSubmit);
        this.setState({
            loading: true
        })
    }

    updateForm(element){
        const newFormData = update(element, this.state.formData);

        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.isFetchingLogin === false){
                this.setState({
                    loading: false
                })

                if(nextProps.loginSuccess === false){
                    this.setState({formError: true});
                } else if(nextProps.loginSuccess === true) {
                    this.props.history.push('/user/dashboard');
                }
            }
        }
    }

    render() {
        if(this.state.loading){
            return (
                <div className="loader">
                    <CircularProgress color="secondary"/>
                </div>
            )
        }
        return (
            <div className="login">
                <div className="login-container">
                    <div className="new-customers">
                        <div className="customers-container">
                            <h2>New Customers</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ea iste modi optio praesentium quidem soluta voluptatem. Eaque iusto non officia provident quam quis rerum vel, vero voluptate voluptatem. Autem.
                            </p>
                            <MyButton
                                linkTo={'/register'}
                                text='Create new account'
                            />
                        </div>
                    </div>
                    <div className="from-container">
                        <form className="login-form" onSubmit={(event) => this.onSubmit(event)}>
                            <FormField formData={this.state.formData.email} change={(element) => this.updateForm(element)}/>    
                            <FormField formData={this.state.formData.password} change={(element) => this.updateForm(element)}/>
                            <button type="submit" className="button" disabled={!formIsValid(this.state.formData)} onClick={(event) => this.onSubmit(event)}>
                                Login
                            </button>
                            {
                                this.state.formError ? 
                                    <div className='error-message'>
                                        {this.props.errorMessage ? this.props.errorMessage : 'wrong data!'}
                                    </div>
                                : null
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginSuccess: state.user.loginSuccess,
    errorMessage: state.user.errorMessage,
    isFetchingLogin: state.user.isFetchingLogin
})

export default connect(mapStateToProps, { login })(Login);