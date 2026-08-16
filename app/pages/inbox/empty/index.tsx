import { Button } from "@/components/common/button";
import styles from "./style.module.scss";
import { PlusIC } from "@/components/icons/plus-ic.icon";

const IMG_EMPTY =
  "https://todoist.b-cdn.net/assets/images/f6defa2ca953237a.png";

type EmptyProp = {
    setEditing: (value: boolean) => void
}

export const Empty = ( {setEditing} : EmptyProp) => {
  return (
    <div className={styles["empty"]}>
      <div className={styles["empty-img"]}>
        <img src={IMG_EMPTY} alt="empty-img" />
      </div>
      <p className={styles["empty-title"]}>Capture now, plan later</p>
      <p className={styles["empty-description"]}>
        Inbox is your go-to spot for quick task entry. Clear your mind now,
        organize when you’re ready.
      </p>
      <Button title="Add task" iconLeft={<PlusIC />} onClick={() => setEditing(true)} />
    </div>
  );
};
