const BookingSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">

      <h2 className="text-2xl font-bold mb-6">
        Booking Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Destination</span>
          <span className="font-semibold">
            {booking.destination}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Name</span>
          <span>{booking.name}</span>
        </div>

        <div className="flex justify-between">
          <span>Email</span>
          <span>{booking.email}</span>
        </div>

        <div className="flex justify-between">
          <span>Phone</span>
          <span>{booking.phone}</span>
        </div>

        <div className="flex justify-between">
          <span>Travelers</span>
          <span>{booking.travelers}</span>
        </div>

        <div className="flex justify-between">
          <span>Travel Date</span>
          <span>{booking.date}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold text-green-600">
          <span>Total</span>
          <span>${booking.totalPrice}</span>
        </div>

      </div>

    </div>
  );
};

export default BookingSummary;