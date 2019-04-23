import React, { Component } from "react";
import {
  update,
  generateData,
  populateOptionFields,
  resetFields
} from "../../services/formAction";
import { connect } from "react-redux";
import { closeBuyDialog } from "../../action/dialogs_actions";
import { addToCart } from "../../action/cart_actions";
import ProductBuyDialogPresentational from "./productBuyDialogPresentational";

import "./buyDialog.css";

class ProductBuyDialog extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formData: {
      tastes: {
        element: "select",
        value: "",
        key: "tastes",
        config: {
          label: "Tastes",
          name: "tastes-select",
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
        element: "select",
        value: "",
        key: "packingAndPrice",
        config: {
          label: "Packing and price",
          name: "packing-select",
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
  };

  onSubmit = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData);

    this.props.addToCart(this.props.article._id, dataToSubmit);
    this.props.closeBuyDialog();
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData);

    this.setState({
      formData: newFormData,
      formError: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.openDialogStatus !== nextProps.openDialogStatus) {
      if (nextProps.article) {
        const formDataWithNewTaste = populateOptionFields(
          this.state.formData,
          nextProps.article.tastes,
          "tastes"
        );
        const newFormData = populateOptionFields(
          formDataWithNewTaste,
          nextProps.article.packingAndPrice,
          "packingAndPrice"
        );

        this.setState({
          formData: newFormData
        });
      } else {
        const newFormData = resetFields(this.state.formData);
        this.setState({
          formData: newFormData
        });
      }
    }
  }

  renderPrice = () => {
    const { formData } = this.state;
    let packing = [...formData.packingAndPrice.config.options];
    let packingValue = formData.packingAndPrice.value;

    let findPacking = packing.find(item => packingValue === item.key);
    return <span className="price">Price: {findPacking.price}$</span>;
  };

  render() {
    return (
      <ProductBuyDialogPresentational
        {...this.props}
        updateForm={this.updateForm}
        onSubmit={this.onSubmit}
        formData={this.state.formData}
        formError={this.state.formError}
        renderPrice={this.renderPrice}
      />
    );
  }
}

const mapStateToProps = state => ({
  openDialogStatus: state.dialogs.openDialogStatus,
  article: state.dialogs.article
});

export default connect(
  mapStateToProps,
  { closeBuyDialog, addToCart }
)(ProductBuyDialog);
