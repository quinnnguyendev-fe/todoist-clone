type Props = {
  size?: number
}

export const AttachmentIC = (props: Props) => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 16}
    height={props.size || 16}
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M8.071 2.93a3 3 0 0 1 4.243 0l.353.353a2.5 2.5 0 0 1 0 3.535l-3.889 3.89a2 2 0 0 1-2.828-2.83l3.182-3.181a.5.5 0 1 1 .707.707L6.657 8.586A1 1 0 0 0 8.07 10l3.89-3.889a1.5 1.5 0 0 0 0-2.121l-.354-.354a2 2 0 0 0-2.829 0L4.536 7.88a3 3 0 0 0 4.242 4.243l3.89-3.89a.5.5 0 1 1 .706.708l-3.889 3.889a4 4 0 1 1-5.657-5.657z"
    />
  </svg>


}