import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorSnackbar } from "src/features/snackbar";
import { useAppDispatch } from "src/store/hooks";
import { AxiosBaseError } from "src/types";
import { extractErrorMessage } from "src/utils";
import { getFinishedPolicies } from "../API";

const useGetFinishedPolicies = (filterValue: string) => {
  const dispatch = useAppDispatch();

  const query = filterValue ? `?Filters=policy.chapter.id==${filterValue}` : "";

  const {
    data: policies,
    isFetching,
    error,
  } = useQuery({
    queryFn: () => getFinishedPolicies(query),
    queryKey: ["whatever"],
  });

  useEffect(() => {
    if (!error) return;

    const message = extractErrorMessage(error as AxiosBaseError);
    dispatch(
      showErrorSnackbar({
        message,
      }),
    );
  }, [error]);

  return {
    policies,
    isFetching,
  };
};

export default useGetFinishedPolicies;
