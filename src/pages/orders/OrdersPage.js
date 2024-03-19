import React from "react";
import { styled } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Base from "../../components/Base";

// Dummy Data
const rows = [
  // Replace this data structure with your actual data fetched from the database
  { id: 1, date: "2023-04-20", total: 239.97, status: "Shipped" },
  { id: 2, date: "2023-04-18", total: 599.49, status: "Delivered" },
  { id: 3, date: "2023-04-15", total: 102.96, status: "Processing" },
];

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const OrdersPage = () => {
  return (
    <Base navbar={true} footer={true}>
      <div className="container">
        <Box sx={{ p: 3, marginTop: 8 }}>
          <Typography variant="h4" gutterBottom>
            <i
              style={{ color: "#5271FF" }}
              className="fa-solid fa-cart fa-lg"
            ></i>
            Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Total ($)</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </Base>
  );
};

export default OrdersPage;
