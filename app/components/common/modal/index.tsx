import { CloseIC } from "@/components/icons/close-ic.icon"
import type { MouseEvent, ReactNode } from "react"
import { createPortal } from "react-dom"
import "./modal.scss"

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    title?: string,
    closeable?: boolean
}
export const Modal = ({isOpen, onClose, children, title, closeable} : ModalProps) => {

    if(!isOpen || !document.body) return null

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {!!title && <div className="modal-header">
                <h2>{title}</h2>
                {closeable && <button className="modal-close-btn" onClick={onClose}><CloseIC/></button>}
                </div>}
                <div className="modal-body">
                {children}
                </div>
            </div>
        </div>,
        document.body!
    )
}