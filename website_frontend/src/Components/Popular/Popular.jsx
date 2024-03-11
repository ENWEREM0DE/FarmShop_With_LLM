import React from 'react'
import "./Popular.css"
import Item from "../Item/Item";
const Popular = (props) => {
  return (
    <div className={"popular"}>
      <h1>Popular Farm Produce</h1>
      <hr/>
      <div className={"popular-item"}>
        {props.data.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
        })}
      </div>
    </div>
  )
}

export default Popular