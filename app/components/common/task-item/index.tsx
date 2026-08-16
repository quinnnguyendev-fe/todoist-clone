import { CheckIC } from "@/components/icons/check-ic.icon";
import styles from "./style.module.scss";
import { EditIC } from "@/components/icons/edit-ic.icon";
import { DateIC } from "@/components/icons/date-ic.icon";
import { Button } from "../button";
import { todoApi } from "@/api/task";
import { CloseIC } from "@/components/icons/close-ic.icon";
import { useState } from "react";
import { DeleteModal } from "../modal-delete";
import { Modal } from "../modal";
import { DatePicker } from "../date-picker";
import type { Task } from "@/api/task.type";
import { useAppDispatch } from "@/store/hooks";
import { removeTask, updateTask } from "@/store/tasks/task.slice";

type TaskItemProps = {
  task: Task;
  onClickEditTask?: (id: string) => void;
};

export const TaskItem = ({ task, onClickEditTask }: TaskItemProps) => {
  const [selected, setSelected] = useState<Task | null>(null);
  const [isOpenDelete, setOpenDelete] = useState<boolean>(false);
  const [isOpenCalendar, setOpenCalender] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleEditTask = () => {
    onClickEditTask?.(task.id);
  };

  const handleDeleteTask = async () => {
    try {
      const result = await todoApi.delete(task.id);

      if (result.success) {
        dispatch(removeTask(result.deletedId));
        setOpenDelete(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTask = await todoApi.updateStatus(
        task.id,
        !task.isCompleted,
      );

      dispatch(updateTask(updatedTask));
    } catch (error) {
      alert(error);
    }
  };

  const openDeleteModal = (task: Task) => {
    setSelected(task);
    setOpenDelete(true);
  };

  return (
    <>
      <li className={styles["item"]} key={task.id}>
        <div className={styles["wrapper"]}>
          <button
            type="button"
            className={`${styles["item-status"]} ${task.isCompleted ? styles["completed"] : ""}`}
            onClick={handleToggleComplete}
          >
            <CheckIC size={18} />
          </button>
          <div className={styles["item-content"]}>
            <p className={styles["title"]}>{task.title}</p>
            <p className={styles["description"]}>{task.description}</p>
            <div className={styles["actions"]}>
              <button onClick={handleEditTask}>
                <EditIC />
              </button>

              <button onClick={() => setOpenCalender(true)}>
                <DateIC size={24} />
              </button>

              {isOpenCalendar && <DatePicker />}

              <button onClick={() => openDeleteModal(task)}>
                <CloseIC />
              </button>
            </div>
          </div>
        </div>
        <div className={styles["item-other"]}>
          {!!task.dueDate && (
            <Button
              variant="transparent"
              title={task.dueDate}
              iconLeft={<DateIC />}
              onClick={() => {}}
            />
          )}
        </div>
      </li>

      <Modal
        isOpen={isOpenDelete}
        onClose={() => {
          setOpenDelete(false);
          setSelected(null);
        }}
      >
        <DeleteModal
          key={selected?.id}
          title={selected?.title}
          onClickCancel={() => {
            setOpenDelete(false);
            setSelected(null);
          }}
          onClickDelete={handleDeleteTask}
        />
      </Modal>
    </>
  );
};
