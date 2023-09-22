import React from 'react';
import { useSession } from 'next-auth/react';

export default function CheckoutPage() {
  const { data: session } = useSession();

  return (
    <div className='flex m-3 p-3 h-auto lg:h-32 flex-col justify-center items-center gap-5'>
      {session ? (
        <>
          <h1 className='font-extrabold text-4xl lg:text-6xl text-center'>
            Payment Gateway will soon be done.
          </h1>
          <p className='text-lg lg:text-2xl text-center'>I still dey learn.</p>
        </>
      ) : (
        <p className='text-lg lg:text-2xl text-center'>
          Please <a href="/login">log in</a> to access the payment gateway.
        </p>
      )}
    </div>
  );
}



// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const createStripeSession = async (req, res) => {
//     const { items } = req.body;
//     const modifiedItems = items.map((item) => ({
//         description: item.description,
//         quantity: item.quantity,
//         price_data: {
//           currency: "ngn",
//           unit_amount: item.price * 100,
//           product_data: {
//             name: item.title,
//             images: [item.images[0]],
//           },
//         },
//       }));
      
    
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: modifiedItems,
//         mode: "payment",
//         success_url: `${process.env.HOST}/success`,
//         cancel_url: `${process.env.HOST}/checkout`,
//     });

//     console.log("Checkout Session Data:", session);
    
//     res.status(200).json({
//         id: session.id
//     });

//     console.log("Checkout Session Data:", checkoutSession.data);
// };

// export default createStripeSession;
