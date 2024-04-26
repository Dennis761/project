import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

export default function ProductListModel({ lineState, products, isLoading, childRef, parentRef }) {  

  function truncateString(str) {
    if (str.length > 18) {
      return str.substring(0, 18) + '...';
    } else {
      return str;
    }
  }

  return (
    <>
        {isLoading ? (
          <div className="loading-spinner" style={{alignItems: 'center'}}>
            <Spinner 
              animation="border" 
              variant="light"
              role="status" 
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : ( 
          <div className="products-list" ref={parentRef} style={{ height: '80vh', overflow: 'auto'}}>
            {products && products.length > 0 ? (
              products.map((product, index) => 
              product && (
                <Link
                  to={`/product/${product._id}`} 
                  className="product-link"
                  style={{marginTop: '5vh', textDecoration: 'none'}}
                  key={product._id}
                >
                  <Card 
                  style={{ 
                    width: '18rem', 
                    marginBottom: '20px',
                    }}>
                    <Card.Img 
                    variant="top" 
                    src={product.imageURL} 
                    alt={product.title} 
                    style={{border: '1px black solid'}}/>
                    <Card.Body>
                      <Card.Title>
                        <b>Title: </b> 
                        {truncateString(product.title)}
                        </Card.Title>
                      <Card.Text>
                        <b>Description: </b> 
                        {truncateString(product.description)}
                        </Card.Text>
                      <Card.Text>
                        <b>Rating: </b>
                        {truncateString(product.rating.average)}
                      </Card.Text>
                      <Card.Text>
                        <b>Location: </b> 
                        {truncateString(product.location)}
                        </Card.Text>
                      <Card.Text>
                        <b>Price: </b> 
                        {truncateString(product.price)}$
                        </Card.Text>
                      <Button variant="primary">More</Button>
                    </Card.Body>
                  </Card>
                </Link>
              )) 
            ) : (
              <p style={{textAlign: 'center', fontSize: '23px', color: 'white'}}>No products available</p>
            )}
            {lineState && <div ref={childRef} style={{height: '10px', background: 'green'}}/>}
          </div>
        )
      }
    </>
  );
}