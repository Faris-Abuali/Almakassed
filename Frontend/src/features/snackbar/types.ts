import { ReactNode } from "react";
import { AlertColor, AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

export interface SnackbarState {
  message: ReactNode;
  isOpen: boolean;
  title: ReactNode;
  severity: AlertColor | undefined;
  variant: AlertProps["variant"];
  anchorOrigin: SnackbarOrigin;
  autoHideDuration: number | null;
  icon: ReactNode;
  alertAction: ReactNode; // The Alert action to display. It renders after the message, at the end of the alert.
}

export interface ShowSnackbarPayload {
  message: ReactNode;
  title?: ReactNode;
  severity?: AlertColor | undefined;
  variant?: AlertProps["variant"];
  anchorOrigin?: SnackbarOrigin;
  autoHideDuration?: number | null;
  icon?: ReactNode;
  alertAction?: ReactNode; // The Alert action to display. It renders after the message, at the end of the alert.
}
