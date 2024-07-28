import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";
import "../Styles/LayoutStyles.css";
import { AddItem } from "../Redux/Features/ItemAction";

const Itemlist = ({ item }) => {
    const dispatch=useDispatch()
    const { Meta } = Card;
    const [cart, setCart] = useState([]);
    // const [cart, setCart] = useLocalStorageState('cart', {});

    const addToCart = (data) => {
        dispatch(AddItem([...cart,{...data,quantity:1}]))
        // setCart([...cart,{...data,quantity:1}])
        // localStorage.setItem('cart',JSON.stringify(cart))
    };
  
   useEffect(()=>{
    console.log(cart,'cartitem')
   },[cart])
  return (
    <div>
    <Card
      style={{ width: 240, marginBottom: 20 }}
      cover={<img alt={item.name} src={item.image} style={{ height: 200 }} />}
    >
      <Meta title={item.name} />
      <div className="item-button"> 
        <Button  onClick={() => addToCart(item)}>Add to cart</Button>
      </div>
    </Card>
  </div>
  )
}

export default Itemlist
