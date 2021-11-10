import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen relative flex flex-col overflow-overlay">
        <Head>
          <link rel="shortcut icon" href="/techworld-single.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <main className="mb-auto">{children}</main>
        {router.pathname !== "/login" && <Footer />}
      </div>
    </>
  );
}
