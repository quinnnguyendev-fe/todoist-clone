import { QuestionIC } from '@/components/icons/question-ic.icon';
import styles from './style.module.scss'

export const SidebarFooter = () => {
  return <div className={styles["footer"]}>
    <div className={styles["footer-item"]}>
      <QuestionIC/>
      <span className={styles["title"]}>Help & resources</span>
    </div>
  </div>;
};
