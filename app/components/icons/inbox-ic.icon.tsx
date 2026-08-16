// import { COLORS } from "../../constants/colors"

type Props = {
    size?: number
    variant?: 'active' | 'normal'
}

export const InboxIC = (props: Props) => {
    // const currentColor = props.variant === 'active' ? COLORS.SELECTABLE_SECONDARY_ON_SELECTED_FILL : COLORS.ACTIONABLE_QUATERNARY_IDLE_TINT

    return <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill={"currentColor"}
        fillRule="evenodd"
        d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246q.06.24.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4m0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a1 1 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1z"
        clipRule="evenodd"
      />
    </svg>

}