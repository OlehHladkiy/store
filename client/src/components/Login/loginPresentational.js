import React from 'react';
import MyButton from '../../services/button';
import './index.css';
import FormField from '../../services/formField';
import {formIsValid} from '../../services/formAction';
import CircularProgress from '@material-ui/core/CircularProgress';  

const LoginPresentational = (props) => {
    const {formData, onSubmit, updateForm, formSuccess, formError, loading} = props;

    if(loading){
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
                        <FormField formData={formData.email} change={updateForm}/>    
                        <FormField formData={formData.password} change={updateForm}/>
                        <button type="submit" className="button" disabled={!formIsValid(formData)} onClick={(event) => onSubmit(event)}>
                            Login
                        </button>
                        {
                            formError ? 
                                <div className='error-message'>
                                    {props.errorMessage ? props.errorMessage : 'wrong data!'}
                                </div>
                            : null
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPresentational;
