import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
    const [showProductList, setShowProductList] = useState(false);
    
    // Retrieve cart items from Redux store
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity

    const handleGetStartedClick = () => {
        setShowProductList(true);
    };

    return (
        <div className="app-container">
            <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
                <div className="background-image"></div>
                <div className="content">
                    <div className="landing_content">
                        <h1>Welcome To Paradise Nursery</h1>
                        <div className="divider"></div>
                        <p>Where Green Meets Serenity</p>
                        <button className="get-started-button" onClick={handleGetStartedClick}>
                            Get Started
                        </button>
                    </div>
                    <div className="aboutus_container">
                        <AboutUs />
                    </div>
                </div>
            </div>
            <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
                <ProductList />
            </div>
            <div className="navbar">
                <h3>Total Items in Cart: {totalQuantity}</h3> {/* Display cart counter */}
            </div>
        </div>
    );
}

export default App;
