import BookingSummary from "./BookingSummary";
import CheckoutForm from "./CheckoutForm";

const PaymentCard = ({
  booking,
  clientSecret,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">

      <BookingSummary booking={booking} />

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Secure Card Payment
        </h2>

        <CheckoutForm
          booking={booking}
          clientSecret={clientSecret}
        />

      </div>

    </div>
  );
};

export default PaymentCard;