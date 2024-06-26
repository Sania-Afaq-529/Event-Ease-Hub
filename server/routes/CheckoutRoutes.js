const express = require("express");
const { checkoutBooking, checkAvailableDeals, changeOrderStatus, getUsersOrders, allOrder, addServiceProviderToOrder, getServiceProviderOrders, orderDetails, orderDelete, generalInfo } = require("../controller/CheckoutController");
const { verifyToken } = require("../services/authentication");

const checkout_routes = express.Router();

checkout_routes.post("/checkout",verifyToken, checkoutBooking);

checkout_routes.post("/check-available-deals",checkAvailableDeals);

checkout_routes.post("/update-order-status",changeOrderStatus);

checkout_routes.get("/get-users-orders",verifyToken, getUsersOrders);

checkout_routes.get("/get-all-orders",allOrder)

checkout_routes.post("/update-order",addServiceProviderToOrder);

checkout_routes.get("/get-provider-orders",verifyToken, getServiceProviderOrders);

checkout_routes.get("/get-order-details/:orderId",orderDetails)

checkout_routes.delete("/delete/:id", orderDelete);

checkout_routes.get("/general-info",generalInfo)

module.exports = {
    checkout_routes,
};