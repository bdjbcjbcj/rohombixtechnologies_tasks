import { useEffect, useState } from "react";

const CancelBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const [destinationRes, packageRes] = await Promise.all([
        fetch("http://localhost:5000/api/booking"),
        fetch("http://localhost:5000/api/package-booking"),
      ]);

      const destinationData = await destinationRes.json();
      const packageData = await packageRes.json();

      const destinationBookings = (destinationData.bookings || []).map(
        (booking) => ({
          ...booking,
          bookingType: "destination",
        }),
      );

      const packageBookings = (packageData.bookings || []).map((booking) => ({
        ...booking,
        bookingType: "package",
      }));

      setBookings([...destinationBookings, ...packageBookings]);
    } catch (error) {
      console.log(error);
      alert("Failed to load bookings");
    }
  };

  const cancelBooking = async (id, type) => {
    const confirmCancel = window.confirm("Cancel this booking?");

    if (!confirmCancel) return;

    try {
      const url =
        type === "destination"
          ? `http://localhost:5000/api/booking/${id}`
          : `http://localhost:5000/api/package-booking/${id}`;

      const res = await fetch(url, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        loadBookings();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-8">Cancel Booking</h2>

      <div className="space-y-5">
        {bookings.length === 0 ? (
          <h2 className="text-center text-xl">No Bookings Found</h2>
        ) : (
          bookings.map((booking) => (
            <div
              key={`${booking.bookingType}-${booking._id}`}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {booking.bookingType === "destination"
                    ? booking.destination
                    : booking.packageName}
                </h3>

                <p>{booking.date ? booking.date.slice(0, 10) : "N/A"}</p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded text-white text-sm ${
                    booking.bookingType === "destination"
                      ? "bg-blue-600"
                      : "bg-purple-600"
                  }`}
                >
                  {booking.bookingType === "destination"
                    ? "Destination Booking"
                    : "Package Booking"}
                </span>
              </div>

              <button
                onClick={() => cancelBooking(booking._id, booking.bookingType)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CancelBooking;
