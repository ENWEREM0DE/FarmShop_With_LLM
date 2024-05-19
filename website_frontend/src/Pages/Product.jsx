import React, {useContext, useEffect, useState} from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import Comments from "../Components/Comments/Comments";

const Product = () => {
  const {all_product} = useContext(ShopContext);
  console.log("look here")
    console.log(all_product)
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId));
  const [numPositiveReviews, setNumPositiveReviews] = useState(0);
  const [numNegativeReviews, setNumNegativeReviews] = useState(0);
    // Set the initial state values when the product or relevant data changes
    useEffect(() => {
        if (product) {
            setNumPositiveReviews(product.positiveReviews);
            setNumNegativeReviews(product.negativeReviews);
        }
    }, [product]); // Ensure this effect runs only if `product` changes

    return (
      <div>
          <Breadcrums product={product}/>;
          <ProductDisplay product={product}/>
          <DescriptionBox
              numPositive={numPositiveReviews}
              numNegative={numNegativeReviews}
          />
          <Comments
              product={product}
              setNumPositiveReviews={setNumPositiveReviews}
              setNumNegativeReviews={setNumNegativeReviews}/>


      </div>
  )
}

export default Product
