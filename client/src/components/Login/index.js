import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../action/user_actions";

import { update, generateData } from "../../services/formAction";
import LoginPresentational from "./loginPresentational";

class Login extends Component {
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
        showLabel: true
      }
    },
    loading: false
  };

  onSubmit = event => {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData);

    this.props.login(dataToSubmit);
    this.setState({
      loading: true
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData);

    this.setState({
      formData: newFormData,
      formError: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetchingLogin !== nextProps.isFetchingLogin) {
      if (nextProps.isFetchingLogin === false) {
        this.setState({
          loading: false
        });

        if (nextProps.loginSuccess === false) {
          this.setState({ formError: true });
        } else if (nextProps.loginSuccess === true) {
          this.props.history.push("/user/dashboard");
        }
      }
    }
  }

  render() {
    return (
      <LoginPresentational
        {...this.props}
        updateForm={this.updateForm}
        onSubmit={this.onSubmit}
        formData={this.state.formData}
        formError={this.state.formError}
        formSuccess={this.state.formSuccess}
        loading={this.state.loading}
      />
    );
  }
}

const mapStateToProps = state => ({
  loginSuccess: state.user.loginSuccess,
  errorMessage: state.user.errorMessage,
  isFetchingLogin: state.user.isFetchingLogin
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
