import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items); // Get cart items from the Redux store

    // Calculate the total amount for all items in the cart
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.cost.slice(1) * item.quantity); // Assuming cost is a string, e.g., "$15"
        }, 0).toFixed(2); // Return total value fixed to 2 decimal places
    };

    // Calculate the total cost of a specific item
    const calculateItemTotalCost = (item) => {
        return (item.cost.slice(1) * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
        } else {
            dispatch(removeItem({ name: item.name })); // Remove item if quantity is 0
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem({ name: item.name })); // Dispatch removeItem
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.name} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>{item.name}</div>
                        <div>${item.cost}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div>Subtotal: ${calculateItemTotalCost(item)}</div>
                        <button onClick={() => handleIncrement(item)}>+</button>
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleRemove(item)}>Remove</button>
                    </div>
                ))}
            </div>
            <h2>Total Amount: ${calculateTotalAmount()}</h2>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
    );
};

export default CartItem;