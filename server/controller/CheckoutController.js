const Booking = require("../models/Checkout");
const Deal = require("../models/DealModel");
const {checkoutSession, parseBudget} = require("../services/booking");

async function checkoutBooking(req, res) {
  console.log("req.body ------>", req.body);

  const { deal_id } = req.body;
if(deal_id){
  try {
    const deal = await Deal.findById(deal_id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    const stripe_res = await checkoutSession("Booking Event Management", deal.budget);

    const create_order = {
      budget: deal.budget,
      dealId: deal_id,
      userId: req.userId,
      sessionId: stripe_res.id,
      checkoutUrl: stripe_res.url,
      status: 'pending' // Make sure 'pending' is a string or replace it with the appropriate value
    };

    const order_created = await Booking.create(create_order);

    console.log("order_created with deal ------>", order_created);

    return res.json(stripe_res);

  } catch (err) {
    console.error('Error during checkout:', err);
    return res.status(500).json({ message: err.message });
  }
} else {
  const create_order = {
    userId:req.userId,
    event_type:req.body.event_type,
    food_menu:JSON.stringify(req.body.food_menu),
    location:req.body.location,
    services:JSON.stringify(req.body.services),
    theme:req.body.theme,
    budget:parseBudget(req.body.budget)
  }
  const stripe_res = await checkoutSession("Booking Event Management", parseBudget(req.body.budget));
  create_order.sessionId = stripe_res.id
try {
  const order_created = await Booking.create(create_order);
  console.log("order_created with deal ------>", order_created);
  
} catch (error) {
  console.log("Error while saving order",error)
}

  return res.json(stripe_res);

}
}

async function changeOrderStatus(req, res) {
  const { sessionId } = req.body;

  try {
    const order = await Booking.findOne({
      sessionId: sessionId
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = 'paid';
    await order.save();

    return res.status(200).json({ message: 'Order status updated to paid', order });

  } catch (err) {
    // Handle any errors
    return res.status(500).json({ message: err.message });
  }
}

async function getUsersOrders(req, res) {
  const userId = req.userId;
  const { status } = req.query;


  try {
    // Find all bookings for the user with the specified status
    const orders = await Booking.find({ userId: userId, status: status });

    if (!orders.length) {
      return res.status(404).json({ message: 'Orders not found' });
    }

    // Attach deal info if dealId exists
    const user_orders = await Promise.all(orders.map(async order => {
      if (order.dealId) {
        const deal = await Deal.findById(order.dealId);
        if (deal) {
          // Merge deal properties into order
          order = Object.assign(order._doc, {
            budget: deal.budget,
            name: deal.name,
            food_menu: deal.food_menu,
            city: deal.city,
            event_type: deal.event_type,
            services: deal.services,
          });
        }
      }
      return order;
    }));

    return res.status(200).json({ status: 200, orders: user_orders });

  } catch (err) {
    // Handle any errors
    return res.status(500).json({ message: err.message });
  }
}


async function checkAvailableDeals(req, res) {
  try {
      const { budget } = req.body;

      let budgetQuery = {};
      if (budget.includes('- more')) {
          const minBudget = parseInt(budget.replace('k - more', '')) * 1000;
          budgetQuery = { budget: { $gte: minBudget } };
      } else {
          const [minBudget, maxBudget] = budget.split(' - ').map(b => parseInt(b.replace('k', '')) * 1000);
          console.log("Parsed minBudget:", minBudget);
          console.log("Parsed maxBudget:", maxBudget);
          budgetQuery = { budget: { $gte: minBudget, $lte: maxBudget } };
      }

      const deals = await Deal.find(budgetQuery);
    
      res.status(201).json({ available_deals: deals });
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
}


module.exports = {
    checkoutBooking,
    checkAvailableDeals,
    changeOrderStatus,
    getUsersOrders
}