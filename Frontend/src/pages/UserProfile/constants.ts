export const USER_PROFILE_QUERY_KEY = ["userProfile"];

export const POLICY_READING_QUERY_KEY = ["policyReading"];

export const DEPENDENCY_READING_QUERY_KEY = ["depReading"];

export const FINISHED_POLICIES_QUERY_KEY = ["finishedPolicies"];

export const FINISHED_DEPENDENCIES_QUERY_KEY = ["finishedDependencies"];

export enum ChoiceName {
  Home = "Home",
  Details = "Details",
  PoliciesProgress = "Policies Progress",
  DependenciesProgress = "Dependencies Progress",
  Activity = "Reading Activity",
}

export enum EditType {
  Email = "email",
  PhoneNumber = "phoneNumber",
}

export enum ReadingEntityType {
  POLICY,
  DEPENDENCY,
}
