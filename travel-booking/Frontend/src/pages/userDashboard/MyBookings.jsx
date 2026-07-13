import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const [destinationRes, packageRes] = await Promise.all([
        fetch("http://localhost:5000/api/booking"),
        fetch("http://localhost:5000/api/package-booking"),
      ]);

      const destinationData = await destinationRes.json();
      const packageData = await packageRes.json();

      // Destination Bookings
      const destinationBookings = (destinationData.bookings || []).map(
        (booking) => ({
          _id: booking._id,
          destination: booking.destination,
          country: booking.country,
          date: booking.date,
          travelers: booking.travelers,
          totalPrice: booking.totalPrice,
          bookingStatus: booking.bookingStatus,
          bookingType: "Destination",
        }),
      );

      // Package Bookings
   const packageBookings = (packageData.bookings || []).map((booking) => ({
  _id: booking._id,
  destination: booking.destination || booking.packageName,
  packageName: booking.packageName,
  location: booking.location,
  date: booking.date,
  travelers: booking.travelers,
  totalPrice: booking.totalPrice,

  paymentStatus: booking.paymentStatus,

  bookingType: "Package",
}));

      // Merge both bookings
      setBookings([...destinationBookings, ...packageBookings]);
    } catch (error) {
      console.error(error);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
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
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-8">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No bookings found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={`${booking.bookingType}-${booking._id}`}
              className="bg-white rounded-xl shadow-lg border p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">  {booking.destination || booking.packageName}
</h3>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    booking.bookingType === "Destination"
                      ? "bg-blue-600"
                      : "bg-purple-600"
                  }`}
                >
                  {booking.bookingType}
                </span>
              </div>

              <div className="space-y-2">
                {/* Destination Booking */}
                {booking.bookingType === "Destination" && (
                  <p>
                    <strong>Country:</strong> {booking.country}
                  </p>
                )}

                {/* Package Booking */}
                {booking.bookingType === "Package" && (
                  <>
                    <p>
                      <strong>Package:</strong> {booking.packageName || "N/A"}
                    </p>

                    <p>
                      <strong>Location:</strong> {booking.location || "N/A"}
                    </p>
                  </>
                )}

                <p>
                  <strong>Date:</strong>{" "}
                  {booking.date
                    ? new Date(booking.date).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Travelers:</strong> {booking.travelers}
                </p>

                <p>
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    {booking.bookingStatus || booking.paymentStatus}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
