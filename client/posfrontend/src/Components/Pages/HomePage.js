import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import { useDispatch,useSelector } from "react-redux";
import { showItem } from "../Redux/Features/ProductAction";
import MainContent from "../Layout/MainContent";
import Itemlist from "./Itemlist";
import "../Styles/LayoutStyles.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const { item, loading, searchData ,error} = useSelector((state) => state.product);

useEffect(()=>{
    dispatch(showItem())
    console.log('item',item)
},[])

  return (
    <MainContent>
         <Row>
        {item.map((item) => (
          <Col xs={24} lg={6} md={12} sm={6}>
            <Itemlist item={item} />
          </Col>
        ))}
      </Row>
    </MainContent>
  )
}

export default HomePage
