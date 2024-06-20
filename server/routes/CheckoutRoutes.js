const express = require("express");
const { checkoutBooking, checkAvailableDeals, changeOrderStatus, getUsersOrders } = require("../controller/CheckoutController");
const { verifyToken } = require("../services/authentication");

const checkout_routes = express.Router();

checkout_routes.post("/checkout",verifyToken, checkoutBooking);

checkout_routes.post("/check-available-deals",checkAvailableDeals);

checkout_routes.post("/update-order-status",changeOrderStatus);

checkout_routes.get("/get-users-orders",verifyToken, getUsersOrders);


module.exports = {
    checkout_routes,
};