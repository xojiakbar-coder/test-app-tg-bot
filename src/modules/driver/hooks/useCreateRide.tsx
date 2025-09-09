import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";

import { message } from "@/components/Message";
import { useNavigate } from "react-router-dom";

type IProps = {
  driverId: string;
  routeId: number;
};

const useCreateRide = (options?: { onSuccess?: () => void }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<Types.IQuery.Single, string, IProps>({
    mutationFn: async ({ routeId, driverId }) => {
      if (!driverId) throw new Error("Driver ID is missing");

      const { data } = await Api.CreateRide({ driverId, routeId });
      return { driver: Mappers.Driver(data?.data) };
    },

    onSuccess: (_, variables) => {
      message.success("Safar navbatga qo‘shildi");
      navigate("driver-rides");

      queryClient.invalidateQueries({
        queryKey: ["driver", "single", variables.driverId],
      });

      options?.onSuccess?.();
    },

    onError: (error: any) => {
      message.error(
        `${
          JSON.stringify(error?.request.response).search("no_tariff")
            ? "Sizda aktiv tarif yo'q ⚠️"
            : "Xatolik yuz berdi qayta urinib ko'ring ❌"
        }`
      );
    },
  });
};

export default useCreateRide;
