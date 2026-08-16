import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import styles from "./style.module.scss";
import { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { DateIC } from "@/components/icons/date-ic.icon";
import { format } from "date-fns";

type DatePickerProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleSelectDate = (date?: Date) => {
    onChange?.(date)
    setOpen(false)
  }

  return (
    <div ref={ref} className={styles["container"]}>
      <Button
        variant="tertiary"
        title={value ? format(value, "MMM dd") : "Date"}
        iconLeft={<DateIC />}
        onClick={() => setOpen(true)}
      />
      {open && <div className={styles["date"]}>
        <DayPicker
          mode="single"
          selected={value}
          onSelect={handleSelectDate}
          classNames={{
            selected: styles["selected"],
            day_button: styles["day-button"],
            day: styles["day"],
          }}
        />
      </div>}
    </div>
  );
};
