import { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/history");

      const data = await res.json();

      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "succeeded":
        return "bg-green-500";

      case "processing":
        return "bg-yellow-500";

      case "requires_payment_method":
        return "bg-red-500";

      case "canceled":
        return "bg-red-600";

      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-8">
        Payment History
      </h2>

      {payments.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No payment history found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Booking</th>
                <th className="p-4 text-left">Booking Type</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Payment Method</th>
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="border-b hover:bg-gray-100"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4">
                    {payment.bookingId?.destination ||
                      payment.bookingId?.packageName ||
                      "N/A"}
                  </td>

                  <td className="p-4">
                    {payment.bookingType}
                  </td>

                  <td className="p-4">
                    ${payment.amount}
                  </td>

                  <td className="p-4 capitalize">
                    {payment.paymentMethod}
                  </td>

                  <td className="p-4">
                    <span className="text-xs">
                      {payment.transactionId}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(
                      payment.createdAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;