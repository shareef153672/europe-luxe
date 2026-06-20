const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Backend package pricing database
// Important: final payment price must always come from backend, not frontend
const packages = [
  {
    id: "grand-europe-discovery",
    title: "Grand Europe Discovery",
    description: "7 Countries | 11 Days | 10 Nights",
    price: 325000,
    currency: "inr",
  },
  {
    id: "grand-europe-express",
    title: "Grand Europe Express",
    description: "5 Countries | 7 Days | 6 Nights",
    price: 225000,
    currency: "inr",
  },
];

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { packageId } = req.body;

    if (!packageId) {
      return res.status(400).json({
        success: false,
        error: "Package ID is required.",
      });
    }

    const selectedPackage = packages.find((pkg) => pkg.id === packageId);

    if (!selectedPackage) {
      return res.status(404).json({
        success: false,
        error: "Package not found.",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: selectedPackage.currency,
            product_data: {
              name: selectedPackage.title,
              description: selectedPackage.description,
            },
            unit_amount: selectedPackage.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/package/${selectedPackage.id}`,
      metadata: {
        packageId: selectedPackage.id,
        packageTitle: selectedPackage.title,
        packagePrice: selectedPackage.price,
        currency: selectedPackage.currency,
      },
    });

    return res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to create checkout session. Please try again later.",
    });
  }
});

module.exports = router;