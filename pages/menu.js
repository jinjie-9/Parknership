import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beverages = [
  {
    name: "Cedar Espresso",
    description: " A bold and aromatic shot of espresso.",
    price: "6.20 SGD",
    image: "/Cedar Espresso.jpg",
    type: "coffee",
  },
  {
    name: "Rosebud Cappuccino",
    description: "A cappuccino with rosewater or rose petals.",
    price: "6.50 SGD",
    image: "/Rosebud Cappuccino.jpg",
    type: "coffee",
  },
  {
    name: "Lavender Latte",
    description: "Infused with calming lavender syrup.",
    price: "6.50 SGD",
    image: "/Lavender Latte.jpg",
    type: "coffee",
  },
  {
    name: "Sunflower Brew",
    description: "Coffee with a hint of sunflower seed milk.",
    price: "6.90 SGD",
    image: "/Sunflower Brew.jpg",
    type: "coffee",
  },
  {
    name: "Maple Mocha",
    description: "A rich, chocolate and maple syrup latte.",
    price: "6.00 SGD",
    image: "/Maple Mocha.jpg",
    type: "coffee",
  },
  {
    name: "Fern Frappe",
    description: " A green frappe with matcha & mint garnish.",
    price: "7.50 SGD",
    image: "/Fern Frappe.jpg",
    type: "coffee",
  },
  {
    name: "Berry Blossom",
    description: " A sparkling strawberry soda with floral undertones.",
    price: "5.50 SGD",
    image: "/Berry Blossom.jpg",
    type: "non-coffee",
  },
  {
    name: "Velvet Truffle",
    description: "Smooth chocolate with hazelnut or almond milk.",
    price: "6.50 SGD",
    image: "/Velvet Truffle.jpg",
    type: "non-coffee",
  },
  {
    name: "Tea Groove Delight",
    description: "Oolong milk tea with subtle peach or apricot notes.",
    price: "5.50 SGD",
    image:  "/Tea Groove Delight.jpg",
    type: "non-coffee",
  },
  {
    name: "Peach Petal",
    description: "Sweet peach tea with a hint of hibiscus or rose",
    price: "6.00 SGD",
    image: "/Peach Petal.jpg",
    type: "non-coffee",
  },
  {
    name: "Lemon Bloom",
    description: " Lemon tea infused with chamomile or lavender.",
    price: "6.00 SGD",
    image: "/Lemon Bloom.jpg",
    type: "non-coffee",
  },
  {
    name: "Limeburst Sparkle",
    description: "Bright lime and lemon blend with effervescence.",
    price: "5.50 SGD",
    image: "/Limeburst Sparkle.jpg",
    type: "non-coffee",
  },
  {
    name: "Orchard Spark",
    description: "Sweet apple soda with a hint of honey.",
    price: "6.20 SGD",
    image: "/Orchard Spark.jpg",
    type: "non-coffee",
  },
  {
    name: "Floral Bliss",
    description: "A creamy cheesecake infused with lavendar essence, drizzled with oraganic honey, and topped with candied lavender buds",
    price: "15.00 SGD",
    image: "/Floral Bliss.jpg",
    type: "dessert",
  },
  {
    name: "Forest Harmony",
    description: "Layers of matcha sponge, mint cream, and white chocolate ganache, garnished with fresh mint leaves and edible gold flakes.",
    price: "20.00 SGD",
    image: "/Forest Harmony.jpg",
    type: "dessert",
  },
  {
    name: "Blooming Delight",
    description: "Silky panna cotta infused with rosewater, served with a hibiscus reduction and crystallized rose petals.",
    price: "21.00 SGD",
    image: "/Blooming Delight.jpg",
    type: "dessert",
  },
  {
    name: "Petal Paradise",
    description: "A buttery tart filled with jasmine-infused lemon curd, topped with edible pansies and a touch of powdered sugar",
    price: "15.00 SGD",
    image: "/Petal Paradise.jpg",
    type: "dessert",
  },
  {
    name: "Leafy Temptation",
    description: "Warm dark chocolate fondant infused with sage, accompanied by a scoop of thyme-scented vanilla ice creamt.",
    price: "23.00 SGD",
    image: "/Leafy Temptation.jpg",
    type: "dessert",
  },
  {
    name: "Sunset Garden",
    description: "Delicate madeleines flavoured with orange blossom water, served with a side of apricot compote.",
    price: "14.00 SGD",
    image: "/Sunset Garden.jpg",
    type: "dessert",
  },
  {
    name: "Nature’s Canvas",
    description: "Chamomile-infused ice cream nestled between delicate almond shortbread cookies, served with a drizzle of honey.",
    price: "25.00 SGD",
    image: "/Nature’s Canvas.jpg",
    type: "dessert",
  },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState("all");
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", price: "", quantity: 1, temperature: "Hot", remarks: "", type: "" });
  const [remainingChars, setRemainingChars] = useState(50);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const filteredBeverages = beverages.filter(beverage => selectedType === "all" || beverage.type === selectedType);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (newItem.temperature === "Cold") {
      const updatedPrice = (parseFloat(newItem.price) + 0.50 * newItem.quantity).toFixed(2);
      setNewItem(prevItem => ({ ...prevItem, price: updatedPrice + " SGD" }));
    } else {
      const originalPrice = beverages.find(beverage => beverage.name === newItem.name)?.price || "0.00 SGD";
      const updatedPrice = (parseFloat(originalPrice) * newItem.quantity).toFixed(2);
      setNewItem(prevItem => ({ ...prevItem, price: updatedPrice + " SGD" }));
    }
  }, [newItem.temperature, newItem.quantity]);

  const handleAddToCart = () => {
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setShowPopup(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide message after 3 seconds
  };

  const handleRemarksChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setNewItem({ ...newItem, remarks: value });
      setRemainingChars(50 - value.length);
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col items-center bg-green-100 p-6 sm:p-12`}
    >
      {/* Header */}
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

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-transform transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsNavOpen(false)} // Close sidebar when clicking outside
      >
        <nav
          className="fixed right-0 top-0 h-full w-64 bg-green-700 text-white shadow-lg flex flex-col items-center justify-center transition-transform transform ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
          }"
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

      {/* Main Content */}
      <main className="flex flex-col gap-8 w-full max-w-5xl">
        <h2 className="text-4xl font-bold text-green-800 mb-4 mt-8">~ Menu ~</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button
            className={`px-6 py-2 rounded-lg ${
              selectedType === "all"
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } transition`}
            onClick={() => setSelectedType("all")}
          >
            All Menu Item
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              selectedType === "coffee"
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } transition`}
            onClick={() => setSelectedType("coffee")}
          >
            Coffee
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              selectedType === "non-coffee"
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } transition`}
            onClick={() => setSelectedType("non-coffee")}
          >
            Non-Coffee
          </button>
          <button
            className={`px-6 py-2 rounded-lg ${
              selectedType === "dessert"
                ? "bg-green-700 text-white"
                : "bg-white text-green-700 border border-green-700"
            } transition`}
            onClick={() => setSelectedType("dessert")}
          >
            Dessert
          </button>
        </div>

        {/* Beverage Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBeverages.map((beverage, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transition hover:shadow-xl"
            >
              <Image
                src={beverage.image}
                alt={beverage.name}
                width={150}
                height={150}
                className="rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-green-800">{beverage.name}</h3>
              <p className="text-green-700 text-center text-sm mb-2">{beverage.description}</p>
              <p className="text-lg font-bold text-green-900 mb-4">{beverage.price}</p>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => {
                  setNewItem({
                    name: beverage.name,
                    price: beverage.price,
                    quantity: 1,
                    temperature: beverage.type === "dessert" ? "" : "Hot",
                    remarks: "",
                    type: beverage.type,
                  });
                  setRemainingChars(50);
                  setShowPopup(true);
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-20 transition-transform transform translate-x-full animate-slide-in-out">
          Item added to cart successfully!
        </div>
      )}

      {/* Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Add New Item</h2>
            {/* Modal Content */}
            <div className="space-y-4">
              <div>
                <label className="block text-green-800 font-bold">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-green-700 rounded text-gray-700"
                  value={newItem.name}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-green-800 font-bold">Quantity</label>
                <input
                  type="number"
                  className="w-full p-2 border border-green-700 rounded text-gray-700"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 1 })
                  }
                  min="1"
                />
              </div>
              {newItem.type !== "dessert" && (
                <div>
                  <label className="block text-green-800 font-bold">Temperature</label>
                  <select
                    className="w-full p-2 border border-green-700 rounded text-gray-700"
                    value={newItem.temperature}
                    onChange={(e) =>
                      setNewItem({ ...newItem, temperature: e.target.value })
                    }
                  >
                    <option value="Hot">Hot (Original Price)</option>
                    <option value="Cold">Cold (+ $0.50)</option>
                  </select>
                </div>
              )}
              <div>
                <label className="block text-green-800 font-bold">Remarks</label>
                <textarea
                  className="w-full p-2 border border-green-700 rounded text-gray-700"
                  value={newItem.remarks}
                  onChange={handleRemarksChange}
                  maxLength="50"
                />
                <p className="text-right text-green-600 text-sm">
                  {remainingChars} characters remaining
                </p>
              </div>
              <div>
                <label className="block text-green-800 font-bold">Price</label>
                <input
                  type="text"
                  className="w-full p-2 border border-green-700 rounded text-gray-700"
                  value={newItem.price}
                  readOnly
                />
              </div>
            </div>
            {/* Modal Actions */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-green-600">
        <p className="text-sm">© 2025 Parknership. All rights reserved.</p>
      </footer>
    </div>
  );
}