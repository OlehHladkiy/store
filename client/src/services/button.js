import React from 'react';
import {Link} from 'react-router-dom';

import './button.css';

const MyButton = ({type = "default", linkTo, className, text, icon, runAction}) => {

    const renderButtons = () => {
        let template = null;

        switch(type){
            case 'default': 
                template = (<Link
                                className={className ? className : 'default-link-button'}
                                to={linkTo}
                            >
                                {icon ? icon : null}{text}
                            </Link>);
                break;
            case 'button':
                template = (<button
                    className={className ? className : 'default-link-button'}
                    onClick={(event) => { event.stopPropagation(); runAction()} }
                >
                    {icon ? icon : null}{text}
                </button>);
                break;
            default:
                template = null;
        }
        return template;
    }

    return (
        <>
            {renderButtons()}
        </>
    );
}

export default MyButton;