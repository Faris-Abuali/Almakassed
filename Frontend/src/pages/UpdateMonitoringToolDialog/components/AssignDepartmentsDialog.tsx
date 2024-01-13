import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { FormikProvider, useFormikContext } from "formik";
import { FC } from "react";
import MaqasidDialog from "src/components/MaqasidDialog";
import useMonitoringToolsContext from "src/pages/MonitoringTools/context/useMonitoringToolsContext";
import { Department } from "../API/types";
import { DialogName } from "../constants";
import useUpdateMonitoringToolContext from "../context/useUpdateMonitoringToolContext";
import useAssignMonitoringToolToDepartmentForm from "../hooks/useAssignMonitoringToolToDepartmentForm";
import {
  AssignDepartmentDialogProps,
  AssignDepartmentsPayload,
} from "../types";
import AutocompleteField from "src/components/Fields/AutocompleteField";
import useGetDepartments from "../hooks/useGetDepartments";

const AssignDepartmentDialog: FC<AssignDepartmentDialogProps> = ({
  assignedDepartments,
}) => {
  const {
    state: { openedDialog },
    onCloseDialog,
  } = useUpdateMonitoringToolContext();

  const {
    state: { selectedMonitoringTool },
  } = useMonitoringToolsContext();

  const { formikProps, isAdding } = useAssignMonitoringToolToDepartmentForm(
    selectedMonitoringTool!.id,
  );

  const { submitForm, dirty, isValid } = formikProps;

  const { setFieldValue } = useFormikContext<AssignDepartmentsPayload>();

  const { departments } = useGetDepartments();

  // find departments that is not assigned to mt yet
  const assignableDepartments = departments.filter((department) => {
    return !assignedDepartments.find(
      (assignedDepartment) => assignedDepartment.id === department.id,
    );
  });

  const handleCloseDialog = () => onCloseDialog();

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <MaqasidDialog
      isOpen={openedDialog === DialogName.AssignDepartment}
      onClose={handleCloseDialog}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <MaqasidDialog.Header>
        <MaqasidDialog.Title title="Assign Departments" />
        <MaqasidDialog.Actions>
          <MaqasidDialog.Fullscreen />
          <MaqasidDialog.Close />
        </MaqasidDialog.Actions>
      </MaqasidDialog.Header>
      <FormikProvider value={formikProps}>
        <MaqasidDialog.Body>
          {/* //TODO: here will go the auto complete after MAK-87 is merged */}
          <AutocompleteField
            name="departments"
            label="Departments"
            multiple
            disablePortal
            id="departments-autocomplete"
            options={assignableDepartments}
            getOptionLabel={(option) => (option as Department).name}
            onChange={(event, value) => {
              const values = value as Department[];
              const departmentsIds = values.map((item) => item.id);
              setFieldValue("departmentsIdes", departmentsIds);
            }}
          />
        </MaqasidDialog.Body>
        <MaqasidDialog.Footer>
          <LoadingButton
            onClick={() => handleSubmit}
            type="submit"
            disabled={!dirty || !isValid}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            aria-label="Assign Departments"
            loading={isAdding}
            loadingPosition="start"
          >
            Add
          </LoadingButton>
        </MaqasidDialog.Footer>
      </FormikProvider>
    </MaqasidDialog>
  );
};

export default AssignDepartmentDialog;
