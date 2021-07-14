import React from "react";
import {Link} from "gatsby";
import"/styles/style.css"
const Navbar = () =>{
    return (
        <div className="navbar-wrapper">
            <ul className="navbar">
                <li>
                    <a id={"NavLink"} href={"/"}>
                        <img src={"/images/icon.png"}/>
                    </a>
                </li>
                <li>
                    <a id={"NavLink"} href={"/"}>Public Notes</a>
                </li>
                <li>
                    <a id={"NavLink"} href={"/notes"}>Private Notes</a>
                </li>
            </ul>
        </div>
    )
}

export default Navbar;