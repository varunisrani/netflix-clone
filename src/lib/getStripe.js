import { loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51NGXiVSFX8cScqnVYufpbh8ws1kjaGjMNNpFM1kYzFYKCYAS3JKYFAetsD0vKQAchqgaGluahbKyrzkmI2z1QZDF00GJFwQhPF"
    );
  }
  return stripePromise;
};

export default getStripe;
