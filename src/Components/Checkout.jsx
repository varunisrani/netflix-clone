import getStripe from "../lib/getStripe";
import Navbar from "./Navbar";
const Checkout = () => {
  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1Oqx80SFX8cScqnV7lE52v0W",
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `http://localhost:5173/success`,
      cancelUrl: `http://localhost:5173/cancel`,
      customerEmail: "solovpxofficial@email.com",
    });
    console.warn(error.message);
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="bg-[#141414] p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-white">Checkout</h1>
          <button
            onClick={handleCheckout}
            className="bg-[#E50914] text-white px-6 py-3 rounded-mdtransition duration-300"
          >
            Start Subscription
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
