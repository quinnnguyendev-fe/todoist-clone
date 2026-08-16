import { useAppDispatch } from "@/store/hooks";
import { Modal } from "../modal";
import { TaskEditor, type TaskType } from "../task-editor";
import { todoApi } from "@/api";
import { format } from "date-fns";
import { addTask } from "@/store/tasks/task.slice";

type ModalAddTaskProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const ModalAddTask = ({ isOpen, setOpen }: ModalAddTaskProps) => {

  
  const dispatch = useAppDispatch()
  const handleAddTask = async ({title, description, date, priority}: TaskType) => {
    try {
      const newTask = await todoApi.create({
        title,
        description,
        dueDate: date ? format(date, "yyyy-MM-dd") : undefined,
        priority
      })

      dispatch(addTask(newTask))
      setOpen(false)
    } catch(error) {
      alert(error)
    }

  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <TaskEditor
        mode="add"
        onCancel={() => setOpen(false)}
        onOK={handleAddTask}
      />
    </Modal>
  );
};
