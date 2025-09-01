import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Api from "../api.ts";
import * as Types from "../types.ts";
import * as Mappers from "../mappers.ts";
import getUserData from "@/helpers/getUserData.tsx";

const useDelete = () => {
  const { userId } = getUserData();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rideId,
    }: Types.IQuery.Delete): Promise<Types.IEntity.RecentRide> => {
      const { data } = await Api.DeleteRide({
        telegramId: userId,
        rideId,
      });
      return Mappers.RecentRide(data && data);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["driver", "single"],
          exact: false,
        });
      }, 1000);
    },
  });
};

export default useDelete;
