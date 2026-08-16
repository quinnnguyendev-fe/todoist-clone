import { NoteIC } from "@/components/icons/note-ic.icon";
import styles from "./style.module.scss";
import { WaveIC } from "@/components/icons/wave-ic.icon";
import { Button } from "../button";
import { InboxIC } from "@/components/icons/inbox-ic.icon";
import { DownFullIC } from "@/components/icons/down-full-ic.icon";
import { useState } from "react";
import { DatePicker } from "../date-picker";
import { Priority } from "../priority";
import { InputText } from "../inputText";

type EditorProps = {
  mode: "add" | "update";
  defaultValue?: {
    titleValue: string;
    descValue?: string;
    dateValue?: string;
    priorityValue?: number;
  };
  onCancel?: () => void;
  onOK?: ({ title, description, date }: TaskType) => void;
};

export type TaskType = {
  title: string;
  description?: string;
  date?: Date;
  priority?: number;
};

export const TaskEditor = ({
  mode,
  defaultValue,
  onCancel,
  onOK,
}: EditorProps) => {
  const [titleValue, setTitleValue] = useState<string>(
    defaultValue?.titleValue || "",
  );
  const [descValue, setDescValue] = useState<string>(
    defaultValue?.descValue || "",
  );
  const [dateValue, setDateValue] = useState<Date | undefined>(
    defaultValue?.dateValue ? new Date(defaultValue.dateValue) : undefined,
  );

  const [priorityValue, setPriorityValue] = useState<number | undefined>(
    defaultValue?.priorityValue || undefined,
  );

  const clearData = () => {
    setTitleValue("");
    setDescValue("");
    setDateValue(undefined);
  };

  const handleClickSubmit = () => {
    if(!titleValue.trim()) return

    if (titleValue) {

      onOK?.({
        title: titleValue,
        description: descValue,
        date: dateValue,
        priority: priorityValue,
      });
    }

    if(mode === "add") {
      clearData();
    }
  };

  return (
    <div className={styles["editor"]}>
      <div className={styles["editor-content"]}>
        <div className={styles["group"]}>
          <div className={styles["input"]}>
            <input
              autoFocus
              type="text"
              placeholder="What do you wanna do?"
              className={styles["input-title"]}
              onChange={(e) => setTitleValue(e.target.value)}
              value={titleValue}
            />
          </div>
          <div className={styles["actions"]}>
            <button>
              <NoteIC />
            </button>
            <button>
              <WaveIC />
            </button>
          </div>
        </div>
        <div className={styles["input"]}>
          <input
            type="text"
            placeholder="Description"
            className={styles["input-subtitle"]}
            onChange={(e) => setDescValue(e.target.value)}
            value={descValue}
          />
        </div>
        <div className={styles["buttons"]}>

          <DatePicker value={dateValue} onChange={setDateValue}/>

          <Priority
            defaultValue={priorityValue}
            onSelectPriority={(id) => {
              setPriorityValue(id);
            }}
          />
        </div>
      </div>

      <div className={styles["editor-footer"]}>
        <div className={styles["dropdown"]}>
          <button className={styles["dropdown-selector"]}>
            <InboxIC size={18} />
            <span>Inbox</span>
            <DownFullIC size={13} />
          </button>
        </div>

        {mode == "add" && (
          <div className={styles["actions"]}>
            <Button
              variant="secondary"
              title="Cancel"
              onClick={() => onCancel?.()}
            />
            <Button
              title="Add task"
              onClick={handleClickSubmit}
              disabled={!titleValue}
            />
          </div>
        )}

        {mode == "update" && (
          <div className={styles["actions"]}>
            <Button
              variant="secondary"
              title="Cancel"
              onClick={() => onCancel?.()}
            />
            <Button
              title="Save"
              onClick={handleClickSubmit}
              disabled={!titleValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};
