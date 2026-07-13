let express = require("express");
let cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
let cookieParser = require("cookie-parser");
const Stripe = require("stripe");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const packageBookingRoute = require("./routes/packageBookingRoute");
require("dotenv").config();

let app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));


// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api", require("./routes/destinationBookingRoute"));
app.use("/api/package-booking", packageBookingRoute);


app.use("/api/otp", otpRoutes);
app.use("/api/payment", paymentRoutes);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);

// Test Route
app.get("/", (req, res) => {
  res.send("Travel Booking API Running");
});

module.exports = app;