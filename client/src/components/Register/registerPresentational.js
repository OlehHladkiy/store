import React from "react";
import FormField from "../../services/formField";
import { formIsValid } from "../../services/formAction";
import Dialog from "@material-ui/core/Dialog";

const RegisterPresentational = props => {
  const { formData, onSubmit, updateForm, formSuccess, formError } = props;

  return (
    <div className="register">
      <div className="register-container">
        <form
          className="register-form"
          onSubmit={event => this.onSubmit(event)}
        >
          <h2>Personal Information</h2>
          <FormField formData={formData.email} change={updateForm} />
          <FormField formData={formData.name} change={updateForm} />
          <FormField formData={formData.lastname} change={updateForm} />
          <FormField formData={formData.phone} change={updateForm} />
          <h2>Confirm Password</h2>
          <FormField formData={formData.password} change={updateForm} />
          <FormField formData={formData.confirmPassword} change={updateForm} />
          {formSuccess ? (
            <div className="success">Success</div>
          ) : (
            <button
              type="submit"
              disabled={!formIsValid(formData)}
              className="button"
              onClick={event => onSubmit(event)}
            >
              Register
            </button>
          )}
          {formError ? (
            <div className="error-message">
              {props.errorMessage ? props.errorMessage : "wrong data!"}
            </div>
          ) : null}
        </form>
      </div>
      <Dialog open={formSuccess}>
        <h2>Congratulations</h2>
        <p>You will redirect to login page a couple second.</p>
      </Dialog>
    </div>
  );
};

export default RegisterPresentational;
