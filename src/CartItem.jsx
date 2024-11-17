import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setTotalQuantity(totalCount);
    }, [cartItems]);

    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + (parseFloat(item.cost.replace(/[^0-9.-]+/g, "")) * item.quantity);
        }, 0).toFixed(2);
    };

    const calculateItemTotalCost = (item) => {
        return (parseFloat(item.cost.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem({ id: item.id }));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem({ id: item.id }));
    };

    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
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
            <h3>Total Quantity: {totalQuantity}</h3>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
    );
};

export default CartItem;