import React from 'react'
import  playstore  from '../../../Images/playstore.png'
import appstore from '../../../Images/Appstore.png'
import './Footer.css'


const Footer = () => {
  return (
    <footer id='footer'>
        {/* left footer  */}
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playstore} alt="playstore" />
            <img src={appstore} alt="Appstore" />
        </div>
         
         {/* mid footer  */}
        <div className="midFooter">
            <h1>SMART BUY.</h1>
            <p>Customer satisfaction is our first priority</p>

            <p>Copyrights 2022 &copy; ManeeshMondal</p>
        </div>
        
        {/* right footer  */}
        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.linkedin.com/in/maneeshmondal11/">Linkedin</a>
            <a href="https://github.com/ManeeshMondal">Github</a>
            <a href="https://www.facebook.com/maneesh.mondal.92/">Facebook</a>
        </div>
    </footer>
      
    
  )
}

export default Footer
