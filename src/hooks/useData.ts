import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { PositionResponseType } from "@/types/iss.type";

export function useData() {
  const { data, isLoading } = useQuery<PositionResponseType>({
    queryKey: ["states-all"],
    queryFn: async () => {
      const res = await axiosInstance.get(``);

      console.log(res);

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
