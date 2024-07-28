import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, notification, Space, Divider,Modal,Input,Form,Card, Typography} from "antd";
import "../Styles/LayoutStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { createItem, deleteItem, showItem } from "../Redux/Features/ProductAction";
import MainContent from "../Layout/MainContent";
import { DeleteOutlined, PlusCircleOutlined,EditFilled } from "@ant-design/icons";
import { useNavigate ,Link} from "react-router-dom";
const { Title } = Typography;

const ItemsPage = () => {
  const navigate = useNavigate();
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

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, item) => (
        <Space size="middle">
          <Link to={`Editproduct/${item._id}`}>
            <Button title="Edit" icon={<EditFilled />} type="primary" />
          </Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(item._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger="danger" icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const handleDelete = (item) => {
    console.log(item, "id");
    dispatch(deleteItem(item));
    Deletenotification("success");
  };

  const Deletenotification = (type) => {
    notification[type]({
      message: "Success",
      description: "record deleted succesfully",
    });
  };
  const dispatch = useDispatch();
  const { item, loading, searchData, error } = useSelector(
    (state) => state.product
  );
  const onFinish = (values) => {
    dispatch(createItem(values))
    console.log("values:", values);
    form.resetFields();
    setIsModalOpen(false);

  }
  useEffect(() => {
    dispatch(showItem());
  }, []);
  return (
    <MainContent>
      <div className="responsive-table-container">
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined />}
          size="large"
          style={{
            margin: "10px 1px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease",
          }}
          onClick={showModal}
        >
          Add Items
        </Button>
        <Table columns={columns} dataSource={item} pagination={false} />
      </div>
      {/* modal */}
      <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                    name="name"
                    rules={[
                      { required: true, message: "Please input your Name!", },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Price!",
                      },
                    ]}
                  >
                    <Input type="Price" placeholder="Price" />
                  </Form.Item>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Category!",
                      },
                    ]}
                  >
                    <Input type="Category" placeholder="Category" />
                  </Form.Item>
                  <Form.Item
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Image!",
                      },
                    ]}
                  >
                    <Input placeholder="Image" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      block
                    >
                      Add item
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
      </Modal>
    </MainContent>
  );
};

export default ItemsPage;
