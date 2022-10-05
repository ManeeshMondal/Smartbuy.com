import './App.css';
import React ,{useEffect} from 'react';
import Header from './components/layout/Header/Header'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom" 
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

function App() {
   
  const {isAuthenticated,user}=useSelector((state)=>state.user)
  useEffect(() => {
    console.log("====================user1================",user)
    store.dispatch(loadUser());
    console.log("====================user2================",user)
  }, [])

  console.log("====================user3================",user)
  


  return (
    <Router>
      <Header/>
       {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
          <Route exact path= "/" element={<Home/>}/>  
          <Route exact path= "/product/:id" element={<ProductDetails/>}/> 
          <Route exact path= "/products" element={<Products/>}/> 
          <Route  path= "/products/:keyword" element={<Products/>}/>  
          <Route exact path= "/search" element={<Search/>}/>  
          {isAuthenticated&&<Route exact path= "/account" element={<Profile/>}/> } 
          {isAuthenticated&&<Route exact path= "/me/update" element={<UpdateProfile/>}/> } 
          <Route exact path= "/login" element={<LogInSignUp/>}/> 
           
        </Routes>
      <Footer/>
    </Router>
    
  );
}

export default App;
