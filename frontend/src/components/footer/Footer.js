import React from 'react'
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

//‎ e caracter invizibil

const Footer = () => {
    return(
        <div className='--flex-center --py2 '>
            <p>You can find us on ‎‎‎</p>  
            <a href="https://www.instagram.com/bogdantopliceanu/">
                <BsInstagram size={22} style={{ fill: 'black' }}/>    
            </a>
            <p>‎     ‎</p>
            <a href="https://www.facebook.com/profile.php?id=100009722102676">
                <BsFacebook size={22} style={{ fill: 'black' }}/>    
            </a>
            <p>‎     ‎</p>
            <a href="https://twitter.com/__bogdy__">
                <BsTwitter size={22} style={{ fill: 'black' }}/>    
            </a> 
        </div>
    )
}

export default Footer