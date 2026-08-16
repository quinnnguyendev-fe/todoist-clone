import type { DropdownItemType, DropdownProps } from "./type";
import styles from "./style.module.scss";
import { TrackingIC } from "@/components/icons/tracking-ic.icon";
import { SettingIC } from "@/components/icons/setting-ic.icon";
import { LogoutIC } from "@/components/icons/logout-ic.icon";
import { Avatar } from "../avatar";
import { DownIC } from "@/components/icons/down-ic.icon";
import { useState } from "react";
import { DropdownItem } from "./dropdown-item";

type UserMenuType = {
  id: number;
  items: DropdownItemType[];
  line: boolean;
};

const USER_MENUS: UserMenuType[] = [
  {
    id: 1,
    items: [
      {
        id: "user",
        leftIcon: <TrackingIC />,
        label: "Ngyn Qynh",
        subLabel: "0/5 tasks",
        shortcut: "O then P",
        onClick: () => {
          
        },
      },
    ],
    line: true,
  },
  {
    id: 2,
    items: [
      {
        id: "settings",
        leftIcon: <SettingIC />,
        label: "Settings",
        shortcut: "O then S",
        onClick: () => {},
      },
    ],
    line: false,
  },
  {
    id: 3,
    items: [
      {
        id: "reporting",
        leftIcon: <TrackingIC />,
        label: "Reporting",
        shortcut: "G then A",
        onClick: () => {},
      },
    ],
    line: true,
  },
  {
    id: 4,
    items: [
      {
        id: "logout",
        leftIcon: <LogoutIC />,
        label: "Log out",
        onClick: () => {},
      },
    ],
    line: false,
  },
];

export const UserMenu = () => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setOpenMenu(!isOpenMenu);
  };

  return (
    <div className={styles["dropdown"]}>
      <div className={styles["dropdown-button"]} onClick={handleToggleMenu}>
        <div className={styles["avt"]}>
          <Avatar />
        </div>
        <div className={styles["name"]}>
          <span>Ngyn</span>
          <DownIC />
        </div>
      </div>

      {isOpenMenu && (
        <div className={styles["dropdown-list"]}>
          {USER_MENUS.map((menu) => {
            return (
              <>
                {menu.items.map((item) => {
                  return (
                    <DropdownItem
                      key={item.id}
                      item={item}
                      onClose={() => setOpenMenu(false)}
                    />
                  );
                })}

                {menu.line && <div className={styles["line"]}></div>}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};
