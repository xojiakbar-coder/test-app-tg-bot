import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as Api from "../api.ts";
import * as Types from "../types.ts";
import * as Mappers from "../mappers.ts";
import useUser from "@/common/context/usage.ts";
import storage from "@/common/services/storage.ts";

const useDelete = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      rideId,
    }: Types.IQuery.Delete): Promise<Types.IEntity.RecentRide> => {
      const { data } = await Api.DeleteRide({
        telegramId: user?.id || storage.local.get("telegramUser")?.id,
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
