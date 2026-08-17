import { BlocksIC } from "@/components/icons/blocks-ic.icon";
import { CalendarIC } from "@/components/icons/calendar-ic.icon";
import { ComingIC } from "@/components/icons/coming-ic.icon";
import { InboxIC } from "@/components/icons/inbox-ic.icon";
import { SearchIC } from "@/components/icons/search-ic.icon";
import { TrackingIC } from "@/components/icons/tracking-ic.icon";
import styles from "./style.module.scss";
import { MenuItem } from "./menu-item";
import { PlusCircle } from "@/components/icons/circle-plus-ic.icon";
import { useNavigate } from "react-router";
import { WaveIC } from "@/components/icons/wave-ic.icon";
import { useState } from "react";
import { ModalAddTask } from "@/components/common/modal-add-task";

export const SidebarMenu = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const MENUS = [
    {
      title: "Add task",
      icon: <PlusCircle />,
      suffixIcon: <WaveIC />,
      activeable: true,
      action: () => {
        setOpen(true);
      },
    },
    {
      title: "Search",
      icon: <SearchIC />,
      activeable: false,
      action: () => {
        console.log("Search");
      },
    },
    {
      title: "Inbox",
      icon: <InboxIC />,
      to: "/inbox",
      count: 3,
    },
    {
      title: "Today",
      icon: <CalendarIC />,
      activeable: false,
      to: "/today",
      count: 2,
    },
    {
      title: "Upcoming",
      icon: <ComingIC />,
      to: "/upcoming",
    },
    {
      title: "Filters and Labels",
      icon: <BlocksIC />,
      to: "/filters-and-labels",
    },
    {
      title: "Reporting",
      icon: <TrackingIC />,
      to: "/reporting",
    },
  ];

  return (
    <>
      <div className={styles["menu"]}>
        {MENUS.map((item) => {
          return (
            <MenuItem
              key={item.title}
              iconLeft={item.icon}
              title={item.title}
              suffixIcon={item.suffixIcon}
              count={item.count}
              action={item.action}
              to={item.to}
            />
          );
        })}
      </div>
      {isOpen && <ModalAddTask isOpen={isOpen} setOpen={setOpen} />}
    </>
  );
};
