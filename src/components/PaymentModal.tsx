import React from 'react';
import { X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, amount, onPaymentComplete }: PaymentModalProps) {
  if (!isOpen) return null;

  const handlePayment = (method: string) => {
    // In a real app, this would integrate with actual payment gateways
    alert(`Processing payment of ₹${amount} via ${method}`);
    onPaymentComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Choose Payment Method</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xl font-bold mb-4">Total Amount: ₹{amount}</p>
          
          <button
            onClick={() => handlePayment('Google Pay')}
            className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-8" />
            <span>Pay with Google Pay</span>
          </button>

          <button
            onClick={() => handlePayment('PhonePe')}
            className="w-full flex items-center justify-center space-x-2 p-3 border rounded-lg hover:bg-gray-50"
          >
            <img src="https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png" alt="PhonePe" className="h-8" />
            <span>Pay with PhonePe</span>
          </button>
        </div>
      </div>
    </div>
  );
}