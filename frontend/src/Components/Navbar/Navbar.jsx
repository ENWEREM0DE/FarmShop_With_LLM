import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon  from '../Assets/cart_icon.png'
import {Link} from "react-router-dom";
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
  return (
    <div className={'navbar'}>
      <div className={'nav-logo'}>
        <img src={logo} alt={""}/>
        <p>9JA FARMS</p>
      </div>
        <ul className={"nav-menu"}>
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to={'/'}> Shop </Link>{menu === "shop"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("fruits")}}><Link style={{textDecoration: 'none'}} to={'/fruits'}>Fruits</Link> {menu === "fruits"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("vegetables")}}><Link style={{textDecoration: 'none'}} to={'/vegetables'}>Vegetables</Link> {menu === "vegetables"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("animals")}}><Link style={{textDecoration: 'none'}} to={'/animalProducts'}>Animal Products</Link> {menu === "animals"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("packaged")}}><Link style={{textDecoration: 'none'}} to={'/packagedFoods'}>Packaged Foods</Link> {menu === "packaged"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("supplies")}}><Link style={{textDecoration: 'none'}} to={'farmSupplies'}>Farm Supplies</Link> {menu === "supplies"? <hr /> : <> </>}</li>
        </ul>
        <div className={"nav-login-cart"}>
            <Link style={{textDecoration: 'none'}} to={'/login'}><button>Login</button></Link>
            <Link style={{textDecoration: 'none'}} to={'/cart'}><img src={cart_icon} alt={""}/></Link>
            <div className={"nav-cart-count"}>
                10
            </div>
        </div>
    </div>
  )
}

export default Navbar