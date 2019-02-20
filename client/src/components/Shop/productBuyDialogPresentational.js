import React from 'react';
import FormField from '../../services/formField';
import { Dialog } from '@material-ui/core';
import {formIsValid} from '../../services/formAction';


const ProductBuyDialogPresentational = (props) => {
    const {updateForm, onSubmit, formError, renderPrice, formData} = props;
    return (
        props.article ? 
            <Dialog open={props.openDialogStatus} onClose={props.closeBuyDialog}>
                <div className="buy-dialog">
                    <div className="dialog-header">
                        <span className="dialog-header-name">{props.article.name}</span>
                        <div className="close-icon">
                            <span className="close-icon-text" onClick={() => props.closeBuyDialog()}>x</span>
                        </div>
                    </div>
                    <div className="dialog-content">
                        <div className="dialog-image-section">
                            <div style={{
                                width: "100px", 
                                height: "100%", 
                                background: `url(${props.article.images[0].url}) center no-repeat`,
                                backgroundSize: "80%"    
                            }}>
                            </div>
                            <div className="dialog-article-info">
                                Brand: {props.article.brand.name}<br/>
                                Category: {props.article.category.name}
                            </div>
                        </div>
                        <form className="" onSubmit={(event) => onSubmit(event)}>
                            <FormField formData={formData.tastes} change={updateForm}/>
                            <FormField formData={formData.packingAndPrice} change={updateForm}/>
                            <button type="submit" disabled={!formIsValid(formData)} className="button" onClick={(event) => onSubmit(event)}>
                                Add to Card
                            </button>
                            {
                                formError ? 
                                    <div className='error-message'>
                                        {props.errorMessageAddProduct ? props.errorMessageAddProduct : 'wrong data!'}
                                    </div>
                                : null
                            }
                        </form>
                        <div className="dialog-price-container">
                            {renderPrice()}
                        </div>
                    </div>
                </div>
            </Dialog>
        : null
    );
}

export default ProductBuyDialogPresentational;
