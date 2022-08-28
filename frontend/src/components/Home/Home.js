import React, { Fragment,useEffect } from 'react'
// import { cgMouse } from 'react-icons/ai'
import './Home.css'
import Product from './ProductCard.js'
import MetaData from '../layout/MetaData'
import { clearingError, getProduct } from '../../Actions/ProductAction'
import {useDispatch,useSelector} from "react-redux"
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'





const Home = () => {
  const dispatch=useDispatch();
  const alert=useAlert();
  const {loading, error, products, productsCount}= useSelector(state=>state.products)
  useEffect(() => { 
    if (error) {
      alert.error(error);
      dispatch(clearingError)
    }
    dispatch(getProduct());
  }, [dispatch,error,alert])
  

  return (
    <Fragment>
      {loading?(<Loader />):(
        <Fragment>
        <MetaData title={"Smart Buy"}/>
         <div className="banner">
          <p>Welcome to SmartBuy</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
  
          <a  href='#container'>
              <button>
                  Explore
              </button>
          </a>
         </div>
  
         <h2 className="homeHeading">Featured Products</h2>
  
         <div className="container" id="container">
            
            {products && products.map((product)=><Product product={product} />)}
         </div>
  
      </Fragment> 
      )}
    </Fragment>
  )
}

export default Home
