import axios from "axios";
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
  } from "../Constants/ProductConstant";

  
// get all products 
  export const getProduct=(keyword="",currentPage=1,price=[0,150000],category,ratings=0)=> async (dispatch)=>{
    try {
        dispatch({
            type:ALL_PRODUCT_REQUEST
        })

        let link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category){
          link=`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }
        const {data}=await axios.get(link)
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
            
        });
    } catch (error) {
        dispatch({
           type:ALL_PRODUCT_FAIL,
           payload:error.response.data.message,
        }) 
    }
  }

  // get product details 
  export const getProductDetails=(id)=> async (dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data}=await axios.get(`http://localhost:4000/api/v1/product/${id}`)
        dispatch({  
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product, 
        });
    } catch (error) {
        dispatch({
           type:PRODUCT_DETAILS_FAIL,
           payload:error.response.data.message,
        }) 
    }
  }

//   crearing the error 
  export const clearingError =()=>async(dispatch)=>{
       dispatch({
        type:CLEAR_ERRORS
       })
  }