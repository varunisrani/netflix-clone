import { RiCheckLine } from "react-icons/ri"; // Importing the checkmark icon from React Icons
import Navbar from "./Navbar";
import getStripe from "../lib/getStripe";

const Changeplan = () => {
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
  return (
    <>
      <div className="bg-[#141414] h-screen">
        <Navbar />
        <div className="flex flex-col justify-center items-center">
          {" "}
          <h1 className="text-white text-5xl font-medium mt-20">
            Choose the plan that’s right for you
          </h1>
          <div className="flex flex-row mt-10">
            <RiCheckLine color="red" size={30} />
            <h1 className="uppercase text-white/35 mt-1 ml-3">
              Watch on your phone, tablet, laptop, and TV
            </h1>
          </div>
          <div className="flex flex-row mt-5">
            <RiCheckLine color="red" size={30} />
            <h1 className="uppercase text-white/35 mt-1 ml-3">
              Unlimited movies and TV shows
            </h1>
          </div>
          <div className="flex flex-row mt-5">
            <RiCheckLine color="red" size={30} />
            <h1 className="uppercase text-white/35 mt-1 ml-3">
              Change or cancel your plan anytime
            </h1>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center mt-10 gap-5">
          <button className="bg-red-600 rounded-lg p-12 text-white">
            Mobile
          </button>
          <button className="bg-red-600 rounded-lg p-12 text-white">
            Basic
          </button>
          <button className="bg-red-600 rounded-lg p-12 text-white">
            Standard
          </button>
          <button className="bg-red-600 rounded-lg p-12 text-white">
            Premium
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            className="p-3 w-1/5 mt-20 rounded-lg text-white bg-red-600 "
            onClick={handleCheckout}
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default Changeplan;
