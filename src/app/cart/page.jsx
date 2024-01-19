"use client";
import { useDispatch, useSelector } from "react-redux";
import CartList from "../components/CartList";
import { ToastContainer, toast } from "react-toastify";
import { resetCart } from "../redux/niggiSlice";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import numeral from "numeral";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";


const Cart = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const productData = useSelector((state) => state.niggi.productData);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      const itemPrice = parseFloat(item.price.replace(/,/g, ""));
      if (!isNaN(itemPrice) && !isNaN(item.quantity)) {
        price += itemPrice * item.quantity;
      }
    });
    setTotalPrice(price);
  }, [productData]);


  const isCartEmpty = productData.length === 0;

  // const handleCheckout = async () => {
  //   try {
  //     const stripe = await stripePromise;

  //     const checkoutSession = await axios.post("checkout", {
  //       items: productData,
  //     });

  //     const result = await stripe?.redirectToCheckout({
  //       lineItems: checkoutSession.data.line_items,
  //     });

  //     if (result?.error) {
  //       throw new Error(result.error.message);
  //     }
  //   } catch (error) {
  //     // Handle and display the error to the user (e.g., using toast or an alert)
  //     console.error("Checkout error:", error.message);
  //     toast.error("An error occurred during checkout. Please try again.");
  //   }
  // };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {isCartEmpty ? (
        <div className=" font-bold p-3 m-3 ">
          <h2 className=" text-5xl flex items-center justify-center">
            Your Cart is Empty
          </h2>
          <Link
            href="/shop"
            className="mb-7 m-3 flex items-center gap-1 text-black hover:text-magenta duration-200 text-xl pt-5"
          >
            <span>
              <HiOutlineArrowLeft />
            </span>
            Back to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4">
          <div className="lg:col-span-2">
            <CartList />
          </div>

          <div className="bg-gray-100 p-4 rounded-3xl h-[300px] m-9 w-80 ">
            <h2 className="text-3xl font-bold mb-2">Cart Summary</h2>
            <hr className="border-gray-400 my-2" />

            <div className="text-base mb-2">
              <div className="flex justify-between text-2xl py-2">
                <span>Subtotal:</span>
                <span className="font-bold">
                  ₦{numeral(totalPrice).format("₦0,0.00")}
                </span>
              </div>
              <div className="flex justify-between text-2xl py-2">
                <span>Tax:</span>
                <span>₦0.00</span>
              </div>
              <div className="text-gray-600 text-base">
                Delivery fees not included
              </div>
            </div>
            {session ? (
              <>
                <Link href="/checkout">
                  <button
                    className="text-right bg-magenta text-white py-4 px-12 mt-4 block mx-auto rounded-md hover:scale-105 hover:transition "
                    //  onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button
                  className="text-right bg-magenta text-white py-4 px-12 mt-4 block mx-auto rounded-md hover:scale-105 hover:transition "
                  onClick={() => {
                    const errorMessage = document.getElementById(
                      "checkoutErrorMessage"
                    );
                    if (errorMessage) {
                      errorMessage.style.display = "block";
                    }
                  }}
                >
                  Checkout
                </button>
                <p id="checkoutErrorMessage" className="text-red-500 font-bold text-lg p-2 none " style={{ display: "none" }}>
                  To checkout, please kindly <Link href="/login" className="text-magenta hover:underline">login</Link>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {!isCartEmpty && (
        <button
          onClick={() => {
            dispatch(resetCart());
            toast.error("Your Cart is Empty");
          }}
          className="bg-red-500 text-white m-4 h-12 px-5 hover:scale-105 hover:transition rounded-md mb-16 text-lg"
        >
          Reset Cart
        </button>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Cart;
