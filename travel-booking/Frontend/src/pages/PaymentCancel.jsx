import { Link } from "react-router-dom";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-red-50">

      <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full text-center">

        <div className="text-6xl">
          ❌
        </div>

        <h1 className="text-4xl font-bold text-red-600 mt-4">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mt-4">
          Your payment was cancelled or could not be completed.
        </p>

        <div className="mt-8 flex gap-4 justify-center">

          <Link
            to="/payment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
          >
            Home
          </Link>

        </div>

      </div>
    </div>
  );
}