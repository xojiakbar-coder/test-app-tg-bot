import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { storage } from "@/core/services";

const useDriverCheck = () => {
  const userId = storage.local.get("user")?.id;

  const initialData = {
    data: Mappers.DriverCheck(),
  } as Types.IQuery.DriverCheck;

  const { data = initialData, ...args } = useQuery<
    Types.IQuery.DriverCheck,
    string
  >({
    queryKey: ["driverCheck", "single", userId],
    queryFn: async () => {
      const { data } = await Api.DriverCheck(userId || "");
      return { data: Mappers.DriverCheck(data && data) };
    },
    initialData,
    enabled: !!userId,
  });

  useEffect(() => {
    // console.log(data.data);
    if (data?.data) {
      storage.local.set("driverCheck", data.data);
    }
  }, [data]);

  return { ...args, ...data };
};

export default useDriverCheck;
