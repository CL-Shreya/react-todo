import {
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import React, { useContext, useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import {
  DatePicker,
  mergeStyleSets,
  defaultDatePickerStrings,
} from "@fluentui/react";

import { ActionTypeEnum, ITask } from "../Type";
import { TodoContext } from "../TodoProvider";
import useInput from "./useInput";

const options: IDropdownOption[] = [
  { key: "inProgress", text: "In Progress" },

  { key: "completed", text: "Completed" },
];
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 725 },
};
const styles = mergeStyleSets({
  root: { selectors: { "> *": { marginBottom: 15 } } },
  control: { maxWidth: 750, marginBottom: 15 },
});

type Props = {
  editTaskId: string | null;
};

const TaskForm = ({ editTaskId }: Props) => {
  const { activeTasks, dispatch } = useContext(TodoContext);

  useEffect(() => {
    if (editTaskId) {
      const taskData = activeTasks.find((task) => task.id === editTaskId);
        console.log("Task Data",taskData);
      if (taskData) {
        title.set(taskData?.title || "");
        description.set(taskData?.description || "");
        setStatus(taskData.status);
        setSelectDate(taskData.selectDate || null);
      }
    } else {
      setStatus("");
      setSelectDate(null);
    }
  }, [editTaskId, activeTasks]);

  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" });
  const title = useInput("");
  const description = useInput("");
  const [status, setStatus] = useState("");
  const [selectDate, setSelectDate] = useState<Date | null>();
  const handleChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ) => {
    if (option) {
      const selectedKey = option.text.toString();
      setStatus(selectedKey);
    } else {
      console.log("No option selected. Setting status to 'In Progress'.");
      setStatus("In Progress");
    }
  };
  const handleSelectDate = (date: Date | null | undefined) => {
    if (date !== undefined && date !== null) {
      setSelectDate(date);
    }
  };

  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "Task Added" });
      }, 1000);
    }
  }, [showMessage]);
  const addTaskAction = () => {
    const id = new Date().toJSON(); // Generate id based on current date and time
    // console.log(
    //   "Data-----",
    //   id,
    //   title.value,
    //   description.value,
    //   selectDate,
    //   status
    // );
    //const data: ITask = { id : " ", title:title ,description:description,selectDate:selectDate,status:status}
    dispatch({
      type: ActionTypeEnum.Add,
      data: {
        id: id,
        title: title.value,
        description: description.value,
        selectDate: selectDate,
        status: status,
      },
    });
    console.log("Added Task",title.value,description.value,selectDate,status)
    setShowMessage({ type: MessageBarType.success, message: "Task Added" });
    title.set("");
    description.set("");
  };
  const updateTaskAction = () => {
    console.log("ID", editTaskId, activeTasks);
    const taskData = activeTasks.find((task) => task.id === editTaskId);

    if (taskData) {
      console.log(taskData.id);
      dispatch({
        type: ActionTypeEnum.Update,
        data: {
          id: taskData.id,
          title: title.value,
          description: description.value,
          selectDate: selectDate,
          status: status,
        },
      });

      setShowMessage({ type: MessageBarType.success, message: "Task Updated" });
    } else {
      setShowMessage({
        type: MessageBarType.error,
        message: "Error while updating",
      });
    }
  };
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault(); //It will not refresh
    editTaskId ? updateTaskAction() : addTaskAction();
  };
  return (
    <form onSubmit={onFormSubmit}>
      <TextField label="Title" required {...title} />
      <TextField label="Description" multiline rows={4} {...description} />
      <Dropdown
        label="Status"
        defaultSelectedKey="inProgress"
        //selectedKey={description}
        options={options}
        disabled={true}
        styles={dropdownStyles}
        onChange={handleChange}
      />
      <DatePicker
        isRequired
        label="Date required (with label)"
        placeholder="Select a date..."
        ariaLabel="Select a date"
        className={styles.control}
        strings={defaultDatePickerStrings}
        onSelectDate={handleSelectDate}
        value={selectDate||new Date()}
      />
      <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: 20 }}>
        <Stack style={{ width: "80% " }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {showMessage.message}
            </MessageBar>
          )}
        </Stack>
        <Stack style={{ width: "20% " }}>
          <PrimaryButton
            type="submit"
            text={editTaskId ? "Update Task" : "Add Task"}
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default TaskForm;
