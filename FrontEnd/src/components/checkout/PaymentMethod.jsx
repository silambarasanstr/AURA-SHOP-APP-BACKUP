import { useState, useEffect } from "react";

const COD_FEE = 30;

const paymentOptions = [
  {
    id: "cod",
    label: "Cash on Delivery",
  },
];

const PaymentMethod = ({ baseTotal = 0, onPaymentChange }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    onPaymentChange?.({
      method: paymentMethod,
      codFee: COD_FEE,
    });
  }, []);

  const handlePaymentMethod = (id) => {
    setPaymentMethod(id);

    onPaymentChange?.({
      method: id,
      codFee: id === "cod" ? COD_FEE : 0,
    });
  };

  return (
    <div>
      <p className="mb-2 text-lg font-medium tracking-wide text-gray-800 uppercase">
        Payment Method
      </p>

      {paymentOptions.map(({ id, label }) => (
        <div key={id}>
          <div
            onClick={() => handlePaymentMethod(id)}
            className={`flex items-center gap-3 p-3 mb-2 transition border cursor-pointer rounded-xl ${
              paymentMethod === id
                ? "border-green-500 bg-green-50 ring-1 ring-green-300"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                paymentMethod === id ? "border-green-600 bg-green-600" : "border-gray-300"
              }`}
            >
              {paymentMethod === id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{label}</p>
            </div>
          </div>

          {paymentMethod === id && (
            <div className="p-4 mb-3 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-start gap-2">
                <i className="flex-shrink-0 mt-0.5 text-lg text-green-600 ti ti-info-circle" />

                <p className="text-xs leading-relaxed text-gray-500">
                  COD available up to ₹5,000. An additional ₹{COD_FEE}
                  handling fee applies. Please keep exact change ready.
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
