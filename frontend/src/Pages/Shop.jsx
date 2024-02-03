import React from 'react'
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewProduce from "../Components/NewProduce/NewProduce";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <div>
      <Hero/>
        <Popular/>
        <Offers/>
      <NewProduce/>
        <NewsLetter/>
    </div>
  )
}

export default Shop