type Props = {
  size?: number;
};

export const CircleCheckIC = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 16}
      height={props.size || 16}
      fill="none"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="Rmeai4X"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 14.001a6 6 0 1 1 0-12 6 6 0 0 1 0 12m0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10M5.146 8.147a.5.5 0 0 1 .708 0L7 9.294l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 0-.708"
        clipRule="evenodd"
      />
    </svg>
  );
};
