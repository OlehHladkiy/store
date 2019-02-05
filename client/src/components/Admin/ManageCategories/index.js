import React, { Component } from 'react';
import UserLayout from '../../../hoc/userLayout';
import AddBrand from './AddBrand';
import AddCategory from './AddCategory';

import './index.css';

export default class ManageCategories extends Component {
    render() {
        return (
            <UserLayout {...this.props}>
                <div className="add-block-container">
                    <h2>Brand</h2>
                    <AddBrand/>
                </div>
                <div className="add-block-container">
                    <h2>Category</h2>
                    <AddCategory/>
                </div>
            </UserLayout>
        )
    }
}

