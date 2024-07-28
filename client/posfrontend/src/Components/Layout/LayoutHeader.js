import React from "react";
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Menu,
  Dropdown,
  Avatar,
} from "antd";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import  "../Styles/LayoutStyles.css";
import { useSelector } from "react-redux";
 
const { Title } = Typography;

const { Header } = Layout;
const LayoutHeader = ({ collapsed, setCollapsed }) => {
  const { cartitems, loading, searchData ,error} = useSelector((state) => state.Item);

//   var cart = JSON.parse(window.localStorage.getItem("cart"));
// console.log(cart.length)
  return (
    <Header style={{ padding: 0, background: "#fff" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "#000",
        }}
      />
      <></>
      <div style={{ float: "right", marginRight: "30px" }}>
        
            <div>
              <span id="iconMenu" style={{ marginRight: 4 }}>
                <Avatar
                  icon={<ShoppingCartOutlined />}
                  style={{
                    height: "40px",
                    marginLeft: "10px",
                    width: "40px",
                    justifyContent: "center",
                    color: '#fff'

                  }}
                />
                {cartitems.length}
              </span>
            </div>
        </div>{" "}
      {/* <span id="iconMenu" style={{ marginRight: 4 }}>
                <Avatar
                  icon={<ShoppingCartOutlined />}
                  style={{
                    height: "40px",
                    marginLeft: "10px",
                    width: "40px",
                    justifyContent: "center",
                    color:'#fff'

                  }}
                />
              </span> */}
      {/* <div
            className="cart-item d-flex jusitfy-content-space-between flex-row"
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div> */}
    </Header>
  );
};

export default LayoutHeader;
