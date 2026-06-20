import { loadStripe } from "@stripe/stripe-js";

// Replace with your Stripe publishable key (pk_test_...)
export const stripePromise = loadStripe(
"pk_test51T0LKEBNAMGEN81F9bPb9xtgNgPUqfVrIysZCOoKMkanBU7E5Bwwqu5uMyGNIdmpRaWaeS3vLwcUW7lhjRuSjAY600b6rzfaCu"
);
