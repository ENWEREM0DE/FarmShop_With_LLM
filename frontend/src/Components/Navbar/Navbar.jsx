import React, {useContext, useRef, useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {Link} from "react-router-dom";
import {ShopContext} from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <Link style={{textDecoration:"none"}} to='/' onClick={()=>{setMenu("shop")}} className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </Link>
            <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
            <ul ref = {menuRef} className = {"nav-menu"} >
                <li onClick = {()=> {setMenu("shop")}}><Link style={{textDecoration:"none"}} to='/'>Shop< /Link>{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("plantProduce")}}><Link style={{textDecoration:"none"}} to={'/plantProduce'}>Plant Produce</Link>{menu==="plantProduce"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("animalProduce")}}><Link style={{textDecoration:"none"}} to={'/animalProduce'}>Animal Produce</Link>{menu==="animalProduce"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("packaged")}}><Link style={{textDecoration:"none"}} to={'/packagedFoods'}>Packaged Foods</Link>{menu==="packaged"?<hr/>:<></>}</li>
                <li onClick={() => {setMenu("supplies")}}><Link style={{textDecoration:"none"}} to={'farmSupplies'}>Farm Supplies</Link>{menu==="supplies"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar

