import Head from "next/head";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import useScrollToTop from "../../utils/useScrollToTop";

import BuyButton from "../../components/BuyButton";
import BackButton from "../../components/BackButton";

const Product = ({ product }) => {
  // useScrollToTop();

  return (
    <>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}

        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>

      <div>
        <main className="mx-auto pt-14 px-4 sm:pt-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <BackButton />

          {/* Product */}
          <div className="lg:grid lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            {/* Product image */}
            <div className="lg:col-span-4">
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={fromImageToUrl(product.image)}
                  className="object-center object-cover"
                />
              </div>
            </div>

            {/* Product details */}
            <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:col-span-3">
              <div className="flex flex-col-reverse">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>
                </div>
              </div>

              <p className="text-gray-500 mt-6">{product.content}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <BuyButton product={product} />

                <button
                  type="button"
                  className="w-full bg-white border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                >
                  Premium Discount
                </button>
              </div>

              <div className="border-t border-gray-200 mt-10 pt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Premium membership
                </h3>
                <p className="mt-4 text-sm text-gray-500">
                  Check the benefits of joining Techworld as a premium member.{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-800 hover:text-gray-700"
                  >
                    Read more
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0],
    },
  };
}

export async function getStaticPaths() {
  // Retrieve all the possible paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  // Return them to NextJS context
  return {
    paths: products.map((product) => ({
      params: { slug: String(product.slug) },
    })),
    fallback: false, // Tells NextJs to show 404 if the param is not matched
  };
}

export default Product;
