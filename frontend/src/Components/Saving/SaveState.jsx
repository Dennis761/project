import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, removeSavedProduct } from '../../Redux/Actions/productActions';
import useDebounce from '../../Hooks/useDebounce.jsx';
import { BiBookmarkAltPlus } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';

export default function SaveState({ id }) {
    const dispatch = useDispatch(); 
    const { checkSavedProduct, saved, saves, saveState } = useSelector(state => state.saveProductState);

    const save = () => {
        dispatch(saveProduct(id));
    };

    const removeSaved = () => {
        dispatch(removeSavedProduct(id));
    };

    const debounceSaved = useDebounce(save, 600);
    const debounceRemoved = useDebounce(removeSaved, 600);
 
    return (
        <>
            {checkSavedProduct ? 
                <p style={{fontSize: '3vh'}}>
                    Product successfully saved: {<MdCancel size={20} onClick={debounceRemoved} />}
                </p>
                :
                (saveState ? 
                    <p style={{fontSize: '3vh'}}>
                        Product successfully saved: {<MdCancel size={20} onClick={debounceRemoved} />}
                    </p> 
                    : 
                    <p style={{fontSize: '3vh'}}>
                        Save product: {<BiBookmarkAltPlus size={20} onClick={debounceSaved} />}
                    </p>
                )}
            <p style={{ fontSize: '3vh' }} className='product-save'>Saves: {saves ? saves : saved}</p>
        </>
    );
}