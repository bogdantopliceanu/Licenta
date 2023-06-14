import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const Layout = ({children}) => {
    return(
        <>
            <Header/>
            <div style={{minHeight: "80vh"}} className="--pad">  
                {children}
            </div>
            <Footer/>

        </>
    );
}
//80vh  - 80% viewpoint height
export default Layout