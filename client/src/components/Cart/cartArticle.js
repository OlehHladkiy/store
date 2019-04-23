import React, { Component } from "react";
import {
  update,
  populateOptionFields,
  generateData
} from "../../services/formAction";
import CartArticlePresentational from "./cartArticlePresentational";
import { updateCart } from "../../action/cart_actions";
import { connect } from "react-redux";

class CartArticle extends Component {
  state = {
    formSuccess: false,
    formError: false,
    price: 0,
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
      },
      quantity: {
        element: "input",
        value: 1,
        key: "quantity",
        config: {
          type: "number",
          name: "quantity-input",
          label: "Quantity",
          min: "1"
        },
        validation: {
          required: true
        },
        valid: false,
        showLabel: false
      }
    }
  };

  updateForm = element => {
    let newFormData = update(element, this.state.formData);

    this.setState({
      formData: newFormData,
      formError: false
    });
    this.props.updateCart(this.props.article._id, generateData(newFormData));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.formData.quantity.value !==
        prevState.formData.quantity.value ||
      this.state.formData.packingAndPrice.value !==
        prevState.formData.packingAndPrice.value
    ) {
      this.changePrice();
    }
  }

  componentDidMount() {
    const formDataWithNewTaste = populateOptionFields(
      this.state.formData,
      this.props.article.tastes,
      "tastes"
    );
    const newFormData = populateOptionFields(
      formDataWithNewTaste,
      this.props.article.packingAndPrice,
      "packingAndPrice"
    );
    newFormData.tastes.value = this.props.selectedParameters.tastes;
    newFormData.packingAndPrice.value = this.props.selectedParameters.packingAndPrice;
    newFormData.quantity.value = this.props.selectedParameters.quantity;

    this.setState({
      formData: newFormData
    });
  }

  changePrice = () => {
    let price = this.findPrice(this.state.formData);
    this.props.pushTotalValues({
      _id: this.props.article._id,
      price: price * +this.state.formData.quantity.value
    });
    this.setState({
      price
    });
  };

  findPrice = formData => {
    let packingAndPrice = formData.packingAndPrice.config.options;
    let packingValue = formData.packingAndPrice.value;
    let findPacking = packingAndPrice.find(item => packingValue === item.key);

    return findPacking.price;
  };

  changeQuantity = type => {
    let quantity = this.state.formData.quantity.value;
    let formData = { ...this.state.formData };
    let newQuantity = { ...formData.quantity };

    quantity = type === "inc" ? ++quantity : --quantity;

    if (quantity <= 0) quantity = 1;
    newQuantity.value = quantity;

    formData.quantity = newQuantity;

    this.setState({
      formData
    });
    this.props.updateCart(this.props.article._id, generateData(formData));
  };

  render() {
    return (
      <CartArticlePresentational
        {...this.props}
        formData={this.state.formData}
        updateForm={this.updateForm}
        price={this.state.price}
        changeQuantity={this.changeQuantity}
      />
    );
  }
}

export default connect(
  null,
  { updateCart }
)(CartArticle);
