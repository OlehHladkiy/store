import React, {Component} from 'react';
import {update, populateOptionFields, generateData, formIsValid, resetFields} from '../../services/formAction';
import CartArticlePresentational from './cartArticlePresentational';

class CartArticle extends Component {
    state = {
        formSuccess: false,
        formError: false,
        price: 0,
        formData: {
            tastes: {
                element: 'select',
                value: '',
                key: 'tastes',
                config: {
                    label: 'Tastes',
                    name: 'tastes-select',
                    options: []
                },
                validation: {
                    required: true,
                    defaultFirstValue: true
                },
                valid: false,
                showLabel: true
            },
            packingAndPrice: {
                element: 'select',
                value: '',
                key: 'packingAndPrice',
                config: {
                    label: 'Packing and price',
                    name: 'packing-select',
                    options: []
                },
                validation: {
                    required: true,
                    defaultFirstValue: true
                },
                valid: false,
                showLabel: true
            },
            quantity: {
                element: 'input',
                value: 1,
                key: 'quantity',
                config: {
                    type: 'number',
                    name: 'quantity-input',
                    label: 'Quantity',
                    min: '1'
                },
                validation: {
                    required: true
                },
                valid: false,
                showLabel: false
            }
        }
    }

    updateForm = (element) => {
        let newFormData = update(element, this.state.formData);

        this.changePrice(newFormData);
        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    componentDidMount(){
        let newFormData = {};
        const formDataWithNewTaste = populateOptionFields(this.state.formData, this.props.article.tastes, 'tastes');
        formDataWithNewTaste.tastes.value = this.props.selectedParameters.tastes;

        const formDataWithNewPacking = populateOptionFields(this.state.formData, this.props.article.packingAndPrice, 'packingAndPrice');
        formDataWithNewPacking.packingAndPrice.value = this.props.selectedParameters.packingAndPrice;
        
        newFormData = {...formDataWithNewTaste, ...formDataWithNewPacking};
        
        this.changePrice(newFormData);
        this.setState({
            formData: newFormData
        })
    }

    changePrice = (newFormData) => {
        let price = this.findPrice(newFormData);
        this.props.pushTotalValues({_id: this.props.article._id, price: price * +newFormData.quantity.value});
        this.setState({
            price
        })
    } 

    findPrice = (formData) => {
        let packingAndPrice = formData.packingAndPrice.config.options;
        let packingValue = formData.packingAndPrice.value;
        let findPacking = packingAndPrice.find((item) => packingValue === item.key);
        
        return findPacking.price;
    }

    render(){
        return (
            <CartArticlePresentational
                {...this.props}
                formData={this.state.formData}
                updateForm={this.updateForm}
                price={this.state.price}
            />
        )
    }
}

export default CartArticle;
