import React from "react";

export default function ShoppingCart() {
  const items = [
    {
      id: 1,
      name: "Basic Tee",
      color: "Sienna",
      size: "Large",
      price: 32.0,
      stock: "In stock",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Basic Tee",
      color: "Black",
      size: "Large",
      price: 32.0,
      stock: "Ships in 3-4 weeks",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Nomad Tumbler",
      color: "White",
      size: "",
      price: 35.0,
      stock: "In stock",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <>
      <div class="container mx-auto p-4 mb-10">
        <h1 class="text-3xl font-semibold mb-10">Shopping Cart</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt="Product"
                    className="w-24 h-24 mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      {item.color}, {item.size}
                    </p>
                    <p
                      className={`text-${
                        item.stock === "In stock" ? "green" : "gray"
                      }-600`}
                    >
                      {item.stock}
                    </p>
                    <p className="font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    className="border rounded w-16 text-center"
                    defaultValue="1"
                  />
                  <button className="ml-4 text-gray-600 hover:text-red-600">
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div class="p-4 bg-gray-100 rounded-lg">
              <h2 class="text-lg font-semibold mb-4">Order summary</h2>
              <div class="flex justify-between py-2">
                <span>Subtotal</span>
                <span>$99.00</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="flex items-center">Tax estimate</span>
                <span className="italic">
                  Included VAT
                  <span className="font-semibold text-red-500">*</span>
                </span>
              </div>
              <div class="flex justify-between py-2 font-semibold">
                <span>Order total</span>
                <span>$99.00</span>
              </div>
              <button class="w-full bg-blue-600 text-white py-2 rounded-md">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
