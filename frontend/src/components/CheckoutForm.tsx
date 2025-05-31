import React from "react";
import { User, MapPin, CreditCard } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Props {
  formData: FormData;
  formErrors: FormErrors;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatCardNumber: (value: string) => string;
  formatExpiryDate: (value: string) => string;
  formatCvv: (value: string) => string;
}

const CheckoutForm: React.FC<Props> = ({
  formData,
  formErrors,
  handleInputChange,
  formatCardNumber,
  formatExpiryDate,
  formatCvv,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User size={20} />
          Contact Information
        </h2>
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.fullName && (
            <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
          )}
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center gap-2">
          <MapPin size={18} />
          Shipping Address
        </h3>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.address && (
            <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.city && (
              <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.state ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.state && (
              <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.zipCode ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.zipCode && (
              <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
            )}
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-4 flex items-center gap-2">
          <CreditCard size={18} />
          Payment Information
        </h3>
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formatCardNumber(formData.cardNumber)}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              if (formatted.length <= 19) {
                handleInputChange(e as React.ChangeEvent<HTMLInputElement>);
                e.target.value = formatted;
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formErrors.cardNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {formErrors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formatExpiryDate(formData.expiryDate)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                if (rawValue.length <= 4) {
                  handleInputChange({
                    target: {
                      name: "expiryDate",
                      value: rawValue,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.expiryDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.expiryDate}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formatCvv(formData.cvv)}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                if (rawValue.length <= 3) {
                  handleInputChange({
                    target: {
                      name: "cvv",
                      value: rawValue,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              maxLength={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors.cvv ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.cvv && (
              <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
