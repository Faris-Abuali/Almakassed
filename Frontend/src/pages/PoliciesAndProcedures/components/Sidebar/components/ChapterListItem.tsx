import AddIcon from "@mui/icons-material/Add";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPolicyDialog from "src/pages/AddPolicyDialog";
import { Policy } from "../API/types";
import { ChapterListItemProps } from "../types";
import { useAppSelector } from "src/store/hooks";
import { selectIsAdminUser, selectIsManagerUser } from "src/features/user";

const ChapterListItem: FC<ChapterListItemProps> = ({ chapter }) => {
  const [open, setOpen] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickChapter = () => setOpen(!open);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  const navigate = useNavigate();

  const handleClickPolicy = (policy: Policy) => () => {
    navigate(`${policy.chapterId}/policies/${policy.id}`);
  };

  const handleClickEditChapter = () => {
    navigate(`${chapter.id}`);
  };
  const isAdmin = useAppSelector(selectIsAdminUser);
  const isManager = useAppSelector(selectIsManagerUser);

  return (
    <>
      <Box sx={{ display: "flex", height: 55 }}>
        <ListItemButton onClick={handleClickChapter}>
          <ListItemIcon sx={{ mr: -2.5 }}>
            {/* If the chapter has no policies yet, it will look disabled*/}
            <MenuBookIcon color={chapter.enableState ? "action" : "disabled"} />
          </ListItemIcon>

          <Typography
            fontWeight={600}
            sx={{ color: (theme) => theme.palette.text.primary }}
          >
            {chapter.name}
          </Typography>

          {open ? <ExpandLess sx={{ ml: 2 }} /> : <ExpandMore sx={{ ml: 2 }} />}
        </ListItemButton>

        {isAdmin && (
          <Tooltip title="Edit chapter">
            <IconButton
              onClick={handleClickEditChapter}
              aria-label="Edit chapter"
              sx={{ mr: 1 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {chapter.policies.map(
            (policy, index) =>
              (policy.isApproved || isAdmin) && (
                <ListItemButton
                  onClick={handleClickPolicy(policy)}
                  key={index}
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon sx={{ mr: -2.5 }}>
                    <AssuredWorkloadIcon
                      color={policy.isApproved ? "action" : "disabled"}
                    />
                  </ListItemIcon>
                  <ListItemText primary={policy.name} />
                </ListItemButton>
              ),
          )}
          {isManager && (
            <ListItemButton onClick={handleOpenDialog} sx={{ pl: 4 }}>
              <ListItemIcon
                sx={{
                  color: "primary.main",
                  mr: -2.5,
                }}
              >
                <AddIcon />
              </ListItemIcon>

              <Typography fontWeight={590}>Add Policy</Typography>
            </ListItemButton>
          )}
        </List>
      </Collapse>
      <AddPolicyDialog
        chapterId={chapter.id}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
};

export default ChapterListItem;
