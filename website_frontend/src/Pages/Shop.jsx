import React, {useEffect, useState} from 'react'
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewProduce from "../Components/NewProduce/NewProduce";
import NewsLetter from "../Components/NewsLetter/NewsLetter";

const Shop = () => {
    const [popular, setPopular] = useState([]);
    const [newcollection, setNewCollection] = useState([]);

    const fetchInfo = () => {
        fetch('http://localhost:4000/popularinproduce')
            .then((res) => res.json())
            .then((data) => setPopular(data))
        fetch('http://localhost:4000/newcollections')
            .then((res) => res.json())
            .then((data) => setNewCollection(data))
    }

    useEffect(() => {
        fetchInfo();
    }, [])


    return (
    <div>
      <Hero/>
        <Popular data={popular}/>
        <Offers/>
      <NewProduce data={newcollection}/>
        <NewsLetter/>
    </div>
  )
}

export default Shop