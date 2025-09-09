import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";
import { storage } from "@/core/services";

interface IProps {
  enabled?: boolean;
}

const useList = ({ enabled = true }: IProps = {}) => {
  const userId = storage.local.get("user")?.id;

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
