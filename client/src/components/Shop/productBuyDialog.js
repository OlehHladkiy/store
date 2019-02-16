import React, { Component } from 'react'
import { Dialog } from '@material-ui/core';
import {update, generateData, formIsValid, populateOptionFields, resetFields} from '../../services/formAction';
import FormField from '../../services/formField';
import {connect} from 'react-redux';
import {closeDialog} from '../../action/buy_dialog_actions';

import './buyDialog.css';

class ProductBuyDialog extends Component {

    state = {
        formSuccess: false,
        formError: false,
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
            }
        }
    }

    onSubmit(event){
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formData);

        
    }

    updateForm(element){
        const newFormData = update(element, this.state.formData);

        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(nextProps.article){
                let newFormData = {};
                const formDataWithNewTaste = populateOptionFields(this.state.formData, nextProps.article.tastes, 'tastes');
                const formDataWithNewPacking = populateOptionFields(this.state.formData, nextProps.article.packingAndPrice, 'packingAndPrice');
                newFormData = {...formDataWithNewTaste, ...formDataWithNewPacking};
                this.setState({
                    formData: newFormData
                })
            } else {
                const newFormData = resetFields(this.state.formData);
                this.setState({
                    formData: newFormData
                })
            }
        }
    }

    renderPrice = () => {
        const {formData} = this.state; 
        let packing = [...formData.packingAndPrice.config.options];
        let packingValue = formData.packingAndPrice.value;
        
        let findPacking = packing.find((item) => packingValue === item.key);
        return (
            <span className="price">
                Price: {findPacking.price}$
            </span>
        )
    }

    render() {
        return (
            this.props.article ? 
                <Dialog open={this.props.openDialogStatus} onClose={this.props.closeDialog}>
                    <div className="buy-dialog">
                        <div className="dialog-header">
                            <span className="dialog-header-name">{this.props.article.name}</span>
                            <div className="close-icon">
                                <span className="close-icon-text" onClick={() => this.props.closeDialog()}>x</span>
                            </div>
                        </div>
                        <div className="dialog-content">
                            <div className="dialog-image-section">
                                <div></div>
                                <div>
                                    {/* {this.props.article.brand.name}<br/>
                                    {this.props.article.category.name} */}
                                </div>
                            </div>
                            <form className="" onSubmit={(event) => this.onSubmit(event)}>
                                <FormField formData={this.state.formData.tastes} change={(element) => this.updateForm(element)}/>
                                <FormField formData={this.state.formData.packingAndPrice} change={(element) => this.updateForm(element)}/>
                                <button type="submit" disabled={!formIsValid(this.state.formData)} className="button" onClick={(event) => this.onSubmit(event)}>
                                    Add to Card
                                </button>
                                {
                                    this.state.formError ? 
                                        <div className='error-message'>
                                            {this.props.errorMessageAddProduct ? this.props.errorMessageAddProduct : 'wrong data!'}
                                        </div>
                                    : null
                                }
                            </form>
                            <div className="dialog-price-container">
                                {this.renderPrice()}
                            </div>
                        </div>
                    </div>
                </Dialog>
            : null
        )
    }
}

const mapStateToProps = (state) => ({
    openDialogStatus: state.buyDialog.openDialogStatus,
    article: state.buyDialog.article
})

export default connect(mapStateToProps, {closeDialog})(ProductBuyDialog);