import { PolicyResponse } from "./API/types";

export interface AddPolicyDialogProps {
  open: boolean;
  onClose: () => void;
  chapterId: string;
}

export interface AddPolicyFormPayload extends PolicyResponse {}
