import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import plant_banner from "./Components/Assets/plant_banner.jpeg"
import animal_banner from "./Components/Assets/animal_banner.jpeg"
import packaged_banner from "./Components/Assets/packaged_banner.jpeg"
import supplies_banner from "./Components/Assets/supplies_banner.jpeg"

function App() {
  return (
    <div>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Shop/>}/>
                <Route path={'/plantProduce'} element={<ShopCategory banner={plant_banner} category={"plantProduce"}/>}/>
                <Route path={'/animalProduce'} element={<ShopCategory banner={animal_banner} category={"animalProduce"}/>}/>
                <Route path={'/packagedFoods'} element={<ShopCategory banner={packaged_banner} category={"packagedFoods"}/>}/>
                <Route path={'/farmSupplies'} element={<ShopCategory banner={supplies_banner} category={"farmSupplies"}/>}/>
                <Route path={'/product'} element={<Product />}>
                    <Route path={':productId'} element={<Product/>}/>
                </Route>
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/login'} element={<LoginSignup/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
