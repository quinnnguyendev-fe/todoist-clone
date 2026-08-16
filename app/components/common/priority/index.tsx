import { FlatIC } from "@/components/icons/flat-ic.icon";
import { Button } from "../button";
import { useState } from "react";

import styles from "./style.module.scss";
import { CheckIC } from "@/components/icons/check-ic.icon";

const PRIORITIES = [
  {
    id: 1,
    text: "Priority 1",
    shortText: "P1",
    color: "red",
  },
  {
    id: 2,
    text: "Priority 2",
    shortText: "P2",
    color: "yellow",
  },
  {
    id: 3,
    text: "Priority 3",
    shortText: "P3",
    color: "blue",
  },
  {
    id: 4,
    text: "Priority 4",
    shortText: "P4",
    color: "white",
  },
];

type PriorityType = {
  value?: string;
  defaultValue?: number;
  onSelectPriority?: (id: number) => void;
};

export const Priority = (props: PriorityType) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<
    | {
        id: number;
        text: string;
      }
    | undefined
  >(
    props.defaultValue
      ? {
          id: props.defaultValue,
          text:
            PRIORITIES.find((_item) => _item.id === props.defaultValue)
              ?.shortText || "",
        }
      : undefined,
  );

  const handleClick = (params: { id: number; shortText: string }) => {
    setOpen(false);
    setActiveItem({
      id: params.id,
      text: params.shortText,
    });

    props.onSelectPriority?.(params.id);
  };

  return (
    <>
      <Button
        variant="tertiary"
        title={activeItem ? activeItem.text : "Priority"}
        iconLeft={<FlatIC />}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className={styles["priority"]}>
          {PRIORITIES.map((priority) => {
            return (
              <div
                key={priority.id}
                className={styles["priority-item"]}
                onClick={() => handleClick(priority)}
              >
                <span className={styles[priority.color]}>
                  <FlatIC />
                </span>
                <p>{priority.text}</p>
                {activeItem?.id === priority.id && (
                  <span>
                    <CheckIC />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
