import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useRoutes = ({ enabled = true }: IProps = {}) => {
  const initialData = { items: [] } as Types.IQuery.List;

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string>({
    queryKey: ['tariffs', 'list'],
    queryFn: async () => {
      const { data } = await Api.Tariffs();
      return {
        items: Array.isArray(data) ? data.map(Mappers.Tariff) : []
      };
    },
    initialData,
    enabled
  });

  return { ...args, ...data };
};

export default useRoutes;
