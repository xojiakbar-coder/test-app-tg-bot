import { storage } from "../services";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const isDriver = (): boolean => {
  const location = useLocation();
  const [isDriver, setIsDriver] = useState(() => {
    return storage.local.get("isDriver") === "true";
  });

  useEffect(() => {
    const isDriverPath = location.pathname.startsWith("/driver");

    if (isDriverPath) {
      setIsDriver(true);
      storage.local.set("isDriver", "true");
    } else {
      setIsDriver(false);
      storage.local.remove("isDriver");
    }
  }, [location.pathname]);

  return isDriver;
};

export default isDriver;
