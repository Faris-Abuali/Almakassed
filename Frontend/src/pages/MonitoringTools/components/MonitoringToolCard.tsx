import { FC } from "react";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import UpdateIcon from "@mui/icons-material/Update";
import {
  Button,
  Card,
  CardActions,
  Chip,
  Divider,
  Tooltip,
} from "@mui/material";
import formatDate from "src/utils/formatDate";
import CardBody from "./CardBody";
import useMonitoringToolsContext from "../context/useMonitoringToolsContext";
import { MonitoringToolCardProps } from "../types";

const MonitoringToolCard: FC<MonitoringToolCardProps> = ({
  monitoringTool,
}) => {
  const { onOpenMTViewDialog } = useMonitoringToolsContext();

  if (!monitoringTool) return null;

  const lastModified = formatDate(monitoringTool!.lastModified);

  const handleViewButtonClicked = () => onOpenMTViewDialog(monitoringTool!);

  return (
    <>
      <Card
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 230,
          // borderRadius: "0 15px 0 15px",
        }}
      >
        <CardBody monitoringTool={monitoringTool} />

        <Divider sx={{ justifyContent: "flex-end" }} />

        <CardActions
          sx={{
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Tooltip title="Last modified" arrow>
            <Chip
              icon={<UpdateIcon />}
              label={lastModified}
              sx={{ mr: 1, fontSize: { xs: "0.7rem", lg: "0.8125rem" } }}
            />
          </Tooltip>

          <Button
            startIcon={<TroubleshootIcon />}
            onClick={() => handleViewButtonClicked()}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default MonitoringToolCard;
