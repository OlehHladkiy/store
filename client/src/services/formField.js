import React from 'react';
import './formField.css';
import InputMask from 'react-input-mask';

const FormField = (props) => {
    const {formData, change, classNameChildElem, readOnly} = props;
    const renderError = () => {
        let errorMessage = null;
        
        if(formData.validation && !formData.valid){
            errorMessage = (
                <div className="error-message">
                    {formData.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const render = () => {
        let template = null;

        switch(formData.element){
            case 'input': 
                template = (
                    <div className="form-block">
                        {formData.showLabel ? formData.config.label : null}
                        <input {...formData.config} readOnly={readOnly} className={classNameChildElem ? classNameChildElem : "form-input"} value={formData.value} onBlur={(event) => change({event, id: formData.key, blur: true})} onChange={(event) => change({event, id: formData.key})}/>
                        {renderError()}
                    </div>
                )
                break;
            case 'phone':
                template = (
                    <div className="form-block">
                        {formData.showLabel ? formData.config.label : null}
                        <InputMask mask="+380(99)-999-99-99" maskChar="_" {...formData.config} readOnly={readOnly} className={classNameChildElem ? classNameChildElem : "form-input"} value={formData.value} onChange={(event) => change({event, id: formData.key})}/>
                        {renderError()}
                    </div>
                )
                break;
            case 'select':
                template = (
                    <div className="form-block">
                        {formData.showLabel ? formData.config.label : null}
                        <select className="form-select" value={formData.value} onBlur={(event) => change({event, id: formData.key, blur: true})} onChange={(event) => change({event, id: formData.key})}>
                            {formData.validation.defaultFirstValue ? null : <option value="">Select one</option>}
                            {
                                formData.config.options.map((item) => (
                                    <option key={item.key} value={item.key}>
                                        {item.value}
                                    </option>    
                                ))
                            }
                        </select>
                        {renderError()}
                    </div>
                )
                break;
            case 'textArea':
                template = (
                    <div className="form-block">
                        {formData.showLabel ? formData.config.label : null}
                        <textarea {...formData.config} className="form-text-area" value={formData.value} onBlur={(event) => change({event, id: formData.key, blur: true})} onChange={(event) => change({event, id: formData.key})}/>
                        {renderError()}
                    </div>
                )
                break;
            default:
                template = null;
        }
        return template;
    }

    return (
        <>
            {render()}
        </>
    );
}

export default FormField;
