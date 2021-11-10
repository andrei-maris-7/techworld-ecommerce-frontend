import Head from "next/head";
import Link from "next/link";

import useScrollToTop from "../utils/useScrollToTop";

import { motion } from "framer-motion";

import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {
  useScrollToTop();

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Browse our digital products" />
      </Head>

      <main>
        <div className="mt-12 mx-auto max-w-7xl px-4 sm:mt-20 2xl:mt-32">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Browse our</span>{" "}
              <span className="block text-indigo-600 xl:inline">
                digital products
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join Techworld as a premium member in order to get special
              discounts all year around. Don't miss the chance!
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 divide-x divide-gray-600 hover:bg-gray-700 md:text-lg"
                >
                  <span className="pr-6">Join now</span>
                  <span className="pl-6">$199 / year</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto pt-10 px-4 sm:pt-12 sm:px-6 lg:max-w-7xl lg:px-8 2xl:pt-16">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <Link
                key={product.name}
                href={`/products/${product.slug}`}
                scroll={false}
              >
                <a className="group">
                  <motion.div
                    className="w-full aspect-w-4 aspect-h-3 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={fromImageToUrl(product.image)}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                      // layout="fill"
                      // priority={true}
                    />
                  </motion.div>

                  <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                    <h3>{product.name}</h3>
                    <p>${twoDecimals(product.price)}</p>
                  </div>
                  <p className="mt-1 text-sm italic text-gray-500">
                    {product.description}
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch the products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();

  // Return the products as props
  return {
    props: {
      products,
    },
  };
}
