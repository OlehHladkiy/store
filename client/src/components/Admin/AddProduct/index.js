import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';
import { connect } from 'react-redux';
import FormField from '../../../services/formField';
import FileUpload from '../../../services/fileupload';
import {update, generateData, formIsValid, resetFields, populateOptionFields, validate} from '../../../services/formAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import {getBrands, getCategories} from '../../../action/categories_actions';
import {addProduct, addProductClear} from '../../../action/product_actions';

import './index.css';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


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
                    required: false,
                    notToServer: true
                },
                valid: false,
                showLabel: false
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
                    withAtr: true,
                    withAtrRequired: true
                },
                valid: false,
                showLabel: true
            },
            packingAndPrice: {
                element: 'input',
                value: '',
                addedValues: [],
                key: 'packingAndPrice',
                config: {
                    text: 'text',
                    label: 'Packing and price (Example: 500g)',
                    name: 'packing-select',
                    placeholder: 'Enter packing values',
                },
                validation: {
                    required: false,
                    withAtr: true,
                    withAtrRequired: true
                },
                valid: false,
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
                showLabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                showLabel: false
            }
        },
        openDialog: false
    }

    handleDialogOpen = () => {
        this.setState({
            openDialog: true
        })
    }

    handleDialogClose = () => {
        this.setState({
            openDialog: false
        })
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);
        this.props.addProduct(dataToSubmit);
    }

    updateForm(element){
        const newFormData = update(element, this.state.formData);

        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    pushAtribute = (type, withPrice) => {
        const newFormData = {...this.state.formData};
        let value = newFormData[type].value;
        let obj = {_id: `${value.split(' ').join('-')}-${+new Date()}`, name: value};
        if(withPrice){
            obj = {...obj, price: this.state.formData.price.value}
        }

        const addedValuesCopy = [...newFormData[type].addedValues, obj];
        newFormData[type].value = '';
        newFormData[type].addedValues = addedValuesCopy;
        newFormData[type].valid = validate(newFormData[type], newFormData);
        
        this.setState({
            formData: newFormData,
            openDialog: false
        })
    }

    deleteAtribute(id, type){
        const newFormData = {...this.state.formData};
        let index = newFormData[type].addedValues.findIndex(item => item._id === id);
        let newArray = [...newFormData[type].addedValues.slice(0, index), ...newFormData[type].addedValues.slice(index + 1)];
        newFormData[type].addedValues = newArray;
        newFormData[type].valid = validate(newFormData[type], newFormData);
        
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
                } else if(nextProps.addProductSuccess === false) {
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
        console.log(this.state);
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
                                <FormField formData={this.state.formData.category} change={(element) => this.updateForm(element)}/>
                                <FormField formData={this.state.formData.brand} change={(element) => this.updateForm(element)}/>
                                {   
                                    this.state.formData.tastes.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                this.state.formData.tastes.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.name}
                                                        <FontAwesomeIcon onClick={() => this.deleteAtribute(item._id, 'tastes')} icon={faPlus} className="icon-delete-atribute"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={this.state.formData.tastes} change={(element) => this.updateForm(element)}/>
                                    <button onClick={() => this.pushAtribute('tastes')} disabled={this.state.formData.tastes.value === ''} type="button" className="plus-icon-button"><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                                {   
                                    this.state.formData.packingAndPrice.addedValues.length > 0 ?
                                        <div className="add-atribute-container">
                                            {   
                                                this.state.formData.packingAndPrice.addedValues.map(item => (
                                                    <div key={item._id} className="add-atribute">
                                                        {item.name} - {item.price}$
                                                        <FontAwesomeIcon onClick={() => this.deleteAtribute(item._id, 'packing')} icon={faPlus} className="icon-delete-atribute"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    : null
                                }
                                <div className="add-atributes">
                                    <FormField formData={this.state.formData.packingAndPrice} change={(element) => this.updateForm(element)}/>
                                    <button onClick={this.handleDialogOpen} disabled={this.state.formData.packingAndPrice.value === ''} type="button" className="plus-icon-button"><FontAwesomeIcon icon={faPlus}/></button>
                                </div>
                                <FormField formData={this.state.formData.available} change={(element) => this.updateForm(element)}/>
                                <button type="submit" disabled={!formIsValid(this.state.formData)} className="button" onClick={(event) => this.onSubmit(event)}>
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
                <Dialog open={this.state.openDialog} onClose={this.handleDialogClose}>
                    <span>Price for {this.state.formData.packingAndPrice.value}</span>
                    <DialogContent>
                        <FormField formData={this.state.formData.price} change={(element) => this.updateForm(element)}/>
                    </DialogContent>
                    <div className="dialog-actions">
                        <button type="button" disabled={this.state.formData.price.value === ''} className="button" onClick={() => this.pushAtribute('packingAndPrice', true)}>
                            Ok 
                        </button>
                        <button type="button" className="button" onClick={this.handleDialogClose}>
                            Cancel
                        </button>
                    </div>
                </Dialog>
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
