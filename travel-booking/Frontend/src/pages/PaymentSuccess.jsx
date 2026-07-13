import { Link, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const location = useLocation();

  const payment = location.state?.paymentIntent;

  const booking = location.state?.booking;

  return (
    <div className="min-h-screen flex justify-center items-center bg-green-50">

      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xl w-full">

        <div className="text-center">

          <div className="text-6xl">
            ✅
          </div>

          <h1 className="text-4xl font-bold text-green-600 mt-4">
            Payment Successful
          </h1>

          <p className="text-gray-600 mt-3">
            Your payment has been completed successfully.
          </p>

        </div>

        <div className="mt-8 space-y-3">

          <div className="flex justify-between">
            <span>Destination</span>
            <span>{booking?.destination}</span>
          </div>

          <div className="flex justify-between">
            <span>Amount Paid</span>
            <span>${booking?.totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span>Payment Status</span>
            <span className="text-green-600 font-bold">
              {payment?.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Transaction ID</span>
            <span className="text-xs">
              {payment?.id}
            </span>
          </div>

        </div>

        <div className="mt-8">

          <Link
            to="/dashboard/bookings"
            className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            View My Bookings
          </Link>

        </div>

      </div>
    </div>
  );
}