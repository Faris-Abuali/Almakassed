import { FinishedDependency, FinishedPolicy, Head, User } from "./API/types";
import { ChoiceName } from "./constants";

export interface SideCardProps {
  choice: ChoiceName;
  setChoice: (choice: ChoiceName) => void;
}

export interface DetailsCardProps {
  head: Head;
}

export interface Choice {
  name: ChoiceName;
  icon: JSX.Element;
}

export interface DepartmentPartProps {
  head: Head;
}

export interface EditFormValues {
  phoneNumber: string;
  email: string;
}

export interface DependencyChunkProps {
  finishedFile: FinishedDependency;
}

export interface PolicyChunkProps {
  finishedFile: FinishedPolicy;
}

export interface InformationCardProps {
  user: User;
}

export interface NamesSectionProps {
  fullName: string;
  userName: string;
}

export interface PersonalInfoSectionProps {
  userId: string;
  departmentName: string;
  createdAtDate: string;
}
