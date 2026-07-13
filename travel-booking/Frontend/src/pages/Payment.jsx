import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentCard from "../components/payments/PaymentCard";
import { createPaymentIntent } from "../api/paymentApi";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const location = useLocation();
const booking = location.state?.booking;

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {
  if (!booking) return;

  console.log("Booking Object:", booking);

  const getClientSecret = async () => {
    try {
      setLoading(true);
console.log("Booking:", booking);
console.log("Amount:", booking.totalPrice);
console.log("Booking ID:", booking._id);

 const data = await createPaymentIntent({
  amount: booking.totalPrice,
  bookingId: booking._id,
});
      console.log("Payment Intent:", data);

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err.response?.data);
      setError(err.response?.data?.message || "Unable to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  getClientSecret();
}, [booking]);

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Loading Payment...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-red-600 text-xl">
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="container mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-10">
          Secure Stripe Payment
        </h1>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
              },
            }}
          >
            <PaymentCard
              booking={booking}
              clientSecret={clientSecret}
            />
          </Elements>
        )}

      </div>

    </div>
  );
};

export default Payment;