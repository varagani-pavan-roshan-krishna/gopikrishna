import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Trash2 } from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';

export function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Your Cart</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.id} className="p-6 flex items-center">
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  className="rounded border-gray-300"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">₹{total()}</span>
          </div>
          
          <button
            onClick={handleCheckout}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={total()}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}