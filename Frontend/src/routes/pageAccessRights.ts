import { PageAccessRight, PageAccessName } from "src/types";

const pagesAccessRights = new Map<PageAccessName, PageAccessRight>([
  [
    "Home",
    {
      roles: [["Admin"], ["Focal Point"]],
    },
  ],
  [
    "Dashboard",
    {
      roles: [["Admin"]],
    },
  ],
  [
    "MonitoringTools",
    {
      roles: [["Focal Point"], ["Sub-Admin"], ["Admin"]], // You can access this page if you have at least one of the roles
    },
  ],
  [
    "TaskSubmissionForm",
    {
      roles: [["Focal Point"]],
    },
  ],
  [
    "UserProfile",
    {
      roles: [["Focal Point"], ["Sub-Admin"], ["Admin"], ["Staff"]],
    },
  ],
  [
    "PoliciesAndProcedures",
    {
      roles: [["Focal Point"], ["Sub-Admin"], ["Admin"], ["Staff"]],
    },
  ],
  [
    "Page5",
    {
      roles: [["Focal Point", "Admin"]], // You must have both roles to access this page
    },
  ],
]);

export default pagesAccessRights;
