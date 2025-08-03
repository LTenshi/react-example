import { createPortal } from 'react-dom';

export function SimpleModal(props: {
  children: React.ReactElement | React.ReactElement[] | string;
  title: string;
  visible?: boolean;
  className?: string;
  onClose?: () => void;
}) {
  return (
    <>
      {createPortal(
        props.visible && (
          <div
            className="z-[999] fixed top-0 left-0 grid h-screen w-screen place-items-center bg-black/20 dark:bg-white/20 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof props.onClose === 'function') {
                props.onClose();
              }
            }}
          >
            <div
              className="absolute w-1/4 h-auto bg-white dark:bg-[#121212] rounded-xl overflow-hidden drop-shadow-xl dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 w-full bg-black/5 dark:bg-white/5">
                {props.title}
              </div>
              <div className="p-2">{props.children}</div>
            </div>
          </div>
        ),
        document.body,
      )}
    </>
  );
}
