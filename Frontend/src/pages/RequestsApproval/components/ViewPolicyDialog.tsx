import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SummaryIcon from "@mui/icons-material/Subject";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import useGetPolicy from "../hooks/useGetPolicy";
import { ViewPolicyDialogProps } from "../types";
import ViewPolicyDialogSkeleton from "./ViewPolicyDialogSkeleton";

const ViewPolicyDialog: FC<ViewPolicyDialogProps> = ({
  info: { chapterId },
  policyId: id,
  open,
  onClose,
}) => {
  const { policy, isFetching } = useGetPolicy(chapterId, id);

  const DialogHeader = isFetching ? (
    <Typography variant="h3" width={"50%"}>
      <Skeleton />
    </Typography>
  ) : (
    <MaqasidDialog.Title flex={1} title={policy?.name} />
  );

  return (
    <MaqasidDialog isOpen={open} onClose={onClose} variant="center">
      <MaqasidDialog.Header>
        {DialogHeader}

        <MaqasidDialog.Actions>
          <Chip label="Policy" />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>

      {isFetching ? (
        <MaqasidDialog.Body>
          <ViewPolicyDialogSkeleton />
        </MaqasidDialog.Body>
      ) : (
        <MaqasidDialog.Body>
          <Stack gap={2.5}>
            <Stack direction="row" alignItems="center" gap={1}>
              <VpnKeyIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2"> Code: </Typography>
              <Typography>{policy?.code}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={1}>
              <SummaryIcon
                sx={{
                  color: (theme) => theme.palette.grey[600],
                  fontSize: "1.25rem",
                }}
              />
              <Typography variant="body2">Summary: </Typography>

              <Typography>{policy?.summary}</Typography>
            </Stack>

            <Stack direction="row">
              <PictureAsPdfIcon
                sx={{ mr: 2, color: (theme) => theme.palette.grey[600] }}
              />
              <Button
                href={policy?.pdfUrl || ""}
                target="_blank"
                variant="text"
                sx={{ textTransform: "none", mt: -1, ml: -2 }}
              >
                Open Policy File
              </Button>
            </Stack>
          </Stack>
        </MaqasidDialog.Body>
      )}
    </MaqasidDialog>
  );
};

export default ViewPolicyDialog;
