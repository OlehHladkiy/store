import React, { Component } from 'react'
import { connect } from 'react-redux';
import { register } from '../../action/user_actions';

import FormField from '../../services/formField';
import {update, generateData, formIsValid} from '../../services/formAction';
import Dialog from '@material-ui/core/Dialog';

import './index.css';

class Register extends Component {

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
                validatationMessage: '',
                touched: false,
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
                validationMessage: '',
                touched: false,
                showLabel: true
            },
            confirmPassword: {
                element: 'input',
                value: '',
                key: 'confirmPassword',
                config: {
                    name: 'confirm-password-input',
                    type: 'password',
                    placeholder: 'Confirm your password',
                    label: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            name: {
                element: 'input',
                value: '',
                key: 'name',
                config: {
                    type: 'text',
                    name: 'name-input',
                    placeholder: 'Enter your name',
                    label: 'Name',
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                touched: false,
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                key: 'lastname',
                config: {
                    type: 'text',
                    name: 'lastname-input',
                    placeholder: 'Enter your lastname',
                    label: 'Lastname',
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                touched: false,
                showLabel: true
            },
            phone: {
                element: 'phone',
                value: '',
                key: 'phone',
                config: {
                    type: 'phone',
                    name: 'phone-input',
                    placeholder: '+380(__)-___-__-__',
                    label: 'Phone (Example: +380(93)-0621-46-21)',
                },
                validation: {
                    required: false
                },
                showLabel: true
            }
        }
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);
        let validForm = formIsValid(this.state.formData);

        if(validForm){
            this.props.register(dataToSubmit);         
        } else {
            this.setState({
                formError: true
            })
        }
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
            if(nextProps.registerSuccess === true){
                this.setState({formSuccess: true});
                this.formSuccess();
            } else {
                this.setState({formError: true});
            }
        }
    }

    formSuccess = () => {
        setTimeout(() => {
            this.setState({
                formSuccess: false
            })
            this.props.history.push('/login');
        }, 3000);
    }

    render() {
        return (
            <div className="register">
                <div className="register-container">
                    <form className="register-form" onSubmit={(event) => this.onSubmit(event)}>
                            <h2>Personal Information</h2>
                            <FormField formData={this.state.formData.email} change={(element) => this.updateForm(element)}/>    
                            <FormField formData={this.state.formData.name} change={(element) => this.updateForm(element)}/>
                            <FormField formData={this.state.formData.lastname} change={(element) => this.updateForm(element)}/>
                            <FormField formData={this.state.formData.phone} change={(element) => this.updateForm(element)}/>
                            <h2>Confirm Password</h2>
                            <FormField formData={this.state.formData.password} change={(element) => this.updateForm(element)}/>
                            <FormField formData={this.state.formData.confirmPassword} change={(element) => this.updateForm(element)}/>
                            {
                                this.state.formSuccess ?
                                    <div className="success">
                                        Success
                                    </div>
                                : <button type="submit" className="button" onClick={(event) => this.onSubmit(event)}>
                                    Register
                                  </button>
                            }
                            {
                                this.state.formError ? 
                                    <div className='error-message'>
                                        {this.props.errorMessage ? this.props.errorMessage : 'wrong data!'}
                                    </div>
                                : null
                            }
                    </form>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <h2>Congratulations</h2>
                    <p>
                        You will redirect to login page a couple second.
                    </p>    
                </Dialog>    
            </div>   
        )
    }
}

const mapStateToProps = (state) => ({
    registerSuccess: state.user.registerSuccess,
    errorMessage: state.user.errorMessage,
    isFetching: state.user.isFetchingRegister
})

export default connect(mapStateToProps, { register })(Register);