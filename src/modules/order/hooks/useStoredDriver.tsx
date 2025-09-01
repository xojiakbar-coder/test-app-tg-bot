import { useEffect, useState } from "react";

import * as Types from "@/modules/order/types";
import { storage } from "@/core/services";

const useStoredDriver = (): Types.IEntity.IDriver | null => {
  const [user, setUser] = useState<Types.IEntity.IDriver | null>(() => {
    const userStr = storage.local.get("driver");
    if (userStr) {
      try {
        return JSON.parse(userStr) as Types.IEntity.IDriver;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const userStr = storage.local.get("driver");
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr) as Types.IEntity.IDriver;
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user JSON in localStorage:", err);
      }
    }
  }, []);

  return user;
};

export default useStoredDriver;
