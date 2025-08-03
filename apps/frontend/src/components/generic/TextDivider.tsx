export default function TextDivider(props: { children?: string }) {
  return (
    <>
      <div className="flex align-middle">
        <div className="border-b-1 border-solid border-gray-400 w-full" />
        {props.children && (
          <>
            <div className="relative top-2 w-full text-center">
              <h6>{props.children}</h6>
            </div>
            <div className="border-b-1 border-solid border-gray-400 w-full" />
          </>
        )}
      </div>
    </>
  );
}
