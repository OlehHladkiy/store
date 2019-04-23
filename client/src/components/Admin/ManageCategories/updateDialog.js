import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import FormField from "../../../services/formField";
import {
  update,
  generateData,
  formIsValid,
  resetFields
} from "../../../services/formAction";

export default class UpdateDialog extends Component {
  state = {
    formSuccess: false,
    formError: false,
    formData: {
      name: {
        element: "input",
        value: "",
        key: "name",
        config: {
          type: "text",
          name: `${this.props.type}-input`,
          placeholder: `Enter ${this.props.type}`,
          label: "Name"
        },
        validation: {
          required: true
        },
        valid: false,
        showLabel: true
      }
    }
  };

  onSubmit(event) {
    event.preventDefault();
    let dataToSubmit = generateData(this.state.formData);

    this.props.action(dataToSubmit, this.props.data, this.props.id);
    this.props.handleClose();
    resetFields(this.state.formData);
  }

  updateForm(element) {
    const newFormData = update(element, this.state.formData);

    this.setState({
      formData: newFormData,
      formError: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      if (nextProps.data) {
        let index = nextProps.data.findIndex(item => item._id === nextProps.id);
        let newFormData = { ...this.state.formData };
        let newElement = { ...newFormData.name };
        newElement.value = nextProps.data[index].name;
        newElement.valid = true;
        newFormData.name = newElement;

        this.setState({
          formData: newFormData
        });
      }
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <form className="dialog-form">
          <DialogContent>
            <FormField
              formData={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
          </DialogContent>
          <div className="dialog-actions">
            <button
              type="submit"
              disabled={!formIsValid(this.state.formData)}
              className="button"
              onClick={event => this.onSubmit(event, "update")}
            >
              {this.props.nameOfButton}
            </button>
            <button
              type="button"
              className="button"
              onClick={this.props.handleClose}
            >
              Cancel
            </button>
          </div>
          {this.state.formError ? (
            <div className="error-message">
              {this.props.errorMessage
                ? this.props.errorMessage
                : "wrong data!"}
            </div>
          ) : null}
        </form>
      </Dialog>
    );
  }
}
