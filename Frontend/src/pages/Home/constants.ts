export const FILE_ENTITY_QUERY_KEY = ["fileEntity"];

export const READ_FILES_QUERY_KEY = ["readFiles"];

export const POLICY_READING_QUERY_KEY = ["policyReading"];

export const DEPENDENCY_READING_QUERY_KEY = ["depReading"];

export const ANNOUNCEMENTS_QUERY_KEY = ["announcements"];

export enum ReadingEntityType {
  POLICY,
  DEPENDENCY,
}

export const initialValues = {
  body: "",
  isPinned: false,
};
