import React, { useContext, useState } from "react";
import Base from "./Base";
import { CartContext } from "./CartContext";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { Button } from "@mui/material";
import { createSubscriptions } from "./helper/coreapicalls";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "react-stripe-js";
const stripePromise = loadStripe('pk_test_51NhwnFSG0YDsYJkoUDSUvCMzqvWlGdC32JEbn07N0N9y43TzRLBGPHd3Wssl1E9hzPdphLX9WzFYae09m7cAQoKD00vIfFsqPh');




const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("")
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 480,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
  const handleCheckout = async () => {
    const selectedProducts = cartItems;

    createSubscriptions(selectedProducts).then((response)=>{
      console.log('Response from createPaymentIntent', response);
      setClientSecret(response.clientSecret)
      handleOpen(true);
    });
  } 
 

  const CheckoutFormModal = () => {

    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm clientSecret={options.clientSecret}></CheckoutForm>
            </Elements>
          </Box>
        </Modal>
      </div>
    );
  };

  return (

    <Base navbar={true} footer={true}>
        <div className="container d-flex">
          <div id="cart-item-section">
            <div className="d-flex pt-3 ps-4">
              <p className="m-0">
                Rentvio Cart |<em> {cartItems && cartItems.length} Items</em>
              </p>
            </div>
            <hr></hr>
            {cartItems &&
              cartItems.map((item, index) => {
                // console.log(item);
                return (
                  <div key={index}>
                    <div  className="cart-item-container d-flex m-4 justify-content-between">
                      <div
                        className="image-container"
                        style={{ width: "200px", height: "160px" }}
                      >
                        <img
                          className="rounded img-fluid"
                          style={{ width: "100%", height: "100%" }}
                          alt="product"
                          src={item.productInfo.productImageLink}
                        />
                      </div>

                      <div className="cart-item-details">
                        <h6>{item.productInfo.productName}</h6>
                        <p>₹{item.productInfo.productRent} / mo</p>
                        <p>
                          Refundable Deposit: ₹
                          {item.productInfo.productRefundableDeposit}
                        </p>
                        <p>Delivery by 12 Aug</p>
                      </div>
                      <div className="cart-item-details">
                        <InputLabel id="tenure-label">Tenure</InputLabel>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <Select
                            labelId="tenure-label"
                            value={item.selectedTenure}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={item.selectedTenure}>
                              {item.selectedTenure}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <Button
                        style={{
                          backgroundColor: "#fff",
                          border: 0,
                          width: "8%",
                          height: 56,
                          margin: 10,
                        }}
                        id="delete-item-btn"
                        onClick={() => {
                          // console.log("delete item from cart!");
                        }}
                      >
                        <i
                          style={{ color: "#E97451" }}
                          className="fa-solid fa-trash fa-lg"
                        />
                      </Button>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
          </div>
          <div id="cart-details-section">
            <div className="d-flex pt-3 ps-3">
              <p className="m-0">Cost Breakup</p>
            </div>
            <hr></hr>
            <div>
              <h6 className="ps-3 pe-1">Items to rent {`(Monthly Payable)`}</h6>
              <hr></hr>
              {cartItems &&
                cartItems.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="item d-flex justify-content-between ps-3 pe-3">
                        <p className="m-0">
                          <small>
                            {item.productInfo.productName} X{" "}
                            {item.selectedTenure} Months
                          </small>
                        </p>
                        <p className="m-0">₹{item.productInfo.productRent}</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              <div className="total-payable-monthly d-flex justify-content-between ps-3 pe-3">
                <div>
                  <h6>Total Monthly Rent</h6>
                  <p style={{ fontSize: 10 }}>To be paid every month.</p>
                </div>
                <p>
                  ₹
                  {cartItems.reduce(
                    (total, item) => total + item.productInfo.productRent,
                    0
                  )}
                </p>
              </div>

              <div className="total-payable-now d-flex justify-content-between ps-3 pe-3">
                <h6>Total Payable Now</h6>
                <p>
                  ₹
                  {cartItems.reduce(
                    (total, item) =>
                      total + parseInt(item.productInfo.productRefundableDeposit),
                    0
                  )}
                </p>
              </div>
              <div className="ps-3 pe-3 pt-5">
                <Button
                  onClick={() => {
                    handleCheckout(cartItems);
                  }}
                  id="checkout-btn"
                  size="large"
                  fullWidth
                >
                  ₹
                  {cartItems.reduce(
                    (total, item) =>
                      total + parseInt(item.productInfo.productRefundableDeposit),
                    0
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp; Proceed &nbsp;
                  <i className="fa-solid fa-arrow-right"></i>
                </Button>
              </div>
            </div>
          </div>
        {<CheckoutFormModal/>}
        </div>
    </Base>

  );
};

export default Cart;
