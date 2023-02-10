import { ADD_TO_CART,REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from "../Constants/CartConstant"
import axios from "axios"


// add to cart 
export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
      const {data} = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
  
      dispatch({ type:ADD_TO_CART , payload:{
         product:data.product._id,
         name:data.product.name,
         price:data.product.price,
        // image:data.product.image[0].url,
        // image:sample-image,
         stock:data.product.stock,
         quantity,
      } });

      localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
  };

  // REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
   dispatch({
     type: REMOVE_CART_ITEM,
     payload: id,
   });
 
   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
 };

 // save shipping info
 export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
  