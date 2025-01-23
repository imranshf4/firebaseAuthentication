// rsc
import React from 'react';
// import logo from '../../logo.svg';
import './Header.css';


const Header = () => {
    return (
        <div className="header">
            {/* <img src={logo} alt=""/> */}
            
            <nav>
                <a href="/">Home</a>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/product">Product</a>
            </nav>
        </div>
    );
};

export default Header;