require("dotenv").config();

const connectDB = require("./config/db");

// console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

const app = require("./app");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});