import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { storage } from "@/core/services";

const useDriver = () => {
  const userId = storage.local.get("user")?.id;

  const initialData = { driver: Mappers.Driver() } as Types.IQuery.Single;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Single, string>(
    {
      queryKey: ["driver", "single", userId],
      queryFn: async () => {
        const { data } = await Api.Driver(userId || "");
        return {
          driver: Mappers.Driver(data && data),
        };
      },
      initialData,
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (data?.driver?.id) {
      storage.local.set("driver", data.driver);
    }
  }, [data?.driver]);

  return { ...args, ...data };
};

export default useDriver;
