import { useState } from "react";
import Auth from "./Auth";
import App from "./App";

const Root = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  if (!token) {
    return <Auth onAuthSuccess={() => setToken(localStorage.getItem("token"))} />;
  }
  return <App />;
};

export default Root;