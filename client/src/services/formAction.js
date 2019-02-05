const validate = (element, formData = []) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        const valid = element.value !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formData.password.value.trim();
        const message = `${!valid ? 'Password must be the same' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    return error;
}

export const update = (element, formData) => {
    const newFormData = {...formData};
    const newElement = {...newFormData[element.id]};

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement, formData);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
}

export const generateData = (formData) => {
    let newData = {};
    for(let key in formData){
        if(key !== 'confirmPassword'){
            newData[key] = formData[key].value;
        }
        if(key === 'phone'){
            let phone = formData[key].value;
            newData[key] = phone !== '' && phone !== formData[key].value ? phone.match(/[0-9]/g).join('').slice(2) : phone;
        }
        if(formData[key].validation && formData[key].validation.withAtr){
            let value = formData[key].addedValues;
            newData[key] = value;
        }
    }
    return newData;
}

export const formIsValid = (formData) => {
    let formIsValid = true;
    for(let key in formData){
        if(key !== 'phone'){
            formIsValid = formData[key].valid && formIsValid;
        }
    }
    return formIsValid;
}

export const populateFields = (formData, dataIn) => {
    const newFormData = {...formData};

    for(let key in newFormData){
        newFormData[key].value = dataIn[key];
        newFormData[key].valid = true;
        newFormData[key].touched = true;
    }
    return newFormData;
}

export const populateOptionFields = (formData, dataIn, field) => {
    const newFormData = {...formData};
    const newArray = dataIn.map(item => {
        return {
            key: item._id,
            value: item.name
        }
    })
    newFormData[field].config.options = newArray;
    return newFormData;
}

export const resetFields = (formData) => {
    const newFormData = { ...formData };

    for(let key in newFormData){
        newFormData[key].value = '';
        newFormData[key].valid = false;
        newFormData[key].touched = false;
        if(newFormData[key].validation.withAtr){
            newFormData[key].addedValues = [];
        }
    }

    return newFormData;
}