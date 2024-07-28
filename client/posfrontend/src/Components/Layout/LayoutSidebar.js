import { useMediaQuery } from "react-responsive";
import { Layout, Menu, Breadcrumb, Col, Tooltip, Row, Drawer } from "antd";
import { Link } from 'react-router-dom';
import "../Styles/LayoutStyles.css";
// import { MdPeople } from "react-icons/md";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    CloseOutlined
} from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;
const LayoutSidebar = ({ collapsed, onClose }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 840px)" });
    const layoutStyle = {
    }
    const items = (
        <>
            <Menu
                defaultSelectedKeys={["1"]}
                theme="dark"
                mode="inline"
                style={{ display: "flex", flexDirection: "column", alignItems: "center" }}

            >
                <div
                    className="logo"
                >
                    <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>

                    {/* {collapsed ? (
                <img src={logo} alt="App logo" width={70} />
              ) : (
                <img src={logo} alt="App logo" height={40} width={120} />
              )} */}

                </div>
                <Menu.Item key="/" icon={<HomeOutlined />} style={layoutStyle}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/CartList" icon={<CopyOutlined />} style={layoutStyle}>
                    <Link to="/CartList">Bills</Link>
                </Menu.Item>
                <Menu.Item key="/ItemsPage" icon={<UnorderedListOutlined />} style={layoutStyle}>
                    <Link to="/ItemsPage">Items</Link>
                </Menu.Item>
                <Menu.Item key="/CustomersPage" icon={<UserOutlined />} style={layoutStyle}>
                    <Link to="/CustomersPage">Customers</Link>
                </Menu.Item>
                <Menu.Item key="/logout" icon={<LogoutOutlined />} style={layoutStyle}>
                    Logout
                </Menu.Item>
            </Menu>

        </>
    );
    return (
        <>
            {isTabletOrMobile && (
                <Drawer
                    className="hideOnDesktop"
                    title={false}
                    closeIcon={<CloseOutlined />}
                    placement="left"
                    onClose={onClose}
                    visible={collapsed}

                >
                    {items}{" "}
                </Drawer>
            )}
            {/* when the screen is bigger sider will show automatically */}

            {!isTabletOrMobile && (
                <Sider
                    width={200}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    {items}{" "}
                </Sider>
            )}{" "}
        </>
    );
};

export default LayoutSidebar;
