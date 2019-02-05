import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';
import { connect } from 'react-redux';
import FormField from '../../../services/formField';
import FileUpload from '../../../services/fileupload';
import {update, generateData, formIsValid, resetFields, populateOptionFields} from '../../../services/formAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import {getBrands, getCategories} from '../../../action/categories_actions';
import {addProduct, addProductClear} from '../../../action/product_actions';

import './index.css';


class AddProduct extends Component {

    state = {
        formSuccess: false,
        formError: false,
        formData: {
            name: {
                element: 'input',
                value: '',
                key: 'name',
                config: {
                    label: 'Name',
                    type: 'text',
                    name: 'name-input',
                    placeholder: 'Enter name of product',
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validatationMessage: '',
                showLabel: true
            },
            description: {
                element: 'textArea',
                value: '',
                key: 'description',
                config: {
                    type: 'text',
                    name: 'description-textArea',
                    placeholder: 'Enter description...',
                    label: 'Description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validatationMessage: '',
                showLabel: true
            },
            price: {
                element: 'input',
                value: '',
                key: 'price',
                config: {
                    type: 'number',
                    name: 'price-input',
                    placeholder: 'Enter price',
                    label: 'Price',
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            category: {
                element: 'select',
                value: '',
                key: 'category',
                config: {
                    label: 'Category',
                    name: 'category-select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            brand: {
                element: 'select',
                value: '',
                key: 'brand',
                config: {
                    label: 'Brand',
                    name: 'brand-select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            tastes: {
                element: 'input',
                value: '',
                addedValues: [],
                key: 'tastes',
                config: {
                    type: 'text',
                    label: 'Tastes',
                    name: 'tastes-select',
                    placeholder: 'Enter tastes values',
                },
                validation: {
                    required: false,
                    withAtr: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            packing: {
                element: 'input',
                value: '',
                addedValues: [],
                key: 'packing',
                config: {
                    text: 'text',
                    label: 'Packing',
                    name: 'packing-select',
                    placeholder: 'Enter packing values',
                },
                validation: {
                    required: false,
                    withAtr: true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            available: {
                element: 'select',
                value: '',
                key: 'available',
                config: {
                    label: 'Available',
                    name: 'packing-select',
                    options: [{key: true, value: "Yes"}, {key: false, value: "No"}]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            images: {
                value: [],
                validation: {
                    require: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: false
            }
        }
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);
        let validForm = formIsValid(this.state.formData);

        if(validForm){
            this.props.addProduct(dataToSubmit);
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

    pushAtribute = (type) => {
        const newFormData = {...this.state.formData};
        if(newFormData[type].value !== ''){
            const addedValuesCopy = [...newFormData[type].addedValues, {_id: +new Date, value: newFormData[type].value}];
            newFormData[type].value = '';
            newFormData[type].addedValues = addedValuesCopy;

            this.setState({
                formData: newFormData
            })
        }
    }

    deleteAtribute(id, type){
        const newFormData = {...this.state.formData};
        let index = newFormData[type].addedValues.findIndex(item => item._id === id);
        let newArray = [...newFormData[type].addedValues.slice(0, index), ...newFormData[type].addedValues.slice(index + 1)];
        newFormData[type].addedValues = newArray;
        
        this.setState({
            formData: newFormData
        })
    }

    componentDidMount(){
        this.props.getBrands();
        this.props.getCategories();
    }

    updateFormData(newFormData){
        this.setState({
            formData: newFormData
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.isFetchingBrands === false){
                const newFormData = populateOptionFields(this.state.formData, nextProps.brands, 'brand');
                this.updateFormData(newFormData);
            }
            if(nextProps.isFetchingCategories === false){
                const newFormData = populateOptionFields(this.state.formData, nextProps.categories, 'category');
                this.updateFormData(newFormData);
            }
            if(nextProps.isFetchingAddProduct === false){
                if(nextProps.addProductSuccess === true){
                    this.setState({formSuccess: true});
                    resetFields(this.state.formData);
                    setTimeout(() => {
                        this.setState({formSuccess: false});
                        this.props.addProductClear();
                    }, 3000)
                } else {
                    this.setState({
                        formError: true
                    })
                }
            }
        }
    }

    imagesHandler = (images) => {
        const newFormData = {
            ...this.state.formData
        }

        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        this.setState({
            formData: newFormData
        })
    }

    render() {
        return (
            <UserLayout {...this.props}>
                <div className="add-product">
                    <div className="add-product-container">
                        <h2>Add product</h2>
                        <div className="add-product-form-container">
                            <form className="login-form" onSubmit={(event) => this.onSubmit(event)}>
                                <FileUpload 
                                    imagesHandler={(images) => this.imagesHandler(images)}
                                    reset={this.state.formSuccess}
                                />
                                <FormField formData={this.state.formData.name} change={(element) => this.updateForm(element)}/>    
                                <FormField formData={this.state.formData.description} change={(element) => this.updateForm(element)}/>
                                <FormField formData={this.state.formData.price} change={(element) => this.updateForm(element)}/>
                                <FormField formData={this.state.formData.category} change={(element) => this.updateForm(element)}/>
                                <FormField formData={this.state.formData.brand} change={(element) => this.updateForm(element)}/>
                                {   
                                    this.state.formData.tastes.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                this.state.formData.tastes.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.value}
                                                        <FontAwesomeIcon onClick={() => this.deleteAtribute(item._id, 'tastes')} icon={faPlus} className="icon-delete-atribute"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={this.state.formData.tastes} change={(element) => this.updateForm(element)}/>
                                    <button onClick={() => this.pushAtribute('tastes')} type="button" className="plus-icon-button"><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                                {   
                                    this.state.formData.packing.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                this.state.formData.packing.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.value}
                                                        <FontAwesomeIcon onClick={() => this.deleteAtribute(item._id, 'packing')} icon={faPlus} className="icon-delete-atribute"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={this.state.formData.packing} change={(element) => this.updateForm(element)}/>
                                    <button onClick={() => this.pushAtribute('packing')} type="button" className="plus-icon-button"><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                                <FormField formData={this.state.formData.available} change={(element) => this.updateForm(element)}/>
                                <button type="submit" className="button" onClick={(event) => this.onSubmit(event)}>
                                    Add Product
                                </button>
                                {
                                    this.state.formError ? 
                                        <div className='error-message'>
                                            {this.props.errorMessageAddProduct ? this.props.errorMessageAddProduct : 'wrong data!'}
                                        </div>
                                    : null
                                }
                                {
                                    this.state.formSuccess ?
                                        <div className="success">
                                            Success
                                        </div>
                                    : null
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </UserLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    brands: state.kindOfCategory.brands,
    categories: state.kindOfCategory.categories,
    isFetchingBrands: state.kindOfCategory.isFetchingBrands,
    isFetchingCategories: state.kindOfCategory.isFetchingCategories,
    errorMessage: state.kindOfCategory.errorMessage,
    isFetchingAddProduct: state.product.isFetchingAddProduct,
    addProductSuccess: state.product.addProductSuccess,
    errorMessageAddProduct: state.product.errorMessage
})

export default connect(mapStateToProps, {getBrands, getCategories, addProduct, addProductClear})(AddProduct);
