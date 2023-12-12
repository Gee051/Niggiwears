import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";


export default async function Checkout() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/");

  return <div>
    <h1 className="text-5xl text-center">Hello world</h1>
  </div>
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
