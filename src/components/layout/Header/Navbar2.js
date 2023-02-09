import React from "react";
// import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
//     const [keyword, setKeyword] = useState("");
//   let navigate = useNavigate();

//   const searchSubmitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/products/${keyword}`);
//     } else {
//       navigate("/products");
//     }
//   };

  return (
    <div>
      {/* <!-- Navbar --> */}
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        {/* <!-- Container wrapper --> */}
        <div className="container-fluid">
            {/* <!-- Toggle button --> */}
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars"></i>
            </button>

            {/* <!-- Collapsible wrapper --> */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Navbar brand --> */}
            <a className="navbar-brand mt-2 mt-lg-0" href="/">
                <img
                src="https://static.wixstatic.com/media/4f5c54_ba3897313141466b902756c27fbb57b7~mv2.png/v1/crop/x_32,y_141,w_728,h_604/fill/w_362,h_300,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4f5c54_ba3897313141466b902756c27fbb57b7~mv2.png"
                height="15"
                alt="MDB Logo"
                loading="lazy"
                style={{height: " 31px"}}
                />
            </a>
            {/* <!-- Left links --> */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/products">Product</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
                </li>
            </ul>
            {/* <!-- Left links --> */}
            {/* <form className="d-flex input-group w-auto mb-1">
            <input
               type="search"
               className="form-control rounded"
               placeholder="Search"
               aria-label="Search"
               aria-describedby="search-addon"
            />
            <button className="input-group-text text-white border-0" onSubmit={searchSubmitHandler}  id="search-addon">
                <i className="fas fa-search"></i>
            </button>
            </form> */}
               
            </div>

            {/* <!-- Collapsible wrapper --> */}

            {/* <!-- Right elements --> */}
            <div className="d-flex align-items-center">
            <a className="text-reset me-3" href="/search">
                <i className="fas fa-search" style={{color:"white"}}></i>
            </a>
            {/* <!-- Icon --> */}
            <a className="text-reset me-3" href="/cart">
                <i className="fas fa-shopping-cart" style={{color:"white"}}></i>
            </a>


            {/* <!-- Notifications --> */}
            <div className="dropdown">
                <a
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                href="/notification"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                >
                <li>
                    <a className="dropdown-item" href="/">Some news</a>
                </li>
                <li>
                    <a className="dropdown-item" href="/">Another news</a>
                </li>
                <li>
                    <a className="dropdown-item" href="/">Something else here</a>
                </li>
                </ul>
            </div>

            <a href="/login" aria-expanded="false" > <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                /></a>

            {/* <!-- Avatar --> */}
            {/* <div className="dropdown">
                <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="/profile"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
                >
                <img
                    src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                    className="rounded-circle"
                    height="25"
                    alt="Black and White Portrait of a Man"
                    loading="lazy"
                />
                </a>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                    <a className="dropdown-item" href="/myprofile">My profile</a>
                </li>
                <li>
                    <a className="dropdown-item" href="/settings">Settings</a>
                </li> 
                 <li>
                    <a className="dropdown-item" href="/logIn">LogIn</a>
                </li>
                </ul>
            </div> */}
            </div>
            {/* <!-- Right elements --> */}
        </div>
        {/* <!-- Container wrapper --> */}
        </nav>
{/* <!-- Navbar --> */}
    </div>
  );
};

export default Navbar2;
