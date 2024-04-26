import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromCart, clearError } from '../../../Redux/Actions/cartActions.js';
import RemoveFromCart from './RemoveFromCart';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function CartList() {
    const dispatch = useDispatch();
    const { cartItems, error } = useSelector(state => state.cart);

    useEffect(() => {
        if(error){
            console.error(error)
            dispatch(clearError())
        }
        dispatch(getItemFromCart());
    }, [dispatch]);

    function truncateString(str) {
        if (str.length > 18) {
          return str.substring(0, 10) + '...';
        } else {
          return str;
        }
    }

    return (
        <div>
            <ul style={{listStyleType: 'none', padding: '0', margin: '0'}} className='add-to-cart-dropdown'>
                { cartItems && cartItems.length === 0 ? (
                    <div style={{textAlign: 'center'}}>Cart is empty</div>
                ) : ( 
                    cartItems && cartItems.map(product => (
                        product && <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent',paddingRight: '5px' }}>
                            <div>
                                <NavDropdown.Item as={Link} to={`/product/${product._id}`}>
                                    <b>Title: {truncateString(product.title)}</b>
                                    <p>Price: {truncateString(product.price)}$</p>
                                </NavDropdown.Item>
                            </div>
                                <RemoveFromCart id={product._id} />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
