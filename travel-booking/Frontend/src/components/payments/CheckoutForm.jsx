import { useState } from "react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";

import { savePayment } from "../../api/paymentApi";

export default function CheckoutForm({
  booking,
  clientSecret,
}) {
  const stripe = useStripe();

  const elements = useElements();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
            billing_details: {
              name: booking.name,
              email: booking.email,
            },
          },
        }
      );

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await savePayment({
          bookingId: booking._id,
          paymentIntentId: paymentIntent.id,
          transactionId: paymentIntent.id,
          amount: booking.totalPrice,
          status: paymentIntent.status,
          paymentMethod:
            paymentIntent.payment_method,
        });

        navigate("/payment-success", {
          state: {
            paymentIntent,
            booking,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="border rounded-lg p-5">

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
              },
            },
          }}
        />

      </div>

      {error && (
        <p className="text-red-500 mt-3">
          {error}
        </p>
      )}

      <button
        disabled={!stripe || loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-5 w-full"
      >
        {loading
          ? "Processing..."
          : `Pay $${booking.totalPrice}`}
      </button>

    </form>
  );
}