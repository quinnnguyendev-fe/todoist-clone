type Props = {
  size?: number
}

export const EtcIC = (props: Props) => {
  return <svg width={props.size || 15} height={props.size || 3}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
    />
  </svg>

}