import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { API_URL } from "../utils/urls";

import { CheckCircleIcon } from "@heroicons/react/outline";

import Heading from "../components/Heading";

const useOrder = (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ checkout_session: session_id }),
        });
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setOrder(null);
      }

      setLoading(false);
    };
    fetchOrder();
  }, [session_id]);

  return { order, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;

  const { order, loading } = useOrder(session_id);

  return (
    <div>
      <Head>
        <title>Thank you for your purchase!</title>
        <meta name="description" content="Thank you for your purchase" />
      </Head>

      {/* {loading && <Heading heading="Loading..." />} */}

      {order && (
        <main>
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <CheckCircleIcon
                className="flex-shrink-0 mx-auto h-32 w-32 text-green-400 font-light"
                aria-hidden="true"
              />
              <p className="mt-1 text-4xl font-thin text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Thank you for your purchase!
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Your order # is:{" "}
                <span className="font-semibold">{order.id}</span>
              </p>
              <div className="mx-auto">
                <Link href="/">
                  <a>
                    <p className="max-w-xl mt-5 mx-auto text-sm text-gray-500 hover:text-gray-700 focus:text-gray-700">
                      {"<"} Back to browsing our products
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
