import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./Reducers/Productreducer";
import { ProfileReducer, UserReducer } from "./Reducers/UserReducer";
import { CartReducer } from "./Reducers/CartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./Reducers/OrderReducer";



const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer ,
    user:UserReducer,
    profile:ProfileReducer,
    cart:CartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer
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
