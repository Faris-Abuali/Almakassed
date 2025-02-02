import { RequestEntityType } from "../constants";

export interface ApprovalRequest {
  title: string;
  createdAt: string;
  requesterId: string;
  entityType: RequestEntityType;
  entityId: string;
  info: Info;
  requesterUserName: string;
  requesterFullName: string;
  requesterAvatarUrl: string;
}

export interface Info {
  chapterId: string;
  policyId: string;
  dependencyId?: string;
}

export interface Field {
  id: string;
  content: string;
}

export interface Department {
  id: string;
  name: string;
  headId: string;
}
export interface MonitoringTool {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  createdAt: string;
  isApproved: boolean;
  creatorId: string;
  fields: Field[];
  departments: Department[];
}
export interface DeletePolicy {
  chapterId: string;
  policyId: string;
}

export interface Policy {
  id: string;
  code: string;
  name: string;
  summary: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  dependencies: Dependency[];
}

export interface Dependency {
  id: string;
  name: string;
  code: string;
  pdfUrl: string;
  type: number;
  estimatedTimeInMin: number;
  pagesCount: number;
  createdAt: string;
  isApproved: boolean;
  creatorId: string;
}
export interface GetDependency {
  chapterId: string;
  policyId: string;
  id: string;
}
export interface DeleteDependency extends GetDependency {}
