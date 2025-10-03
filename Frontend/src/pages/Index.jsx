import { useState } from "react";
import { LandingPage } from "./LandingPage";
import { Navigate } from "react-router-dom";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Navigate to="/app/products" replace />;
  }

  return <LandingPage onLogin={handleLogin} />;
};

export default Index;
