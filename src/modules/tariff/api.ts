import { http } from "@/core/services";

import { type AxiosPromise } from "axios";
import * as Types from "./types";

export const Tariffs = (): AxiosPromise<Types.IQuery.List> =>
  http.request.get("/tariffs/");
