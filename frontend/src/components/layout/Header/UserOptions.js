import React, { Fragment,useState,useEffect } from 'react'
import  './Header.css'
import { SpeedDial,SpeedDialAction } from '@mui/material'
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Profile from "../../../Images/Profile.png"
import { useAlert } from 'react-alert';
import { logout,clearingError } from '../../../Actions/UserAction';


const UserOptions = ({user}) => {
    const {cartItems}=useSelector((state)=>state.cart)
    const [open, setOpen] = useState(false)
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];
    
      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }

      function dashboard(){
        navigate("/dashBoard")
      }

      function orders(){
        navigate("/orders")
      }

      function account(){
        navigate("/account")
      }
      function cart(){
        navigate("/cart")
      }
      
      function logoutUser(){
        dispatch(logout());
        navigate("/")
        alert.success("Logout Successfully")
      }

      useEffect(() => {
       
      }, [dispatch,alert,navigate])
  return (
    <Fragment>
       <Backdrop open={open} style={{ zIndex: "10" }} />
       <SpeedDial 
           ariaLabel="SpeedDial tooltip example"
           onClose={() => setOpen(false)}
           onOpen={() => setOpen(true)}
           open={open}
           direction="down"
           className='speedDial'
           style={{ zIndex: "11" }}
           icon={
            <img
              className="speedDialIcon"
              src={user?.avatar?.url ? user?.avatar?.url : "/Profile.png"}
              alt="Profile"
            />
          }>
          
          {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
       </SpeedDial>
    </Fragment>
  )
}

export default UserOptions