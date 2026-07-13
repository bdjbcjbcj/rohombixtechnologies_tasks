
// import { useState } from "react";
// import {
//   CreditCard,
//   Wallet,
//   Landmark,
//   Lock,
//   CheckCircle,
// } from "lucide-react";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [loading, setLoading] = useState(false);

//   const [cardDetails, setCardDetails] = useState({
//     cardHolder: "",
//     cardNumber: "",
//     expiry: "",
//     cvv: "",
//   });

//   const [mobileNumber, setMobileNumber] = useState("");

//   const [errors, setErrors] = useState({});

//   if (!location.state) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <h1 className="text-3xl font-bold text-red-600">
//           No Booking Found
//         </h1>
//       </div>
//     );
//   }

//   const {
//     destination,
//     package: packageData,
//     booking,
//     totalPrice,
//   } = location.state;

//   // Works for both destination and package
//   const item = destination || packageData;

//   const handleCardChange = (field, value) => {
//     setCardDetails((prev) => ({ ...prev, [field]: value }));
//     // Clear the field's error as soon as the user starts typing
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const handleMobileChange = (value) => {
//     setMobileNumber(value);
//     if (errors.mobileNumber) {
//       setErrors((prev) => ({ ...prev, mobileNumber: undefined }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (paymentMethod === "card") {
//       if (!cardDetails.cardHolder.trim()) {
//         newErrors.cardHolder = "Card holder name is required";
//       }

//       if (!cardDetails.cardNumber.trim()) {
//         newErrors.cardNumber = "Card number is required";
//       } else if (!/^\d{13,19}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
//         newErrors.cardNumber = "Enter a valid card number";
//       }

//       if (!cardDetails.expiry.trim()) {
//         newErrors.expiry = "Expiry date is required";
//       } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry.trim())) {
//         newErrors.expiry = "Use MM/YY format";
//       }

//       if (!cardDetails.cvv.trim()) {
//         newErrors.cvv = "CVV is required";
//       } else if (!/^\d{3,4}$/.test(cardDetails.cvv.trim())) {
//         newErrors.cvv = "Enter a valid CVV";
//       }
//     }

//     if (paymentMethod === "jazzcash" || paymentMethod === "easypaisa") {
//       if (!mobileNumber.trim()) {
//         newErrors.mobileNumber = "Mobile number is required";
//       } else if (!/^03\d{9}$/.test(mobileNumber.trim())) {
//         newErrors.mobileNumber = "Enter a valid number (03XXXXXXXXX)";
//       }
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handlePayment = () => {
//     if (!validate()) {
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);

//       alert("Payment Successful!");

//       navigate("/");
//     }, 2500);
//   };

//   return (
//     <section className="min-h-screen bg-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-6">

//         <h1 className="text-4xl font-bold text-center mb-10">
//           Secure Payment
//         </h1>

//         <div className="grid lg:grid-cols-2 gap-10">

//           {/* Booking Summary */}

//           <div className="bg-white rounded-2xl shadow-lg p-8">

//             <h2 className="text-2xl font-bold mb-6">
//               Booking Summary
//             </h2>

//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-64 rounded-xl object-cover"
//             />

//             <div className="mt-6 space-y-3">

//               <p>
//                 <strong>
//                   {destination ? "Destination" : "Package"}:
//                 </strong>{" "}
//                 {item.name}
//               </p>

//               {destination && (
//                 <p>
//                   <strong>Country:</strong> {item.country}
//                 </p>
//               )}

//               {packageData && (
//                 <>
//                   <p>
//                     <strong>Location:</strong> {item.location}
//                   </p>

//                   <p>
//                     <strong>Duration:</strong> {item.duration}
//                   </p>
//                 </>
//               )}

//               <p>
//                 <strong>Name:</strong> {booking.name}
//               </p>

//               <p>
//                 <strong>Email:</strong> {booking.email}
//               </p>

//               <p>
//                 <strong>Phone:</strong> {booking.phone}
//               </p>

//               <p>
//                 <strong>Travel Date:</strong> {booking.date}
//               </p>

//               <p>
//                 <strong>Travelers:</strong> {booking.travelers}
//               </p>

//             </div>

//             <div className="mt-8 bg-blue-50 rounded-xl p-6">

//               <h3 className="text-xl font-bold text-blue-700">
//                 Total Amount
//               </h3>

//               <p className="text-4xl font-bold text-green-600 mt-2">
//                 ${totalPrice}
//               </p>

//             </div>

//           </div>

//           {/* Payment Section */}

//           <div className="bg-white rounded-2xl shadow-lg p-8">

//             <h2 className="text-2xl font-bold mb-8">
//               Choose Payment Method
//             </h2>

//             <div className="space-y-4">

//               <label className="border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-blue-500">

//                 <div className="flex gap-3 items-center">
//                   <CreditCard className="text-blue-600" />
//                   Credit / Debit Card
//                 </div>

//                 <input
//                   type="radio"
//                   checked={paymentMethod === "card"}
//                   onChange={() => {
//                     setPaymentMethod("card");
//                     setErrors({});
//                   }}
//                 />

//               </label>

//               <label className="border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-blue-500">

//                 <div className="flex gap-3 items-center">
//                   <Wallet className="text-green-600" />
//                   JazzCash
//                 </div>

//                 <input
//                   type="radio"
//                   checked={paymentMethod === "jazzcash"}
//                   onChange={() => {
//                     setPaymentMethod("jazzcash");
//                     setErrors({});
//                   }}
//                 />

//               </label>

//               <label className="border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-blue-500">

//                 <div className="flex gap-3 items-center">
//                   <Landmark className="text-purple-600" />
//                   Easypaisa
//                 </div>

//                 <input
//                   type="radio"
//                   checked={paymentMethod === "easypaisa"}
//                   onChange={() => {
//                     setPaymentMethod("easypaisa");
//                     setErrors({});
//                   }}
//                 />

//               </label>

//             </div>

//             {paymentMethod === "card" && (
//               <div className="mt-8 space-y-4">

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Card Holder Name"
//                     value={cardDetails.cardHolder}
//                     onChange={(e) => handleCardChange("cardHolder", e.target.value)}
//                     className={`w-full border rounded-xl p-4 ${
//                       errors.cardHolder ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.cardHolder && (
//                     <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>
//                   )}
//                 </div>

//                 <div>
//                   <input
//                     type="text"
//                     placeholder="Card Number"
//                     value={cardDetails.cardNumber}
//                     onChange={(e) => handleCardChange("cardNumber", e.target.value)}
//                     className={`w-full border rounded-xl p-4 ${
//                       errors.cardNumber ? "border-red-500" : ""
//                     }`}
//                   />
//                   {errors.cardNumber && (
//                     <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">

//                   <div>
//                     <input
//                       type="text"
//                       placeholder="MM/YY"
//                       value={cardDetails.expiry}
//                       onChange={(e) => handleCardChange("expiry", e.target.value)}
//                       className={`border rounded-xl p-4 w-full ${
//                         errors.expiry ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.expiry && (
//                       <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
//                     )}
//                   </div>

//                   <div>
//                     <input
//                       type="password"
//                       placeholder="CVV"
//                       value={cardDetails.cvv}
//                       onChange={(e) => handleCardChange("cvv", e.target.value)}
//                       className={`border rounded-xl p-4 w-full ${
//                         errors.cvv ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.cvv && (
//                       <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
//                     )}
//                   </div>

//                 </div>

//               </div>
//             )}

//             {paymentMethod === "jazzcash" && (
//               <div className="mt-8">
//                 <input
//                   type="text"
//                   placeholder="03XXXXXXXXX"
//                   value={mobileNumber}
//                   onChange={(e) => handleMobileChange(e.target.value)}
//                   className={`w-full border rounded-xl p-4 ${
//                     errors.mobileNumber ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.mobileNumber && (
//                   <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
//                 )}
//               </div>
//             )}

//             {paymentMethod === "easypaisa" && (
//               <div className="mt-8">
//                 <input
//                   type="text"
//                   placeholder="03XXXXXXXXX"
//                   value={mobileNumber}
//                   onChange={(e) => handleMobileChange(e.target.value)}
//                   className={`w-full border rounded-xl p-4 ${
//                     errors.mobileNumber ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.mobileNumber && (
//                   <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
//                 )}
//               </div>
//             )}

//             <button
//               onClick={handlePayment}
//               disabled={loading}
//               className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2"
//             >
//               {loading ? (
//                 "Processing..."
//               ) : (
//                 <>
//                   <Lock size={18} />
//                   Pay ${totalPrice}
//                 </>
//               )}
//             </button>

//             <div className="mt-8 flex justify-center items-center gap-2 text-green-600">

//               <CheckCircle size={20} />

//               <span>100% Secure Payment</span>

//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Payment;