export const validate = (element, formData = []) => {
  let valid = true;

  if (element.validation.email) {
    valid = /\S+@\S+\.\S+/.test(element.value);
  }

  if (element.validation.required) {
    valid = element.value !== "";
  }

  if (element.validation.confirm) {
    valid = element.value.trim() === formData.password.value.trim();
  }

  if (element.validation.withAtrRequired) {
    valid = element.addedValues.length > 0;
  }

  return valid;
};

export const update = (element, formData) => {
  const newFormData = { ...formData };
  const newElement = { ...newFormData[element.id] };

  newElement.value = element.event.target.value;

  let validData = validate(newElement, formData);
  newElement.valid = validData;

  newFormData[element.id] = newElement;

  return newFormData;
};

export const generateData = formData => {
  let newData = {};
  for (let key in formData) {
    if (key !== "confirmPassword" && !formData[key].validation.notToServer) {
      newData[key] = formData[key].value;
    }
    if (key === "phone") {
      let phone = formData[key].value;
      newData[key] =
        phone !== "" && phone !== formData[key].value
          ? phone
              .match(/[0-9]/g)
              .join("")
              .slice(2)
          : phone;
    }
    if (formData[key].validation && formData[key].validation.withAtr) {
      let value = formData[key].addedValues;
      newData[key] = value;
    }
  }
  return newData;
};

export const formIsValid = formData => {
  let formIsValid = true;
  for (let key in formData) {
    if (key !== "phone") {
      formIsValid = formData[key].valid && formIsValid;
    }
  }
  return formIsValid;
};

export const populateFields = (formData, dataIn) => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    newFormData[key].value = dataIn[key];
    newFormData[key].valid = true;

    if (newFormData[key].validation.withAtr) {
      newFormData[key].addedValues = dataIn[key];
      newFormData[key].value = "";
    }
  }
  return newFormData;
};

export const populateOptionFields = (formData, dataIn, field) => {
  const newFormData = { ...formData };
  if (typeof formData[field] === "object") {
    newFormData[field] = { ...formData[field] };
  }
  const newArray = dataIn.map(item => {
    let obj = {};
    for (let key in item) {
      if (key === "name") {
        obj["value"] = item[key];
      } else if (key === "_id") {
        obj["key"] = item[key];
      } else {
        obj[key] = item[key];
      }
    }
    return obj;
  });
  if (newFormData[field].validation.defaultFirstValue) {
    newFormData[field].value = newArray[0].key;
    newFormData[field].valid = true;
  }
  newFormData[field].config.options = newArray;
  return newFormData;
};

export const resetFields = formData => {
  const newFormData = { ...formData };

  for (let key in newFormData) {
    if (key !== "images") {
      newFormData[key].value = "";
      newFormData[key].valid = false;
      newFormData[key].touched = false;
      if (newFormData[key].validation && newFormData[key].validation.withAtr) {
        newFormData[key].addedValues = [];
      }
    }
  }

  return newFormData;
};
