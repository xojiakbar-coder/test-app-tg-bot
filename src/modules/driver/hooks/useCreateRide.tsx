import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";

import { error as errorNotification } from "@/components/Notification";

type IProps = {
  driverId: string;
  routeId: number;
};

const useCreateRide = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation<Types.IQuery.Single, string, IProps>({
    mutationFn: async ({ routeId, driverId }) => {
      if (!driverId) throw new Error("Driver ID is missing");

      const { data } = await Api.CreateRide({ driverId, routeId });
      return { driver: Mappers.Driver(data?.data) };
    },

    onSuccess: (_, variables) => {
      console.log("✅ Navbat muvaffaqiyatli qo‘shildi");

      queryClient.invalidateQueries({
        queryKey: ["driver", "single", variables.driverId],
      });

      options?.onSuccess?.();
    },

    onError: (error: any) => {
      errorNotification({
        title: `${
          JSON.stringify(error?.request.response).search("no_tariff")
            ? "Sizda aktiv tarif yo'q ⚠️"
            : "Xatolik yuz berdi ❌"
        }`,
      });
    },
  });
};

export default useCreateRide;
