import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMyProduct, clearError } from '../../Redux/Actions/myProductActions';

export default function DeleteProduct({ id }) {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.myProduct);

    const deleteProduct = () => {
        if (error) {
            console.error(error);
            dispatch(clearError());
        }
        dispatch(deleteMyProduct(id));
    };

    return (
        <>
            <button
                className="delete-product-button"
                onClick={deleteProduct}
            >
                Delete
            </button>
            <style jsx>{`
                .delete-product-button {
                    background-color: #ff0000;
                    color: #ffffff;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .delete-product-button:hover {
                    background-color: #cc0000;
                }
            `}</style>
       
        </>
    );
}