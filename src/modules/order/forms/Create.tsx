import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";

import { keepOptions } from "@/helpers";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import * as yup from "yup";
import * as Api from "../api";
import * as Types from "../types";
import { useEffect } from "react";
import * as Mappers from "../mappers";
import { storage } from "@/core/services";
import { usePassenger } from "@/modules/passenger/hooks";

interface FormValues extends Types.IForm.Create {}

interface IChildren extends UseFormReturn<FormValues> {
  isLoading?: boolean;
}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.Order) => void;
}
// ... qolgan importlar

const Create: React.FC<IProps> = ({
  children,
  onError,
  onSettled,
  onSuccess,
  className,
}) => {
  const userId = storage.local.get("user")?.id;
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    data: { item },
  } = usePassenger();

  const mutation = useMutation<Types.IEntity.Order, string, FormValues, any>({
    mutationFn: async (values: FormValues) => {
      const { data } = await Api.Create({ values });
      return Mappers.Order(data);
    },
    onSuccess: (data: Types.IEntity.Order) => {
      onSuccess && onSuccess(data);
      navigate("/passenger-orders");
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "booking" && query.queryKey[1] === "single",
      });
    },
    onError,
    onSettled,
  });

  const validationSchema: yup.ObjectSchema<Types.IForm.Create> = yup.object({
    telegramId: yup.string(),
    route: yup.number(),
    isDelivery: yup.boolean().optional(),
    ridePrice: yup.string().nullable().optional(),
    cashbackUsed: yup.number().optional(),
    frontSeat: yup.boolean().optional(),
    extraLuggage: yup.string(),
    isCashbackUsed: yup.boolean().optional(),
    carType: yup
      .string()
      .oneOf(["Standart", "Comfort", "Biznes"], "Noto‘g‘ri mashina turi")
      .required("Majburiy maydon"),
    dateOfDeparture: yup
      .string()
      .required("Majburiy maydon")
      .test("is-future-or-today", "Xato vaqt", (value) => {
        if (!value) return false;
        const today = dayjs().startOf("day");
        const inputDate = dayjs(value).startOf("day");
        return inputDate.isSame(today) || inputDate.isAfter(today);
      }),
    timeOfDeparture: yup.string().required("Majburiy maydon"),
    paymentType: yup
      .string()
      .oneOf(["Cash", "Card"], "Noto‘g‘ri to‘lov turi")
      .required("Majburiy maydon"),
  });

  const form = useForm<FormValues>({
    defaultValues: {
      telegramId: userId || "",
      route: Number(id) || 0,
      isDelivery: false,
      ridePrice: null,
      cashbackUsed: 0,
      frontSeat: false,
      extraLuggage: "",
      isCashbackUsed: false,
      carType: undefined,
      dateOfDeparture: undefined,
      timeOfDeparture: "",
      paymentType: undefined,
    },
    resolver: yupResolver<FormValues, any, FormValues>(validationSchema),
  });

  const { watch, setValue } = form;

  // 👇 isCashbackUsed o‘zgarishini kuzatamiz
  const isCashbackUsed = watch("isCashbackUsed");

  useEffect(() => {
    if (isCashbackUsed) {
      // agar true bo‘lsa passenger cashbackAmount ni qo‘yib beradi
      setValue("cashbackUsed", item?.cashbackAmount ?? 0);
    } else {
      // aks holda 0 yoki bosh holatga qaytarish
      setValue("cashbackUsed", 0);
    }
  }, [isCashbackUsed, item, setValue]);

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onSettled: () => form.reset({ ...form.getValues() }, { ...keepOptions }),
    });
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={onSubmit}>
        {children({ ...form, isLoading: mutation.isPending })}
      </form>
    </FormProvider>
  );
};

export default Create;
