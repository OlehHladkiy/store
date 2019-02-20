import React, { Component } from 'react';
import { connect } from 'react-redux';
import {update, generateData, formIsValid, resetFields, populateOptionFields, validate} from '../../../services/formAction';
import {getBrands, getCategories} from '../../../action/categories_actions';
import {addProduct, addProductClear} from '../../../action/product_actions';
import AddProductPresentational from './addProductPresentational';

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

    onSubmit = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);
        this.props.addProduct(dataToSubmit);
    }

    updateForm = (element) => {
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

    deleteAtribute = (id, type) => {
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
        if(this.props.isFetchingBrands !== nextProps.isFetchingBrands){
            if(nextProps.isFetchingBrands === false){
                const newFormData = populateOptionFields(this.state.formData, nextProps.brands, 'brand');
                this.updateFormData(newFormData);
            }
        }
        if(this.props.isFetchingCategories !== nextProps.isFetchingCategories){
            if(nextProps.isFetchingCategories === false){
                const newFormData = populateOptionFields(this.state.formData, nextProps.categories, 'category');
                this.updateFormData(newFormData);
            }
        }
        if(this.props.isFetchingAddProduct !== nextProps.isFetchingAddProduct){
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
        return (
            <AddProductPresentational
                {...this.props}
                updateForm={this.updateForm}
                onSubmit={this.onSubmit}
                formData={this.state.formData}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                imagesHandler={this.imagesHandler}
                deleteAtribute={this.deleteAtribute}
                pushAtribute={this.pushAtribute}
                handleDialogClose={this.handleDialogClose}
                handleDialogOpen={this.handleDialogOpen}
                openDialog={this.state.openDialog}
            />
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
