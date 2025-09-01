import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';

import { keepOptions } from '@/helpers';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';
import { useStoredDriver } from '@/modules/order/hooks';

interface FormValues extends Types.IForm.Create {}

interface IChildren extends UseFormReturn<FormValues> {
  isLoading?: boolean;
}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.TariffBuying) => void;
}

const Create: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const driverId = useStoredDriver()?.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<Types.IEntity.TariffBuying, string, FormValues, any>({
    mutationFn: async (values: FormValues) => {
      const { data } = await Api.TariffCreate({ values });
      return Mappers.TariffBuying(data);
    },
    onSuccess: (data: Types.IEntity.TariffBuying) => {
      onSuccess && onSuccess(data);
      navigate('/driver');
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === 'driver' && query.queryKey[1] === 'list'
      });
    },
    onError,
    onSettled
  });

  const validationSchema: yup.ObjectSchema<Types.IForm.Create> = yup.object({
    driver: yup.string().required('Majburiy maydon'),
    selectedTariff: yup.string().required('Majburiy maydon'),
    tariffPaymentScreenshot: yup.mixed<File>().required('Majburiy maydon')
  });

  const form = useForm<FormValues>({
    defaultValues: {
      driver: String(driverId) || '',
      selectedTariff: '',
      tariffPaymentScreenshot: undefined
    },
    resolver: yupResolver<FormValues, any, FormValues>(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.reset({ ...form.getValues() }, { ...keepOptions })
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
