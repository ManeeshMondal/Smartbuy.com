import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ProductDetailsReducer, ProductReducer } from "./Reducers/Productreducer";
import { UserReducer } from "./Reducers/UserReducer";



const reducer = combineReducers({
    products:ProductReducer,
    productDetails:ProductDetailsReducer ,
    user:UserReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
