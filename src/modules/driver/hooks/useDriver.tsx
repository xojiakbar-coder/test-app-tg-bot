import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { useEffect } from "react";
import { useUser } from "@/common/context";
import { storage } from "@/common/services";

const useDriver = () => {
  const { user } = useUser();

  const initialData = { driver: Mappers.Driver() } as Types.IQuery.Single;

  const { data = initialData, ...args } = useQuery<Types.IQuery.Single, string>(
    {
      queryKey: ["driver", "single", user?.id],
      queryFn: async () => {
        const { data } = await Api.Driver(user?.id || "");
        return {
          driver: Mappers.Driver(data && data),
        };
      },
      initialData,
      enabled: !!user?.id,
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
