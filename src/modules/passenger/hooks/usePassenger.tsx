import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { storage } from "@/core/services";

const usePassenger = () => {
  const userId = storage.local.get("user")?.id;

  const initialData: Types.IQuery.Single = { item: Mappers.Passenger() };

  return useQuery<Types.IQuery.Single, Error>({
    queryKey: ["passenger", userId],

    queryFn: async () => {
      const { data } = await Api.Passenger(userId || "");

      return { item: Mappers.Passenger(data) };
    },
    initialData,
    enabled: !!userId,
  });
};

export default usePassenger;
