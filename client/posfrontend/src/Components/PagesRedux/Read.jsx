import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, showUser } from "../features/createAction";
import { searchUser } from "../Redux/Features/userDetailSlice";
import { deleteUser, showUser } from "../Redux/Features/createAction";
import {
    Card,
    Table,
    Row,
    Col,Button,Space,Modal, notification,
  } from "antd";
  import {
    DeleteOutlined,PlusCircleOutlined
  } from "@ant-design/icons";
import { Link } from "react-router-dom";
  
const Read = () => {
  const dispatch = useDispatch();

  const { users, loading, searchData ,error} = useSelector((state) => state.app);
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState("");

  const [id, setId] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchDatap, setSearchData] = useState("");
  const onFinish1 = (values) => {
    console.log("values:", values);
  };
  const onFinish = (values) => {
    console.log("values:", values);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleDelete = (item) => {
    console.log(item, "id");
    dispatch(deleteUser(item));
    dispatch(showUser());
    setIsModalOpen(false);
  };
  useEffect(() => {
    dispatch(searchUser(searchDatap));
  }, [searchDatap]);

  useEffect(() => {
    dispatch(showUser());
  }, []);
  const columns = [

    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
    //   for sorting id 
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
  
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name",
         //   for sorting name 
         // for sorting string we use localeCompare
      onFilter: (value, record) => record.first_name.indexOf(value) === 0,
      sorter: (a, b) => a.first_name.localeCompare(b.first_name),
      sortDirections: ["descend", "ascend"],
    },
    {
        title: " Gender",
        dataIndex: "gender",
        key: "gender",
           //   for sorting name 
           // for sorting string we use localeCompare
        onFilter: (value, record) => record.gender.indexOf(value) === 0,
        sorter: (a, b) => a.gender.localeCompare(b.gender),
        sortDirections: ["descend", "ascend"],
      },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        //   for sorting email 
        // for sorting string we use localeCompare
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortDirections: ["descend", "ascend"],
      },

    ,
    {
      title: "Actions",
      key: "action",
      render: (text, item) => (
        <Space size="middle">
            <Link to={`/Edit/${item.id}`}>
          <Button
            title="Edit"
             type="primary"
            style={{background:'#008212'}}
          >
            Edit
          </Button></Link>
          <Button type="primary" danger onClick={showModal}>
            Delete
          </Button>
          <Modal
            open={isModalOpen}
            footer={
              <div style={{ textAlign: "center" }}>
                <Button
                  key="cancel"
                  onClick={handleCancel}
                  style={{ marginRight: 25 }}
                >
                  Cancel
                </Button>
                <Button
                  key="delete"
                  type="primary"
                  danger
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </div>
            }
            // onOk={() => handleDelete(item.id)}
            // onCancel={handleCancel}
          >
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlined style={{ fontSize: "50px", color: "red" }} />
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Are you sure?
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Do you really want to delete this customer? This process can not
              be undone.
            </p>
          </Modal>
        </Space>
      ),
    },
  ];
  if (loading) {
    return (
      <div className="vh-100 ">
        <p className="align-middle">Loading...</p>
      </div>
    );
  }

  const openModal = (elementId) => {
    setId(elementId);
    setShowPopup(true);
  };

  return (
    <Row>
    <Col md={24} lg={24} xl={24}>
    <Card>
    <Link to="/CreateUser">

    <Button
            style={{
              justifyContent: "center",
              marginBottom: "20px",
              marginLeft: "45px",
              backgroundColor:"#306850 ",
              color:'#fff',
              width:'200px',
              height:'50px'
            }}
          >
            <PlusCircleOutlined /> Add New Customer
          </Button></Link>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        size="small"
        bordered
        style={{ fontSize: "4px" }}
      />
 
    
    </Card>
  </Col></Row>
  );
};

export default Read;