//Box allowing a component to passthrough
export default function UiBox(props: {
  className?: string;
  children: React.ReactElement | React.ReactElement[] | string;
}) {
  return (
    <div
      className={
        props.className +
        ' bg-white shadow-lg outline outline-black/5 dark:bg-white/5 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'
      }
    >
      {props.children}
    </div>
  );
}

