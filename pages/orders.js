import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import AuthContext from "../context/AuthContext";
import { fromImageToUrl, API_URL } from "../utils/urls";

import { motion } from "framer-motion";
import { containerVariants } from "../animations";

import {
  CheckCircleIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import Heading from "../components/Heading";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true);
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await order_res.json();
          setOrders(data);
        } catch (err) {
          setOrders([]);
        }
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]); // everytime the user changes, we are going to fetch the orders again

  return { orders, loading };
};

export default function Orders() {
  const { user, getToken } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        router.push("/login");
      });
    }
  }, []);

  const { orders, loading } = useOrders(user, getToken);
  console.log("Account.render orders", orders);

  return (
    <>
      {loading && (
        <div>
          <Heading
            heading="Loading..."
            subheading="Please wait until we fetch your order history."
          />
        </div>
      )}

      {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Head>
            <title>Orders page</title>
            <meta name="description" content="View your order history." />
          </Head>

          {orders.length !== 0 && (
            <Heading
              heading="My orders"
              subheading="You can view information about your previous orders below."
            />
          )}

          {orders.length === 0 && (
            <Heading
              heading="My orders"
              subheading="You currently do not have any previous orders."
            ></Heading>
          )}

          <div className="max-w-7xl -mt-14 mx-auto bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {orders.map((order) => (
                <li key={order.id}>
                  <div className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <Link
                            href={`/products/${order.product.slug} `}
                            scroll={false}
                          >
                            <a>
                              <img
                                className="h-12 w-12 rounded shadow-md"
                                src={fromImageToUrl(order.product.image)}
                                alt=""
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <Link
                              href={`/products/${order.product.slug}`}
                              scroll={false}
                            >
                              <a>
                                <p className="text-sm font-medium text-black-700 truncate">
                                  {order.product.name}
                                </p>
                              </a>
                            </Link>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="truncate">${order.total}</span>
                            </p>
                          </div>
                          <div className="md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Order placed on{" "}
                                <time dateTime={order.created_at}>
                                  {new Date(
                                    order.created_at
                                  ).toLocaleDateString("en-GB")}{" "}
                                </time>
                                at{" "}
                                <time dateTime={order.created_at}>
                                  {new Date(
                                    order.created_at
                                  ).toLocaleTimeString("en-US")}
                                </time>
                              </p>

                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                {order.status === "paid" && (
                                  <CheckCircleIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    aria-hidden="true"
                                  />
                                )}
                                {order.status === "unpaid" && (
                                  <XCircleIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
                                    aria-hidden="true"
                                  />
                                )}
                                {order.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </>
  );
}
