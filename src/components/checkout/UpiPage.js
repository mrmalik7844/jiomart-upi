import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../../libs/jmData";
import "./UpiPage.scss";
import Swal from "sweetalert2";
const UpiPage = () => {
  const [time, setTime] = useState({ minutes: 2, seconds: 0 });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { id } = useParams();
  const productId = parseInt(id);
  const product = productData.find((item) => item.id === productId);
  const parsePrice = (priceString) =>
    parseFloat(priceString.replace("₹", "").replace(",", ""));
  const price = parsePrice(product.price);
  const actualPrice = parsePrice(product.actualPrice);
  const priceDifference = actualPrice - price;
  const formattedPriceDifference = priceDifference.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (time.seconds === 0) {
        if (time.minutes === 0) {
          // Reset the timer to 2 minutes when it reaches zero
          setTime({ minutes: 2, seconds: 0 });
        } else {
          setTime({ minutes: time.minutes - 1, seconds: 59 });
        }
      } else {
        setTime({ ...time, seconds: time.seconds - 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (val) => {
    return val < 10 ? `0${val}` : val;
  };

  const handleUPIPayment = () => {
    if (selectedPaymentMethod) {
      const upiId = "fcbizugfdtb@freecharge"; // UPI ID
      const amount = price; // Product price

      // Constructing UPI payment URL based on selected payment method
      let upiUrl;
      switch (selectedPaymentMethod) {
        case "PhonePe":
          upiUrl = `phonepe://pay?pa=${upiId}&am=${amount}&tn=JioMart Secure Payment&cu=INR`;
          break;
        case "GPay":
          upiUrl = `tez://upi/pay?pa=${upiId}&am=${amount}&tn=JioMart Secure Payment&cu=INR`;
          break;
        case "Paytm":
          upiUrl = `paytmmp://pay?pa=${upiId}&am=${amount}&tn=JioMart Secure Payment&cu=INR`;
          break;
        case "Other UPI App":
          upiUrl = `upi://pay?pa=${upiId}&am=${amount}&tn=JioMart Secure Payment&cu=INR`;
          break;
        default:
          break;
      }

      // Open the selected UPI app
      window.location.href = upiUrl;
    }
  };
  return (
    <div className="jm-checout-final-form">
      <section className="jm-checkout-upi-button-section">
        <div className="jm-checkout-upi-timer">
          <p>{`${formatTime(time.minutes)}min ${formatTime(
            time.seconds
          )}sec`}</p>
        </div>
        <div className="jm-checkout-upi-button-container">
          <div
            className={`jm-checkout-upi-button ${
              selectedPaymentMethod === "PhonePe"
                ? "jm-selected-upi"
                : "jm-unselected-upi"
            }`}
            onClick={() => setSelectedPaymentMethod("PhonePe")}
          >
            <img src={require("../../assets/phonepay.png")} alt="phonepe" />
            <p>PhonePe</p>
          </div>
          <div
            className={`jm-checkout-upi-button ${
              selectedPaymentMethod === "GPay"
                ? "jm-selected-upi"
                : "jm-unselected-upi"
            }`}
            onClick={() => setSelectedPaymentMethod("GPay")}
          >
            <img src={require("../../assets/gpay2.png")} alt="phonepe" />
            <p>GPay</p>
          </div>
          <div
            className={`jm-checkout-upi-button ${
              selectedPaymentMethod === "Paytm"
                ? "jm-selected-upi"
                : "jm-unselected-upi"
            }`}
            onClick={() => setSelectedPaymentMethod("Paytm")}
          >
            <img src={require("../../assets/paytm.png")} alt="phonepe" />
            <p>Paytm</p>
          </div>
          <div
            className={`jm-checkout-upi-button ${
              selectedPaymentMethod === "Other UPI App"
                ? "jm-selected-upi"
                : "jm-unselected-upi"
            }`}
            onClick={() => setSelectedPaymentMethod("Other UPI App")}
          >
            <img src={require("../../assets/upi.png")} alt="phonepe" />
            <p>Other UPI App</p>
          </div>
        </div>
        <div>
          <img
            src={require("../../assets/80.jpg")}
            alt="payment"
            className="jm-product-upi-banner"
          />
        </div>
      </section>
      <section className="jm-product-bottom-placeorder-section">
        <div className="jm-product-bottom-placeorder-container">
          <div className="jm-product-free-deleivry">
            Pay via UPI to get 10% off instantly!
          </div>
          <div className="jm-product-price-order-container">
            <div className="jm-product-detail-price-container">
              <p className="jm-product-detail-price-text">{product.price}</p>
              <p className="jm-product-detail-saved-price-text">
                You Saved ₹{formattedPriceDifference}.00
              </p>
            </div>
            <div className="jm-product-detail-place-order-container">
              <button
                className="jm-product-detail-order-text"
                onClick={() => {
                  handleUPIPayment();
                  setTimeout(() => {
                    Swal.fire({
                      icon: "error",
                      title: "Payment Failed",
                      text: "If the amount has been debited, it may take 24 hours for refund to your account. Don't worry your money is safe. Please try diffrent UPI method",
                    });
                  }, 5000);
                }}
              >
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpiPage;
