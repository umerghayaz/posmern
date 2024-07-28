import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import MainContent from "../Layout/MainContent";
import "../Styles/InvoiceStyle.css";
import { showBills } from "../Redux/Features/billsAction";

// import "../styles/InvoiceStyles.css";
const BillsPage = () => {
  const { bills, loading, searchData, error } = useSelector((state) => state.Bills);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8080/api/v1/bills/get-bills");
      setBillsData(data);
      console.log(data,'inside func');
    } catch (error) {
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    dispatch(showBills())
    // getAllBills();
    // setSelectedBill(bills)
    //eslint-disable-next-line
  }, []);
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //able data
  const columns = [
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerNumber" },
    { title: " Amount", dataIndex: "totalAmount" },
    { title: "Tax", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "subTotal" },


    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  console.log(selectedBill);
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
            Total Customers
          </h1>

      <Table columns={columns} dataSource={bills} bordered />
      </div>
      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>UTech POS</h2>
                <p> Contact : 0345-2104812 | Sindh Karachi</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {/* {selectedBill.cartItems.map((item) => ( */}
                    
                    {selectedBill && selectedBill.cartItems.map(item => (
    <tr className="service" key={item._id}>
        <td className="tableitem">
            <p className="itemtext">{item.name}</p>
        </td>
        <td className="tableitem">
            <p className="itemtext">{item.quantity}</p>
        </td>
        <td className="tableitem">
            <p className="itemtext">{item.price}</p>
        </td>
        <td className="tableitem">
            <p className="itemtext">{item.quantity * item.price}</p>
        </td>
    </tr>
))}
                        <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Total">
                        <h2>Total</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.totalAmount}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.subTotal}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount.Please note that this is non refundable amount
                  for any assistance please write email
                  <b> help@mydomain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </MainContent>
  );
};

export default BillsPage;