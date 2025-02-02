import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import LoaderCell from "src/components/LoaderCell";
import TabPanel from "src/components/TabPanel";
import { Submission } from "../API/types";
import useGetTaskSubmissions from "../hooks/useGetTaskSubmissions";
import { ActivityPanelProps } from "../types";
import {
  findCurrentMonthSubmissions,
  findOlderSubmissions,
  isCurrentMonthSubmission,
} from "../utils";
import ActivitySegment from "./ActivitySegment";
import SubmissionDialog from "./SubmissionDialog";

const ActivityPanel: FC<ActivityPanelProps> = ({
  value,
  departmentId,
  focalPointTaskId,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>("");

  const { submissions, isFetching } = useGetTaskSubmissions(
    departmentId,
    focalPointTaskId,
  );

  if (isFetching)
    return (
      <TabPanel value={value} index={1} height="calc(100vh - 250px)">
        <LoaderCell size="2.5rem" />
      </TabPanel>
    );

  if (!submissions) return null;

  const currentMonthSubmissions = findCurrentMonthSubmissions(submissions);

  const olderSubmissions = findOlderSubmissions(submissions);

  const submissionsArrays: Submission[][] = [
    currentMonthSubmissions.reverse(),
    olderSubmissions.reverse(),
  ];

  const handleCloseDialog = () => {
    setSelectedSubmissionId("");
    setIsDialogOpen(false);
  };

  const handelSelectedSubmissionChange = (submissionId: string) => {
    setSelectedSubmissionId(submissionId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <TabPanel value={value} index={1} p={3} pb={0}>
        {submissions.length === 0 && (
          <Stack height="calc(100vh - 316px)" justifyContent="center">
            {/* //TODO: Uncomment when MAK-99 is merged ↓ */}
            {/* <EmptyList type="submissions" /> */}
          </Stack>
        )}
        <Stack gap={2}>
          {submissionsArrays.map(
            (submissionsArray, index) =>
              submissionsArray.length > 0 && (
                <Stack gap={1.5} key={index}>
                  <Typography
                    borderBottom={1}
                    pb={0.3}
                    borderColor={(theme) => theme.palette.grey[300]}
                  >
                    {isCurrentMonthSubmission(submissionsArray[0].submittedAt)
                      ? "This Month"
                      : "Older"}
                  </Typography>

                  <Stack gap={2}>
                    {submissionsArray.map((submission) => (
                      <ActivitySegment
                        key={submission.id}
                        submission={submission}
                        onSelectedSubmissionChange={
                          handelSelectedSubmissionChange
                        }
                      />
                    ))}
                  </Stack>
                </Stack>
              ),
          )}
        </Stack>
      </TabPanel>

      {selectedSubmissionId && (
        <SubmissionDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          submissionId={selectedSubmissionId}
        />
      )}
    </>
  );
};

export default ActivityPanel;
