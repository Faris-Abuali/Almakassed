import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import { DialogName } from "../constants";
import UpdateMonitoringToolContext, {
  initialState,
} from "./UpdateMonitoringTool";
import {
  UpdateMonitoringToolContextValue,
  UpdateMonitoringToolContextState,
  UpdateMonitoringToolReducerAction,
} from "./types";

const UpdateMonitoringToolProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onToggleEditMode = useCallback(
    () => dispatch({ type: "ToggleEditMode" }),
    [],
  );

  const onOpenAppendFieldsDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: DialogName.AppendField,
      }),
    [],
  );

  const onOpenAssignDepartmentsDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: DialogName.AssignDepartment,
      }),
    [],
  );

  const onCloseDialog = useCallback(
    () =>
      dispatch({
        type: "SetOpenDialog",
        payload: null,
      }),
    [],
  );

  const contextValue: UpdateMonitoringToolContextValue = {
    state,
    onToggleEditMode,
    onOpenAppendFieldsDialog,
    onOpenAssignDepartmentsDialog,
    onCloseDialog,
  };

  return (
    <UpdateMonitoringToolContext.Provider value={contextValue}>
      {children}
    </UpdateMonitoringToolContext.Provider>
  );
};

const reducer = (
  state: UpdateMonitoringToolContextState,
  action: UpdateMonitoringToolReducerAction,
): UpdateMonitoringToolContextState => {
  switch (action.type) {
    case "ToggleEditMode":
      return {
        ...state,
        isEditingMode: !state.isEditingMode,
      };

    case "SetOpenDialog": {
      const openedDialog = action.payload;
      return {
        ...state,
        openedDialog,
      };
    }

    default:
      return state;
  }
};

export default UpdateMonitoringToolProvider;
