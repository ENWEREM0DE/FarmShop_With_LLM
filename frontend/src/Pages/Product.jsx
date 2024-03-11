import React, { useContext } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Product = () => {
  const {all_product} = useContext(ShopContext);
  console.log("look here")
    console.log(all_product)
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId));
  return (
      <div>
        <Breadcrums product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>

      </div>
  )
}

export default Product
