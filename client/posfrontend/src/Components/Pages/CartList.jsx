import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContent from '../Layout/MainContent';
import { Table, Button,Form,Modal,Input,Card, Typography } from 'antd';
import "../Styles/LayoutStyles.css";
import { createBill } from '../Redux/Features/billsAction';
const { Title } = Typography;

const CartList = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => {
        dispatch(createBill(values))
        console.log("values:", values);
        form.resetFields();
        setIsModalOpen(false);
    
      }
    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (image, record) => (
              <img src={image} alt={record.name} height="60" width="60" />
            ),
          },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
       
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantity',
            key: 'quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Quantity Action',
            key: 'Quantity Action',

            render: (text, record) => (
                <span>
                  
<Button type="primary" style={{ marginRight: '5px' }} onClick={() => increaseQuantity(record)}>Increase</Button>
<Button type="primary" danger  onClick={() => decreaseQuantity(record)}>Decrease</Button>

                </span>
            ),
        },
        // Add more columns as needed
    ];

    const dispatch = useDispatch();
    const { cartitems, loading, searchData, error } = useSelector((state) => state.Item);

    const [CART, setCART] = useState([])

    const increaseQuantity = (record) => {
        const updatedCART = CART.map(item => {
            if (item._id === record._id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            console.log(item)
            return item;
        });
        setCART(updatedCART);
    };

    const decreaseQuantity = (record) => {
        const updatedCART = CART.map(item => {
            if (item._id === record._id && item.quantity > 0) {
                return { ...item, quantity: item.quantity - 1 };
            }
            console.log(item)

            return item;
        });
        setCART(updatedCART);
    };
    useEffect(() => {
        console.log(cartitems, 'cartitems')
        setCART(cartitems)
    }, [cartitems])
    useEffect(() => {
        // Flatten the nested array cartitems into a single array of objects
        const flattenedData = cartitems.reduce((acc, innerArray) => {
            return [...acc, ...innerArray];
        }, []);
        setCART(flattenedData);

        console.log(flattenedData)
    }, [cartitems]);
    
    useEffect(() => {
        // Flatten the nested array cartitems into a single array of objects

        const total = CART.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
        const taxAmount = total * 0.10; // Calculate 10% tax
        const totaltaxamount = total + taxAmount;
        setTotalTax(totaltaxamount)
    }, [CART]);
    return (
      <MainContent>
        <div className="responsive-table-container">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2em",
              color: "#333",
              borderBottom: "2px solid #333",
              paddingBottom: "10px",
            }}
          >
            Cart Page
          </h1>
          <Table columns={columns} dataSource={CART} pagination={false} />
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              Total Price:
            </span>
            <span
              style={{ fontSize: "1.2em", marginLeft: "10px", color: "green" }}
            >
              {totalPrice}
            </span>
          </div>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              Total Price After Tax:
            </span>
            <span
              style={{ fontSize: "1.2em", marginLeft: "10px", color: "green" }}
            >
              {totalTax}
            </span>
          </div>
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
              <Button type="primary" onClick={showModal}>
                Create Invoice
              </Button>
            </span>
          </div>
        </div>
        {/* modal for invoice */}
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={{ width: 500 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#ffff",
                }}
              >
                <Title level={2}>Add New Item </Title>
              </div>
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="customerName"
                  rules={[
                    { required: true, message: "Please input your Name!" },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                  name="customerNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Customer Number!",
                    },
                  ]}
                >
                  <Input type="Cutomer Number" placeholder="Cutomer Number" />
                </Form.Item>
                <Form.Item
                  name="paymentMode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your paymentMode!",
                    },
                  ]}
                >
                  <Input type="Payment Mode" placeholder="Payment Mode" />
                </Form.Item>
                <Form.Item
                  name="totalAmount"
                  initialValue={totalPrice}
                  style={{ display: 'none' }} >
                <Input type="totalprice" placeholder="totalprice" />
                </Form.Item>
                <Form.Item
                  name="subTotal"
                  initialValue={totalTax}
                  style={{ display: 'none' }} >
                <Input type="taxprice" placeholder="taxprice" />
                </Form.Item>
                <Form.Item
                  name="tax"
                  initialValue={10}
                  style={{ display: 'none' }} >
                <Input type="tax" placeholder="tax" />
                </Form.Item>
                <Form.Item
                  name="cartItems"
                  initialValue={CART}
                  style={{ display: 'none' }} >
                <Input type="Cart" placeholder="Cart" />
                </Form.Item>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                    Total Price :
                  </span>
                  <span
                    style={{
                      fontSize: "1.2em",
                      marginLeft: "10px",
                      color: "green",
                    }}
                  >
                    {totalPrice}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                    Total Price After Tax:
                  </span>
                  <span
                    style={{
                      fontSize: "1.2em",
                      marginLeft: "10px",
                      color: "green",
                    }}
                  >
                    {totalTax}
                  </span>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                    onClick={showModal}
                  >
                    Create Invoice
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </Modal>
      </MainContent>
    );
}

export default CartList
