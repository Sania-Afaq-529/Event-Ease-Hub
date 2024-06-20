const Stripe =  require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function checkoutSession(name,price){
    try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: name,
                },
                unit_amount: price * 100, // Stripe expects the amount in cents
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: "http://localhost:8081/success.html",
          cancel_url: 'https://your-domain.com/cancel',
        });
    
        return ({ id: session.id, url:session.url });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

function parseBudget(budgetStr) {
  const parts = budgetStr.split('-').map(part => part.trim().toLowerCase());

  if (parts.length === 2) {
    const minValue = parseInt(parts[0].replace('k', '')) * 1000;
    const maxValue = parseInt(parts[1].replace('k', '')) * 1000;

    if (minValue >= 75000) {
      return 100000;
    }

    return (minValue + maxValue) / 2;
  } else if (parts.length === 1) {
    return parseInt(parts[0].replace('k', '')) * 1000;
  } else {
    throw new Error('Invalid budget format');
  }
}


module.exports = {
    checkoutSession,
    parseBudget
}