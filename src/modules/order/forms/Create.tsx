import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";

import { keepOptions, getUserData } from "@/helpers";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import * as yup from "yup";
import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";

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

const Create: React.FC<IProps> = ({
  children,
  onError,
  onSettled,
  onSuccess,
  className,
}) => {
  const { userId } = getUserData();
  console.log(userId);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<Types.IEntity.Order, string, FormValues, any>({
    mutationFn: async (values: FormValues) => {
      const { data } = await Api.Create({ values });
      return Mappers.Order(data);
    },
    onSuccess: (data: Types.IEntity.Order) => {
      onSuccess && onSuccess(data);
      navigate("/my-orders");
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "routes" && query.queryKey[1] === "list",
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
    cashbackUsedPercent: yup.number().optional(),
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
      cashbackUsedPercent: 0,
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
