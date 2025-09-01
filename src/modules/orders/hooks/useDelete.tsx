import { getUserData } from "@/helpers/";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Api from "../api.ts";
import * as Types from "../types.ts";
import * as Mappers from "../mappers.ts";

const useDelete = () => {
  const { userId } = getUserData();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
    }: Types.IQuery.Delete): Promise<Types.IEntity.MyOrders> => {
      const { data } = await Api.Delete({
        telegramId: userId,
        bookingId: id,
      });
      return Mappers.PassengerOrders(data && data);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["myOrders", "list"],
          exact: true,
        });
      }, 1000);
    },
  });
};

export default useDelete;
