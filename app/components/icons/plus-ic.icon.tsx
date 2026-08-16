type Props = {
    size?: number
}

export const PlusIC = (props: Props) => {
    return <svg width={props.size || 13} height={props.size || 13}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1z"
      />
    </svg>

}