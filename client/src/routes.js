import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './hoc/auth';
import Layout from './hoc/layout';
import Login from './components/Login';
import Register from './components/Register';
import Shop from './components/Shop';
import Dashboard from './components/Dashboard';
import ManageCategories from './components/Admin/ManageCategories';
import AddProduct from './components/Admin/AddProduct';
import Articles from './components/Articles';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/user/dashboard" exact component={Auth(Dashboard, true)}/>

                <Route path="/admin/articles" exact component={Auth(Articles, true, true)}/>
                <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true, true)}/>
                <Route path="/admin/add_product" exact component={Auth(AddProduct, true, true)}/>
                <Route path="/admin/add_product/:id" exact component={Auth(AddProduct, true, true)}/>

                <Route path="/login" exact component={Auth(Login, false)}/>
                <Route path="/register" exact component={Auth(Register, false)}/>
                <Route path="/" exact component={Auth(Shop, null)}/>
            </Switch>
        </Layout>
    )
}

export default Routes;