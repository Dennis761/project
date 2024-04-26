import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromHistoryList, clearError} from '../../../Redux/Actions/historyActions.js'
import { MdCancel } from "react-icons/md";
import useDebounce from '../../Hooks/useDebounce.jsx'

export default function RemoveFromHistory({id}) {
    const dispatch = useDispatch()
    const {error} = useSelector(state => state.history)
    
    const removeFromHistory = () => {
        if(error){
            console.error(error)
            dispatch(clearError())
        }
        dispatch(removeFromHistoryList(id))
    }

    const debouncedRemove = useDebounce(removeFromHistory, 700)

  return (
    <>
    <MdCancel onClick={debouncedRemove}/>
    </>
  )
}
