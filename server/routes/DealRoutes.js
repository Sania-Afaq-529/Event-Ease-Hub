const express = require("express");

const { createDeal, updateDeal, deleteDeal, getDeals, dealDetails } = require("../controller/DealsController");

const deal_routes = express.Router();

deal_routes.post("/create-deal", createDeal);

deal_routes.get("/deal-details/:id",dealDetails);

deal_routes.get("/get-all-deals", getDeals);

deal_routes.put("/update-deal:id", updateDeal);

deal_routes.delete("/delete-deal/:id", deleteDeal);

module.exports = {
    deal_routes,
};