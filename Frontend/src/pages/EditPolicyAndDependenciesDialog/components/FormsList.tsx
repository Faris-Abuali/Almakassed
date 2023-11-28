import React, { FC } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Dependency } from "../API/types";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useParams } from "react-router-dom";
import useGetPolicy from "../hooks/useGetPolicy";
import useDeleteAllPolicyDependencies from "../hooks/useDeleteAllPolicyDependencies";
import useDeleteDependency from "../hooks/useDeleteDependency";
import { PolicyDependencyType } from "../constants";

const FormsList: FC = () => {
  const { chapterId: chapterIdParam, policyId: policyIdParam } = useParams();

  const id = chapterIdParam ?? "";

  const policyId = policyIdParam ?? "";

  const { policy } = useGetPolicy({ chapterId: id, policyId });

  const { deleteAllDependencies } = useDeleteAllPolicyDependencies();

  const handleDeleteAllDependencies = () => {
    deleteAllDependencies({ chapterId: id, policyId, type: 0 });
  };
  const { deleteDependency } = useDeleteDependency();

  const handleDeleteDependency = (dependencyId: string) => () => {
    deleteDependency({ chapterId: id, policyId, dependencyId });
  };

  const policyForms =
    policy?.dependencies.filter(
      (dependency) => dependency.type === PolicyDependencyType.Form,
    ) ?? [];

  return (
    <Stack>
      <Box
        display="flex"
        flexDirection="row"
        sx={{ justifyContent: "space-between", mt: 2, p: 1 }}
      >
        <Typography variant="subtitle1" fontWeight={500}>
          Forms information
        </Typography>
        <Tooltip title="Delete All">
          <Button
            size="small"
            variant="outlined"
            color="error"
            aria-label="Delete All"
            onClick={handleDeleteAllDependencies}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Tooltip>
      </Box>
      <List
        sx={{
          border: `1px dashed `,
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
        disablePadding
      >
        {policyForms.map((policyForm: Dependency, index) => (
          <ListItem sx={{ pl: 4 }} key={index}>
            <ListItemIcon sx={{ color: (theme) => theme.palette.error.main }}>
              <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary={policyForm.name} sx={{ ml: -2 }} />

            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete Policy"
                onClick={handleDeleteDependency(policyForm.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default FormsList;
