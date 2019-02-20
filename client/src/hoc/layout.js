import React from 'react';
import Header from '../components/Header';
import Cart from '../components/Cart';

const Layout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
            <Cart/>
        </div>
    );
}

export default Layout;
