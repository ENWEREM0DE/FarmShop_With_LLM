import React, {useState} from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon  from '../Assets/cart_icon.png'
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
  return (
    <div className={'navbar'}>
      <div className={'nav-logo'}>
        <img src={logo} alt={""}/>
        <p>9Ja Farms</p>
      </div>
        <ul className={"nav-menu"}>
            <li onClick={()=>{setMenu("shop")}}>Shop {menu === "shop"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("fruits")}}>Fruits {menu === "fruits"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("vegetables")}}>Vegetables {menu === "vegetables"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("animals")}}>Animal Products {menu === "animals"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("packaged")}}>Packaged Foods {menu === "packaged"? <hr /> : <> </>}</li>
            <li onClick={()=>{setMenu("supplies")}}>Farm Supplies {menu === "supplies"? <hr /> : <> </>}</li>
        </ul>
        <div className={"nav-login-cart"}>
            <button>Login</button>
            <img src={cart_icon} alt={""}/>
            <div className={"nav-cart-count"}>
                10
            </div>
        </div>
    </div>
  )
}

export default Navbar