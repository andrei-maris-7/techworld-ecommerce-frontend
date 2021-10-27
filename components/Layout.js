import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="min-h-screen relative flex flex-col">
      <Header />
      <main className="mb-auto">{children}</main>

      {router.pathname !== "/login" && <Footer />}
    </div>
  );
}

// min-h-screen relative

// non-footer page
