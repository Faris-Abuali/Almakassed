import React, { FC, useState } from "react";
import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DescriptionSectionProps } from "./types";

const DescriptionSection: FC<DescriptionSectionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Collapse in={expanded} collapsedSize={24}>
        <Typography variant="body2">{description}</Typography>
      </Collapse>

      {
        <IconButton
          onClick={handleClick}
          aria-label="expand"
          size={"small"}
          sx={{ mb: "auto" }}
          disableRipple={true}
        >
          {expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </IconButton>
      }
    </Stack>
  );
};

export default DescriptionSection;
