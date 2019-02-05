import React from 'react';
import {Link} from 'react-router-dom';

import './button.css';

const MyButton = ({type = "default", to, linkTo, className, text, runAction}) => {

    const renderButtons = () => {
        let template = null;

        switch(type){
            case 'default': 
                template = (<Link
                                className={className ? className : 'default-link-button'}
                                to={linkTo}
                            >
                                {text}
                            </Link>);
                break;
            default:
                template = null;
        }
        return template;
    }

    return (
        <div>
            {renderButtons()}
        </div>
    );
}

export default MyButton;