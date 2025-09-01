import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { getUserData } from "@/helpers";

interface IProps {
  enabled?: boolean;
}

const useList = ({ enabled = true }: IProps = {}) => {
  const { userId } = getUserData();

  const initialData = { items: [] } as Types.IQuery.List;

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string>({
    queryKey: ["myOrders", "list"],
    queryFn: async () => {
      const { data } = await Api.PassengerOrders(userId);

      return {
        items: Array.isArray(data)
          ? data.reverse().map(Mappers.PassengerOrders)
          : [],
      };
    },
    initialData,
    enabled,
  });

  return { ...args, ...data };
};

export default useList;
