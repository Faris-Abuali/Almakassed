import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPolicy } from "../API";
import { POLICIES_QUERY_KEY } from "../constants";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { extractErrorMessage } from "src/utils";
import { Policy } from "../API/types";
import { AxiosBaseError } from "src/types";

const useGetPolicy = (chapterId: string, policyId: string) => {
  const dispatch = useAppDispatch();
  const {
    // @ts-ignore
    data: policy,
    isFetching,
    isError,
    error,
  } = useQuery<Policy, AxiosBaseError, Policy, string[]>({
    queryFn: () => getPolicy(chapterId, policyId),
    queryKey: [POLICIES_QUERY_KEY, chapterId, policyId],
  });

  useEffect(() => {
    if (error) {
      const message = extractErrorMessage(error);
      dispatch(
        showErrorSnackbar({
          message,
        }),
      );
    }
  }, [error]);

  return {
    policy,
    isFetching,
    isError,
  };
};

export default useGetPolicy;
