import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductListModel from '../../ProductModels/ProductListModel.jsx';
import FindProduct from '../FindProduct/FindProduct.jsx';
import './FoundProductList.css';

export default function FoundProduct() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(null)
  const { foundProducts, error } = useSelector(state => state.findProduct);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const sortByRating = useMemo(() => {
    return foundProducts && [...foundProducts].sort((a, b) => a.saved.length - b.saved.length);
  }, [foundProducts]);

  const sortBySaved = useMemo(() => {
    return foundProducts && [...foundProducts].sort((a, b) => b.rating.average - a.rating.average)
  }, [foundProducts]);

  const sortByViews = useMemo(() => {
    return foundProducts && [...foundProducts].sort((a, b) => b.viewsCount - a.viewsCount);
  }, [foundProducts]);

  const handleFilterSelect = (filter) => {
    switch (filter) {
      case 'rating':
        setSortedProducts(sortByRating)
        break;
      case 'saved':
        setSortedProducts(sortBySaved)
        break;
      case 'views':
        setSortedProducts(sortByViews)
        break;
      default:
        setSortedProducts(foundProducts)
        break;
    }
    setIsFilterOpen(false);
  };

  return (
    <div className="found-product-container">
      <h2 style={{ textAlign: 'center', color: 'white' }}>Found Products:</h2>
      <div className="found-product" style={{ position: 'relative', zIndex: '10' }}>
        <FindProduct />
      </div>
          <div className='dropdownMenu' style={{position: 'relative', display: 'inline-block'}}>
            <button className='filter-button' onClick={toggleFilter}>Filter</button>

            {isFilterOpen && (
              <ul className="filter-container">
               <li className="filter-button" onClick={() => handleFilterSelect('rating')}>sort by rating</li>
               <li className="filter-button" onClick={() => handleFilterSelect('saved')}>sort by saved</li>
               <li className="filter-button" onClick={() => handleFilterSelect('views')}>sort by views</li>
              </ul>
            )}
          </div>
      <ProductListModel products={sortedProducts || foundProducts} />
    </div>
  );
}
