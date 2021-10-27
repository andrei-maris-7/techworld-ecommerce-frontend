import { useContext } from "react";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

import { twoDecimals } from "../utils/format";

import AuthContext from "../context/AuthContext";
import { STRIPE_PK, API_URL } from "../utils/urls";

const stripePromise = loadStripe(STRIPE_PK);

export default function BuyButton({ product }) {
  const { user, getToken } = useContext(AuthContext);
  const router = useRouter();

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleBuy = async () => {
    const stripe = await stripePromise;
    const token = await getToken();

    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const session = await res.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  return (
    <>
      {!user && (
        <button className={styles.buyButton} onClick={redirectToLogin}>
          Pay ${twoDecimals(product.price)}
        </button>
      )}
      {user && (
        <button className={styles.buyButton} onClick={handleBuy}>
          Pay ${twoDecimals(product.price)}
        </button>
      )}
    </>
  );
}

const styles = {
  buyButton:
    "w-full bg-gray-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500",
};
