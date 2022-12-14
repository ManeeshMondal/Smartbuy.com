import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailsReducer, ProductReducer } from "./Reducers/Productreducer";
import { ProfileReducer, UserReducer } from "./Reducers/UserReducer";
import { CartReducer } from "./Reducers/CartReducer";



const reducer = combineReducers({
    products:ProductReducer,
    productDetails:ProductDetailsReducer ,
    user:UserReducer,
    profile:ProfileReducer,
    cart:CartReducer
});

let initialState = {cart: {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo:localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : []
},};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
