import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHistoryList } from '../../../Redux/Actions/historyActions.js';
import useInternetState from '../../Hooks/useInternetState.jsx';
import usePagination from '../../Hooks/usePagination.jsx';
import RemoveFromHistory from './RemoveFromHistory.jsx';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './HistoryList.css';

export default function HistoryList() {
  const dispatch = useDispatch();
  const parentRef = useRef();
  const childRef = useRef();
  const productsPerPage = 10;
 
  const { historyList, isLoading, pages, lineState } = useSelector(state => state.history);

  const isOnline = useInternetState()

  const intersected = usePagination(parentRef, childRef, () => {
    dispatch(getHistoryList(productsPerPage, pages ? pages : 0))
  });

  return (
    <>
      {!isOnline ?
        <Alert variant='warning' style={{margin: '5vh 5vh'}}>
          <b>
            Check Your Internet Connection...
          </b>
        </Alert>
        :
        <>
          <h1 style={{textAlign: 'center', margin: '3vh 3vh', fontSize: '5vh'}}>History</h1>
          {isLoading ?
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
              }}
            >
              <Spinner
                animation="border"
                role="status"
                style={{
                  height: '10vh',
                  width: '10vh'
                }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            :
            <div ref={parentRef} style={{ height: '80vh', overflow: 'auto', borderTop: '1px grey solid'}}>
              <ul className='history-list'>
                {historyList && historyList.map(product => (
                  product && <li key={product._id}>
                    <div className="history-container">
                      <Link to={`/product/${product._id}`} className="history-product-link">
                        <h3 className='history-action'>{product.action}: {product.title}</h3>
                        <p className='history-date'>{product.date.match(/^\d{4}-\d{2}-\d{2}/)}</p>
                        <p className='history-time'>{product.date.match(/\d{2}:\d{2}/)}</p>
                      </Link>
                      <RemoveFromHistory id={product._id} />
                    </div>
                  </li>
                ))}
              </ul>
              {lineState && <div ref={childRef} style={{height: '10px', background: 'green'}}/>}
            </div>
          }
        </>
      }
    </>
  );
}
