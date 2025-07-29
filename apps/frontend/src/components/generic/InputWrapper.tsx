export default function InputWrapper(props: {
  children: React.ReactElement | string;
  inputTitle?: string;
  className?: string;
}) {
  return (
    <div>
      <div>{props.inputTitle}</div>
      <div>{props.children}</div>
    </div>
  );
}
