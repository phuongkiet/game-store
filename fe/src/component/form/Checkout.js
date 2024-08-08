import React from "react";

export default function Checkout() {
  return (
    <div className="p-4 max-w-7xl mx-auto mb-10">
      <div className="flex justify-center pb-3 mb-10">
        <h1 className="text-4xl font-semibold">Checkout</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">User information</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="First name"
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Last name"
              className="border p-2 rounded-md"
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border p-2 rounded-md"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Phone"
              className="w-full border p-2 rounded-md"
            />
          </div>

          <h2 className="text-lg font-semibold mb-4">Payment</h2>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <input type="radio" name="payment" className="mr-2" />
              <span>Momo</span>
            </div>
            <div className="flex items-center mb-2">
              <input type="radio" name="payment" className="mr-2" />
              <span>ZaloPay</span>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" className="mr-2" />
              <span>Bank Tranfer</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Product</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Product"
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <p>Basic Tee</p>
                        <p className="text-sm text-gray-500">Black, Large</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className="font-semibold">x</span>
                    <input
                      type="number"
                      step={1}
                      className="w-10 text-center font-semibold"
                      defaultValue={1}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-right">
                    <div className="flex items-center justify-end">
                      <p className="mr-4 font-semibold">$32.00</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Product"
                        className="w-12 h-12 mr-4"
                      />
                      <div>
                        <p>Basic Tee</p>
                        <p className="text-sm text-gray-500">Sienna, Large</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <span className="font-semibold">x</span>
                    <input
                      type="number"
                      step={1}
                      className="w-10 text-center font-semibold"
                      defaultValue={1}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-right">
                    <div className="flex items-center justify-end">
                      <p className="mr-4 font-semibold">$32.00</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>$64.00</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="italic">
              Included VAT{" "}
              <span className="italic font-bold text-red-600">*</span>
            </span>
          </div>
          <div className="flex justify-between py-2 font-semibold">
            <span>Total</span>
            <span>$64.00</span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Confirm order
          </button>
        </div>
      </div>
    </div>
  );
}
