import { $http } from "@/lib/http";
import { orderKeys } from "@/lib/react-query/query-keys";
import { Order, OrderFetchProps } from "@/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

/**
 * Fetches all orders belonging to the current authenticated user.
 * Maps to: GET /order
 */
export const useFetchOrders = ({
  page_size = 20,
  page = 1,
  status,
}: OrderFetchProps = {}) => {
  return useQuery<Order[]>({
    queryKey: orderKeys.list({ page_size, page, status }),
    queryFn: async (): Promise<Order[]> => {
      const response = await $http.get<Order[]>("/order", {
        params: {
          page,
          page_size: page_size,
          status: status || undefined,
        },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};
