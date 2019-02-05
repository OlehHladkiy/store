import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

import './index.css';

export default class index extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        Sport nutrition
                    </div>
                    <div className="footer-info">
                        <div className="left-block">
                            <h2>Contact Information</h2>
                            <div className="tag-container">
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faCompass}
                                        className="icon"
                                    />
                                    <div>
                                        Adress<br/>
                                        Baker St. 221b
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        className="icon"
                                    />
                                    <div>
                                        Phone<br/>
                                        093-06-21-461
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faClock}
                                        className="icon"
                                    />
                                    <div>
                                        Working hours<br/>
                                        Mon-Sun/ 9am-8pm
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="icon"
                                    />
                                    <div>
                                        Email<br/>
                                        test@gmail.com
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="right-block">
                            <h2>Be first to know</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab atque molestiae nihil sunt, temporibus veritatis. Blanditiis excepturi laboriosam perferendis?
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
