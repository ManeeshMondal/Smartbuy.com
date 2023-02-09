import React, { Fragment, useState,useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import {useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
// import Profile from "../../Images/Profile.png"
import { useSelector,useDispatch } from "react-redux";
import { clearingError,loadUser,updateProfile} from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch=useDispatch();
  const alert= useAlert();
  const navigate= useNavigate();


  const { user} = useSelector((state)=>state.user)
  const {error,isUpdated, loading} = useSelector((state)=>state.profile)


  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState()
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png")

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = {};

    myForm["name"]=  name;
    myForm["email"]= email;
    myForm["avatar"]=avatar;
    // console.log("==========",myForm["name"],myForm["avatar"],myForm["email"],"==========")
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange=(e)=>{
    e.preventDefault();
    if(e.target.name==="avatar"){
      //  const reader=new FileReader();

      //  console.log("reader.readyState", reader.readyState)
      //  reader.onload=()=>{
      //   if(reader.readyState===2){
      //     setAvatarPreview(reader.result);
      //     setAvatar(reader.result)
        // }
      //  }
      const formData = new FormData();
       // Update the formData object
       formData.append(
        "myFile",
        e.target.files[0]
      );
    
          setAvatarPreview(e.target.files[0]);
          setAvatar(e.target.files[0])
      // Details of the uploaded file
      console.log(e.target.files[0])

    }
  }
  
  useEffect(() => {
    if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
      }

    if (error) {
        alert.error(error);
        dispatch(clearingError());
      }
  
      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
  
        navigate("/account");
  
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
  }, [dispatch,error,alert,navigate,user,isUpdated])

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdateProfile
