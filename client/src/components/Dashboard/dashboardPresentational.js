import React from 'react';
import UserLayout from '../../hoc/userLayout';
import FormField from '../../services/formField';
import {formIsValid} from '../../services/formAction';

const DashboardPresentational = (props) => {
    const {formData, onSubmit, updateForm, formSuccess, formError, edit, onToggleEdit} = props;

    return (
        <UserLayout {...props}>
                    <div className="info-container">
                        <h2>User Information</h2>
                        <form className="form" onSubmit={(event) => onSubmit(event)}>
                            <FormField 
                                readOnly={!edit} 
                                classNameChildElem={!edit ? "unactive" : null} 
                                formData={formData.email} 
                                change={updateForm}/>
                            <FormField 
                                readOnly={!edit} 
                                classNameChildElem={!edit ? "unactive" : null} 
                                formData={formData.name} 
                                change={updateForm}/>
                            <FormField 
                                readOnly={!edit} 
                                classNameChildElem={!edit ? "unactive" : null} 
                                formData={formData.lastname} 
                                change={updateForm}/>
                            <FormField 
                                readOnly={!edit} 
                                classNameChildElem={!edit ? "unactive" : null} 
                                formData={formData.phone}
                                change={updateForm}/>
                            {
                                !edit ? 
                                    <button type="button" className="button" onClick={(event) => { event.preventDefault(); onToggleEdit() }}>Edit</button>
                                : <button type="submit" className="button" disabled={!formIsValid(formData)} onClick={(event) => onSubmit(event)}>Save</button>
                            }
                            {
                                formError ? 
                                    <div className='error-message'>
                                        {props.errorMessage ? props.errorMessage : 'wrong data!'}
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

export default DashboardPresentational;
