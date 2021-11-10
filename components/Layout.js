import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen relative flex flex-col">
        <Head>
          <link rel="shortcut icon" href="/techworld-single.png" />
        </Head>

        <Header />
        <main className="mb-auto">{children}</main>
        {router.pathname !== "/login" && <Footer />}
      </div>
    </>
  );
}
