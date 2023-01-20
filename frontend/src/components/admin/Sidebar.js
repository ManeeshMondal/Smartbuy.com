import React from "react";
import "./sidebar.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
// import TreeView from '@mui/lab/TreeView';
// import TreeItem from '@mui/lab/TreeItem';
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
// import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  try {
    return (
         
        <div className="sidebar">
    
          <Link to="/">
            <img src="https://static.wixstatic.com/media/4f5c54_ba3897313141466b902756c27fbb57b7~mv2.png/v1/crop/x_32,y_141,w_728,h_604/fill/w_362,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4f5c54_ba3897313141466b902756c27fbb57b7~mv2.png" alt="SmartBuy " />
          </Link>
          <Link to="/admin/dashboard">
            <p>
              <DashboardIcon /> Dashboard
            </p>
          </Link>
          
          <Link to="/admin/products">
            <p>
              <PostAddIcon/>
              All Products
            </p>
          </Link>
          <Link to="/admin/product/new">
            <AddIcon/>
             Add Product
          </Link>
          <Link to="/admin/orders">
            <p>
              <ListAltIcon />
              Orders
            </p>
          </Link>
          <Link to="/admin/users">
            <p>
              <PeopleIcon /> Users
            </p>
          </Link>
          <Link to="/admin/reviews">
            <p>
              <RateReviewIcon />
              Reviews
            </p>
          </Link>
        </div>
    
       
      );
  } catch (error) {
     console.log(error)
  }
 
};

export default Sidebar;