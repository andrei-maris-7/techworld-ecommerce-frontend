export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_live_28060DA7C753E795";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51JRxsYEWirOExa2cjidHi41ZFJUUbRBbuFfLJXtaxZqbggxFqfuNGjijHSs32llNhbchNhptKQEuhZpRmrqUVaq90057iDZYW6";

/**
 * Given an image return the Url
 * Works for local and deployed strapis
 * @param {any} image
 */

export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg";
  }

  if (image.url.indexOf("/" === 0)) {
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
