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
                <div className="cart-icon" style={{ position: 'relative', display: 'inline-block' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                        <rect width="156" height="156" fill="none"></rect>
                        <circle cx="80" cy="216" r="12"></circle>
                        <circle cx="184" cy="216" r="12"></circle>
                        <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" id="mainIconPathAttribute"></path>
                    </svg>
                    {totalQuantity > 0 && (
                        <span className="cart-counter" style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            background: '#ff0000',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '5px 10px',
                            fontSize: '14px',
                        }}>
                            {totalQuantity}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
