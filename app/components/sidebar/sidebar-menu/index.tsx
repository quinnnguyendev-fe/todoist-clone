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
  const navigate = useNavigate();
  const [itemActive, setItemActive] = useState<string>("Add task");
  const [isOpen, setOpen] = useState<boolean>(false);

  const MENUS = [
    {
      title: "Add task",
      icon: <PlusCircle />,
      suffixIcon: <WaveIC />,
      activeable: true,
      action: () => {
        setOpen(true)
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
      activeable: false,
      count: 3,
      action: () => {
        navigate("/inbox");
      },
    },
    {
      title: "Today",
      icon: <CalendarIC />,
      activeable: false,
      count: 2,
      action: () => {
        navigate("/today");
      },
    },
    {
      title: "Upcoming",
      icon: <ComingIC />,
      activeable: false,
      action: () => {
        navigate("/upcoming");
      },
    },
    {
      title: "Filters and Labels",
      icon: <BlocksIC />,
      activeable: false,
      action: () => {
        navigate("/filters-and-labels");
      },
    },
    {
      title: "Reporting",
      icon: <TrackingIC />,
      activeable: false,
      action: () => {
        navigate("/reporting");
      },
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
              isActive={itemActive === item.title}
              {...item}
              onClick={() => {setItemActive(item.title)}}
            />
          );
        })}
      </div>
      {isOpen && <ModalAddTask isOpen={isOpen} setOpen={setOpen}/>}

    </>
  );
};
