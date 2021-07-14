import React from "react";
import Navbar from "./navbar"
import"/styles/style.css"

const Layout = (props) => {
    return (
        <div>
            <Navbar/>
            <div className='container'>
                {props.children}
            </div>
        </div>

    )
}

export default Layout