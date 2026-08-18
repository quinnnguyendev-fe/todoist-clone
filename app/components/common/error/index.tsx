type ErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export const Error = ({
  message = "Something went wrong",
  onRetry,
}: ErrorProps) => {
  return (
    <div role="alert">
      <p>{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};
