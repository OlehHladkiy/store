import React from 'react';
import FormField from '../../services/formField';
import './cartArticle.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';

const cartArticlePresentational = (props) => {
    const { article, formData, updateForm, price, deleteFromCart } = props;
    return (
        <div className="cart-article">
            <div className="article-image-section" 
                style={{
                    background: `url(${article.images[0].url}) center no-repeat`,
                    backgroundSize: '40%'
                }}
                >
            </div>
            <div className="article-info-section">
                brand: {article.brand.name}<br/>
                category: {article.category.name}<br/>
                <span className="cart-article-price">price: {price}$</span>
            </div>
            <div className="article-select-section">
                <FormField formData={formData.tastes} change={updateForm}/>
                <FormField formData={formData.packingAndPrice} change={updateForm}/>
            </div>
            <div className="article-input-section">
                <div className="quantity-button">
                    <FontAwesomeIcon 
                        className="quantity-icon" 
                        icon={faMinus} 
                        onClick={() => props.changeQuantity('dec')}
                    />
                </div>
                <FormField readOnly={true} formData={formData.quantity} change={updateForm}/>
                <div className="quantity-button">
                    <FontAwesomeIcon 
                        className="quantity-icon" 
                        icon={faPlus}
                        onClick={() => props.changeQuantity('inc')}
                    />
                </div>
            </div>
            <div className="article-action-section">
                <FontAwesomeIcon className="action-icon" icon={faTrash} onClick={deleteFromCart}/>
            </div>
        </div>
    );
}

export default cartArticlePresentational;
