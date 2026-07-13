import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import Packages from "./pages/Packages";
import PackageDetails from "./components/packages/PackageDetails";
import DestinationDetails from "./components/Destinationpage/DestinationDetails";
import DestinationBooking from "./components/Destinationpage/DestinationBooking";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import DashboardLayout from "./pages/userDashboard/DashboardLayout";
import DashboardHome from "./pages/userDashboard/DashboardHome";
import MyBookings from "./pages/userDashboard/MyBookings";
import CancelBooking from "./pages/userDashboard/CancelBooking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import PaymentHistory from "./pages/PaymentHistory";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/about" element={<About />} />
        {/* </Route> */}
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/destination-booking/:id"
            element={<DestinationBooking />}
          />
        </Route>

        <Route path="/packages" element={<Packages />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/packages/:id" element={<PackageDetails />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* payment */}

        <Route path="/payment" element={<Payment />} />

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/payment-cancel" element={<PaymentCancel />} />

        <Route path="/Dashboard/payment-history" element={<PaymentHistory />} />

        {/* user dashboard */}

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="cancel-booking" element={<CancelBooking />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
