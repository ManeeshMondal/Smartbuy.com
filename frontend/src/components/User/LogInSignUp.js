import React, { Fragment, useRef, useState,useEffect } from "react";
import "./LogInSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link,useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import Profile from "../../Images/Profile.png"
import { useSelector,useDispatch } from "react-redux";
import { clearingError,login,register} from "../../Actions/UserAction";
import { useAlert } from "react-alert";

const LogInSignUp = (history) => {
  const dispatch=useDispatch();
  const alert= useAlert();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const navigate=useNavigate()

  const {error,loading,isAuthenticated} = useSelector((state)=>state.user)

  const [user, setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const {name,email,password}=user;

  const [avatar, setAvatar] = useState(Profile)
  const [avatarPreview, setAvatarPreview] = useState(Profile)

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange=(e)=>{
    e.preventDefault();
    if(e.target.name==="avatar"){
       const reader=new FileReader();

       reader.onload=()=>{
        if(reader.readyState===2){
          setAvatarPreview(reader.result);
          setAvatar(reader.result)
        }
       }

    }
    else{
      setUser({...user,[e.target.name]:e.target.value})
    }
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearingError)
    }
    if(isAuthenticated){
      navigate("/myprofile")
      
    }
  }, [dispatch,error,alert,navigate,isAuthenticated])
  
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading?<Loader/>:
         <Fragment>
         <div className="LoginSignUpContainer">
           <div className="LoginSignUpBox">
             <div>
               <div className="login_signUp_toggle ">
                 <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                 <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
               </div>
               <button ref={switcherTab}></button>
             </div>
             <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
               <div className="loginEmail">
                 <MailOutlineIcon />
                 <input
                   type="email"
                   placeholder="Email"
                   required
                   value={loginEmail}
                   onChange={(e) => setLoginEmail(e.target.value)}
                 />
               </div>
               <div className="loginPassword">
                 <LockOpenIcon />
                 <input
                   type="password"
                   placeholder="Password"
                   required
                   value={loginPassword}
                   onChange={(e) => setLoginPassword(e.target.value)}
                 />
               </div>
               <Link to="/password/forgot">Forget Password ?</Link>
               <input type="submit" value="Login" className="loginBtn" />
             </form>
   
             <form
               className="signUpForm"
               ref={registerTab}
               encType="multipart/form-data"
               onSubmit={registerSubmit}
             >
               <div className="signUpName">
                 <FaceIcon />
                 <input
                   type="text"
                   placeholder="Name"
                   required
                   name="name"
                   value={name}
                   onChange={registerDataChange}
                 />
               </div>
               <div className="signUpEmail">
                 <MailOutlineIcon />
                 <input
                   type="email"
                   placeholder="Email"
                   required
                   name="email"
                   value={email}
                   onChange={registerDataChange}
                 />
               </div>
               <div className="signUpPassword">
                 <LockOpenIcon />
                 <input
                   type="password"
                   placeholder="Password"
                   required
                   name="password"
                   value={password}
                   onChange={registerDataChange}
                 />
               </div>
   
               <div id="registerImage">
                 <img src={avatarPreview} alt="Avatar Preview" />
                 <input
                   type="file"
                   name="avatar"
                   accept="image/*"
                   onChange={registerDataChange}
                 />
               </div>
               <input type="submit" value="Register" className="signUpBtn" />
             </form>
           </div>
         </div>
       </Fragment>}
    </Fragment>
  );
};

export default LogInSignUp;
