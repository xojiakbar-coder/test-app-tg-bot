import { useQuery } from "@tanstack/react-query";

import * as Api from "../api";
import * as Types from "../types";
import * as Mappers from "../mappers";

interface IProps {
  enabled?: boolean;
}

const useRoutes = ({ enabled = true }: IProps = {}) => {
  const initialData = { routes: [] } as Types.IQuery.List;

  const { data = initialData, ...args } = useQuery<Types.IQuery.List, string>({
    queryKey: ["routes", "list"],
    queryFn: async () => {
      const { data } = await Api.Routes();
      return {
        routes: Array.isArray(data) ? data.map(Mappers.Routes) : [],
      };
    },
    placeholderData: initialData, // ✅ initialData emas
    enabled,
  });

  return { ...args, ...data };
};

export default useRoutes;
