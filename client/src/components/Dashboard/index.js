import React, { Component } from 'react';
import {update, generateData, formIsValid, populateFields} from '../../services/formAction';

import { connect } from 'react-redux';
import {updateProfile} from '../../action/user_actions';
import DashboardPresentational from './dashboardPresentational';

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

    onSubmit = (event) => {
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

    updateForm = (element) => {
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

    onToggleEdit = () => {
        this.setState(state => ({
            edit: !state.edit
        }))
    }

    componentWillReceiveProps(nextProps){
        if(this.props.isFetchingUpdateProfile !== nextProps.isFetchingUpdateProfile){
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
            <DashboardPresentational
                {...this.props}
                updateForm={this.updateForm}
                onSubmit={this.onSubmit}
                formData={this.state.formData}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                loading={this.state.loading}
                edit={this.state.edit}
                onToggleEdit={this.onToggleEdit}
            />
        );
    }
}

const mapDispatchToProps = (state) => ({
    updateSuccess: state.user.updateSuccess,
    errorMessage: state.user.errorMessage,
    isFetchingUpdateProfile: state.user.isFetchingUpdateProfile
})

export default connect(mapDispatchToProps, {updateProfile})(Dashboard);