"use client";
import { LoadedRecipe } from "@/types/logFood";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Transition } from "@/utils/DialogTransition";
import { SOMETHING_WENT_WRONG } from "@/contant";
import { dialogPaper, dialogTitleStyle, dialogContentStyle, alertStyle, dialogActionsStyle, emptyBoxFlex } from "./LogFoodDeleteModal.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchRecentLogs, fetchTotalConsumptionData, fetchTotalConsumptionToday } from "@/store/slice/DashboardSlice";

interface LogFoodModalProps {
  open: boolean;
  handleClose: () => void;
  loadedRecipe: LoadedRecipe;
}

export default function LogFoodDeleteModal(props: LogFoodModalProps) {
  const { open, handleClose, loadedRecipe } = props;
  const [inProgress, setInProgress] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const refreshData = () => {
    dispatch(fetchRecentLogs());
    dispatch(fetchTotalConsumptionData());
    dispatch(fetchTotalConsumptionToday());
  };

  const onCancelClick = () => {
    handleClose();
  };

  const handleSubmit = async () => {
    try {
      setInProgress(true);
      const response = await fetch(`/api/food-log/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: loadedRecipe.id }),
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      setSuccess(true);
      refreshData();
    } catch {
      setError(true);
    } finally {
      setInProgress(false);
    }
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      sx={dialogPaper}
    >
      <DialogTitle sx={dialogTitleStyle}>Delete Log</DialogTitle>
      <DialogContent sx={dialogContentStyle}>
        <Collapse in={!success}>
          Are you sure you want to delete this log?
          <Collapse in={Boolean(error)}>
            <Alert
              sx={alertStyle}
              onClose={() => setError(false)}
              severity="error"
            >
              {SOMETHING_WENT_WRONG}
            </Alert>
          </Collapse>
        </Collapse>
        <Collapse in={success}>
          <Alert sx={alertStyle} severity="success">
            Food log deleted successfully!
          </Alert>
        </Collapse>
      </DialogContent>
      <DialogActions sx={dialogActionsStyle}>
        <Button variant="outlined" onClick={onCancelClick}>
          Close
        </Button>
        <Box aria-hidden="true" sx={emptyBoxFlex} />
        <LoadingButton
          loading={inProgress}
          variant="contained"
          onClick={handleSubmit}
          disabled={inProgress || success}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}