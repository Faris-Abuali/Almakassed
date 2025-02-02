export interface Chapter {
  id: string;
  name: string;
  enableState: boolean;
  policies: Policy[];
}

export interface Policy {
  id: string;
  code: string;
  name: string;
  state: boolean;
  pdfUrl: string;
  chapterId: string;
  isApproved: boolean;
  dependencies: Dependency[];
}

export interface Dependency {
  code: string;
  pdfUrl: string;
  estimatedTime: number;
  pagesCount: number;
  policyCode: string;
  policyDependencyType: number;
  isApproved: boolean;
}

export interface CreateChapterResponse extends Omit<Chapter, "policies"> {}
