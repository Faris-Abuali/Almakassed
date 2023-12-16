import { Grid } from "@mui/material";
import { FC } from "react";
import MonitoringToolViewDialog from "../../MonitoringToolDialog/MonitoringToolDialog";
import useGetMonitoringTools from "../hooks/useGetMonitoringTools";
import LoadingSkeleton from "./GridLoadingSkeleton";
import MonitoringToolCard from "./MonitoringToolCard";
import MonitoringToolDialogProvider from "../../MonitoringToolDialog/context/MonitoringToolDialogProvider";

const AdminMonitoringToolsGrid: FC = () => {
  const { monitoringTools, isFetching } = useGetMonitoringTools();

  if (isFetching) return <LoadingSkeleton key="AdminMonitoringToolsGrid" />;

  return (
    <>
      <Grid container gap={3}>
        {monitoringTools?.map((mt) => (
          <Grid
            item
            key={mt.id}
            sx={{
              width: {
                xs: "100%",
                sm: "calc((100% - 24px) / 2)",
                md: "calc((100% - 48px) / 3)",
                xl: "calc((100% - 72px) / 4)",
              },
            }}
          >
            <MonitoringToolCard monitoringTool={mt} />
          </Grid>
        ))}
      </Grid>
      <MonitoringToolDialogProvider>
        <MonitoringToolViewDialog />
      </MonitoringToolDialogProvider>
    </>
  );
};

export default AdminMonitoringToolsGrid;
