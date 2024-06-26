
const Deal = require("../models/DealModel")

async function createDeal (req,res) {
    console.log("req.body ------>",req.body)
    try {
        const {name, budget, food_menu, location, event_type, services } = req.body;
        const deal = new Deal({
          budget,
          food_menu: JSON.stringify(food_menu),
          location,
          event_type,
          services: JSON.stringify(services),
          name,
        });
        await deal.save();
        res.status(201).json(deal);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

async function updateDeal (req,res) {
    try {
        const {name, budget, food_menu, location, event_type, services } = req.body;
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
          return res.status(404).json({ message: 'Deal not found' });
        }
        deal.budget = budget;
        deal.food_menu = JSON.stringify(food_menu);
        deal.location = location;
        deal.event_type = event_type;
        deal.services = JSON.stringify(services);
        deal.name = name
        await deal.save();
        res.json(deal);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

async function getDeals (req,res) {
    try {
        const deals = await Deal.find();
        const reverseDeals = deals.reverse();

        return res.send(reverseDeals);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function dealDetails (req,res) {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
          return res.status(404).json({ message: 'Deal not found' });
        }
        res.json(deal);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

async function deleteDeal (req,res) {
    try {
        const deal = await Deal.findByIdAndDelete(req.params.id);

        // return res.send(user_delete);
        if (!deal) {
          return res.status(404).json({ message: 'Deal not found' });
        }
        res.json({ message: 'Deal deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports = {
    createDeal,
    updateDeal,
    getDeals,
    deleteDeal,
    dealDetails
}