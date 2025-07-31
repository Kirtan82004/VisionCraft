import { useState } from "react";
import { Trash2 } from "lucide-react";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Black Eyeglasses",
      price: 120.0,
      quantity: 1,
      image: "https://placehold.co/100x100",
    },
    {
      id: 2,
      name: "Aviator Sunglasses",
      price: 150.0,
      quantity: 2,
      image: "https://placehold.co/100x100",
    },
  ]);

  // Quantity update function
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item function
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        <div className="bg-white p-6 rounded shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Total</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded"
                        />
                        <span className="ml-4">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="number"
                        className="border border-gray-300 rounded px-4 py-2 w-20"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={18} className="mr-1" />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded">
              <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-700">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Tax (10%):</span>
                <span className="text-gray-700">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-700 font-bold">Total:</span>
                <span className="text-gray-700 font-bold">${total.toFixed(2)}</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShoppingCart;
