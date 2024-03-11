import React, {useContext} from 'react'
import './CSS/ShopCategory.css'
import {ShopContext} from "../Context/ShopContext";
import dropDown from "../Components/Assets/dropdown_icon.png"
import Item from "../Components/Item/Item"
const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  console.log("In here")
  console.log(all_product)
  return (
    <div className={'shop-category'}>
      <img src={props.banner} className={'shopcategory-banner'}/>
      <div className={"shopcategory-indexSort"}>
        <p>
          <span> Showing 1-12</span> out of 36 Products
        </p>
        <div className={"shopcategory-sort"}>
          Sort by <img src={dropDown}/>
        </div>
      </div>
        <div className={"shopcategory-products"}>
            {all_product.map((item, index) => {
                if (props.category === item.category) {
                    return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price} />
                } else {
                    return null
                }
            })}
        </div>
        <div className={'shopcategory-loadmore'}>
            Explore More
        </div>
    </div>
  )
}

export default ShopCategory