import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

import { containerVariants } from "../animations";
import { motion, AnimatePresence } from "framer-motion";

import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
