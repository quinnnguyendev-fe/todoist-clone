type Props = {
    size?: number
}

export const NextIC = (props: Props) => {
    return <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M9.646 8.354a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 12z"
      />
    </svg>


}