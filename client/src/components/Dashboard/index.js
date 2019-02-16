import React, { Component } from 'react';
import FormField from '../../services/formField';
import {update, generateData, formIsValid, populateFields} from '../../services/formAction';
import UserLayout from '../../hoc/userLayout';

import { connect } from 'react-redux';
import {updateProfile} from '../../action/user_actions';

import './index.css';

class Dashboard extends Component {
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
                touched: false,
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
                    label: 'Phone',
                },
                validation: {
                    required: false
                },
                showLabel: true
            }
        },
        edit: false
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);
        let validForm = formIsValid(this.state.formData);

        if(validForm){
            this.props.updateProfile(dataToSubmit);
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

    componentDidMount(){
        const newFormData = populateFields(this.state.formData, this.props.userData);

        this.setState({
            formData: newFormData
        })
    }

    onToggleEdit(){
        this.setState(state => ({
            edit: !state.edit
        }))
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.isFetchingUpdateProfile === false){
                if(nextProps.updateSuccess){
                    this.setState({
                        formSuccess: true
                    })
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        })
                    }, 3000);
                    this.onToggleEdit();
                }
            }
        }
    }

    render(){
        return (
            <UserLayout {...this.props}>
                    <div className="info-container">
                        <h2>User Information</h2>
                        <form className="form" onSubmit={(event) => this.onSubmit(event)}>
                            <FormField 
                                readOnly={!this.state.edit} 
                                classNameChildElem={!this.state.edit ? "unactive" : null} 
                                formData={this.state.formData.email} 
                                change={(element) => this.updateForm(element)}/>
                            <FormField 
                                readOnly={!this.state.edit} 
                                classNameChildElem={!this.state.edit ? "unactive" : null} 
                                formData={this.state.formData.name} 
                                change={(element) => this.updateForm(element)}/>
                            <FormField 
                                readOnly={!this.state.edit} 
                                classNameChildElem={!this.state.edit ? "unactive" : null} 
                                formData={this.state.formData.lastname} 
                                change={(element) => this.updateForm(element)}/>
                            <FormField 
                                readOnly={!this.state.edit} 
                                classNameChildElem={!this.state.edit ? "unactive" : null} 
                                formData={this.state.formData.phone}
                                change={(element) => this.updateForm(element)}/>
                            {
                                !this.state.edit ? 
                                    <button type="button" className="button" onClick={(event) => { event.preventDefault(); this.onToggleEdit() }}>Edit</button>
                                : <button type="submit" className="button" disabled={!formIsValid(this.state.formData)} onClick={(event) => this.onSubmit(event)}>Save</button>
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
                    <div className="info-container">
                        <h2>History Purchases</h2>
                    </div>
            </UserLayout>
        );
    }
}

const mapDispatchToProps = (state) => ({
    updateSuccess: state.user.updateSuccess,
    errorMessage: state.user.errorMessage,
    isFetchingUpdateProfile: state.user.isFetchingUpdateProfile
})

export default connect(mapDispatchToProps, {updateProfile})(Dashboard);