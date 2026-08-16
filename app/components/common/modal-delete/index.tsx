import { Button } from "../button";
import { Modal } from "../modal";
import styles from "./style.module.scss";

type DeleteModalProps = {
  title?: string;
  onClickCancel?: () => void;
  onClickDelete?: () => void;
};

export const DeleteModal = ({
  title,
  onClickCancel,
  onClickDelete,
}: DeleteModalProps) => {
  return (
    <div className={styles["delete"]}>
      <div className={styles["delete-content"]}>
        <p className={styles["title"]}>Delete task?</p>
        <p className={styles["description"]}>
          The <span>{title}</span> task will be permanently deleted.
        </p>
        <div className={styles["delete-buttons"]}>
          <Button
            variant="secondary"
            title="Cancel"
            onClick={onClickCancel}
          />
          <Button title="Delete" onClick={onClickDelete} />
        </div>
      </div>
    </div>
  );
};
