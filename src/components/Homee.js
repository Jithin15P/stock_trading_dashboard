 import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";

const Homee = () => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    axios.get("https://stock-trading-backend-nu.vercel.app/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setChecking(false);
      })
      .catch(() => {
        
        window.location.href = "https://stock-trading-frontend-phi.vercel.app/login";
      });
  }, []);

  if (checking) return <h3>Checking authentication...</h3>;

  return <Dashboard />;
};

export default Homee;
