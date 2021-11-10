import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const { user, loginUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        router.push("/");
      });
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login here to make your purchase" />
      </Head>

      <section>
        <div className="flex min-h-[90vh] sm:min-h-[93.2vh] overflow-hidden">
          <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-xl mx-auto lg:w-96">
              {/* SIGN IN */}
              <div>
                <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">
                  {" "}
                  Log in to purchase.{" "}
                </h2>
              </div>
              <div className="mt-8">
                <div className="mt-6">
                  {/* FORM */}
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* EMAIL */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-neutral-600"
                      >
                        {" "}
                        Email address:{" "}
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          placeholder="example@domain.com"
                          className={styles.emailInput}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                    </div>
                    {/* SIGN IN BUTTON */}
                    <div>
                      <button type="submit" className={styles.submitButton}>
                        Log in{" "}
                      </button>
                    </div>
                  </form>
                  {/* END FORM */}
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-1 hidden w-0 overflow-hidden lg:block">
            <img
              className="absolute inset-0 object-cover w-full h-full"
              src="https://d33wubrfki0l68.cloudfront.net/1a058aec6e3d81efe3ac4ca6366b40574876f6bc/32bc1/images/placeholders/rectanglewide.svg"
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  emailInput:
    "block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg  text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300",
  passwordInput:
    "block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg  text-neutral-600 bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300",
  submitButton:
    "flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-400  rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
};
