import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../../action/user_actions";

import { update, generateData } from "../../services/formAction";
import RegisterPresentational from "./registerPresentational";

import "./index.css";

class Register extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formData: {
      email: {
        element: "input",
        value: "",
        key: "email",
        config: {
          type: "email",
          name: "email-input",
          placeholder: "Enter your email",
          label: "Email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        showLabel: true
      },
      password: {
        element: "input",
        value: "",
        key: "password",
        config: {
          type: "password",
          name: "password-input",
          placeholder: "password",
          label: "Password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        showLabel: true
      },
      confirmPassword: {
        element: "input",
        value: "",
        key: "confirmPassword",
        config: {
          name: "confirm-password-input",
          type: "password",
          placeholder: "Confirm your password",
          label: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: true
        },
        valid: false,
        touched: false,
        showLabel: true
      },
      name: {
        element: "input",
        value: "",
        key: "name",
        config: {
          type: "text",
          name: "name-input",
          placeholder: "Enter your name",
          label: "Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        showLabel: true
      },
      lastname: {
        element: "input",
        value: "",
        key: "lastname",
        config: {
          type: "text",
          name: "lastname-input",
          placeholder: "Enter your lastname",
          label: "Lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        showLabel: true
      },
      phone: {
        element: "phone",
        value: "",
        key: "phone",
        config: {
          type: "phone",
          name: "phone-input",
          placeholder: "+380(__)-___-__-__",
          label: "Phone (Example: +380(93)-0621-46-21)"
        },
        validation: {
          required: false
        },
        showLabel: true
      }
    }
  };

  onSubmit = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData);

    this.props.register(dataToSubmit);
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData);

    this.setState({
      formData: newFormData,
      formError: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetching !== nextProps.isFetching) {
      if (nextProps.registerSuccess === true) {
        this.setState({ formSuccess: true });
        this.formSuccess();
      } else {
        this.setState({ formError: true });
      }
    }
  }

  formSuccess = () => {
    setTimeout(() => {
      this.setState({
        formSuccess: false
      });
      this.props.history.push("/login");
    }, 3000);
  };

  render() {
    return (
      <RegisterPresentational
        {...this.props}
        updateForm={this.updateForm}
        onSubmit={this.onSubmit}
        formData={this.state.formData}
        formError={this.state.formError}
        formSuccess={this.state.formSuccess}
      />
    );
  }
}

const mapStateToProps = state => ({
  registerSuccess: state.user.registerSuccess,
  errorMessage: state.user.errorMessage,
  isFetching: state.user.isFetchingRegister
});

export default connect(
  mapStateToProps,
  { register }
)(Register);
