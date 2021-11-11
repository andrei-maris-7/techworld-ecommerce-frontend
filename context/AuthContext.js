import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { MAGIC_PUBLIC_KEY } from "../utils/urls";
import { useRouter } from "next/router";

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /**
   * Adds email to user
   * @param {string} email
   */

  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push("/");
    } catch (err) {
      setUser(null);
    }
  };

  /**
   * Sets user to null (Logout)
   */

  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedin = await magic.user.isLoggedIn();

      if (!isLoggedin) setLoading(false);

      if (isLoggedin) {
        const { email } = await magic.user.getMetadata();
        setUser({ email });
        setLoading(false);
      }

      return isLoggedin;
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Retrieves the Magic issued Bearer Token
   * Allows users to make authenticated requests
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (err) {}
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);
    console.log(magic);

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        getToken,
        checkUserLoggedIn,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
