import './App.css';
import React ,{useEffect} from 'react';
import Header from './components/layout/Header/Header'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom"
import Footer from './components/layout/Footer/Footer'
import Home from './components/Home/Home.js'
import ProductDetails from './components/Product/ProductDetails.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LogInSignUp from './components/User/LogInSignUp.js'
import store from './Store';
import {loadUser} from "./Actions/UserAction"
import { useSelector } from 'react-redux';
import UserOptions  from './components/layout/Header/UserOptions.js'
import Profile from './components/User/Profile.js'
import UpdateProfile from './components/User/UpdateProfile.js'
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder';
// import Payment from './components/Cart/Payment.js';
import OrderSuccess from './components/Cart/OrderSuccess.js';
import MyOrders from './components/Order/MyOrders.js';
import OrderDetails from './components/Order/OrderDetails.js';
// import axios from 'axios';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe} from '@stripe/stripe-js';
// import StripeCheckout from "react-stripe-checkout"; 
import DashBoard from "./components/admin/DashBoard.js"



function App() {
   
  const {isAuthenticated,user}=useSelector((state)=>state.user)

  // const [stripeApiKey, setStripeApiKey] = useState("");
  //const stripeApiKey="pk_test_51MEESkSBL8JUgvYSRUX9fn1keewk7zu97uUn9qCqrJaiD93YfWndvoCs2S42CYawPnbITBStb3lLUzvnFPFqw8BZ0026LOLfty"

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }
  // const stripeApiKey = document.getElementById('STRIPE_API_KEY').value;
  // const stripeApiKey = process.env.REACT_APP_STRIPE;
  // const stripeApiKey="pk_test_51MEESkSBL8JUgvYSRUX9fn1keewk7zu97uUn9qCqrJaiD93YfWndvoCs2S42CYawPnbITBStb3lLUzvnFPFqw8BZ0026LOLfty"

  useEffect(() => {
    store.dispatch(loadUser());
    // getStripeApiKey();
  }, [])

  


  return (
    <Router> 
      <Header/>
       {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
        {/* { stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey) } >
          {isAuthenticated&&<Route exact path= "/process/payment" element={<Payment/>}/> }
          </Elements>)} */}
          <Route exact path= "/" element={<Home/>}/>  
          <Route exact path= "/product/:id" element={<ProductDetails/>}/> 
          <Route exact path= "/products" element={<Products/>}/> 
          <Route  path= "/products/:keyword" element={<Products/>}/>  
          <Route exact path= "/search" element={<Search/>}/>  
          {isAuthenticated&&<Route exact path= "/account" element={<Profile/>}/> } 
          {isAuthenticated&&<Route exact path= "/me/update" element={<UpdateProfile/>}/> } 
          <Route exact path= "/login" element={<LogInSignUp/>}/> 
          <Route exact path= "/cart" element={<Cart/>}/> 
          {isAuthenticated&&<Route exact path= "/shipping" element={<Shipping/>}/> }
         
          {/* { stripeApiKey && (<StripeCheckout stripe={loadStripe(stripeApiKey) } >
          {isAuthenticated&&<Route exact path= "/payment/process" element={<Payment/>}/> }
          </StripeCheckout>)} */}

          {/* <Elements stripe={loadStripe(stripeApiKey) } >
          {isAuthenticated&&<Route exact path= "/process/payment" element={<Payment/>}/> }
          </Elements>
           */}
           {isAuthenticated&&<Route exact path= "/success" element={<OrderSuccess/>}/> }
           {isAuthenticated&&<Route exact path= "/orders" element={<MyOrders/>}/> }
           {isAuthenticated&&<Route exact path= "/order/confirm" element={<ConfirmOrder/>}/> }
           {isAuthenticated&&<Route exact path= "/order/:id" element={<OrderDetails/>}/> }

           {isAuthenticated&&<Route exact path= "/admin/dashboard" element={<DashBoard/>}/> }
           

        </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
