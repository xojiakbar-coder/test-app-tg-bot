import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { getUserData } from "@/helpers";

const usePassenger = () => {
  const { userId } = getUserData();

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
