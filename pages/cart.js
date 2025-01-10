import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState({ quantity: 1, temperature: "Hot", remarks: "" });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedOrderHistory = localStorage.getItem("orderHistory");
    if (storedCart) {
      setCart(combineCartItems(JSON.parse(storedCart)));
    }
    if (storedOrderHistory) {
      setOrderHistory(combineCartItems(JSON.parse(storedOrderHistory)));
    }
  }, []);

  const combineCartItems = (cartItems) => {
    return cartItems.reduce((acc, item) => {
      const foundItem = acc.find(
        (ci) =>
          ci.name === item.name &&
          ci.temperature === item.temperature &&
          ci.remarks === item.remarks
      );
      if (foundItem) {
        foundItem.quantity += item.quantity;
        foundItem.price = (
          parseFloat(foundItem.price) + parseFloat(item.price)
        ).toFixed(2);
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);
  };

  const totalAmount = cart
    .reduce((total, item) => total + parseFloat(item.price) , 0)
    .toFixed(2);

  const totalOrderHistoryAmount = orderHistory
    .reduce((total, item) => total + parseFloat(item.price) , 0)
    .toFixed(2);

  const handleCheckout = () => {
    const combinedOrderHistory = combineCartItems([...orderHistory, ...cart]);
    setOrderHistory(combinedOrderHistory);
    localStorage.setItem("orderHistory", JSON.stringify(combinedOrderHistory));
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setShowCheckoutMessage(true);
    setTimeout(() => setShowCheckoutMessage(false), 3000); // Hide message after 3 seconds
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const item = cart[index];
    setEditItem({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      temperature: item.type === "dessert" ? "" : item.temperature,
      remarks: item.remarks,
    });
  };

  const handleSaveEdit = () => {
    const updatedCart = [...cart];
    const originalItem = updatedCart[editIndex];
    let updatedPrice = (parseFloat(originalItem.price) / originalItem.quantity) * editItem.quantity;

    // Add 0.50 if temperature is changed from "Hot" to "Cold"
    if (originalItem.temperature === "Hot" && editItem.temperature === "Cold") {
      updatedPrice += 0.50 * editItem.quantity;
    }
    else if (originalItem.temperature === "Cold" && editItem.temperature === "Hot") {
      updatedPrice -= 0.50 * editItem.quantity;
    }

    updatedCart[editIndex] = {
      ...editItem,
      price: updatedPrice.toFixed(2),
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setEditIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-100 p-8">
      <header className="w-full flex justify-between items-center p-4 bg-green-700 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Parknership Cafe</h1>
        <nav className="hidden md:flex gap-4">
          <Link href="/" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Home</a>
          </Link>
          <Link href="/menu" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Menu</a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a className="px-4 py-2 rounded hover:bg-green-600 transition duration-300">Cart</a>
          </Link>
        </nav>
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-center bg-green-600 text-white rounded"
          onClick={() => setIsNavOpen(true)}
        >
          ☰
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-transform transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsNavOpen(false)} // Close sidebar when clicking outside
      >
        <nav
          className={`fixed right-0 top-0 h-full w-64 bg-green-700 text-white shadow-lg flex flex-col items-center justify-center transition-transform transform ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full"
            onClick={() => setIsNavOpen(false)}
          >
            ✖
          </button>
          <Link href="/" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 mb-4"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Home
            </a>
          </Link>
          <Link href="/menu" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 mb-4"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Menu
            </a>
          </Link>
          <Link href="/cart" legacyBehavior>
            <a
              className="px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300"
              onClick={() => setIsNavOpen(false)} // Close sidebar on navigation
            >
              Cart
            </a>
          </Link>
        </nav>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start w-full mt-8 gap-8">
        <div className="w-full md:w-1/2">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-green-800">Your Cart</h1>
            <p className="text-lg mt-2 text-green-700">Review your selected items</p>
          </header>
          <main className="flex flex-col gap-8 items-center sm:items-center mt-8 w-full">
            {cart.length === 0 ? (
              <p className="text-green-700">Your cart is empty.</p>
            ) : (
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 p-4 border-b border-green-200"
                  >
                    {editIndex === index ? (
                      <div className="flex flex-col gap-4 w-full p-4 bg-green-50 border border-green-700 rounded-lg">
                        <div className="flex flex-col gap-2">
                          <label className="text-green-800 font-bold">Quantity:</label>
                          <input
                            type="number"
                            className="p-2 border text-black border-green-700 rounded w-20"
                            value={editItem.quantity}
                            onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value, 10) || 1 })}
                            min="1"
                          />
                        </div>
                        {item.type !== "dessert" && (
                          <div className="flex flex-col gap-2">
                            <label className="text-green-800 font-bold">Temperature:</label>
                            <select
                              className="p-2 border text-black border-green-700 rounded"
                              value={editItem.temperature}
                              onChange={(e) => setEditItem({ ...editItem, temperature: e.target.value })}
                            >
                              <option value="Hot">Hot</option>
                              <option value="Cold">Cold</option>
                            </select>
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          <label className="text-green-800 font-bold">Remarks:</label>
                          <textarea
                            className="p-2 border text-black border-green-700 rounded"
                            value={editItem.remarks}
                            onChange={(e) => setEditItem({ ...editItem, remarks: e.target.value })}
                            maxLength="50"
                            placeholder="Add remarks (optional)"
                          />
                        </div>
                        <div className="flex gap-4 mt-4">
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                            onClick={handleSaveEdit}
                          >
                            Update
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                            onClick={() => setEditIndex(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <h3 className="text-xl font-bold text-green-800">{item.name}</h3>
                          <p className="text-green-700">Price: {item.price}</p>
                          <p className="text-green-700">Quantity: {item.quantity}</p>
                          {item.type !== "dessert" && (<p className="text-green-700">Temperature: {item.temperature}</p>)}
                          <p className="text-green-700">Remarks: {item.remarks || "No remarks"}</p>
                        </div>
                        {editIndex !== index && (
                          <div className="flex flex-col gap-2">
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                              onClick={() => handleEdit(index)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                              onClick={() => {
                                const newCart = cart.filter((_, i) => i !== index);
                                setCart(newCart);
                                localStorage.setItem("cart", JSON.stringify(newCart));
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-xl font-bold text-green-800">Total Amount</h3>
                  <p className="text-green-700">{totalAmount} SGD</p>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
                    onClick={handleCheckout}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        <div className="w-full md:w-1/2">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-green-800">Order History</h1>
            <p className="text-lg mt-2 text-green-700">Your past orders</p>
          </header>
          <main className="flex flex-col gap-8 items-center sm:items-center mt-8 w-full">
            {orderHistory.length === 0 ? (
              <p className="text-green-700">No past orders.</p>
            ) : (
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                {orderHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4 p-4 border-b border-green-200"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-green-800">{item.name}</h3>
                      <p className="text-green-700">Price: {item.price}</p>
                      <p className="text-green-700">Quantity: {item.quantity}</p>
                      {item.type !== "dessert" && (
                        <p className="text-green-700">Temperature: {item.temperature}</p>
                      )}
                      <p className="text-green-700">Remarks: {item.remarks || "No remarks"}</p>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <h3 className="text-xl font-bold text-green-800">Total Amount</h3>
                  <p className="text-green-700">{totalOrderHistoryAmount} SGD</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {showCheckoutMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-20 transition-transform transform translate-x-full animate-slide-in-out">
          $ Order received! Your order will be ready soon $
        </div>
      )}
    </div>
  );
}