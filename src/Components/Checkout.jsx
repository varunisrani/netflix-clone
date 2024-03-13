import { Link } from "react-router-dom";
import getStripe from "../lib/getStripe";
import Navbar from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { auth } from "./Auth/Login/firebase";
const Checkout = () => {
  const [user, loading] = useAuthState(auth);
  const [submitting] = useState(false);
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
      customerEmail: "xyz@gmail.com",
    });
    console.warn(error.message);
  }
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen bg-[#141414]">
          <ClipLoader
            color="red"
            loading={loading || submitting}
            size={120}
            aria-label="Loading Spinner"
            className="ml-10"
            data-testid="loader"
          />
        </div>
      </>
    );
  }

  return (
    <>
      {user ? (
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
      ) : (
        <div className="flex flex-col justify-center items-center font-bold text-5xl inset-0 absolute">
          Please Login to Access this Page
          <button className="text-xl bg-[#E50914] text-white w-20 p-4 flex justify-center items-center rounded-full">
            <Link to="/login">Login</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default Checkout;
