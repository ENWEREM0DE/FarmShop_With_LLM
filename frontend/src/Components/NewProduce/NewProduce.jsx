import React from 'react'
import "./NewProduce.css"
import new_collections from "../Assets/new_collections";
import Item from "../Item/Item";
const NewProduce = (props) => {
  return (
    <div className={"new-produce"}>
        <h1>NEW PRODUCE</h1>
        <hr/>
        <div className={"collections"}>
            {props.data.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}

export default NewProduce