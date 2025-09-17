import { useState } from "react";

import {
  User,
  Save,
  Edit3,
  Building,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { transactionServices } from "../../../data/services";

interface SenderData {
  amount: string;
  senderName: string;
  bankAccountNumber: string;
  currency: "JPY";
  source: "SMBC" | "AEON";
}

const TopUpPage = () => {
  const [senderData, setSenderData] = useState<SenderData>({
    amount: "",
    senderName: "",
    bankAccountNumber: "",
    source: "SMBC",
    currency: "JPY",
  });

  const [transactionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({
    type: "",
    text: "",
  });

  // useEffect(() => {
  //   // Extract transaction ID from URL parameters
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const id = urlParams.get("transactionId") || urlParams.get("id") || "";
  //   setTransactionId(id);
  // }, []);

  const handleInputChange = (field: keyof SenderData, value: string) => {
    setSenderData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear any previous messages
    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    // if (!transactionId) {
    //   setMessage({ type: "error", text: "Transaction ID is required" });
    //   return;
    // }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await transactionServices.depositToWallet({
        source: senderData.source,
        currency: senderData.currency,
        senderName: senderData.senderName,
        amount: parseFloat(senderData.amount) ?? 0.0,
        bankAccountNumber: senderData.bankAccountNumber,
      });

      if (result) {
        setMessage({
          type: "success",
          text: "Transaction sender information updated successfully!",
        });
      } else {
        throw new Error("Update failed");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Update failed:", error);

      setMessage({
        type: "error",
        text: "Failed to update transaction. Please try again.",
      });

      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return Object.values(senderData).every((value) => {
      return value.trim() !== "";
    });
  };

  // if (isLoading && !senderData.actualSenderName) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--umoney-primary-color)] mx-auto mb-4"></div>
  //         <p className="text-gray-600">{"Loading transaction data..."}</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div
      className={
        "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4"
      }
    >
      <div className={"max-w-2xl mx-auto"}>
        <div className={"bg-white rounded-2xl shadow-xl overflow-hidden"}>
          {/* Header */}
          <div
            className={
              "bg-gradient-to-r from-[var(--umoney-primary-color)] to-[var(--umoney-primary-color-2)] px-6 py-8"
            }
          >
            <div className={"flex items-center space-x-3"}>
              <Edit3 className={"h-8 w-8 text-white"} />
              <div>
                <h1 className={"text-2xl font-bold text-white"}>
                  {"Simulate Deposit"}
                </h1>
                <p className={"text-indigo-100 mt-1"}>
                  {"Transaction ID: "}
                  <span
                    className={
                      "font-mono bg-[var(--umoney-primary-color-2)] px-2 py-1 rounded text-sm"
                    }
                  >
                    {transactionId || "Not provided"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={"p-6 space-y-6"}>
            {/* Bank Name Field */}
            <div className={"space-y-2"}>
              <label
                className={
                  "flex items-center text-sm font-semibold text-gray-700"
                }
              >
                <Building className={"h-4 w-4 mr-2 text-[var()]"} />
                {"Bank Name"}
              </label>
              <select
                defaultValue={"SMBC"}
                onChange={(e) => handleInputChange("source", e.target.value)}
                className={
                  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--umoney-primary-color-2)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white font-mono"
                }
              >
                <option value={"SMBC"}>{"SMBC"}</option>
                <option value={"AEON"}>{"AEON Bank"}</option>
              </select>
            </div>

            {/* Bank Number Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <CreditCard className="h-4 w-4 mr-2 text-[var(--umoney-primary-color)]" />
                {"Bank Account Number"}
              </label>
              <input
                type={"text"}
                value={senderData.bankAccountNumber}
                onChange={(e) =>
                  handleInputChange("bankAccountNumber", e.target.value)
                }
                className={
                  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--umoney-primary-color-2)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white font-mono"
                }
                placeholder={"Enter bank account number"}
                required
              />
            </div>

            {/* Sender Name Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 mr-2 text-[var(--umoney-primary-color)]" />
                Sender Name
              </label>
              <input
                type="text"
                value={senderData.senderName}
                onChange={(e) =>
                  handleInputChange("senderName", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--umoney-primary-color-2)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Enter sender full name"
                required
              />
            </div>

            {/* Send Amount Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <DollarSign className="h-4 w-4 mr-2 text-[var(--umoney-primary-color)]" />
                {"Send Amount"}
              </label>
              <input
                type="number"
                value={senderData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={
                  "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--umoney-primary-color-2)] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white font-mono"
                }
                placeholder={"Enter amount"}
                min={"0"}
                step={"0.01"}
                required
              />
            </div>

            {/* Message Display */}
            {message.text && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                <p className="flex items-center">
                  <span className="font-medium">{message.text}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            {message.type !== "success" ? (
              <button
                type={"submit"}
                disabled={!isFormValid() || isLoading}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isFormValid() && !isLoading
                    ? "bg-gradient-to-r from-[var(--umoney-primary-color)] to-[var(--umoney-primary-color-2)] hover:from-[var(--umoney-primary-color)] hover:to-[var(--umoney-primary-color-2)] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div
                      className={
                        "animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                      }
                    ></div>
                    <span>{"Updating..."}</span>
                  </>
                ) : (
                  <>
                    <Save
                      className={`${isFormValid() ? "text-white" : ""} h-5 w-5`}
                    />
                    <span className={`${isFormValid() ? "text-white" : ""}`}>
                      {"Deposit To Wallet"}
                    </span>
                  </>
                )}
              </button>
            ) : (
              <button
                disabled={!isFormValid() || isLoading}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isFormValid() && !isLoading
                    ? "bg-gradient-to-r from-[var(--umoney-primary-color)] to-[var(--umoney-primary-color-2)] hover:from-[var(--umoney-primary-color)] hover:to-[var(--umoney-primary-color-2)] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => {
                  setSenderData({
                    amount: "",
                    senderName: "",
                    bankAccountNumber: "",
                    source: "SMBC",
                    currency: "JPY",
                  });

                  setMessage({ type: "", text: "" });
                }}
              >
                <span className={`${isFormValid() ? "text-white" : ""}`}>
                  {"New transaction"}
                </span>
              </button>
            )}
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              {"Make sure all information is accurate before submitting"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
