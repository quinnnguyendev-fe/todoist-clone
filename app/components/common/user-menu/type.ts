import type { ReactNode } from "react";

export type DropdownItemType = {
    id: string,
    leftIcon?: ReactNode,
    label: string,
    subLabel?: string,
    rightIcon?: ReactNode,
    shortcut?: string,
    disabled?: boolean,
    onClick?: () => void
}

export type DropdownProps = {
    isOpen: boolean,
    items: DropdownItemType[],
    onClose?: () => void
}
