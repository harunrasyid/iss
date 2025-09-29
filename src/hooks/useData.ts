import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { IPositionResponse } from "@/types/iss.type";

export function useData() {
  const { data, isLoading } = useQuery<IPositionResponse>({
    queryKey: ["states-all"],
    queryFn: async () => {
      const res = await axiosInstance.get(``);

      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
  });

  return {
    data,
    isLoading,
  };
}
