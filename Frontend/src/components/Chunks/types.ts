export interface RecentCreatedPolicyChunkProps {
  id: string;
  name: string;
  chapterId: string;
  chapterName: string;
  lastAccessed: string;
}

export interface RecentCreatedDependencyChunkProps {
  id: string;
  name: string;
  pdfUrl: string;
  chapterName: string;
  lastAccessed: string;
  policyName: string;
}

export interface DependencyChunkProps {
  finishedFile: FinishedDependency;
}

export interface PolicyChunkProps {
  finishedFile: FinishedPolicy;
}
export enum FileEntityType {
  Policy,
  Dependency,
}
export interface FinishedFile {
  userId: string;
  name: string;
  readingState: number;
  lastAccessed: string;
  policy?: Policy;
  dependency?: Dependency;
  type: FileEntityType;
}

export interface FinishedPolicy extends FinishedFile {
  policyId: string;
  policy: Policy;
  type: FileEntityType.Policy;
}

export interface Policy {
  id: string;
  code: string;
  name: string;
  pdfUrl: string;
  summary: string;
  isApproved: boolean;
  chapter: Chapter;
}

export interface Chapter {
  id: string;
  name: string;
  enableState: boolean;
}

export interface FinishedDependency extends FinishedFile {
  dependencyId: string;
  dependency: Dependency;
  type: FileEntityType.Dependency;
}

export interface Dependency {
  id: string;
  name: string;
  pdfUrl: string;
  isApproved: boolean;
  policy: Policy;
}
