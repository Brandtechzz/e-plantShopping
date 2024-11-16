import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch } from 'react-redux'; // Import useDispatch hook
import { addItemToCart } from './CartSlice'; // Import the addItemToCart action

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // State to track added products

    const dispatch = useDispatch(); // Get the dispatch function

    const plantsArray = [
        // ... (your existing plantsArray)
    ];

    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff!important',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleAddToCart = (plant) => {
        dispatch(addItemToCart(plant)); // Dispatch action to add item to cart

        // Update the addedToCart state
        setAddedToCart(prevState => ({
            ...prevState,
            [plant.name]: true
        }));
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
    };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                {/* ... (your existing navbar code) */}
            </div>
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button 
                                            className="product-button" 
                                            onClick={() => handleAddToCart(plant)}>
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;