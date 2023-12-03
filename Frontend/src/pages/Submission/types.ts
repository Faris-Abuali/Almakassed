import { Field, FocalPointTask } from "./API/types";

export interface HeaderProps {
  focalPointTask: FocalPointTask;
}

export interface FieldsListProps {
  focalPointTask: FocalPointTask;
}

export interface FieldCardProps {
  field: Field;
  onAnswerChange: (fieldId: string, answer: boolean) => void;
}
