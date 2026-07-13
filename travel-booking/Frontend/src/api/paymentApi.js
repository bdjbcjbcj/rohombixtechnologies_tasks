import API from "./axios";

// Create Payment Intent
export const createPaymentIntent = async (paymentData) => {
  console.log("Sending paymentData:", paymentData);

  const response = await API.post(
    "/payment/create-payment-intent",
    paymentData
  );

  return response.data;
};

// Save Payment
export const savePayment = async (paymentData) => {
  try {
    const response = await API.post(
      "/payment/save-payment",
      paymentData
    );

    return response.data;
  } catch (error) {
    console.error("Save Payment Error:", error);
    throw error;
  }
};

// Payment History
export const getPaymentHistory = async () => {
  try {
    const response = await API.get("/payment/history");

    return response.data;
  } catch (error) {
    console.error("Payment History Error:", error);
    throw error;
  }
};