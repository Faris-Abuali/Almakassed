import AddIcon from "@mui/icons-material/Add";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import AddChapterDialog from "./Sidebar/components/AddChapterDialog";

const AddChapterButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
      <Button
        sx={{ width: "fit-content" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add Chapter
      </Button>
      <AddChapterDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </Stack>
  );
};

export default AddChapterButton;
