import { useContext } from "react";
import Base from "./Base";
import { CartContext } from "./CartContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Button } from "@mui/material";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);

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
              return (
                <>
                  <div className="cart-item-container d-flex m-4 justify-content-between">
                    <div
                      className="image-container"
                      style={{ width: "200px", height: "160px" }}
                    >
                      <img
                        className="rounded img-fluid"
                        style={{ width: "100%", height: "100%" }}
                        src={item.productInfo.productImageLink}
                      />
                    </div>

                    <div className="cart-item-details">
                      <h6>{item.productInfo.productName}</h6>
                      <p>₹{item.productInfo.productRent} / mo</p>
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
                        console.log("delete item from cart!");
                      }}
                    >
                      <i
                        style={{ color: "#E97451" }}
                        className="fa-solid fa-trash fa-lg"
                      />
                    </Button>
                  </div>
                  <hr></hr>
                </>
              );
            })}
        </div>
        <div id="cart-details-section">
          <div className="d-flex pt-3 ps-3">
            <p className="m-0">Cost Breakup</p>
          </div>
          <hr></hr>
          <div>
            <h6 className="ps-3 pe-1">Items to rent</h6>
            <hr></hr>
            {cartItems &&
              cartItems.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="item d-flex justify-content-between ps-3 pe-3">
                      <p className="m-0"><small>{item.productInfo.productName} X {item.selectedTenure} Months</small></p>
                      <p className="m-0">₹{item.rentForWholeTenure}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
            <div className="total-payable d-flex justify-content-between ps-3 pe-3">
              <h6>Grand Total</h6>
              <p>₹{cartItems.reduce((total, item)=> total + item.rentForWholeTenure, 0)}</p>
            </div>
            <div className="ps-3 pe-3 pt-5">
              <Button id="checkout-btn" size="large" fullWidth>₹{cartItems.reduce((total, item)=> total + item.rentForWholeTenure, 0)}&nbsp;&nbsp;&nbsp;&nbsp; Proceed &nbsp;<i class="fa-solid fa-arrow-right"></i></Button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
