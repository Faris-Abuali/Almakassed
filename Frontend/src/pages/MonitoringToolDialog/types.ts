import { Department, Field } from "../MonitoringTools/API/types";

export interface DescriptionSectionProps {
  description: string;
}

export interface FieldsSectionProps {
  fields: Field[];
}

export interface DepartmentsSectionProps {
  departments: Department[];
}

export interface SectionHeaderProps {
  title: string;
}
