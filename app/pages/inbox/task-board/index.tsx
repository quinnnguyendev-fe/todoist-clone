import styles from "./style.module.scss";
import { Empty } from "../empty";
import { useState } from "react";
import { TaskEditor, type TaskType } from "@/components/common/task-editor";
import { todoApi } from "@/api";
import { TaskItem } from "@/components/common/task-item";
import { Button } from "@/components/common/button";
import { PlusIC } from "@/components/icons/plus-ic.icon";
import { format } from "date-fns";
import type { Task, TaskState } from "@/api/task.type";
import { useAppDispatch } from "@/store/hooks";
import { addTask, fetchTasks, updateTask } from "@/store/tasks/task.slice";
import { Spinner } from "@/components/common/spinner";
import { Error } from "@/components/common/error";

type TaskBoardProps = {
  tasks: Task[];
  status: TaskState["status"];
};

export const TaskBoard = ({ tasks, status }: TaskBoardProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>();

  const isLoading = status === "loading";
  const isError = status === "failed";
  const isEmpty = status === "succeeded" && tasks.length === 0;
  const hasTasks = status === "succeeded" && tasks.length > 0;

  const showEmpty = !isEditing && isEmpty;
  const showButtonAddtask =
    !isLoading && ((!isEditing && !isEmpty) || (isEditing && !!activeId));

  const dispatch = useAppDispatch();

  const handleCreateTask = async ({
    title,
    description,
    date,
    priority,
  }: TaskType) => {
    try {
      const newTask = await todoApi.create({
        title,
        description,
        dueDate: date ? format(date, "yyyy-MM-dd") : undefined,
        priority,
      });

      dispatch(addTask(newTask));
    } catch (e) {
      alert(e);
    }
  };

  const handleUpdateTask = async (id: string, data: TaskType) => {
    try {
      const result = await todoApi.edit(id, {
        title: data.title,
        description: data.description,
        dueDate: data.date ? format(data.date, "yyyy-MM-dd") : undefined,
        priority: data.priority,
      });

      dispatch(updateTask(result));
      setEditing(false);
      setActiveId(undefined);
    } catch (e) {
      alert(e);
    }
  };

  const handleEditTask = (id: string) => {
    setActiveId(id);
    setEditing(true);
  };

  const handleCancelEditor = () => {
    setEditing(false);
    setActiveId(undefined);
  };

  const renderTaskList = () => {
    return (
      <>
        {tasks.map((_task) => {
          const isActiveUpdate =
            isEditing && !!activeId && _task.id === activeId;

          return isActiveUpdate ? (
            <div key={_task.id} className={styles["container"]}>
              <TaskEditor
                mode="update"
                onCancel={handleCancelEditor}
                onOK={(taskData) => {
                  handleUpdateTask(_task.id, taskData);
                }}
                defaultValue={{
                  titleValue: _task.title,
                  descValue: _task.description,
                  dateValue: _task.dueDate,
                  priorityValue: _task.priority,
                }}
              />
            </div>
          ) : (
            <TaskItem
              key={_task.id}
              task={_task}

              onClickEditTask={handleEditTask}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className={styles["board"]}>
      {isLoading && <Spinner />}
      {isError && <Error onRetry={() => dispatch(fetchTasks())} />}
      {showEmpty && <Empty setEditing={setEditing} />}

      {hasTasks && <ul className={styles["board-list"]}>{renderTaskList()}</ul>}

      {isEditing && !activeId && (
        <div className={styles["container"]}>
          <TaskEditor
            mode="add"
            onCancel={() => setEditing(false)}
            onOK={handleCreateTask}
          />
        </div>
      )}

      {showButtonAddtask && (
        <div className={styles["board-addtask"]}>
          <Button
            variant="transparent"
            title="Add task"
            iconLeft={<PlusIC />}
            onClick={() => {
              setEditing(true);
              setActiveId(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
};
