import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import {formIsValid} from '../../../services/formAction';
import FormField from '../../../services/formField';
import FileUpload from '../../../services/fileupload';
import UserLayout from '../../../hoc/userLayout';
import './index.css';

const AddProductPresentational = (props) => {
    const { onSubmit, updateForm, formData, formError, formSuccess, imagesHandler, deleteAtribute } = props;
    return (
        <UserLayout {...props}>
                <div className="add-product">
                    <div className="add-product-container">
                        <h2>Add product</h2>
                        <div className="add-product-form-container">
                            <form className="login-form" onSubmit={onSubmit}>
                                <FileUpload 
                                    imagesHandler={(images) => imagesHandler(images)}
                                    reset={formSuccess}
                                />
                                <FormField formData={formData.name} change={updateForm}/>    
                                <FormField formData={formData.description} change={updateForm}/>
                                <FormField formData={formData.category} change={updateForm}/>
                                <FormField formData={formData.brand} change={updateForm}/>
                                {   
                                    formData.tastes.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                formData.tastes.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.name}
                                                        <FontAwesomeIcon 
                                                            onClick={() => deleteAtribute(item._id, 'tastes')} 
                                                            icon={faPlus} 
                                                            className="icon-delete-atribute"
                                                        />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={formData.tastes} change={updateForm}/>
                                    <button 
                                        onClick={() => props.pushAtribute('tastes')} 
                                        disabled={formData.tastes.value === ''} 
                                        type="button" 
                                        className="plus-icon-button"
                                    >
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                                {   
                                    formData.packingAndPrice.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                formData.packingAndPrice.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.name} - {item.price}$
                                                        <FontAwesomeIcon onClick={() => deleteAtribute(item._id, 'packing')} icon={faPlus} className="icon-delete-atribute"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={formData.packingAndPrice} change={updateForm}/>
                                    <button onClick={props.handleDialogOpen} disabled={formData.packingAndPrice.value === ''} type="button" className="plus-icon-button"><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                                <FormField formData={formData.available} change={updateForm}/>
                                <button type="submit" disabled={!formIsValid(formData)} className="button" onClick={(event) => onSubmit(event)}>
                                    Add Product
                                </button>
                                {
                                    formError ? 
                                        <div className='error-message'>
                                            {props.errorMessageAddProduct ? props.errorMessageAddProduct : 'wrong data!'}
                                        </div>
                                    : null
                                }
                                {
                                    formSuccess ?
                                        <div className="success">
                                            Success
                                        </div>
                                    : null
                                }
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={props.openDialog} onClose={props.handleDialogClose}>
                    <span>Price for {formData.packingAndPrice.value}</span>
                    <DialogContent>
                        <FormField formData={formData.price} change={updateForm}/>
                    </DialogContent>
                    <div className="dialog-actions">
                        <button type="button" disabled={formData.price.value === ''} className="button" onClick={() => props.pushAtribute('packingAndPrice', true)}>
                            Ok 
                        </button>
                        <button type="button" className="button" onClick={props.handleDialogClose}>
                            Cancel
                        </button>
                    </div>
                </Dialog>
            </UserLayout>
    );
}

export default AddProductPresentational;
